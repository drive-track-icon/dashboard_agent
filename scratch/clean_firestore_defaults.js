/**
 * Clean up old/default data from Firebase Cloud Firestore
 * Project: dashboard-agent-adaro
 */
const apiKey = 'AIzaSyBcoOc0mBtgNpUkA5k6uAgrKvdxXbtwluU';
const BASE_URL = 'https://firestore.googleapis.com/v1/projects/dashboard-agent-adaro/databases/(default)/documents/drive_dashboard_data/';

function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return { integerValue: String(val) };
    return { doubleValue: val };
  }
  if (typeof val === 'string') return { stringValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function decodeValue(val) {
  if (!val) return null;
  if ('stringValue' in val) return val.stringValue;
  if ('integerValue' in val) return parseInt(val.integerValue, 10);
  if ('doubleValue' in val) return parseFloat(val.doubleValue);
  if ('booleanValue' in val) return val.booleanValue;
  if ('arrayValue' in val) return (val.arrayValue.values || []).map(decodeValue);
  if ('mapValue' in val) {
    const res = {};
    for (const k in val.mapValue.fields) res[k] = decodeValue(val.mapValue.fields[k]);
    return res;
  }
  return null;
}

async function getDoc(key) {
  const res = await fetch(BASE_URL + key + '?key=' + apiKey);
  if (!res.ok) return null;
  const json = await res.json();
  return {
    payload: decodeValue(json.fields && json.fields.payload),
    deletedIds: decodeValue(json.fields && json.fields.deletedIds) || []
  };
}

async function updateDoc(key, payload, deletedIds = []) {
  const url = BASE_URL + key + '?key=' + apiKey;
  const body = {
    fields: {
      payload: toFirestoreValue(payload),
      deletedIds: toFirestoreValue(deletedIds),
      writerDeviceId: { stringValue: 'system_cleanup_script' },
      actionTimestamp: { integerValue: String(Date.now()) },
      updatedAt: { timestampValue: new Date().toISOString() },
      updatedBy: { stringValue: 'Admin Icon' }
    }
  };

  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to update ${key}: ${res.status} - ${txt}`);
  }
  console.log(`✅ Updated Firestore ${key} (Remaining payload count: ${Array.isArray(payload) ? payload.length : 'object'}, deletedIds: ${deletedIds.length})`);
}

const DUMMY_USER_IDS = new Set(['usr_user_1', 'usr_user_2', 'usr_admin_2']);
const DUMMY_USERNAMES = new Set(['user', 'ahmad_fauzi', 'dewi_lestari']);
const DUMMY_FULLNAMES = new Set([
  'siti rahma', 'ahmad fauzi', 'dewi lestari, m.t.', 'dewi lestari',
  'budi santoso, s.kom', 'budi santoso'
]);

function isDummyItem(item) {
  if (!item) return false;
  if (item.userId && DUMMY_USER_IDS.has(item.userId)) return true;
  if (item.id && DUMMY_USER_IDS.has(item.id)) return true;
  if (item.username && DUMMY_USERNAMES.has(item.username.toLowerCase())) return true;
  const name = (item.userFullName || item.fullName || item.userName || item.author || item.targetUser || '').toLowerCase().trim();
  if (DUMMY_FULLNAMES.has(name)) return true;
  return false;
}

async function run() {
  console.log('--- Cleaning Up Old/Default Data in Firestore ---');

  // 1. vortex_users
  const usersDoc = await getDoc('vortex_users');
  if (usersDoc && Array.isArray(usersDoc.payload)) {
    const realUsers = usersDoc.payload.filter(u => !isDummyItem(u));
    const deletedUserIds = [...new Set([...usersDoc.deletedIds, ...DUMMY_USER_IDS])];
    await updateDoc('vortex_users', realUsers, deletedUserIds);
  }

  // 2. vortex_pa_logs
  const paDoc = await getDoc('vortex_pa_logs');
  if (paDoc && Array.isArray(paDoc.payload)) {
    const realPa = paDoc.payload.filter(p => !isDummyItem(p));
    const deletedPaIds = paDoc.payload.filter(isDummyItem).map(p => p.id);
    const allDeletedPa = [...new Set([...paDoc.deletedIds, ...deletedPaIds])];
    await updateDoc('vortex_pa_logs', realPa, allDeletedPa);
  }

  // 3. vortex_ca_logs
  const caDoc = await getDoc('vortex_ca_logs');
  if (caDoc && Array.isArray(caDoc.payload)) {
    const realCa = caDoc.payload.filter(c => !isDummyItem(c));
    const deletedCaIds = caDoc.payload.filter(isDummyItem).map(c => c.id);
    const allDeletedCa = [...new Set([...caDoc.deletedIds, ...deletedCaIds])];
    await updateDoc('vortex_ca_logs', realCa, allDeletedCa);
  }

  // 4. vortex_tikets
  const tiketDoc = await getDoc('vortex_tikets');
  if (tiketDoc && Array.isArray(tiketDoc.payload)) {
    const realTiket = tiketDoc.payload.filter(t => !isDummyItem(t));
    const deletedTiketIds = tiketDoc.payload.filter(isDummyItem).map(t => t.id);
    const allDeletedTiket = [...new Set([...tiketDoc.deletedIds, ...deletedTiketIds])];
    await updateDoc('vortex_tikets', realTiket, allDeletedTiket);
  }

  // 5. vortex_aht_logs
  const ahtDoc = await getDoc('vortex_aht_logs');
  if (ahtDoc && Array.isArray(ahtDoc.payload)) {
    const realAht = ahtDoc.payload.filter(a => !isDummyItem(a));
    const deletedAhtIds = ahtDoc.payload.filter(isDummyItem).map(a => a.id);
    const allDeletedAht = [...new Set([...ahtDoc.deletedIds, ...deletedAhtIds])];
    await updateDoc('vortex_aht_logs', realAht, allDeletedAht);
  }

  // 6. vortex_art_logs
  const artDoc = await getDoc('vortex_art_logs');
  if (artDoc && Array.isArray(artDoc.payload)) {
    const realArt = artDoc.payload.filter(a => !isDummyItem(a));
    const deletedArtIds = artDoc.payload.filter(isDummyItem).map(a => a.id);
    const allDeletedArt = [...new Set([...artDoc.deletedIds, ...deletedArtIds])];
    await updateDoc('vortex_art_logs', realArt, allDeletedArt);
  }

  // 7. vortex_findings
  const findingDoc = await getDoc('vortex_findings');
  if (findingDoc && Array.isArray(findingDoc.payload)) {
    const realFindings = findingDoc.payload.filter(f => !isDummyItem(f) && f.id !== 'FND-2026-005');
    const deletedFindingIds = findingDoc.payload.filter(f => isDummyItem(f) || f.id === 'FND-2026-005').map(f => f.id);
    const allDeletedFindings = [...new Set([...findingDoc.deletedIds, ...deletedFindingIds])];
    await updateDoc('vortex_findings', realFindings, allDeletedFindings);
  }

  // 8. vortex_quiz_history
  const quizDoc = await getDoc('vortex_quiz_history');
  if (quizDoc && Array.isArray(quizDoc.payload)) {
    const realQuiz = quizDoc.payload.filter(q => !isDummyItem(q));
    const deletedQuizIds = quizDoc.payload.filter(isDummyItem).map(q => q.id);
    const allDeletedQuiz = [...new Set([...quizDoc.deletedIds, ...deletedQuizIds, 'QZH-1001', 'QZH-1002', 'QZH-1003'])];
    await updateDoc('vortex_quiz_history', realQuiz, allDeletedQuiz);
  }

  // 9. drive_typing_team_results
  const typingDoc = await getDoc('drive_typing_team_results');
  if (typingDoc && Array.isArray(typingDoc.payload)) {
    const realTyping = typingDoc.payload.filter(t => !isDummyItem(t) && !t.id.startsWith('run_demo_'));
    await updateDoc('drive_typing_team_results', realTyping, ['run_demo_1', 'run_demo_2', 'run_demo_3', 'run_demo_4']);
  }

  // 10. vortex_items (clean updatedBy)
  const itemsDoc = await getDoc('vortex_items');
  if (itemsDoc && Array.isArray(itemsDoc.payload)) {
    const updatedItems = itemsDoc.payload.map(item => ({
      ...item,
      updatedBy: (item.updatedBy === 'Budi Santoso' || item.updatedBy === 'Dewi Lestari') ? 'Admin Icon' : item.updatedBy
    }));
    await updateDoc('vortex_items', updatedItems, itemsDoc.deletedIds || []);
  }

  // 11. vortex_logs
  const logsDoc = await getDoc('vortex_logs');
  if (logsDoc && Array.isArray(logsDoc.payload)) {
    const realLogs = logsDoc.payload.filter(l => {
      const u = (l.user || '').toLowerCase();
      return !u.includes('siti rahma') && !u.includes('ahmad fauzi') && !u.includes('dewi lestari') && !u.includes('budi santoso');
    });
    await updateDoc('vortex_logs', realLogs, logsDoc.deletedIds || []);
  }

  console.log('--- ALL FIRESTORE DATASETS CLEANED SUCCESSFULLY ---');
}

run().catch(console.error);
