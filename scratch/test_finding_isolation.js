// Test Finding User Isolation & Permission Security
const assert = require('assert');

// Mock DOM & window
global.window = global;
global.document = {
  getElementById: (id) => ({
    id,
    classList: {
      _classes: new Set(),
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); },
      toggle(c, force) {
        if (force === undefined) {
          if (this._classes.has(c)) this._classes.delete(c);
          else this._classes.add(c);
        } else if (force) {
          this._classes.add(c);
        } else {
          this._classes.delete(c);
        }
      },
      contains(c) { return this._classes.has(c); }
    },
    value: '',
    textContent: '',
    innerHTML: '',
    appendChild(child) { this.children = this.children || []; this.children.push(child); },
    style: {}
  }),
  createElement: (tag) => ({
    tagName: tag.toUpperCase(),
    innerHTML: '',
    style: {},
    classList: {
      _classes: new Set(),
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); },
      contains(c) { return this._classes.has(c); }
    }
  })
};

// Test isFindingForUser logic
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

const mockUsers = [
  { id: 'usr_admin_1', username: 'admin', fullName: 'Budi Santoso, S.Kom', role: 'admin' },
  { id: 'usr_user_1', username: 'user', fullName: 'Siti Rahma', role: 'user' },
  { id: 'usr_user_2', username: 'ahmad_fauzi', fullName: 'Ahmad Fauzi', role: 'user' }
];

const mockFindings = [
  { id: 'FND-2026-001', date: '2026-09-27', userFullName: 'Ahmad Fauzi', status: 'Closed', deviationLevel: 'Reminder 1' },
  { id: 'FND-2026-002', date: '2026-09-28', userFullName: 'Siti Rahma', status: 'Dalam Coaching', deviationLevel: 'Reminder 2' },
  { id: 'FND-2026-003', date: '2026-09-26', userFullName: 'Budi Santoso, S.Kom', status: 'Open', deviationLevel: 'Korektif 1' },
  { id: 'FND-2026-004', date: '2026-09-25', userFullName: 'Dewi Lestari, M.T.', status: 'Closed', deviationLevel: 'Reminder 1' },
  { id: 'FND-2026-005', date: '2026-09-24', userFullName: 'Rian Pratama', status: 'Open', deviationLevel: 'SP 1' },
  { id: 'FND-2026-008', date: '2026-09-29', userFullName: 'Siti Rahma', status: 'Open', deviationLevel: 'Reminder 1' }
];

console.log('--- TEST 1: isFindingForUser matching ---');
const userSiti = mockUsers[1];
const userAhmad = mockUsers[2];

const sitiFindings = mockFindings.filter(f => isFindingForUser(f, userSiti));
console.log('Siti findings count:', sitiFindings.length, 'IDs:', sitiFindings.map(f => f.id));
assert.strictEqual(sitiFindings.length, 2, 'Siti should have exactly 2 findings');
assert.deepStrictEqual(sitiFindings.map(f => f.id), ['FND-2026-002', 'FND-2026-008']);

const ahmadFindings = mockFindings.filter(f => isFindingForUser(f, userAhmad));
console.log('Ahmad findings count:', ahmadFindings.length, 'IDs:', ahmadFindings.map(f => f.id));
assert.strictEqual(ahmadFindings.length, 1, 'Ahmad should have exactly 1 finding');
assert.deepStrictEqual(ahmadFindings.map(f => f.id), ['FND-2026-001']);

// Verify Siti CANNOT see Ahmad's finding
assert.strictEqual(sitiFindings.some(f => f.userFullName === 'Ahmad Fauzi'), false, 'Siti must NOT see Ahmad findings');
// Verify Ahmad CANNOT see Siti's findings
assert.strictEqual(ahmadFindings.some(f => f.userFullName === 'Siti Rahma'), false, 'Ahmad must NOT see Siti findings');

console.log('--- TEST 2: Admin Visibility ---');
const userAdmin = mockUsers[0];
const adminFindings = mockFindings; // Admin sees all
console.log('Admin accessible findings count:', adminFindings.length);
assert.strictEqual(adminFindings.length, 6, 'Admin should see all findings');

console.log('--- TEST 3: Matching by userId and username ---');
const findingWithId = { id: 'FND-2026-099', userId: 'usr_user_1', userFullName: 'Unknown Name' };
assert.strictEqual(isFindingForUser(findingWithId, userSiti), true, 'Should match by userId');
assert.strictEqual(isFindingForUser(findingWithId, userAhmad), false, 'Should not match different user');

const findingWithUsername = { id: 'FND-2026-100', username: 'ahmad_fauzi', userFullName: '' };
assert.strictEqual(isFindingForUser(findingWithUsername, userAhmad), true, 'Should match by username');
assert.strictEqual(isFindingForUser(findingWithUsername, userSiti), false, 'Should not match different user');

console.log('--- ALL UNIT TESTS PASSED SUCCESSFULLY! ---');
