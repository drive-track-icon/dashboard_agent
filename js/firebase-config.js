/**
 * ============================================================================
 * DRIVE DASHBOARD - FIREBASE CONFIGURATION
 * ============================================================================
 * File ini digunakan untuk mengkoneksikan Dashboard ke Firebase Firestore
 * sehingga seluruh data otomatis tersinkronisasi di semua PC dan Device.
 *
 * CARA MENDAPATKAN CONFIG INI DARI FIREBASE CONSOLE:
 * 1. Buka https://console.firebase.google.com/
 * 2. Pilih atau Buat Project Firebase Anda.
 * 3. Di menu kiri, klik "Firestore Database" lalu klik "Create Database" 
 *    (pilih mode "Start in test mode" atau sesuaikan rules).
 * 4. Klik ikon gerigi (Project Settings) di pojok kiri atas > tab "General".
 * 5. Scroll ke bawah pada bagian "Your apps", klik ikon Web (</>), beri nama "DRIVE Web".
 * 6. Salin objek "firebaseConfig" yang muncul dan tempelkan ke bawah ini:
 * ============================================================================
 */

window.DRIVE_FIREBASE_CONFIG = {
  // Ganti nilai di bawah ini dengan config dari Firebase Console Anda:
  apiKey: "AIzaSyAx5aPDyPh3Rsh4UtA5bkeCV1iwWoIi8xY",
  authDomain: "dashbord-agent.firebaseapp.com",
  projectId: "dashbord-agent",
  storageBucket: "dashbord-agent.firebasestorage.app",
  messagingSenderId: "78069455282",
  appId: "1:78069455282:web:22c61e0425f3ab3946ecab",
  measurementId: "G-P6ZQLF92QD"
};
