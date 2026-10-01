const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING TEST: TIMER HIDDEN TEXTS & LAYANAN DROPDOWN ---');

const baseDir = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(baseDir, 'index.html');
const appJsPath = path.join(baseDir, 'js', 'app.js');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const appJs = fs.readFileSync(appJsPath, 'utf8');

// 1. Verify 7 texts are hidden in index.html
const hiddenSnippets = [
  'Pengaturan waktu mandiri per pengguna (edit waktu ditentukan, play, pause, reset) dan pemantauan aktivitas waktu terpusat oleh Admin.',
  'Waktu ditentukan dapat Anda edit kapan saja. Dilengkapi tombol <strong>Play, Pause, Reset,</strong> dan <strong>Edit Waktu</strong>.',
  'Pencatatan waktu progresif bertambah pribadi Anda (Play, Pause, dan Reset).',
  'Pencatatan waktu bertambah progresif',
  'Atur nama timer di sisi kiri dan tentukan jumlah durasi waktu (jam, menit, detik)',
  'Pantau waktu mundur dan stopwatch yang diambil oleh tiap-tiap user secara langsung dan real-time',
  'Admin dapat mengelola timer pribadi sekaligus memantau seluruh waktu yang diambil oleh setiap user secara real-time.'
];

hiddenSnippets.forEach((snippet, i) => {
  assert(indexHtml.includes(snippet), `Snippet ${i + 1} not found in HTML: ${snippet}`);
  const idx = indexHtml.indexOf(snippet);
  const tagStart = indexHtml.lastIndexOf('<', idx);
  const tagEnd = indexHtml.indexOf('>', tagStart);
  const openingTag = indexHtml.slice(tagStart, tagEnd + 1);
  assert(openingTag.includes('hidden'), `Snippet ${i + 1} is not hidden: ${openingTag}`);
  console.log(`[PASS] Hidden text ${i + 1} verified in HTML: "${snippet.slice(0, 45)}..."`);
});

// 2. Verify app.js does not set the admin banner description text, but hides it
assert(!appJs.includes("UI.timerBannerRoleDesc.textContent = 'Admin dapat memantau seluruh waktu"), 'app.js still sets the admin timer banner description text');
assert(appJs.includes("UI.timerBannerRoleDesc.classList.add('hidden')"), 'app.js does not hide timerBannerRoleDesc');
console.log('[PASS] app.js hides timerBannerRoleDesc cleanly');

// 3. Verify "Kategori / Divisi" changed to "Layanan"
assert(!indexHtml.includes('Kategori / Divisi'), '"Kategori / Divisi" still found in index.html');
console.log('[PASS] "Kategori / Divisi" label removed');

// 4. Verify "Departemen / Keterangan" changed to "Layanan"
assert(!indexHtml.includes('Departemen / Keterangan'), '"Departemen / Keterangan" still found in index.html');
console.log('[PASS] "Departemen / Keterangan" label removed');

// 5. Verify 7 options in formTimerCategory
const expectedOptions = [
  'CSO INBOUND',
  'CSO DIGILIVE CHAT - DM',
  'CSO DIGILIVE CHAT - MY ICON+',
  'CSO DIGILIVE CHAT - WA',
  'CSO BACK OFFICE',
  'CSO OUTBOUND',
  'CSO EMAIL'
];

expectedOptions.forEach(opt => {
  assert(indexHtml.includes(`<option value="${opt}">${opt}</option>`), `Option ${opt} missing in index.html`);
});
console.log('[PASS] All 7 CSO Layanan options present in dropdowns');

// 6. Verify formStopwatchDept is a select dropdown (not text input)
assert(indexHtml.includes('<select id="formStopwatchDept" class="form-control">'), 'formStopwatchDept is not a select element');
assert(!indexHtml.includes('<input type="text" id="formStopwatchDept"'), 'formStopwatchDept is still an input text element');
console.log('[PASS] formStopwatchDept is now a select element with Layanan options');

// 7. Verify formTimerCategory has "Layanan" label
const timerCatLabelIdx = indexHtml.indexOf('for="formTimerCategory"');
const timerCatLabelTag = indexHtml.slice(timerCatLabelIdx, timerCatLabelIdx + 80);
assert(timerCatLabelTag.includes('>Layanan</label>'), 'formTimerCategory label is not "Layanan"');
console.log('[PASS] formTimerCategory label verified as "Layanan"');

// 8. Verify formStopwatchDept has "Layanan" label
const swDeptLabelIdx = indexHtml.indexOf('for="formStopwatchDept"');
const swDeptLabelTag = indexHtml.slice(swDeptLabelIdx, swDeptLabelIdx + 80);
assert(swDeptLabelTag.includes('>Layanan</label>'), 'formStopwatchDept label is not "Layanan"');
console.log('[PASS] formStopwatchDept label verified as "Layanan"');

console.log('\n--- ALL TIMER & STOPWATCH UPDATES TESTS PASSED! ---');
