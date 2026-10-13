/**
 * Test Suite: Admin Update in Manajemen Team
 * Verifies that updating admin data in Manajemen Team works reliably,
 * handles passwords, departments (ADMINISTRATOR), session sync, and protections.
 */

const assert = require('assert');

// Mock browser environment
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] !== undefined ? store[key] : null;
    },
    setItem: function (key, value) {
      store[key] = String(value);
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    }
  };
})();

global.localStorage = localStorageMock;
global.sessionStorage = localStorageMock;

// Mock DOM elements
function createElement(tag, id = '') {
  return {
    tagName: tag.toUpperCase(),
    id: id,
    value: '',
    textContent: '',
    innerHTML: '',
    className: '',
    classList: {
      _classes: new Set(),
      add: function (c) { this._classes.add(c); },
      remove: function (c) { this._classes.delete(c); },
      contains: function (c) { return this._classes.has(c); }
    },
    style: {},
    attributes: {},
    setAttribute: function (k, v) { this.attributes[k] = v; },
    getAttribute: function (k) { return this.attributes[k]; },
    removeAttribute: function (k) { delete this.attributes[k]; },
    appendChild: function (child) {
      if (!this.options) this.options = [];
      this.options.push(child);
    },
    options: tag.toUpperCase() === 'SELECT' ? [] : undefined,
    reset: function () { this.value = ''; }
  };
}

const documentMock = {
  getElementById: function (id) {
    if (!this._elements) this._elements = {};
    if (!this._elements[id]) {
      const tag = id.includes('Form') ? 'form' : (id.includes('Dept') || id.includes('Role') ? 'select' : 'input');
      this._elements[id] = createElement(tag, id);
    }
    return this._elements[id];
  },
  createElement: function (tag) {
    return createElement(tag);
  },
  querySelectorAll: function () {
    return [];
  }
};

global.document = documentMock;
global.window = {
  localStorage: localStorageMock,
  showToast: function (title, msg, type) {
    global.lastToast = { title, msg, type };
  }
};

console.log('--- RUNNING TEST: Admin Update in Manajemen Team ---');

// Mock state and UI
const DEFAULT_USERS = [
  {
    id: 'usr_admin_1',
    username: 'admin',
    password: 'admin123',
    fullName: 'Budi Santoso, S.Kom',
    email: 'admin@drive.internal',
    role: 'admin',
    department: 'ADMINISTRATOR',
    status: 'active',
    avatar: 'https://images.unsplash.com/admin1.jpg',
    createdAt: '2026-01-10 08:30'
  },
  {
    id: 'usr_admin_2',
    username: 'dewi_lestari',
    password: 'admin123',
    fullName: 'Dewi Lestari, M.T.',
    email: 'dewi.lestari@drive.internal',
    role: 'admin',
    department: 'MANAGEMENT',
    status: 'active',
    avatar: 'https://images.unsplash.com/admin2.jpg',
    createdAt: '2026-01-05 14:00'
  },
  {
    id: 'usr_user_1',
    username: 'user',
    password: 'user123',
    fullName: 'Siti Rahma',
    email: 'siti.rahma@drive.internal',
    role: 'user',
    department: 'CSO DIGILIVE CHAT - WA',
    status: 'active',
    avatar: 'https://images.unsplash.com/user1.jpg',
    createdAt: '2026-01-15 09:15'
  }
];

localStorage.setItem('vortex_users', JSON.stringify(DEFAULT_USERS));
localStorage.setItem('vortex_session', JSON.stringify(DEFAULT_USERS[0]));

// Setup state
const state = {
  currentUser: JSON.parse(JSON.stringify(DEFAULT_USERS[0])),
  currentPage: 'user-management',
  isAdmin: function () {
    return this.currentUser && this.currentUser.role === 'admin';
  },
  getUsers: function () {
    return JSON.parse(localStorage.getItem('vortex_users') || '[]');
  },
  saveUsers: function (users) {
    localStorage.setItem('vortex_users', JSON.stringify(users));
  },
  setSession: function (user, isNew = false) {
    this.currentUser = user;
    localStorage.setItem('vortex_session', JSON.stringify(user));
  },
  saveSession: function (user) {
    if (user) {
      this.currentUser = user;
      localStorage.setItem('vortex_session', JSON.stringify(user));
    }
  },
  addLog: function (type, badge, msg) {
    this.lastLog = { type, badge, msg };
  }
};
global.state = state;

// Setup UI elements
const UI = {
  modalRegisterUser: createElement('div', 'modalRegisterUser'),
  registerUserForm: createElement('form', 'registerUserForm'),
  regUserId: createElement('input', 'regUserId'),
  regFullName: createElement('input', 'regFullName'),
  regUsername: createElement('input', 'regUsername'),
  regEmail: createElement('input', 'regEmail'),
  regRole: createElement('select', 'regRole'),
  regDept: createElement('select', 'regDept'),
  regPassword: createElement('input', 'regPassword'),
  regPasswordRequired: createElement('span', 'regPasswordRequired'),
  regPasswordLabel: createElement('label', 'regPasswordLabel'),
  regPasswordHint: createElement('small', 'regPasswordHint'),
  regAvatarData: createElement('input', 'regAvatarData'),
  regAvatarUrl: createElement('input', 'regAvatarUrl'),
  regAvatarPreview: createElement('img', 'regAvatarPreview'),
  modalUserTitle: createElement('h3', 'modalUserTitle'),
  modalUserSubtitle: createElement('p', 'modalUserSubtitle'),
  modalUserIcon: createElement('i', 'modalUserIcon'),
  btnSubmitRegisterText: createElement('span', 'btnSubmitRegisterText'),
  btnSubmitRegisterIcon: createElement('i', 'btnSubmitRegisterIcon'),
  userTableBody: createElement('tbody', 'userTableBody'),
  countAdminUsers: createElement('h3', 'countAdminUsers'),
  countRegularUsers: createElement('h3', 'countRegularUsers'),
  countActiveUsers: createElement('h3', 'countActiveUsers'),
  countInactiveUsers: createElement('h3', 'countInactiveUsers'),
  sidebarUserName: createElement('span', 'sidebarUserName'),
  sidebarUserAvatar: createElement('img', 'sidebarUserAvatar'),
  topbarUserName: createElement('span', 'topbarUserName'),
  topbarUserAvatar: createElement('img', 'topbarUserAvatar'),
  sidebarUserRoleBadge: createElement('span', 'sidebarUserRoleBadge')
};

// Add standard options to regDept
['', 'ADMINISTRATOR', 'MANAGEMENT', 'TEAM LEADER', 'CSO INBOUND', 'CSO DIGILIVE CHAT - WA'].forEach(optVal => {
  const opt = createElement('option');
  opt.value = optVal;
  opt.textContent = optVal || 'Pilih Layanan...';
  UI.regDept.options.push(opt);
});

// Add options to regRole
['user', 'admin'].forEach(r => {
  const opt = createElement('option');
  opt.value = r;
  UI.regRole.options.push(opt);
});

function showToast(title, msg, type) {
  global.lastToast = { title, msg, type };
}

function updateRoleExplanation() {
  const role = UI.regRole.value;
  if (role === 'admin' && UI.regDept && !UI.regDept.value) {
    UI.regDept.value = 'ADMINISTRATOR';
  }
}

function closeRegisterUserModal() {
  UI.modalRegisterUser.classList.add('hidden');
}

function renderUserManagementPage() {
  // Simple mock
  const users = state.getUsers();
  UI.countAdminUsers.textContent = users.filter(u => u.role === 'admin').length;
  UI.countRegularUsers.textContent = users.filter(u => u.role === 'user').length;
}

// Target function 1: openEditUserModal
function openEditUserModal(id) {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang dapat mengubah data anggota team.', 'danger');
    return;
  }

  const users = state.getUsers();
  const user = users.find(u => (u.id && String(u.id) === String(id)) || (u.username && u.username.toLowerCase() === String(id).toLowerCase()));
  if (!user) {
    showToast('Data Tidak Ditemukan', 'Pengguna tidak ditemukan di sistem.', 'danger');
    return;
  }

  UI.registerUserForm.reset();
  if (UI.regUserId) UI.regUserId.value = user.id || user.username || '';
  if (UI.regFullName) UI.regFullName.value = user.fullName || '';
  if (UI.regUsername) UI.regUsername.value = user.username || '';
  if (UI.regEmail) UI.regEmail.value = user.email || '';
  if (UI.regRole) UI.regRole.value = user.role || 'user';
  
  const deptVal = user.department || (user.role === 'admin' ? 'ADMINISTRATOR' : 'CSO INBOUND');
  if (UI.regDept) {
    let exists = false;
    for (let i = 0; i < UI.regDept.options.length; i++) {
      if (UI.regDept.options[i].value === deptVal) {
        exists = true;
        break;
      }
    }
    if (!exists && deptVal) {
      const opt = createElement('option');
      opt.value = deptVal;
      opt.textContent = deptVal;
      UI.regDept.appendChild(opt);
    }
    UI.regDept.value = deptVal;
  }

  const avatarSrc = user.avatar || 'https://images.unsplash.com/default.jpg';
  if (UI.regAvatarPreview) UI.regAvatarPreview.src = avatarSrc;
  if (UI.regAvatarData) UI.regAvatarData.value = avatarSrc;
  if (UI.regAvatarUrl) UI.regAvatarUrl.value = (user.avatar && user.avatar.startsWith('http')) ? user.avatar : '';

  if (UI.regPassword) {
    UI.regPassword.required = false;
    UI.regPassword.removeAttribute('required');
    UI.regPassword.removeAttribute('minlength');
    UI.regPassword.value = '';
  }
  if (UI.regPasswordRequired) UI.regPasswordRequired.style.display = 'none';
  if (UI.regPasswordLabel) UI.regPasswordLabel.innerHTML = 'Kata Sandi Baru (Opsional)';
  if (UI.regPasswordHint) UI.regPasswordHint.textContent = 'Kosongkan jika tidak ingin mengubah kata sandi lama.';

  if (UI.modalUserTitle) UI.modalUserTitle.textContent = 'Edit Anggota Team';
  if (UI.modalUserSubtitle) UI.modalUserSubtitle.textContent = 'Perbarui data profil, penugasan layanan CSO, dan peran anggota team';
  if (UI.modalUserIcon) UI.modalUserIcon.className = 'fa-solid fa-user-pen';
  if (UI.btnSubmitRegisterText) UI.btnSubmitRegisterText.textContent = 'Simpan Perubahan';
  if (UI.btnSubmitRegisterIcon) UI.btnSubmitRegisterIcon.className = 'fa-solid fa-floppy-disk';

  updateRoleExplanation();
  UI.modalRegisterUser.classList.remove('hidden');
}

// Target function 2: handleRegisterUserSubmit
function handleRegisterUserSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();

  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda tidak memiliki hak Administrator.', 'danger');
    return;
  }

  const editId = UI.regUserId ? UI.regUserId.value.trim() : '';
  const fullName = UI.regFullName ? UI.regFullName.value.trim() : '';
  const username = UI.regUsername ? UI.regUsername.value.trim().toLowerCase() : '';
  const email = UI.regEmail ? UI.regEmail.value.trim() : '';
  const role = (UI.regRole ? UI.regRole.value : 'user') || 'user';
  let department = (UI.regDept ? UI.regDept.value.trim() : '');
  if (!department && role === 'admin') {
    department = 'ADMINISTRATOR';
  }
  const password = UI.regPassword ? UI.regPassword.value : '';

  if (!fullName || !username || !email || !department) {
    showToast('Form Tidak Lengkap', 'Mohon lengkapi Nama Lengkap, Username, Email, dan Layanan.', 'warning');
    return;
  }

  const users = state.getUsers();

  let avatar = (UI.regAvatarData && UI.regAvatarData.value.trim()) || 
               (UI.regAvatarUrl && UI.regAvatarUrl.value.trim()) || 
               (UI.regAvatarPreview ? UI.regAvatarPreview.src : '') || 
               'https://images.unsplash.com/default.jpg';

  if (editId) {
    // ==================== EDIT MODE ====================
    const userIndex = users.findIndex(u => (u.id && String(u.id) === String(editId)) || (u.username && u.username.toLowerCase() === String(editId).toLowerCase()));
    if (userIndex === -1) {
      showToast('Error', 'Data pengguna tidak ditemukan.', 'danger');
      return;
    }

    if (users.some((u, idx) => idx !== userIndex && u.username && u.username.toLowerCase() === username)) {
      showToast('Username Digunakan', `Username "${username}" sudah digunakan pengguna lain.`, 'danger');
      return;
    }

    const targetUser = users[userIndex];

    // Protection: Prevent demoting the last active administrator
    if (targetUser.role === 'admin' && role !== 'admin') {
      const remainingAdmins = users.filter((u, idx) => idx !== userIndex && u.role === 'admin' && u.status === 'active');
      if (remainingAdmins.length === 0) {
        showToast('Aksi Ditolak', 'Tidak dapat mengubah peran admin terakhir menjadi user biasa. Sistem membutuhkan minimal satu Administrator.', 'warning');
        return;
      }
    }

    const oldUsername = targetUser.username;
    targetUser.fullName = fullName;
    targetUser.username = username;
    targetUser.email = email;
    targetUser.role = role;
    targetUser.department = department;
    targetUser.avatar = avatar;

    if (password && password.trim().length > 0) {
      if (password.length < 6) {
        showToast('Kata Sandi Lemah', 'Kata sandi minimal harus 6 karakter.', 'warning');
        return;
      }
      targetUser.password = password;
    }

    // Sync session if updating self
    const isSelf = state.currentUser && (
      (targetUser.id && state.currentUser.id && String(state.currentUser.id) === String(targetUser.id)) ||
      (state.currentUser.username && state.currentUser.username.toLowerCase() === oldUsername.toLowerCase())
    );

    if (isSelf) {
      state.currentUser.fullName = fullName;
      state.currentUser.username = username;
      state.currentUser.email = email;
      state.currentUser.role = role;
      state.currentUser.department = department;
      state.currentUser.avatar = avatar;
      if (password && password.trim().length > 0) {
        state.currentUser.password = password;
      }
      state.setSession(state.currentUser, false);

      if (UI.sidebarUserName) UI.sidebarUserName.textContent = fullName;
      if (UI.sidebarUserAvatar) UI.sidebarUserAvatar.src = avatar;
      if (UI.topbarUserName) UI.topbarUserName.textContent = fullName;
      if (UI.topbarUserAvatar) UI.topbarUserAvatar.src = avatar;
      if (UI.sidebarUserRoleBadge) UI.sidebarUserRoleBadge.textContent = role.toUpperCase();
    }

    state.saveUsers(users);

    const adminName = (state.currentUser && (state.currentUser.fullName || state.currentUser.username)) || 'Administrator';
    state.addLog(
      'UPDATE_USER',
      'Ubah Anggota Team',
      `Admin ${adminName} memperbarui data anggota team: ${fullName} (@${username}) pada layanan ${department}.`
    );

    showToast('Data Diperbarui', `Data anggota team <strong>${fullName}</strong> berhasil disimpan.`, 'success');
    closeRegisterUserModal();
    renderUserManagementPage();
    return true;
  }
}

// TEST 1: Open Edit Modal for Admin
console.log('Test 1: Opening Edit Modal for usr_admin_1 (Logged-in admin)...');
openEditUserModal('usr_admin_1');
assert.strictEqual(UI.regUserId.value, 'usr_admin_1');
assert.strictEqual(UI.regFullName.value, 'Budi Santoso, S.Kom');
assert.strictEqual(UI.regRole.value, 'admin');
assert.strictEqual(UI.regDept.value, 'ADMINISTRATOR');
assert.strictEqual(UI.regPassword.value, '');
assert.strictEqual(UI.regPassword.attributes.required, undefined, 'required attribute must be removed');
assert.strictEqual(UI.regPassword.attributes.minlength, undefined, 'minlength attribute must be removed');
console.log('✓ Test 1 passed!');

// TEST 2: Update Logged-in Admin Data (Full Name, Department, Email) without changing password
console.log('Test 2: Submitting Admin Update without password change...');
UI.regFullName.value = 'Budi Santoso, M.Kom, Ph.D';
UI.regEmail.value = 'budi.santoso.lead@drive.internal';
UI.regDept.value = 'MANAGEMENT';
// password remains empty

const result = handleRegisterUserSubmit({ preventDefault: () => {} });
assert.strictEqual(result, true, 'Form submit must succeed');

// Verify state.currentUser was updated
assert.strictEqual(state.currentUser.fullName, 'Budi Santoso, M.Kom, Ph.D');
assert.strictEqual(state.currentUser.email, 'budi.santoso.lead@drive.internal');
assert.strictEqual(state.currentUser.department, 'MANAGEMENT');
assert.strictEqual(state.currentUser.password, 'admin123', 'Password should not change when left blank');

// Verify localStorage vortex_users was updated
const savedUsers = state.getUsers();
const updatedAdmin1 = savedUsers.find(u => u.id === 'usr_admin_1');
assert.strictEqual(updatedAdmin1.fullName, 'Budi Santoso, M.Kom, Ph.D');
assert.strictEqual(updatedAdmin1.department, 'MANAGEMENT');
assert.strictEqual(updatedAdmin1.password, 'admin123');

// Verify UI topbar & sidebar were updated
assert.strictEqual(UI.topbarUserName.textContent, 'Budi Santoso, M.Kom, Ph.D');
assert.strictEqual(UI.sidebarUserName.textContent, 'Budi Santoso, M.Kom, Ph.D');
assert.strictEqual(global.lastToast.type, 'success');
console.log('✓ Test 2 passed!');

// TEST 3: Update Another Admin (usr_admin_2) with new password
console.log('Test 3: Updating another Admin (usr_admin_2) with new password...');
openEditUserModal('usr_admin_2');
assert.strictEqual(UI.regFullName.value, 'Dewi Lestari, M.T.');
assert.strictEqual(UI.regDept.value, 'MANAGEMENT');

UI.regFullName.value = 'Dewi Lestari, M.T., IPM';
UI.regPassword.value = 'newpass2026';
handleRegisterUserSubmit({ preventDefault: () => {} });

const updatedAdmin2 = state.getUsers().find(u => u.id === 'usr_admin_2');
assert.strictEqual(updatedAdmin2.fullName, 'Dewi Lestari, M.T., IPM');
assert.strictEqual(updatedAdmin2.password, 'newpass2026');
console.log('✓ Test 3 passed!');

// TEST 4: Protection - Trying to demote the only admin when only 1 admin left
console.log('Test 4: Demotion protection when only 1 admin remains...');
// Set only 1 admin in state
const singleAdminUsers = [
  { id: 'admin_only', username: 'superadmin', role: 'admin', status: 'active', fullName: 'Super Admin', email: 'sa@sa.com', department: 'ADMINISTRATOR' },
  { id: 'user_1', username: 'user1', role: 'user', status: 'active', fullName: 'User 1', email: 'u1@u1.com', department: 'CSO INBOUND' }
];
state.saveUsers(singleAdminUsers);
state.currentUser = singleAdminUsers[0];

openEditUserModal('admin_only');
UI.regRole.value = 'user'; // Attempt to demote the only admin
const demoteRes = handleRegisterUserSubmit({ preventDefault: () => {} });
assert.strictEqual(demoteRes, undefined, 'Must not succeed');
assert.strictEqual(global.lastToast.type, 'warning');
assert.strictEqual(global.lastToast.title, 'Aksi Ditolak');

// Verify user is still admin
assert.strictEqual(state.getUsers().find(u => u.id === 'admin_only').role, 'admin');
console.log('✓ Test 4 passed!');

// TEST 5: Admin with custom department not in select options
console.log('Test 5: Dynamic option injection for admin with custom department...');
const customAdminUser = {
  id: 'admin_it',
  username: 'it_head',
  fullName: 'Kepala IT',
  email: 'it@drive.internal',
  role: 'admin',
  department: 'IT & INFRASTRUCTURE SPECIALIST',
  status: 'active'
};
state.saveUsers([...singleAdminUsers, customAdminUser]);
openEditUserModal('admin_it');
assert.strictEqual(UI.regDept.value, 'IT & INFRASTRUCTURE SPECIALIST', 'Custom department must be preserved');
handleRegisterUserSubmit({ preventDefault: () => {} });
const savedCustom = state.getUsers().find(u => u.id === 'admin_it');
assert.strictEqual(savedCustom.department, 'IT & INFRASTRUCTURE SPECIALIST');
console.log('✓ Test 5 passed!');

console.log('========================================');
console.log('ALL TESTS PASSED SUCCESSFULLY (5/5)');
console.log('========================================');
