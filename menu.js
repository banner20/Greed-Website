// menu.js — Greed Menu Page

// ── DATA ──────────────────────────────────────────────────────────────
const MENU_IMAGES = [
    '/media/MENU/optimized_cappachino.webp',
    '/media/MENU/optimized_klassic kold brew.webp',
    '/media/MENU/optimized_hot chocolate.webp',
    '/media/MENU/optimized_pf punch.webp',
    '/media/MENU/optimized_citrus lychee splash.webp',
    '/media/MENU/optimized_casara lemonade.webp',
    '/media/MENU/optimized_juicy peach.webp',
    '/media/MENU/optimized_cookie crumble.webp',
    '/media/MENU/optimized_cookies together.webp',
    '/media/MENU/optimized_GD-1.webp',
    '/media/MENU/optimized_GD-2.webp',
    '/media/MENU/optimized_GD-3.webp',
    '/media/MENU/optimized_GD-10.webp',
    '/media/MENU/optimized_GD-11.webp',
    '/media/MENU/optimized_GD-13.webp',
    '/media/MENU/optimized_GD-14.webp',
    '/media/MENU/optimized_GD-16.webp',
    '/media/MENU/optimized_GD-18.webp',
    '/media/MENU/optimized_GD-19.webp',
    '/media/MENU/optimized_GD-20.webp',
    '/media/MENU/optimized_GD-21.webp',
    '/media/MENU/optimized_GD-22.webp',
    '/media/MENU/optimized_GD-23.webp',
    '/media/MENU/optimized_GD-24.webp',
    '/media/MENU/optimized_GD-25.webp',
    '/media/MENU/optimized_GD-26.webp',
    '/media/MENU/optimized_GD-27.webp',
];

// Shuffle once so each run assigns in a different order
const shuffledImages = [...MENU_IMAGES].sort(() => Math.random() - 0.5);
let imgIdx = 0;
function nextImg() { return shuffledImages[imgIdx++ % shuffledImages.length]; }

const CATEGORIES = [
    'All',
    'Klassics',
    'Twisted Lattes',
    'Kold Coffee',
    'Kold Brews',
    'Uji Matchas',
    'Coolers',
    'Sandwicheezee',
];

const MENU_ITEMS = [
    // Klassics
    {
        id: 1, cat: 'Klassics', name: 'Espresso', price: 59,
        desc: 'Rich shot of 100% arabica beans.',
        tags: ['hot'],
        img: nextImg(),
    },
    {
        id: 2, cat: 'Klassics', name: 'Americano', price: 99,
        desc: 'Strong espresso topped with hot water.',
        tags: ['hot'],
        img: nextImg(),
    },
    {
        id: 3, cat: 'Klassics', name: 'Latte', price: 139,
        desc: 'Smooth espresso blended with silky milk.',
        tags: ['hot', 'recommended'],
        img: nextImg(),
    },
    {
        id: 4, cat: 'Klassics', name: 'Cappuccino', price: 129,
        desc: 'Espresso, steamed milk, thick creamy foam.',
        tags: ['hot'],
        img: nextImg(),
    },
    {
        id: 5, cat: 'Klassics', name: 'Mocha', price: 149,
        desc: 'Espresso mixed with chocolate and milk.',
        tags: ['hot'],
        img: nextImg(),
    },
    {
        id: 6, cat: 'Klassics', name: 'Hot Chocolate', price: 159,
        desc: 'Creamy Belgian cocoa blended with milk.',
        tags: ['hot'],
        img: nextImg(),
    },

    // Twisted Lattes
    {
        id: 7, cat: 'Twisted Lattes', name: 'Salted Pistachios', price: 169,
        desc: 'Roasted pistachio latte with a salty twist.',
        tags: ['hot', 'recommended'],
        img: nextImg(),
    },
    {
        id: 8, cat: 'Twisted Lattes', name: 'Hazelnut Mocha', price: 179,
        desc: 'Latte with roasted hazelnut and chocolate fudge sauce.',
        tags: ['hot'],
        img: nextImg(),
    },
    {
        id: 9, cat: 'Twisted Lattes', name: 'Caramel Brulée', price: 179,
        desc: 'Latte sweetened with toasted caramel and brown sugar sauce.',
        tags: ['hot'],
        img: nextImg(),
    },
    {
        id: 10, cat: 'Twisted Lattes', name: 'French Vanilla', price: 169,
        desc: 'Classic creamy latte infused with vanilla.',
        tags: ['hot'],
        img: nextImg(),
    },
    {
        id: 11, cat: 'Twisted Lattes', name: 'Spanish Latte', price: 159,
        desc: 'Bold espresso with sweet milk richness.',
        tags: ['hot'],
        img: nextImg(),
    },

    // Kold Coffee
    {
        id: 12, cat: 'Kold Coffee', name: 'OG Cold Coffee', price: 149,
        desc: 'Creamy blended coffee with ice and sugar.',
        tags: ['iced'],
        img: nextImg(),
    },
    {
        id: 13, cat: 'Kold Coffee', name: 'Hazelnut Cold Coffee', price: 169,
        desc: 'Cold coffee blended with roasted hazelnut.',
        tags: ['iced'],
        img: nextImg(),
    },
    {
        id: 14, cat: 'Kold Coffee', name: 'Belgian Chocolate', price: 179,
        desc: 'Mocha blend topped with dark cookie bits.',
        tags: ['iced', 'recommended'],
        img: nextImg(),
    },
    {
        id: 15, cat: 'Kold Coffee', name: 'Caramel Cold Coffee', price: 169,
        desc: 'Coffee blended with sweet chocolate chips.',
        tags: ['iced'],
        img: nextImg(),
    },

    // Kold Brews
    {
        id: 16, cat: 'Kold Brews', name: 'Klassic Cold Brew', price: 109,
        desc: 'Slow-steeped brew, smooth, fruity, aromatic.',
        tags: ['iced'],
        img: nextImg(),
    },
    {
        id: 17, cat: 'Kold Brews', name: 'Vietnamese', price: 149,
        desc: 'Cold brew sweetened with condensed milk.',
        tags: ['iced', 'recommended'],
        img: nextImg(),
    },
    {
        id: 18, cat: 'Kold Brews', name: 'Passionfruit Punch', price: 139,
        desc: 'Cold brew with citrusy passionfruit syrup.',
        tags: ['iced', 'recommended'],
        img: nextImg(),
    },
    {
        id: 19, cat: 'Kold Brews', name: 'Citrus Lychee', price: 144,
        desc: 'Cold brew mixed with lychee and bright citrus.',
        tags: ['iced'],
        img: nextImg(),
    },
    {
        id: 20, cat: 'Kold Brews', name: 'Cranberry Malt', price: 159,
        desc: 'Cold brew with cranberry and zero-malt mix.',
        tags: ['iced'],
        img: nextImg(),
    },

    // Uji Matchas
    {
        id: 21, cat: 'Uji Matchas', name: 'Classic Matcha', price: 164,
        desc: 'Japanese matcha with water and steamed milk.',
        tags: ['hot', 'iced'],
        img: nextImg(),
    },
    {
        id: 22, cat: 'Uji Matchas', name: 'Strawberry', price: 184,
        desc: 'Matcha blended with fresh strawberry crush.',
        tags: ['hot', 'iced', 'recommended'],
        img: nextImg(),
    },
    {
        id: 23, cat: 'Uji Matchas', name: 'White Chocolate', price: 174,
        desc: 'Matcha mixed with rich, creamy white chocolate.',
        tags: ['hot', 'iced'],
        img: nextImg(),
    },
    {
        id: 24, cat: 'Uji Matchas', name: 'Vanilla', price: 169,
        desc: 'Matcha smoothed with sweet vanilla milk.',
        tags: ['hot', 'iced'],
        img: nextImg(),
    },
    {
        id: 25, cat: 'Uji Matchas', name: 'Banana Pudding', price: 189,
        desc: 'Iced matcha blended with banana bread syrup.',
        tags: ['iced', 'recommended'],
        img: nextImg(),
    },
    {
        id: 26, cat: 'Uji Matchas', name: 'Blueberry', price: 179,
        desc: 'Iced matcha topped with natural blueberry crush.',
        tags: ['iced'],
        img: nextImg(),
    },

    // Coolers
    {
        id: 27, cat: 'Coolers', name: 'LMG Lemonade', price: 99,
        desc: 'Lemon, mint, ginger for light refreshing sip.',
        tags: ['iced'],
        img: nextImg(),
    },
    {
        id: 28, cat: 'Coolers', name: 'Peach Iced Tea', price: 99,
        desc: 'Black tea chilled with sweet peach syrup.',
        tags: ['iced'],
        img: nextImg(),
    },
    {
        id: 29, cat: 'Coolers', name: 'Strawberry Lemonade', price: 105,
        desc: 'Fresh lemonade mixed with strawberry syrup.',
        tags: ['iced'],
        img: nextImg(),
    },

    // Sandwicheezee
    {
        id: 30, cat: 'Sandwicheezee', name: 'Classic Grilled', price: 109,
        desc: 'Cheddar, mozzarella, our freshly made special sauce, toasted.',
        tags: ['veg'],
        img: nextImg(),
    },
    {
        id: 31, cat: 'Sandwicheezee', name: 'Corn and Cheese', price: 129,
        desc: 'Sweet corn with creamy cheese and spices.',
        tags: ['veg'],
        img: nextImg(),
    },
    {
        id: 32, cat: 'Sandwicheezee', name: 'Paneer Tikka', price: 159,
        desc: 'Marinated paneer grilled with cheese layers and our in-house sauce.',
        tags: ['veg'],
        img: nextImg(),
    },
    {
        id: 33, cat: 'Sandwicheezee', name: 'Pesto Sundried Tomato', price: 179,
        desc: 'Pesto, sundried tomatoes, loaded melted cheese.',
        tags: ['veg'],
        img: nextImg(),
    },
    {
        id: 34, cat: 'Sandwicheezee', name: 'Chicken Ham & Cheese', price: 169,
        desc: 'Ham, melted cheese, and fresh in-house marinara.',
        tags: ['non-veg'],
        img: nextImg(),
    },
    {
        id: 35, cat: 'Sandwicheezee', name: 'Grilled Seekh Kebab', price: 189,
        desc: 'Seekh kebab, cheese, and house special sauce.',
        tags: ['non-veg'],
        img: nextImg(),
    },
];

// ── STATE ────────────────────────────────────────────────────────────
let activeCategory = 'All';
let activeChip = 'all';
let activeSort = 'default';
let activeView = 'split'; // 'split' | 'card' | 'list'
let openItem = null;

// ── ELEMENTS ─────────────────────────────────────────────────────────
const rail = document.getElementById('mnRail');
const grid = document.getElementById('mnGrid');
const empty = document.getElementById('mnEmpty');
const countEl = document.getElementById('mnCount');
const overlay = document.getElementById('mnOverlay');
const drawer = document.getElementById('mnDrawer');
const chips = document.getElementById('mnChips');
const sortSel = document.getElementById('mnSort');
const filterBtn = document.getElementById('mnFilterBtn');
const filterSummary = document.getElementById('mnFilterSummary');
const filterContent = document.getElementById('mnFilterContent');

// ── MOBILE FILTER TOGGLE ─────────────────────────────────────────────
if (filterBtn) {
    const collapsibles = document.querySelectorAll('.mn-collapsible');

    filterBtn.addEventListener('click', () => {
        // Check state by reading aria-expanded
        const isExpanded = filterBtn.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            // Close them
            collapsibles.forEach(el => el.classList.remove('mn-collapsible--open'));
            filterBtn.setAttribute('aria-expanded', 'false');
            filterBtn.querySelector('span').textContent = 'Show Filters';
        } else {
            // Open them
            collapsibles.forEach(el => el.classList.add('mn-collapsible--open'));
            filterBtn.setAttribute('aria-expanded', 'true');
            filterBtn.querySelector('span').textContent = 'Hide Filters';
        }
    });
}

// ── ESCAPE BODY TRANSFORM ─────────────────────────────────────────────
// The <body> has a CSS transform which creates a new containing block,
// breaking position:fixed on the drawer. Move both to <html> to fix this.
document.documentElement.appendChild(overlay);
document.documentElement.appendChild(drawer);


// ── BUILD CATEGORY RAIL ───────────────────────────────────────────────
CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'mn-tab' + (cat === 'All' ? ' mn-tab--active' : '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', cat === 'All' ? 'true' : 'false');
    btn.dataset.category = cat;

    const num = String(i).padStart(2, '0');
    const itemCount = cat === 'All' ? MENU_ITEMS.length : MENU_ITEMS.filter(x => x.cat === cat).length;

    btn.innerHTML = `
    <span class="mn-tab__num">${cat === 'All' ? 'ALL' : num}</span>
    <span class="mn-tab__name">${cat}</span>
    <span class="mn-tab__count" id="tab-count-${i}">${itemCount} items</span>
  `;

    btn.addEventListener('click', () => {
        activeCategory = cat;
        document.querySelectorAll('.mn-tab').forEach(t => {
            t.classList.remove('mn-tab--active');
            t.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('mn-tab--active');
        btn.setAttribute('aria-selected', 'true');
        renderGrid();
    });

    rail.appendChild(btn);
});

// ── TAG LABEL HELPERS ───────────────────────────────────────────────
const TAG_LABELS = {
    hot: '🔥 Hot',
    iced: '🧊 Iced',
    veg: '🌱 Veg',
    'non-veg': '🍗 Non-Veg',
    recommended: '⭐ Rec\'d',
};

function buildTagsHTML(tags) {
    return tags.map(t =>
        `<span class="mn-tag mn-tag--${t}">${TAG_LABELS[t] ?? t}</span>`
    ).join('');
}

// ── RENDER GRID ─────────────────────────────────────────────────────
function getFilteredItems() {
    let items = MENU_ITEMS;

    // Filter by category
    if (activeCategory !== 'All') {
        items = items.filter(x => x.cat === activeCategory);
    }

    // Filter by chip
    if (activeChip !== 'all') {
        items = items.filter(x => x.tags.includes(activeChip));
    }

    // Sort
    if (activeSort === 'price-asc') {
        items = [...items].sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-desc') {
        items = [...items].sort((a, b) => b.price - a.price);
    } else if (activeSort === 'name-az') {
        items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
}

function renderGrid() {
    const items = getFilteredItems();

    // Update count
    countEl.textContent = items.length;

    // Update Mobile Filter Summary
    if (filterSummary) {
        let parts = [];
        if (activeCategory !== 'All') {
            parts.push(activeCategory);
        }
        if (activeChip !== 'all') {
            const chipCleanNames = { hot: 'Hot', iced: 'Iced', veg: 'Veg', 'non-veg': 'Non-Veg', recommended: "Rec'd" };
            parts.push(chipCleanNames[activeChip] || activeChip);
        }
        filterSummary.textContent = parts.length > 0 ? parts.join(', ') : 'All Items';
    }

    // Update per-tab counts
    CATEGORIES.forEach((cat, i) => {
        const el = document.getElementById(`tab-count-${i}`);
        if (!el) return;
        if (cat === 'All') {
            const n = activeChip === 'all'
                ? MENU_ITEMS.length
                : MENU_ITEMS.filter(x => x.tags.includes(activeChip)).length;
            el.textContent = `${n} items`;
        } else {
            const n = activeChip === 'all'
                ? MENU_ITEMS.filter(x => x.cat === cat).length
                : MENU_ITEMS.filter(x => x.cat === cat && x.tags.includes(activeChip)).length;
            el.textContent = `${n} items`;
        }
    });

    // Render cards
    grid.innerHTML = '';

    if (items.length === 0) {
        empty.removeAttribute('hidden');
        grid.style.display = 'none';
        return;
    }

    empty.setAttribute('hidden', '');
    grid.style.display = '';

    // Apply view class
    grid.classList.remove('mn-grid--card', 'mn-grid--list');
    if (activeView === 'card') grid.classList.add('mn-grid--card');
    if (activeView === 'list') grid.classList.add('mn-grid--list');

    // Group by category for "All" view
    if (activeCategory === 'All' && activeSort === 'default') {
        const grouped = {};
        items.forEach(item => {
            if (!grouped[item.cat]) grouped[item.cat] = [];
            grouped[item.cat].push(item);
        });

        Object.entries(grouped).forEach(([cat, catItems]) => {
            const divider = document.createElement('div');
            divider.className = 'mn-section-divider';
            divider.innerHTML = `
        <span class="mn-section-divider__title">${cat}</span>
        <span class="mn-section-divider__count">${catItems.length} items</span>
      `;
            grid.appendChild(divider);

            catItems.forEach(item => {
                grid.appendChild(buildCard(item));
            });
        });
    } else {
        items.forEach(item => grid.appendChild(buildCard(item)));
    }
}

function buildCard(item) {
    const card = document.createElement('div');
    card.className = 'mn-card';
    card.setAttribute('role', 'listitem');
    card.dataset.id = item.id;

    card.innerHTML = `
    <div class="mn-card__img-wrap">
      <img
        class="mn-card__img"
        src="${item.img}"
        alt="${item.name}"
        loading="lazy"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
      />
      <div class="mn-card__img-placeholder" style="display:none">☕</div>
    </div>
    <div class="mn-card__body">
      <span class="mn-card__category">${item.cat}</span>
      <h3 class="mn-card__name">${item.name}</h3>
      <p class="mn-card__desc">${item.desc}</p>
      <div class="mn-card__meta">
        <span class="mn-card__price">₹${item.price}</span>
        ${buildTagsHTML(item.tags)}
      </div>
      <div class="mn-card__arrow">→</div>
    </div>
  `;

    card.addEventListener('click', () => openDrawer(item));
    return card;
}

// ── QUICK-VIEW DRAWER ────────────────────────────────────────────────
function openDrawer(item) {
    openItem = item;

    document.getElementById('mnDrawerCategory').textContent = item.cat;
    document.getElementById('mnDrawerName').textContent = item.name;
    document.getElementById('mnDrawerDesc').textContent = item.desc;
    document.getElementById('mnDrawerPrice').textContent = item.price;
    document.getElementById('mnDrawerTags').innerHTML = buildTagsHTML(item.tags);

    // Milk note for coffee items
    const milkCats = ['Klassics', 'Twisted Lattes', 'Kold Coffee', 'Kold Brews', 'Uji Matchas'];
    const milkEl = document.getElementById('mnDrawerMilk');
    if (milkEl) {
        if (milkCats.includes(item.cat)) {
            milkEl.innerHTML = 'Alt milk available &nbsp;·&nbsp; Almond +₹55 &nbsp;·&nbsp; Oat +₹55';
            milkEl.style.display = '';
        } else {
            milkEl.innerHTML = '';
            milkEl.style.display = 'none';
        }
    }

    // Image
    const imgEl = document.getElementById('mnDrawerImg');
    const placeholderEl = document.getElementById('mnDrawerImgPlaceholder');
    imgEl.src = item.img;
    imgEl.alt = item.name;
    imgEl.style.display = 'block';
    placeholderEl.style.display = 'none';
    imgEl.onerror = () => {
        imgEl.style.display = 'none';
        placeholderEl.style.display = 'flex';
        placeholderEl.textContent = '☕';
    };

    overlay.classList.add('mn-overlay--open');
    overlay.setAttribute('aria-hidden', 'false');
    drawer.classList.add('mn-drawer--open');
    drawer.setAttribute('aria-hidden', 'false');
    // Lock scroll on <html> — does NOT create a new containing block for fixed children
    document.documentElement.dataset.scrollY = window.scrollY;
    document.documentElement.style.overflowY = 'hidden';
}

function closeDrawer() {
    openItem = null;
    overlay.classList.remove('mn-overlay--open');
    overlay.setAttribute('aria-hidden', 'true');
    drawer.classList.remove('mn-drawer--open');
    drawer.setAttribute('aria-hidden', 'true');
    // Restore scroll
    document.documentElement.style.overflowY = '';
}

document.getElementById('mnDrawerClose').addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && openItem) closeDrawer();
});

// ── CHIPS ────────────────────────────────────────────────────────────
chips.addEventListener('click', e => {
    const btn = e.target.closest('.mn-chip');
    if (!btn) return;
    activeChip = btn.dataset.chip;
    document.querySelectorAll('.mn-chip').forEach(c => c.classList.remove('mn-chip--active'));
    btn.classList.add('mn-chip--active');
    renderGrid();
});

// ── SORT ─────────────────────────────────────────────────────────────
sortSel.addEventListener('change', () => {
    activeSort = sortSel.value;
    renderGrid();
});

// ── VIEW TOGGLES ─────────────────────────────────────────────────────
document.querySelectorAll('.mn-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        activeView = btn.dataset.view;
        document.querySelectorAll('.mn-view-btn').forEach(b => {
            b.classList.remove('mn-view-btn--active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('mn-view-btn--active');
        btn.setAttribute('aria-pressed', 'true');
        renderGrid();
    });
});

// ── RESET ────────────────────────────────────────────────────────────
document.getElementById('mnReset').addEventListener('click', () => {
    activeCategory = 'All';
    activeChip = 'all';
    activeSort = 'default';

    document.querySelectorAll('.mn-tab').forEach(t => {
        t.classList.remove('mn-tab--active');
        t.setAttribute('aria-selected', 'false');
    });
    rail.querySelector('[data-category="All"]').classList.add('mn-tab--active');
    rail.querySelector('[data-category="All"]').setAttribute('aria-selected', 'true');

    document.querySelectorAll('.mn-chip').forEach(c => c.classList.remove('mn-chip--active'));
    chips.querySelector('[data-chip="all"]').classList.add('mn-chip--active');

    sortSel.value = 'default';

    renderGrid();
});

// ── INIT ─────────────────────────────────────────────────────────────
renderGrid();
