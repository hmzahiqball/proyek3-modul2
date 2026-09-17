'use strict';

const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Simpan status terkini dari tombol yang diklik
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        // 1. Tutup semua accordion (pastikan hanya satu yang terbuka)
        accordionButtons.forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
            
            const targetId = btn.getAttribute('aria-controls');
            const content = document.getElementById(targetId);
            
            content.classList.remove('show');
            content.classList.add('collapse');
        });

        // 2. Jika tombol yang diklik sebelumnya tertutup, maka buka
        if (!isExpanded) {
            this.setAttribute('aria-expanded', 'true');
            
            const targetId = this.getAttribute('aria-controls');
            const content = document.getElementById(targetId);
            
            content.classList.remove('collapse');
            content.classList.add('show');
        }
    });
});
