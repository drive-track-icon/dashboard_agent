/**
 * VORTEX CORE - Dashboard Admin & User
 * Role-Based Access Control (RBAC) System
 * Color Theme: Merah (Red), Hitam (Black), Abu-abu (Gray)
 */

// ==========================================
// 1. DATA SEEDING & INITIAL STATE
// ==========================================

const DEFAULT_USERS = [
  {
    id: 'usr_admin_1',
    username: 'admin',
    password: 'admin123',
    fullName: 'Budi Santoso, S.Kom',
    email: 'admin@vortex.internal',
    role: 'admin',
    department: 'IT Infrastructure & Security',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-10 08:30'
  },
  {
    id: 'usr_user_1',
    username: 'user',
    password: 'user123',
    fullName: 'Siti Rahma',
    email: 'siti.rahma@vortex.internal',
    role: 'user',
    department: 'Logistik & Operasional Gudang',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15 09:15'
  },
  {
    id: 'usr_user_2',
    username: 'ahmad_fauzi',
    password: 'user123',
    fullName: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@vortex.internal',
    role: 'user',
    department: 'Staf Audit Inventaris',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01 11:20'
  },
  {
    id: 'usr_admin_2',
    username: 'dewi_lestari',
    password: 'admin123',
    fullName: 'Dewi Lestari, M.T.',
    email: 'dewi.lestari@vortex.internal',
    role: 'admin',
    department: 'Kepala Divisi Operasional TI',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-05 14:00'
  }
];

const DEFAULT_ITEMS = [
  {
    id: 'item_1',
    code: 'SRV-DL-01',
    name: 'Server Dell PowerEdge R750 Enterprise',
    category: 'Jaringan & Server',
    price: 68500000,
    stock: 6,
    description: 'Dual Xeon Gold 6330, RAM 128GB ECC DDR4, 4x 1.92TB NVMe SSD Enterprise, Dual 800W PSU Platinum.',
    location: 'Data Center Lt. 2 - Rack 04',
    condition: 'Baru (Segel)',
    updatedAt: '2026-09-24 14:15',
    updatedBy: 'Budi Santoso'
  },
  {
    id: 'item_2',
    code: 'WS-XPS-15',
    name: 'Workstation Dell XPS 15 9530 Core i9',
    category: 'Perangkat Keras',
    price: 34500000,
    stock: 14,
    description: 'Intel Core i9-13900H, RTX 4070 8GB, 32GB DDR5, 1TB NVMe, Layar 3.5K OLED Touchscreen.',
    location: 'Gudang Inventaris A - Rak L02',
    condition: 'Baru (Segel)',
    updatedAt: '2026-09-22 10:30',
    updatedBy: 'Dewi Lestari'
  },
  {
    id: 'item_3',
    code: 'SW-CSC-48',
    name: 'Cisco Catalyst 9300 48-Port PoE+ Switch',
    category: 'Jaringan & Server',
    price: 42000000,
    stock: 8,
    description: 'Switch Managed Layer 3, 48 port Gigabit Ethernet PoE+ (740W Power Budget), 4x 10G SFP+ Uplinks.',
    location: 'Data Center Lt. 2 - Rack 01',
    condition: 'Sangat Baik',
    updatedAt: '2026-09-20 16:45',
    updatedBy: 'Budi Santoso'
  },
  {
    id: 'item_4',
    code: 'MON-LG-38',
    name: 'Monitor LG UltraWide 38 Curved IPS 144Hz',
    category: 'Aksesoris & Peripheral',
    price: 18900000,
    stock: 22,
    description: 'Resolusi 3840x1600 WQHD+, Thunderbolt 3, 98% DCI-P3 Color Gamut, HDR 600 untuk desainer.',
    location: 'Gudang Periferal Lt. 1 - Rak M05',
    condition: 'Baru (Segel)',
    updatedAt: '2026-09-21 09:10',
    updatedBy: 'Budi Santoso'
  },
  {
    id: 'item_5',
    code: 'UPS-APC-3K',
    name: 'APC Smart-UPS On-Line 3000VA 230V',
    category: 'Elektronik',
    price: 24700000,
    stock: 4,
    description: 'Pure Sine Wave Double-Conversion On-Line UPS dengan SmartSlot Network Management Card.',
    location: 'Ruang Genset / Power Rack',
    condition: 'Baru (Segel)',
    updatedAt: '2026-09-18 11:20',
    updatedBy: 'Dewi Lestari'
  },
  {
    id: 'item_6',
    code: 'PRT-HP-E876',
    name: 'Printer Multifungsi Laser HP LaserJet Pro E876',
    category: 'Peralatan Kantor',
    price: 52000000,
    stock: 2,
    description: 'A3 Multifunction Printer, Duplex Print/Scan, 50 ppm, Secure Enterprise Firmware.',
    location: 'Divisi Operasional & Administrasi Lt. 3',
    condition: 'Sangat Baik',
    updatedAt: '2026-09-15 13:00',
    updatedBy: 'Budi Santoso'
  },
  {
    id: 'item_7',
    code: 'CAM-SONY-4K',
    name: 'Kamera Konferensi PTZ Sony 4K PoE',
    category: 'Elektronik',
    price: 15300000,
    stock: 9,
    description: 'Optical Zoom 30x, AI Auto-tracking speaker, NDI|HX compatible, HDMI & IP Streaming.',
    location: 'Ruang Rapat Utama Lt. 4',
    condition: 'Sangat Baik',
    updatedAt: '2026-09-12 15:30',
    updatedBy: 'Budi Santoso'
  },
  {
    id: 'item_8',
    code: 'AP-UBI-U6P',
    name: 'UniFi Access Point U6 Pro WiFi 6 Dual Band',
    category: 'Jaringan & Server',
    price: 3400000,
    stock: 35,
    description: 'High-performance WiFi 6 AP dengan throughput agregat 5.3 Gbps, coverage luas hingga 140 m2.',
    location: 'Gudang Inventaris A - Rak N01',
    condition: 'Baru (Segel)',
    updatedAt: '2026-09-25 08:45',
    updatedBy: 'Dewi Lestari'
  },
  {
    id: 'item_9',
    code: 'CAB-NET-CAT6',
    name: 'Kabel UTP Belden Cat6 1000ft (305 Meter)',
    category: 'Aksesoris & Peripheral',
    price: 2150000,
    stock: 1,
    description: 'Pure Bare Copper 23 AWG, CMP Plenum Rated, High Speed Gigabit Transmission.',
    location: 'Gudang Kabel & Perlengkapan B1',
    condition: 'Baru (Segel)',
    updatedAt: '2026-09-23 11:10',
    updatedBy: 'Budi Santoso'
  },
  {
    id: 'item_10',
    code: 'NAS-SYN-1621',
    name: 'NAS Synology DiskStation DS1621+ 6-Bay',
    category: 'Jaringan & Server',
    price: 16800000,
    stock: 0,
    description: 'AMD Ryzen V1500B Quad-core 2.2GHz, Dual M.2 2280 NVMe SSD slots untuk cache akselerasi.',
    location: 'Sedang Habis - Menunggu PO Vendor',
    condition: 'Baru (Segel)',
    updatedAt: '2026-09-26 13:40',
    updatedBy: 'Budi Santoso'
  }
];

const DEFAULT_LOGS = [
  {
    id: 'log_1',
    timestamp: '2026-09-26 15:10',
    user: 'Budi Santoso (Admin)',
    actionType: 'UPDATE_ITEM',
    actionBadge: 'Ubah Data',
    details: 'Memperbarui stok NAS Synology DiskStation DS1621+ menjadi 0 (Habis).',
    status: 'Sukses'
  },
  {
    id: 'log_2',
    timestamp: '2026-09-26 14:05',
    user: 'Siti Rahma (User)',
    actionType: 'LOGIN',
    actionBadge: 'Login',
    details: 'Pengguna masuk ke sistem melalui portal otentikasi (Mode Tinjauan).',
    status: 'Sukses'
  },
  {
    id: 'log_3',
    timestamp: '2026-09-25 08:45',
    user: 'Dewi Lestari (Admin)',
    actionType: 'CREATE_ITEM',
    actionBadge: 'Tambah Data',
    details: 'Menambahkan produk baru: UniFi Access Point U6 Pro (35 Unit).',
    status: 'Sukses'
  },
  {
    id: 'log_4',
    timestamp: '2026-09-24 16:30',
    user: 'Budi Santoso (Admin)',
    actionType: 'REGISTER_USER',
    actionBadge: 'Daftar User',
    details: 'Mendaftarkan pengguna baru: Ahmad Fauzi dengan hak akses User Biasa.',
    status: 'Sukses'
  }
];

// ==========================================
// 2. STATE MANAGER
// ==========================================

class AppState {
  constructor() {
    this.initStorage();
    this.currentUser = this.loadSession();
    this.currentPage = 'overview';
    this.searchQuery = '';
    this.selectedCategory = 'ALL';
    this.selectedStatus = 'ALL';
    this.currentDataPage = 1;
    this.itemsPerPage = 6;
    this.sortField = 'code';
    this.sortOrder = 'asc';

    // Pending delete action
    this.pendingDelete = null; // { type: 'item'|'user', id: string, name: string }

    // Chart instances
    this.monthlyChartInstance = null;
    this.categoryDonutInstance = null;
  }

  initStorage() {
    if (!localStorage.getItem('vortex_users')) {
      localStorage.setItem('vortex_users', JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem('vortex_items')) {
      localStorage.setItem('vortex_items', JSON.stringify(DEFAULT_ITEMS));
    }
    if (!localStorage.getItem('vortex_logs')) {
      localStorage.setItem('vortex_logs', JSON.stringify(DEFAULT_LOGS));
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('vortex_users') || '[]');
  }

  saveUsers(users) {
    localStorage.setItem('vortex_users', JSON.stringify(users));
  }

  getItems() {
    return JSON.parse(localStorage.getItem('vortex_items') || '[]');
  }

  saveItems(items) {
    localStorage.setItem('vortex_items', JSON.stringify(items));
  }

  getLogs() {
    return JSON.parse(localStorage.getItem('vortex_logs') || '[]');
  }

  saveLogs(logs) {
    localStorage.setItem('vortex_logs', JSON.stringify(logs));
  }

  addLog(actionType, actionBadge, details, status = 'Sukses') {
    const logs = this.getLogs();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    const newLog = {
      id: 'log_' + Date.now(),
      timestamp: formattedDate,
      user: this.currentUser ? `${this.currentUser.fullName} (${this.currentUser.role.toUpperCase()})` : 'Sistem',
      actionType,
      actionBadge,
      details,
      status
    };

    logs.unshift(newLog);
    if (logs.length > 100) logs.pop(); // keep latest 100 logs
    this.saveLogs(logs);
  }

  loadSession() {
    const session = localStorage.getItem('vortex_session');
    return session ? JSON.parse(session) : null;
  }

  setSession(user) {
    this.currentUser = user;
    localStorage.setItem('vortex_session', JSON.stringify(user));
  }

  clearSession() {
    this.currentUser = null;
    localStorage.removeItem('vortex_session');
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  resetAllData() {
    localStorage.setItem('vortex_users', JSON.stringify(DEFAULT_USERS));
    localStorage.setItem('vortex_items', JSON.stringify(DEFAULT_ITEMS));
    localStorage.setItem('vortex_logs', JSON.stringify(DEFAULT_LOGS));
    if (this.currentUser) {
      // keep current user object updated from default
      const found = DEFAULT_USERS.find(u => u.username === this.currentUser.username);
      if (found) this.setSession(found);
    }
  }
}

const state = new AppState();

// ==========================================
// 3. UI CONTROLLER & RENDERING
// ==========================================

const UI = {
  // Elements
  loginView: document.getElementById('loginView'),
  dashboardView: document.getElementById('dashboardView'),
  loginForm: document.getElementById('loginForm'),
  loginUsername: document.getElementById('loginUsername'),
  loginPassword: document.getElementById('loginPassword'),
  btnQuickAdmin: document.getElementById('btnQuickAdmin'),
  btnQuickUser: document.getElementById('btnQuickUser'),
  btnTogglePassword: document.getElementById('btnTogglePassword'),
  togglePasswordIcon: document.getElementById('togglePasswordIcon'),
  toastContainer: document.getElementById('toastContainer'),

  // Dashboard Nav & Shell
  sidebar: document.getElementById('sidebar'),
  sidebarOverlay: document.getElementById('sidebarOverlay'),
  menuToggleBtn: document.getElementById('menuToggleBtn'),
  sidebarCloseBtn: document.getElementById('sidebarCloseBtn'),
  sidebarUserName: document.getElementById('sidebarUserName'),
  sidebarUserAvatar: document.getElementById('sidebarUserAvatar'),
  sidebarUserRoleBadge: document.getElementById('sidebarUserRoleBadge'),
  sidebarModeNotice: document.getElementById('sidebarModeNotice'),
  navUserLockBadge: document.getElementById('navUserLockBadge'),
  btnLogoutSidebar: document.getElementById('btnLogoutSidebar'),
  breadcrumbTitle: document.getElementById('breadcrumbTitle'),

  // Topbar
  topbarRolePill: document.getElementById('topbarRolePill'),
  topbarRoleText: document.getElementById('topbarRoleText'),
  topbarUserAvatar: document.getElementById('topbarUserAvatar'),
  topbarUserName: document.getElementById('topbarUserName'),
  userTopbarBtn: document.getElementById('userTopbarBtn'),
  userDropdownMenu: document.getElementById('userDropdownMenu'),
  dropdownFullName: document.getElementById('dropdownFullName'),
  dropdownEmail: document.getElementById('dropdownEmail'),
  dropdownRoleTag: document.getElementById('dropdownRoleTag'),
  dropdownItemLogout: document.getElementById('dropdownItemLogout'),
  dropdownItemProfile: document.getElementById('dropdownItemProfile'),
  dropdownItemSwitchRole: document.getElementById('dropdownItemSwitchRole'),
  btnQuickSwitch: document.getElementById('btnQuickSwitch'),
  btnNotifications: document.getElementById('btnNotifications'),
  notificationDropdown: document.getElementById('notificationDropdown'),
  notificationList: document.getElementById('notificationList'),
  userRoleAlertBanner: document.getElementById('userRoleAlertBanner'),
  btnBannerSwitchAdmin: document.getElementById('btnBannerSwitchAdmin'),
  realtimeClock: document.getElementById('realtimeClock'),

  // Pages
  pages: {
    overview: document.getElementById('pageOverview'),
    'data-management': document.getElementById('pageDataManagement'),
    'user-management': document.getElementById('pageUserManagement'),
    'activity-log': document.getElementById('pageActivityLog'),
    settings: document.getElementById('pageSettings')
  },

  // Modals
  modalDataForm: document.getElementById('modalDataForm'),
  dataItemForm: document.getElementById('dataItemForm'),
  modalDataTitle: document.getElementById('modalDataTitle'),
  modalDataIcon: document.getElementById('modalDataIcon'),
  formItemId: document.getElementById('formItemId'),
  formItemCode: document.getElementById('formItemCode'),
  formItemCategory: document.getElementById('formItemCategory'),
  formItemName: document.getElementById('formItemName'),
  formItemPrice: document.getElementById('formItemPrice'),
  formItemStock: document.getElementById('formItemStock'),
  formItemDesc: document.getElementById('formItemDesc'),
  formItemLocation: document.getElementById('formItemLocation'),
  formItemCondition: document.getElementById('formItemCondition'),
  btnSubmitDataText: document.getElementById('btnSubmitDataText'),
  btnCloseDataModal: document.getElementById('btnCloseDataModal'),
  btnCancelDataModal: document.getElementById('btnCancelDataModal'),
  btnOpenAddDataModal: document.getElementById('btnOpenAddDataModal'),
  btnOverviewQuickAdd: document.getElementById('btnOverviewQuickAdd'),
  addDataDisabledTooltip: document.getElementById('addDataDisabledTooltip'),

  // View Detail Modal
  modalViewDetail: document.getElementById('modalViewDetail'),
  btnCloseViewDetail: document.getElementById('btnCloseViewDetail'),
  btnCloseViewDetailBtn: document.getElementById('btnCloseViewDetailBtn'),
  viewDetailSku: document.getElementById('viewDetailSku'),
  viewDetailName: document.getElementById('viewDetailName'),
  viewDetailCategory: document.getElementById('viewDetailCategory'),
  viewDetailStockStatus: document.getElementById('viewDetailStockStatus'),
  viewDetailPrice: document.getElementById('viewDetailPrice'),
  viewDetailStock: document.getElementById('viewDetailStock'),
  viewDetailTotalVal: document.getElementById('viewDetailTotalVal'),
  viewDetailCondition: document.getElementById('viewDetailCondition'),
  viewDetailLocation: document.getElementById('viewDetailLocation'),
  viewDetailDesc: document.getElementById('viewDetailDesc'),
  viewDetailUpdated: document.getElementById('viewDetailUpdated'),

  // User Register Modal
  modalRegisterUser: document.getElementById('modalRegisterUser'),
  registerUserForm: document.getElementById('registerUserForm'),
  btnOpenRegisterUserModal: document.getElementById('btnOpenRegisterUserModal'),
  btnCloseRegisterModal: document.getElementById('btnCloseRegisterModal'),
  btnCancelRegisterModal: document.getElementById('btnCancelRegisterModal'),
  regFullName: document.getElementById('regFullName'),
  regUsername: document.getElementById('regUsername'),
  regEmail: document.getElementById('regEmail'),
  regRole: document.getElementById('regRole'),
  regDept: document.getElementById('regDept'),
  regPassword: document.getElementById('regPassword'),

  // Confirm Delete Modal
  modalConfirmDelete: document.getElementById('modalConfirmDelete'),
  confirmDeleteTitle: document.getElementById('confirmDeleteTitle'),
  confirmDeleteMessage: document.getElementById('confirmDeleteMessage'),
  btnCancelDelete: document.getElementById('btnCancelDelete'),
  btnExecuteDelete: document.getElementById('btnExecuteDelete'),

  // Tables & Content
  dataTableBody: document.getElementById('dataTableBody'),
  tableEmptyState: document.getElementById('tableEmptyState'),
  tableInfoText: document.getElementById('tableInfoText'),
  paginationControls: document.getElementById('paginationControls'),
  searchInput: document.getElementById('searchInput'),
  btnClearSearch: document.getElementById('btnClearSearch'),
  filterCategory: document.getElementById('filterCategory'),
  filterStatus: document.getElementById('filterStatus'),
  btnResetFilters: document.getElementById('btnResetFilters'),
  btnExportCSV: document.getElementById('btnExportCSV'),
  btnExportJSON: document.getElementById('btnExportJSON'),

  // User Management
  userTableBody: document.getElementById('userTableBody'),
  searchUserInput: document.getElementById('searchUserInput'),
  filterUserRole: document.getElementById('filterUserRole'),
  filterUserStatus: document.getElementById('filterUserStatus'),
  countAdminUsers: document.getElementById('countAdminUsers'),
  countRegularUsers: document.getElementById('countRegularUsers'),
  countActiveUsers: document.getElementById('countActiveUsers'),
  countInactiveUsers: document.getElementById('countInactiveUsers'),

  // Activity Log
  auditLogsTableBody: document.getElementById('auditLogsTableBody'),
  searchLogInput: document.getElementById('searchLogInput'),
  filterLogType: document.getElementById('filterLogType'),
  btnClearAuditLogs: document.getElementById('btnClearAuditLogs'),

  // Overview Widgets
  tbodyOverviewRecent: document.getElementById('tbodyOverviewRecent'),
  overviewActivityTimeline: document.getElementById('overviewActivityTimeline'),
  btnRefreshStats: document.getElementById('btnRefreshStats'),
  btnOverviewViewAll: document.getElementById('btnOverviewViewAll'),
  btnOverviewLogAll: document.getElementById('btnOverviewLogAll'),

  // Settings
  settingsRoleBadge: document.getElementById('settingsRoleBadge'),
  settingsUserAvatar: document.getElementById('settingsUserAvatar'),
  settingsFullname: document.getElementById('settingsFullname'),
  settingsUsername: document.getElementById('settingsUsername'),
  settingsRolePill: document.getElementById('settingsRolePill'),
  settingsEmail: document.getElementById('settingsEmail'),
  settingsDept: document.getElementById('settingsDept'),
  settingsItemPerm: document.getElementById('settingsItemPerm'),
  settingsUserPerm: document.getElementById('settingsUserPerm'),
  btnSettingsSwitchAdmin: document.getElementById('btnSettingsSwitchAdmin'),
  btnSettingsSwitchUser: document.getElementById('btnSettingsSwitchUser'),
  btnResetAllData: document.getElementById('btnResetAllData')
};

// ==========================================
// 4. UTILITIES (FORMATTING & TOASTS)
// ==========================================

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

function showToast(title, message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconHtml = '<i class="fa-solid fa-circle-info toast-icon"></i>';
  if (type === 'success') iconHtml = '<i class="fa-solid fa-circle-check toast-icon"></i>';
  if (type === 'danger') iconHtml = '<i class="fa-solid fa-circle-exclamation toast-icon"></i>';
  if (type === 'warning') iconHtml = '<i class="fa-solid fa-triangle-exclamation toast-icon"></i>';

  toast.innerHTML = `
    ${iconHtml}
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close-btn" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
  `;

  const closeBtn = toast.querySelector('.toast-close-btn');
  closeBtn.addEventListener('click', () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 250);
  });

  UI.toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 250);
    }
  }, 4000);
}

function startClock() {
  function update() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    if (UI.realtimeClock) {
      UI.realtimeClock.textContent = `${hrs}:${mins}:${secs} WIB`;
    }
  }
  update();
  setInterval(update, 1000);
}

// ==========================================
// 5. AUTHENTICATION & ROLE SWITCHING
// ==========================================

function handleLogin(username, password) {
  const users = state.getUsers();
  const user = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());

  if (!user) {
    showToast('Login Gagal', 'Username tidak ditemukan di dalam sistem.', 'danger');
    return false;
  }

  if (user.password !== password) {
    showToast('Login Gagal', 'Kata sandi yang Anda masukkan keliru.', 'danger');
    return false;
  }

  if (user.status !== 'active') {
    showToast('Akses Ditolak', 'Akun ini sedang ditangguhkan/nonaktif oleh Admin.', 'danger');
    return false;
  }

  // Set session
  state.setSession(user);
  state.addLog('LOGIN', 'Login', `Pengguna ${user.fullName} berhasil masuk dengan peran ${user.role.toUpperCase()}.`);

  showToast(
    'Login Berhasil',
    `Selamat datang, <strong>${user.fullName}</strong> (${user.role === 'admin' ? 'Administrator' : 'Pengguna Biasa'}).`,
    'success'
  );

  renderAppView();
  return true;
}

function handleLogout() {
  if (state.currentUser) {
    state.addLog('LOGIN', 'Keluar', `Pengguna ${state.currentUser.fullName} mengakhiri sesi dashboard.`);
  }
  state.clearSession();
  showToast('Sesi Berakhir', 'Anda telah keluar dari sistem secara aman.', 'info');
  renderAppView();
}

function switchUserRole(targetRole) {
  const users = state.getUsers();
  const targetUser = users.find(u => u.role === targetRole && u.status === 'active');
  if (targetUser) {
    state.setSession(targetUser);
    state.addLog('LOGIN', 'Ganti Peran', `Beralih peran secara instan ke ${targetUser.fullName} (${targetUser.role.toUpperCase()}).`);
    showToast('Peran Diperbarui', `Beralih ke akun <strong>${targetUser.fullName}</strong> (${targetUser.role.toUpperCase()}).`, 'success');
    renderAppView();
  }
}

// ==========================================
// 6. VIEW SWITCHER & RBAC ENFORCEMENT
// ==========================================

function renderAppView() {
  if (!state.currentUser) {
    // Show Login Screen
    UI.loginView.classList.remove('hidden');
    UI.dashboardView.classList.add('hidden');
    document.title = 'VORTEX | Masuk Sistem';
    return;
  }

  // Show Dashboard
  UI.loginView.classList.add('hidden');
  UI.dashboardView.classList.remove('hidden');
  document.title = `VORTEX | ${state.isAdmin() ? 'Admin Portal' : 'User Portal'}`;

  // Update User Profile details across the UI
  const u = state.currentUser;
  const isAdmin = state.isAdmin();

  // Sidebar profile
  UI.sidebarUserName.textContent = u.fullName;
  UI.sidebarUserAvatar.src = u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  
  if (isAdmin) {
    UI.sidebarUserRoleBadge.className = 'badge badge-admin';
    UI.sidebarUserRoleBadge.innerHTML = '<i class="fa-solid fa-crown"></i> Admin';
    UI.sidebarModeNotice.className = 'sidebar-mode-notice mode-admin';
    UI.sidebarModeNotice.innerHTML = '<i class="fa-solid fa-unlock-keyhole"></i> <span>Akses: <strong>Penuh (CRUD)</strong></span>';
    UI.navUserLockBadge.className = 'nav-badge-lock';
    UI.navUserLockBadge.innerHTML = '<i class="fa-solid fa-check"></i> Akses';
  } else {
    UI.sidebarUserRoleBadge.className = 'badge badge-user';
    UI.sidebarUserRoleBadge.innerHTML = '<i class="fa-solid fa-eye"></i> User';
    UI.sidebarModeNotice.className = 'sidebar-mode-notice mode-user';
    UI.sidebarModeNotice.innerHTML = '<i class="fa-solid fa-lock"></i> <span>Akses: <strong>Hanya Lihat</strong></span>';
    UI.navUserLockBadge.className = 'nav-badge-lock';
    UI.navUserLockBadge.innerHTML = '<i class="fa-solid fa-lock"></i> Admin';
  }

  // Topbar Profile & Pill
  UI.topbarUserAvatar.src = u.avatar;
  UI.topbarUserName.textContent = u.fullName.split(' ')[0];
  UI.dropdownFullName.textContent = u.fullName;
  UI.dropdownEmail.textContent = u.email;
  UI.dropdownRoleTag.textContent = `Hak Akses: ${isAdmin ? 'Administrator (Akses Penuh)' : 'Pengguna Biasa (Read-Only)'}`;

  if (isAdmin) {
    UI.topbarRolePill.className = 'current-role-pill pill-admin';
    UI.topbarRoleText.textContent = 'Admin (Akses Penuh)';
    UI.userRoleAlertBanner.classList.add('hidden');
    // Enable Add Data buttons
    UI.btnOpenAddDataModal.disabled = false;
    UI.btnOpenAddDataModal.classList.remove('opacity-50');
    UI.addDataDisabledTooltip.classList.add('hidden');
    if (UI.btnOverviewQuickAdd) UI.btnOverviewQuickAdd.classList.remove('hidden');
  } else {
    UI.topbarRolePill.className = 'current-role-pill pill-user';
    UI.topbarRoleText.textContent = 'User (Hanya Lihat)';
    UI.userRoleAlertBanner.classList.remove('hidden');
    // Disable Add Data buttons for Read-Only user
    UI.btnOpenAddDataModal.disabled = true;
    UI.addDataDisabledTooltip.classList.remove('hidden');
    if (UI.btnOverviewQuickAdd) UI.btnOverviewQuickAdd.classList.add('hidden');
  }

  // Update Data Permission Status Banner on Data page
  const bannerRoleLabel = document.getElementById('bannerRoleLabel');
  const bannerRoleDesc = document.getElementById('bannerRoleDesc');
  const bannerBadgePrivilege = document.getElementById('bannerBadgePrivilege');
  if (bannerRoleLabel && bannerRoleDesc && bannerBadgePrivilege) {
    if (isAdmin) {
      bannerRoleLabel.textContent = 'Otoritas Akses: Administrator Penuh';
      bannerRoleDesc.innerHTML = 'Anda memiliki izin untuk <strong>Menambah</strong>, <strong>Mengedit</strong>, dan <strong>Menghapus</strong> data pada katalog ini.';
      bannerBadgePrivilege.className = 'badge badge-admin';
      bannerBadgePrivilege.textContent = 'CRUD Diizinkan';
    } else {
      bannerRoleLabel.textContent = 'Otoritas Akses: Pengguna Biasa (Hanya Lihat)';
      bannerRoleDesc.innerHTML = 'Anda berada dalam mode <strong>Tinjauan (Read-Only)</strong>. Tombol Tambah, Ubah, dan Hapus dinonaktifkan.';
      bannerBadgePrivilege.className = 'badge badge-user';
      bannerBadgePrivilege.textContent = 'Hanya Lihat';
    }
  }

  // Settings page info
  if (UI.settingsUserAvatar) UI.settingsUserAvatar.src = u.avatar;
  if (UI.settingsFullname) UI.settingsFullname.textContent = u.fullName;
  if (UI.settingsUsername) UI.settingsUsername.textContent = '@' + u.username;
  if (UI.settingsEmail) UI.settingsEmail.textContent = u.email;
  if (UI.settingsDept) UI.settingsDept.textContent = u.department || '-';
  if (UI.settingsRoleBadge) {
    UI.settingsRoleBadge.className = isAdmin ? 'badge badge-admin' : 'badge badge-user';
    UI.settingsRoleBadge.textContent = isAdmin ? 'Admin' : 'User';
  }
  if (UI.settingsRolePill) {
    UI.settingsRolePill.textContent = isAdmin ? 'Hak Akses: Administrator' : 'Hak Akses: Pengguna Biasa';
  }
  if (UI.settingsItemPerm) {
    UI.settingsItemPerm.textContent = isAdmin ? 'Tambah, Edit, Hapus (Akses Penuh)' : 'Hanya Melihat Data (Terkunci)';
    UI.settingsItemPerm.className = isAdmin ? 'detail-value text-red' : 'detail-value text-gray';
  }
  if (UI.settingsUserPerm) {
    UI.settingsUserPerm.textContent = isAdmin ? 'Dapat Mendaftarkan User Baru' : 'Akses Ditolak (Khusus Admin)';
  }

  // Render active section
  navigateToPage(state.currentPage);
}

function navigateToPage(pageId) {
  // Guard check: User Management is strictly Admin only
  if (pageId === 'user-management' && !state.isAdmin()) {
    showToast(
      'Akses Dibatasi',
      'Hanya Administrator yang memiliki hak izin untuk mengakses menu <strong>Manajemen & Pendaftaran User</strong>.',
      'warning'
    );
    return;
  }

  state.currentPage = pageId;

  // Update active sidebar nav
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update breadcrumb
  const pageTitles = {
    overview: 'Ringkasan & Pusat Kendali',
    'data-management': 'Kelola Data Barang',
    'user-management': 'Manajemen Pengguna & Pendaftaran',
    'activity-log': 'Log Aktivitas & Jejak Audit',
    settings: 'Pengaturan & Alat Demo'
  };
  UI.breadcrumbTitle.textContent = pageTitles[pageId] || 'Dashboard';

  // Toggle page visibility
  Object.keys(UI.pages).forEach(key => {
    if (key === pageId) {
      UI.pages[key].classList.add('active');
    } else {
      UI.pages[key].classList.remove('active');
    }
  });

  // Close mobile sidebar if open
  closeMobileSidebar();

  // Trigger page-specific renders
  if (pageId === 'overview') {
    renderOverviewPage();
  } else if (pageId === 'data-management') {
    renderDataTable();
  } else if (pageId === 'user-management') {
    renderUserManagementPage();
  } else if (pageId === 'activity-log') {
    renderAuditLogs();
  }
}

// ==========================================
// 7. OVERVIEW PAGE & CHARTS
// ==========================================

function renderOverviewPage() {
  const items = state.getItems();
  const users = state.getUsers();
  const logs = state.getLogs();

  // Metrics
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.stock), 0);
  const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
  const lowStock = items.filter(i => i.stock > 0 && i.stock < 10).length;
  const outOfStock = items.filter(i => i.stock === 0).length;
  const normalStock = items.filter(i => i.stock >= 10).length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  document.getElementById('metricTotalValue').textContent = formatRupiah(totalValue);
  document.getElementById('metricTotalItems').textContent = `${items.length} Jenis (${totalStock} Unit)`;
  document.getElementById('metricLowStockCount').textContent = `${lowStock} Perlu Restock`;
  document.getElementById('metricAvailableCount').textContent = normalStock;
  document.getElementById('metricOutOfStockCount').textContent = outOfStock;
  document.getElementById('metricTotalUsers').textContent = users.length;
  document.getElementById('metricAdminRatio').textContent = `${adminCount} Admin`;

  const permLabel = document.getElementById('metricPermissionLabel');
  const permDesc = document.getElementById('metricPermissionDesc');
  const permBadge = document.getElementById('metricUserRoleBadge');
  if (state.isAdmin()) {
    permLabel.textContent = 'Akses Penuh';
    permDesc.textContent = 'Bisa Tambah, Ubah, Hapus & User';
    permBadge.textContent = 'Admin';
    permBadge.className = 'metric-badge badge-admin';
  } else {
    permLabel.textContent = 'Mode Lihat Saja';
    permDesc.textContent = 'Aksi Edit & Hapus Dinonaktifkan';
    permBadge.textContent = 'User Biasa';
    permBadge.className = 'metric-badge badge-user';
  }

  // Recent 5 items table
  const recentItems = [...items].slice(-5).reverse();
  UI.tbodyOverviewRecent.innerHTML = recentItems.map(item => `
    <tr>
      <td><span class="sku-code">${item.code}</span></td>
      <td><strong>${item.name}</strong></td>
      <td><span class="badge badge-gray">${item.category}</span></td>
      <td class="table-price">${formatRupiah(item.price)}</td>
      <td><strong>${item.stock}</strong></td>
      <td>${getStockBadge(item.stock)}</td>
    </tr>
  `).join('');

  // Recent Activity Timeline
  const recentLogs = logs.slice(0, 4);
  UI.overviewActivityTimeline.innerHTML = recentLogs.map(log => `
    <div class="timeline-item">
      <div class="timeline-icon ${log.actionType.includes('DELETE') ? 'icon-red' : ''}">
        <i class="${getLogIcon(log.actionType)}"></i>
      </div>
      <div class="timeline-content">
        <div class="timeline-text">
          <strong>${log.user}</strong>: ${log.details}
        </div>
        <span class="timeline-time">${log.timestamp}</span>
      </div>
    </div>
  `).join('');

  // Render Charts
  renderCharts(items);
}

function getStockBadge(stock) {
  if (stock === 0) {
    return '<span class="badge badge-red"><i class="fa-solid fa-circle-xmark"></i> Habis</span>';
  } else if (stock < 10) {
    return '<span class="badge badge-yellow"><i class="fa-solid fa-triangle-exclamation"></i> Menipis</span>';
  } else {
    return '<span class="badge badge-green"><i class="fa-solid fa-circle-check"></i> Tersedia</span>';
  }
}

function getLogIcon(type) {
  switch (type) {
    case 'LOGIN': return 'fa-solid fa-arrow-right-to-bracket';
    case 'CREATE_ITEM': return 'fa-solid fa-box-open';
    case 'UPDATE_ITEM': return 'fa-solid fa-pen-to-square';
    case 'DELETE_ITEM': return 'fa-solid fa-trash-can';
    case 'REGISTER_USER': return 'fa-solid fa-user-plus';
    case 'DELETE_USER': return 'fa-solid fa-user-xmark';
    default: return 'fa-solid fa-bell';
  }
}

function renderCharts(items) {
  if (typeof Chart === 'undefined') return;

  // Monthly Chart
  const monthlyCanvas = document.getElementById('monthlyChart');
  if (monthlyCanvas) {
    if (state.monthlyChartInstance) state.monthlyChartInstance.destroy();

    const ctx = monthlyCanvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, 'rgba(230, 46, 68, 0.45)');
    gradient.addColorStop(1, 'rgba(230, 46, 68, 0.0)');

    state.monthlyChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
        datasets: [
          {
            label: 'Total Nilai Aset (Juta Rp)',
            data: [120, 145, 178, 192, 215, 230, 260, 295, 340],
            borderColor: '#e62e44',
            backgroundColor: gradient,
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: '#ff3851',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            pointHoverRadius: 7
          },
          {
            label: 'Jumlah Stok Beredar',
            data: [45, 52, 60, 68, 75, 80, 88, 92, 105],
            borderColor: '#64748b',
            borderDash: [5, 5],
            borderWidth: 2,
            tension: 0.35,
            fill: false,
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#94a3b8',
              font: { family: 'Plus Jakarta Sans', size: 11 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(18, 22, 31, 0.95)',
            borderColor: '#283042',
            borderWidth: 1,
            titleColor: '#ffffff',
            bodyColor: '#cbd5e1'
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });
  }

  // Category Donut Chart
  const donutCanvas = document.getElementById('categoryDonutChart');
  if (donutCanvas) {
    if (state.categoryDonutInstance) state.categoryDonutInstance.destroy();

    // Group items by category
    const catMap = {};
    items.forEach(i => {
      catMap[i.category] = (catMap[i.category] || 0) + 1;
    });

    const categories = Object.keys(catMap);
    const counts = Object.values(catMap);
    const colors = ['#e62e44', '#b81427', '#475569', '#94a3b8', '#f59e0b'];

    state.categoryDonutInstance = new Chart(donutCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          data: counts,
          backgroundColor: colors.slice(0, categories.length),
          borderColor: '#141720',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false }
        }
      }
    });

    // Populate legend
    const legendContainer = document.getElementById('donutLegendList');
    if (legendContainer) {
      legendContainer.innerHTML = categories.map((cat, idx) => `
        <div class="donut-legend-item">
          <span><span class="legend-color-dot" style="background:${colors[idx % colors.length]}"></span>${cat}</span>
          <strong>${catMap[cat]} items</strong>
        </div>
      `).join('');
    }
  }
}

// ==========================================
// 8. DATA MANAGEMENT & CRUD (ADMIN & USER)
// ==========================================

function getFilteredData() {
  let items = state.getItems();

  // Search filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    items = items.filter(i => 
      i.code.toLowerCase().includes(q) ||
      i.name.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q) ||
      (i.location && i.location.toLowerCase().includes(q))
    );
  }

  // Category filter
  if (state.selectedCategory !== 'ALL') {
    items = items.filter(i => i.category === state.selectedCategory);
  }

  // Status filter
  if (state.selectedStatus === 'Tersedia') {
    items = items.filter(i => i.stock >= 10);
  } else if (state.selectedStatus === 'Menipis') {
    items = items.filter(i => i.stock > 0 && i.stock < 10);
  } else if (state.selectedStatus === 'Habis') {
    items = items.filter(i => i.stock === 0);
  }

  // Sorting
  items.sort((a, b) => {
    let valA = a[state.sortField];
    let valB = b[state.sortField];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return state.sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return state.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return items;
}

function renderDataTable() {
  const filtered = getFilteredData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / state.itemsPerPage) || 1;

  if (state.currentDataPage > totalPages) state.currentDataPage = totalPages;
  if (state.currentDataPage < 1) state.currentDataPage = 1;

  const startIdx = (state.currentDataPage - 1) * state.itemsPerPage;
  const pageItems = filtered.slice(startIdx, startIdx + state.itemsPerPage);

  const isAdmin = state.isAdmin();

  if (totalItems === 0) {
    UI.dataTableBody.innerHTML = '';
    UI.tableEmptyState.classList.remove('hidden');
    UI.tableInfoText.textContent = 'Menampilkan 0 dari 0 data';
    UI.paginationControls.innerHTML = '';
    return;
  }

  UI.tableEmptyState.classList.add('hidden');
  UI.tableInfoText.textContent = `Menampilkan ${startIdx + 1} - ${Math.min(startIdx + state.itemsPerPage, totalItems)} dari ${totalItems} data`;

  UI.dataTableBody.innerHTML = pageItems.map((item, index) => {
    const rowNo = startIdx + index + 1;
    
    // ACTION COLUMN LOGIC:
    // If Admin: Edit (Pencil) & Delete (Trash)
    // If User: View Detail (Eye) ONLY
    let actionButtons = '';
    if (isAdmin) {
      actionButtons = `
        <div class="table-actions-cell">
          <button class="btn-table-action btn-action-view" onclick="openViewDetailModal('${item.id}')" title="Lihat Rincian">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="btn-table-action btn-action-edit" onclick="openEditItemModal('${item.id}')" title="Ubah Data (Admin)">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-table-action btn-action-delete" onclick="promptDeleteItem('${item.id}', '${item.name.replace(/'/g, "\\'")}')" title="Hapus Data (Admin)">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    } else {
      actionButtons = `
        <div class="table-actions-cell">
          <button class="btn-table-action btn-action-view" onclick="openViewDetailModal('${item.id}')" title="Lihat Rincian Data (Hanya Lihat)">
            <i class="fa-regular fa-eye"></i>
          </button>
          <span class="badge badge-gray" style="font-size:0.65rem;" title="Hanya Admin yang dapat mengedit/menghapus">
            <i class="fa-solid fa-lock"></i> Terkunci
          </span>
        </div>
      `;
    }

    return `
      <tr>
        <td>${rowNo}</td>
        <td><span class="sku-code">${item.code}</span></td>
        <td>
          <div class="item-name-cell">
            <span>${item.name}</span>
            <small>${item.location || '-'}</small>
          </div>
        </td>
        <td><span class="badge badge-gray">${item.category}</span></td>
        <td class="table-price">${formatRupiah(item.price)}</td>
        <td><strong>${item.stock}</strong></td>
        <td>${getStockBadge(item.stock)}</td>
        <td><small class="text-muted">${item.updatedAt.split(' ')[0]}</small></td>
        <td>${actionButtons}</td>
      </tr>
    `;
  }).join('');

  // Render pagination
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  let html = `
    <button class="btn-page" ${state.currentDataPage === 1 ? 'disabled' : ''} onclick="changeDataPage(${state.currentDataPage - 1})">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="btn-page ${state.currentDataPage === i ? 'active' : ''}" onclick="changeDataPage(${i})">
        ${i}
      </button>
    `;
  }

  html += `
    <button class="btn-page ${state.currentDataPage === totalPages ? 'disabled' : ''} onclick="changeDataPage(${state.currentDataPage + 1})">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  `;

  UI.paginationControls.innerHTML = html;
}

window.changeDataPage = function(page) {
  state.currentDataPage = page;
  renderDataTable();
};

// ==========================================
// 9. MODALS: TAMBAH / UBAH / LIHAT BARANG
// ==========================================

function openAddItemModal() {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang memiliki izin untuk menambah data.', 'danger');
    return;
  }

  UI.modalDataTitle.textContent = 'Tambah Data Barang Baru';
  UI.btnSubmitDataText.textContent = 'Simpan Barang Baru';
  UI.modalDataIcon.className = 'fa-solid fa-box-open';
  UI.dataItemForm.reset();
  UI.formItemId.value = '';

  // Generate suggested code SKU
  const count = state.getItems().length + 1;
  UI.formItemCode.value = `ITM-2026-${String(count).padStart(3, '0')}`;

  UI.modalDataForm.classList.remove('hidden');
}

window.openEditItemModal = function(id) {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang memiliki izin untuk mengubah data.', 'danger');
    return;
  }

  const items = state.getItems();
  const item = items.find(i => i.id === id);
  if (!item) return;

  UI.modalDataTitle.textContent = 'Ubah Data Barang';
  UI.btnSubmitDataText.textContent = 'Perbarui Data';
  UI.modalDataIcon.className = 'fa-solid fa-pen-to-square';

  UI.formItemId.value = item.id;
  UI.formItemCode.value = item.code;
  UI.formItemCategory.value = item.category;
  UI.formItemName.value = item.name;
  UI.formItemPrice.value = item.price;
  UI.formItemStock.value = item.stock;
  UI.formItemDesc.value = item.description || '';
  UI.formItemLocation.value = item.location || '';
  UI.formItemCondition.value = item.condition || 'Baru (Segel)';

  UI.modalDataForm.classList.remove('hidden');
};

function closeDataModal() {
  UI.modalDataForm.classList.add('hidden');
}

function handleSaveDataItem(e) {
  e.preventDefault();

  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda tidak memiliki hak izin untuk menyimpan perubahan data.', 'danger');
    return;
  }

  const id = UI.formItemId.value;
  const code = UI.formItemCode.value.trim();
  const category = UI.formItemCategory.value;
  const name = UI.formItemName.value.trim();
  const price = parseInt(UI.formItemPrice.value) || 0;
  const stock = parseInt(UI.formItemStock.value) || 0;
  const description = UI.formItemDesc.value.trim();
  const location = UI.formItemLocation.value.trim();
  const condition = UI.formItemCondition.value;

  if (!code || !category || !name) {
    showToast('Form Belum Lengkap', 'Mohon lengkapi kode SKU, kategori, dan nama barang.', 'warning');
    return;
  }

  const items = state.getItems();
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  if (id) {
    // EDIT EXISTING ITEM
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        code,
        category,
        name,
        price,
        stock,
        description,
        location,
        condition,
        updatedAt: formattedDate,
        updatedBy: state.currentUser.fullName
      };

      state.saveItems(items);
      state.addLog('UPDATE_ITEM', 'Ubah Barang', `Admin ${state.currentUser.fullName} mengubah data barang [${code}] ${name}.`);
      showToast('Data Berhasil Diperbarui', `Barang <strong>${name}</strong> telah disimpan.`, 'success');
    }
  } else {
    // ADD NEW ITEM
    const newItem = {
      id: 'item_' + Date.now(),
      code,
      category,
      name,
      price,
      stock,
      description,
      location: location || 'Gudang Utama',
      condition: condition || 'Baru (Segel)',
      updatedAt: formattedDate,
      updatedBy: state.currentUser.fullName
    };

    items.unshift(newItem);
    state.saveItems(items);
    state.addLog('CREATE_ITEM', 'Tambah Barang', `Admin ${state.currentUser.fullName} menambahkan barang baru [${code}] ${name} (${stock} unit).`);
    showToast('Barang Ditambahkan', `Barang <strong>${name}</strong> berhasil didaftarkan ke katalog.`, 'success');
  }

  closeDataModal();
  renderDataTable();
  if (state.currentPage === 'overview') renderOverviewPage();
}

// VIEW DETAIL MODAL (Available to both Admin and User)
window.openViewDetailModal = function(id) {
  const items = state.getItems();
  const item = items.find(i => i.id === id);
  if (!item) return;

  UI.viewDetailSku.textContent = item.code;
  UI.viewDetailName.textContent = item.name;
  UI.viewDetailCategory.textContent = item.category;
  UI.viewDetailStockStatus.innerHTML = getStockBadge(item.stock);
  UI.viewDetailPrice.textContent = formatRupiah(item.price);
  UI.viewDetailStock.textContent = `${item.stock} Unit`;
  UI.viewDetailTotalVal.textContent = formatRupiah(item.price * item.stock);
  UI.viewDetailCondition.textContent = item.condition || 'Standar';
  UI.viewDetailLocation.textContent = item.location || 'Tidak ditentukan';
  UI.viewDetailDesc.textContent = item.description || 'Tidak ada deskripsi spesifikasi tambahan.';
  UI.viewDetailUpdated.textContent = `${item.updatedAt} oleh ${item.updatedBy || 'Sistem'}`;

  UI.modalViewDetail.classList.remove('hidden');
};

function closeViewDetailModal() {
  UI.modalViewDetail.classList.add('hidden');
}

// DELETE ITEM MODAL
window.promptDeleteItem = function(id, name) {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang memiliki hak izin menghapus barang.', 'danger');
    return;
  }

  state.pendingDelete = { type: 'item', id, name };
  UI.confirmDeleteTitle.textContent = 'Hapus Barang Ini?';
  UI.confirmDeleteMessage.innerHTML = `Anda akan menghapus barang <strong>${name}</strong> secara permanen dari sistem inventaris.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

function executePendingDelete() {
  if (!state.pendingDelete) return;

  const { type, id, name } = state.pendingDelete;

  if (type === 'item') {
    const items = state.getItems().filter(i => i.id !== id);
    state.saveItems(items);
    state.addLog('DELETE_ITEM', 'Hapus Barang', `Admin ${state.currentUser.fullName} menghapus barang ${name} dari sistem.`);
    showToast('Barang Dihapus', `Barang <strong>${name}</strong> berhasil dihapus.`, 'danger');
    renderDataTable();
    if (state.currentPage === 'overview') renderOverviewPage();
  } else if (type === 'user') {
    const users = state.getUsers().filter(u => u.id !== id);
    state.saveUsers(users);
    state.addLog('DELETE_USER', 'Hapus Pengguna', `Admin ${state.currentUser.fullName} menghapus akun pengguna ${name}.`);
    showToast('Pengguna Dihapus', `Akun <strong>${name}</strong> berhasil dihapus.`, 'danger');
    renderUserManagementPage();
  }

  state.pendingDelete = null;
  UI.modalConfirmDelete.classList.add('hidden');
}

// ==========================================
// 10. MANAJEMEN USER & PENDAFTARAN USER BARU (ADMIN ONLY)
// ==========================================

function renderUserManagementPage() {
  if (!state.isAdmin()) {
    navigateToPage('overview');
    return;
  }

  const users = state.getUsers();
  
  // Calculate user counts
  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role === 'user').length;
  const activeCount = users.filter(u => u.status === 'active').length;
  const inactiveCount = users.filter(u => u.status === 'inactive').length;

  UI.countAdminUsers.textContent = adminCount;
  UI.countRegularUsers.textContent = userCount;
  UI.countActiveUsers.textContent = activeCount;
  UI.countInactiveUsers.textContent = inactiveCount;

  // Filter users
  const searchQ = (UI.searchUserInput ? UI.searchUserInput.value : '').toLowerCase().trim();
  const roleFilter = UI.filterUserRole ? UI.filterUserRole.value : 'ALL';
  const statusFilter = UI.filterUserStatus ? UI.filterUserStatus.value : 'ALL';

  let filteredUsers = users.filter(u => {
    const matchesSearch = !searchQ || 
      u.fullName.toLowerCase().includes(searchQ) ||
      u.username.toLowerCase().includes(searchQ) ||
      u.email.toLowerCase().includes(searchQ);
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  UI.userTableBody.innerHTML = filteredUsers.map((u, idx) => {
    const isSelf = state.currentUser && state.currentUser.id === u.id;
    const roleBadge = u.role === 'admin' 
      ? '<span class="badge badge-admin"><i class="fa-solid fa-crown"></i> Administrator</span>'
      : '<span class="badge badge-user"><i class="fa-solid fa-user"></i> Pengguna Biasa</span>';

    const statusBadge = u.status === 'active'
      ? `<span class="badge badge-green badge-status-toggle" onclick="toggleUserStatus('${u.id}')" title="Klik untuk ubah status"><i class="fa-solid fa-circle-check"></i> Aktif</span>`
      : `<span class="badge badge-red badge-status-toggle" onclick="toggleUserStatus('${u.id}')" title="Klik untuk ubah status"><i class="fa-solid fa-ban"></i> Nonaktif</span>`;

    let actionButtons = '';
    if (isSelf) {
      actionButtons = `
        <span class="badge badge-gray" style="font-size:0.7rem;">
          <i class="fa-solid fa-user-check text-green"></i> Akun Anda
        </span>
      `;
    } else {
      actionButtons = `
        <div class="table-actions-cell">
          <button class="btn-table-action btn-action-delete" onclick="promptDeleteUser('${u.id}', '${u.fullName.replace(/'/g, "\\'")}')" title="Hapus Pengguna (Admin)">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    }

    return `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <div class="user-avatar-cell">
            <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" alt="${u.fullName}">
            <span class="user-primary-name">${u.fullName}</span>
          </div>
        </td>
        <td><code>@${u.username}</code></td>
        <td>${u.email}</td>
        <td>${roleBadge}</td>
        <td>${u.department || '-'}</td>
        <td>${statusBadge}</td>
        <td><small class="text-muted">${u.createdAt || '-'}</small></td>
        <td>${actionButtons}</td>
      </tr>
    `;
  }).join('');
}

function openRegisterUserModal() {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang dapat mendaftarkan pengguna baru.', 'danger');
    return;
  }

  UI.registerUserForm.reset();
  updateRoleExplanation();
  UI.modalRegisterUser.classList.remove('hidden');
}

function closeRegisterUserModal() {
  UI.modalRegisterUser.classList.add('hidden');
}

function updateRoleExplanation() {
  const role = UI.regRole.value;
  const box = document.getElementById('roleExplainBox');
  if (!box) return;

  if (role === 'admin') {
    box.innerHTML = `
      <div class="explain-item">
        <i class="fa-solid fa-crown text-red"></i>
        <span><strong>Hak Akses Administrator:</strong> Memiliki wewenang penuh untuk Tambah, Ubah, Hapus barang inventaris dan mendaftarkan user baru.</span>
      </div>
    `;
  } else {
    box.innerHTML = `
      <div class="explain-item">
        <i class="fa-solid fa-eye text-silver"></i>
        <span><strong>Hak Akses User Biasa:</strong> Hanya dapat menjelajah data inventaris (Read-Only). Semua aksi modifikasi dan manajemen user terkunci.</span>
      </div>
    `;
  }
}

function handleRegisterUserSubmit(e) {
  e.preventDefault();

  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda tidak memiliki hak Administrator.', 'danger');
    return;
  }

  const fullName = UI.regFullName.value.trim();
  const username = UI.regUsername.value.trim().toLowerCase();
  const email = UI.regEmail.value.trim();
  const role = UI.regRole.value;
  const department = UI.regDept.value.trim();
  const password = UI.regPassword.value;

  if (!fullName || !username || !email || !password) {
    showToast('Form Tidak Lengkap', 'Mohon isi seluruh data yang diwajibkan.', 'warning');
    return;
  }

  if (password.length < 6) {
    showToast('Kata Sandi Lemah', 'Kata sandi minimal harus 6 karakter.', 'warning');
    return;
  }

  const users = state.getUsers();
  
  // Check if username already exists
  if (users.some(u => u.username.toLowerCase() === username)) {
    showToast('Username Digunakan', `Username "${username}" sudah terdaftar pada akun lain.`, 'danger');
    return;
  }

  // Generate random avatar placeholder
  const avatarIndex = Math.floor(Math.random() * 70) + 1;
  const avatar = `https://i.pravatar.cc/150?img=${avatarIndex}`;

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  const newUser = {
    id: 'usr_' + Date.now(),
    username,
    password,
    fullName,
    email,
    role,
    department: department || 'Staf Umum',
    status: 'active',
    avatar,
    createdAt: formattedDate
  };

  users.push(newUser);
  state.saveUsers(users);
  state.addLog('REGISTER_USER', 'Daftar User', `Admin ${state.currentUser.fullName} mendaftarkan pengguna baru: ${fullName} (@${username}) dengan peran ${role.toUpperCase()}.`);

  showToast('Pengguna Didaftarkan', `Akun <strong>${fullName}</strong> berhasil dibuat dengan hak akses <strong>${role.toUpperCase()}</strong>.`, 'success');

  closeRegisterUserModal();
  renderUserManagementPage();
  if (state.currentPage === 'overview') renderOverviewPage();
}

window.toggleUserStatus = function(id) {
  if (!state.isAdmin()) return;

  const users = state.getUsers();
  const user = users.find(u => u.id === id);
  if (!user) return;

  if (state.currentUser && state.currentUser.id === user.id) {
    showToast('Aksi Tidak Diizinkan', 'Anda tidak dapat menonaktifkan akun yang sedang aktif digunakan.', 'warning');
    return;
  }

  user.status = user.status === 'active' ? 'inactive' : 'active';
  state.saveUsers(users);
  state.addLog('UPDATE_USER', 'Status User', `Admin mengubah status akun ${user.fullName} menjadi ${user.status.toUpperCase()}.`);
  showToast('Status Diperbarui', `Status akun <strong>${user.fullName}</strong> kini: ${user.status === 'active' ? 'Aktif' : 'Nonaktif'}.`, 'info');
  renderUserManagementPage();
};

window.promptDeleteUser = function(id, name) {
  if (!state.isAdmin()) return;

  state.pendingDelete = { type: 'user', id, name };
  UI.confirmDeleteTitle.textContent = 'Hapus Akun Pengguna?';
  UI.confirmDeleteMessage.innerHTML = `Akun <strong>${name}</strong> akan dihapus permanen dan tidak lagi dapat masuk ke dalam sistem.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

// ==========================================
// 11. AUDIT LOGS & EXPORTING
// ==========================================

function renderAuditLogs() {
  const logs = state.getLogs();
  const searchQ = (UI.searchLogInput ? UI.searchLogInput.value : '').toLowerCase().trim();
  const typeFilter = UI.filterLogType ? UI.filterLogType.value : 'ALL';

  const filtered = logs.filter(log => {
    const matchesSearch = !searchQ || 
      log.user.toLowerCase().includes(searchQ) ||
      log.details.toLowerCase().includes(searchQ) ||
      log.actionBadge.toLowerCase().includes(searchQ);
    const matchesType = typeFilter === 'ALL' || log.actionType === typeFilter;
    return matchesSearch && matchesType;
  });

  if (filtered.length === 0) {
    UI.auditLogsTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted py-4">Tidak ada catatan log aktivitas yang cocok.</td>
      </tr>
    `;
    return;
  }

  UI.auditLogsTableBody.innerHTML = filtered.map(log => {
    let badgeClass = 'badge-gray';
    if (log.actionType === 'LOGIN') badgeClass = 'badge-green';
    if (log.actionType === 'CREATE_ITEM') badgeClass = 'badge-admin';
    if (log.actionType === 'UPDATE_ITEM') badgeClass = 'badge-yellow';
    if (log.actionType.includes('DELETE')) badgeClass = 'badge-red';
    if (log.actionType === 'REGISTER_USER') badgeClass = 'badge-admin';

    return `
      <tr>
        <td><code>${log.timestamp}</code></td>
        <td><strong>${log.user}</strong></td>
        <td><span class="badge ${badgeClass}">${log.actionBadge}</span></td>
        <td>${log.details}</td>
        <td><span class="badge badge-green">${log.status}</span></td>
      </tr>
    `;
  }).join('');
}

function exportData(format) {
  const items = state.getItems();

  if (format === 'csv') {
    const headers = ['Kode SKU', 'Nama Barang', 'Kategori', 'Harga Satuan', 'Stok', 'Kondisi', 'Lokasi', 'Terakhir Diperbarui'];
    const rows = items.map(i => [
      `"${i.code}"`,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.category}"`,
      i.price,
      i.stock,
      `"${i.condition || ''}"`,
      `"${i.location || ''}"`,
      `"${i.updatedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vortex_inventaris_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Ekspor Berhasil', 'Data berhasil diekspor ke dalam file CSV.', 'success');
  } else if (format === 'json') {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `vortex_inventaris_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Ekspor Berhasil', 'Data berhasil diekspor ke dalam file JSON.', 'success');
  }
}

// ==========================================
// 12. NOTIFICATIONS PREVIEW
// ==========================================

function populateNotifications() {
  const list = [
    { title: 'Sistem Diperbarui', desc: 'Versi 2.4 telah aktif dengan perlindungan RBAC.', time: '10 menit lalu', icon: 'fa-shield-halved' },
    { title: 'Stok Menipis', desc: 'Kabel UTP Belden sisa 1 roll di gudang B1.', time: '1 jam lalu', icon: 'fa-triangle-exclamation' },
    { title: 'Aktivitas Pengguna', desc: 'Staf logistik login dalam mode tinjauan.', time: '3 jam lalu', icon: 'fa-user' }
  ];

  UI.notificationList.innerHTML = list.map(item => `
    <li class="notification-item">
      <div class="timeline-icon"><i class="fa-solid ${item.icon}"></i></div>
      <div>
        <div style="font-weight:700; color:#fff;">${item.title}</div>
        <div style="color:#94a3b8; font-size:0.75rem;">${item.desc}</div>
        <small style="color:#64748b; font-size:0.68rem;">${item.time}</small>
      </div>
    </li>
  `).join('');
}

// ==========================================
// 13. SIDEBAR & MOBILE CONTROLS
// ==========================================

function openMobileSidebar() {
  UI.sidebar.classList.add('open');
  UI.sidebarOverlay.classList.add('active');
}

function closeMobileSidebar() {
  UI.sidebar.classList.remove('open');
  UI.sidebarOverlay.classList.remove('active');
}

// ==========================================
// 14. EVENT LISTENERS SETUP
// ==========================================

function initEvents() {
  // Login form submit
  UI.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = UI.loginUsername.value;
    const p = UI.loginPassword.value;
    handleLogin(u, p);
  });

  // Quick Demo Buttons
  UI.btnQuickAdmin.addEventListener('click', () => {
    UI.loginUsername.value = 'admin';
    UI.loginPassword.value = 'admin123';
    handleLogin('admin', 'admin123');
  });

  UI.btnQuickUser.addEventListener('click', () => {
    UI.loginUsername.value = 'user';
    UI.loginPassword.value = 'user123';
    handleLogin('user', 'user123');
  });

  // Password visibility toggle
  UI.btnTogglePassword.addEventListener('click', () => {
    const isPassword = UI.loginPassword.type === 'password';
    UI.loginPassword.type = isPassword ? 'text' : 'password';
    UI.togglePasswordIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
  });

  // Sidebar navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const pageId = link.getAttribute('data-page');
      navigateToPage(pageId);
    });
  });

  // Mobile sidebar toggles
  UI.menuToggleBtn.addEventListener('click', openMobileSidebar);
  UI.sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
  UI.sidebarOverlay.addEventListener('click', closeMobileSidebar);

  // Logout buttons
  UI.btnLogoutSidebar.addEventListener('click', handleLogout);
  UI.dropdownItemLogout.addEventListener('click', handleLogout);

  // Topbar Dropdowns
  UI.userTopbarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    UI.userDropdownMenu.classList.toggle('hidden');
    UI.notificationDropdown.classList.add('hidden');
  });

  UI.btnNotifications.addEventListener('click', (e) => {
    e.stopPropagation();
    UI.notificationDropdown.classList.toggle('hidden');
    UI.userDropdownMenu.classList.add('hidden');
  });

  // Click outside to close dropdowns
  document.addEventListener('click', () => {
    UI.userDropdownMenu.classList.add('hidden');
    UI.notificationDropdown.classList.add('hidden');
  });

  // Quick switch role buttons
  UI.btnQuickSwitch.addEventListener('click', () => {
    const targetRole = state.isAdmin() ? 'user' : 'admin';
    switchUserRole(targetRole);
  });

  UI.btnBannerSwitchAdmin.addEventListener('click', () => {
    switchUserRole('admin');
  });

  UI.dropdownItemSwitchRole.addEventListener('click', () => {
    const targetRole = state.isAdmin() ? 'user' : 'admin';
    switchUserRole(targetRole);
  });

  UI.dropdownItemProfile.addEventListener('click', () => {
    navigateToPage('settings');
  });

  // Settings role switchers
  UI.btnSettingsSwitchAdmin.addEventListener('click', () => switchUserRole('admin'));
  UI.btnSettingsSwitchUser.addEventListener('click', () => switchUserRole('user'));

  // Reset sample data
  UI.btnResetAllData.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke setelan sampel awal?')) {
      state.resetAllData();
      showToast('Data Dipulihkan', 'Seluruh data barang dan akun telah dikembalikan ke sampel awal.', 'info');
      renderAppView();
    }
  });

  // Modals event listeners
  UI.btnOpenAddDataModal.addEventListener('click', openAddItemModal);
  if (UI.btnOverviewQuickAdd) UI.btnOverviewQuickAdd.addEventListener('click', openAddItemModal);
  UI.btnCloseDataModal.addEventListener('click', closeDataModal);
  UI.btnCancelDataModal.addEventListener('click', closeDataModal);
  UI.dataItemForm.addEventListener('submit', handleSaveDataItem);

  UI.btnCloseViewDetail.addEventListener('click', closeViewDetailModal);
  UI.btnCloseViewDetailBtn.addEventListener('click', closeViewDetailModal);

  // User Register Modal
  UI.btnOpenRegisterUserModal.addEventListener('click', openRegisterUserModal);
  UI.btnCloseRegisterModal.addEventListener('click', closeRegisterUserModal);
  UI.btnCancelRegisterModal.addEventListener('click', closeRegisterUserModal);
  UI.registerUserForm.addEventListener('submit', handleRegisterUserSubmit);
  UI.regRole.addEventListener('change', updateRoleExplanation);

  // Confirm Delete Modal
  UI.btnCancelDelete.addEventListener('click', () => {
    state.pendingDelete = null;
    UI.modalConfirmDelete.classList.add('hidden');
  });
  UI.btnExecuteDelete.addEventListener('click', executePendingDelete);

  // Search & Filter Data
  UI.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    state.currentDataPage = 1;
    UI.btnClearSearch.classList.toggle('hidden', !state.searchQuery);
    renderDataTable();
  });

  UI.btnClearSearch.addEventListener('click', () => {
    UI.searchInput.value = '';
    state.searchQuery = '';
    UI.btnClearSearch.classList.add('hidden');
    state.currentDataPage = 1;
    renderDataTable();
  });

  UI.filterCategory.addEventListener('change', (e) => {
    state.selectedCategory = e.target.value;
    state.currentDataPage = 1;
    renderDataTable();
  });

  UI.filterStatus.addEventListener('change', (e) => {
    state.selectedStatus = e.target.value;
    state.currentDataPage = 1;
    renderDataTable();
  });

  UI.btnResetFilters.addEventListener('click', () => {
    UI.searchInput.value = '';
    state.searchQuery = '';
    UI.filterCategory.value = 'ALL';
    state.selectedCategory = 'ALL';
    UI.filterStatus.value = 'ALL';
    state.selectedStatus = 'ALL';
    state.currentDataPage = 1;
    UI.btnClearSearch.classList.add('hidden');
    renderDataTable();
  });

  // Table Sorting
  document.querySelectorAll('#mainDataTable th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const field = th.getAttribute('data-sort');
      if (state.sortField === field) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = field;
        state.sortOrder = 'asc';
      }
      renderDataTable();
    });
  });

  // Export buttons
  UI.btnExportCSV.addEventListener('click', () => exportData('csv'));
  UI.btnExportJSON.addEventListener('click', () => exportData('json'));

  // User Management Search & Filters
  if (UI.searchUserInput) UI.searchUserInput.addEventListener('input', renderUserManagementPage);
  if (UI.filterUserRole) UI.filterUserRole.addEventListener('change', renderUserManagementPage);
  if (UI.filterUserStatus) UI.filterUserStatus.addEventListener('change', renderUserManagementPage);

  // Activity Log Search & Filters
  if (UI.searchLogInput) UI.searchLogInput.addEventListener('input', renderAuditLogs);
  if (UI.filterLogType) UI.filterLogType.addEventListener('change', renderAuditLogs);
  if (UI.btnClearAuditLogs) {
    UI.btnClearAuditLogs.addEventListener('click', () => {
      if (confirm('Bersihkan riwayat log aktivitas audit?')) {
        state.saveLogs([]);
        renderAuditLogs();
        showToast('Log Dibersihkan', 'Riwayat log telah dikosongkan.', 'info');
      }
    });
  }

  // Overview quick links
  if (UI.btnRefreshStats) {
    UI.btnRefreshStats.addEventListener('click', () => {
      renderOverviewPage();
      showToast('Metrik Terkini', 'Data ringkasan dan kalkulasi diperbarui.', 'info');
    });
  }
  if (UI.btnOverviewViewAll) {
    UI.btnOverviewViewAll.addEventListener('click', () => navigateToPage('data-management'));
  }
  if (UI.btnOverviewLogAll) {
    UI.btnOverviewLogAll.addEventListener('click', () => navigateToPage('activity-log'));
  }
}

// ==========================================
// 15. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  startClock();
  populateNotifications();
  initEvents();
  renderAppView();
});
