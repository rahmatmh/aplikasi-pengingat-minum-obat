# aplikasi-pengingat-minum-obat
Aplikasi pengingat minum obat dihitung berdasarkan durasi tertentu dari terakhir minum obat. Berawal dari saya yang suka lupa minum Obat padahal diberi obat antibiotik dari drg. Rifqa Noor Hanifa, Sp.KG. dimana antibiotik itu harus diminum tiap 8 jam dan harus habis. 

# 💊 Web App Jadwal Minum Obat + Google Calendar

Aplikasi Web App berbasis Google Apps Script untuk mencatat jadwal minum obat dan otomatis membuat pengingat di Google Calendar.

FITUR

* Input Nama Obat / Resep Dokter
* Input Jam Terakhir Minum Obat
* Perhitungan otomatis Jam Minum Berikutnya 
* Simpan data ke Google Sheets
* Otomatis membuat Event Google Calendar
* Reminder 30 menit sebelum waktu minum obat
* Dukungan Guest Email (undangan Google Calendar)
* Mobile Friendly (responsive design)
* Dapat digunakan sebagai Web App di Android maupun iPhone

---

STRUKTUR FILE

Bikin_Web_App.gs

Bikin_Web_App_html.html

README.txt

---

STRUKTUR GOOGLE SHEET

Nama Sheet:

Sheet2

Header yang digunakan:

A = No

B = Nama Obat / Resep Dokter

C = Terakhir Minum Obat

D = Jam Minum Berikutnya

E = Durasi (Jam)

F = Kirim GCal

G = Add Guests

H = Status

I = Timestamp

Contoh:

1 | Paracetamol | 19:15 | 03:15 | 8 | Y | [email@gmail.com](mailto:email@gmail.com) | AKTIF | 15/06/2026

---

CARA INSTALL

1. Buat Google Spreadsheet

Buat spreadsheet baru dan buat sheet dengan nama:

Sheet2

2. Buka Apps Script

Extensions

→ Apps Script

3. Buat File

Buat dua file:

Bikin_Web_App.gs

Bikin_Web_App_html.html

Kemudian salin seluruh kode yang telah disediakan.

4. Berikan Izin

Saat pertama kali menjalankan Apps Script:

Run

→ Authorize

Berikan izin akses ke:

* Google Sheets
* Google Calendar

---

DEPLOY WEB APP

Pilih:

Deploy

→ New Deployment

→ Web App

Gunakan konfigurasi:

Execute As:
Me

Who Has Access:
Only myself

Jika ingin digunakan oleh beberapa akun Google:

Who Has Access:
Anyone with Google Account

Lalu klik:

Deploy

Salin URL Web App yang diberikan.

Contoh:

[https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec](https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec)

---

CARA KERJA

Contoh Input:

Nama Obat      : Paracetamol

Jam Terakhir   : 19:15

Durasi         : 8 Jam (default)

Perhitungan Sistem:

Jam Berikutnya = 03:15

Event Google Calendar:

Start Time = 02:45

End Time   = 03:15

Keterangan:

* Jam berikutnya dihitung otomatis berapa jam setelah jam terakhir minum obat. Defaultnya 8 jam. 
* Event kalender dimulai 30 menit sebelum jadwal minum berikutnya.
* Event selesai tepat pada jadwal minum berikutnya.
* Popup reminder dikirim 30 menit sebelumnya.

---

KEAMANAN

Disarankan menggunakan:

Who Has Access:
Only myself

untuk penggunaan pribadi.

Jika Web App dibuka untuk publik, pengguna lain yang memiliki akses dapat:

* Menambahkan data ke spreadsheet
* Membuat event kalender
* Mengirim undangan ke email lain

Untuk penggunaan publik disarankan menambahkan:

* Password akses
* Validasi email pengguna
* Rate limiting
* Logging aktivitas

---

MENAMBAHKAN KE HOME SCREEN ANDROID

1. Buka URL Web App di Chrome.

2. Klik menu tiga titik (⋮).

3. Pilih:

Add to Home Screen

4. Beri nama:

💊 Jadwal Obat

5. Klik Add.

Aplikasi akan muncul seperti aplikasi biasa di layar utama Android.

---

PENGEMBANGAN SELANJUTNYA

Fitur yang dapat ditambahkan:

* Jadwal berulang otomatis sampai obat habis
* Dashboard riwayat obat
* Edit data
* Hapus data
* Multi-user login
* Notifikasi WhatsApp
* Notifikasi Telegram
* Reminder Email otomatis

---

LISENSI

Digunakan untuk kebutuhan pribadi, keluarga, dan edukasi.

Dibangun menggunakan:

* Google Apps Script
* Google Sheets
* Google Calendar Service
* HTML + CSS + JavaScript

Versi: 1.0

Tanggal: Juni 2026

Nama Project: Web App Jadwal Minum Obat + Google Calendar 🚀💊
