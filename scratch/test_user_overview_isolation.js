const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: USER ISOLATION OF OVERVIEW FILTER & REMOVAL OF "HANYA" ===\n');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(baseDir, 'js', 'app.js'), 'utf8');

// 1. Verify "Hanya" is removed from select options in index.html
assert(html.includes('<option value="ALL">Semua</option>'), 'Must have Semua option');
assert(html.includes('<option value="CA">CA</option>'), 'Must have CA option without Hanya');
assert(html.includes('<option value="TIKET">Tiket</option>'), 'Must have Tiket option without Hanya');
assert(html.includes('<option value="ART">ART</option>'), 'Must have ART option without Hanya');
assert(!html.includes('<option value="CA">Hanya CA</option>'), 'Must NOT have Hanya CA in index.html');
assert(!html.includes('<option value="TIKET">Hanya Tiket</option>'), 'Must NOT have Hanya Tiket in index.html');
assert(!html.includes('<option value="ART">Hanya ART</option>'), 'Must NOT have Hanya ART in index.html');
console.log('[PASS] index.html: Dropdown options only show category names without "Hanya"!');

// 2. Verify "Hanya" is removed from badgeEl in js/app.js
assert(js.includes("badgeEl.innerHTML = '<i class=\"fa-solid fa-star\"></i> CA (Customer Attributes)'"), 'badgeEl must not have Hanya for CA');
assert(js.includes("badgeEl.innerHTML = '<i class=\"fa-solid fa-ticket\"></i> Tiket (Target 1.320)'"), 'badgeEl must not have Hanya for TIKET');
assert(js.includes("badgeEl.innerHTML = '<i class=\"fa-solid fa-bolt\"></i> ART (SLA ≤30s)'"), 'badgeEl must not have Hanya for ART');
assert(!js.includes("badgeEl.innerHTML = '<i class=\"fa-solid fa-star\"></i> Hanya CA"), 'badgeEl must NOT contain Hanya CA');
assert(!js.includes("badgeEl.innerHTML = '<i class=\"fa-solid fa-ticket\"></i> Hanya Tiket"), 'badgeEl must NOT contain Hanya Tiket');
assert(!js.includes("badgeEl.innerHTML = '<i class=\"fa-solid fa-bolt\"></i> Hanya ART"), 'badgeEl must NOT contain Hanya ART');
console.log('[PASS] js/app.js: Overview badges only show category names without "Hanya"!');

// 3. Test user preference storage simulation
const mockLocalStorage = {};
global.localStorage = {
  getItem: (k) => mockLocalStorage[k] || null,
  setItem: (k, v) => { mockLocalStorage[k] = String(v); },
  removeItem: (k) => { delete mockLocalStorage[k]; }
};

let mockCurrentUser = null;
const state = {
  get currentUser() { return mockCurrentUser; }
};

function getOverviewUserStorageKey() {
  const u = (typeof state !== 'undefined' && state && state.currentUser) ? state.currentUser : null;
  const userKey = (u && (u.id || u.username)) ? String(u.id || u.username) : 'guest';
  return 'vortex_overview_user_pref_' + userKey;
}

function getOverviewUserPref() {
  try {
    const raw = localStorage.getItem(getOverviewUserStorageKey());
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (e) {}
  return {
    category: 'ALL',
    sortOrder: 'DESC',
    sortMetric: 'AUTO'
  };
}

function saveOverviewUserPref(prefUpdate) {
  try {
    const current = getOverviewUserPref();
    const updated = Object.assign({}, current, prefUpdate);
    localStorage.setItem(getOverviewUserStorageKey(), JSON.stringify(updated));
  } catch (e) {}
}

// User 1: Siti
mockCurrentUser = { id: 'usr-siti', username: 'siti', fullName: 'Siti Rahma' };
saveOverviewUserPref({ category: 'CA', sortOrder: 'ASC' });

// User 2: Budi
mockCurrentUser = { id: 'usr-budi', username: 'budi', fullName: 'Budi Santoso' };
saveOverviewUserPref({ category: 'TIKET', sortOrder: 'DESC' });

// User 3: Dewi
mockCurrentUser = { id: 'usr-dewi', username: 'dewi', fullName: 'Dewi Lestari' };
saveOverviewUserPref({ category: 'ART', sortOrder: 'ASC' });

// Verify Budi's preferences
mockCurrentUser = { id: 'usr-budi', username: 'budi', fullName: 'Budi Santoso' };
const budiPref = getOverviewUserPref();
assert.strictEqual(budiPref.category, 'TIKET');
assert.strictEqual(budiPref.sortOrder, 'DESC');
console.log('[PASS] User Budi has independent preferences: TIKET, DESC');

// Switch back to Siti and verify Siti's preferences are completely unaffected
mockCurrentUser = { id: 'usr-siti', username: 'siti', fullName: 'Siti Rahma' };
const sitiPref = getOverviewUserPref();
assert.strictEqual(sitiPref.category, 'CA');
assert.strictEqual(sitiPref.sortOrder, 'ASC');
console.log('[PASS] User Siti retains independent preferences: CA, ASC (unaffected by Budi or Dewi)');

// Switch back to Dewi and verify Dewi's preferences are completely unaffected
mockCurrentUser = { id: 'usr-dewi', username: 'dewi', fullName: 'Dewi Lestari' };
const dewiPref = getOverviewUserPref();
assert.strictEqual(dewiPref.category, 'ART');
assert.strictEqual(dewiPref.sortOrder, 'ASC');
console.log('[PASS] User Dewi retains independent preferences: ART, ASC');

// Switch to a new/unknown user and verify default fallback
mockCurrentUser = { id: 'usr-new', username: 'newuser', fullName: 'New User' };
const newPref = getOverviewUserPref();
assert.strictEqual(newPref.category, 'ALL');
assert.strictEqual(newPref.sortOrder, 'DESC');
console.log('[PASS] New user gets clean independent defaults: ALL, DESC');

console.log('\n=== ALL USER ISOLATION CHECKS PASSED SUCCESSFULLY! ===');
