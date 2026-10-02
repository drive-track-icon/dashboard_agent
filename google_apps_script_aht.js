/**
 * =====================================================================
 * GOOGLE APPS SCRIPT: INTEGRASI DATA AVERAGE HANDLING TIME (AHT)
 * Dashboard Agent CSO - Iconnet
 * =====================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Spreadsheet baru di browser Anda (https://sheets.new).
 * 2. Klik menu 'Ekstensi' (Extensions) > 'Apps Script'.
 * 3. Hapus semua kode default dan tempel seluruh isi script ini.
 * 4. Klik ikon Disket (Simpan / Ctrl+S).
 * 5. Klik tombol 'Deploy' (Terapkan) > 'New deployment' (Penerapan baru).
 * 6. Klik ikon gear di sebelah kiri 'Select type', pilih 'Web app'.
 * 7. Isi keterangan: 'Integrasi Dashboard AHT'.
 * 8. Atur 'Execute as' (Jalankan sebagai) -> 'Me' (Email Anda).
 * 9. Atur 'Who has access' (Siapa yang memiliki akses) -> 'Anyone' (Siapa saja).
 * 10. Klik 'Deploy', berikan izin akun (Authorize Access), lalu salin URL Web App yang muncul.
 * 11. Tempel URL Web App ke Pengaturan Google Spreadsheet di menu AHT Dashboard!
 * =====================================================================
 */

const SHEET_NAME = 'AHT_Data';
const HEADERS = [
  'ID AHT',
  'Tanggal Input',
  'Nama Petugas CSO',
  'Layanan CSO',
  'AHT Harian (Detik)',
  'Status Penanganan',
  'Catatan Kinerja',
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
    headerRange.setBackground('#10b981');
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
      return createJsonResponse({ success: true, message: 'Google Apps Script AHT siap terhubung!', time: new Date() });
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
      const actualSec = parseInt(r[4], 10) || 0;
      rows.push({
        id: String(r[0]),
        date: r[1] instanceof Date ? Utilities.formatDate(r[1], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(r[1]),
        userFullName: String(r[2] || ''),
        department: String(r[3] || ''),
        actualSeconds: actualSec,
        totalDurationSeconds: actualSec,
        interactionCount: 1,
        targetSeconds: 300,
        deviationSeconds: actualSec - 300,
        deviationText: actualSec <= 300 ? `-${Math.abs(actualSec - 300)} dtk (Cepat)` : `+${actualSec - 300} dtk (Over SLA)`,
        status: String(r[5] || (actualSec <= 300 ? 'Sesuai SLA' : 'Over SLA')),
        notes: String(r[6] || ''),
        createdAt: String(r[7] || '')
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
      const logs = payload.logs || [];
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      if (logs.length > 0) {
        const rowsToAppend = logs.map(l => [
          l.id,
          l.date,
          l.userFullName,
          l.department,
          parseInt(l.actualSeconds, 10) || 0,
          l.status || 'Sesuai SLA',
          l.notes || '-',
          l.createdAt || ''
        ]);
        sheet.getRange(2, 1, rowsToAppend.length, HEADERS.length).setValues(rowsToAppend);
      }
      return createJsonResponse({ success: true, message: 'Sync all AHT berhasil', count: logs.length });
    }

    if (action === 'save') {
      const l = payload.log;
      if (!l || !l.id) return createJsonResponse({ success: false, error: 'Data AHT tidak valid' });

      const data = sheet.getDataRange().getValues();
      let foundRow = -1;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(l.id)) {
          foundRow = i + 1;
          break;
        }
      }

      const rowData = [
        l.id,
        l.date,
        l.userFullName,
        l.department,
        parseInt(l.actualSeconds, 10) || 0,
        l.status || 'Sesuai SLA',
        l.notes || '-',
        l.createdAt || ''
      ];

      if (foundRow > 0) {
        sheet.getRange(foundRow, 1, 1, HEADERS.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
      return createJsonResponse({ success: true, message: 'Data AHT berhasil disimpan ke Google Sheets' });
    }

    if (action === 'delete') {
      const id = payload.id;
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(id)) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ success: true, message: 'Data AHT berhasil dihapus dari Google Sheets' });
        }
      }
      return createJsonResponse({ success: true, message: 'ID AHT tidak ditemukan di sheet' });
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
      return createJsonResponse({ success: true, message: 'Data AHT bulanan berhasil dibersihkan dari Google Sheets' });
    }

    if (action === 'delete_batch') {
      const ids = payload.ids || [];
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (ids.indexOf(String(data[i][0])) !== -1) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Batch baris AHT berhasil dihapus dari Google Sheets' });
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
