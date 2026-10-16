/**
 * Comprehensive Test: Manajemen Team & New PC / Device Login Verification
 */
const assert = require('assert');

console.log('=== TEST: Manajemen Team & New PC / Device Login ===');

// 1. Mock LocalStorage & SessionStorage
const store = {};
global.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: k => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};
global.sessionStorage = {
  getItem: k => null,
  setItem: () => {},
  removeItem: () => {}
};

global.Event = class Event { constructor(type) { this.type = type; } };

global.window = {
  localStorage: global.localStorage,
  sessionStorage: global.sessionStorage,
  addEventListener: () => {},
  dispatchEvent: () => {},
  DRIVE_FIREBASE_CONFIG: {
    apiKey: "AIzaSyBcoOc0mBtgNpUkA5k6uAgrKvdxXbtwluU",
    projectId: "dashboard-agent-adaro"
  }
};

function createEl(tag) {
  return {
    value: '',
    textContent: '',
    innerHTML: '',
    className: '',
    classList: {
      add: () => {},
      remove: () => {},
      contains: () => false,
      toggle: () => {}
    },
    style: {
      setProperty: () => {},
      removeProperty: () => {}
    },
    addEventListener: () => {},
    setAttribute: () => {},
    getAttribute: () => '',
    removeAttribute: () => {},
    appendChild: () => {},
    querySelector: () => createEl('div'),
    querySelectorAll: () => [],
    reset: () => {}
  };
}

global.document = {
  addEventListener: () => {},
  getElementById: id => createEl('div'),
  querySelectorAll: () => [],
  createElement: tag => createEl(tag),
  documentElement: {
    style: { setProperty: () => {} }
  },
  body: createEl('body'),
  title: ''
};

// Execute app.js in sandbox
require('../js/app.js');

const state = global.window.state;
assert(state, 'AppState must be initialized');

console.log('1. Checking fresh PC initialization without dummy data...');
const users = state.getUsers();
console.log('   Users count on fresh device:', users.length);
assert.strictEqual(users.length, 11, 'Should have exactly 11 active users on fresh PC');

// Check no dummy user exists
const dummyIds = ['usr_user_1', 'usr_user_2', 'usr_admin_2'];
const dummyUsernames = ['user', 'ahmad_fauzi', 'dewi_lestari'];
const dummyNames = ['Siti Rahma', 'Ahmad Fauzi', 'Dewi Lestari, M.T.', 'Budi Santoso, S.Kom'];

dummyIds.forEach(id => {
  assert(!users.some(u => u.id === id), `Dummy ID ${id} must not exist`);
});
dummyUsernames.forEach(un => {
  assert(!users.some(u => u.username.toLowerCase() === un), `Dummy username ${un} must not exist`);
});
dummyNames.forEach(name => {
  assert(!users.some(u => (u.fullName || '').toLowerCase() === name.toLowerCase()), `Dummy name ${name} must not exist`);
});
console.log('   ✓ Zero dummy users found in initial state!');

// Verify admin user is Admin Icon, TEAM LEADER
const admin = users.find(u => u.username === 'admin');
assert(admin, 'Admin must exist');
assert.strictEqual(admin.fullName, 'Admin Icon');
assert.strictEqual(admin.department, 'TEAM LEADER');
console.log('   ✓ Admin user is correctly Admin Icon (TEAM LEADER)');

// 2. Test Login Authentication
console.log('\n2. Testing Login flow on new device...');

// Helper to run handleLogin
async function testLogin(username, password) {
  return await global.window.handleLogin(username, password);
}

(async () => {
  // Test valid admin login
  const adminLogin = await testLogin('admin', 'admin123');
  assert(adminLogin, 'Admin login should succeed');
  assert.strictEqual(state.currentUser.fullName, 'Admin Icon');
  console.log('   ✓ Admin login successful as Admin Icon');

  // Test valid regular user login
  const sugengLogin = await testLogin('sugeng.riyadi', 'Contact123');
  assert(sugengLogin, 'Sugeng Riyadi login should succeed');
  assert.strictEqual(state.currentUser.fullName, 'Sugeng Riyadi');
  assert.strictEqual(state.currentUser.role, 'user');
  console.log('   ✓ Regular user login successful for sugeng.riyadi');

  // Test dummy users login rejection
  const dummy1 = await testLogin('user', 'user123');
  assert(!dummy1, 'Old dummy user "user" must be rejected');
  const dummy2 = await testLogin('ahmad_fauzi', 'user123');
  assert(!dummy2, 'Old dummy user "ahmad_fauzi" must be rejected');
  const dummy3 = await testLogin('dewi_lestari', 'admin123');
  assert(!dummy3, 'Old dummy user "dewi_lestari" must be rejected');
  console.log('   ✓ All old dummy user logins rejected as expected');

  // 3. Test Manajemen Team rendering
  console.log('\n3. Testing Manajemen Team page render & counts...');
  state.setSession(admin);
  global.window.renderUserManagementPage();

  assert.strictEqual(global.window.UI.countAdminUsers.textContent, 1, 'Admin count must be 1');
  assert.strictEqual(global.window.UI.countRegularUsers.textContent, 10, 'Regular user count must be 10');
  assert.strictEqual(global.window.UI.countActiveUsers.textContent, 11, 'Active count must be 11');
  assert.strictEqual(global.window.UI.countInactiveUsers.textContent, 0, 'Inactive count must be 0');
  console.log('   ✓ Badge counts match exactly: 1 Admin, 10 Users, 11 Active, 0 Inactive');

  console.log('\n=============================================');
  console.log('🎉 ALL TESTS PASSED: Manajemen Team & New PC verification complete!');
  console.log('=============================================');
})();
