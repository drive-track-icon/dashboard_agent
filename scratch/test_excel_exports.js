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

console.log('--- TEST 2: Verifying HTML Integration for All Excel Export Buttons ---');
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert(htmlContent.includes('src="js/xlsx.full.min.js"'), 'index.html must load js/xlsx.full.min.js');
assert(htmlContent.includes('id="btnExportCaExcel"'), 'index.html must contain #btnExportCaExcel');
assert(htmlContent.includes('id="btnExportTiketExcel"'), 'index.html must contain #btnExportTiketExcel');
assert(htmlContent.includes('id="btnExportAhtExcel"'), 'index.html must contain #btnExportAhtExcel');
assert(htmlContent.includes('id="btnExportArtExcel"'), 'index.html must contain #btnExportArtExcel');
assert(htmlContent.includes('id="btnExportFindingExcel"'), 'index.html must contain #btnExportFindingExcel');
console.log('✔ HTML elements and script tag verified for all modules (CA, Tiket, AHT, ART, Finding).');

console.log('--- TEST 3: Verifying CSS Styling ---');
const cssContent = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');
assert(cssContent.includes('.btn-outline-green'), 'css/style.css must have .btn-outline-green definition');
console.log('✔ CSS styles verified.');

console.log('--- TEST 4: Verifying app.js Bindings & Functions ---');
const appJsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
assert(appJsContent.includes('btnExportCaExcel: document.getElementById(\'btnExportCaExcel\')'), 'UI cache must include btnExportCaExcel');
assert(appJsContent.includes('btnExportTiketExcel: document.getElementById(\'btnExportTiketExcel\')'), 'UI cache must include btnExportTiketExcel');
assert(appJsContent.includes('btnExportAhtExcel: document.getElementById(\'btnExportAhtExcel\')'), 'UI cache must include btnExportAhtExcel');
assert(appJsContent.includes('btnExportArtExcel: document.getElementById(\'btnExportArtExcel\')'), 'UI cache must include btnExportArtExcel');
assert(appJsContent.includes('btnExportFindingExcel: document.getElementById(\'btnExportFindingExcel\')'), 'UI cache must include btnExportFindingExcel');

assert(appJsContent.includes('function exportCaExcel()'), 'exportCaExcel function must be defined');
assert(appJsContent.includes('function exportTiketExcel()'), 'exportTiketExcel function must be defined');
assert(appJsContent.includes('function exportAhtExcel()'), 'exportAhtExcel function must be defined');
assert(appJsContent.includes('function exportArtExcel()'), 'exportArtExcel function must be defined');
assert(appJsContent.includes('function exportFindingExcel()'), 'exportFindingExcel function must be defined');

assert(appJsContent.includes('UI.btnExportCaExcel.addEventListener(\'click\', exportCaExcel)'), 'btnExportCaExcel listener must be bound');
assert(appJsContent.includes('UI.btnExportTiketExcel.addEventListener(\'click\', exportTiketExcel)'), 'btnExportTiketExcel listener must be bound');
assert(appJsContent.includes('UI.btnExportAhtExcel.addEventListener(\'click\', exportAhtExcel)'), 'btnExportAhtExcel listener must be bound');
assert(appJsContent.includes('UI.btnExportArtExcel.addEventListener(\'click\', exportArtExcel)'), 'btnExportArtExcel listener must be bound');
assert(appJsContent.includes('UI.btnExportFindingExcel.addEventListener(\'click\', exportFindingExcel)'), 'btnExportFindingExcel listener must be bound');
console.log('✔ app.js bindings and functions verified for all modules.');

console.log('--- TEST 5: Simulating CA Workbook Generation ---');
const caWb = XLSX.utils.book_new();
const caWs1 = XLSX.utils.aoa_to_sheet([
  ['No', 'ID Evaluasi', 'Tanggal Evaluasi', 'Nama Petugas CSO', 'Layanan CSO', 'Channel Interaksi', 'Skor Nilai CA', 'Kategori Mutu', 'Parameter Fokus Evaluasi', 'Status', 'Catatan Evaluasi'],
  [1, 'CA-20260901-001', '2026-09-01', 'Budi Santoso', 'CSO INBOUND', 'Voice Inbound', 96.5, 'Sangat Baik', 'Greeting & Attentiveness', 'Terverifikasi', 'Penanganan ramah dan tepat standar.']
]);
const caWs2 = XLSX.utils.aoa_to_sheet([
  ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Dinilai', 'Rata-rata Skor', 'Predikat Mutu', 'Skor Terendah', 'Skor Tertinggi', 'Status Kelulusan'],
  [1, 'Budi Santoso', 'CSO INBOUND', 1, 96.5, 'Sangat Baik', 96.5, 96.5, 'Lulus Passing Grade']
]);
XLSX.utils.book_append_sheet(caWb, caWs1, 'Log Harian CA');
XLSX.utils.book_append_sheet(caWb, caWs2, 'Rekapitulasi Agent');
const caBuffer = XLSX.write(caWb, { type: 'buffer', bookType: 'xlsx' });
assert(caBuffer && caBuffer.length > 0, 'Generated CA Excel buffer should be non-empty');
console.log(`✔ CA Workbook generated successfully (${caBuffer.length} bytes).`);

console.log('--- TEST 6: Simulating Tiket Workbook Generation ---');
const tiketWb = XLSX.utils.book_new();
const tiketWs1 = XLSX.utils.aoa_to_sheet([
  ['No', 'ID Tiket', 'Tanggal Input', 'Nama Petugas CSO', 'Layanan CSO', 'Kategori Tiket', 'Jumlah Tiket Harian', 'Tiket Terselesaikan', 'Kepatuhan SLA (%)', 'Catatan Kinerja'],
  [1, 'TIK-20260901-001', '2026-09-01', 'Siti Rahma', 'CSO EMAIL', 'Gangguan Jaringan', 62, 60, 96.8, 'Performa harian stabil']
]);
const tiketWs2 = XLSX.utils.aoa_to_sheet([
  ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Kerja Input', 'Total Tiket Diperoleh', 'Rata-rata Tiket / Hari', 'Target Bulanan', 'Persentase Capaian (%)', 'Status Target'],
  [1, 'Siti Rahma', 'CSO EMAIL', 1, 62, 62, 1320, '4.7%', 'Belum Mencapai Target']
]);
XLSX.utils.book_append_sheet(tiketWb, tiketWs1, 'Log Tiket Harian');
XLSX.utils.book_append_sheet(tiketWb, tiketWs2, 'Rekapitulasi Target Bulanan');
const tiketBuffer = XLSX.write(tiketWb, { type: 'buffer', bookType: 'xlsx' });
assert(tiketBuffer && tiketBuffer.length > 0, 'Generated Tiket Excel buffer should be non-empty');
console.log(`✔ Tiket Workbook generated successfully (${tiketBuffer.length} bytes).`);

console.log('--- TEST 7: Simulating AHT Workbook Generation ---');
const ahtWb = XLSX.utils.book_new();
const ahtWs1 = XLSX.utils.aoa_to_sheet([
  ['No', 'ID Log AHT', 'Tanggal Input', 'Nama Petugas CSO', 'Layanan CSO', 'AHT Harian (Detik)', 'Target SLA (Detik)', 'Status SLA', 'Catatan Kinerja Harian'],
  [1, 'AHT-20260901-001', '2026-09-01', 'Ahmad Fauzi', 'CSO INBOUND', 245, 300, 'Sesuai SLA', 'Penanganan interaksi tepat waktu']
]);
const ahtWs2 = XLSX.utils.aoa_to_sheet([
  ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Kerja Input', 'Rata-rata AHT (Detik)', 'Target Standar SLA (Detik)', 'Status Kepatuhan SLA'],
  [1, 'Ahmad Fauzi', 'CSO INBOUND', 22, 248, 300, 'Sesuai SLA (< 300s)']
]);
XLSX.utils.book_append_sheet(ahtWb, ahtWs1, 'Log Harian AHT');
XLSX.utils.book_append_sheet(ahtWb, ahtWs2, 'Rekapitulasi Bulanan');
const ahtBuffer = XLSX.write(ahtWb, { type: 'buffer', bookType: 'xlsx' });
assert(ahtBuffer && ahtBuffer.length > 0, 'Generated AHT Excel buffer should be non-empty');
console.log(`✔ AHT Workbook generated successfully (${ahtBuffer.length} bytes).`);

console.log('--- TEST 8: Simulating ART Workbook Generation ---');
const artWb = XLSX.utils.book_new();
const artWs1 = XLSX.utils.aoa_to_sheet([
  ['No', 'ID Log ART', 'Tanggal Input', 'Nama Petugas CSO', 'Channel Layanan', 'Rata-rata ART Harian (Detik)', 'Target SLA (Detik)', 'Deviasi Waktu (Detik)', 'Status SLA', 'Catatan Kinerja Harian'],
  [1, 'ART-20260901-001', '2026-09-01', 'Budi Santoso', 'CSO DIGILIVE CHAT - WA', 14.8, 30, -15.2, 'Sesuai SLA', 'Kecepatan respon interaksi cepat']
]);
const artWs2 = XLSX.utils.aoa_to_sheet([
  ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Kerja Input', 'Rata-rata ART Bulanan (Detik)', 'Standar Target SLA (Detik)', 'Rata-rata Deviasi (Detik)', 'Kepatuhan SLA (%)', 'Status Performa'],
  [1, 'Budi Santoso', 'CSO DIGILIVE CHAT - WA', 22, 14.8, 30, -15.2, '100%', 'Memenuhi Standar (< 30s)']
]);
XLSX.utils.book_append_sheet(artWb, artWs1, 'Log Harian ART');
XLSX.utils.book_append_sheet(artWb, artWs2, 'Rekapitulasi Bulanan');
const artBuffer = XLSX.write(artWb, { type: 'buffer', bookType: 'xlsx' });
assert(artBuffer && artBuffer.length > 0, 'Generated ART Excel buffer should be non-empty');
console.log(`✔ ART Workbook generated successfully (${artBuffer.length} bytes).`);

console.log('--- TEST 9: Simulating Finding Workbook Generation ---');
const findingWb = XLSX.utils.book_new();
const findingWs1 = XLSX.utils.aoa_to_sheet([
  ['No', 'ID Temuan', 'Tanggal', 'Nama Petugas CSO', 'Layanan CSO', 'Jenis Feedback', 'Kategori Temuan', 'Tingkat Deviasi', 'Rincian Kendala / Kasus', 'Komitmen', 'Action Plan', 'Status Tindak Lanjut'],
  [1, 'FND-2026-001', '2026-09-27', 'Ahmad Fauzi', 'CSO BACK OFFICE', 'Feedback Negatif', 'Informasi', 'Reminder 1', 'Kelalaian format nomor serial ONT', 'Memeriksa ulang format', 'Briefing format baku', 'Closed']
]);
const findingWs2 = XLSX.utils.aoa_to_sheet([
  ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Total Temuan', 'Feedback Positif', 'Feedback Negatif', 'Reminder', 'Korektif', 'SP', 'Status Open', 'Dalam Coaching', 'Closed'],
  [1, 'Ahmad Fauzi', 'CSO BACK OFFICE', 1, 0, 1, 1, 0, 0, 0, 0, 1]
]);
XLSX.utils.book_append_sheet(findingWb, findingWs1, 'Rekapitulasi Temuan QA');
XLSX.utils.book_append_sheet(findingWb, findingWs2, 'Ringkasan Per Petugas');
const findingBuffer = XLSX.write(findingWb, { type: 'buffer', bookType: 'xlsx' });
assert(findingBuffer && findingBuffer.length > 0, 'Generated Finding Excel buffer should be non-empty');
console.log(`✔ Finding Workbook generated successfully (${findingBuffer.length} bytes).`);

console.log('\n======================================================');
console.log('🎉 ALL EXCEL EXPORT TESTS (CA, TIKET, AHT, ART, FINDING) PASSED!');
console.log('======================================================');
