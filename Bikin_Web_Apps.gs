/**
 * Aplikasi Pengingat Minum Obat
 * File: Bikin_Web_Apps.gs
 *
 * Catatan:
 * - File HTML yang dipanggil: Bikin_Web_App_html
 * - Pastikan spreadsheet memiliki sheet bernama: Sheet1
 * - Deploy disarankan:
 *   Execute as: Me
 *   Who has access: Only myself
 */

function doGet() {
  return HtmlService
    .createTemplateFromFile('Bikin_Web_App_html')
    .evaluate()
    .setTitle('Jadwal Obat')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function simpanData(data) {
  const SHEET_NAME = "Sheet1";

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error("Sheet1 tidak ditemukan.");
  }

  const namaObat = String(data.namaObat || "").trim();
  const jamTerakhir = String(data.jamTerakhir || "").trim();

  // Default durasi 8 jam, tetapi bisa custom sesuai angka yang diketik di form.
  let durasi = Number(data.durasi);

  if (!data.durasi) {
    durasi = 8;
  }

  const kirimGcal = String(data.kirimGcal || "N").trim();
  const guests = String(data.guests || "").trim();

  if (!namaObat) {
    throw new Error("Nama obat wajib diisi.");
  }

  if (!jamTerakhir) {
    throw new Error("Jam terakhir minum wajib diisi.");
  }

  if (isNaN(durasi) || durasi < 1) {
    throw new Error("Durasi harus berupa angka minimal 1 jam.");
  }

  const now = new Date();

  const jamParts = jamTerakhir.split(":");
  const tanggalObat = new Date();

  tanggalObat.setHours(
    Number(jamParts[0]),
    Number(jamParts[1]),
    0,
    0
  );

  // Jika jam terakhir lebih besar dari waktu sekarang,
  // dianggap jam tersebut adalah kemarin.
  // Contoh: sekarang jam 07:00, input terakhir minum 23:00,
  // maka 23:00 dianggap hari kemarin.
  if (tanggalObat > now) {
    tanggalObat.setDate(tanggalObat.getDate() - 1);
  }

  // Hitung jadwal berikutnya berdasarkan durasi.
  const jamBerikutnya = new Date(
    tanggalObat.getTime() + (durasi * 60 * 60 * 1000)
  );

  const jamBerikutnyaText = Utilities.formatDate(
    jamBerikutnya,
    Session.getScriptTimeZone(),
    "HH:mm"
  );

  const tanggalBerikutnyaText = Utilities.formatDate(
    jamBerikutnya,
    Session.getScriptTimeZone(),
    "dd/MM/yyyy"
  );

  const lastRow = sheet.getLastRow();

  // Nomor urut sederhana.
  // Jika baris pertama adalah header, data pertama akan bernomor 1.
  const nomor = Math.max(lastRow, 1);

  const rowData = [
    nomor,
    namaObat,
    jamTerakhir,
    jamBerikutnyaText,
    durasi,
    kirimGcal,
    guests,
    "AKTIF",
    now
  ];

  sheet.getRange(
    lastRow + 1,
    1,
    1,
    rowData.length
  ).setValues([rowData]);

  // Buat event Google Calendar jika pengguna memilih Ya.
  if (kirimGcal === "Y") {
    const calendar = CalendarApp.getDefaultCalendar();

    // Event dimulai tepat pada jadwal minum obat berikutnya.
    const startTime = new Date(jamBerikutnya);

    // Event berdurasi 15 menit.
    const endTime = new Date(
      jamBerikutnya.getTime() + (15 * 60 * 1000)
    );

    const event = calendar.createEvent(
      "💊 Minum Obat - " + namaObat,
      startTime,
      endTime,
      {
        description:
          "Nama Obat : " + namaObat +
          "\nJam Terakhir Minum : " + jamTerakhir +
          "\nJam Minum Berikutnya : " + jamBerikutnyaText +
          "\nTanggal Jadwal Berikutnya : " + tanggalBerikutnyaText +
          "\nDurasi : setiap " + durasi + " jam"
      }
    );

    // Hapus reminder bawaan agar tidak dobel.
    // Lalu buat reminder popup 30 menit sebelum jadwal minum.
    event.removeAllReminders();
    event.addPopupReminder(30);

    // Tambah guest jika email diisi.
    // Jika lebih dari satu email, pisahkan dengan koma.
    if (guests !== "") {
      const daftarGuest = guests
        .split(",")
        .map(function(email) {
          return email.trim();
        })
        .filter(function(email) {
          return email !== "";
        });

      daftarGuest.forEach(function(email) {
        event.addGuest(email);
      });
    }
  }

  return {
    status: "success",
    message:
      "Data berhasil disimpan. Jadwal berikutnya: " +
      tanggalBerikutnyaText +
      " pukul " +
      jamBerikutnyaText
  };
}
