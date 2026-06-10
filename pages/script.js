    // Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.b-card');
    const emptyState = document.getElementById('emptyState');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            let anyVisible = false;
            cards.forEach(card => {
                if (filter === 'semua' || card.dataset.tag === filter) {
                    card.style.display = '';
                    anyVisible = true;
                } else {
                    card.style.display = 'none';
                }
            });
            emptyState.style.display = anyVisible ? 'none' : 'block';
        });
    });

    // Search
    function doSearch() {
        const q = document.getElementById('searchInput').value.toLowerCase().trim();
        if (!q) {
            cards.forEach(c => c.style.display = '');
            emptyState.style.display = 'none';
            filterBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-filter="semua"]').classList.add('active');
            return;
        }
        let anyVisible = false;
        cards.forEach(card => {
            if (card.dataset.title && card.dataset.title.includes(q)) {
                card.style.display = '';
                anyVisible = true;
            } else {
                card.style.display = 'none';
            }
        });
        emptyState.style.display = anyVisible ? 'none' : 'block';
    }

    document.getElementById('searchInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') doSearch();
    });

    // Back to top
    const btt = document.getElementById('backToTop');
    window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400));
    btt.addEventListener('click', () => window.scrollTo({
        top: 0,
        behavior: 'smooth'
    }));