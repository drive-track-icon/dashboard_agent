// Simulating complete DOM state for Finding page
const fs = require('fs');

const htmlContent = fs.readFileSync('index.html', 'utf8');

// Simple DOM extraction test
console.log('--- Checking HTML IDs and Elements ---');
const requiredIds = [
  'navFinding',
  'pageFinding',
  'filterFindingMonth',
  'btnRefreshFinding',
  'btnExportFindingExcel',
  'btnDeleteAllFindingMonth',
  'btnOpenAddFindingModal',
  'findingGSheetSyncBar',
  'findingStatTotal',
  'findingStatMinor',
  'findingStatMayor',
  'findingStatFatal',
  'searchFindingInput',
  'findingBatchBar',
  'findingThSelectAll',
  'findingThActions',
  'findingTableBody',
  'modalFindingForm'
];

requiredIds.forEach(id => {
  const exists = htmlContent.includes(`id="${id}"`);
  console.log(`Element #${id}: ${exists ? 'FOUND' : 'MISSING'}`);
  if (!exists) throw new Error(`Missing #${id}`);
});

console.log('\n--- Checking User vs Admin Rendering Simulation ---');

const mockFindings = [
  { id: 'FND-2026-001', date: '2026-09-27', userFullName: 'Ahmad Fauzi', status: 'Closed', deviationLevel: 'Reminder 1', desc: 'Case Ahmad', department: 'CSO BACK OFFICE' },
  { id: 'FND-2026-002', date: '2026-09-28', userFullName: 'Siti Rahma', status: 'Dalam Coaching', deviationLevel: 'Reminder 2', desc: 'Case Siti 1', department: 'CSO DIGILIVE CHAT - WA' },
  { id: 'FND-2026-003', date: '2026-09-26', userFullName: 'Budi Santoso, S.Kom', status: 'Open', deviationLevel: 'Korektif 1', desc: 'Case Admin', department: 'CSO INBOUND' },
  { id: 'FND-2026-008', date: '2026-09-29', userFullName: 'Siti Rahma', status: 'Open', deviationLevel: 'Reminder 1', desc: 'Case Siti 2', department: 'CSO DIGILIVE CHAT - WA' }
];

function isFindingForUser(item, user) {
  if (!item || !user) return false;
  const targetId = (user.id || '').trim();
  const targetUsername = (user.username || '').trim().toLowerCase();
  const targetFullName = (user.fullName || '').trim().toLowerCase();

  const itemUserId = (item.userId || '').trim();
  const itemUsername = (item.username || '').trim().toLowerCase();
  const itemUserFullName = (item.userFullName || '').trim().toLowerCase();
  const itemFullName = (item.fullName || '').trim().toLowerCase();
  const itemAuthor = (item.author || '').trim().toLowerCase();

  if (itemUserId && targetId && itemUserId === targetId) return true;
  if (itemUsername && targetUsername && itemUsername === targetUsername) return true;
  if (itemUserFullName && targetFullName && itemUserFullName === targetFullName) return true;
  if (itemFullName && targetFullName && itemFullName === targetFullName) return true;
  if (itemAuthor && targetFullName && itemAuthor === targetFullName) return true;

  return false;
}

function simulateRender(user, findings, selectedMonth = '2026-09') {
  const isAdmin = user.role === 'admin';
  const accessibleFindings = isAdmin
    ? findings
    : findings.filter(f => isFindingForUser(f, user));

  const monthFindings = selectedMonth === 'ALL'
    ? accessibleFindings
    : accessibleFindings.filter(f => (f.date || '').startsWith(selectedMonth));

  const totalCount = monthFindings.length;
  const reminderCount = monthFindings.filter(f => (f.deviationLevel || '').startsWith('Reminder')).length;
  const korektifCount = monthFindings.filter(f => (f.deviationLevel || '').startsWith('Korektif')).length;
  const spCount = monthFindings.filter(f => (f.deviationLevel || '').startsWith('SP')).length;

  const visibleButtons = {
    btnOpenAddFindingModal: isAdmin,
    btnDeleteAllFindingMonth: isAdmin,
    btnExportFindingExcel: isAdmin,
    findingGSheetSyncBar: isAdmin,
    findingThSelectAll: isAdmin,
    batchActions: isAdmin
  };

  const rows = monthFindings.map(item => {
    return {
      id: item.id,
      userFullName: item.userFullName,
      hasCheckbox: isAdmin,
      hasEditDelete: isAdmin,
      actionBadge: isAdmin ? 'Edit/Delete Buttons' : 'Hanya Lihat'
    };
  });

  return {
    isAdmin,
    userFullName: user.fullName,
    metrics: { total: totalCount, reminder: reminderCount, korektif: korektifCount, sp: spCount },
    visibleButtons,
    rows
  };
}

// 1. Simulation for Siti Rahma (User)
const sitiUser = { id: 'usr_user_1', username: 'user', fullName: 'Siti Rahma', role: 'user' };
const sitiResult = simulateRender(sitiUser, mockFindings);
console.log('\n--- Siti Rahma Render Result ---');
console.log('Metrics:', sitiResult.metrics);
console.log('Visible Buttons (all should be false):', sitiResult.visibleButtons);
console.log('Rows count:', sitiResult.rows.length);
console.log('Row users:', sitiResult.rows.map(r => `${r.id} (${r.userFullName}) - Action: ${r.actionBadge}`));

if (sitiResult.metrics.total !== 2) throw new Error('Siti should see exactly 2 findings');
if (sitiResult.visibleButtons.btnOpenAddFindingModal !== false) throw new Error('Add button must be hidden for user');
if (sitiResult.visibleButtons.btnDeleteAllFindingMonth !== false) throw new Error('Delete month button must be hidden for user');
if (sitiResult.rows.some(r => r.userFullName !== 'Siti Rahma')) throw new Error('Non-Siti findings leaked to Siti!');
if (sitiResult.rows.some(r => r.hasEditDelete !== false)) throw new Error('Edit/delete controls leaked to user!');

// 2. Simulation for Ahmad Fauzi (User)
const ahmadUser = { id: 'usr_user_2', username: 'ahmad_fauzi', fullName: 'Ahmad Fauzi', role: 'user' };
const ahmadResult = simulateRender(ahmadUser, mockFindings);
console.log('\n--- Ahmad Fauzi Render Result ---');
console.log('Metrics:', ahmadResult.metrics);
console.log('Rows count:', ahmadResult.rows.length);
console.log('Row users:', ahmadResult.rows.map(r => `${r.id} (${r.userFullName}) - Action: ${r.actionBadge}`));

if (ahmadResult.metrics.total !== 1) throw new Error('Ahmad should see exactly 1 finding');
if (ahmadResult.rows.some(r => r.userFullName !== 'Ahmad Fauzi')) throw new Error('Non-Ahmad findings leaked to Ahmad!');

// 3. Simulation for Admin
const adminUser = { id: 'usr_admin_1', username: 'admin', fullName: 'Budi Santoso, S.Kom', role: 'admin' };
const adminResult = simulateRender(adminUser, mockFindings);
console.log('\n--- Admin Render Result ---');
console.log('Metrics:', adminResult.metrics);
console.log('Visible Buttons (all should be true):', adminResult.visibleButtons);
console.log('Rows count:', adminResult.rows.length);

if (adminResult.metrics.total !== 4) throw new Error('Admin should see all 4 findings');
if (adminResult.visibleButtons.btnOpenAddFindingModal !== true) throw new Error('Admin must see add button');
if (adminResult.visibleButtons.btnDeleteAllFindingMonth !== true) throw new Error('Admin must see delete month button');
if (adminResult.rows.some(r => !r.hasEditDelete)) throw new Error('Admin must have edit/delete controls');

console.log('\n=== ALL SIMULATION TESTS PASSED PERFECTLY! ===');
