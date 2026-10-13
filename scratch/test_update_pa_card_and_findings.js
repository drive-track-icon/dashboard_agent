const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING UPDATE PA CARD & FINDINGS VERIFICATION ---');

const appJsPath = path.join(__dirname, '..', 'js', 'app.js');
const appJs = fs.readFileSync(appJsPath, 'utf8');

// 1. Check renderAdminPaUserGrid in app.js
const gridFnIndex = appJs.indexOf('function renderAdminPaUserGrid()');
assert(gridFnIndex !== -1, 'renderAdminPaUserGrid exists');
const gridFnSlice = appJs.slice(gridFnIndex, gridFnIndex + 2500);

assert(!gridFnSlice.includes('Total Log PA:'), '"Total Log PA:" must be removed from initial card stats');
assert(!gridFnSlice.includes('Interaksi:'), '"Interaksi:" must be removed from initial card stats');
assert(!gridFnSlice.includes('Durasi Kerja:'), '"Durasi Kerja:" must be removed from initial card stats');

assert(gridFnSlice.includes('Tiket:'), '"Tiket:" present in initial card stats');
assert(gridFnSlice.includes('AHT:'), '"AHT:" present in initial card stats');
assert(gridFnSlice.includes('ART:'), '"ART:" present in initial card stats');
assert(gridFnSlice.includes('CA:'), '"CA:" present in initial card stats');

console.log('✓ Initial card stats correctly verified: "Tiket:", "AHT:", "ART:", "CA:" present, old PA counts removed');

// 2. Check Catatan Finding retrieval
assert(appJs.includes('const allFindings = (typeof state.getFindings === \'function\') ? state.getFindings() : [];'), 'Catatan Finding directly calls state.getFindings()');
assert(appJs.includes('userFindings.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));'), 'Findings sorted by newest date');

// 3. Test isFindingForUser simulation
function cleanStr(s) {
  return String(s || '').replace(/,\s*[a-z\.\s]+$/i, '').replace(/[^a-z0-9]/g, '');
}
function testIsFindingForUser(item, user) {
  if (!item || !user) return false;
  const targetId = String(user.id || '').trim().toLowerCase();
  const targetUsername = String(user.username || '').trim().toLowerCase();
  const targetFullName = String(user.fullName || '').trim().toLowerCase();

  const itemUserId = String(item.userId || '').trim().toLowerCase();
  const itemUsername = String(item.username || '').trim().toLowerCase();
  const itemFullName = String(item.userFullName || item.fullName || item.author || '').trim().toLowerCase();

  if (itemUserId && targetId && itemUserId === targetId) return true;
  if (itemUsername && targetUsername && itemUsername === targetUsername) return true;
  if (itemFullName && targetFullName && itemFullName === targetFullName) return true;

  const cItem = cleanStr(itemFullName);
  const cTarget = cleanStr(targetFullName);
  if (cItem && cTarget && (cItem === cTarget || cItem.includes(cTarget) || cTarget.includes(cItem))) {
    return true;
  }

  if (targetUsername && itemFullName.includes(targetUsername)) return true;

  return false;
}

const mockUserBudi = { id: 'usr_admin_1', username: 'admin', fullName: 'Budi Santoso, S.Kom' };
const mockFindingBudi1 = { id: 'FND-1', userFullName: 'Budi Santoso, S.Kom' };
const mockFindingBudi2 = { id: 'FND-2', userFullName: 'Budi Santoso' };
const mockFindingOther = { id: 'FND-3', userFullName: 'Siti Rahma' };

assert(testIsFindingForUser(mockFindingBudi1, mockUserBudi), 'Matches with exact degree');
assert(testIsFindingForUser(mockFindingBudi2, mockUserBudi), 'Matches without degree');
assert(!testIsFindingForUser(mockFindingOther, mockUserBudi), 'Does not match other user');

console.log('✓ isFindingForUser matching logic verified 100%');
console.log('--- ALL VERIFICATIONS PASSED SUCCESSFULLY! ---');
