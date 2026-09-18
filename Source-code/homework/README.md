# Interactive Profile Card

## Cara Menjalankan Server Lokal (Local Server)
Proyek ini menggunakan Fetch API untuk memuat file JSON lokal (`data/profile.json`). Karena kebijakan keamanan browser (CORS), Anda tidak dapat membukanya hanya dengan double-click `index.html` di beberapa browser seperti Chrome. Anda perlu menjalankannya melalui server lokal.

### Opsi 1: Menggunakan Ekstensi "Live Server" di VS Code (Rekomendasi)
1. Buka folder `homework` ini di Visual Studio Code.
2. Pastikan Anda telah menginstal ekstensi **Live Server** (oleh Ritwick Dey).
3. Klik kanan pada file `index.html` dan pilih **"Open with Live Server"**.
4. Browser akan otomatis terbuka dan menampilkan aplikasi.

### Opsi 2: Menggunakan Node.js (npx)
Jika Anda sudah menginstal Node.js:
1. Buka terminal/command prompt di dalam folder `homework` ini.
2. Jalankan perintah berikut:
   ```bash
   npx serve .
   ```
3. Buka URL yang diberikan di terminal (biasanya `http://localhost:3000`) di browser Anda.

### Opsi 3: Menggunakan Python
Jika Anda memiliki Python terinstal:
1. Buka terminal/command prompt di folder `homework`.
2. Jalankan perintah (untuk Python 3):
   ```bash
   python -m http.server 8000
   ```
3. Buka browser dan navigasikan ke `http://localhost:8000`.
