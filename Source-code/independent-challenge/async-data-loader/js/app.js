'use strict';

const btnLoad = document.getElementById('btn-load');
const emptyState = document.getElementById('empty-state');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const quoteText = document.getElementById('quote-text');

// State control function
function showState(state) {
    emptyState.classList.add('hidden');
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    quoteText.classList.add('hidden');

    if (state === 'empty') emptyState.classList.remove('hidden');
    if (state === 'loading') loadingState.classList.remove('hidden');
    if (state === 'error') errorState.classList.remove('hidden');
    if (state === 'success') quoteText.classList.remove('hidden');
}

// Random delay between min and max (inclusive)
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to fetch data with a simulated delay and failure chance
function fetchQuotes() {
    return new Promise((resolve, reject) => {
        const delay = getRandomDelay(500, 1500);
        
        setTimeout(() => {
            // Simulasi kegagalan 30%
            const isFailed = Math.random() < 0.3;
            if (isFailed) {
                reject(new Error("Simulasi gagal (30% peluang)."));
                return;
            }

            fetch('data/quotes.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        }, delay);
    });
}

// Event handler
async function handleLoadData() {
    // Cegah klik berulang (Disable button)
    btnLoad.disabled = true;
    btnLoad.textContent = "Memuat...";
    showState('loading');

    try {
        const quotes = await fetchQuotes();
        
        // Cek jika data kosong
        if (!quotes || quotes.length === 0) {
            showState('empty');
            emptyState.textContent = "Data kosong.";
        } else {
            // Pilih acak satu item
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const selectedQuote = quotes[randomIndex];
            
            // Tampilkan menggunakan textContent
            quoteText.textContent = `"${selectedQuote}"`;
            showState('success');
        }
    } catch (error) {
        console.error("Terjadi error:", error);
        showState('error');
    } finally {
        // Mengaktifkan kembali tombol dan reset teksnya
        btnLoad.disabled = false;
        btnLoad.textContent = errorState.classList.contains('hidden') ? "Muat Data Lain" : "Coba Lagi";
    }
}

// Setup event listener
btnLoad.addEventListener('click', handleLoadData);
