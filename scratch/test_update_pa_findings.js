const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING UPDATE PA FINDING VERIFICATION TESTS ---');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const appJsPath = path.join(__dirname, '..', 'js', 'app.js');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const appJs = fs.readFileSync(appJsPath, 'utf8');

// 1. Verify that the requested 5 items are REMOVED from modalAdminUserPaDetail
const modalStartIndex = indexHtml.indexOf('id="modalAdminUserPaDetail"');
assert(modalStartIndex !== -1, 'modalAdminUserPaDetail exists in index.html');
const modalEndIndex = indexHtml.indexOf('id="btnCloseAdminUserPaDetailBtn"');
assert(modalEndIndex > modalStartIndex, 'modalEndIndex found');
const modalSlice = indexHtml.slice(modalStartIndex, modalEndIndex + 200);

assert(!modalSlice.includes('Total Log PA'), '"Total Log PA" removed from modal');
assert(!modalSlice.includes('Interaksi'), '"Interaksi" removed from modal');
assert(!modalSlice.includes('Jam Efektif'), '"Jam Efektif" removed from modal');
assert(!modalSlice.includes('Total AUX'), '"Total AUX" removed from modal');
assert(!modalSlice.includes('Daftar Catatan Update PA Agen Ini'), '"Daftar Catatan Update PA Agen Ini" removed from modal');

console.log('✓ All 5 removed items confirmed absent from Detail Update PA Pengguna modal');

// 2. Verify that "Catatan Finding" is added
assert(modalSlice.includes('Catatan Finding'), '"Catatan Finding" heading present in modal');
assert(modalSlice.includes('id="adminDetailUserFindingsContainer"'), 'adminDetailUserFindingsContainer present in modal');
assert(modalSlice.includes('id="adminDetailUserFindingsList"'), 'adminDetailUserFindingsList present in modal');
assert(modalSlice.includes('id="adminDetailUserFindingsBadge"'), 'adminDetailUserFindingsBadge present in modal');

console.log('✓ "Catatan Finding" container and elements confirmed present in modal');

// 3. Verify app.js logic
assert(appJs.includes('adminDetailUserFindingsList'), 'appJs references adminDetailUserFindingsList');
assert(appJs.includes('state.getFindings()'), 'openAdminUserDetailModal fetches from state.getFindings');
assert(appJs.includes('isFindingForUser(f, u)'), 'openAdminUserDetailModal filters by isFindingForUser');

console.log('✓ app.js correctly retrieves and displays findings for agent');

console.log('--- ALL UPDATE PA FINDING TESTS PASSED! ---');
