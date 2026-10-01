const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING TEST: CA HIDDEN TEXTS & CUSTOMER ATTRIBUTES RENAME ---');

const htmlPath = path.join(__dirname, '..', 'index.html');
const jsPath = path.join(__dirname, '..', 'js', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// 1. "Customer Attributes" title check
assert(html.includes('<h2 class="page-title">Customer Attributes (CA)</h2>'), 'Page title should be Customer Attributes (CA)');
assert(!html.includes('<h2 class="page-title">Customer Assessment (CA)</h2>'), 'Old page title Customer Assessment (CA) should not exist in index.html');
console.log('[PASS] Page title verified: "Customer Attributes (CA)"');

// 2. Hidden text 1: "Informasi rekapitulasi penilaian mutu layanan..."
assert(/<p class="page-desc hidden">\s*Informasi rekapitulasi penilaian mutu layanan/i.test(html), 'page-desc should have hidden class');
console.log('[PASS] Hidden text 1 verified: "Informasi rekapitulasi penilaian mutu layanan..." has class hidden');

// 3. Hidden text 2: caBannerRoleDesc
assert(/<p id="caBannerRoleDesc" class="hidden">/i.test(html), 'caBannerRoleDesc should have class hidden in index.html');
assert(js.includes("caBannerRoleDesc.classList.add('hidden')"), 'caBannerRoleDesc should be hidden via JS');
assert(js.includes("caBannerRoleDesc.textContent = ''"), 'caBannerRoleDesc textContent should be cleared in JS');
console.log('[PASS] Hidden text 2 verified: caBannerRoleDesc is hidden in HTML and JS');

// 4. Hidden text 3: "Perbandingan performa, akumulasi hari dinilai, dan rata-rata skor bulanan per anggota CSO."
assert(/<p class="hidden"[^>]*>Perbandingan performa, akumulasi hari dinilai, dan rata-rata skor bulanan per anggota CSO\.<\/p>/i.test(html), 'Perbandingan performa paragraph must have class hidden');
console.log('[PASS] Hidden text 3 verified: "Perbandingan performa..." has class hidden');

// 5. Hidden text 4: caDailySubtitle ("Daftar riwayat evaluasi per hari dari seluruh user dalam bulan terpilih.")
assert(/<p class="hidden"[^>]*id="caDailySubtitle"/i.test(html), 'caDailySubtitle must have class hidden in index.html');
assert(js.includes("UI.caDailySubtitle.classList.add('hidden')"), 'caDailySubtitle must be hidden in JS');
assert(js.includes("UI.caDailySubtitle.textContent = ''"), 'caDailySubtitle textContent must be cleared in JS');
console.log('[PASS] Hidden text 4 verified: caDailySubtitle is hidden in HTML and JS');

// 6. Hidden text 5: modalCaSubtitle ("Pencatatan evaluasi mutu interaksi agen CSO per hari dalam 1 bulan (Format Desimal)")
assert(/<p class="modal-subtitle hidden" id="modalCaSubtitle"/i.test(html), 'modalCaSubtitle must have class hidden in index.html');
assert(js.includes("UI.modalCaSubtitle.classList.add('hidden')"), 'modalCaSubtitle must be hidden in JS');
assert(js.includes("UI.modalCaSubtitle.textContent = ''"), 'modalCaSubtitle textContent must be cleared in JS');
console.log('[PASS] Hidden text 5 verified: modalCaSubtitle is hidden in HTML and JS');

// 7. Hidden text 6: "≥95,00 Sangat Baik, 85,00 - 94,99 Baik, <85,00 Perlu Coaching"
assert(/<small class="form-hint hidden">&ge;95,00 Sangat Baik, 85,00 - 94,99 Baik, &lt;85,00 Perlu Coaching<\/small>/i.test(html), 'form-hint score guide must have class hidden');
console.log('[PASS] Hidden text 6 verified: "&ge;95,00 Sangat Baik..." has class hidden');

console.log('\n--- ALL CA UPDATES VERIFICATION TESTS PASSED! ---');
