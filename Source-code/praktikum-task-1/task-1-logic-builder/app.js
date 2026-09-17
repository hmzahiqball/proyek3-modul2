'use strict';

function validasiNilai(nilai) {
    // return true hanya untuk number finite pada 0–100.
    return typeof nilai === 'number' && Number.isFinite(nilai) && nilai >= 0 && nilai <= 100;
}

function tentukanKategori(nilai) {
    // tangani nilai tidak valid, lalu kembalikan A/B/C/D.
    if (!validasiNilai(nilai)) return null;
    
    if (nilai >= 85) return 'A';
    if (nilai >= 70) return 'B';
    if (nilai >= 60) return 'C';
    return 'D';
}

function tentukanStatus(nilai) {
    // kembalikan Data tidak valid, Lulus, atau Tidak lulus.
    if (!validasiNilai(nilai)) return 'Data tidak valid';
    
    if (nilai >= 60) return 'Lulus';
    return 'Tidak lulus';
}

function buatRingkasan(nama, nilai) {
    // return object berisi nama, nilai, kategori, dan status.
    return {
        nama: nama,
        nilai: nilai,
        kategori: tentukanKategori(nilai),
        status: tentukanStatus(nilai)
    };
}

const kasusUji = [
    { nama: 'Alya', nilai: 0 },
    { nama: 'Bima', nilai: 59 },
    { nama: 'Citra', nilai: 60 },
    { nama: 'Danu', nilai: 69 },
    { nama: 'Eka', nilai: 70 },
    { nama: 'Fani', nilai: 85 },
    { nama: 'Gilang', nilai: 101 },
    // Tambahan kasus uji: nilai 84 dan teks '80'
    { nama: 'Hana', nilai: 84 },
    { nama: 'Iqbal', nilai: '80' }
];

const hasilUji = kasusUji.map(({ nama, nilai }) =>
    buatRingkasan(nama, nilai)
);

console.table(hasilUji);
