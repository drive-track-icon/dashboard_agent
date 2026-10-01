const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING TEST: AHT HIDDEN TEXTS ---');

const htmlPath = path.join(__dirname, '..', 'index.html');
const jsPath = path.join(__dirname, '..', 'js', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// 1. Hidden text 1: "Informasi Average Handling Time (AHT) user dalam 1 bulan..."
assert(/<p class="page-desc hidden">\s*Informasi Average Handling Time \(AHT\) user/i.test(html), 'page-desc in index.html for AHT should have hidden class');
console.log('[PASS] Hidden text 1 verified: AHT page-desc has class hidden');

// 2. Hidden text 2: ahtBannerRoleDesc and label check
assert(/<p id="ahtBannerRoleDesc" class="hidden">/i.test(html), 'ahtBannerRoleDesc should have class hidden in index.html');
assert(!js.includes("Otoritas Akses Handling Time (AHT): Administrator Penuh (CRUD)"), 'app.js should not set ": Administrator Penuh (CRUD)" in label');
assert(js.includes("UI.ahtBannerRoleDesc.classList.add('hidden')"), 'ahtBannerRoleDesc should be hidden via JS');
assert(js.includes("UI.ahtBannerRoleDesc.textContent = ''"), 'ahtBannerRoleDesc textContent should be cleared in JS');
console.log('[PASS] Hidden text 2 verified: aht banner desc and ": Administrator Penuh (CRUD)" cleanly removed/hidden');

// 3. Hidden text 3: "Monitoring performa durasi rata-rata penanganan interaksi seluruh agent dalam 1 bulan terhadap batas SLA 300 detik."
assert(/<p class="hidden"[^>]*>Monitoring performa durasi rata-rata penanganan interaksi seluruh agent dalam 1 bulan terhadap batas SLA 300 detik\.<\/p>/i.test(html), 'Monitoring summary paragraph in AHT must have class hidden');
assert(js.includes("summaryDescEl.classList.add('hidden')"), 'summaryDescEl in AHT should be hidden in JS');
console.log('[PASS] Hidden text 3 verified: "Monitoring performa durasi rata-rata penanganan..." has class hidden');

// 4. Hidden text 4: ahtDailySubtitle
assert(/<p class="hidden"[^>]*id="ahtDailySubtitle"/i.test(html), 'ahtDailySubtitle must have class hidden in index.html');
assert(js.includes("UI.ahtDailySubtitle.classList.add('hidden')"), 'ahtDailySubtitle must be hidden in JS');
assert(js.includes("UI.ahtDailySubtitle.textContent = ''"), 'ahtDailySubtitle textContent must be cleared in JS');
console.log('[PASS] Hidden text 4 verified: ahtDailySubtitle is hidden in HTML and JS');

// 5. Hidden text 5: modalAhtSubtitle
assert(/<p class="modal-subtitle hidden" id="modalAhtSubtitle"/i.test(html), 'modalAhtSubtitle must have class hidden in index.html');
assert(js.includes("UI.modalAhtSubtitle.classList.add('hidden')"), 'modalAhtSubtitle must be hidden in JS');
assert(js.includes("UI.modalAhtSubtitle.textContent = ''"), 'modalAhtSubtitle textContent must be cleared in JS');
console.log('[PASS] Hidden text 5 verified: modalAhtSubtitle is hidden in HTML and JS');

// 6. Hidden text 6: form-info-callout with SLA standard
assert(/<div class="form-info-callout hidden"[^>]*>[\s\S]*?Standar SLA AHT: &lt; 300 Detik/i.test(html), 'AHT form-info-callout must have class hidden in index.html');
console.log('[PASS] Hidden text 6 verified: SLA standard callout has class hidden');

// 7. Hidden text 7: "Jumlah panggilan/chat/tiket yang ditangani pada hari ini"
assert(/<small class="form-hint hidden">Jumlah panggilan\/chat\/tiket yang ditangani pada hari ini<\/small>/i.test(html), 'AHT interaction count hint must have class hidden in index.html');
console.log('[PASS] Hidden text 7 verified: Interaction count hint has class hidden');

console.log('\n--- ALL AHT UPDATES VERIFICATION TESTS PASSED! ---');
