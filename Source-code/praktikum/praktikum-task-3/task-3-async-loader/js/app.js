'use strict';
const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');

function aturState(state, pesan) {
    status.dataset.state = state;
    status.textContent = pesan;
    tombolCobaLagi.hidden = state !== 'error';
}

async function ambilMateri() {
    const response = await fetch('data/materi.json');
    if (!response.ok) {
        throw new Error(`HTTP Error: Status ${response.status} ${response.statusText}`);
    }
    return await response.json();
}

function renderMateri(data) {
    daftar.replaceChildren(); // kosongkan daftar
    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const article = document.createElement('article');
        article.classList.add('kartu');

        const h2 = document.createElement('h2');
        h2.textContent = item.judul;

        const p = document.createElement('p');
        p.textContent = `Durasi: ${item.durasi} menit`;

        article.appendChild(h2);
        article.appendChild(p);
        fragment.appendChild(article);
    });

    daftar.appendChild(fragment);
}

async function muatData() {
    aturState('loading', 'Memuat data...');
    tombolMuat.disabled = true;
    daftar.replaceChildren(); // kosongkan DOM UI

    try {
        const data = await ambilMateri();
        if (data.length === 0) {
            aturState('empty', 'Tidak ada data materi (kosong).');
        } else {
            renderMateri(data);
            aturState('success', 'Data materi berhasil dimuat.');
        }
    } catch (error) {
        console.error("Terjadi error saat mengambil data:", error);
        aturState('error', 'Gagal memuat data. Silakan periksa koneksi atau console untuk detailnya.');
    } finally {
        tombolMuat.disabled = false;
    }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);
