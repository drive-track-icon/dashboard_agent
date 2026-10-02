const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING TEST: AHT TOTAL INTERAKSI REMOVAL, SECONDS DURATION, HIDDEN AKSI, AND LABEL UPDATES ---');

const htmlPath = path.join(__dirname, '..', 'index.html');
const jsPath = path.join(__dirname, '..', 'js', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// 1. Check "Total Interaksi" removal in AHT
// Card 2 must be hidden
assert(/id="ahtCardSlaCompliance"[^>]*class="[^"]*hidden/i.test(html) || /class="[^"]*hidden[^"]*"[^>]*id="ahtCardSlaCompliance"/i.test(html), 'ahtCardSlaCompliance must have class hidden in index.html');
assert(js.includes("ahtCardSlaCompliance.classList.add('hidden')"), 'ahtCardSlaCompliance must be hidden via JS');

// Table 1 header must not contain "Total Interaksi"
const table1HeaderMatch = html.match(/<table[^>]*id="tableAhtUserSummary"[\s\S]*?<\/thead>/i);
assert(table1HeaderMatch, 'tableAhtUserSummary thead should exist');
assert(!table1HeaderMatch[0].includes('Total Interaksi'), 'tableAhtUserSummary thead must not include Total Interaksi');

// Table 1 body rendering in JS must not include summary.totalInteractions cell
const table1BodyRegex = /UI\.ahtUserSummaryBody\.innerHTML = '<tr><td colspan="5"/;
assert(table1BodyRegex.test(js), 'Table 1 empty state should use colspan="5"');

console.log('[PASS] Test 1: "Total Interaksi" cleanly removed from Card 2 and Table 1');

// 2. Check duration in seconds (Detik)
assert(js.includes('return `${Math.round(safeSec)} Detik`;'), 'formatAhtSeconds should return seconds with Detik unit');
assert(js.includes('return `${safeSec.toLocaleString(\'id-ID\')} Detik`;'), 'formatAhtDuration should return seconds with Detik unit');

// Metric cards use Detik
assert(html.includes('id="ahtStatAvg">0 <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>'), 'ahtStatAvg should use Detik unit in index.html');
assert(html.includes('id="ahtStatOver">0 <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>'), 'ahtStatOver should use Detik unit in index.html');

// Modal uses Detik
assert(html.includes('id="formAhtDurationSecs" class="form-control" min="1" max="7200"'), 'formAhtDurationSecs should be direct input for seconds');
assert(html.includes('id="formAhtDurationMins" value="0"'), 'formAhtDurationMins should be hidden with value 0');

console.log('[PASS] Test 2: Duration calculations and displays updated to seconds (Detik)');

// 3. Check Hidden Column "Aksi"
// Table 1 header Aksi must have class="hidden"
assert(/<th[^>]*class="hidden"[^>]*>Aksi<\/th>/i.test(html) || /<th[^>]*>Aksi<\/th>[^<]*class="hidden"/i.test(html), 'Table 1 Aksi th must have class hidden');
assert(js.includes('<td style="text-align: center;" class="hidden">\n            <button class="btn btn-outline-gray btn-sm" onclick="filterAhtByUser'), 'Table 1 Aksi td must have class hidden');

// Table 2 header Aksi must have class="hidden"
assert(/id="thAhtAction"\s+class="hidden"/i.test(html), 'thAhtAction must have class hidden in index.html');
assert(js.includes('<td style="text-align:center;" class="hidden">'), 'Table 2 action td must have class hidden in JS');
assert(js.includes('const totalCols = isAdmin ? 7 : 6;'), 'Table 2 empty state should account for hidden Aksi column');

console.log('[PASS] Test 3: Column "Aksi" is hidden in both Table 1 and Table 2');

// 4. Check "Jumlah Interaksi Ditangani *" and "Jumlah Interaksi" removal
const modalAhtMatch = html.match(/<div[^>]*id="modalAhtForm"[\s\S]*?<\/form>/i);
assert(modalAhtMatch, 'modalAhtForm should exist in index.html');
assert(!modalAhtMatch[0].includes('Jumlah Interaksi Ditangani'), 'modalAhtForm should NOT contain "Jumlah Interaksi Ditangani"');

const table2HeaderMatch = html.match(/<table[^>]*id="tableAhtLogs"[\s\S]*?<\/thead>/i);
assert(table2HeaderMatch, 'tableAhtLogs thead should exist in index.html');
assert(!table2HeaderMatch[0].includes('Jumlah Interaksi'), 'tableAhtLogs thead should NOT contain "Jumlah Interaksi"');

console.log('[PASS] Test 4: "Jumlah Interaksi Ditangani *" and "Jumlah Interaksi" removed successfully');

// 5. Check "Total Durasi" -> "AHT Harian" and "Rata-rata Durasi AHT (Detik) *" -> "Rata-rata AHT Harian"
assert(table1HeaderMatch[0].includes('AHT Harian'), 'Table 1 header should contain "AHT Harian"');
assert(!table1HeaderMatch[0].includes('Total Durasi'), 'Table 1 header should NOT contain "Total Durasi"');

assert(table2HeaderMatch[0].includes('AHT Harian'), 'Table 2 header should contain "AHT Harian"');
assert(!table2HeaderMatch[0].includes('Total Durasi'), 'Table 2 header should NOT contain "Total Durasi"');

assert(modalAhtMatch[0].includes('Rata-rata AHT Harian'), 'modalAhtForm should contain "Rata-rata AHT Harian"');
assert(!modalAhtMatch[0].includes('Rata-rata Durasi AHT'), 'modalAhtForm should NOT contain "Rata-rata Durasi AHT"');

console.log('[PASS] Test 5: "Total Durasi" updated to "AHT Harian" and modal label updated to "Rata-rata AHT Harian"');

console.log('\n--- ALL AHT SECONDS AND COLUMNS VERIFICATION TESTS PASSED! ---');
