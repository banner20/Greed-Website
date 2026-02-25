/* ══════════════════════════════════════════════════════════════════
   GREED CART — cart.js
   Manages cart state in localStorage. Exports addToCart, getCart,
   updateQty, removeItem, getCount, clearCart.
   ══════════════════════════════════════════════════════════════════ */

const CART_KEY = 'greed_cart';

/* ── Helpers ─────────────────────────────────────────────────────── */
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch event so any open page can react
    window.dispatchEvent(new CustomEvent('greed:cart-updated', { detail: { cart } }));
}

function getCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function addToCart({ id, name, price, weight, roast, thumb }) {
    const cart = getCart();
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, weight, roast, thumb, qty: 1 });
    }
    saveCart(cart);
    return getCount();
}

function updateQty(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart(cart);
}

function setQty(id, qty) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, qty);
    saveCart(cart);
}

function removeItem(id) {
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
}

function clearCart() {
    saveCart([]);
}

/* ── Badge syncing ──────────────────────────────────────────────── */
function syncBadge() {
    const count = getCount();
    document.querySelectorAll('.cart-nav-badge').forEach(badge => {
        badge.textContent = count;
        badge.classList.toggle('visible', count > 0);
    });
}

/* ── Boot ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    syncBadge();

    // Keep badge in sync across tabs
    window.addEventListener('storage', syncBadge);
    window.addEventListener('greed:cart-updated', syncBadge);

    /* ── Shop page: wire "Add to Cart" buttons ─────────────────── */
    document.querySelectorAll('.sh-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.closest('.sh-product');
            if (!product) return;

            const id = product.dataset.productId;
            const name = product.querySelector('.sh-product__name')?.textContent.trim();
            const price = parseInt(product.querySelector('.sh-product__price')?.textContent.replace(/[^\d]/g, ''), 10);
            const weight = product.querySelector('.sh-product__weight')?.textContent.trim();
            const roast = product.querySelector('.sh-product__roast')?.textContent.trim();
            const thumb = product.dataset.thumb || 'bean';

            addToCart({ id, name, price, weight, roast, thumb });

            // Visual feedback
            const original = btn.textContent;
            btn.textContent = '✓ Added';
            btn.style.background = 'var(--greed-green)';
            btn.style.color = '#000';
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                btn.style.color = '';
            }, 1400);
        });
    });

    /* ── Cart page: render items ──────────────────────────────── */
    if (document.querySelector('.cart-items-wrap')) {
        renderCartPage();
        window.addEventListener('greed:cart-updated', renderCartPage);
    }
});

/* ── Cart Page Renderer ─────────────────────────────────────────── */
function renderCartPage() {
    const cart = getCart();
    const wrap = document.querySelector('.cart-items-wrap');
    const emptyEl = document.querySelector('.cart-empty');
    const layoutEl = document.querySelector('.cart-layout');
    const countEl = document.querySelector('.cart-header__count');

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const subtotal = total;
    const delivery = subtotal >= 999 ? 0 : 99;
    const grand = subtotal + delivery;

    // Update count label
    if (countEl) {
        const n = cart.reduce((s, i) => s + i.qty, 0);
        countEl.textContent = `${n} item${n !== 1 ? 's' : ''}`;
    }

    if (cart.length === 0) {
        if (layoutEl) layoutEl.style.display = 'none';
        if (emptyEl) emptyEl.style.display = 'flex';
        return;
    }

    if (layoutEl) layoutEl.style.display = '';
    if (emptyEl) emptyEl.style.display = 'none';

    // Render items
    wrap.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item__thumb cart-item__thumb--${item.thumb}">${item.name.split(' ').join('<br>')}</div>
            <div class="cart-item__info">
                <span class="cart-item__name">${item.name}</span>
                <span class="cart-item__meta">${item.weight || ''}${item.roast ? ' · ' + item.roast : ''}</span>
                <span class="cart-item__price">₹${item.price.toLocaleString('en-IN')} each</span>
            </div>
            <div class="cart-item__controls">
                <span class="cart-item__line-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
                <div class="cart-qty">
                    <button class="cart-qty__btn" data-action="dec" data-id="${item.id}">−</button>
                    <span class="cart-qty__val">${item.qty}</span>
                    <button class="cart-qty__btn" data-action="inc" data-id="${item.id}">+</button>
                </div>
                <button class="cart-item__remove" data-action="remove" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `).join('');

    // Update summary
    document.querySelector('.cart-subtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
    const delivEl = document.querySelector('.cart-delivery');
    if (delivEl) delivEl.textContent = delivery === 0 ? 'Free' : '₹' + delivery;
    document.querySelector('.cart-total').textContent = '₹' + grand.toLocaleString('en-IN');

    // Delivery note
    const noteEl = document.querySelector('.cart-summary__note');
    if (noteEl) {
        noteEl.textContent = delivery === 0
            ? '✓ You qualify for free delivery.'
            : `Add ₹${(999 - subtotal).toLocaleString('en-IN')} more for free delivery.`;
    }

    // Wire stepper & remove buttons
    wrap.querySelectorAll('[data-action]').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.dataset.id;
            const action = el.dataset.action;
            if (action === 'inc') updateQty(id, 1);
            if (action === 'dec') updateQty(id, -1);
            if (action === 'remove') removeItem(id);
        });
    });
}

export { getCart, addToCart, updateQty, setQty, removeItem, clearCart, getCount };
