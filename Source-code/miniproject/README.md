# Mini Project - Landing Page Interaktif

Proyek ini adalah implementasi *Landing Page Interaktif* sesuai dengan kebutuhan Mini Project Modul 2.

## Fitur Minimal yang Tersedia:
1. **Navigasi Mobile**: Toggle menu navigasi (hamburger button) khusus untuk layar *mobile*.
2. **Daftar Fitur Dinamis**: Fitur-fitur/layanan dirender menggunakan vanilla JavaScript dari sumber *array of objects*.
3. **Filter Sederhana**: Tombol filter ("Semua", "Web", "Mobile", "Desain") untuk menyaring daftar layanan, beserta penanganan kondisi kosong (*empty state*).
4. **FAQ Accordion**: Komponen *accordion* pada bagian tanya jawab, dengan fungsionalitas dan pembaruan atribut aksesibilitas `aria-expanded`.
5. **Form Kontak dengan Validasi**: Validasi input (cek field kosong dan format email valid). Menampilkan *error message* atau pesan sukses (simulasi).
6. **Tombol "Back to Top"**: Tombol ini hanya muncul setelah *scroll* ke bawah dan saat diklik akan menggeser layar kembali ke paling atas dengan efek *smooth*.
7. **Tema Visual (Dark/Light)**: Toggle *class-based* pada tag `<body>` untuk beralih antara tema terang dan gelap.

## Batas Teknis:
- Hanya menggunakan HTML, CSS, dan Vanilla JavaScript (tanpa framework/library).
- File JavaScript dimuat secara eksternal dengan *defer*.
- Interaksi murni berbasis Vanilla JS event listeners.
- **Tidak** menggunakan `innerHTML` dengan input dari pengguna demi keamanan (mencegah XSS). Elemen dirender menggunakan kombinasi `document.createElement` dan `textContent`.
- Semua interaksi (*Toggle, Filter, FAQ*) mendukung aksesibilitas (*keyboard accessible* - dapat ditekan menggunakan tombol 'Enter' atau 'Spasi').

## Cara Menjalankan
Cukup buka file `index.html` menggunakan browser modern pilihan Anda, atau Anda juga bisa menggunakan **Live Server** di VS Code jika ingin melihat hasilnya dalam bentuk *local server*. Tidak ada dependensi server atau *build tools* yang dibutuhkan.
