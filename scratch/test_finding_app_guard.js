// Test js/app.js Finding guards and render isolation
const fs = require('fs');

const appJs = fs.readFileSync('js/app.js', 'utf8');

// Check syntax of js/app.js by checking if node can parse it (using vm or Function syntax check)
const vm = require('vm');
try {
  new vm.Script(appJs);
  console.log('✓ js/app.js has valid JavaScript syntax!');
} catch (err) {
  console.error('Syntax error in js/app.js:', err);
  process.exit(1);
}

// Check key guards in app.js
const assertions = [
  { name: 'openAddFindingModal admin guard', check: appJs.includes("if (!state.isAdmin()) {\n    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk mencatat temuan") },
  { name: 'openEditFindingModal admin guard', check: appJs.includes("if (!state.isAdmin()) {\n    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk mengedit temuan") },
  { name: 'handleSaveFinding admin guard', check: appJs.includes("if (!state.isAdmin()) {\n    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk menambah atau memperbarui") },
  { name: 'quickCycleFindingStatus admin guard', check: appJs.includes("if (!state.isAdmin()) {\n    showToast('Akses Dibatasi', 'Hanya Administrator yang dapat mengubah status") },
  { name: 'promptDeleteFinding admin guard', check: appJs.includes("if (!state.isAdmin()) {\n    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk menghapus temuan") },
  { name: 'promptDeleteAllFindingMonth admin guard', check: appJs.includes("if (!state.isAdmin()) {\n    showToast('Akses Ditolak', 'Hanya Administrator yang dapat menghapus data temuan bulanan.") },
  { name: 'handleFindingBatchDelete admin guard', check: appJs.includes("if (!state.isAdmin()) {\n    showToast('Akses Ditolak', 'Hanya Administrator yang dapat melakukan penghapusan massal.") },
  { name: 'executePendingDelete finding guard', check: appJs.includes("if (!state.isAdmin()) {\n      showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk menghapus temuan audit QA.', 'warning');") },
  { name: 'openFindingGSheetModal admin guard', check: appJs.includes("function openFindingGSheetModal() {\n  if (!state.isAdmin()) {") },
  { name: 'saveFindingGSheetConfigHandler admin guard', check: appJs.includes("function saveFindingGSheetConfigHandler() {\n  if (!state.isAdmin()) {") },
  { name: 'pushFindingToGoogleSheets admin guard', check: appJs.includes("async function pushFindingToGoogleSheets() {\n  if (!state.isAdmin()) {") },
  { name: 'pullFindingFromGoogleSheets admin guard', check: appJs.includes("async function pullFindingFromGoogleSheets() {\n  if (!state.isAdmin()) {") },
  { name: 'exportFindingExcel admin guard', check: appJs.includes("function exportFindingExcel() {\n  if (!state.isAdmin()) {") },
  { name: 'isFindingForUser isolation filter in renderFindingPage', check: appJs.includes("const accessibleFindings = isAdmin\n    ? allFindings\n    : allFindings.filter(f => isFindingForUser(f, currentUser));") }
];

assertions.forEach(a => {
  if (a.check) {
    console.log(`✓ ${a.name} is PRESENT`);
  } else {
    console.error(`✗ ${a.name} is MISSING`);
    process.exit(1);
  }
});

console.log('\n--- ALL FINDING GUARD AND ISOLATION CHECKS PASSED! ---');
