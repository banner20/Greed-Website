// nav.js — shared navigation: sliding green pill + page fade transitions

(function () {
    /* ── Page fade-in on load ─────────────────────────────────────── */
    // The CSS already animates .page-entering in.
    // We intercept all internal links to fade out before navigating.

    function navigate(href) {
        document.body.classList.add('page-exit');
        // Wait for fade-out, then navigate
        setTimeout(() => {
            window.location.href = href;
        }, 380);
    }

    // Intercept link clicks that are internal page navigations
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Skip external, hash, mailto, tel links
        if (
            href.startsWith('http') ||
            href.startsWith('//') ||
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:')
        ) return;

        e.preventDefault();
        navigate(href);
    });

    /* ── Sliding green nav pill ──────────────────────────────────── */
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;

    // Inject the pill element
    const pill = document.createElement('span');
    pill.className = 'nav-pill';
    navContainer.appendChild(pill);

    // Ensure container is a positioning parent
    navContainer.style.position = 'relative';
    navContainer.style.overflow = 'visible';

    const items = Array.from(navContainer.querySelectorAll('.nav-item'));

    // Determine active item from current URL
    function getActiveItem() {
        const path = window.location.pathname.replace(/\/+$/, '') || '/';
        // Exact or starts-with match for multi-page site
        let best = null;
        let bestLen = 0;
        items.forEach(item => {
            const href = (item.getAttribute('href') || '').replace(/\/+$/, '') || '/';
            if (path === href || (href !== '/' && path.startsWith(href))) {
                if (href.length > bestLen) { best = item; bestLen = href.length; }
            }
        });
        // Fallback: HOME for root
        if (!best) best = items.find(i => (i.getAttribute('href') || '') === '/') || items[0];
        return best;
    }

    // Position pill over a nav item (instantly or with slide)
    function pillTo(target, animate) {
        const cRect = navContainer.getBoundingClientRect();
        const tRect = target.getBoundingClientRect();
        const left = tRect.left - cRect.left;
        const width = tRect.width;
        const top = tRect.top - cRect.top;
        const height = tRect.height;

        pill.style.transition = animate
            ? 'left 0.38s cubic-bezier(0.22, 1, 0.36, 1), width 0.38s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease'
            : 'none';

        pill.style.left = left + 'px';
        pill.style.width = width + 'px';
        pill.style.top = top + 'px';
        pill.style.height = height + 'px';
        pill.style.opacity = '1';
    }

    // Set initial position after layout is ready
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const active = getActiveItem();
            if (active) {
                pillTo(active, false);
                // Mark active item for text color contrast
                items.forEach(i => i.classList.remove('nav-active'));
                active.classList.add('nav-active');
            }

            // Remove static `.home` styling — pill handles it now
            items.forEach(i => i.classList.remove('home'));
        });
    });

    // Hover: slide to hovered item
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            pillTo(item, true);
            items.forEach(i => i.classList.remove('nav-active'));
            item.classList.add('nav-active');
        });
    });

    // Mouse leaves nav: return to active
    navContainer.addEventListener('mouseleave', () => {
        const active = getActiveItem();
        if (active) {
            pillTo(active, true);
            items.forEach(i => i.classList.remove('nav-active'));
            active.classList.add('nav-active');
        }
    });

    /* ── Mobile Hamburger Menu ───────────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when an item is clicked
        const navItemsList = navMenu.querySelectorAll('.nav-item');
        navItemsList.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ── Sticky Navbar Background on Scroll ──────────────────────── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Initial check on load
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    }
})();
