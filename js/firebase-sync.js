/**
 * ============================================================================
 * DRIVE DASHBOARD - FIREBASE CLOUD SYNCHRONIZATION
 * ============================================================================
 * Menghubungkan dashboard ke Firebase Cloud Firestore sehingga seluruh data:
 * - Multi-Device & Cross-Platform: Semua akses web dari PC, laptop, tablet, atau smartphone
 *   mendapatkan data yang sama dan terintegrasi penuh.
 * - Realtime Sync: Penambahan, pengeditan, atau penghapusan data di Device A
 *   langsung tersinkronisasi dan tampil di Device B secara instan tanpa perlu refresh.
 * - Auto-Seed & Hydration: Perangkat baru yang baru membuka web otomatis menarik
 *   data master terbaru dari Cloud.
 * - Offline-First: Akses instan menggunakan LocalStorage dan auto-sync saat online.
 * - Dilengkapi fitur Backup & Restore JSON.
 * ============================================================================
 */

(function () {
  'use strict';

  // Daftar seluruh key data yang disinkronkan antar PC, Laptop & Mobile Device
  const SYNC_KEYS = [
    'vortex_users',
    'vortex_items',
    'vortex_logs',
    'vortex_pa_logs',
    'vortex_ca_logs',
    'vortex_tikets',
    'vortex_aht_logs',
    'vortex_art_logs',
    'vortex_findings',
    'vortex_quiz_questions',
    'vortex_quiz_history',
    'vortex_timers',
    'vortex_stopwatches',
    'drive_typing_team_results',
    'vortex_ca_gsheet_config',
    'vortex_tiket_gsheet_config',
    'vortex_aht_gsheet_config',
    'vortex_art_gsheet_config',
    'vortex_finding_gsheet_config'
  ];

  const COLLECTION_NAME = 'drive_dashboard_data';

  class FirebaseSyncManager {
    constructor() {
      this.app = null;
      this.db = null;
      this.dashboard = null;
      this.isConnected = false;
      this.isSyncing = false;
      this.listeners = [];
      this.lastSyncTime = null;
      this.skipNextRemote = {}; // Mencegah feedback loop saat perubahan lokal dipush
      this._debounceTimers = {};
      this._suppressSync = false;
      this._storageIntercepted = false;
      this.isHydrating = false;

      // ID unik persisten untuk setiap browser / perangkat (HP atau PC)
      this.deviceId = 'dev_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
      try {
        let storedId = localStorage.getItem('vortex_device_id');
        if (!storedId) {
          storedId = this.deviceId;
          localStorage.setItem('vortex_device_id', storedId);
        }
        this.deviceId = storedId;
      } catch (e) {}
    }

    /**
     * Deteksi apakah suatu item merupakan data dummy / lama / default yang sudah dihapus
     */
    isDummyItem(item) {
      if (!item) return false;
      const DUMMY_IDS = new Set([
        'usr_user_1', 'usr_user_2', 'usr_admin_2',
        'run_demo_1', 'run_demo_2', 'run_demo_3', 'run_demo_4',
        'QZH-1001', 'QZH-1002', 'QZH-1003',
        'pa_1', 'pa_2', 'pa_3', 'pa_4', 'pa_5', 'pa_6',
        'ca_1', 'ca_2', 'ca_3', 'ca_4', 'ca_5', 'ca_6',
        'tkt_1', 'tkt_2', 'tkt_3', 'tkt_4', 'tkt_5', 'tkt_6',
        'aht_1', 'aht_2', 'aht_3', 'aht_4', 'aht_5', 'aht_6',
        'art_1', 'art_2', 'art_3', 'art_4', 'art_5', 'art_6',
        'fnd_1', 'fnd_2', 'fnd_3', 'fnd_4', 'fnd_5', 'FND-2026-005',
        'tmr_1', 'tmr_2', 'tmr_3', 'tmr_4',
        'sw_1', 'sw_2'
      ]);
      const DUMMY_USERNAMES = new Set(['user', 'ahmad_fauzi', 'dewi_lestari']);
      const DUMMY_NAMES = new Set([
        'siti rahma', 'ahmad fauzi', 'dewi lestari, m.t.', 'dewi lestari',
        'budi santoso, s.kom', 'budi santoso'
      ]);
      if (item.id) {
        if (DUMMY_IDS.has(item.id)) return true;
        if (typeof item.id === 'string' && (
          item.id.startsWith('run_demo_') ||
          item.id.startsWith('tkt_bs_') ||
          item.id.startsWith('aht_bs_') ||
          item.id.startsWith('art_bs_')
        )) return true;
      }
      if (item.userId && DUMMY_IDS.has(item.userId)) return true;
      if (item.username && DUMMY_USERNAMES.has(item.username.toLowerCase())) return true;
      if (item.userName && DUMMY_USERNAMES.has(item.userName.toLowerCase())) return true;
      const name = (item.userFullName || item.fullName || item.userName || item.author || item.targetUser || '').toLowerCase().trim();
      if (DUMMY_NAMES.has(name)) return true;
      const userStr = (item.user || '').toLowerCase();
      if (userStr.includes('siti rahma') || userStr.includes('ahmad fauzi') || userStr.includes('dewi lestari') || userStr.includes('budi santoso')) return true;
      return false;
    }

    /**
     * Dapatkan daftar ID item yang telah dihapus secara sengaja oleh pengguna
     */
    getDeletedIds(key) {
      try {
        const raw = localStorage.getItem('vortex_deleted_ids_' + key);
        const arr = raw ? JSON.parse(raw) : [];
        const set = new Set(Array.isArray(arr) ? arr : []);
        if (key === 'vortex_users') {
          set.add('usr_user_1');
          set.add('usr_user_2');
          set.add('usr_admin_2');
        } else if (key === 'vortex_quiz_history') {
          set.add('QZH-1001');
          set.add('QZH-1002');
          set.add('QZH-1003');
        } else if (key === 'vortex_quiz_questions') {
          ['QZ-001', 'QZ-002', 'QZ-003', 'QZ-004', 'QZ-005', 'QZ-006', 'QZ-007', 'QZ-008', 'QZ-009', 'QZ-010'].forEach(id => set.add(id));
        } else if (key === 'drive_typing_team_results') {
          ['run_demo_1', 'run_demo_2', 'run_demo_3', 'run_demo_4'].forEach(id => set.add(id));
        } else if (key === 'vortex_pa_logs') {
          ['pa_1', 'pa_2', 'pa_3', 'pa_4', 'pa_5', 'pa_6'].forEach(id => set.add(id));
        }
        return set;
      } catch (e) {
        const fallbackSet = new Set();
        if (key === 'vortex_users') { fallbackSet.add('usr_user_1'); fallbackSet.add('usr_user_2'); fallbackSet.add('usr_admin_2'); }
        if (key === 'vortex_quiz_history') { fallbackSet.add('QZH-1001'); fallbackSet.add('QZH-1002'); fallbackSet.add('QZH-1003'); }
        if (key === 'drive_typing_team_results') { ['run_demo_1', 'run_demo_2', 'run_demo_3', 'run_demo_4'].forEach(id => fallbackSet.add(id)); }
        return fallbackSet;
      }
    }

    /**
     * Dapatkan daftar ID item yang pernah disinkronkan ke/dari Cloud
     */
    getKnownSyncedIds(key) {
      try {
        const raw = localStorage.getItem('vortex_synced_ids_' + key);
        const arr = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(arr) ? arr : []);
      } catch (e) {
        return new Set();
      }
    }

    /**
     * Catat ID item yang berhasil disinkronkan
     */
    recordKnownSyncedIds(key, ids) {
      try {
        const set = this.getKnownSyncedIds(key);
        if (Array.isArray(ids)) {
          ids.forEach(id => { if (id) set.add(id); });
        }
        localStorage.setItem('vortex_synced_ids_' + key, JSON.stringify([...set]));
      } catch (e) {}
    }

    /**
     * Hapus ID dari daftar sinkron saat dihapus
     */
    removeKnownSyncedId(key, id) {
      try {
        const set = this.getKnownSyncedIds(key);
        set.delete(id);
        localStorage.setItem('vortex_synced_ids_' + key, JSON.stringify([...set]));
      } catch (e) {}
    }

    /**
     * Catat ID item yang dihapus agar tidak muncul kembali saat sinkronisasi
     */
    trackDeletedId(key, id) {
      if (!id) return;
      try {
        const set = this.getDeletedIds(key);
        set.add(id);
        localStorage.setItem('vortex_deleted_ids_' + key, JSON.stringify([...set]));
        this.removeKnownSyncedId(key, id);
      } catch (e) {}
    }

    /**
     * Hapus ID dari catatan terhapus saat pengguna membuat item baru
     */
    clearDeletedId(key, id) {
      if (!id) return;
      try {
        const set = this.getDeletedIds(key);
        set.delete(id);
        localStorage.setItem('vortex_deleted_ids_' + key, JSON.stringify([...set]));
      } catch (e) {}
    }

    /**
     * Segera kirim semua perubahan yang tertunda di debounce sebelum browser di-refresh atau ditutup
     */
    flushPendingSync() {
      if (!this._debounceTimers) return;
      Object.keys(this._debounceTimers).forEach((key) => {
        if (this._debounceTimers[key]) {
          clearTimeout(this._debounceTimers[key]);
          delete this._debounceTimers[key];
          try {
            const raw = localStorage.getItem(key);
            if (raw && this.isConnected && this.db) {
              const data = JSON.parse(raw);
              this.db.collection(COLLECTION_NAME).doc(key).set({
                payload: data,
                deletedIds: [...this.getDeletedIds(key)],
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedBy: 'Unload_Sync'
              }, { merge: true });
            }
          } catch (e) {}
        }
      });
    }

    /**
     * Dapatkan konfigurasi Firebase (prioritas: localStorage > window.DRIVE_FIREBASE_CONFIG)
     */
    getConfig() {
      try {
        const stored = localStorage.getItem('vortex_firebase_config');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.projectId && parsed.apiKey) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Gagal membaca firebase config dari storage', e);
      }

      if (window.DRIVE_FIREBASE_CONFIG && window.DRIVE_FIREBASE_CONFIG.projectId && window.DRIVE_FIREBASE_CONFIG.apiKey) {
        return window.DRIVE_FIREBASE_CONFIG;
      }

      return null;
    }

    /**
     * Simpan konfigurasi ke localStorage
     */
    saveConfig(config) {
      if (!config || !config.projectId || !config.apiKey) {
        throw new Error('Project ID dan API Key Firebase wajib diisi.');
      }
      localStorage.setItem('vortex_firebase_config', JSON.stringify(config));
    }

    /**
     * Inisialisasi Firebase & Firestore
     */
    async init(dashboardInstance) {
      if (dashboardInstance) {
        this.dashboard = dashboardInstance;
      }
      this.updateStatusBadge('checking', 'Memeriksa koneksi Cloud...');

      const config = this.getConfig();
      if (!config) {
        this.updateStatusBadge('offline', 'Lokal (Firebase belum diatur)');
        return false;
      }

      if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK belum termuat.');
        this.updateStatusBadge('offline', 'Firebase SDK tidak ditemukan');
        return false;
      }

      try {
        if (!firebase.apps.length) {
          this.app = firebase.initializeApp(config);
        } else {
          this.app = firebase.app();
        }

        this.db = firebase.firestore();

        // Aktifkan offline persistence jika didukung browser
        try {
          await this.db.enablePersistence({ synchronizeTabs: true });
        } catch (err) {
          if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
            console.debug('Persistence info:', err.code);
          }
        }

        this.isConnected = true;
        this.updateStatusBadge('online', 'Terhubung ke Cloud (Realtime)');

        // Tarik data master terbaru dari Cloud saat pertama kali terbuka di PC / device ini
        await this.syncAllFromCloud(false);

        // Aktifkan listener realtime agar pembaruan di PC lain langsung update di PC ini
        this.startRealtimeListeners();

        return true;
      } catch (error) {
        console.error('Firebase Cloud Init Error:', error);
        this.isConnected = false;
        this.updateStatusBadge('error', 'Gagal Konek: ' + (error.message || 'Error'));
        return false;
      }
    }

    /**
     * Helper cerdas untuk menggabungkan koleksi lokal dan remote dengan aman,
     * terutama menjaga state reset, updated timestamp, dan kelangsungan waktu lintas device pada Timer & Stopwatch
     */
    mergeCollections(key, localArr, remoteArr, deletedIds) {
      const isTimer = (key === 'vortex_timers');
      const isStopwatch = (key === 'vortex_stopwatches');
      const isTimerKey = (isTimer || isStopwatch);

      const catchUpTimerOrSw = (item, nowTime) => {
        if (!item || !item.isRunning || !item.lastTick) return item;
        const copy = { ...item };
        const now = nowTime || Date.now();
        const elapsedSec = Math.floor((now - Number(copy.lastTick)) / 1000);
        if (elapsedSec > 0) {
          if (isTimer) {
            copy.remainingSeconds = Math.max(0, (Number(copy.remainingSeconds) || 0) - elapsedSec);
            copy.lastTick = Number(copy.lastTick) + (elapsedSec * 1000);
            if (copy.remainingSeconds === 0) {
              copy.isRunning = false;
              copy.lastTick = null;
              copy.updatedAt = now;
            }
          } else {
            copy.elapsedSeconds = (Number(copy.elapsedSeconds) || 0) + elapsedSec;
            copy.lastTick = Number(copy.lastTick) + (elapsedSec * 1000);
          }
        }
        return copy;
      };

      if (!Array.isArray(localArr) || localArr.length === 0) {
        if (isTimerKey && Array.isArray(remoteArr)) {
          const now = Date.now();
          const caughtUp = remoteArr.filter(r => r && r.id && !deletedIds.has(r.id)).map(r => catchUpTimerOrSw(r, now));
          if (typeof this.recordKnownSyncedIds === 'function') {
            this.recordKnownSyncedIds(key, caughtUp.map(r => r.id));
          }
          return { merged: caughtUp, hasLocalOverrides: false };
        }
        return { merged: Array.isArray(remoteArr) ? remoteArr : [], hasLocalOverrides: false };
      }

      const DEFAULT_DEMO_TIMER_IDS = new Set([
        'tmr_user_1', 'tmr_user_2', 'tmr_user_3', 'tmr_admin_1', 'tmr_admin_2',
        'sw_user_1', 'sw_user_2', 'sw_admin_1', 'sw_admin_2'
      ]);

      const knownSyncedIds = (isTimerKey && typeof this.getKnownSyncedIds === 'function')
        ? this.getKnownSyncedIds(key)
        : new Set();

      if (!Array.isArray(remoteArr) || remoteArr.length === 0) {
        if (isTimerKey) {
          const brandNewLocal = localArr.filter(l => (
            l && l.id &&
            !deletedIds.has(l.id) &&
            !knownSyncedIds.has(l.id) &&
            !DEFAULT_DEMO_TIMER_IDS.has(l.id)
          ));
          return { merged: brandNewLocal, hasLocalOverrides: brandNewLocal.length > 0 };
        }
        const localOnly = localArr.filter(l => l && l.id && !deletedIds.has(l.id));
        return { merged: localOnly, hasLocalOverrides: localOnly.length > 0 };
      }

      if (isTimerKey) {
        const now = Date.now();
        const mergedMap = new Map();
        remoteArr.forEach(r => {
          if (r && r.id && !deletedIds.has(r.id)) {
            mergedMap.set(r.id, catchUpTimerOrSw(r, now));
          }
        });

        if (typeof this.recordKnownSyncedIds === 'function') {
          this.recordKnownSyncedIds(key, remoteArr.map(r => r && r.id));
        }

        let hasLocalOverrides = false;
        localArr.forEach(rawL => {
          if (!rawL || !rawL.id || deletedIds.has(rawL.id)) return;
          const l = catchUpTimerOrSw(rawL, now);
          const r = mergedMap.get(l.id);
          if (!r) {
            // Item ada di lokal tapi tidak ada di remoteArr (Cloud)
            // 1. Abaikan item demo bawaan jika cloud sudah memiliki koleksi
            if (DEFAULT_DEMO_TIMER_IDS.has(l.id) && remoteArr.length > 0) {
              return;
            }
            // 2. Jika item pernah disinkronkan ke cloud, berarti item telah dihapus di device lain!
            if (knownSyncedIds.has(l.id)) {
              if (typeof this.trackDeletedId === 'function') {
                this.trackDeletedId(key, l.id);
              }
              return;
            }
            // 3. Item baru yang dibuat lokal saat offline
            mergedMap.set(l.id, l);
            hasLocalOverrides = true;
          } else {
            const lStarted = Number(l.startedAt || (l.isRunning ? (l.lastTick || l.updatedAt || 0) : 0));
            const lPaused = Number(l.pausedAt || (!l.isRunning ? (l.updatedAt || 0) : 0));
            const lIsReset = (l.isRunning === false && (
              (isTimer && l.remainingSeconds === l.totalSeconds) ||
              (isStopwatch && l.elapsedSeconds === 0)
            ));
            const lReset = Number(l.resetAt || (lIsReset ? (l.updatedAt || 0) : 0));

            const rStarted = Number(r.startedAt || (r.isRunning ? (r.lastTick || r.updatedAt || 0) : 0));
            const rPaused = Number(r.pausedAt || (!r.isRunning ? (r.updatedAt || 0) : 0));
            const rIsReset = (r.isRunning === false && (
              (isTimer && r.remainingSeconds === r.totalSeconds) ||
              (isStopwatch && r.elapsedSeconds === 0)
            ));
            const rReset = Number(r.resetAt || (rIsReset ? (r.updatedAt || 0) : 0));

            let chosen = r; // Default ke Cloud snapshot yang sudah dicatch-up

            // ATURAN 1: Remote TIDAK berjalan, Lokal SEDANG berjalan
            if (!r.isRunning && l.isRunning) {
              if (rIsReset && (rReset >= lStarted - 500)) {
                // Remote direset secara eksplisit di device lain setelah lokal mulai
                chosen = r;
              } else if (lStarted > Math.max(rPaused, rReset, Number(r.updatedAt || 0)) + 500) {
                // User di device ini secara eksplisit mengklik Mulai SETELAH remote dijeda/direset
                chosen = l;
                hasLocalOverrides = true;
              } else {
                // Remote dijeda di device lain -> Device ini harus ikut jeda!
                chosen = r;
              }
            }
            // ATURAN 2: Remote SEDANG berjalan, Lokal TIDAK berjalan
            else if (r.isRunning && !l.isRunning) {
              if (lIsReset && (lReset > rStarted + 500)) {
                // User di device ini secara eksplisit mereset setelah remote mulai
                chosen = l;
                hasLocalOverrides = true;
              } else if (lPaused > rStarted + 500) {
                // User di device ini secara eksplisit menjeda setelah remote mulai
                chosen = l;
                hasLocalOverrides = true;
              } else {
                // Remote mulai berjalan di device lain -> Device ini harus ikut berjalan!
                chosen = r;
              }
            }
            // ATURAN 3: Keduanya SEDANG berjalan
            else if (r.isRunning && l.isRunning) {
              // Gunakan remote sebagai acuan tunggal agar waktu sinkron realtime tanpa drift
              chosen = r;
            }
            // ATURAN 4: Keduanya TIDAK berjalan
            else {
              if (lIsReset && !rIsReset && lReset > Math.max(rReset, rPaused, Number(r.updatedAt || 0)) + 500) {
                chosen = l;
                hasLocalOverrides = true;
              } else if (rIsReset) {
                chosen = r;
              } else if (Math.max(lPaused, Number(l.updatedAt || 0)) > Math.max(rPaused, Number(r.updatedAt || 0)) + 500) {
                chosen = l;
                hasLocalOverrides = true;
              } else {
                chosen = r;
              }
            }

            mergedMap.set(l.id, chosen);
            if (chosen === l && (
              r.isRunning !== l.isRunning ||
              r.remainingSeconds !== l.remainingSeconds ||
              r.elapsedSeconds !== l.elapsedSeconds
            )) {
              hasLocalOverrides = true;
            }
          }
        });

        return { merged: Array.from(mergedMap.values()), hasLocalOverrides };
      }

      const cleanRemote = Array.isArray(remoteArr) ? remoteArr.filter(r => r && !this.isDummyItem(r) && !deletedIds.has(r.id)) : [];
      const cleanLocal = Array.isArray(localArr) ? localArr.filter(l => l && !this.isDummyItem(l) && !deletedIds.has(l.id)) : [];

      if (key === 'vortex_users') {
        if (cleanRemote.length > 0) {
          // Cloud Firestore adalah sumber kebenaran data terupdate untuk Manajemen Team
          // Hanya tambahkan user lokal baru jika benar-benar baru dibuat dan bukan akun demo/dummy
          const localBrandNew = cleanLocal.filter(l => l && l.id && !cleanRemote.some(r => r.id === l.id || (r.username && l.username && r.username.toLowerCase() === l.username.toLowerCase())));
          if (localBrandNew.length > 0) {
            return { merged: [...cleanRemote, ...localBrandNew], hasLocalOverrides: true };
          }
          return { merged: cleanRemote, hasLocalOverrides: false };
        }
        return { merged: cleanLocal, hasLocalOverrides: cleanLocal.length > 0 };
      }

      if (key === 'vortex_quiz_questions') {
        const DEFAULT_QUIZ_IDS = new Set(['QZ-001', 'QZ-002', 'QZ-003', 'QZ-004', 'QZ-005', 'QZ-006', 'QZ-007', 'QZ-008', 'QZ-009', 'QZ-010']);
        if (cleanRemote.length > 0) {
          // Cloud Firestore adalah sumber kebenaran data terupdate untuk Bank Soal Kuis
          // Jangan membangkitkan kembali soal default yang telah dihapus oleh Admin di Cloud
          const localBrandNew = cleanLocal.filter(l => l && l.id && !cleanRemote.some(r => r.id === l.id) && !DEFAULT_QUIZ_IDS.has(l.id));
          if (localBrandNew.length > 0) {
            return { merged: [...cleanRemote, ...localBrandNew], hasLocalOverrides: true };
          }
          return { merged: cleanRemote, hasLocalOverrides: false };
        }
        return { merged: cleanLocal, hasLocalOverrides: cleanLocal.length > 0 };
      }

      if (key === 'vortex_quiz_history') {
        // Cloud Firestore & Local digabungkan dengan membersihkan seluruh dummy / demo history
        const map = new Map();
        cleanRemote.forEach(r => { if (r && r.id) map.set(r.id, r); });
        cleanLocal.forEach(l => { if (l && l.id && !map.has(l.id)) map.set(l.id, l); });
        const mergedHistory = Array.from(map.values()).sort((a, b) => (new Date(b.timestamp || 0) - new Date(a.timestamp || 0)));
        const hasLocalNew = cleanLocal.some(l => l && l.id && !cleanRemote.some(r => r.id === l.id));
        return { merged: mergedHistory, hasLocalOverrides: hasLocalNew };
      }

      if (key === 'drive_typing_team_results') {
        const map = new Map();
        cleanRemote.forEach(r => { if (r && r.id && !this.isDummyItem(r)) map.set(r.id, r); });
        cleanLocal.forEach(l => { if (l && l.id && !this.isDummyItem(l) && !map.has(l.id)) map.set(l.id, l); });
        const mergedResults = Array.from(map.values()).sort((a, b) => ((b.wpm || 0) - (a.wpm || 0)));
        const hasLocalNew = cleanLocal.some(l => l && l.id && !this.isDummyItem(l) && !cleanRemote.some(r => r.id === l.id));
        return { merged: mergedResults, hasLocalOverrides: hasLocalNew };
      }

      // Default pengaman untuk seluruh koleksi data lainnya:
      // Jika remote memiliki data, remote adalah sumber kebenaran utama yang terupdate.
      // Hanya tambahkan data lokal baru jika item lokal tersebut memiliki ID baru yang dibuat saat offline
      // dan bukan merupakan item dummy/default lama.
      if (cleanRemote.length > 0) {
        const localOnly = cleanLocal.filter(l => l && l.id && !cleanRemote.some(r => r && r.id === l.id) && !this.isDummyItem(l));
        if (localOnly.length > 0) {
          return { merged: [...cleanRemote, ...localOnly], hasLocalOverrides: true };
        }
        return { merged: cleanRemote, hasLocalOverrides: false };
      }
      return { merged: cleanLocal, hasLocalOverrides: cleanLocal.length > 0 };
    }

    /**
     * Mulai mendengarkan perubahan realtime dari Firestore untuk semua koleksi data
     */
    startRealtimeListeners() {
      if (!this.db) return;

      // Hentikan listener lama jika ada
      this.stopRealtimeListeners();

      SYNC_KEYS.forEach((key) => {
        try {
          const unsub = this.db.collection(COLLECTION_NAME).doc(key).onSnapshot((docSnapshot) => {
            if (!docSnapshot.exists) return;

            const docData = docSnapshot.data();
            if (!docData || docData.payload === undefined) return;

            // 1. Abaikan jika update ini masih berstatus pending write lokal di browser device ini
            if (docSnapshot.metadata && docSnapshot.metadata.hasPendingWrites) {
              return;
            }

            // 2. Abaikan jika ini gema pantulan dari device ini sendiri
            if (docData.writerDeviceId && docData.writerDeviceId === this.deviceId) {
              return;
            }

            // Sinkronisasi catatan ID item yang dihapus dari cloud ke lokal
            if (Array.isArray(docData.deletedIds) && docData.deletedIds.length > 0) {
              docData.deletedIds.forEach(dId => this.trackDeletedId(key, dId));
            }

            const currentLocalRaw = localStorage.getItem(key);
            let finalPayload = docData.payload;

            // Pengaman khusus semua koleksi data (Array of items with id): Jangan menimpa item lokal yang baru dibuat / direset
            if (Array.isArray(docData.payload)) {
              try {
                const localArr = JSON.parse(currentLocalRaw || '[]');
                const remoteArr = Array.isArray(docData.payload) ? docData.payload : [];
                const deletedIds = this.getDeletedIds(key);
                const { merged, hasLocalOverrides } = this.mergeCollections(key, localArr, remoteArr, deletedIds);
                finalPayload = Array.isArray(merged) ? merged.filter(item => item && !this.isDummyItem(item)) : merged;
                if (hasLocalOverrides) {
                  this.notifyDataChanged(key, finalPayload, true);
                }
              } catch (e) {
                console.debug(`Error in realtime ${key} merge:`, e);
              }
            }

            const finalRaw = JSON.stringify(finalPayload);
            if (currentLocalRaw !== finalRaw) {
              this._suppressSync = true;
              localStorage.setItem(key, finalRaw);
              this._suppressSync = false;
              if (typeof window !== 'undefined' && typeof window.catchUpTimersAndStopwatches === 'function' && (key === 'vortex_timers' || key === 'vortex_stopwatches')) {
                window.catchUpTimersAndStopwatches();
              }
              this.lastSyncTime = new Date();
              this.onRemoteDataUpdated(key, finalPayload);
            }
          }, (err) => {
            console.warn(`Realtime listener error untuk ${key}:`, err);
          });

          this.listeners.push(unsub);
        } catch (err) {
          console.warn(`Gagal memasang listener untuk ${key}:`, err);
        }
      });
    }

    /**
     * Hentikan semua listener realtime
     */
    stopRealtimeListeners() {
      this.listeners.forEach((unsub) => {
        if (typeof unsub === 'function') unsub();
      });
      this.listeners = [];
    }

    /**
     * Re-render tampilan dashboard secara adaptif saat data berubah
     */
    reRenderCurrentView(key = 'all') {
      try {
        const stateObj = this.dashboard || window.state;

        // 1. Sinkronisasi sesi pengguna aktif jika daftar user berubah
        if ((key === 'all' || key === 'vortex_users') && stateObj && stateObj.currentUser) {
          try {
            const rawUsers = localStorage.getItem('vortex_users');
            if (rawUsers) {
              const users = JSON.parse(rawUsers);
              const found = users.find(u => u.id === stateObj.currentUser.id || (u.username && u.username.toLowerCase() === (stateObj.currentUser.username || '').toLowerCase()));
              if (found) {
                stateObj.currentUser = found;
                localStorage.setItem('vortex_session', JSON.stringify(found));
                const sbName = document.getElementById('sidebarUserName');
                const tbName = document.getElementById('topbarUserName');
                const sbAvatar = document.getElementById('sidebarUserAvatar');
                const sbRole = document.getElementById('sidebarUserRoleBadge');
                if (sbName) sbName.textContent = found.fullName || found.username;
                if (tbName) tbName.textContent = found.fullName || found.username;
                if (sbAvatar && found.avatar) sbAvatar.src = found.avatar;
                if (sbRole) sbRole.textContent = (found.role || 'user').toUpperCase();
              }
            }
          } catch (e) {
            console.debug('Error updating session user:', e);
          }
        }

        // 2. Perbarui dropdown filter bulan dinamis di semua halaman
        if (typeof window.updateDynamicMonthDropdowns === 'function') {
          window.updateDynamicMonthDropdowns();
        }

        // 3. Re-render halaman yang sedang aktif di layar secara spesifik dan cerdas
        const activePage = (stateObj && stateObj.currentPage) || 'overview';

        // KHUSUS MENU "Typing Test": Jaga stabilitas maksimal agar tidak terganggu sinkronisasi cloud
        if (activePage === 'typing-test') {
          // Jika yang berubah adalah hasil balapan tim atau sync all:
          if (key === 'drive_typing_team_results' || key === 'all') {
            // Hanya update leaderboard hasil balapan tanpa merestart atau merefresh arena kata
            if (typeof window.renderAdminTypingLeaderboard === 'function') {
              window.renderAdminTypingLeaderboard();
            }
            if (typeof window.renderTypingHistory === 'function') {
              window.renderTypingHistory();
            }
          }
          // JANGAN lakukan navigateToPage atau reset arena game sama sekali saat di menu Typing Test!
          return;
        }

        // KHUSUS MENU "Quiz": Jaga stabilitas jika sedang dalam arena battle aktif
        if (activePage === 'quiz') {
          if (key === 'vortex_quiz_questions' && typeof window.renderQuizAdminQuestions === 'function') {
            window.renderQuizAdminQuestions();
          }
          if (key === 'vortex_quiz_history' && typeof window.renderQuizLeaderboard === 'function') {
            window.renderQuizLeaderboard();
          }
          if (key === 'all' && typeof window.renderQuizPage === 'function') {
            const qState = window.quizState;
            if (!qState || qState.status !== 'battling') {
              window.renderQuizPage();
            }
          }
          return;
        }

        // Pemetaan halaman dan key data yang relevan agar halaman tidak ter-refresh oleh data lain yang tidak terkait
        const PAGE_AFFECTED_KEYS = {
          'overview': ['vortex_ca_logs', 'vortex_tikets', 'vortex_art_logs', 'vortex_pa_logs', 'vortex_items', 'vortex_users', 'all'],
          'data-management': ['vortex_items', 'vortex_users', 'all'],
          'update-pa': ['vortex_pa_logs', 'vortex_users', 'all'],
          'ca': ['vortex_ca_logs', 'vortex_ca_gsheet_config', 'vortex_users', 'all'],
          'tiket': ['vortex_tikets', 'vortex_tiket_gsheet_config', 'vortex_users', 'all'],
          'aht': ['vortex_aht_logs', 'vortex_aht_gsheet_config', 'vortex_users', 'all'],
          'art': ['vortex_art_logs', 'vortex_art_gsheet_config', 'vortex_users', 'all'],
          'finding': ['vortex_findings', 'vortex_finding_gsheet_config', 'vortex_users', 'all'],
          'timer': ['vortex_timers', 'vortex_stopwatches', 'vortex_users', 'all'],
          'user-management': ['vortex_users', 'all'],
          'activity-log': ['vortex_logs', 'all']
        };

        const relevantKeys = PAGE_AFFECTED_KEYS[activePage] || ['all'];
        if (relevantKeys.includes(key)) {
          if (activePage === 'timer' && typeof window.renderTimerPage === 'function') {
            window.renderTimerPage();
          } else if (typeof window.navigateToPage === 'function') {
            window.navigateToPage(activePage, false);
          } else if (typeof window.renderAppView === 'function') {
            window.renderAppView();
          }
        }

        // 4. Jika yang diperbarui adalah data yang memengaruhi Ringkasan (CA, Tiket, ART, PA, Item)
        // dan user sedang di halaman lain, update data overview di latar belakang
        if (activePage !== 'overview' && ['vortex_ca_logs', 'vortex_tikets', 'vortex_art_logs', 'vortex_pa_logs', 'vortex_items'].includes(key)) {
          if (typeof window.renderOverviewPage === 'function') {
            window.renderOverviewPage();
          }
        }
      } catch (err) {
        console.debug('Error in reRenderCurrentView:', err);
      }
    }

    onRemoteDataUpdated(key, data) {
      // Re-render tampilan halaman secara instan dan senyap tanpa popup notifikasi
      this.reRenderCurrentView(key);
    }

    /**
     * Kirim pembaruan ke Firestore saat ada penambahan, pengeditan, atau penghapusan data
     */
    notifyDataChanged(key, data, immediate = false) {
      if (!this.isConnected || !this.db || this.isHydrating) return;
      if (!immediate && this._suppressSync) return;

      this.skipNextRemote[key] = Date.now();
      try {
        localStorage.setItem(key + '_updated_at', Date.now().toString());
      } catch (e) {}

      // Bersihkan item aktif dari catatan deletedIds jika ada yang dibuat ulang
      if (Array.isArray(data)) {
        try {
          const set = this.getDeletedIds(key);
          if (set.size > 0) {
            let changed = false;
            data.forEach(item => {
              if (item && item.id && set.has(item.id)) {
                set.delete(item.id);
                changed = true;
              }
            });
            if (changed) {
              localStorage.setItem('vortex_deleted_ids_' + key, JSON.stringify([...set]));
            }
          }
        } catch (e) {}
      }

      // Debounce writes agar tidak spamming jika terjadi multiple changes cepat
      if (!this._debounceTimers) this._debounceTimers = {};
      if (this._debounceTimers[key]) clearTimeout(this._debounceTimers[key]);

      const performSave = async () => {
        delete this._debounceTimers[key];
        try {
          this.updateStatusBadge('syncing', 'Menyimpan ke Cloud...');

          // Bersihkan data dari objek non-serializable atau undefined
          const cleanData = JSON.parse(JSON.stringify(data));
          const stateObj = this.dashboard || window.state;
          const username = (stateObj && stateObj.currentUser && (stateObj.currentUser.fullName || stateObj.currentUser.username)) || 'Device';

          await this.db.collection(COLLECTION_NAME).doc(key).set({
            payload: cleanData,
            deletedIds: [...this.getDeletedIds(key)],
            writerDeviceId: this.deviceId,
            actionTimestamp: Date.now(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy: username
          }, { merge: true });

          this.lastSyncTime = new Date();
          this.updateStatusBadge('online', 'Terhubung ke Cloud (Realtime)');
        } catch (err) {
          console.warn(`Gagal sinkron ${key} ke cloud:`, err);
          this.updateStatusBadge('online', 'Tersimpan lokal (Cloud tertunda)');
        }
      };

      if (immediate) {
        performSave();
        return;
      }

      const delay = (key === 'vortex_timers' || key === 'vortex_stopwatches') ? 100 : 150;
      this._debounceTimers[key] = setTimeout(performSave, delay);
    }

    /**
     * Segera flush dan bersihkan timer sync yang masih pending sebelum tab ditutup / direfresh
     */
    flushPendingSync() {
      if (this._debounceTimers) {
        Object.keys(this._debounceTimers).forEach((key) => {
          if (this._debounceTimers[key]) {
            clearTimeout(this._debounceTimers[key]);
            delete this._debounceTimers[key];
          }
        });
      }
    }

    /**
     * Unggah SELURUH data lokal ke Cloud Firestore (Initial Seed / Upload Manual)
     */
    async syncAllToCloud(showToast = true) {
      if (!this.isConnected || !this.db) {
        throw new Error('Belum terhubung ke Firebase Cloud.');
      }

      this.isSyncing = true;
      this.updateStatusBadge('syncing', 'Mengunggah semua data...');

      try {
        const batch = this.db.batch();
        let totalKeys = 0;
        const stateObj = this.dashboard || window.state;
        const username = (stateObj && stateObj.currentUser && (stateObj.currentUser.fullName || stateObj.currentUser.username)) || 'Device_Upload';

        SYNC_KEYS.forEach((key) => {
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const data = JSON.parse(raw);
              const cleanData = JSON.parse(JSON.stringify(data));
              const ref = this.db.collection(COLLECTION_NAME).doc(key);
              batch.set(ref, {
                payload: cleanData,
                deletedIds: [...this.getDeletedIds(key)],
                writerDeviceId: this.deviceId,
                actionTimestamp: Date.now(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedBy: username
              }, { merge: true });
              totalKeys++;
            } catch (e) {
              console.warn(`Gagal parse JSON untuk ${key}:`, e);
            }
          }
        });

        await batch.commit();
        this.lastSyncTime = new Date();
        this.isSyncing = false;
        this.updateStatusBadge('online', 'Terhubung ke Cloud (Realtime)');

        return true;
      } catch (err) {
        this.isSyncing = false;
        this.updateStatusBadge('error', 'Gagal upload: ' + err.message);
        throw err;
      }
    }

    /**
     * Unduh SELURUH data dari Cloud Firestore ke LocalStorage (Berguna saat baru buka di PC / device baru)
     */
    async syncAllFromCloud(showToast = false) {
      if (!this.isConnected || !this.db) {
        throw new Error('Belum terhubung ke Firebase Cloud.');
      }

      this.isSyncing = true;
      this.isHydrating = true;
      this.updateStatusBadge('syncing', 'Mengunduh data terbaru...');

      try {
        const snapshot = await this.db.collection(COLLECTION_NAME).get();

        if (snapshot.empty) {
          // Jika cloud masih kosong, lakukan auto-seed dari data master lokal
          console.log('Cloud Firestore masih kosong. Melakukan auto-seed dari data master lokal...');
          await this.syncAllToCloud(false);
          this.isSyncing = false;
          this.isHydrating = false;
          return;
        }

        let updatedCount = 0;
        this._suppressSync = true;
        snapshot.forEach((doc) => {
          const key = doc.id;
          const data = doc.data();
          if (data && data.payload !== undefined && data.payload !== null) {
            // Sinkronisasi catatan ID item yang dihapus dari cloud ke lokal
            if (Array.isArray(data.deletedIds) && data.deletedIds.length > 0) {
              data.deletedIds.forEach(dId => this.trackDeletedId(key, dId));
            }
            let finalPayload = data.payload;

            // PENGAMAN KHUSUS SEMUA KOLEKSI DATA (Array of items with id):
            // JANGAN SAMPAI DATA LOKAL BARU / BELUM DISINKRONKAN HILANG SAAT REFRESH
            // DAN JANGAN TIMPA TIMER/STOPWATCH LOKAL YANG TELAH DIRESET DENGAN DATA REMOTE LAMA
            if (Array.isArray(data.payload)) {
              try {
                const localRaw = localStorage.getItem(key);
                const localArr = localRaw ? JSON.parse(localRaw) : [];
                const remoteArr = Array.isArray(data.payload) ? data.payload : [];
                const deletedIds = this.getDeletedIds(key);
                const { merged, hasLocalOverrides } = this.mergeCollections(key, localArr, remoteArr, deletedIds);
                finalPayload = Array.isArray(merged) ? merged.filter(item => item && !this.isDummyItem(item)) : merged;
                if (hasLocalOverrides) {
                  // Kirim pembaruan gabungan kembali ke cloud agar cloud juga memiliki data terbaru yang direset
                  setTimeout(() => {
                    this.notifyDataChanged(key, finalPayload, true);
                  }, 200);
                }
              } catch (e) {
                console.warn(`Gagal merge data untuk ${key} saat sync:`, e);
              }
            }

            localStorage.setItem(key, JSON.stringify(finalPayload));
            updatedCount++;
          }
        });
        localStorage.setItem('vortex_data_initialized', 'true');
        this._suppressSync = false;
        this.isHydrating = false;

        this.lastSyncTime = new Date();
        this.isSyncing = false;
        this.updateStatusBadge('online', 'Terhubung ke Cloud (Realtime)');

        // Catch-up timer & stopwatch yang sedang berjalan segera setelah unduh dari cloud
        if (typeof window !== 'undefined' && typeof window.catchUpTimersAndStopwatches === 'function') {
          window.catchUpTimersAndStopwatches();
        }

        // Re-render dashboard setelah data cloud berhasil ditarik ke browser
        this.reRenderCurrentView('all');

        return true;
      } catch (err) {
        this._suppressSync = false;
        this.isHydrating = false;
        this.isSyncing = false;
        this.updateStatusBadge('error', 'Gagal download: ' + err.message);
        throw err;
      }
    }

    /**
     * BACKUP INSTAN: Export seluruh data ke file JSON
     */
    exportBackupJson() {
      const stateObj = this.dashboard || window.state;
      const backupObj = {
        app: 'DRIVE_DASHBOARD',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        exportedBy: (stateObj && stateObj.currentUser && (stateObj.currentUser.fullName || stateObj.currentUser.username)) || 'user',
        data: {}
      };

      SYNC_KEYS.forEach((key) => {
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            backupObj.data[key] = JSON.parse(raw);
          } catch (e) {
            backupObj.data[key] = raw;
          }
        }
      });

      // Tambahkan juga preferensi tampilan & tema
      const allLocalKeys = Object.keys(localStorage);
      allLocalKeys.forEach((k) => {
        if (k.startsWith('drive_') || k.startsWith('quiz_')) {
          backupObj.data[k] = localStorage.getItem(k);
        }
      });

      const jsonStr = JSON.stringify(backupObj, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `DRIVE_Dashboard_Backup_${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (typeof window.showToast === 'function') {
        window.showToast('Export Berhasil', 'File backup JSON berhasil diunduh!', 'success');
      }
    }

    /**
     * RESTORE INSTAN: Import seluruh data dari file JSON
     */
    async importBackupJson(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const content = e.target.result;
            const parsed = JSON.parse(content);

            if (!parsed.data) {
              throw new Error('Format file backup tidak valid (data tidak ditemukan).');
            }

            let count = 0;
            this._suppressSync = true;
            Object.keys(parsed.data).forEach((key) => {
              const val = parsed.data[key];
              localStorage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : String(val));
              count++;
            });
            this._suppressSync = false;

            // Jika terhubung ke cloud, sinkronkan data baru ini ke Cloud Firestore
            if (this.isConnected) {
              await this.syncAllToCloud(false);
            }

            if (typeof window.showToast === 'function') {
              window.showToast('Restore Berhasil', `Berhasil memulihkan ${count} data dari backup! Halaman akan dimuat ulang...`, 'success');
            }

            setTimeout(() => {
              window.location.reload();
            }, 1000);

            resolve(count);
          } catch (err) {
            this._suppressSync = false;
            if (typeof window.showToast === 'function') {
              window.showToast('Gagal Restore', 'Gagal membaca file backup: ' + err.message, 'danger');
            }
            reject(err);
          }
        };
        reader.onerror = () => reject(new Error('Gagal membaca file.'));
        reader.readAsText(file);
      });
    }

    /**
     * Perbarui UI Status Badge di Header Topbar & Modal
     */
    updateStatusBadge(status, text) {
      const dot = document.getElementById('cloudSyncDot');
      const btn = document.getElementById('btnCloudSync');
      const modalStatus = document.getElementById('cloudModalStatusText');
      const modalDot = document.getElementById('cloudModalStatusDot');

      if (dot) {
        dot.className = 'cloud-sync-status-dot ' + status;
      }
      if (btn) {
        btn.setAttribute('title', `Cloud Sync: ${text} (Klik untuk pengaturan)`);
      }
      if (modalStatus) {
        modalStatus.textContent = text;
      }
      if (modalDot) {
        modalDot.className = 'cloud-status-indicator ' + status;
      }
    }

    /**
     * Pasang wrapper ke fungsi save di State Manager agar otomatis sinkron ke cloud
     */
    attachSaveHooks(state) {
      if (!state) return;
      this.dashboard = state;

      const syncMap = [
        { method: 'saveUsers', key: 'vortex_users' },
        { method: 'saveItems', key: 'vortex_items' },
        { method: 'saveLogs', key: 'vortex_logs' },
        { method: 'saveTimers', key: 'vortex_timers' },
        { method: 'saveStopwatches', key: 'vortex_stopwatches' },
        { method: 'savePaLogs', key: 'vortex_pa_logs' },
        { method: 'saveCaLogs', key: 'vortex_ca_logs' },
        { method: 'saveTikets', key: 'vortex_tikets' },
        { method: 'saveAhtLogs', key: 'vortex_aht_logs' },
        { method: 'saveArtLogs', key: 'vortex_art_logs' },
        { method: 'saveFindings', key: 'vortex_findings' },
        { method: 'saveQuizQuestions', key: 'vortex_quiz_questions' },
        { method: 'saveQuizHistory', key: 'vortex_quiz_history' },
        { method: 'saveCaGSheetConfig', key: 'vortex_ca_gsheet_config' },
        { method: 'saveTiketGSheetConfig', key: 'vortex_tiket_gsheet_config' },
        { method: 'saveAhtGSheetConfig', key: 'vortex_aht_gsheet_config' },
        { method: 'saveArtGSheetConfig', key: 'vortex_art_gsheet_config' },
        { method: 'saveFindingGSheetConfig', key: 'vortex_finding_gsheet_config' }
      ];

      syncMap.forEach(({ method, key }) => {
        if (typeof state[method] === 'function' && !state[method]._isHooked) {
          const original = state[method].bind(state);
          state[method] = (data) => {
            const result = original(data);
            const isImmediate = (key === 'vortex_timers' || key === 'vortex_stopwatches');
            this.notifyDataChanged(key, data, isImmediate);
            return result;
          };
          state[method]._isHooked = true;
        }
      });

      // Hook resetAllData agar saat direset oleh Admin, Cloud Firestore juga diselaraskan
      if (typeof state.resetAllData === 'function' && !state.resetAllData._isHooked) {
        const origReset = state.resetAllData.bind(state);
        state.resetAllData = () => {
          origReset();
          this.syncAllToCloud(false);
        };
        state.resetAllData._isHooked = true;
      }

      // Intercept localStorage.setItem globally untuk menangkap semua mutasi langsung pada SYNC_KEYS
      if (typeof window !== 'undefined' && window.localStorage && !this._storageIntercepted) {
        this._storageIntercepted = true;
        const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
        const self = this;
        window.localStorage.setItem = function(key, value) {
          originalSetItem(key, value);
          if (SYNC_KEYS.includes(key) && !self._suppressSync && self.isConnected) {
            try {
              const parsed = JSON.parse(value);
              const isImmediate = (key === 'vortex_timers' || key === 'vortex_stopwatches');
              self.notifyDataChanged(key, parsed, isImmediate);
            } catch (e) {
              self.notifyDataChanged(key, value);
            }
          }
        };
      }
    }

    /**
     * Pasang event listeners untuk modal Cloud Sync
     */
    setupUIEvents() {
      const modal = document.getElementById('modalCloudSync');
      const btnOpen = document.getElementById('btnCloudSync');
      const btnClose = document.getElementById('btnCloseCloudSyncModal');
      const btnCancel = document.getElementById('btnCancelFirebaseModal');
      const btnRefresh = document.getElementById('btnRefreshCloudSync');
      const btnPull = document.getElementById('btnPullFromCloud');
      const btnPush = document.getElementById('btnPushToCloud');
      const btnExport = document.getElementById('btnExportJsonBackup');
      const btnTriggerImport = document.getElementById('btnTriggerImportJson');
      const inputImport = document.getElementById('inputImportJsonFile');
      const formConfig = document.getElementById('formFirebaseConfig');

      const openModal = () => {
        if (!modal) return;
        modal.classList.remove('hidden');
        const cfg = this.getConfig();
        if (cfg) {
          const inpProj = document.getElementById('fbProjectId');
          const inpKey = document.getElementById('fbApiKey');
          const inpDomain = document.getElementById('fbAuthDomain');
          const inpApp = document.getElementById('fbAppId');
          if (inpProj && !inpProj.value) inpProj.value = cfg.projectId || '';
          if (inpKey && !inpKey.value) inpKey.value = cfg.apiKey || '';
          if (inpDomain && !inpDomain.value) inpDomain.value = cfg.authDomain || '';
          if (inpApp && !inpApp.value) inpApp.value = cfg.appId || '';
        }
      };

      const closeModal = () => {
        if (modal) modal.classList.add('hidden');
      };

      if (btnOpen) btnOpen.addEventListener('click', openModal);
      if (btnClose) btnClose.addEventListener('click', closeModal);
      if (btnCancel) btnCancel.addEventListener('click', closeModal);

      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });
      }

      if (btnRefresh) {
        btnRefresh.addEventListener('click', async () => {
          await this.init(this.dashboard || window.state);
        });
      }

      if (btnPull) {
        btnPull.addEventListener('click', async () => {
          try {
            await this.syncAllFromCloud(true);
          } catch (e) {
            alert('Gagal menarik data dari cloud: ' + e.message);
          }
        });
      }

      if (btnPush) {
        btnPush.addEventListener('click', async () => {
          if (confirm('Apakah Anda yakin ingin mengunggah semua data lokal saat ini ke Cloud? Seluruh data di Cloud akan diselaraskan dengan data lokal perangkat ini.')) {
            try {
              await this.syncAllToCloud(true);
            } catch (e) {
              alert('Gagal mengunggah data ke cloud: ' + e.message);
            }
          }
        });
      }

      if (btnExport) {
        btnExport.addEventListener('click', () => {
          this.exportBackupJson();
        });
      }

      if (btnTriggerImport && inputImport) {
        btnTriggerImport.addEventListener('click', () => {
          inputImport.click();
        });
        inputImport.addEventListener('change', async (e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            if (confirm(`Apakah Anda yakin ingin memulihkan data dari file "${file.name}"? Data di browser saat ini akan diganti dengan data dari file backup ini.`)) {
              await this.importBackupJson(file);
            }
            inputImport.value = '';
          }
        });
      }

      if (formConfig) {
        formConfig.addEventListener('submit', async (e) => {
          e.preventDefault();
          const projectId = (document.getElementById('fbProjectId')?.value || '').trim();
          const apiKey = (document.getElementById('fbApiKey')?.value || '').trim();
          const authDomain = (document.getElementById('fbAuthDomain')?.value || '').trim() || `${projectId}.firebaseapp.com`;
          const appId = (document.getElementById('fbAppId')?.value || '').trim();

          if (!projectId || !apiKey) {
            alert('Project ID dan API Key Firebase wajib diisi!');
            return;
          }

          const config = {
            projectId,
            apiKey,
            authDomain,
            appId,
            storageBucket: `${projectId}.appspot.com`
          };

          this.saveConfig(config);
          closeModal();
          if (typeof window.showToast === 'function') {
            window.showToast('Firebase Config', 'Konfigurasi Firebase disimpan. Menghubungkan ke Cloud...', 'info');
          }
          await this.init(this.dashboard || window.state);
        });
      }
    }
  }

  // Pasang singleton instance ke window
  window.FirebaseSync = new FirebaseSyncManager();

  // Global Resilience Shield (Mencegah runtime error atau unhandled rejection merusak aplikasi di HP / PC)
  if (typeof window.addEventListener === 'function') {
    window.addEventListener('unhandledrejection', (event) => {
      console.warn('[DRIVE Shield] Unhandled rejection diamankan:', event.reason);
      if (event.preventDefault) {
        event.preventDefault();
      }
    });

    window.addEventListener('error', (event) => {
      console.warn('[DRIVE Shield] Runtime error diamankan:', event.message || event);
    });
  }

  // Otomatis pasang hook dan inisialisasi saat DOM siap
  document.addEventListener('DOMContentLoaded', () => {
    window.FirebaseSync.setupUIEvents();
    if (window.state) {
      window.FirebaseSync.attachSaveHooks(window.state);
    }
    window.FirebaseSync.init(window.state);
  });

  // Tangani saat koneksi internet pulih (Online di PC / HP)
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('online', async () => {
      if (window.FirebaseSync && window.FirebaseSync.db) {
        try {
          await window.FirebaseSync.db.enableNetwork();
          window.FirebaseSync.isConnected = true;
          window.FirebaseSync.updateStatusBadge('online', 'Terhubung ke Cloud (Realtime)');
          if (typeof window.showToast === 'function') {
            window.showToast('Koneksi Pulih', 'Perangkat kembali online. Menyinkronkan data...', 'info');
          }
          await window.FirebaseSync.syncAllFromCloud(false);
        } catch (e) {
          console.warn('Gagal reconnect Firestore saat online:', e);
        }
      }
    });

    // Tangani saat koneksi internet terputus (Offline di PC / HP)
    window.addEventListener('offline', () => {
      if (window.FirebaseSync) {
        window.FirebaseSync.updateStatusBadge('offline', 'Mode Offline (Data aman tersimpan di perangkat)');
        if (typeof window.showToast === 'function') {
          window.showToast('Mode Offline', 'Koneksi terputus. Data tetap tersimpan aman di perangkat Anda.', 'warning');
        }
      }
    });

    // Segera kirim semua data tertunda ke cloud sebelum halaman direfresh / ditutup
    window.addEventListener('beforeunload', () => {
      if (window.FirebaseSync && typeof window.FirebaseSync.flushPendingSync === 'function') {
        window.FirebaseSync.flushPendingSync();
      }
    });

    window.addEventListener('pagehide', () => {
      if (window.FirebaseSync && typeof window.FirebaseSync.flushPendingSync === 'function') {
        window.FirebaseSync.flushPendingSync();
      }
    });

    // Sinkronisasi realtime antar-tab browser pada perangkat yang sama
    window.addEventListener('storage', (e) => {
      if (e && e.key && SYNC_KEYS.includes(e.key)) {
        try {
          if (window.FirebaseSync && typeof window.FirebaseSync.reRenderCurrentView === 'function') {
            window.FirebaseSync.reRenderCurrentView(e.key);
          }
        } catch (err) {}
      }
    });
  }

  // Tangani saat tab kembali aktif atau layar HP dibuka dari sleep / background (visibilitychange)
  if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible' && window.FirebaseSync && window.FirebaseSync.db && typeof navigator !== 'undefined' && navigator.onLine) {
        try {
          await window.FirebaseSync.db.enableNetwork();
          await window.FirebaseSync.syncAllFromCloud(false);
        } catch (e) {
          // Abaikan jika network sudah aktif
        }
      }
    });
  }

})();
