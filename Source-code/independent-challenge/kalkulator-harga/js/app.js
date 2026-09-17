'use strict';

const form = document.querySelector('#form-hitung');
const hargaInput = document.querySelector('#harga');
const jumlahInput = document.querySelector('#jumlah');
const anggotaInput = document.querySelector('#anggota');
const hasil = document.querySelector('#hasil');
const pesan = document.querySelector('#pesan');

function tampilkanPesan(teks) {
    pesan.textContent = teks;
}

function hitungDiskon(totalAwal, isAnggota) {
    let totalDiskon = 0;

    // Diskon berdasarkan total belanja
    if (totalAwal >= 200000) {
        totalDiskon += 20;
    } else if (totalAwal >= 100000) {
        totalDiskon += 10;
    }

    // Diskon anggota
    if (isAnggota) {
        totalDiskon += 5;
    }

    // Maksimal diskon 25%
    return Math.min(totalDiskon, 25);
}

function hitungTotalHarga(harga, jumlah, isAnggota) {
    const totalAwal = harga * jumlah;
    const persentaseDiskon = hitungDiskon(totalAwal, isAnggota);
    const potonganHarga = totalAwal * (persentaseDiskon / 100);
    return totalAwal - potonganHarga;
}

function prosesForm(event) {
    event.preventDefault();
    
    const harga = Number(hargaInput.value);
    const jumlah = Number(jumlahInput.value);
    const isAnggota = anggotaInput.checked;

    if (harga <= 0 || jumlah <= 0) {
        tampilkanPesan('Harga dan jumlah harus positif atau lebih dari 0.');
        hasil.textContent = '0';
        return;
    }

    const totalAkhir = hitungTotalHarga(harga, jumlah, isAnggota);
    
    hasil.textContent = totalAkhir.toLocaleString('id-ID');
    tampilkanPesan('Perhitungan berhasil diterapkan beserta diskon (jika ada).');
}

form.addEventListener('submit', prosesForm);
