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
    category: 'CSO INBOUND',
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
    category: 'CSO DIGILIVE CHAT - WA',
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
    category: 'CSO BACK OFFICE',
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
    category: 'CSO DIGILIVE CHAT - MY ICON+',
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
    category: 'CSO OUTBOUND',
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
    dept: 'CSO INBOUND',
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
    dept: 'CSO BACK OFFICE',
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
    dept: 'CSO DIGILIVE CHAT - DM',
    elapsedSeconds: 874,
    isRunning: true,
    lastTick: Date.now()
  }
];

const DEFAULT_PA_LOGS = [
  {
    id: 'pa_1',
    userId: 'usr_user_1',
    username: 'user',
    userFullName: 'Siti Rahma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'CSO DIGILIVE CHAT - WA',
    date: '2026-09-28',
    shift: 'Shift Pagi (07:00 - 15:00)',
    activityCategory: 'READY / HANDLING CHAT',
    interactionCount: 38,
    targetCount: 40,
    durationMinutes: 240,
    notes: 'Penanganan chat interaksi pelanggan WhatsApp terkait informasi tagihan dan kendala jaringan Iconnet.',
    status: 'Terverifikasi',
    createdAt: '2026-09-28 11:30'
  },
  {
    id: 'pa_2',
    userId: 'usr_user_1',
    username: 'user',
    userFullName: 'Siti Rahma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'CSO DIGILIVE CHAT - WA',
    date: '2026-09-28',
    shift: 'Shift Pagi (07:00 - 15:00)',
    activityCategory: 'AUX 1: ISTIRAHAT / MAKAN',
    interactionCount: 0,
    targetCount: 0,
    durationMinutes: 60,
    notes: 'Istirahat makan siang dan ibadah shift 1.',
    status: 'Terverifikasi',
    createdAt: '2026-09-28 12:45'
  },
  {
    id: 'pa_3',
    userId: 'usr_user_1',
    username: 'user',
    userFullName: 'Siti Rahma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'CSO DIGILIVE CHAT - WA',
    date: '2026-09-28',
    shift: 'Shift Pagi (07:00 - 15:00)',
    activityCategory: 'AUX 5: FOLLOW UP TIKET',
    interactionCount: 14,
    targetCount: 15,
    durationMinutes: 90,
    notes: 'Follow up konfirmasi open tiket pelanggan eskalasi PLN Icon Plus.',
    status: 'Selesai',
    createdAt: '2026-09-28 14:20'
  },
  {
    id: 'pa_4',
    userId: 'usr_user_2',
    username: 'ahmad_fauzi',
    userFullName: 'Ahmad Fauzi',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'CSO BACK OFFICE',
    date: '2026-09-28',
    shift: 'Normal Office (08:00 - 17:00)',
    activityCategory: 'READY / VERIFIKASI DOKUMEN',
    interactionCount: 42,
    targetCount: 40,
    durationMinutes: 210,
    notes: 'Validasi berkas pendaftaran pelanggan baru dan sinkronisasi sistem billing.',
    status: 'Terverifikasi',
    createdAt: '2026-09-28 13:00'
  },
  {
    id: 'pa_5',
    userId: 'usr_admin_1',
    username: 'admin',
    userFullName: 'Budi Santoso, S.Kom',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'CSO INBOUND',
    date: '2026-09-28',
    shift: 'Shift Pagi (07:00 - 15:00)',
    activityCategory: 'AUX 4: BRIEFING & COACHING',
    interactionCount: 0,
    targetCount: 0,
    durationMinutes: 45,
    notes: 'Coaching peningkatan FCR (First Contact Resolution) dan evaluasi SLA mingguan.',
    status: 'Terverifikasi',
    createdAt: '2026-09-28 08:30'
  }
];

const DEFAULT_CA_LOGS = [
  // Siti Rahma (CSO DIGILIVE CHAT - WA)
  {
    id: 'ca_sr_1',
    date: '2026-09-28',
    userFullName: 'Siti Rahma',
    department: 'CSO DIGILIVE CHAT - WA',
    channel: 'Live Chat WA',
    score: 97.25,
    grade: 'Sangat Baik',
    focusParam: 'Greeting SOP, Identifikasi Kebutuhan, Validasi Akun',
    status: 'Terverifikasi',
    notes: 'Respon cepat, greeting ramah sesuai standar Iconnet, penyampaian solusi tagihan jelas.',
    createdAt: '2026-09-28 10:15'
  },
  {
    id: 'ca_sr_2',
    date: '2026-09-26',
    userFullName: 'Siti Rahma',
    department: 'CSO DIGILIVE CHAT - WA',
    channel: 'Live Chat WA',
    score: 95.50,
    grade: 'Sangat Baik',
    focusParam: 'Closing SOP, Konfirmasi Kepuasan Pelanggan',
    status: 'Terverifikasi',
    notes: 'Format closing SOP lengkap dengan penawaran bantuan tambahan dan salam penutup.',
    createdAt: '2026-09-26 09:30'
  },
  {
    id: 'ca_sr_3',
    date: '2026-09-23',
    userFullName: 'Siti Rahma',
    department: 'CSO DIGILIVE CHAT - WA',
    channel: 'Live Chat WA',
    score: 96.00,
    grade: 'Sangat Baik',
    focusParam: 'Akurasi Penjelasan Paket Promo Iconnet',
    status: 'Terverifikasi',
    notes: 'Penjelasan skema add-on channel TV dan kecepatan bandwidth sangat presisi.',
    createdAt: '2026-09-23 11:20'
  },
  {
    id: 'ca_sr_4',
    date: '2026-09-18',
    userFullName: 'Siti Rahma',
    department: 'CSO DIGILIVE CHAT - WA',
    channel: 'Live Chat WA',
    score: 92.40,
    grade: 'Baik',
    focusParam: 'Handling Objection & Respon Waktu Tunggu',
    status: 'Terverifikasi',
    notes: 'Penanganan keluhan pelanggan agak tegang, namun solusi teknis tersampaikan dengan baik.',
    createdAt: '2026-09-18 14:10'
  },
  {
    id: 'ca_sr_5',
    date: '2026-09-12',
    userFullName: 'Siti Rahma',
    department: 'CSO DIGILIVE CHAT - WA',
    channel: 'Live Chat WA',
    score: 98.15,
    grade: 'Sangat Baik',
    focusParam: 'FCR (First Contact Resolution) & Empati',
    status: 'Terverifikasi',
    notes: 'Penyelesaian kendala tanpa eskalasi tambahan, apresiasi positif dari pelanggan.',
    createdAt: '2026-09-12 15:45'
  },
  {
    id: 'ca_sr_6',
    date: '2026-09-05',
    userFullName: 'Siti Rahma',
    department: 'CSO DIGILIVE CHAT - WA',
    channel: 'Live Chat WA',
    score: 94.50,
    grade: 'Baik',
    focusParam: 'Verifikasi Identitas & Kode OTP',
    status: 'Terverifikasi',
    notes: 'Protokol verifikasi akun pelanggan dipatuhi secara tepat sesuai standar keamanan.',
    createdAt: '2026-09-05 10:00'
  },

  // Ahmad Fauzi (CSO BACK OFFICE)
  {
    id: 'ca_af_1',
    date: '2026-09-28',
    userFullName: 'Ahmad Fauzi',
    department: 'CSO BACK OFFICE',
    channel: 'Back Office',
    score: 94.00,
    grade: 'Baik',
    focusParam: 'Akurasi Verifikasi Dokumen & SLA Closing',
    status: 'Terverifikasi',
    notes: 'Verifikasi berkas pendaftaran pelanggan baru akurat. Update status tiket tepat waktu.',
    createdAt: '2026-09-28 11:30'
  },
  {
    id: 'ca_af_2',
    date: '2026-09-25',
    userFullName: 'Ahmad Fauzi',
    department: 'CSO BACK OFFICE',
    channel: 'Back Office',
    score: 96.50,
    grade: 'Sangat Baik',
    focusParam: 'Kelengkapan Lampiran Formulir Pasang Baru',
    status: 'Terverifikasi',
    notes: 'Checklist berkas KTP dan koordinat lokasi pelanggan diinput tanpa kesalahan.',
    createdAt: '2026-09-25 13:40'
  },
  {
    id: 'ca_af_3',
    date: '2026-09-21',
    userFullName: 'Ahmad Fauzi',
    department: 'CSO BACK OFFICE',
    channel: 'Back Office',
    score: 91.25,
    grade: 'Baik',
    focusParam: 'Kecepatan Rekonsiliasi Billing Bank',
    status: 'Terverifikasi',
    notes: 'Terdapat jeda saat konfirmasi slip transfer, namun hasil rekonsiliasi akurat.',
    createdAt: '2026-09-21 16:15'
  },
  {
    id: 'ca_af_4',
    date: '2026-09-15',
    userFullName: 'Ahmad Fauzi',
    department: 'CSO BACK OFFICE',
    channel: 'Back Office',
    score: 95.00,
    grade: 'Sangat Baik',
    focusParam: 'Validasi Data Teknis Modem ONT',
    status: 'Terverifikasi',
    notes: 'Pencocokan serial number router ONT dengan sistem inventaris berjalan lancar.',
    createdAt: '2026-09-15 09:50'
  },
  {
    id: 'ca_af_5',
    date: '2026-09-08',
    userFullName: 'Ahmad Fauzi',
    department: 'CSO BACK OFFICE',
    channel: 'Back Office',
    score: 93.75,
    grade: 'Baik',
    focusParam: 'Kesesuaian Format Notulen Tindak Lanjut',
    status: 'Terverifikasi',
    notes: 'Pencatatan resume tiket eskalasi rapi dan mudah dipahami oleh tim dispatch lapangan.',
    createdAt: '2026-09-08 14:00'
  },

  // Budi Santoso, S.Kom (CSO INBOUND)
  {
    id: 'ca_bs_1',
    date: '2026-09-27',
    userFullName: 'Budi Santoso, S.Kom',
    department: 'CSO INBOUND',
    channel: 'Inbound Call',
    score: 98.50,
    grade: 'Sangat Baik',
    focusParam: 'Active Listening, Empathy, Solusi Teknis',
    status: 'Terverifikasi',
    notes: 'Penanganan komplain internet putus ditangani dengan tenang, empati tinggi, panduan modem akurat.',
    createdAt: '2026-09-27 14:20'
  },
  {
    id: 'ca_bs_2',
    date: '2026-09-22',
    userFullName: 'Budi Santoso, S.Kom',
    department: 'CSO INBOUND',
    channel: 'Inbound Call',
    score: 97.00,
    grade: 'Sangat Baik',
    focusParam: 'Artikulasi Nada Bicara & Solusi FCR',
    status: 'Terverifikasi',
    notes: 'Intonasi sopan, penanganan kendala lambat koneksi tuntas dalam 4 menit.',
    createdAt: '2026-09-22 10:30'
  },
  {
    id: 'ca_bs_3',
    date: '2026-09-16',
    userFullName: 'Budi Santoso, S.Kom',
    department: 'CSO INBOUND',
    channel: 'Inbound Call',
    score: 99.00,
    grade: 'Sangat Baik',
    focusParam: 'Handling Pelanggan Prioritas / Korporat',
    status: 'Terverifikasi',
    notes: 'Sangat menguasai topologi jaringan korporat dan SLA eskalasi teknis tingkat tinggi.',
    createdAt: '2026-09-16 11:15'
  },
  {
    id: 'ca_bs_4',
    date: '2026-09-09',
    userFullName: 'Budi Santoso, S.Kom',
    department: 'CSO INBOUND',
    channel: 'Inbound Call',
    score: 96.25,
    grade: 'Sangat Baik',
    focusParam: 'Standar Greeting Pembuka & Penutup',
    status: 'Terverifikasi',
    notes: 'Penyampaian salam baku PLN Icon Plus konsisten dan ramah.',
    createdAt: '2026-09-09 08:45'
  },
  {
    id: 'ca_bs_5',
    date: '2026-09-02',
    userFullName: 'Budi Santoso, S.Kom',
    department: 'CSO INBOUND',
    channel: 'Inbound Call',
    score: 98.00,
    grade: 'Sangat Baik',
    focusParam: 'Eskalasi Gangguan Massal OSP',
    status: 'Terverifikasi',
    notes: 'Tiket dispatch darurat terkirim ke tim lapangan dalam kurun waktu 8 menit.',
    createdAt: '2026-09-02 16:00'
  },

  // Dewi Lestari, M.T. (TEAM LEADER)
  {
    id: 'ca_dl_1',
    date: '2026-09-27',
    userFullName: 'Dewi Lestari, M.T.',
    department: 'TEAM LEADER',
    channel: 'Direct Message IG',
    score: 96.75,
    grade: 'Sangat Baik',
    focusParam: 'Ketepatan Eskalasi & Etika Komunikasi',
    status: 'Terverifikasi',
    notes: 'Respon tanggap pada DM Instagram, eskalasi ke dispatch teknisi lapangan berjalan mulus.',
    createdAt: '2026-09-27 16:45'
  },
  {
    id: 'ca_dl_2',
    date: '2026-09-20',
    userFullName: 'Dewi Lestari, M.T.',
    department: 'TEAM LEADER',
    channel: 'My Icon+ App',
    score: 97.50,
    grade: 'Sangat Baik',
    focusParam: 'Supervisi Penanganan Kendala Kritis',
    status: 'Terverifikasi',
    notes: 'Bantuan asistensi tiket eskalasi tier-2 berjalan efektif.',
    createdAt: '2026-09-20 13:10'
  },
  {
    id: 'ca_dl_3',
    date: '2026-09-14',
    userFullName: 'Dewi Lestari, M.T.',
    department: 'TEAM LEADER',
    channel: 'Email Support',
    score: 95.25,
    grade: 'Sangat Baik',
    focusParam: 'Format Formal Tanggapan Surat Pelanggan',
    status: 'Terverifikasi',
    notes: 'Surat balasan resmi komplain tagihan disusun dengan bahasa profesional dan persuasif.',
    createdAt: '2026-09-14 15:20'
  },
  {
    id: 'ca_dl_4',
    date: '2026-09-04',
    userFullName: 'Dewi Lestari, M.T.',
    department: 'TEAM LEADER',
    channel: 'Direct Message IG',
    score: 96.00,
    grade: 'Sangat Baik',
    focusParam: 'Sosialisasi Promo Upgrade & FCR',
    status: 'Terverifikasi',
    notes: 'Interaksi di media sosial berhasil mengubah komplain menjadi apresiasi kepuasan pelanggan.',
    createdAt: '2026-09-04 11:30'
  }
];

const MONTHLY_TICKET_TARGET = 1320;

function generateDefaultTiketLogs() {
  const septWorkdays = [
    '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04',
    '2026-09-07', '2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11',
    '2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18',
    '2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25',
    '2026-09-28', '2026-09-29', '2026-09-30'
  ];

  const augWorkdays = [
    '2026-08-03', '2026-08-04', '2026-08-05', '2026-08-06', '2026-08-07',
    '2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14',
    '2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21',
    '2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28',
    '2026-08-31'
  ];

  const categories = [
    'Gangguan Koneksi Internet',
    'Penurunan Bandwidth / Lambat',
    'Permohonan Upgrade Paket',
    'Kendala Tagihan / Billing',
    'Aktivasi Pelanggan Baru',
    'Gangguan Router / Perangkat',
    'Eskalasi Insiden Kritis'
  ];

  // September distribution per user (Target bulanan: 1.320 tiket):
  // Siti Rahma (WA) -> target 1320, realisasi 1345 (+25 tiket, capaian 101.9%)
  // Budi Santoso (INBOUND) -> target 1320, realisasi 1328 (+8 tiket, capaian 100.6%)
  // Dewi Lestari (TEAM LEADER) -> target 1320, realisasi 1310 (-10 tiket, capaian 99.2%)
  // Ahmad Fauzi (BACK OFFICE) -> target 1320, realisasi 1265 (-55 tiket, capaian 95.8%)
  const sitiSept = [64, 60, 59, 64, 65, 57, 59, 63, 62, 60, 57, 65, 64, 58, 60, 62, 63, 59, 59, 63, 64, 58];
  const budiSept = [61, 60, 62, 59, 62, 57, 61, 60, 63, 58, 61, 60, 62, 60, 59, 62, 61, 59, 62, 60, 62, 57];
  const dewiSept = [58, 61, 59, 61, 57, 61, 58, 61, 59, 61, 58, 61, 58, 61, 59, 61, 57, 61, 58, 61, 59, 60];
  const ahmadSept = [59, 56, 58, 55, 59, 56, 60, 55, 58, 56, 58, 57, 59, 56, 58, 55, 59, 56, 60, 55, 58, 62];

  const usersConfig = [
    {
      name: 'Siti Rahma',
      dept: 'CSO DIGILIVE CHAT - WA',
      prefix: 'sr',
      septCounts: sitiSept,
      slaBase: 97.6,
      noteBase: 'Penanganan perolehan tiket live chat WA tuntas sesuai SLA.'
    },
    {
      name: 'Budi Santoso, S.Kom',
      dept: 'CSO INBOUND',
      prefix: 'bs',
      septCounts: budiSept,
      slaBase: 97.2,
      noteBase: 'Pelayanan tiket komplain suara inbound & eskalasi teknis tertangani sigap.'
    },
    {
      name: 'Dewi Lestari, M.T.',
      dept: 'TEAM LEADER',
      prefix: 'dl',
      septCounts: dewiSept,
      slaBase: 98.1,
      noteBase: 'Monitoring eskalasi kendala kritis & penyelesaian tiket tier-2 lancar.'
    },
    {
      name: 'Ahmad Fauzi',
      dept: 'CSO BACK OFFICE',
      prefix: 'af',
      septCounts: ahmadSept,
      slaBase: 95.8,
      noteBase: 'Proses tiket verifikasi upgrade paket & rekonsiliasi data pelanggan selesai.'
    }
  ];

  const list = [];

  // Generate September 2026 logs (22 hari input)
  septWorkdays.forEach((dateStr, dayIdx) => {
    usersConfig.forEach((cfg, uIdx) => {
      const count = cfg.septCounts[dayIdx];
      const solved = count;
      const sla = parseFloat((cfg.slaBase + ((dayIdx * 3 + uIdx * 7) % 20) / 10 - 0.8).toFixed(1));
      const cat = categories[(dayIdx + uIdx * 2) % categories.length];

      list.push({
        id: `tkt_${cfg.prefix}_202609_${String(dayIdx + 1).padStart(2, '0')}`,
        date: dateStr,
        userFullName: cfg.name,
        department: cfg.dept,
        category: cat,
        ticketCount: count,
        solvedTickets: solved,
        slaRate: sla,
        notes: `${cfg.noteBase} Memperoleh ${count} tiket harian (Kepatuhan SLA ${sla}%).`,
        createdAt: `${dateStr} 17:00`
      });
    });
  });

  // Generate August 2026 logs (20 hari input historis)
  augWorkdays.forEach((dateStr, dayIdx) => {
    usersConfig.forEach((cfg, uIdx) => {
      const count = 62 + ((dayIdx * 3 + uIdx * 5) % 9) - 3;
      const solved = count;
      const sla = parseFloat((96.2 + ((dayIdx + uIdx) % 30) / 10).toFixed(1));
      const cat = categories[(dayIdx + uIdx) % categories.length];

      list.push({
        id: `tkt_${cfg.prefix}_202608_${String(dayIdx + 1).padStart(2, '0')}`,
        date: dateStr,
        userFullName: cfg.name,
        department: cfg.dept,
        category: cat,
        ticketCount: count,
        solvedTickets: solved,
        slaRate: sla,
        notes: `Riwayat perolehan tiket harian bulan Agustus. Realisasi ${count} tiket.`,
        createdAt: `${dateStr} 17:00`
      });
    });
  });

  return list;
}

const DEFAULT_TIKETS = generateDefaultTiketLogs();

function generateDefaultAhtLogs() {
  const septWorkdays = [
    '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04',
    '2026-09-07', '2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11',
    '2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18',
    '2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25',
    '2026-09-28', '2026-09-29', '2026-09-30'
  ];

  const augWorkdays = [
    '2026-08-03', '2026-08-04', '2026-08-05', '2026-08-06', '2026-08-07',
    '2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14',
    '2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21',
    '2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28',
    '2026-08-31'
  ];

  // Daily AHT profiles for each user (SLA Target: 300 seconds / 05:00 minutes)
  const sitiSeptSecs = [195, 210, 185, 200, 190, 215, 205, 195, 220, 180, 205, 195, 210, 190, 200, 215, 190, 205, 195, 210, 185, 200];
  const sitiCounts =   [ 58,  62,  55,  60,  64,  52,  58,  61,  60,  57,  54,  63,  62,  55,  58,  60,  61,  56,  57,  61,  63,  56];

  const budiSeptSecs = [245, 255, 235, 260, 250, 240, 265, 250, 275, 245, 250, 260, 245, 255, 270, 315, 240, 250, 265, 255, 245, 250];
  const budiCounts =   [ 42,  45,  40,  44,  46,  38,  43,  45,  44,  41,  39,  46,  45,  40,  42,  44,  45,  41,  42,  45,  46,  41];

  const dewiSeptSecs = [180, 195, 175, 190, 185, 205, 190, 185, 200, 175, 190, 185, 195, 180, 190, 205, 180, 195, 185, 195, 175, 190];
  const dewiCounts =   [ 28,  30,  26,  29,  31,  25,  28,  30,  29,  27,  26,  31,  30,  26,  28,  30,  31,  27,  28,  30,  31,  27];

  const ahmadSeptSecs = [275, 285, 265, 290, 280, 320, 270, 285, 330, 275, 280, 290, 275, 285, 295, 280, 270, 285, 290, 280, 275, 280];
  const ahmadCounts =   [ 36,  38,  34,  37,  39,  32,  36,  38,  37,  35,  33,  39,  38,  34,  36,  38,  39,  35,  36,  38,  39,  35];

  const usersConfig = [
    {
      name: 'Siti Rahma',
      dept: 'CSO DIGILIVE CHAT - WA',
      prefix: 'sr',
      septSecs: sitiSeptSecs,
      septCounts: sitiCounts,
      noteBase: 'Pelayanan live chat interaktif WA cepat, tanggap, dan efisien.'
    },
    {
      name: 'Budi Santoso, S.Kom',
      dept: 'CSO INBOUND',
      prefix: 'bs',
      septSecs: budiSeptSecs,
      septCounts: budiCounts,
      noteBase: 'Penerimaan panggilan komplain dan eskalasi telepon inbound terkendali.'
    },
    {
      name: 'Dewi Lestari, M.T.',
      dept: 'TEAM LEADER',
      prefix: 'dl',
      septSecs: dewiSeptSecs,
      septCounts: dewiCounts,
      noteBase: 'Supervisi penanganan kendala tier-2 dan mediasi pelanggan VIP berjalan lancar.'
    },
    {
      name: 'Ahmad Fauzi',
      dept: 'CSO BACK OFFICE',
      prefix: 'af',
      septSecs: ahmadSeptSecs,
      septCounts: ahmadCounts,
      noteBase: 'Validasi berkas administrasi dan investigasi keluhan teknis selesai.'
    }
  ];

  const list = [];

  // Generate September 2026 daily logs (22 hari input)
  septWorkdays.forEach((dateStr, dayIdx) => {
    usersConfig.forEach((cfg) => {
      const actualSec = cfg.septSecs[dayIdx];
      const count = cfg.septCounts[dayIdx];
      const targetSec = 300;
      const totalDurSec = count * actualSec;
      const devSec = actualSec - targetSec;
      const isSla = actualSec <= targetSec;
      const devText = isSla ? `-${Math.abs(devSec)} dtk (Cepat)` : `+${devSec} dtk (Over SLA)`;

      list.push({
        id: `aht_${cfg.prefix}_202609_${String(dayIdx + 1).padStart(2, '0')}`,
        date: dateStr,
        userFullName: cfg.name,
        department: cfg.dept,
        interactionCount: count,
        totalDurationSeconds: totalDurSec,
        actualSeconds: actualSec,
        targetSeconds: targetSec,
        deviationSeconds: devSec,
        deviationText: devText,
        status: isSla ? 'Sesuai SLA' : 'Over SLA',
        notes: isSla 
          ? `${cfg.noteBase} Rata-rata durasi ${Math.floor(actualSec/60)}m ${actualSec%60}s per interaksi.`
          : `${cfg.noteBase} Melebihi SLA karena investigasi kendala kompleks pelanggan.`,
        createdAt: `${dateStr} 17:30`
      });
    });
  });

  // Generate August 2026 daily logs (20 hari input historis)
  augWorkdays.forEach((dateStr, dayIdx) => {
    usersConfig.forEach((cfg, uIdx) => {
      const baseSec = cfg.septSecs[dayIdx % cfg.septSecs.length];
      const actualSec = Math.max(160, baseSec + ((dayIdx * 7 + uIdx * 11) % 31) - 15);
      const count = Math.max(20, cfg.septCounts[dayIdx % cfg.septCounts.length] + ((dayIdx + uIdx) % 7) - 3);
      const targetSec = 300;
      const totalDurSec = count * actualSec;
      const devSec = actualSec - targetSec;
      const isSla = actualSec <= targetSec;
      const devText = isSla ? `-${Math.abs(devSec)} dtk (Cepat)` : `+${devSec} dtk (Over SLA)`;

      list.push({
        id: `aht_${cfg.prefix}_202608_${String(dayIdx + 1).padStart(2, '0')}`,
        date: dateStr,
        userFullName: cfg.name,
        department: cfg.dept,
        interactionCount: count,
        totalDurationSeconds: totalDurSec,
        actualSeconds: actualSec,
        targetSeconds: targetSec,
        deviationSeconds: devSec,
        deviationText: devText,
        status: isSla ? 'Sesuai SLA' : 'Over SLA',
        notes: `Riwayat pencatatan handling time bulan Agustus. Durasi rata-rata ${Math.floor(actualSec/60)}m ${actualSec%60}s.`,
        createdAt: `${dateStr} 17:30`
      });
    });
  });

  return list;
}

const DEFAULT_AHT_LOGS = generateDefaultAhtLogs();

function generateDefaultArtLogs() {
  const septWorkdays = [
    '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04',
    '2026-09-07', '2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11',
    '2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18',
    '2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25',
    '2026-09-28', '2026-09-29', '2026-09-30'
  ];

  const augWorkdays = [
    '2026-08-03', '2026-08-04', '2026-08-05', '2026-08-06', '2026-08-07',
    '2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14',
    '2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21',
    '2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28',
    '2026-08-31'
  ];

  // Daily ART profiles for each user (SLA Target: < 30 seconds)
  // Siti Rahma (WA) - Fast & responsive (12-16s)
  const sitiSeptArt =   [12.4, 13.8, 11.5, 14.2, 12.0, 15.1, 13.5, 12.2, 14.8, 11.9, 13.0, 12.5, 14.0, 12.8, 13.2, 15.0, 12.4, 13.6, 12.9, 14.1, 11.8, 13.4];
  const sitiSeptFrt =   [ 6.2,  7.0,  5.8,  7.5,  6.0,  8.2,  7.1,  6.4,  7.8,  6.1,  6.8,  6.5,  7.2,  6.7,  7.0,  8.0,  6.3,  7.1,  6.6,  7.4,  5.9,  6.9];
  const sitiSeptQueue = [ 3.8,  4.5,  3.2,  4.8,  4.0,  5.5,  4.2,  3.9,  5.1,  3.6,  4.3,  4.1,  4.6,  4.2,  4.4,  5.2,  3.9,  4.5,  4.1,  4.7,  3.5,  4.2];
  const sitiCounts =    [  58,   62,   55,   60,   64,   52,   58,   61,   60,   57,   54,   63,   62,   55,   58,   60,   61,   56,   57,   61,   63,   56];

  // Budi Santoso (INBOUND / EMAIL) - Inbound telephone & email (18-26s, peak 33.2s)
  const budiSeptArt =   [21.5, 23.0, 19.8, 24.2, 22.0, 25.5, 23.8, 21.2, 26.0, 20.5, 22.4, 24.0, 21.8, 23.5, 26.2, 33.5, 20.8, 22.0, 24.5, 23.2, 21.6, 22.8];
  const budiSeptFrt =   [11.2, 12.5, 10.4, 13.0, 11.8, 14.2, 12.6, 11.0, 14.5, 10.8, 12.0, 13.1, 11.5, 12.7, 14.6, 18.2, 10.9, 11.8, 13.4, 12.5, 11.3, 12.2];
  const budiSeptQueue = [ 8.5,  9.8,  7.9, 10.2,  9.1, 11.5,  9.8,  8.4, 11.8,  8.2,  9.4, 10.5,  8.9, 10.0, 11.7, 15.0,  8.3,  9.2, 10.6,  9.7,  8.8,  9.5];
  const budiCounts =    [  42,   45,   40,   44,   46,   38,   43,   45,   44,   41,   39,   46,   45,   40,   42,   44,   45,   41,   42,   45,   46,   41];

  // Dewi Lestari (TEAM LEADER / DM) - Highest speed (9-14s)
  const dewiSeptArt =   [10.2, 11.5,  9.8, 11.0, 10.5, 12.2, 11.0, 10.4, 11.8,  9.9, 10.8, 10.5, 11.2, 10.3, 10.9, 12.4, 10.1, 11.2, 10.6, 11.3,  9.7, 10.8];
  const dewiSeptFrt =   [ 5.1,  6.0,  4.9,  5.8,  5.3,  6.5,  5.7,  5.2,  6.2,  5.0,  5.6,  5.4,  5.9,  5.3,  5.7,  6.6,  5.1,  5.8,  5.5,  5.9,  4.8,  5.6];
  const dewiSeptQueue = [ 3.2,  4.0,  3.0,  3.9,  3.5,  4.5,  3.8,  3.3,  4.2,  3.1,  3.7,  3.5,  4.0,  3.4,  3.8,  4.6,  3.3,  3.9,  3.6,  4.0,  3.0,  3.7];
  const dewiCounts =    [  28,   30,   26,   29,   31,   25,   28,   30,   29,   27,   26,   31,   30,   26,   28,   30,   31,   27,   28,   30,   31,   27];

  // Ahmad Fauzi (BACK OFFICE / MY ICON+) - Investigation & ticketing (19-27s, peak 32.8s)
  const ahmadSeptArt =   [22.8, 24.5, 21.0, 25.0, 23.5, 27.2, 23.0, 24.2, 28.5, 22.0, 23.8, 25.2, 22.9, 24.1, 26.5, 32.8, 21.9, 23.6, 25.0, 24.0, 22.5, 23.9];
  const ahmadSeptFrt =   [12.5, 13.8, 11.6, 14.5, 13.0, 15.6, 12.9, 13.7, 16.2, 12.1, 13.2, 14.3, 12.7, 13.5, 15.1, 19.5, 12.0, 13.1, 14.2, 13.6, 12.4, 13.3];
  const ahmadSeptQueue = [ 9.8, 11.0,  8.9, 11.5, 10.2, 12.8, 10.1, 10.9, 13.5,  9.5, 10.4, 11.2,  9.9, 10.7, 12.1, 16.0,  9.4, 10.3, 11.4, 10.8,  9.7, 10.5];
  const ahmadCounts =    [  36,   38,   34,   37,   39,   32,   36,   38,   37,   35,   33,   39,   38,   34,   36,   38,   39,   35,   36,   38,   39,   35];

  const usersConfig = [
    {
      name: 'Siti Rahma',
      dept: 'CSO DIGILIVE CHAT - WA',
      prefix: 'sr',
      septArt: sitiSeptArt,
      septFrt: sitiSeptFrt,
      septQueue: sitiSeptQueue,
      septCounts: sitiCounts,
      noteBase: 'Respon live chat interaktif WhatsApp prima dan cepat di bawah 15 detik.'
    },
    {
      name: 'Budi Santoso, S.Kom',
      dept: 'CSO INBOUND',
      prefix: 'bs',
      septArt: budiSeptArt,
      septFrt: budiSeptFrt,
      septQueue: budiSeptQueue,
      septCounts: budiCounts,
      noteBase: 'Penanganan antrian panggilan telepon dan klarifikasi tiket inbound pelanggan.'
    },
    {
      name: 'Dewi Lestari, M.T.',
      dept: 'TEAM LEADER',
      prefix: 'dl',
      septArt: dewiSeptArt,
      septFrt: dewiSeptFrt,
      septQueue: dewiSeptQueue,
      septCounts: dewiCounts,
      noteBase: 'Kecepatan respon live chat DM & eskalasi keluhan pelanggan sangat responsif.'
    },
    {
      name: 'Ahmad Fauzi',
      dept: 'CSO BACK OFFICE',
      prefix: 'af',
      septArt: ahmadSeptArt,
      septFrt: ahmadSeptFrt,
      septQueue: ahmadSeptQueue,
      septCounts: ahmadCounts,
      noteBase: 'Respon chat My Icon+ dan koordinasi investigasi teknis operasional back office.'
    }
  ];

  const list = [];

  // Generate September 2026 daily logs (22 hari input)
  septWorkdays.forEach((dateStr, dayIdx) => {
    usersConfig.forEach((cfg) => {
      const artSec = cfg.septArt[dayIdx];
      const frtSec = cfg.septFrt[dayIdx];
      const queueSec = cfg.septQueue[dayIdx];
      const count = cfg.septCounts[dayIdx];
      const targetSec = 30;
      const devSec = parseFloat((artSec - targetSec).toFixed(1));
      const isSla = artSec <= targetSec;
      const devText = isSla ? `-${Math.abs(devSec).toFixed(1)} dtk (Cepat)` : `+${devSec.toFixed(1)} dtk (Over SLA)`;

      list.push({
        id: `art_${cfg.prefix}_202609_${String(dayIdx + 1).padStart(2, '0')}`,
        date: dateStr,
        userFullName: cfg.name,
        department: cfg.dept,
        interactionCount: count,
        queueSeconds: queueSec,
        frtSeconds: frtSec,
        avgResponseSeconds: artSec,
        targetSeconds: targetSec,
        deviationSeconds: devSec,
        deviationText: devText,
        status: isSla ? 'Sesuai SLA' : 'Over SLA',
        notes: isSla
          ? `${cfg.noteBase} Rata-rata respon ${artSec} detik per interaksi.`
          : `${cfg.noteBase} Lonjakan antrian menyebabkan response time melewati batas 30 detik.`,
        createdAt: `${dateStr} 17:30`
      });
    });
  });

  // Generate August 2026 daily logs (20 hari input historis)
  augWorkdays.forEach((dateStr, dayIdx) => {
    usersConfig.forEach((cfg, uIdx) => {
      const baseArt = cfg.septArt[dayIdx % cfg.septArt.length];
      const artSec = parseFloat(Math.max(8.0, baseArt + (((dayIdx * 3 + uIdx * 5) % 11) * 0.4) - 2.0).toFixed(1));
      const frtSec = parseFloat(Math.max(4.0, (artSec * 0.55)).toFixed(1));
      const queueSec = parseFloat(Math.max(2.5, (artSec * 0.35)).toFixed(1));
      const count = Math.max(20, cfg.septCounts[dayIdx % cfg.septCounts.length] + ((dayIdx + uIdx) % 7) - 3);
      const targetSec = 30;
      const devSec = parseFloat((artSec - targetSec).toFixed(1));
      const isSla = artSec <= targetSec;
      const devText = isSla ? `-${Math.abs(devSec).toFixed(1)} dtk (Cepat)` : `+${devSec.toFixed(1)} dtk (Over SLA)`;

      list.push({
        id: `art_${cfg.prefix}_202608_${String(dayIdx + 1).padStart(2, '0')}`,
        date: dateStr,
        userFullName: cfg.name,
        department: cfg.dept,
        interactionCount: count,
        queueSeconds: queueSec,
        frtSeconds: frtSec,
        avgResponseSeconds: artSec,
        targetSeconds: targetSec,
        deviationSeconds: devSec,
        deviationText: devText,
        status: isSla ? 'Sesuai SLA' : 'Over SLA',
        notes: `Riwayat pencatatan response time bulan Agustus. ART: ${artSec}s, FRT: ${frtSec}s.`,
        createdAt: `${dateStr} 17:30`
      });
    });
  });

  return list;
}

const DEFAULT_ART_LOGS = generateDefaultArtLogs();

const DEFAULT_FINDINGS = [
  {
    id: 'FND-2026-001',
    date: '2026-09-27',
    userFullName: 'Ahmad Fauzi',
    department: 'CSO BACK OFFICE',
    findingType: 'Feedback Negatif',
    category: 'Informasi',
    deviationLevel: 'Reminder 1',
    desc: 'Kelalaian penulisan format nomor serial router ONT pada kolom catatan tiket eskalasi.',
    commitment: 'Memeriksa ulang format nomor serial ONT dan memastikan kelengkapan data sebelum submit tiket.',
    actionPlan: 'Briefing format baku pengisian formulir tiket dan penegasan checklist data teknis.',
    status: 'Closed'
  },
  {
    id: 'FND-2026-002',
    date: '2026-09-28',
    userFullName: 'Siti Rahma',
    department: 'CSO DIGILIVE CHAT - WA',
    findingType: 'Feedback Negatif',
    category: 'Keluhan',
    deviationLevel: 'Reminder 2',
    desc: 'Lupa menyertakan kalimat penawaran informasi survei kepuasan pelanggan pada pesan closing.',
    commitment: 'Menggunakan template closing makro lengkap beserta penawaran survei kepuasan pelanggan.',
    actionPlan: 'Pengingat makro template respon cepat pada sistem live chat agar penutup otomatis terpasang.',
    status: 'Dalam Coaching'
  },
  {
    id: 'FND-2026-003',
    date: '2026-09-26',
    userFullName: 'Budi Santoso, S.Kom',
    department: 'CSO INBOUND',
    findingType: 'Feedback Negatif',
    category: 'Gangguan',
    deviationLevel: 'Korektif 1',
    desc: 'Tiket gangguan massal fiber optik terlambat dieskalasi ke grup dispatcher selama 35 menit melewati batas SLA 15 menit.',
    commitment: 'Segera melakukan eskalasi darurat maksimal 10 menit setelah verifikasi awal insiden massal.',
    actionPlan: 'Coaching 1-on-1 mengenai alur darurat gangguan massal (critical incident) dan aktivasi alarm reminder tiket.',
    status: 'Open'
  },
  {
    id: 'FND-2026-004',
    date: '2026-09-25',
    userFullName: 'Dewi Lestari, M.T.',
    department: 'TEAM LEADER',
    findingType: 'Feedback Positif',
    category: 'Informasi',
    deviationLevel: 'Reminder 1',
    desc: 'Validasi data identitas penelepon sangat teliti dan penanganan keluhan pelanggan berjalan sangat solutif sesuai PDP.',
    commitment: 'Mempertahankan standar verifikasi tinggi dan membagikan praktik terbaik kepada seluruh tim.',
    actionPlan: 'Diberikan apresiasi bulanan dan dijadikan contoh role model.',
    status: 'Closed'
  },
  {
    id: 'FND-2026-005',
    date: '2026-10-01',
    userFullName: 'Rian Pratama',
    department: 'CSO DIGILIVE CHAT - DM',
    findingType: 'Feedback Negatif',
    category: 'Keluhan',
    deviationLevel: 'Reminder 1',
    desc: 'Informasi tarif paket upgrade yang diberikan kurang detail pada biaya sewa modem ONT.',
    commitment: 'Menyampaikan rincian tarif paket secara transparan termasuk biaya sewa perangkat ONT.',
    actionPlan: 'Penyegaran daftar harga resmi layanan Q4 2026.',
    status: 'Open'
  }
];

// ==========================================
// 1.10 DEFAULT QUIZ QUESTIONS (ULTRAMAN VS MONSTER)
// ==========================================

const DEFAULT_QUIZ_QUESTIONS = [
  {
    id: 'QZ-001',
    category: 'Informasi',
    isMarked: false,
    prompt: 'Berapakah perbandingan rasio kecepatan Upload dan Download (rasio simetris) pada layanan internet fixed broadband ICONNET?',
    options: {
      A: '1 : 4 (Asimetris)',
      B: '1 : 1 (Simetris Penuh)',
      C: '1 : 2 (Asimetris)',
      D: '1 : 8 (Best Effort)',
      E: '1 : 10 (Dynamic Up-to)'
    },
    correctAnswer: 'B',
    explanation: 'ICONNET menggunakan 100% serat optik (full fiber optic) dengan rasio simetris 1:1, di mana kecepatan unggah (upload) dan unduh (download) sama cepat dan stabil.'
  },
  {
    id: 'QZ-002',
    category: 'Informasi',
    isMarked: true,
    prompt: 'Berapakah batas standar SLA Response Time (ART) bagi agen Contact Center CSO dalam merespons antrean pertama pelanggan?',
    options: {
      A: '< 30 Detik',
      B: '< 60 Detik',
      C: '< 90 Detik',
      D: '< 120 Detik',
      E: '< 180 Detik'
    },
    correctAnswer: 'A',
    explanation: 'Berdasarkan Service Level Agreement (SLA) operasional Contact Center ICONNET, ART maksimal adalah di bawah 30 detik untuk memberikan layanan prima.'
  },
  {
    id: 'QZ-003',
    category: 'Gangguan',
    isMarked: true,
    prompt: 'Jika lampu indikator LOS (Loss of Signal) pada modem/ONT pelanggan menyala merah berkedip, apa arti indikasi kendala tersebut?',
    options: {
      A: 'Perangkat modem kelebihan panas (overheat)',
      B: 'Kabel LAN terlepas dari port ethernet',
      C: 'Tidak ada sinyal optik / redaman kabel dropcore putus',
      D: 'Password WiFi salah dimasukkan pelanggan',
      E: 'Fitur DHCP Server modem dinonaktifkan'
    },
    correctAnswer: 'C',
    explanation: 'Indikator LOS merah berkedip menandakan perangkat optik modem tidak menerima sinyal cahaya (sinyal rx optik terputus atau redaman di luar batas operasional -28 dBm).'
  },
  {
    id: 'QZ-004',
    category: 'Keluhan',
    isMarked: false,
    prompt: 'Berapa jumlah titik elemen verifikasi data identitas pelanggan yang wajib divalidasi oleh agen CSO sebelum memproses perubahan akun atau informasi sensitif?',
    options: {
      A: '1 Elemen data',
      B: '2 Elemen data',
      C: '3 Elemen data (ID Pelanggan, Nama, Nomor HP/Alamat)',
      D: '4 Elemen data',
      E: '5 Elemen data'
    },
    correctAnswer: 'C',
    explanation: 'SOP perlindungan data privasi pelanggan (PDP) mewajibkan validasi minimal 3 elemen data: ID Pelanggan, Nama Lengkap pemilik, dan Nomor HP aktif atau alamat instalasi.'
  },
  {
    id: 'QZ-005',
    category: 'Informasi',
    isMarked: false,
    prompt: 'Berapakah batas standar target Average Handling Time (AHT) per interaksi panggilan/chat pada layanan Contact Center ICONNET?',
    options: {
      A: '180 detik (03:00 menit)',
      B: '300 detik (05:00 menit)',
      C: '420 detik (07:00 menit)',
      D: '600 detik (10:00 menit)',
      E: '900 detik (15:00 menit)'
    },
    correctAnswer: 'B',
    explanation: 'Standar target AHT Contact Center ICONNET adalah 300 detik (5 menit 00 detik) untuk menjaga efisiensi penanganan serta kepuasan pelanggan.'
  },
  {
    id: 'QZ-006',
    category: 'Informasi',
    isMarked: false,
    prompt: 'Aplikasi mobile resmi terintegrasi manakah yang digunakan pelanggan untuk melakukan pendaftaran baru, pembayaran tagihan bulanan, serta pengaduan gangguan ICONNET?',
    options: {
      A: 'PLN Mobile',
      B: 'ICONNET Care App',
      C: 'MyTelkom',
      D: 'Speedtest Ookla',
      E: 'LinkAja Portal'
    },
    correctAnswer: 'A',
    explanation: 'Layanan ICONNET terintegrasi penuh di dalam Super App PLN Mobile pada menu ICONNET untuk pendaftaran, tracking gangguan, dan pembayaran tagihan.'
  },
  {
    id: 'QZ-007',
    category: 'Gangguan',
    isMarked: false,
    prompt: 'Apa perbedaan mendasar antara frekuensi WiFi 2.4 GHz dan 5.0 GHz pada router dual-band ICONNET?',
    options: {
      A: '2.4 GHz lebih cepat tetapi jangkauan sempit',
      B: '2.4 GHz jangkauan lebih luas & tembus dinding, 5.0 GHz kecepatan lebih tinggi untuk jarak dekat',
      C: '5.0 GHz hanya bisa digunakan untuk laptop kabel',
      D: '2.4 GHz tidak mendukung standar enkripsi WPA2/WPA3',
      E: 'Tidak ada perbedaan performa antara kedua frekuensi'
    },
    correctAnswer: 'B',
    explanation: 'Frekuensi 2.4 GHz memiliki daya tembus dinding dan jangkauan lebih luas, sedangkan 5.0 GHz menyediakan kecepatan bandwidth lebih tinggi dan latency rendah untuk jarak dekat.'
  },
  {
    id: 'QZ-008',
    category: 'Keluhan',
    isMarked: true,
    prompt: 'Berapakah batas nilai minimum kelulusan (passing grade standard) pada evaluasi penilaian mutu Customer Attributes (CA)?',
    options: {
      A: '70.0',
      B: '75.0',
      C: '80.0',
      D: '85.0',
      E: '90.0'
    },
    correctAnswer: 'D',
    explanation: 'Standar mutu operasional pelayanan CA menetapkan nilai passing grade kelulusan sebesar 85.0.'
  },
  {
    id: 'QZ-009',
    category: 'Gangguan',
    isMarked: false,
    prompt: 'Jika terjadi gangguan massal akibat fiber optic backbone putus di suatu area klaster, tim manakah yang menjadi eskalasi penanganan teknis tingkat 2 (Tier 2)?',
    options: {
      A: 'Divisi Finance & Billing',
      B: 'NOC (Network Operation Center) & Tim Pemeliharaan Jaringan',
      C: 'Satpam Gedung',
      D: 'Customer Service Toko',
      E: 'Divisi Sales & Marketing'
    },
    correctAnswer: 'B',
    explanation: 'Eskalasi kendala infrastruktur massal atau link optik backbone dialihkan langsung ke unit NOC (Network Operation Center) dan tim pemeliharaan jaringan fiber optik.'
  },
  {
    id: 'QZ-010',
    category: 'Gangguan',
    isMarked: false,
    prompt: 'Apakah fungsi utama perangkat ODP (Optical Distribution Point) yang terpasang di tiang fiber optik ICONNET?',
    options: {
      A: 'Mengatur tegangan arus listrik tiang',
      B: 'Titik terminasi dan pembagi kabel serat optik distribusi ke kabel drop wire menuju rumah pelanggan',
      C: 'Memancarkan sinyal radio WiFi publik',
      D: 'Menyimpan baterai cadangan saat pemadaman',
      E: 'Mengukur suhu udara tiang listrik'
    },
    correctAnswer: 'B',
    explanation: 'ODP (Optical Distribution Point) adalah kotak terminasi pasif di tiang yang membagi kabel serat optik distribusi utama menjadi kabel dropcore pelanggan menggunakan splitter pasif.'
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
    this.pendingDelete = null; // { type: 'item'|'user'|'timer'|'stopwatch'|'pa'|'ca'|'tiket'|'aht'|'art'|'finding', id: string, name: string }

    // Selected CA IDs for marking / batch actions
    this.selectedCaIds = new Set();

    // Selected Tiket IDs for marking / batch actions
    this.selectedTiketIds = new Set();

    // Selected AHT IDs for marking / batch actions
    this.selectedAhtIds = new Set();

    // Selected ART IDs for marking / batch actions
    this.selectedArtIds = new Set();

    // Selected Finding IDs for marking / batch actions
    this.selectedFindingIds = new Set();

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
    if (!localStorage.getItem('vortex_pa_logs')) {
      localStorage.setItem('vortex_pa_logs', JSON.stringify(DEFAULT_PA_LOGS));
    }
    if (!localStorage.getItem('vortex_ca_logs')) {
      localStorage.setItem('vortex_ca_logs', JSON.stringify(DEFAULT_CA_LOGS));
    }
    if (!localStorage.getItem('vortex_tikets')) {
      localStorage.setItem('vortex_tikets', JSON.stringify(DEFAULT_TIKETS));
    }
    const existingAht = JSON.parse(localStorage.getItem('vortex_aht_logs') || '[]');
    if (!existingAht.length || !existingAht[0].date) {
      localStorage.setItem('vortex_aht_logs', JSON.stringify(DEFAULT_AHT_LOGS));
    }
    const existingArt = JSON.parse(localStorage.getItem('vortex_art_logs') || '[]');
    if (!existingArt.length || !existingArt[0].date) {
      localStorage.setItem('vortex_art_logs', JSON.stringify(DEFAULT_ART_LOGS));
    }
    if (!localStorage.getItem('vortex_findings')) {
      localStorage.setItem('vortex_findings', JSON.stringify(DEFAULT_FINDINGS));
    }
    const validQuizCats = ['Informasi', 'Keluhan', 'Gangguan'];
    const storedQuizQ = JSON.parse(localStorage.getItem('vortex_quiz_questions') || '[]');
    if (!storedQuizQ.length || !storedQuizQ[0].options || !storedQuizQ[0].options.E || !storedQuizQ.some(q => validQuizCats.includes(q.category))) {
      localStorage.setItem('vortex_quiz_questions', JSON.stringify(DEFAULT_QUIZ_QUESTIONS));
    } else {
      let needsSave = false;
      storedQuizQ.forEach(q => {
        if (!validQuizCats.includes(q.category)) {
          if (q.category && (q.category.includes('Produk') || q.category.includes('SLA'))) {
            q.category = 'Informasi';
          } else if (q.category && (q.category.includes('Teknis') || q.category.includes('Trouble'))) {
            q.category = 'Gangguan';
          } else {
            q.category = 'Keluhan';
          }
          needsSave = true;
        }
        if (q.isMarked === undefined) {
          q.isMarked = false;
          needsSave = true;
        }
      });
      if (needsSave) {
        localStorage.setItem('vortex_quiz_questions', JSON.stringify(storedQuizQ));
      }
    }

    if (!localStorage.getItem('vortex_quiz_history')) {
      const initialHistory = [
        {
          id: 'QZH-1001',
          userId: 'usr_user_1',
          userName: 'siti_rahma',
          userFullName: 'Siti Rahma',
          department: 'CSO DIGILIVE CHAT - WA',
          score: 90,
          correctCount: 9,
          totalQuestions: 10,
          outcome: 'menang',
          duration: '01:24',
          timestamp: '2026-09-30 19:40'
        },
        {
          id: 'QZH-1002',
          userId: 'usr_user_2',
          userName: 'ahmad_fauzi',
          userFullName: 'Ahmad Fauzi',
          department: 'CSO BACK OFFICE',
          score: 70,
          correctCount: 7,
          totalQuestions: 10,
          outcome: 'kalah',
          duration: '02:05',
          timestamp: '2026-09-30 20:15'
        },
        {
          id: 'QZH-1003',
          userId: 'usr_admin_1',
          userName: 'admin',
          userFullName: 'Budi Santoso, S.Kom',
          department: 'CSO INBOUND',
          score: 100,
          correctCount: 10,
          totalQuestions: 10,
          outcome: 'sempurna',
          duration: '01:10',
          timestamp: '2026-09-30 21:00'
        }
      ];
      localStorage.setItem('vortex_quiz_history', JSON.stringify(initialHistory));
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

    // Auto-migrate or initialize CA logs with decimal precision if needed
    const existingCa = JSON.parse(localStorage.getItem('vortex_ca_logs') || '[]');
    if (existingCa.length < 10 || !existingCa.some(l => typeof l.score === 'number' && !Number.isInteger(l.score))) {
      localStorage.setItem('vortex_ca_logs', JSON.stringify(DEFAULT_CA_LOGS));
    }

    // Auto-migrate or initialize Tiket logs with daily interval per user and 1.320 target
    const existingTikets = JSON.parse(localStorage.getItem('vortex_tikets') || '[]');
    if (existingTikets.length === 0 || !existingTikets[0].ticketCount || existingTikets.length < 20) {
      localStorage.setItem('vortex_tikets', JSON.stringify(DEFAULT_TIKETS));
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

  getPaLogs() {
    return JSON.parse(localStorage.getItem('vortex_pa_logs') || '[]');
  }

  savePaLogs(logs) {
    localStorage.setItem('vortex_pa_logs', JSON.stringify(logs));
  }

  getCaLogs() {
    return JSON.parse(localStorage.getItem('vortex_ca_logs') || '[]');
  }

  saveCaLogs(logs) {
    localStorage.setItem('vortex_ca_logs', JSON.stringify(logs));
  }

  getCaGSheetConfig() {
    const defaults = {
      webAppUrl: '',
      sheetId: '',
      sheetName: 'CA_Data',
      autoSync: true,
      lastSyncTime: null,
      lastSyncStatus: 'none',
      lastSyncMessage: ''
    };
    try {
      const raw = localStorage.getItem('vortex_ca_gsheet_config');
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch (e) {
      return defaults;
    }
  }

  saveCaGSheetConfig(cfg) {
    localStorage.setItem('vortex_ca_gsheet_config', JSON.stringify(cfg));
  }

  getTikets() {
    return JSON.parse(localStorage.getItem('vortex_tikets') || '[]');
  }

  saveTikets(tikets) {
    localStorage.setItem('vortex_tikets', JSON.stringify(tikets));
  }

  getTiketGSheetConfig() {
    const defaults = {
      webAppUrl: '',
      sheetId: '',
      sheetName: 'Tiket_Data',
      autoSync: true,
      lastSyncTime: null,
      lastSyncStatus: 'none',
      lastSyncMessage: ''
    };
    try {
      const raw = localStorage.getItem('vortex_tiket_gsheet_config');
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch (e) {
      return defaults;
    }
  }

  saveTiketGSheetConfig(cfg) {
    localStorage.setItem('vortex_tiket_gsheet_config', JSON.stringify(cfg));
  }

  getAhtLogs() {
    return JSON.parse(localStorage.getItem('vortex_aht_logs') || '[]');
  }

  saveAhtLogs(logs) {
    localStorage.setItem('vortex_aht_logs', JSON.stringify(logs));
  }

  getAhtGSheetConfig() {
    const defaults = {
      webAppUrl: '',
      sheetId: '',
      sheetName: 'AHT_Data',
      autoSync: true,
      lastSyncTime: null,
      lastSyncStatus: 'none',
      lastSyncMessage: ''
    };
    try {
      const raw = localStorage.getItem('vortex_aht_gsheet_config');
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch (e) {
      return defaults;
    }
  }

  saveAhtGSheetConfig(cfg) {
    localStorage.setItem('vortex_aht_gsheet_config', JSON.stringify(cfg));
  }

  getArtLogs() {
    return JSON.parse(localStorage.getItem('vortex_art_logs') || '[]');
  }

  saveArtLogs(logs) {
    localStorage.setItem('vortex_art_logs', JSON.stringify(logs));
  }

  getArtGSheetConfig() {
    const defaults = {
      webAppUrl: '',
      sheetId: '',
      sheetName: 'ART_Data',
      autoSync: true,
      lastSyncTime: null,
      lastSyncStatus: 'none',
      lastSyncMessage: ''
    };
    try {
      const raw = localStorage.getItem('vortex_art_gsheet_config');
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch (e) {
      return defaults;
    }
  }

  saveArtGSheetConfig(cfg) {
    localStorage.setItem('vortex_art_gsheet_config', JSON.stringify(cfg));
  }

  getFindings() {
    const raw = JSON.parse(localStorage.getItem('vortex_findings') || '[]');
    return raw.map(item => {
      let level = item.deviationLevel;
      if (level === 'Minor') level = 'Reminder 1';
      else if (level === 'Mayor') level = 'Korektif 1';
      else if (level === 'Fatal') level = 'SP 1';
      return {
        ...item,
        findingType: item.findingType || 'Feedback Negatif',
        deviationLevel: level || 'Reminder 1',
        commitment: item.commitment || '-'
      };
    });
  }

  saveFindings(findings) {
    localStorage.setItem('vortex_findings', JSON.stringify(findings));
  }

  getFindingGSheetConfig() {
    const defaults = {
      webAppUrl: '',
      sheetId: '',
      sheetName: 'Finding_Data',
      autoSync: true,
      lastSyncTime: null,
      lastSyncStatus: 'disconnected'
    };
    try {
      const raw = localStorage.getItem('vortex_finding_gsheet_config');
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch (e) {
      return defaults;
    }
  }

  saveFindingGSheetConfig(cfg) {
    localStorage.setItem('vortex_finding_gsheet_config', JSON.stringify(cfg));
  }

  getQuizQuestions() {
    return JSON.parse(localStorage.getItem('vortex_quiz_questions') || '[]');
  }

  saveQuizQuestions(questions) {
    localStorage.setItem('vortex_quiz_questions', JSON.stringify(questions));
  }

  getQuizHistory() {
    return JSON.parse(localStorage.getItem('vortex_quiz_history') || '[]');
  }

  saveQuizHistory(history) {
    localStorage.setItem('vortex_quiz_history', JSON.stringify(history));
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
    localStorage.setItem('vortex_pa_logs', JSON.stringify(DEFAULT_PA_LOGS));
    localStorage.setItem('vortex_ca_logs', JSON.stringify(DEFAULT_CA_LOGS));
    localStorage.setItem('vortex_tikets', JSON.stringify(DEFAULT_TIKETS));
    localStorage.setItem('vortex_aht_logs', JSON.stringify(DEFAULT_AHT_LOGS));
    localStorage.setItem('vortex_art_logs', JSON.stringify(DEFAULT_ART_LOGS));
    localStorage.setItem('vortex_findings', JSON.stringify(DEFAULT_FINDINGS));
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
    'update-pa': document.getElementById('pageUpdatePa'),
    ca: document.getElementById('pageCa'),
    tiket: document.getElementById('pageTiket'),
    aht: document.getElementById('pageAht'),
    art: document.getElementById('pageArt'),
    finding: document.getElementById('pageFinding'),
    'data-management': document.getElementById('pageDataManagement'),
    timer: document.getElementById('pageTimer'),
    'typing-test': document.getElementById('pageTypingTest'),
    quiz: document.getElementById('pageQuiz'),
    'user-management': document.getElementById('pageUserManagement'),
    'activity-log': document.getElementById('pageActivityLog'),
    settings: document.getElementById('pageSettings')
  },

  // Update PA Elements
  navUpdatePa: document.getElementById('navUpdatePa'),
  pageUpdatePa: document.getElementById('pageUpdatePa'),
  btnOpenAddPaModal: document.getElementById('btnOpenAddPaModal'),
  btnRefreshPa: document.getElementById('btnRefreshPa'),
  btnEmptyAddPa: document.getElementById('btnEmptyAddPa'),
  paBannerRoleLabel: document.getElementById('paBannerRoleLabel'),
  paBannerRoleDesc: document.getElementById('paBannerRoleDesc'),
  paBannerBadgePrivilege: document.getElementById('paBannerBadgePrivilege'),
  paStatTotalInteractions: document.getElementById('paStatTotalInteractions'),
  paStatProductiveHours: document.getElementById('paStatProductiveHours'),
  paStatAuxMinutes: document.getElementById('paStatAuxMinutes'),
  paStatScore: document.getElementById('paStatScore'),
  searchPaInput: document.getElementById('searchPaInput'),
  btnClearSearchPa: document.getElementById('btnClearSearchPa'),
  filterPaService: document.getElementById('filterPaService'),
  filterPaShift: document.getElementById('filterPaShift'),
  filterPaCategory: document.getElementById('filterPaCategory'),
  filterPaStatus: document.getElementById('filterPaStatus'),
  btnResetPaFilters: document.getElementById('btnResetPaFilters'),
  btnExportPaCSV: document.getElementById('btnExportPaCSV'),
  tablePaLogs: document.getElementById('tablePaLogs'),
  paTableBody: document.getElementById('paTableBody'),
  paTableEmpty: document.getElementById('paTableEmpty'),
  modalPaForm: document.getElementById('modalPaForm'),
  formPa: document.getElementById('formPa'),
  formPaId: document.getElementById('formPaId'),
  formPaDate: document.getElementById('formPaDate'),
  formPaShift: document.getElementById('formPaShift'),
  formPaUser: document.getElementById('formPaUser'),
  formPaDept: document.getElementById('formPaDept'),
  formPaCategory: document.getElementById('formPaCategory'),
  formPaInteractions: document.getElementById('formPaInteractions'),
  formPaTarget: document.getElementById('formPaTarget'),
  formPaDuration: document.getElementById('formPaDuration'),
  formPaStatusVal: document.getElementById('formPaStatusVal'),
  formPaNotes: document.getElementById('formPaNotes'),
  btnClosePaModal: document.getElementById('btnClosePaModal'),
  btnCancelPaModal: document.getElementById('btnCancelPaModal'),
  btnSubmitPa: document.getElementById('btnSubmitPa'),
  modalPaTitle: document.getElementById('modalPaTitle'),
  modalPaSubtitle: document.getElementById('modalPaSubtitle'),
  btnSubmitPaText: document.getElementById('btnSubmitPaText'),
  modalPaDetail: document.getElementById('modalPaDetail'),
  btnClosePaDetailModal: document.getElementById('btnClosePaDetailModal'),
  btnClosePaDetailBtn: document.getElementById('btnClosePaDetailBtn'),
  paDetailAvatar: document.getElementById('paDetailAvatar'),
  paDetailUserName: document.getElementById('paDetailUserName'),
  paDetailDept: document.getElementById('paDetailDept'),
  paDetailStatusBadge: document.getElementById('paDetailStatusBadge'),
  paDetailDate: document.getElementById('paDetailDate'),
  paDetailShift: document.getElementById('paDetailShift'),
  paDetailInteractions: document.getElementById('paDetailInteractions'),
  paDetailDuration: document.getElementById('paDetailDuration'),
  paDetailCategory: document.getElementById('paDetailCategory'),
  paDetailNotes: document.getElementById('paDetailNotes'),
  paDetailCreatedAt: document.getElementById('paDetailCreatedAt'),

  // CA Elements
  navCa: document.getElementById('navCa'),
  pageCa: document.getElementById('pageCa'),
  filterCaMonth: document.getElementById('filterCaMonth'),
  caMonthHeaderLabel: document.getElementById('caMonthHeaderLabel'),
  caUserCountBadge: document.getElementById('caUserCountBadge'),
  caUserSummarySection: document.getElementById('caUserSummarySection'),
  filterCaSummarySort: document.getElementById('filterCaSummarySort'),
  tableCaUserSummary: document.getElementById('tableCaUserSummary'),
  caUserSummaryBody: document.getElementById('caUserSummaryBody'),
  btnRefreshCa: document.getElementById('btnRefreshCa'),
  btnExportCaExcel: document.getElementById('btnExportCaExcel'),
  btnDeleteAllCaMonth: document.getElementById('btnDeleteAllCaMonth'),
  btnOpenAddCaModal: document.getElementById('btnOpenAddCaModal'),
  caCardAvgScore: document.getElementById('caCardAvgScore'),
  caStatAvgScoreLabel: document.getElementById('caStatAvgScoreLabel'),
  caStatAvgScore: document.getElementById('caStatAvgScore'),
  caStatAvgScoreSubtext: document.getElementById('caStatAvgScoreSubtext'),
  caCardTotalSamples: document.getElementById('caCardTotalSamples'),
  caStatTotalSamples: document.getElementById('caStatTotalSamples'),
  caCardTopUser: document.getElementById('caCardTopUser'),
  caStatTopUserSub: document.getElementById('caStatTopUserSub'),
  caCardCompliance: document.getElementById('caCardCompliance'),
  caStatCompliance: document.getElementById('caStatCompliance'),
  caPermissionBanner: document.getElementById('caPermissionBanner'),
  caBannerRoleLabel: document.getElementById('caBannerRoleLabel'),
  caBannerRoleDesc: document.getElementById('caBannerRoleDesc'),
  caBannerBadgePrivilege: document.getElementById('caBannerBadgePrivilege'),
  caDailySubtitle: document.getElementById('caDailySubtitle'),
  searchCaInput: document.getElementById('searchCaInput'),
  btnClearSearchCa: document.getElementById('btnClearSearchCa'),
  filterCaUserSelect: document.getElementById('filterCaUserSelect'),
  filterCaService: document.getElementById('filterCaService'),
  filterCaGrade: document.getElementById('filterCaGrade'),
  filterCaScoreSort: document.getElementById('filterCaScoreSort'),
  btnResetCaFilters: document.getElementById('btnResetCaFilters'),
  caBatchBar: document.getElementById('caBatchBar'),
  caSelectedCount: document.getElementById('caSelectedCount'),
  btnCaDeselectAll: document.getElementById('btnCaDeselectAll'),
  btnCaSelectAll: document.getElementById('btnCaSelectAll'),
  btnCaDeleteSelected: document.getElementById('btnCaDeleteSelected'),
  caThSelectAll: document.getElementById('caThSelectAll'),
  caSelectAllCheckbox: document.getElementById('caSelectAllCheckbox'),
  tableCaLogs: document.getElementById('tableCaLogs'),
  caTableBody: document.getElementById('caTableBody'),
  modalCaForm: document.getElementById('modalCaForm'),
  modalCaTitle: document.getElementById('modalCaTitle'),
  modalCaSubtitle: document.getElementById('modalCaSubtitle'),
  formCa: document.getElementById('formCa'),
  formCaId: document.getElementById('formCaId'),
  formCaDate: document.getElementById('formCaDate'),
  formCaUserSelect: document.getElementById('formCaUserSelect'),
  formCaDept: document.getElementById('formCaDept'),
  formCaChannel: document.getElementById('formCaChannel'),
  formCaScore: document.getElementById('formCaScore'),
  formCaParam: document.getElementById('formCaParam'),
  formCaGradeVal: document.getElementById('formCaGradeVal'),
  formCaNotes: document.getElementById('formCaNotes'),
  btnCloseCaModal: document.getElementById('btnCloseCaModal'),
  btnCancelCaModal: document.getElementById('btnCancelCaModal'),
  btnSubmitCa: document.getElementById('btnSubmitCa'),
  btnSubmitCaText: document.getElementById('btnSubmitCaText'),

  // CA Google Spreadsheet Elements
  btnOpenCaGoogleSheetsModal: document.getElementById('btnOpenCaGoogleSheetsModal'),
  caGSheetHeaderBadge: document.getElementById('caGSheetHeaderBadge'),
  caGSheetSyncBar: document.getElementById('caGSheetSyncBar'),
  caGSheetStatusBadge: document.getElementById('caGSheetStatusBadge'),
  caGSheetStatusInfo: document.getElementById('caGSheetStatusInfo'),
  btnCaGSheetOpenLink: document.getElementById('btnCaGSheetOpenLink'),
  btnCaGSheetPull: document.getElementById('btnCaGSheetPull'),
  btnCaGSheetPush: document.getElementById('btnCaGSheetPush'),
  btnCaGSheetConfig: document.getElementById('btnCaGSheetConfig'),

  modalCaGoogleSheets: document.getElementById('modalCaGoogleSheets'),
  btnCloseCaGSheetModal: document.getElementById('btnCloseCaGSheetModal'),
  tabBtnCaGSheetConfig: document.getElementById('tabBtnCaGSheetConfig'),
  tabBtnCaGSheetGuide: document.getElementById('tabBtnCaGSheetGuide'),
  tabContentCaGSheetConfig: document.getElementById('tabContentCaGSheetConfig'),
  tabContentCaGSheetGuide: document.getElementById('tabContentCaGSheetGuide'),
  inputCaGSheetWebAppUrl: document.getElementById('inputCaGSheetWebAppUrl'),
  inputCaGSheetUrl: document.getElementById('inputCaGSheetUrl'),
  inputCaGSheetTabName: document.getElementById('inputCaGSheetTabName'),
  checkCaGSheetAutoSync: document.getElementById('checkCaGSheetAutoSync'),
  labelCaGSheetModalStatus: document.getElementById('labelCaGSheetModalStatus'),
  labelCaGSheetModalLastSync: document.getElementById('labelCaGSheetModalLastSync'),
  labelCaGSheetModalTotalCount: document.getElementById('labelCaGSheetModalTotalCount'),
  btnCaGSheetTest: document.getElementById('btnCaGSheetTest'),
  btnCaGSheetModalOpenLink: document.getElementById('btnCaGSheetModalOpenLink'),
  btnCaGSheetModalPull: document.getElementById('btnCaGSheetModalPull'),
  btnCaGSheetModalPush: document.getElementById('btnCaGSheetModalPush'),
  btnCaGSheetSaveConfig: document.getElementById('btnCaGSheetSaveConfig'),
  btnCopyCaAppsScript: document.getElementById('btnCopyCaAppsScript'),
  caAppsScriptCodePreview: document.getElementById('caAppsScriptCodePreview'),

  // Tiket Elements
  navTiket: document.getElementById('navTiket'),
  pageTiket: document.getElementById('pageTiket'),
  tiketPermissionBanner: document.getElementById('tiketPermissionBanner'),
  tiketBannerRoleLabel: document.getElementById('tiketBannerRoleLabel'),
  tiketBannerRoleDesc: document.getElementById('tiketBannerRoleDesc'),
  tiketBannerBadgePrivilege: document.getElementById('tiketBannerBadgePrivilege'),
  btnRefreshTiket: document.getElementById('btnRefreshTiket'),
  btnExportTiketExcel: document.getElementById('btnExportTiketExcel'),
  btnDeleteAllTiketMonth: document.getElementById('btnDeleteAllTiketMonth'),
  btnOpenAddTiketModal: document.getElementById('btnOpenAddTiketModal'),
  filterTiketMonth: document.getElementById('filterTiketMonth'),
  tiketStatTotalTickets: document.getElementById('tiketStatTotalTickets'),
  tiketStatTotalTicketsSub: document.getElementById('tiketStatTotalTicketsSub'),
  tiketStatMonthlyTarget: document.getElementById('tiketStatMonthlyTarget'),
  tiketStatTopUser: document.getElementById('tiketStatTopUser'),
  tiketStatTopUserSub: document.getElementById('tiketStatTopUserSub'),
  tiketStatDailyAvg: document.getElementById('tiketStatDailyAvg'),
  tiketStatDailyAvgSub: document.getElementById('tiketStatDailyAvgSub'),
  tiketStatSlaTag: document.getElementById('tiketStatSlaTag'),
  tiketUserSummarySection: document.getElementById('tiketUserSummarySection'),
  tiketMonthHeaderLabel: document.getElementById('tiketMonthHeaderLabel'),
  filterSummaryTiketUser: document.getElementById('filterSummaryTiketUser'),
  filterSummaryTiketService: document.getElementById('filterSummaryTiketService'),
  filterTiketSummarySort: document.getElementById('filterTiketSummarySort'),
  tiketUserCountBadge: document.getElementById('tiketUserCountBadge'),
  tableTiketUserSummary: document.getElementById('tableTiketUserSummary'),
  tiketUserSummaryBody: document.getElementById('tiketUserSummaryBody'),
  tiketDailySubtitle: document.getElementById('tiketDailySubtitle'),
  searchTiketInput: document.getElementById('searchTiketInput'),
  btnClearSearchTiket: document.getElementById('btnClearSearchTiket'),
  filterTiketUserSelect: document.getElementById('filterTiketUserSelect'),
  filterTiketService: document.getElementById('filterTiketService'),
  filterTiketGrade: document.getElementById('filterTiketGrade'),
  filterTiketScoreSort: document.getElementById('filterTiketScoreSort'),
  btnResetTiketFilters: document.getElementById('btnResetTiketFilters'),
  tiketBatchBar: document.getElementById('tiketBatchBar'),
  tiketSelectedCount: document.getElementById('tiketSelectedCount'),
  btnTiketDeselectAll: document.getElementById('btnTiketDeselectAll'),
  btnTiketSelectAll: document.getElementById('btnTiketSelectAll'),
  btnTiketDeleteSelected: document.getElementById('btnTiketDeleteSelected'),
  tableTiketLogs: document.getElementById('tableTiketLogs'),
  tiketThSelectAll: document.getElementById('tiketThSelectAll'),
  tiketSelectAllCheckbox: document.getElementById('tiketSelectAllCheckbox'),
  thTiketAction: document.getElementById('thTiketAction'),
  tiketTableBody: document.getElementById('tiketTableBody'),
  modalTiketForm: document.getElementById('modalTiketForm'),
  modalTiketTitle: document.getElementById('modalTiketTitle'),
  modalTiketSubtitle: document.getElementById('modalTiketSubtitle'),
  formTiket: document.getElementById('formTiket'),
  formTiketId: document.getElementById('formTiketId'),
  formTiketDate: document.getElementById('formTiketDate'),
  formTiketUserSelect: document.getElementById('formTiketUserSelect'),
  formTiketDept: document.getElementById('formTiketDept'),
  formTiketCount: document.getElementById('formTiketCount'),
  formTiketNotes: document.getElementById('formTiketNotes'),
  btnCloseTiketModal: document.getElementById('btnCloseTiketModal'),
  btnCancelTiketModal: document.getElementById('btnCancelTiketModal'),
  btnSubmitTiket: document.getElementById('btnSubmitTiket'),
  btnSubmitTiketText: document.getElementById('btnSubmitTiketText'),

  // Tiket Google Spreadsheet Elements
  btnOpenTiketGoogleSheetsModal: document.getElementById('btnOpenTiketGoogleSheetsModal'),
  tiketGSheetHeaderBadge: document.getElementById('tiketGSheetHeaderBadge'),
  tiketGSheetSyncBar: document.getElementById('tiketGSheetSyncBar'),
  tiketGSheetStatusBadge: document.getElementById('tiketGSheetStatusBadge'),
  tiketGSheetStatusInfo: document.getElementById('tiketGSheetStatusInfo'),
  btnTiketGSheetOpenLink: document.getElementById('btnTiketGSheetOpenLink'),
  btnTiketGSheetPull: document.getElementById('btnTiketGSheetPull'),
  btnTiketGSheetPush: document.getElementById('btnTiketGSheetPush'),
  btnTiketGSheetConfig: document.getElementById('btnTiketGSheetConfig'),

  modalTiketGoogleSheets: document.getElementById('modalTiketGoogleSheets'),
  btnCloseTiketGSheetModal: document.getElementById('btnCloseTiketGSheetModal'),
  tabBtnTiketGSheetConfig: document.getElementById('tabBtnTiketGSheetConfig'),
  tabBtnTiketGSheetGuide: document.getElementById('tabBtnTiketGSheetGuide'),
  tabContentTiketGSheetConfig: document.getElementById('tabContentTiketGSheetConfig'),
  tabContentTiketGSheetGuide: document.getElementById('tabContentTiketGSheetGuide'),
  inputTiketGSheetWebAppUrl: document.getElementById('inputTiketGSheetWebAppUrl'),
  inputTiketGSheetUrl: document.getElementById('inputTiketGSheetUrl'),
  inputTiketGSheetTabName: document.getElementById('inputTiketGSheetTabName'),
  checkTiketGSheetAutoSync: document.getElementById('checkTiketGSheetAutoSync'),
  labelTiketGSheetModalStatus: document.getElementById('labelTiketGSheetModalStatus'),
  labelTiketGSheetModalLastSync: document.getElementById('labelTiketGSheetModalLastSync'),
  labelTiketGSheetModalTotalCount: document.getElementById('labelTiketGSheetModalTotalCount'),
  btnTiketGSheetTest: document.getElementById('btnTiketGSheetTest'),
  btnTiketGSheetModalOpenLink: document.getElementById('btnTiketGSheetModalOpenLink'),
  btnTiketGSheetModalPull: document.getElementById('btnTiketGSheetModalPull'),
  btnTiketGSheetModalPush: document.getElementById('btnTiketGSheetModalPush'),
  btnTiketGSheetSaveConfig: document.getElementById('btnTiketGSheetSaveConfig'),
  btnCopyTiketAppsScript: document.getElementById('btnCopyTiketAppsScript'),
  tiketAppsScriptCodePreview: document.getElementById('tiketAppsScriptCodePreview'),

  // AHT Elements
  navAht: document.getElementById('navAht'),
  pageAht: document.getElementById('pageAht'),
  filterAhtMonth: document.getElementById('filterAhtMonth'),
  btnRefreshAht: document.getElementById('btnRefreshAht'),
  btnExportAhtExcel: document.getElementById('btnExportAhtExcel'),
  btnDeleteAllAhtMonth: document.getElementById('btnDeleteAllAhtMonth'),
  btnOpenAddAhtModal: document.getElementById('btnOpenAddAhtModal'),

  ahtPermissionBanner: document.getElementById('ahtPermissionBanner'),
  ahtBannerRoleLabel: document.getElementById('ahtBannerRoleLabel'),
  ahtBannerRoleDesc: document.getElementById('ahtBannerRoleDesc'),
  ahtBannerBadgePrivilege: document.getElementById('ahtBannerBadgePrivilege'),

  ahtStatAvg: document.getElementById('ahtStatAvg'),
  ahtStatAvgSub: document.getElementById('ahtStatAvgSub'),
  ahtStatCompliance: document.getElementById('ahtStatCompliance'),
  ahtStatComplianceSub: document.getElementById('ahtStatComplianceSub'),
  ahtStatOver: document.getElementById('ahtStatOver'),
  ahtStatOverSub: document.getElementById('ahtStatOverSub'),
  ahtStatTopUser: document.getElementById('ahtStatTopUser'),
  ahtStatTopUserSub: document.getElementById('ahtStatTopUserSub'),

  ahtMonthHeaderLabel: document.getElementById('ahtMonthHeaderLabel'),
  filterSummaryAhtUser: document.getElementById('filterSummaryAhtUser'),
  filterSummaryAhtService: document.getElementById('filterSummaryAhtService'),
  filterAhtSummarySort: document.getElementById('filterAhtSummarySort'),
  ahtUserCountBadge: document.getElementById('ahtUserCountBadge'),
  tableAhtUserSummary: document.getElementById('tableAhtUserSummary'),
  ahtUserSummaryBody: document.getElementById('ahtUserSummaryBody'),

  ahtDailySubtitle: document.getElementById('ahtDailySubtitle'),
  searchAhtInput: document.getElementById('searchAhtInput'),
  btnClearSearchAht: document.getElementById('btnClearSearchAht'),
  filterAhtUserSelect: document.getElementById('filterAhtUserSelect'),
  filterAhtService: document.getElementById('filterAhtService'),
  filterAhtStatus: document.getElementById('filterAhtStatus'),
  filterAhtSort: document.getElementById('filterAhtSort'),
  btnResetAhtFilters: document.getElementById('btnResetAhtFilters'),

  ahtBatchBar: document.getElementById('ahtBatchBar'),
  ahtSelectedCount: document.getElementById('ahtSelectedCount'),
  btnAhtDeselectAll: document.getElementById('btnAhtDeselectAll'),
  btnAhtSelectAll: document.getElementById('btnAhtSelectAll'),
  btnAhtDeleteSelected: document.getElementById('btnAhtDeleteSelected'),

  ahtThSelectAll: document.getElementById('ahtThSelectAll'),
  ahtSelectAllCheckbox: document.getElementById('ahtSelectAllCheckbox'),
  tableAhtLogs: document.getElementById('tableAhtLogs'),
  ahtTableBody: document.getElementById('ahtTableBody'),

  // Modal AHT Form
  modalAhtForm: document.getElementById('modalAhtForm'),
  modalAhtTitle: document.getElementById('modalAhtTitle'),
  modalAhtSubtitle: document.getElementById('modalAhtSubtitle'),
  btnCloseAhtModal: document.getElementById('btnCloseAhtModal'),
  btnCancelAhtModal: document.getElementById('btnCancelAhtModal'),
  formAht: document.getElementById('formAht'),
  formAhtId: document.getElementById('formAhtId'),
  formAhtDate: document.getElementById('formAhtDate'),
  formAhtUserSelect: document.getElementById('formAhtUserSelect'),
  formAhtDept: document.getElementById('formAhtDept'),
  formAhtInteractionCount: document.getElementById('formAhtInteractionCount'),
  formAhtDurationMins: document.getElementById('formAhtDurationMins'),
  formAhtDurationSecs: document.getElementById('formAhtDurationSecs'),
  formAhtDurationPreview: document.getElementById('formAhtDurationPreview'),
  formAhtTargetSecs: document.getElementById('formAhtTargetSecs'),
  formAhtNotes: document.getElementById('formAhtNotes'),
  btnSubmitAht: document.getElementById('btnSubmitAht'),
  btnSubmitAhtText: document.getElementById('btnSubmitAhtText'),

  // AHT Google Spreadsheet Elements
  btnOpenAhtGoogleSheetsModal: document.getElementById('btnOpenAhtGoogleSheetsModal'),
  ahtGSheetHeaderBadge: document.getElementById('ahtGSheetHeaderBadge'),
  ahtGSheetSyncBar: document.getElementById('ahtGSheetSyncBar'),
  ahtGSheetStatusBadge: document.getElementById('ahtGSheetStatusBadge'),
  ahtGSheetStatusInfo: document.getElementById('ahtGSheetStatusInfo'),
  btnAhtGSheetOpenLink: document.getElementById('btnAhtGSheetOpenLink'),
  btnAhtGSheetPull: document.getElementById('btnAhtGSheetPull'),
  btnAhtGSheetPush: document.getElementById('btnAhtGSheetPush'),
  btnAhtGSheetConfig: document.getElementById('btnAhtGSheetConfig'),

  modalAhtGoogleSheets: document.getElementById('modalAhtGoogleSheets'),
  btnCloseAhtGSheetModal: document.getElementById('btnCloseAhtGSheetModal'),
  tabBtnAhtGSheetConfig: document.getElementById('tabBtnAhtGSheetConfig'),
  tabBtnAhtGSheetGuide: document.getElementById('tabBtnAhtGSheetGuide'),
  tabContentAhtGSheetConfig: document.getElementById('tabContentAhtGSheetConfig'),
  tabContentAhtGSheetGuide: document.getElementById('tabContentAhtGSheetGuide'),
  inputAhtGSheetWebAppUrl: document.getElementById('inputAhtGSheetWebAppUrl'),
  inputAhtGSheetUrl: document.getElementById('inputAhtGSheetUrl'),
  inputAhtGSheetTabName: document.getElementById('inputAhtGSheetTabName'),
  checkAhtGSheetAutoSync: document.getElementById('checkAhtGSheetAutoSync'),
  labelAhtGSheetModalStatus: document.getElementById('labelAhtGSheetModalStatus'),
  labelAhtGSheetModalLastSync: document.getElementById('labelAhtGSheetModalLastSync'),
  labelAhtGSheetModalTotalCount: document.getElementById('labelAhtGSheetModalTotalCount'),
  btnAhtGSheetTest: document.getElementById('btnAhtGSheetTest'),
  btnAhtGSheetModalOpenLink: document.getElementById('btnAhtGSheetModalOpenLink'),
  btnAhtGSheetModalPull: document.getElementById('btnAhtGSheetModalPull'),
  btnAhtGSheetModalPush: document.getElementById('btnAhtGSheetModalPush'),
  btnAhtGSheetSaveConfig: document.getElementById('btnAhtGSheetSaveConfig'),
  btnCopyAhtAppsScript: document.getElementById('btnCopyAhtAppsScript'),
  ahtAppsScriptCodePreview: document.getElementById('ahtAppsScriptCodePreview'),

  // ART Elements
  navArt: document.getElementById('navArt'),
  pageArt: document.getElementById('pageArt'),
  filterArtMonth: document.getElementById('filterArtMonth'),
  btnRefreshArt: document.getElementById('btnRefreshArt'),
  btnExportArtExcel: document.getElementById('btnExportArtExcel'),
  btnDeleteAllArtMonth: document.getElementById('btnDeleteAllArtMonth'),
  btnOpenAddArtModal: document.getElementById('btnOpenAddArtModal'),

  // ART Google Spreadsheet Elements
  btnOpenArtGoogleSheetsModal: document.getElementById('btnOpenArtGoogleSheetsModal'),
  artGSheetHeaderBadge: document.getElementById('artGSheetHeaderBadge'),
  artGSheetSyncBar: document.getElementById('artGSheetSyncBar'),
  artGSheetStatusBadge: document.getElementById('artGSheetStatusBadge'),
  artGSheetStatusInfo: document.getElementById('artGSheetStatusInfo'),
  btnArtGSheetOpenLink: document.getElementById('btnArtGSheetOpenLink'),
  btnArtGSheetPull: document.getElementById('btnArtGSheetPull'),
  btnArtGSheetPush: document.getElementById('btnArtGSheetPush'),
  btnArtGSheetConfig: document.getElementById('btnArtGSheetConfig'),

  modalArtGoogleSheets: document.getElementById('modalArtGoogleSheets'),
  btnCloseArtGSheetModal: document.getElementById('btnCloseArtGSheetModal'),
  tabBtnArtGSheetConfig: document.getElementById('tabBtnArtGSheetConfig'),
  tabBtnArtGSheetGuide: document.getElementById('tabBtnArtGSheetGuide'),
  tabContentArtGSheetConfig: document.getElementById('tabContentArtGSheetConfig'),
  tabContentArtGSheetGuide: document.getElementById('tabContentArtGSheetGuide'),
  inputArtGSheetWebAppUrl: document.getElementById('inputArtGSheetWebAppUrl'),
  inputArtGSheetUrl: document.getElementById('inputArtGSheetUrl'),
  inputArtGSheetTabName: document.getElementById('inputArtGSheetTabName'),
  checkArtGSheetAutoSync: document.getElementById('checkArtGSheetAutoSync'),
  labelArtGSheetModalStatus: document.getElementById('labelArtGSheetModalStatus'),
  labelArtGSheetModalLastSync: document.getElementById('labelArtGSheetModalLastSync'),
  labelArtGSheetModalTotalCount: document.getElementById('labelArtGSheetModalTotalCount'),
  btnArtGSheetTest: document.getElementById('btnArtGSheetTest'),
  btnArtGSheetModalOpenLink: document.getElementById('btnArtGSheetModalOpenLink'),
  btnArtGSheetModalPull: document.getElementById('btnArtGSheetModalPull'),
  btnArtGSheetModalPush: document.getElementById('btnArtGSheetModalPush'),
  btnArtGSheetSaveConfig: document.getElementById('btnArtGSheetSaveConfig'),
  btnCopyArtAppsScript: document.getElementById('btnCopyArtAppsScript'),
  artAppsScriptCodePreview: document.getElementById('artAppsScriptCodePreview'),

  artPermissionBanner: document.getElementById('artPermissionBanner'),
  artBannerRoleLabel: document.getElementById('artBannerRoleLabel'),
  artBannerRoleDesc: document.getElementById('artBannerRoleDesc'),
  artBannerBadgePrivilege: document.getElementById('artBannerBadgePrivilege'),

  artStatAvg: document.getElementById('artStatAvg'),
  artStatAvgSub: document.getElementById('artStatAvgSub'),
  artStatFrt: document.getElementById('artStatFrt'),
  artStatFrtSub: document.getElementById('artStatFrtSub'),
  artStatCompliance: document.getElementById('artStatCompliance'),
  artStatComplianceSub: document.getElementById('artStatComplianceSub'),
  artStatTopUser: document.getElementById('artStatTopUser'),
  artStatTopUserSub: document.getElementById('artStatTopUserSub'),
  artStatTopUserTag: document.getElementById('artStatTopUserTag'),
  artStatTopUserLabel: document.getElementById('artStatTopUserLabel'),

  artMonthHeaderLabel: document.getElementById('artMonthHeaderLabel'),
  filterSummaryArtUser: document.getElementById('filterSummaryArtUser'),
  filterSummaryArtService: document.getElementById('filterSummaryArtService'),
  filterArtSummarySort: document.getElementById('filterArtSummarySort'),
  artUserCountBadge: document.getElementById('artUserCountBadge'),
  tableArtUserSummary: document.getElementById('tableArtUserSummary'),
  artUserSummaryBody: document.getElementById('artUserSummaryBody'),

  artDailySubtitle: document.getElementById('artDailySubtitle'),
  searchArtInput: document.getElementById('searchArtInput'),
  btnClearSearchArt: document.getElementById('btnClearSearchArt'),
  filterArtUserSelect: document.getElementById('filterArtUserSelect'),
  filterArtService: document.getElementById('filterArtService'),
  filterArtStatus: document.getElementById('filterArtStatus'),
  filterArtSort: document.getElementById('filterArtSort'),
  btnResetArtFilters: document.getElementById('btnResetArtFilters'),

  artBatchBar: document.getElementById('artBatchBar'),
  artSelectedCount: document.getElementById('artSelectedCount'),
  btnArtDeselectAll: document.getElementById('btnArtDeselectAll'),
  btnArtSelectAll: document.getElementById('btnArtSelectAll'),
  btnArtDeleteSelected: document.getElementById('btnArtDeleteSelected'),

  artThSelectAll: document.getElementById('artThSelectAll'),
  artSelectAllCheckbox: document.getElementById('artSelectAllCheckbox'),
  tableArtLogs: document.getElementById('tableArtLogs'),
  artTableBody: document.getElementById('artTableBody'),

  // Modal ART Form
  modalArtForm: document.getElementById('modalArtForm'),
  modalArtTitle: document.getElementById('modalArtTitle'),
  modalArtSubtitle: document.getElementById('modalArtSubtitle'),
  btnCloseArtModal: document.getElementById('btnCloseArtModal'),
  btnCancelArtModal: document.getElementById('btnCancelArtModal'),
  formArt: document.getElementById('formArt'),
  formArtId: document.getElementById('formArtId'),
  formArtDate: document.getElementById('formArtDate'),
  formArtUserSelect: document.getElementById('formArtUserSelect'),
  formArtDept: document.getElementById('formArtDept'),
  formArtInteractionCount: document.getElementById('formArtInteractionCount'),
  formArtQueueSecs: document.getElementById('formArtQueueSecs'),
  formArtFrtSecs: document.getElementById('formArtFrtSecs'),
  formArtResponseSecs: document.getElementById('formArtResponseSecs'),
  formArtResponsePreview: document.getElementById('formArtResponsePreview'),
  formArtTargetSecs: document.getElementById('formArtTargetSecs'),
  formArtNotes: document.getElementById('formArtNotes'),
  btnSubmitArt: document.getElementById('btnSubmitArt'),
  btnSubmitArtText: document.getElementById('btnSubmitArtText'),

  // Finding Elements
  navFinding: document.getElementById('navFinding'),
  pageFinding: document.getElementById('pageFinding'),
  filterFindingMonth: document.getElementById('filterFindingMonth'),
  btnDeleteAllFindingMonth: document.getElementById('btnDeleteAllFindingMonth'),
  btnRefreshFinding: document.getElementById('btnRefreshFinding'),
  btnExportFindingExcel: document.getElementById('btnExportFindingExcel'),
  btnOpenAddFindingModal: document.getElementById('btnOpenAddFindingModal'),
  findingStatTotal: document.getElementById('findingStatTotal'),
  findingStatMinor: document.getElementById('findingStatMinor'),
  findingStatMayor: document.getElementById('findingStatMayor'),
  findingStatFatal: document.getElementById('findingStatFatal'),
  searchFindingInput: document.getElementById('searchFindingInput'),
  btnClearSearchFinding: document.getElementById('btnClearSearchFinding'),
  filterFindingService: document.getElementById('filterFindingService'),
  filterFindingType: document.getElementById('filterFindingType'),
  filterFindingLevel: document.getElementById('filterFindingLevel'),
  filterFindingStatus: document.getElementById('filterFindingStatus'),
  btnResetFindingFilters: document.getElementById('btnResetFindingFilters'),
  findingBatchBar: document.getElementById('findingBatchBar'),
  findingSelectedCount: document.getElementById('findingSelectedCount'),
  btnFindingDeselectAll: document.getElementById('btnFindingDeselectAll'),
  btnFindingSelectAll: document.getElementById('btnFindingSelectAll'),
  btnFindingDeleteSelected: document.getElementById('btnFindingDeleteSelected'),
  tableFindingLogs: document.getElementById('tableFindingLogs'),
  findingThSelectAll: document.getElementById('findingThSelectAll'),
  findingSelectAllCheckbox: document.getElementById('findingSelectAllCheckbox'),
  findingTableBody: document.getElementById('findingTableBody'),
  modalFindingForm: document.getElementById('modalFindingForm'),
  modalFindingTitle: document.getElementById('modalFindingTitle'),
  formFinding: document.getElementById('formFinding'),
  formFindingId: document.getElementById('formFindingId'),
  formFindingDate: document.getElementById('formFindingDate'),
  formFindingUser: document.getElementById('formFindingUser'),
  formFindingDept: document.getElementById('formFindingDept'),
  formFindingType: document.getElementById('formFindingType'),
  formFindingCategoryVal: document.getElementById('formFindingCategoryVal'),
  formFindingLevelVal: document.getElementById('formFindingLevelVal'),
  formFindingDesc: document.getElementById('formFindingDesc'),
  formFindingCommitment: document.getElementById('formFindingCommitment'),
  formFindingActionPlan: document.getElementById('formFindingActionPlan'),
  formFindingStatus: document.getElementById('formFindingStatus'),
  btnCloseFindingModal: document.getElementById('btnCloseFindingModal'),
  btnCancelFindingModal: document.getElementById('btnCancelFindingModal'),
  btnSubmitFinding: document.getElementById('btnSubmitFinding'),
  btnSubmitFindingText: document.getElementById('btnSubmitFindingText'),

  // Finding Google Spreadsheet Elements
  btnOpenFindingGoogleSheetsModal: document.getElementById('btnOpenFindingGoogleSheetsModal'),
  findingGSheetHeaderBadge: document.getElementById('findingGSheetHeaderBadge'),
  findingGSheetSyncBar: document.getElementById('findingGSheetSyncBar'),
  findingGSheetStatusBadge: document.getElementById('findingGSheetStatusBadge'),
  findingGSheetStatusInfo: document.getElementById('findingGSheetStatusInfo'),
  btnFindingGSheetOpenLink: document.getElementById('btnFindingGSheetOpenLink'),
  btnFindingGSheetPull: document.getElementById('btnFindingGSheetPull'),
  btnFindingGSheetPush: document.getElementById('btnFindingGSheetPush'),
  btnFindingGSheetConfig: document.getElementById('btnFindingGSheetConfig'),

  // Modal Finding Google Sheets
  modalFindingGoogleSheets: document.getElementById('modalFindingGoogleSheets'),
  btnCloseFindingGSheetModal: document.getElementById('btnCloseFindingGSheetModal'),
  btnCancelFindingGSheetModal: document.getElementById('btnCancelFindingGSheetModal'),
  tabBtnFindingGSheetConfig: document.getElementById('tabBtnFindingGSheetConfig'),
  tabBtnFindingGSheetGuide: document.getElementById('tabBtnFindingGSheetGuide'),
  tabContentFindingGSheetConfig: document.getElementById('tabContentFindingGSheetConfig'),
  tabContentFindingGSheetGuide: document.getElementById('tabContentFindingGSheetGuide'),
  inputFindingGSheetWebAppUrl: document.getElementById('inputFindingGSheetWebAppUrl'),
  inputFindingGSheetUrl: document.getElementById('inputFindingGSheetUrl'),
  inputFindingGSheetTabName: document.getElementById('inputFindingGSheetTabName'),
  checkFindingGSheetAutoSync: document.getElementById('checkFindingGSheetAutoSync'),
  boxFindingGSheetStatusDetail: document.getElementById('boxFindingGSheetStatusDetail'),
  labelFindingGSheetModalStatus: document.getElementById('labelFindingGSheetModalStatus'),
  labelFindingGSheetModalLastSync: document.getElementById('labelFindingGSheetModalLastSync'),
  labelFindingGSheetModalTotalCount: document.getElementById('labelFindingGSheetModalTotalCount'),
  btnFindingGSheetTest: document.getElementById('btnFindingGSheetTest'),
  btnFindingGSheetModalOpenLink: document.getElementById('btnFindingGSheetModalOpenLink'),
  btnFindingGSheetModalPull: document.getElementById('btnFindingGSheetModalPull'),
  btnFindingGSheetModalPush: document.getElementById('btnFindingGSheetModalPush'),
  btnFindingGSheetSaveConfig: document.getElementById('btnFindingGSheetSaveConfig'),
  codeFindingAppsScript: document.getElementById('codeFindingAppsScript'),
  btnCopyFindingAppsScript: document.getElementById('btnCopyFindingAppsScript'),

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

  // Save previous quiz user session if in progress
  if (typeof saveActiveUserQuizSession === 'function' && typeof quizState !== 'undefined' && quizState.activeUserId && !quizState.isFinished) {
    saveActiveUserQuizSession();
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
    if (typeof saveActiveUserQuizSession === 'function' && typeof quizState !== 'undefined' && quizState.activeUserId && !quizState.isFinished) {
      saveActiveUserQuizSession();
    }
  }
  if (typeof quizState !== 'undefined') {
    quizState.activeUserId = null;
    if (typeof dismissSpecialOutcomeAnimation === 'function') {
      dismissSpecialOutcomeAnimation();
    }
    const modal = document.getElementById('modalQuizResult');
    if (modal) modal.classList.add('hidden');
  }
  state.clearSession();
  showToast('Sesi Berakhir', 'Anda telah keluar dari sistem secara aman.', 'info');
  renderAppView();
}

function switchUserRole(targetRole) {
  const users = state.getUsers();
  const targetUser = users.find(u => u.role === targetRole && u.status === 'active');
  if (targetUser) {
    if (typeof saveActiveUserQuizSession === 'function' && typeof quizState !== 'undefined' && quizState.activeUserId && !quizState.isFinished) {
      saveActiveUserQuizSession();
    }
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
      UI.timerBannerRoleDesc.textContent = '';
      UI.timerBannerRoleDesc.classList.add('hidden');
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
      UI.timerBannerRoleDesc.textContent = '';
      UI.timerBannerRoleDesc.classList.add('hidden');
      UI.timerBannerBadge.className = 'badge badge-user';
      UI.timerBannerBadge.textContent = 'Kontrol Pribadi Penuh';
    }
  }

  // Update PA permission and banner info
  const paBannerRoleLabel = document.getElementById('paBannerRoleLabel');
  const paBannerRoleDesc = document.getElementById('paBannerRoleDesc');
  const paBannerBadgePrivilege = document.getElementById('paBannerBadgePrivilege');
  if (paBannerRoleLabel && paBannerRoleDesc && paBannerBadgePrivilege) {
    if (isAdmin) {
      paBannerRoleLabel.textContent = 'Otoritas Akses: Supervisor & Verifikasi Tim';
      paBannerRoleDesc.innerHTML = 'Admin & Team Leader dapat memantau seluruh catatan Update PA dari seluruh agen CSO, serta melakukan verifikasi status.';
      paBannerBadgePrivilege.className = 'badge badge-admin';
      paBannerBadgePrivilege.textContent = 'Supervisor & Verifikasi';
    } else {
      paBannerRoleLabel.textContent = 'Otoritas Akses: Agen CSO (Pelaporan Mandiri)';
      paBannerRoleDesc.innerHTML = 'Catat dan perbarui durasi shift, status AUX, jumlah penanganan tiket/chat, serta kendala operasional Anda secara akurat.';
      paBannerBadgePrivilege.className = 'badge badge-user';
      paBannerBadgePrivilege.textContent = 'Pelaporan Mandiri';
    }
  }

  // CA (Customer Attributes) permission and banner info
  const caBannerRoleLabel = document.getElementById('caBannerRoleLabel');
  const caBannerRoleDesc = document.getElementById('caBannerRoleDesc');
  const caBannerBadgePrivilege = document.getElementById('caBannerBadgePrivilege');
  if (caBannerRoleLabel && caBannerRoleDesc && caBannerBadgePrivilege) {
    if (isAdmin) {
      caBannerRoleLabel.textContent = 'Otoritas Akses CA: Administrator Penuh';
      caBannerRoleDesc.textContent = '';
      caBannerRoleDesc.classList.add('hidden');
      caBannerBadgePrivilege.className = 'badge badge-admin';
      caBannerBadgePrivilege.textContent = 'Akses Penuh (CRUD)';
    } else {
      caBannerRoleLabel.textContent = 'Otoritas Akses CA: Pengguna (Hanya Lihat)';
      caBannerRoleDesc.textContent = '';
      caBannerRoleDesc.classList.add('hidden');
      caBannerBadgePrivilege.className = 'badge badge-user';
      caBannerBadgePrivilege.textContent = 'Hanya Lihat (Read-Only)';
    }
  }
  if (UI.btnOpenAddCaModal) {
    UI.btnOpenAddCaModal.classList.toggle('hidden', !isAdmin);
  }
  if (UI.btnDeleteAllCaMonth) {
    UI.btnDeleteAllCaMonth.classList.toggle('hidden', !isAdmin);
  }
  if (UI.btnCaDeleteSelected) {
    UI.btnCaDeleteSelected.classList.toggle('hidden', !isAdmin);
  }

  // CA Role-based View Restrictions (User vs Admin)
  if (UI.caUserSummarySection) {
    UI.caUserSummarySection.classList.toggle('hidden', !isAdmin);
  }
  if (UI.caCardTotalSamples) {
    UI.caCardTotalSamples.classList.toggle('hidden', !isAdmin);
  }
  if (UI.caCardTopUser) {
    UI.caCardTopUser.classList.toggle('hidden', !isAdmin);
  }
  if (UI.caCardCompliance) {
    UI.caCardCompliance.classList.toggle('hidden', !isAdmin);
  }
  if (UI.filterCaUserSelect) {
    UI.filterCaUserSelect.classList.toggle('hidden', !isAdmin);
  }
  if (UI.caThSelectAll) {
    UI.caThSelectAll.classList.toggle('hidden', !isAdmin);
  }
  if (UI.caBatchBar && !isAdmin) {
    UI.caBatchBar.classList.add('hidden');
  }

  // Tiket permission and banner info
  const tiketBannerRoleLabel = document.getElementById('tiketBannerRoleLabel');
  const tiketBannerRoleDesc = document.getElementById('tiketBannerRoleDesc');
  const tiketBannerBadgePrivilege = document.getElementById('tiketBannerBadgePrivilege');
  if (tiketBannerRoleLabel && tiketBannerRoleDesc && tiketBannerBadgePrivilege) {
    if (isAdmin) {
      tiketBannerRoleLabel.textContent = 'Otoritas Akses Perolehan Tiket';
      tiketBannerRoleDesc.textContent = '';
      tiketBannerRoleDesc.classList.add('hidden');
      tiketBannerBadgePrivilege.className = 'badge badge-admin';
      tiketBannerBadgePrivilege.textContent = 'Akses Penuh (CRUD)';
    } else {
      tiketBannerRoleLabel.textContent = 'Otoritas Akses Perolehan Tiket';
      tiketBannerRoleDesc.textContent = '';
      tiketBannerRoleDesc.classList.add('hidden');
      tiketBannerBadgePrivilege.className = 'badge badge-user';
      tiketBannerBadgePrivilege.textContent = 'Hanya Lihat (Read-Only)';
    }
  }
  if (UI.btnOpenAddTiketModal) {
    UI.btnOpenAddTiketModal.classList.toggle('hidden', !isAdmin);
  }
  if (UI.btnDeleteAllTiketMonth) {
    UI.btnDeleteAllTiketMonth.classList.toggle('hidden', !isAdmin);
  }
  if (UI.btnTiketDeleteSelected) {
    UI.btnTiketDeleteSelected.classList.toggle('hidden', !isAdmin);
  }
  if (UI.tiketThSelectAll) {
    UI.tiketThSelectAll.classList.toggle('hidden', !isAdmin);
  }
  if (UI.tiketBatchBar && !isAdmin) {
    UI.tiketBatchBar.classList.add('hidden');
  }

  // AHT permission and banner info
  const ahtBannerRoleLabel = document.getElementById('ahtBannerRoleLabel');
  const ahtBannerRoleDesc = document.getElementById('ahtBannerRoleDesc');
  const ahtBannerBadgePrivilege = document.getElementById('ahtBannerBadgePrivilege');
  if (ahtBannerRoleLabel && ahtBannerRoleDesc && ahtBannerBadgePrivilege) {
    if (isAdmin) {
      ahtBannerRoleLabel.textContent = 'Otoritas Akses Handling Time (AHT)';
      ahtBannerRoleDesc.textContent = '';
      ahtBannerRoleDesc.classList.add('hidden');
      ahtBannerBadgePrivilege.className = 'badge badge-admin';
      ahtBannerBadgePrivilege.textContent = 'Akses Penuh (CRUD)';
    } else {
      ahtBannerRoleLabel.textContent = 'Otoritas Akses Handling Time (AHT)';
      ahtBannerRoleDesc.textContent = '';
      ahtBannerRoleDesc.classList.add('hidden');
      ahtBannerBadgePrivilege.className = 'badge badge-user';
      ahtBannerBadgePrivilege.textContent = 'Hanya Lihat (Read-Only)';
    }
  }
  if (UI.btnOpenAddAhtModal) {
    UI.btnOpenAddAhtModal.classList.toggle('hidden', !isAdmin);
  }
  if (UI.btnDeleteAllAhtMonth) {
    UI.btnDeleteAllAhtMonth.classList.toggle('hidden', !isAdmin);
  }
  if (UI.btnAhtDeleteSelected) {
    UI.btnAhtDeleteSelected.classList.toggle('hidden', !isAdmin);
  }
  if (UI.ahtThSelectAll) {
    UI.ahtThSelectAll.classList.toggle('hidden', !isAdmin);
  }
  if (UI.ahtBatchBar && !isAdmin) {
    UI.ahtBatchBar.classList.add('hidden');
  }

  // ART permission and banner info
  const artBannerRoleLabel = document.getElementById('artBannerRoleLabel');
  const artBannerRoleDesc = document.getElementById('artBannerRoleDesc');
  const artBannerBadgePrivilege = document.getElementById('artBannerBadgePrivilege');
  if (artBannerRoleLabel && artBannerRoleDesc && artBannerBadgePrivilege) {
    if (isAdmin) {
      artBannerRoleLabel.textContent = 'Otoritas Akses Response Time (ART)';
      artBannerRoleDesc.textContent = '';
      artBannerRoleDesc.classList.add('hidden');
      artBannerBadgePrivilege.className = 'badge badge-admin';
      artBannerBadgePrivilege.textContent = 'Akses Penuh (CRUD)';
    } else {
      artBannerRoleLabel.textContent = 'Otoritas Akses Response Time (ART)';
      artBannerRoleDesc.textContent = '';
      artBannerRoleDesc.classList.add('hidden');
      artBannerBadgePrivilege.className = 'badge badge-user';
      artBannerBadgePrivilege.textContent = 'Hanya Lihat (Read-Only)';
    }
  }
  if (UI.btnOpenAddArtModal) {
    UI.btnOpenAddArtModal.classList.toggle('hidden', !isAdmin);
  }
  if (UI.btnDeleteAllArtMonth) {
    UI.btnDeleteAllArtMonth.classList.toggle('hidden', !isAdmin);
  }
  if (UI.btnArtDeleteSelected) {
    UI.btnArtDeleteSelected.classList.toggle('hidden', !isAdmin);
  }
  if (UI.artThSelectAll) {
    UI.artThSelectAll.classList.toggle('hidden', !isAdmin);
  }
  if (UI.artBatchBar && !isAdmin) {
    UI.artBatchBar.classList.add('hidden');
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

  // Typing test admin leaderboard visibility
  if (typeof renderAdminTypingLeaderboard === 'function') {
    renderAdminTypingLeaderboard();
  }

  // Quiz permission and user visibility controls
  const quizPermissionBanner = document.getElementById('quizPermissionBanner');
  const quizBannerRoleLabel = document.getElementById('quizBannerRoleLabel');
  const quizBannerRoleDesc = document.getElementById('quizBannerRoleDesc');
  const quizBannerBadgePrivilege = document.getElementById('quizBannerBadgePrivilege');
  const btnTabQuizAdminBank = document.getElementById('btnTabQuizAdminBank');
  const btnOpenAddQuestionModal = document.getElementById('btnOpenAddQuestionModal');
  const quizTitleThemeSuffix = document.getElementById('quizTitleThemeSuffix');
  const quizPageDesc = document.getElementById('quizPageDesc');

  // Suffix ": Ultraman Iconnet vs Monster" hidden pada user & admin
  if (quizTitleThemeSuffix) {
    quizTitleThemeSuffix.classList.add('hidden');
  }

  // Deskripsi kuis bertema hidden pada user & admin
  if (quizPageDesc) {
    quizPageDesc.classList.add('hidden');
  }

  // Tab "Kelola Bank Soal" hidden pada user
  if (btnTabQuizAdminBank) {
    btnTabQuizAdminBank.classList.toggle('hidden', !isAdmin);
  }
  if (btnOpenAddQuestionModal) {
    btnOpenAddQuestionModal.classList.toggle('hidden', !isAdmin);
  }

  // Banner status "Otoritas Akses Kuis..." hidden pada user & admin
  if (quizPermissionBanner) {
    quizPermissionBanner.classList.add('hidden');
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
    'update-pa': 'Update PA (Productivity & Activity)',
    ca: 'Evaluasi Penilaian Mutu (CA)',
    tiket: 'Manajemen & Pelacakan Tiket',
    aht: 'Average Handling Time (AHT)',
    art: 'Average Response Time (ART)',
    finding: 'Rekapitulasi Temuan Audit QA (Finding)',
    'data-management': 'Kelola Data Barang',
    timer: 'Pusat Timer & Stopwatch',
    'typing-test': 'Typing Test (Speed Racer 60s)',
    quiz: 'Quiz',
    'user-management': 'Manajemen Team',
    'activity-log': 'Log Aktivitas & Jejak Audit',
    settings: 'Profil Akun'
  };
  UI.breadcrumbTitle.textContent = pageTitles[pageId] || 'Dashboard';

  // Toggle page visibility
  Object.keys(UI.pages).forEach(key => {
    if (key === pageId) {
      if (UI.pages[key]) UI.pages[key].classList.add('active');
    } else {
      if (UI.pages[key]) UI.pages[key].classList.remove('active');
    }
  });

  // Close mobile sidebar if open
  closeMobileSidebar();

  // Trigger page-specific renders
  if (pageId === 'overview') {
    renderOverviewPage();
  } else if (pageId === 'update-pa') {
    renderUpdatePaPage();
  } else if (pageId === 'ca') {
    renderCaPage();
  } else if (pageId === 'tiket') {
    renderTiketPage();
  } else if (pageId === 'aht') {
    renderAhtPage();
  } else if (pageId === 'art') {
    renderArtPage();
  } else if (pageId === 'finding') {
    renderFindingPage();
  } else if (pageId === 'data-management') {
    renderDataTable();
  } else if (pageId === 'timer') {
    renderTimerPage();
  } else if (pageId === 'typing-test') {
    renderTypingTestPage();
  } else if (pageId === 'quiz') {
    renderQuizPage();
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
  } else if (type === 'pa') {
    const logs = state.getPaLogs().filter(p => p.id !== id);
    state.savePaLogs(logs);
    state.addLog('DELETE_PA', 'Hapus Update PA', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus entri Update PA: ${name}.`);
    showToast('Log PA Dihapus', `Catatan Update PA berhasil dihapus.`, 'danger');
    renderUpdatePaPage();
  } else if (type === 'ca') {
    const logs = state.getCaLogs().filter(p => p.id !== id);
    state.saveCaLogs(logs);
    if (state.selectedCaIds) state.selectedCaIds.delete(id);
    autoSyncCaAction('delete', { id });
    state.addLog('DELETE_CA', 'Hapus Nilai CA', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus evaluasi CA: ${name}.`);
    showToast('Evaluasi CA Dihapus', `Data penilaian mutu CA berhasil dihapus.`, 'danger');
    renderCaPage();
  } else if (type === 'ca_month') {
    const month = id;
    const oldLogs = state.getCaLogs();
    const countBefore = oldLogs.filter(l => (l.date || '').startsWith(month)).length;
    const remainingLogs = oldLogs.filter(l => !(l.date || '').startsWith(month));
    state.saveCaLogs(remainingLogs);
    if (state.selectedCaIds) state.selectedCaIds.clear();
    autoSyncCaAction('delete_month', { month });
    state.addLog('DELETE_CA_MONTH', 'Hapus Data CA Bulanan', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus seluruh data CA periode ${name} (${countBefore} catatan).`);
    showToast('Data Bulan Ini Dihapus', `Seluruh <strong>${countBefore} data evaluasi CA</strong> periode <strong>${name}</strong> berhasil dihapus.`, 'danger');
    renderCaPage();
  } else if (type === 'ca_batch') {
    const idsToDelete = state.pendingDelete.ids || [];
    const oldLogs = state.getCaLogs();
    const remainingLogs = oldLogs.filter(l => !idsToDelete.includes(l.id));
    state.saveCaLogs(remainingLogs);
    if (state.selectedCaIds) state.selectedCaIds.clear();
    autoSyncCaAction('delete_batch', { ids: idsToDelete });
    state.addLog('DELETE_CA_BATCH', 'Hapus Data CA Ditandai', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus ${idsToDelete.length} data evaluasi CA yang ditandai.`);
    showToast('Data Ditandai Dihapus', `Sebanyak <strong>${idsToDelete.length} data evaluasi</strong> berhasil dihapus.`, 'danger');
    renderCaPage();
  } else if (type === 'tiket') {
    const tikets = state.getTikets().filter(t => t.id !== id);
    state.saveTikets(tikets);
    if (state.selectedTiketIds) state.selectedTiketIds.delete(id);
    autoSyncTiketAction('delete', { id });
    state.addLog('DELETE_TIKET', 'Hapus Perolehan Tiket', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus nilai tiket harian: ${name}.`);
    showToast('Perolehan Tiket Dihapus', `Data perolehan tiket harian berhasil dihapus.`, 'danger');
    renderTiketPage();
  } else if (type === 'tiket_month') {
    const month = id;
    const oldLogs = state.getTikets();
    const countBefore = oldLogs.filter(l => (l.date || '').startsWith(month)).length;
    const remainingLogs = oldLogs.filter(l => !(l.date || '').startsWith(month));
    state.saveTikets(remainingLogs);
    if (state.selectedTiketIds) state.selectedTiketIds.clear();
    autoSyncTiketAction('delete_month', { month });
    state.addLog('DELETE_TIKET_MONTH', 'Hapus Perolehan Tiket Bulanan', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus seluruh nilai tiket periode ${name} (${countBefore} catatan).`);
    showToast('Data Bulan Ini Dihapus', `Seluruh <strong>${countBefore} data perolehan tiket</strong> periode <strong>${name}</strong> berhasil dihapus.`, 'danger');
    renderTiketPage();
  } else if (type === 'tiket_batch') {
    const idsToDelete = state.pendingDelete.ids || [];
    const oldLogs = state.getTikets();
    const remainingLogs = oldLogs.filter(l => !idsToDelete.includes(l.id));
    state.saveTikets(remainingLogs);
    if (state.selectedTiketIds) state.selectedTiketIds.clear();
    autoSyncTiketAction('delete_batch', { ids: idsToDelete });
    state.addLog('DELETE_TIKET_BATCH', 'Hapus Data Tiket Ditandai', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus ${idsToDelete.length} data nilai tiket yang ditandai.`);
    showToast('Data Ditandai Dihapus', `Sebanyak <strong>${idsToDelete.length} data perolehan tiket</strong> berhasil dihapus.`, 'danger');
    renderTiketPage();
  } else if (type === 'aht') {
    const ahtLogs = state.getAhtLogs().filter(t => t.id !== id);
    state.saveAhtLogs(ahtLogs);
    if (state.selectedAhtIds) state.selectedAhtIds.delete(id);
    autoSyncAhtAction('delete', { id });
    state.addLog('DELETE_AHT', 'Hapus Handling Time', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus catatan handling time harian: ${name}.`);
    showToast('Handling Time Dihapus', `Data handling time harian berhasil dihapus.`, 'danger');
    renderAhtPage();
  } else if (type === 'aht_month') {
    const month = id;
    const oldLogs = state.getAhtLogs();
    const countBefore = oldLogs.filter(l => (l.date || '').startsWith(month)).length;
    const remainingLogs = oldLogs.filter(l => !(l.date || '').startsWith(month));
    state.saveAhtLogs(remainingLogs);
    if (state.selectedAhtIds) state.selectedAhtIds.clear();
    autoSyncAhtAction('delete_month', { month });
    state.addLog('DELETE_AHT_MONTH', 'Hapus AHT Bulanan', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus seluruh data handling time periode ${name} (${countBefore} catatan).`);
    showToast('Data Bulan Ini Dihapus', `Seluruh <strong>${countBefore} data handling time</strong> periode <strong>${name}</strong> berhasil dihapus.`, 'danger');
    renderAhtPage();
  } else if (type === 'aht_batch') {
    const idsToDelete = state.pendingDelete.ids || [];
    const oldLogs = state.getAhtLogs();
    const remainingLogs = oldLogs.filter(l => !idsToDelete.includes(l.id));
    state.saveAhtLogs(remainingLogs);
    if (state.selectedAhtIds) state.selectedAhtIds.clear();
    autoSyncAhtAction('delete_batch', { ids: idsToDelete });
    state.addLog('DELETE_AHT_BATCH', 'Hapus AHT Ditandai', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus ${idsToDelete.length} data handling time yang ditandai.`);
    showToast('Data Ditandai Dihapus', `Sebanyak <strong>${idsToDelete.length} data handling time</strong> berhasil dihapus.`, 'danger');
    renderAhtPage();
  } else if (type === 'art') {
    const artLogs = state.getArtLogs().filter(t => t.id !== id);
    state.saveArtLogs(artLogs);
    if (state.selectedArtIds) state.selectedArtIds.delete(id);
    autoSyncArtAction('delete', { id });
    state.addLog('DELETE_ART', 'Hapus Response Time', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus catatan response time harian: ${name}.`);
    showToast('Response Time Dihapus', `Data response time harian berhasil dihapus.`, 'danger');
    renderArtPage();
  } else if (type === 'art_month') {
    const month = id;
    const oldLogs = state.getArtLogs();
    const countBefore = oldLogs.filter(l => (l.date || '').startsWith(month)).length;
    const remainingLogs = oldLogs.filter(l => !(l.date || '').startsWith(month));
    state.saveArtLogs(remainingLogs);
    if (state.selectedArtIds) state.selectedArtIds.clear();
    autoSyncArtAction('delete_month', { month });
    state.addLog('DELETE_ART_MONTH', 'Hapus ART Bulanan', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus seluruh data response time periode ${name} (${countBefore} catatan).`);
    showToast('Data Bulan Ini Dihapus', `Seluruh <strong>${countBefore} data response time</strong> periode <strong>${name}</strong> berhasil dihapus.`, 'danger');
    renderArtPage();
  } else if (type === 'art_batch') {
    const idsToDelete = state.pendingDelete.ids || [];
    const oldLogs = state.getArtLogs();
    const remainingLogs = oldLogs.filter(l => !idsToDelete.includes(l.id));
    state.saveArtLogs(remainingLogs);
    if (state.selectedArtIds) state.selectedArtIds.clear();
    autoSyncArtAction('delete_batch', { ids: idsToDelete });
    state.addLog('DELETE_ART_BATCH', 'Hapus ART Ditandai', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus ${idsToDelete.length} data response time yang ditandai.`);
    showToast('Data Ditandai Dihapus', `Sebanyak <strong>${idsToDelete.length} data response time</strong> berhasil dihapus.`, 'danger');
    renderArtPage();
  } else if (type === 'finding') {
    const findings = state.getFindings().filter(f => f.id !== id);
    state.saveFindings(findings);
    if (state.selectedFindingIds) state.selectedFindingIds.delete(id);
    autoSyncFindingAction('delete', { id });
    state.addLog('DELETE_FINDING', 'Hapus Temuan QA', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus temuan audit QA: ${name}.`);
    showToast('Temuan Dihapus', `Data temuan audit QA berhasil dihapus.`, 'danger');
    renderFindingPage();
  } else if (type === 'finding_month') {
    const monthKey = id;
    const allFindings = state.getFindings();
    const countBefore = allFindings.filter(f => (f.date || '').startsWith(monthKey)).length;
    const remaining = allFindings.filter(f => !(f.date || '').startsWith(monthKey));
    state.saveFindings(remaining);
    if (state.selectedFindingIds) state.selectedFindingIds.clear();
    autoSyncFindingAction('delete_month', { month: monthKey });
    state.addLog('DELETE_FINDING_MONTH', 'Hapus Temuan Bulanan', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus seluruh data temuan QA periode ${name} (${countBefore} data).`);
    showToast('Data Bulan Ini Dihapus', `Seluruh <strong>${countBefore} data temuan QA</strong> periode <strong>${name}</strong> berhasil dihapus.`, 'danger');
    renderFindingPage();
  } else if (type === 'finding_batch') {
    const idsToDelete = state.pendingDelete.ids || [];
    const oldFindings = state.getFindings();
    const remaining = oldFindings.filter(f => !idsToDelete.includes(f.id));
    state.saveFindings(remaining);
    if (state.selectedFindingIds) state.selectedFindingIds.clear();
    autoSyncFindingAction('delete_batch', { ids: idsToDelete });
    state.addLog('DELETE_FINDING_BATCH', 'Hapus Temuan Ditandai', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus ${idsToDelete.length} data temuan QA yang ditandai.`);
    showToast('Data Ditandai Dihapus', `Sebanyak <strong>${idsToDelete.length} data temuan QA</strong> berhasil dihapus.`, 'danger');
    renderFindingPage();
  } else if (type === 'quiz_question') {
    const questions = state.getQuizQuestions().filter(q => q.id !== id);
    state.saveQuizQuestions(questions);
    if (typeof quizState !== 'undefined' && quizState.selectedQuestionIds) {
      quizState.selectedQuestionIds.delete(id);
    }
    state.addLog('DELETE_QUIZ_QUESTION', 'Hapus Soal Kuis', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus soal kuis: ${name}.`);
    showToast('Soal Kuis Dihapus', `Soal kuis <strong>${name}</strong> berhasil dihapus.`, 'danger');
    if (typeof renderQuizAdminQuestions === 'function') renderQuizAdminQuestions();
    if (typeof quizState !== 'undefined' && quizState.activeTab === 'battle' && typeof startQuizBattle === 'function') {
      startQuizBattle();
    }
  } else if (type === 'quiz_batch') {
    const idsToDelete = state.pendingDelete.ids || [];
    const questions = state.getQuizQuestions();
    const remaining = questions.filter(q => !idsToDelete.includes(q.id));
    state.saveQuizQuestions(remaining);
    if (typeof quizState !== 'undefined' && quizState.selectedQuestionIds) {
      idsToDelete.forEach(qId => quizState.selectedQuestionIds.delete(qId));
    }
    state.addLog('DELETE_QUIZ_BATCH', 'Hapus Soal Kuis Ditandai', `${state.currentUser.fullName} (${state.currentUser.role.toUpperCase()}) menghapus ${idsToDelete.length} soal kuis yang ditandai.`);
    showToast('Soal Ditandai Dihapus', `Sebanyak <strong>${idsToDelete.length} soal kuis yang ditandai</strong> berhasil dihapus secara permanen.`, 'danger');
    if (typeof renderQuizAdminQuestions === 'function') renderQuizAdminQuestions();
    if (typeof quizState !== 'undefined' && quizState.activeTab === 'battle' && typeof startQuizBattle === 'function') {
      startQuizBattle();
    }
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
  const userDept = (state.currentUser.department || '').trim();
  const validTimerCats = [
    'CSO INBOUND',
    'CSO DIGILIVE CHAT - DM',
    'CSO DIGILIVE CHAT - MY ICON+',
    'CSO DIGILIVE CHAT - WA',
    'CSO BACK OFFICE',
    'CSO OUTBOUND',
    'CSO EMAIL'
  ];
  if (UI.formTimerCategory) {
    UI.formTimerCategory.value = validTimerCats.includes(userDept) ? userDept : 'CSO INBOUND';
  }
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
  const validTimerCats = [
    'CSO INBOUND',
    'CSO DIGILIVE CHAT - DM',
    'CSO DIGILIVE CHAT - MY ICON+',
    'CSO DIGILIVE CHAT - WA',
    'CSO BACK OFFICE',
    'CSO OUTBOUND',
    'CSO EMAIL'
  ];
  UI.formTimerCategory.value = validTimerCats.includes(timer.category) ? timer.category : 'CSO INBOUND';
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
  const userDept = (state.currentUser.department || '').trim();
  const validDepts = [
    'CSO INBOUND',
    'CSO DIGILIVE CHAT - DM',
    'CSO DIGILIVE CHAT - MY ICON+',
    'CSO DIGILIVE CHAT - WA',
    'CSO BACK OFFICE',
    'CSO OUTBOUND',
    'CSO EMAIL'
  ];
  if (UI.formStopwatchDept) {
    UI.formStopwatchDept.value = validDepts.includes(userDept) ? userDept : 'CSO INBOUND';
  }
  UI.modalStopwatchForm.classList.remove('hidden');
}

function closeStopwatchModal() {
  UI.modalStopwatchForm.classList.add('hidden');
}

function handleSaveStopwatch(e) {
  e.preventDefault();
  if (!state.currentUser) return;

  const name = UI.formStopwatchName.value.trim();
  const dept = (UI.formStopwatchDept ? UI.formStopwatchDept.value.trim() : '') || 'CSO INBOUND';
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
    dept: dept,
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
// 12.5 UPDATE PA (PRODUCTIVITY & ACTIVITY)
// ==========================================

function renderUpdatePaPage() {
  const logs = state.getPaLogs();
  const u = state.currentUser;
  const isAdmin = state.isAdmin();

  // Search & Filters
  const query = (UI.searchPaInput ? UI.searchPaInput.value : '').toLowerCase().trim();
  const filterService = UI.filterPaService ? UI.filterPaService.value : 'ALL';
  const filterShift = UI.filterPaShift ? UI.filterPaShift.value : 'ALL';
  const filterCategory = UI.filterPaCategory ? UI.filterPaCategory.value : 'ALL';
  const filterStatus = UI.filterPaStatus ? UI.filterPaStatus.value : 'ALL';

  if (UI.btnClearSearchPa) {
    UI.btnClearSearchPa.classList.toggle('hidden', !query);
  }

  const filteredLogs = logs.filter(item => {
    // Search query match
    if (query) {
      const matchName = (item.userFullName || '').toLowerCase().includes(query);
      const matchDept = (item.department || '').toLowerCase().includes(query);
      const matchCat = (item.activityCategory || '').toLowerCase().includes(query);
      const matchShift = (item.shift || '').toLowerCase().includes(query);
      const matchNotes = (item.notes || '').toLowerCase().includes(query);
      if (!matchName && !matchDept && !matchCat && !matchShift && !matchNotes) {
        return false;
      }
    }

    // Service match
    if (filterService !== 'ALL' && item.department !== filterService) {
      return false;
    }

    // Shift match
    if (filterShift !== 'ALL' && !item.shift.includes(filterShift)) {
      return false;
    }

    // Category match
    if (filterCategory !== 'ALL' && !item.activityCategory.includes(filterCategory)) {
      return false;
    }

    // Status match
    if (filterStatus !== 'ALL' && item.status !== filterStatus) {
      return false;
    }

    return true;
  });

  // Calculate Metrics based on relevant logs (for user: their own logs; for admin: all logs)
  const metricBaseLogs = isAdmin ? filteredLogs : filteredLogs.filter(l => l.userId === u?.id);
  const effectiveLogs = metricBaseLogs.length > 0 ? metricBaseLogs : filteredLogs;

  let totalInteractions = 0;
  let targetTotal = 0;
  let productiveMins = 0;
  let auxMins = 0;

  effectiveLogs.forEach(l => {
    const inter = Number(l.interactionCount) || 0;
    const targ = Number(l.targetCount) || 0;
    const dur = Number(l.durationMinutes) || 0;

    totalInteractions += inter;
    targetTotal += targ;

    if ((l.activityCategory || '').startsWith('READY') || !(l.activityCategory || '').startsWith('AUX')) {
      productiveMins += dur;
    } else {
      auxMins += dur;
    }
  });

  if (UI.paStatTotalInteractions) {
    UI.paStatTotalInteractions.textContent = totalInteractions.toLocaleString('id-ID');
  }
  if (UI.paStatProductiveHours) {
    UI.paStatProductiveHours.textContent = `${(productiveMins / 60).toFixed(1)} Jam`;
  }
  if (UI.paStatAuxMinutes) {
    UI.paStatAuxMinutes.textContent = `${auxMins} Menit`;
  }
  if (UI.paStatScore) {
    if (targetTotal > 0) {
      const pct = Math.min(100, Math.round((totalInteractions / targetTotal) * 100));
      UI.paStatScore.textContent = `${pct}%`;
    } else if (totalInteractions > 0) {
      UI.paStatScore.textContent = '100%';
    } else {
      UI.paStatScore.textContent = '96.5%';
    }
  }

  // Render Table
  if (!UI.paTableBody) return;
  UI.paTableBody.innerHTML = '';

  if (filteredLogs.length === 0) {
    if (UI.paTableEmpty) UI.paTableEmpty.classList.remove('hidden');
    return;
  }
  if (UI.paTableEmpty) UI.paTableEmpty.classList.add('hidden');

  filteredLogs.forEach(item => {
    const tr = document.createElement('tr');

    // Category Badge
    let catBadgeClass = 'badge-gray';
    let catIcon = 'fa-solid fa-list-check';
    const cat = item.activityCategory || '';
    if (cat.startsWith('READY')) {
      catBadgeClass = 'badge-green';
      catIcon = 'fa-solid fa-headset';
    } else if (cat.startsWith('AUX 1')) {
      catBadgeClass = 'badge-yellow';
      catIcon = 'fa-solid fa-utensils';
    } else if (cat.startsWith('AUX 2')) {
      catBadgeClass = 'badge-gray';
      catIcon = 'fa-solid fa-restroom';
    } else if (cat.startsWith('AUX 3')) {
      catBadgeClass = 'badge-blue';
      catIcon = 'fa-solid fa-mosque';
    } else if (cat.startsWith('AUX 4')) {
      catBadgeClass = 'badge-purple';
      catIcon = 'fa-solid fa-chalkboard-user';
    } else if (cat.startsWith('AUX 5')) {
      catBadgeClass = 'badge-red';
      catIcon = 'fa-solid fa-ticket';
    } else if (cat.startsWith('AUX 6')) {
      catBadgeClass = 'badge-blue';
      catIcon = 'fa-solid fa-graduation-cap';
    }

    // Status Badge
    let statusBadgeClass = 'badge-gray';
    let statusIcon = 'fa-regular fa-clock';
    if (item.status === 'Terverifikasi') {
      statusBadgeClass = 'badge-green';
      statusIcon = 'fa-solid fa-circle-check';
    } else if (item.status === 'Selesai') {
      statusBadgeClass = 'badge-blue';
      statusIcon = 'fa-solid fa-check';
    } else if (item.status === 'Menunggu Review') {
      statusBadgeClass = 'badge-yellow';
      statusIcon = 'fa-solid fa-hourglass-half';
    }

    const isOwnEntry = u && (item.userId === u.id || item.username === u.username);
    const canModify = isAdmin || isOwnEntry;

    let actionsHtml = `
      <div class="table-actions-cell" style="display:flex; justify-content:center; gap: 4px;">
        <button type="button" class="btn-table-action btn-action-view" onclick="openPaDetail('${item.id}')" title="Lihat Rincian PA">
          <i class="fa-regular fa-eye"></i>
        </button>
    `;

    if (canModify) {
      actionsHtml += `
        <button type="button" class="btn-table-action btn-action-edit" onclick="promptEditPa('${item.id}')" title="Edit Update PA">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button type="button" class="btn-table-action btn-action-delete" onclick="promptDeletePa('${item.id}', '${(item.activityCategory || '').replace(/'/g, "\\'")}')" title="Hapus Catatan PA">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;
    }

    if (isAdmin && item.status !== 'Terverifikasi') {
      actionsHtml += `
        <button type="button" class="btn-table-action" style="color: var(--green-status); border-color: rgba(16,185,129,0.3);" onclick="approvePa('${item.id}')" title="Verifikasi / Setujui PA">
          <i class="fa-solid fa-check-double"></i>
        </button>
      `;
    }

    actionsHtml += `</div>`;

    tr.innerHTML = `
      <td>
        <div style="font-weight: 600; color: #ffffff;">${item.date}</div>
        <small class="text-muted">${item.createdAt ? item.createdAt.split(' ')[1] || '' : ''} WIB</small>
      </td>
      <td>
        <div class="user-cell-flex">
          <img src="${item.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" alt="${item.userFullName}" class="table-user-avatar">
          <div>
            <div style="font-weight: 600; color: #ffffff;">${item.userFullName}</div>
            <small class="text-muted">@${item.username || 'cso'}</small>
          </div>
        </div>
      </td>
      <td>
        <span class="badge badge-gray" style="font-size:0.75rem;">
          <i class="fa-solid fa-headset text-red" style="margin-right: 4px;"></i>${item.department || 'CSO INBOUND'}
        </span>
      </td>
      <td>
        <span style="font-size: 0.8rem; color: var(--gray-300);">${item.shift || 'Shift Pagi'}</span>
      </td>
      <td>
        <span class="badge ${catBadgeClass}" style="font-size:0.75rem;">
          <i class="${catIcon}" style="margin-right: 4px;"></i>${item.activityCategory}
        </span>
        ${item.notes ? `<div style="font-size: 0.72rem; color: var(--gray-400); margin-top: 3px; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.notes.replace(/"/g, '&quot;')}">${item.notes}</div>` : ''}
      </td>
      <td style="text-align: right; font-weight: 700; color: #ffffff;">
        ${Number(item.interactionCount) > 0 ? `<span class="text-red font-mono">${item.interactionCount}</span>` : '<span class="text-muted">-</span>'}
      </td>
      <td style="text-align: right; font-weight: 600; color: var(--gray-300);">
        ${item.durationMinutes || 0} m
      </td>
      <td>
        <span class="badge ${statusBadgeClass}" style="font-size:0.72rem;">
          <i class="${statusIcon}" style="margin-right: 3px;"></i>${item.status}
        </span>
      </td>
      <td>${actionsHtml}</td>
    `;

    UI.paTableBody.appendChild(tr);
  });
}

function openAddPaModal() {
  const u = state.currentUser;
  if (!u) return;

  UI.formPa.reset();
  UI.formPaId.value = '';
  UI.modalPaTitle.textContent = 'Catat Update PA Baru';
  UI.modalPaSubtitle.textContent = 'Input rincian aktivitas shift, layanan CSO, dan produktivitas harian';
  UI.btnSubmitPaText.textContent = 'Simpan Update PA';

  const todayStr = new Date().toISOString().slice(0, 10);
  UI.formPaDate.value = todayStr;
  UI.formPaUser.value = u.fullName;
  UI.formPaDept.value = u.department || 'CSO INBOUND';
  UI.formPaShift.value = 'Shift Pagi (07:00 - 15:00)';
  UI.formPaCategory.value = 'READY / HANDLING CHAT';
  UI.formPaInteractions.value = '0';
  UI.formPaTarget.value = '40';
  UI.formPaDuration.value = '60';
  UI.formPaStatusVal.value = 'Selesai';
  UI.formPaNotes.value = '';

  UI.modalPaForm.classList.remove('hidden');
}

function openEditPaModal(entry) {
  UI.formPaId.value = entry.id;
  UI.modalPaTitle.textContent = 'Edit Catatan Update PA';
  UI.modalPaSubtitle.textContent = 'Perbarui data durasi, status aktivitas, dan capaian interaksi';
  UI.btnSubmitPaText.textContent = 'Simpan Perubahan';

  UI.formPaDate.value = entry.date;
  UI.formPaUser.value = entry.userFullName;
  UI.formPaDept.value = entry.department || 'CSO INBOUND';
  UI.formPaShift.value = entry.shift;
  UI.formPaCategory.value = entry.activityCategory;
  UI.formPaInteractions.value = entry.interactionCount || 0;
  UI.formPaTarget.value = entry.targetCount || 0;
  UI.formPaDuration.value = entry.durationMinutes || 60;
  UI.formPaStatusVal.value = entry.status;
  UI.formPaNotes.value = entry.notes || '';

  UI.modalPaForm.classList.remove('hidden');
}

function closePaModal() {
  if (UI.modalPaForm) UI.modalPaForm.classList.add('hidden');
}

function closePaDetailModal() {
  if (UI.modalPaDetail) UI.modalPaDetail.classList.add('hidden');
}

function handleSavePa(e) {
  e.preventDefault();
  const u = state.currentUser;
  if (!u) return;

  const id = UI.formPaId.value;
  const date = UI.formPaDate.value;
  const shift = UI.formPaShift.value;
  const department = UI.formPaDept.value;
  const activityCategory = UI.formPaCategory.value;
  const interactionCount = parseInt(UI.formPaInteractions.value, 10) || 0;
  const targetCount = parseInt(UI.formPaTarget.value, 10) || 0;
  const durationMinutes = parseInt(UI.formPaDuration.value, 10) || 1;
  const status = UI.formPaStatusVal.value;
  const notes = UI.formPaNotes.value.trim();

  if (!date) {
    showToast('Form Belum Lengkap', 'Tanggal aktivitas wajib diisi.', 'warning');
    return;
  }

  const logs = state.getPaLogs();
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const nowStr = `${date} ${timeStr}`;

  if (id) {
    // EDIT
    const existingIndex = logs.findIndex(p => p.id === id);
    if (existingIndex !== -1) {
      logs[existingIndex] = {
        ...logs[existingIndex],
        date,
        shift,
        department,
        activityCategory,
        interactionCount,
        targetCount,
        durationMinutes,
        status,
        notes
      };
      state.savePaLogs(logs);
      state.addLog('UPDATE_PA', 'Edit Update PA', `${u.fullName} memperbarui catatan PA: ${activityCategory} (${date}).`);
      showToast('PA Diperbarui', 'Data catatan Update PA berhasil diperbarui.', 'success');
    }
  } else {
    // ADD NEW
    const newEntry = {
      id: 'pa_' + Date.now(),
      userId: u.id,
      username: u.username,
      userFullName: u.fullName,
      userAvatar: u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department,
      date,
      shift,
      activityCategory,
      interactionCount,
      targetCount,
      durationMinutes,
      notes,
      status,
      createdAt: nowStr
    };
    logs.unshift(newEntry);
    state.savePaLogs(logs);
    state.addLog('CREATE_PA', 'Tambah Update PA', `${u.fullName} menambahkan catatan Update PA baru: ${activityCategory} (${date}).`);
    showToast('Update PA Berhasil Disimpan', `Aktivitas <strong>${activityCategory}</strong> berhasil dicatat.`, 'success');
  }

  closePaModal();
  renderUpdatePaPage();
}

window.openPaDetail = function(id) {
  const logs = state.getPaLogs();
  const entry = logs.find(p => p.id === id);
  if (!entry) return;
  
  if (UI.paDetailAvatar) UI.paDetailAvatar.src = entry.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  if (UI.paDetailUserName) UI.paDetailUserName.textContent = entry.userFullName;
  if (UI.paDetailDept) UI.paDetailDept.textContent = entry.department;
  if (UI.paDetailStatusBadge) {
    UI.paDetailStatusBadge.className = entry.status === 'Terverifikasi' ? 'badge badge-green' : (entry.status === 'Selesai' ? 'badge badge-blue' : 'badge badge-yellow');
    UI.paDetailStatusBadge.textContent = entry.status;
  }
  if (UI.paDetailDate) UI.paDetailDate.textContent = entry.date;
  if (UI.paDetailShift) UI.paDetailShift.textContent = entry.shift;
  if (UI.paDetailInteractions) UI.paDetailInteractions.textContent = `${entry.interactionCount || 0} Tiket / Chat (Target: ${entry.targetCount || 0})`;
  if (UI.paDetailDuration) UI.paDetailDuration.textContent = `${entry.durationMinutes || 0} Menit (${(entry.durationMinutes / 60).toFixed(1)} Jam)`;
  if (UI.paDetailCategory) UI.paDetailCategory.textContent = entry.activityCategory;
  if (UI.paDetailNotes) UI.paDetailNotes.textContent = entry.notes || '-';
  if (UI.paDetailCreatedAt) UI.paDetailCreatedAt.textContent = entry.createdAt || '-';

  if (UI.modalPaDetail) UI.modalPaDetail.classList.remove('hidden');
};

window.promptEditPa = function(id) {
  const logs = state.getPaLogs();
  const entry = logs.find(p => p.id === id);
  if (!entry) return;
  if (!state.isAdmin() && entry.userId !== state.currentUser?.id) {
    showToast('Akses Ditolak', 'Anda hanya dapat mengedit catatan Update PA milik Anda sendiri.', 'warning');
    return;
  }
  openEditPaModal(entry);
};

window.promptDeletePa = function(id, title) {
  const logs = state.getPaLogs();
  const entry = logs.find(p => p.id === id);
  if (!entry) return;
  if (!state.isAdmin() && entry.userId !== state.currentUser?.id) {
    showToast('Akses Ditolak', 'Anda hanya dapat menghapus catatan Update PA milik Anda sendiri.', 'warning');
    return;
  }
  state.pendingDelete = { type: 'pa', id, name: `${entry.activityCategory} (${entry.date})` };
  UI.confirmDeleteTitle.textContent = 'Hapus Catatan PA?';
  UI.confirmDeleteMessage.innerHTML = `Catatan Update PA <strong>${entry.activityCategory}</strong> pada tanggal <strong>${entry.date}</strong> akan dihapus permanen.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.approvePa = function(id) {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator / Team Leader yang dapat memverifikasi status PA.', 'warning');
    return;
  }
  const logs = state.getPaLogs();
  const entry = logs.find(p => p.id === id);
  if (!entry) return;
  entry.status = 'Terverifikasi';
  state.savePaLogs(logs);
  state.addLog('VERIFY_PA', 'Verifikasi PA', `Admin ${state.currentUser.fullName} memverifikasi catatan PA milik ${entry.userFullName}.`);
  showToast('PA Terverifikasi', `Catatan PA milik <strong>${entry.userFullName}</strong> telah disetujui & terverifikasi.`, 'success');
  renderUpdatePaPage();
};

function exportPaCSV() {
  const logs = state.getPaLogs();
  if (logs.length === 0) {
    showToast('Data Kosong', 'Tidak ada riwayat Update PA untuk diekspor.', 'warning');
    return;
  }
  const headers = ['ID', 'Tanggal', 'Nama Petugas', 'Layanan CSO', 'Shift', 'Kategori Aktivitas', 'Interaksi Selesai', 'Target', 'Durasi (Menit)', 'Status', 'Catatan'];
  const rows = logs.map(l => [
    `"${l.id}"`,
    `"${l.date}"`,
    `"${l.userFullName.replace(/"/g, '""')}"`,
    `"${l.department}"`,
    `"${l.shift}"`,
    `"${l.activityCategory}"`,
    l.interactionCount || 0,
    l.targetCount || 0,
    l.durationMinutes || 0,
    `"${l.status}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `DRIVE_Update_PA_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Ekspor Berhasil', 'File log Update PA format CSV berhasil diunduh.', 'success');
}

// ==========================================
// 12.5 CA (CUSTOMER ATTRIBUTES)
// ==========================================

function formatCaScore(val) {
  if (val === null || val === undefined || val === '') return '-';
  const num = parseFloat(val);
  if (isNaN(num)) return '-';
  return num.toFixed(2).replace('.', ',');
}

function renderCaPage() {
  const isAdmin = state.isAdmin();
  const currentUser = state.currentUser;
  const currentFullName = currentUser ? currentUser.fullName : '';

  const monthLabels = {
    '2026-09': 'September 2026',
    '2026-08': 'Agustus 2026',
    '2026-07': 'Juli 2026'
  };
  const selMonth = (UI.filterCaMonth ? UI.filterCaMonth.value : '2026-09') || '2026-09';
  const monthLabel = monthLabels[selMonth] || selMonth;
  if (UI.caMonthHeaderLabel) {
    UI.caMonthHeaderLabel.textContent = monthLabel;
  }

  const users = state.getUsers();
  const logs = state.getCaLogs();

  if (UI.caUserCountBadge) {
    UI.caUserCountBadge.textContent = `${users.length} User Terdaftar`;
  }

  // Update Google Spreadsheet Integration Status Bar
  renderCaGSheetBar();

  // Toggle Section 1 visibility based on role
  if (UI.caUserSummarySection) {
    UI.caUserSummarySection.classList.toggle('hidden', !isAdmin);
  }

  // Toggle 3 metric cards based on role
  if (UI.caCardTotalSamples) UI.caCardTotalSamples.classList.toggle('hidden', !isAdmin);
  if (UI.caCardTopUser) UI.caCardTopUser.classList.toggle('hidden', !isAdmin);
  if (UI.caCardCompliance) UI.caCardCompliance.classList.toggle('hidden', !isAdmin);

  // Populate or preserve user filter in logs table (Admin only)
  if (UI.filterCaUserSelect) {
    UI.filterCaUserSelect.classList.toggle('hidden', !isAdmin);
    if (isAdmin) {
      const curUserVal = UI.filterCaUserSelect.value || 'ALL';
      let userOpts = '<option value="ALL">Semua User</option>';
      users.forEach(u => {
        const isSel = (curUserVal === u.fullName);
        userOpts += `<option value="${u.fullName}" ${isSel ? 'selected' : ''}>${u.fullName} (${u.role.toUpperCase()})</option>`;
      });
      UI.filterCaUserSelect.innerHTML = userOpts;
    }
  }

  // Toggle header checkbox for table (Admin only)
  if (UI.caThSelectAll) {
    UI.caThSelectAll.classList.toggle('hidden', !isAdmin);
  }

  // Subtitle for Section 2
  if (UI.caDailySubtitle) {
    UI.caDailySubtitle.textContent = '';
    UI.caDailySubtitle.classList.add('hidden');
  }

  // Filter logs for the selected 1-month period
  const monthLogs = logs.filter(l => (l.date || '').startsWith(selMonth));

  // ========================================================
  // Section 1: Rekapitulasi Nilai Seluruh User dalam 1 Bulan (ADMIN ONLY)
  // ========================================================
  let userSummaries = [];
  if (isAdmin) {
    userSummaries = users.map(u => {
      const userLogs = monthLogs.filter(l => l.userFullName === u.fullName);
      const daysEvaluated = userLogs.length;
      let avgScore = 0;
      let minScore = 0;
      let maxScore = 0;
      let grade = 'Belum Ada Nilai';
      let gradeBadge = 'badge-gray';
      let passStatus = 'Belum Dinilai';
      let passBadge = 'badge-gray';
      let passIcon = 'fa-regular fa-clock';

      if (daysEvaluated > 0) {
        const scores = userLogs.map(l => Number(l.score) || 0);
        const sum = scores.reduce((acc, val) => acc + val, 0);
        avgScore = (sum / scores.length).toFixed(2);
        minScore = Math.min(...scores).toFixed(2);
        maxScore = Math.max(...scores).toFixed(2);
        const numAvg = parseFloat(avgScore);

        if (numAvg >= 95.00) {
          grade = 'Sangat Baik';
          gradeBadge = 'badge-green';
          passStatus = 'Lulus SOP';
          passBadge = 'badge-green';
          passIcon = 'fa-solid fa-check';
        } else if (numAvg >= 85.00) {
          grade = 'Baik';
          gradeBadge = 'badge-blue';
          passStatus = 'Lulus SOP';
          passBadge = 'badge-green';
          passIcon = 'fa-solid fa-check';
        } else {
          grade = 'Perlu Coaching';
          gradeBadge = 'badge-yellow';
          passStatus = 'Remedial SOP';
          passBadge = 'badge-yellow';
          passIcon = 'fa-solid fa-triangle-exclamation';
        }
      }

      return {
        user: u,
        daysEvaluated,
        avgScore,
        minScore,
        maxScore,
        grade,
        gradeBadge,
        passStatus,
        passBadge,
        passIcon
      };
    });

    // Sort summary by highest / lowest average score based on filterCaSummarySort
    const summarySort = (UI.filterCaSummarySort ? UI.filterCaSummarySort.value : 'DESC');
    if (summarySort === 'ASC') {
      userSummaries.sort((a, b) => {
        if (a.daysEvaluated === 0 && b.daysEvaluated > 0) return 1;
        if (b.daysEvaluated === 0 && a.daysEvaluated > 0) return -1;
        return (parseFloat(a.avgScore) || 0) - (parseFloat(b.avgScore) || 0);
      });
    } else {
      userSummaries.sort((a, b) => (parseFloat(b.avgScore) || 0) - (parseFloat(a.avgScore) || 0));
    }

    // Render Section 1 table
    if (UI.caUserSummaryBody) {
      UI.caUserSummaryBody.innerHTML = '';
      if (userSummaries.length === 0) {
        UI.caUserSummaryBody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--gray-400);">Tidak ada data pengguna terdaftar.</td></tr>';
      } else {
        userSummaries.forEach(summary => {
          const u = summary.user;
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>
              <div style="display:flex; align-items:center; gap: 10px;">
                <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" alt="${u.fullName}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:2px solid var(--border-color);">
                <div>
                  <strong style="color:#fff; font-size:0.875rem;">${u.fullName}</strong>
                  <div style="display:flex; align-items:center; gap:6px; margin-top:2px;">
                    <span class="badge ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}" style="font-size:0.65rem;">${u.role.toUpperCase()}</span>
                    <span style="font-size:0.75rem; color:var(--gray-400);">${u.email}</span>
                  </div>
                </div>
              </div>
            </td>
            <td><span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-headset text-red" style="margin-right:4px;"></i>${u.department || 'CSO Layanan'}</span></td>
            <td style="text-align: center;"><span class="font-mono font-bold" style="color:var(--gray-200);">${summary.daysEvaluated} Hari</span></td>
            <td style="text-align: right;"><strong class="text-red font-mono" style="font-size:1.05rem;">${summary.daysEvaluated > 0 ? formatCaScore(summary.avgScore) : '-'}</strong></td>
            <td><span class="badge ${summary.gradeBadge}" style="font-size:0.75rem;">${summary.grade}</span></td>
            <td style="text-align: center;"><span class="font-mono" style="font-size:0.8rem; color:var(--gray-300);">${summary.daysEvaluated > 0 ? formatCaScore(summary.minScore) + ' / ' + formatCaScore(summary.maxScore) : '-'}</span></td>
            <td style="text-align: center;"><span class="badge ${summary.passBadge}" style="font-size:0.75rem;"><i class="${summary.passIcon}" style="margin-right:4px;"></i>${summary.passStatus}</span></td>
            <td style="text-align: center;">
              <button class="btn btn-outline-gray btn-sm" onclick="filterCaByUser('${u.fullName.replace(/'/g, "\\'")}')" title="Filter Rincian Harian User Ini">
                <i class="fa-solid fa-filter text-red"></i>
                <span>Rincian</span>
              </button>
            </td>
          `;
          UI.caUserSummaryBody.appendChild(tr);
        });
      }
    }
  }

  // ========================================================
  // Monthly Overview Top Metric Cards (Decimal display without %)
  // ========================================================
  if (isAdmin) {
    let monthOverallAvg = '0.00';
    if (monthLogs.length > 0) {
      const totalScore = monthLogs.reduce((acc, l) => acc + (Number(l.score) || 0), 0);
      monthOverallAvg = (totalScore / monthLogs.length).toFixed(2);
    }
    if (UI.caStatAvgScore) UI.caStatAvgScore.textContent = formatCaScore(monthOverallAvg);
    if (UI.caStatAvgScoreLabel) UI.caStatAvgScoreLabel.textContent = 'Rata-rata Skor Bulan Ini';
    if (UI.caStatAvgScoreSubtext) UI.caStatAvgScoreSubtext.textContent = 'Rata-rata seluruh user di periode terpilih';

    if (UI.caStatTotalSamples) UI.caStatTotalSamples.textContent = `${monthLogs.length} Entri`;

    // User Skor Tertinggi: Top Performer strictly determined by HIGHEST average score in the month
    const evaluatedAll = users.map(u => {
      const uLogs = monthLogs.filter(l => l.userFullName === u.fullName);
      if (uLogs.length === 0) return null;
      const scores = uLogs.map(l => Number(l.score) || 0);
      const avg = scores.reduce((acc, val) => acc + val, 0) / scores.length;
      return { user: u, avgScore: avg, daysEvaluated: uLogs.length };
    }).filter(Boolean);

    evaluatedAll.sort((a, b) => b.avgScore - a.avgScore);

    if (evaluatedAll.length > 0) {
      const topUser = evaluatedAll[0];
      if (UI.caStatTopUser) UI.caStatTopUser.textContent = topUser.user.fullName;
      if (UI.caStatTopUserSub) {
        UI.caStatTopUserSub.textContent = `Rata-rata: ${formatCaScore(topUser.avgScore.toFixed(2))} (${topUser.daysEvaluated} hari dinilai)`;
      }
    } else {
      if (UI.caStatTopUser) UI.caStatTopUser.textContent = '-';
      if (UI.caStatTopUserSub) UI.caStatTopUserSub.textContent = 'Belum ada penilaian bulan ini';
    }

    if (UI.caStatCompliance) {
      const numAvg = parseFloat(monthOverallAvg);
      UI.caStatCompliance.textContent = numAvg >= 95.00 ? 'Optimal' : (numAvg >= 85.00 ? 'Baik' : 'Perlu Evaluasi');
    }
  } else {
    // User Mode: Strictly calculate score average for this one logged-in user
    const userMonthLogs = monthLogs.filter(l => l.userFullName === currentFullName);
    let userAvg = '0.00';
    if (userMonthLogs.length > 0) {
      const totalScore = userMonthLogs.reduce((acc, l) => acc + (Number(l.score) || 0), 0);
      userAvg = (totalScore / userMonthLogs.length).toFixed(2);
    }
    if (UI.caStatAvgScore) UI.caStatAvgScore.textContent = userMonthLogs.length > 0 ? formatCaScore(userAvg) : '-';
    if (UI.caStatAvgScoreLabel) UI.caStatAvgScoreLabel.textContent = 'Rata-rata Skor Bulan Ini';
    if (UI.caStatAvgScoreSubtext) {
      UI.caStatAvgScoreSubtext.textContent = userMonthLogs.length > 0
        ? `Rata-rata penilaian mutu Anda (${userMonthLogs.length} hari dinilai)`
        : 'Belum ada penilaian untuk Anda bulan ini';
    }
  }

  // ========================================================
  // Section 2: Log Penilaian Harian (Interval Input Per Hari)
  // ========================================================
  const searchQ = (UI.searchCaInput ? UI.searchCaInput.value.trim().toLowerCase() : '');
  const filterUser = isAdmin ? (UI.filterCaUserSelect ? UI.filterCaUserSelect.value : 'ALL') : currentFullName;
  const filterService = (UI.filterCaService ? UI.filterCaService.value : 'ALL');
  const filterGrade = (UI.filterCaGrade ? UI.filterCaGrade.value : 'ALL');

  if (UI.btnClearSearchCa) {
    UI.btnClearSearchCa.classList.toggle('hidden', !searchQ);
  }

  const filteredLogs = monthLogs.filter(item => {
    // Non-admin can strictly ONLY see their own logs
    if (!isAdmin && item.userFullName !== currentFullName) return false;

    if (searchQ) {
      const match = (item.userFullName || '').toLowerCase().includes(searchQ) ||
                    (item.date || '').toLowerCase().includes(searchQ) ||
                    (item.department || '').toLowerCase().includes(searchQ) ||
                    (item.channel || '').toLowerCase().includes(searchQ) ||
                    (item.focusParam || '').toLowerCase().includes(searchQ) ||
                    (item.notes || '').toLowerCase().includes(searchQ);
      if (!match) return false;
    }
    if (isAdmin && filterUser !== 'ALL' && item.userFullName !== filterUser) return false;
    if (filterService !== 'ALL' && item.department !== filterService) return false;
    if (filterGrade !== 'ALL' && item.grade !== filterGrade) return false;
    return true;
  });

  // Sort daily logs based on filterCaScoreSort (Nilai Tertinggi / Nilai Terendah / Tanggal Terbaru)
  const sortScoreOrder = (UI.filterCaScoreSort ? UI.filterCaScoreSort.value : 'DATE_DESC');
  if (sortScoreOrder === 'SCORE_DESC') {
    filteredLogs.sort((a, b) => (parseFloat(b.score) || 0) - (parseFloat(a.score) || 0));
  } else if (sortScoreOrder === 'SCORE_ASC') {
    filteredLogs.sort((a, b) => (parseFloat(a.score) || 0) - (parseFloat(b.score) || 0));
  } else {
    filteredLogs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  // Sync Header Checkbox and Batch Actions Bar (Admin only)
  if (isAdmin) {
    const visibleIds = filteredLogs.map(l => l.id);
    const selectedVisibleCount = visibleIds.filter(id => state.selectedCaIds.has(id)).length;

    if (UI.caSelectAllCheckbox) {
      UI.caSelectAllCheckbox.checked = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
      UI.caSelectAllCheckbox.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < visibleIds.length;
    }

    if (UI.caBatchBar) {
      const hasSelected = state.selectedCaIds.size > 0;
      UI.caBatchBar.classList.toggle('hidden', !hasSelected);
      if (UI.caSelectedCount) {
        UI.caSelectedCount.textContent = state.selectedCaIds.size;
      }
    }
  } else {
    state.selectedCaIds.clear();
    if (UI.caBatchBar) {
      UI.caBatchBar.classList.add('hidden');
    }
  }

  // Render Table
  if (!UI.caTableBody) return;
  UI.caTableBody.innerHTML = '';

  if (filteredLogs.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="${isAdmin ? 10 : 9}" style="text-align: center; padding: 36px; color: var(--gray-400);"><i class="fa-regular fa-folder-open" style="font-size:1.8rem; display:block; margin-bottom:8px; opacity:0.6;"></i>${isAdmin ? 'Tidak ada log penilaian harian yang sesuai dengan filter atau bulan terpilih.' : 'Belum ada log penilaian harian untuk Anda pada bulan terpilih.'}</td>`;
    UI.caTableBody.appendChild(tr);
    return;
  }

  filteredLogs.forEach(item => {
    const tr = document.createElement('tr');
    const isChecked = state.selectedCaIds.has(item.id);
    let gradeBadge = 'badge-green';
    if (item.grade === 'Baik') gradeBadge = 'badge-blue';
    else if (item.grade === 'Perlu Coaching') gradeBadge = 'badge-yellow';

    // Action buttons: Admin can edit & delete, User is read-only
    let actionCell = '';
    if (isAdmin) {
      actionCell = `
        <div style="display:inline-flex; gap:6px; justify-content:center;">
          <button class="btn btn-icon btn-sm" onclick="promptEditCa('${item.id}')" title="Edit Nilai CA">
            <i class="fa-solid fa-pen-to-square text-silver"></i>
          </button>
          <button class="btn btn-icon btn-sm" onclick="promptDeleteCa('${item.id}', '${(item.userFullName || '').replace(/'/g, "\\'")}')" title="Hapus Nilai CA">
            <i class="fa-solid fa-trash-can text-red"></i>
          </button>
        </div>
      `;
    } else {
      actionCell = `
        <span class="badge badge-gray" style="font-size:0.72rem; padding:4px 8px;" title="Mode Tinjauan (Read-Only)">
          <i class="fa-solid fa-eye text-silver" style="margin-right:4px;"></i>Hanya Lihat
        </span>
      `;
    }

    const checkboxCell = isAdmin ? `
      <td style="text-align: center;">
        <input type="checkbox" class="ca-row-checkbox ca-table-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''} aria-label="Tandai evaluasi ${item.userFullName}">
      </td>
    ` : '';

    tr.innerHTML = `
      ${checkboxCell}
      <td>
        <span style="font-size: 0.8rem; color: var(--gray-200); font-weight: 600; display:inline-flex; align-items:center; gap:5px;">
          <i class="fa-regular fa-calendar text-red" style="font-size:0.75rem;"></i>
          <span>${item.date}</span>
        </span>
      </td>
      <td>
        <div style="display:flex; align-items:center; gap: 8px;">
          <div class="user-avatar-circle" style="width:26px; height:26px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700;">
            ${(item.userFullName || 'U').charAt(0)}
          </div>
          <span style="font-weight:600; color:#fff;">${item.userFullName}</span>
        </div>
      </td>
      <td><span class="badge badge-gray" style="font-size:0.72rem;"><i class="fa-solid fa-headset text-red" style="margin-right:4px;"></i>${item.department}</span></td>
      <td><span class="badge badge-gray" style="font-size:0.72rem;">${item.channel}</span></td>
      <td style="text-align: right;"><strong class="text-red font-mono" style="font-size:1.05rem;">${formatCaScore(item.score)}</strong></td>
      <td><span class="badge ${gradeBadge}" style="font-size:0.72rem;">${item.grade}</span></td>
      <td><span style="font-size:0.76rem; color:var(--gray-300);" title="${(item.focusParam || '').replace(/"/g, '&quot;')}">${item.focusParam || '-'}</span></td>
      <td><span style="font-size:0.76rem; color:var(--gray-400); max-width:200px; display:inline-block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${(item.notes || '').replace(/"/g, '&quot;')}">${item.notes || '-'}</span></td>
      <td style="text-align:center;">${actionCell}</td>
    `;
    UI.caTableBody.appendChild(tr);
  });
}

function openAddCaModal() {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk menambah nilai CA.', 'warning');
    return;
  }
  if (UI.formCa) UI.formCa.reset();
  if (UI.formCaId) UI.formCaId.value = '';
  if (UI.modalCaTitle) UI.modalCaTitle.textContent = 'Input Penilaian CA Harian';
  if (UI.modalCaSubtitle) {
    UI.modalCaSubtitle.textContent = '';
    UI.modalCaSubtitle.classList.add('hidden');
  }
  if (UI.btnSubmitCaText) UI.btnSubmitCaText.textContent = 'Simpan Nilai CA';

  // Set default date to today or selected month
  const todayStr = new Date().toISOString().slice(0, 10);
  if (UI.formCaDate) UI.formCaDate.value = todayStr;

  // Populate users dropdown
  const users = state.getUsers();
  if (UI.formCaUserSelect) {
    UI.formCaUserSelect.innerHTML = users.map(u => `<option value="${u.fullName}" data-dept="${u.department || 'CSO INBOUND'}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
    if (users.length > 0 && UI.formCaDept) {
      UI.formCaDept.value = users[0].department || 'CSO INBOUND';
    }
  }

  if (UI.formCaChannel) UI.formCaChannel.value = 'Live Chat WA';
  if (UI.formCaScore) UI.formCaScore.value = '95.00';
  if (UI.formCaGradeVal) UI.formCaGradeVal.value = 'Sangat Baik';
  if (UI.formCaParam) UI.formCaParam.value = 'Greeting SOP, Identifikasi Kebutuhan, Solusi, Closing';
  if (UI.formCaNotes) UI.formCaNotes.value = '';

  if (UI.modalCaForm) UI.modalCaForm.classList.remove('hidden');
}

window.promptEditCa = function(id) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang dapat mengedit nilai CA.', 'warning');
    return;
  }
  const logs = state.getCaLogs();
  const item = logs.find(l => l.id === id);
  if (!item) {
    showToast('Data Tidak Ditemukan', 'Data evaluasi CA tidak ditemukan.', 'danger');
    return;
  }

  if (UI.formCa) UI.formCa.reset();
  if (UI.formCaId) UI.formCaId.value = item.id;
  if (UI.modalCaTitle) UI.modalCaTitle.textContent = 'Edit Penilaian CA Harian';
  if (UI.modalCaSubtitle) {
    UI.modalCaSubtitle.textContent = '';
    UI.modalCaSubtitle.classList.add('hidden');
  }
  if (UI.btnSubmitCaText) UI.btnSubmitCaText.textContent = 'Perbarui Nilai CA';

  if (UI.formCaDate) UI.formCaDate.value = item.date;

  // Populate users dropdown & select current user
  const users = state.getUsers();
  if (UI.formCaUserSelect) {
    UI.formCaUserSelect.innerHTML = users.map(u => `<option value="${u.fullName}" data-dept="${u.department || 'CSO INBOUND'}" ${u.fullName === item.userFullName ? 'selected' : ''}>${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
  }

  if (UI.formCaDept) UI.formCaDept.value = item.department || 'CSO INBOUND';
  if (UI.formCaChannel) UI.formCaChannel.value = item.channel || 'Live Chat WA';
  if (UI.formCaScore) UI.formCaScore.value = parseFloat(item.score).toFixed(2);
  if (UI.formCaGradeVal) UI.formCaGradeVal.value = item.grade || 'Sangat Baik';
  if (UI.formCaParam) UI.formCaParam.value = item.focusParam || '';
  if (UI.formCaNotes) UI.formCaNotes.value = item.notes || '';

  if (UI.modalCaForm) UI.modalCaForm.classList.remove('hidden');
};

function closeCaModal() {
  if (UI.modalCaForm) UI.modalCaForm.classList.add('hidden');
}

function handleSaveCa(e) {
  e.preventDefault();
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang memiliki izin untuk menyimpan atau mengubah nilai CA.', 'danger');
    return;
  }
  const u = state.currentUser;
  if (!u) return;

  const editId = UI.formCaId ? UI.formCaId.value.trim() : '';
  const date = (UI.formCaDate ? UI.formCaDate.value : '') || new Date().toISOString().slice(0, 10);
  const userFullName = (UI.formCaUserSelect ? UI.formCaUserSelect.value : '') || u.fullName;
  const department = (UI.formCaDept ? UI.formCaDept.value : 'CSO INBOUND');
  const channel = (UI.formCaChannel ? UI.formCaChannel.value : 'Live Chat WA');
  const rawScore = parseFloat(UI.formCaScore ? UI.formCaScore.value : '95.00') || 95.00;
  const score = parseFloat(rawScore.toFixed(2));
  const grade = (UI.formCaGradeVal ? UI.formCaGradeVal.value : (score >= 95.00 ? 'Sangat Baik' : (score >= 85.00 ? 'Baik' : 'Perlu Coaching')));
  const focusParam = (UI.formCaParam ? UI.formCaParam.value.trim() : 'Greeting SOP, Solusi');
  const notes = (UI.formCaNotes ? UI.formCaNotes.value.trim() : '');

  const logs = state.getCaLogs();
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  if (editId) {
    // Update existing entry
    const idx = logs.findIndex(l => l.id === editId);
    if (idx !== -1) {
      logs[idx].date = date;
      logs[idx].userFullName = userFullName;
      logs[idx].department = department;
      logs[idx].channel = channel;
      logs[idx].score = score;
      logs[idx].grade = grade;
      logs[idx].focusParam = focusParam;
      logs[idx].notes = notes;
      logs[idx].updatedAt = `${date} ${timeStr}`;
      logs[idx].updatedBy = u.fullName;
    }
    state.saveCaLogs(logs);
    if (idx !== -1) autoSyncCaAction('save', { log: logs[idx] });
    state.addLog('UPDATE_CA', 'Ubah Nilai CA', `Admin ${u.fullName} memperbarui nilai CA harian ${userFullName} (${date}): ${formatCaScore(score)} (${grade}).`);
    showToast('Nilai CA Diperbarui', `Penilaian harian <strong>${userFullName}</strong> (${date}) berhasil diperbarui menjadi <strong>${formatCaScore(score)}</strong>.`, 'success');
  } else {
    // Create new entry
    const newEntry = {
      id: 'ca_' + Date.now(),
      date,
      userFullName,
      department,
      channel,
      score,
      grade,
      focusParam,
      status: 'Terverifikasi',
      notes,
      createdAt: `${date} ${timeStr}`,
      createdBy: u.fullName
    };
    logs.unshift(newEntry);
    state.saveCaLogs(logs);
    autoSyncCaAction('save', { log: newEntry });
    state.addLog('CREATE_CA', 'Input Nilai CA', `Admin ${u.fullName} mencatat penilaian mutu CA harian untuk ${userFullName}: ${formatCaScore(score)} (${grade}).`);
    showToast('Nilai CA Disimpan', `Skor evaluasi harian <strong>${formatCaScore(score)}</strong> untuk <strong>${userFullName}</strong> (${date}) berhasil dicatat.`, 'success');
  }

  // Automatically align month filter if the new entry date is in a different month
  const entryMonth = date.slice(0, 7);
  if (UI.filterCaMonth && Array.from(UI.filterCaMonth.options).some(o => o.value === entryMonth)) {
    UI.filterCaMonth.value = entryMonth;
  }

  closeCaModal();
  renderCaPage();
}

window.promptDeleteCa = function(id, name) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki hak izin untuk menghapus nilai CA.', 'danger');
    return;
  }
  state.pendingDelete = { type: 'ca', id, name };
  UI.confirmDeleteTitle.textContent = 'Hapus Penilaian CA?';
  UI.confirmDeleteMessage.innerHTML = `Data evaluasi mutu CA harian milik <strong>${name}</strong> akan dihapus secara permanen.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

// Hapus Semua Data CA dalam 1 Bulan
window.promptDeleteCaMonth = function() {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk menghapus seluruh data bulan ini.', 'danger');
    return;
  }
  const monthLabels = {
    '2026-09': 'September 2026',
    '2026-08': 'Agustus 2026',
    '2026-07': 'Juli 2026'
  };
  const selMonth = (UI.filterCaMonth ? UI.filterCaMonth.value : '2026-09') || '2026-09';
  const monthLabel = monthLabels[selMonth] || selMonth;
  const logs = state.getCaLogs();
  const countInMonth = logs.filter(l => (l.date || '').startsWith(selMonth)).length;

  if (countInMonth === 0) {
    showToast('Tidak Ada Data', `Tidak ada catatan evaluasi CA pada periode ${monthLabel} untuk dihapus.`, 'info');
    return;
  }

  state.pendingDelete = { type: 'ca_month', id: selMonth, name: monthLabel };
  UI.confirmDeleteTitle.textContent = `Hapus Semua Data CA Bulan ${monthLabel}?`;
  UI.confirmDeleteMessage.innerHTML = `Peringatan: Seluruh <strong>${countInMonth} data evaluasi harian</strong> pada periode <strong>${monthLabel}</strong> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

// Hapus Data CA yang Ditandai (Batch Delete)
window.promptDeleteSelectedCa = function() {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk menghapus data evaluasi.', 'danger');
    return;
  }
  const selectedList = Array.from(state.selectedCaIds || []);
  if (selectedList.length === 0) {
    showToast('Belum Ada Data Ditandai', 'Silakan tandai minimal satu data penilaian yang ingin dihapus.', 'warning');
    return;
  }

  state.pendingDelete = { type: 'ca_batch', id: 'batch', name: `${selectedList.length} data ditandai`, ids: selectedList };
  UI.confirmDeleteTitle.textContent = `Hapus ${selectedList.length} Data Ditandai?`;
  UI.confirmDeleteMessage.innerHTML = `Sebanyak <strong>${selectedList.length} data evaluasi harian</strong> yang telah Anda tandai akan dihapus secara permanen dari sistem.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

// Tandai / Batal Tandai Semua Data yang Sedang Tampil
window.toggleSelectAllCa = function(selectAll) {
  if (!state.isAdmin()) return;
  const selMonth = (UI.filterCaMonth ? UI.filterCaMonth.value : '2026-09') || '2026-09';
  const searchQ = (UI.searchCaInput ? UI.searchCaInput.value.trim().toLowerCase() : '');
  const filterUser = (UI.filterCaUserSelect ? UI.filterCaUserSelect.value : 'ALL');
  const filterService = (UI.filterCaService ? UI.filterCaService.value : 'ALL');
  const filterGrade = (UI.filterCaGrade ? UI.filterCaGrade.value : 'ALL');

  const logs = state.getCaLogs();
  const filtered = logs.filter(item => {
    if (!(item.date || '').startsWith(selMonth)) return false;
    if (searchQ) {
      const match = (item.userFullName || '').toLowerCase().includes(searchQ) ||
                    (item.date || '').toLowerCase().includes(searchQ) ||
                    (item.department || '').toLowerCase().includes(searchQ) ||
                    (item.channel || '').toLowerCase().includes(searchQ) ||
                    (item.focusParam || '').toLowerCase().includes(searchQ) ||
                    (item.notes || '').toLowerCase().includes(searchQ);
      if (!match) return false;
    }
    if (filterUser !== 'ALL' && item.userFullName !== filterUser) return false;
    if (filterService !== 'ALL' && item.department !== filterService) return false;
    if (filterGrade !== 'ALL' && item.grade !== filterGrade) return false;
    return true;
  });

  const shouldSelect = (selectAll !== undefined) ? selectAll : (state.selectedCaIds.size < filtered.length);

  if (shouldSelect) {
    filtered.forEach(item => state.selectedCaIds.add(item.id));
    showToast('Data Ditandai', `${filtered.length} data evaluasi pada filter ini telah ditandai.`, 'info');
  } else {
    filtered.forEach(item => state.selectedCaIds.delete(item.id));
    showToast('Tanda Dibatalkan', 'Semua tanda centang telah dibatalkan.', 'info');
  }

  renderCaPage();
};

window.deselectAllCa = function() {
  if (!state.isAdmin()) return;
  state.selectedCaIds.clear();
  renderCaPage();
  showToast('Tanda Dibatalkan', 'Semua tanda telah dibatalkan.', 'info');
};

window.filterCaByUser = function(userName) {
  if (UI.filterCaUserSelect) {
    if (UI.filterCaUserSelect.value === userName) {
      UI.filterCaUserSelect.value = 'ALL';
    } else {
      UI.filterCaUserSelect.value = userName;
    }
    renderCaPage();
    if (UI.tableCaLogs) {
      UI.tableCaLogs.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

function exportCaExcel() {
  const isAdmin = state.isAdmin();
  const currentUser = state.currentUser;
  const currentFullName = currentUser ? currentUser.fullName : '';
  const selMonth = (UI.filterCaMonth ? UI.filterCaMonth.value : '2026-09') || '2026-09';
  const allLogs = state.getCaLogs();
  const users = state.getUsers();

  let exportLogs;
  if (state.selectedCaIds && state.selectedCaIds.size > 0) {
    exportLogs = allLogs.filter(l => state.selectedCaIds.has(l.id));
  } else {
    let monthLogs = allLogs.filter(l => (l.date || '').startsWith(selMonth));
    if (!isAdmin) {
      monthLogs = monthLogs.filter(l => l.userFullName === currentFullName);
    }
    exportLogs = monthLogs;
  }

  if (exportLogs.length === 0) {
    showToast('Data Kosong', 'Tidak ada data Customer Attributes (CA) untuk diekspor.', 'warning');
    return;
  }

  const sheet1Data = [
    ['No', 'ID Evaluasi', 'Tanggal Evaluasi', 'Nama Petugas CSO', 'Layanan CSO', 'Channel Interaksi', 'Skor Nilai CA', 'Kategori Mutu', 'Parameter Fokus Evaluasi', 'Status', 'Catatan Evaluasi']
  ];
  exportLogs.forEach((l, idx) => {
    sheet1Data.push([
      idx + 1,
      l.id,
      l.date,
      l.userFullName,
      l.department,
      l.channel || '-',
      parseFloat(l.score) || 0,
      l.grade || '-',
      l.focusParam || '-',
      l.status || 'Terverifikasi',
      l.notes || '-'
    ]);
  });

  const sheet2Data = [
    ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Dinilai', 'Rata-rata Skor', 'Predikat Mutu', 'Skor Terendah', 'Skor Tertinggi', 'Status Kelulusan']
  ];
  const targetUsers = isAdmin ? users : users.filter(u => u.fullName === currentFullName);
  targetUsers.forEach((u, idx) => {
    const userMonthLogs = allLogs.filter(l => (l.date || '').startsWith(selMonth) && l.userFullName === u.fullName);
    const count = userMonthLogs.length;
    let avg = 0, min = 0, max = 0, grade = 'Belum Ada Nilai', passStatus = 'Belum Dinilai';
    if (count > 0) {
      const scores = userMonthLogs.map(l => parseFloat(l.score) || 0);
      const sum = scores.reduce((a, b) => a + b, 0);
      avg = parseFloat((sum / count).toFixed(2));
      min = Math.min(...scores);
      max = Math.max(...scores);
      if (avg >= 95.00) grade = 'Sangat Baik';
      else if (avg >= 85.00) grade = 'Baik';
      else grade = 'Perlu Coaching';
      passStatus = avg >= 85.00 ? 'Lulus Passing Grade' : 'Di Bawah Standar';
    }
    sheet2Data.push([
      idx + 1,
      u.fullName,
      u.department || 'CSO INBOUND',
      count,
      count > 0 ? avg : '-',
      grade,
      count > 0 ? min : '-',
      count > 0 ? max : '-',
      passStatus
    ]);
  });

  const filename = `DRIVE_Customer_Attributes_CA_${selMonth}_${new Date().toISOString().slice(0, 10)}.xlsx`;

  if (typeof XLSX !== 'undefined' && XLSX.utils) {
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
    const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
    ws1['!cols'] = [
      { wch: 6 }, { wch: 14 }, { wch: 16 }, { wch: 22 }, { wch: 26 },
      { wch: 18 }, { wch: 14 }, { wch: 16 }, { wch: 40 }, { wch: 16 }, { wch: 50 }
    ];
    ws2['!cols'] = [
      { wch: 6 }, { wch: 22 }, { wch: 26 }, { wch: 14 }, { wch: 16 },
      { wch: 18 }, { wch: 16 }, { wch: 16 }, { wch: 22 }
    ];
    XLSX.utils.book_append_sheet(wb, ws1, 'Log Harian CA');
    XLSX.utils.book_append_sheet(wb, ws2, 'Rekapitulasi Agent');
    XLSX.writeFile(wb, filename);
  } else {
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + sheet1Data.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', filename.replace('.xlsx', '.csv'));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showToast('Download Berhasil', `Data Customer Attributes (${exportLogs.length} baris) berhasil diunduh menjadi Excel.`, 'success');
}

// ==========================================
// 12.5.1 CA GOOGLE SPREADSHEET INTEGRATION
// ==========================================

const CA_APPS_SCRIPT_TEMPLATE = `/**
 * =====================================================================
 * GOOGLE APPS SCRIPT: INTEGRASI DATA CUSTOMER ATTRIBUTES (CA)
 * Dashboard Agent CSO - Iconnet
 * =====================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Spreadsheet baru di browser Anda (https://sheets.new).
 * 2. Klik menu 'Ekstensi' (Extensions) > 'Apps Script'.
 * 3. Hapus semua kode default dan tempel seluruh isi script ini.
 * 4. Klik ikon Disket (Simpan / Ctrl+S).
 * 5. Klik tombol 'Deploy' (Terapkan) > 'New deployment' (Penerapan baru).
 * 6. Klik ikon gear di sebelah kiri 'Select type', pilih 'Web app'.
 * 7. Isi keterangan: 'Integrasi Dashboard CA'.
 * 8. Atur 'Execute as' (Jalankan sebagai) -> 'Me' (Email Anda).
 * 9. Atur 'Who has access' (Siapa yang memiliki akses) -> 'Anyone' (Siapa saja).
 * 10. Klik 'Deploy', berikan izin akun (Authorize Access), lalu salin URL Web App yang muncul.
 * 11. Tempel URL Web App ke Pengaturan Google Spreadsheet di Dashboard!
 * =====================================================================
 */

const SHEET_NAME = 'CA_Data';
const HEADERS = [
  'ID Evaluasi',
  'Tanggal Evaluasi',
  'Nama Petugas CSO',
  'Layanan CSO',
  'Channel Interaksi',
  'Skor Nilai CA',
  'Kategori Mutu',
  'Parameter Fokus Evaluasi',
  'Status',
  'Catatan Evaluasi',
  'Waktu Dibuat',
  'Dibuat Oleh'
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() < 1) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#10b981');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    for (let c = 1; c <= HEADERS.length; c++) {
      sheet.autoResizeColumn(c);
    }
  }
  return sheet;
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'get_all';
    if (action === 'ping') {
      return createJsonResponse({ success: true, message: 'Google Apps Script CA siap terhubung!', time: new Date() });
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse({ success: true, count: 0, data: [] });
    }

    const rows = [];
    for (let i = 1; i < data.length; i++) {
      const r = data[i];
      if (!r[0]) continue;
      rows.push({
        id: String(r[0]),
        date: r[1] instanceof Date ? Utilities.formatDate(r[1], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(r[1]),
        userFullName: String(r[2] || ''),
        department: String(r[3] || ''),
        channel: String(r[4] || ''),
        score: parseFloat(r[5]) || 0,
        grade: String(r[6] || ''),
        focusParam: String(r[7] || ''),
        status: String(r[8] || 'Terverifikasi'),
        notes: String(r[9] || ''),
        createdAt: String(r[10] || ''),
        createdBy: String(r[11] || '')
      });
    }

    return createJsonResponse({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    let payload;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    } else {
      payload = {};
    }

    const action = payload.action || 'sync_all';
    const sheet = getOrCreateSheet();

    if (action === 'sync_all') {
      const logs = payload.logs || [];
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      if (logs.length > 0) {
        const rowsToAppend = logs.map(l => [
          l.id,
          l.date,
          l.userFullName,
          l.department,
          l.channel || '-',
          parseFloat(l.score) || 0,
          l.grade || '-',
          l.focusParam || '-',
          l.status || 'Terverifikasi',
          l.notes || '-',
          l.createdAt || '',
          l.createdBy || ''
        ]);
        sheet.getRange(2, 1, rowsToAppend.length, HEADERS.length).setValues(rowsToAppend);
      }
      return createJsonResponse({ success: true, message: 'Sync all berhasil', count: logs.length });
    }

    if (action === 'save') {
      const l = payload.log;
      if (!l || !l.id) return createJsonResponse({ success: false, error: 'Data log tidak valid' });

      const data = sheet.getDataRange().getValues();
      let foundRow = -1;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(l.id)) {
          foundRow = i + 1;
          break;
        }
      }

      const rowData = [
        l.id,
        l.date,
        l.userFullName,
        l.department,
        l.channel || '-',
        parseFloat(l.score) || 0,
        l.grade || '-',
        l.focusParam || '-',
        l.status || 'Terverifikasi',
        l.notes || '-',
        l.createdAt || '',
        l.createdBy || ''
      ];

      if (foundRow > 0) {
        sheet.getRange(foundRow, 1, 1, HEADERS.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
      return createJsonResponse({ success: true, message: 'Data CA berhasil disimpan ke Google Sheets' });
    }

    if (action === 'delete') {
      const id = payload.id;
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(id)) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ success: true, message: 'Data CA berhasil dihapus dari Google Sheets' });
        }
      }
      return createJsonResponse({ success: true, message: 'ID tidak ditemukan di sheet' });
    }

    if (action === 'delete_month') {
      const month = payload.month;
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        const rowDate = String(data[i][1]);
        if (rowDate.indexOf(month) === 0) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Data bulan berhasil dibersihkan dari Google Sheets' });
    }

    if (action === 'delete_batch') {
      const ids = payload.ids || [];
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (ids.indexOf(String(data[i][0])) !== -1) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Batch baris berhasil dihapus dari Google Sheets' });
    }

    return createJsonResponse({ success: false, error: 'Aksi tidak dikenal: ' + action });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}`;

function extractGoogleSpreadsheetId(input) {
  if (!input) return '';
  const str = input.trim();
  const match = str.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match) return match[1];
  return str;
}

function renderCaGSheetBar() {
  const config = state.getCaGSheetConfig();
  const isConfigured = Boolean(config.webAppUrl && config.webAppUrl.trim());
  const cleanId = extractGoogleSpreadsheetId(config.sheetId);
  const openUrl = cleanId ? `https://docs.google.com/spreadsheets/d/${cleanId}` : config.webAppUrl;

  // Header Badge
  if (UI.caGSheetHeaderBadge) {
    if (isConfigured) {
      UI.caGSheetHeaderBadge.textContent = 'Terhubung';
      UI.caGSheetHeaderBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      UI.caGSheetHeaderBadge.style.color = '#10b981';
      UI.caGSheetHeaderBadge.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    } else {
      UI.caGSheetHeaderBadge.textContent = 'Belum Terhubung';
      UI.caGSheetHeaderBadge.style.background = 'rgba(255, 255, 255, 0.08)';
      UI.caGSheetHeaderBadge.style.color = 'var(--gray-300)';
      UI.caGSheetHeaderBadge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    }
  }

  // Status Badge inside Bar
  if (UI.caGSheetStatusBadge) {
    if (isConfigured) {
      UI.caGSheetStatusBadge.textContent = 'Terhubung';
      UI.caGSheetStatusBadge.className = 'badge badge-green';
      UI.caGSheetStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      UI.caGSheetStatusBadge.style.color = '#10b981';
      UI.caGSheetStatusBadge.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    } else {
      UI.caGSheetStatusBadge.textContent = 'Belum Dikonfigurasi';
      UI.caGSheetStatusBadge.style.background = 'rgba(100, 116, 139, 0.2)';
      UI.caGSheetStatusBadge.style.color = '#94a3b8';
      UI.caGSheetStatusBadge.style.border = '1px solid rgba(100, 116, 139, 0.3)';
    }
  }

  // Status Info inside Bar
  if (UI.caGSheetStatusInfo) {
    if (isConfigured) {
      const syncTime = config.lastSyncTime ? `Terakhir sinkron: ${config.lastSyncTime}` : 'Belum pernah disinkronkan';
      const autoText = config.autoSync ? ' (Auto-Sync Aktif)' : ' (Sinkronisasi Manual)';
      UI.caGSheetStatusInfo.innerHTML = `<span style="color:#10b981;"><i class="fa-solid fa-circle-check" style="margin-right:4px;"></i>${syncTime}${autoText}</span>`;
    } else {
      UI.caGSheetStatusInfo.textContent = 'Klik tombol "Pengaturan & Script" untuk menghubungkan data CA dengan Google Spreadsheet Anda.';
    }
  }

  // Open Link buttons
  if (UI.btnCaGSheetOpenLink) {
    if (openUrl) {
      UI.btnCaGSheetOpenLink.href = openUrl;
      UI.btnCaGSheetOpenLink.classList.remove('hidden');
      UI.btnCaGSheetOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnCaGSheetOpenLink.classList.add('hidden');
      UI.btnCaGSheetOpenLink.style.display = 'none';
    }
  }
  if (UI.btnCaGSheetModalOpenLink) {
    if (openUrl) {
      UI.btnCaGSheetModalOpenLink.href = openUrl;
      UI.btnCaGSheetModalOpenLink.classList.remove('hidden');
      UI.btnCaGSheetModalOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnCaGSheetModalOpenLink.classList.add('hidden');
      UI.btnCaGSheetModalOpenLink.style.display = 'none';
    }
  }
}

function openCaGSheetModal() {
  const config = state.getCaGSheetConfig();
  if (UI.inputCaGSheetWebAppUrl) UI.inputCaGSheetWebAppUrl.value = config.webAppUrl || '';
  if (UI.inputCaGSheetUrl) UI.inputCaGSheetUrl.value = config.sheetId || '';
  if (UI.inputCaGSheetTabName) UI.inputCaGSheetTabName.value = config.sheetName || 'CA_Data';
  if (UI.checkCaGSheetAutoSync) UI.checkCaGSheetAutoSync.checked = config.autoSync !== false;

  const logs = state.getCaLogs();
  if (UI.labelCaGSheetModalTotalCount) UI.labelCaGSheetModalTotalCount.textContent = `${logs.length} Baris`;
  if (UI.labelCaGSheetModalLastSync) UI.labelCaGSheetModalLastSync.textContent = config.lastSyncTime || 'Belum pernah';

  if (UI.labelCaGSheetModalStatus) {
    if (config.webAppUrl) {
      UI.labelCaGSheetModalStatus.innerHTML = '<span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Terhubung</span>';
    } else {
      UI.labelCaGSheetModalStatus.innerHTML = '<span style="color:#94a3b8;"><i class="fa-regular fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Belum Dikonfigurasi</span>';
    }
  }

  if (UI.caAppsScriptCodePreview) {
    UI.caAppsScriptCodePreview.textContent = CA_APPS_SCRIPT_TEMPLATE;
  }

  switchCaGSheetTab('config');
  renderCaGSheetBar();
  if (UI.modalCaGoogleSheets) UI.modalCaGoogleSheets.classList.remove('hidden');
}

function closeCaGSheetModal() {
  if (UI.modalCaGoogleSheets) UI.modalCaGoogleSheets.classList.add('hidden');
}

function switchCaGSheetTab(tab) {
  if (tab === 'config') {
    if (UI.tabBtnCaGSheetConfig) UI.tabBtnCaGSheetConfig.classList.add('active');
    if (UI.tabBtnCaGSheetGuide) UI.tabBtnCaGSheetGuide.classList.remove('active');
    if (UI.tabContentCaGSheetConfig) UI.tabContentCaGSheetConfig.classList.remove('hidden');
    if (UI.tabContentCaGSheetGuide) UI.tabContentCaGSheetGuide.classList.add('hidden');
  } else {
    if (UI.tabBtnCaGSheetConfig) UI.tabBtnCaGSheetConfig.classList.remove('active');
    if (UI.tabBtnCaGSheetGuide) UI.tabBtnCaGSheetGuide.classList.add('active');
    if (UI.tabContentCaGSheetConfig) UI.tabContentCaGSheetConfig.classList.add('hidden');
    if (UI.tabContentCaGSheetGuide) UI.tabContentCaGSheetGuide.classList.remove('hidden');
  }
}

function saveCaGSheetConfigHandler() {
  const current = state.getCaGSheetConfig();
  const webAppUrl = (UI.inputCaGSheetWebAppUrl ? UI.inputCaGSheetWebAppUrl.value.trim() : '');
  const sheetInput = (UI.inputCaGSheetUrl ? UI.inputCaGSheetUrl.value.trim() : '');
  const sheetName = (UI.inputCaGSheetTabName ? UI.inputCaGSheetTabName.value.trim() : '') || 'CA_Data';
  const autoSync = UI.checkCaGSheetAutoSync ? UI.checkCaGSheetAutoSync.checked : true;

  const cleanId = extractGoogleSpreadsheetId(sheetInput);

  const updated = {
    ...current,
    webAppUrl,
    sheetId: cleanId || sheetInput,
    sheetName,
    autoSync
  };

  state.saveCaGSheetConfig(updated);
  renderCaGSheetBar();

  if (UI.labelCaGSheetModalStatus) {
    if (webAppUrl) {
      UI.labelCaGSheetModalStatus.innerHTML = '<span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Terhubung</span>';
    } else {
      UI.labelCaGSheetModalStatus.innerHTML = '<span style="color:#94a3b8;"><i class="fa-regular fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Belum Dikonfigurasi</span>';
    }
  }

  showToast('Pengaturan Disimpan', 'Konfigurasi Google Spreadsheet berhasil disimpan.', 'success');
}

async function testCaGSheetConnection() {
  const webAppUrl = (UI.inputCaGSheetWebAppUrl ? UI.inputCaGSheetWebAppUrl.value.trim() : '') || state.getCaGSheetConfig().webAppUrl;
  if (!webAppUrl) {
    showToast('URL Kosong', 'Harap masukkan URL Web App Google Apps Script terlebih dahulu.', 'warning');
    return;
  }

  const btn = UI.btnCaGSheetTest;
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menghubungkan...</span>';
  }

  try {
    const pingUrl = webAppUrl + (webAppUrl.includes('?') ? '&' : '?') + 'action=ping';
    const resp = await fetch(pingUrl, {
      method: 'GET',
      mode: 'cors'
    });

    if (resp.ok) {
      const data = await resp.json();
      if (data && data.success) {
        showToast('Koneksi Berhasil', 'Google Apps Script berhasil merespons dan terhubung ke spreadsheet!', 'success');
      } else {
        showToast('Terhubung', 'Respons diterima dari Google Apps Script Web App.', 'info');
      }
    } else {
      showToast('Koneksi Selesai', `Status HTTP: ${resp.status}. URL dapat diakses.`, 'info');
    }
  } catch (err) {
    showToast('Pengujian Selesai', 'Request terkirim. Jika URL Web App valid dengan izin "Anyone", koneksi siap digunakan.', 'info');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

async function pushCaToGoogleSheets() {
  const config = state.getCaGSheetConfig();
  if (!config.webAppUrl) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App Google Apps Script terlebih dahulu.', 'warning');
    openCaGSheetModal();
    return;
  }

  const logs = state.getCaLogs();
  const pushBtn = UI.btnCaGSheetPush;
  const modalPushBtn = UI.btnCaGSheetModalPush;

  const setPushing = (isPushing) => {
    if (pushBtn) {
      pushBtn.disabled = isPushing;
      pushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
    if (modalPushBtn) {
      modalPushBtn.disabled = isPushing;
      modalPushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
  };

  setPushing(true);

  try {
    const payload = {
      action: 'sync_all',
      logs: logs
    };

    // Use text/plain to avoid preflight CORS restrictions from Google Apps Script Web App
    await fetch(config.webAppUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    });

    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    config.lastSyncTime = formatted;
    config.lastSyncStatus = 'success';
    state.saveCaGSheetConfig(config);
    renderCaGSheetBar();

    if (UI.labelCaGSheetModalLastSync) UI.labelCaGSheetModalLastSync.textContent = formatted;

    showToast('Sinkronisasi Sukses', `Sebanyak <strong>${logs.length} data CA</strong> berhasil dikirim ke Google Spreadsheet.`, 'success');
  } catch (err) {
    console.error('Error pushing CA to Google Sheets:', err);
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    config.lastSyncTime = formatted;
    state.saveCaGSheetConfig(config);
    renderCaGSheetBar();
    showToast('Data Dikirim', `Permintaan sinkronisasi (${logs.length} data) telah dikirim ke Google Spreadsheet.`, 'info');
  } finally {
    setPushing(false);
  }
}

async function pullCaFromGoogleSheets() {
  const config = state.getCaGSheetConfig();
  if (!config.webAppUrl && !config.sheetId) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App atau ID Spreadsheet terlebih dahulu.', 'warning');
    openCaGSheetModal();
    return;
  }

  const pullBtn = UI.btnCaGSheetPull;
  const modalPullBtn = UI.btnCaGSheetModalPull;

  const setPulling = (isPulling) => {
    if (pullBtn) {
      pullBtn.disabled = isPulling;
      pullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
    if (modalPullBtn) {
      modalPullBtn.disabled = isPulling;
      modalPullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
  };

  setPulling(true);

  try {
    let pulledRows = null;

    if (config.webAppUrl) {
      const getUrl = config.webAppUrl + (config.webAppUrl.includes('?') ? '&' : '?') + 'action=get_all';
      const resp = await fetch(getUrl, { method: 'GET', mode: 'cors' });
      if (resp.ok) {
        const json = await resp.json();
        if (json && json.success && Array.isArray(json.data)) {
          pulledRows = json.data;
        }
      }
    }

    // Fallback to public sheet CSV export if Web App did not return JSON or if only sheetId is present
    if (!pulledRows && config.sheetId) {
      const cleanId = extractGoogleSpreadsheetId(config.sheetId);
      const csvUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv&sheet=${encodeURIComponent(config.sheetName || 'CA_Data')}`;
      const resp = await fetch(csvUrl);
      if (resp.ok) {
        const csvText = await resp.text();
        const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          pulledRows = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = parseCsvRow(lines[i]);
            if (cols[0]) {
              pulledRows.push({
                id: cols[0],
                date: cols[1] || '',
                userFullName: cols[2] || '',
                department: cols[3] || 'CSO INBOUND',
                channel: cols[4] || 'Live Chat WA',
                score: parseFloat(cols[5]) || 0,
                grade: cols[6] || 'Baik',
                focusParam: cols[7] || '',
                status: cols[8] || 'Terverifikasi',
                notes: cols[9] || '',
                createdAt: cols[10] || '',
                createdBy: cols[11] || ''
              });
            }
          }
        }
      }
    }

    if (pulledRows && pulledRows.length > 0) {
      state.saveCaLogs(pulledRows);
      const now = new Date();
      const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      config.lastSyncTime = formatted;
      state.saveCaGSheetConfig(config);
      renderCaPage();
      showToast('Tarik Data Berhasil', `Berhasil mengambil <strong>${pulledRows.length} data CA</strong> dari Google Spreadsheet.`, 'success');
    } else {
      showToast('Data Kosong / Tidak Terbaca', 'Tidak ada data CA yang ditemukan pada Google Spreadsheet atau sheet masih kosong.', 'info');
    }
  } catch (err) {
    console.error('Error pulling from Google Sheets:', err);
    showToast('Gagal Menarik Data', 'Pastikan Google Apps Script sudah dideploy dengan akses "Anyone" atau sheet publik.', 'danger');
  } finally {
    setPulling(false);
  }
}

function parseCsvRow(rowStr) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < rowStr.length; i++) {
    const c = rowStr[i];
    if (c === '"') {
      if (inQuotes && rowStr[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function autoSyncCaAction(action, payload) {
  const config = state.getCaGSheetConfig();
  if (!config.webAppUrl || config.autoSync === false) return;

  const bodyData = {
    action,
    ...payload
  };

  fetch(config.webAppUrl, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    }
  }).then(() => {
    const now = new Date();
    config.lastSyncTime = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    state.saveCaGSheetConfig(config);
    renderCaGSheetBar();
  }).catch(err => {
    console.warn('Auto-sync CA to Google Sheets notification:', err);
  });
}

function copyCaAppsScriptCode() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(CA_APPS_SCRIPT_TEMPLATE).then(() => {
      showToast('Tersalin!', 'Kode Google Apps Script berhasil disalin ke clipboard.', 'success');
    }).catch(() => {
      fallbackCopyText(CA_APPS_SCRIPT_TEMPLATE);
    });
  } else {
    fallbackCopyText(CA_APPS_SCRIPT_TEMPLATE);
  }
}

function fallbackCopyText(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('Tersalin!', 'Kode Google Apps Script berhasil disalin.', 'success');
  } catch (e) {
    showToast('Salin Manual', 'Silakan pilih dan salin kode dari kotak teks.', 'info');
  }
  document.body.removeChild(ta);
}

/// ==========================================
// 12.6 TIKET (JUMLAH PEROLEHAN TIKET HARIAN & TARGET BULANAN 1.320)
// ==========================================

function formatTicketCount(val) {
  if (val === null || val === undefined || val === '') return '0';
  const num = parseInt(val, 10);
  if (isNaN(num)) return '0';
  return num.toLocaleString('id-ID');
}

function renderTiketPage() {
  const isAdmin = state.isAdmin();
  const currentUser = state.currentUser;
  const currentFullName = currentUser ? currentUser.fullName : '';

  const monthLabels = {
    '2026-09': 'September 2026',
    '2026-08': 'Agustus 2026',
    '2026-07': 'Juli 2026'
  };

  const selectedMonth = (UI.filterTiketMonth ? UI.filterTiketMonth.value : '2026-09') || '2026-09';
  const monthLabel = monthLabels[selectedMonth] || selectedMonth;

  if (UI.tiketMonthHeaderLabel) {
    UI.tiketMonthHeaderLabel.textContent = monthLabel;
  }

  // Update Page Title and Description based on Role
  const pageTitle = document.querySelector('#pageTiket .page-title');
  const pageDesc = document.querySelector('#pageTiket .page-desc');
  if (pageTitle) {
    pageTitle.textContent = isAdmin ? 'Perolehan Tiket Agent' : 'Perolehan Tiket Saya';
  }
  if (pageDesc) {
    pageDesc.textContent = '';
    pageDesc.classList.add('hidden');
  }

  // Update Google Spreadsheet Integration Status Bar
  renderTiketGSheetBar();

  // Update Permission Explanatory Banner & Action Visibility
  if (isAdmin) {
    if (UI.tiketBannerRoleLabel) UI.tiketBannerRoleLabel.textContent = 'Otoritas Akses Perolehan Tiket';
    if (UI.tiketBannerRoleDesc) {
      UI.tiketBannerRoleDesc.textContent = '';
      UI.tiketBannerRoleDesc.classList.add('hidden');
    }
    if (UI.tiketBannerBadgePrivilege) {
      UI.tiketBannerBadgePrivilege.className = 'badge badge-admin';
      UI.tiketBannerBadgePrivilege.textContent = 'Akses Penuh (CRUD)';
    }
    if (UI.btnOpenAddTiketModal) UI.btnOpenAddTiketModal.classList.remove('hidden');
    if (UI.btnDeleteAllTiketMonth) UI.btnDeleteAllTiketMonth.classList.remove('hidden');
    if (UI.tiketThSelectAll) UI.tiketThSelectAll.classList.remove('hidden');
  } else {
    if (UI.tiketBannerRoleLabel) UI.tiketBannerRoleLabel.textContent = 'Otoritas Akses Perolehan Tiket';
    if (UI.tiketBannerRoleDesc) {
      UI.tiketBannerRoleDesc.textContent = '';
      UI.tiketBannerRoleDesc.classList.add('hidden');
    }
    if (UI.tiketBannerBadgePrivilege) {
      UI.tiketBannerBadgePrivilege.className = 'badge badge-user';
      UI.tiketBannerBadgePrivilege.textContent = 'Hanya Lihat Pribadi';
    }
    if (UI.btnOpenAddTiketModal) UI.btnOpenAddTiketModal.classList.add('hidden');
    if (UI.btnDeleteAllTiketMonth) UI.btnDeleteAllTiketMonth.classList.add('hidden');
    if (UI.tiketThSelectAll) UI.tiketThSelectAll.classList.add('hidden');
    state.selectedTiketIds.clear();
    if (UI.tiketBatchBar) UI.tiketBatchBar.classList.add('hidden');
  }

  const allTikets = state.getTikets();
  const monthLogs = allTikets.filter(l => (l.date || '').startsWith(selectedMonth));
  const users = state.getUsers();

  // Populate filterSummaryTiketUser in Section 1
  if (UI.filterSummaryTiketUser) {
    if (isAdmin) {
      const curVal = UI.filterSummaryTiketUser.value || 'ALL';
      UI.filterSummaryTiketUser.disabled = false;
      UI.filterSummaryTiketUser.innerHTML = '<option value="ALL">Semua Nama User</option>' +
        users.map(u => `<option value="${u.fullName}">${u.fullName}</option>`).join('');
      if (Array.from(UI.filterSummaryTiketUser.options).some(o => o.value === curVal)) {
        UI.filterSummaryTiketUser.value = curVal;
      }
    } else {
      // Non-admin user can ONLY select themselves
      UI.filterSummaryTiketUser.innerHTML = `<option value="${currentFullName}" selected>${currentFullName} (Diri Sendiri)</option>`;
      UI.filterSummaryTiketUser.disabled = true;
    }
  }

  // Populate filterTiketUserSelect dynamically in Section 2 toolbar
  if (UI.filterTiketUserSelect) {
    if (isAdmin) {
      const currentVal = UI.filterTiketUserSelect.value || 'ALL';
      UI.filterTiketUserSelect.disabled = false;
      UI.filterTiketUserSelect.innerHTML = '<option value="ALL">Semua User</option>' +
        users.map(u => `<option value="${u.fullName}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
      if (Array.from(UI.filterTiketUserSelect.options).some(o => o.value === currentVal)) {
        UI.filterTiketUserSelect.value = currentVal;
      }
    } else {
      // Non-admin user can ONLY select themselves
      UI.filterTiketUserSelect.innerHTML = `<option value="${currentFullName}" selected>${currentFullName} (Diri Sendiri)</option>`;
      UI.filterTiketUserSelect.disabled = true;
    }
  }

  // ========================================================
  // Section 1: Rekapitulasi Perolehan Tiket Bulanan
  // Target Baku Bulanan: 1.320 Tiket Per Agent
  // (Untuk user: Hanya data perolehan dirinya sendiri yang tampil)
  // ========================================================
  const summaryTitleEl = document.querySelector('#tiketUserSummarySection h3 span');
  const summaryDescEl = document.querySelector('#tiketUserSummarySection p');
  if (summaryTitleEl) {
    if (isAdmin) {
      summaryTitleEl.innerHTML = `Rekapitulasi Perolehan Tiket Seluruh Agent Periode <span id="tiketMonthHeaderLabel" class="text-red">${monthLabel}</span>`;
    } else {
      summaryTitleEl.innerHTML = `Rekapitulasi Perolehan Tiket Saya Periode <span id="tiketMonthHeaderLabel" class="text-red">${monthLabel}</span>`;
    }
  }
  if (summaryDescEl) {
    summaryDescEl.textContent = '';
    summaryDescEl.classList.add('hidden');
  }

  const summaryFilterUser = isAdmin ? (UI.filterSummaryTiketUser ? UI.filterSummaryTiketUser.value : 'ALL') : currentFullName;
  const summaryFilterService = (UI.filterSummaryTiketService ? UI.filterSummaryTiketService.value : 'ALL');

  // Filter agen: Jika bukan admin, hanya ambil user yang sedang login
  const availableAgents = isAdmin
    ? users
    : users.filter(u => u.fullName === currentFullName || (currentUser && (u.username === currentUser.username || u.id === currentUser.id)));

  const filteredAgents = availableAgents.filter(u => {
    if (!isAdmin && u.fullName !== currentFullName) return false;
    if (isAdmin && summaryFilterUser !== 'ALL' && u.fullName !== summaryFilterUser) return false;
    if (summaryFilterService !== 'ALL' && (u.department || 'CSO INBOUND') !== summaryFilterService) return false;
    return true;
  });

  const userSummaries = filteredAgents.map(u => {
    const userLogs = monthLogs.filter(l => l.userFullName === u.fullName);
    const daysInput = userLogs.length;
    let totalTickets = 0;
    let avgDaily = '0,0';
    let targetPct = '0.0';
    let diffTarget = -MONTHLY_TICKET_TARGET;
    let isAchieved = false;
    let statusText = 'Belum Ada Input';
    let statusBadge = 'badge-gray';
    let statusIcon = 'fa-regular fa-clock';

    if (daysInput > 0) {
      totalTickets = userLogs.reduce((acc, l) => acc + (Number(l.ticketCount) || 0), 0);
      avgDaily = (totalTickets / daysInput).toFixed(1);
      targetPct = ((totalTickets / MONTHLY_TICKET_TARGET) * 100).toFixed(1);
      diffTarget = totalTickets - MONTHLY_TICKET_TARGET;
      isAchieved = totalTickets >= MONTHLY_TICKET_TARGET;

      if (isAchieved) {
        statusText = 'Target Tercapai';
        statusBadge = 'badge-green';
        statusIcon = 'fa-solid fa-check-double';
      } else {
        const remaining = Math.abs(diffTarget);
        statusText = `Kurang ${remaining.toLocaleString('id-ID')} Tiket`;
        statusBadge = 'badge-yellow';
        statusIcon = 'fa-solid fa-hourglass-half';
      }
    }

    return {
      user: u,
      daysInput,
      monthlyTarget: MONTHLY_TICKET_TARGET,
      totalTickets,
      avgDaily,
      targetPct,
      diffTarget,
      isAchieved,
      statusText,
      statusBadge,
      statusIcon
    };
  });

  // Sort summary by highest / lowest perolehan
  const summarySort = (UI.filterTiketSummarySort ? UI.filterTiketSummarySort.value : 'DESC');
  if (summarySort === 'ASC') {
    userSummaries.sort((a, b) => {
      if (a.daysInput === 0 && b.daysInput > 0) return 1;
      if (b.daysInput === 0 && a.daysInput > 0) return -1;
      return a.totalTickets - b.totalTickets;
    });
  } else {
    userSummaries.sort((a, b) => b.totalTickets - a.totalTickets);
  }

  if (UI.tiketUserCountBadge) {
    if (isAdmin) {
      UI.tiketUserCountBadge.textContent = `${filteredAgents.length} Agent Terdaftar`;
    } else {
      UI.tiketUserCountBadge.textContent = 'Perolehan Pribadi';
    }
  }

  // Render Section 1 table
  if (UI.tiketUserSummaryBody) {
    UI.tiketUserSummaryBody.innerHTML = '';
    if (userSummaries.length === 0) {
      UI.tiketUserSummaryBody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding:24px; color:var(--gray-400);"><i class="fa-regular fa-folder-open" style="font-size:1.5rem; display:block; margin-bottom:6px; opacity:0.6;"></i>Tidak ada data perolehan tiket yang sesuai dengan filter.</td></tr>';
    } else {
      userSummaries.forEach(summary => {
        const u = summary.user;
        const tr = document.createElement('tr');

        // Kekurangan Target Tiket:
        // Jika totalTickets >= 1320: 0 Tiket (Tercapai)
        // Jika totalTickets < 1320: Kekurangan = 1.320 - totalTickets
        let kekuranganHtml = '<span style="color:var(--gray-400);">-</span>';
        if (summary.daysInput > 0) {
          if (summary.isAchieved) {
            kekuranganHtml = `
              <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                <span class="badge badge-green font-mono" style="font-size:0.8rem; font-weight:700;">
                  <i class="fa-solid fa-check-double" style="margin-right:4px;"></i>0 Tiket
                </span>
                <small style="font-size:0.7rem; color:var(--green-400, #34d399);">Target Terpenuhi (Surplus +${summary.diffTarget.toLocaleString('id-ID')})</small>
              </div>
            `;
          } else {
            const kekurangan = MONTHLY_TICKET_TARGET - summary.totalTickets;
            kekuranganHtml = `
              <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                <span class="badge badge-yellow font-mono" style="font-size:0.8rem; font-weight:700;">
                  <i class="fa-solid fa-triangle-exclamation" style="margin-right:4px;"></i>${kekurangan.toLocaleString('id-ID')} Tiket
                </span>
                <small style="font-size:0.7rem; color:var(--gray-400);">Realisasi: ${summary.totalTickets.toLocaleString('id-ID')} / 1.320 (${summary.targetPct}%)</small>
              </div>
            `;
          }
        }

        const diffDisplay = summary.daysInput > 0
          ? (summary.diffTarget >= 0
              ? `<span class="text-green font-mono font-bold">+${summary.diffTarget.toLocaleString('id-ID')} Tiket</span>`
              : `<span class="text-yellow font-mono font-bold">-${Math.abs(summary.diffTarget).toLocaleString('id-ID')} Tiket</span>`)
          : '<span style="color:var(--gray-400);">-</span>';

        tr.innerHTML = `
          <td>
            <div style="display:flex; align-items:center; gap: 10px;">
              <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" alt="${u.fullName}" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:2px solid var(--border-color);">
              <div>
                <strong style="color:#fff; font-size:0.875rem;">${u.fullName}</strong>
                <div style="display:flex; align-items:center; gap:6px; margin-top:2px;">
                  <span class="badge ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}" style="font-size:0.65rem;">${u.role.toUpperCase()}</span>
                  <span style="font-size:0.75rem; color:var(--gray-400);">${u.email}</span>
                </div>
              </div>
            </div>
          </td>
          <td><span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-headset text-red" style="margin-right:4px;"></i>${u.department || 'CSO Layanan'}</span></td>
          <td style="text-align: center;"><span class="font-mono font-bold" style="color:var(--gray-200);">${summary.daysInput} Hari</span></td>
          <td style="text-align: center;"><span class="font-mono font-bold" style="color:#fff;">${summary.monthlyTarget.toLocaleString('id-ID')}</span></td>
          <td style="text-align: right;"><strong class="text-red font-mono" style="font-size:1.05rem;">${summary.daysInput > 0 ? summary.totalTickets.toLocaleString('id-ID') : '-'}</strong> <small style="font-size:0.75rem; color:var(--gray-400);">Tiket</small></td>
          <td style="text-align: center; min-width: 170px;">${kekuranganHtml}</td>
          <td style="text-align: center;"><span class="font-mono font-bold" style="color:var(--gray-200); font-size:0.85rem;">${summary.daysInput > 0 ? summary.avgDaily.replace('.', ',') : '-'}</span> <small style="font-size:0.7rem; color:var(--gray-400);">/hari</small></td>
          <td style="text-align: center;">${diffDisplay}</td>
          <td style="text-align: center;"><span class="badge ${summary.statusBadge}" style="font-size:0.75rem;"><i class="${summary.statusIcon}" style="margin-right:4px;"></i>${summary.statusText}</span></td>
          <td style="text-align: center;">
            <button class="btn btn-outline-gray btn-sm" onclick="filterTiketByUser('${u.fullName.replace(/'/g, "\\'")}')" title="Filter Rincian Harian User Ini">
              <i class="fa-solid fa-filter text-red"></i>
              <span>Rincian</span>
            </button>
          </td>
        `;
        UI.tiketUserSummaryBody.appendChild(tr);
      });
    }
  }

  // ========================================================
  // Monthly Overview Top 4 Metric Cards
  // (Untuk admin: Data tim, Untuk user: Data perolehan diri sendiri)
  // ========================================================
  if (isAdmin) {
    const teamTotalTickets = monthLogs.reduce((acc, l) => acc + (Number(l.ticketCount) || 0), 0);
    if (UI.tiketStatTotalTickets) {
      UI.tiketStatTotalTickets.innerHTML = `${teamTotalTickets.toLocaleString('id-ID')} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Tiket</small>`;
    }
    if (UI.tiketStatTotalTicketsSub) {
      UI.tiketStatTotalTicketsSub.textContent = `Akumulasi seluruh agent (${monthLogs.length} input harian)`;
    }
    if (UI.tiketStatMonthlyTarget) {
      UI.tiketStatMonthlyTarget.innerHTML = `1.320 <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Tiket / User</small>`;
    }

    // Top Performer
    const allUserSummaries = users.map(u => {
      const uLogs = monthLogs.filter(l => l.userFullName === u.fullName);
      const tot = uLogs.reduce((acc, l) => acc + (Number(l.ticketCount) || 0), 0);
      return { user: u, total: tot, days: uLogs.length };
    }).sort((a, b) => b.total - a.total);

    if (allUserSummaries.length > 0 && allUserSummaries[0].days > 0) {
      const top = allUserSummaries[0];
      const topPct = ((top.total / MONTHLY_TICKET_TARGET) * 100).toFixed(1);
      if (UI.tiketStatTopUser) UI.tiketStatTopUser.textContent = top.user.fullName;
      if (UI.tiketStatTopUserSub) {
        UI.tiketStatTopUserSub.textContent = `Perolehan: ${top.total.toLocaleString('id-ID')} Tiket (${topPct}% dari 1.320)`;
      }
    } else {
      if (UI.tiketStatTopUser) UI.tiketStatTopUser.textContent = '-';
      if (UI.tiketStatTopUserSub) UI.tiketStatTopUserSub.textContent = 'Belum ada input bulan ini';
    }

    // Team Daily Average
    const teamDailyAvg = monthLogs.length > 0 ? (teamTotalTickets / monthLogs.length).toFixed(1) : '0,0';
    if (UI.tiketStatDailyAvg) {
      UI.tiketStatDailyAvg.innerHTML = `${teamDailyAvg.replace('.', ',')} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Tiket/Hari</small>`;
    }
    if (UI.tiketStatDailyAvgSub) {
      UI.tiketStatDailyAvgSub.textContent = 'Performa harian menuju target 1.320';
    }
    if (UI.tiketStatSlaTag) {
      UI.tiketStatSlaTag.textContent = 'Standar: ~60/Hari';
    }

    // Reset card headers for Admin
    const card1Label = document.querySelector('#tiketCardTotalTickets .metric-label');
    const card1Tag = document.querySelector('#tiketCardTotalTickets .metric-tag');
    if (card1Label) card1Label.textContent = 'Total Perolehan Tim Bulan Ini';
    if (card1Tag) card1Tag.textContent = 'Realisasi Tim';

    const card3Label = document.querySelector('#tiketCardTopUser .metric-label');
    const card3Tag = document.querySelector('#tiketCardTopUser .metric-tag');
    if (card3Label) card3Label.textContent = 'User Perolehan Terbanyak';
    if (card3Tag) {
      card3Tag.textContent = 'Top Performer';
      card3Tag.className = 'metric-tag tag-yellow';
    }

    const card4Label = document.querySelector('#tiketCardDailyAvg .metric-label');
    if (card4Label) card4Label.textContent = 'Rata-rata Perolehan Tim';
  } else {
    // ========================================================
    // REGULAR USER: ONLY OWN STATS ARE VISIBLE!
    // ========================================================
    const myLogs = monthLogs.filter(l => l.userFullName === currentFullName || (currentUser && l.userId === currentUser.id));
    const myTotalTickets = myLogs.reduce((acc, l) => acc + (Number(l.ticketCount) || 0), 0);
    const myDaysInput = myLogs.length;
    const myDailyAvg = myDaysInput > 0 ? (myTotalTickets / myDaysInput).toFixed(1) : '0,0';
    const myTargetPct = ((myTotalTickets / MONTHLY_TICKET_TARGET) * 100).toFixed(1);
    const myRemaining = MONTHLY_TICKET_TARGET - myTotalTickets;

    // Card 1: Total Perolehan Tiket Saya
    const card1Label = document.querySelector('#tiketCardTotalTickets .metric-label');
    const card1Tag = document.querySelector('#tiketCardTotalTickets .metric-tag');
    if (card1Label) card1Label.textContent = 'Total Perolehan Tiket Saya';
    if (card1Tag) card1Tag.textContent = 'Perolehan Pribadi';

    if (UI.tiketStatTotalTickets) {
      UI.tiketStatTotalTickets.innerHTML = `${myTotalTickets.toLocaleString('id-ID')} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Tiket</small>`;
    }
    if (UI.tiketStatTotalTicketsSub) {
      UI.tiketStatTotalTicketsSub.textContent = `Akumulasi perolehan pribadi (${myDaysInput} hari input)`;
    }

    // Card 2: Target Bulanan Anda
    if (UI.tiketStatMonthlyTarget) {
      UI.tiketStatMonthlyTarget.innerHTML = `1.320 <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Tiket / Bulan</small>`;
    }

    // Card 3: Pencapaian Target Saya
    const card3Label = document.querySelector('#tiketCardTopUser .metric-label');
    const card3Tag = document.querySelector('#tiketCardTopUser .metric-tag');
    if (card3Label) card3Label.textContent = 'Status Pencapaian Target Saya';
    if (card3Tag) {
      card3Tag.textContent = myTotalTickets >= MONTHLY_TICKET_TARGET ? 'Target Tercapai' : 'Progres Target';
      card3Tag.className = myTotalTickets >= MONTHLY_TICKET_TARGET ? 'metric-tag tag-green' : 'metric-tag tag-yellow';
    }

    if (UI.tiketStatTopUser) {
      if (myTotalTickets >= MONTHLY_TICKET_TARGET) {
        UI.tiketStatTopUser.innerHTML = '<span class="text-green"><i class="fa-solid fa-check-double"></i> Target Tercapai</span>';
      } else if (myDaysInput > 0) {
        UI.tiketStatTopUser.innerHTML = `<span class="text-yellow">Kurang ${myRemaining.toLocaleString('id-ID')} Tiket</span>`;
      } else {
        UI.tiketStatTopUser.textContent = 'Belum Ada Input';
      }
    }
    if (UI.tiketStatTopUserSub) {
      UI.tiketStatTopUserSub.textContent = `${myTargetPct}% tercapai dari target 1.320 tiket`;
    }

    // Card 4: Rata-rata Harian Saya
    const card4Label = document.querySelector('#tiketCardDailyAvg .metric-label');
    if (card4Label) card4Label.textContent = 'Rata-rata Harian Saya';

    if (UI.tiketStatDailyAvg) {
      UI.tiketStatDailyAvg.innerHTML = `${myDailyAvg.replace('.', ',')} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Tiket/Hari</small>`;
    }
    if (UI.tiketStatDailyAvgSub) {
      UI.tiketStatDailyAvgSub.textContent = myTotalTickets >= MONTHLY_TICKET_TARGET ? 'Target bulanan 1.320 tiket telah terpenuhi' : 'Rata-rata input harian pribadi Anda';
    }
    if (UI.tiketStatSlaTag) {
      UI.tiketStatSlaTag.textContent = Number(myDailyAvg) >= 60 ? 'Performa Prima' : 'Standar: ~60/Hari';
    }
  }

  // ========================================================
  // Section 2: Log Perolehan Tiket Harian (Interval Input Per Hari)
  // (Untuk user: Hanya data perolehan dirinya sendiri yang tampil)
  // ========================================================
  if (UI.tiketDailySubtitle) {
    UI.tiketDailySubtitle.textContent = '';
    UI.tiketDailySubtitle.classList.add('hidden');
  }

  const searchQ = (UI.searchTiketInput ? UI.searchTiketInput.value.trim().toLowerCase() : '');
  const filterUser = isAdmin ? (UI.filterTiketUserSelect ? UI.filterTiketUserSelect.value : 'ALL') : currentFullName;
  const filterService = (UI.filterTiketService ? UI.filterTiketService.value : 'ALL');
  const filterGrade = (UI.filterTiketGrade ? UI.filterTiketGrade.value : 'ALL');

  if (UI.btnClearSearchTiket) {
    UI.btnClearSearchTiket.classList.toggle('hidden', !searchQ);
  }

  const filteredLogs = monthLogs.filter(item => {
    // SECURITY / RBAC: Regular user can ONLY see their own ticket logs
    if (!isAdmin) {
      const matchSelf = (item.userFullName === currentFullName) ||
                        (currentUser && item.userId === currentUser.id) ||
                        (currentUser && item.username === currentUser.username);
      if (!matchSelf) return false;
    }
    const tCount = Number(item.ticketCount) || 0;
    if (searchQ) {
      const match = (item.userFullName || '').toLowerCase().includes(searchQ) ||
                    (item.date || '').toLowerCase().includes(searchQ) ||
                    (item.department || '').toLowerCase().includes(searchQ) ||
                    (item.notes || '').toLowerCase().includes(searchQ) ||
                    String(tCount).includes(searchQ);
      if (!match) return false;
    }
    if (isAdmin && filterUser !== 'ALL' && item.userFullName !== filterUser) return false;
    if (filterService !== 'ALL' && item.department !== filterService) return false;
    if (filterGrade === 'Tercapai' && tCount < 60) return false;
    if (filterGrade === 'Di Bawah Target' && tCount >= 60) return false;
    return true;
  });

  // Sort daily logs
  const sortMode = (UI.filterTiketScoreSort ? UI.filterTiketScoreSort.value : 'DATE_DESC');
  if (sortMode === 'SCORE_DESC') {
    filteredLogs.sort((a, b) => (Number(b.ticketCount) || 0) - (Number(a.ticketCount) || 0));
  } else if (sortMode === 'SCORE_ASC') {
    filteredLogs.sort((a, b) => (Number(a.ticketCount) || 0) - (Number(b.ticketCount) || 0));
  } else {
    filteredLogs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  // Batch Toolbar & Checkbox sync for Admin
  if (isAdmin) {
    if (UI.tiketThSelectAll) UI.tiketThSelectAll.classList.remove('hidden');
    const visibleIds = filteredLogs.map(l => l.id);
    const selectedVisibleCount = visibleIds.filter(id => state.selectedTiketIds.has(id)).length;
    if (UI.tiketSelectAllCheckbox) {
      UI.tiketSelectAllCheckbox.checked = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
      UI.tiketSelectAllCheckbox.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < visibleIds.length;
    }
    if (UI.tiketBatchBar) {
      const hasSelected = state.selectedTiketIds.size > 0;
      UI.tiketBatchBar.classList.toggle('hidden', !hasSelected);
      if (UI.tiketSelectedCount) {
        UI.tiketSelectedCount.textContent = state.selectedTiketIds.size;
      }
    }
  } else {
    if (UI.tiketThSelectAll) UI.tiketThSelectAll.classList.add('hidden');
    state.selectedTiketIds.clear();
    if (UI.tiketBatchBar) UI.tiketBatchBar.classList.add('hidden');
  }

  // Render Table Body
  if (!UI.tiketTableBody) return;
  UI.tiketTableBody.innerHTML = '';

  const totalCols = isAdmin ? 9 : 8;
  if (filteredLogs.length === 0) {
    const tr = document.createElement('tr');
    const emptyMsg = isAdmin
      ? 'Tidak ada log perolehan tiket harian yang sesuai dengan filter atau bulan terpilih.'
      : 'Tidak ada log perolehan tiket harian untuk akun Anda pada bulan atau filter terpilih.';
    tr.innerHTML = `<td colspan="${totalCols}" style="text-align: center; padding: 36px; color: var(--gray-400);"><i class="fa-regular fa-folder-open" style="font-size:1.8rem; display:block; margin-bottom:8px; opacity:0.6;"></i>${emptyMsg}</td>`;
    UI.tiketTableBody.appendChild(tr);
    return;
  }

  filteredLogs.forEach(item => {
    const tr = document.createElement('tr');
    const isChecked = state.selectedTiketIds.has(item.id);
    const tCount = Number(item.ticketCount) || 0;
    const isDayTargetAchieved = tCount >= 60;

    // Contribution to 1.320 monthly target
    const contribPct = ((tCount / MONTHLY_TICKET_TARGET) * 100).toFixed(1);

    const checkboxHtml = isAdmin ? `
      <td style="text-align: center;">
        <input type="checkbox" class="tiket-table-checkbox tiket-row-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''}>
      </td>
    ` : '';

    const actionHtml = isAdmin ? `
      <td style="text-align:center;">
        <div style="display:inline-flex; gap:4px;">
          <button class="btn btn-icon btn-sm" onclick="promptEditTiket('${item.id}')" title="Edit Perolehan Tiket">
            <i class="fa-solid fa-pen-to-square text-silver"></i>
          </button>
          <button class="btn btn-icon btn-sm" onclick="promptDeleteTiket('${item.id}', '${(item.userFullName || '').replace(/'/g, "\\'")}')" title="Hapus Perolehan Tiket">
            <i class="fa-solid fa-trash-can text-red"></i>
          </button>
        </div>
      </td>
    ` : `
      <td style="text-align:center;">
        <span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-eye" style="margin-right:4px;"></i>Hanya Lihat</span>
      </td>
    `;

    tr.innerHTML = `
      ${checkboxHtml}
      <td>
        <span class="font-mono font-bold" style="color:var(--gray-200);">${item.date || '-'}</span>
      </td>
      <td>
        <strong style="color:#fff; font-size:0.875rem;">${item.userFullName || '-'}</strong>
      </td>
      <td>
        <span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-headset text-red" style="margin-right:4px;"></i>${item.department || '-'}</span>
      </td>
      <td style="text-align: right;">
        <strong class="text-red font-mono" style="font-size:1.05rem;">${tCount}</strong> <small style="font-size:0.75rem; color:var(--gray-400);">Tiket</small>
      </td>
      <td style="text-align: center;">
        <span class="badge badge-red-subtle font-mono" style="font-size:0.75rem;" title="${tCount} dari 1.320 target bulanan">+${contribPct}%</span>
      </td>
      <td style="text-align: center;">
        ${isDayTargetAchieved 
          ? '<span class="badge badge-green" style="font-size:0.75rem;"><i class="fa-solid fa-check" style="margin-right:4px;"></i>Tercapai (≥60)</span>' 
          : '<span class="badge badge-yellow" style="font-size:0.75rem;"><i class="fa-solid fa-clock" style="margin-right:4px;"></i><60 Tiket</span>'}
      </td>
      <td>
        <div style="font-size:0.75rem; color:var(--gray-300); max-width:260px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${(item.notes || '').replace(/"/g, '&quot;')}">
          ${item.notes || '-'}
        </div>
      </td>
      ${actionHtml}
    `;
    UI.tiketTableBody.appendChild(tr);
  });
}

function openAddTiketModal() {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk menambah perolehan tiket user.', 'warning');
    return;
  }

  if (UI.modalTiketTitle) UI.modalTiketTitle.textContent = 'Input Perolehan Tiket Harian';
  if (UI.modalTiketSubtitle) {
    UI.modalTiketSubtitle.textContent = '';
    UI.modalTiketSubtitle.classList.add('hidden');
  }
  if (UI.btnSubmitTiketText) UI.btnSubmitTiketText.textContent = 'Simpan Perolehan Tiket';
  if (UI.formTiket) UI.formTiket.reset();
  if (UI.formTiketId) UI.formTiketId.value = '';

  // Populate user dropdown
  const users = state.getUsers();
  if (UI.formTiketUserSelect) {
    UI.formTiketUserSelect.innerHTML = users.map(u => `<option value="${u.fullName}" data-dept="${u.department || 'CSO INBOUND'}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
    if (users.length > 0 && UI.formTiketDept) {
      UI.formTiketDept.value = users[0].department || 'CSO INBOUND';
    }
  }

  // Set default date to today or current month
  const now = new Date();
  const selectedMonth = (UI.filterTiketMonth ? UI.filterTiketMonth.value : '2026-09') || '2026-09';
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const defaultDate = todayStr.startsWith(selectedMonth) ? todayStr : `${selectedMonth}-15`;

  if (UI.formTiketDate) UI.formTiketDate.value = defaultDate;
  if (UI.formTiketCount) UI.formTiketCount.value = '60';
  if (UI.formTiketNotes) UI.formTiketNotes.value = '';

  if (UI.modalTiketForm) UI.modalTiketForm.classList.remove('hidden');
}

function openEditTiketModal(item) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang dapat mengedit perolehan tiket user.', 'warning');
    return;
  }

  const users = state.getUsers();
  if (UI.formTiketUserSelect) {
    UI.formTiketUserSelect.innerHTML = users.map(u => `<option value="${u.fullName}" data-dept="${u.department || 'CSO INBOUND'}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
    UI.formTiketUserSelect.value = item.userFullName;
  }

  const tCount = item.ticketCount || 60;
  if (UI.formTiketId) UI.formTiketId.value = item.id;
  if (UI.formTiketDate) UI.formTiketDate.value = item.date;
  if (UI.formTiketDept) UI.formTiketDept.value = item.department || 'CSO INBOUND';
  if (UI.formTiketCount) UI.formTiketCount.value = tCount;
  if (UI.formTiketNotes) UI.formTiketNotes.value = item.notes || '';

  if (UI.modalTiketTitle) UI.modalTiketTitle.textContent = 'Edit Perolehan Tiket Harian';
  if (UI.modalTiketSubtitle) {
    UI.modalTiketSubtitle.textContent = '';
    UI.modalTiketSubtitle.classList.add('hidden');
  }
  if (UI.btnSubmitTiketText) UI.btnSubmitTiketText.textContent = 'Perbarui Perolehan Tiket';

  if (UI.modalTiketForm) UI.modalTiketForm.classList.remove('hidden');
}

function closeTiketModal() {
  if (UI.modalTiketForm) UI.modalTiketForm.classList.add('hidden');
}

function handleSaveTiket(e) {
  e.preventDefault();
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang memiliki wewenang untuk menyimpan atau mengubah perolehan tiket.', 'danger');
    return;
  }
  const u = state.currentUser;
  if (!u) return;

  const id = UI.formTiketId ? UI.formTiketId.value : '';
  const date = (UI.formTiketDate ? UI.formTiketDate.value : '').trim();
  const userFullName = (UI.formTiketUserSelect ? UI.formTiketUserSelect.value : '').trim();
  const department = (UI.formTiketDept ? UI.formTiketDept.value : 'CSO INBOUND');
  const ticketCount = parseInt(UI.formTiketCount ? UI.formTiketCount.value : '60', 10) || 0;
  const notes = (UI.formTiketNotes ? UI.formTiketNotes.value : '').trim();

  if (!date) {
    showToast('Form Belum Lengkap', 'Tanggal input harian wajib diisi.', 'warning');
    return;
  }
  if (!userFullName) {
    showToast('Form Belum Lengkap', 'Pilih petugas CSO yang memperoleh tiket.', 'warning');
    return;
  }
  if (ticketCount <= 0) {
    showToast('Jumlah Tidak Valid', 'Jumlah perolehan tiket harus lebih dari 0.', 'warning');
    return;
  }

  const tikets = state.getTikets();
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  if (id) {
    // EDIT
    const idx = tikets.findIndex(t => t.id === id);
    if (idx !== -1) {
      tikets[idx] = {
        ...tikets[idx],
        date,
        userFullName,
        department,
        ticketCount,
        notes
      };
      state.saveTikets(tikets);
      autoSyncTiketAction('save', { log: tikets[idx] });
      state.addLog('UPDATE_TIKET', 'Ubah Perolehan Tiket', `Admin ${u.fullName} memperbarui perolehan tiket harian ${userFullName} (${date}): ${ticketCount} tiket (Target bulanan 1.320).`);
      showToast('Perolehan Tiket Diperbarui', `Perolehan tiket <strong>${userFullName}</strong> (${date}) berhasil diperbarui menjadi <strong>${ticketCount} tiket</strong>.`, 'success');
    }
  } else {
    // NEW
    const newEntry = {
      id: 'tkt_' + Date.now(),
      date,
      userFullName,
      department,
      ticketCount,
      notes,
      createdAt: timeStr
    };
    tikets.unshift(newEntry);
    state.saveTikets(tikets);
    autoSyncTiketAction('save', { log: newEntry });
    state.addLog('CREATE_TIKET', 'Input Perolehan Tiket', `Admin ${u.fullName} mencatat perolehan tiket harian untuk ${userFullName}: ${ticketCount} tiket (Target bulanan 1.320).`);
    showToast('Perolehan Tiket Disimpan', `Perolehan tiket <strong>${ticketCount} tiket</strong> untuk <strong>${userFullName}</strong> (${date}) berhasil dicatat.`, 'success');
  }

  closeTiketModal();
  renderTiketPage();
}

window.promptEditTiket = function(id) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk mengedit perolehan tiket.', 'warning');
    return;
  }
  const tikets = state.getTikets();
  const item = tikets.find(t => t.id === id);
  if (!item) return;
  openEditTiketModal(item);
};

window.promptDeleteTiket = function(id, name) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki hak izin untuk menghapus perolehan tiket.', 'warning');
    return;
  }
  state.pendingDelete = { type: 'tiket', id, name };
  UI.confirmDeleteTitle.textContent = 'Hapus Perolehan Tiket?';
  UI.confirmDeleteMessage.innerHTML = `Data perolehan tiket harian <strong>${name}</strong> akan dihapus permanen dari sistem. Target akumulasi bulanan user akan disesuaikan.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.filterTiketByUser = function(userFullName) {
  const currentFullName = state.currentUser ? state.currentUser.fullName : '';
  if (!state.isAdmin() && userFullName !== currentFullName) {
    showToast('Akses Dibatasi', 'Anda hanya dapat melihat rincian tiket untuk diri Anda sendiri.', 'warning');
    return;
  }
  if (UI.filterTiketUserSelect) {
    UI.filterTiketUserSelect.value = userFullName;
  }
  renderTiketPage();
  if (UI.tableTiketLogs) {
    UI.tableTiketLogs.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function promptDeleteAllTiketMonth() {
  if (!state.isAdmin()) return;
  const month = (UI.filterTiketMonth ? UI.filterTiketMonth.value : '2026-09') || '2026-09';
  const monthLabels = {
    '2026-09': 'September 2026',
    '2026-08': 'Agustus 2026',
    '2026-07': 'Juli 2026'
  };
  const monthText = monthLabels[month] || month;
  const count = state.getTikets().filter(l => (l.date || '').startsWith(month)).length;
  if (count === 0) {
    showToast('Tidak Ada Data', `Tidak ada data perolehan tiket di bulan ${monthText} untuk dihapus.`, 'warning');
    return;
  }
  state.pendingDelete = { type: 'tiket_month', id: month, name: monthText };
  UI.confirmDeleteTitle.textContent = 'Hapus Seluruh Data Perolehan Tiket Bulan Ini?';
  UI.confirmDeleteMessage.innerHTML = `Anda akan menghapus <strong>${count} data perolehan tiket</strong> pada periode <strong>${monthText}</strong> secara permanen.`;
  UI.modalConfirmDelete.classList.remove('hidden');
}

function promptDeleteSelectedTiket() {
  if (!state.isAdmin()) return;
  const selectedList = Array.from(state.selectedTiketIds || []);
  if (selectedList.length === 0) {
    showToast('Belum Ada Data Ditandai', 'Silakan tandai minimal satu data perolehan tiket yang ingin dihapus.', 'warning');
    return;
  }
  state.pendingDelete = { type: 'tiket_batch', id: 'batch', name: `${selectedList.length} data perolehan tiket`, ids: selectedList };
  UI.confirmDeleteTitle.textContent = 'Hapus Data Perolehan Tiket yang Ditandai?';
  UI.confirmDeleteMessage.innerHTML = `Anda akan menghapus <strong>${selectedList.length} data perolehan tiket</strong> yang telah ditandai secara permanen.`;
  UI.modalConfirmDelete.classList.remove('hidden');
}

function toggleSelectAllTiket(selectAll) {
  if (!state.isAdmin()) return;
  const selectedMonth = (UI.filterTiketMonth ? UI.filterTiketMonth.value : '2026-09') || '2026-09';
  const monthLogs = state.getTikets().filter(l => (l.date || '').startsWith(selectedMonth));
  const searchQ = (UI.searchTiketInput ? UI.searchTiketInput.value.trim().toLowerCase() : '');
  const filterUser = (UI.filterTiketUserSelect ? UI.filterTiketUserSelect.value : 'ALL');
  const filterService = (UI.filterTiketService ? UI.filterTiketService.value : 'ALL');
  const filterGrade = (UI.filterTiketGrade ? UI.filterTiketGrade.value : 'ALL');

  const filtered = monthLogs.filter(item => {
    const tCount = Number(item.ticketCount) || 0;
    if (searchQ) {
      const match = (item.userFullName || '').toLowerCase().includes(searchQ) ||
                    (item.date || '').toLowerCase().includes(searchQ) ||
                    (item.department || '').toLowerCase().includes(searchQ) ||
                    (item.notes || '').toLowerCase().includes(searchQ) ||
                    String(tCount).includes(searchQ);
      if (!match) return false;
    }
    if (filterUser !== 'ALL' && item.userFullName !== filterUser) return false;
    if (filterService !== 'ALL' && item.department !== filterService) return false;
    if (filterGrade === 'Tercapai' && tCount < 60) return false;
    if (filterGrade === 'Di Bawah Target' && tCount >= 60) return false;
    return true;
  });

  const shouldSelect = (selectAll !== undefined) ? selectAll : (state.selectedTiketIds.size < filtered.length);
  if (shouldSelect) {
    filtered.forEach(item => state.selectedTiketIds.add(item.id));
  } else {
    filtered.forEach(item => state.selectedTiketIds.delete(item.id));
  }
  renderTiketPage();
}

function deselectAllTiket() {
  state.selectedTiketIds.clear();
  renderTiketPage();
}

function exportTiketExcel() {
  const isAdmin = state.isAdmin();
  const currentUser = state.currentUser;
  const currentFullName = currentUser ? currentUser.fullName : '';
  const selectedMonth = (UI.filterTiketMonth ? UI.filterTiketMonth.value : '2026-09') || '2026-09';
  const allTikets = state.getTikets();
  const users = state.getUsers();

  let exportLogs;
  if (state.selectedTiketIds && state.selectedTiketIds.size > 0) {
    exportLogs = allTikets.filter(l => state.selectedTiketIds.has(l.id));
  } else {
    let monthLogs = allTikets.filter(l => (l.date || '').startsWith(selectedMonth));
    if (!isAdmin) {
      monthLogs = monthLogs.filter(l => l.userFullName === currentFullName);
    }
    exportLogs = monthLogs;
  }

  if (exportLogs.length === 0) {
    showToast('Data Kosong', 'Tidak ada data Perolehan Tiket untuk diekspor.', 'warning');
    return;
  }

  const sheet1Data = [
    ['No', 'ID Tiket', 'Tanggal Input', 'Nama Petugas CSO', 'Layanan CSO', 'Kategori Tiket', 'Jumlah Tiket Harian', 'Tiket Terselesaikan', 'Kepatuhan SLA (%)', 'Catatan Kinerja']
  ];
  exportLogs.forEach((l, idx) => {
    sheet1Data.push([
      idx + 1,
      l.id,
      l.date,
      l.userFullName,
      l.department,
      l.category || '-',
      Number(l.ticketCount) || 0,
      Number(l.solvedTickets) || Number(l.ticketCount) || 0,
      parseFloat(l.slaRate) || 100,
      l.notes || '-'
    ]);
  });

  const sheet2Data = [
    ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Kerja Input', 'Total Tiket Diperoleh', 'Rata-rata Tiket / Hari', 'Target Bulanan', 'Persentase Capaian (%)', 'Status Target']
  ];
  const targetUsers = isAdmin ? users : users.filter(u => u.fullName === currentFullName);
  targetUsers.forEach((u, idx) => {
    const userMonthLogs = allTikets.filter(l => (l.date || '').startsWith(selectedMonth) && l.userFullName === u.fullName);
    const days = userMonthLogs.length;
    const total = userMonthLogs.reduce((acc, curr) => acc + (Number(curr.ticketCount) || 0), 0);
    const avg = days > 0 ? parseFloat((total / days).toFixed(1)) : 0;
    const pct = parseFloat(((total / 1320) * 100).toFixed(1));
    const status = total >= 1320 ? 'Mencapai Target' : 'Belum Mencapai Target';

    sheet2Data.push([
      idx + 1,
      u.fullName,
      u.department || 'CSO INBOUND',
      days,
      total,
      avg,
      1320,
      `${pct}%`,
      status
    ]);
  });

  const filename = `DRIVE_Perolehan_Tiket_Agent_${selectedMonth}_${new Date().toISOString().slice(0, 10)}.xlsx`;

  if (typeof XLSX !== 'undefined' && XLSX.utils) {
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
    const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
    ws1['!cols'] = [
      { wch: 6 }, { wch: 18 }, { wch: 16 }, { wch: 22 }, { wch: 26 },
      { wch: 30 }, { wch: 18 }, { wch: 20 }, { wch: 20 }, { wch: 50 }
    ];
    ws2['!cols'] = [
      { wch: 6 }, { wch: 22 }, { wch: 26 }, { wch: 18 }, { wch: 22 },
      { wch: 22 }, { wch: 16 }, { wch: 24 }, { wch: 24 }
    ];
    XLSX.utils.book_append_sheet(wb, ws1, 'Log Tiket Harian');
    XLSX.utils.book_append_sheet(wb, ws2, 'Rekapitulasi Target Bulanan');
    XLSX.writeFile(wb, filename);
  } else {
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + sheet1Data.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', filename.replace('.xlsx', '.csv'));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showToast('Download Berhasil', `Data Perolehan Tiket (${exportLogs.length} baris) berhasil diunduh menjadi Excel.`, 'success');
}

// ==========================================
// 12.6.1 TIKET GOOGLE SPREADSHEET INTEGRATION
// ==========================================

const TIKET_APPS_SCRIPT_TEMPLATE = `/**
 * =====================================================================
 * GOOGLE APPS SCRIPT: INTEGRASI DATA PEROLEHAN TIKET AGENT
 * Dashboard Agent CSO - Iconnet
 * =====================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Spreadsheet baru di browser Anda (https://sheets.new).
 * 2. Klik menu 'Ekstensi' (Extensions) > 'Apps Script'.
 * 3. Hapus semua kode default dan tempel seluruh isi script ini.
 * 4. Klik ikon Disket (Simpan / Ctrl+S).
 * 5. Klik tombol 'Deploy' (Terapkan) > 'New deployment' (Penerapan baru).
 * 6. Klik ikon gear di sebelah kiri 'Select type', pilih 'Web app'.
 * 7. Isi keterangan: 'Integrasi Dashboard Tiket'.
 * 8. Atur 'Execute as' (Jalankan sebagai) -> 'Me' (Email Anda).
 * 9. Atur 'Who has access' (Siapa yang memiliki akses) -> 'Anyone' (Siapa saja).
 * 10. Klik 'Deploy', berikan izin akun (Authorize Access), lalu salin URL Web App yang muncul.
 * 11. Tempel URL Web App ke Pengaturan Google Spreadsheet di menu Tiket!
 * =====================================================================
 */

const SHEET_NAME = 'Tiket_Data';
const HEADERS = [
  'ID Tiket',
  'Tanggal Input',
  'Nama Petugas CSO',
  'Layanan CSO',
  'Kategori Tiket',
  'Jumlah Tiket Harian',
  'Tiket Terselesaikan',
  'Kepatuhan SLA (%)',
  'Catatan Kinerja',
  'Waktu Dibuat'
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() < 1) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#10b981');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    for (let c = 1; c <= HEADERS.length; c++) {
      sheet.autoResizeColumn(c);
    }
  }
  return sheet;
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'get_all';
    if (action === 'ping') {
      return createJsonResponse({ success: true, message: 'Google Apps Script Tiket siap terhubung!', time: new Date() });
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse({ success: true, count: 0, data: [] });
    }

    const rows = [];
    for (let i = 1; i < data.length; i++) {
      const r = data[i];
      if (!r[0]) continue;
      rows.push({
        id: String(r[0]),
        date: r[1] instanceof Date ? Utilities.formatDate(r[1], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(r[1]),
        userFullName: String(r[2] || ''),
        department: String(r[3] || ''),
        category: String(r[4] || '-'),
        ticketCount: parseInt(r[5], 10) || 0,
        solvedTickets: parseInt(r[6], 10) || parseInt(r[5], 10) || 0,
        slaRate: parseFloat(r[7]) || 100,
        notes: String(r[8] || ''),
        createdAt: String(r[9] || '')
      });
    }

    return createJsonResponse({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    let payload;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    } else {
      payload = {};
    }

    const action = payload.action || 'sync_all';
    const sheet = getOrCreateSheet();

    if (action === 'sync_all') {
      const logs = payload.logs || [];
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      if (logs.length > 0) {
        const rowsToAppend = logs.map(l => [
          l.id,
          l.date,
          l.userFullName,
          l.department,
          l.category || '-',
          parseInt(l.ticketCount, 10) || 0,
          parseInt(l.solvedTickets, 10) || parseInt(l.ticketCount, 10) || 0,
          parseFloat(l.slaRate) || 100,
          l.notes || '-',
          l.createdAt || ''
        ]);
        sheet.getRange(2, 1, rowsToAppend.length, HEADERS.length).setValues(rowsToAppend);
      }
      return createJsonResponse({ success: true, message: 'Sync all tiket berhasil', count: logs.length });
    }

    if (action === 'save') {
      const l = payload.log;
      if (!l || !l.id) return createJsonResponse({ success: false, error: 'Data tiket tidak valid' });

      const data = sheet.getDataRange().getValues();
      let foundRow = -1;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(l.id)) {
          foundRow = i + 1;
          break;
        }
      }

      const rowData = [
        l.id,
        l.date,
        l.userFullName,
        l.department,
        l.category || '-',
        parseInt(l.ticketCount, 10) || 0,
        parseInt(l.solvedTickets, 10) || parseInt(l.ticketCount, 10) || 0,
        parseFloat(l.slaRate) || 100,
        l.notes || '-',
        l.createdAt || ''
      ];

      if (foundRow > 0) {
        sheet.getRange(foundRow, 1, 1, HEADERS.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
      return createJsonResponse({ success: true, message: 'Data tiket berhasil disimpan ke Google Sheets' });
    }

    if (action === 'delete') {
      const id = payload.id;
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(id)) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ success: true, message: 'Data tiket berhasil dihapus dari Google Sheets' });
        }
      }
      return createJsonResponse({ success: true, message: 'ID tiket tidak ditemukan di sheet' });
    }

    if (action === 'delete_month') {
      const month = payload.month;
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        const rowDate = String(data[i][1]);
        if (rowDate.indexOf(month) === 0) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Data tiket bulanan berhasil dibersihkan dari Google Sheets' });
    }

    if (action === 'delete_batch') {
      const ids = payload.ids || [];
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (ids.indexOf(String(data[i][0])) !== -1) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Batch baris tiket berhasil dihapus dari Google Sheets' });
    }

    return createJsonResponse({ success: false, error: 'Aksi tidak dikenal: ' + action });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}`;

function renderTiketGSheetBar() {
  const config = state.getTiketGSheetConfig();
  const isConfigured = Boolean(config.webAppUrl && config.webAppUrl.trim());
  const cleanId = extractGoogleSpreadsheetId(config.sheetId);
  const openUrl = cleanId ? `https://docs.google.com/spreadsheets/d/${cleanId}` : config.webAppUrl;

  // Header Badge
  if (UI.tiketGSheetHeaderBadge) {
    if (isConfigured) {
      UI.tiketGSheetHeaderBadge.textContent = 'Terhubung';
      UI.tiketGSheetHeaderBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      UI.tiketGSheetHeaderBadge.style.color = '#10b981';
      UI.tiketGSheetHeaderBadge.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    } else {
      UI.tiketGSheetHeaderBadge.textContent = 'Belum Terhubung';
      UI.tiketGSheetHeaderBadge.style.background = 'rgba(255, 255, 255, 0.08)';
      UI.tiketGSheetHeaderBadge.style.color = 'var(--gray-300)';
      UI.tiketGSheetHeaderBadge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    }
  }

  // Status Badge inside Bar
  if (UI.tiketGSheetStatusBadge) {
    if (isConfigured) {
      UI.tiketGSheetStatusBadge.textContent = 'Terhubung';
      UI.tiketGSheetStatusBadge.className = 'badge badge-green';
      UI.tiketGSheetStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      UI.tiketGSheetStatusBadge.style.color = '#10b981';
      UI.tiketGSheetStatusBadge.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    } else {
      UI.tiketGSheetStatusBadge.textContent = 'Belum Dikonfigurasi';
      UI.tiketGSheetStatusBadge.style.background = 'rgba(100, 116, 139, 0.2)';
      UI.tiketGSheetStatusBadge.style.color = '#94a3b8';
      UI.tiketGSheetStatusBadge.style.border = '1px solid rgba(100, 116, 139, 0.3)';
    }
  }

  // Status Info inside Bar
  if (UI.tiketGSheetStatusInfo) {
    if (isConfigured) {
      const syncTime = config.lastSyncTime ? `Terakhir sinkron: ${config.lastSyncTime}` : 'Belum pernah disinkronkan';
      const autoText = config.autoSync ? ' (Auto-Sync Aktif)' : ' (Sinkronisasi Manual)';
      UI.tiketGSheetStatusInfo.innerHTML = `<span style="color:#10b981;"><i class="fa-solid fa-circle-check" style="margin-right:4px;"></i>${syncTime}${autoText}</span>`;
    } else {
      UI.tiketGSheetStatusInfo.textContent = 'Klik tombol "Pengaturan & Script" untuk menghubungkan data perolehan tiket dengan Google Spreadsheet Anda.';
    }
  }

  // Open Link buttons
  if (UI.btnTiketGSheetOpenLink) {
    if (openUrl) {
      UI.btnTiketGSheetOpenLink.href = openUrl;
      UI.btnTiketGSheetOpenLink.classList.remove('hidden');
      UI.btnTiketGSheetOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnTiketGSheetOpenLink.classList.add('hidden');
      UI.btnTiketGSheetOpenLink.style.display = 'none';
    }
  }
  if (UI.btnTiketGSheetModalOpenLink) {
    if (openUrl) {
      UI.btnTiketGSheetModalOpenLink.href = openUrl;
      UI.btnTiketGSheetModalOpenLink.classList.remove('hidden');
      UI.btnTiketGSheetModalOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnTiketGSheetModalOpenLink.classList.add('hidden');
      UI.btnTiketGSheetModalOpenLink.style.display = 'none';
    }
  }
}

function openTiketGSheetModal() {
  const config = state.getTiketGSheetConfig();
  if (UI.inputTiketGSheetWebAppUrl) UI.inputTiketGSheetWebAppUrl.value = config.webAppUrl || '';
  if (UI.inputTiketGSheetUrl) UI.inputTiketGSheetUrl.value = config.sheetId || '';
  if (UI.inputTiketGSheetTabName) UI.inputTiketGSheetTabName.value = config.sheetName || 'Tiket_Data';
  if (UI.checkTiketGSheetAutoSync) UI.checkTiketGSheetAutoSync.checked = config.autoSync !== false;

  const logs = state.getTikets();
  if (UI.labelTiketGSheetModalTotalCount) UI.labelTiketGSheetModalTotalCount.textContent = `${logs.length} Baris`;
  if (UI.labelTiketGSheetModalLastSync) UI.labelTiketGSheetModalLastSync.textContent = config.lastSyncTime || 'Belum pernah';

  if (UI.labelTiketGSheetModalStatus) {
    if (config.webAppUrl) {
      UI.labelTiketGSheetModalStatus.innerHTML = '<span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Terhubung</span>';
    } else {
      UI.labelTiketGSheetModalStatus.innerHTML = '<span style="color:#94a3b8;"><i class="fa-regular fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Belum Dikonfigurasi</span>';
    }
  }

  if (UI.tiketAppsScriptCodePreview) {
    UI.tiketAppsScriptCodePreview.textContent = TIKET_APPS_SCRIPT_TEMPLATE;
  }

  switchTiketGSheetTab('config');
  renderTiketGSheetBar();
  if (UI.modalTiketGoogleSheets) UI.modalTiketGoogleSheets.classList.remove('hidden');
}

function closeTiketGSheetModal() {
  if (UI.modalTiketGoogleSheets) UI.modalTiketGoogleSheets.classList.add('hidden');
}

function switchTiketGSheetTab(tab) {
  if (tab === 'config') {
    if (UI.tabBtnTiketGSheetConfig) UI.tabBtnTiketGSheetConfig.classList.add('active');
    if (UI.tabBtnTiketGSheetGuide) UI.tabBtnTiketGSheetGuide.classList.remove('active');
    if (UI.tabContentTiketGSheetConfig) UI.tabContentTiketGSheetConfig.classList.remove('hidden');
    if (UI.tabContentTiketGSheetGuide) UI.tabContentTiketGSheetGuide.classList.add('hidden');
  } else {
    if (UI.tabBtnTiketGSheetConfig) UI.tabBtnTiketGSheetConfig.classList.remove('active');
    if (UI.tabBtnTiketGSheetGuide) UI.tabBtnTiketGSheetGuide.classList.add('active');
    if (UI.tabContentTiketGSheetConfig) UI.tabContentTiketGSheetConfig.classList.add('hidden');
    if (UI.tabContentTiketGSheetGuide) UI.tabContentTiketGSheetGuide.classList.remove('hidden');
  }
}

function saveTiketGSheetConfigHandler() {
  const current = state.getTiketGSheetConfig();
  const webAppUrl = (UI.inputTiketGSheetWebAppUrl ? UI.inputTiketGSheetWebAppUrl.value.trim() : '');
  const sheetInput = (UI.inputTiketGSheetUrl ? UI.inputTiketGSheetUrl.value.trim() : '');
  const sheetName = (UI.inputTiketGSheetTabName ? UI.inputTiketGSheetTabName.value.trim() : '') || 'Tiket_Data';
  const autoSync = UI.checkTiketGSheetAutoSync ? UI.checkTiketGSheetAutoSync.checked : true;

  const cleanId = extractGoogleSpreadsheetId(sheetInput);

  const updated = {
    ...current,
    webAppUrl,
    sheetId: cleanId || sheetInput,
    sheetName,
    autoSync
  };

  state.saveTiketGSheetConfig(updated);
  renderTiketGSheetBar();

  if (UI.labelTiketGSheetModalStatus) {
    if (webAppUrl) {
      UI.labelTiketGSheetModalStatus.innerHTML = '<span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Terhubung</span>';
    } else {
      UI.labelTiketGSheetModalStatus.innerHTML = '<span style="color:#94a3b8;"><i class="fa-regular fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Belum Dikonfigurasi</span>';
    }
  }

  showToast('Pengaturan Disimpan', 'Konfigurasi Google Spreadsheet untuk tiket berhasil disimpan.', 'success');
}

async function testTiketGSheetConnection() {
  const webAppUrl = (UI.inputTiketGSheetWebAppUrl ? UI.inputTiketGSheetWebAppUrl.value.trim() : '') || state.getTiketGSheetConfig().webAppUrl;
  if (!webAppUrl) {
    showToast('URL Kosong', 'Harap masukkan URL Web App Google Apps Script terlebih dahulu.', 'warning');
    return;
  }

  const btn = UI.btnTiketGSheetTest;
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menghubungkan...</span>';
  }

  try {
    const pingUrl = webAppUrl + (webAppUrl.includes('?') ? '&' : '?') + 'action=ping';
    const resp = await fetch(pingUrl, {
      method: 'GET',
      mode: 'cors'
    });

    if (resp.ok) {
      const data = await resp.json();
      if (data && data.success) {
        showToast('Koneksi Berhasil', 'Google Apps Script berhasil merespons dan terhubung ke spreadsheet!', 'success');
      } else {
        showToast('Terhubung', 'Respons diterima dari Google Apps Script Web App.', 'info');
      }
    } else {
      showToast('Koneksi Selesai', `Status HTTP: ${resp.status}. URL dapat diakses.`, 'info');
    }
  } catch (err) {
    showToast('Pengujian Selesai', 'Request terkirim. Jika URL Web App valid dengan izin "Anyone", koneksi siap digunakan.', 'info');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

async function pushTiketToGoogleSheets() {
  const config = state.getTiketGSheetConfig();
  if (!config.webAppUrl) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App Google Apps Script terlebih dahulu.', 'warning');
    openTiketGSheetModal();
    return;
  }

  const logs = state.getTikets();
  const pushBtn = UI.btnTiketGSheetPush;
  const modalPushBtn = UI.btnTiketGSheetModalPush;

  const setPushing = (isPushing) => {
    if (pushBtn) {
      pushBtn.disabled = isPushing;
      pushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
    if (modalPushBtn) {
      modalPushBtn.disabled = isPushing;
      modalPushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
  };

  setPushing(true);

  try {
    const payload = {
      action: 'sync_all',
      logs: logs
    };

    // Use text/plain to avoid preflight CORS restrictions from Google Apps Script Web App
    await fetch(config.webAppUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    });

    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    config.lastSyncTime = formatted;
    config.lastSyncStatus = 'success';
    state.saveTiketGSheetConfig(config);
    renderTiketGSheetBar();

    if (UI.labelTiketGSheetModalLastSync) UI.labelTiketGSheetModalLastSync.textContent = formatted;

    showToast('Sinkronisasi Sukses', `Sebanyak <strong>${logs.length} data tiket</strong> berhasil dikirim ke Google Spreadsheet.`, 'success');
  } catch (err) {
    console.error('Error pushing Tiket to Google Sheets:', err);
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    config.lastSyncTime = formatted;
    state.saveTiketGSheetConfig(config);
    renderTiketGSheetBar();
    showToast('Data Dikirim', `Permintaan sinkronisasi (${logs.length} data tiket) telah dikirim ke Google Spreadsheet.`, 'info');
  } finally {
    setPushing(false);
  }
}

async function pullTiketFromGoogleSheets() {
  const config = state.getTiketGSheetConfig();
  if (!config.webAppUrl && !config.sheetId) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App atau ID Spreadsheet terlebih dahulu.', 'warning');
    openTiketGSheetModal();
    return;
  }

  const pullBtn = UI.btnTiketGSheetPull;
  const modalPullBtn = UI.btnTiketGSheetModalPull;

  const setPulling = (isPulling) => {
    if (pullBtn) {
      pullBtn.disabled = isPulling;
      pullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
    if (modalPullBtn) {
      modalPullBtn.disabled = isPulling;
      modalPullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
  };

  setPulling(true);

  try {
    let pulledRows = null;

    if (config.webAppUrl) {
      const getUrl = config.webAppUrl + (config.webAppUrl.includes('?') ? '&' : '?') + 'action=get_all';
      const resp = await fetch(getUrl, { method: 'GET', mode: 'cors' });
      if (resp.ok) {
        const json = await resp.json();
        if (json && json.success && Array.isArray(json.data)) {
          pulledRows = json.data;
        }
      }
    }

    // Fallback to public sheet CSV export if Web App did not return JSON or if only sheetId is present
    if (!pulledRows && config.sheetId) {
      const cleanId = extractGoogleSpreadsheetId(config.sheetId);
      const csvUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv&sheet=${encodeURIComponent(config.sheetName || 'Tiket_Data')}`;
      const resp = await fetch(csvUrl);
      if (resp.ok) {
        const csvText = await resp.text();
        const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          pulledRows = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = parseCsvRow(lines[i]);
            if (cols[0]) {
              pulledRows.push({
                id: cols[0],
                date: cols[1] || '',
                userFullName: cols[2] || '',
                department: cols[3] || 'CSO INBOUND',
                category: cols[4] || '-',
                ticketCount: parseInt(cols[5], 10) || 0,
                solvedTickets: parseInt(cols[6], 10) || parseInt(cols[5], 10) || 0,
                slaRate: parseFloat(cols[7]) || 100,
                notes: cols[8] || '',
                createdAt: cols[9] || ''
              });
            }
          }
        }
      }
    }

    if (pulledRows && pulledRows.length > 0) {
      state.saveTikets(pulledRows);
      const now = new Date();
      const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      config.lastSyncTime = formatted;
      state.saveTiketGSheetConfig(config);
      renderTiketPage();
      showToast('Tarik Data Berhasil', `Berhasil mengambil <strong>${pulledRows.length} data tiket</strong> dari Google Spreadsheet.`, 'success');
    } else {
      showToast('Data Kosong / Tidak Terbaca', 'Tidak ada data tiket yang ditemukan pada Google Spreadsheet atau sheet masih kosong.', 'info');
    }
  } catch (err) {
    console.error('Error pulling Tiket from Google Sheets:', err);
    showToast('Gagal Menarik Data', 'Pastikan Google Apps Script sudah dideploy dengan akses "Anyone" atau sheet publik.', 'danger');
  } finally {
    setPulling(false);
  }
}

function autoSyncTiketAction(action, payload) {
  const config = state.getTiketGSheetConfig();
  if (!config.webAppUrl || config.autoSync === false) return;

  const bodyData = {
    action,
    ...payload
  };

  fetch(config.webAppUrl, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    }
  }).then(() => {
    const now = new Date();
    config.lastSyncTime = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    state.saveTiketGSheetConfig(config);
    renderTiketGSheetBar();
  }).catch(err => {
    console.warn('Auto-sync Tiket to Google Sheets notification:', err);
  });
}

function copyTiketAppsScriptCode() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(TIKET_APPS_SCRIPT_TEMPLATE).then(() => {
      showToast('Tersalin!', 'Kode Google Apps Script berhasil disalin ke clipboard.', 'success');
    }).catch(() => {
      fallbackCopyText(TIKET_APPS_SCRIPT_TEMPLATE);
    });
  } else {
    fallbackCopyText(TIKET_APPS_SCRIPT_TEMPLATE);
  }
}


// ==========================================
// 12.7 AHT (AVERAGE HANDLING TIME) - 1 BULAN & INTERVAL INPUT PER HARI
// ==========================================

function formatAhtSeconds(sec) {
  const safeSec = Math.max(0, parseInt(sec, 10) || 0);
  return `${Math.round(safeSec)} Detik`;
}

function formatAhtDuration(totalSec) {
  const safeSec = Math.max(0, parseInt(totalSec, 10) || 0);
  return `${safeSec.toLocaleString('id-ID')} Detik`;
}

function renderAhtPage() {
  const isAdmin = state.isAdmin();
  const currentUser = state.currentUser;
  const currentFullName = currentUser ? currentUser.fullName : '';

  const monthLabels = {
    '2026-09': 'September 2026',
    '2026-08': 'Agustus 2026',
    '2026-07': 'Juli 2026'
  };

  const selectedMonth = (UI.filterAhtMonth ? UI.filterAhtMonth.value : '2026-09') || '2026-09';
  const monthLabel = monthLabels[selectedMonth] || selectedMonth;

  if (UI.ahtMonthHeaderLabel) {
    UI.ahtMonthHeaderLabel.textContent = monthLabel;
  }

  // Update Page Title and Description based on Role
  const pageTitle = document.querySelector('#pageAht .page-title');
  const pageDesc = document.querySelector('#pageAht .page-desc');
  if (pageTitle) {
    pageTitle.textContent = isAdmin ? 'Average Handling Time (AHT)' : 'Average Handling Time (AHT) - Performa Saya';
  }
  if (pageDesc) {
    pageDesc.textContent = '';
    pageDesc.classList.add('hidden');
  }

  // Update Google Spreadsheet Integration Status Bar
  renderAhtGSheetBar();

  // Ensure Card 2 and Action column remain hidden
  const ahtCardSlaCompliance = document.getElementById('ahtCardSlaCompliance');
  if (ahtCardSlaCompliance) ahtCardSlaCompliance.classList.add('hidden');
  const thAhtAction = document.getElementById('thAhtAction');
  if (thAhtAction) thAhtAction.classList.add('hidden');

  // Update Permission Explanatory Banner & Action Visibility
  if (isAdmin) {
    if (UI.ahtBannerRoleLabel) UI.ahtBannerRoleLabel.textContent = 'Otoritas Akses Handling Time (AHT)';
    if (UI.ahtBannerRoleDesc) {
      UI.ahtBannerRoleDesc.textContent = '';
      UI.ahtBannerRoleDesc.classList.add('hidden');
    }
    if (UI.ahtBannerBadgePrivilege) {
      UI.ahtBannerBadgePrivilege.className = 'badge badge-admin';
      UI.ahtBannerBadgePrivilege.textContent = 'Akses Penuh (CRUD)';
    }
    if (UI.btnOpenAddAhtModal) UI.btnOpenAddAhtModal.classList.remove('hidden');
    if (UI.btnDeleteAllAhtMonth) UI.btnDeleteAllAhtMonth.classList.remove('hidden');
    if (UI.ahtThSelectAll) UI.ahtThSelectAll.classList.remove('hidden');
  } else {
    if (UI.ahtBannerRoleLabel) UI.ahtBannerRoleLabel.textContent = 'Otoritas Akses Handling Time (AHT)';
    if (UI.ahtBannerRoleDesc) {
      UI.ahtBannerRoleDesc.textContent = '';
      UI.ahtBannerRoleDesc.classList.add('hidden');
    }
    if (UI.ahtBannerBadgePrivilege) {
      UI.ahtBannerBadgePrivilege.className = 'badge badge-user';
      UI.ahtBannerBadgePrivilege.textContent = 'Hanya Lihat (Read-Only)';
    }
    if (UI.btnOpenAddAhtModal) UI.btnOpenAddAhtModal.classList.add('hidden');
    if (UI.btnDeleteAllAhtMonth) UI.btnDeleteAllAhtMonth.classList.add('hidden');
    if (UI.ahtThSelectAll) UI.ahtThSelectAll.classList.add('hidden');
    state.selectedAhtIds.clear();
    if (UI.ahtBatchBar) UI.ahtBatchBar.classList.add('hidden');
  }

  const allAhtLogs = state.getAhtLogs();
  const monthLogs = allAhtLogs.filter(l => (l.date || '').startsWith(selectedMonth));
  const users = state.getUsers();

  // Populate filterSummaryAhtUser in Section 1
  if (UI.filterSummaryAhtUser) {
    if (isAdmin) {
      const curVal = UI.filterSummaryAhtUser.value || 'ALL';
      UI.filterSummaryAhtUser.disabled = false;
      UI.filterSummaryAhtUser.innerHTML = '<option value="ALL">Semua Nama User</option>' +
        users.map(u => `<option value="${u.fullName}">${u.fullName}</option>`).join('');
      if (Array.from(UI.filterSummaryAhtUser.options).some(o => o.value === curVal)) {
        UI.filterSummaryAhtUser.value = curVal;
      }
    } else {
      UI.filterSummaryAhtUser.innerHTML = `<option value="${currentFullName}" selected>${currentFullName} (Diri Sendiri)</option>`;
      UI.filterSummaryAhtUser.disabled = true;
    }
  }

  // Populate filterAhtUserSelect in Section 2 toolbar
  if (UI.filterAhtUserSelect) {
    if (isAdmin) {
      const currentVal = UI.filterAhtUserSelect.value || 'ALL';
      UI.filterAhtUserSelect.disabled = false;
      UI.filterAhtUserSelect.innerHTML = '<option value="ALL">Semua User</option>' +
        users.map(u => `<option value="${u.fullName}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
      if (Array.from(UI.filterAhtUserSelect.options).some(o => o.value === currentVal)) {
        UI.filterAhtUserSelect.value = currentVal;
      }
    } else {
      UI.filterAhtUserSelect.innerHTML = `<option value="${currentFullName}" selected>${currentFullName} (Diri Sendiri)</option>`;
      UI.filterAhtUserSelect.disabled = true;
    }
  }

  // ========================================================
  // Section 1: Rekapitulasi Average Handling Time Bulanan
  // (Untuk admin: Data seluruh agent; Untuk user: Data dirinya sendiri)
  // ========================================================
  const summaryTitleEl = document.querySelector('#ahtUserSummarySection h3 span');
  const summaryDescEl = document.querySelector('#ahtUserSummarySection p');
  if (summaryTitleEl) {
    if (isAdmin) {
      summaryTitleEl.innerHTML = `Rekapitulasi Average Handling Time Seluruh Agent Periode <span id="ahtMonthHeaderLabel" class="text-red">${monthLabel}</span>`;
    } else {
      summaryTitleEl.innerHTML = `Rekapitulasi Average Handling Time Saya Periode <span id="ahtMonthHeaderLabel" class="text-red">${monthLabel}</span>`;
    }
  }
  if (summaryDescEl) {
    summaryDescEl.textContent = '';
    summaryDescEl.classList.add('hidden');
  }

  const summaryFilterUser = isAdmin ? (UI.filterSummaryAhtUser ? UI.filterSummaryAhtUser.value : 'ALL') : currentFullName;
  const summaryFilterService = (UI.filterSummaryAhtService ? UI.filterSummaryAhtService.value : 'ALL');

  const availableAgents = isAdmin
    ? users
    : users.filter(u => u.fullName === currentFullName || (currentUser && (u.username === currentUser.username || u.id === currentUser.id)));

  const filteredAgents = availableAgents.filter(u => {
    if (!isAdmin && u.fullName !== currentFullName) return false;
    if (isAdmin && summaryFilterUser !== 'ALL' && u.fullName !== summaryFilterUser) return false;
    if (summaryFilterService !== 'ALL' && (u.department || 'CSO INBOUND') !== summaryFilterService) return false;
    return true;
  });

  const userSummaries = filteredAgents.map(u => {
    const userLogs = monthLogs.filter(l => l.userFullName === u.fullName);
    const daysInput = userLogs.length;
    let totalInteractions = 0;
    let totalDurationSeconds = 0;
    let avgAhtSec = 0;
    let complianceDays = 0;
    let complianceRate = '0.0';
    let avgDeviationSec = 0;
    let statusText = 'Belum Ada Input';
    let statusBadge = 'badge-gray';
    let statusIcon = 'fa-regular fa-clock';

    if (daysInput > 0) {
      totalInteractions = userLogs.reduce((acc, l) => acc + (Number(l.interactionCount) || 1), 0);
      totalDurationSeconds = userLogs.reduce((acc, l) => acc + (Number(l.totalDurationSeconds) || ((Number(l.actualSeconds) || 0) * (Number(l.interactionCount) || 1))), 0);
      avgAhtSec = Math.round(totalDurationSeconds / Math.max(1, totalInteractions));
      complianceDays = userLogs.filter(l => (Number(l.actualSeconds) || 0) <= (Number(l.targetSeconds) || 300)).length;
      complianceRate = ((complianceDays / daysInput) * 100).toFixed(1);
      avgDeviationSec = avgAhtSec - 300;

      if (avgAhtSec <= 240) {
        statusText = 'Sangat Efisien';
        statusBadge = 'badge-green';
        statusIcon = 'fa-solid fa-bolt text-green';
      } else if (avgAhtSec <= 300) {
        statusText = 'Sesuai SLA';
        statusBadge = 'badge-green';
        statusIcon = 'fa-solid fa-circle-check text-green';
      } else {
        statusText = 'Over SLA';
        statusBadge = 'badge-yellow';
        statusIcon = 'fa-solid fa-triangle-exclamation text-yellow';
      }
    }

    return {
      user: u,
      daysInput,
      totalInteractions,
      totalDurationSeconds,
      avgAhtSec,
      complianceRate,
      avgDeviationSec,
      statusText,
      statusBadge,
      statusIcon
    };
  });

  // Sort summary by Fastest or Slowest
  const summarySort = (UI.filterAhtSummarySort ? UI.filterAhtSummarySort.value : 'FASTEST');
  if (summarySort === 'SLOWEST') {
    userSummaries.sort((a, b) => b.avgAhtSec - a.avgAhtSec);
  } else {
    // FASTEST
    userSummaries.sort((a, b) => {
      if (a.daysInput === 0 && b.daysInput > 0) return 1;
      if (b.daysInput === 0 && a.daysInput > 0) return -1;
      return a.avgAhtSec - b.avgAhtSec;
    });
  }

  if (UI.ahtUserCountBadge) {
    if (isAdmin) {
      UI.ahtUserCountBadge.textContent = `${filteredAgents.length} Agent Terdaftar`;
    } else {
      UI.ahtUserCountBadge.textContent = 'Performa Pribadi';
    }
  }

  // Render Section 1 table
  if (UI.ahtUserSummaryBody) {
    UI.ahtUserSummaryBody.innerHTML = '';
    if (userSummaries.length === 0) {
      UI.ahtUserSummaryBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:24px; color:var(--gray-400);"><i class="fa-regular fa-folder-open" style="font-size:1.5rem; display:block; margin-bottom:6px; opacity:0.6;"></i>Tidak ada data handling time yang sesuai dengan filter.</td></tr>';
    } else {
      userSummaries.forEach(summary => {
        const u = summary.user;
        const tr = document.createElement('tr');

        const avgFormatted = summary.daysInput > 0 ? formatAhtSeconds(summary.avgAhtSec) : '-';
        const durFormatted = summary.daysInput > 0 ? formatAhtDuration(summary.totalDurationSeconds) : '-';

        tr.innerHTML = `
          <td>
            <div style="display:flex; align-items:center; gap: 10px;">
              <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" alt="${u.fullName}" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:2px solid var(--border-color);">
              <div>
                <strong style="color:#fff; font-size:0.875rem;">${u.fullName}</strong>
                <div style="display:flex; align-items:center; gap:6px; margin-top:2px;">
                  <span class="badge ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}" style="font-size:0.65rem;">${u.role.toUpperCase()}</span>
                  <span style="font-size:0.75rem; color:var(--gray-400);">${u.email}</span>
                </div>
              </div>
            </div>
          </td>
          <td><span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-headset text-red" style="margin-right:4px;"></i>${u.department || 'CSO Layanan'}</span></td>
          <td style="text-align: center;"><span class="font-mono font-bold" style="color:var(--gray-200);">${summary.daysInput} Hari</span></td>
          <td style="text-align: right;"><span class="font-mono text-silver" style="font-size:0.85rem;">${durFormatted}</span></td>
          <td style="text-align: center;"><strong class="text-white font-mono" style="font-size:1.05rem;">${avgFormatted}</strong></td>
          <td style="text-align: center;" class="hidden">
            <button class="btn btn-outline-gray btn-sm" onclick="filterAhtByUser('${u.fullName.replace(/'/g, "\\'")}')" title="Filter Rincian Harian User Ini">
              <i class="fa-solid fa-filter text-red"></i>
              <span>Rincian</span>
            </button>
          </td>
        `;
        UI.ahtUserSummaryBody.appendChild(tr);
      });
    }
  }

  // ========================================================
  // Monthly Overview Top 4 Metric Cards
  // ========================================================
  if (isAdmin) {
    let teamTotalDur = 0;
    let teamTotalInteractions = 0;

    monthLogs.forEach(l => {
      const act = Number(l.actualSeconds) || 0;
      const cnt = Number(l.interactionCount) || 1;
      teamTotalDur += (act * cnt);
      teamTotalInteractions += cnt;
    });

    const teamAvgSec = teamTotalInteractions > 0 ? Math.round(teamTotalDur / teamTotalInteractions) : 222;
    const teamDurationFormatted = `${teamTotalDur.toLocaleString('id-ID')}`;

    if (UI.ahtStatAvg) UI.ahtStatAvg.innerHTML = `${teamAvgSec.toLocaleString('id-ID')} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>`;
    if (UI.ahtStatAvgSub) UI.ahtStatAvgSub.textContent = `${teamAvgSec} detik rata-rata durasi penanganan`;

    const card2Label = document.getElementById('ahtStatCard2Label');
    if (card2Label) card2Label.textContent = 'Total Interaksi Ditangani';
    if (UI.ahtStatCompliance) UI.ahtStatCompliance.innerHTML = `${teamTotalInteractions.toLocaleString('id-ID')} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Sesi</small>`;
    if (UI.ahtStatComplianceSub) UI.ahtStatComplianceSub.textContent = `${monthLogs.length} total sesi input harian bulan ini`;

    const card3Label = document.getElementById('ahtStatCard3Label');
    if (card3Label) card3Label.textContent = 'Total Durasi Penanganan';
    if (UI.ahtStatOver) UI.ahtStatOver.innerHTML = `${teamDurationFormatted} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>`;
    if (UI.ahtStatOverSub) UI.ahtStatOverSub.textContent = `${teamDurationFormatted} detik akumulasi penanganan interaksi`;

    // Card 4: Top Performer User (Fastest agent)
    const validAgents = userSummaries.filter(s => s.daysInput > 0);
    if (validAgents.length > 0) {
      const best = validAgents[0]; // Already sorted FASTEST
      if (UI.ahtStatTopUser) UI.ahtStatTopUser.textContent = best.user.fullName;
      if (UI.ahtStatTopUserSub) UI.ahtStatTopUserSub.textContent = `AHT: ${formatAhtSeconds(best.avgAhtSec)}`;
    } else {
      if (UI.ahtStatTopUser) UI.ahtStatTopUser.textContent = '-';
      if (UI.ahtStatTopUserSub) UI.ahtStatTopUserSub.textContent = 'Belum ada input bulan ini';
    }

    const card1Label = document.querySelector('#ahtCardMonthlyAvg .metric-label');
    if (card1Label) card1Label.textContent = 'Rata-rata AHT Tim Bulan Ini';
    const card4Label = document.getElementById('ahtStatTopUserLabel');
    if (card4Label) card4Label.textContent = 'Agen Penanganan Tercepat';
  } else {
    // REGULAR USER STATS
    const myLogs = monthLogs.filter(l => l.userFullName === currentFullName);
    const myDaysInput = myLogs.length;
    let myTotalDur = 0;
    let myTotalInteractions = 0;

    myLogs.forEach(l => {
      const act = Number(l.actualSeconds) || 0;
      const cnt = Number(l.interactionCount) || 1;
      myTotalDur += (act * cnt);
      myTotalInteractions += cnt;
    });

    const myAvgSec = myTotalInteractions > 0 ? Math.round(myTotalDur / myTotalInteractions) : 0;
    const myDurationFormatted = `${myTotalDur.toLocaleString('id-ID')}`;

    const card1Label = document.querySelector('#ahtCardMonthlyAvg .metric-label');
    if (card1Label) card1Label.textContent = 'Rata-rata AHT Saya Bulan Ini';
    if (UI.ahtStatAvg) UI.ahtStatAvg.innerHTML = `${myDaysInput > 0 ? myAvgSec.toLocaleString('id-ID') : '0'} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>`;
    if (UI.ahtStatAvgSub) UI.ahtStatAvgSub.textContent = myDaysInput > 0 ? `${myAvgSec} detik rata-rata durasi (${myDaysInput} hari input)` : 'Belum ada data bulan ini';

    const card2Label = document.getElementById('ahtStatCard2Label');
    if (card2Label) card2Label.textContent = 'Total Interaksi Saya';
    if (UI.ahtStatCompliance) UI.ahtStatCompliance.innerHTML = `${myTotalInteractions.toLocaleString('id-ID')} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Sesi</small>`;
    if (UI.ahtStatComplianceSub) UI.ahtStatComplianceSub.textContent = myDaysInput > 0 ? `Total sesi interaksi yang ditangani` : 'Belum ada data bulan ini';

    const card3Label = document.getElementById('ahtStatCard3Label');
    if (card3Label) card3Label.textContent = 'Total Durasi Saya';
    if (UI.ahtStatOver) UI.ahtStatOver.innerHTML = `${myDaysInput > 0 ? myDurationFormatted : '0'} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>`;
    if (UI.ahtStatOverSub) UI.ahtStatOverSub.textContent = myDaysInput > 0 ? `${myDurationFormatted} detik akumulasi pelayanan interaksi` : 'Belum ada data bulan ini';

    const card4Label = document.getElementById('ahtStatTopUserLabel');
    if (card4Label) card4Label.textContent = 'Status Kecepatan Penanganan';
    if (UI.ahtStatTopUser) {
      if (myDaysInput === 0) {
        UI.ahtStatTopUser.textContent = 'Belum Ada Input';
      } else if (myAvgSec <= 240) {
        UI.ahtStatTopUser.innerHTML = '<span class="text-green"><i class="fa-solid fa-bolt"></i> Sangat Efisien</span>';
      } else {
        UI.ahtStatTopUser.innerHTML = '<span class="text-cyan"><i class="fa-solid fa-circle-check"></i> Normal</span>';
      }
    }
    if (UI.ahtStatTopUserSub) {
      UI.ahtStatTopUserSub.textContent = myDaysInput > 0 ? `Rata-rata: ${formatAhtSeconds(myAvgSec)}` : 'Pencatatan dikelola oleh Admin';
    }
  }

  // ========================================================
  // Section 2: Log Handling Time Harian (Interval Input Per Hari)
  // ========================================================
  if (UI.ahtDailySubtitle) {
    UI.ahtDailySubtitle.textContent = '';
    UI.ahtDailySubtitle.classList.add('hidden');
  }

  const searchQ = (UI.searchAhtInput ? UI.searchAhtInput.value.trim().toLowerCase() : '');
  const filterUser = isAdmin ? (UI.filterAhtUserSelect ? UI.filterAhtUserSelect.value : 'ALL') : currentFullName;
  const filterService = (UI.filterAhtService ? UI.filterAhtService.value : 'ALL');
  const filterStatus = (UI.filterAhtStatus ? UI.filterAhtStatus.value : 'ALL');

  if (UI.btnClearSearchAht) {
    UI.btnClearSearchAht.classList.toggle('hidden', !searchQ);
  }

  const filteredLogs = monthLogs.filter(item => {
    // RBAC: Regular user can ONLY see their own logs
    if (!isAdmin) {
      const matchSelf = (item.userFullName === currentFullName) ||
                        (currentUser && item.userId === currentUser.id) ||
                        (currentUser && item.username === currentUser.username);
      if (!matchSelf) return false;
    }

    if (searchQ) {
      const match = (item.userFullName || '').toLowerCase().includes(searchQ) ||
                    (item.date || '').toLowerCase().includes(searchQ) ||
                    (item.department || '').toLowerCase().includes(searchQ) ||
                    (item.notes || '').toLowerCase().includes(searchQ) ||
                    (item.status || '').toLowerCase().includes(searchQ);
      if (!match) return false;
    }

    if (isAdmin && filterUser !== 'ALL' && item.userFullName !== filterUser) return false;
    if (filterService !== 'ALL' && item.department !== filterService) return false;
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
    return true;
  });

  // Sort daily logs
  const sortMode = (UI.filterAhtSort ? UI.filterAhtSort.value : 'DATE_DESC');
  if (sortMode === 'DATE_ASC') {
    filteredLogs.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  } else if (sortMode === 'AHT_ASC') {
    filteredLogs.sort((a, b) => (Number(a.actualSeconds) || 0) - (Number(b.actualSeconds) || 0));
  } else if (sortMode === 'AHT_DESC') {
    filteredLogs.sort((a, b) => (Number(b.actualSeconds) || 0) - (Number(a.actualSeconds) || 0));
  } else {
    // DATE_DESC
    filteredLogs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  // Batch Toolbar & Checkbox sync for Admin
  if (isAdmin) {
    if (UI.ahtThSelectAll) UI.ahtThSelectAll.classList.remove('hidden');
    const visibleIds = filteredLogs.map(l => l.id);
    const selectedVisibleCount = visibleIds.filter(id => state.selectedAhtIds.has(id)).length;
    if (UI.ahtSelectAllCheckbox) {
      UI.ahtSelectAllCheckbox.checked = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
      UI.ahtSelectAllCheckbox.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < visibleIds.length;
    }
    if (UI.ahtBatchBar) {
      const hasSelected = state.selectedAhtIds.size > 0;
      UI.ahtBatchBar.classList.toggle('hidden', !hasSelected);
      if (UI.ahtSelectedCount) {
        UI.ahtSelectedCount.textContent = state.selectedAhtIds.size;
      }
    }
  } else {
    if (UI.ahtThSelectAll) UI.ahtThSelectAll.classList.add('hidden');
    state.selectedAhtIds.clear();
    if (UI.ahtBatchBar) UI.ahtBatchBar.classList.add('hidden');
  }

  // Render Table Body
  if (!UI.ahtTableBody) return;
  UI.ahtTableBody.innerHTML = '';

  const totalCols = isAdmin ? 7 : 6;
  if (filteredLogs.length === 0) {
    const tr = document.createElement('tr');
    const emptyMsg = isAdmin
      ? 'Tidak ada log handling time harian yang sesuai dengan filter atau bulan terpilih.'
      : 'Tidak ada log handling time harian untuk akun Anda pada bulan atau filter terpilih.';
    tr.innerHTML = `<td colspan="${totalCols}" style="text-align: center; padding: 36px; color: var(--gray-400);"><i class="fa-regular fa-folder-open" style="font-size:1.8rem; display:block; margin-bottom:8px; opacity:0.6;"></i>${emptyMsg}</td>`;
    UI.ahtTableBody.appendChild(tr);
    return;
  }

  filteredLogs.forEach(item => {
    const tr = document.createElement('tr');
    const isChecked = state.selectedAhtIds.has(item.id);
    const actualSec = Number(item.actualSeconds) || 0;
    const interactionCount = Number(item.interactionCount) || 1;
    const totalDurationSeconds = Number(item.totalDurationSeconds) || (actualSec * interactionCount);

    const durFormatted = formatAhtSeconds(actualSec);
    const totalDurFormatted = formatAhtDuration(totalDurationSeconds);

    const checkboxHtml = isAdmin ? `
      <td style="text-align: center;">
        <input type="checkbox" class="aht-table-checkbox aht-row-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''}>
      </td>
    ` : '';

    const actionHtml = isAdmin ? `
      <td style="text-align:center;" class="hidden">
        <div style="display:inline-flex; gap:4px;">
          <button class="btn btn-icon btn-sm" onclick="promptEditAht('${item.id}')" title="Edit Handling Time">
            <i class="fa-solid fa-pen-to-square text-silver"></i>
          </button>
          <button class="btn btn-icon btn-sm" onclick="promptDeleteAht('${item.id}', '${(item.userFullName || '').replace(/'/g, "\\'")}', '${item.date || ''}')" title="Hapus Handling Time">
            <i class="fa-solid fa-trash-can text-red"></i>
          </button>
        </div>
      </td>
    ` : `
      <td style="text-align:center;" class="hidden">
        <span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-eye" style="margin-right:4px;"></i>Hanya Lihat</span>
      </td>
    `;

    tr.innerHTML = `
      ${checkboxHtml}
      <td><span class="font-mono font-bold" style="color:var(--gray-200);">${item.date || '-'}</span></td>
      <td><strong style="color:#fff; font-size:0.875rem;">${item.userFullName || '-'}</strong></td>
      <td><span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-headset text-red" style="margin-right:4px;"></i>${item.department || '-'}</span></td>
      <td style="text-align: right;"><span class="font-mono text-silver" style="font-size:0.82rem;">${totalDurFormatted}</span></td>
      <td style="text-align: right;"><strong class="text-white font-mono" style="font-size:1.05rem;">${durFormatted}</strong></td>
      <td>
        <div style="font-size:0.75rem; color:var(--gray-300); max-width:240px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${(item.notes || '').replace(/"/g, '&quot;')}">
          ${item.notes || '-'}
        </div>
      </td>
      ${actionHtml}
    `;
    UI.ahtTableBody.appendChild(tr);
  });
}

function updateAhtModalDurationPreview() {
  const mins = parseInt(UI.formAhtDurationMins ? UI.formAhtDurationMins.value : '0', 10) || 0;
  const secs = parseInt(UI.formAhtDurationSecs ? UI.formAhtDurationSecs.value : '0', 10) || 0;
  const total = mins * 60 + secs;
  if (UI.formAhtDurationPreview) {
    UI.formAhtDurationPreview.innerHTML = `Durasi: <strong style="color:#fff;">${total.toLocaleString('id-ID')} detik</strong>`;
  }
}

function openAddAhtModal() {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk menambah handling time user.', 'warning');
    return;
  }

  if (UI.modalAhtTitle) UI.modalAhtTitle.textContent = 'Input Handling Time Harian (AHT)';
  if (UI.modalAhtSubtitle) {
    UI.modalAhtSubtitle.textContent = '';
    UI.modalAhtSubtitle.classList.add('hidden');
  }
  if (UI.btnSubmitAhtText) UI.btnSubmitAhtText.textContent = 'Simpan Handling Time';
  if (UI.formAht) UI.formAht.reset();
  if (UI.formAhtId) UI.formAhtId.value = '';

  // Populate user dropdown
  const users = state.getUsers();
  if (UI.formAhtUserSelect) {
    UI.formAhtUserSelect.innerHTML = users.map(u => `<option value="${u.fullName}" data-dept="${u.department || 'CSO INBOUND'}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
    if (users.length > 0 && UI.formAhtDept) {
      UI.formAhtDept.value = users[0].department || 'CSO INBOUND';
    }
  }

  // Set default date to today or selected month
  const now = new Date();
  const selectedMonth = (UI.filterAhtMonth ? UI.filterAhtMonth.value : '2026-09') || '2026-09';
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const defaultDate = todayStr.startsWith(selectedMonth) ? todayStr : `${selectedMonth}-15`;

  if (UI.formAhtDate) UI.formAhtDate.value = defaultDate;
  if (UI.formAhtInteractionCount) UI.formAhtInteractionCount.value = '1';
  if (UI.formAhtDurationMins) UI.formAhtDurationMins.value = '0';
  if (UI.formAhtDurationSecs) UI.formAhtDurationSecs.value = '220';
  if (UI.formAhtTargetSecs) UI.formAhtTargetSecs.value = '300';
  if (UI.formAhtNotes) UI.formAhtNotes.value = '';

  updateAhtModalDurationPreview();

  if (UI.modalAhtForm) UI.modalAhtForm.classList.remove('hidden');
}

function openEditAhtModal(item) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang dapat mengedit handling time user.', 'warning');
    return;
  }

  const users = state.getUsers();
  if (UI.formAhtUserSelect) {
    UI.formAhtUserSelect.innerHTML = users.map(u => `<option value="${u.fullName}" data-dept="${u.department || 'CSO INBOUND'}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
    UI.formAhtUserSelect.value = item.userFullName;
  }

  const actualSec = Number(item.actualSeconds) || 220;

  if (UI.formAhtId) UI.formAhtId.value = item.id;
  if (UI.formAhtDate) UI.formAhtDate.value = item.date;
  if (UI.formAhtDept) UI.formAhtDept.value = item.department || 'CSO INBOUND';
  if (UI.formAhtInteractionCount) UI.formAhtInteractionCount.value = item.interactionCount || '1';
  if (UI.formAhtDurationMins) UI.formAhtDurationMins.value = '0';
  if (UI.formAhtDurationSecs) UI.formAhtDurationSecs.value = actualSec;
  if (UI.formAhtTargetSecs) UI.formAhtTargetSecs.value = item.targetSeconds || 300;
  if (UI.formAhtNotes) UI.formAhtNotes.value = item.notes || '';

  if (UI.modalAhtTitle) UI.modalAhtTitle.textContent = 'Edit Handling Time Harian (AHT)';
  if (UI.modalAhtSubtitle) {
    UI.modalAhtSubtitle.textContent = '';
    UI.modalAhtSubtitle.classList.add('hidden');
  }
  if (UI.btnSubmitAhtText) UI.btnSubmitAhtText.textContent = 'Perbarui Handling Time';

  updateAhtModalDurationPreview();

  if (UI.modalAhtForm) UI.modalAhtForm.classList.remove('hidden');
}

function closeAhtModal() {
  if (UI.modalAhtForm) UI.modalAhtForm.classList.add('hidden');
}

function handleSaveAht(e) {
  e.preventDefault();
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang memiliki wewenang untuk menyimpan atau mengubah handling time.', 'danger');
    return;
  }
  const u = state.currentUser;
  if (!u) return;

  const id = UI.formAhtId ? UI.formAhtId.value : '';
  const date = (UI.formAhtDate ? UI.formAhtDate.value : '').trim();
  const userFullName = (UI.formAhtUserSelect ? UI.formAhtUserSelect.value : '').trim();
  const department = (UI.formAhtDept ? UI.formAhtDept.value : 'CSO INBOUND');
  const interactionCount = parseInt(UI.formAhtInteractionCount ? UI.formAhtInteractionCount.value : '1', 10) || 1;
  const mins = parseInt(UI.formAhtDurationMins ? UI.formAhtDurationMins.value : '0', 10) || 0;
  const secs = parseInt(UI.formAhtDurationSecs ? UI.formAhtDurationSecs.value : '0', 10) || 0;
  const targetSeconds = parseInt(UI.formAhtTargetSecs ? UI.formAhtTargetSecs.value : '300', 10) || 300;
  const notes = (UI.formAhtNotes ? UI.formAhtNotes.value : '').trim();

  const actualSeconds = mins * 60 + secs;

  if (!date) {
    showToast('Form Belum Lengkap', 'Tanggal input harian wajib diisi.', 'warning');
    return;
  }
  if (!userFullName) {
    showToast('Form Belum Lengkap', 'Pilih petugas CSO yang menangani.', 'warning');
    return;
  }
  if (actualSeconds <= 0) {
    showToast('Durasi Tidak Valid', 'Rata-rata AHT harian harus lebih dari 0 detik.', 'warning');
    return;
  }

  const deviationSeconds = actualSeconds - targetSeconds;
  const isSlaMet = actualSeconds <= targetSeconds;
  const deviationText = isSlaMet ? `-${Math.abs(deviationSeconds)} dtk (Cepat)` : `+${deviationSeconds} dtk (Over SLA)`;
  const status = isSlaMet ? 'Sesuai SLA' : 'Over SLA';
  const totalDurationSeconds = actualSeconds * interactionCount;

  const ahtLogs = state.getAhtLogs();
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  if (id) {
    // EDIT
    const idx = ahtLogs.findIndex(t => t.id === id);
    if (idx !== -1) {
      ahtLogs[idx] = {
        ...ahtLogs[idx],
        date,
        userFullName,
        department,
        interactionCount,
        totalDurationSeconds,
        actualSeconds,
        targetSeconds,
        deviationSeconds,
        deviationText,
        status,
        notes
      };
      state.saveAhtLogs(ahtLogs);
      autoSyncAhtAction('save', { log: ahtLogs[idx] });
      state.addLog('UPDATE_AHT', 'Ubah Handling Time', `Admin ${u.fullName} memperbarui handling time harian ${userFullName} (${date}): ${formatAhtSeconds(actualSeconds)} (${status}).`);
      showToast('Handling Time Diperbarui', `Handling time <strong>${userFullName}</strong> (${date}) berhasil diperbarui menjadi <strong>${formatAhtSeconds(actualSeconds)}</strong> (${status}).`, 'success');
    }
  } else {
    // NEW
    const newEntry = {
      id: 'aht_' + Date.now(),
      date,
      userFullName,
      department,
      interactionCount,
      totalDurationSeconds,
      actualSeconds,
      targetSeconds,
      deviationSeconds,
      deviationText,
      status,
      notes,
      createdAt: timeStr
    };
    ahtLogs.unshift(newEntry);
    state.saveAhtLogs(ahtLogs);
    autoSyncAhtAction('save', { log: newEntry });
    state.addLog('CREATE_AHT', 'Input Handling Time', `Admin ${u.fullName} mencatat handling time harian untuk ${userFullName}: ${formatAhtSeconds(actualSeconds)}.`);
    showToast('Handling Time Disimpan', `Handling time <strong>${formatAhtSeconds(actualSeconds)}</strong> untuk <strong>${userFullName}</strong> (${date}) berhasil dicatat.`, 'success');
  }

  closeAhtModal();
  renderAhtPage();
}

window.promptEditAht = function(id) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk mengedit handling time.', 'warning');
    return;
  }
  const ahtLogs = state.getAhtLogs();
  const item = ahtLogs.find(t => t.id === id);
  if (!item) return;
  openEditAhtModal(item);
};

window.promptDeleteAht = function(id, name, date) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki hak izin untuk menghapus handling time.', 'warning');
    return;
  }
  state.pendingDelete = { type: 'aht', id, name: `${name} (${date})` };
  UI.confirmDeleteTitle.textContent = 'Hapus Handling Time Harian?';
  UI.confirmDeleteMessage.innerHTML = `Data handling time harian <strong>${name}</strong> tanggal <strong>${date}</strong> akan dihapus permanen dari sistem.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.promptDeleteAllAhtMonth = function() {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang dapat menghapus data handling time bulanan.', 'warning');
    return;
  }
  const month = (UI.filterAhtMonth ? UI.filterAhtMonth.value : '2026-09') || '2026-09';
  const monthText = month === '2026-09' ? 'September 2026' : (month === '2026-08' ? 'Agustus 2026' : 'Juli 2026');
  state.pendingDelete = { type: 'aht_month', id: month, name: monthText };
  UI.confirmDeleteTitle.textContent = `Hapus Semua Handling Time Bulan ${monthText}?`;
  UI.confirmDeleteMessage.innerHTML = `Perhatian: Seluruh data handling time harian untuk periode <strong>${monthText}</strong> akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.handleAhtBatchDelete = function() {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang dapat melakukan penghapusan massal.', 'warning');
    return;
  }
  const selectedList = Array.from(state.selectedAhtIds);
  if (selectedList.length === 0) {
    showToast('Pilih Data', 'Pilih minimal satu data handling time yang ingin dihapus.', 'info');
    return;
  }
  state.pendingDelete = { type: 'aht_batch', id: 'batch', name: `${selectedList.length} data handling time`, ids: selectedList };
  UI.confirmDeleteTitle.textContent = `Hapus ${selectedList.length} Data Handling Time?`;
  UI.confirmDeleteMessage.innerHTML = `Sebanyak <strong>${selectedList.length} data handling time</strong> yang ditandai akan dihapus secara permanen dari sistem.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.filterAhtByUser = function(userName) {
  if (UI.filterAhtUserSelect) {
    if (Array.from(UI.filterAhtUserSelect.options).some(o => o.value === userName)) {
      UI.filterAhtUserSelect.value = userName;
    }
  }
  if (UI.filterSummaryAhtUser && state.isAdmin()) {
    if (Array.from(UI.filterSummaryAhtUser.options).some(o => o.value === userName)) {
      UI.filterSummaryAhtUser.value = userName;
    }
  }
  renderAhtPage();
  const sub = document.getElementById('ahtDailySubtitle');
  if (sub) {
    sub.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function exportAhtExcel() {
  const isAdmin = state.isAdmin();
  const currentUser = state.currentUser;
  const currentFullName = currentUser ? currentUser.fullName : '';
  const selMonth = (UI.filterAhtMonth ? UI.filterAhtMonth.value : '2026-09') || '2026-09';
  const allLogs = state.getAhtLogs();
  const users = state.getUsers();

  let exportLogs;
  if (state.selectedAhtIds && state.selectedAhtIds.size > 0) {
    exportLogs = allLogs.filter(l => state.selectedAhtIds.has(l.id));
  } else {
    let monthLogs = allLogs.filter(l => (l.date || '').startsWith(selMonth));
    if (!isAdmin) {
      monthLogs = monthLogs.filter(l => l.userFullName === currentFullName);
    }
    exportLogs = monthLogs;
  }

  if (exportLogs.length === 0) {
    showToast('Data Kosong', 'Tidak ada data Average Handling Time (AHT) untuk diekspor.', 'warning');
    return;
  }

  const sheet1Data = [
    ['No', 'ID Log AHT', 'Tanggal Input', 'Nama Petugas CSO', 'Layanan CSO', 'AHT Harian (Detik)', 'Target SLA (Detik)', 'Status SLA', 'Catatan Kinerja Harian']
  ];
  exportLogs.forEach((l, idx) => {
    const actSec = Number(l.actualSeconds) || 0;
    const tgtSec = Number(l.targetSeconds) || 300;
    sheet1Data.push([
      idx + 1,
      l.id,
      l.date,
      l.userFullName,
      l.department,
      actSec,
      tgtSec,
      l.status || (actSec <= tgtSec ? 'Sesuai SLA' : 'Over SLA'),
      l.notes || '-'
    ]);
  });

  const sheet2Data = [
    ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Kerja Input', 'Rata-rata AHT (Detik)', 'Target Standar SLA (Detik)', 'Status Kepatuhan SLA']
  ];
  const targetUsers = isAdmin ? users : users.filter(u => u.fullName === currentFullName);
  targetUsers.forEach((u, idx) => {
    const userMonthLogs = allLogs.filter(l => (l.date || '').startsWith(selMonth) && l.userFullName === u.fullName);
    const count = userMonthLogs.length;
    let avg = 0;
    let status = 'Belum Ada Data';
    if (count > 0) {
      const sum = userMonthLogs.reduce((acc, curr) => acc + (Number(curr.actualSeconds) || 0), 0);
      avg = Math.round(sum / count);
      status = avg <= 300 ? 'Sesuai SLA (< 300s)' : 'Over SLA (> 300s)';
    }
    sheet2Data.push([
      idx + 1,
      u.fullName,
      u.department || 'CSO INBOUND',
      count,
      count > 0 ? avg : '-',
      300,
      status
    ]);
  });

  const filename = `DRIVE_Average_Handling_Time_AHT_${selMonth}_${new Date().toISOString().slice(0, 10)}.xlsx`;

  if (typeof XLSX !== 'undefined' && XLSX.utils) {
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
    const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
    ws1['!cols'] = [
      { wch: 6 }, { wch: 18 }, { wch: 16 }, { wch: 24 }, { wch: 26 },
      { wch: 20 }, { wch: 20 }, { wch: 18 }, { wch: 45 }
    ];
    ws2['!cols'] = [
      { wch: 6 }, { wch: 24 }, { wch: 26 }, { wch: 16 }, { wch: 24 },
      { wch: 26 }, { wch: 24 }
    ];
    XLSX.utils.book_append_sheet(wb, ws1, 'Log Harian AHT');
    XLSX.utils.book_append_sheet(wb, ws2, 'Rekapitulasi Bulanan');
    XLSX.writeFile(wb, filename);
  } else {
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + sheet1Data.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', filename.replace('.xlsx', '.csv'));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showToast('Download Berhasil', `Data Average Handling Time (${exportLogs.length} baris) berhasil diunduh menjadi Excel.`, 'success');
}

// ==========================================
// 12.7.1 AHT GOOGLE SPREADSHEET INTEGRATION
// ==========================================

const AHT_APPS_SCRIPT_TEMPLATE = `/**
 * =====================================================================
 * GOOGLE APPS SCRIPT: INTEGRASI DATA AVERAGE HANDLING TIME (AHT)
 * Dashboard Agent CSO - Iconnet
 * =====================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Spreadsheet baru di browser Anda (https://sheets.new).
 * 2. Klik menu 'Ekstensi' (Extensions) > 'Apps Script'.
 * 3. Hapus semua kode default dan tempel seluruh isi script ini.
 * 4. Klik ikon Disket (Simpan / Ctrl+S).
 * 5. Klik tombol 'Deploy' (Terapkan) > 'New deployment' (Penerapan baru).
 * 6. Klik ikon gear di sebelah kiri 'Select type', pilih 'Web app'.
 * 7. Isi keterangan: 'Integrasi Dashboard AHT'.
 * 8. Atur 'Execute as' (Jalankan sebagai) -> 'Me' (Email Anda).
 * 9. Atur 'Who has access' (Siapa yang memiliki akses) -> 'Anyone' (Siapa saja).
 * 10. Klik 'Deploy', berikan izin akun (Authorize Access), lalu salin URL Web App yang muncul.
 * 11. Tempel URL Web App ke Pengaturan Google Spreadsheet di menu AHT Dashboard!
 * =====================================================================
 */

const SHEET_NAME = 'AHT_Data';
const HEADERS = [
  'ID AHT',
  'Tanggal Input',
  'Nama Petugas CSO',
  'Layanan CSO',
  'AHT Harian (Detik)',
  'Status Penanganan',
  'Catatan Kinerja',
  'Waktu Dibuat'
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() < 1) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#10b981');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    for (let c = 1; c <= HEADERS.length; c++) {
      sheet.autoResizeColumn(c);
    }
  }
  return sheet;
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'get_all';
    if (action === 'ping') {
      return createJsonResponse({ success: true, message: 'Google Apps Script AHT siap terhubung!', time: new Date() });
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse({ success: true, count: 0, data: [] });
    }

    const rows = [];
    for (let i = 1; i < data.length; i++) {
      const r = data[i];
      if (!r[0]) continue;
      const actualSec = parseInt(r[4], 10) || 0;
      rows.push({
        id: String(r[0]),
        date: r[1] instanceof Date ? Utilities.formatDate(r[1], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(r[1]),
        userFullName: String(r[2] || ''),
        department: String(r[3] || ''),
        actualSeconds: actualSec,
        totalDurationSeconds: actualSec,
        interactionCount: 1,
        targetSeconds: 300,
        deviationSeconds: actualSec - 300,
        deviationText: actualSec <= 300 ? ('-' + Math.abs(actualSec - 300) + ' dtk (Cepat)') : ('+' + (actualSec - 300) + ' dtk (Over SLA)'),
        status: String(r[5] || (actualSec <= 300 ? 'Sesuai SLA' : 'Over SLA')),
        notes: String(r[6] || ''),
        createdAt: String(r[7] || '')
      });
    }

    return createJsonResponse({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    let payload;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    } else {
      payload = {};
    }

    const action = payload.action || 'sync_all';
    const sheet = getOrCreateSheet();

    if (action === 'sync_all') {
      const logs = payload.logs || [];
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      if (logs.length > 0) {
        const rowsToAppend = logs.map(l => [
          l.id,
          l.date,
          l.userFullName,
          l.department,
          parseInt(l.actualSeconds, 10) || 0,
          l.status || 'Sesuai SLA',
          l.notes || '-',
          l.createdAt || ''
        ]);
        sheet.getRange(2, 1, rowsToAppend.length, HEADERS.length).setValues(rowsToAppend);
      }
      return createJsonResponse({ success: true, message: 'Sync all AHT berhasil', count: logs.length });
    }

    if (action === 'save') {
      const l = payload.log;
      if (!l || !l.id) return createJsonResponse({ success: false, error: 'Data AHT tidak valid' });

      const data = sheet.getDataRange().getValues();
      let foundRow = -1;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(l.id)) {
          foundRow = i + 1;
          break;
        }
      }

      const rowData = [
        l.id,
        l.date,
        l.userFullName,
        l.department,
        parseInt(l.actualSeconds, 10) || 0,
        l.status || 'Sesuai SLA',
        l.notes || '-',
        l.createdAt || ''
      ];

      if (foundRow > 0) {
        sheet.getRange(foundRow, 1, 1, HEADERS.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
      return createJsonResponse({ success: true, message: 'Data AHT berhasil disimpan ke Google Sheets' });
    }

    if (action === 'delete') {
      const id = payload.id;
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(id)) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ success: true, message: 'Data AHT berhasil dihapus dari Google Sheets' });
        }
      }
      return createJsonResponse({ success: true, message: 'ID AHT tidak ditemukan di sheet' });
    }

    if (action === 'delete_month') {
      const month = payload.month;
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        const rowDate = String(data[i][1]);
        if (rowDate.indexOf(month) === 0) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Data AHT bulanan berhasil dibersihkan dari Google Sheets' });
    }

    if (action === 'delete_batch') {
      const ids = payload.ids || [];
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (ids.indexOf(String(data[i][0])) !== -1) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Batch baris AHT berhasil dihapus dari Google Sheets' });
    }

    return createJsonResponse({ success: false, error: 'Aksi tidak dikenal: ' + action });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

function renderAhtGSheetBar() {
  const config = state.getAhtGSheetConfig();
  const isConfigured = Boolean(config.webAppUrl && config.webAppUrl.trim());
  const cleanId = extractGoogleSpreadsheetId(config.sheetId);
  const openUrl = cleanId ? `https://docs.google.com/spreadsheets/d/${cleanId}` : config.webAppUrl;

  // Header Badge
  if (UI.ahtGSheetHeaderBadge) {
    if (isConfigured) {
      UI.ahtGSheetHeaderBadge.textContent = 'Terhubung';
      UI.ahtGSheetHeaderBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      UI.ahtGSheetHeaderBadge.style.color = '#10b981';
      UI.ahtGSheetHeaderBadge.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    } else {
      UI.ahtGSheetHeaderBadge.textContent = 'Belum Terhubung';
      UI.ahtGSheetHeaderBadge.style.background = 'rgba(255, 255, 255, 0.08)';
      UI.ahtGSheetHeaderBadge.style.color = 'var(--gray-300)';
      UI.ahtGSheetHeaderBadge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    }
  }

  // Status Badge inside Bar
  if (UI.ahtGSheetStatusBadge) {
    if (isConfigured) {
      UI.ahtGSheetStatusBadge.textContent = 'Terhubung';
      UI.ahtGSheetStatusBadge.className = 'badge badge-green';
      UI.ahtGSheetStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      UI.ahtGSheetStatusBadge.style.color = '#10b981';
      UI.ahtGSheetStatusBadge.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    } else {
      UI.ahtGSheetStatusBadge.textContent = 'Belum Dikonfigurasi';
      UI.ahtGSheetStatusBadge.style.background = 'rgba(100, 116, 139, 0.2)';
      UI.ahtGSheetStatusBadge.style.color = '#94a3b8';
      UI.ahtGSheetStatusBadge.style.border = '1px solid rgba(100, 116, 139, 0.3)';
    }
  }

  // Status Info inside Bar
  if (UI.ahtGSheetStatusInfo) {
    if (isConfigured) {
      const syncTime = config.lastSyncTime ? `Terakhir sinkron: ${config.lastSyncTime}` : 'Belum pernah disinkronkan';
      const autoText = config.autoSync ? ' (Auto-Sync Aktif)' : ' (Sinkronisasi Manual)';
      UI.ahtGSheetStatusInfo.innerHTML = `<span style="color:#10b981;"><i class="fa-solid fa-circle-check" style="margin-right:4px;"></i>${syncTime}${autoText}</span>`;
    } else {
      UI.ahtGSheetStatusInfo.textContent = 'Klik tombol "Pengaturan & Script" untuk menghubungkan data AHT dengan Google Spreadsheet Anda.';
    }
  }

  // Open Link buttons
  if (UI.btnAhtGSheetOpenLink) {
    if (openUrl) {
      UI.btnAhtGSheetOpenLink.href = openUrl;
      UI.btnAhtGSheetOpenLink.classList.remove('hidden');
      UI.btnAhtGSheetOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnAhtGSheetOpenLink.classList.add('hidden');
      UI.btnAhtGSheetOpenLink.style.display = 'none';
    }
  }
  if (UI.btnAhtGSheetModalOpenLink) {
    if (openUrl) {
      UI.btnAhtGSheetModalOpenLink.href = openUrl;
      UI.btnAhtGSheetModalOpenLink.classList.remove('hidden');
      UI.btnAhtGSheetModalOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnAhtGSheetModalOpenLink.classList.add('hidden');
      UI.btnAhtGSheetModalOpenLink.style.display = 'none';
    }
  }
}

function openAhtGSheetModal() {
  const config = state.getAhtGSheetConfig();
  if (UI.inputAhtGSheetWebAppUrl) UI.inputAhtGSheetWebAppUrl.value = config.webAppUrl || '';
  if (UI.inputAhtGSheetUrl) UI.inputAhtGSheetUrl.value = config.sheetId || '';
  if (UI.inputAhtGSheetTabName) UI.inputAhtGSheetTabName.value = config.sheetName || 'AHT_Data';
  if (UI.checkAhtGSheetAutoSync) UI.checkAhtGSheetAutoSync.checked = config.autoSync !== false;

  const logs = state.getAhtLogs();
  if (UI.labelAhtGSheetModalTotalCount) UI.labelAhtGSheetModalTotalCount.textContent = `${logs.length} Baris`;
  if (UI.labelAhtGSheetModalLastSync) UI.labelAhtGSheetModalLastSync.textContent = config.lastSyncTime || 'Belum pernah';

  if (UI.labelAhtGSheetModalStatus) {
    if (config.webAppUrl) {
      UI.labelAhtGSheetModalStatus.innerHTML = '<span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Terhubung</span>';
    } else {
      UI.labelAhtGSheetModalStatus.innerHTML = '<span style="color:#94a3b8;"><i class="fa-regular fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Belum Dikonfigurasi</span>';
    }
  }

  if (UI.ahtAppsScriptCodePreview) {
    UI.ahtAppsScriptCodePreview.textContent = AHT_APPS_SCRIPT_TEMPLATE;
  }

  switchAhtGSheetTab('config');
  renderAhtGSheetBar();
  if (UI.modalAhtGoogleSheets) UI.modalAhtGoogleSheets.classList.remove('hidden');
}

function closeAhtGSheetModal() {
  if (UI.modalAhtGoogleSheets) UI.modalAhtGoogleSheets.classList.add('hidden');
}

function switchAhtGSheetTab(tab) {
  if (tab === 'config') {
    if (UI.tabBtnAhtGSheetConfig) UI.tabBtnAhtGSheetConfig.classList.add('active');
    if (UI.tabBtnAhtGSheetGuide) UI.tabBtnAhtGSheetGuide.classList.remove('active');
    if (UI.tabContentAhtGSheetConfig) UI.tabContentAhtGSheetConfig.classList.remove('hidden');
    if (UI.tabContentAhtGSheetGuide) UI.tabContentAhtGSheetGuide.classList.add('hidden');
  } else {
    if (UI.tabBtnAhtGSheetConfig) UI.tabBtnAhtGSheetConfig.classList.remove('active');
    if (UI.tabBtnAhtGSheetGuide) UI.tabBtnAhtGSheetGuide.classList.add('active');
    if (UI.tabContentAhtGSheetConfig) UI.tabContentAhtGSheetConfig.classList.add('hidden');
    if (UI.tabContentAhtGSheetGuide) UI.tabContentAhtGSheetGuide.classList.remove('hidden');
  }
}

function saveAhtGSheetConfigHandler() {
  const current = state.getAhtGSheetConfig();
  const webAppUrl = (UI.inputAhtGSheetWebAppUrl ? UI.inputAhtGSheetWebAppUrl.value.trim() : '');
  const sheetInput = (UI.inputAhtGSheetUrl ? UI.inputAhtGSheetUrl.value.trim() : '');
  const sheetName = (UI.inputAhtGSheetTabName ? UI.inputAhtGSheetTabName.value.trim() : '') || 'AHT_Data';
  const autoSync = UI.checkAhtGSheetAutoSync ? UI.checkAhtGSheetAutoSync.checked : true;

  const cleanId = extractGoogleSpreadsheetId(sheetInput);

  const updated = {
    ...current,
    webAppUrl,
    sheetId: cleanId || sheetInput,
    sheetName,
    autoSync
  };

  state.saveAhtGSheetConfig(updated);
  renderAhtGSheetBar();

  if (UI.labelAhtGSheetModalStatus) {
    if (webAppUrl) {
      UI.labelAhtGSheetModalStatus.innerHTML = '<span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Terhubung</span>';
    } else {
      UI.labelAhtGSheetModalStatus.innerHTML = '<span style="color:#94a3b8;"><i class="fa-regular fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Belum Dikonfigurasi</span>';
    }
  }

  showToast('Pengaturan Disimpan', 'Konfigurasi Google Spreadsheet untuk AHT berhasil disimpan.', 'success');
}

async function testAhtGSheetConnection() {
  const webAppUrl = (UI.inputAhtGSheetWebAppUrl ? UI.inputAhtGSheetWebAppUrl.value.trim() : '') || state.getAhtGSheetConfig().webAppUrl;
  if (!webAppUrl) {
    showToast('URL Kosong', 'Harap masukkan URL Web App Google Apps Script terlebih dahulu.', 'warning');
    return;
  }

  const btn = UI.btnAhtGSheetTest;
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menghubungkan...</span>';
  }

  try {
    const pingUrl = webAppUrl + (webAppUrl.includes('?') ? '&' : '?') + 'action=ping';
    const resp = await fetch(pingUrl, {
      method: 'GET',
      mode: 'cors'
    });

    if (resp.ok) {
      const data = await resp.json();
      if (data && data.success) {
        showToast('Koneksi Berhasil', 'Google Apps Script berhasil merespons dan terhubung ke spreadsheet!', 'success');
      } else {
        showToast('Terhubung', 'Respons diterima dari Google Apps Script Web App.', 'info');
      }
    } else {
      showToast('Koneksi Selesai', `Status HTTP: ${resp.status}. URL dapat diakses.`, 'info');
    }
  } catch (err) {
    showToast('Pengujian Selesai', 'Request terkirim. Jika URL Web App valid dengan izin "Anyone", koneksi siap digunakan.', 'info');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

async function pushAhtToGoogleSheets() {
  const config = state.getAhtGSheetConfig();
  if (!config.webAppUrl) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App Google Apps Script terlebih dahulu.', 'warning');
    openAhtGSheetModal();
    return;
  }

  const logs = state.getAhtLogs();
  const pushBtn = UI.btnAhtGSheetPush;
  const modalPushBtn = UI.btnAhtGSheetModalPush;

  const setPushing = (isPushing) => {
    if (pushBtn) {
      pushBtn.disabled = isPushing;
      pushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
    if (modalPushBtn) {
      modalPushBtn.disabled = isPushing;
      modalPushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
  };

  setPushing(true);

  try {
    const payload = {
      action: 'sync_all',
      logs: logs
    };

    // Use text/plain to avoid preflight CORS restrictions from Google Apps Script Web App
    await fetch(config.webAppUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    });

    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    config.lastSyncTime = formatted;
    config.lastSyncStatus = 'success';
    state.saveAhtGSheetConfig(config);
    renderAhtGSheetBar();

    if (UI.labelAhtGSheetModalLastSync) UI.labelAhtGSheetModalLastSync.textContent = formatted;

    showToast('Sinkronisasi Sukses', `Sebanyak <strong>${logs.length} data AHT</strong> berhasil dikirim ke Google Spreadsheet.`, 'success');
  } catch (err) {
    console.error('Error pushing AHT to Google Sheets:', err);
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    config.lastSyncTime = formatted;
    state.saveAhtGSheetConfig(config);
    renderAhtGSheetBar();
    showToast('Data Dikirim', `Permintaan sinkronisasi (${logs.length} data AHT) telah dikirim ke Google Spreadsheet.`, 'info');
  } finally {
    setPushing(false);
  }
}

async function pullAhtFromGoogleSheets() {
  const config = state.getAhtGSheetConfig();
  if (!config.webAppUrl && !config.sheetId) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App atau ID Spreadsheet terlebih dahulu.', 'warning');
    openAhtGSheetModal();
    return;
  }

  const pullBtn = UI.btnAhtGSheetPull;
  const modalPullBtn = UI.btnAhtGSheetModalPull;

  const setPulling = (isPulling) => {
    if (pullBtn) {
      pullBtn.disabled = isPulling;
      pullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
    if (modalPullBtn) {
      modalPullBtn.disabled = isPulling;
      modalPullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
  };

  setPulling(true);

  try {
    let pulledRows = null;

    if (config.webAppUrl) {
      const getUrl = config.webAppUrl + (config.webAppUrl.includes('?') ? '&' : '?') + 'action=get_all';
      const resp = await fetch(getUrl, { method: 'GET', mode: 'cors' });
      if (resp.ok) {
        const json = await resp.json();
        if (json && json.success && Array.isArray(json.data)) {
          pulledRows = json.data;
        }
      }
    }

    // Fallback to public sheet CSV export if Web App did not return JSON or if only sheetId is present
    if (!pulledRows && config.sheetId) {
      const cleanId = extractGoogleSpreadsheetId(config.sheetId);
      const csvUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv&sheet=${encodeURIComponent(config.sheetName || 'AHT_Data')}`;
      const resp = await fetch(csvUrl);
      if (resp.ok) {
        const csvText = await resp.text();
        const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          pulledRows = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = parseCsvRow(lines[i]);
            if (cols[0]) {
              const actualSec = parseInt(cols[4], 10) || 0;
              pulledRows.push({
                id: cols[0],
                date: cols[1] || '',
                userFullName: cols[2] || '',
                department: cols[3] || 'CSO INBOUND',
                actualSeconds: actualSec,
                totalDurationSeconds: actualSec,
                interactionCount: 1,
                targetSeconds: 300,
                deviationSeconds: actualSec - 300,
                deviationText: actualSec <= 300 ? ('-' + Math.abs(actualSec - 300) + ' dtk (Cepat)') : ('+' + (actualSec - 300) + ' dtk (Over SLA)'),
                status: cols[5] || (actualSec <= 300 ? 'Sesuai SLA' : 'Over SLA'),
                notes: cols[6] || '',
                createdAt: cols[7] || ''
              });
            }
          }
        }
      }
    }

    if (pulledRows && pulledRows.length > 0) {
      state.saveAhtLogs(pulledRows);
      const now = new Date();
      const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      config.lastSyncTime = formatted;
      state.saveAhtGSheetConfig(config);
      renderAhtPage();
      showToast('Tarik Data Berhasil', `Berhasil mengambil <strong>${pulledRows.length} data AHT</strong> dari Google Spreadsheet.`, 'success');
    } else {
      showToast('Data Kosong / Tidak Terbaca', 'Tidak ada data AHT yang ditemukan pada Google Spreadsheet atau sheet masih kosong.', 'info');
    }
  } catch (err) {
    console.error('Error pulling AHT from Google Sheets:', err);
    showToast('Gagal Menarik Data', 'Pastikan Google Apps Script sudah dideploy dengan akses "Anyone" atau sheet publik.', 'danger');
  } finally {
    setPulling(false);
  }
}

function autoSyncAhtAction(action, payload) {
  const config = state.getAhtGSheetConfig();
  if (!config.webAppUrl || config.autoSync === false) return;

  const bodyData = {
    action,
    ...payload
  };

  fetch(config.webAppUrl, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    }
  }).then(() => {
    const now = new Date();
    config.lastSyncTime = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    state.saveAhtGSheetConfig(config);
    renderAhtGSheetBar();
  }).catch(err => {
    console.warn('Auto-sync AHT to Google Sheets notification:', err);
  });
}

function copyAhtAppsScriptCode() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(AHT_APPS_SCRIPT_TEMPLATE).then(() => {
      showToast('Tersalin!', 'Kode Google Apps Script berhasil disalin ke clipboard.', 'success');
    }).catch(() => {
      fallbackCopyText(AHT_APPS_SCRIPT_TEMPLATE);
    });
  } else {
    fallbackCopyText(AHT_APPS_SCRIPT_TEMPLATE);
  }
}

// ========================================================
// ART GOOGLE APPS SCRIPT TEMPLATE & INTEGRATION LOGIC
// ========================================================
const ART_APPS_SCRIPT_TEMPLATE = `/**
 * =====================================================================
 * GOOGLE APPS SCRIPT: INTEGRASI DATA AVERAGE RESPONSE TIME (ART)
 * Dashboard Agent CSO - Iconnet
 * =====================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Spreadsheet baru di browser Anda (https://sheets.new).
 * 2. Klik menu 'Ekstensi' (Extensions) > 'Apps Script'.
 * 3. Hapus semua kode default dan tempel seluruh isi script ini.
 * 4. Klik ikon Disket (Simpan / Ctrl+S).
 * 5. Klik tombol 'Deploy' (Terapkan) > 'New deployment' (Penerapan baru).
 * 6. Klik ikon gear di sebelah kiri 'Select type', pilih 'Web app'.
 * 7. Isi keterangan: 'Integrasi Dashboard ART'.
 * 8. Atur 'Execute as' (Jalankan sebagai) -> 'Me' (Email Anda).
 * 9. Atur 'Who has access' (Siapa yang memiliki akses) -> 'Anyone' (Siapa saja).
 * 10. Klik 'Deploy', berikan izin akun (Authorize Access), lalu salin URL Web App yang muncul.
 * 11. Tempel URL Web App ke Pengaturan Google Spreadsheet di menu ART Dashboard!
 * =====================================================================
 */

const SHEET_NAME = 'ART_Data';
const HEADERS = [
  'ID ART',
  'Tanggal Input',
  'Nama Petugas CSO',
  'Layanan CSO',
  'Average Response Time (Detik)',
  'Standar SLA (Detik)',
  'Status SLA',
  'Catatan Evaluasi',
  'Waktu Dibuat'
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  // Cek apakah header sudah ada
  if (sheet.getLastRow() < 1) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#10b981');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    for (let c = 1; c <= HEADERS.length; c++) {
      sheet.autoResizeColumn(c);
    }
  }
  return sheet;
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'get_all';
    if (action === 'ping') {
      return createJsonResponse({ success: true, message: 'Google Apps Script ART siap terhubung!', time: new Date() });
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse({ success: true, count: 0, data: [] });
    }

    const rows = [];
    for (let i = 1; i < data.length; i++) {
      const r = data[i];
      if (!r[0]) continue;
      const artSec = parseFloat(r[4]) || 0;
      const targetSec = parseInt(r[5], 10) || 30;
      const devSec = artSec - targetSec;
      const devText = devSec <= 0 ? ('-' + Math.abs(devSec).toFixed(1) + ' dtk (Cepat)') : ('+' + devSec.toFixed(1) + ' dtk (Over SLA)');
      rows.push({
        id: String(r[0]),
        date: r[1] instanceof Date ? Utilities.formatDate(r[1], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(r[1]),
        userFullName: String(r[2] || ''),
        department: String(r[3] || ''),
        interactionCount: 1,
        queueSeconds: 0,
        frtSeconds: 0,
        avgResponseSeconds: artSec,
        targetSeconds: targetSec,
        deviationSeconds: devSec,
        deviationText: devText,
        status: String(r[6] || (artSec <= targetSec ? 'Sesuai SLA' : 'Over SLA')),
        notes: String(r[7] || ''),
        createdAt: String(r[8] || '')
      });
    }

    return createJsonResponse({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    let payload;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    } else {
      payload = {};
    }

    const action = payload.action || 'sync_all';
    const sheet = getOrCreateSheet();

    if (action === 'sync_all') {
      const logs = payload.logs || [];
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      if (logs.length > 0) {
        const rowsToAppend = logs.map(l => [
          l.id,
          l.date,
          l.userFullName,
          l.department,
          parseFloat(l.avgResponseSeconds !== undefined ? l.avgResponseSeconds : (l.actualSeconds || 0)),
          parseInt(l.targetSeconds, 10) || 30,
          l.status || 'Sesuai SLA',
          l.notes || '-',
          l.createdAt || ''
        ]);
        sheet.getRange(2, 1, rowsToAppend.length, HEADERS.length).setValues(rowsToAppend);
      }
      return createJsonResponse({ success: true, message: 'Sync all ART berhasil', count: logs.length });
    }

    if (action === 'save') {
      const l = payload.log;
      if (!l || !l.id) return createJsonResponse({ success: false, error: 'Data ART tidak valid' });

      const data = sheet.getDataRange().getValues();
      let foundRow = -1;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(l.id)) {
          foundRow = i + 1;
          break;
        }
      }

      const rowData = [
        l.id,
        l.date,
        l.userFullName,
        l.department,
        parseFloat(l.avgResponseSeconds !== undefined ? l.avgResponseSeconds : (l.actualSeconds || 0)),
        parseInt(l.targetSeconds, 10) || 30,
        l.status || 'Sesuai SLA',
        l.notes || '-',
        l.createdAt || ''
      ];

      if (foundRow > 0) {
        sheet.getRange(foundRow, 1, 1, HEADERS.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
      return createJsonResponse({ success: true, message: 'Data ART berhasil disimpan ke Google Sheets' });
    }

    if (action === 'delete') {
      const id = payload.id;
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(id)) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ success: true, message: 'Data ART berhasil dihapus dari Google Sheets' });
        }
      }
      return createJsonResponse({ success: true, message: 'ID ART tidak ditemukan di sheet' });
    }

    if (action === 'delete_month') {
      const month = payload.month;
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        const rowDate = String(data[i][1]);
        if (rowDate.indexOf(month) === 0) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Data ART bulanan berhasil dibersihkan dari Google Sheets' });
    }

    if (action === 'delete_batch') {
      const ids = payload.ids || [];
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (ids.indexOf(String(data[i][0])) !== -1) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Batch baris ART berhasil dihapus dari Google Sheets' });
    }

    return createJsonResponse({ success: false, error: 'Aksi tidak dikenal: ' + action });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

function renderArtGSheetBar() {
  const config = state.getArtGSheetConfig();
  const isConfigured = Boolean(config.webAppUrl && config.webAppUrl.trim());
  const cleanId = extractGoogleSpreadsheetId(config.sheetId);
  const openUrl = cleanId ? `https://docs.google.com/spreadsheets/d/${cleanId}` : config.webAppUrl;

  // Header Badge
  if (UI.artGSheetHeaderBadge) {
    if (isConfigured) {
      UI.artGSheetHeaderBadge.textContent = 'Terhubung';
      UI.artGSheetHeaderBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      UI.artGSheetHeaderBadge.style.color = '#10b981';
      UI.artGSheetHeaderBadge.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    } else {
      UI.artGSheetHeaderBadge.textContent = 'Belum Terhubung';
      UI.artGSheetHeaderBadge.style.background = 'rgba(255, 255, 255, 0.08)';
      UI.artGSheetHeaderBadge.style.color = 'var(--gray-300)';
      UI.artGSheetHeaderBadge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    }
  }

  // Status Badge inside Bar
  if (UI.artGSheetStatusBadge) {
    if (isConfigured) {
      UI.artGSheetStatusBadge.textContent = 'Terhubung';
      UI.artGSheetStatusBadge.className = 'badge badge-green';
      UI.artGSheetStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      UI.artGSheetStatusBadge.style.color = '#10b981';
      UI.artGSheetStatusBadge.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    } else {
      UI.artGSheetStatusBadge.textContent = 'Belum Dikonfigurasi';
      UI.artGSheetStatusBadge.style.background = 'rgba(100, 116, 139, 0.2)';
      UI.artGSheetStatusBadge.style.color = '#94a3b8';
      UI.artGSheetStatusBadge.style.border = '1px solid rgba(100, 116, 139, 0.3)';
    }
  }

  // Status Info inside Bar
  if (UI.artGSheetStatusInfo) {
    if (isConfigured) {
      const syncTime = config.lastSyncTime ? `Terakhir sinkron: ${config.lastSyncTime}` : 'Belum pernah disinkronkan';
      const autoText = config.autoSync ? ' (Auto-Sync Aktif)' : ' (Sinkronisasi Manual)';
      UI.artGSheetStatusInfo.innerHTML = `<span style="color:#10b981;"><i class="fa-solid fa-circle-check" style="margin-right:4px;"></i>${syncTime}${autoText}</span>`;
    } else {
      UI.artGSheetStatusInfo.textContent = 'Klik tombol "Pengaturan & Script" untuk menghubungkan data ART dengan Google Spreadsheet Anda.';
    }
  }

  // Open Link buttons
  if (UI.btnArtGSheetOpenLink) {
    if (openUrl) {
      UI.btnArtGSheetOpenLink.href = openUrl;
      UI.btnArtGSheetOpenLink.classList.remove('hidden');
      UI.btnArtGSheetOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnArtGSheetOpenLink.classList.add('hidden');
      UI.btnArtGSheetOpenLink.style.display = 'none';
    }
  }
  if (UI.btnArtGSheetModalOpenLink) {
    if (openUrl) {
      UI.btnArtGSheetModalOpenLink.href = openUrl;
      UI.btnArtGSheetModalOpenLink.classList.remove('hidden');
      UI.btnArtGSheetModalOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnArtGSheetModalOpenLink.classList.add('hidden');
      UI.btnArtGSheetModalOpenLink.style.display = 'none';
    }
  }
}

function openArtGSheetModal() {
  const config = state.getArtGSheetConfig();
  if (UI.inputArtGSheetWebAppUrl) UI.inputArtGSheetWebAppUrl.value = config.webAppUrl || '';
  if (UI.inputArtGSheetUrl) UI.inputArtGSheetUrl.value = config.sheetId || '';
  if (UI.inputArtGSheetTabName) UI.inputArtGSheetTabName.value = config.sheetName || 'ART_Data';
  if (UI.checkArtGSheetAutoSync) UI.checkArtGSheetAutoSync.checked = config.autoSync !== false;

  const logs = state.getArtLogs();
  if (UI.labelArtGSheetModalTotalCount) UI.labelArtGSheetModalTotalCount.textContent = `${logs.length} Baris`;
  if (UI.labelArtGSheetModalLastSync) UI.labelArtGSheetModalLastSync.textContent = config.lastSyncTime || 'Belum pernah';

  if (UI.labelArtGSheetModalStatus) {
    if (config.webAppUrl) {
      UI.labelArtGSheetModalStatus.innerHTML = '<span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Terhubung</span>';
    } else {
      UI.labelArtGSheetModalStatus.innerHTML = '<span style="color:#94a3b8;"><i class="fa-regular fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Belum Dikonfigurasi</span>';
    }
  }

  if (UI.artAppsScriptCodePreview) {
    UI.artAppsScriptCodePreview.textContent = ART_APPS_SCRIPT_TEMPLATE;
  }

  switchArtGSheetTab('config');
  renderArtGSheetBar();
  if (UI.modalArtGoogleSheets) UI.modalArtGoogleSheets.classList.remove('hidden');
}

function closeArtGSheetModal() {
  if (UI.modalArtGoogleSheets) UI.modalArtGoogleSheets.classList.add('hidden');
}

function switchArtGSheetTab(tab) {
  if (tab === 'config') {
    if (UI.tabBtnArtGSheetConfig) UI.tabBtnArtGSheetConfig.classList.add('active');
    if (UI.tabBtnArtGSheetGuide) UI.tabBtnArtGSheetGuide.classList.remove('active');
    if (UI.tabContentArtGSheetConfig) UI.tabContentArtGSheetConfig.classList.remove('hidden');
    if (UI.tabContentArtGSheetGuide) UI.tabContentArtGSheetGuide.classList.add('hidden');
  } else {
    if (UI.tabBtnArtGSheetConfig) UI.tabBtnArtGSheetConfig.classList.remove('active');
    if (UI.tabBtnArtGSheetGuide) UI.tabBtnArtGSheetGuide.classList.add('active');
    if (UI.tabContentArtGSheetConfig) UI.tabContentArtGSheetConfig.classList.add('hidden');
    if (UI.tabContentArtGSheetGuide) UI.tabContentArtGSheetGuide.classList.remove('hidden');
  }
}

function saveArtGSheetConfigHandler() {
  const current = state.getArtGSheetConfig();
  const webAppUrl = (UI.inputArtGSheetWebAppUrl ? UI.inputArtGSheetWebAppUrl.value.trim() : '');
  const sheetInput = (UI.inputArtGSheetUrl ? UI.inputArtGSheetUrl.value.trim() : '');
  const sheetName = (UI.inputArtGSheetTabName ? UI.inputArtGSheetTabName.value.trim() : '') || 'ART_Data';
  const autoSync = UI.checkArtGSheetAutoSync ? UI.checkArtGSheetAutoSync.checked : true;

  const cleanId = extractGoogleSpreadsheetId(sheetInput);

  const updated = {
    ...current,
    webAppUrl,
    sheetId: cleanId || sheetInput,
    sheetName,
    autoSync
  };

  state.saveArtGSheetConfig(updated);
  renderArtGSheetBar();

  if (UI.labelArtGSheetModalStatus) {
    if (webAppUrl) {
      UI.labelArtGSheetModalStatus.innerHTML = '<span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Terhubung</span>';
    } else {
      UI.labelArtGSheetModalStatus.innerHTML = '<span style="color:#94a3b8;"><i class="fa-regular fa-circle" style="font-size:0.6rem; vertical-align:middle; margin-right:4px;"></i>Belum Dikonfigurasi</span>';
    }
  }

  showToast('Pengaturan Disimpan', 'Konfigurasi Google Spreadsheet untuk ART berhasil disimpan.', 'success');
}

async function testArtGSheetConnection() {
  const webAppUrl = (UI.inputArtGSheetWebAppUrl ? UI.inputArtGSheetWebAppUrl.value.trim() : '') || state.getArtGSheetConfig().webAppUrl;
  if (!webAppUrl) {
    showToast('URL Kosong', 'Harap masukkan URL Web App Google Apps Script terlebih dahulu.', 'warning');
    return;
  }

  const btn = UI.btnArtGSheetTest;
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menghubungkan...</span>';
  }

  try {
    const pingUrl = webAppUrl + (webAppUrl.includes('?') ? '&' : '?') + 'action=ping';
    const resp = await fetch(pingUrl, {
      method: 'GET',
      mode: 'cors'
    });

    if (resp.ok) {
      const data = await resp.json();
      if (data && data.success) {
        showToast('Koneksi Berhasil', 'Google Apps Script berhasil merespons dan terhubung ke spreadsheet!', 'success');
      } else {
        showToast('Terhubung', 'Respons diterima dari Google Apps Script Web App.', 'info');
      }
    } else {
      showToast('Koneksi Selesai', `Status HTTP: ${resp.status}. URL dapat diakses.`, 'info');
    }
  } catch (err) {
    showToast('Pengujian Selesai', 'Request terkirim. Jika URL Web App valid dengan izin "Anyone", koneksi siap digunakan.', 'info');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

async function pushArtToGoogleSheets() {
  const config = state.getArtGSheetConfig();
  if (!config.webAppUrl) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App Google Apps Script terlebih dahulu.', 'warning');
    openArtGSheetModal();
    return;
  }

  const logs = state.getArtLogs();
  const pushBtn = UI.btnArtGSheetPush;
  const modalPushBtn = UI.btnArtGSheetModalPush;

  const setPushing = (isPushing) => {
    if (pushBtn) {
      pushBtn.disabled = isPushing;
      pushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
    if (modalPushBtn) {
      modalPushBtn.disabled = isPushing;
      modalPushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
  };

  setPushing(true);

  try {
    const payload = {
      action: 'sync_all',
      logs: logs
    };

    // Use text/plain to avoid preflight CORS restrictions from Google Apps Script Web App
    await fetch(config.webAppUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    });

    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    config.lastSyncTime = formatted;
    config.lastSyncStatus = 'success';
    state.saveArtGSheetConfig(config);
    renderArtGSheetBar();

    if (UI.labelArtGSheetModalLastSync) UI.labelArtGSheetModalLastSync.textContent = formatted;

    showToast('Sinkronisasi Sukses', `Sebanyak <strong>${logs.length} data ART</strong> berhasil dikirim ke Google Spreadsheet.`, 'success');
  } catch (err) {
    console.error('Error pushing ART to Google Sheets:', err);
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    config.lastSyncTime = formatted;
    state.saveArtGSheetConfig(config);
    renderArtGSheetBar();
    showToast('Data Dikirim', `Permintaan sinkronisasi (${logs.length} data ART) telah dikirim ke Google Spreadsheet.`, 'info');
  } finally {
    setPushing(false);
  }
}

async function pullArtFromGoogleSheets() {
  const config = state.getArtGSheetConfig();
  if (!config.webAppUrl && !config.sheetId) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App atau ID Spreadsheet terlebih dahulu.', 'warning');
    openArtGSheetModal();
    return;
  }

  const pullBtn = UI.btnArtGSheetPull;
  const modalPullBtn = UI.btnArtGSheetModalPull;

  const setPulling = (isPulling) => {
    if (pullBtn) {
      pullBtn.disabled = isPulling;
      pullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
    if (modalPullBtn) {
      modalPullBtn.disabled = isPulling;
      modalPullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
  };

  setPulling(true);

  try {
    let pulledRows = null;

    if (config.webAppUrl) {
      const getUrl = config.webAppUrl + (config.webAppUrl.includes('?') ? '&' : '?') + 'action=get_all';
      const resp = await fetch(getUrl, { method: 'GET', mode: 'cors' });
      if (resp.ok) {
        const json = await resp.json();
        if (json && json.success && Array.isArray(json.data)) {
          pulledRows = json.data;
        }
      }
    }

    // Fallback to public sheet CSV export if Web App did not return JSON or if only sheetId is present
    if (!pulledRows && config.sheetId) {
      const cleanId = extractGoogleSpreadsheetId(config.sheetId);
      const csvUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv&sheet=${encodeURIComponent(config.sheetName || 'ART_Data')}`;
      const resp = await fetch(csvUrl);
      if (resp.ok) {
        const csvText = await resp.text();
        const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          pulledRows = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = parseCsvRow(lines[i]);
            if (cols[0]) {
              const artSec = parseFloat(cols[4]) || 0;
              const targetSec = parseInt(cols[5], 10) || 30;
              const devSec = artSec - targetSec;
              const devText = devSec <= 0 ? ('-' + Math.abs(devSec).toFixed(1) + ' dtk (Cepat)') : ('+' + devSec.toFixed(1) + ' dtk (Over SLA)');
              pulledRows.push({
                id: cols[0],
                date: cols[1] || '',
                userFullName: cols[2] || '',
                department: cols[3] || 'CSO DIGILIVE CHAT - WA',
                interactionCount: 1,
                queueSeconds: 0,
                frtSeconds: 0,
                avgResponseSeconds: artSec,
                targetSeconds: targetSec,
                deviationSeconds: devSec,
                deviationText: devText,
                status: cols[6] || (artSec <= targetSec ? 'Sesuai SLA' : 'Over SLA'),
                notes: cols[7] || '',
                createdAt: cols[8] || ''
              });
            }
          }
        }
      }
    }

    if (pulledRows && pulledRows.length > 0) {
      state.saveArtLogs(pulledRows);
      const now = new Date();
      const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      config.lastSyncTime = formatted;
      state.saveArtGSheetConfig(config);
      renderArtPage();
      showToast('Tarik Data Berhasil', `Berhasil mengambil <strong>${pulledRows.length} data ART</strong> dari Google Spreadsheet.`, 'success');
    } else {
      showToast('Data Kosong / Tidak Terbaca', 'Tidak ada data ART yang ditemukan pada Google Spreadsheet atau sheet masih kosong.', 'info');
    }
  } catch (err) {
    console.error('Error pulling ART from Google Sheets:', err);
    showToast('Gagal Menarik Data', 'Pastikan Google Apps Script sudah dideploy dengan akses "Anyone" atau sheet publik.', 'danger');
  } finally {
    setPulling(false);
  }
}

function autoSyncArtAction(action, payload) {
  const config = state.getArtGSheetConfig();
  if (!config.webAppUrl || config.autoSync === false) return;

  const bodyData = {
    action,
    ...payload
  };

  fetch(config.webAppUrl, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    }
  }).then(() => {
    const now = new Date();
    config.lastSyncTime = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    state.saveArtGSheetConfig(config);
    renderArtGSheetBar();
  }).catch(err => {
    console.warn('Auto-sync ART to Google Sheets notification:', err);
  });
}

function copyArtAppsScriptCode() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(ART_APPS_SCRIPT_TEMPLATE).then(() => {
      showToast('Tersalin!', 'Kode Google Apps Script berhasil disalin ke clipboard.', 'success');
    }).catch(() => {
      fallbackCopyText(ART_APPS_SCRIPT_TEMPLATE);
    });
  } else {
    fallbackCopyText(ART_APPS_SCRIPT_TEMPLATE);
  }
}


// ==========================================
// 12.8 ART (AVERAGE RESPONSE TIME)
// ==========================================

function renderArtPage() {
  const isAdmin = state.isAdmin();
  const currentUser = state.currentUser;
  const currentFullName = currentUser ? currentUser.fullName : '';

  const monthLabels = {
    '2026-09': 'September 2026',
    '2026-08': 'Agustus 2026',
    '2026-07': 'Juli 2026'
  };

  const selectedMonth = (UI.filterArtMonth ? UI.filterArtMonth.value : '2026-09') || '2026-09';
  const monthLabel = monthLabels[selectedMonth] || selectedMonth;

  if (UI.artMonthHeaderLabel) {
    UI.artMonthHeaderLabel.textContent = monthLabel;
  }

  // Update Page Title and Description based on Role
  const pageTitle = document.querySelector('#pageArt .page-title');
  const pageDesc = document.querySelector('#pageArt .page-desc');
  if (pageTitle) {
    pageTitle.textContent = isAdmin ? 'Average Response Time (ART)' : 'Average Response Time (ART) - Performa Saya';
  }
  if (pageDesc) {
    pageDesc.textContent = '';
    pageDesc.classList.add('hidden');
  }

  // Ensure FRT card remains hidden
  const artCardFrt = document.getElementById('artCardFrt');
  if (artCardFrt) artCardFrt.classList.add('hidden');

  // Update Permission Explanatory Banner & Action Visibility
  if (isAdmin) {
    if (UI.artBannerRoleLabel) UI.artBannerRoleLabel.textContent = 'Otoritas Akses Response Time (ART)';
    if (UI.artBannerRoleDesc) {
      UI.artBannerRoleDesc.textContent = '';
      UI.artBannerRoleDesc.classList.add('hidden');
    }
    if (UI.artBannerBadgePrivilege) {
      UI.artBannerBadgePrivilege.className = 'badge badge-admin';
      UI.artBannerBadgePrivilege.textContent = 'Akses Penuh (CRUD)';
    }
    if (UI.btnOpenAddArtModal) UI.btnOpenAddArtModal.classList.remove('hidden');
    if (UI.btnDeleteAllArtMonth) UI.btnDeleteAllArtMonth.classList.remove('hidden');
    if (UI.btnOpenArtGoogleSheetsModal) UI.btnOpenArtGoogleSheetsModal.classList.add('hidden');
    if (UI.artGSheetSyncBar) UI.artGSheetSyncBar.classList.remove('hidden');
    if (UI.artThSelectAll) UI.artThSelectAll.classList.remove('hidden');
  } else {
    if (UI.artBannerRoleLabel) UI.artBannerRoleLabel.textContent = 'Otoritas Akses Response Time (ART)';
    if (UI.artBannerRoleDesc) {
      UI.artBannerRoleDesc.textContent = '';
      UI.artBannerRoleDesc.classList.add('hidden');
    }
    if (UI.artBannerBadgePrivilege) {
      UI.artBannerBadgePrivilege.className = 'badge badge-user';
      UI.artBannerBadgePrivilege.textContent = 'Hanya Lihat (Read-Only)';
    }
    if (UI.btnOpenAddArtModal) UI.btnOpenAddArtModal.classList.add('hidden');
    if (UI.btnDeleteAllArtMonth) UI.btnDeleteAllArtMonth.classList.add('hidden');
    if (UI.btnOpenArtGoogleSheetsModal) UI.btnOpenArtGoogleSheetsModal.classList.add('hidden');
    if (UI.artGSheetSyncBar) UI.artGSheetSyncBar.classList.add('hidden');
    if (UI.artThSelectAll) UI.artThSelectAll.classList.add('hidden');
    state.selectedArtIds.clear();
    if (UI.artBatchBar) UI.artBatchBar.classList.add('hidden');
  }

  renderArtGSheetBar();

  const allArtLogs = state.getArtLogs();
  const monthLogs = allArtLogs.filter(l => (l.date || '').startsWith(selectedMonth));
  const users = state.getUsers();

  // Populate filterSummaryArtUser in Section 1
  if (UI.filterSummaryArtUser) {
    if (isAdmin) {
      const curVal = UI.filterSummaryArtUser.value || 'ALL';
      UI.filterSummaryArtUser.disabled = false;
      UI.filterSummaryArtUser.innerHTML = '<option value="ALL">Semua Nama User</option>' +
        users.map(u => `<option value="${u.fullName}">${u.fullName}</option>`).join('');
      if (Array.from(UI.filterSummaryArtUser.options).some(o => o.value === curVal)) {
        UI.filterSummaryArtUser.value = curVal;
      }
    } else {
      UI.filterSummaryArtUser.innerHTML = `<option value="${currentFullName}" selected>${currentFullName} (Diri Sendiri)</option>`;
      UI.filterSummaryArtUser.disabled = true;
    }
  }

  // Populate filterArtUserSelect in Section 2 toolbar
  if (UI.filterArtUserSelect) {
    if (isAdmin) {
      const currentVal = UI.filterArtUserSelect.value || 'ALL';
      UI.filterArtUserSelect.disabled = false;
      UI.filterArtUserSelect.innerHTML = '<option value="ALL">Semua User</option>' +
        users.map(u => `<option value="${u.fullName}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
      if (Array.from(UI.filterArtUserSelect.options).some(o => o.value === currentVal)) {
        UI.filterArtUserSelect.value = currentVal;
      }
    } else {
      UI.filterArtUserSelect.innerHTML = `<option value="${currentFullName}" selected>${currentFullName} (Diri Sendiri)</option>`;
      UI.filterArtUserSelect.disabled = true;
    }
  }

  // ========================================================
  // Section 1: Rekapitulasi Average Response Time Bulanan
  // (Untuk admin: Data seluruh agent; Untuk user: Data dirinya sendiri)
  // ========================================================
  const summaryTitleEl = document.querySelector('#artUserSummarySection h3 span');
  const summaryDescEl = document.querySelector('#artUserSummarySection p');
  if (summaryTitleEl) {
    if (isAdmin) {
      summaryTitleEl.innerHTML = `Rekapitulasi Average Response Time Seluruh Agent Periode <span id="artMonthHeaderLabel" class="text-red">${monthLabel}</span>`;
    } else {
      summaryTitleEl.innerHTML = `Rekapitulasi Average Response Time Saya Periode <span id="artMonthHeaderLabel" class="text-red">${monthLabel}</span>`;
    }
  }
  if (summaryDescEl) {
    summaryDescEl.textContent = '';
    summaryDescEl.classList.add('hidden');
  }

  const summaryFilterUser = isAdmin ? (UI.filterSummaryArtUser ? UI.filterSummaryArtUser.value : 'ALL') : currentFullName;
  const summaryFilterService = (UI.filterSummaryArtService ? UI.filterSummaryArtService.value : 'ALL');

  const availableAgents = isAdmin
    ? users
    : users.filter(u => u.fullName === currentFullName || (currentUser && (u.username === currentUser.username || u.id === currentUser.id)));

  const filteredAgents = availableAgents.filter(u => {
    if (!isAdmin && u.fullName !== currentFullName) return false;
    if (isAdmin && summaryFilterUser !== 'ALL' && u.fullName !== summaryFilterUser) return false;
    if (summaryFilterService !== 'ALL' && (u.department || 'CSO DIGILIVE CHAT - WA') !== summaryFilterService) return false;
    return true;
  });

  const userSummaries = filteredAgents.map(u => {
    const userLogs = monthLogs.filter(l => l.userFullName === u.fullName);
    const daysInput = userLogs.length;
    let totalInteractions = 0;
    let sumQueue = 0;
    let sumFrt = 0;
    let sumArt = 0;
    let avgQueueSec = '-';
    let avgFrtSec = '-';
    let avgArtSec = 0;
    let complianceDays = 0;
    let complianceRate = '0.0';
    let avgDeviationSec = 0;
    let statusText = 'Belum Ada Input';
    let statusBadge = 'badge-gray';
    let statusIcon = 'fa-regular fa-clock';

    if (daysInput > 0) {
      totalInteractions = userLogs.reduce((acc, l) => acc + (Number(l.interactionCount) || 1), 0);
      sumQueue = userLogs.reduce((acc, l) => acc + ((Number(l.queueSeconds) || 0) * (Number(l.interactionCount) || 1)), 0);
      sumFrt = userLogs.reduce((acc, l) => acc + ((Number(l.frtSeconds) || 0) * (Number(l.interactionCount) || 1)), 0);
      sumArt = userLogs.reduce((acc, l) => acc + ((Number(l.avgResponseSeconds) || 0) * (Number(l.interactionCount) || 1)), 0);

      avgQueueSec = totalInteractions > 0 ? (sumQueue / totalInteractions).toFixed(1) : '-';
      avgFrtSec = totalInteractions > 0 ? (sumFrt / totalInteractions).toFixed(1) : '-';
      avgArtSec = totalInteractions > 0 ? parseFloat((sumArt / totalInteractions).toFixed(1)) : 0;

      complianceDays = userLogs.filter(l => (Number(l.avgResponseSeconds) || 0) <= (Number(l.targetSeconds) || 30)).length;
      complianceRate = ((complianceDays / daysInput) * 100).toFixed(1);
      avgDeviationSec = parseFloat((avgArtSec - 30).toFixed(1));

      if (avgArtSec <= 15.0) {
        statusText = 'Sangat Responsif';
        statusBadge = 'badge-green';
        statusIcon = 'fa-solid fa-bolt text-green';
      } else if (avgArtSec <= 30.0) {
        statusText = 'Sesuai SLA';
        statusBadge = 'badge-green';
        statusIcon = 'fa-solid fa-circle-check text-green';
      } else {
        statusText = 'Over SLA';
        statusBadge = 'badge-yellow';
        statusIcon = 'fa-solid fa-triangle-exclamation text-yellow';
      }
    }

    return {
      user: u,
      daysInput,
      totalInteractions,
      avgQueueSec,
      avgFrtSec,
      avgArtSec,
      complianceRate,
      avgDeviationSec,
      statusText,
      statusBadge,
      statusIcon
    };
  });

  // Sort summary by Fastest, Slowest, or Compliance
  const summarySort = (UI.filterArtSummarySort ? UI.filterArtSummarySort.value : 'FASTEST');
  if (summarySort === 'SLOWEST') {
    userSummaries.sort((a, b) => b.avgArtSec - a.avgArtSec);
  } else if (summarySort === 'COMPLIANCE_DESC') {
    userSummaries.sort((a, b) => parseFloat(b.complianceRate) - parseFloat(a.complianceRate));
  } else {
    // FASTEST
    userSummaries.sort((a, b) => {
      if (a.daysInput === 0 && b.daysInput > 0) return 1;
      if (b.daysInput === 0 && a.daysInput > 0) return -1;
      return a.avgArtSec - b.avgArtSec;
    });
  }

  if (UI.artUserCountBadge) {
    if (isAdmin) {
      UI.artUserCountBadge.textContent = `${filteredAgents.length} Agent Terdaftar`;
    } else {
      UI.artUserCountBadge.textContent = 'Performa Pribadi';
    }
  }

  // Render Section 1 table
  if (UI.artUserSummaryBody) {
    UI.artUserSummaryBody.innerHTML = '';
    if (userSummaries.length === 0) {
      UI.artUserSummaryBody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--gray-400);"><i class="fa-regular fa-folder-open" style="font-size:1.5rem; display:block; margin-bottom:6px; opacity:0.6;"></i>Tidak ada data response time yang sesuai dengan filter.</td></tr>';
    } else {
      userSummaries.forEach(summary => {
        const u = summary.user;
        const tr = document.createElement('tr');

        let devHtml = '<span style="color:var(--gray-400);">-</span>';
        if (summary.daysInput > 0) {
          const isUnder = summary.avgDeviationSec <= 0;
          const devText = isUnder
            ? `-${Math.abs(summary.avgDeviationSec).toFixed(1)} dtk (Cepat)`
            : `+${summary.avgDeviationSec.toFixed(1)} dtk (Over)`;
          devHtml = `
            <span class="${isUnder ? 'text-green' : 'text-yellow'}" style="font-size:0.8rem; font-weight:600;">
              <i class="${isUnder ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-up'}" style="margin-right:3px;"></i>${devText}
            </span>
          `;
        }

        const avgFormatted = summary.daysInput > 0 ? `${summary.avgArtSec.toFixed(1)}s` : '-';

        tr.innerHTML = `
          <td>
            <div style="display:flex; align-items:center; gap: 10px;">
              <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" alt="${u.fullName}" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:2px solid var(--border-color);">
              <div>
                <strong style="color:#fff; font-size:0.875rem;">${u.fullName}</strong>
                <div style="display:flex; align-items:center; gap:6px; margin-top:2px;">
                  <span class="badge ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}" style="font-size:0.65rem;">${u.role.toUpperCase()}</span>
                  <span style="font-size:0.75rem; color:var(--gray-400);">${u.email}</span>
                </div>
              </div>
            </div>
          </td>
          <td><span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-headset text-red" style="margin-right:4px;"></i>${u.department || 'CSO Layanan'}</span></td>
          <td style="text-align: center;"><span class="font-mono font-bold" style="color:var(--gray-200);">${summary.daysInput} Hari</span></td>
          <td style="text-align: center;"><strong class="${summary.avgArtSec <= 30 ? 'text-green' : 'text-yellow'} font-mono" style="font-size:1.05rem;">${avgFormatted}</strong></td>
          <td style="text-align: center;"><span class="font-mono text-silver" style="font-size:0.85rem;">&lt; 30s</span></td>
          <td style="text-align: center;">${devHtml}</td>
          <td style="text-align: center;"><span class="badge ${parseFloat(summary.complianceRate) >= 95 ? 'badge-green' : 'badge-yellow'} font-mono" style="font-size:0.75rem;">${summary.daysInput > 0 ? summary.complianceRate + '%' : '-'}</span></td>
          <td style="text-align: center;"><span class="badge ${summary.statusBadge}" style="font-size:0.75rem;"><i class="${summary.statusIcon}" style="margin-right:4px;"></i>${summary.statusText}</span></td>
        `;
        UI.artUserSummaryBody.appendChild(tr);
      });
    }
  }

  // ========================================================
  // Monthly Overview Top 4 Metric Cards
  // ========================================================
  if (isAdmin) {
    let teamTotalArt = 0;
    let teamTotalFrt = 0;
    let teamTotalInteractions = 0;
    let teamCompCount = 0;

    monthLogs.forEach(l => {
      const art = Number(l.avgResponseSeconds) || 0;
      const frt = Number(l.frtSeconds) || 0;
      const cnt = Number(l.interactionCount) || 1;
      teamTotalArt += (art * cnt);
      teamTotalFrt += (frt * cnt);
      teamTotalInteractions += cnt;
      if (art <= (Number(l.targetSeconds) || 30)) {
        teamCompCount++;
      }
    });

    const teamAvgArt = teamTotalInteractions > 0 ? (teamTotalArt / teamTotalInteractions).toFixed(1) : '14.8';
    const teamAvgFrt = teamTotalInteractions > 0 ? (teamTotalFrt / teamTotalInteractions).toFixed(1) : '8.5';
    const teamCompPct = monthLogs.length > 0 ? ((teamCompCount / monthLogs.length) * 100).toFixed(1) : '98.6';

    if (UI.artStatAvg) UI.artStatAvg.innerHTML = `${teamAvgArt} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>`;
    if (UI.artStatAvgSub) UI.artStatAvgSub.textContent = `Kecepatan respon chat aktif tim`;
    if (UI.artStatFrt) UI.artStatFrt.innerHTML = `${teamAvgFrt} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>`;
    if (UI.artStatFrtSub) UI.artStatFrtSub.textContent = `Waktu sapaan pertama agen ke pelanggan`;
    if (UI.artStatCompliance) UI.artStatCompliance.textContent = `${teamCompPct}%`;
    if (UI.artStatComplianceSub) UI.artStatComplianceSub.textContent = `${teamCompCount} dari ${monthLogs.length} sesi input harian patuh SLA`;

    // Card 4: Top Performer User (Fastest compliant agent)
    const validAgents = userSummaries.filter(s => s.daysInput > 0);
    if (validAgents.length > 0) {
      const best = validAgents[0]; // Already sorted FASTEST
      if (UI.artStatTopUser) UI.artStatTopUser.textContent = best.user.fullName;
      if (UI.artStatTopUserSub) UI.artStatTopUserSub.textContent = `ART: ${best.avgArtSec.toFixed(1)}s (${best.complianceRate}% SLA)`;
    } else {
      if (UI.artStatTopUser) UI.artStatTopUser.textContent = '-';
      if (UI.artStatTopUserSub) UI.artStatTopUserSub.textContent = 'Belum ada input bulan ini';
    }

    const card1Label = document.querySelector('#artCardMonthlyAvg .metric-label');
    if (card1Label) card1Label.textContent = 'Rata-rata ART Tim Bulan Ini';
    const card4Label = document.getElementById('artStatTopUserLabel');
    if (card4Label) card4Label.textContent = 'Agen Paling Responsif';
  } else {
    // REGULAR USER STATS
    const myLogs = monthLogs.filter(l => l.userFullName === currentFullName);
    const myDaysInput = myLogs.length;
    let myTotalArt = 0;
    let myTotalFrt = 0;
    let myTotalInteractions = 0;
    let myCompCount = 0;

    myLogs.forEach(l => {
      const art = Number(l.avgResponseSeconds) || 0;
      const frt = Number(l.frtSeconds) || 0;
      const cnt = Number(l.interactionCount) || 1;
      myTotalArt += (art * cnt);
      myTotalFrt += (frt * cnt);
      myTotalInteractions += cnt;
      if (art <= (Number(l.targetSeconds) || 30)) {
        myCompCount++;
      }
    });

    const myAvgArt = myTotalInteractions > 0 ? (myTotalArt / myTotalInteractions).toFixed(1) : '-';
    const myAvgFrt = myTotalInteractions > 0 ? (myTotalFrt / myTotalInteractions).toFixed(1) : '-';
    const myCompPct = myDaysInput > 0 ? ((myCompCount / myDaysInput) * 100).toFixed(1) : '100.0';

    const card1Label = document.querySelector('#artCardMonthlyAvg .metric-label');
    if (card1Label) card1Label.textContent = 'Rata-rata ART Saya Bulan Ini';
    if (UI.artStatAvg) UI.artStatAvg.innerHTML = `${myAvgArt} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>`;
    if (UI.artStatAvgSub) UI.artStatAvgSub.textContent = myDaysInput > 0 ? `${myDaysInput} hari input (${myTotalInteractions} sesi)` : 'Belum ada data bulan ini';

    if (UI.artStatFrt) UI.artStatFrt.innerHTML = `${myAvgFrt} <small style="font-size:0.85rem; color:var(--gray-400); font-weight:normal;">Detik</small>`;
    if (UI.artStatFrtSub) UI.artStatFrtSub.textContent = 'Respon sapaan pertama akun Anda';

    if (UI.artStatCompliance) UI.artStatCompliance.textContent = `${myCompPct}%`;
    if (UI.artStatComplianceSub) UI.artStatComplianceSub.textContent = myDaysInput > 0 ? `${myCompCount} dari ${myDaysInput} hari memenuhi SLA (< 30s)` : 'Standar SLA: < 30 Detik';

    const card4Label = document.getElementById('artStatTopUserLabel');
    if (card4Label) card4Label.textContent = 'Status Kecepatan Respon';
    if (UI.artStatTopUser) {
      if (myDaysInput === 0) {
        UI.artStatTopUser.textContent = 'Belum Ada Input';
      } else {
        const numAvg = parseFloat(myAvgArt);
        if (numAvg <= 15.0) {
          UI.artStatTopUser.innerHTML = '<span class="text-green"><i class="fa-solid fa-bolt"></i> Sangat Responsif</span>';
        } else if (numAvg <= 30.0) {
          UI.artStatTopUser.innerHTML = '<span class="text-green"><i class="fa-solid fa-circle-check"></i> Sesuai SLA</span>';
        } else {
          UI.artStatTopUser.innerHTML = '<span class="text-yellow"><i class="fa-solid fa-triangle-exclamation"></i> Over SLA</span>';
        }
      }
    }
    if (UI.artStatTopUserSub) {
      UI.artStatTopUserSub.textContent = myDaysInput > 0 ? `Total ${myTotalInteractions} sesi chat dilayani` : 'Pencatatan dikelola oleh Admin';
    }
  }

  // ========================================================
  // Section 2: Log Response Time Harian (Interval Input Per Hari)
  // ========================================================
  if (UI.artDailySubtitle) {
    UI.artDailySubtitle.textContent = '';
    UI.artDailySubtitle.classList.add('hidden');
  }

  const searchQ = (UI.searchArtInput ? UI.searchArtInput.value.trim().toLowerCase() : '');
  const filterUser = isAdmin ? (UI.filterArtUserSelect ? UI.filterArtUserSelect.value : 'ALL') : currentFullName;
  const filterService = (UI.filterArtService ? UI.filterArtService.value : 'ALL');
  const filterStatus = (UI.filterArtStatus ? UI.filterArtStatus.value : 'ALL');

  if (UI.btnClearSearchArt) {
    UI.btnClearSearchArt.classList.toggle('hidden', !searchQ);
  }

  const filteredLogs = monthLogs.filter(item => {
    // RBAC: Regular user can ONLY see their own logs
    if (!isAdmin) {
      const matchSelf = (item.userFullName === currentFullName) ||
                        (currentUser && item.userId === currentUser.id) ||
                        (currentUser && item.username === currentUser.username);
      if (!matchSelf) return false;
    }

    if (searchQ) {
      const match = (item.userFullName || '').toLowerCase().includes(searchQ) ||
                    (item.date || '').toLowerCase().includes(searchQ) ||
                    (item.department || '').toLowerCase().includes(searchQ) ||
                    (item.notes || '').toLowerCase().includes(searchQ) ||
                    (item.status || '').toLowerCase().includes(searchQ);
      if (!match) return false;
    }

    if (isAdmin && filterUser !== 'ALL' && item.userFullName !== filterUser) return false;
    if (filterService !== 'ALL' && item.department !== filterService) return false;
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
    return true;
  });

  // Sort daily logs
  const sortMode = (UI.filterArtSort ? UI.filterArtSort.value : 'DATE_DESC');
  if (sortMode === 'DATE_ASC') {
    filteredLogs.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  } else if (sortMode === 'ART_ASC') {
    filteredLogs.sort((a, b) => (Number(a.avgResponseSeconds) || 0) - (Number(b.avgResponseSeconds) || 0));
  } else if (sortMode === 'ART_DESC') {
    filteredLogs.sort((a, b) => (Number(b.avgResponseSeconds) || 0) - (Number(a.avgResponseSeconds) || 0));
  } else {
    // DATE_DESC
    filteredLogs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  // Batch Toolbar & Checkbox sync for Admin
  if (isAdmin) {
    if (UI.artThSelectAll) UI.artThSelectAll.classList.remove('hidden');
    const visibleIds = filteredLogs.map(l => l.id);
    const selectedVisibleCount = visibleIds.filter(id => state.selectedArtIds.has(id)).length;
    if (UI.artSelectAllCheckbox) {
      UI.artSelectAllCheckbox.checked = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
      UI.artSelectAllCheckbox.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < visibleIds.length;
    }
    if (UI.artBatchBar) {
      const hasSelected = state.selectedArtIds.size > 0;
      UI.artBatchBar.classList.toggle('hidden', !hasSelected);
      if (UI.artSelectedCount) {
        UI.artSelectedCount.textContent = state.selectedArtIds.size;
      }
    }
  } else {
    if (UI.artThSelectAll) UI.artThSelectAll.classList.add('hidden');
    state.selectedArtIds.clear();
    if (UI.artBatchBar) UI.artBatchBar.classList.add('hidden');
  }

  // Render Table Body
  if (!UI.artTableBody) return;
  UI.artTableBody.innerHTML = '';

  const totalCols = isAdmin ? 10 : 9;
  if (filteredLogs.length === 0) {
    const tr = document.createElement('tr');
    const emptyMsg = isAdmin
      ? 'Tidak ada log response time harian yang sesuai dengan filter atau bulan terpilih.'
      : 'Tidak ada log response time harian untuk akun Anda pada bulan atau filter terpilih.';
    tr.innerHTML = `<td colspan="${totalCols}" style="text-align: center; padding: 36px; color: var(--gray-400);"><i class="fa-regular fa-folder-open" style="font-size:1.8rem; display:block; margin-bottom:8px; opacity:0.6;"></i>${emptyMsg}</td>`;
    UI.artTableBody.appendChild(tr);
    return;
  }

  filteredLogs.forEach(item => {
    const tr = document.createElement('tr');
    const isChecked = state.selectedArtIds.has(item.id);
    const artSec = Number(item.avgResponseSeconds) || 0;
    const targetSec = Number(item.targetSeconds) || 30;
    const isSlaMet = artSec <= targetSec;
    const interactionCount = Number(item.interactionCount) || 1;
    const queueSec = Number(item.queueSeconds) || 0;
    const frtSec = Number(item.frtSeconds) || 0;

    const checkboxHtml = isAdmin ? `
      <td style="text-align: center;">
        <input type="checkbox" class="art-table-checkbox art-row-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''}>
      </td>
    ` : '';

    const actionHtml = isAdmin ? `
      <td style="text-align:center;">
        <div style="display:inline-flex; gap:4px;">
          <button class="btn btn-icon btn-sm" onclick="promptEditArt('${item.id}')" title="Edit Response Time">
            <i class="fa-solid fa-pen-to-square text-silver"></i>
          </button>
          <button class="btn btn-icon btn-sm" onclick="promptDeleteArt('${item.id}', '${(item.userFullName || '').replace(/'/g, "\\'")}', '${item.date || ''}')" title="Hapus Response Time">
            <i class="fa-solid fa-trash-can text-red"></i>
          </button>
        </div>
      </td>
    ` : `
      <td style="text-align:center;">
        <span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-eye" style="margin-right:4px;"></i>Hanya Lihat</span>
      </td>
    `;

    tr.innerHTML = `
      ${checkboxHtml}
      <td><span class="font-mono font-bold" style="color:var(--gray-200);">${item.date || '-'}</span></td>
      <td><strong style="color:#fff; font-size:0.875rem;">${item.userFullName || '-'}</strong></td>
      <td><span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-headset text-red" style="margin-right:4px;"></i>${item.department || '-'}</span></td>
      <td style="text-align: right;"><strong class="${isSlaMet ? 'text-green' : 'text-yellow'} font-mono" style="font-size:1.05rem;">${artSec.toFixed(1)}s</strong></td>
      <td style="text-align: right;"><span class="font-mono text-silver">&lt; 30s</span></td>
      <td>
        <span class="${isSlaMet ? 'text-green' : 'text-yellow'}" style="font-size:0.78rem; font-weight:600;">
          <i class="${isSlaMet ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-up'}" style="margin-right:3px;"></i>${item.deviationText || (isSlaMet ? 'Sesuai SLA' : 'Over SLA')}
        </span>
      </td>
      <td>
        <span class="badge ${isSlaMet ? 'badge-green' : 'badge-yellow'}" style="font-size:0.72rem;">
          <i class="${isSlaMet ? 'fa-solid fa-bolt' : 'fa-solid fa-triangle-exclamation'}" style="margin-right:3px;"></i>${item.status || (isSlaMet ? 'Sesuai SLA' : 'Over SLA')}
        </span>
      </td>
      <td>
        <div style="font-size:0.75rem; color:var(--gray-300); max-width:240px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${(item.notes || '').replace(/"/g, '&quot;')}">
          ${item.notes || '-'}
        </div>
      </td>
      ${actionHtml}
    `;
    UI.artTableBody.appendChild(tr);
  });
}

function updateArtModalResponsePreview() {
  const artSec = parseFloat(UI.formArtResponseSecs ? UI.formArtResponseSecs.value : '0') || 0;
  const target = parseFloat(UI.formArtTargetSecs ? UI.formArtTargetSecs.value : '30') || 30;
  const diff = parseFloat((artSec - target).toFixed(1));
  const isSla = artSec <= target;
  const diffText = isSla ? `-${Math.abs(diff).toFixed(1)} dtk (Sesuai SLA)` : `+${diff.toFixed(1)} dtk (Over SLA)`;
  if (UI.formArtResponsePreview) {
    UI.formArtResponsePreview.innerHTML = `Respon: <strong style="color:#fff;">${artSec.toFixed(1)}s</strong> • Deviasi: <span class="${isSla ? 'text-green' : 'text-yellow'}"><strong>${diffText}</strong></span>`;
  }
}

function openAddArtModal() {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk menambah response time user.', 'warning');
    return;
  }

  if (UI.modalArtTitle) UI.modalArtTitle.textContent = 'Input Response Time Harian (ART)';
  if (UI.modalArtSubtitle) {
    UI.modalArtSubtitle.textContent = '';
    UI.modalArtSubtitle.classList.add('hidden');
  }
  if (UI.btnSubmitArtText) UI.btnSubmitArtText.textContent = 'Simpan Response Time';
  if (UI.formArt) UI.formArt.reset();
  if (UI.formArtId) UI.formArtId.value = '';

  // Populate user dropdown
  const users = state.getUsers();
  if (UI.formArtUserSelect) {
    UI.formArtUserSelect.innerHTML = users.map(u => `<option value="${u.fullName}" data-dept="${u.department || 'CSO DIGILIVE CHAT - WA'}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
    if (users.length > 0 && UI.formArtDept) {
      UI.formArtDept.value = users[0].department || 'CSO DIGILIVE CHAT - WA';
    }
  }

  // Set default date to today or selected month
  const now = new Date();
  const selectedMonth = (UI.filterArtMonth ? UI.filterArtMonth.value : '2026-09') || '2026-09';
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const defaultDate = todayStr.startsWith(selectedMonth) ? todayStr : `${selectedMonth}-15`;

  if (UI.formArtDate) UI.formArtDate.value = defaultDate;
  if (UI.formArtInteractionCount) UI.formArtInteractionCount.value = '1';
  if (UI.formArtQueueSecs) UI.formArtQueueSecs.value = '0';
  if (UI.formArtFrtSecs) UI.formArtFrtSecs.value = '0';
  if (UI.formArtResponseSecs) UI.formArtResponseSecs.value = '13.5';
  if (UI.formArtTargetSecs) UI.formArtTargetSecs.value = '30';
  if (UI.formArtNotes) UI.formArtNotes.value = '';

  updateArtModalResponsePreview();

  if (UI.modalArtForm) UI.modalArtForm.classList.remove('hidden');
}

function openEditArtModal(item) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang dapat mengedit response time user.', 'warning');
    return;
  }

  const users = state.getUsers();
  if (UI.formArtUserSelect) {
    UI.formArtUserSelect.innerHTML = users.map(u => `<option value="${u.fullName}" data-dept="${u.department || 'CSO DIGILIVE CHAT - WA'}">${u.fullName} (${u.role.toUpperCase()})</option>`).join('');
    UI.formArtUserSelect.value = item.userFullName;
  }

  if (UI.formArtId) UI.formArtId.value = item.id;
  if (UI.formArtDate) UI.formArtDate.value = item.date;
  if (UI.formArtDept) UI.formArtDept.value = item.department || 'CSO DIGILIVE CHAT - WA';
  if (UI.formArtInteractionCount) UI.formArtInteractionCount.value = item.interactionCount || '1';
  if (UI.formArtQueueSecs) UI.formArtQueueSecs.value = item.queueSeconds !== undefined ? item.queueSeconds : 0;
  if (UI.formArtFrtSecs) UI.formArtFrtSecs.value = item.frtSeconds !== undefined ? item.frtSeconds : 0;
  if (UI.formArtResponseSecs) UI.formArtResponseSecs.value = item.avgResponseSeconds !== undefined ? item.avgResponseSeconds : 14.8;
  if (UI.formArtTargetSecs) UI.formArtTargetSecs.value = item.targetSeconds || 30;
  if (UI.formArtNotes) UI.formArtNotes.value = item.notes || '';

  if (UI.modalArtTitle) UI.modalArtTitle.textContent = 'Edit Response Time Harian (ART)';
  if (UI.modalArtSubtitle) {
    UI.modalArtSubtitle.textContent = '';
    UI.modalArtSubtitle.classList.add('hidden');
  }
  if (UI.btnSubmitArtText) UI.btnSubmitArtText.textContent = 'Perbarui Response Time';

  updateArtModalResponsePreview();

  if (UI.modalArtForm) UI.modalArtForm.classList.remove('hidden');
}

function closeArtModal() {
  if (UI.modalArtForm) UI.modalArtForm.classList.add('hidden');
}

function handleSaveArt(e) {
  e.preventDefault();
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang memiliki wewenang untuk menyimpan atau mengubah response time.', 'danger');
    return;
  }
  const u = state.currentUser;
  if (!u) return;

  const id = UI.formArtId ? UI.formArtId.value : '';
  const date = (UI.formArtDate ? UI.formArtDate.value : '').trim();
  const userFullName = (UI.formArtUserSelect ? UI.formArtUserSelect.value : '').trim();
  const department = (UI.formArtDept ? UI.formArtDept.value : 'CSO DIGILIVE CHAT - WA');
  const interactionCount = parseInt(UI.formArtInteractionCount ? UI.formArtInteractionCount.value : '1', 10) || 1;
  const queueSeconds = parseFloat(UI.formArtQueueSecs ? UI.formArtQueueSecs.value : '0') || 0;
  const frtSeconds = parseFloat(UI.formArtFrtSecs ? UI.formArtFrtSecs.value : '0') || 0;
  const avgResponseSeconds = parseFloat(UI.formArtResponseSecs ? UI.formArtResponseSecs.value : '0') || 0;
  const targetSeconds = parseFloat(UI.formArtTargetSecs ? UI.formArtTargetSecs.value : '30') || 30;
  const notes = (UI.formArtNotes ? UI.formArtNotes.value : '').trim();

  if (!date) {
    showToast('Form Belum Lengkap', 'Tanggal input harian wajib diisi.', 'warning');
    return;
  }
  if (!userFullName) {
    showToast('Form Belum Lengkap', 'Pilih petugas CSO yang menangani.', 'warning');
    return;
  }
  if (avgResponseSeconds <= 0) {
    showToast('Waktu Respon Tidak Valid', 'Rata-rata respon time harus lebih dari 0 detik.', 'warning');
    return;
  }
  if (interactionCount <= 0) {
    showToast('Jumlah Tidak Valid', 'Jumlah interaksi/sesi yang ditangani harus lebih dari 0.', 'warning');
    return;
  }

  const deviationSeconds = parseFloat((avgResponseSeconds - targetSeconds).toFixed(1));
  const isSlaMet = avgResponseSeconds <= targetSeconds;
  const deviationText = isSlaMet ? `-${Math.abs(deviationSeconds).toFixed(1)} dtk (Cepat)` : `+${deviationSeconds.toFixed(1)} dtk (Over SLA)`;
  const status = isSlaMet ? 'Sesuai SLA' : 'Over SLA';

  const artLogs = state.getArtLogs();
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  if (id) {
    // EDIT
    const idx = artLogs.findIndex(t => t.id === id);
    if (idx !== -1) {
      artLogs[idx] = {
        ...artLogs[idx],
        date,
        userFullName,
        department,
        interactionCount,
        queueSeconds,
        frtSeconds,
        avgResponseSeconds,
        targetSeconds,
        deviationSeconds,
        deviationText,
        status,
        notes
      };
      state.saveArtLogs(artLogs);
      state.addLog('UPDATE_ART', 'Ubah Response Time', `Admin ${u.fullName} memperbarui response time harian ${userFullName} (${date}): ${avgResponseSeconds}s (${status}).`);
      showToast('Response Time Diperbarui', `Response time <strong>${userFullName}</strong> (${date}) berhasil diperbarui menjadi <strong>${avgResponseSeconds} Detik</strong> (${status}).`, 'success');
      autoSyncArtAction('save', { log: artLogs[idx] });
    }
  } else {
    // NEW
    const newEntry = {
      id: 'art_' + Date.now(),
      date,
      userFullName,
      department,
      interactionCount,
      queueSeconds,
      frtSeconds,
      avgResponseSeconds,
      targetSeconds,
      deviationSeconds,
      deviationText,
      status,
      notes,
      createdAt: timeStr
    };
    artLogs.unshift(newEntry);
    state.saveArtLogs(artLogs);
    state.addLog('CREATE_ART', 'Input Response Time', `Admin ${u.fullName} mencatat response time harian untuk ${userFullName}: ${avgResponseSeconds}s.`);
    showToast('Response Time Disimpan', `Response time <strong>${avgResponseSeconds} Detik</strong> untuk <strong>${userFullName}</strong> (${date}) berhasil dicatat.`, 'success');
    autoSyncArtAction('save', { log: newEntry });
  }

  closeArtModal();
  renderArtPage();
}

window.promptEditArt = function(id) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki wewenang untuk mengedit response time.', 'warning');
    return;
  }
  const artLogs = state.getArtLogs();
  const item = artLogs.find(t => t.id === id);
  if (!item) return;
  openEditArtModal(item);
};

window.promptDeleteArt = function(id, name, date) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang memiliki hak izin untuk menghapus response time.', 'warning');
    return;
  }
  state.pendingDelete = { type: 'art', id, name: `${name} (${date})` };
  UI.confirmDeleteTitle.textContent = 'Hapus Response Time Harian?';
  UI.confirmDeleteMessage.innerHTML = `Data response time harian <strong>${name}</strong> tanggal <strong>${date}</strong> akan dihapus permanen dari sistem.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.promptDeleteAllArtMonth = function() {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang dapat menghapus data response time bulanan.', 'warning');
    return;
  }
  const month = (UI.filterArtMonth ? UI.filterArtMonth.value : '2026-09') || '2026-09';
  const monthText = month === '2026-09' ? 'September 2026' : (month === '2026-08' ? 'Agustus 2026' : 'Juli 2026');
  state.pendingDelete = { type: 'art_month', id: month, name: monthText };
  UI.confirmDeleteTitle.textContent = `Hapus Semua Response Time Bulan ${monthText}?`;
  UI.confirmDeleteMessage.innerHTML = `Perhatian: Seluruh data response time harian untuk periode <strong>${monthText}</strong> akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.handleArtBatchDelete = function() {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang dapat melakukan penghapusan massal.', 'warning');
    return;
  }
  const selectedList = Array.from(state.selectedArtIds);
  if (selectedList.length === 0) {
    showToast('Pilih Data', 'Pilih minimal satu data response time yang ingin dihapus.', 'info');
    return;
  }
  state.pendingDelete = { type: 'art_batch', id: 'batch', name: `${selectedList.length} data response time`, ids: selectedList };
  UI.confirmDeleteTitle.textContent = `Hapus ${selectedList.length} Data Response Time?`;
  UI.confirmDeleteMessage.innerHTML = `Sebanyak <strong>${selectedList.length} data response time</strong> yang ditandai akan dihapus secara permanen dari sistem.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.filterArtByUser = function(userName) {
  if (UI.filterArtUserSelect) {
    if (Array.from(UI.filterArtUserSelect.options).some(o => o.value === userName)) {
      UI.filterArtUserSelect.value = userName;
    }
  }
  if (UI.filterSummaryArtUser && state.isAdmin()) {
    if (Array.from(UI.filterSummaryArtUser.options).some(o => o.value === userName)) {
      UI.filterSummaryArtUser.value = userName;
    }
  }
  renderArtPage();
  const sub = document.getElementById('artDailySubtitle');
  if (sub) {
    sub.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function exportArtExcel() {
  const isAdmin = state.isAdmin();
  const currentUser = state.currentUser;
  const currentFullName = currentUser ? currentUser.fullName : '';
  const selMonth = (UI.filterArtMonth ? UI.filterArtMonth.value : '2026-09') || '2026-09';
  const allLogs = state.getArtLogs();
  const users = state.getUsers();

  let exportLogs;
  if (state.selectedArtIds && state.selectedArtIds.size > 0) {
    exportLogs = allLogs.filter(l => state.selectedArtIds.has(l.id));
  } else {
    let monthLogs = allLogs.filter(l => (l.date || '').startsWith(selMonth));
    if (!isAdmin) {
      monthLogs = monthLogs.filter(l => l.userFullName === currentFullName);
    }
    exportLogs = monthLogs;
  }

  if (exportLogs.length === 0) {
    showToast('Data Kosong', 'Tidak ada data Average Response Time (ART) untuk diekspor.', 'warning');
    return;
  }

  const sheet1Data = [
    ['No', 'ID Log ART', 'Tanggal Input', 'Nama Petugas CSO', 'Channel Layanan', 'Rata-rata ART Harian (Detik)', 'Target SLA (Detik)', 'Deviasi Waktu (Detik)', 'Status SLA', 'Catatan Kinerja Harian']
  ];
  exportLogs.forEach((l, idx) => {
    const artSec = Number(l.avgResponseSeconds) || 0;
    const tgtSec = Number(l.targetSeconds) || 30;
    const devSec = l.deviationSeconds !== undefined ? Number(l.deviationSeconds) : parseFloat((artSec - tgtSec).toFixed(1));
    sheet1Data.push([
      idx + 1,
      l.id,
      l.date,
      l.userFullName,
      l.department,
      artSec,
      tgtSec,
      devSec,
      l.status || (artSec <= tgtSec ? 'Sesuai SLA' : 'Over SLA'),
      l.notes || '-'
    ]);
  });

  const sheet2Data = [
    ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Hari Kerja Input', 'Rata-rata ART Bulanan (Detik)', 'Standar Target SLA (Detik)', 'Rata-rata Deviasi (Detik)', 'Kepatuhan SLA (%)', 'Status Performa']
  ];
  const targetUsers = isAdmin ? users : users.filter(u => u.fullName === currentFullName);
  targetUsers.forEach((u, idx) => {
    const userMonthLogs = allLogs.filter(l => (l.date || '').startsWith(selMonth) && l.userFullName === u.fullName);
    const count = userMonthLogs.length;
    let avg = 0, avgDev = 0, compliancePct = 0, status = 'Belum Ada Data';
    if (count > 0) {
      const sumArt = userMonthLogs.reduce((acc, curr) => acc + (Number(curr.avgResponseSeconds) || 0), 0);
      const sumDev = userMonthLogs.reduce((acc, curr) => acc + (curr.deviationSeconds !== undefined ? Number(curr.deviationSeconds) : (Number(curr.avgResponseSeconds) || 0) - 30), 0);
      avg = parseFloat((sumArt / count).toFixed(1));
      avgDev = parseFloat((sumDev / count).toFixed(1));
      const slaMetCount = userMonthLogs.filter(l => (Number(l.avgResponseSeconds) || 0) <= (Number(l.targetSeconds) || 30)).length;
      compliancePct = parseFloat(((slaMetCount / count) * 100).toFixed(1));
      status = avg <= 30 ? 'Memenuhi Standar (< 30s)' : 'Di Bawah Standar (> 30s)';
    }
    sheet2Data.push([
      idx + 1,
      u.fullName,
      u.department || 'CSO INBOUND',
      count,
      count > 0 ? avg : '-',
      30,
      count > 0 ? avgDev : '-',
      count > 0 ? `${compliancePct}%` : '-',
      status
    ]);
  });

  const filename = `DRIVE_Average_Response_Time_ART_${selMonth}_${new Date().toISOString().slice(0, 10)}.xlsx`;

  if (typeof XLSX !== 'undefined' && XLSX.utils) {
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
    const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
    ws1['!cols'] = [
      { wch: 6 }, { wch: 18 }, { wch: 16 }, { wch: 24 }, { wch: 26 },
      { wch: 26 }, { wch: 20 }, { wch: 22 }, { wch: 18 }, { wch: 45 }
    ];
    ws2['!cols'] = [
      { wch: 6 }, { wch: 24 }, { wch: 26 }, { wch: 16 }, { wch: 26 },
      { wch: 26 }, { wch: 24 }, { wch: 20 }, { wch: 26 }
    ];
    XLSX.utils.book_append_sheet(wb, ws1, 'Log Harian ART');
    XLSX.utils.book_append_sheet(wb, ws2, 'Rekapitulasi Bulanan');
    XLSX.writeFile(wb, filename);
  } else {
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + sheet1Data.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', filename.replace('.xlsx', '.csv'));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showToast('Download Berhasil', `Data Average Response Time (${exportLogs.length} baris) berhasil diunduh menjadi Excel.`, 'success');
}

// ==========================================
// 12.8.9 FINDING GOOGLE SPREADSHEET INTEGRATION
// ==========================================

const FINDING_APPS_SCRIPT_TEMPLATE = `/**
 * =====================================================================
 * GOOGLE APPS SCRIPT: INTEGRASI DATA TEMUAN AUDIT QA (FINDING)
 * Dashboard Agent CSO - Iconnet
 * =====================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Spreadsheet baru di browser Anda (https://sheets.new).
 * 2. Klik menu 'Ekstensi' (Extensions) > 'Apps Script'.
 * 3. Hapus semua kode default dan tempel seluruh isi script ini.
 * 4. Klik ikon Disket (Simpan / Ctrl+S).
 * 5. Klik tombol 'Deploy' (Terapkan) > 'New deployment' (Penerapan baru).
 * 6. Klik ikon gear di sebelah kiri 'Select type', pilih 'Web app'.
 * 7. Isi keterangan: 'Integrasi Dashboard Finding'.
 * 8. Atur 'Execute as' (Jalankan sebagai) -> 'Me' (Email Anda).
 * 9. Atur 'Who has access' (Siapa yang memiliki akses) -> 'Anyone' (Siapa saja).
 * 10. Klik 'Deploy', berikan izin akun (Authorize Access), lalu salin URL Web App yang muncul.
 * 11. Tempel URL Web App ke Pengaturan Google Spreadsheet di menu Finding Dashboard!
 * =====================================================================
 */

const SHEET_NAME = 'Finding_Data';
const HEADERS = [
  'ID Temuan',
  'Tanggal',
  'Nama Petugas CSO',
  'Layanan CSO',
  'Jenis',
  'Kategori Temuan',
  'Tingkat Deviasi',
  'Rincian Kendala / Kasus',
  'Komitmen',
  'Action Plan',
  'Status Tindak Lanjut',
  'Waktu Dibuat'
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() < 1) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#ef4444');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    for (let c = 1; c <= HEADERS.length; c++) {
      sheet.autoResizeColumn(c);
    }
  }
  return sheet;
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'get_all';
    if (action === 'ping') {
      return createJsonResponse({ success: true, message: 'Google Apps Script Finding siap terhubung!', time: new Date() });
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse({ success: true, count: 0, data: [] });
    }

    const rows = [];
    for (let i = 1; i < data.length; i++) {
      const r = data[i];
      if (!r[0]) continue;
      rows.push({
        id: String(r[0] || ''),
        date: r[1] instanceof Date ? Utilities.formatDate(r[1], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(r[1] || ''),
        userFullName: String(r[2] || ''),
        department: String(r[3] || 'CSO INBOUND'),
        findingType: String(r[4] || 'Feedback Negatif'),
        category: String(r[5] || 'Informasi'),
        deviationLevel: String(r[6] || 'Reminder 1'),
        desc: String(r[7] || ''),
        commitment: String(r[8] || '-'),
        actionPlan: String(r[9] || ''),
        status: String(r[10] || 'Open'),
        createdAt: String(r[11] || '')
      });
    }

    return createJsonResponse({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    let payload;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    } else {
      payload = {};
    }

    const action = payload.action || 'sync_all';
    const sheet = getOrCreateSheet();

    if (action === 'sync_all') {
      const findings = payload.findings || payload.logs || [];
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      if (findings.length > 0) {
        const rowsToAppend = findings.map(f => [
          f.id || '',
          f.date || '',
          f.userFullName || '',
          f.department || 'CSO INBOUND',
          f.findingType || 'Feedback Negatif',
          f.category || 'Informasi',
          f.deviationLevel || 'Reminder 1',
          f.desc || '',
          f.commitment || '-',
          f.actionPlan || '',
          f.status || 'Open',
          f.createdAt || new Date().toISOString()
        ]);
        sheet.getRange(2, 1, rowsToAppend.length, HEADERS.length).setValues(rowsToAppend);
      }
      return createJsonResponse({ success: true, message: 'Sync all Finding berhasil', count: findings.length });
    }

    if (action === 'save') {
      const f = payload.finding || payload.log;
      if (!f || !f.id) return createJsonResponse({ success: false, error: 'Data Finding tidak valid' });

      const data = sheet.getDataRange().getValues();
      let foundRow = -1;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(f.id)) {
          foundRow = i + 1;
          break;
        }
      }

      const rowData = [
        f.id || '',
        f.date || '',
        f.userFullName || '',
        f.department || 'CSO INBOUND',
        f.findingType || 'Feedback Negatif',
        f.category || 'Informasi',
        f.deviationLevel || 'Reminder 1',
        f.desc || '',
        f.commitment || '-',
        f.actionPlan || '',
        f.status || 'Open',
        f.createdAt || new Date().toISOString()
      ];

      if (foundRow > 0) {
        sheet.getRange(foundRow, 1, 1, HEADERS.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
      return createJsonResponse({ success: true, message: 'Data Finding berhasil disimpan ke Google Sheets' });
    }

    if (action === 'delete') {
      const id = payload.id;
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(id)) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ success: true, message: 'Data Finding berhasil dihapus dari Google Sheets' });
        }
      }
      return createJsonResponse({ success: true, message: 'ID Finding tidak ditemukan di sheet' });
    }

    if (action === 'delete_month') {
      const month = payload.month;
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        const rowDate = String(data[i][1]);
        if (rowDate.indexOf(month) === 0) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Data Finding bulanan berhasil dibersihkan dari Google Sheets' });
    }

    if (action === 'delete_batch') {
      const ids = payload.ids || [];
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (ids.indexOf(String(data[i][0])) !== -1) {
          sheet.deleteRow(i + 1);
        }
      }
      return createJsonResponse({ success: true, message: 'Batch baris Finding berhasil dihapus dari Google Sheets' });
    }

    return createJsonResponse({ success: false, error: 'Aksi tidak dikenal: ' + action });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

function renderFindingGSheetBar() {
  const config = state.getFindingGSheetConfig();
  const isConfigured = Boolean(config.webAppUrl && config.webAppUrl.trim());
  const cleanId = extractGoogleSpreadsheetId(config.sheetId);
  const openUrl = cleanId ? `https://docs.google.com/spreadsheets/d/${cleanId}` : config.webAppUrl;

  // Header Badge
  if (UI.findingGSheetHeaderBadge) {
    if (isConfigured) {
      UI.findingGSheetHeaderBadge.textContent = 'Terhubung';
      UI.findingGSheetHeaderBadge.style.background = 'rgba(239, 68, 68, 0.2)';
      UI.findingGSheetHeaderBadge.style.color = '#ef4444';
      UI.findingGSheetHeaderBadge.style.border = '1px solid rgba(239, 68, 68, 0.4)';
    } else {
      UI.findingGSheetHeaderBadge.textContent = 'Belum Terhubung';
      UI.findingGSheetHeaderBadge.style.background = 'rgba(255, 255, 255, 0.08)';
      UI.findingGSheetHeaderBadge.style.color = 'var(--gray-300)';
      UI.findingGSheetHeaderBadge.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    }
  }

  // Status Badge inside Bar
  if (UI.findingGSheetStatusBadge) {
    if (isConfigured) {
      UI.findingGSheetStatusBadge.textContent = 'Terhubung';
      UI.findingGSheetStatusBadge.className = 'badge badge-red';
      UI.findingGSheetStatusBadge.style.background = 'rgba(239, 68, 68, 0.2)';
      UI.findingGSheetStatusBadge.style.color = '#ef4444';
      UI.findingGSheetStatusBadge.style.border = '1px solid rgba(239, 68, 68, 0.4)';
    } else {
      UI.findingGSheetStatusBadge.textContent = 'Belum Dikonfigurasi';
      UI.findingGSheetStatusBadge.style.background = 'rgba(100, 116, 139, 0.2)';
      UI.findingGSheetStatusBadge.style.color = '#94a3b8';
      UI.findingGSheetStatusBadge.style.border = '1px solid rgba(100, 116, 139, 0.3)';
    }
  }

  // Status Info inside Bar
  if (UI.findingGSheetStatusInfo) {
    if (isConfigured) {
      const syncTime = config.lastSyncTime ? `Terakhir sinkron: ${config.lastSyncTime}` : 'Belum pernah disinkronkan';
      const autoText = config.autoSync ? ' (Auto-Sync Aktif)' : ' (Sinkronisasi Manual)';
      UI.findingGSheetStatusInfo.innerHTML = `<span style="color:#ef4444;"><i class="fa-solid fa-circle-check" style="margin-right:4px;"></i>${syncTime}${autoText}</span>`;
    } else {
      UI.findingGSheetStatusInfo.textContent = 'Klik tombol "Pengaturan & Script" untuk menghubungkan data Finding dengan Google Spreadsheet Anda.';
    }
  }

  // Open Link buttons
  if (UI.btnFindingGSheetOpenLink) {
    if (openUrl) {
      UI.btnFindingGSheetOpenLink.href = openUrl;
      UI.btnFindingGSheetOpenLink.classList.remove('hidden');
      UI.btnFindingGSheetOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnFindingGSheetOpenLink.classList.add('hidden');
      UI.btnFindingGSheetOpenLink.style.display = 'none';
    }
  }
  if (UI.btnFindingGSheetModalOpenLink) {
    if (openUrl) {
      UI.btnFindingGSheetModalOpenLink.href = openUrl;
      UI.btnFindingGSheetModalOpenLink.classList.remove('hidden');
      UI.btnFindingGSheetModalOpenLink.style.display = 'inline-flex';
    } else {
      UI.btnFindingGSheetModalOpenLink.classList.add('hidden');
      UI.btnFindingGSheetModalOpenLink.style.display = 'none';
    }
  }
}

function openFindingGSheetModal() {
  const config = state.getFindingGSheetConfig();
  if (UI.inputFindingGSheetWebAppUrl) UI.inputFindingGSheetWebAppUrl.value = config.webAppUrl || '';
  if (UI.inputFindingGSheetUrl) UI.inputFindingGSheetUrl.value = config.sheetId || '';
  if (UI.inputFindingGSheetTabName) UI.inputFindingGSheetTabName.value = config.sheetName || 'Finding_Data';
  if (UI.checkFindingGSheetAutoSync) UI.checkFindingGSheetAutoSync.checked = config.autoSync !== false;

  const findings = state.getFindings();
  if (UI.labelFindingGSheetModalTotalCount) UI.labelFindingGSheetModalTotalCount.textContent = `${findings.length} Baris`;
  if (UI.labelFindingGSheetModalLastSync) UI.labelFindingGSheetModalLastSync.textContent = config.lastSyncTime || 'Belum pernah';

  if (UI.labelFindingGSheetModalStatus) {
    if (config.webAppUrl) {
      UI.labelFindingGSheetModalStatus.textContent = 'Terkonfigurasi (Siap Sinkron)';
      UI.labelFindingGSheetModalStatus.style.color = '#ef4444';
    } else {
      UI.labelFindingGSheetModalStatus.textContent = 'Belum Dikonfigurasi';
      UI.labelFindingGSheetModalStatus.style.color = 'var(--gray-400)';
    }
  }

  if (UI.codeFindingAppsScript) {
    UI.codeFindingAppsScript.textContent = FINDING_APPS_SCRIPT_TEMPLATE;
  }

  switchFindingGSheetTab('config');
  renderFindingGSheetBar();
  if (UI.modalFindingGoogleSheets) UI.modalFindingGoogleSheets.classList.remove('hidden');
}

function closeFindingGSheetModal() {
  if (UI.modalFindingGoogleSheets) UI.modalFindingGoogleSheets.classList.add('hidden');
}

function switchFindingGSheetTab(tab) {
  if (tab === 'config') {
    if (UI.tabBtnFindingGSheetConfig) UI.tabBtnFindingGSheetConfig.classList.add('active');
    if (UI.tabBtnFindingGSheetGuide) UI.tabBtnFindingGSheetGuide.classList.remove('active');
    if (UI.tabContentFindingGSheetConfig) UI.tabContentFindingGSheetConfig.classList.remove('hidden');
    if (UI.tabContentFindingGSheetGuide) UI.tabContentFindingGSheetGuide.classList.add('hidden');
  } else {
    if (UI.tabBtnFindingGSheetConfig) UI.tabBtnFindingGSheetConfig.classList.remove('active');
    if (UI.tabBtnFindingGSheetGuide) UI.tabBtnFindingGSheetGuide.classList.add('active');
    if (UI.tabContentFindingGSheetConfig) UI.tabContentFindingGSheetConfig.classList.add('hidden');
    if (UI.tabContentFindingGSheetGuide) UI.tabContentFindingGSheetGuide.classList.remove('hidden');
    if (UI.codeFindingAppsScript) {
      UI.codeFindingAppsScript.textContent = FINDING_APPS_SCRIPT_TEMPLATE;
    }
  }
}

function saveFindingGSheetConfigHandler() {
  const current = state.getFindingGSheetConfig();
  const webAppUrl = (UI.inputFindingGSheetWebAppUrl ? UI.inputFindingGSheetWebAppUrl.value.trim() : '');
  const sheetInput = (UI.inputFindingGSheetUrl ? UI.inputFindingGSheetUrl.value.trim() : '');
  const sheetName = (UI.inputFindingGSheetTabName ? UI.inputFindingGSheetTabName.value.trim() : '') || 'Finding_Data';
  const autoSync = UI.checkFindingGSheetAutoSync ? UI.checkFindingGSheetAutoSync.checked : true;

  current.webAppUrl = webAppUrl;
  current.sheetId = sheetInput;
  current.sheetName = sheetName;
  current.autoSync = autoSync;
  current.lastSyncStatus = webAppUrl ? 'configured' : 'disconnected';

  state.saveFindingGSheetConfig(current);
  renderFindingGSheetBar();

  if (UI.labelFindingGSheetModalStatus) {
    if (webAppUrl) {
      UI.labelFindingGSheetModalStatus.textContent = 'Terkonfigurasi (Siap Sinkron)';
      UI.labelFindingGSheetModalStatus.style.color = '#ef4444';
    } else {
      UI.labelFindingGSheetModalStatus.textContent = 'Belum Dikonfigurasi';
      UI.labelFindingGSheetModalStatus.style.color = 'var(--gray-400)';
    }
  }

  showToast('Pengaturan Disimpan', 'Konfigurasi Google Spreadsheet untuk Finding berhasil diperbarui.', 'success');
}

async function testFindingGSheetConnection() {
  const webAppUrl = (UI.inputFindingGSheetWebAppUrl ? UI.inputFindingGSheetWebAppUrl.value.trim() : '') || state.getFindingGSheetConfig().webAppUrl;
  if (!webAppUrl) {
    showToast('URL Kosong', 'Harap masukkan URL Web App Google Apps Script terlebih dahulu.', 'warning');
    return;
  }

  const testBtn = UI.btnFindingGSheetTest;
  if (testBtn) {
    testBtn.disabled = true;
    testBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menguji...</span>';
  }

  try {
    const testUrl = webAppUrl + (webAppUrl.includes('?') ? '&' : '?') + 'action=ping';
    const resp = await fetch(testUrl, { method: 'GET', mode: 'cors' });
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.success) {
        showToast('Koneksi Berhasil!', 'Google Apps Script Finding merespons dengan baik.', 'success');
        if (UI.labelFindingGSheetModalStatus) {
          UI.labelFindingGSheetModalStatus.textContent = 'Terhubung Normal';
          UI.labelFindingGSheetModalStatus.style.color = '#ef4444';
        }
      } else {
        showToast('Koneksi Ditolak', data.error || 'Respon tidak sesuai standar.', 'warning');
      }
    } else {
      showToast('Koneksi Gagal', `HTTP Status: ${resp.status}`, 'danger');
    }
  } catch (err) {
    console.error('Test connection error:', err);
    showToast('Koneksi Gagal', 'Tidak dapat menghubungi Web App. Pastikan akses disetel ke "Anyone" saat deploy.', 'danger');
  } finally {
    if (testBtn) {
      testBtn.disabled = false;
      testBtn.innerHTML = '<i class="fa-solid fa-satellite-dish"></i> <span>Test Koneksi</span>';
    }
  }
}

async function pushFindingToGoogleSheets() {
  const config = state.getFindingGSheetConfig();
  if (!config.webAppUrl) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App Google Apps Script terlebih dahulu.', 'warning');
    openFindingGSheetModal();
    return;
  }

  const findings = state.getFindings();
  const pushBtn = UI.btnFindingGSheetPush;
  const modalPushBtn = UI.btnFindingGSheetModalPush;

  const setPushing = (isPushing) => {
    if (pushBtn) {
      pushBtn.disabled = isPushing;
      pushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
    if (modalPushBtn) {
      modalPushBtn.disabled = isPushing;
      modalPushBtn.innerHTML = isPushing ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Mengirim...</span>' : '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Kirim ke Sheets</span>';
    }
  };

  setPushing(true);

  try {
    const payload = {
      action: 'sync_all',
      findings: findings
    };

    await fetch(config.webAppUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    });

    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    config.lastSyncTime = formatted;
    config.lastSyncStatus = 'success';
    state.saveFindingGSheetConfig(config);
    renderFindingGSheetBar();

    if (UI.labelFindingGSheetModalLastSync) UI.labelFindingGSheetModalLastSync.textContent = formatted;

    showToast('Sinkronisasi Sukses', `Sebanyak <strong>${findings.length} data Finding</strong> berhasil dikirim ke Google Spreadsheet.`, 'success');
  } catch (err) {
    console.error('Error pushing Finding to Google Sheets:', err);
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    config.lastSyncTime = formatted;
    state.saveFindingGSheetConfig(config);
    renderFindingGSheetBar();
    showToast('Data Dikirim', `Permintaan sinkronisasi (${findings.length} data Finding) telah dikirim ke Google Spreadsheet.`, 'info');
  } finally {
    setPushing(false);
  }
}

async function pullFindingFromGoogleSheets() {
  const config = state.getFindingGSheetConfig();
  if (!config.webAppUrl && !config.sheetId) {
    showToast('Belum Dikonfigurasi', 'Harap konfigurasi URL Web App atau ID Spreadsheet terlebih dahulu.', 'warning');
    openFindingGSheetModal();
    return;
  }

  const pullBtn = UI.btnFindingGSheetPull;
  const modalPullBtn = UI.btnFindingGSheetModalPull;

  const setPulling = (isPulling) => {
    if (pullBtn) {
      pullBtn.disabled = isPulling;
      pullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
    if (modalPullBtn) {
      modalPullBtn.disabled = isPulling;
      modalPullBtn.innerHTML = isPulling ? '<i class="fa-solid fa-arrows-rotate sync-spinning"></i> <span>Menarik...</span>' : '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Tarik Data</span>';
    }
  };

  setPulling(true);

  try {
    let pulledRows = null;

    if (config.webAppUrl) {
      const getUrl = config.webAppUrl + (config.webAppUrl.includes('?') ? '&' : '?') + 'action=get_all';
      const resp = await fetch(getUrl, { method: 'GET', mode: 'cors' });
      if (resp.ok) {
        const json = await resp.json();
        if (json && json.success && Array.isArray(json.data)) {
          pulledRows = json.data;
        }
      }
    }

    // Fallback to public sheet CSV export if Web App did not return JSON or if only sheetId is present
    if (!pulledRows && config.sheetId) {
      const cleanId = extractGoogleSpreadsheetId(config.sheetId);
      const csvUrl = `https://docs.google.com/spreadsheets/d/${cleanId}/export?format=csv&sheet=${encodeURIComponent(config.sheetName || 'Finding_Data')}`;
      const resp = await fetch(csvUrl);
      if (resp.ok) {
        const csvText = await resp.text();
        const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          pulledRows = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = parseCsvRow(lines[i]);
            if (cols[0]) {
              pulledRows.push({
                id: cols[0],
                date: cols[1] || '',
                userFullName: cols[2] || '',
                department: cols[3] || 'CSO INBOUND',
                findingType: cols[4] || 'Feedback Negatif',
                category: cols[5] || 'Informasi',
                deviationLevel: cols[6] || 'Reminder 1',
                desc: cols[7] || '',
                commitment: cols[8] || '-',
                actionPlan: cols[9] || '',
                status: cols[10] || 'Open',
                createdAt: cols[11] || ''
              });
            }
          }
        }
      }
    }

    if (pulledRows && pulledRows.length > 0) {
      state.saveFindings(pulledRows);
      const now = new Date();
      const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      config.lastSyncTime = formatted;
      state.saveFindingGSheetConfig(config);
      renderFindingPage();
      showToast('Tarik Data Berhasil', `Berhasil mengambil <strong>${pulledRows.length} data Finding</strong> dari Google Spreadsheet.`, 'success');
    } else {
      showToast('Data Kosong / Tidak Terbaca', 'Tidak ada data Finding yang ditemukan pada Google Spreadsheet atau sheet masih kosong.', 'info');
    }
  } catch (err) {
    console.error('Error pulling Finding from Google Sheets:', err);
    showToast('Gagal Menarik Data', 'Pastikan Google Apps Script sudah dideploy dengan akses "Anyone" atau sheet publik.', 'danger');
  } finally {
    setPulling(false);
  }
}

function autoSyncFindingAction(action, payload) {
  const config = state.getFindingGSheetConfig();
  if (!config.webAppUrl || config.autoSync === false) return;

  const bodyData = {
    action,
    ...payload
  };

  fetch(config.webAppUrl, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    }
  }).then(() => {
    const now = new Date();
    config.lastSyncTime = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    state.saveFindingGSheetConfig(config);
    renderFindingGSheetBar();
  }).catch(err => {
    console.warn('Auto-sync Finding to Google Sheets notification:', err);
  });
}

function copyFindingAppsScriptCode() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(FINDING_APPS_SCRIPT_TEMPLATE).then(() => {
      showToast('Tersalin!', 'Kode Google Apps Script berhasil disalin ke clipboard.', 'success');
    }).catch(() => {
      fallbackCopyText(FINDING_APPS_SCRIPT_TEMPLATE);
    });
  } else {
    fallbackCopyText(FINDING_APPS_SCRIPT_TEMPLATE);
  }
}

// ==========================================
// 12.9 FINDING (QA AUDIT FINDINGS)
// ==========================================

function renderFindingPage() {
  if (UI.btnOpenFindingGoogleSheetsModal) UI.btnOpenFindingGoogleSheetsModal.classList.add('hidden');
  renderFindingGSheetBar();
  const findings = state.getFindings();
  const selectedMonth = (UI.filterFindingMonth ? UI.filterFindingMonth.value : '2026-10') || 'ALL';
  const searchQ = (UI.searchFindingInput ? UI.searchFindingInput.value.trim().toLowerCase() : '');
  const filterService = (UI.filterFindingService ? UI.filterFindingService.value : 'ALL');
  const filterType = (UI.filterFindingType ? UI.filterFindingType.value : 'ALL');
  const filterLevel = (UI.filterFindingLevel ? UI.filterFindingLevel.value : 'ALL');
  const filterStatus = (UI.filterFindingStatus ? UI.filterFindingStatus.value : 'ALL');

  if (UI.btnClearSearchFinding) {
    UI.btnClearSearchFinding.classList.toggle('hidden', !searchQ);
  }

  const filtered = findings.filter(item => {
    if (selectedMonth !== 'ALL' && !(item.date || '').startsWith(selectedMonth)) return false;
    if (searchQ) {
      const match = (item.id || '').toLowerCase().includes(searchQ) ||
                    (item.userFullName || '').toLowerCase().includes(searchQ) ||
                    (item.department || '').toLowerCase().includes(searchQ) ||
                    (item.findingType || '').toLowerCase().includes(searchQ) ||
                    (item.category || '').toLowerCase().includes(searchQ) ||
                    (item.desc || '').toLowerCase().includes(searchQ) ||
                    (item.commitment || '').toLowerCase().includes(searchQ) ||
                    (item.actionPlan || '').toLowerCase().includes(searchQ);
      if (!match) return false;
    }
    if (filterService !== 'ALL' && item.department !== filterService) return false;
    if (filterType !== 'ALL' && item.findingType !== filterType) return false;
    if (filterLevel !== 'ALL' && item.deviationLevel !== filterLevel) return false;
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
    return true;
  });

  // Calculate metrics based on selected month (or all if ALL selected)
  const monthFindings = selectedMonth === 'ALL' ? findings : findings.filter(f => (f.date || '').startsWith(selectedMonth));
  const totalCount = monthFindings.length;
  const reminderCount = monthFindings.filter(f => (f.deviationLevel || '').startsWith('Reminder')).length;
  const korektifCount = monthFindings.filter(f => (f.deviationLevel || '').startsWith('Korektif')).length;
  const spCount = monthFindings.filter(f => (f.deviationLevel || '').startsWith('SP')).length;

  if (UI.findingStatTotal) UI.findingStatTotal.textContent = totalCount;
  if (UI.findingStatMinor) UI.findingStatMinor.textContent = reminderCount;
  if (UI.findingStatMayor) UI.findingStatMayor.textContent = korektifCount;
  if (UI.findingStatFatal) UI.findingStatFatal.textContent = spCount;

  // Batch action bar & Header select-all sync
  const visibleIds = filtered.map(item => item.id);
  const selectedVisibleCount = visibleIds.filter(id => state.selectedFindingIds && state.selectedFindingIds.has(id)).length;
  if (UI.findingSelectAllCheckbox) {
    UI.findingSelectAllCheckbox.checked = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
    UI.findingSelectAllCheckbox.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < visibleIds.length;
  }
  if (UI.findingBatchBar) {
    const hasSelected = state.selectedFindingIds && state.selectedFindingIds.size > 0;
    UI.findingBatchBar.classList.toggle('hidden', !hasSelected);
    if (UI.findingSelectedCount) {
      UI.findingSelectedCount.textContent = state.selectedFindingIds ? state.selectedFindingIds.size : 0;
    }
  }

  if (!UI.findingTableBody) return;
  UI.findingTableBody.innerHTML = '';

  if (filtered.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="12" style="text-align: center; padding: 32px; color: var(--gray-400);">Tidak ada catatan temuan audit QA yang sesuai.</td>`;
    UI.findingTableBody.appendChild(tr);
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    const isChecked = state.selectedFindingIds ? state.selectedFindingIds.has(item.id) : false;

    let typeBadge = 'badge-yellow';
    if (item.findingType === 'Feedback Positif') {
      typeBadge = 'badge-green';
    }

    let devBadge = 'badge-yellow';
    if ((item.deviationLevel || '').startsWith('Korektif')) {
      devBadge = 'badge-blue';
    } else if ((item.deviationLevel || '').startsWith('SP')) {
      devBadge = 'badge-red glow-effect-red';
    }

    let statBadge = 'badge-yellow';
    if (item.status === 'Dalam Coaching') statBadge = 'badge-blue';
    else if (item.status === 'Closed') statBadge = 'badge-green';

    tr.innerHTML = `
      <td style="text-align: center;">
        <input type="checkbox" class="finding-table-checkbox finding-row-checkbox checkbox-custom" data-id="${item.id}" ${isChecked ? 'checked' : ''}>
      </td>
      <td><span class="text-red font-mono" style="font-weight:700;">${item.id}</span></td>
      <td><span style="font-size:0.8rem; color:var(--gray-300);">${item.date || '-'}</span></td>
      <td><span style="font-weight:600; color:#fff;">${item.userFullName}</span></td>
      <td><span class="badge badge-gray" style="font-size:0.75rem;"><i class="fa-solid fa-headset text-red" style="margin-right:4px;"></i>${item.department}</span></td>
      <td><span class="badge ${typeBadge}" style="font-size:0.75rem;">${item.findingType || 'Feedback Negatif'}</span></td>
      <td><span style="font-size:0.8rem; color:var(--gray-200);">${item.category}</span></td>
      <td><span class="badge ${devBadge}" style="font-size:0.75rem;">${item.deviationLevel}</span></td>
      <td>
        <span style="font-size:0.8rem; color:#fff;">${item.desc}</span>
        ${item.actionPlan ? `<div style="font-size:0.72rem; color:var(--gray-400); margin-top:3px;"><i class="fa-solid fa-lightbulb text-yellow" style="margin-right:3px;"></i><strong>Action:</strong> ${item.actionPlan}</div>` : ''}
      </td>
      <td>
        <span style="font-size:0.8rem; color:var(--gray-200);">${item.commitment || '-'}</span>
      </td>
      <td>
        <button class="badge ${statBadge}" style="font-size:0.75rem; cursor:pointer; border:none;" onclick="quickCycleFindingStatus('${item.id}')" title="Klik untuk ubah status tindak lanjut">
          ${item.status}
        </button>
      </td>
      <td style="text-align:center; white-space:nowrap;">
        <button class="btn btn-icon btn-sm" onclick="openEditFindingModal('${item.id}')" title="Edit Temuan" style="margin-right:4px;">
          <i class="fa-solid fa-pen-to-square text-blue"></i>
        </button>
        <button class="btn btn-icon btn-sm" onclick="promptDeleteFinding('${item.id}', '${item.id}')" title="Hapus Temuan">
          <i class="fa-solid fa-trash-can text-red"></i>
        </button>
      </td>
    `;
    UI.findingTableBody.appendChild(tr);
  });
}

function openAddFindingModal() {
  const u = state.currentUser;
  if (!u) return;

  if (UI.modalFindingTitle) UI.modalFindingTitle.textContent = 'Catat Temuan Audit QA (Finding)';
  if (UI.btnSubmitFindingText) UI.btnSubmitFindingText.textContent = 'Simpan Temuan';
  if (UI.formFindingId) UI.formFindingId.value = '';

  if (UI.formFinding) UI.formFinding.reset();
  if (UI.formFindingUser) UI.formFindingUser.value = u.fullName;
  if (UI.formFindingDept) UI.formFindingDept.value = u.department || 'CSO INBOUND';
  const todayStr = new Date().toISOString().slice(0, 10);
  if (UI.formFindingDate) UI.formFindingDate.value = todayStr;
  if (UI.formFindingType) UI.formFindingType.value = 'Feedback Negatif';
  if (UI.formFindingCategoryVal) UI.formFindingCategoryVal.value = 'Informasi';
  if (UI.formFindingLevelVal) UI.formFindingLevelVal.value = 'Reminder 1';
  if (UI.formFindingDesc) UI.formFindingDesc.value = '';
  if (UI.formFindingCommitment) UI.formFindingCommitment.value = '';
  if (UI.formFindingActionPlan) UI.formFindingActionPlan.value = '';
  if (UI.formFindingStatus) UI.formFindingStatus.value = 'Open';

  if (UI.modalFindingForm) UI.modalFindingForm.classList.remove('hidden');
}

window.openEditFindingModal = function(id) {
  const findings = state.getFindings();
  const item = findings.find(f => f.id === id);
  if (!item) {
    showToast('Data Tidak Ditemukan', `Temuan audit ${id} tidak ditemukan.`, 'error');
    return;
  }

  if (UI.modalFindingTitle) UI.modalFindingTitle.textContent = 'Edit Temuan Audit QA (Finding)';
  if (UI.btnSubmitFindingText) UI.btnSubmitFindingText.textContent = 'Perbarui Temuan';
  if (UI.formFindingId) UI.formFindingId.value = item.id;
  if (UI.formFindingUser) UI.formFindingUser.value = item.userFullName || '';
  if (UI.formFindingDept) UI.formFindingDept.value = item.department || 'CSO INBOUND';
  if (UI.formFindingDate) UI.formFindingDate.value = item.date || new Date().toISOString().slice(0, 10);
  if (UI.formFindingType) UI.formFindingType.value = item.findingType || 'Feedback Negatif';
  if (UI.formFindingCategoryVal) UI.formFindingCategoryVal.value = item.category || 'Informasi';
  if (UI.formFindingLevelVal) UI.formFindingLevelVal.value = item.deviationLevel || 'Reminder 1';
  if (UI.formFindingDesc) UI.formFindingDesc.value = item.desc || '';
  if (UI.formFindingCommitment) UI.formFindingCommitment.value = (item.commitment && item.commitment !== '-') ? item.commitment : '';
  if (UI.formFindingActionPlan) UI.formFindingActionPlan.value = item.actionPlan || '';
  if (UI.formFindingStatus) UI.formFindingStatus.value = item.status || 'Open';

  if (UI.modalFindingForm) UI.modalFindingForm.classList.remove('hidden');
};

function closeFindingModal() {
  if (UI.modalFindingForm) UI.modalFindingForm.classList.add('hidden');
}

function handleSaveFinding(e) {
  e.preventDefault();
  const u = state.currentUser;
  if (!u) return;

  const editId = (UI.formFindingId ? UI.formFindingId.value.trim() : '');
  const userFullName = (UI.formFindingUser ? UI.formFindingUser.value.trim() : '') || u.fullName;
  const department = (UI.formFindingDept ? UI.formFindingDept.value : 'CSO INBOUND');
  const date = (UI.formFindingDate && UI.formFindingDate.value) ? UI.formFindingDate.value : new Date().toISOString().slice(0, 10);
  const findingType = (UI.formFindingType ? UI.formFindingType.value : 'Feedback Negatif');
  const category = (UI.formFindingCategoryVal ? UI.formFindingCategoryVal.value : 'Informasi');
  const deviationLevel = (UI.formFindingLevelVal ? UI.formFindingLevelVal.value : 'Reminder 1');
  const desc = (UI.formFindingDesc ? UI.formFindingDesc.value.trim() : '');
  const commitment = (UI.formFindingCommitment ? UI.formFindingCommitment.value.trim() : '') || '-';
  const actionPlan = (UI.formFindingActionPlan ? UI.formFindingActionPlan.value.trim() : '');
  const status = (UI.formFindingStatus ? UI.formFindingStatus.value : 'Open');

  if (!desc) {
    showToast('Form Belum Lengkap', 'Rincian ketidaksesuaian/kasus wajib diisi.', 'warning');
    return;
  }

  const findings = state.getFindings();

  if (editId) {
    // Mode Edit: perbarui temuan yang sudah ada
    const targetIdx = findings.findIndex(f => f.id === editId);
    if (targetIdx === -1) {
      showToast('Data Tidak Ditemukan', `Temuan audit ${editId} tidak ditemukan untuk diperbarui.`, 'error');
      return;
    }
    findings[targetIdx] = {
      ...findings[targetIdx],
      date,
      userFullName,
      department,
      findingType,
      category,
      deviationLevel,
      desc,
      commitment,
      actionPlan,
      status
    };
    state.saveFindings(findings);
    autoSyncFindingAction('save', { finding: findings[targetIdx] });
    state.addLog('UPDATE_FINDING', 'Perbarui Temuan QA', `${u.fullName} (${u.role.toUpperCase()}) memperbarui temuan audit QA [${editId}] untuk ${userFullName} (${deviationLevel}).`);
    showToast('Temuan QA Diperbarui', `Temuan <strong>${editId}</strong> berhasil diperbarui.`, 'success');
  } else {
    // Mode Tambah: catat temuan baru
    const todayStr = date;
    const randNum = String(Math.floor(Math.random() * 900) + 100);
    const newId = `FND-${todayStr.slice(0,4)}-${randNum}`;

    const newEntry = {
      id: newId,
      date: todayStr,
      userFullName,
      department,
      findingType,
      category,
      deviationLevel,
      desc,
      commitment,
      actionPlan,
      status,
      createdAt: new Date().toISOString()
    };

    findings.unshift(newEntry);
    state.saveFindings(findings);
    autoSyncFindingAction('save', { finding: newEntry });
    state.addLog('CREATE_FINDING', 'Temuan QA Baru', `${u.fullName} mencatat temuan audit QA [${newId}] untuk ${userFullName} (${deviationLevel}).`);
    showToast('Temuan QA Dicatat', `Temuan <strong>${newId}</strong> berhasil didaftarkan.`, 'success');
  }

  closeFindingModal();
  renderFindingPage();
}

window.quickCycleFindingStatus = function(id) {
  const findings = state.getFindings();
  const item = findings.find(f => f.id === id);
  if (!item) return;

  const cycle = ['Open', 'Dalam Coaching', 'Closed'];
  const curIdx = cycle.indexOf(item.status);
  const nextIdx = (curIdx + 1) % cycle.length;
  item.status = cycle[nextIdx];

  state.saveFindings(findings);
  autoSyncFindingAction('save', { finding: item });
  showToast('Status Temuan Berubah', `Status temuan <strong>${item.id}</strong> kini: <strong>${item.status}</strong>.`, 'info');
  renderFindingPage();
};

window.promptDeleteFinding = function(id, name) {
  state.pendingDelete = { type: 'finding', id, name };
  UI.confirmDeleteTitle.textContent = 'Hapus Temuan QA?';
  UI.confirmDeleteMessage.innerHTML = `Temuan audit QA nomor <strong>${name}</strong> akan dihapus permanen.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.promptDeleteAllFindingMonth = function() {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang dapat menghapus data temuan bulanan.', 'warning');
    return;
  }
  const selectedMonth = (UI.filterFindingMonth ? UI.filterFindingMonth.value : '2026-10') || 'ALL';
  if (!selectedMonth || selectedMonth === 'ALL') {
    showToast('Pilih Bulan Spesifik', 'Silakan pilih bulan tertentu terlebih dahulu untuk menghapus data bulanan.', 'warning');
    return;
  }
  const allFindings = state.getFindings();
  const monthLogs = allFindings.filter(f => (f.date || '').startsWith(selectedMonth));
  if (monthLogs.length === 0) {
    showToast('Tidak Ada Data', `Tidak ada data temuan QA pada periode <strong>${selectedMonth}</strong> untuk dihapus.`, 'info');
    return;
  }

  let monthLabel = selectedMonth;
  if (UI.filterFindingMonth && UI.filterFindingMonth.selectedOptions && UI.filterFindingMonth.selectedOptions[0]) {
    monthLabel = UI.filterFindingMonth.selectedOptions[0].textContent;
  }

  state.pendingDelete = {
    type: 'finding_month',
    id: selectedMonth,
    name: monthLabel
  };
  UI.confirmDeleteTitle.textContent = `Hapus Semua Temuan Bulan ${monthLabel}?`;
  UI.confirmDeleteMessage.innerHTML = `Perhatian! Seluruh <strong>${monthLogs.length} data temuan QA</strong> pada periode <strong>${monthLabel}</strong> akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

window.handleFindingBatchDelete = function() {
  if (!state.isAdmin()) {
    showToast('Akses Ditolak', 'Hanya Administrator yang dapat melakukan penghapusan massal.', 'warning');
    return;
  }
  const selectedList = state.selectedFindingIds ? Array.from(state.selectedFindingIds) : [];
  if (selectedList.length === 0) {
    showToast('Pilih Data', 'Pilih minimal satu data temuan QA yang ingin dihapus.', 'info');
    return;
  }
  state.pendingDelete = {
    type: 'finding_batch',
    id: 'batch',
    name: `${selectedList.length} data temuan QA`,
    ids: selectedList
  };
  UI.confirmDeleteTitle.textContent = `Hapus ${selectedList.length} Data Temuan QA?`;
  UI.confirmDeleteMessage.innerHTML = `Sebanyak <strong>${selectedList.length} data temuan QA</strong> yang ditandai akan dihapus secara permanen dari sistem.`;
  UI.modalConfirmDelete.classList.remove('hidden');
};

function exportFindingExcel() {
  const selMonth = (UI.filterFindingMonth ? UI.filterFindingMonth.value : '2026-09') || 'ALL';
  const allFindings = state.getFindings();

  let exportFindings;
  if (state.selectedFindingIds && state.selectedFindingIds.size > 0) {
    exportFindings = allFindings.filter(f => state.selectedFindingIds.has(f.id));
  } else {
    exportFindings = allFindings.filter(f => {
      if (selMonth !== 'ALL' && !(f.date || '').startsWith(selMonth)) return false;
      return true;
    });
  }

  if (exportFindings.length === 0) {
    showToast('Data Kosong', 'Tidak ada data Temuan Audit QA (Finding) untuk diekspor.', 'warning');
    return;
  }

  const sheet1Data = [
    ['No', 'ID Temuan', 'Tanggal', 'Nama Petugas CSO', 'Layanan CSO', 'Jenis Feedback', 'Kategori Temuan', 'Tingkat Deviasi', 'Rincian Kendala / Kasus', 'Komitmen', 'Action Plan', 'Status Tindak Lanjut']
  ];
  exportFindings.forEach((f, idx) => {
    sheet1Data.push([
      idx + 1,
      f.id,
      f.date,
      f.userFullName,
      f.department,
      f.findingType || 'Feedback Negatif',
      f.category || 'Informasi',
      f.deviationLevel || 'Reminder 1',
      f.desc || '-',
      f.commitment || '-',
      f.actionPlan || '-',
      f.status || 'Open'
    ]);
  });

  const sheet2Data = [
    ['No', 'Nama Petugas CSO', 'Layanan CSO', 'Total Temuan', 'Feedback Positif', 'Feedback Negatif', 'Reminder', 'Korektif', 'SP', 'Status Open', 'Dalam Coaching', 'Closed']
  ];

  const agentMap = {};
  exportFindings.forEach(f => {
    const name = f.userFullName || 'Tidak Diketahui';
    if (!agentMap[name]) {
      agentMap[name] = {
        name,
        department: f.department || 'CSO INBOUND',
        total: 0,
        positif: 0,
        negatif: 0,
        reminder: 0,
        korektif: 0,
        sp: 0,
        open: 0,
        coaching: 0,
        closed: 0
      };
    }
    const ag = agentMap[name];
    ag.total++;
    if (f.findingType === 'Feedback Positif') ag.positif++;
    else ag.negatif++;

    const level = f.deviationLevel || '';
    if (level.startsWith('Reminder')) ag.reminder++;
    else if (level.startsWith('Korektif')) ag.korektif++;
    else if (level.startsWith('SP')) ag.sp++;

    if (f.status === 'Dalam Coaching') ag.coaching++;
    else if (f.status === 'Closed') ag.closed++;
    else ag.open++;
  });

  Object.values(agentMap).forEach((ag, idx) => {
    sheet2Data.push([
      idx + 1,
      ag.name,
      ag.department,
      ag.total,
      ag.positif,
      ag.negatif,
      ag.reminder,
      ag.korektif,
      ag.sp,
      ag.open,
      ag.coaching,
      ag.closed
    ]);
  });

  const filename = `DRIVE_Temuan_Audit_QA_Finding_${selMonth === 'ALL' ? 'Semua_Bulan' : selMonth}_${new Date().toISOString().slice(0, 10)}.xlsx`;

  if (typeof XLSX !== 'undefined' && XLSX.utils) {
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
    const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
    ws1['!cols'] = [
      { wch: 6 }, { wch: 18 }, { wch: 14 }, { wch: 22 }, { wch: 24 },
      { wch: 18 }, { wch: 18 }, { wch: 16 }, { wch: 45 }, { wch: 40 },
      { wch: 40 }, { wch: 18 }
    ];
    ws2['!cols'] = [
      { wch: 6 }, { wch: 22 }, { wch: 24 }, { wch: 14 }, { wch: 16 },
      { wch: 16 }, { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 14 },
      { wch: 16 }, { wch: 12 }
    ];
    XLSX.utils.book_append_sheet(wb, ws1, 'Rekapitulasi Temuan QA');
    XLSX.utils.book_append_sheet(wb, ws2, 'Ringkasan Per Petugas');
    XLSX.writeFile(wb, filename);
  } else {
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + sheet1Data.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', filename.replace('.xlsx', '.csv'));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showToast('Download Berhasil', `Data Temuan Audit QA (${exportFindings.length} baris) berhasil diunduh menjadi Excel.`, 'success');
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

  // Update PA Event Listeners
  if (UI.btnOpenAddPaModal) UI.btnOpenAddPaModal.addEventListener('click', openAddPaModal);
  if (UI.btnEmptyAddPa) UI.btnEmptyAddPa.addEventListener('click', openAddPaModal);
  if (UI.btnRefreshPa) {
    UI.btnRefreshPa.addEventListener('click', () => {
      renderUpdatePaPage();
      showToast('Data Diperbarui', 'Riwayat Update PA disinkronkan.', 'info');
    });
  }
  if (UI.btnClosePaModal) UI.btnClosePaModal.addEventListener('click', closePaModal);
  if (UI.btnCancelPaModal) UI.btnCancelPaModal.addEventListener('click', closePaModal);
  if (UI.formPa) UI.formPa.addEventListener('submit', handleSavePa);
  if (UI.btnClosePaDetailModal) UI.btnClosePaDetailModal.addEventListener('click', closePaDetailModal);
  if (UI.btnClosePaDetailBtn) UI.btnClosePaDetailBtn.addEventListener('click', closePaDetailModal);
  if (UI.searchPaInput) UI.searchPaInput.addEventListener('input', renderUpdatePaPage);
  if (UI.btnClearSearchPa) {
    UI.btnClearSearchPa.addEventListener('click', () => {
      if (UI.searchPaInput) UI.searchPaInput.value = '';
      renderUpdatePaPage();
    });
  }
  if (UI.filterPaService) UI.filterPaService.addEventListener('change', renderUpdatePaPage);
  if (UI.filterPaShift) UI.filterPaShift.addEventListener('change', renderUpdatePaPage);
  if (UI.filterPaCategory) UI.filterPaCategory.addEventListener('change', renderUpdatePaPage);
  if (UI.filterPaStatus) UI.filterPaStatus.addEventListener('change', renderUpdatePaPage);
  if (UI.btnResetPaFilters) {
    UI.btnResetPaFilters.addEventListener('click', () => {
      if (UI.searchPaInput) UI.searchPaInput.value = '';
      if (UI.filterPaService) UI.filterPaService.value = 'ALL';
      if (UI.filterPaShift) UI.filterPaShift.value = 'ALL';
      if (UI.filterPaCategory) UI.filterPaCategory.value = 'ALL';
      if (UI.filterPaStatus) UI.filterPaStatus.value = 'ALL';
      renderUpdatePaPage();
      showToast('Filter Direset', 'Semua filter Update PA telah dikembalikan.', 'info');
    });
  }
  if (UI.btnExportPaCSV) UI.btnExportPaCSV.addEventListener('click', exportPaCSV);

  // CA Event Listeners
  if (UI.btnOpenAddCaModal) UI.btnOpenAddCaModal.addEventListener('click', openAddCaModal);
  if (UI.btnDeleteAllCaMonth) UI.btnDeleteAllCaMonth.addEventListener('click', promptDeleteCaMonth);
  if (UI.btnExportCaExcel) UI.btnExportCaExcel.addEventListener('click', exportCaExcel);

  // CA Google Spreadsheet Listeners
  if (UI.btnOpenCaGoogleSheetsModal) UI.btnOpenCaGoogleSheetsModal.addEventListener('click', openCaGSheetModal);
  if (UI.btnCaGSheetConfig) UI.btnCaGSheetConfig.addEventListener('click', openCaGSheetModal);
  if (UI.btnCloseCaGSheetModal) UI.btnCloseCaGSheetModal.addEventListener('click', closeCaGSheetModal);
  if (UI.tabBtnCaGSheetConfig) UI.tabBtnCaGSheetConfig.addEventListener('click', () => switchCaGSheetTab('config'));
  if (UI.tabBtnCaGSheetGuide) UI.tabBtnCaGSheetGuide.addEventListener('click', () => switchCaGSheetTab('guide'));
  if (UI.btnCaGSheetSaveConfig) UI.btnCaGSheetSaveConfig.addEventListener('click', saveCaGSheetConfigHandler);
  if (UI.btnCaGSheetTest) UI.btnCaGSheetTest.addEventListener('click', testCaGSheetConnection);
  if (UI.btnCaGSheetPush) UI.btnCaGSheetPush.addEventListener('click', pushCaToGoogleSheets);
  if (UI.btnCaGSheetModalPush) UI.btnCaGSheetModalPush.addEventListener('click', pushCaToGoogleSheets);
  if (UI.btnCaGSheetPull) UI.btnCaGSheetPull.addEventListener('click', pullCaFromGoogleSheets);
  if (UI.btnCaGSheetModalPull) UI.btnCaGSheetModalPull.addEventListener('click', pullCaFromGoogleSheets);
  if (UI.btnCopyCaAppsScript) UI.btnCopyCaAppsScript.addEventListener('click', copyCaAppsScriptCode);

  if (UI.btnRefreshCa) {
    UI.btnRefreshCa.addEventListener('click', () => {
      renderCaPage();
      showToast('Data Diperbarui', 'Data evaluasi mutu CA disinkronkan.', 'info');
    });
  }
  if (UI.btnCloseCaModal) UI.btnCloseCaModal.addEventListener('click', closeCaModal);
  if (UI.btnCancelCaModal) UI.btnCancelCaModal.addEventListener('click', closeCaModal);
  if (UI.formCa) UI.formCa.addEventListener('submit', handleSaveCa);
  if (UI.filterCaMonth) UI.filterCaMonth.addEventListener('change', () => {
    state.selectedCaIds.clear();
    renderCaPage();
  });
  if (UI.filterCaUserSelect) UI.filterCaUserSelect.addEventListener('change', renderCaPage);
  if (UI.searchCaInput) UI.searchCaInput.addEventListener('input', renderCaPage);
  if (UI.btnClearSearchCa) {
    UI.btnClearSearchCa.addEventListener('click', () => {
      if (UI.searchCaInput) UI.searchCaInput.value = '';
      renderCaPage();
    });
  }
  if (UI.filterCaService) UI.filterCaService.addEventListener('change', renderCaPage);
  if (UI.filterCaGrade) UI.filterCaGrade.addEventListener('change', renderCaPage);
  if (UI.filterCaSummarySort) UI.filterCaSummarySort.addEventListener('change', renderCaPage);
  if (UI.filterCaScoreSort) UI.filterCaScoreSort.addEventListener('change', renderCaPage);
  if (UI.btnResetCaFilters) {
    UI.btnResetCaFilters.addEventListener('click', () => {
      if (UI.filterCaMonth) UI.filterCaMonth.value = '2026-09';
      if (UI.filterCaUserSelect) UI.filterCaUserSelect.value = 'ALL';
      if (UI.searchCaInput) UI.searchCaInput.value = '';
      if (UI.filterCaService) UI.filterCaService.value = 'ALL';
      if (UI.filterCaGrade) UI.filterCaGrade.value = 'ALL';
      if (UI.filterCaSummarySort) UI.filterCaSummarySort.value = 'DESC';
      if (UI.filterCaScoreSort) UI.filterCaScoreSort.value = 'DATE_DESC';
      state.selectedCaIds.clear();
      renderCaPage();
      showToast('Filter Direset', 'Semua filter CA telah dikembalikan.', 'info');
    });
  }

  // CA Selection & Batch Listeners
  if (UI.caSelectAllCheckbox) {
    UI.caSelectAllCheckbox.addEventListener('change', (e) => {
      toggleSelectAllCa(e.target.checked);
    });
  }
  if (UI.btnCaSelectAll) {
    UI.btnCaSelectAll.addEventListener('click', () => toggleSelectAllCa(true));
  }
  if (UI.btnCaDeselectAll) {
    UI.btnCaDeselectAll.addEventListener('click', deselectAllCa);
  }
  if (UI.btnCaDeleteSelected) {
    UI.btnCaDeleteSelected.addEventListener('click', promptDeleteSelectedCa);
  }

  // Row Checkbox change delegation
  if (UI.caTableBody) {
    UI.caTableBody.addEventListener('change', (e) => {
      if (!state.isAdmin()) return;
      if (e.target && e.target.classList.contains('ca-row-checkbox')) {
        const id = e.target.getAttribute('data-id');
        if (e.target.checked) {
          state.selectedCaIds.add(id);
        } else {
          state.selectedCaIds.delete(id);
        }
        // Sync header checkbox
        const allCheckboxes = UI.caTableBody.querySelectorAll('.ca-row-checkbox');
        const checkedCount = UI.caTableBody.querySelectorAll('.ca-row-checkbox:checked').length;
        if (UI.caSelectAllCheckbox) {
          UI.caSelectAllCheckbox.checked = allCheckboxes.length > 0 && checkedCount === allCheckboxes.length;
          UI.caSelectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
        }
        // Sync batch bar
        if (UI.caBatchBar) {
          const hasSelected = state.selectedCaIds.size > 0;
          UI.caBatchBar.classList.toggle('hidden', !hasSelected);
          if (UI.caSelectedCount) {
            UI.caSelectedCount.textContent = state.selectedCaIds.size;
          }
        }
      }
    });
  }

  if (UI.formCaUserSelect) {
    UI.formCaUserSelect.addEventListener('change', (e) => {
      const selectedOpt = e.target.options[e.target.selectedIndex];
      const dept = selectedOpt ? selectedOpt.getAttribute('data-dept') : '';
      if (dept && UI.formCaDept) {
        UI.formCaDept.value = dept;
      }
    });
  }
  if (UI.formCaScore) {
    UI.formCaScore.addEventListener('input', () => {
      const val = parseFloat(UI.formCaScore.value);
      if (!isNaN(val) && UI.formCaGradeVal) {
        if (val >= 95.00) {
          UI.formCaGradeVal.value = 'Sangat Baik';
        } else if (val >= 85.00) {
          UI.formCaGradeVal.value = 'Baik';
        } else {
          UI.formCaGradeVal.value = 'Perlu Coaching';
        }
      }
    });
  }

  // Tiket Event Listeners
  if (UI.filterTiketMonth) UI.filterTiketMonth.addEventListener('change', renderTiketPage);
  if (UI.filterSummaryTiketUser) UI.filterSummaryTiketUser.addEventListener('change', renderTiketPage);
  if (UI.filterSummaryTiketService) UI.filterSummaryTiketService.addEventListener('change', renderTiketPage);
  if (UI.filterTiketSummarySort) UI.filterTiketSummarySort.addEventListener('change', renderTiketPage);
  if (UI.btnDeleteAllTiketMonth) UI.btnDeleteAllTiketMonth.addEventListener('click', promptDeleteAllTiketMonth);
  if (UI.btnOpenAddTiketModal) UI.btnOpenAddTiketModal.addEventListener('click', openAddTiketModal);
  if (UI.btnExportTiketExcel) UI.btnExportTiketExcel.addEventListener('click', exportTiketExcel);

  // Tiket Google Spreadsheet Listeners
  if (UI.btnOpenTiketGoogleSheetsModal) UI.btnOpenTiketGoogleSheetsModal.addEventListener('click', openTiketGSheetModal);
  if (UI.btnTiketGSheetConfig) UI.btnTiketGSheetConfig.addEventListener('click', openTiketGSheetModal);
  if (UI.btnCloseTiketGSheetModal) UI.btnCloseTiketGSheetModal.addEventListener('click', closeTiketGSheetModal);
  if (UI.tabBtnTiketGSheetConfig) UI.tabBtnTiketGSheetConfig.addEventListener('click', () => switchTiketGSheetTab('config'));
  if (UI.tabBtnTiketGSheetGuide) UI.tabBtnTiketGSheetGuide.addEventListener('click', () => switchTiketGSheetTab('guide'));
  if (UI.btnTiketGSheetSaveConfig) UI.btnTiketGSheetSaveConfig.addEventListener('click', saveTiketGSheetConfigHandler);
  if (UI.btnTiketGSheetTest) UI.btnTiketGSheetTest.addEventListener('click', testTiketGSheetConnection);
  if (UI.btnTiketGSheetPush) UI.btnTiketGSheetPush.addEventListener('click', pushTiketToGoogleSheets);
  if (UI.btnTiketGSheetModalPush) UI.btnTiketGSheetModalPush.addEventListener('click', pushTiketToGoogleSheets);
  if (UI.btnTiketGSheetPull) UI.btnTiketGSheetPull.addEventListener('click', pullTiketFromGoogleSheets);
  if (UI.btnTiketGSheetModalPull) UI.btnTiketGSheetModalPull.addEventListener('click', pullTiketFromGoogleSheets);
  if (UI.btnCopyTiketAppsScript) UI.btnCopyTiketAppsScript.addEventListener('click', copyTiketAppsScriptCode);

  if (UI.btnRefreshTiket) {
    UI.btnRefreshTiket.addEventListener('click', () => {
      renderTiketPage();
      showToast('Data Diperbarui', 'Data rekapitulasi perolehan tiket harian disinkronkan.', 'info');
    });
  }
  if (UI.btnCloseTiketModal) UI.btnCloseTiketModal.addEventListener('click', closeTiketModal);
  if (UI.btnCancelTiketModal) UI.btnCancelTiketModal.addEventListener('click', closeTiketModal);
  if (UI.formTiket) UI.formTiket.addEventListener('submit', handleSaveTiket);
  if (UI.searchTiketInput) UI.searchTiketInput.addEventListener('input', renderTiketPage);
  if (UI.btnClearSearchTiket) {
    UI.btnClearSearchTiket.addEventListener('click', () => {
      if (UI.searchTiketInput) UI.searchTiketInput.value = '';
      renderTiketPage();
    });
  }
  if (UI.filterTiketUserSelect) UI.filterTiketUserSelect.addEventListener('change', renderTiketPage);
  if (UI.filterTiketService) UI.filterTiketService.addEventListener('change', renderTiketPage);
  if (UI.filterTiketGrade) UI.filterTiketGrade.addEventListener('change', renderTiketPage);
  if (UI.filterTiketScoreSort) UI.filterTiketScoreSort.addEventListener('change', renderTiketPage);
  if (UI.btnResetTiketFilters) {
    UI.btnResetTiketFilters.addEventListener('click', () => {
      const isAdm = state.isAdmin();
      const myName = state.currentUser ? state.currentUser.fullName : '';
      if (UI.filterTiketMonth) UI.filterTiketMonth.value = '2026-09';
      if (UI.filterSummaryTiketUser) UI.filterSummaryTiketUser.value = isAdm ? 'ALL' : myName;
      if (UI.filterSummaryTiketService) UI.filterSummaryTiketService.value = 'ALL';
      if (UI.filterTiketUserSelect) UI.filterTiketUserSelect.value = isAdm ? 'ALL' : myName;
      if (UI.searchTiketInput) UI.searchTiketInput.value = '';
      if (UI.filterTiketService) UI.filterTiketService.value = 'ALL';
      if (UI.filterTiketGrade) UI.filterTiketGrade.value = 'ALL';
      if (UI.filterTiketSummarySort) UI.filterTiketSummarySort.value = 'DESC';
      if (UI.filterTiketScoreSort) UI.filterTiketScoreSort.value = 'DATE_DESC';
      state.selectedTiketIds.clear();
      renderTiketPage();
      showToast('Filter Direset', 'Semua filter perolehan tiket telah dikembalikan.', 'info');
    });
  }

  // Tiket Selection & Batch Listeners (Admin Only)
  if (UI.tiketSelectAllCheckbox) {
    UI.tiketSelectAllCheckbox.addEventListener('change', (e) => {
      toggleSelectAllTiket(e.target.checked);
    });
  }
  if (UI.btnTiketSelectAll) {
    UI.btnTiketSelectAll.addEventListener('click', () => toggleSelectAllTiket(true));
  }
  if (UI.btnTiketDeselectAll) {
    UI.btnTiketDeselectAll.addEventListener('click', deselectAllTiket);
  }
  if (UI.btnTiketDeleteSelected) {
    UI.btnTiketDeleteSelected.addEventListener('click', promptDeleteSelectedTiket);
  }

  // Row Checkbox change delegation for Tiket
  if (UI.tiketTableBody) {
    UI.tiketTableBody.addEventListener('change', (e) => {
      if (!state.isAdmin()) return;
      if (e.target && e.target.classList.contains('tiket-row-checkbox')) {
        const id = e.target.getAttribute('data-id');
        if (e.target.checked) {
          state.selectedTiketIds.add(id);
        } else {
          state.selectedTiketIds.delete(id);
        }
        // Sync header checkbox
        const allCheckboxes = UI.tiketTableBody.querySelectorAll('.tiket-row-checkbox');
        const checkedCount = UI.tiketTableBody.querySelectorAll('.tiket-row-checkbox:checked').length;
        if (UI.tiketSelectAllCheckbox) {
          UI.tiketSelectAllCheckbox.checked = allCheckboxes.length > 0 && checkedCount === allCheckboxes.length;
          UI.tiketSelectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
        }
        // Sync batch bar
        if (UI.tiketBatchBar) {
          const hasSelected = state.selectedTiketIds.size > 0;
          UI.tiketBatchBar.classList.toggle('hidden', !hasSelected);
          if (UI.tiketSelectedCount) {
            UI.tiketSelectedCount.textContent = state.selectedTiketIds.size;
          }
        }
      }
    });
  }

  if (UI.formTiketUserSelect) {
    UI.formTiketUserSelect.addEventListener('change', (e) => {
      const selectedOpt = e.target.options[e.target.selectedIndex];
      const dept = selectedOpt ? selectedOpt.getAttribute('data-dept') : '';
      if (dept && UI.formTiketDept) {
        UI.formTiketDept.value = dept;
      }
    });
  }


  // AHT Event Listeners
  if (UI.filterAhtMonth) UI.filterAhtMonth.addEventListener('change', renderAhtPage);
  if (UI.filterSummaryAhtUser) UI.filterSummaryAhtUser.addEventListener('change', renderAhtPage);
  if (UI.filterSummaryAhtService) UI.filterSummaryAhtService.addEventListener('change', renderAhtPage);
  if (UI.filterAhtSummarySort) UI.filterAhtSummarySort.addEventListener('change', renderAhtPage);

  if (UI.btnRefreshAht) {
    UI.btnRefreshAht.addEventListener('click', () => {
      renderAhtPage();
      showToast('Data Diperbarui', 'Metrik Average Handling Time diperbarui.', 'info');
    });
  }

  if (UI.btnDeleteAllAhtMonth) UI.btnDeleteAllAhtMonth.addEventListener('click', promptDeleteAllAhtMonth);
  if (UI.btnOpenAddAhtModal) UI.btnOpenAddAhtModal.addEventListener('click', openAddAhtModal);
  if (UI.btnCloseAhtModal) UI.btnCloseAhtModal.addEventListener('click', closeAhtModal);
  if (UI.btnCancelAhtModal) UI.btnCancelAhtModal.addEventListener('click', closeAhtModal);
  if (UI.formAht) UI.formAht.addEventListener('submit', handleSaveAht);

  // AHT Google Spreadsheet Listeners
  if (UI.btnExportAhtExcel) UI.btnExportAhtExcel.addEventListener('click', exportAhtExcel);
  if (UI.btnOpenAhtGoogleSheetsModal) UI.btnOpenAhtGoogleSheetsModal.addEventListener('click', openAhtGSheetModal);
  if (UI.btnAhtGSheetConfig) UI.btnAhtGSheetConfig.addEventListener('click', openAhtGSheetModal);
  if (UI.btnCloseAhtGSheetModal) UI.btnCloseAhtGSheetModal.addEventListener('click', closeAhtGSheetModal);
  if (UI.tabBtnAhtGSheetConfig) UI.tabBtnAhtGSheetConfig.addEventListener('click', () => switchAhtGSheetTab('config'));
  if (UI.tabBtnAhtGSheetGuide) UI.tabBtnAhtGSheetGuide.addEventListener('click', () => switchAhtGSheetTab('guide'));
  if (UI.btnAhtGSheetSaveConfig) UI.btnAhtGSheetSaveConfig.addEventListener('click', saveAhtGSheetConfigHandler);
  if (UI.btnAhtGSheetTest) UI.btnAhtGSheetTest.addEventListener('click', testAhtGSheetConnection);
  if (UI.btnAhtGSheetPush) UI.btnAhtGSheetPush.addEventListener('click', pushAhtToGoogleSheets);
  if (UI.btnAhtGSheetModalPush) UI.btnAhtGSheetModalPush.addEventListener('click', pushAhtToGoogleSheets);
  if (UI.btnAhtGSheetPull) UI.btnAhtGSheetPull.addEventListener('click', pullAhtFromGoogleSheets);
  if (UI.btnAhtGSheetModalPull) UI.btnAhtGSheetModalPull.addEventListener('click', pullAhtFromGoogleSheets);
  if (UI.btnCopyAhtAppsScript) UI.btnCopyAhtAppsScript.addEventListener('click', copyAhtAppsScriptCode);

  if (UI.formAhtUserSelect) {
    UI.formAhtUserSelect.addEventListener('change', () => {
      const selectedOpt = UI.formAhtUserSelect.options[UI.formAhtUserSelect.selectedIndex];
      if (selectedOpt && selectedOpt.dataset.dept && UI.formAhtDept) {
        UI.formAhtDept.value = selectedOpt.dataset.dept;
      }
    });
  }

  if (UI.formAhtDurationMins) UI.formAhtDurationMins.addEventListener('input', updateAhtModalDurationPreview);
  if (UI.formAhtDurationSecs) UI.formAhtDurationSecs.addEventListener('input', updateAhtModalDurationPreview);
  if (UI.formAhtTargetSecs) UI.formAhtTargetSecs.addEventListener('input', updateAhtModalDurationPreview);

  if (UI.searchAhtInput) UI.searchAhtInput.addEventListener('input', renderAhtPage);
  if (UI.btnClearSearchAht) {
    UI.btnClearSearchAht.addEventListener('click', () => {
      if (UI.searchAhtInput) UI.searchAhtInput.value = '';
      renderAhtPage();
    });
  }

  if (UI.filterAhtUserSelect) UI.filterAhtUserSelect.addEventListener('change', renderAhtPage);
  if (UI.filterAhtService) UI.filterAhtService.addEventListener('change', renderAhtPage);
  if (UI.filterAhtStatus) UI.filterAhtStatus.addEventListener('change', renderAhtPage);
  if (UI.filterAhtSort) UI.filterAhtSort.addEventListener('change', renderAhtPage);

  if (UI.btnResetAhtFilters) {
    UI.btnResetAhtFilters.addEventListener('click', () => {
      if (UI.searchAhtInput) UI.searchAhtInput.value = '';
      if (UI.filterAhtUserSelect && state.isAdmin()) UI.filterAhtUserSelect.value = 'ALL';
      if (UI.filterAhtService) UI.filterAhtService.value = 'ALL';
      if (UI.filterAhtStatus) UI.filterAhtStatus.value = 'ALL';
      if (UI.filterAhtSort) UI.filterAhtSort.value = 'DATE_DESC';
      if (UI.filterSummaryAhtUser && state.isAdmin()) UI.filterSummaryAhtUser.value = 'ALL';
      if (UI.filterSummaryAhtService) UI.filterSummaryAhtService.value = 'ALL';
      if (UI.filterAhtSummarySort) UI.filterAhtSummarySort.value = 'FASTEST';
      renderAhtPage();
      showToast('Filter Direset', 'Semua filter AHT dikembalikan ke setelan awal.', 'info');
    });
  }

  // AHT Checkbox and batch toolbar listeners (Admin)
  if (UI.ahtSelectAllCheckbox) {
    UI.ahtSelectAllCheckbox.addEventListener('change', (e) => {
      const checked = e.target.checked;
      const rowBoxes = document.querySelectorAll('.aht-row-checkbox');
      rowBoxes.forEach(box => {
        const id = box.dataset.id;
        box.checked = checked;
        if (checked) {
          state.selectedAhtIds.add(id);
        } else {
          state.selectedAhtIds.delete(id);
        }
      });
      if (UI.ahtBatchBar) {
        UI.ahtBatchBar.classList.toggle('hidden', state.selectedAhtIds.size === 0);
        if (UI.ahtSelectedCount) UI.ahtSelectedCount.textContent = state.selectedAhtIds.size;
      }
    });
  }

  if (UI.btnAhtSelectAll) {
    UI.btnAhtSelectAll.addEventListener('click', () => {
      const rowBoxes = document.querySelectorAll('.aht-row-checkbox');
      rowBoxes.forEach(box => {
        const id = box.dataset.id;
        box.checked = true;
        state.selectedAhtIds.add(id);
      });
      if (UI.ahtSelectAllCheckbox) UI.ahtSelectAllCheckbox.checked = true;
      if (UI.ahtBatchBar) {
        UI.ahtBatchBar.classList.remove('hidden');
        if (UI.ahtSelectedCount) UI.ahtSelectedCount.textContent = state.selectedAhtIds.size;
      }
    });
  }

  if (UI.btnAhtDeselectAll) {
    UI.btnAhtDeselectAll.addEventListener('click', () => {
      state.selectedAhtIds.clear();
      const rowBoxes = document.querySelectorAll('.aht-row-checkbox');
      rowBoxes.forEach(box => box.checked = false);
      if (UI.ahtSelectAllCheckbox) UI.ahtSelectAllCheckbox.checked = false;
      if (UI.ahtBatchBar) UI.ahtBatchBar.classList.add('hidden');
    });
  }

  if (UI.btnAhtDeleteSelected) UI.btnAhtDeleteSelected.addEventListener('click', handleAhtBatchDelete);

  // Row checkbox click event delegation
  if (UI.tableAhtLogs) {
    UI.tableAhtLogs.addEventListener('change', (e) => {
      if (e.target.classList.contains('aht-row-checkbox')) {
        const id = e.target.dataset.id;
        if (e.target.checked) {
          state.selectedAhtIds.add(id);
        } else {
          state.selectedAhtIds.delete(id);
        }
        const rowBoxes = Array.from(document.querySelectorAll('.aht-row-checkbox'));
        const allChecked = rowBoxes.length > 0 && rowBoxes.every(b => b.checked);
        const anyChecked = rowBoxes.some(b => b.checked);
        if (UI.ahtSelectAllCheckbox) {
          UI.ahtSelectAllCheckbox.checked = allChecked;
          UI.ahtSelectAllCheckbox.indeterminate = anyChecked && !allChecked;
        }
        if (UI.ahtBatchBar) {
          UI.ahtBatchBar.classList.toggle('hidden', state.selectedAhtIds.size === 0);
          if (UI.ahtSelectedCount) UI.ahtSelectedCount.textContent = state.selectedAhtIds.size;
        }
      }
    });
  }

  // ART Event Listeners
  if (UI.filterArtMonth) UI.filterArtMonth.addEventListener('change', renderArtPage);
  if (UI.filterSummaryArtUser) UI.filterSummaryArtUser.addEventListener('change', renderArtPage);
  if (UI.filterSummaryArtService) UI.filterSummaryArtService.addEventListener('change', renderArtPage);
  if (UI.filterArtSummarySort) UI.filterArtSummarySort.addEventListener('change', renderArtPage);

  if (UI.btnRefreshArt) {
    UI.btnRefreshArt.addEventListener('click', () => {
      renderArtPage();
      showToast('Data Diperbarui', 'Metrik Average Response Time diperbarui.', 'info');
    });
  }

  if (UI.btnDeleteAllArtMonth) UI.btnDeleteAllArtMonth.addEventListener('click', promptDeleteAllArtMonth);
  if (UI.btnOpenAddArtModal) UI.btnOpenAddArtModal.addEventListener('click', openAddArtModal);
  if (UI.btnCloseArtModal) UI.btnCloseArtModal.addEventListener('click', closeArtModal);
  if (UI.btnCancelArtModal) UI.btnCancelArtModal.addEventListener('click', closeArtModal);
  if (UI.formArt) UI.formArt.addEventListener('submit', handleSaveArt);

  // ART Google Spreadsheet Listeners
  if (UI.btnExportArtExcel) UI.btnExportArtExcel.addEventListener('click', exportArtExcel);
  if (UI.btnOpenArtGoogleSheetsModal) UI.btnOpenArtGoogleSheetsModal.addEventListener('click', openArtGSheetModal);
  if (UI.btnArtGSheetConfig) UI.btnArtGSheetConfig.addEventListener('click', openArtGSheetModal);
  if (UI.btnCloseArtGSheetModal) UI.btnCloseArtGSheetModal.addEventListener('click', closeArtGSheetModal);
  if (UI.tabBtnArtGSheetConfig) UI.tabBtnArtGSheetConfig.addEventListener('click', () => switchArtGSheetTab('config'));
  if (UI.tabBtnArtGSheetGuide) UI.tabBtnArtGSheetGuide.addEventListener('click', () => switchArtGSheetTab('guide'));
  if (UI.btnArtGSheetSaveConfig) UI.btnArtGSheetSaveConfig.addEventListener('click', saveArtGSheetConfigHandler);
  if (UI.btnArtGSheetTest) UI.btnArtGSheetTest.addEventListener('click', testArtGSheetConnection);
  if (UI.btnArtGSheetPush) UI.btnArtGSheetPush.addEventListener('click', pushArtToGoogleSheets);
  if (UI.btnArtGSheetModalPush) UI.btnArtGSheetModalPush.addEventListener('click', pushArtToGoogleSheets);
  if (UI.btnArtGSheetPull) UI.btnArtGSheetPull.addEventListener('click', pullArtFromGoogleSheets);
  if (UI.btnArtGSheetModalPull) UI.btnArtGSheetModalPull.addEventListener('click', pullArtFromGoogleSheets);
  if (UI.btnCopyArtAppsScript) UI.btnCopyArtAppsScript.addEventListener('click', copyArtAppsScriptCode);

  if (UI.formArtUserSelect) {
    UI.formArtUserSelect.addEventListener('change', () => {
      const selectedOpt = UI.formArtUserSelect.options[UI.formArtUserSelect.selectedIndex];
      if (selectedOpt && selectedOpt.dataset.dept && UI.formArtDept) {
        UI.formArtDept.value = selectedOpt.dataset.dept;
      }
    });
  }

  if (UI.formArtResponseSecs) UI.formArtResponseSecs.addEventListener('input', updateArtModalResponsePreview);
  if (UI.formArtTargetSecs) UI.formArtTargetSecs.addEventListener('input', updateArtModalResponsePreview);

  if (UI.searchArtInput) UI.searchArtInput.addEventListener('input', renderArtPage);
  if (UI.btnClearSearchArt) {
    UI.btnClearSearchArt.addEventListener('click', () => {
      if (UI.searchArtInput) UI.searchArtInput.value = '';
      renderArtPage();
    });
  }

  if (UI.filterArtUserSelect) UI.filterArtUserSelect.addEventListener('change', renderArtPage);
  if (UI.filterArtService) UI.filterArtService.addEventListener('change', renderArtPage);
  if (UI.filterArtStatus) UI.filterArtStatus.addEventListener('change', renderArtPage);
  if (UI.filterArtSort) UI.filterArtSort.addEventListener('change', renderArtPage);

  if (UI.btnResetArtFilters) {
    UI.btnResetArtFilters.addEventListener('click', () => {
      if (UI.searchArtInput) UI.searchArtInput.value = '';
      if (UI.filterArtUserSelect && state.isAdmin()) UI.filterArtUserSelect.value = 'ALL';
      if (UI.filterArtService) UI.filterArtService.value = 'ALL';
      if (UI.filterArtStatus) UI.filterArtStatus.value = 'ALL';
      if (UI.filterArtSort) UI.filterArtSort.value = 'DATE_DESC';
      if (UI.filterSummaryArtUser && state.isAdmin()) UI.filterSummaryArtUser.value = 'ALL';
      if (UI.filterSummaryArtService) UI.filterSummaryArtService.value = 'ALL';
      if (UI.filterArtSummarySort) UI.filterArtSummarySort.value = 'FASTEST';
      renderArtPage();
      showToast('Filter Direset', 'Semua filter ART dikembalikan ke setelan awal.', 'info');
    });
  }

  // ART Checkbox and batch toolbar listeners (Admin)
  if (UI.artSelectAllCheckbox) {
    UI.artSelectAllCheckbox.addEventListener('change', (e) => {
      const checked = e.target.checked;
      const rowBoxes = document.querySelectorAll('.art-row-checkbox');
      rowBoxes.forEach(box => {
        const id = box.dataset.id;
        box.checked = checked;
        if (checked) {
          state.selectedArtIds.add(id);
        } else {
          state.selectedArtIds.delete(id);
        }
      });
      if (UI.artBatchBar) {
        UI.artBatchBar.classList.toggle('hidden', state.selectedArtIds.size === 0);
        if (UI.artSelectedCount) UI.artSelectedCount.textContent = state.selectedArtIds.size;
      }
    });
  }

  if (UI.btnArtSelectAll) {
    UI.btnArtSelectAll.addEventListener('click', () => {
      const rowBoxes = document.querySelectorAll('.art-row-checkbox');
      rowBoxes.forEach(box => {
        const id = box.dataset.id;
        box.checked = true;
        state.selectedArtIds.add(id);
      });
      if (UI.artSelectAllCheckbox) UI.artSelectAllCheckbox.checked = true;
      if (UI.artBatchBar) {
        UI.artBatchBar.classList.remove('hidden');
        if (UI.artSelectedCount) UI.artSelectedCount.textContent = state.selectedArtIds.size;
      }
    });
  }

  if (UI.btnArtDeselectAll) {
    UI.btnArtDeselectAll.addEventListener('click', () => {
      state.selectedArtIds.clear();
      const rowBoxes = document.querySelectorAll('.art-row-checkbox');
      rowBoxes.forEach(box => box.checked = false);
      if (UI.artSelectAllCheckbox) UI.artSelectAllCheckbox.checked = false;
      if (UI.artBatchBar) UI.artBatchBar.classList.add('hidden');
    });
  }

  if (UI.btnArtDeleteSelected) UI.btnArtDeleteSelected.addEventListener('click', handleArtBatchDelete);

  // Row checkbox click event delegation
  if (UI.tableArtLogs) {
    UI.tableArtLogs.addEventListener('change', (e) => {
      if (e.target.classList.contains('art-row-checkbox')) {
        const id = e.target.dataset.id;
        if (e.target.checked) {
          state.selectedArtIds.add(id);
        } else {
          state.selectedArtIds.delete(id);
        }
        const rowBoxes = Array.from(document.querySelectorAll('.art-row-checkbox'));
        const allChecked = rowBoxes.length > 0 && rowBoxes.every(b => b.checked);
        const anyChecked = rowBoxes.some(b => b.checked);
        if (UI.artSelectAllCheckbox) {
          UI.artSelectAllCheckbox.checked = allChecked;
          UI.artSelectAllCheckbox.indeterminate = anyChecked && !allChecked;
        }
        if (UI.artBatchBar) {
          UI.artBatchBar.classList.toggle('hidden', state.selectedArtIds.size === 0);
          if (UI.artSelectedCount) UI.artSelectedCount.textContent = state.selectedArtIds.size;
        }
      }
    });
  }

  // Finding Event Listeners
  if (UI.filterFindingMonth) UI.filterFindingMonth.addEventListener('change', renderFindingPage);
  if (UI.btnDeleteAllFindingMonth) UI.btnDeleteAllFindingMonth.addEventListener('click', promptDeleteAllFindingMonth);
  if (UI.btnOpenAddFindingModal) UI.btnOpenAddFindingModal.addEventListener('click', openAddFindingModal);
  if (UI.btnRefreshFinding) {
    UI.btnRefreshFinding.addEventListener('click', () => {
      renderFindingPage();
      showToast('Data Diperbarui', 'Daftar temuan audit QA diperbarui.', 'info');
    });
  }
  if (UI.btnCloseFindingModal) UI.btnCloseFindingModal.addEventListener('click', closeFindingModal);
  if (UI.btnCancelFindingModal) UI.btnCancelFindingModal.addEventListener('click', closeFindingModal);
  if (UI.formFinding) UI.formFinding.addEventListener('submit', handleSaveFinding);

  // Finding Google Spreadsheet Listeners
  if (UI.btnExportFindingExcel) UI.btnExportFindingExcel.addEventListener('click', exportFindingExcel);
  if (UI.btnOpenFindingGoogleSheetsModal) UI.btnOpenFindingGoogleSheetsModal.addEventListener('click', openFindingGSheetModal);
  if (UI.btnFindingGSheetConfig) UI.btnFindingGSheetConfig.addEventListener('click', openFindingGSheetModal);
  if (UI.btnCloseFindingGSheetModal) UI.btnCloseFindingGSheetModal.addEventListener('click', closeFindingGSheetModal);
  if (UI.btnCancelFindingGSheetModal) UI.btnCancelFindingGSheetModal.addEventListener('click', closeFindingGSheetModal);
  if (UI.tabBtnFindingGSheetConfig) UI.tabBtnFindingGSheetConfig.addEventListener('click', () => switchFindingGSheetTab('config'));
  if (UI.tabBtnFindingGSheetGuide) UI.tabBtnFindingGSheetGuide.addEventListener('click', () => switchFindingGSheetTab('guide'));
  if (UI.btnFindingGSheetSaveConfig) UI.btnFindingGSheetSaveConfig.addEventListener('click', saveFindingGSheetConfigHandler);
  if (UI.btnFindingGSheetTest) UI.btnFindingGSheetTest.addEventListener('click', testFindingGSheetConnection);
  if (UI.btnFindingGSheetPush) UI.btnFindingGSheetPush.addEventListener('click', pushFindingToGoogleSheets);
  if (UI.btnFindingGSheetModalPush) UI.btnFindingGSheetModalPush.addEventListener('click', pushFindingToGoogleSheets);
  if (UI.btnFindingGSheetPull) UI.btnFindingGSheetPull.addEventListener('click', pullFindingFromGoogleSheets);
  if (UI.btnFindingGSheetModalPull) UI.btnFindingGSheetModalPull.addEventListener('click', pullFindingFromGoogleSheets);
  if (UI.btnCopyFindingAppsScript) UI.btnCopyFindingAppsScript.addEventListener('click', copyFindingAppsScriptCode);

  if (UI.modalFindingGoogleSheets) {
    UI.modalFindingGoogleSheets.addEventListener('click', (e) => {
      if (e.target === UI.modalFindingGoogleSheets) closeFindingGSheetModal();
    });
  }
  if (UI.searchFindingInput) UI.searchFindingInput.addEventListener('input', renderFindingPage);
  if (UI.btnClearSearchFinding) {
    UI.btnClearSearchFinding.addEventListener('click', () => {
      if (UI.searchFindingInput) UI.searchFindingInput.value = '';
      renderFindingPage();
    });
  }
  if (UI.filterFindingService) UI.filterFindingService.addEventListener('change', renderFindingPage);
  if (UI.filterFindingType) UI.filterFindingType.addEventListener('change', renderFindingPage);
  if (UI.filterFindingLevel) UI.filterFindingLevel.addEventListener('change', renderFindingPage);
  if (UI.filterFindingStatus) UI.filterFindingStatus.addEventListener('change', renderFindingPage);
  if (UI.btnResetFindingFilters) {
    UI.btnResetFindingFilters.addEventListener('click', () => {
      if (UI.searchFindingInput) UI.searchFindingInput.value = '';
      if (UI.filterFindingService) UI.filterFindingService.value = 'ALL';
      if (UI.filterFindingType) UI.filterFindingType.value = 'ALL';
      if (UI.filterFindingLevel) UI.filterFindingLevel.value = 'ALL';
      if (UI.filterFindingStatus) UI.filterFindingStatus.value = 'ALL';
      renderFindingPage();
      showToast('Filter Direset', 'Semua filter temuan audit QA dikembalikan.', 'info');
    });
  }

  // Finding Batch Selection & Row Checkbox Delegation
  if (UI.findingSelectAllCheckbox) {
    UI.findingSelectAllCheckbox.addEventListener('change', (e) => {
      const checked = e.target.checked;
      const rowBoxes = document.querySelectorAll('.finding-row-checkbox');
      rowBoxes.forEach(box => {
        const id = box.dataset.id;
        box.checked = checked;
        if (checked) {
          if (state.selectedFindingIds) state.selectedFindingIds.add(id);
        } else {
          if (state.selectedFindingIds) state.selectedFindingIds.delete(id);
        }
      });
      if (UI.findingBatchBar) {
        UI.findingBatchBar.classList.toggle('hidden', !state.selectedFindingIds || state.selectedFindingIds.size === 0);
        if (UI.findingSelectedCount) UI.findingSelectedCount.textContent = state.selectedFindingIds ? state.selectedFindingIds.size : 0;
      }
    });
  }

  if (UI.btnFindingSelectAll) {
    UI.btnFindingSelectAll.addEventListener('click', () => {
      const rowBoxes = document.querySelectorAll('.finding-row-checkbox');
      rowBoxes.forEach(box => {
        const id = box.dataset.id;
        box.checked = true;
        if (state.selectedFindingIds) state.selectedFindingIds.add(id);
      });
      if (UI.findingSelectAllCheckbox) UI.findingSelectAllCheckbox.checked = true;
      if (UI.findingBatchBar) {
        UI.findingBatchBar.classList.remove('hidden');
        if (UI.findingSelectedCount) UI.findingSelectedCount.textContent = state.selectedFindingIds ? state.selectedFindingIds.size : 0;
      }
    });
  }

  if (UI.btnFindingDeselectAll) {
    UI.btnFindingDeselectAll.addEventListener('click', () => {
      if (state.selectedFindingIds) state.selectedFindingIds.clear();
      const rowBoxes = document.querySelectorAll('.finding-row-checkbox');
      rowBoxes.forEach(box => box.checked = false);
      if (UI.findingSelectAllCheckbox) UI.findingSelectAllCheckbox.checked = false;
      if (UI.findingBatchBar) UI.findingBatchBar.classList.add('hidden');
    });
  }

  if (UI.btnFindingDeleteSelected) {
    UI.btnFindingDeleteSelected.addEventListener('click', handleFindingBatchDelete);
  }

  if (UI.tableFindingLogs) {
    UI.tableFindingLogs.addEventListener('change', (e) => {
      if (e.target.classList.contains('finding-row-checkbox')) {
        const id = e.target.dataset.id;
        if (e.target.checked) {
          if (state.selectedFindingIds) state.selectedFindingIds.add(id);
        } else {
          if (state.selectedFindingIds) state.selectedFindingIds.delete(id);
        }
        const rowBoxes = Array.from(document.querySelectorAll('.finding-row-checkbox'));
        const allChecked = rowBoxes.length > 0 && rowBoxes.every(b => b.checked);
        const anyChecked = rowBoxes.some(b => b.checked);
        if (UI.findingSelectAllCheckbox) {
          UI.findingSelectAllCheckbox.checked = allChecked;
          UI.findingSelectAllCheckbox.indeterminate = anyChecked && !allChecked;
        }
        if (UI.findingBatchBar) {
          UI.findingBatchBar.classList.toggle('hidden', !state.selectedFindingIds || state.selectedFindingIds.size === 0);
          if (UI.findingSelectedCount) UI.findingSelectedCount.textContent = state.selectedFindingIds ? state.selectedFindingIds.size : 0;
        }
      }
    });
  }
}

// ==========================================
// 16. TYPING TEST GAME ENGINE (SPEED RACER 60s)
// ==========================================

const TYPING_TEST_DURATION = 60; // Durasi permainan 60 detik

const TYPING_WORDS_DB = {
  id_general: [
    'kecepatan', 'kendaraan', 'sirkuit', 'pengemudi', 'teknologi', 'kemampuan', 'prestasi', 'fokus',
    'semangat', 'juara', 'akurat', 'tangkas', 'lintasan', 'garis', 'finish', 'akselerasi', 'putaran',
    'mesin', 'kinerja', 'laju', 'waktu', 'detik', 'menit', 'jarak', 'tempuh', 'kemudi', 'roda',
    'aspal', 'piala', 'tantangan', 'latihan', 'konsentrasi', 'ketangkasan', 'jari', 'keyboard', 'huruf',
    'kata', 'kalimat', 'paragraf', 'daya', 'kekuatan', 'stamina', 'ketahanan', 'refleks', 'kecekatan',
    'keberhasilan', 'peluang', 'kemenangan', 'bakat', 'kompetisi', 'rekor', 'tertinggi', 'tercepat',
    'hebat', 'efisien', 'dinamis', 'produktif', 'percaya', 'diri', 'optimis', 'tangguh', 'keberanian',
    'target', 'sasaran', 'pencapaian', 'disiplin', 'konsistensi', 'keunggulan', 'kreativitas', 'inovasi',
    'komitmen', 'ketepatan', 'kejujuran', 'profesional', 'teladan', 'semesta', 'kebanggaan', 'inspirasi',
    'gerakan', 'momentum', 'kecepatan', 'gesit', 'stabil', 'kendali', 'pengendalian', 'keahlian',
    'kecermatan', 'ketelitian', 'kelancaran', 'kemajuan', 'lompatan', 'kualitas', 'kapasitas', 'potensi'
  ],
  id_operations: [
    'pelanggan', 'verifikasi', 'identitas', 'tiket', 'layanan', 'solusi', 'eskalasi', 'keluhan',
    'interaksi', 'penanganan', 'respon', 'durasi', 'kualitas', 'evaluasi', 'penilaian', 'kepuasan',
    'operasional', 'produktivitas', 'efisiensi', 'koordinasi', 'komunikasi', 'integritas', 'prosedur',
    'standar', 'pedoman', 'kebijakan', 'pelaporan', 'ringkasan', 'audit', 'temuan', 'catatan',
    'informasi', 'pembaruan', 'tindak', 'lanjut', 'perbaikan', 'peningkatan', 'kinerja', 'indikator',
    'petugas', 'panggilan', 'obrolan', 'surel', 'saluran', 'jaringan', 'koneksi', 'keandalan',
    'akurasi', 'ketuntasan', 'penyelesaian', 'prioritas', 'urgensi', 'tenggat', 'kesepakatan',
    'pemantauan', 'pengawasan', 'analisis', 'wawasan', 'data', 'fakta', 'solutif', 'ramah',
    'profesional', 'sopan', 'tanggap', 'cekatan', 'empati', 'pelayanan', 'keunggulan', 'kolaborasi'
  ],
  en_speed: [
    'speed', 'racing', 'supercar', 'engine', 'velocity', 'throttle', 'asphalt', 'circuit',
    'turbo', 'booster', 'champion', 'victory', 'trophy', 'driver', 'highway', 'gears',
    'tires', 'acceleration', 'traction', 'momentum', 'precision', 'focus', 'power', 'torque',
    'performance', 'fast', 'quick', 'rapid', 'dynamic', 'record', 'challenge', 'drifting',
    'podium', 'winner', 'finish', 'streak', 'energy', 'lightning', 'apex', 'corner',
    'straight', 'overtake', 'steering', 'cockpit', 'aerodynamic', 'telemetry', 'mileage', 'odometer',
    'exhaust', 'ignite', 'spark', 'piston', 'horsepower', 'rpm', 'clutch', 'brakes', 'suspension',
    'reflexes', 'stamina', 'dexterity', 'agility', 'rapidly', 'extreme', 'hypercar', 'legend'
  ]
};

const TypingAudioEngine = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  },
  playKey() {
    if (!typingState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550 + Math.random() * 250, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  },
  playError() {
    if (!typingState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.11);
    } catch (e) {}
  },
  playNitro() {
    if (!typingState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.35);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(700, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3200, this.ctx.currentTime + 0.3);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {}
  },
  playFanfare() {
    if (!typingState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = this.ctx.currentTime + idx * 0.12;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.33);
      });
    } catch (e) {}
  },
  playKingFanfare() {
    if (!typingState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      // Majestic Royal King Fanfare (C4, G4, C5, E5, G5)
      const kingNotes = [261.63, 392.00, 523.25, 659.25, 783.99];
      kingNotes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + idx * 0.14;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.16, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.46);
      });
    } catch (e) {}
  }
};


// ==========================================
// 14. TYPING TEST MODULE - SPEED RACER 60S
// ==========================================

// TYPING_TEST_DURATION is already defined above

// 5 Model Mobil Balap Supercar & Hot Wheels dengan Desain SVG Autentik
const CAR_MODELS = {
  ferrari: {
    id: 'ferrari',
    name: 'Ferrari SF90 Stradale',
    theme: 'Rosso Corsa',
    colorHex: '#e60000',
    iconEmoji: '🏎️',
    svg: `<svg class="racer-car-svg" viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ferrariRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff2e2e" />
          <stop offset="25%" stop-color="#e60000" />
          <stop offset="70%" stop-color="#c40000" />
          <stop offset="100%" stop-color="#7a0000" />
        </linearGradient>
        <linearGradient id="ferrariGlossGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45" />
          <stop offset="50%" stop-color="#ff7777" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="ferrariGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e293b" stop-opacity="0.95" />
          <stop offset="40%" stop-color="#0f172a" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4" />
        </linearGradient>
        <linearGradient id="ferrariRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="50%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="94" rx="145" ry="5.5" fill="#000000" opacity="0.8" filter="blur(2px)" />
      <path d="M 28 85 L 12 78 L 18 70 L 40 76 Z" fill="#18181b" />
      <rect x="14" y="74" width="8" height="5" rx="2" fill="#3f3f46" stroke="#71717a" stroke-width="0.7" />
      <path d="M 85 86 L 225 86 L 220 89 L 90 89 Z" fill="#09090b" />
      <path d="M 90 88.5 L 215 88.5" stroke="#ef4444" stroke-width="1.2" />
      <path d="M 24 74 C 22 62, 35 52, 60 52 C 85 52, 95 44, 115 30 C 135 17, 185 16, 215 32 C 230 40, 245 52, 280 64 C 300 71, 312 77, 310 82 C 305 87, 285 87, 275 87 C 272 73, 248 73, 245 87 L 85 87 C 82 73, 58 73, 55 87 L 26 87 Z" fill="url(#ferrariRedGrad)" />
      <path d="M 58 53 C 95 53, 115 44, 130 31 C 150 18, 185 17, 212 32 C 235 43, 260 58, 290 67" fill="none" stroke="url(#ferrariGlossGrad)" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 120 32 C 138 20, 178 19, 205 32 C 215 37, 222 45, 228 51 L 110 51 C 114 43, 116 36, 120 32 Z" fill="url(#ferrariGlassGrad)" stroke="#0f172a" stroke-width="1.5" />
      <path d="M 100 58 C 115 58, 125 66, 120 78 C 112 78, 100 72, 98 64 Z" fill="#09090b" stroke="#7f1d1d" stroke-width="0.8" />
      <path d="M 102 61 L 116 75" stroke="#ef4444" stroke-width="1" opacity="0.6" />
      <path d="M 292 78 L 315 82 L 305 86 L 275 86 Z" fill="#09090b" stroke="#27272a" stroke-width="0.8" />
      <path d="M 282 66 L 302 74 L 285 73 Z" fill="#38bdf8" opacity="0.9" />
      <ellipse cx="295" cy="72" rx="4" ry="1.8" fill="#ffffff" />
      <polygon points="128,52 133,52 132,60 130.5,62 129,60" fill="#facc15" stroke="#000000" stroke-width="0.4" />
      <polygon points="129.5,53 131.5,53 131,58 130,58" fill="#dc2626" />
      <path d="M 22 55 L 42 53 L 40 57 L 20 59 Z" fill="#09090b" />
      <line x1="28" y1="58" x2="30" y2="70" stroke="#18181b" stroke-width="2.5" />

      <!-- Wheel Assembly at (70, 84) -->
      <g class="wheel-station" transform="translate(70, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#dc2626" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelRear" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#facc15" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#facc15" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#64748b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#cbd5e1" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#e2e8f0" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#facc15" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
      <!-- Wheel Assembly at (260, 84) -->
      <g class="wheel-station" transform="translate(260, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#dc2626" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelFront" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#facc15" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#facc15" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#64748b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#cbd5e1" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#e2e8f0" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#facc15" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
    </svg>`
  },
  lamborghini: {
    id: 'lamborghini',
    name: 'Lamborghini Huracán STO',
    theme: 'Giallo Auge Yellow',
    colorHex: '#eab308',
    iconEmoji: '🏎️',
    svg: `<svg class="racer-car-svg" viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lamboYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fde047" />
          <stop offset="25%" stop-color="#eab308" />
          <stop offset="70%" stop-color="#ca8a04" />
          <stop offset="100%" stop-color="#854d0e" />
        </linearGradient>
        <linearGradient id="lamboGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="94" rx="145" ry="5.5" fill="#000000" opacity="0.8" filter="blur(2px)" />
      <path d="M 15 45 L 45 42 L 40 48 L 12 51 Z" fill="#09090b" stroke="#eab308" stroke-width="0.8" />
      <line x1="25" y1="50" x2="35" y2="72" stroke="#18181b" stroke-width="3" />
      <path d="M 22 75 C 22 62, 36 50, 62 50 L 125 28 C 145 16, 185 16, 215 32 L 285 64 C 305 71, 314 77, 310 82 C 305 87, 285 87, 275 87 C 272 73, 248 73, 245 87 L 85 87 C 82 73, 58 73, 55 87 L 24 87 Z" fill="url(#lamboYellowGrad)" />
      <polygon points="160,18 190,18 185,25 155,25" fill="#09090b" stroke="#ca8a04" stroke-width="0.8" />
      <polygon points="130,30 205,30 228,51 118,51" fill="url(#lamboGlassGrad)" stroke="#09090b" stroke-width="1.5" />
      <polygon points="95,58 125,58 115,76 85,76" fill="#09090b" stroke="#ca8a04" stroke-width="1" />
      <polygon points="280,66 300,73 285,73" fill="#38bdf8" />

      <!-- Wheel Assembly at (70, 84) -->
      <g class="wheel-station" transform="translate(70, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#eab308" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelRear" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#facc15" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#facc15" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#18181b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#facc15" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#fde047" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#18181b" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
      <!-- Wheel Assembly at (260, 84) -->
      <g class="wheel-station" transform="translate(260, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#eab308" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelFront" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#facc15" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#facc15" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#18181b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#facc15" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#fde047" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#18181b" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
    </svg>`
  },
  porsche: {
    id: 'porsche',
    name: 'Porsche 911 GT3 RS',
    theme: 'Shark Blue',
    colorHex: '#0284c7',
    iconEmoji: '🏎️',
    svg: `<svg class="racer-car-svg" viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="porscheBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="30%" stop-color="#0284c7" />
          <stop offset="70%" stop-color="#0369a1" />
          <stop offset="100%" stop-color="#075985" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="94" rx="145" ry="5.5" fill="#000000" opacity="0.8" filter="blur(2px)" />
      <path d="M 18 36 L 48 34 L 44 40 L 14 42 Z" fill="#09090b" stroke="#38bdf8" stroke-width="1" />
      <path d="M 28 40 C 26 50, 38 60, 42 70" fill="none" stroke="#09090b" stroke-width="3.5" />
      <path d="M 24 75 C 20 60, 32 46, 55 46 C 85 46, 110 32, 135 24 C 160 16, 195 18, 225 35 C 245 46, 260 56, 285 66 C 302 72, 312 77, 310 82 C 305 87, 285 87, 275 87 C 272 73, 248 73, 245 87 L 85 87 C 82 73, 58 73, 55 87 L 24 87 Z" fill="url(#porscheBlueGrad)" />
      <path d="M 132 27 C 160 20, 190 20, 215 36 C 225 43, 230 49, 232 52 L 122 52 C 124 42, 127 34, 132 27 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
      <ellipse cx="285" cy="68" rx="6" ry="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1" />

      <!-- Wheel Assembly at (70, 84) -->
      <g class="wheel-station" transform="translate(70, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#ef4444" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelRear" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#1e293b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#93c5fd" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#facc15" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
      <!-- Wheel Assembly at (260, 84) -->
      <g class="wheel-station" transform="translate(260, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#ef4444" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelFront" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#1e293b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#93c5fd" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#facc15" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
    </svg>`
  },
  mclaren: {
    id: 'mclaren',
    name: 'McLaren 720S Spider',
    theme: 'Papaya Orange',
    colorHex: '#f97316',
    iconEmoji: '🏎️',
    svg: `<svg class="racer-car-svg" viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mclarenOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fdba74" />
          <stop offset="30%" stop-color="#f97316" />
          <stop offset="70%" stop-color="#ea580c" />
          <stop offset="100%" stop-color="#9a3412" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="94" rx="145" ry="5.5" fill="#000000" opacity="0.8" filter="blur(2px)" />
      <path d="M 25 58 L 48 55 L 45 61 L 22 63 Z" fill="#09090b" />
      <path d="M 24 74 C 22 60, 36 48, 65 48 C 92 48, 115 36, 138 26 C 162 16, 192 18, 220 34 C 240 44, 255 54, 285 66 C 305 72, 314 77, 310 82 C 305 87, 285 87, 275 87 C 272 73, 248 73, 245 87 L 85 87 C 82 73, 58 73, 55 87 L 24 87 Z" fill="url(#mclarenOrangeGrad)" />
      <path d="M 132 29 C 160 20, 190 20, 214 36 C 224 43, 228 48, 230 52 L 120 52 C 124 42, 128 35, 132 29 Z" fill="#09090b" opacity="0.9" />

      <!-- Wheel Assembly at (70, 84) -->
      <g class="wheel-station" transform="translate(70, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#f97316" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelRear" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#fdba74" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#fdba74" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#18181b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#fdba74" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#ffffff" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#f97316" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
      <!-- Wheel Assembly at (260, 84) -->
      <g class="wheel-station" transform="translate(260, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#f97316" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelFront" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#fdba74" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#fdba74" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#18181b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#fdba74" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#ffffff" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#f97316" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
    </svg>`
  },
  hotwheels: {
    id: 'hotwheels',
    name: 'Hot Wheels Cyber Racer GT',
    theme: 'Neon Purple & Cyan',
    colorHex: '#a855f7',
    iconEmoji: '🏎️',
    svg: `<svg class="racer-car-svg" viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hwPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c084fc" />
          <stop offset="35%" stop-color="#a855f7" />
          <stop offset="70%" stop-color="#7e22ce" />
          <stop offset="100%" stop-color="#3b0764" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="94" rx="145" ry="5.5" fill="#000000" opacity="0.8" filter="blur(2px)" />
      <polygon points="10,40 45,35 40,45 8,50" fill="#a855f7" stroke="#00f2fe" stroke-width="1.5" />
      <line x1="24" y1="46" x2="30" y2="72" stroke="#00f2fe" stroke-width="2.5" />
      <path d="M 22 75 C 18 60, 32 46, 58 46 L 115 32 L 160 14 L 215 30 L 285 64 C 305 71, 314 77, 310 82 C 305 87, 285 87, 275 87 C 272 73, 248 73, 245 87 L 85 87 C 82 73, 58 73, 55 87 L 22 87 Z" fill="url(#hwPurpleGrad)" stroke="#00f2fe" stroke-width="1" />
      <path d="M 40 68 L 290 68" stroke="#00f2fe" stroke-width="2" stroke-dasharray="8 4" />
      <polygon points="135,32 195,32 215,48 120,48" fill="#00f2fe" opacity="0.4" stroke="#ffffff" stroke-width="1" />

      <!-- Wheel Assembly at (70, 84) -->
      <g class="wheel-station" transform="translate(70, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#00f2fe" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelRear" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#ec4899" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#ec4899" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#18181b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#00f2fe" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#ec4899" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#00f2fe" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
      <!-- Wheel Assembly at (260, 84) -->
      <g class="wheel-station" transform="translate(260, 84)">
        <!-- Wheel Well Shadow -->
        <circle cx="0" cy="0" r="16.8" fill="#080a0f" opacity="0.6" />
        <!-- Ventilated Brake Disc (Stationary) -->
        <circle cx="0" cy="0" r="11.5" fill="#334155" stroke="#1e293b" stroke-width="0.8" />
        <circle cx="0" cy="0" r="8.8" fill="none" stroke="#64748b" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
        <!-- Brake Caliper (Stationary at ~10 o'clock) -->
        <path d="M -7.5 -7.5 A 10.8 10.8 0 0 1 1.5 -10.5 L 2.5 -8 A 8.2 8.2 0 0 0 -5.5 -5.5 Z" fill="#00f2fe" stroke="rgba(0,0,0,0.5)" stroke-width="0.5" />
        <circle cx="-2.8" cy="-8.2" r="0.75" fill="#ffffff" opacity="0.9" />

        <!-- Perfectly Symmetrical Rotating Wheel -->
        <g id="wheelFront" class="car-wheel car-wheel-rotator">
          <!-- Outer Tire Rubber -->
          <circle cx="0" cy="0" r="16" fill="#111319" stroke="#1f2430" stroke-width="1.8" />
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="#171a22" stroke-width="0.6" />
          <!-- Symmetrical Tire Decal Marks (Spinning) -->
          <path d="M -15.2 -1.2 A 15.2 15.2 0 0 1 -15.2 1.2" stroke="#ec4899" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 15.2 -1.2 A 15.2 15.2 0 0 1 15.2 1.2" stroke="#ec4899" stroke-width="1.2" stroke-linecap="round" />
          <!-- Machined Alloy Rim Lip -->
          <circle cx="0" cy="0" r="11.8" fill="#0d1017" stroke="#18181b" stroke-width="1.2" />
          <circle cx="0" cy="0" r="10.4" fill="#0a0c12" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" />
          <!-- 6 Symmetrical Radial Spokes (0, 60, 120, 180, 240, 300 deg) -->
          <g stroke="#00f2fe" stroke-width="1.6" stroke-linecap="round">
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-8.66" y1="-5" x2="8.66" y2="5" />
            <line x1="-8.66" y1="5" x2="8.66" y2="-5" />
          </g>
          <!-- 3D Spoke Highlight Bevels -->
          <g stroke="#ec4899" stroke-width="0.6">
            <line x1="0" y1="-9.5" x2="0" y2="-2" />
            <line x1="0" y1="9.5" x2="0" y2="2" />
            <line x1="-8.2" y1="-4.75" x2="-1.7" y2="-1" />
            <line x1="8.2" y1="4.75" x2="1.7" y2="1" />
            <line x1="-8.2" y1="4.75" x2="-1.7" y2="1" />
            <line x1="8.2" y1="-4.75" x2="1.7" y2="-1" />
          </g>
          <!-- Center Hub & Emblem -->
          <circle cx="0" cy="0" r="3.5" fill="#00f2fe" stroke="#000000" stroke-width="0.5" />
          <circle cx="0" cy="0" r="1.4" fill="#000000" />
          <!-- 5 Titanium Lug Nuts -->
          <circle cx="0" cy="-2.1" r="0.4" fill="#e2e8f0" />
          <circle cx="2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
          <circle cx="1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-1.23" cy="1.7" r="0.4" fill="#e2e8f0" />
          <circle cx="-2.0" cy="-0.65" r="0.4" fill="#e2e8f0" />
        </g>
      </g>
    </svg>`
  }
};

const typingState = {
  duration: TYPING_TEST_DURATION,
  timeLeft: TYPING_TEST_DURATION,
  timerInterval: null,
  physicsInterval: null,
  status: 'idle', // 'idle' | 'running' | 'finished'
  selectedCar: localStorage.getItem('drive_typing_selected_car') || 'ferrari',
  category: 'id_general',
  soundEnabled: localStorage.getItem('drive_typing_sound') !== 'false',
  words: [],
  currentWordIndex: 0,
  currentInput: '',
  correctChars: 0,
  wrongChars: 0,
  totalKeystrokes: 0,
  correctWordsCount: 0,
  wrongWordsCount: 0,
  streak: 0,
  maxStreak: 0,
  currentWpm: 0,
  currentSpeedKmh: 0,
  targetSpeedKmh: 0,
  topSpeedKmh: 0,
  distanceMeters: 0,
  lastKeyTime: 0,
  wpmTimeline: [],
  chartInstance: null
};

// Driver Rank Mapping
function getDriverRank(wpm, accuracy) {
  if (wpm >= 100 && accuracy >= 95) {
    return {
      title: 'HOT WHEELS HYPER SONIC',
      badge: 'Pembalap Legenda (Godspeed)',
      icon: 'fa-solid fa-crown',
      desc: 'Performa tak tertandingi! Kecepatan hiper-sonik dengan presisi sempurna bagaikan legenda balap sejati.'
    };
  } else if (wpm >= 80) {
    return {
      title: 'MASTER SIRKUIT PRO',
      badge: 'Grand Prix Pilot',
      icon: 'fa-solid fa-trophy',
      desc: 'Kecepatan luar biasa! Anda menguasai sirkuit dengan ritme mengetik secepat mobil balap profesional.'
    };
  } else if (wpm >= 60) {
    return {
      title: 'PEMBALAP TERAMPIL',
      badge: 'Speed Racer',
      icon: 'fa-solid fa-medal',
      desc: 'Laju sangat kencang dan stabil di kecepatan tinggi dengan kontrol kemudi dan akurasi prima.'
    };
  } else if (wpm >= 40) {
    return {
      title: 'PENGEMUDI HANDAL',
      badge: 'Highway Cruiser',
      icon: 'fa-solid fa-award',
      desc: 'Mengemudi dengan mantap dan lancar. Siap untuk melesat ke gigi balap yang lebih tinggi!'
    };
  } else if (wpm >= 25) {
    return {
      title: 'PENGEMUDI KOTA',
      badge: 'City Driver',
      icon: 'fa-solid fa-car-side',
      desc: 'Laju aman dan teratur di jalan raya. Tingkatkan latihan untuk memacu mobil lebih kencang!'
    };
  } else {
    return {
      title: 'PENGEMUDI PEMULA',
      badge: 'Learner Driver',
      icon: 'fa-solid fa-seedling',
      desc: 'Langkah awal yang baik! Terus berlatih mengetik 10 jari untuk meningkatkan akselerasi mobil.'
    };
  }
}

// Ganti Mobil Balap
function switchCar(carId) {
  const model = CAR_MODELS[carId] || CAR_MODELS.ferrari;
  typingState.selectedCar = model.id;
  localStorage.setItem('drive_typing_selected_car', model.id);

  const svgWrap = document.getElementById('carSvgWrapper');
  if (svgWrap) {
    svgWrap.innerHTML = model.svg;
  }

  const modelLabel = document.getElementById('trackCarModelText');
  if (modelLabel) {
    modelLabel.textContent = `${model.name} • ${model.theme}`;
  }

  const select = document.getElementById('selectTypingCar');
  if (select && select.value !== model.id) {
    select.value = model.id;
  }
}

// Simpan Hasil Balapan ke Penyimpanan Tim dan Pribadi
function saveTypingResult(result) {
  // 1. Simpan ke Riwayat Pribadi Pengguna
  const history = JSON.parse(localStorage.getItem('drive_typing_history') || '[]');
  history.unshift(result);
  if (history.length > 50) history.pop();
  localStorage.setItem('drive_typing_history', JSON.stringify(history));

  // 2. Evaluasi Rekor Pribadi (PB)
  const pb = JSON.parse(localStorage.getItem('drive_typing_pb') || 'null');
  let isNewPb = false;
  if (!pb || result.wpm > pb.wpm) {
    isNewPb = true;
    localStorage.setItem('drive_typing_pb', JSON.stringify(result));
  }

  // 3. Simpan ke Leaderboard Tim Bersama (Dapat dilihat dan dikelola Admin)
  const teamResults = JSON.parse(localStorage.getItem('drive_typing_team_results') || '[]');
  teamResults.unshift(result);
  if (teamResults.length > 200) teamResults.pop();
  localStorage.setItem('drive_typing_team_results', JSON.stringify(teamResults));

  return { history, isNewPb };
}

// Inisialisasi Data Demo Leaderboard Tim (agar Admin langsung melihat rekor seluruh anggota)
function seedInitialTeamTypingData() {
  const existing = localStorage.getItem('drive_typing_team_results');
  if (existing && JSON.parse(existing).length > 0) return;

  const demoRuns = [
    {
      id: 'run_demo_1',
      userId: 'usr_admin_2',
      username: 'dewi_lestari',
      fullName: 'Dewi Lestari, M.T.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'admin',
      department: 'TEAM LEADER',
      date: '30/09/2026, 14:10',
      timestamp: Date.now() - 3600000 * 2,
      carId: 'hotwheels',
      carName: 'Hot Wheels Cyber Racer GT',
      category: 'id_general',
      wpm: 104,
      grossWpm: 107,
      accuracy: 99.1,
      topSpeed: 236,
      correctChars: 520,
      wrongChars: 5,
      correctWords: 88,
      wrongWords: 1,
      distance: 2840,
      maxStreak: 45,
      rankTitle: 'HOT WHEELS HYPER SONIC',
      rankBadge: 'Pembalap Legenda (Godspeed)'
    },
    {
      id: 'run_demo_2',
      userId: 'usr_admin_1',
      username: 'admin',
      fullName: 'Budi Santoso, S.Kom',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'admin',
      department: 'CSO INBOUND',
      date: '30/09/2026, 11:35',
      timestamp: Date.now() - 3600000 * 5,
      carId: 'ferrari',
      carName: 'Ferrari SF90 Stradale',
      category: 'id_operations',
      wpm: 88,
      grossWpm: 91,
      accuracy: 98.4,
      topSpeed: 215,
      correctChars: 440,
      wrongChars: 7,
      correctWords: 74,
      wrongWords: 2,
      distance: 2410,
      maxStreak: 32,
      rankTitle: 'MASTER SIRKUIT PRO',
      rankBadge: 'Grand Prix Pilot'
    },
    {
      id: 'run_demo_3',
      userId: 'usr_user_1',
      username: 'user',
      fullName: 'Siti Rahma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'user',
      department: 'CSO DIGILIVE CHAT - WA',
      date: '30/09/2026, 09:20',
      timestamp: Date.now() - 3600000 * 8,
      carId: 'mclaren',
      carName: 'McLaren 720S Spider',
      category: 'id_general',
      wpm: 76,
      grossWpm: 79,
      accuracy: 97.2,
      topSpeed: 188,
      correctChars: 380,
      wrongChars: 11,
      correctWords: 64,
      wrongWords: 2,
      distance: 2090,
      maxStreak: 24,
      rankTitle: 'PEMBALAP TERAMPIL',
      rankBadge: 'Speed Racer'
    },
    {
      id: 'run_demo_4',
      userId: 'usr_user_2',
      username: 'ahmad_fauzi',
      fullName: 'Ahmad Fauzi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'user',
      department: 'CSO BACK OFFICE',
      date: '29/09/2026, 16:45',
      timestamp: Date.now() - 3600000 * 24,
      carId: 'porsche',
      carName: 'Porsche 911 GT3 RS',
      category: 'en_speed',
      wpm: 63,
      grossWpm: 67,
      accuracy: 95.5,
      topSpeed: 156,
      correctChars: 315,
      wrongChars: 15,
      correctWords: 52,
      wrongWords: 3,
      distance: 1720,
      maxStreak: 18,
      rankTitle: 'PEMBALAP TERAMPIL',
      rankBadge: 'Speed Racer'
    }
  ];

  localStorage.setItem('drive_typing_team_results', JSON.stringify(demoRuns));
}

// Generate Kata Acak
function generateShuffledWords(category, count = 100) {
  const pool = TYPING_WORDS_DB[category] || TYPING_WORDS_DB.id_general;
  const result = [];
  while (result.length < count) {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    result.push(...shuffled);
  }
  return result.slice(0, count);
}

// Render Tampilan Aliran Kata
function renderWordsStream() {
  const container = document.getElementById('wordsStreamContent');
  if (!container) return;

  container.innerHTML = '';
  container.style.transform = 'translateY(0px)';

  typingState.words.forEach((word, wIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word-span';
    wordSpan.dataset.wordIdx = wIdx;

    if (wIdx === 0) wordSpan.classList.add('active-word');

    word.split('').forEach((char, cIdx) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'char-span';
      charSpan.textContent = char;
      charSpan.dataset.charIdx = cIdx;
      if (wIdx === 0 && cIdx === 0) charSpan.classList.add('char-current');
      wordSpan.appendChild(charSpan);
    });

    container.appendChild(wordSpan);
  });
}

// Efek Partikel Melayang Dinamis Saat Mengetik Bersih & Streak
function spawnTypingParticle(text, type = 'combo') {
  const overlay = document.getElementById('typingParticlesOverlay');
  if (!overlay) return;

  const particle = document.createElement('div');
  particle.className = 'typing-float-particle';
  particle.textContent = text;

  const randomLeft = 20 + Math.random() * 60;
  particle.style.left = `${randomLeft}%`;
  particle.style.top = '65%';

  if (type === 'nitro') {
    particle.style.color = '#f43f5e';
    particle.style.fontSize = '1.05rem';
    particle.style.textShadow = '0 0 12px #f43f5e';
  } else if (type === 'turbo') {
    particle.style.color = '#38bdf8';
    particle.style.textShadow = '0 0 10px #38bdf8';
  }

  overlay.appendChild(particle);

  setTimeout(() => {
    if (particle.parentNode) particle.parentNode.removeChild(particle);
  }, 850);
}

// Perbarui Efek Aura Dinamis Kolom Arena & Status Pace
function updateDynamicArenaEffects() {
  const arenaCard = document.getElementById('typingArenaCard');
  const paceBadge = document.getElementById('dynamicPaceBadge');
  const paceText = document.getElementById('dynamicPaceText');

  const wpm = typingState.currentWpm;

  // 1. Aura Warna Dinamis Arena Card
  if (arenaCard) {
    arenaCard.classList.remove('speed-tier-0', 'speed-tier-1', 'speed-tier-2', 'speed-tier-3');
    if (typingState.status === 'running') {
      if (wpm >= 75) arenaCard.classList.add('speed-tier-3');
      else if (wpm >= 50) arenaCard.classList.add('speed-tier-2');
      else if (wpm >= 25) arenaCard.classList.add('speed-tier-1');
      else arenaCard.classList.add('speed-tier-0');
    } else {
      arenaCard.classList.add('speed-tier-0');
    }
  }

  // 2. Status Badge Pace
  if (paceBadge && paceText) {
    paceBadge.classList.remove('pace-slow', 'pace-fast', 'pace-hyper');
    if (typingState.status === 'running') {
      if (wpm >= 80) {
        paceBadge.classList.add('pace-hyper');
        paceText.innerHTML = '<i class="fa-solid fa-fire text-red"></i> KECEPATAN F1! 🔥';
      } else if (wpm >= 50) {
        paceBadge.classList.add('pace-fast');
        paceText.innerHTML = '<i class="fa-solid fa-bolt text-yellow"></i> Turbo Speed ⚡';
      } else if (wpm >= 25) {
        paceBadge.classList.add('pace-slow');
        paceText.innerHTML = '<i class="fa-solid fa-gauge-high text-blue"></i> Cruising 🏎️';
      } else {
        paceText.innerHTML = '<i class="fa-solid fa-gauge text-gray"></i> Pemanasan... 🟢';
      }
    } else {
      paceText.innerHTML = '<i class="fa-solid fa-flag text-gray"></i> Standby 🏁';
    }
  }

  // 3. Counter Kata dan Karakter
  const compWords = document.getElementById('completedWordsCount');
  if (compWords) compWords.textContent = typingState.correctWordsCount;

  const totalKeys = document.getElementById('totalKeystrokesCount');
  if (totalKeys) totalKeys.textContent = typingState.totalKeystrokes;
}

// Update Highlight Karakter & Kata Aktif
function updateWordStreamDisplay() {
  const container = document.getElementById('wordsStreamContent');
  if (!container) return;

  const currentWordEl = container.querySelector(`[data-word-idx="${typingState.currentWordIndex}"]`);
  if (!currentWordEl) return;

  const targetWord = typingState.words[typingState.currentWordIndex] || '';
  const inputVal = typingState.currentInput;
  const chars = currentWordEl.querySelectorAll('.char-span');

  chars.forEach((cSpan, idx) => {
    cSpan.classList.remove('char-correct', 'char-wrong', 'char-current');
    if (idx < inputVal.length) {
      if (inputVal[idx] === targetWord[idx]) {
        cSpan.classList.add('char-correct');
      } else {
        cSpan.classList.add('char-wrong');
      }
    }
    if (idx === inputVal.length) {
      cSpan.classList.add('char-current');
    }
  });

  // Smooth Auto-scroll kata berikutnya
  const elTop = currentWordEl.offsetTop;
  if (elTop > 65) {
    container.style.transform = `translateY(-${elTop - 15}px)`;
  }
}

// Mulai Balapan 60 Detik
function startTypingRace() {
  if (typingState.status === 'running') return;

  typingState.status = 'running';
  typingState.timeLeft = TYPING_TEST_DURATION;
  typingState.lastKeyTime = Date.now();
  typingState.wpmTimeline = [0];

  const liveDot = document.getElementById('arenaLiveDot');
  if (liveDot) liveDot.classList.add('racing');

  const hintText = document.getElementById('arenaHintText');
  if (hintText) hintText.textContent = 'Balapan aktif! Tancap gas dan pertahankan akurasi!';

  if (typingState.timerInterval) clearInterval(typingState.timerInterval);
  typingState.timerInterval = setInterval(() => {
    tickTypingTimer();
  }, 1000);

  if (typingState.physicsInterval) clearInterval(typingState.physicsInterval);
  typingState.physicsInterval = setInterval(() => {
    runTypingPhysics();
  }, 50);

  updateDynamicArenaEffects();
}

// Ticker 1 Detik Timer
function tickTypingTimer() {
  if (typingState.status !== 'running') return;

  typingState.timeLeft--;

  // Mobil melaju di lintasan dari Di Belakang Garis Start (1.5%) menuju Di Depan Garis Finish (73%) seiring durasi 60 detik
  const timeProgress = (TYPING_TEST_DURATION - typingState.timeLeft) / TYPING_TEST_DURATION;
  const carLeft = 1.5 + (timeProgress * 71.5); // 1.5% (Start Grid) -> 73% (Di Depan Garis Finish)
  const elCar = document.getElementById('racerCar');
  if (elCar) {
    elCar.style.left = `${carLeft.toFixed(1)}%`;
  }

  // Update Telemetry HUD Timer
  const timerSecs = document.getElementById('typingTimerDigits') || document.getElementById('liveTimerSeconds');
  if (timerSecs) timerSecs.textContent = typingState.timeLeft;

  const hudProg = document.getElementById('typingTimerProgressBar') || document.getElementById('hudTimerProgressBar');
  if (hudProg) {
    const pct = (typingState.timeLeft / TYPING_TEST_DURATION) * 100;
    hudProg.style.width = `${pct}%`;
    if (typingState.timeLeft <= 10) {
      hudProg.className = 'hud-progress-bar danger';
    } else if (typingState.timeLeft <= 20) {
      hudProg.className = 'hud-progress-bar warning';
    } else {
      hudProg.className = 'hud-progress-bar';
    }
  }

  const trackStatus = document.getElementById('trackStatusText');
  if (trackStatus && typingState.status === 'running') {
    trackStatus.textContent = `Balapan Berlangsung (${typingState.timeLeft}s tersisa)... Gas pol! 🏎️💨`;
  }

  // Rekam timeline WPM setiap 5 detik untuk grafik
  if ((TYPING_TEST_DURATION - typingState.timeLeft) % 5 === 0) {
    typingState.wpmTimeline.push(typingState.currentWpm);
  }

  if (typingState.timeLeft <= 0) {
    finishTypingRace();
  }
}

// Simulasi Fisika Mesin Supercar & Animasi Lintasan Sirkuit
function runTypingPhysics() {
  const speedDiff = typingState.targetSpeedKmh - typingState.currentSpeedKmh;
  typingState.currentSpeedKmh += speedDiff * 0.15;
  if (typingState.currentSpeedKmh < 0.5) typingState.currentSpeedKmh = 0;

  if (typingState.status === 'running') {
    const timeSinceLastKey = Date.now() - typingState.lastKeyTime;
    if (timeSinceLastKey > 1400) {
      typingState.targetSpeedKmh = Math.max(0, typingState.targetSpeedKmh * 0.94);
    }
  } else {
    typingState.targetSpeedKmh = 0;
  }

  if (typingState.currentSpeedKmh > typingState.topSpeedKmh) {
    typingState.topSpeedKmh = typingState.currentSpeedKmh;
  }

  // Jarak tempuh (meter)
  if (typingState.status === 'running') {
    const metersPerTick = (typingState.currentSpeedKmh * (1000 / 3600)) * (50 / 1000);
    typingState.distanceMeters += metersPerTick;
    const elDist = document.getElementById('trackDistanceVal');
    if (elDist) elDist.textContent = Math.round(typingState.distanceMeters);
  }

  const spd = typingState.currentSpeedKmh;

  // Pemetaan Gigi Balap & Turbo Mode
  let gear = 'GEAR 1';
  let isTurbo = false;
  if (spd > 210) { gear = 'NITRO BOOST 🔥'; isTurbo = true; }
  else if (spd > 165) { gear = 'GEAR 6'; }
  else if (spd > 125) { gear = 'GEAR 5'; }
  else if (spd > 85)  { gear = 'GEAR 4'; }
  else if (spd > 50)  { gear = 'GEAR 3'; }
  else if (spd > 20)  { gear = 'GEAR 2'; }
  else if (spd <= 0)  { gear = 'GEAR N'; }

  const elGear = document.getElementById('trackGearBadge');
  if (elGear) {
    elGear.textContent = gear;
    if (isTurbo) elGear.classList.add('turbo-active');
    else elGear.classList.remove('turbo-active');
  }

  // Speedometer HUD Digits
  const speedDigits = document.getElementById('liveSpeedKmh') || document.getElementById('liveSpeedDigits');
  if (speedDigits) speedDigits.textContent = Math.round(spd);

  // Animasi Sirkuit: Garis Jalur, Papan Sponsor, Roda, Api Knalpot, & Efek Kecepatan
  const elRoadStripes = document.getElementById('roadLaneStripes');
  const elSponsors = document.getElementById('sponsorBillboardsStrip');
  const elCar = document.getElementById('racerCar');
  const wheelF = document.getElementById('wheelFront');
  const wheelR = document.getElementById('wheelRear');
  const flameL = document.getElementById('exhaustFlameLeft');
  const flameR = document.getElementById('exhaustFlameRight');
  const streaks = document.getElementById('speedStreaks');

  if (spd > 3) {
    const roadDuration = Math.max(0.12, 45 / spd);
    if (elRoadStripes) {
      elRoadStripes.classList.add('animating');
      elRoadStripes.style.setProperty('--road-speed-duration', `${roadDuration.toFixed(2)}s`);
    }
    if (elSponsors) {
      elSponsors.classList.add('animating');
      elSponsors.style.setProperty('--road-speed-duration', `${(roadDuration * 1.5).toFixed(2)}s`);
    }
    const wheelDuration = Math.max(0.08, 25 / spd);
    if (wheelF) {
      wheelF.classList.add('spinning');
      wheelF.style.setProperty('--wheel-spin-duration', `${wheelDuration.toFixed(2)}s`);
    }
    if (wheelR) {
      wheelR.classList.add('spinning');
      wheelR.style.setProperty('--wheel-spin-duration', `${wheelDuration.toFixed(2)}s`);
    }
    if (elCar) {
      if (spd > 150) {
        elCar.classList.remove('rumble');
        elCar.classList.add('hyper-rumble');
      } else if (spd > 40) {
        elCar.classList.add('rumble');
        elCar.classList.remove('hyper-rumble');
      } else {
        elCar.classList.remove('rumble', 'hyper-rumble');
      }
    }
    if (spd > 140) {
      if (flameL) { flameL.classList.remove('active'); flameL.classList.add('hyper'); }
      if (flameR) { flameR.classList.remove('active'); flameR.classList.add('hyper'); }
    } else if (spd > 65) {
      if (flameL) { flameL.classList.add('active'); flameL.classList.remove('hyper'); }
      if (flameR) { flameR.classList.add('active'); flameR.classList.remove('hyper'); }
    } else {
      if (flameL) flameL.classList.remove('active', 'hyper');
      if (flameR) flameR.classList.remove('active', 'hyper');
    }
    if (streaks) {
      if (spd > 110) streaks.classList.add('active');
      else streaks.classList.remove('active');
    }
  } else {
    if (elRoadStripes) elRoadStripes.classList.remove('animating');
    if (elSponsors) elSponsors.classList.remove('animating');
    if (wheelF) wheelF.classList.remove('spinning');
    if (wheelR) wheelR.classList.remove('spinning');
    if (elCar) elCar.classList.remove('rumble', 'hyper-rumble');
    if (flameL) flameL.classList.remove('active', 'hyper');
    if (flameR) flameR.classList.remove('active', 'hyper');
    if (streaks) streaks.classList.remove('active');
  }
}

// Penanganan Ketikan Tombol
function handleTypingInput(e) {
  const hiddenInput = e.target;
  const val = hiddenInput.value;

  if (typingState.status === 'idle') {
    startTypingRace();
  }

  if (typingState.status !== 'running') {
    hiddenInput.value = '';
    return;
  }

  typingState.lastKeyTime = Date.now();
  typingState.totalKeystrokes++;

  const targetWord = typingState.words[typingState.currentWordIndex] || '';

  // Spasi Ditekan: Selesaikan kata saat ini
  if (val.endsWith(' ')) {
    const trimmedVal = val.trim();
    const container = document.getElementById('wordsStreamContent');
    const wordEl = container ? container.querySelector(`[data-word-idx="${typingState.currentWordIndex}"]`) : null;

    if (trimmedVal === targetWord) {
      typingState.correctWordsCount++;
      typingState.correctChars += targetWord.length + 1;
      typingState.streak++;
      typingState.maxStreak = Math.max(typingState.maxStreak, typingState.streak);
      if (wordEl) {
        wordEl.classList.remove('active-word');
        wordEl.classList.add('word-correct');
      }
      TypingAudioEngine.playKey();

      // Trigger Floating Particles
      if (typingState.streak > 0 && typingState.streak % 10 === 0) {
        spawnTypingParticle(`🔥 ${typingState.streak}x COMBO!`, 'nitro');
        TypingAudioEngine.playNitro();
      } else if (typingState.streak % 5 === 0) {
        spawnTypingParticle(`⚡ ${typingState.streak}x Combo`, 'turbo');
      } else {
        spawnTypingParticle('+1 Kata', 'combo');
      }
    } else {
      typingState.wrongWordsCount++;
      typingState.wrongChars += targetWord.length;
      typingState.streak = 0;
      if (wordEl) {
        wordEl.classList.remove('active-word');
        wordEl.classList.add('word-error');
      }
      TypingAudioEngine.playError();
    }

    typingState.currentWordIndex++;
    typingState.currentInput = '';
    hiddenInput.value = '';

    const nextWordEl = container ? container.querySelector(`[data-word-idx="${typingState.currentWordIndex}"]`) : null;
    if (nextWordEl) {
      nextWordEl.classList.add('active-word');
    }
  } else {
    typingState.currentInput = val;
    TypingAudioEngine.playKey();
  }

  // Kalkulasi Live WPM
  const elapsedMinutes = (TYPING_TEST_DURATION - typingState.timeLeft) / 60;
  if (elapsedMinutes > 0) {
    typingState.currentWpm = Math.round((typingState.correctChars / 5) / elapsedMinutes);
  }

  // Akselerasi Mobil
  typingState.targetSpeedKmh = Math.min(240, Math.max(typingState.currentWpm * 2.2, typingState.targetSpeedKmh + 4.5));

  updateTelemetryUI();
  updateWordStreamDisplay();
  updateDynamicArenaEffects();
}

// Update Indikator Telemetry HUD (Kompak, Efisien, & Cepat)
function updateTelemetryUI() {
  const elWpm = document.getElementById('liveWpmVal');
  if (elWpm) elWpm.textContent = typingState.currentWpm;

  let accPercent = 100;
  if (typingState.totalKeystrokes > 0) {
    accPercent = Math.max(0, Math.min(100, Math.round((typingState.correctChars / typingState.totalKeystrokes) * 1000) / 10));
  }
  const elAccuracy = document.getElementById('liveAccuracyVal');
  if (elAccuracy) elAccuracy.textContent = accPercent.toFixed(accPercent % 1 === 0 ? 0 : 1);

  const accBadge = document.getElementById('liveCharsBadge') || document.getElementById('accStatusBadge');
  if (accBadge) {
    accBadge.textContent = `${typingState.correctChars} B / ${typingState.wrongChars} S`;
  }

  const elStreak = document.getElementById('liveStreakVal');
  if (elStreak) elStreak.textContent = typingState.streak;

  const elStreakLabel = document.getElementById('streakLabel');
  if (elStreakLabel) {
    if (typingState.streak >= 25) elStreakLabel.textContent = 'HYPER NITRO! 🔥';
    else if (typingState.streak >= 10) elStreakLabel.textContent = 'Mantap!';
    else if (typingState.streak > 0) elStreakLabel.textContent = 'Fokus Jalur';
    else elStreakLabel.textContent = 'Start';
  }

  // Live Pace Badge (DRIVER / DRIVER KING indicator)
  const elRankPill = document.getElementById('wpmRankBadge') || document.getElementById('liveRankPill');
  if (elRankPill) {
    if (typingState.currentWpm >= 50 && accPercent >= 100) {
      elRankPill.className = 'hud-pill hud-pill-gold';
      elRankPill.innerHTML = '<i class="fa-solid fa-crown text-yellow"></i> DRIVER KING Pace';
    } else if (typingState.currentWpm >= 35 && accPercent >= 90) {
      elRankPill.className = 'hud-pill hud-pill-cyan';
      elRankPill.innerHTML = '<i class="fa-solid fa-flag-checkered text-cyan"></i> DRIVER Pace';
    } else {
      const rankInfo = getDriverRank(typingState.currentWpm, accPercent);
      elRankPill.className = 'hud-pill';
      elRankPill.textContent = rankInfo.badge;
    }
  }
}

// Selesai Balapan 60 Detik
function finishTypingRace() {
  typingState.status = 'finished';
  if (typingState.timerInterval) clearInterval(typingState.timerInterval);
  if (typingState.physicsInterval) clearInterval(typingState.physicsInterval);

  // Mobil berakhir DI DEPAN garis finish (73%)! (Garis Finish di 65%)
  const elCar = document.getElementById('racerCar');
  if (elCar) {
    elCar.style.left = '73%';
    elCar.classList.remove('rumble', 'hyper-rumble');
  }

  // Hentikan putaran roda, api knalpot, dan animasi pemandangan
  const wheelF = document.getElementById('wheelFront');
  const wheelR = document.getElementById('wheelRear');
  if (wheelF) wheelF.classList.remove('spinning');
  if (wheelR) wheelR.classList.remove('spinning');
  const flameL = document.getElementById('exhaustFlameLeft');
  const flameR = document.getElementById('exhaustFlameRight');
  if (flameL) flameL.classList.remove('active', 'hyper');
  if (flameR) flameR.classList.remove('active', 'hyper');
  const elRoadStripes = document.getElementById('roadLaneStripes');
  if (elRoadStripes) elRoadStripes.classList.remove('animating');
  const elSponsors = document.getElementById('sponsorBillboardsStrip');
  if (elSponsors) elSponsors.classList.remove('animating');
  const streaks = document.getElementById('speedStreaks');
  if (streaks) streaks.classList.remove('active');

  const netWpm = Math.round((typingState.correctChars / 5) / 1.0);
  const grossWpm = Math.round(((typingState.correctChars + typingState.wrongChars) / 5) / 1.0);
  let accuracy = 100;
  if (typingState.totalKeystrokes > 0) {
    accuracy = Math.max(0, Math.min(100, Math.round((typingState.correctChars / typingState.totalKeystrokes) * 1000) / 10));
  }
  const topSpeed = Math.round(typingState.topSpeedKmh);
  const distance = Math.round(typingState.distanceMeters);

  const driverRank = getDriverRank(netWpm, accuracy);
  const carModel = CAR_MODELS[typingState.selectedCar] || CAR_MODELS.ferrari;

  // Evaluasi Target Khusus Driver & Notifikasi:
  // 1. Target melampaui 50 WPM & akurasi minimal 100% -> Notif "DRIVER KING"
  // 2. Target melampaui 35 WPM & akurasi minimal 90% -> Notif "DRIVER"
  let driverTitle = null;
  let driverTitleType = null;

  if (netWpm >= 50 && accuracy >= 100) {
    driverTitle = 'DRIVER KING';
    driverTitleType = 'king';
  } else if (netWpm >= 35 && accuracy >= 90) {
    driverTitle = 'DRIVER';
    driverTitleType = 'driver';
  }

  // Nyalakan selebrasi Garis Finish & Victory Zone
  const finishLine = document.getElementById('circuitFinishLine');
  if (finishLine) {
    finishLine.classList.remove('active-finish-king', 'active-finish-driver', 'active-finish');
    if (driverTitleType === 'king') finishLine.classList.add('active-finish', 'active-finish-king');
    else if (driverTitleType === 'driver') finishLine.classList.add('active-finish', 'active-finish-driver');
    else finishLine.classList.add('active-finish');
  }

  const victoryZone = document.getElementById('circuitVictoryZone');
  if (victoryZone) {
    if (driverTitleType === 'king') {
      victoryZone.innerHTML = '<span class="victory-zone-marker victory-king"><i class="fa-solid fa-crown text-yellow"></i> VICTORY ZONE • DRIVER KING 👑</span>';
    } else if (driverTitleType === 'driver') {
      victoryZone.innerHTML = '<span class="victory-zone-marker victory-driver"><i class="fa-solid fa-flag-checkered text-cyan"></i> VICTORY ZONE • DRIVER 🏎️</span>';
    } else {
      victoryZone.innerHTML = '<span class="victory-zone-marker"><i class="fa-solid fa-trophy text-yellow"></i> VICTORY ZONE</span>';
    }
  }

  const trackStatus = document.getElementById('trackStatusText');
  if (trackStatus) {
    if (driverTitleType === 'king') {
      trackStatus.innerHTML = '<strong class="text-yellow">👑 NOTIFIKASI: DRIVER KING! Target 50+ WPM & Akurasi 100% Berhasil Melampaui!</strong>';
    } else if (driverTitleType === 'driver') {
      trackStatus.innerHTML = '<strong class="text-cyan">🏎️ NOTIFIKASI: DRIVER! Target 35+ WPM & Akurasi ≥90% Berhasil Melampaui!</strong>';
    } else {
      trackStatus.textContent = 'Balapan 60 Detik Selesai! Finish di Depan Garis 🏁';
    }
  }

  // Bunyikan Audio Fanfare dan Munculkan Notifikasi Toast
  if (driverTitleType === 'king') {
    TypingAudioEngine.playKingFanfare();
    showToast(
      'DRIVER KING',
      `👑 LUAR BIASA! Anda melampaui target 50 WPM (${netWpm} WPM) dengan akurasi 100%! Predikat: DRIVER KING!`,
      'success'
    );
  } else if (driverTitleType === 'driver') {
    TypingAudioEngine.playFanfare();
    showToast(
      'DRIVER',
      `🏎️ SELAMAT! Anda melampaui target 35 WPM (${netWpm} WPM) dengan akurasi ${accuracy}% (minimal 90%)! Predikat: DRIVER!`,
      'info'
    );
  } else {
    TypingAudioEngine.playFanfare();
    showToast(
      'Balapan Selesai',
      `🏁 Waktu 60 detik selesai! Kecepatan: ${netWpm} WPM, Akurasi: ${accuracy}%.`,
      'info'
    );
  }

  const currentUser = (typeof state !== 'undefined' && state.currentUser) ? state.currentUser : {
    id: 'usr_guest',
    username: 'guest',
    fullName: 'Pembalap DRIVE',
    role: 'user',
    department: 'Operasional',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };

  const resultRecord = {
    id: 'run_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    userId: currentUser.id,
    username: currentUser.username,
    fullName: currentUser.fullName,
    avatar: currentUser.avatar,
    role: currentUser.role,
    department: currentUser.department || 'Operasional',
    carId: carModel.id,
    carName: carModel.name,
    carTheme: carModel.theme,
    date: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
    timestamp: Date.now(),
    category: typingState.category,
    wpm: netWpm,
    grossWpm,
    accuracy,
    topSpeed,
    correctChars: typingState.correctChars,
    wrongChars: typingState.wrongChars,
    correctWords: typingState.correctWordsCount,
    wrongWords: typingState.wrongWordsCount,
    distance,
    maxStreak: typingState.maxStreak,
    rankTitle: driverRank.title,
    rankBadge: driverRank.badge,
    driverTitle: driverTitle || '-',
    driverTitleType: driverTitleType || null
  };

  const { isNewPb } = saveTypingResult(resultRecord);

  if (typeof state !== 'undefined' && state.addLog) {
    const logDriver = driverTitle ? ` | Notif: ${driverTitle}` : '';
    state.addLog(
      'Typing Test Selesai',
      `${currentUser.fullName} menyelesaikan balapan 60 detik dengan ${carModel.name}: ${netWpm} WPM (${topSpeed} KM/H, akurasi ${accuracy}%, gelar ${driverRank.title}${logDriver}).`,
      driverTitle === 'DRIVER KING' ? 'success' : 'info'
    );
  }

  populateResultModal(resultRecord, driverRank, isNewPb);
  renderTypingHistory();
  renderAdminTypingLeaderboard();

  const modal = document.getElementById('modalTypingResult');
  if (modal) modal.classList.remove('hidden');
}

// Rekapitulasi Hasil Balapan di Modal
function populateResultModal(result, rank, isNewPb) {
  const pbBanner = document.getElementById('newRecordBanner');
  if (pbBanner) {
    if (isNewPb) pbBanner.classList.remove('hidden');
    else pbBanner.classList.add('hidden');
  }

  // Render Driver Title Notification Banner (DRIVER / DRIVER KING)
  const notifBanner = document.getElementById('driverNotifBanner');
  if (notifBanner) {
    if (result.driverTitle === 'DRIVER KING') {
      notifBanner.className = 'driver-notif-banner notif-driver-king';
      notifBanner.innerHTML = `
        <div class="notif-badge-chip">
          <i class="fa-solid fa-crown text-yellow"></i> NOTIFIKASI GELAR PENCAPAIAN
        </div>
        <div class="notif-title-row">
          <span class="notif-title-text">👑 DRIVER KING</span>
          <span class="notif-pill-tag">TARGET 50+ WPM & AKURASI 100% TERCAPAI!</span>
        </div>
        <p class="notif-desc-text">
          Luar biasa! Anda sukses melampaui target dengan kecepatan <strong>${result.wpm} WPM</strong> dan akurasi sempurna <strong>${result.accuracy}%</strong>. Anda dinobatkan sebagai <strong>DRIVER KING</strong> di lintasan DRIVE!
        </p>
      `;
    } else if (result.driverTitle === 'DRIVER') {
      notifBanner.className = 'driver-notif-banner notif-driver';
      notifBanner.innerHTML = `
        <div class="notif-badge-chip">
          <i class="fa-solid fa-flag-checkered text-cyan"></i> NOTIFIKASI GELAR PENCAPAIAN
        </div>
        <div class="notif-title-row">
          <span class="notif-title-text">🏎️ DRIVER</span>
          <span class="notif-pill-tag">TARGET 35+ WPM & AKURASI ≥90% TERCAPAI!</span>
        </div>
        <p class="notif-desc-text">
          Selamat! Anda sukses melampaui target dengan kecepatan <strong>${result.wpm} WPM</strong> (target 35 WPM) dan akurasi <strong>${result.accuracy}%</strong> (target minimal 90%). Anda resmi meraih predikat <strong>DRIVER</strong>!
        </p>
      `;
    } else {
      const wpmDiff = Math.max(0, 35 - result.wpm);
      const accDiff = Math.max(0, 90 - result.accuracy);
      let advice = [];
      if (wpmDiff > 0) advice.push(`+${wpmDiff} WPM`);
      if (accDiff > 0) advice.push(`+${accDiff.toFixed(1)}% akurasi`);
      const adviceText = advice.length > 0 ? `(Butuh: ${advice.join(', ')})` : '';

      notifBanner.className = 'driver-notif-banner notif-target-hint';
      notifBanner.innerHTML = `
        <div class="notif-badge-chip">
          <i class="fa-solid fa-bullseye text-muted"></i> INFO TARGET GELAR
        </div>
        <div class="notif-title-row">
          <span class="notif-title-text" style="font-size: 1.1rem; color: #94a3b8;">Target Gelar Belum Terlampaui ${adviceText}</span>
        </div>
        <p class="notif-desc-text">
          Capai target <strong>≥35 WPM & akurasi minimal 90%</strong> untuk mendapatkan notif <strong>"DRIVER"</strong>, atau target <strong>≥50 WPM & akurasi 100%</strong> untuk mendapatkan notif <strong>"DRIVER KING"</strong>!
        </p>
      `;
    }
  }

  const elRankTitle = document.getElementById('resultRankTitle');
  if (elRankTitle) elRankTitle.textContent = rank.title;

  const elRankDesc = document.getElementById('resultRankDesc');
  if (elRankDesc) elRankDesc.textContent = rank.desc;

  const elRankIcon = document.getElementById('rankTrophyIcon');
  if (elRankIcon) elRankIcon.innerHTML = `<i class="${rank.icon}"></i>`;

  const elNetWpm = document.getElementById('resultNetWpm');
  if (elNetWpm) elNetWpm.textContent = result.wpm;

  const elGrossWpm = document.getElementById('resultGrossWpm');
  if (elGrossWpm) elGrossWpm.textContent = `Gross: ${result.grossWpm} WPM`;

  const elTopSpeed = document.getElementById('resultTopSpeed');
  if (elTopSpeed) elTopSpeed.textContent = result.topSpeed;

  const elAvgSpeed = document.getElementById('resultAvgSpeed');
  if (elAvgSpeed) elAvgSpeed.textContent = `Jarak: ${result.distance} m`;

  const elAccuracy = document.getElementById('resultAccuracy');
  if (elAccuracy) elAccuracy.textContent = result.accuracy;

  const elAccuracySub = document.getElementById('resultAccuracySub');
  if (elAccuracySub) {
    elAccuracySub.textContent = result.accuracy >= 98 ? 'Akurasi Sempurna' : `${result.wrongWords} Kesalahan Typo`;
  }

  const elTotalChars = document.getElementById('resultTotalChars');
  if (elTotalChars) elTotalChars.textContent = result.correctChars + result.wrongChars;

  const elCharsSub = document.getElementById('resultCharsSub');
  if (elCharsSub) elCharsSub.textContent = `${result.correctChars} Benar / ${result.wrongChars} Salah`;

  const elCorrectWords = document.getElementById('resultCorrectWords');
  if (elCorrectWords) elCorrectWords.textContent = `${result.correctWords} Kata`;

  const elWrongWords = document.getElementById('resultWrongWords');
  if (elWrongWords) elWrongWords.textContent = `${result.wrongWords} Kata`;

  const elDistance = document.getElementById('resultDistance');
  if (elDistance) elDistance.textContent = `${result.distance} meter`;

  const elMaxStreak = document.getElementById('resultMaxStreak');
  if (elMaxStreak) elMaxStreak.textContent = `${result.maxStreak}x Beruntun`;

  renderResultChart();
}

function renderResultChart() {
  if (typeof Chart === 'undefined') return;
  const canvas = document.getElementById('typingResultChart');
  if (!canvas) return;

  if (typingState.chartInstance) {
    typingState.chartInstance.destroy();
  }

  const labels = ['0s', '5s', '10s', '15s', '20s', '25s', '30s', '35s', '40s', '45s', '50s', '55s', '60s'];
  let chartData = [...typingState.wpmTimeline];
  while (chartData.length < 13) {
    chartData.push(chartData[chartData.length - 1] || 0);
  }

  const ctx = canvas.getContext('2d');
  typingState.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Kecepatan Mengetik (WPM)',
        data: chartData,
        borderColor: '#e62e44',
        backgroundColor: 'rgba(230, 46, 68, 0.15)',
        fill: true,
        tension: 0.35,
        borderWidth: 2.5,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#e62e44',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} WPM`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8' }
        },
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8' }
        }
      }
    }
  });
}

// Mulai Ulang / Reset Balapan
function resetTypingRace() {
  if (typingState.timerInterval) clearInterval(typingState.timerInterval);
  if (typingState.physicsInterval) clearInterval(typingState.physicsInterval);

  typingState.status = 'idle';
  typingState.timeLeft = TYPING_TEST_DURATION;
  typingState.currentWordIndex = 0;
  typingState.currentInput = '';
  typingState.correctChars = 0;
  typingState.wrongChars = 0;
  typingState.totalKeystrokes = 0;
  typingState.correctWordsCount = 0;
  typingState.wrongWordsCount = 0;
  typingState.streak = 0;
  typingState.maxStreak = 0;
  typingState.currentWpm = 0;
  typingState.currentSpeedKmh = 0;
  typingState.targetSpeedKmh = 0;
  typingState.topSpeedKmh = 0;
  typingState.distanceMeters = 0;
  typingState.wpmTimeline = [];

  typingState.words = generateShuffledWords(typingState.category);
  renderWordsStream();

  // Mobil kembali dengan mulus ke posisi awal di Belakang Garis Start (1.5%)!
  const elCar = document.getElementById('racerCar');
  if (elCar) {
    elCar.style.left = '1.5%';
    elCar.classList.remove('rumble', 'hyper-rumble');
  }

  // Matikan selebrasi Garis Finish & Reset Victory Zone
  const finishLine = document.getElementById('circuitFinishLine');
  if (finishLine) {
    finishLine.classList.remove('active-finish', 'active-finish-king', 'active-finish-driver');
  }

  const victoryZone = document.getElementById('circuitVictoryZone');
  if (victoryZone) {
    victoryZone.innerHTML = '<span class="victory-zone-marker"><i class="fa-solid fa-trophy text-yellow"></i> VICTORY ZONE</span>';
  }

  const trackStatus = document.getElementById('trackStatusText');
  if (trackStatus) {
    trackStatus.textContent = 'Siap di Garis Start (Ketik teks untuk meluncur)';
  }

  // Matikan putaran roda, api, dan lintasan
  const wheelF = document.getElementById('wheelFront');
  const wheelR = document.getElementById('wheelRear');
  if (wheelF) wheelF.classList.remove('spinning');
  if (wheelR) wheelR.classList.remove('spinning');
  const flameL = document.getElementById('exhaustFlameLeft');
  const flameR = document.getElementById('exhaustFlameRight');
  if (flameL) flameL.classList.remove('active', 'hyper');
  if (flameR) flameR.classList.remove('active', 'hyper');
  const elRoadStripes = document.getElementById('roadLaneStripes');
  if (elRoadStripes) elRoadStripes.classList.remove('animating');
  const elSponsors = document.getElementById('sponsorBillboardsStrip');
  if (elSponsors) elSponsors.classList.remove('animating');
  const streaks = document.getElementById('speedStreaks');
  if (streaks) streaks.classList.remove('active');

  // Reset Elemen HUD
  const speedDigits = document.getElementById('liveSpeedKmh') || document.getElementById('liveSpeedDigits');
  if (speedDigits) speedDigits.textContent = '0';

  const timerSecs = document.getElementById('typingTimerDigits') || document.getElementById('liveTimerSeconds');
  if (timerSecs) timerSecs.textContent = TYPING_TEST_DURATION;

  const hudProg = document.getElementById('typingTimerProgressBar') || document.getElementById('hudTimerProgressBar');
  if (hudProg) {
    hudProg.style.width = '100%';
    hudProg.className = 'hud-progress-bar';
  }

  const elDist = document.getElementById('trackDistanceVal');
  if (elDist) elDist.textContent = '0';

  const elGear = document.getElementById('trackGearBadge');
  if (elGear) {
    elGear.textContent = 'GIGI N';
    elGear.classList.remove('turbo-active');
  }

  const liveDot = document.getElementById('arenaLiveDot');
  if (liveDot) liveDot.classList.remove('racing');

  const hintText = document.getElementById('arenaHintText');
  if (hintText) hintText.textContent = 'Ketik kata di bawah ini. Balapan 60 detik otomatis dimulai saat tombol pertama ditekan!';

  const inputEl = document.getElementById('typingHiddenInput');
  if (inputEl) inputEl.value = '';

  updateTelemetryUI();
  updateDynamicArenaEffects();
}

// Render Riwayat Balapan Pribadi
function renderTypingHistory() {
  const history = JSON.parse(localStorage.getItem('drive_typing_history') || '[]');
  const pb = JSON.parse(localStorage.getItem('drive_typing_pb') || 'null');

  const elPbWpm = document.getElementById('pbWpmVal');
  if (elPbWpm) elPbWpm.textContent = pb ? `${pb.wpm} WPM` : '0 WPM';

  const elPbSpeed = document.getElementById('pbSpeedVal');
  if (elPbSpeed) elPbSpeed.textContent = pb ? `${pb.topSpeed} KM/H` : '0 KM/H';

  const elPbAcc = document.getElementById('pbAccuracyVal');
  if (elPbAcc) elPbAcc.textContent = pb ? `${pb.accuracy}%` : '0%';

  const elPbRank = document.getElementById('pbRankVal');
  if (elPbRank) elPbRank.textContent = pb ? pb.rankTitle : '-';

  const tbody = document.getElementById('typingHistoryTableBody');
  if (!tbody) return;

  if (history.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center p-4 text-muted">
          <i class="fa-solid fa-flag-checkered text-red" style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
          Belum ada catatan balapan typing test. Mulai balapan di sirkuit atas sekarang!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = history.slice(0, 10).map((item, idx) => {
    let catLabel = 'Bahasa Indonesia';
    if (item.category === 'id_operations') catLabel = 'Operasional & CS';
    else if (item.category === 'en_speed') catLabel = 'English Speed';

    const carName = item.carName || 'Ferrari SF90';

    let driverBadge = '';
    if (item.driverTitle === 'DRIVER KING' || (item.wpm >= 50 && item.accuracy >= 100)) {
      driverBadge = `<span class="badge-driver-title badge-driver-king"><i class="fa-solid fa-crown text-yellow"></i> DRIVER KING</span> `;
    } else if (item.driverTitle === 'DRIVER' || (item.wpm >= 35 && item.accuracy >= 90)) {
      driverBadge = `<span class="badge-driver-title badge-driver"><i class="fa-solid fa-car-side text-cyan"></i> DRIVER</span> `;
    }

    return `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td><small class="text-muted">${item.date}</small></td>
        <td><span class="car-badge-mini"><i class="fa-solid fa-car-side text-red"></i> ${carName}</span></td>
        <td><span class="badge badge-neutral">${catLabel}</span></td>
        <td><strong class="text-red font-mono">${item.wpm} WPM</strong></td>
        <td><strong class="text-green font-mono">${item.accuracy}%</strong></td>
        <td><strong class="text-yellow font-mono">${item.topSpeed} KM/H</strong></td>
        <td><small>${item.correctChars} / ${item.wrongChars}</small></td>
        <td>${driverBadge}<span class="badge badge-red-outline">${item.rankTitle}</span></td>
      </tr>
    `;
  }).join('');
}

// ==========================================================================
// ADMIN TYPING LEADERBOARD & USER MANAGEMENT
// ==========================================================================

function renderAdminTypingLeaderboard() {
  const section = document.getElementById('adminTypingSection');
  if (!section) return;

  // RBAC Enforcement: Hanya Admin yang dapat melihat dan mengelola Leaderboard Tim
  const isAdmin = (typeof state !== 'undefined' && state.isAdmin && state.isAdmin());
  if (!isAdmin) {
    section.classList.add('hidden');
    return;
  }
  section.classList.remove('hidden');

  seedInitialTeamTypingData();

  const allRuns = JSON.parse(localStorage.getItem('drive_typing_team_results') || '[]');
  const searchInput = document.getElementById('searchAdminTypingUser');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const filterRank = document.getElementById('filterAdminTypingRank')?.value || 'ALL';

  // Kelompokkan hasil per pengguna untuk mencari rekor terbaik masing-masing
  const userMap = {};
  allRuns.forEach(run => {
    const uid = run.userId || run.username || 'unknown';
    if (!userMap[uid]) {
      userMap[uid] = {
        userId: uid,
        username: run.username || uid,
        fullName: run.fullName || run.username || 'Pengguna',
        avatar: run.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        department: run.department || 'CSO',
        runs: [],
        bestWpm: 0,
        bestAccuracy: 0,
        topSpeed: 0,
        totalRuns: 0,
        favCar: '',
        bestRank: null,
        lastRunDate: ''
      };
    }

    userMap[uid].runs.push(run);
    if (run.wpm > userMap[uid].bestWpm) {
      userMap[uid].bestWpm = run.wpm;
    }
    if (run.accuracy > userMap[uid].bestAccuracy) {
      userMap[uid].bestAccuracy = run.accuracy;
    }
    if (run.topSpeed > userMap[uid].topSpeed) {
      userMap[uid].topSpeed = run.topSpeed;
    }
    userMap[uid].totalRuns++;
    userMap[uid].lastRunDate = run.date;
  });

  const userList = Object.values(userMap);

  // Evaluasi Gelar Terbaik, DRIVER Title, & Mobil Favorit per pengguna
  userList.forEach(u => {
    u.bestRank = getDriverRank(u.bestWpm, u.bestAccuracy);
    
    // Evaluasi Gelar Target Pencapaian DRIVER / DRIVER KING
    let bestDriverTitle = '-';
    u.runs.forEach(r => {
      if (r.driverTitle === 'DRIVER KING' || (r.wpm >= 50 && r.accuracy >= 100)) {
        bestDriverTitle = 'DRIVER KING';
      } else if (bestDriverTitle !== 'DRIVER KING' && (r.driverTitle === 'DRIVER' || (r.wpm >= 35 && r.accuracy >= 90))) {
        bestDriverTitle = 'DRIVER';
      }
    });
    u.bestDriverTitle = bestDriverTitle;

    // Cari mobil paling sering dipakai
    const carCounts = {};
    u.runs.forEach(r => {
      const c = r.carName || 'Ferrari SF90';
      carCounts[c] = (carCounts[c] || 0) + 1;
    });
    let topCar = 'Ferrari SF90';
    let maxC = 0;
    Object.keys(carCounts).forEach(c => {
      if (carCounts[c] > maxC) { maxC = carCounts[c]; topCar = c; }
    });
    u.favCar = topCar;
  });

  // Urutkan dari WPM Terbaik Tertinggi ke Terendah (Leaderboard Klasemen)
  userList.sort((a, b) => b.bestWpm - a.bestWpm);

  // Update Overview KPI Chips
  const totalParticipantsEl = document.getElementById('adminTypingTotalParticipants');
  if (totalParticipantsEl) totalParticipantsEl.textContent = `${userList.length} Pengguna`;

  const topUserEl = document.getElementById('adminTypingTopUser');
  if (topUserEl) {
    if (userList.length > 0) {
      topUserEl.textContent = `${userList[0].fullName} (${userList[0].bestWpm} WPM)`;
    } else {
      topUserEl.textContent = '-';
    }
  }

  const avgAccEl = document.getElementById('adminTypingAvgAccuracy');
  if (avgAccEl) {
    if (userList.length > 0) {
      const avg = userList.reduce((acc, curr) => acc + curr.bestAccuracy, 0) / userList.length;
      avgAccEl.textContent = `${avg.toFixed(1)}%`;
    } else {
      avgAccEl.textContent = '0%';
    }
  }

  const totalRunsEl = document.getElementById('adminTypingTotalRuns');
  if (totalRunsEl) totalRunsEl.textContent = `${allRuns.length} Balapan`;

  // Filter pencarian & rank
  const filteredUsers = userList.filter(u => {
    const matchQuery = !query || 
      u.fullName.toLowerCase().includes(query) || 
      u.username.toLowerCase().includes(query) || 
      u.department.toLowerCase().includes(query);
    const matchRank = (filterRank === 'ALL') || (u.bestRank && u.bestRank.title === filterRank);
    return matchQuery && matchRank;
  });

  // Render Tabel Leaderboard
  const tbody = document.getElementById('adminTypingLeaderboardBody');
  if (!tbody) return;

  if (filteredUsers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="11" class="text-center p-4 text-muted">
          <i class="fa-solid fa-users-slash text-gray mb-2" style="font-size: 1.5rem; display:block;"></i>
          Tidak ada pengguna yang cocok dengan kriteria pencarian atau filter gelar.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filteredUsers.map((u, idx) => {
    let posBadge = `<span class="rank-pos-badge rank-pos-other">#${idx + 1}</span>`;
    if (idx === 0) posBadge = `<span class="rank-pos-badge rank-pos-1"><i class="fa-solid fa-crown"></i> 1</span>`;
    else if (idx === 1) posBadge = `<span class="rank-pos-badge rank-pos-2">2</span>`;
    else if (idx === 2) posBadge = `<span class="rank-pos-badge rank-pos-3">3</span>`;

    let driverPill = '';
    if (u.bestDriverTitle === 'DRIVER KING') {
      driverPill = `<span class="badge-driver-title badge-driver-king" title="Melampaui target 50 WPM & Akurasi 100%"><i class="fa-solid fa-crown text-yellow"></i> DRIVER KING</span> `;
    } else if (u.bestDriverTitle === 'DRIVER') {
      driverPill = `<span class="badge-driver-title badge-driver" title="Melampaui target 35 WPM & Akurasi 90%"><i class="fa-solid fa-car-side text-cyan"></i> DRIVER</span> `;
    }

    return `
      <tr>
        <td>${posBadge}</td>
        <td>
          <div class="user-cell-wrap">
            <img src="${u.avatar}" alt="${u.fullName}" class="user-cell-avatar">
            <div class="user-cell-info">
              <span class="user-cell-name">${u.fullName}</span>
              <span class="user-cell-sub">@${u.username}</span>
            </div>
          </div>
        </td>
        <td><span class="badge badge-neutral">${u.department}</span></td>
        <td><span class="car-badge-mini"><i class="fa-solid fa-car text-yellow"></i> ${u.favCar}</span></td>
        <td><strong class="text-red font-mono" style="font-size:1.05rem;">${u.bestWpm} WPM</strong></td>
        <td><strong class="text-green font-mono">${u.bestAccuracy}%</strong></td>
        <td><strong class="text-yellow font-mono">${u.topSpeed} KM/H</strong></td>
        <td><span class="badge badge-neutral font-mono">${u.totalRuns} Sesi</span></td>
        <td>${driverPill}<span class="badge badge-red-outline">${u.bestRank ? u.bestRank.title : '-'}</span></td>
        <td><small class="text-muted">${u.lastRunDate || '-'}</small></td>
        <td style="text-align: center;">
          <div style="display:inline-flex; gap:0.35rem;">
            <button type="button" class="btn btn-sm btn-outline-gray btn-action-view-user-typing" data-uid="${u.userId}" title="Lihat rincian seluruh balapan pengguna ini">
              <i class="fa-solid fa-eye"></i> Detail
            </button>
            <button type="button" class="btn btn-sm btn-outline-red btn-action-delete-user-typing" data-uid="${u.userId}" data-uname="${u.fullName}" title="Hapus seluruh riwayat balapan pengguna ini">
              <i class="fa-solid fa-trash-can"></i> Hapus
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Pasang event listener tombol Detail dan Hapus
  tbody.querySelectorAll('.btn-action-view-user-typing').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const uid = e.currentTarget.getAttribute('data-uid');
      openAdminUserTypingDetail(uid);
    });
  });

  tbody.querySelectorAll('.btn-action-delete-user-typing').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const uid = e.currentTarget.getAttribute('data-uid');
      const uname = e.currentTarget.getAttribute('data-uname');
      deleteUserTypingHistory(uid, uname);
    });
  });
}

// Buka Modal Detail Riwayat Pengguna Khusus Admin
function openAdminUserTypingDetail(userId) {
  const allRuns = JSON.parse(localStorage.getItem('drive_typing_team_results') || '[]');
  const userRuns = allRuns.filter(r => (r.userId || r.username) === userId);

  if (userRuns.length === 0) {
    showToast('Data Tidak Ditemukan', 'Pengguna ini belum memiliki riwayat balapan.', 'info');
    return;
  }

  const first = userRuns[0];
  const avatarEl = document.getElementById('adminDetailUserAvatar');
  if (avatarEl) avatarEl.src = first.avatar || '';

  const nameEl = document.getElementById('adminDetailUserName');
  if (nameEl) nameEl.textContent = first.fullName || first.username;

  const subEl = document.getElementById('adminDetailUserSubtitle');
  if (subEl) subEl.textContent = `@${first.username} • Layanan ${first.department || 'CSO'} • Total ${userRuns.length} sesi balapan`;

  // Hitung stats
  let topWpm = 0;
  let topAcc = 0;
  let topSpeed = 0;
  userRuns.forEach(r => {
    if (r.wpm > topWpm) topWpm = r.wpm;
    if (r.accuracy > topAcc) topAcc = r.accuracy;
    if (r.topSpeed > topSpeed) topSpeed = r.topSpeed;
  });

  const wpmEl = document.getElementById('adminDetailTopWpm');
  if (wpmEl) wpmEl.textContent = `${topWpm} WPM`;

  const accEl = document.getElementById('adminDetailTopAcc');
  if (accEl) accEl.textContent = `${topAcc}%`;

  const spdEl = document.getElementById('adminDetailTopSpeed');
  if (spdEl) spdEl.textContent = `${topSpeed} KM/H`;

  const runsEl = document.getElementById('adminDetailTotalRuns');
  if (runsEl) runsEl.textContent = userRuns.length;

  // Render Table
  const tbody = document.getElementById('adminDetailUserTableBody');
  if (tbody) {
    tbody.innerHTML = userRuns.map((r, idx) => {
      let driverBadge = '';
      if (r.driverTitle === 'DRIVER KING' || (r.wpm >= 50 && r.accuracy >= 100)) {
        driverBadge = `<span class="badge-driver-title badge-driver-king"><i class="fa-solid fa-crown text-yellow"></i> DRIVER KING</span> `;
      } else if (r.driverTitle === 'DRIVER' || (r.wpm >= 35 && r.accuracy >= 90)) {
        driverBadge = `<span class="badge-driver-title badge-driver"><i class="fa-solid fa-car-side text-cyan"></i> DRIVER</span> `;
      }

      return `
        <tr>
          <td><strong>#${idx + 1}</strong></td>
          <td><small class="text-muted">${r.date}</small></td>
          <td><span class="car-badge-mini"><i class="fa-solid fa-car-side text-red"></i> ${r.carName || 'Ferrari SF90'}</span></td>
          <td><span class="badge badge-neutral">${r.category === 'id_operations' ? 'Operasional' : (r.category === 'en_speed' ? 'English' : 'Umum')}</span></td>
          <td><strong class="text-red font-mono">${r.wpm} WPM</strong></td>
          <td><strong class="text-green font-mono">${r.accuracy}%</strong></td>
          <td><strong class="text-yellow font-mono">${r.topSpeed} KM/H</strong></td>
          <td>${driverBadge}<span class="badge badge-red-outline">${r.rankTitle}</span></td>
          <td style="text-align: center;">
            <button type="button" class="btn btn-sm btn-outline-red btn-delete-single-run" data-run-id="${r.id}" title="Hapus sesi ini">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-delete-single-run').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const runId = e.currentTarget.getAttribute('data-run-id');
        deleteSingleRun(runId, userId);
      });
    });
  }

  // Tombol Hapus Seluruh Riwayat Pengguna Ini di Footer Modal
  const btnDeleteAll = document.getElementById('btnAdminDeleteSelectedUserHistory');
  if (btnDeleteAll) {
    btnDeleteAll.onclick = () => {
      deleteUserTypingHistory(userId, first.fullName || first.username);
      closeAdminUserTypingDetailModal();
    };
  }

  const modal = document.getElementById('modalAdminUserTypingDetail');
  if (modal) modal.classList.remove('hidden');
}

function closeAdminUserTypingDetailModal() {
  const modal = document.getElementById('modalAdminUserTypingDetail');
  if (modal) modal.classList.add('hidden');
}

// Hapus Satu Sesi Balapan Tertentu oleh Admin
function deleteSingleRun(runId, userId) {
  if (!confirm('Apakah Anda yakin ingin menghapus sesi balapan ini?')) return;

  let allRuns = JSON.parse(localStorage.getItem('drive_typing_team_results') || '[]');
  allRuns = allRuns.filter(r => r.id !== runId);
  localStorage.setItem('drive_typing_team_results', JSON.stringify(allRuns));

  // Jika menghapus sesi pengguna saat ini, sync juga riwayat lokal
  if (state.currentUser && (state.currentUser.id === userId || state.currentUser.username === userId)) {
    let myHist = JSON.parse(localStorage.getItem('drive_typing_history') || '[]');
    myHist = myHist.filter(r => r.id !== runId);
    localStorage.setItem('drive_typing_history', JSON.stringify(myHist));
    renderTypingHistory();
  }

  if (typeof state !== 'undefined' && state.addLog) {
    state.addLog('Sesi Typing Dihapus', `Admin menghapus 1 sesi typing test (ID: ${runId}).`, 'warning');
  }

  showToast('Sesi Dihapus', 'Sesi balapan berhasil dihapus dari sistem.', 'info');
  openAdminUserTypingDetail(userId);
  renderAdminTypingLeaderboard();
}

// Hapus Seluruh Riwayat Pengguna oleh Admin
function deleteUserTypingHistory(userId, userName) {
  if (!confirm(`Apakah Anda yakin ingin menghapus seluruh riwayat typing test untuk ${userName}? Rekor terbaik dan hasil balapan pengguna ini akan direset dari sistem.`)) {
    return;
  }

  let allRuns = JSON.parse(localStorage.getItem('drive_typing_team_results') || '[]');
  allRuns = allRuns.filter(r => (r.userId || r.username) !== userId);
  localStorage.setItem('drive_typing_team_results', JSON.stringify(allRuns));

  // Jika yang dihapus adalah user yang sedang aktif login, hapus juga PB & history lokalnya
  if (state.currentUser && (state.currentUser.id === userId || state.currentUser.username === userId)) {
    localStorage.removeItem('drive_typing_history');
    localStorage.removeItem('drive_typing_pb');
    renderTypingHistory();
  }

  if (typeof state !== 'undefined' && state.addLog) {
    state.addLog(
      'Riwayat Typing Dihapus',
      `Admin menghapus seluruh catatan riwayat balapan typing test pengguna: ${userName}.`,
      'warning'
    );
  }

  renderAdminTypingLeaderboard();
  showToast('Riwayat Berhasil Dihapus', `Seluruh riwayat balapan untuk ${userName} telah dibersihkan.`, 'success');
}

// Reset Seluruh Riwayat Tim oleh Admin
function resetAllTeamTypingHistory() {
  if (!confirm('PERINGATAN: Apakah Anda yakin ingin menghapus SELURUH riwayat typing test semua anggota tim? Tindakan ini akan mengosongkan seluruh papan klasemen leaderboard.')) {
    return;
  }

  localStorage.setItem('drive_typing_team_results', JSON.stringify([]));

  if (typeof state !== 'undefined' && state.addLog) {
    state.addLog('Reset Riwayat Tim', 'Admin mengosongkan seluruh riwayat balapan typing test tim.', 'danger');
  }

  renderAdminTypingLeaderboard();
  showToast('Leaderboard Direset', 'Seluruh riwayat typing test tim berhasil dibersihkan.', 'success');
}

// Salin Hasil Balapan ke Clipboard
function copyTypingResultToClipboard() {
  const netWpm = document.getElementById('resultNetWpm')?.textContent || '0';
  const topSpeed = document.getElementById('resultTopSpeed')?.textContent || '0';
  const accuracy = document.getElementById('resultAccuracy')?.textContent || '100';
  const rank = document.getElementById('resultRankTitle')?.textContent || 'Pembalap';
  const correctWords = document.getElementById('resultCorrectWords')?.textContent || '0 Kata';
  const distance = document.getElementById('resultDistance')?.textContent || '0 m';

  const user = state.currentUser ? state.currentUser.fullName : 'Pembalap DRIVE';
  const car = CAR_MODELS[typingState.selectedCar]?.name || 'Ferrari SF90';

  const text = `🏎️ HASIL SPEED RACER TYPING TEST (60 DETIK) 🏎️
👤 Pembalap: ${user}
🏎️ Mobil: ${car}
🏆 Gelar: ${rank}
⚡ Kecepatan Ketik: ${netWpm} WPM
🚗 Kecepatan Puncak: ${topSpeed} KM/H
🎯 Akurasi: ${accuracy}%
📝 Kata Benar: ${correctWords}
🏁 Jarak Tempuh: ${distance}
---
Dashboard DRIVE (Reporting, Insight & Visibility of Employee)`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('Rekapitulasi Disalin!', 'Rincian perolehan typing test berhasil disalin ke clipboard.', 'success');
  }).catch(() => {
    showToast('Gagal Menyalin', 'Silakan salin teks secara manual.', 'warning');
  });
}

// Tampilkan Halaman Typing Test
function renderTypingTestPage() {
  if (typingState.status !== 'running') {
    resetTypingRace();
  }
  switchCar(typingState.selectedCar);
  renderTypingHistory();
  renderAdminTypingLeaderboard();
}

// Inisialisasi Seluruh Event Listener Typing Test
function initTypingTest() {
  // 1. Selector Pilihan Mobil Balap
  const selectCar = document.getElementById('selectTypingCar');
  if (selectCar) {
    selectCar.value = typingState.selectedCar;
    selectCar.addEventListener('change', (e) => {
      switchCar(e.target.value);
      const m = CAR_MODELS[e.target.value];
      showToast('Mobil Dipilih', `Mobil balap diubah ke: ${m.name} (${m.theme})`, 'info');
    });
  }

  // 2. Sound Toggle
  const btnSound = document.getElementById('btnTypingSoundToggle');
  const soundIcon = document.getElementById('typingSoundIcon');
  const soundLabel = document.getElementById('typingSoundLabel');
  if (btnSound) {
    if (!typingState.soundEnabled) {
      if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
      if (soundLabel) soundLabel.textContent = 'Suara: Off';
    }
    btnSound.addEventListener('click', () => {
      typingState.soundEnabled = !typingState.soundEnabled;
      localStorage.setItem('drive_typing_sound', typingState.soundEnabled);
      if (soundIcon) soundIcon.className = typingState.soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      if (soundLabel) soundLabel.textContent = typingState.soundEnabled ? 'Suara: On' : 'Suara: Off';
      showToast('Pengaturan Suara', typingState.soundEnabled ? 'Efek suara balapan diaktifkan.' : 'Efek suara dimatikan.', 'info');
    });
  }

  // 3. Category Select
  const selectCat = document.getElementById('selectTypingCategory');
  if (selectCat) {
    selectCat.addEventListener('change', (e) => {
      typingState.category = e.target.value;
      resetTypingRace();
      showToast('Kategori Diubah', `Kategori teks diubah ke: ${selectCat.options[selectCat.selectedIndex].text}`, 'info');
    });
  }

  // 4. Restart / Mulai Ulang
  const btnRestart = document.getElementById('btnTypingRestart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      resetTypingRace();
      showToast('Balapan Direset', 'Sirkuit dan timer 60 detik siap di garis start.', 'info');
    });
  }

  // 5. Input Ketik & Arena Focus
  const hiddenInput = document.getElementById('typingHiddenInput');
  const arenaWrapper = document.getElementById('wordsStreamWrapper');
  const btnFocus = document.getElementById('btnFocusArena');

  if (hiddenInput) {
    hiddenInput.addEventListener('input', handleTypingInput);
  }

  if (arenaWrapper) {
    arenaWrapper.addEventListener('click', () => {
      if (hiddenInput) hiddenInput.focus();
      arenaWrapper.classList.add('focused');
    });
  }

  if (btnFocus) {
    btnFocus.addEventListener('click', () => {
      if (hiddenInput) hiddenInput.focus();
      if (arenaWrapper) arenaWrapper.classList.add('focused');
    });
  }

  // 6. Keyboard Shortcuts: Tab + Enter atau Escape untuk Reset Cepat
  document.addEventListener('keydown', (e) => {
    const isTypingPageActive = document.getElementById('pageTypingTest')?.classList.contains('active') ||
      (typeof state !== 'undefined' && state.currentPage === 'typing-test');
    if (!isTypingPageActive) return;

    if (e.key === 'Escape') {
      resetTypingRace();
      showToast('Balapan Direset', 'Mulai ulang sirkuit (Hotkeys: Esc).', 'info');
    }
  });

  // 7. Modal Hasil Balapan
  const btnCloseModal = document.getElementById('btnCloseTypingResultModal');
  const btnCloseBtn = document.getElementById('btnCloseTypingResultBtn');
  const modal = document.getElementById('modalTypingResult');
  const closeModalFunc = () => {
    if (modal) modal.classList.add('hidden');
  };
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModalFunc);
  if (btnCloseBtn) btnCloseBtn.addEventListener('click', closeModalFunc);

  const btnPlayAgain = document.getElementById('btnTypingPlayAgain');
  if (btnPlayAgain) {
    btnPlayAgain.addEventListener('click', () => {
      closeModalFunc();
      resetTypingRace();
      if (hiddenInput) hiddenInput.focus();
    });
  }

  const btnCopy = document.getElementById('btnCopyTypingResult');
  if (btnCopy) {
    btnCopy.addEventListener('click', copyTypingResultToClipboard);
  }

  // 8. Hapus Riwayat Pribadi Pengguna
  const btnClearHist = document.getElementById('btnClearTypingHistory');
  if (btnClearHist) {
    btnClearHist.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat balapan typing test pribadi Anda?')) {
        localStorage.removeItem('drive_typing_history');
        localStorage.removeItem('drive_typing_pb');
        renderTypingHistory();
        showToast('Riwayat Dihapus', 'Semua catatan riwayat typing test pribadi berhasil dibersihkan.', 'info');
      }
    });
  }

  // 9. Admin Leaderboard Toolbar: Search & Rank Filter
  const searchAdmin = document.getElementById('searchAdminTypingUser');
  if (searchAdmin) {
    searchAdmin.addEventListener('input', () => {
      renderAdminTypingLeaderboard();
    });
  }

  const filterRank = document.getElementById('filterAdminTypingRank');
  if (filterRank) {
    filterRank.addEventListener('change', () => {
      renderAdminTypingLeaderboard();
    });
  }

  // 10. Admin Reset Semua Riwayat Tim
  const btnResetTeam = document.getElementById('btnAdminResetAllTyping');
  if (btnResetTeam) {
    btnResetTeam.addEventListener('click', resetAllTeamTypingHistory);
  }

  // 11. Modal Detail Riwayat Pengguna Khusus Admin
  const btnCloseAdminDetail = document.getElementById('btnCloseAdminUserTypingDetail');
  const btnCloseAdminDetailFooter = document.getElementById('btnCloseAdminDetailFooterBtn');
  if (btnCloseAdminDetail) btnCloseAdminDetail.addEventListener('click', closeAdminUserTypingDetailModal);
  if (btnCloseAdminDetailFooter) btnCloseAdminDetailFooter.addEventListener('click', closeAdminUserTypingDetailModal);

  // Inisialisasi mobil, kata, dan riwayat
  switchCar(typingState.selectedCar);
  typingState.words = generateShuffledWords(typingState.category);
  renderWordsStream();
  renderTypingHistory();
}

// ==========================================
// 15. QUIZ BATTLE: ULTRAMAN ICONNET VS MONSTER
// ==========================================

function escapeQuizHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function playBattleAudio(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'laser') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'monster') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'ultimate') {
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + 1.2);
      });
    } else if (type === 'victory') {
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.15, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + 0.9);
      });
    } else if (type === 'defeat') {
      [330, 293.66, 261.63, 220].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.14);
        gain.gain.setValueAtTime(0.16, now + i * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.14);
        osc.stop(now + 1.0);
      });
    }
  } catch (e) {
    // Audio context may be restricted before user gesture - safely catch
  }
}

const ULTRAMAN_ROSTER = [
  {
    id: 'iconnet',
    name: 'ULTRAMAN ICONNET',
    shortName: 'Iconnet',
    tag: 'Hero 1:1',
    title: 'Pelindung Kecepatan Sinar Fiber Optic',
    image: 'assets/ultraman_iconnet.jpg',
    beamName: 'Spacium Fiber Beam'
  },
  {
    id: 'zero',
    name: 'ULTRAMAN ZERO',
    shortName: 'Zero',
    tag: 'Cosmic Hero',
    title: 'Pejuang Dimensi & Plasma Spark',
    image: 'assets/ultraman_zero.jpg',
    beamName: 'Wide Zero Shot'
  },
  {
    id: 'tiga',
    name: 'ULTRAMAN TIGA',
    shortName: 'Tiga',
    tag: 'Multi-Type',
    title: 'Kekuatan Kuno Cahaya Keemasan',
    image: 'assets/ultraman_tiga.jpg',
    beamName: 'Zeperion Ray'
  },
  {
    id: 'geed',
    name: 'ULTRAMAN GEED',
    shortName: 'Geed',
    tag: 'Primitive',
    title: 'Pengendali Energi Wrecking Burst',
    image: 'assets/ultraman_geed.jpg',
    beamName: 'Wrecking Burst'
  },
  {
    id: 'orb',
    name: 'ULTRAMAN ORB',
    shortName: 'Orb',
    tag: 'Orb Origin',
    title: 'Pendekar Pedang Cahaya Kosmik',
    image: 'assets/ultraman_orb.jpg',
    beamName: 'Orb Supreme Calibur'
  },
  {
    id: 'blazar',
    name: 'ULTRAMAN BLAZAR',
    shortName: 'Blazar',
    tag: 'Spiral Hunter',
    title: 'Pemburu Primal Spiral Star',
    image: 'assets/ultraman_blazar.jpg',
    beamName: 'Spiral Burred'
  }
];

const MONSTER_ROSTER = [
  {
    id: 'giga_lag',
    name: 'MONSTER GIGA LAG',
    shortName: 'Giga Lag',
    tag: 'Kaiju',
    title: 'Perusak Latency & Pemutus Sinyal',
    image: 'assets/monster_giga_lag.jpg',
    attackName: 'Glitch Spike'
  },
  {
    id: 'packet_loss',
    name: 'MONSTER PACKET LOSS',
    shortName: 'Packet Loss',
    tag: 'Glitch Kaiju',
    title: 'Penyerap Fragmentasi Paket Jaringan',
    image: 'assets/monster_packet_loss.jpg',
    attackName: 'Void Disruption'
  },
  {
    id: 'ping_inferno',
    name: 'MONSTER PING INFERNO',
    shortName: 'Ping Inferno',
    tag: 'Fire Kaiju',
    title: 'Pemicu Overheat & Latensi Ekstrem',
    image: 'assets/monster_ping_inferno.jpg',
    attackName: 'Thermal Flare'
  },
  {
    id: 'bandwidth_devourer',
    name: 'BANDWIDTH DEVOURER',
    shortName: 'Devourer',
    tag: 'Abyssal Kaiju',
    title: 'Pemangsa Kapasitas Bandwidth Fiber',
    image: 'assets/monster_bandwidth_devourer.jpg',
    attackName: 'Choke Stream'
  },
  {
    id: 'cyber_glitch',
    name: 'CYBER GLITCH MANTIS',
    shortName: 'Cyber Mantis',
    tag: 'Insectoid Kaiju',
    title: 'Peretas Kode & Pemotong Sinyal Optik',
    image: 'assets/monster_cyber_glitch.jpg',
    attackName: 'Glitch Scythe'
  },
  {
    id: 'latency_titan',
    name: 'LATENCY TITAN',
    shortName: 'Latency Titan',
    tag: 'Golem Kaiju',
    title: 'Raksasa Beban Jaringan & Buffer Bloat',
    image: 'assets/monster_latency_titan.jpg',
    attackName: 'Buffer Quake'
  }
];

const quizState = {
  activeTab: 'battle', // 'battle' | 'leaderboard' | 'adminBank'
  activeUserId: null,
  isFinished: false,
  selectedHeroId: 'iconnet',
  selectedHero: null,
  currentMonster: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  streak: 0,
  maxStreak: 0,
  ultramanHp: 100,
  monsterHp: 100,
  answered: false,
  userAnswers: [],
  startTime: null,
  endTime: null,
  adminSearch: '',
  adminCategory: 'ALL',
  selectedQuestionIds: new Set(),
  editingQuestionId: null,
  historyFilterUser: 'ALL',
  historyFilterOutcome: 'ALL',
  historySearch: '',
  specialAnimTimer: null,
  specialAnimCallback: null
};

function getQuizCurrentUserId() {
  if (typeof state !== 'undefined' && state.currentUser) {
    return state.currentUser.id || state.currentUser.username || 'guest';
  }
  return 'guest';
}

function getQuizUserKey(user) {
  const target = user || (typeof state !== 'undefined' ? state.currentUser : null);
  if (!target) return 'guest';
  return (target.id || target.username || 'guest').toString();
}

function getSelectedQuizHero(targetUserId) {
  const uKey = targetUserId || getQuizUserKey();
  const savedId = (function() {
    try {
      const perUser = localStorage.getItem('quiz_selected_hero_' + uKey);
      if (perUser) return perUser;
      if (uKey === 'guest') {
        const legacy = localStorage.getItem('quiz_selected_hero');
        if (legacy) return legacy;
      }
      return null;
    } catch(e) {
      return null;
    }
  })() || (quizState.activeUserId === uKey ? quizState.selectedHeroId : null) || 'iconnet';
  const found = ULTRAMAN_ROSTER.find(h => h.id === savedId);
  return found || ULTRAMAN_ROSTER[0];
}

function selectQuizHero(heroId, isSilent = false, targetUserId = null) {
  const uKey = targetUserId || getQuizUserKey();
  const hero = ULTRAMAN_ROSTER.find(h => h.id === heroId) || ULTRAMAN_ROSTER[0];
  try {
    localStorage.setItem('quiz_selected_hero_' + uKey, hero.id);
    localStorage.setItem('quiz_selected_hero', hero.id);
  } catch (e) {}

  if (uKey === getQuizUserKey()) {
    quizState.selectedHeroId = hero.id;
    quizState.selectedHero = hero;
    if (typeof saveActiveUserQuizSession === 'function' && !quizState.isFinished) {
      saveActiveUserQuizSession();
    }

    // Update Dropdown Element
    const dropdown = document.getElementById('selectQuizHero');
    if (dropdown && dropdown.value !== hero.id) {
      dropdown.value = hero.id;
    }

    const heroImg = document.getElementById('avatarUltraman');
    if (heroImg) {
      heroImg.src = hero.image;
      heroImg.alt = hero.name;
    }

    const heroNameEl = document.querySelector('#cardUltramanHero .fighter-name');
    if (heroNameEl) heroNameEl.textContent = hero.name;

    const heroTitleEl = document.querySelector('#cardUltramanHero .fighter-title');
    if (heroTitleEl) heroTitleEl.textContent = hero.title;

    const heroTagEl = document.querySelector('#cardUltramanHero .fighter-type-tag');
    if (heroTagEl) heroTagEl.textContent = hero.tag;

    // Outcome cutscene hero actor
    const animHeroImg = document.getElementById('animHeroImg');
    if (animHeroImg) {
      animHeroImg.src = hero.image;
      animHeroImg.alt = hero.name;
    }
  }

  if (!isSilent) {
    showToast('Karakter Ultraman Dipilih', `${hero.name} siap bertarung!`, 'info');
  }
}

function updateBattleMonsterDisplay(randomMonster) {
  if (!randomMonster) return;
  const monsterImg = document.getElementById('avatarMonster');
  if (monsterImg) {
    monsterImg.src = randomMonster.image;
    monsterImg.alt = randomMonster.name;
  }
  const monsterNameEl = document.querySelector('#cardMonsterEnemy .fighter-name');
  if (monsterNameEl) monsterNameEl.textContent = randomMonster.name;
  const monsterTitleEl = document.querySelector('#cardMonsterEnemy .fighter-title');
  if (monsterTitleEl) monsterTitleEl.textContent = randomMonster.title;
  const monsterTagEl = document.querySelector('#cardMonsterEnemy .fighter-type-tag');
  if (monsterTagEl) monsterTagEl.textContent = randomMonster.tag;

  const animMonsterImg = document.getElementById('animMonsterImg');
  if (animMonsterImg) {
    animMonsterImg.src = randomMonster.image;
    animMonsterImg.alt = randomMonster.name;
  }
}

function updateBattleArenaUserHeader() {
  const label = document.getElementById('quizBattleActiveUserLabel');
  if (!label) return;
  const u = (typeof state !== 'undefined' && state.currentUser) ? state.currentUser : null;
  if (u) {
    label.innerHTML = `Misi Perlindungan Jaringan &bull; Akun: <strong>${escapeQuizHtml(u.fullName || u.username)}</strong>`;
  } else {
    label.textContent = 'Misi Perlindungan Jaringan';
  }
}

function applyAnsweredFeedbackUi(choice, q) {
  if (!q) return;
  const isCorrect = (choice === q.correctAnswer);
  const total = quizState.questions.length || 1;
  const curr = quizState.currentIndex;
  const choices = ['A', 'B', 'C', 'D', 'E'];
  choices.forEach(ch => {
    const btn = document.getElementById('btnOption' + ch);
    if (btn) {
      btn.disabled = true;
      const icon = btn.querySelector('.option-feedback-icon');
      if (ch === q.correctAnswer) {
        btn.classList.add('selected-correct');
        if (icon) icon.className = 'option-feedback-icon fa-solid fa-circle-check text-green';
      } else if (ch === choice && !isCorrect) {
        btn.classList.add('selected-wrong');
        if (icon) icon.className = 'option-feedback-icon fa-solid fa-circle-xmark text-red';
      }
    }
  });

  const feedbackBox = document.getElementById('quizFeedbackBox');
  const btnNext = document.getElementById('btnNextQuestion');
  if (btnNext) {
    const isLast = (curr + 1 >= total);
    btnNext.innerHTML = isLast ? 
      '<span>Lihat Animasi &amp; Nilai Akhir</span> <i class="fa-solid fa-trophy text-yellow"></i>' : 
      '<span>Lanjut ke Soal Berikutnya</span> <i class="fa-solid fa-arrow-right"></i>';
  }
  if (feedbackBox) feedbackBox.classList.remove('hidden');
}

function saveActiveUserQuizSession() {
  const uKey = quizState.activeUserId || getQuizUserKey();
  if (!uKey || uKey === 'guest') return;

  if (quizState.isFinished) {
    try {
      localStorage.removeItem('quiz_active_session_' + uKey);
    } catch (e) {}
    return;
  }

  if (!quizState.questions || quizState.questions.length === 0) return;

  const sessionData = {
    userId: uKey,
    selectedHeroId: quizState.selectedHeroId || 'iconnet',
    currentMonster: quizState.currentMonster,
    questions: quizState.questions,
    currentIndex: quizState.currentIndex,
    score: quizState.score,
    correctCount: quizState.correctCount,
    wrongCount: quizState.wrongCount,
    streak: quizState.streak,
    maxStreak: quizState.maxStreak,
    ultramanHp: quizState.ultramanHp,
    monsterHp: quizState.monsterHp,
    answered: quizState.answered,
    userAnswers: quizState.userAnswers,
    startTime: quizState.startTime,
    endTime: quizState.endTime,
    isFinished: false,
    savedAt: Date.now()
  };

  try {
    localStorage.setItem('quiz_active_session_' + uKey, JSON.stringify(sessionData));
  } catch (e) {
    console.warn('Failed to save quiz active session:', e);
  }
}

function loadUserQuizSession(targetUserId) {
  const uKey = targetUserId || getQuizUserKey();
  quizState.activeUserId = uKey;

  dismissSpecialOutcomeAnimation();
  const modal = document.getElementById('modalQuizResult');
  if (modal) modal.classList.add('hidden');

  let savedSession = null;
  try {
    const raw = localStorage.getItem('quiz_active_session_' + uKey);
    if (raw) {
      savedSession = JSON.parse(raw);
    }
  } catch (e) {
    savedSession = null;
  }

  const hero = getSelectedQuizHero(uKey);

  if (savedSession && Array.isArray(savedSession.questions) && savedSession.questions.length > 0 && !savedSession.isFinished && savedSession.currentIndex < savedSession.questions.length) {
    quizState.selectedHeroId = savedSession.selectedHeroId || hero.id;
    quizState.selectedHero = ULTRAMAN_ROSTER.find(h => h.id === quizState.selectedHeroId) || hero;
    quizState.currentMonster = savedSession.currentMonster || MONSTER_ROSTER[0];
    quizState.questions = savedSession.questions;
    quizState.currentIndex = savedSession.currentIndex || 0;
    quizState.score = savedSession.score || 0;
    quizState.correctCount = savedSession.correctCount || 0;
    quizState.wrongCount = savedSession.wrongCount || 0;
    quizState.streak = savedSession.streak || 0;
    quizState.maxStreak = savedSession.maxStreak || 0;
    quizState.ultramanHp = (typeof savedSession.ultramanHp === 'number') ? savedSession.ultramanHp : 100;
    quizState.monsterHp = (typeof savedSession.monsterHp === 'number') ? savedSession.monsterHp : 100;
    quizState.answered = !!savedSession.answered;
    quizState.userAnswers = Array.isArray(savedSession.userAnswers) ? savedSession.userAnswers : [];
    quizState.startTime = savedSession.startTime || Date.now();
    quizState.endTime = savedSession.endTime || null;
    quizState.isFinished = false;

    selectQuizHero(quizState.selectedHero.id, true, uKey);
    updateBattleMonsterDisplay(quizState.currentMonster);
    updateBattleHpDisplay();
    updateBattleArenaUserHeader();
    renderHeroSelector();
    renderCurrentQuizQuestion();

    if (quizState.answered && quizState.userAnswers.length > quizState.currentIndex) {
      const lastAns = quizState.userAnswers[quizState.currentIndex];
      if (lastAns) {
        applyAnsweredFeedbackUi(lastAns.userChoice, lastAns.question);
      }
    }
    return true;
  } else {
    startQuizBattle();
    return false;
  }
}

function syncQuizUserSession() {
  const currentUserId = getQuizCurrentUserId();
  if (quizState.activeUserId !== currentUserId) {
    if (quizState.activeUserId && !quizState.isFinished) {
      saveActiveUserQuizSession();
    }
    loadUserQuizSession(currentUserId);
  }
}

function renderHeroSelector() {
  const dropdown = document.getElementById('selectQuizHero');
  if (!dropdown) return;

  const currentHero = quizState.selectedHero || getSelectedQuizHero();

  dropdown.innerHTML = ULTRAMAN_ROSTER.map(hero => `
    <option value="${hero.id}">${hero.name} (${hero.tag})</option>
  `).join('');

  dropdown.value = currentHero.id;

  if (!dropdown.dataset.bound) {
    dropdown.addEventListener('change', (e) => {
      selectQuizHero(e.target.value);
    });
    dropdown.dataset.bound = 'true';
  }
}

function switchQuizTab(tabName) {
  if (tabName === 'adminBank' && !state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Administrator yang dapat mengelola bank soal kuis.', 'warning');
    tabName = 'battle';
  }

  quizState.activeTab = tabName;

  const btnBattle = document.getElementById('btnTabQuizBattle');
  const btnLeaderboard = document.getElementById('btnTabQuizLeaderboard');
  const btnAdminBank = document.getElementById('btnTabQuizAdminBank');

  const secBattle = document.getElementById('quizTabBattleSection');
  const secLeaderboard = document.getElementById('quizTabLeaderboardSection');
  const secAdminBank = document.getElementById('quizTabAdminBankSection');

  if (btnBattle) {
    btnBattle.className = tabName === 'battle' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-gray';
  }
  if (btnLeaderboard) {
    btnLeaderboard.className = tabName === 'leaderboard' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-gray';
  }
  if (btnAdminBank) {
    btnAdminBank.className = tabName === 'adminBank' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-gray';
  }

  if (secBattle) secBattle.classList.toggle('hidden', tabName !== 'battle');
  if (secLeaderboard) secLeaderboard.classList.toggle('hidden', tabName !== 'leaderboard');
  if (secAdminBank) secAdminBank.classList.toggle('hidden', tabName !== 'adminBank');

  if (tabName === 'leaderboard') {
    renderQuizLeaderboard();
  } else if (tabName === 'adminBank') {
    renderQuizAdminQuestions();
  }
}

function renderQuizPage() {
  const isAdmin = state.isAdmin();
  const currentUserId = getQuizCurrentUserId();
  const quizPermissionBanner = document.getElementById('quizPermissionBanner');
  const btnTabQuizAdminBank = document.getElementById('btnTabQuizAdminBank');
  const btnOpenAdd = document.getElementById('btnOpenAddQuestionModal');
  const quizTitleThemeSuffix = document.getElementById('quizTitleThemeSuffix');
  const quizPageDesc = document.getElementById('quizPageDesc');

  // 1. Suffix ": Ultraman Iconnet vs Monster" hidden pada user & admin
  if (quizTitleThemeSuffix) {
    quizTitleThemeSuffix.classList.add('hidden');
  }

  // 2. Deskripsi kuis bertema hidden pada user & admin
  if (quizPageDesc) {
    quizPageDesc.classList.add('hidden');
  }

  // 3. Tab "Kelola Bank Soal" hidden pada user
  if (btnTabQuizAdminBank) {
    btnTabQuizAdminBank.classList.toggle('hidden', !isAdmin);
  }
  if (btnOpenAdd) {
    btnOpenAdd.classList.toggle('hidden', !isAdmin);
  }

  // 4. Banner "Otoritas Akses Kuis..." hidden pada user & admin
  if (quizPermissionBanner) {
    quizPermissionBanner.classList.add('hidden');
  }

  if (quizState.activeTab === 'adminBank' && !isAdmin) {
    quizState.activeTab = 'battle';
  }

  switchQuizTab(quizState.activeTab);

  updateBattleArenaUserHeader();

  // Strict User Isolation: Ensure quiz session & hero belong to active user
  if (quizState.activeUserId !== currentUserId) {
    loadUserQuizSession(currentUserId);
  } else {
    renderHeroSelector();
    if (quizState.activeTab === 'battle' && (!quizState.questions || quizState.questions.length === 0)) {
      startQuizBattle();
    }
  }
}

function startQuizBattle() {
  const uKey = getQuizCurrentUserId();
  const bank = state.getQuizQuestions();
  if (!bank || bank.length === 0) {
    state.saveQuizQuestions(DEFAULT_QUIZ_QUESTIONS);
    quizState.questions = [...DEFAULT_QUIZ_QUESTIONS];
  } else {
    quizState.questions = [...bank];
  }

  quizState.activeUserId = uKey;

  // Randomize Monster Kaiju from roster
  const randomMonster = MONSTER_ROSTER[Math.floor(Math.random() * MONSTER_ROSTER.length)];
  quizState.currentMonster = randomMonster;

  // Apply selected Ultraman Hero for THIS user
  const hero = getSelectedQuizHero(uKey);
  quizState.selectedHeroId = hero.id;
  quizState.selectedHero = hero;
  selectQuizHero(hero.id, true, uKey);

  // Update monster in arena
  updateBattleMonsterDisplay(randomMonster);

  quizState.currentIndex = 0;
  quizState.score = 0;
  quizState.correctCount = 0;
  quizState.wrongCount = 0;
  quizState.streak = 0;
  quizState.maxStreak = 0;
  quizState.ultramanHp = 100;
  quizState.monsterHp = 100;
  quizState.answered = false;
  quizState.userAnswers = [];
  quizState.startTime = Date.now();
  quizState.endTime = null;
  quizState.isFinished = false;

  saveActiveUserQuizSession();

  updateBattleHpDisplay();
  updateBattleArenaUserHeader();

  // Hidden initially per user request: "Monster Giga Lag terdeteksi mengganggu kestabilan jaringan! Pilih jawaban tepat (A-E) untuk menyerang!"
  const bubble = document.getElementById('battleAnnouncer');
  const txt = document.getElementById('battleAnnouncerText');
  if (txt) txt.textContent = '';
  if (bubble) bubble.className = 'battle-announcer-bubble hidden';

  renderHeroSelector();
  renderCurrentQuizQuestion();
}

function updateBattleHpDisplay() {
  const heroBar = document.getElementById('ultramanHpBar');
  const heroLabel = document.getElementById('ultramanHpLabel');
  const heroTimer = document.getElementById('ultramanColorTimer');
  const monsterBar = document.getElementById('monsterHpBar');
  const monsterLabel = document.getElementById('monsterHpLabel');

  const uHp = Math.max(0, Math.min(100, Math.round(quizState.ultramanHp)));
  const mHp = Math.max(0, Math.min(100, Math.round(quizState.monsterHp)));

  if (heroBar) heroBar.style.width = uHp + '%';
  if (heroLabel) heroLabel.textContent = `${uHp} / 100 HP`;

  if (monsterBar) monsterBar.style.width = mHp + '%';
  if (monsterLabel) monsterLabel.textContent = `${mHp} / 100 HP`;

  if (heroTimer) {
    if (uHp <= 35) {
      heroTimer.classList.add('blinking-red');
    } else {
      heroTimer.classList.remove('blinking-red');
    }
  }
}

function setBattleAnnouncer(text, type = 'neutral') {
  const bubble = document.getElementById('battleAnnouncer');
  const txt = document.getElementById('battleAnnouncerText');
  if (txt) txt.textContent = text;
  if (bubble) {
    bubble.className = 'battle-announcer-bubble ' + (type === 'hero' ? 'announcer-hero' : type === 'monster' ? 'announcer-monster' : '');
  }
}

function triggerHeroAttackFx(damage) {
  playBattleAudio('laser');
  const beam = document.getElementById('spaciumBeamFx');
  const monsterCard = document.getElementById('cardMonsterEnemy');
  const monsterDamageFloat = document.getElementById('monsterDamageFloat');

  if (beam) {
    beam.classList.remove('hidden');
    beam.classList.remove('firing');
    void beam.offsetWidth;
    beam.classList.add('firing');
    setTimeout(() => beam.classList.add('hidden'), 700);
  }

  if (monsterDamageFloat) {
    monsterDamageFloat.textContent = '';
    monsterDamageFloat.className = 'floating-damage-box hidden';
  }

  if (monsterCard) {
    setTimeout(() => {
      monsterCard.classList.add('card-hit-shake');
      setTimeout(() => monsterCard.classList.remove('card-hit-shake'), 400);
    }, 250);
  }
}

function triggerMonsterAttackFx(damage) {
  playBattleAudio('monster');
  const strike = document.getElementById('monsterStrikeFx');
  const heroCard = document.getElementById('cardUltramanHero');
  const heroDamageFloat = document.getElementById('ultramanDamageFloat');

  if (strike) {
    strike.classList.remove('hidden');
    strike.classList.remove('firing');
    void strike.offsetWidth;
    strike.classList.add('firing');
    setTimeout(() => strike.classList.add('hidden'), 700);
  }

  if (heroDamageFloat) {
    heroDamageFloat.textContent = '';
    heroDamageFloat.className = 'floating-damage-box hidden';
  }

  if (heroCard) {
    setTimeout(() => {
      heroCard.classList.add('card-hit-shake');
      setTimeout(() => heroCard.classList.remove('card-hit-shake'), 400);
    }, 250);
  }
}

function renderCurrentQuizQuestion() {
  const total = quizState.questions.length;
  const curr = quizState.currentIndex;
  quizState.answered = false;

  const q = quizState.questions[curr];
  if (!q) {
    triggerQuizFinishWithSpecialAnim();
    return;
  }

  const progressText = document.getElementById('quizProgressText');
  const liveScoreText = document.getElementById('quizLiveScoreText');
  const streakText = document.getElementById('quizStreakText');
  const categoryBadge = document.getElementById('quizQuestionCategory');
  const pointBadge = document.getElementById('quizQuestionPointBadge');
  const progressFill = document.getElementById('quizQuestionProgressFill');
  const promptEl = document.getElementById('quizQuestionPrompt');
  const feedbackBox = document.getElementById('quizFeedbackBox');

  if (progressText) progressText.textContent = `${curr + 1} / ${total}`;
  if (liveScoreText) liveScoreText.textContent = `${quizState.score} Poin`;
  if (streakText) streakText.textContent = `${quizState.streak}x`;
  let catIcon = 'fa-circle-info';
  let catColor = 'text-cyan';
  if (q.category === 'Keluhan') {
    catIcon = 'fa-comments';
    catColor = 'text-yellow';
  } else if (q.category === 'Gangguan') {
    catIcon = 'fa-triangle-exclamation';
    catColor = 'text-red';
  }
  if (categoryBadge) categoryBadge.innerHTML = `<i class="fa-solid ${catIcon} ${catColor}"></i> ${escapeQuizHtml(q.category || 'Informasi')}`;
  
  const pointsPerQuestion = Math.round(100 / total);
  if (pointBadge) pointBadge.innerHTML = `<i class="fa-solid fa-star text-yellow"></i> +${pointsPerQuestion} Poin`;

  if (progressFill) {
    const pct = Math.round(((curr) / total) * 100);
    progressFill.style.width = pct + '%';
  }

  if (promptEl) promptEl.textContent = q.prompt;

  // 5 Choices A, B, C, D, E
  const choices = ['A', 'B', 'C', 'D', 'E'];
  choices.forEach(ch => {
    const btn = document.getElementById('btnOption' + ch);
    const txt = document.getElementById('textOption' + ch);
    if (btn && txt) {
      btn.className = 'quiz-option-btn';
      btn.disabled = false;
      txt.textContent = (q.options && q.options[ch]) ? q.options[ch] : '-';
      const icon = btn.querySelector('.option-feedback-icon');
      if (icon) icon.className = 'option-feedback-icon fa-solid';
    }
  });

  if (feedbackBox) feedbackBox.classList.add('hidden');
}

function handleSelectQuizOption(choice) {
  if (quizState.answered) return;
  quizState.answered = true;

  const total = quizState.questions.length;
  const curr = quizState.currentIndex;
  const q = quizState.questions[curr];
  const isCorrect = (choice === q.correctAnswer);

  const pointsPerQuestion = Math.round(100 / total);
  const damagePerQuestion = 100 / total;

  // 5 Choices A, B, C, D, E feedback
  const choices = ['A', 'B', 'C', 'D', 'E'];
  choices.forEach(ch => {
    const btn = document.getElementById('btnOption' + ch);
    if (btn) {
      btn.disabled = true;
      const icon = btn.querySelector('.option-feedback-icon');
      if (ch === q.correctAnswer) {
        btn.classList.add('selected-correct');
        if (icon) icon.className = 'option-feedback-icon fa-solid fa-circle-check text-green';
      } else if (ch === choice && !isCorrect) {
        btn.classList.add('selected-wrong');
        if (icon) icon.className = 'option-feedback-icon fa-solid fa-circle-xmark text-red';
      }
    }
  });

  const currentHero = quizState.selectedHero || getSelectedQuizHero();
  const currentMonster = quizState.currentMonster || MONSTER_ROSTER[0];
  const heroBeam = currentHero.beamName || 'Spacium Beam';
  const monsterAttack = currentMonster.attackName || 'Serangan Monster';

  if (isCorrect) {
    quizState.correctCount++;
    quizState.score += pointsPerQuestion;
    quizState.streak++;
    if (quizState.streak > quizState.maxStreak) quizState.maxStreak = quizState.streak;
    quizState.monsterHp = Math.max(0, quizState.monsterHp - damagePerQuestion);

    triggerHeroAttackFx(damagePerQuestion);
    setBattleAnnouncer(`SERANGAN TELAK! ${heroBeam} ${currentHero.name} melumpuhkan ${currentMonster.name}!`, 'hero');
  } else {
    quizState.wrongCount++;
    quizState.streak = 0;
    quizState.ultramanHp = Math.max(0, quizState.ultramanHp - damagePerQuestion);

    triggerMonsterAttackFx(damagePerQuestion);
    setBattleAnnouncer(`WASPADA! ${currentMonster.name} melancarkan ${monsterAttack} ke ${currentHero.name}!`, 'monster');
  }

  updateBattleHpDisplay();

  quizState.userAnswers.push({
    question: q,
    userChoice: choice,
    isCorrect,
    pointsEarned: isCorrect ? pointsPerQuestion : 0
  });

  saveActiveUserQuizSession();

  const feedbackBox = document.getElementById('quizFeedbackBox');
  const btnNext = document.getElementById('btnNextQuestion');

  if (btnNext) {
    const isLast = (curr + 1 >= total);
    btnNext.innerHTML = isLast ? 
      '<span>Lihat Animasi &amp; Nilai Akhir</span> <i class="fa-solid fa-trophy text-yellow"></i>' : 
      '<span>Lanjut ke Soal Berikutnya</span> <i class="fa-solid fa-arrow-right"></i>';
  }
  if (feedbackBox) feedbackBox.classList.remove('hidden');

  const liveScoreText = document.getElementById('quizLiveScoreText');
  const streakText = document.getElementById('quizStreakText');
  if (liveScoreText) liveScoreText.textContent = `${quizState.score} Poin`;
  if (streakText) streakText.textContent = `${quizState.streak}x`;
}

function nextQuizQuestion() {
  const total = quizState.questions.length;
  if (quizState.currentIndex + 1 >= total) {
    triggerQuizFinishWithSpecialAnim();
  } else {
    quizState.currentIndex++;
    quizState.answered = false;
    saveActiveUserQuizSession();
    renderCurrentQuizQuestion();
  }
}

// Menjalankan animasi special sesuai ketentuan nilai:
// - Nilai di bawah 85: KALAH (animasi kekalahan Ultraman dan raungan monster)
// - Nilai di atas 85: MENANG (animasi Spacium Beam menumbangkan monster)
// - Nilai 100: SEMPURNA dengan mengeluarkan JURUS ULTIMATE (animasi kosmik pamungkas)
function triggerQuizFinishWithSpecialAnim() {
  const total = quizState.questions.length || 1;
  const rawScore = (quizState.correctCount / total) * 100;
  const finalScore = Math.round(rawScore);
  const outcome = (finalScore === 100 ? 'ultimate' : (finalScore >= 85 ? 'menang' : 'kalah'));

  playSpecialOutcomeAnimation(outcome, finalScore, () => {
    finishQuizBattle(outcome, finalScore);
  });
}

function playSpecialOutcomeAnimation(outcome, finalScore, onFinish) {
  const overlay = document.getElementById('quizSpecialAnimOverlay');
  if (!overlay) {
    if (typeof onFinish === 'function') onFinish();
    return;
  }

  if (quizState.specialAnimTimer) {
    clearTimeout(quizState.specialAnimTimer);
    quizState.specialAnimTimer = null;
  }
  quizState.specialAnimCallback = onFinish;

  overlay.classList.remove('anim-state-defeat', 'anim-state-victory', 'anim-state-ultimate', 'hidden');

  const eventBadge = document.getElementById('animEventBadge');
  const badgeText = document.getElementById('animEventBadgeText');
  const headline = document.getElementById('animHeadline');
  const subhead = document.getElementById('animSubhead');
  const detail = document.getElementById('animDetail');
  const scoreCard = document.getElementById('animScoreCard');
  const announcementBox = document.getElementById('animAnnouncementBox');
  const centerClash = document.getElementById('animCenterClash');
  const vsBadge = document.getElementById('animVsBadge');
  const monsterFighter = document.getElementById('animFighterMonster');
  const heroFighter = document.getElementById('animFighterHero');
  const heroLabel = document.querySelector('#animFighterHero .anim-fighter-label');
  const monsterLabel = document.querySelector('#animFighterMonster .anim-fighter-label');

  const hero = quizState.selectedHero || getSelectedQuizHero();
  const monster = quizState.currentMonster || MONSTER_ROSTER[0];

  const animHeroImg = document.getElementById('animHeroImg');
  if (animHeroImg) {
    animHeroImg.src = hero.image;
    animHeroImg.alt = hero.name;
  }

  const animMonsterImg = document.getElementById('animMonsterImg');
  if (animMonsterImg) {
    animMonsterImg.src = monster.image;
    animMonsterImg.alt = monster.name;
  }

  if (outcome === 'ultimate') {
    overlay.classList.add('anim-state-ultimate');
    // 1. Hidden badge atas
    if (eventBadge) eventBadge.classList.add('hidden');

    // 2. Hapus gambar "VS", center clash, dan monster
    if (vsBadge) vsBadge.classList.add('hidden');
    if (centerClash) centerClash.classList.add('hidden');
    if (monsterFighter) monsterFighter.classList.add('hidden');

    // 3. Hapus kotak "ULTIMATE Sempurna 100" & announcement box
    if (scoreCard) scoreCard.classList.add('hidden');
    if (announcementBox) announcementBox.classList.add('hidden');
    if (subhead) subhead.classList.add('hidden');
    if (detail) detail.classList.add('hidden');

    // 4. Cukup hanya tampilkan animasi Ultraman bertuliskan "ULTIMATE" warna biru font petir
    if (heroFighter) heroFighter.classList.remove('hidden');
    if (heroLabel) {
      heroLabel.className = 'anim-fighter-label text-lightning-blue ultimate-standalone-label';
      heroLabel.innerHTML = '<i class="fa-solid fa-bolt-lightning"></i> ULTIMATE <i class="fa-solid fa-bolt-lightning"></i>';
    }
    if (monsterLabel) {
      monsterLabel.className = 'anim-fighter-label';
      monsterLabel.textContent = monster.name;
    }
    playBattleAudio('ultimate');
  } else if (outcome === 'menang') {
    overlay.classList.add('anim-state-victory');
    // 1. Hidden badge atas
    if (eventBadge) eventBadge.classList.add('hidden');

    // 2. Hapus gambar "VS", center clash, dan MONSTER GIGA LAG
    if (vsBadge) vsBadge.classList.add('hidden');
    if (centerClash) centerClash.classList.add('hidden');
    if (monsterFighter) monsterFighter.classList.add('hidden');

    // 3. Hapus kotak "MONSTER GIGA LAG", score card & announcement box
    if (scoreCard) scoreCard.classList.add('hidden');
    if (announcementBox) announcementBox.classList.add('hidden');
    if (subhead) subhead.classList.add('hidden');
    if (detail) detail.classList.add('hidden');

    // 4. Cukup hanya tampilkan animasi ULTRAMAN bertuliskan "MENANG" warna hijau font aurora
    if (heroFighter) heroFighter.classList.remove('hidden');
    if (heroLabel) {
      heroLabel.className = 'anim-fighter-label text-aurora-green victory-standalone-label';
      heroLabel.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> MENANG <i class="fa-solid fa-wand-magic-sparkles"></i>';
    }
    if (monsterLabel) {
      monsterLabel.className = 'anim-fighter-label';
      monsterLabel.textContent = monster.name;
    }
    playBattleAudio('victory');
  } else {
    overlay.classList.add('anim-state-defeat');
    // 1. Hidden badge atas
    if (eventBadge) eventBadge.classList.add('hidden');

    // 2. Hapus gambar "VS", center clash, dan Ultraman
    if (vsBadge) vsBadge.classList.add('hidden');
    if (centerClash) centerClash.classList.add('hidden');
    if (heroFighter) heroFighter.classList.add('hidden');

    // 3. Hapus kotak "kalah" & announcement box
    if (scoreCard) scoreCard.classList.add('hidden');
    if (announcementBox) announcementBox.classList.add('hidden');
    if (subhead) subhead.classList.add('hidden');
    if (detail) detail.classList.add('hidden');

    // 4. Cukup hanya tampilkan animasi MONSTER bertuliskan "Kalah" warna merah font api
    if (monsterFighter) monsterFighter.classList.remove('hidden');
    if (monsterLabel) {
      monsterLabel.className = 'anim-fighter-label text-fire-red defeat-standalone-label';
      monsterLabel.innerHTML = '<i class="fa-solid fa-fire"></i> Kalah <i class="fa-solid fa-fire"></i>';
    }
    if (heroLabel) {
      heroLabel.textContent = hero.name;
      heroLabel.className = 'anim-fighter-label';
    }
    playBattleAudio('defeat');
  }

  // Otomatis tutup animasi dan buka dialog hasil setelah 4.2 detik
  quizState.specialAnimTimer = setTimeout(() => {
    dismissSpecialOutcomeAnimation();
  }, 4200);
}

function dismissSpecialOutcomeAnimation() {
  if (quizState.specialAnimTimer) {
    clearTimeout(quizState.specialAnimTimer);
    quizState.specialAnimTimer = null;
  }
  const overlay = document.getElementById('quizSpecialAnimOverlay');
  if (overlay) overlay.classList.add('hidden');

  const cb = quizState.specialAnimCallback;
  quizState.specialAnimCallback = null;
  if (typeof cb === 'function') {
    cb();
  }
}

function finishQuizBattle(resolvedOutcome, resolvedScore) {
  quizState.endTime = Date.now();
  quizState.isFinished = true;
  saveActiveUserQuizSession();
  const total = quizState.questions.length || 1;
  const rawScore = (quizState.correctCount / total) * 100;
  const finalScore = (resolvedScore !== undefined ? resolvedScore : Math.round(rawScore));
  const durationSec = Math.round((quizState.endTime - (quizState.startTime || quizState.endTime)) / 1000);
  const durationStr = `${String(Math.floor(durationSec / 60)).padStart(2, '0')}:${String(durationSec % 60).padStart(2, '0')}`;

  let outcome = resolvedOutcome;
  if (!outcome) {
    if (finalScore === 100) {
      outcome = 'ultimate';
    } else if (finalScore >= 85) {
      outcome = 'menang';
    } else {
      outcome = 'kalah';
    }
  }

  let monsterStatus = 'Masih Mendominasi Jaringan';
  if (outcome === 'ultimate') {
    monsterStatus = 'Lenyap Tereliminasi Total (Jurus Ultimate)';
  } else if (outcome === 'menang') {
    monsterStatus = 'Tumbang Terkalahkan (Spacium Beam)';
  } else {
    monsterStatus = 'Masih Bertahan (Ultraman Kehabisan Energi)';
  }

  const modal = document.getElementById('modalQuizResult');
  const resultHeader = document.getElementById('quizResultHeader');
  const resultTitle = document.getElementById('quizResultTitle');
  const outcomeBadge = document.getElementById('quizResultOutcomeBadge');
  const outcomeDesc = document.getElementById('quizResultOutcomeDesc');
  const ultimateBanner = document.getElementById('quizUltimateBanner');
  const scoreCard = document.getElementById('quizResultScoreCard');
  const monsterStatItem = document.getElementById('resultStatItemMonster');
  const durationStatItem = document.getElementById('resultStatItemDuration');
  const correctCountEl = document.getElementById('quizResultCorrectCount');
  const wrongCountEl = document.getElementById('quizResultWrongCount');
  const durationEl = document.getElementById('quizResultDuration');
  const monsterStatusEl = document.getElementById('quizResultMonsterStatus');
  const reviewCountBadge = document.getElementById('quizReviewCountBadge');
  const reviewList = document.getElementById('quizReviewList');

  if (correctCountEl) correctCountEl.textContent = `${quizState.correctCount} Soal`;
  if (wrongCountEl) wrongCountEl.textContent = `${quizState.wrongCount} Soal`;
  if (durationEl) durationEl.textContent = durationStr;
  if (monsterStatusEl) monsterStatusEl.textContent = monsterStatus;
  if (reviewCountBadge) reviewCountBadge.textContent = `${total} Soal Dievaluasi`;

  if (outcome === 'ultimate') {
    // 1. Hidden "SEMPURNA 100% • JURUS ULTIMATE AKTIF!"
    if (outcomeBadge) outcomeBadge.classList.add('hidden');
    // 2. Hidden "Pertarungan Selesai!"
    if (resultTitle) resultTitle.classList.add('hidden');
    // 3. Hidden "Sensasional! Seluruh soal kuis dijawab sempurna..."
    if (outcomeDesc) outcomeDesc.classList.add('hidden');
    if (resultHeader) resultHeader.classList.add('header-ultimate-clean');

    // 4. Hidden kotak "jurus pamungkas aktif"
    if (ultimateBanner) ultimateBanner.classList.add('hidden');

    // 5. Hidden "Dampak Monster: Lenyap Tereliminasi Total (Jurus Ultimate)"
    if (monsterStatItem) monsterStatItem.classList.add('hidden');
    if (durationStatItem) durationStatItem.classList.add('result-stat-item-full');

    // 6. Ubah "100 NILAI AKHIR 🌟 KINERJA SEMPURNA (100)" dengan "ULTIMATE 100" dengan tanda petir
    if (scoreCard) {
      scoreCard.className = 'result-score-circle-card card-ultimate';
      scoreCard.innerHTML = `
        <div class="score-circle-ultimate-lightning">
          <div class="ultimate-lightning-text">
            <i class="fa-solid fa-bolt-lightning text-yellow"></i> ULTIMATE 100 <i class="fa-solid fa-bolt-lightning text-yellow"></i>
          </div>
        </div>
      `;
    }
  } else if (outcome === 'menang') {
    // 1. Hidden "MENANG • MONSTER BERHASIL DIKALAHKAN!"
    if (outcomeBadge) outcomeBadge.classList.add('hidden');

    // 2. Hidden "Pertarungan Selesai!"
    if (resultTitle) resultTitle.classList.add('hidden');

    // 3. Hidden "Hebat! Anda memperoleh nilai ... (di atas standar 85)..."
    if (outcomeDesc) outcomeDesc.classList.add('hidden');
    if (resultHeader) resultHeader.classList.add('header-ultimate-clean');

    if (ultimateBanner) ultimateBanner.classList.add('hidden');

    // 4. Hidden "Dampak Monster: Tumbang Terkalahkan (Spacium Beam)"
    if (monsterStatItem) monsterStatItem.classList.add('hidden');
    if (durationStatItem) durationStatItem.classList.add('result-stat-item-full');

    // 5. Kotak warna hijau dengan nilai berwarna hijau dan tanda aurora
    if (scoreCard) {
      scoreCard.className = 'result-score-circle-card card-victory';
      scoreCard.innerHTML = `
        <div class="score-circle-victory-aurora">
          <div class="victory-aurora-text">
            <i class="fa-solid fa-wand-magic-sparkles text-green"></i> ${finalScore} <i class="fa-solid fa-wand-magic-sparkles text-green"></i>
          </div>
        </div>
      `;
    }
  } else {
    // 1. Hidden "KALAH • GAGAL MENGALAHKAN MONSTER"
    if (outcomeBadge) outcomeBadge.classList.add('hidden');

    // 2. Hidden "Pertarungan Selesai!"
    if (resultTitle) resultTitle.classList.add('hidden');

    // 3. Hidden "Energi Ultraman Iconnet habis! Nilai Anda adalah ... Monster Giga Lag masih mengganggu jaringan..."
    if (outcomeDesc) outcomeDesc.classList.add('hidden');
    if (resultHeader) resultHeader.classList.add('header-ultimate-clean');

    if (ultimateBanner) ultimateBanner.classList.add('hidden');

    // 4. Hidden "Dampak Monster: Masih Bertahan (Ultraman Kehabisan Energi)"
    if (monsterStatItem) monsterStatItem.classList.add('hidden');
    if (durationStatItem) durationStatItem.classList.add('result-stat-item-full');

    // 5. Kotak warna merah dengan nilai berwarna merah dan tanda api
    if (scoreCard) {
      scoreCard.className = 'result-score-circle-card card-defeat';
      scoreCard.innerHTML = `
        <div class="score-circle-defeat-fire">
          <div class="defeat-fire-text">
            <i class="fa-solid fa-fire text-red"></i> ${finalScore} <i class="fa-solid fa-fire text-red"></i>
          </div>
        </div>
      `;
    }
  }

  if (reviewList) {
    reviewList.innerHTML = quizState.userAnswers.map((ans, idx) => {
      const q = ans.question;
      const isOk = ans.isCorrect;
      const uChoice = ans.userChoice;
      const cChoice = q.correctAnswer;
      return `
        <div class="review-item glass-subpanel ${isOk ? 'review-correct' : 'review-wrong'}">
          <div class="review-item-header">
            <span class="badge ${isOk ? 'badge-green' : 'badge-red'}">
              ${isOk ? '<i class="fa-solid fa-check"></i> Soal ' + (idx + 1) + ' Benar' : '<i class="fa-solid fa-xmark"></i> Soal ' + (idx + 1) + ' Salah'}
            </span>
            <span class="review-category-tag">${escapeQuizHtml(q.category || 'Materi ICONNET')}</span>
          </div>
          <p class="review-prompt"><strong>${idx + 1}.</strong> ${escapeQuizHtml(q.prompt)}</p>
          <div class="review-choices-compare">
            <div class="choice-tag ${isOk ? 'tag-correct' : 'tag-wrong'}">
              <span>Jawaban Anda:</span>
              <strong>(${uChoice}) ${escapeQuizHtml((q.options && q.options[uChoice]) || '-')}</strong>
            </div>
            ${!isOk ? `
              <div class="choice-tag tag-key">
                <span>Kunci Jawaban:</span>
                <strong>(${cChoice}) ${escapeQuizHtml((q.options && q.options[cChoice]) || '-')}</strong>
              </div>
            ` : ''}
          </div>
          ${q.explanation ? `
            <div class="review-explanation-box">
              <i class="fa-solid fa-lightbulb text-yellow"></i>
              <div>
                <strong>Pembahasan:</strong>
                <span>${escapeQuizHtml(q.explanation)}</span>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  const currentUser = state.currentUser || { id: 'U-GUEST', fullName: 'Peserta Tamu', username: 'guest', department: 'CSO LAYANAN' };
  const historyList = state.getQuizHistory();
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  
  const historyItem = {
    id: 'QZH-' + Date.now(),
    userId: currentUser.id,
    userFullName: currentUser.fullName,
    username: currentUser.username || currentUser.id,
    department: currentUser.department || 'CSO LAYANAN',
    score: finalScore,
    correctCount: quizState.correctCount,
    totalQuestions: total,
    outcome,
    duration: durationStr,
    timestamp: dateStr
  };
  historyList.unshift(historyItem);
  if (historyList.length > 300) historyList.pop();
  state.saveQuizHistory(historyList);

  state.addLog('Quiz Battle', 'Battle', `Menyelesaikan kuis Ultraman vs Monster dengan skor ${finalScore}/100 (${outcome.toUpperCase()})`);

  if (modal) modal.classList.remove('hidden');
}

function openAddQuizQuestionModal() {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Admin yang dapat menambah soal kuis.', 'warning');
    return;
  }
  quizState.editingQuestionId = null;
  const modal = document.getElementById('modalQuizQuestionForm');
  const title = document.getElementById('modalQuizQuestionTitle');
  const form = document.getElementById('formQuizQuestion');
  const submitText = document.getElementById('btnSubmitQuizQuestionText');

  if (title) title.textContent = 'Tambah Soal Kuis Baru (Pilihan A - E)';
  if (submitText) submitText.textContent = 'Simpan Soal Kuis';
  if (form) form.reset();

  const idField = document.getElementById('formQuizQuestionId');
  const catField = document.getElementById('formQuizCategory');
  const keyField = document.getElementById('formQuizCorrectAnswer');
  const optE = document.getElementById('formQuizOptE');

  if (idField) idField.value = '';
  if (catField) catField.value = 'Informasi';
  if (keyField) keyField.value = 'A';
  if (optE) optE.value = '';

  if (modal) modal.classList.remove('hidden');
}

function openEditQuizQuestionModal(qId) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Admin yang dapat mengubah soal kuis.', 'warning');
    return;
  }
  const questions = state.getQuizQuestions();
  const q = questions.find(item => item.id === qId);
  if (!q) {
    showToast('Gagal', 'Soal tidak ditemukan.', 'error');
    return;
  }

  quizState.editingQuestionId = qId;
  const modal = document.getElementById('modalQuizQuestionForm');
  const title = document.getElementById('modalQuizQuestionTitle');
  const submitText = document.getElementById('btnSubmitQuizQuestionText');

  if (title) title.textContent = 'Edit Soal Kuis (Pilihan A - E)';
  if (submitText) submitText.textContent = 'Perbarui Soal Kuis';

  const idEl = document.getElementById('formQuizQuestionId');
  const catEl = document.getElementById('formQuizCategory');
  const keyEl = document.getElementById('formQuizCorrectAnswer');
  const promptEl = document.getElementById('formQuizPrompt');
  const aEl = document.getElementById('formQuizOptA');
  const bEl = document.getElementById('formQuizOptB');
  const cEl = document.getElementById('formQuizOptC');
  const dEl = document.getElementById('formQuizOptD');
  const eEl = document.getElementById('formQuizOptE');
  const explEl = document.getElementById('formQuizExplanation');

  if (idEl) idEl.value = q.id;
  if (catEl) catEl.value = q.category || 'Informasi';
  if (keyEl) keyEl.value = q.correctAnswer || 'A';
  if (promptEl) promptEl.value = q.prompt || '';
  if (aEl) aEl.value = q.options?.A || '';
  if (bEl) bEl.value = q.options?.B || '';
  if (cEl) cEl.value = q.options?.C || '';
  if (dEl) dEl.value = q.options?.D || '';
  if (eEl) eEl.value = q.options?.E || '';
  if (explEl) explEl.value = q.explanation || '';

  if (modal) modal.classList.remove('hidden');
}

function closeQuizQuestionModal() {
  const modal = document.getElementById('modalQuizQuestionForm');
  if (modal) modal.classList.add('hidden');
  quizState.editingQuestionId = null;
}

function handleSaveQuizQuestion(e) {
  e.preventDefault();
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Admin yang dapat menyimpan soal kuis.', 'warning');
    return;
  }

  const idVal = (document.getElementById('formQuizQuestionId')?.value || '').trim();
  const category = (document.getElementById('formQuizCategory')?.value || 'Informasi').trim();
  const correctAnswer = (document.getElementById('formQuizCorrectAnswer')?.value || 'A').trim();
  const prompt = (document.getElementById('formQuizPrompt')?.value || '').trim();
  const optA = (document.getElementById('formQuizOptA')?.value || '').trim();
  const optB = (document.getElementById('formQuizOptB')?.value || '').trim();
  const optC = (document.getElementById('formQuizOptC')?.value || '').trim();
  const optD = (document.getElementById('formQuizOptD')?.value || '').trim();
  const optE = (document.getElementById('formQuizOptE')?.value || '').trim();
  const explanation = (document.getElementById('formQuizExplanation')?.value || '').trim();

  if (!prompt || !optA || !optB || !optC || !optD || !optE) {
    showToast('Form Belum Lengkap', 'Teks pertanyaan dan seluruh 5 pilihan jawaban (A, B, C, D, E) wajib diisi.', 'warning');
    return;
  }

  const questions = state.getQuizQuestions();

  if (idVal) {
    const idx = questions.findIndex(q => q.id === idVal);
    if (idx !== -1) {
      questions[idx] = {
        ...questions[idx],
        category,
        correctAnswer,
        prompt,
        options: { A: optA, B: optB, C: optC, D: optD, E: optE },
        explanation
      };
      state.saveQuizQuestions(questions);
      state.addLog('Quiz Bank', 'Edit', `Mengubah soal kuis ID ${idVal}`);
      showToast('Berhasil', 'Soal kuis 5 pilihan berhasil diperbarui.', 'success');
    }
  } else {
    const newId = 'QZ-' + String(Date.now()).slice(-6);
    const newQuestion = {
      id: newId,
      category,
      correctAnswer,
      prompt,
      options: { A: optA, B: optB, C: optC, D: optD, E: optE },
      explanation
    };
    questions.push(newQuestion);
    state.saveQuizQuestions(questions);
    state.addLog('Quiz Bank', 'Tambah', `Menambahkan soal kuis baru 5 pilihan (${category})`);
    showToast('Berhasil', 'Soal kuis baru (A-E) berhasil ditambahkan.', 'success');
  }

  closeQuizQuestionModal();
  renderQuizAdminQuestions();

  if (quizState.activeTab === 'battle') {
    startQuizBattle();
  }
}

function promptDeleteQuizQuestion(qId) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Admin yang dapat menghapus soal kuis.', 'warning');
    return;
  }

  const questions = state.getQuizQuestions();
  const q = questions.find(item => item.id === qId);
  if (!q) return;

  if (UI.confirmDeleteTitle && UI.confirmDeleteMessage && UI.modalConfirmDelete) {
    state.pendingDelete = {
      type: 'quiz_question',
      id: qId,
      name: q.id
    };
    UI.confirmDeleteTitle.textContent = 'Hapus Soal Kuis?';
    UI.confirmDeleteMessage.innerHTML = `Anda akan menghapus soal kuis <strong>${q.id}</strong> ("${escapeQuizHtml(q.prompt.slice(0, 80))}...") secara permanen.`;
    UI.modalConfirmDelete.classList.remove('hidden');
  } else if (confirm(`Apakah Anda yakin ingin menghapus soal berikut?\n\n"${q.prompt.slice(0, 80)}..."`)) {
    const filtered = questions.filter(item => item.id !== qId);
    state.saveQuizQuestions(filtered);
    if (quizState.selectedQuestionIds) quizState.selectedQuestionIds.delete(qId);
    state.addLog('Quiz Bank', 'Hapus', `Menghapus soal kuis ID ${qId}`);
    showToast('Soal Dihapus', 'Soal kuis berhasil dihapus dari bank soal.', 'info');
    renderQuizAdminQuestions();

    if (quizState.activeTab === 'battle') {
      startQuizBattle();
    }
  }
}

function getFilteredQuizAdminQuestions() {
  const allQuestions = state.getQuizQuestions();
  let questions = [...allQuestions];

  const cat = quizState.adminCategory || 'ALL';
  if (cat !== 'ALL') {
    questions = questions.filter(q => q.category === cat);
  }

  const search = (quizState.adminSearch || '').toLowerCase().trim();
  if (search) {
    questions = questions.filter(q => {
      const p = (q.prompt || '').toLowerCase();
      const expl = (q.explanation || '').toLowerCase();
      const c = (q.category || '').toLowerCase();
      const optStr = Object.values(q.options || {}).join(' ').toLowerCase();
      return p.includes(search) || expl.includes(search) || c.includes(search) || optStr.includes(search);
    });
  }

  return questions;
}

// Fitur: Tandai Soal (Menandai Beberapa / Semua Soal & Hapus yang Ditandai)
function toggleSelectAllQuizQuestions(shouldSelect) {
  if (!state.isAdmin()) return;
  if (!quizState.selectedQuestionIds) quizState.selectedQuestionIds = new Set();

  const visibleQuestions = getFilteredQuizAdminQuestions();
  const visibleIds = visibleQuestions.map(q => q.id);
  if (visibleIds.length === 0) return;

  const isAllSelected = visibleIds.every(id => quizState.selectedQuestionIds.has(id));
  const targetSelect = (shouldSelect !== undefined) ? shouldSelect : !isAllSelected;

  visibleIds.forEach(id => {
    if (targetSelect) {
      quizState.selectedQuestionIds.add(id);
    } else {
      quizState.selectedQuestionIds.delete(id);
    }
  });

  renderQuizAdminQuestions();
}

function promptDeleteSelectedQuizQuestions() {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Admin yang dapat menghapus soal kuis.', 'warning');
    return;
  }

  const selectedList = Array.from(quizState.selectedQuestionIds || []);
  if (selectedList.length === 0) {
    showToast('Belum Ada Soal Ditandai', 'Silakan tandai beberapa atau semua soal kuis yang ingin dihapus.', 'warning');
    return;
  }

  if (UI.confirmDeleteTitle && UI.confirmDeleteMessage && UI.modalConfirmDelete) {
    state.pendingDelete = {
      type: 'quiz_batch',
      id: 'quiz_batch',
      name: `${selectedList.length} soal kuis`,
      ids: selectedList
    };
    UI.confirmDeleteTitle.textContent = 'Hapus Soal Kuis yang Ditandai?';
    UI.confirmDeleteMessage.innerHTML = `Anda akan menghapus <strong>${selectedList.length} soal kuis</strong> yang telah ditandai secara permanen dari Bank Soal.`;
    UI.modalConfirmDelete.classList.remove('hidden');
  } else if (confirm(`Apakah Anda yakin ingin menghapus ${selectedList.length} soal kuis yang telah ditandai secara permanen?`)) {
    const questions = state.getQuizQuestions();
    const remaining = questions.filter(q => !selectedList.includes(q.id));
    state.saveQuizQuestions(remaining);
    selectedList.forEach(id => quizState.selectedQuestionIds.delete(id));
    state.addLog('Quiz Bank', 'Hapus Massal', `Menghapus ${selectedList.length} soal kuis yang ditandai.`);
    showToast('Soal Ditandai Dihapus', `Sebanyak ${selectedList.length} soal kuis yang ditandai berhasil dihapus.`, 'danger');
    renderQuizAdminQuestions();

    if (quizState.activeTab === 'battle') {
      startQuizBattle();
    }
  }
}

function renderQuizAdminQuestions() {
  if (!state.isAdmin()) return;

  const tbody = document.getElementById('quizAdminQuestionsTableBody');
  if (!tbody) return;

  if (!quizState.selectedQuestionIds) {
    quizState.selectedQuestionIds = new Set();
  }

  const questions = getFilteredQuizAdminQuestions();
  const visibleIds = questions.map(q => q.id);
  const selectedVisibleCount = visibleIds.filter(id => quizState.selectedQuestionIds.has(id)).length;
  const totalSelected = quizState.selectedQuestionIds.size;

  // Update Master Checkbox in Table Header
  const chkMaster = document.getElementById('chkQuizSelectAll');
  if (chkMaster) {
    chkMaster.checked = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
    chkMaster.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < visibleIds.length;
  }

  // Update "Tandai Semua" Button
  const btnSelectAll = document.getElementById('btnQuizSelectAll');
  if (btnSelectAll) {
    const isAllSelected = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
    btnSelectAll.innerHTML = isAllSelected ? 
      '<i class="fa-solid fa-square-minus"></i> <span>Batal Tandai Semua</span>' : 
      '<i class="fa-solid fa-list-check"></i> <span>Tandai Semua</span>';
    btnSelectAll.title = isAllSelected ? 'Batalkan penandaan seluruh soal yang tampil' : 'Tandai semua soal yang tampil';
  }

  // Update "Hapus yang Ditandai" Button & Counter
  const btnDeleteSelected = document.getElementById('btnQuizDeleteSelected');
  const lblCount = document.getElementById('lblCountSelectedQuiz');
  if (lblCount) lblCount.textContent = totalSelected;
  if (btnDeleteSelected) {
    btnDeleteSelected.disabled = totalSelected === 0;
    btnDeleteSelected.style.opacity = totalSelected > 0 ? '1' : '0.5';
    btnDeleteSelected.style.cursor = totalSelected > 0 ? 'pointer' : 'not-allowed';
    btnDeleteSelected.title = totalSelected > 0 ? `Hapus ${totalSelected} soal kuis yang ditandai` : 'Tandai minimal satu soal untuk menghapus';
  }

  if (questions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:30px; color:var(--gray-400);">
          <i class="fa-solid fa-folder-open" style="font-size:2rem; margin-bottom:8px; display:block;"></i>
          Tidak ada soal kuis yang sesuai dengan filter pencarian.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = questions.map((q, idx) => {
    let catBadgeClass = 'badge-blue';
    let catIcon = 'fa-circle-info';
    if (q.category === 'Keluhan') {
      catBadgeClass = 'badge-yellow';
      catIcon = 'fa-comments';
    } else if (q.category === 'Gangguan') {
      catBadgeClass = 'badge-red';
      catIcon = 'fa-triangle-exclamation';
    }

    const isSelected = quizState.selectedQuestionIds.has(q.id);

    return `
      <tr class="${isSelected ? 'quiz-row-selected' : ''}" style="${isSelected ? 'background: rgba(239, 68, 68, 0.08);' : ''}">
        <td style="text-align:center;">
          <input type="checkbox" class="quiz-table-checkbox chk-quiz-select" data-id="${q.id}" ${isSelected ? 'checked' : ''} title="Tandai soal ini">
        </td>
        <td style="text-align:center; font-weight:700; color:var(--gray-400);">${idx + 1}</td>
        <td>
          <span class="badge ${catBadgeClass}" style="font-size:0.75rem;">
            <i class="fa-solid ${catIcon}"></i> ${escapeQuizHtml(q.category || 'Informasi')}
          </span>
          ${isSelected ? '<div style="margin-top:4px;"><span class="badge badge-red" style="font-size:0.7rem; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-check"></i> Ditandai</span></div>' : ''}
        </td>
        <td>
          <div style="font-weight:600; color:#fff; line-height:1.4; margin-bottom:6px;">${escapeQuizHtml(q.prompt)}</div>
          <div style="font-size:0.8rem; color:var(--gray-400); display:grid; grid-template-columns:1fr 1fr; gap:4px;">
            <span style="${q.correctAnswer === 'A' ? 'color:#22c55e; font-weight:700;' : ''}"><strong>A:</strong> ${escapeQuizHtml(q.options?.A || '-')}</span>
            <span style="${q.correctAnswer === 'B' ? 'color:#22c55e; font-weight:700;' : ''}"><strong>B:</strong> ${escapeQuizHtml(q.options?.B || '-')}</span>
            <span style="${q.correctAnswer === 'C' ? 'color:#22c55e; font-weight:700;' : ''}"><strong>C:</strong> ${escapeQuizHtml(q.options?.C || '-')}</span>
            <span style="${q.correctAnswer === 'D' ? 'color:#22c55e; font-weight:700;' : ''}"><strong>D:</strong> ${escapeQuizHtml(q.options?.D || '-')}</span>
            <span style="grid-column: 1 / -1; ${q.correctAnswer === 'E' ? 'color:#22c55e; font-weight:700;' : ''}"><strong>E:</strong> ${escapeQuizHtml(q.options?.E || '-')}</span>
          </div>
        </td>
        <td style="text-align:center;">
          <span class="badge badge-green" style="font-weight:700; font-size:0.9rem;">${escapeQuizHtml(q.correctAnswer)}</span>
        </td>
        <td style="font-size:0.85rem; color:var(--gray-300); line-height:1.4;">
          ${escapeQuizHtml(q.explanation || '-')}
        </td>
        <td style="text-align:center;">
          <div style="display:flex; justify-content:center; gap:6px;">
            <button type="button" class="btn btn-outline-gray btn-xs btn-edit-quiz-q" data-id="${q.id}" title="Edit Soal">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="btn btn-outline-danger btn-xs btn-delete-quiz-q" data-id="${q.id}" title="Hapus Soal">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Row selection checkbox change listener
  tbody.querySelectorAll('.chk-quiz-select').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const qId = chk.getAttribute('data-id');
      if (e.target.checked) {
        quizState.selectedQuestionIds.add(qId);
      } else {
        quizState.selectedQuestionIds.delete(qId);
      }
      renderQuizAdminQuestions();
    });
  });

  tbody.querySelectorAll('.btn-edit-quiz-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-id');
      openEditQuizQuestionModal(qId);
    });
  });

  tbody.querySelectorAll('.btn-delete-quiz-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-id');
      promptDeleteQuizQuestion(qId);
    });
  });
}

// ==========================================
// PAPAN SKOR & RIWAYAT: ISOLASI PRIVAT & ADMIN MONITOR
// Ketentuan:
// 1. Tiap user memiliki nilai yang berbeda dan HANYA BISA MELIHAT NILAINYA SENDIRI.
// 2. Admin DAPAT MEMANTAU HASIL NILAI yang dikerjakan oleh setiap user.
// ==========================================
function renderQuizLeaderboard() {
  const isAdmin = state.isAdmin();
  const currentUser = state.currentUser || { id: 'U-GUEST', username: 'guest', fullName: 'Peserta Tamu', department: 'CSO LAYANAN' };
  const allHistory = state.getQuizHistory();

  const banner = document.getElementById('quizLeaderboardBanner');
  const bannerIcon = document.getElementById('quizLeaderboardBannerIcon');
  const bannerTitle = document.getElementById('quizLeaderboardBannerTitle');
  const bannerDesc = document.getElementById('quizLeaderboardBannerDesc');
  const bannerBadge = document.getElementById('quizLeaderboardBannerBadge');
  const toolbarAdmin = document.getElementById('toolbarQuizAdminMonitor');
  const thAction = document.getElementById('thQuizHistoryAction');
  const btnClearMy = document.getElementById('btnClearMyQuizHistory');
  const tableTitle = document.getElementById('quizHistoryTableTitle');
  const tableDesc = document.getElementById('quizHistoryTableDesc');

  // 1. Update UI Role Mode: Banner & Toolbars
  if (isAdmin) {
    if (banner) banner.classList.add('hidden');
    if (toolbarAdmin) toolbarAdmin.classList.remove('hidden');
    if (thAction) thAction.classList.remove('hidden');
    if (btnClearMy) btnClearMy.classList.add('hidden');
    if (tableTitle) tableTitle.textContent = 'Pemantauan Hasil Nilai Kuis Tim CSO (Semua Peserta)';
    if (tableDesc) {
      tableDesc.textContent = '';
      tableDesc.classList.add('hidden');
    }

    // Populate user filter dropdown
    const filterUserSelect = document.getElementById('filterQuizHistoryUser');
    if (filterUserSelect) {
      const currentSelected = quizState.historyFilterUser || 'ALL';
      const userMap = new Map();
      allHistory.forEach(h => {
        if (h.userId && !userMap.has(h.userId)) {
          userMap.set(h.userId, { id: h.userId, name: h.userFullName || h.userId, dept: h.department || 'CSO' });
        }
      });
      if (Array.isArray(state.users)) {
        state.users.forEach(u => {
          if (u.id && !userMap.has(u.id)) {
            userMap.set(u.id, { id: u.id, name: u.fullName || u.username, dept: u.department || 'CSO' });
          }
        });
      }

      let optionsHtml = `<option value="ALL">Semua Anggota Tim (${allHistory.length} Riwayat)</option>`;
      userMap.forEach(u => {
        optionsHtml += `<option value="${escapeQuizHtml(u.id)}">${escapeQuizHtml(u.name)} (${escapeQuizHtml(u.dept)})</option>`;
      });
      filterUserSelect.innerHTML = optionsHtml;
      filterUserSelect.value = currentSelected;
    }

    const filterOutcomeSelect = document.getElementById('filterQuizHistoryOutcome');
    if (filterOutcomeSelect) {
      filterOutcomeSelect.value = quizState.historyFilterOutcome || 'ALL';
    }

    const searchInput = document.getElementById('searchQuizHistoryInput');
    const btnClearSearch = document.getElementById('btnClearSearchQuizHistory');
    if (searchInput) searchInput.value = quizState.historySearch || '';
    if (btnClearSearch) btnClearSearch.classList.toggle('hidden', !(quizState.historySearch));
  } else {
    // Mode User Reguler: Strictly Private
    const uDisplayName = currentUser.fullName || currentUser.username || 'Peserta';
    if (bannerTitle) bannerTitle.textContent = `Mode Riwayat Pribadi (${uDisplayName})`;
    if (bannerDesc) bannerDesc.innerHTML = 'Hasil nilai kuis Anda bersifat <strong>privat dan hanya dapat dilihat oleh Anda sendiri</strong>. Pengguna lain tidak dapat melihat skor Anda. Administrator dapat memantau hasil kuis untuk evaluasi mutu layanan.';
    if (bannerBadge) {
      bannerBadge.className = 'badge badge-user';
      bannerBadge.innerHTML = '<i class="fa-solid fa-lock"></i> Privat (Hanya Diri Sendiri)';
    }
    if (bannerIcon) bannerIcon.className = 'fa-solid fa-user-shield text-cyan';
    if (toolbarAdmin) toolbarAdmin.classList.add('hidden');
    if (thAction) thAction.classList.add('hidden');
    if (btnClearMy) btnClearMy.classList.remove('hidden');
    if (tableTitle) tableTitle.textContent = 'Riwayat Pertarungan Quiz Pribadi Saya';
    if (tableDesc) {
      tableDesc.textContent = '';
      tableDesc.classList.add('hidden');
    }
  }

  // 2. Data Filtering: Role-based strict isolation
  let displayedHistory = [];
  if (!isAdmin) {
    // USER HANYA BISA MELIHAT NILAINYA SENDIRI
    displayedHistory = allHistory.filter(h => h.userId === currentUser.id);
  } else {
    // ADMIN DAPAT MEMANTAU SELURUH USER DENGAN FILTER
    displayedHistory = [...allHistory];
    if (quizState.historyFilterUser && quizState.historyFilterUser !== 'ALL') {
      displayedHistory = displayedHistory.filter(h => h.userId === quizState.historyFilterUser);
    }
    if (quizState.historyFilterOutcome && quizState.historyFilterOutcome !== 'ALL') {
      displayedHistory = displayedHistory.filter(h => h.outcome === quizState.historyFilterOutcome);
    }
    if (quizState.historySearch) {
      const q = quizState.historySearch.toLowerCase().trim();
      displayedHistory = displayedHistory.filter(h => {
        const name = (h.userFullName || '').toLowerCase();
        const dept = (h.department || '').toLowerCase();
        const uname = (h.username || '').toLowerCase();
        const uid = (h.userId || '').toLowerCase();
        return name.includes(q) || dept.includes(q) || uname.includes(q) || uid.includes(q);
      });
    }
  }

  // 3. Stat Cards Update
  const statBest = document.getElementById('statQuizMyBestScore');
  const statBestSub = document.getElementById('statQuizMyBestStatus');
  const statVic = document.getElementById('statQuizTotalVictories');
  const statWinRate = document.getElementById('statQuizWinRate');
  const statPerf = document.getElementById('statQuizTotalPerfect');
  const statPlay = document.getElementById('statQuizTotalPlayed');
  const lblCard1Tag = document.getElementById('lblQuizStatCard1Tag');
  const lblCard1Title = document.getElementById('lblQuizStatCard1Title');
  const lblCard2Title = document.getElementById('lblQuizStatCard2Title');
  const lblCard3Title = document.getElementById('lblQuizStatCard3Title');
  const lblCard4Title = document.getElementById('lblQuizStatCard4Title');
  const lblCard4Sub = document.getElementById('lblQuizStatCard4Sub');

  if (!isAdmin) {
    if (lblCard1Tag) lblCard1Tag.textContent = 'Personal Best';
    if (lblCard1Title) lblCard1Title.textContent = 'Skor Terbaik Saya';
    if (lblCard2Title) lblCard2Title.textContent = 'Total Kemenangan Saya';
    if (lblCard3Title) lblCard3Title.textContent = 'Rekor Nilai Sempurna 100';
    if (lblCard4Title) lblCard4Title.textContent = 'Total Sesi Kuis Saya';
    if (lblCard4Sub) lblCard4Sub.textContent = 'Riwayat pribadi tersimpan';

    const myScores = displayedHistory.map(h => h.score);
    const bestScore = myScores.length > 0 ? Math.max(...myScores) : 0;
    let bestStatus = 'Belum menyelesaikan kuis';
    if (myScores.length > 0) {
      if (bestScore === 100) bestStatus = '🌟 Sempurna 100 • Jurus Ultimate';
      else if (bestScore >= 85) bestStatus = '✅ Lulus Standar (≥ 85)';
      else bestStatus = '❌ Belum Lulus Standar (< 85)';
    }

    const victories = displayedHistory.filter(h => h.score >= 85).length;
    const perfects = displayedHistory.filter(h => h.score === 100).length;
    const winRate = displayedHistory.length > 0 ? Math.round((victories / displayedHistory.length) * 100) : 0;

    if (statBest) statBest.innerHTML = `${bestScore} <small style="font-size:0.85rem; color:var(--gray-400);">/ 100</small>`;
    if (statBestSub) statBestSub.textContent = bestStatus;
    if (statVic) statVic.innerHTML = `${victories} <small style="font-size:0.85rem; color:var(--gray-400);">Kali</small>`;
    if (statWinRate) statWinRate.textContent = `Win Rate: ${winRate}%`;
    if (statPerf) statPerf.innerHTML = `${perfects} <small style="font-size:0.85rem; color:var(--gray-400);">Sempurna</small>`;
    if (statPlay) statPlay.textContent = displayedHistory.length;
  } else {
    if (lblCard1Tag) lblCard1Tag.textContent = 'Team Best';
    if (lblCard1Title) lblCard1Title.textContent = 'Nilai Tertinggi Tim';
    if (lblCard2Title) lblCard2Title.textContent = 'Total Kemenangan Tim';
    if (lblCard3Title) lblCard3Title.textContent = 'Total Sempurna 100 (Ultimate)';
    if (lblCard4Title) lblCard4Title.textContent = 'Total Sesi Terpantau';
    if (lblCard4Sub) lblCard4Sub.textContent = 'Dari seluruh pengguna tim';

    const teamScores = displayedHistory.map(h => h.score);
    const bestScore = teamScores.length > 0 ? Math.max(...teamScores) : 0;
    const topPerformer = displayedHistory.find(h => h.score === bestScore);
    const bestStatus = topPerformer ? `Top: ${topPerformer.userFullName || 'Peserta'}` : 'Belum ada data';

    const victories = displayedHistory.filter(h => h.score >= 85).length;
    const perfects = displayedHistory.filter(h => h.score === 100).length;
    const winRate = displayedHistory.length > 0 ? Math.round((victories / displayedHistory.length) * 100) : 0;

    if (statBest) statBest.innerHTML = `${bestScore} <small style="font-size:0.85rem; color:var(--gray-400);">/ 100</small>`;
    if (statBestSub) statBestSub.textContent = bestStatus;
    if (statVic) statVic.innerHTML = `${victories} <small style="font-size:0.85rem; color:var(--gray-400);">Kali</small>`;
    if (statWinRate) statWinRate.textContent = `Tingkat Kelulusan: ${winRate}%`;
    if (statPerf) statPerf.innerHTML = `${perfects} <small style="font-size:0.85rem; color:var(--gray-400);">Ultimate</small>`;
    if (statPlay) statPlay.textContent = displayedHistory.length;
  }

  // 4. Render Table Rows
  const tbody = document.getElementById('quizHistoryTableBody');
  if (!tbody) return;

  if (displayedHistory.length === 0) {
    const emptyMsg = isAdmin ? 
      'Tidak ada riwayat nilai kuis yang sesuai dengan filter pemantauan admin.' : 
      'Anda belum memiliki riwayat kuis. Silakan kerjakan latihan kuis di Arena Pertarungan untuk melihat perolehan skor Anda.';
    const colSpan = isAdmin ? 8 : 7;
    tbody.innerHTML = `
      <tr>
        <td colspan="${colSpan}" style="text-align:center; padding:35px 20px; color:var(--gray-400);">
          <i class="fa-solid fa-gamepad" style="font-size:2.2rem; margin-bottom:10px; display:block; color:var(--gray-500);"></i>
          ${emptyMsg}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = displayedHistory.slice(0, 100).map(item => {
    let outcomeBadge = '';
    let noteBadge = '';
    if (item.score === 100) {
      outcomeBadge = '<span class="badge badge-yellow" style="font-weight:700;"><i class="fa-solid fa-crown text-yellow"></i> SEMPURNA (Ultimate)</span>';
      noteBadge = '<span class="text-yellow" style="font-weight:600;"><i class="fa-solid fa-bolt"></i> Jurus Pamungkas 100% Aktif</span>';
    } else if (item.score >= 85) {
      outcomeBadge = '<span class="badge badge-green" style="font-weight:700;"><i class="fa-solid fa-trophy text-green"></i> MENANG (&ge; 85)</span>';
      noteBadge = '<span class="text-green"><i class="fa-solid fa-check"></i> Spacium Beam Menang</span>';
    } else {
      outcomeBadge = '<span class="badge badge-red" style="font-weight:700;"><i class="fa-solid fa-circle-xmark text-red"></i> KALAH (&lt; 85)</span>';
      noteBadge = '<span class="text-red"><i class="fa-solid fa-triangle-exclamation"></i> Energi Habis / Kalah</span>';
    }

    const isMe = (currentUser && item.userId === currentUser.id);

    return `
      <tr>
        <td style="font-size:0.85rem; color:var(--gray-300);">${escapeQuizHtml(item.timestamp || '-')}</td>
        <td>
          <div style="font-weight:600; color:#fff; display:flex; align-items:center; gap:6px;">
            <span>${escapeQuizHtml(item.userFullName || 'Peserta')}</span>
            ${isMe ? '<span class="badge badge-user" style="font-size:0.65rem; padding:1px 6px;">Saya</span>' : ''}
          </div>
          ${isAdmin ? `<div style="font-size:0.75rem; color:var(--gray-400);">@${escapeQuizHtml(item.username || item.userId)}</div>` : ''}
        </td>
        <td><span class="badge badge-gray" style="font-size:0.75rem;">${escapeQuizHtml(item.department || 'CSO')}</span></td>
        <td style="text-align:center; font-weight:800; font-size:1.1rem; ${item.score === 100 ? 'color:#facc15;' : item.score >= 85 ? 'color:#22c55e;' : 'color:#ef4444;'}">
          ${item.score}
        </td>
        <td style="text-align:center; font-weight:600; color:var(--gray-300);">
          ${item.correctCount || 0} / ${item.totalQuestions || 10}
        </td>
        <td style="text-align:center;">
          ${outcomeBadge}
        </td>
        <td style="font-size:0.85rem; color:var(--gray-400);">
          ${noteBadge} <small style="display:block; color:var(--gray-500); margin-top:2px;">Durasi: ${escapeQuizHtml(item.duration || '-')}</small>
        </td>
        ${isAdmin ? `
          <td style="text-align:center;">
            <button type="button" class="btn btn-outline-danger btn-xs btn-delete-quiz-history" data-id="${item.id}" title="Hapus Catatan Kuis Ini">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        ` : ''}
      </tr>
    `;
  }).join('');

  if (isAdmin) {
    tbody.querySelectorAll('.btn-delete-quiz-history').forEach(btn => {
      btn.addEventListener('click', () => {
        const histId = btn.getAttribute('data-id');
        deleteQuizHistoryRecord(histId);
      });
    });
  }
}

function deleteQuizHistoryRecord(historyId) {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Admin yang dapat menghapus data pantauan kuis.', 'warning');
    return;
  }
  if (confirm('Hapus rekaman nilai kuis ini dari pantauan sistem?')) {
    let history = state.getQuizHistory();
    history = history.filter(h => h.id !== historyId);
    state.saveQuizHistory(history);
    state.addLog('Quiz Monitor', 'Hapus', `Menghapus riwayat kuis ID ${historyId}`);
    showToast('Riwayat Dihapus', 'Catatan nilai kuis berhasil dihapus.', 'info');
    renderQuizLeaderboard();
  }
}

function clearAllTeamQuizHistory() {
  if (!state.isAdmin()) {
    showToast('Akses Dibatasi', 'Hanya Admin yang dapat mereset riwayat kuis tim.', 'warning');
    return;
  }
  if (confirm('PERINGATAN ADMIN: Apakah Anda yakin ingin menghapus SELURUH riwayat nilai kuis yang dikerjakan oleh semua anggota tim? Tindakan ini tidak dapat dibatalkan.')) {
    state.saveQuizHistory([]);
    state.addLog('Quiz Monitor', 'Reset', 'Mereset seluruh riwayat kuis tim');
    showToast('Riwayat Tim Direset', 'Seluruh riwayat nilai kuis tim telah dibersihkan.', 'info');
    renderQuizLeaderboard();
  }
}

function clearMyQuizHistory() {
  const currentUser = state.currentUser;
  if (!currentUser) return;

  if (confirm('Hapus seluruh riwayat hasil kuis pribadi Anda? Riwayat pengguna lain tidak akan terpengaruh.')) {
    let history = state.getQuizHistory();
    history = history.filter(h => h.userId !== currentUser.id);
    state.saveQuizHistory(history);
    showToast('Riwayat Dibersihkan', 'Riwayat kuis pribadi Anda berhasil dihapus.', 'info');
    renderQuizLeaderboard();
  }
}

function initQuizBattle() {
  const btnBattle = document.getElementById('btnTabQuizBattle');
  const btnLeaderboard = document.getElementById('btnTabQuizLeaderboard');
  const btnAdminBank = document.getElementById('btnTabQuizAdminBank');
  const btnRestart = document.getElementById('btnRestartQuiz');

  if (btnBattle) btnBattle.addEventListener('click', () => switchQuizTab('battle'));
  if (btnLeaderboard) btnLeaderboard.addEventListener('click', () => switchQuizTab('leaderboard'));
  if (btnAdminBank) btnAdminBank.addEventListener('click', () => switchQuizTab('adminBank'));
  if (btnRestart) btnRestart.addEventListener('click', () => {
    startQuizBattle();
    showToast('Kuis Dimulai Ulang', 'Pertarungan dimulai kembali dari soal pertama.', 'info');
  });

  const selectHero = document.getElementById('selectQuizHero');
  if (selectHero) {
    selectHero.addEventListener('change', (e) => {
      selectQuizHero(e.target.value);
    });
  }

  // 5 Options A, B, C, D, E listeners
  ['A', 'B', 'C', 'D', 'E'].forEach(ch => {
    const btn = document.getElementById('btnOption' + ch);
    if (btn) {
      btn.addEventListener('click', () => handleSelectQuizOption(ch));
    }
  });

  const btnNext = document.getElementById('btnNextQuestion');
  if (btnNext) btnNext.addEventListener('click', nextQuizQuestion);

  // Special cutscene animation skip button
  const btnSkipAnim = document.getElementById('btnSkipSpecialAnim');
  if (btnSkipAnim) {
    btnSkipAnim.addEventListener('click', () => {
      dismissSpecialOutcomeAnimation();
    });
  }

  const btnCloseResult = document.getElementById('btnCloseQuizResult');
  const btnCloseResultFooter = document.getElementById('btnCloseQuizResultFooter');
  const btnRematch = document.getElementById('btnQuizRematch');

  const closeResultFunc = () => {
    const modal = document.getElementById('modalQuizResult');
    if (modal) modal.classList.add('hidden');
  };
  if (btnCloseResult) btnCloseResult.addEventListener('click', closeResultFunc);
  if (btnCloseResultFooter) btnCloseResultFooter.addEventListener('click', closeResultFunc);
  if (btnRematch) btnRematch.addEventListener('click', () => {
    closeResultFunc();
    startQuizBattle();
  });

  const btnOpenAdd = document.getElementById('btnOpenAddQuestionModal');
  if (btnOpenAdd) btnOpenAdd.addEventListener('click', openAddQuizQuestionModal);

  const btnCloseQModal = document.getElementById('btnCloseQuizQuestionModal');
  const btnCancelQModal = document.getElementById('btnCancelQuizQuestionModal');
  if (btnCloseQModal) btnCloseQModal.addEventListener('click', closeQuizQuestionModal);
  if (btnCancelQModal) btnCancelQModal.addEventListener('click', closeQuizQuestionModal);

  const formQ = document.getElementById('formQuizQuestion');
  if (formQ) formQ.addEventListener('submit', handleSaveQuizQuestion);

  const searchInput = document.getElementById('searchQuizQuestionInput');
  const btnClearSearch = document.getElementById('btnClearSearchQuizQuestion');
  const filterCat = document.getElementById('filterQuizQuestionCategory');
  const chkMasterQuiz = document.getElementById('chkQuizSelectAll');
  const btnSelectAllQuiz = document.getElementById('btnQuizSelectAll');
  const btnDeleteSelectedQuiz = document.getElementById('btnQuizDeleteSelected');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      quizState.adminSearch = e.target.value;
      if (btnClearSearch) btnClearSearch.classList.toggle('hidden', !e.target.value);
      renderQuizAdminQuestions();
    });
  }

  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      quizState.adminSearch = '';
      btnClearSearch.classList.add('hidden');
      renderQuizAdminQuestions();
    });
  }

  if (filterCat) {
    filterCat.addEventListener('change', (e) => {
      quizState.adminCategory = e.target.value;
      renderQuizAdminQuestions();
    });
  }

  if (chkMasterQuiz) {
    chkMasterQuiz.addEventListener('change', () => {
      toggleSelectAllQuizQuestions(chkMasterQuiz.checked);
    });
  }

  if (btnSelectAllQuiz) {
    btnSelectAllQuiz.addEventListener('click', () => {
      toggleSelectAllQuizQuestions();
    });
  }

  if (btnDeleteSelectedQuiz) {
    btnDeleteSelectedQuiz.addEventListener('click', promptDeleteSelectedQuizQuestions);
  }

  // Admin Monitoring Toolbar Listeners
  const filterHistUser = document.getElementById('filterQuizHistoryUser');
  if (filterHistUser) {
    filterHistUser.addEventListener('change', (e) => {
      quizState.historyFilterUser = e.target.value;
      renderQuizLeaderboard();
    });
  }

  const filterHistOutcome = document.getElementById('filterQuizHistoryOutcome');
  if (filterHistOutcome) {
    filterHistOutcome.addEventListener('change', (e) => {
      quizState.historyFilterOutcome = e.target.value;
      renderQuizLeaderboard();
    });
  }

  const searchHistInput = document.getElementById('searchQuizHistoryInput');
  const btnClearHistSearch = document.getElementById('btnClearSearchQuizHistory');
  if (searchHistInput) {
    searchHistInput.addEventListener('input', (e) => {
      quizState.historySearch = e.target.value;
      if (btnClearHistSearch) btnClearHistSearch.classList.toggle('hidden', !e.target.value);
      renderQuizLeaderboard();
    });
  }

  if (btnClearHistSearch) {
    btnClearHistSearch.addEventListener('click', () => {
      if (searchHistInput) searchHistInput.value = '';
      quizState.historySearch = '';
      btnClearHistSearch.classList.add('hidden');
      renderQuizLeaderboard();
    });
  }

  const btnResetAllTeam = document.getElementById('btnClearAllTeamQuizHistory');
  if (btnResetAllTeam) {
    btnResetAllTeam.addEventListener('click', clearAllTeamQuizHistory);
  }

  const btnClearHist = document.getElementById('btnClearMyQuizHistory');
  if (btnClearHist) btnClearHist.addEventListener('click', clearMyQuizHistory);
}

// ==========================================
// 16. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  startClock();
  populateNotifications();
  startTimerTicker();
  initTypingTest();
  initQuizBattle();
  initEvents();
  renderAppView();
});
