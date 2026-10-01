const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- TEST 1: Verifying Local SheetJS Library ---');
const xlsxPath = path.join(__dirname, '..', 'js', 'xlsx.full.min.js');
assert(fs.existsSync(xlsxPath), 'js/xlsx.full.min.js must exist locally');
const XLSX = require(xlsxPath);
assert(typeof XLSX.utils === 'object', 'XLSX.utils should be available');
assert(typeof XLSX.utils.book_new === 'function', 'XLSX.utils.book_new must be a function');
assert(typeof XLSX.utils.aoa_to_sheet === 'function', 'XLSX.utils.aoa_to_sheet must be a function');
assert(typeof XLSX.write === 'function', 'XLSX.write must be a function');
console.log('✔ Local SheetJS loaded and verified successfully.');

console.log('--- TEST 2: Verifying HTML Integration ---');
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert(htmlContent.includes('src="js/xlsx.full.min.js"'), 'index.html must load js/xlsx.full.min.js');
assert(htmlContent.includes('id="btnExportCaExcel"'), 'index.html must contain #btnExportCaExcel');
assert(htmlContent.includes('id="btnExportTiketExcel"'), 'index.html must contain #btnExportTiketExcel');
console.log('✔ HTML elements and script tag verified.');

console.log('--- TEST 3: Verifying CSS Styling ---');
const cssContent = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');
assert(cssContent.includes('.btn-outline-green'), 'css/style.css must have .btn-outline-green definition');
console.log('✔ CSS styles verified.');

console.log('--- TEST 4: Verifying app.js Bindings & Functions ---');
const appJsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
assert(appJsContent.includes('btnExportCaExcel: document.getElementById(\'btnExportCaExcel\')'), 'UI cache must include btnExportCaExcel');
assert(appJsContent.includes('btnExportTiketExcel: document.getElementById(\'btnExportTiketExcel\')'), 'UI cache must include btnExportTiketExcel');
assert(appJsContent.includes('function exportCaExcel()'), 'exportCaExcel function must be defined');
assert(appJsContent.includes('function exportTiketExcel()'), 'exportTiketExcel function must be defined');
assert(appJsContent.includes('UI.btnExportCaExcel.addEventListener(\'click\', exportCaExcel)'), 'btnExportCaExcel listener must be bound');
assert(appJsContent.includes('UI.btnExportTiketExcel.addEventListener(\'click\', exportTiketExcel)'), 'btnExportTiketExcel listener must be bound');
console.log('✔ app.js bindings and functions verified.');

console.log('--- TEST 5: Simulating CA Workbook Generation ---');
const caWb = XLSX.utils.book_new();
const caSheet1Data = [
  ['No', 'ID Evaluasi', 'Tanggal Evaluasi', 'Nama Petugas CSO', 'Layanan CSO', 'Channel Interaksi', 'Skor Nilai CA', 'Kategori Mutu', 'Parameter Fokus Evaluasi', 'Status', 'Catatan Evaluasi'],
  [1, 'CA-20260901-001', '2026-09-01', 'Budi Santoso', 'CSO INBOUND', 'Voice Inbound', 96.5, 'Sangat Baik', 'Greeting & Attentiveness', 'Terverifikasi', 'Penanganan ramah dan tepat standar.']
];
const caSheet2Data = [
  ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Dinilai', 'Rata-rata Skor', 'Predikat Mutu', 'Skor Terendah', 'Skor Tertinggi', 'Status Kelulusan'],
  [1, 'Budi Santoso', 'CSO INBOUND', 1, 96.5, 'Sangat Baik', 96.5, 96.5, 'Lulus Passing Grade']
];
const caWs1 = XLSX.utils.aoa_to_sheet(caSheet1Data);
const caWs2 = XLSX.utils.aoa_to_sheet(caSheet2Data);
XLSX.utils.book_append_sheet(caWb, caWs1, 'Log Harian CA');
XLSX.utils.book_append_sheet(caWb, caWs2, 'Rekapitulasi Agent');
const caBuffer = XLSX.write(caWb, { type: 'buffer', bookType: 'xlsx' });
assert(caBuffer && caBuffer.length > 0, 'Generated CA Excel buffer should be non-empty');
console.log(`✔ CA Workbook generated successfully (size: ${caBuffer.length} bytes).`);

console.log('--- TEST 6: Simulating Tiket Workbook Generation ---');
const tiketWb = XLSX.utils.book_new();
const tiketSheet1Data = [
  ['No', 'ID Tiket', 'Tanggal Input', 'Nama Petugas CSO', 'Layanan CSO', 'Kategori Tiket', 'Jumlah Tiket Harian', 'Tiket Terselesaikan', 'Kepatuhan SLA (%)', 'Catatan Kinerja'],
  [1, 'TIK-20260901-001', '2026-09-01', 'Siti Rahma', 'CSO EMAIL', 'Gangguan Jaringan', 62, 60, 96.8, 'Performa harian stabil']
];
const tiketSheet2Data = [
  ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Kerja Input', 'Total Tiket Diperoleh', 'Rata-rata Tiket / Hari', 'Target Bulanan', 'Persentase Capaian (%)', 'Status Target'],
  [1, 'Siti Rahma', 'CSO EMAIL', 1, 62, 62, 1320, '4.7%', 'Belum Mencapai Target']
];
const tiketWs1 = XLSX.utils.aoa_to_sheet(tiketSheet1Data);
const tiketWs2 = XLSX.utils.aoa_to_sheet(tiketSheet2Data);
XLSX.utils.book_append_sheet(tiketWb, tiketWs1, 'Log Tiket Harian');
XLSX.utils.book_append_sheet(tiketWb, tiketWs2, 'Rekapitulasi Target Bulanan');
const tiketBuffer = XLSX.write(tiketWb, { type: 'buffer', bookType: 'xlsx' });
assert(tiketBuffer && tiketBuffer.length > 0, 'Generated Tiket Excel buffer should be non-empty');
console.log(`✔ Tiket Workbook generated successfully (size: ${tiketBuffer.length} bytes).`);

console.log('\n========================================');
console.log('🎉 ALL EXCEL EXPORT TESTS PASSED!');
console.log('========================================');
