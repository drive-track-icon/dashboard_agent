const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- TEST SUITE: Finding Feature Updates ---');

const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const jsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');

// 1. HTML Verification
console.log('1. Verifying HTML structure for Finding page and modal...');

// Month filter and delete button
assert(htmlContent.includes('id="filterFindingMonth"'), 'Must have filterFindingMonth select');
assert(htmlContent.includes('id="btnDeleteAllFindingMonth"'), 'Must have btnDeleteAllFindingMonth button');

// Type and Level filters
assert(htmlContent.includes('id="filterFindingType"'), 'Must have filterFindingType select');
assert(htmlContent.includes('value="Feedback Positif"'), 'Must have Feedback Positif option');
assert(htmlContent.includes('value="Feedback Negatif"'), 'Must have Feedback Negatif option');

// Level filter options
assert(htmlContent.includes('value="Reminder 1"'), 'Must have Reminder 1 option');
assert(htmlContent.includes('value="Reminder 2"'), 'Must have Reminder 2 option');
assert(htmlContent.includes('value="Korektif 1"'), 'Must have Korektif 1 option');
assert(htmlContent.includes('value="Korektif 2"'), 'Must have Korektif 2 option');
assert(htmlContent.includes('value="SP 1"'), 'Must have SP 1 option');
assert(htmlContent.includes('value="SP 2"'), 'Must have SP 2 option');
assert(htmlContent.includes('value="SP 3"'), 'Must have SP 3 option');

// Batch action bar
assert(htmlContent.includes('id="findingBatchBar"'), 'Must have findingBatchBar');
assert(htmlContent.includes('id="findingSelectedCount"'), 'Must have findingSelectedCount');
assert(htmlContent.includes('id="btnFindingDeselectAll"'), 'Must have btnFindingDeselectAll');
assert(htmlContent.includes('id="btnFindingSelectAll"'), 'Must have btnFindingSelectAll');
assert(htmlContent.includes('id="btnFindingDeleteSelected"'), 'Must have btnFindingDeleteSelected');

// Table headers
assert(htmlContent.includes('id="findingSelectAllCheckbox"'), 'Must have findingSelectAllCheckbox');
assert(htmlContent.includes('<th>Jenis</th>'), 'Must have Jenis table header');
assert(htmlContent.includes('<th>Komitmen</th>'), 'Must have Komitmen table header');

// Modal Finding Form
assert(htmlContent.includes('id="modalFindingTitle"'), 'Must have modalFindingTitle');
assert(htmlContent.includes('id="formFindingId"'), 'Must have formFindingId hidden input');
assert(htmlContent.includes('id="formFindingDate"'), 'Must have formFindingDate input');
assert(htmlContent.includes('id="formFindingType"'), 'Must have formFindingType select');
assert(htmlContent.includes('id="formFindingLevelVal"'), 'Must have formFindingLevelVal select');
assert(htmlContent.includes('id="formFindingCommitment"'), 'Must have formFindingCommitment field');
assert(htmlContent.includes('id="btnSubmitFindingText"'), 'Must have btnSubmitFindingText');

// Kategori Temuan options
assert(htmlContent.includes('<option value="Informasi">Informasi</option>'), 'Must have Informasi option in Kategori Temuan');
assert(htmlContent.includes('<option value="Keluhan">Keluhan</option>'), 'Must have Keluhan option in Kategori Temuan');
assert(htmlContent.includes('<option value="Gangguan">Gangguan</option>'), 'Must have Gangguan option in Kategori Temuan');

// Hidden texts verification
assert(htmlContent.includes('modal-subtitle hidden">Pencatatan deviasi SOP pelayanan dan rekomendasi perbaikan kualitas</p>'), 'Modal subtitle text must have class hidden');
assert(htmlContent.includes('page-desc hidden">Rekapitulasi catatan temuan deviasi SOP, ketidaksesuaian data operasional, dan action plan perbaikan mutu pelayanan.</p>'), 'Page desc text must have class hidden');

console.log('✓ HTML tests passed.');

// 2. JS Verification
console.log('2. Verifying JS implementation for Finding features...');

assert(jsContent.includes('this.selectedFindingIds = new Set()'), 'AppState must initialize selectedFindingIds');
assert(jsContent.includes('filterFindingMonth: document.getElementById(\'filterFindingMonth\')'), 'UI cache must include filterFindingMonth');
assert(jsContent.includes('btnDeleteAllFindingMonth: document.getElementById(\'btnDeleteAllFindingMonth\')'), 'UI cache must include btnDeleteAllFindingMonth');
assert(jsContent.includes('formFindingCommitment: document.getElementById(\'formFindingCommitment\')'), 'UI cache must include formFindingCommitment');
assert(jsContent.includes('formFindingType: document.getElementById(\'formFindingType\')'), 'UI cache must include formFindingType');
assert(jsContent.includes('openEditFindingModal'), 'Must define openEditFindingModal');
assert(jsContent.includes('promptDeleteAllFindingMonth'), 'Must define promptDeleteAllFindingMonth');
assert(jsContent.includes('handleFindingBatchDelete'), 'Must define handleFindingBatchDelete');
assert(jsContent.includes('type === \'finding_month\''), 'promptConfirmDelete must handle finding_month');
assert(jsContent.includes('type === \'finding_batch\''), 'promptConfirmDelete must handle finding_batch');

console.log('✓ JS source checks passed.');

// 3. Functional Simulation Test
console.log('3. Running functional simulation tests...');

// Mock LocalStorage
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; }
};

// Test getFindings mapping
const rawFindings = [
  { id: 'FND-1', date: '2026-10-01', userFullName: 'Agent A', department: 'CSO INBOUND', deviationLevel: 'Minor', desc: 'Test 1' },
  { id: 'FND-2', date: '2026-09-15', userFullName: 'Agent B', department: 'CSO DIGILIVE CHAT - WA', deviationLevel: 'Reminder 1', desc: 'Test 2', findingType: 'Feedback Positif', commitment: 'Akan lebih teliti' }
];
storage['vortex_findings'] = JSON.stringify(rawFindings);

// Simple simulation of getFindings logic
function simulateGetFindings() {
  const raw = JSON.parse(storage['vortex_findings'] || '[]');
  return raw.map(item => {
    let level = item.deviationLevel;
    if (level === 'Minor') level = 'Reminder 1';
    else if (level === 'Mayor') level = 'Korektif 1';
    else if (level === 'Fatal') level = 'SP 1';
    return {
      ...item,
      findingType: item.findingType || 'Feedback Negatif',
      deviationLevel: level || 'Reminder 1',
      commitment: item.commitment || '-'
    };
  });
}

const mapped = simulateGetFindings();
assert.strictEqual(mapped[0].deviationLevel, 'Reminder 1', 'Minor should map to Reminder 1');
assert.strictEqual(mapped[0].findingType, 'Feedback Negatif', 'Default findingType should be Feedback Negatif');
assert.strictEqual(mapped[0].commitment, '-', 'Default commitment should be -');
assert.strictEqual(mapped[1].findingType, 'Feedback Positif', 'Preserves Feedback Positif');
assert.strictEqual(mapped[1].commitment, 'Akan lebih teliti', 'Preserves custom commitment');

// Test month filtering
const month10 = mapped.filter(f => (f.date || '').startsWith('2026-10'));
assert.strictEqual(month10.length, 1, 'October should have 1 item');
const month09 = mapped.filter(f => (f.date || '').startsWith('2026-09'));
assert.strictEqual(month09.length, 1, 'September should have 1 item');

// Test delete month simulation
const remainingAfterMonthDelete = mapped.filter(f => !(f.date || '').startsWith('2026-09'));
assert.strictEqual(remainingAfterMonthDelete.length, 1, 'Deleting September should leave 1 item');
assert.strictEqual(remainingAfterMonthDelete[0].id, 'FND-1');

// Test batch delete simulation
const selectedFindingIds = new Set(['FND-1']);
const remainingAfterBatch = mapped.filter(f => !selectedFindingIds.has(f.id));
assert.strictEqual(remainingAfterBatch.length, 1, 'Batch delete should leave 1 item');
assert.strictEqual(remainingAfterBatch[0].id, 'FND-2');

// Test edit item update simulation
const editTargetIdx = mapped.findIndex(f => f.id === 'FND-1');
mapped[editTargetIdx] = {
  ...mapped[editTargetIdx],
  findingType: 'Feedback Positif',
  deviationLevel: 'Korektif 2',
  commitment: 'Komitmen baru'
};
assert.strictEqual(mapped[0].findingType, 'Feedback Positif');
assert.strictEqual(mapped[0].deviationLevel, 'Korektif 2');
assert.strictEqual(mapped[0].commitment, 'Komitmen baru');

console.log('✓ All functional simulation tests passed successfully!');
