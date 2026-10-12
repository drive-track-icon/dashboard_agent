/**
 * ============================================================================
 * DRIVE DASHBOARD - FIREBASE CLOUD SYNCHRONIZATION
 * ============================================================================
 * Menghubungkan dashboard ke Firebase Cloud Firestore sehingga seluruh data:
 * - Otomatis terupdate saat beralih PC, laptop, atau smartphone
 * - Realtime Sync: pembaruan di PC 1 langsung muncul di PC 2 tanpa refresh
 * - Offline-First: tetap cepat menggunakan LocalStorage jika offline
 * - Dilengkapi fitur Backup & Restore JSON untuk transfer manual cepat
 * ============================================================================
 */

(function () {
  'use strict';

  // Daftar key data yang disinkronkan antar PC & Device
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
      this.dashboard = dashboardInstance;
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

        // Aktifkan offline persistence jika belum aktif
        try {
          await this.db.enablePersistence({ synchronizeTabs: true });
        } catch (err) {
          if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
            console.debug('Persistence info:', err.code);
          }
        }

        this.isConnected = true;
        this.updateStatusBadge('online', 'Terhubung ke Cloud (Realtime)');

        // Tarik data terbaru dari Cloud saat pertama kali terbuka di PC ini
        await this.syncAllFromCloud(false);

        // Aktifkan listener realtime agar perubahan di PC lain langsung update di PC ini
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
     * Mulai mendengarkan perubahan realtime dari Firestore untuk semua koleksi
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
            if (!docData || !docData.payload) return;

            // Jika update ini dipicu oleh diri sendiri dalam waktu 2 detik terakhir, lewati
            if (this.skipNextRemote[key] && (Date.now() - this.skipNextRemote[key] < 2500)) {
              delete this.skipNextRemote[key];
              return;
            }

            const currentLocalRaw = localStorage.getItem(key);
            const remoteRaw = JSON.stringify(docData.payload);

            if (currentLocalRaw !== remoteRaw) {
              localStorage.setItem(key, remoteRaw);
              this.lastSyncTime = new Date();
              this.onRemoteDataUpdated(key, docData.payload);
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
     * Handler saat data diupdate dari perangkat lain via realtime
     */
    onRemoteDataUpdated(key, data) {
      if (!this.dashboard) return;

      // Tampilkan toast informatif jika sedang membuka halaman terkait
      const keyFriendlyNames = {
        'vortex_users': 'Pengguna',
        'vortex_items': 'Item',
        'vortex_tikets': 'Tiket Harian',
        'vortex_findings': 'Temuan Finding',
        'vortex_ca_logs': 'Coaching Agreement',
        'vortex_aht_logs': 'Log AHT',
        'vortex_art_logs': 'Log ART',
        'vortex_pa_logs': 'Log PA',
        'vortex_quiz_questions': 'Soal Kuis',
        'vortex_quiz_history': 'Riwayat Kuis'
      };

      const name = keyFriendlyNames[key] || 'Data';
      if (typeof this.dashboard.showToast === 'function') {
        this.dashboard.showToast(`Data ${name} otomatis diperbarui dari Cloud / perangkat lain.`, 'info');
      }

      // Re-render tampilan dashboard jika relevan dengan halaman aktif
      try {
        const activePage = this.dashboard.activePage || (this.dashboard.currentUser && this.dashboard.currentUser.activePage);
        
        if (key === 'vortex_users' && typeof this.dashboard.renderUserManagement === 'function') {
          this.dashboard.renderUserManagement();
        } else if (key === 'vortex_tikets' && typeof this.dashboard.renderTikets === 'function') {
          this.dashboard.renderTikets();
        } else if (key === 'vortex_findings' && typeof this.dashboard.renderFindings === 'function') {
          this.dashboard.renderFindings();
        } else if (key === 'vortex_ca_logs' && typeof this.dashboard.renderCaLogs === 'function') {
          this.dashboard.renderCaLogs();
        } else if (key === 'vortex_aht_logs' && typeof this.dashboard.renderAhtLogs === 'function') {
          this.dashboard.renderAhtLogs();
        } else if (key === 'vortex_art_logs' && typeof this.dashboard.renderArtLogs === 'function') {
          this.dashboard.renderArtLogs();
        } else if (key === 'vortex_pa_logs' && typeof this.dashboard.renderPaLogs === 'function') {
          this.dashboard.renderPaLogs();
        } else if (key === 'vortex_quiz_questions' && typeof this.dashboard.renderQuizQuestionsTable === 'function') {
          this.dashboard.renderQuizQuestionsTable();
        } else if (typeof this.dashboard.renderOverviewStats === 'function') {
          this.dashboard.renderOverviewStats();
        }
      } catch (err) {
        console.debug('Error re-rendering page on remote update:', err);
      }
    }

    /**
     * Kirim pembaruan ke Firestore saat ada method save() dipanggil di dashboard
     */
    async notifyDataChanged(key, data) {
      if (!this.isConnected || !this.db) return;

      this.skipNextRemote[key] = Date.now();

      try {
        this.updateStatusBadge('syncing', 'Menyimpan ke Cloud...');

        await this.db.collection(COLLECTION_NAME).doc(key).set({
          payload: data,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedBy: (this.dashboard && this.dashboard.currentUser && this.dashboard.currentUser.username) || 'device'
        }, { merge: true });

        this.lastSyncTime = new Date();
        this.updateStatusBadge('online', 'Terhubung ke Cloud (Realtime)');
      } catch (err) {
        console.warn(`Gagal sinkron ${key} ke cloud:`, err);
        this.updateStatusBadge('online', 'Tersimpan lokal (Cloud tertunda)');
      }
    }

    /**
     * Unggah SELURUH data lokal ke Cloud Firestore (Digunakan untuk Initial Seed / Upload Manual)
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

        SYNC_KEYS.forEach((key) => {
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const data = JSON.parse(raw);
              const ref = this.db.collection(COLLECTION_NAME).doc(key);
              batch.set(ref, {
                payload: data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedBy: (this.dashboard && this.dashboard.currentUser && this.dashboard.currentUser.username) || 'device_upload'
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

        if (showToast && this.dashboard && typeof this.dashboard.showToast === 'function') {
          this.dashboard.showToast(`Berhasil mengunggah ${totalKeys} data ke Cloud Firebase!`, 'success');
        }

        return true;
      } catch (err) {
        this.isSyncing = false;
        this.updateStatusBadge('error', 'Gagal upload: ' + err.message);
        throw err;
      }
    }

    /**
     * Unduh SELURUH data dari Cloud Firestore ke LocalStorage (Berguna saat baru buka di PC baru)
     */
    async syncAllFromCloud(showToast = true) {
      if (!this.isConnected || !this.db) {
        throw new Error('Belum terhubung ke Firebase Cloud.');
      }

      this.isSyncing = true;
      this.updateStatusBadge('syncing', 'Mengunduh data terbaru...');

      try {
        const snapshot = await this.db.collection(COLLECTION_NAME).get();

        if (snapshot.empty) {
          // Jika cloud masih kosong dan ada data di lokal, tawarkan/lakukan auto-seed
          console.log('Cloud Firestore masih kosong. Melakukan auto-seed dari data lokal...');
          await this.syncAllToCloud(false);
          this.isSyncing = false;
          return;
        }

        let updatedCount = 0;
        snapshot.forEach((doc) => {
          const key = doc.id;
          const data = doc.data();
          if (data && data.payload) {
            localStorage.setItem(key, JSON.stringify(data.payload));
            updatedCount++;
          }
        });

        this.lastSyncTime = new Date();
        this.isSyncing = false;
        this.updateStatusBadge('online', 'Terhubung ke Cloud (Realtime)');

        if (showToast && this.dashboard && typeof this.dashboard.showToast === 'function') {
          this.dashboard.showToast(`Berhasil menyinkronkan ${updatedCount} kategori data dari Cloud!`, 'success');
        }

        // Re-render dashboard setelah data cloud ditarik
        if (this.dashboard && typeof this.dashboard.renderOverviewStats === 'function') {
          this.dashboard.renderOverviewStats();
        }

        return true;
      } catch (err) {
        this.isSyncing = false;
        this.updateStatusBadge('error', 'Gagal download: ' + err.message);
        throw err;
      }
    }

    /**
     * BACKUP INSTAN: Export seluruh data ke file JSON
     */
    exportBackupJson() {
      const backupObj = {
        app: 'DRIVE_DASHBOARD',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        exportedBy: (this.dashboard && this.dashboard.currentUser && this.dashboard.currentUser.username) || 'user',
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

      if (this.dashboard && typeof this.dashboard.showToast === 'function') {
        this.dashboard.showToast('File backup JSON berhasil diunduh!', 'success');
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
            Object.keys(parsed.data).forEach((key) => {
              const val = parsed.data[key];
              localStorage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : String(val));
              count++;
            });

            // Jika terhubung ke cloud, tawarkan atau otomatis push ke cloud juga
            if (this.isConnected) {
              await this.syncAllToCloud(false);
            }

            if (this.dashboard && typeof this.dashboard.showToast === 'function') {
              this.dashboard.showToast(`Berhasil memulihkan ${count} data dari backup! Halaman akan dimuat ulang...`, 'success');
            }

            setTimeout(() => {
              window.location.reload();
            }, 1200);

            resolve(count);
          } catch (err) {
            if (this.dashboard && typeof this.dashboard.showToast === 'function') {
              this.dashboard.showToast('Gagal membaca file backup: ' + err.message, 'error');
            }
            reject(err);
          }
        };
        reader.onerror = () => reject(new Error('Gagal membaca file.'));
        reader.readAsText(file);
      });
    }

    /**
     * Perbarui UI Status Badge di Header Topbar
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
        { method: 'saveQuizHistory', key: 'vortex_quiz_history' }
      ];

      syncMap.forEach(({ method, key }) => {
        if (typeof state[method] === 'function' && !state[method]._isHooked) {
          const original = state[method].bind(state);
          state[method] = (data) => {
            const result = original(data);
            this.notifyDataChanged(key, data);
            return result;
          };
          state[method]._isHooked = true;
        }
      });
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
        // Populate form if config exists
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
          if (confirm('Apakah Anda yakin ingin mengunggah semua data lokal saat ini ke Cloud? Data di Cloud akan diselaraskan dengan data lokal ini.')) {
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
            if (confirm(`Apakah Anda yakin ingin memulihkan data dari file "${file.name}"? Data saat ini di browser akan diganti dengan data dari file backup ini.`)) {
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
          if (this.dashboard && typeof this.dashboard.showToast === 'function') {
            this.dashboard.showToast('Konfigurasi Firebase disimpan. Menghubungkan ke Cloud...', 'info');
          }
          await this.init(this.dashboard || window.state);
        });
      }
    }
  }

  // Pasang singleton instance ke window
  window.FirebaseSync = new FirebaseSyncManager();

  // Otomatis setup event UI saat DOM siap
  document.addEventListener('DOMContentLoaded', () => {
    window.FirebaseSync.setupUIEvents();
    if (window.state) {
      window.FirebaseSync.attachSaveHooks(window.state);
      window.FirebaseSync.init(window.state);
    }
  });

})();
