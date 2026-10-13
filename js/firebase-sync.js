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
    }

    /**
     * Dapatkan daftar ID item yang telah dihapus secara sengaja oleh pengguna
     */
    getDeletedIds(key) {
      try {
        const raw = localStorage.getItem('vortex_deleted_ids_' + key);
        const arr = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(arr) ? arr : []);
      } catch (e) {
        return new Set();
      }
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

            // Jika update ini dipicu oleh diri sendiri dalam waktu 2.5 detik terakhir, lewati
            if (this.skipNextRemote[key] && (Date.now() - this.skipNextRemote[key] < 2500)) {
              delete this.skipNextRemote[key];
              return;
            }

            const currentLocalRaw = localStorage.getItem(key);
            let finalPayload = docData.payload;

            // Pengaman khusus semua koleksi data (Array of items with id): Jangan menimpa item lokal yang baru dibuat
            if (Array.isArray(docData.payload)) {
              try {
                const localArr = JSON.parse(currentLocalRaw || '[]');
                const remoteArr = Array.isArray(docData.payload) ? docData.payload : [];
                if (Array.isArray(localArr) && localArr.length > 0) {
                  const deletedIds = this.getDeletedIds(key);
                  const localOnly = localArr.filter(l => l && l.id && !deletedIds.has(l.id) && !remoteArr.some(r => r && r.id === l.id));
                  if (localOnly.length > 0) {
                    finalPayload = [...remoteArr, ...localOnly];
                    this.notifyDataChanged(key, finalPayload, true);
                  }
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
          if (typeof window.navigateToPage === 'function') {
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
      if (!this.isConnected || !this.db || this.isHydrating || this._suppressSync) return;

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
            let finalPayload = data.payload;

            // PENGAMAN KHUSUS SEMUA KOLEKSI DATA (Array of items with id):
            // JANGAN SAMPAI DATA LOKAL BARU / BELUM DISINKRONKAN HILANG SAAT REFRESH
            if (Array.isArray(data.payload)) {
              try {
                const localRaw = localStorage.getItem(key);
                const localArr = localRaw ? JSON.parse(localRaw) : [];
                const remoteArr = Array.isArray(data.payload) ? data.payload : [];
                if (Array.isArray(localArr) && localArr.length > 0) {
                  const deletedIds = this.getDeletedIds(key);
                  const localOnly = localArr.filter(l => l && l.id && !deletedIds.has(l.id) && !remoteArr.some(r => r && r.id === l.id));
                  if (localOnly.length > 0) {
                    finalPayload = [...remoteArr, ...localOnly];
                    // Kirim pembaruan gabungan kembali ke cloud agar cloud juga memiliki data terbaru
                    setTimeout(() => {
                      this.notifyDataChanged(key, finalPayload, true);
                    }, 200);
                  }
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

  // Otomatis pasang hook dan inisialisasi saat DOM siap
  document.addEventListener('DOMContentLoaded', () => {
    window.FirebaseSync.setupUIEvents();
    if (window.state) {
      window.FirebaseSync.attachSaveHooks(window.state);
    }
    window.FirebaseSync.init(window.state);
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

})();
