const fs = require('fs');
const os = require('os');
const path = require('path');

// 1. Get Firebase auth token
const configPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
const fbConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const token = fbConfig.tokens.access_token;

// 2. Set up sandbox to execute app.js and retrieve initial state
const localStorageMock = {};
global.localStorage = {
  getItem: (k) => localStorageMock[k] || null,
  setItem: (k, v) => { localStorageMock[k] = String(v); },
  removeItem: (k) => { delete localStorageMock[k]; }
};

global.window = {
  localStorage: global.localStorage,
  DRIVE_FIREBASE_CONFIG: {
    apiKey: "AIzaSyBcoOc0mBtgNpUkA5k6uAgrKvdxXbtwluU",
    projectId: "dashboard-agent-adaro"
  }
};

global.document = {
  addEventListener: () => {},
  getElementById: () => null,
  querySelectorAll: () => []
};

// Execute app.js in sandbox
require('../js/app.js');

const state = global.window.state;
if (!state) {
  console.error('State not found!');
  process.exit(1);
}

// Prepare all datasets
const datasets = {
  vortex_users: state.getUsers(),
  vortex_items: state.getItems(),
  vortex_logs: state.getLogs(),
  vortex_pa_logs: state.getPaLogs ? state.getPaLogs() : [],
  vortex_ca_logs: state.getCaLogs ? state.getCaLogs() : [],
  vortex_tikets: state.getTikets ? state.getTikets() : [],
  vortex_aht_logs: state.getAhtLogs ? state.getAhtLogs() : [],
  vortex_art_logs: state.getArtLogs ? state.getArtLogs() : [],
  vortex_findings: state.getFindings ? state.getFindings() : [],
  vortex_quiz_questions: state.getQuizQuestions ? state.getQuizQuestions() : [],
  vortex_quiz_history: state.getQuizHistory ? state.getQuizHistory() : [],
  vortex_timers: state.getTimers ? state.getTimers() : [],
  vortex_stopwatches: state.getStopwatches ? state.getStopwatches() : [],
  drive_typing_team_results: JSON.parse(localStorage.getItem('drive_typing_team_results') || '[]'),
  vortex_ca_gsheet_config: state.getCaGSheetConfig ? state.getCaGSheetConfig() : {},
  vortex_tiket_gsheet_config: state.getTiketGSheetConfig ? state.getTiketGSheetConfig() : {},
  vortex_aht_gsheet_config: state.getAhtGSheetConfig ? state.getAhtGSheetConfig() : {},
  vortex_art_gsheet_config: state.getArtGSheetConfig ? state.getArtGSheetConfig() : {},
  vortex_finding_gsheet_config: state.getFindingGSheetConfig ? state.getFindingGSheetConfig() : {}
};

console.log('Seeding datasets to Firebase Firestore...');

// Convert JavaScript value to Firestore Value representation
function toFirestoreValue(val) {
  if (val === null || val === undefined) {
    return { nullValue: null };
  }
  if (typeof val === 'boolean') {
    return { booleanValue: val };
  }
  if (typeof val === 'number') {
    if (Number.isInteger(val)) {
      return { integerValue: String(val) };
    }
    return { doubleValue: val };
  }
  if (typeof val === 'string') {
    return { stringValue: val };
  }
  if (Array.isArray(val)) {
    return {
      arrayValue: {
        values: val.map(toFirestoreValue)
      }
    };
  }
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return {
      mapValue: {
        fields
      }
    };
  }
  return { stringValue: String(val) };
}

async function seedAll() {
  const keys = Object.keys(datasets);
  let successCount = 0;

  for (const key of keys) {
    const data = datasets[key];
    const docUrl = `https://firestore.googleapis.com/v1/projects/dashboard-agent-adaro/databases/(default)/documents/drive_dashboard_data/${key}`;

    const body = {
      fields: {
        payload: toFirestoreValue(data),
        updatedAt: { timestampValue: new Date().toISOString() },
        updatedBy: { stringValue: 'initial_master_seed' }
      }
    };

    try {
      const res = await fetch(docUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`❌ Failed to seed ${key}: ${res.status} - ${errText}`);
      } else {
        const count = Array.isArray(data) ? `${data.length} items` : 'config object';
        console.log(`✅ Seeded ${key} (${count})`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Error seeding ${key}:`, err);
    }
  }

  console.log(`\n🎉 SEED COMPLETE: Successfully uploaded ${successCount} / ${keys.length} datasets to Firebase Cloud Firestore!`);
}

seedAll();
