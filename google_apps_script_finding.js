/**
 * =====================================================================
 * GOOGLE APPS SCRIPT: INTEGRASI DATA TEMUAN AUDIT QA (FINDING)
 * Dashboard Agent CSO - Iconnet
 * =====================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Spreadsheet baru di browser Anda (https://sheets.new).
 * 2. Klik menu 'Ekstensi' (Extensions) > 'Apps Script'.
 * 3. Hapus semua kode default dan tempel seluruh isi script ini.
 * 4. Klik ikon Disket (Simpan / Ctrl+S).
 * 5. Klik tombol 'Deploy' (Terapkan) > 'New deployment' (Penerapan baru).
 * 6. Klik ikon gear di sebelah kiri 'Select type', pilih 'Web app'.
 * 7. Isi keterangan: 'Integrasi Dashboard Finding'.
 * 8. Atur 'Execute as' (Jalankan sebagai) -> 'Me' (Email Anda).
 * 9. Atur 'Who has access' (Siapa yang memiliki akses) -> 'Anyone' (Siapa saja).
 * 10. Klik 'Deploy', berikan izin akun (Authorize Access), lalu salin URL Web App yang muncul.
 * 11. Tempel URL Web App ke Pengaturan Google Spreadsheet di menu Finding Dashboard!
 * =====================================================================
 */

const SHEET_NAME = 'Finding_Data';
const HEADERS = [
  'ID Temuan',
  'Tanggal',
  'Nama Petugas CSO',
  'Layanan CSO',
  'Jenis',
  'Kategori Temuan',
  'Tingkat Deviasi',
  'Rincian Kendala / Kasus',
  'Komitmen',
  'Action Plan',
  'Status Tindak Lanjut',
  'Waktu Dibuat'
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  // Cek apakah header sudah ada
  if (sheet.getLastRow() < 1) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#ef4444');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    for (let c = 1; c <= HEADERS.length; c++) {
      sheet.autoResizeColumn(c);
    }
  }
  return sheet;
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'get_all';
    if (action === 'ping') {
      return createJsonResponse({ success: true, message: 'Google Apps Script Finding siap terhubung!', time: new Date() });
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse({ success: true, count: 0, data: [] });
    }

    const rows = [];
    for (let i = 1; i < data.length; i++) {
      const r = data[i];
      if (!r[0]) continue;
      rows.push({
        id: String(r[0] || ''),
        date: r[1] instanceof Date ? Utilities.formatDate(r[1], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(r[1] || ''),
        userFullName: String(r[2] || ''),
        department: String(r[3] || 'CSO INBOUND'),
        findingType: String(r[4] || 'Feedback Negatif'),
        category: String(r[5] || 'Informasi'),
        deviationLevel: String(r[6] || 'Reminder 1'),
        desc: String(r[7] || ''),
        commitment: String(r[8] || '-'),
        actionPlan: String(r[9] || ''),
        status: String(r[10] || 'Open'),
        createdAt: String(r[11] || '')
      });
    }

    return createJsonResponse({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    let payload;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    } else {
      payload = {};
    }

    const action = payload.action || 'sync_all';
    const sheet = getOrCreateSheet();

    if (action === 'sync_all') {
      const findings = payload.findings || payload.logs || [];
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      if (findings.length > 0) {
        const rowsToAppend = findings.map(f => [
          f.id || '',
          f.date || '',
          f.userFullName || '',
          f.department || 'CSO INBOUND',
          f.findingType || 'Feedback Negatif',
          f.category || 'Informasi',
          f.deviationLevel || 'Reminder 1',
          f.desc || '',
          f.commitment || '-',
          f.actionPlan || '',
          f.status || 'Open',
          f.createdAt || new Date().toISOString()
        ]);
        sheet.getRange(2, 1, rowsToAppend.length, HEADERS.length).setValues(rowsToAppend);
      }
      return createJsonResponse({ success: true, message: 'Sync all Finding berhasil', count: findings.length });
    }

    if (action === 'save') {
      const f = payload.finding || payload.log;
      if (!f || !f.id) return createJsonResponse({ success: false, error: 'Data Finding tidak valid' });

      const data = sheet.getDataRange().getValues();
      let foundRow = -1;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(f.id)) {
          foundRow = i + 1;
          break;
        }
      }

      const rowData = [
        f.id || '',
        f.date || '',
        f.userFullName || '',
        f.department || 'CSO INBOUND',
        f.findingType || 'Feedback Negatif',
        f.category || 'Informasi',
        f.deviationLevel || 'Reminder 1',
        f.desc || '',
        f.commitment || '-',
        f.actionPlan || '',
        f.status || 'Open',
        f.createdAt || new Date().toISOString()
      ];

      if (foundRow > 0) {
        sheet.getRange(foundRow, 1, 1, HEADERS.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
      return createJsonResponse({ success: true, message: 'Data Finding berhasil disimpan ke Google Sheets' });
    }

    if (action === 'delete') {
      const id = payload.id;
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(id)) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ success: true, message: 'Data Finding berhasil dihapus dari Google Sheets' });
        }
      }
      return createJsonResponse({ success: true, message: 'ID Finding tidak ditemukan di sheet' });
    }

    if (action === 'delete_month') {
      const month = payload.month;
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        const rowDate = String(data[i][1]);
        if (rowDate.indexOf(month) === 0) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Data Finding bulanan berhasil dibersihkan dari Google Sheets' });
    }

    if (action === 'delete_batch') {
      const ids = payload.ids || [];
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (ids.indexOf(String(data[i][0])) !== -1) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Batch baris Finding berhasil dihapus dari Google Sheets' });
    }

    return createJsonResponse({ success: false, error: 'Aksi tidak dikenal: ' + action });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
