const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING TEST: TIKET HIDDEN TEXTS & TITLE RENAME ---');

const htmlPath = path.join(__dirname, '..', 'index.html');
const jsPath = path.join(__dirname, '..', 'js', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// 1. Rename check
assert(html.includes('<h2 class="page-title">Perolehan Tiket Agent</h2>'), 'Page title in index.html should be "Perolehan Tiket Agent"');
assert(!html.includes('<h2 class="page-title">Perolehan Tiket User (Target: 1.320 / Bulan)</h2>'), 'Old page title should not exist in index.html');
assert(js.includes("'Perolehan Tiket Agent'"), 'app.js should set page title to "Perolehan Tiket Agent"');
console.log('[PASS] Page title verified: "Perolehan Tiket Agent"');

// 2. Hidden text 1: "Informasi akumulasi jumlah perolehan tiket seluruh user..."
assert(/<p class="page-desc hidden">\s*Informasi akumulasi jumlah perolehan tiket seluruh user/i.test(html), 'page-desc in index.html should have hidden class');
console.log('[PASS] Hidden text 1 verified: page-desc has class hidden');

// 3. Hidden text 2: tiketBannerRoleDesc and label check
assert(/<p id="tiketBannerRoleDesc" class="hidden">/i.test(html), 'tiketBannerRoleDesc should have class hidden in index.html');
assert(!js.includes("Otoritas Akses Perolehan Tiket: Administrator Penuh (CRUD)"), 'app.js should not set ": Administrator Penuh (CRUD)" in label');
assert(js.includes("UI.tiketBannerRoleDesc.classList.add('hidden')"), 'tiketBannerRoleDesc should be hidden via JS');
assert(js.includes("UI.tiketBannerRoleDesc.textContent = ''"), 'tiketBannerRoleDesc textContent should be cleared in JS');
console.log('[PASS] Hidden text 2 verified: banner desc and ": Administrator Penuh (CRUD)" cleanly removed/hidden');

// 4. Hidden text 3: "Monitoring akumulasi perolehan tiket harian seluruh agen CSO terhadap target bulanan 1.320 tiket."
assert(/<p class="hidden"[^>]*>Monitoring akumulasi perolehan tiket harian seluruh agen CSO terhadap target bulanan 1\.320 tiket\.<\/p>/i.test(html), 'Monitoring summary paragraph must have class hidden');
assert(js.includes("summaryDescEl.classList.add('hidden')"), 'summaryDescEl should be hidden in JS');
console.log('[PASS] Hidden text 3 verified: "Monitoring akumulasi perolehan tiket..." has class hidden');

// 5. Hidden text 4: tiketDailySubtitle
assert(/<p class="hidden"[^>]*id="tiketDailySubtitle"/i.test(html), 'tiketDailySubtitle must have class hidden in index.html');
assert(js.includes("UI.tiketDailySubtitle.classList.add('hidden')"), 'tiketDailySubtitle must be hidden in JS');
assert(js.includes("UI.tiketDailySubtitle.textContent = ''"), 'tiketDailySubtitle textContent must be cleared in JS');
console.log('[PASS] Hidden text 4 verified: tiketDailySubtitle is hidden in HTML and JS');

// 6. Hidden text 5: modalTiketSubtitle
assert(/<p class="modal-subtitle hidden" id="modalTiketSubtitle"/i.test(html), 'modalTiketSubtitle must have class hidden in index.html');
assert(js.includes("UI.modalTiketSubtitle.classList.add('hidden')"), 'modalTiketSubtitle must be hidden in JS');
console.log('[PASS] Hidden text 5 verified: modalTiketSubtitle is hidden in HTML and JS');

// 7. Hidden text 6: form-info-callout with target 1.320
assert(/<div class="form-info-callout hidden"/i.test(html), 'form-info-callout must have class hidden in index.html');
console.log('[PASS] Hidden text 6 verified: Target bulanan callout has class hidden');

// 8. Hidden text 7: formTiketCountHint
assert(/<small class="form-hint hidden" id="formTiketCountHint">Standar harian ~60 tiket menuju target 1\.320 tiket\/bulan<\/small>/i.test(html), 'formTiketCountHint must have class hidden in index.html');
console.log('[PASS] Hidden text 7 verified: formTiketCountHint has class hidden');

console.log('\n--- ALL TIKET UPDATES VERIFICATION TESTS PASSED! ---');
