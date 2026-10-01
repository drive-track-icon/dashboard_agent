const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING TEST: ART HIDDEN TEXTS ---');

const htmlPath = path.join(__dirname, '..', 'index.html');
const jsPath = path.join(__dirname, '..', 'js', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// 1. Hidden text 1: "Informasi Average Response Time (ART) user dalam 1 bulan..."
assert(/<p class="page-desc hidden">\s*Informasi Average Response Time \(ART\) user/i.test(html), 'page-desc in index.html for ART should have hidden class');
console.log('[PASS] Hidden text 1 verified: ART page-desc has class hidden');

// 2. Hidden text 2: artBannerRoleDesc and label check
assert(/<p id="artBannerRoleDesc" class="hidden">/i.test(html), 'artBannerRoleDesc should have class hidden in index.html');
assert(!js.includes("Otoritas Akses Response Time (ART): Administrator Penuh (CRUD)"), 'app.js should not set ": Administrator Penuh (CRUD)" in label');
assert(js.includes("UI.artBannerRoleDesc.classList.add('hidden')"), 'artBannerRoleDesc should be hidden via JS');
assert(js.includes("UI.artBannerRoleDesc.textContent = ''"), 'artBannerRoleDesc textContent should be cleared in JS');
console.log('[PASS] Hidden text 2 verified: art banner desc and ": Administrator Penuh (CRUD)" cleanly removed/hidden');

// 3. Hidden text 3: "Monitoring kecepatan rata-rata respon interaksi seluruh agent dalam 1 bulan terhadap batas standar SLA 30 detik."
assert(/<p class="hidden"[^>]*>Monitoring kecepatan rata-rata respon interaksi seluruh agent dalam 1 bulan terhadap batas standar SLA 30 detik\.<\/p>/i.test(html), 'Monitoring summary paragraph in ART must have class hidden');
assert(js.includes("summaryDescEl.classList.add('hidden')"), 'summaryDescEl in ART should be hidden in JS');
console.log('[PASS] Hidden text 3 verified: "Monitoring kecepatan rata-rata respon..." has class hidden');

// 4. Hidden text 4: artDailySubtitle
assert(/<p class="hidden"[^>]*id="artDailySubtitle"/i.test(html), 'artDailySubtitle must have class hidden in index.html');
assert(js.includes("UI.artDailySubtitle.classList.add('hidden')"), 'artDailySubtitle must be hidden in JS');
assert(js.includes("UI.artDailySubtitle.textContent = ''"), 'artDailySubtitle textContent must be cleared in JS');
console.log('[PASS] Hidden text 4 verified: artDailySubtitle is hidden in HTML and JS');

// 5. Hidden text 5: modalArtSubtitle
assert(/<p class="modal-subtitle hidden" id="modalArtSubtitle"/i.test(html), 'modalArtSubtitle must have class hidden in index.html');
assert(js.includes("UI.modalArtSubtitle.classList.add('hidden')"), 'modalArtSubtitle must be hidden in JS');
assert(js.includes("UI.modalArtSubtitle.textContent = ''"), 'modalArtSubtitle textContent must be cleared in JS');
console.log('[PASS] Hidden text 5 verified: modalArtSubtitle is hidden in HTML and JS');

// 6. Hidden text 6: form-info-callout with SLA standard
assert(/<div class="form-info-callout hidden"[^>]*>[\s\S]*?Standar SLA ART: &lt; 30 Detik/i.test(html), 'ART form-info-callout must have class hidden in index.html');
console.log('[PASS] Hidden text 6 verified: SLA standard callout has class hidden');

// 7. Hidden text 7: "Jumlah interaksi/chat yang ditangani pada hari ini"
assert(/<small class="form-hint hidden">Jumlah interaksi\/chat yang ditangani pada hari ini<\/small>/i.test(html), 'Interaction count hint must have class hidden in index.html');
console.log('[PASS] Hidden text 7 verified: Interaction count hint has class hidden');

// 8. Hidden text 8: "Rata-rata waktu tunggu pelanggan dalam antrian (detik)"
assert(/<small class="form-hint hidden">Rata-rata waktu tunggu pelanggan dalam antrian \(detik\)<\/small>/i.test(html), 'Queue time hint must have class hidden in index.html');
console.log('[PASS] Hidden text 8 verified: Queue time hint has class hidden');

// 9. Hidden text 9: "Kecepatan waktu sapaan pertama agen (detik)"
assert(/<small class="form-hint hidden">Kecepatan waktu sapaan pertama agen \(detik\)<\/small>/i.test(html), 'FRT hint must have class hidden in index.html');
console.log('[PASS] Hidden text 9 verified: First response time hint has class hidden');

console.log('\n--- ALL ART UPDATES VERIFICATION TESTS PASSED! ---');
