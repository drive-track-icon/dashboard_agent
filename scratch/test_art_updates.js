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

// 10. Check 10: "Jumlah Sesi Terlayani" label removed and formArtInteractionCount hidden
assert(!html.includes('Jumlah Sesi Terlayani'), 'Label "Jumlah Sesi Terlayani" must be removed from index.html');
assert(/<input type="hidden" id="formArtInteractionCount" value="1">/.test(html), 'formArtInteractionCount must be a hidden input with value="1"');
console.log('[PASS] Check 10 verified: "Jumlah Sesi Terlayani *" assessment field cleanly removed');

// 11. Check 11: "Waktu Antrian (Queue Time) *" and "Respon Pertama (FRT) *" assessment fields removed from modal
assert(!html.includes('Waktu Antrian (Queue Time)'), 'Label "Waktu Antrian (Queue Time)" must be removed from index.html');
assert(!html.includes('Respon Pertama (FRT) <span class="required">*</span>'), 'Label "Respon Pertama (FRT) *" must be removed from modalArtForm');
assert(/<input type="hidden" id="formArtQueueSecs" value="0">/.test(html), 'formArtQueueSecs must be a hidden input with value="0"');
assert(/<input type="hidden" id="formArtFrtSecs" value="0">/.test(html), 'formArtFrtSecs must be a hidden input with value="0"');
console.log('[PASS] Check 11 verified: "Waktu Antrian (Queue Time) *" and "Respon Pertama (FRT) *" assessment fields cleanly removed');

// 12. Check 12: artCardFrt metric card is hidden
assert(/id="artCardFrt"[^>]*class="[^"]*hidden/i.test(html) || /class="[^"]*hidden[^"]*"[^>]*id="artCardFrt"/i.test(html), 'artCardFrt must have class hidden in index.html');
assert(js.includes("artCardFrt.classList.add('hidden')"), 'js/app.js must ensure artCardFrt is hidden');
console.log('[PASS] Check 12 verified: "Respon Pertama (FRT)" metric card is hidden');

// 13. Check 13: Columns removed from tableArtUserSummary and tableArtLogs
const userSummaryThead = html.slice(html.indexOf('id="tableArtUserSummary"'), html.indexOf('id="artUserSummaryBody"'));
assert(!userSummaryThead.includes('Total Sesi'), 'tableArtUserSummary must not contain Total Sesi header');
assert(!userSummaryThead.includes('Rata-rata Antrian (Queue)'), 'tableArtUserSummary must not contain Rata-rata Antrian header');
assert(!userSummaryThead.includes('Respon Pertama (FRT)'), 'tableArtUserSummary must not contain Respon Pertama header');

const dailyLogsThead = html.slice(html.indexOf('id="tableArtLogs"'), html.indexOf('id="artTableBody"'));
assert(!dailyLogsThead.includes('Total Sesi'), 'tableArtLogs must not contain Total Sesi header');
assert(!dailyLogsThead.includes('Antrian (Queue)'), 'tableArtLogs must not contain Antrian (Queue) header');
assert(!dailyLogsThead.includes('Respon Pertama (FRT)'), 'tableArtLogs must not contain Respon Pertama (FRT) header');
console.log('[PASS] Check 13 verified: Columns cleanly removed from both ART tables');

// 14. Check 14: "Aksi" column removed from tableArtUserSummary (Rekapitulasi Average Response Time Seluruh Agent)
assert(!userSummaryThead.includes('>Aksi<'), 'tableArtUserSummary must not contain Aksi header');
assert(dailyLogsThead.includes('>Aksi<'), 'tableArtLogs must still contain Aksi header');
assert(js.includes('colspan="8"'), 'js/app.js must use colspan 8 for empty state of artUserSummaryBody');
assert(!js.includes('filterArtByUser(\'${u.fullName'), 'js/app.js must not render filterArtByUser action button in artUserSummaryBody');
console.log('[PASS] Check 14 verified: "Aksi" column removed from tableArtUserSummary');

console.log('\n--- ALL ART UPDATES VERIFICATION TESTS PASSED! ---');


