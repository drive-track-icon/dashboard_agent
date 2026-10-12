const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: VERIFY REMOVAL OF REQUESTED ELEMENTS FROM MENU UPDATE PA ===\n');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

// Extract pageUpdatePa section from index.html
const paStart = html.indexOf('<section class="page-section" id="pageUpdatePa">');
assert(paStart !== -1, 'pageUpdatePa section must exist');
const paEnd = html.indexOf('</section>', paStart);
assert(paEnd !== -1, 'pageUpdatePa section closing tag must exist');
const paSection = html.substring(paStart, paEnd);

// 1. Elements that MUST be removed from Update PA:
const forbiddenPhrases = [
  'Total Interaksi Ditangani',
  'Dari log PA tercatat',
  'Productive Hours',
  'Total Jam Efektif',
  'Ready &amp; Penanganan Chat/Call',
  'AUX Duration',
  'Total Waktu AUX',
  'Istirahat, Sholat, Toilet, Coaching',
  'Skor Capaian PA',
  'Rasio terhadap target interaksi',
  'Cari nama anggota CSO, layanan, catatan, atau aktivitas...',
  'Semua Petugas CSO',
  'Semua Layanan CSO',
  'Semua Shift',
  'Semua Aktivitas / AUX',
  'Semua Status',
  'Ekspor CSV',
  'Waktu &amp; Tanggal',
  'Petugas CSO',
  'Layanan CSO',
  'tablePaLogs',
  'paAdminMetricsLogsSection',
  'paMetricsGrid',
  'paSearchToolbar',
  'paTableContainer'
];

forbiddenPhrases.forEach(phrase => {
  assert(!paSection.includes(phrase), `pageUpdatePa must NOT contain: "${phrase}"`);
  console.log(`[PASS] Verified absence of: "${phrase}" in Update PA page`);
});

// 2. Elements that MUST remain in Update PA:
assert(paSection.includes('id="pageUpdatePa"'), 'pageUpdatePa ID must be present');
assert(paSection.includes('Update PA'), 'Title Update PA must be present');
assert(paSection.includes('id="btnRefreshPa"'), 'btnRefreshPa must be present');
assert(paSection.includes('id="btnOpenAddPaModal"'), 'btnOpenAddPaModal must be present');
assert(paSection.includes('id="paPermissionStatusBanner"'), 'paPermissionStatusBanner must be present');
assert(paSection.includes('id="paUserPersonalCardContainer"'), 'paUserPersonalCardContainer must be present');
assert(paSection.includes('id="paAdminOverviewSection"'), 'paAdminOverviewSection must be present');
assert(paSection.includes('id="paAdminUserGrid"'), 'paAdminUserGrid must be present');
console.log('\n[PASS] Verified essential Update PA elements are intact (banner, personal card, admin monitoring overview grid, action buttons).');

// 3. Verify modals are still intact
assert(html.includes('id="modalPaForm"'), 'modalPaForm must exist');
assert(html.includes('id="modalPaDetail"'), 'modalPaDetail must exist');
assert(html.includes('id="modalAdminUserPaDetail"'), 'modalAdminUserPaDetail must exist');
console.log('[PASS] Verified Update PA Modals (Add/Edit, Detail, Admin User Detail) are intact.');

console.log('\n=== ALL REMOVAL VERIFICATION CHECKS PASSED 100%! ===');
