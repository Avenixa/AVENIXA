    // ===== FILTER & SEARCH =====
    let activeFilter = 'semua';
    const filterBtns = document.querySelectorAll('.filter-btn');

    const cards = document.querySelectorAll('.b-card[data-tag]');
    const emptyState = document.getElementById('emptyState');

    function filterCards() {
        const q = document.getElementById('searchInput').value.toLowerCase().trim();
        let visible = 0;

        cards.forEach(card => {
            const matchTag = activeFilter === 'semua' || card.dataset.tag === activeFilter;
            const matchQuery = !q || (card.dataset.title && card.dataset.title.includes(q));
            const show = matchTag && matchQuery;

            if (show) {
                card.classList.remove('hidden');
                card.classList.add('visible');

                // reset animasi biar muncul terus setiap search
                card.classList.remove('search-animate');
                void card.offsetWidth;
                card.classList.add('search-animate');

                visible++; // <-- JANGAN LUPA INI
            } else {
                card.classList.remove('visible');
                card.classList.add('hidden');
            }
        });

        emptyState.style.display = visible === 0 ? 'block' : 'none';
    }
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            filterCards();
        });
    });

    // Search — realtime per huruf
    function doSearch() {
        filterCards();
    }
    document.getElementById('searchInput').addEventListener('input', () => {
        const searchValue = document.getElementById('searchInput').value.trim();

        // kalau user mulai mengetik
        if (searchValue !== '' && activeFilter !== 'semua') {

            // reset filter ke semua
            activeFilter = 'semua';

            // ubah tampilan tombol filter
            filterBtns.forEach(btn => {
                btn.classList.toggle(
                    'active',
                    btn.dataset.filter === 'semua'
                );
            });
        }

        filterCards();
    });
    document.getElementById('searchInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') filterCards();
    });

    // Back to top
    const btt = document.getElementById('backToTop');
    window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400));
    btt.addEventListener('click', () => window.scrollTo({
        top: 0,
        behavior: 'smooth'
    }));