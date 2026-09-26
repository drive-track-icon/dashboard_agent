/**
 * DRIVE - Dashboard Reporting, Insight & Visibility of Employee
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
    email: 'admin@drive.internal',
    role: 'admin',
    department: 'CSO INBOUND',
    themeColor: 'default',
    displayMode: 'dark',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-10 08:30'
  },
  {
    id: 'usr_user_1',
    username: 'user',
    password: 'user123',
    fullName: 'Siti Rahma',
    email: 'siti.rahma@drive.internal',
    role: 'user',
    department: 'CSO DIGILIVE CHAT - WA',
    themeColor: 'default',
    displayMode: 'dark',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15 09:15'
  },
  {
    id: 'usr_user_2',
    username: 'ahmad_fauzi',
    password: 'user123',
    fullName: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@drive.internal',
    role: 'user',
    department: 'CSO BACK OFFICE',
    themeColor: 'default',
    displayMode: 'dark',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01 11:20'
  },
  {
    id: 'usr_admin_2',
    username: 'dewi_lestari',
    password: 'admin123',
    fullName: 'Dewi Lestari, M.T.',
    email: 'dewi.lestari@drive.internal',
    role: 'admin',
    department: 'TEAM LEADER',
    themeColor: 'default',
    displayMode: 'dark',
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

const DEFAULT_TIMERS = [
  // Timers milik Siti Rahma (User Biasa)
  {
    id: 'tmr_user_1',
    userId: 'usr_user_1',
    username: 'user',
    userFullName: 'Siti Rahma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    name: 'Pemeriksaan Fisik Barang Masuk',
    category: 'Operasional Gudang',
    desc: 'Verifikasi kesesuaian dokumen faktur dengan kondisi fisik stok.',
    totalSeconds: 2700, // 45 Menit (Waktu Ditentukan)
    remainingSeconds: 1940,
    isRunning: true,
    lastTick: Date.now()
  },
  {
    id: 'tmr_user_2',
    userId: 'usr_user_1',
    username: 'user',
    userFullName: 'Siti Rahma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    name: 'Penyusunan Laporan Logistik Harian',
    category: 'Tugas Rutin',
    desc: 'Rekapitulasi berkas pengiriman dan surat jalan operasional.',
    totalSeconds: 5400, // 1 Jam 30 Menit
    remainingSeconds: 5400,
    isRunning: false,
    lastTick: null
  },
  // Timers milik Ahmad Fauzi (User Biasa)
  {
    id: 'tmr_user_3',
    userId: 'usr_user_2',
    username: 'ahmad_fauzi',
    userFullName: 'Ahmad Fauzi',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    name: 'Audit Stok Rak Elektronik A-12',
    category: 'Audit & Keamanan',
    desc: 'Pengecekan nomor seri dan label segel garansi.',
    totalSeconds: 7200, // 2 Jam
    remainingSeconds: 4350,
    isRunning: true,
    lastTick: Date.now()
  },
  // Timers milik Admin (Budi Santoso)
  {
    id: 'tmr_admin_1',
    userId: 'usr_admin_1',
    username: 'admin',
    userFullName: 'Budi Santoso, S.Kom',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Batas Waktu Backup Server Cloud',
    category: 'TI & Server',
    desc: 'Sinkronisasi mirror database ke data center cadangan secara terenkripsi.',
    totalSeconds: 9000, // 2 Jam 30 Menit
    remainingSeconds: 6840,
    isRunning: true,
    lastTick: Date.now()
  },
  {
    id: 'tmr_admin_2',
    userId: 'usr_admin_1',
    username: 'admin',
    userFullName: 'Budi Santoso, S.Kom',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Tenggat Waktu Respons SLA Tiket',
    category: 'Darurat & SLA',
    desc: 'Batas eskalasi penyelesaian kendala infrastruktur level kritis.',
    totalSeconds: 3600, // 1 Jam
    remainingSeconds: 2415,
    isRunning: true,
    lastTick: Date.now()
  }
];

const DEFAULT_STOPWATCHES = [
  // Stopwatch milik Siti Rahma
  {
    id: 'sw_user_1',
    userId: 'usr_user_1',
    username: 'user',
    userFullName: 'Siti Rahma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    name: 'Waktu Proses Packing & Labeling',
    dept: 'Logistik & Operasional Gudang',
    elapsedSeconds: 1250,
    isRunning: true,
    lastTick: Date.now()
  },
  // Stopwatch milik Ahmad Fauzi
  {
    id: 'sw_user_2',
    userId: 'usr_user_2',
    username: 'ahmad_fauzi',
    userFullName: 'Ahmad Fauzi',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    name: 'Pencatatan Waktu Pengecekan Barcode',
    dept: 'Staf Audit Inventaris',
    elapsedSeconds: 640,
    isRunning: false,
    lastTick: null
  },
  // Stopwatch milik Admin
  {
    id: 'sw_admin_1',
    userId: 'usr_admin_1',
    username: 'admin',
    userFullName: 'Budi Santoso, S.Kom',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Stopwatch Uji Ketahanan Bandwidth 10G',
    dept: 'IT Infrastructure & Security',
    elapsedSeconds: 874,
    isRunning: true,
    lastTick: Date.now()
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
    this.pendingDelete = null; // { type: 'item'|'user'|'timer'|'stopwatch', id: string, name: string }

    // Chart instances
    this.monthlyChartInstance = null;
    this.categoryDonutInstance = null;

    // Theme Customizer
    this.currentTheme = 'default';
    this.currentDisplayMode = 'dark';
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

    // Auto-migrate or initialize timers with user metadata
    const existingTimers = JSON.parse(localStorage.getItem('vortex_timers') || '[]');
    if (existingTimers.length === 0 || !existingTimers[0].userId) {
      localStorage.setItem('vortex_timers', JSON.stringify(DEFAULT_TIMERS));
    }

    const existingSw = JSON.parse(localStorage.getItem('vortex_stopwatches') || '[]');
    if (existingSw.length === 0 || !existingSw[0].userId) {
      localStorage.setItem('vortex_stopwatches', JSON.stringify(DEFAULT_STOPWATCHES));
    }

    // Auto-migrate team department to CSO Layanan if necessary
    const validCSO = [
      'CSO INBOUND',
      'CSO DIGILIVE CHAT - DM',
      'CSO DIGILIVE CHAT - MY ICON+',
      'CSO DIGILIVE CHAT - WA',
      'CSO BACK OFFICE',
      'CSO OUTBOUND',
      'CSO EMAIL',
      'TEAM LEADER'
    ];
    const storedUsers = JSON.parse(localStorage.getItem('vortex_users') || '[]');
    if (storedUsers.length > 0) {
      let changed = false;
      storedUsers.forEach((u, i) => {
        if (!validCSO.includes(u.department)) {
          u.department = validCSO[i % validCSO.length];
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('vortex_users', JSON.stringify(storedUsers));
        if (this.currentUser && !validCSO.includes(this.currentUser.department)) {
          const match = storedUsers.find(u => u.id === this.currentUser.id);
          if (match) {
            this.currentUser.department = match.department;
            localStorage.setItem('vortex_session', JSON.stringify(this.currentUser));
          }
        }
      }
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

  getTimers() {
    return JSON.parse(localStorage.getItem('vortex_timers') || '[]');
  }

  saveTimers(timers) {
    localStorage.setItem('vortex_timers', JSON.stringify(timers));
  }

  getStopwatches() {
    return JSON.parse(localStorage.getItem('vortex_stopwatches') || '[]');
  }

  saveStopwatches(stopwatches) {
    localStorage.setItem('vortex_stopwatches', JSON.stringify(stopwatches));
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
    localStorage.setItem('vortex_timers', JSON.stringify(DEFAULT_TIMERS));
    localStorage.setItem('vortex_stopwatches', JSON.stringify(DEFAULT_STOPWATCHES));
    if (this.currentUser) {
      // keep current user object updated from default
      const found = DEFAULT_USERS.find(u => u.username === this.currentUser.username);
      if (found) this.setSession(found);
    }
  }
}

const state = new AppState();

// ==========================================
// 2.5 THEME COLOR PALETTES & CUSTOMIZER
// ==========================================

const THEME_PALETTES = {
  default: {
    key: 'default',
    name: 'Merah Crimson',
    shortName: 'Merah (Default)',
    desc: 'DRIVE Racing Crimson',
    primary: '#e62e44',
    hover: '#ff3851',
    dark: '#b81427',
    darker: '#7f0d1a',
    rgb: '230, 46, 68',
    hoverRgb: '255, 56, 81',
    gradient: 'linear-gradient(135deg, #ff3851 0%, #b81427 100%)',
    isDefault: true
  },
  blue: {
    key: 'blue',
    name: 'Biru Safir',
    shortName: 'Biru Safir',
    desc: 'Electric Modern Blue',
    primary: '#2563eb',
    hover: '#3b82f6',
    dark: '#1d4ed8',
    darker: '#1e3a8a',
    rgb: '37, 99, 235',
    hoverRgb: '59, 130, 246',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
  },
  emerald: {
    key: 'emerald',
    name: 'Hijau Zamrud',
    shortName: 'Hijau Zamrud',
    desc: 'Fresh Emerald Green',
    primary: '#10b981',
    hover: '#34d399',
    dark: '#059669',
    darker: '#064e3b',
    rgb: '16, 185, 129',
    hoverRgb: '52, 211, 153',
    gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)'
  },
  purple: {
    key: 'purple',
    name: 'Ungu Neon',
    shortName: 'Ungu Neon',
    desc: 'Cyberpunk Violet',
    primary: '#8b5cf6',
    hover: '#a78bfa',
    dark: '#7c3aed',
    darker: '#4c1d95',
    rgb: '139, 92, 246',
    hoverRgb: '167, 139, 250',
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)'
  },
  amber: {
    key: 'amber',
    name: 'Oranye Lava',
    shortName: 'Oranye Lava',
    desc: 'High Heat Amber',
    primary: '#ea580c',
    hover: '#f97316',
    dark: '#c2410c',
    darker: '#7c2d12',
    rgb: '234, 88, 12',
    hoverRgb: '249, 115, 22',
    gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)'
  },
  gold: {
    key: 'gold',
    name: 'Kuning Emas',
    shortName: 'Kuning Emas',
    desc: 'Luxury Cyber Gold',
    primary: '#eab308',
    hover: '#facc15',
    dark: '#ca8a04',
    darker: '#713f12',
    rgb: '234, 179, 8',
    hoverRgb: '250, 204, 21',
    gradient: 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)'
  },
  cyan: {
    key: 'cyan',
    name: 'Biru Sian',
    shortName: 'Biru Sian',
    desc: 'Neon Aqua Cyan',
    primary: '#06b6d4',
    hover: '#22d3ee',
    dark: '#0891b2',
    darker: '#164e63',
    rgb: '6, 182, 212',
    hoverRgb: '34, 211, 238',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)'
  },
  rose: {
    key: 'rose',
    name: 'Rose Magenta',
    shortName: 'Rose Magenta',
    desc: 'Vivid Hot Rose',
    primary: '#f43f5e',
    hover: '#fb7185',
    dark: '#e11d48',
    darker: '#881337',
    rgb: '244, 63, 94',
    hoverRgb: '251, 113, 133',
    gradient: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)'
  },
  indigo: {
    key: 'indigo',
    name: 'Indigo Elektrik',
    shortName: 'Indigo Elektrik',
    desc: 'Deep Royal Indigo',
    primary: '#6366f1',
    hover: '#818cf8',
    dark: '#4f46e5',
    darker: '#312e81',
    rgb: '99, 102, 241',
    hoverRgb: '129, 140, 248',
    gradient: 'linear-gradient(135deg, #818cf8 0%, #4f46e5 100%)'
  }
};

function getUserTheme(user) {
  if (!user) return 'default';
  const username = (user.username || user.id || '').toLowerCase();
  try {
    const saved = localStorage.getItem('drive_theme_color_' + username);
    if (saved && THEME_PALETTES[saved]) return saved;
  } catch (e) {
    console.warn('LocalStorage read error for user theme:', e);
  }
  if (user.themeColor && THEME_PALETTES[user.themeColor]) {
    return user.themeColor;
  }
  return 'default';
}

function applyThemeTokens(palette) {
  const root = document.documentElement;
  root.style.setProperty('--primary-rgb', palette.rgb);
  root.style.setProperty('--hover-rgb', palette.hoverRgb);
  root.style.setProperty('--red-primary', palette.primary);
  root.style.setProperty('--red-hover', palette.hover);
  root.style.setProperty('--red-dark', palette.dark);
  root.style.setProperty('--red-darker', palette.darker);
  root.style.setProperty('--red-subtle', `rgba(${palette.rgb}, 0.12)`);
  root.style.setProperty('--red-border', `rgba(${palette.rgb}, 0.35)`);
  root.style.setProperty('--red-glow', `rgba(${palette.rgb}, 0.45)`);
  root.style.setProperty('--red-gradient', palette.gradient);
  root.style.setProperty('--red-gradient-subtle', `linear-gradient(135deg, rgba(${palette.rgb}, 0.15) 0%, rgba(20, 23, 32, 0.4) 100%)`);
  root.style.setProperty('--shadow-glow-red', `0 0 25px rgba(${palette.rgb}, 0.35)`);
}

function applyTheme(themeKey, notify = false) {
  const palette = THEME_PALETTES[themeKey] || THEME_PALETTES.default;
  state.currentTheme = palette.key;

  applyThemeTokens(palette);
  document.body.setAttribute('data-theme-color', palette.key);

  // Save ONLY for the currently logged in user account
  if (state.currentUser) {
    state.currentUser.themeColor = palette.key;
    const username = (state.currentUser.username || state.currentUser.id || '').toLowerCase();
    try {
      localStorage.setItem('drive_theme_color_' + username, palette.key);
      state.setSession(state.currentUser);

      const users = state.getUsers();
      const userIndex = users.findIndex(u => (u.username || '').toLowerCase() === username);
      if (userIndex !== -1) {
        users[userIndex].themeColor = palette.key;
        state.saveUsers(users);
      }
    } catch (e) {
      console.warn('Gagal menyimpan tema per-user:', e);
    }
  }

  updateThemeUI(palette);

  // Update charts if present
  if (state.items && state.items.length && typeof Chart !== 'undefined') {
    const monthlyCanvas = document.getElementById('monthlyChart');
    if (monthlyCanvas && monthlyCanvas.offsetParent !== null) {
      renderCharts(state.items);
    }
  }

  if (notify) {
    showToast(
      'Tema Warna Diperbarui',
      palette.isDefault 
        ? 'Tema akun ini dikembalikan ke warna Merah (Default).' 
        : `Warna akun ini berhasil diubah ke tema ${palette.name}. Akun lain tidak terpengaruh.`,
      'success'
    );
  }
}

function updateThemeUI(palette) {
  if (UI.currentThemeName) {
    UI.currentThemeName.textContent = palette.isDefault ? `${palette.name} (Default)` : palette.name;
  }
  if (UI.themeFooterDot) {
    UI.themeFooterDot.style.background = palette.primary;
    UI.themeFooterDot.style.boxShadow = `0 0 8px ${palette.primary}`;
  }
  if (UI.themePaletteGrid) {
    UI.themePaletteGrid.querySelectorAll('.theme-color-card').forEach(card => {
      const cardKey = card.getAttribute('data-theme-key');
      if (cardKey === palette.key) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }
}

function renderThemePaletteUI() {
  if (!UI.themePaletteGrid) return;
  UI.themePaletteGrid.innerHTML = Object.values(THEME_PALETTES).map(p => `
    <button type="button" class="theme-color-card ${state.currentTheme === p.key ? 'active' : ''}" data-theme-key="${p.key}" title="${p.name} - ${p.desc}">
      <i class="fa-solid fa-check theme-check-icon"></i>
      <span class="theme-swatch-circle" style="background: ${p.gradient}; box-shadow: 0 0 10px rgba(${p.rgb}, 0.5);"></span>
      <span class="theme-card-name">${p.shortName}</span>
      ${p.isDefault ? '<span class="theme-badge-default">Default</span>' : ''}
    </button>
  `).join('');

  UI.themePaletteGrid.querySelectorAll('.theme-color-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = card.getAttribute('data-theme-key');
      applyTheme(key, true);
    });
  });
}

function getUserDisplayMode(user) {
  if (!user) return 'dark';
  const username = (user.username || user.id || '').toLowerCase();
  try {
    const saved = localStorage.getItem('drive_display_mode_' + username);
    if (saved && (saved === 'dark' || saved === 'light')) return saved;
  } catch (e) {
    console.warn('LocalStorage read error for display mode:', e);
  }
  if (user.displayMode && (user.displayMode === 'dark' || user.displayMode === 'light')) {
    return user.displayMode;
  }
  return 'dark';
}

function setDisplayMode(mode, notify = false) {
  const isLight = mode === 'light';
  state.currentDisplayMode = isLight ? 'light' : 'dark';

  if (isLight) {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
    document.body.setAttribute('data-display-mode', 'light');
  } else {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    document.body.setAttribute('data-display-mode', 'dark');
  }

  // Update navbar mode icon and tooltip
  if (UI.themeModeIcon) {
    UI.themeModeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  if (UI.btnThemeMode) {
    UI.btnThemeMode.setAttribute('title', isLight ? 'Mode Tampilan: Putih (Klik untuk Mode Gelap)' : 'Mode Tampilan: Gelap (Klik untuk Mode Putih)');
    UI.btnThemeMode.setAttribute('aria-label', isLight ? 'Mode Tampilan: Putih' : 'Mode Tampilan: Gelap');
  }

  // Update dropdown mode toggle buttons
  if (UI.btnModeDark && UI.btnModeLight) {
    UI.btnModeDark.classList.toggle('active', !isLight);
    UI.btnModeLight.classList.toggle('active', isLight);
  }

  // Save ONLY for current logged in user account
  if (state.currentUser) {
    state.currentUser.displayMode = state.currentDisplayMode;
    const username = (state.currentUser.username || state.currentUser.id || '').toLowerCase();
    try {
      localStorage.setItem('drive_display_mode_' + username, state.currentDisplayMode);
      state.setSession(state.currentUser);

      const users = state.getUsers();
      const userIndex = users.findIndex(u => (u.username || '').toLowerCase() === username);
      if (userIndex !== -1) {
        users[userIndex].displayMode = state.currentDisplayMode;
        state.saveUsers(users);
      }
    } catch (e) {
      console.warn('Gagal menyimpan mode per-user:', e);
    }
  }

  // Re-render charts to adjust grid/colors if present
  if (state.items && state.items.length && typeof Chart !== 'undefined') {
    const monthlyCanvas = document.getElementById('monthlyChart');
    if (monthlyCanvas && monthlyCanvas.offsetParent !== null) {
      renderCharts(state.items);
    }
  }

  if (notify) {
    showToast(
      'Mode Tampilan Diperbarui',
      isLight ? 'Beralih ke Mode Putih (Terang). Akun lain tidak terpengaruh.' : 'Beralih ke Mode Gelap. Akun lain tidak terpengaruh.',
      'info'
    );
  }
}

function toggleDisplayMode(notify = true) {
  const targetMode = state.currentDisplayMode === 'light' ? 'dark' : 'light';
  setDisplayMode(targetMode, notify);
}

function initTheme() {
  renderThemePaletteUI();

  if (!state.currentUser) {
    // On login view: ALWAYS default dark mode & default red theme!
    state.currentTheme = 'default';
    state.currentDisplayMode = 'dark';
    applyThemeTokens(THEME_PALETTES.default);
    document.body.setAttribute('data-theme-color', 'default');
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    document.body.setAttribute('data-display-mode', 'dark');
  } else {
    // When user is logged in: load this specific user's display mode & theme
    const userMode = getUserDisplayMode(state.currentUser);
    setDisplayMode(userMode, false);
    const userTheme = getUserTheme(state.currentUser);
    applyTheme(userTheme, false);
  }
}

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
  sidebarAdminSection: document.getElementById('sidebarAdminSection'),
  sidebarTestingSection: document.getElementById('sidebarTestingSection'),
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
  dropdownItemChangePassword: document.getElementById('dropdownItemChangePassword'),
  btnThemeMode: document.getElementById('btnThemeMode'),
  themeModeIcon: document.getElementById('themeModeIcon'),
  btnThemeDropdown: document.getElementById('btnThemeDropdown'),
  themeDropdownMenu: document.getElementById('themeDropdownMenu'),
  btnThemeReset: document.getElementById('btnThemeReset'),
  btnModeDark: document.getElementById('btnModeDark'),
  btnModeLight: document.getElementById('btnModeLight'),
  themePaletteGrid: document.getElementById('themePaletteGrid'),
  currentThemeName: document.getElementById('currentThemeName'),
  themeFooterDot: document.getElementById('themeFooterDot'),
  btnNotifications: document.getElementById('btnNotifications'),
  notificationDropdown: document.getElementById('notificationDropdown'),
  notificationList: document.getElementById('notificationList'),
  userRoleAlertBanner: document.getElementById('userRoleAlertBanner'),
  btnBannerSwitchAdmin: document.getElementById('btnBannerSwitchAdmin'),
  realtimeClock: document.getElementById('realtimeClock'),

  // Change Password Modal
  modalChangePassword: document.getElementById('modalChangePassword'),
  formChangePassword: document.getElementById('formChangePassword'),
  btnCloseChangePasswordModal: document.getElementById('btnCloseChangePasswordModal'),
  btnCancelChangePassword: document.getElementById('btnCancelChangePassword'),
  btnSubmitChangePassword: document.getElementById('btnSubmitChangePassword'),
  changePassCurrent: document.getElementById('changePassCurrent'),
  changePassNew: document.getElementById('changePassNew'),
  changePassConfirm: document.getElementById('changePassConfirm'),
  btnToggleCurrentPass: document.getElementById('btnToggleCurrentPass'),
  toggleCurrentPassIcon: document.getElementById('toggleCurrentPassIcon'),
  btnToggleNewPass: document.getElementById('btnToggleNewPass'),
  toggleNewPassIcon: document.getElementById('toggleNewPassIcon'),
  btnToggleConfirmPass: document.getElementById('btnToggleConfirmPass'),
  toggleConfirmPassIcon: document.getElementById('toggleConfirmPassIcon'),

  // Pages
  pages: {
    overview: document.getElementById('pageOverview'),
    'data-management': document.getElementById('pageDataManagement'),
    timer: document.getElementById('pageTimer'),
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

  // Team Management Modal (Baru & Edit)
  modalRegisterUser: document.getElementById('modalRegisterUser'),
  registerUserForm: document.getElementById('registerUserForm'),
  btnOpenRegisterUserModal: document.getElementById('btnOpenRegisterUserModal'),
  btnCloseRegisterModal: document.getElementById('btnCloseRegisterModal'),
  btnCancelRegisterModal: document.getElementById('btnCancelRegisterModal'),
  modalUserTitle: document.getElementById('modalUserTitle'),
  modalUserSubtitle: document.getElementById('modalUserSubtitle'),
  modalUserIcon: document.getElementById('modalUserIcon'),
  modalUserIconBadge: document.getElementById('modalUserIconBadge'),
  regUserId: document.getElementById('regUserId'),
  regAvatarData: document.getElementById('regAvatarData'),
  regAvatarPreview: document.getElementById('regAvatarPreview'),
  regAvatarFileInput: document.getElementById('regAvatarFileInput'),
  btnChooseAvatarFile: document.getElementById('btnChooseAvatarFile'),
  btnRandomAvatar: document.getElementById('btnRandomAvatar'),
  regAvatarUrl: document.getElementById('regAvatarUrl'),
  regFullName: document.getElementById('regFullName'),
  regUsername: document.getElementById('regUsername'),
  regEmail: document.getElementById('regEmail'),
  regRole: document.getElementById('regRole'),
  regDept: document.getElementById('regDept'),
  regPassword: document.getElementById('regPassword'),
  regPasswordLabel: document.getElementById('regPasswordLabel'),
  regPasswordRequired: document.getElementById('regPasswordRequired'),
  regPasswordHint: document.getElementById('regPasswordHint'),
  btnSubmitRegisterUser: document.getElementById('btnSubmitRegisterUser'),
  btnSubmitRegisterText: document.getElementById('btnSubmitRegisterText'),
  btnSubmitRegisterIcon: document.getElementById('btnSubmitRegisterIcon'),

  // Confirm Delete Modal
  modalConfirmDelete: document.getElementById('modalConfirmDelete'),
  confirmDeleteTitle: document.getElementById('confirmDeleteTitle'),
  confirmDeleteMessage: document.getElementById('confirmDeleteMessage'),
  btnCancelDelete: document.getElementById('btnCancelDelete'),
  btnExecuteDelete: document.getElementById('btnExecuteDelete'),

  // Timer & Stopwatch Elements
  countdownTimersContainer: document.getElementById('countdownTimersContainer'),
  stopwatchesContainer: document.getElementById('stopwatchesContainer'),
  timerBannerRoleLabel: document.getElementById('timerBannerRoleLabel'),
  timerBannerRoleDesc: document.getElementById('timerBannerRoleDesc'),
  timerBannerBadge: document.getElementById('timerBannerBadge'),
  activeCountdownCountBadge: document.getElementById('activeCountdownCountBadge'),
  activeStopwatchCountBadge: document.getElementById('activeStopwatchCountBadge'),
  btnOpenAddTimerModal: document.getElementById('btnOpenAddTimerModal'),
  btnOpenAddStopwatchModal: document.getElementById('btnOpenAddStopwatchModal'),
  btnAddTimerLabel: document.getElementById('btnAddTimerLabel'),
  btnAddStopwatchLabel: document.getElementById('btnAddStopwatchLabel'),
  countdownHeaderTitle: document.getElementById('countdownHeaderTitle'),
  stopwatchHeaderTitle: document.getElementById('stopwatchHeaderTitle'),

  // Admin Live Timer Monitor Elements
  adminTimerMonitorSection: document.getElementById('adminTimerMonitorSection'),
  adminMonitorTable: document.getElementById('adminMonitorTable'),
  adminMonitorTableBody: document.getElementById('adminMonitorTableBody'),
  searchMonitorInput: document.getElementById('searchMonitorInput'),
  filterMonitorUser: document.getElementById('filterMonitorUser'),
  filterMonitorStatus: document.getElementById('filterMonitorStatus'),
  monitorActiveUsersBadge: document.getElementById('monitorActiveUsersBadge'),
  monitorActiveTimersBadge: document.getElementById('monitorActiveTimersBadge'),

  // Modal Timer
  modalTimerForm: document.getElementById('modalTimerForm'),
  timerForm: document.getElementById('timerForm'),
  modalTimerTitle: document.getElementById('modalTimerTitle'),
  modalTimerIcon: document.getElementById('modalTimerIcon'),
  formTimerId: document.getElementById('formTimerId'),
  formTimerName: document.getElementById('formTimerName'),
  formTimerCategory: document.getElementById('formTimerCategory'),
  formTimerAutoStart: document.getElementById('formTimerAutoStart'),
  formTimerHours: document.getElementById('formTimerHours'),
  formTimerMinutes: document.getElementById('formTimerMinutes'),
  formTimerSeconds: document.getElementById('formTimerSeconds'),
  formTimerDesc: document.getElementById('formTimerDesc'),
  btnSubmitTimerText: document.getElementById('btnSubmitTimerText'),
  btnCloseTimerModal: document.getElementById('btnCloseTimerModal'),
  btnCancelTimerModal: document.getElementById('btnCancelTimerModal'),

  // Modal Stopwatch
  modalStopwatchForm: document.getElementById('modalStopwatchForm'),
  stopwatchForm: document.getElementById('stopwatchForm'),
  formStopwatchName: document.getElementById('formStopwatchName'),
  formStopwatchDept: document.getElementById('formStopwatchDept'),
  formStopwatchAutoStart: document.getElementById('formStopwatchAutoStart'),
  btnCloseStopwatchModal: document.getElementById('btnCloseStopwatchModal'),
  btnCancelStopwatchModal: document.getElementById('btnCancelStopwatchModal'),

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
  filterUserService: document.getElementById('filterUserService'),
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
    document.title = 'DRIVE | Masuk Sistem';

    // Menu login TIDAK AKAN terpengaruh perubahan tema atau mode tampilan: selalu default merah & mode gelap
    state.currentTheme = 'default';
    state.currentDisplayMode = 'dark';
    applyThemeTokens(THEME_PALETTES.default);
    document.body.setAttribute('data-theme-color', 'default');
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    document.body.setAttribute('data-display-mode', 'dark');
    return;
  }

  // Show Dashboard
  UI.loginView.classList.add('hidden');
  UI.dashboardView.classList.remove('hidden');
  document.title = `DRIVE | ${state.isAdmin() ? 'Admin Portal' : 'User Portal'}`;

  // Terapkan mode tampilan dan tema warna spesifik hanya untuk akun yang sedang login saat ini
  const userMode = getUserDisplayMode(state.currentUser);
  setDisplayMode(userMode, false);
  const userTheme = getUserTheme(state.currentUser);
  applyTheme(userTheme, false);

  // Update User Profile details across the UI
  const u = state.currentUser;
  const isAdmin = state.isAdmin();

  // Sidebar categories visibility (Admin vs User)
  if (UI.sidebarAdminSection) {
    UI.sidebarAdminSection.classList.toggle('hidden', !isAdmin);
  }
  if (UI.sidebarTestingSection) {
    UI.sidebarTestingSection.classList.toggle('hidden', !isAdmin);
  }

  // Sidebar profile & mode notice
  UI.sidebarUserName.textContent = u.fullName;
  UI.sidebarUserAvatar.src = u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  
  if (isAdmin) {
    UI.sidebarUserRoleBadge.classList.remove('hidden');
    UI.sidebarUserRoleBadge.className = 'badge badge-admin';
    UI.sidebarUserRoleBadge.innerHTML = '<i class="fa-solid fa-crown"></i> Admin';
    UI.sidebarModeNotice.classList.remove('hidden');
    UI.sidebarModeNotice.className = 'sidebar-mode-notice mode-admin';
    UI.sidebarModeNotice.innerHTML = '<i class="fa-solid fa-unlock-keyhole"></i> <span>Akses: <strong>Penuh (CRUD)</strong></span>';
    UI.navUserLockBadge.className = 'nav-badge-lock';
    UI.navUserLockBadge.innerHTML = '<i class="fa-solid fa-check"></i> Akses';
  } else {
    UI.sidebarUserRoleBadge.className = 'badge badge-user';
    UI.sidebarUserRoleBadge.innerHTML = '<i class="fa-solid fa-user"></i> User';
    UI.sidebarModeNotice.classList.add('hidden'); // Hidden on user
    UI.navUserLockBadge.className = 'nav-badge-lock';
    UI.navUserLockBadge.innerHTML = '<i class="fa-solid fa-lock"></i> Admin';
  }

  // Topbar Profile, Role Pill, Quick Switch, & Dropdown items
  if (UI.topbarUserAvatar) UI.topbarUserAvatar.src = u.avatar;
  UI.topbarUserName.textContent = u.fullName.split(' ')[0];
  UI.dropdownFullName.textContent = u.fullName;
  UI.dropdownEmail.textContent = u.email;
  if (UI.dropdownRoleTag) {
    UI.dropdownRoleTag.textContent = `Hak Akses: ${isAdmin ? 'Administrator (Akses Penuh)' : 'Pengguna'}`;
    UI.dropdownRoleTag.classList.toggle('hidden', !isAdmin);
  }

  // Topbar Role Pill & Banner
  if (isAdmin) {
    UI.topbarRolePill.className = 'current-role-pill pill-admin';
    UI.topbarRoleText.textContent = 'Admin (Akses Penuh)';
    UI.topbarRolePill.classList.remove('hidden');
    UI.userRoleAlertBanner.classList.add('hidden');
    // Enable Add Data buttons
    UI.btnOpenAddDataModal.disabled = false;
    UI.btnOpenAddDataModal.classList.remove('opacity-50');
    UI.addDataDisabledTooltip.classList.add('hidden');
    if (UI.btnOverviewQuickAdd) UI.btnOverviewQuickAdd.classList.remove('hidden');
  } else {
    // Hidden on user: "User (Hanya Lihat)", "Mode Tinjauan (Read-Only) Aktif...", "Coba Akun Admin"
    UI.topbarRolePill.classList.add('hidden');
    UI.userRoleAlertBanner.classList.add('hidden');
    if (UI.btnBannerSwitchAdmin) UI.btnBannerSwitchAdmin.classList.add('hidden');
    // Disable Add Data buttons for Read-Only user
    UI.btnOpenAddDataModal.disabled = true;
    UI.addDataDisabledTooltip.classList.remove('hidden');
    if (UI.btnOverviewQuickAdd) UI.btnOverviewQuickAdd.classList.add('hidden');
  }

  // Update Data Permission Status Banner on Data page
  const dataPermissionStatusBanner = document.getElementById('dataPermissionStatusBanner');
  if (dataPermissionStatusBanner) {
    dataPermissionStatusBanner.classList.toggle('hidden', !isAdmin);
  }
  const bannerRoleLabel = document.getElementById('bannerRoleLabel');
  const bannerRoleDesc = document.getElementById('bannerRoleDesc');
  const bannerBadgePrivilege = document.getElementById('bannerBadgePrivilege');
  if (bannerRoleLabel && bannerRoleDesc && bannerBadgePrivilege && isAdmin) {
    bannerRoleLabel.textContent = 'Otoritas Akses: Administrator Penuh';
    bannerRoleDesc.innerHTML = 'Anda memiliki izin untuk <strong>Menambah</strong>, <strong>Mengedit</strong>, dan <strong>Menghapus</strong> data pada katalog ini.';
    bannerBadgePrivilege.className = 'badge badge-admin';
    bannerBadgePrivilege.textContent = 'CRUD Diizinkan';
  }

  // Update Timer permissions and monitoring visibility
  const timerPermissionBanner = document.getElementById('timerPermissionBanner');
  if (timerPermissionBanner) {
    timerPermissionBanner.classList.toggle('hidden', !isAdmin);
  }
  if (isAdmin) {
    if (UI.adminTimerActionButtons) UI.adminTimerActionButtons.classList.remove('hidden');
    if (UI.userTimerNoticeTag) UI.userTimerNoticeTag.classList.add('hidden');
    if (UI.adminTimerMonitorSection) UI.adminTimerMonitorSection.classList.remove('hidden');
    if (UI.countdownHeaderTitle) UI.countdownHeaderTitle.textContent = 'Timer Waktu Mundur Admin';
    if (UI.stopwatchHeaderTitle) UI.stopwatchHeaderTitle.textContent = 'Stopwatch Admin';
    if (UI.timerBannerRoleLabel) {
      UI.timerBannerRoleLabel.textContent = 'Otoritas Akses Timer: Administrator & Live Monitor';
      UI.timerBannerRoleDesc.textContent = 'Admin dapat memantau seluruh waktu yang diambil oleh setiap user secara real-time melalui panel pemantau di bawah, serta mengelola timer & stopwatch pribadi.';
      UI.timerBannerBadge.className = 'badge badge-admin';
      UI.timerBannerBadge.textContent = 'Live Monitor & Kontrol';
    }
  } else {
    if (UI.adminTimerActionButtons) UI.adminTimerActionButtons.classList.remove('hidden');
    if (UI.userTimerNoticeTag) UI.userTimerNoticeTag.classList.add('hidden');
    if (UI.adminTimerMonitorSection) UI.adminTimerMonitorSection.classList.add('hidden');
    if (UI.countdownHeaderTitle) UI.countdownHeaderTitle.textContent = 'Timer Waktu Mundur Saya';
    if (UI.stopwatchHeaderTitle) UI.stopwatchHeaderTitle.textContent = 'Stopwatch Saya';
    if (UI.timerBannerRoleLabel) {
      UI.timerBannerRoleLabel.textContent = 'Otoritas Akses Timer: Pengguna Mandiri';
      UI.timerBannerRoleDesc.textContent = 'Anda memiliki kontrol penuh atas timer pribadi Anda: tentukan waktu, mulai, jeda, reset, dan edit waktu kapan saja. Data waktu Anda tersimpan mandiri dan tidak berpengaruh pada pengguna lain.';
      UI.timerBannerBadge.className = 'badge badge-user';
      UI.timerBannerBadge.textContent = 'Kontrol Pribadi Penuh';
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
    UI.settingsRolePill.textContent = isAdmin ? 'Hak Akses: Administrator' : 'Hak Akses: Pengguna';
  }

  // Render active section
  navigateToPage(state.currentPage);
}

function navigateToPage(pageId) {
  // Guard check: Team Management and Activity Log are strictly Admin only
  if (['user-management', 'activity-log'].includes(pageId) && !state.isAdmin()) {
    showToast(
      'Akses Dibatasi',
      'Hanya Administrator yang memiliki hak izin untuk mengakses menu ini.',
      'warning'
    );
    navigateToPage('overview');
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
    timer: 'Pusat Timer & Stopwatch',
    'user-management': 'Manajemen Team',
    'activity-log': 'Log Aktivitas & Jejak Audit',
    settings: 'Profil Akun'
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
  } else if (pageId === 'timer') {
    renderTimerPage();
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
  const users = state.getUsers();
  const logs = state.getLogs();

  // Metrics (Pengguna Terdaftar & Status Akses Sesi)
  const adminCount = users.filter(u => u.role === 'admin').length;
  const elTotalUsers = document.getElementById('metricTotalUsers');
  if (elTotalUsers) elTotalUsers.textContent = users.length;

  const elAdminRatio = document.getElementById('metricAdminRatio');
  if (elAdminRatio) elAdminRatio.textContent = `${adminCount} Admin`;

  const permLabel = document.getElementById('metricPermissionLabel');
  const permDesc = document.getElementById('metricPermissionDesc');
  const permBadge = document.getElementById('metricUserRoleBadge');
  if (permLabel && permDesc && permBadge) {
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
  }

  // Recent Activity Timeline (Log Sesi Terbaru)
  if (UI.overviewActivityTimeline) {
    const recentLogs = logs.slice(0, 8);
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
  }
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

  const curPalette = (typeof THEME_PALETTES !== 'undefined' && THEME_PALETTES[state.currentTheme]) 
    ? THEME_PALETTES[state.currentTheme] 
    : { primary: '#e62e44', hover: '#ff3851', dark: '#b81427', rgb: '230, 46, 68' };

  // Monthly Chart
  const monthlyCanvas = document.getElementById('monthlyChart');
  if (monthlyCanvas) {
    if (state.monthlyChartInstance) state.monthlyChartInstance.destroy();

    const ctx = monthlyCanvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, `rgba(${curPalette.rgb}, 0.45)`);
    gradient.addColorStop(1, `rgba(${curPalette.rgb}, 0.0)`);

    const isLight = state.currentDisplayMode === 'light';
    const gridColor = isLight ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.05)';
    const tickColor = isLight ? '#475569' : '#64748b';
    const tooltipBg = isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(18, 22, 31, 0.95)';
    const tooltipBorder = isLight ? '#cbd5e1' : '#283042';
    const tooltipTitle = isLight ? '#0f172a' : '#ffffff';
    const tooltipBody = isLight ? '#334155' : '#cbd5e1';

    state.monthlyChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
        datasets: [
          {
            label: 'Total Nilai Aset (Juta Rp)',
            data: [120, 145, 178, 192, 215, 230, 260, 295, 340],
            borderColor: curPalette.primary,
            backgroundColor: gradient,
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: curPalette.hover,
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            pointHoverRadius: 7
          },
          {
            label: 'Jumlah Stok Beredar',
            data: [45, 52, 60, 68, 75, 80, 88, 92, 105],
            borderColor: isLight ? '#94a3b8' : '#64748b',
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
              color: isLight ? '#334155' : '#94a3b8',
              font: { family: 'Plus Jakarta Sans', size: 11 }
            }
          },
          tooltip: {
            backgroundColor: tooltipBg,
            borderColor: tooltipBorder,
            borderWidth: 1,
            titleColor: tooltipTitle,
            bodyColor: tooltipBody
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: tickColor }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: tickColor }
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
    const colors = [curPalette.primary, curPalette.dark, '#475569', '#94a3b8', '#f59e0b'];
    const donutBorder = state.currentDisplayMode === 'light' ? '#ffffff' : '#141720';

    state.categoryDonutInstance = new Chart(donutCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          data: counts,
          backgroundColor: colors.slice(0, categories.length),
          borderColor: donutBorder,
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
  } else if (type === 'timer') {
    const timers = state.getTimers().filter(t => t.id !== id);
    state.saveTimers(timers);
    state.addLog('DELETE_TIMER', 'Hapus Timer', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus timer: ${name}.`);
    showToast('Timer Dihapus', `Timer <strong>${name}</strong> berhasil dihapus.`, 'danger');
    renderTimerPage();
  } else if (type === 'stopwatch') {
    const stopwatches = state.getStopwatches().filter(s => s.id !== id);
    state.saveStopwatches(stopwatches);
    state.addLog('DELETE_STOPWATCH', 'Hapus Stopwatch', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus stopwatch: ${name}.`);
    showToast('Stopwatch Dihapus', `Stopwatch <strong>${name}</strong> berhasil dihapus.`, 'danger');
    renderTimerPage();
  }

  state.pendingDelete = null;
  UI.modalConfirmDelete.classList.add('hidden');
}

// ==========================================
// 10. MANAJEMEN USER & PENDAFTARAN USER BARU (ADMIN ONLY)
// ==========================================

const RANDOM_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
];

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
  const serviceFilter = UI.filterUserService ? UI.filterUserService.value : 'ALL';

  let filteredUsers = users.filter(u => {
    const matchesSearch = !searchQ || 
      u.fullName.toLowerCase().includes(searchQ) ||
      u.username.toLowerCase().includes(searchQ) ||
      u.email.toLowerCase().includes(searchQ) ||
      (u.department && u.department.toLowerCase().includes(searchQ));
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    const matchesService = serviceFilter === 'ALL' || u.department === serviceFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesService;
  });

  UI.userTableBody.innerHTML = filteredUsers.map((u, idx) => {
    const isSelf = state.currentUser && state.currentUser.id === u.id;
    const roleBadge = u.role === 'admin' 
      ? '<span class="badge badge-admin"><i class="fa-solid fa-crown"></i> Administrator</span>'
      : '<span class="badge badge-user"><i class="fa-solid fa-user"></i> Pengguna Biasa</span>';

    const statusBadge = u.status === 'active'
      ? `<span class="badge badge-green badge-status-toggle" onclick="toggleUserStatus('${u.id}')" title="Klik untuk ubah status"><i class="fa-solid fa-circle-check"></i> Aktif</span>`
      : `<span class="badge badge-red badge-status-toggle" onclick="toggleUserStatus('${u.id}')" title="Klik untuk ubah status"><i class="fa-solid fa-ban"></i> Nonaktif</span>`;

    const serviceBadge = u.department === 'TEAM LEADER'
      ? '<span class="badge badge-red-outline" style="font-size:0.75rem;"><i class="fa-solid fa-user-shield text-red" style="margin-right: 4px;"></i>TEAM LEADER</span>'
      : `<span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-headset text-red" style="margin-right: 4px;"></i>${u.department || 'CSO INBOUND'}</span>`;

    let actionButtons = '';
    if (isSelf) {
      actionButtons = `
        <div class="table-actions-cell">
          <button class="btn-table-action btn-action-edit" onclick="openEditUserModal('${u.id}')" title="Edit Profil Team Anda">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <span class="badge badge-gray" style="font-size:0.7rem;">
            <i class="fa-solid fa-user-check text-green"></i> Akun Anda
          </span>
        </div>
      `;
    } else {
      actionButtons = `
        <div class="table-actions-cell">
          <button class="btn-table-action btn-action-edit" onclick="openEditUserModal('${u.id}')" title="Edit Anggota Team">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
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
        <td>${serviceBadge}</td>
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
  if (UI.regUserId) UI.regUserId.value = '';
  
  const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  if (UI.regAvatarPreview) UI.regAvatarPreview.src = defaultAvatar;
  if (UI.regAvatarData) UI.regAvatarData.value = defaultAvatar;
  if (UI.regAvatarUrl) UI.regAvatarUrl.value = '';

  if (UI.regPassword) {
    UI.regPassword.required = true;
    UI.regPassword.value = '';
  }
  if (UI.regPasswordRequired) UI.regPasswordRequired.style.display = 'inline';
  if (UI.regPasswordLabel) UI.regPasswordLabel.innerHTML = 'Kata Sandi Akun <span class="required" id="regPasswordRequired">*</span>';
  if (UI.regPasswordHint) UI.regPasswordHint.textContent = 'Pengguna dapat masuk menggunakan username dan kata sandi ini.';

  if (UI.modalUserTitle) UI.modalUserTitle.textContent = 'Manajemen Team Baru';
  if (UI.modalUserSubtitle) UI.modalUserSubtitle.textContent = 'Tambah anggota team baru dengan layanan CSO dan hak akses peran';
  if (UI.modalUserIcon) UI.modalUserIcon.className = 'fa-solid fa-user-plus';
  if (UI.btnSubmitRegisterText) UI.btnSubmitRegisterText.textContent = 'Daftarkan Anggota Team';
  if (UI.btnSubmitRegisterIcon) UI.btnSubmitRegisterIcon.className = 'fa-solid fa-user-plus';

  updateRoleExplanation();
  UI.modalRegisterUser.classList.remove('hidden');
}

window.openEditUserModal = function(id) {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang dapat mengubah data anggota team.', 'danger');
    return;
  }

  const users = state.getUsers();
  const user = users.find(u => u.id === id);
  if (!user) {
    showToast('Data Tidak Ditemukan', 'Pengguna tidak ditemukan di sistem.', 'danger');
    return;
  }

  UI.registerUserForm.reset();
  if (UI.regUserId) UI.regUserId.value = user.id;
  if (UI.regFullName) UI.regFullName.value = user.fullName;
  if (UI.regUsername) UI.regUsername.value = user.username;
  if (UI.regEmail) UI.regEmail.value = user.email;
  if (UI.regRole) UI.regRole.value = user.role;
  if (UI.regDept) UI.regDept.value = user.department || 'CSO INBOUND';

  const avatarSrc = user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  if (UI.regAvatarPreview) UI.regAvatarPreview.src = avatarSrc;
  if (UI.regAvatarData) UI.regAvatarData.value = avatarSrc;
  if (UI.regAvatarUrl) UI.regAvatarUrl.value = (user.avatar && user.avatar.startsWith('http')) ? user.avatar : '';

  if (UI.regPassword) {
    UI.regPassword.required = false;
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
};

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

  const editId = UI.regUserId ? UI.regUserId.value.trim() : '';
  const fullName = UI.regFullName.value.trim();
  const username = UI.regUsername.value.trim().toLowerCase();
  const email = UI.regEmail.value.trim();
  const role = UI.regRole.value;
  const department = UI.regDept.value.trim();
  const password = UI.regPassword.value;

  if (!fullName || !username || !email || !department) {
    showToast('Form Tidak Lengkap', 'Mohon lengkapi Nama Lengkap, Username, Email, dan Layanan.', 'warning');
    return;
  }

  const users = state.getUsers();

  // Determine avatar
  let avatar = (UI.regAvatarData && UI.regAvatarData.value.trim()) || 
               (UI.regAvatarUrl && UI.regAvatarUrl.value.trim()) || 
               (UI.regAvatarPreview ? UI.regAvatarPreview.src : '') || 
               'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  if (editId) {
    // ==================== EDIT MODE ====================
    const userIndex = users.findIndex(u => u.id === editId);
    if (userIndex === -1) {
      showToast('Error', 'Data pengguna tidak ditemukan.', 'danger');
      return;
    }

    // Check if new username conflicts with other user
    if (users.some(u => u.id !== editId && u.username.toLowerCase() === username)) {
      showToast('Username Digunakan', `Username "${username}" sudah digunakan pengguna lain.`, 'danger');
      return;
    }

    const targetUser = users[userIndex];
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

    state.saveUsers(users);

    // If current logged in user is being updated, sync state & topbar
    if (state.currentUser && state.currentUser.id === editId) {
      state.currentUser.fullName = fullName;
      state.currentUser.username = username;
      state.currentUser.email = email;
      state.currentUser.role = role;
      state.currentUser.department = department;
      state.currentUser.avatar = avatar;
      state.saveSession(state.currentUser);

      if (UI.sidebarUserName) UI.sidebarUserName.textContent = fullName;
      if (UI.sidebarUserAvatar) UI.sidebarUserAvatar.src = avatar;
      if (UI.topbarUserName) UI.topbarUserName.textContent = fullName;
      if (UI.topbarUserAvatar) UI.topbarUserAvatar.src = avatar;
    }

    state.addLog(
      'UPDATE_USER',
      'Ubah Anggota Team',
      `Admin ${state.currentUser.fullName} memperbarui data anggota team: ${fullName} (@${username}) pada layanan ${department}.`
    );

    showToast('Data Diperbarui', `Data anggota team <strong>${fullName}</strong> berhasil disimpan.`, 'success');
    closeRegisterUserModal();
    renderUserManagementPage();
    if (state.currentPage === 'overview') renderOverviewPage();
    if (state.currentPage === 'timer') renderTimerPage();
    return;
  }

  // ==================== CREATE NEW MODE ====================
  if (!password) {
    showToast('Kata Sandi Wajib', 'Kata sandi wajib diisi untuk pendaftaran anggota baru.', 'warning');
    return;
  }

  if (password.length < 6) {
    showToast('Kata Sandi Lemah', 'Kata sandi minimal harus 6 karakter.', 'warning');
    return;
  }

  // Check if username already exists
  if (users.some(u => u.username.toLowerCase() === username)) {
    showToast('Username Digunakan', `Username "${username}" sudah terdaftar pada akun lain.`, 'danger');
    return;
  }

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  const newUser = {
    id: 'usr_' + Date.now(),
    username,
    password,
    fullName,
    email,
    role,
    department: department || 'CSO INBOUND',
    status: 'active',
    avatar,
    createdAt: formattedDate
  };

  users.push(newUser);
  state.saveUsers(users);
  state.addLog(
    'REGISTER_USER',
    'Daftar Team Baru',
    `Admin ${state.currentUser.fullName} mendaftarkan anggota team baru: ${fullName} (@${username}) untuk layanan ${department} (${role.toUpperCase()}).`
  );

  showToast('Anggota Team Terdaftar', `Akun <strong>${fullName}</strong> berhasil didaftarkan pada layanan <strong>${department}</strong>.`, 'success');

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
// CHANGE PASSWORD MODAL & LOGIC
// ==========================================

function openChangePasswordModal() {
  if (UI.formChangePassword) UI.formChangePassword.reset();
  if (UI.changePassCurrent) UI.changePassCurrent.type = 'password';
  if (UI.changePassNew) UI.changePassNew.type = 'password';
  if (UI.changePassConfirm) UI.changePassConfirm.type = 'password';
  if (UI.toggleCurrentPassIcon) UI.toggleCurrentPassIcon.className = 'fa-regular fa-eye';
  if (UI.toggleNewPassIcon) UI.toggleNewPassIcon.className = 'fa-regular fa-eye';
  if (UI.toggleConfirmPassIcon) UI.toggleConfirmPassIcon.className = 'fa-regular fa-eye';

  if (UI.modalChangePassword) UI.modalChangePassword.classList.remove('hidden');
  if (UI.userDropdownMenu) UI.userDropdownMenu.classList.add('hidden');
  if (UI.changePassCurrent) {
    setTimeout(() => UI.changePassCurrent.focus(), 100);
  }
}

function closeChangePasswordModal() {
  if (UI.modalChangePassword) UI.modalChangePassword.classList.add('hidden');
  if (UI.formChangePassword) UI.formChangePassword.reset();
}

function handlePasswordChangeSubmit(e) {
  e.preventDefault();
  if (!state.currentUser) return;

  const currentPass = UI.changePassCurrent ? UI.changePassCurrent.value.trim() : '';
  const newPass = UI.changePassNew ? UI.changePassNew.value.trim() : '';
  const confirmPass = UI.changePassConfirm ? UI.changePassConfirm.value.trim() : '';

  if (!currentPass) {
    showToast('Validasi Gagal', 'Harap masukkan password saat ini.', 'warning');
    if (UI.changePassCurrent) UI.changePassCurrent.focus();
    return;
  }

  if (state.currentUser.password !== currentPass) {
    showToast('Password Salah', 'Password saat ini yang Anda masukkan keliru.', 'danger');
    if (UI.changePassCurrent) UI.changePassCurrent.focus();
    return;
  }

  if (!newPass || newPass.length < 6) {
    showToast('Validasi Gagal', 'Password baru harus terdiri dari minimal 6 karakter.', 'warning');
    if (UI.changePassNew) UI.changePassNew.focus();
    return;
  }

  if (newPass === currentPass) {
    showToast('Validasi Gagal', 'Password baru tidak boleh sama dengan password saat ini.', 'warning');
    if (UI.changePassNew) UI.changePassNew.focus();
    return;
  }

  if (newPass !== confirmPass) {
    showToast('Validasi Gagal', 'Konfirmasi password baru tidak cocok. Periksa kembali.', 'danger');
    if (UI.changePassConfirm) UI.changePassConfirm.focus();
    return;
  }

  // Update password in users list
  const users = state.getUsers();
  const idx = users.findIndex(u => u.id === state.currentUser.id);
  if (idx !== -1) {
    users[idx].password = newPass;
    state.saveUsers(users);
  }

  // Update current session
  state.currentUser.password = newPass;
  state.setSession(state.currentUser);

  // Add audit log
  state.addLog(
    'SECURITY',
    'Ubah Password',
    `Pengguna ${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) berhasil memperbarui kata sandi akun.`
  );

  closeChangePasswordModal();
  showToast(
    'Password Berhasil Diubah',
    'Kata sandi akun Anda telah berhasil diperbarui dengan aman.',
    'success'
  );
}

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
    link.setAttribute('download', `drive_inventaris_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Ekspor Berhasil', 'Data berhasil diekspor ke dalam file CSV.', 'success');
  } else if (format === 'json') {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `drive_inventaris_${Date.now()}.json`);
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
// 12.5 PUSAT TIMER & STOPWATCH (ADMIN & USER)
// ==========================================

function formatSecondsToHMS(totalSec) {
  if (totalSec < 0 || isNaN(totalSec)) totalSec = 0;
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function renderTimerPage() {
  const allTimers = state.getTimers();
  const allStopwatches = state.getStopwatches();
  const isAdmin = state.isAdmin();
  const currentUserId = state.currentUser ? state.currentUser.id : null;

  // 1. Personal Timers & Stopwatches (isolated per user)
  const personalTimers = allTimers.filter(t => t.userId === currentUserId);
  const personalStopwatches = allStopwatches.filter(s => s.userId === currentUserId);

  // Active counts badges for personal workspace
  const activePersonalTimersCount = personalTimers.filter(t => t.isRunning && t.remainingSeconds > 0).length;
  const activePersonalSwCount = personalStopwatches.filter(s => s.isRunning).length;

  if (UI.activeCountdownCountBadge) {
    UI.activeCountdownCountBadge.textContent = `${activePersonalTimersCount} Berjalan dari ${personalTimers.length} Timer`;
  }
  if (UI.activeStopwatchCountBadge) {
    UI.activeStopwatchCountBadge.textContent = `${activePersonalSwCount} Berjalan dari ${personalStopwatches.length} Stopwatch`;
  }

  // 2. Render Admin Live Monitoring Section if Admin
  if (isAdmin) {
    if (UI.adminTimerMonitorSection) UI.adminTimerMonitorSection.classList.remove('hidden');
    renderAdminTimerMonitor(allTimers, allStopwatches);
  } else {
    if (UI.adminTimerMonitorSection) UI.adminTimerMonitorSection.classList.add('hidden');
  }

  // 3. Render Personal Countdown Timers
  if (UI.countdownTimersContainer) {
    if (personalTimers.length === 0) {
      UI.countdownTimersContainer.innerHTML = `
        <div class="empty-state py-4 text-center">
          <i class="fa-solid fa-hourglass-empty text-muted" style="font-size: 2.2rem;"></i>
          <h4 class="mt-2 text-white">Belum Ada Timer Waktu Mundur Pribadi</h4>
          <p class="text-muted">Klik tombol "+ Tambah Timer" untuk membuat waktu mundur dengan durasi yang Anda tentukan sendiri.</p>
          <button type="button" class="btn btn-primary btn-sm glow-effect-red mt-2" onclick="openAddTimerModal()">
            <i class="fa-solid fa-plus"></i> Tambah Timer Sekarang
          </button>
        </div>
      `;
    } else {
      UI.countdownTimersContainer.innerHTML = personalTimers.map(timer => {
        const isCompleted = timer.remainingSeconds === 0;
        const percent = timer.totalSeconds > 0 
          ? Math.max(0, Math.min(100, Math.round((timer.remainingSeconds / timer.totalSeconds) * 100))) 
          : 0;

        let statusBadge = '';
        if (isCompleted) {
          statusBadge = '<span class="badge badge-red"><i class="fa-solid fa-flag-checkered"></i> Waktu Habis</span>';
        } else if (timer.isRunning) {
          statusBadge = '<span class="badge badge-green"><i class="fa-solid fa-circle-dot pulse-dot"></i> Berjalan</span>';
        } else {
          statusBadge = '<span class="badge badge-yellow"><i class="fa-solid fa-pause"></i> Dijeda</span>';
        }

        // Action controls: User has full controls (Play/Pause, Reset, Edit Waktu, Delete) on their own timer
        let playPauseBtn = '';
        if (isCompleted) {
          playPauseBtn = `<button type="button" class="btn-timer-ctrl btn-ctrl-start" onclick="resetTimer('${timer.id}')" title="Mulai Ulang"><i class="fa-solid fa-rotate-left"></i> Mulai Ulang</button>`;
        } else if (timer.isRunning) {
          playPauseBtn = `<button type="button" class="btn-timer-ctrl btn-ctrl-pause" onclick="toggleTimerRunning('${timer.id}')" title="Jeda Timer (Pause)"><i class="fa-solid fa-pause"></i> Jeda</button>`;
        } else {
          playPauseBtn = `<button type="button" class="btn-timer-ctrl btn-ctrl-start" onclick="toggleTimerRunning('${timer.id}')" title="Mulai Hitung Mundur (Play)"><i class="fa-solid fa-play"></i> Mulai</button>`;
        }

        const actionControls = `
          <div class="timer-actions-row">
            ${playPauseBtn}
            <button type="button" class="btn-timer-ctrl btn-ctrl-reset" onclick="resetTimer('${timer.id}')" title="Kembalikan ke Waktu Semula (${formatSecondsToHMS(timer.totalSeconds)})">
              <i class="fa-solid fa-arrows-rotate"></i> Reset
            </button>
            <button type="button" class="btn-timer-ctrl btn-ctrl-edit" onclick="openEditTimerModal('${timer.id}')" title="Edit Waktu Ditentukan &amp; Nama Timer">
              <i class="fa-solid fa-pen-to-square"></i> Edit Waktu
            </button>
            <button type="button" class="btn-timer-ctrl btn-ctrl-delete" onclick="promptDeleteTimer('${timer.id}', '${timer.name.replace(/'/g, "\\'")}')" title="Hapus Timer">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;

        return `
          <div class="timer-card ${timer.isRunning ? 'timer-running' : ''} ${isCompleted ? 'timer-completed' : ''}" id="timerCard_${timer.id}">
            <!-- SISI KIRI: NAMA TIMER & INFO -->
            <div class="timer-info-left">
              <div class="timer-title-row">
                <h4 class="timer-title" id="timerNameText_${timer.id}">${timer.name}</h4>
                <span class="timer-badge-cat">${timer.category || 'Umum'}</span>
                ${statusBadge}
              </div>
              <p class="timer-desc-text">${timer.desc || 'Tidak ada instruksi khusus.'}</p>
              <div class="timer-meta-info">
                <span><i class="fa-regular fa-clock text-red"></i> Waktu Ditentukan: <strong id="timerTotal_${timer.id}">${formatSecondsToHMS(timer.totalSeconds)}</strong></span>
                <span><i class="fa-solid fa-chart-pie text-gray"></i> Sisa Waktu: <strong id="timerPercent_${timer.id}">${percent}%</strong></span>
              </div>
            </div>

            <!-- SISI KANAN: DISPLAY WAKTU DIGITAL & AKSI -->
            <div class="timer-clock-right">
              <div class="timer-digital-display ${isCompleted ? 'text-danger-pulse' : ''}" id="timerDisplay_${timer.id}">
                ${formatSecondsToHMS(timer.remainingSeconds)}
              </div>
              
              <div class="timer-progress-track">
                <div class="timer-progress-fill" id="timerProgress_${timer.id}" style="width: ${percent}%;"></div>
              </div>

              ${actionControls}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 4. Render Personal Stopwatches
  if (UI.stopwatchesContainer) {
    if (personalStopwatches.length === 0) {
      UI.stopwatchesContainer.innerHTML = `
        <div class="empty-state py-4 text-center">
          <i class="fa-solid fa-stopwatch text-muted" style="font-size: 2.2rem;"></i>
          <h4 class="mt-2 text-white">Belum Ada Stopwatch Pribadi</h4>
          <p class="text-muted">Klik tombol "+ Tambah Stopwatch" untuk mulai mencatat durasi aktivitas progresif Anda.</p>
          <button type="button" class="btn btn-outline-gray btn-sm mt-2" onclick="openAddStopwatchModal()">
            <i class="fa-solid fa-plus text-red"></i> Tambah Stopwatch Sekarang
          </button>
        </div>
      `;
    } else {
      UI.stopwatchesContainer.innerHTML = personalStopwatches.map(sw => {
        let statusBadge = sw.isRunning
          ? '<span class="badge badge-green"><i class="fa-solid fa-play pulse-dot"></i> Berjalan</span>'
          : '<span class="badge badge-gray"><i class="fa-solid fa-stop"></i> Berhenti</span>';

        let playPauseBtn = sw.isRunning
          ? `<button type="button" class="btn-timer-ctrl btn-ctrl-pause" onclick="toggleStopwatchRunning('${sw.id}')" title="Jeda"><i class="fa-solid fa-pause"></i> Jeda</button>`
          : `<button type="button" class="btn-timer-ctrl btn-ctrl-start" onclick="toggleStopwatchRunning('${sw.id}')" title="Mulai"><i class="fa-solid fa-play"></i> Mulai</button>`;

        const actionControls = `
          <div class="timer-actions-row">
            ${playPauseBtn}
            <button type="button" class="btn-timer-ctrl btn-ctrl-reset" onclick="resetStopwatch('${sw.id}')" title="Reset ke Nol">
              <i class="fa-solid fa-arrows-rotate"></i> Reset
            </button>
            <button type="button" class="btn-timer-ctrl btn-ctrl-delete" onclick="promptDeleteStopwatch('${sw.id}', '${sw.name.replace(/'/g, "\\'")}')" title="Hapus Stopwatch">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;

        return `
          <div class="timer-card ${sw.isRunning ? 'timer-running' : ''}" id="stopwatchCard_${sw.id}">
            <!-- SISI KIRI: NAMA STOPWATCH & DEPARTEMEN -->
            <div class="timer-info-left">
              <div class="timer-title-row">
                <h4 class="timer-title">${sw.name}</h4>
                <span class="timer-badge-cat">${sw.dept || 'Operasional'}</span>
                ${statusBadge}
              </div>
              <p class="timer-desc-text">Stopwatch pencatatan durasi tugas operasional pribadi Anda.</p>
              <div class="timer-meta-info">
                <span><i class="fa-solid fa-stopwatch text-red"></i> Waktu Berjalan Real-time</span>
              </div>
            </div>

            <!-- SISI KANAN: DISPLAY WAKTU BERJALAN & KONTROL -->
            <div class="timer-clock-right">
              <div class="timer-digital-display" id="stopwatchDisplay_${sw.id}">
                ${formatSecondsToHMS(sw.elapsedSeconds)}
              </div>
              ${actionControls}
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

// ------------------------------------------
// ADMIN LIVE TIMER MONITORING TABLE
// ------------------------------------------

function renderAdminTimerMonitor(allTimers, allStopwatches) {
  if (!state.isAdmin() || !UI.adminMonitorTableBody) return;

  const users = state.getUsers();

  // Populate user filter dropdown (preserve selected)
  if (UI.filterMonitorUser) {
    const curVal = UI.filterMonitorUser.value || 'ALL';
    const opts = ['<option value="ALL">Semua Pengguna (' + users.length + ' Akun)</option>'];
    users.forEach(u => {
      opts.push(`<option value="${u.id}" ${curVal === u.id ? 'selected' : ''}>${u.fullName} (@${u.username})</option>`);
    });
    UI.filterMonitorUser.innerHTML = opts.join('');
  }

  // Combine all timers and stopwatches with user metadata
  const monitorItems = [];

  allTimers.forEach(t => {
    const owner = users.find(u => u.id === t.userId) || {
      fullName: t.userFullName || 'Pengguna',
      username: t.username || 'user',
      avatar: t.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'user'
    };

    const isCompleted = t.remainingSeconds === 0;
    const percent = t.totalSeconds > 0 
      ? Math.max(0, Math.min(100, Math.round((t.remainingSeconds / t.totalSeconds) * 100))) 
      : 0;

    monitorItems.push({
      id: t.id,
      type: 'timer',
      userId: t.userId || owner.id,
      fullName: owner.fullName,
      username: owner.username,
      avatar: owner.avatar || t.userAvatar,
      role: owner.role,
      name: t.name,
      category: t.category || 'Umum',
      desc: t.desc || '',
      targetSeconds: t.totalSeconds,
      currentSeconds: t.remainingSeconds,
      isRunning: t.isRunning,
      isCompleted: isCompleted,
      percent: percent
    });
  });

  allStopwatches.forEach(sw => {
    const owner = users.find(u => u.id === sw.userId) || {
      fullName: sw.userFullName || 'Pengguna',
      username: sw.username || 'user',
      avatar: sw.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'user'
    };

    monitorItems.push({
      id: sw.id,
      type: 'stopwatch',
      userId: sw.userId || owner.id,
      fullName: owner.fullName,
      username: owner.username,
      avatar: owner.avatar || sw.userAvatar,
      role: owner.role,
      name: sw.name,
      category: sw.dept || 'Operasional',
      desc: 'Pencatatan waktu progresif bertambah (Stopwatch)',
      targetSeconds: 0,
      currentSeconds: sw.elapsedSeconds,
      isRunning: sw.isRunning,
      isCompleted: false,
      percent: 100
    });
  });

  // Calculate live summary badges
  const runningItems = monitorItems.filter(i => i.isRunning);
  const activeUserIds = new Set(runningItems.map(i => i.userId));

  if (UI.monitorActiveUsersBadge) {
    UI.monitorActiveUsersBadge.innerHTML = `<i class="fa-solid fa-users pulse-dot"></i> ${activeUserIds.size} User Sedang Berjalan`;
  }
  if (UI.monitorActiveTimersBadge) {
    UI.monitorActiveTimersBadge.innerHTML = `<i class="fa-solid fa-stopwatch text-white"></i> ${runningItems.length} Waktu Berjalan`;
  }

  // Filter items based on user inputs
  const searchQ = (UI.searchMonitorInput ? UI.searchMonitorInput.value : '').toLowerCase().trim();
  const filterUser = UI.filterMonitorUser ? UI.filterMonitorUser.value : 'ALL';
  const filterStatus = UI.filterMonitorStatus ? UI.filterMonitorStatus.value : 'ALL';

  const filtered = monitorItems.filter(item => {
    const matchesSearch = !searchQ ||
      item.fullName.toLowerCase().includes(searchQ) ||
      item.username.toLowerCase().includes(searchQ) ||
      item.name.toLowerCase().includes(searchQ) ||
      item.category.toLowerCase().includes(searchQ);

    const matchesUser = filterUser === 'ALL' || item.userId === filterUser;

    let matchesStatus = true;
    if (filterStatus === 'running') {
      matchesStatus = item.isRunning;
    } else if (filterStatus === 'paused') {
      matchesStatus = !item.isRunning && !item.isCompleted;
    } else if (filterStatus === 'completed') {
      matchesStatus = item.isCompleted;
    }

    return matchesSearch && matchesUser && matchesStatus;
  });

  if (filtered.length === 0) {
    UI.adminMonitorTableBody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center py-4 text-muted">
          <i class="fa-solid fa-magnifying-glass mb-2" style="font-size: 1.6rem; opacity: 0.5;"></i>
          <p class="mb-0">Tidak ada data waktu user yang cocok dengan kriteria pencarian/filter.</p>
        </td>
      </tr>
    `;
    return;
  }

  UI.adminMonitorTableBody.innerHTML = filtered.map((item, idx) => {
    let statusBadge = '';
    if (item.isCompleted) {
      statusBadge = '<span class="badge badge-red"><i class="fa-solid fa-flag-checkered"></i> Selesai</span>';
    } else if (item.isRunning) {
      statusBadge = '<span class="badge badge-green"><i class="fa-solid fa-play pulse-dot"></i> Berjalan</span>';
    } else {
      statusBadge = '<span class="badge badge-yellow"><i class="fa-solid fa-pause"></i> Dijeda</span>';
    }

    const typeBadge = item.type === 'timer'
      ? '<span class="badge badge-gray"><i class="fa-solid fa-hourglass-half"></i> Countdown</span>'
      : '<span class="badge badge-gray"><i class="fa-solid fa-stopwatch text-red"></i> Stopwatch</span>';

    const targetFormatted = item.type === 'timer'
      ? `<span class="monitor-target-time">${formatSecondsToHMS(item.targetSeconds)}</span>`
      : `<span class="badge badge-gray"><i class="fa-solid fa-arrow-trend-up"></i> Stopwatch</span>`;

    const remainingFormatted = formatSecondsToHMS(item.currentSeconds);

    const roleTag = item.role === 'admin'
      ? '<span class="badge badge-admin" style="font-size:0.6rem; padding:0.1rem 0.35rem;">Admin</span>'
      : '<span class="badge badge-user" style="font-size:0.6rem; padding:0.1rem 0.35rem;">User</span>';

    return `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <div class="monitor-user-cell">
            <img src="${item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" class="monitor-user-avatar" alt="${item.fullName}">
            <div class="monitor-user-meta">
              <span class="monitor-user-name">${item.fullName} ${roleTag}</span>
              <span class="monitor-user-sub">@${item.username}</span>
            </div>
          </div>
        </td>
        <td>
          <div class="item-name-cell">
            <span>${item.name}</span>
            <small>${item.desc || '-'}</small>
          </div>
        </td>
        <td>
          <span class="badge badge-gray">${item.category}</span>
        </td>
        <td>
          ${targetFormatted}
        </td>
        <td>
          <span class="monitor-remaining-time ${item.isRunning ? 'text-running' : ''}" id="monitorRemaining_${item.id}">
            ${remainingFormatted}
          </span>
        </td>
        <td>
          <div class="monitor-progress-wrapper">
            <div class="monitor-progress-track">
              <div class="monitor-progress-fill" id="monitorProgressFill_${item.id}" style="width: ${item.percent}%;"></div>
            </div>
            <span class="monitor-progress-pct" id="monitorPercentText_${item.id}">${item.percent}%</span>
          </div>
        </td>
        <td>${statusBadge}</td>
        <td>${typeBadge}</td>
      </tr>
    `;
  }).join('');
}

// ------------------------------------------
// TIMER MODAL & CRUD OPERATIONS
// ------------------------------------------

function openAddTimerModal() {
  if (!state.currentUser) return;
  UI.modalTimerTitle.textContent = 'Tambah Timer Waktu Mundur Baru';
  UI.btnSubmitTimerText.textContent = 'Simpan Timer';
  UI.modalTimerIcon.className = 'fa-solid fa-hourglass-start';
  UI.timerForm.reset();
  UI.formTimerId.value = '';
  UI.formTimerHours.value = 1;
  UI.formTimerMinutes.value = 0;
  UI.formTimerSeconds.value = 0;
  UI.modalTimerForm.classList.remove('hidden');
}

window.openEditTimerModal = function(id) {
  if (!state.currentUser) return;
  const timers = state.getTimers();
  const timer = timers.find(t => t.id === id);
  if (!timer) return;

  // Ownership check: user can edit their own timer, admin can edit any
  if (timer.userId !== state.currentUser.id && !state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda hanya dapat mengedit timer milik Anda sendiri.', 'danger');
    return;
  }

  UI.modalTimerTitle.textContent = 'Edit Waktu Ditentukan & Timer';
  UI.btnSubmitTimerText.textContent = 'Simpan Perubahan';
  UI.modalTimerIcon.className = 'fa-solid fa-pen-to-square';

  UI.formTimerId.value = timer.id;
  UI.formTimerName.value = timer.name;
  UI.formTimerCategory.value = timer.category || 'TI & Server';
  UI.formTimerAutoStart.value = timer.isRunning ? 'running' : 'paused';
  UI.formTimerDesc.value = timer.desc || '';

  // Extract hours, minutes, seconds from totalSeconds (Waktu Ditentukan)
  const total = timer.totalSeconds || 3600;
  UI.formTimerHours.value = Math.floor(total / 3600);
  UI.formTimerMinutes.value = Math.floor((total % 3600) / 60);
  UI.formTimerSeconds.value = total % 60;

  UI.modalTimerForm.classList.remove('hidden');
};

function closeTimerModal() {
  UI.modalTimerForm.classList.add('hidden');
}

function handleSaveTimer(e) {
  e.preventDefault();
  if (!state.currentUser) return;

  const id = UI.formTimerId.value;
  const name = UI.formTimerName.value.trim();
  const category = UI.formTimerCategory.value;
  const autoStart = UI.formTimerAutoStart.value === 'running';
  const desc = UI.formTimerDesc.value.trim();

  const hrs = parseInt(UI.formTimerHours.value) || 0;
  const mins = parseInt(UI.formTimerMinutes.value) || 0;
  const secs = parseInt(UI.formTimerSeconds.value) || 0;
  const totalSeconds = (hrs * 3600) + (mins * 60) + secs;

  if (!name) {
    showToast('Form Belum Lengkap', 'Nama timer wajib diisi.', 'warning');
    return;
  }

  if (totalSeconds <= 0) {
    showToast('Durasi Tidak Valid', 'Jumlah waktu mundur minimal harus 1 detik.', 'warning');
    return;
  }

  const timers = state.getTimers();

  if (id) {
    // EDIT TIMER (Name & Time duration)
    const index = timers.findIndex(t => t.id === id);
    if (index !== -1) {
      const existing = timers[index];
      if (existing.userId !== state.currentUser.id && !state.isAdmin()) {
        showToast('Akses Ditolak', 'Anda hanya dapat mengubah timer milik Anda sendiri.', 'danger');
        return;
      }

      const oldTotal = existing.totalSeconds;
      existing.name = name;
      existing.category = category;
      existing.desc = desc;
      existing.totalSeconds = totalSeconds;

      // If preset time changed or was zero, reset remaining time to the new set time
      if (oldTotal !== totalSeconds || existing.remainingSeconds === 0) {
        existing.remainingSeconds = totalSeconds;
      } else if (existing.remainingSeconds > totalSeconds) {
        existing.remainingSeconds = totalSeconds;
      }

      existing.isRunning = autoStart;
      existing.lastTick = Date.now();

      state.saveTimers(timers);
      state.addLog('EDIT_TIMER', 'Ubah Timer', `${state.currentUser.fullName} memperbarui waktu ditentukan timer "${name}" menjadi ${formatSecondsToHMS(totalSeconds)}.`);
      showToast('Waktu Ditentukan Diperbarui', `Waktu ditentukan untuk <strong>${name}</strong> berhasil diatur ke <strong>${formatSecondsToHMS(totalSeconds)}</strong>.`, 'success');
    }
  } else {
    // ADD NEW TIMER (Associated with current user)
    const newTimer = {
      id: 'tmr_' + Date.now(),
      userId: state.currentUser.id,
      username: state.currentUser.username,
      userFullName: state.currentUser.fullName,
      userAvatar: state.currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      name,
      category,
      desc,
      totalSeconds,
      remainingSeconds: totalSeconds,
      isRunning: autoStart,
      lastTick: Date.now()
    };

    timers.push(newTimer);
    state.saveTimers(timers);
    state.addLog('CREATE_TIMER', 'Tambah Timer', `${state.currentUser.fullName} membuat timer baru: ${name} (${formatSecondsToHMS(totalSeconds)}).`);
    showToast('Timer Ditambahkan', `Timer <strong>${name}</strong> berhasil didaftarkan ke ruang kerja Anda.`, 'success');
  }

  closeTimerModal();
  renderTimerPage();
}

window.toggleTimerRunning = function(id) {
  if (!state.currentUser) return;
  const timers = state.getTimers();
  const timer = timers.find(t => t.id === id);
  if (!timer) return;

  if (timer.userId !== state.currentUser.id && !state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda hanya dapat mengontrol timer milik Anda sendiri.', 'warning');
    return;
  }

  // If timer was completed and user plays again, reset to totalSeconds first
  if (timer.remainingSeconds === 0) {
    timer.remainingSeconds = timer.totalSeconds;
    timer.isRunning = true;
  } else {
    timer.isRunning = !timer.isRunning;
  }

  timer.lastTick = Date.now();
  state.saveTimers(timers);
  renderTimerPage();
};

window.resetTimer = function(id) {
  if (!state.currentUser) return;
  const timers = state.getTimers();
  const timer = timers.find(t => t.id === id);
  if (!timer) return;

  if (timer.userId !== state.currentUser.id && !state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda hanya dapat mereset timer milik Anda sendiri.', 'warning');
    return;
  }

  timer.remainingSeconds = timer.totalSeconds;
  timer.isRunning = false;
  state.saveTimers(timers);
  showToast('Timer Direset', `Timer <strong>${timer.name}</strong> dikembalikan ke waktu awal (${formatSecondsToHMS(timer.totalSeconds)}).`, 'info');
  renderTimerPage();
};

window.promptDeleteTimer = function(id, name) {
  if (!state.currentUser) return;
  const timers = state.getTimers();
  const timer = timers.find(t => t.id === id);
  if (!timer) return;

  if (timer.userId !== state.currentUser.id && !state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda hanya dapat menghapus timer milik Anda sendiri.', 'warning');
    return;
  }

  state.pendingDelete = { type: 'timer', id, name };
  UI.confirmDeleteTitle.textContent = 'Hapus Timer?';
  UI.confirmDeleteMessage.innerHTML = `Timer waktu mundur <strong>${name}</strong> akan dihapus dari daftar timer Anda.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

// ------------------------------------------
// STOPWATCH MODAL & CRUD OPERATIONS
// ------------------------------------------

function openAddStopwatchModal() {
  if (!state.currentUser) return;
  UI.stopwatchForm.reset();
  UI.modalStopwatchForm.classList.remove('hidden');
}

function closeStopwatchModal() {
  UI.modalStopwatchForm.classList.add('hidden');
}

function handleSaveStopwatch(e) {
  e.preventDefault();
  if (!state.currentUser) return;

  const name = UI.formStopwatchName.value.trim();
  const dept = UI.formStopwatchDept.value.trim();
  const autoStart = UI.formStopwatchAutoStart.value === 'running';

  if (!name) {
    showToast('Form Belum Lengkap', 'Nama stopwatch wajib diisi.', 'warning');
    return;
  }

  const stopwatches = state.getStopwatches();
  const newSw = {
    id: 'sw_' + Date.now(),
    userId: state.currentUser.id,
    username: state.currentUser.username,
    userFullName: state.currentUser.fullName,
    userAvatar: state.currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    name,
    dept: dept || (state.currentUser.department ? state.currentUser.department.split('&')[0].trim() : 'Operasional'),
    elapsedSeconds: 0,
    isRunning: autoStart,
    lastTick: Date.now()
  };

  stopwatches.push(newSw);
  state.saveStopwatches(stopwatches);
  state.addLog('CREATE_STOPWATCH', 'Tambah Stopwatch', `${state.currentUser.fullName} membuat stopwatch baru: ${name}.`);
  showToast('Stopwatch Ditambahkan', `Stopwatch <strong>${name}</strong> berhasil dibuat.`, 'success');

  closeStopwatchModal();
  renderTimerPage();
}

window.toggleStopwatchRunning = function(id) {
  if (!state.currentUser) return;
  const stopwatches = state.getStopwatches();
  const sw = stopwatches.find(s => s.id === id);
  if (!sw) return;

  if (sw.userId !== state.currentUser.id && !state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda hanya dapat mengontrol stopwatch milik Anda sendiri.', 'warning');
    return;
  }

  sw.isRunning = !sw.isRunning;
  sw.lastTick = Date.now();
  state.saveStopwatches(stopwatches);
  renderTimerPage();
};

window.resetStopwatch = function(id) {
  if (!state.currentUser) return;
  const stopwatches = state.getStopwatches();
  const sw = stopwatches.find(s => s.id === id);
  if (!sw) return;

  if (sw.userId !== state.currentUser.id && !state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda hanya dapat mereset stopwatch milik Anda sendiri.', 'warning');
    return;
  }

  sw.elapsedSeconds = 0;
  sw.isRunning = false;
  state.saveStopwatches(stopwatches);
  showToast('Stopwatch Direset', `Stopwatch <strong>${sw.name}</strong> dikembalikan ke 00:00:00.`, 'info');
  renderTimerPage();
};

window.promptDeleteStopwatch = function(id, name) {
  if (!state.currentUser) return;
  const stopwatches = state.getStopwatches();
  const sw = stopwatches.find(s => s.id === id);
  if (!sw) return;

  if (sw.userId !== state.currentUser.id && !state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda hanya dapat menghapus stopwatch milik Anda sendiri.', 'warning');
    return;
  }

  state.pendingDelete = { type: 'stopwatch', id, name };
  UI.confirmDeleteTitle.textContent = 'Hapus Stopwatch?';
  UI.confirmDeleteMessage.innerHTML = `Stopwatch <strong>${name}</strong> akan dihapus dari daftar stopwatch Anda.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

// ------------------------------------------
// REAL-TIME TICKER (TIMERS, STOPWATCHES & ADMIN MONITOR)
// ------------------------------------------

function startTimerTicker() {
  setInterval(() => {
    let hasChanges = false;
    const timers = state.getTimers();
    const stopwatches = state.getStopwatches();

    // Tick timers
    timers.forEach(t => {
      if (t.isRunning && t.remainingSeconds > 0) {
        t.remainingSeconds -= 1;
        hasChanges = true;

        if (t.remainingSeconds === 0) {
          t.isRunning = false;
          if (state.currentUser && t.userId === state.currentUser.id) {
            showToast('Waktu Habis!', `Batas waktu timer <strong>${t.name}</strong> telah selesai (00:00:00).`, 'danger');
          }
        }

        // Live DOM update for personal timer card
        const dispEl = document.getElementById(`timerDisplay_${t.id}`);
        if (dispEl) {
          dispEl.textContent = formatSecondsToHMS(t.remainingSeconds);
          if (t.remainingSeconds === 0) dispEl.classList.add('text-danger-pulse');
        }

        const progEl = document.getElementById(`timerProgress_${t.id}`);
        if (progEl && t.totalSeconds > 0) {
          const p = Math.max(0, Math.min(100, Math.round((t.remainingSeconds / t.totalSeconds) * 100)));
          progEl.style.width = `${p}%`;
          const pText = document.getElementById(`timerPercent_${t.id}`);
          if (pText) pText.textContent = `${p}%`;
        }

        // Live DOM update for Admin Live Monitor row
        const monDisp = document.getElementById(`monitorRemaining_${t.id}`);
        if (monDisp) {
          monDisp.textContent = formatSecondsToHMS(t.remainingSeconds);
          if (t.remainingSeconds === 0) {
            monDisp.classList.remove('text-running');
          }
        }

        const monProg = document.getElementById(`monitorProgressFill_${t.id}`);
        if (monProg && t.totalSeconds > 0) {
          const p = Math.max(0, Math.min(100, Math.round((t.remainingSeconds / t.totalSeconds) * 100)));
          monProg.style.width = `${p}%`;
          const monPText = document.getElementById(`monitorPercentText_${t.id}`);
          if (monPText) monPText.textContent = `${p}%`;
        }
      }
    });

    // Tick stopwatches
    stopwatches.forEach(sw => {
      if (sw.isRunning) {
        sw.elapsedSeconds += 1;
        hasChanges = true;

        // Live DOM update for personal stopwatch card
        const dispEl = document.getElementById(`stopwatchDisplay_${sw.id}`);
        if (dispEl) {
          dispEl.textContent = formatSecondsToHMS(sw.elapsedSeconds);
        }

        // Live DOM update for Admin Live Monitor row
        const monDisp = document.getElementById(`monitorRemaining_${sw.id}`);
        if (monDisp) {
          monDisp.textContent = formatSecondsToHMS(sw.elapsedSeconds);
        }
      }
    });

    if (hasChanges) {
      state.saveTimers(timers);
      state.saveStopwatches(stopwatches);
    }
  }, 1000);
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
    if (UI.themeDropdownMenu) UI.themeDropdownMenu.classList.add('hidden');
  });

  UI.btnNotifications.addEventListener('click', (e) => {
    e.stopPropagation();
    UI.notificationDropdown.classList.toggle('hidden');
    UI.userDropdownMenu.classList.add('hidden');
    if (UI.themeDropdownMenu) UI.themeDropdownMenu.classList.add('hidden');
  });

  // Navbar Dark / Light Mode Toggle Button
  if (UI.btnThemeMode) {
    UI.btnThemeMode.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDisplayMode(true);
    });
  }

  // Dropdown Mode Switch Buttons
  if (UI.btnModeDark) {
    UI.btnModeDark.addEventListener('click', (e) => {
      e.stopPropagation();
      setDisplayMode('dark', true);
    });
  }

  if (UI.btnModeLight) {
    UI.btnModeLight.addEventListener('click', (e) => {
      e.stopPropagation();
      setDisplayMode('light', true);
    });
  }

  if (UI.btnThemeDropdown && UI.themeDropdownMenu) {
    UI.btnThemeDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      UI.themeDropdownMenu.classList.toggle('hidden');
      UI.userDropdownMenu.classList.add('hidden');
      UI.notificationDropdown.classList.add('hidden');
    });

    UI.themeDropdownMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  if (UI.btnThemeReset) {
    UI.btnThemeReset.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme('default', true);
    });
  }

  // Click outside to close dropdowns
  document.addEventListener('click', () => {
    UI.userDropdownMenu.classList.add('hidden');
    UI.notificationDropdown.classList.add('hidden');
    if (UI.themeDropdownMenu) UI.themeDropdownMenu.classList.add('hidden');
  });

  if (UI.btnBannerSwitchAdmin) {
    UI.btnBannerSwitchAdmin.addEventListener('click', () => {
      switchUserRole('admin');
    });
  }

  UI.dropdownItemProfile.addEventListener('click', () => {
    navigateToPage('settings');
  });

  // Change Password listeners
  if (UI.dropdownItemChangePassword) {
    UI.dropdownItemChangePassword.addEventListener('click', (e) => {
      e.stopPropagation();
      openChangePasswordModal();
    });
  }
  if (UI.btnCloseChangePasswordModal) {
    UI.btnCloseChangePasswordModal.addEventListener('click', closeChangePasswordModal);
  }
  if (UI.btnCancelChangePassword) {
    UI.btnCancelChangePassword.addEventListener('click', closeChangePasswordModal);
  }
  if (UI.formChangePassword) {
    UI.formChangePassword.addEventListener('submit', handlePasswordChangeSubmit);
  }
  if (UI.btnToggleCurrentPass) {
    UI.btnToggleCurrentPass.addEventListener('click', () => {
      const isPass = UI.changePassCurrent.type === 'password';
      UI.changePassCurrent.type = isPass ? 'text' : 'password';
      if (UI.toggleCurrentPassIcon) {
        UI.toggleCurrentPassIcon.className = isPass ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      }
    });
  }
  if (UI.btnToggleNewPass) {
    UI.btnToggleNewPass.addEventListener('click', () => {
      const isPass = UI.changePassNew.type === 'password';
      UI.changePassNew.type = isPass ? 'text' : 'password';
      if (UI.toggleNewPassIcon) {
        UI.toggleNewPassIcon.className = isPass ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      }
    });
  }
  if (UI.btnToggleConfirmPass) {
    UI.btnToggleConfirmPass.addEventListener('click', () => {
      const isPass = UI.changePassConfirm.type === 'password';
      UI.changePassConfirm.type = isPass ? 'text' : 'password';
      if (UI.toggleConfirmPassIcon) {
        UI.toggleConfirmPassIcon.className = isPass ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      }
    });
  }
  if (UI.modalChangePassword) {
    UI.modalChangePassword.addEventListener('click', (e) => {
      if (e.target === UI.modalChangePassword) {
        closeChangePasswordModal();
      }
    });
  }

  // Settings role switchers (if present)
  if (UI.btnSettingsSwitchAdmin) UI.btnSettingsSwitchAdmin.addEventListener('click', () => switchUserRole('admin'));
  if (UI.btnSettingsSwitchUser) UI.btnSettingsSwitchUser.addEventListener('click', () => switchUserRole('user'));

  // Reset sample data (if present)
  if (UI.btnResetAllData) {
    UI.btnResetAllData.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke setelan sampel awal?')) {
        state.resetAllData();
        showToast('Data Dipulihkan', 'Seluruh data barang dan akun telah dikembalikan ke sampel awal.', 'info');
        renderAppView();
      }
    });
  }

  // Modals event listeners
  UI.btnOpenAddDataModal.addEventListener('click', openAddItemModal);
  if (UI.btnOverviewQuickAdd) UI.btnOverviewQuickAdd.addEventListener('click', openAddItemModal);
  UI.btnCloseDataModal.addEventListener('click', closeDataModal);
  UI.btnCancelDataModal.addEventListener('click', closeDataModal);
  UI.dataItemForm.addEventListener('submit', handleSaveDataItem);

  UI.btnCloseViewDetail.addEventListener('click', closeViewDetailModal);
  UI.btnCloseViewDetailBtn.addEventListener('click', closeViewDetailModal);

  // Team Management & Profile Photo Listeners
  if (UI.btnOpenRegisterUserModal) UI.btnOpenRegisterUserModal.addEventListener('click', openRegisterUserModal);
  if (UI.btnCloseRegisterModal) UI.btnCloseRegisterModal.addEventListener('click', closeRegisterUserModal);
  if (UI.btnCancelRegisterModal) UI.btnCancelRegisterModal.addEventListener('click', closeRegisterUserModal);
  if (UI.registerUserForm) UI.registerUserForm.addEventListener('submit', handleRegisterUserSubmit);
  if (UI.regRole) UI.regRole.addEventListener('change', updateRoleExplanation);

  // Avatar Photo Handlers
  if (UI.btnChooseAvatarFile && UI.regAvatarFileInput) {
    UI.btnChooseAvatarFile.addEventListener('click', () => {
      UI.regAvatarFileInput.click();
    });
  }

  if (UI.regAvatarFileInput) {
    UI.regAvatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          showToast('Ukuran Berkas Terlalu Besar', 'Maksimal ukuran foto adalah 2MB.', 'warning');
          return;
        }
        const reader = new FileReader();
        reader.onload = function(evt) {
          const result = evt.target.result;
          if (UI.regAvatarPreview) UI.regAvatarPreview.src = result;
          if (UI.regAvatarData) UI.regAvatarData.value = result;
          if (UI.regAvatarUrl) UI.regAvatarUrl.value = '';
          showToast('Foto Berhasil Dipilih', 'Foto profil baru siap disimpan.', 'info');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (UI.regAvatarUrl) {
    UI.regAvatarUrl.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      if (url) {
        if (UI.regAvatarPreview) UI.regAvatarPreview.src = url;
        if (UI.regAvatarData) UI.regAvatarData.value = url;
      }
    });
  }

  if (UI.btnRandomAvatar) {
    UI.btnRandomAvatar.addEventListener('click', () => {
      const randomPic = RANDOM_AVATARS[Math.floor(Math.random() * RANDOM_AVATARS.length)];
      if (UI.regAvatarPreview) UI.regAvatarPreview.src = randomPic;
      if (UI.regAvatarData) UI.regAvatarData.value = randomPic;
      if (UI.regAvatarUrl) UI.regAvatarUrl.value = randomPic;
      showToast('Avatar Acak', 'Avatar profil acak berhasil dipasang.', 'info');
    });
  }

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
  if (UI.filterUserService) UI.filterUserService.addEventListener('change', renderUserManagementPage);
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

  // Timer & Stopwatch Modals and Forms
  if (UI.btnOpenAddTimerModal) {
    UI.btnOpenAddTimerModal.addEventListener('click', openAddTimerModal);
  }
  if (UI.btnCloseTimerModal) {
    UI.btnCloseTimerModal.addEventListener('click', closeTimerModal);
  }
  if (UI.btnCancelTimerModal) {
    UI.btnCancelTimerModal.addEventListener('click', closeTimerModal);
  }
  if (UI.timerForm) {
    UI.timerForm.addEventListener('submit', handleSaveTimer);
  }

  if (UI.btnOpenAddStopwatchModal) {
    UI.btnOpenAddStopwatchModal.addEventListener('click', openAddStopwatchModal);
  }
  if (UI.btnCloseStopwatchModal) {
    UI.btnCloseStopwatchModal.addEventListener('click', closeStopwatchModal);
  }
  if (UI.btnCancelStopwatchModal) {
    UI.btnCancelStopwatchModal.addEventListener('click', closeStopwatchModal);
  }
  if (UI.stopwatchForm) {
    UI.stopwatchForm.addEventListener('submit', handleSaveStopwatch);
  }

  // Admin Live Timer Monitor Search & Filters
  if (UI.searchMonitorInput) {
    UI.searchMonitorInput.addEventListener('input', () => {
      if (state.currentPage === 'timer') renderTimerPage();
    });
  }
  if (UI.filterMonitorUser) {
    UI.filterMonitorUser.addEventListener('change', () => {
      if (state.currentPage === 'timer') renderTimerPage();
    });
  }
  if (UI.filterMonitorStatus) {
    UI.filterMonitorStatus.addEventListener('change', () => {
      if (state.currentPage === 'timer') renderTimerPage();
    });
  }
}

// ==========================================
// 15. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  startClock();
  populateNotifications();
  startTimerTicker();
  initEvents();
  renderAppView();
});
