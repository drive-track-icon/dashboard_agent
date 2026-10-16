const apiKey = 'AIzaSyBcoOc0mBtgNpUkA5k6uAgrKvdxXbtwluU';
const projectId = 'dashboard-agent-adaro';

function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return { integerValue: String(val) };
    return { doubleValue: val };
  }
  if (typeof val === 'string') return { stringValue: val };
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestoreValue) } };
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function fromFirestoreValue(val) {
  if (!val) return null;
  if ('stringValue' in val) return val.stringValue;
  if ('booleanValue' in val) return val.booleanValue;
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return Number(val.doubleValue);
  if ('nullValue' in val) return null;
  if ('arrayValue' in val) return (val.arrayValue.values || []).map(fromFirestoreValue);
  if ('mapValue' in val) {
    const res = {};
    for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
      res[k] = fromFirestoreValue(v);
    }
    return res;
  }
  return null;
}

async function resetCloudData() {
  console.log('Fetching and resetting cloud timers and stopwatches...');

  for (const key of ['vortex_timers', 'vortex_stopwatches']) {
    const getUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/drive_dashboard_data/${key}?key=${apiKey}`;
    const res = await fetch(getUrl);
    const doc = await res.json();

    if (!doc.fields || !doc.fields.payload) {
      console.log(`Document ${key} has no payload.`);
      continue;
    }

    const currentArr = fromFirestoreValue(doc.fields.payload);
    console.log(`Current items in ${key}:`, currentArr.length);

    const resetArr = currentArr.map(item => {
      const copy = { ...item };
      copy.isRunning = false;
      copy.lastTick = null;
      copy.updatedAt = Date.now();
      if (key === 'vortex_timers') {
        copy.remainingSeconds = Number(copy.totalSeconds) || 1800;
      } else {
        copy.elapsedSeconds = 0;
      }
      return copy;
    });

    const patchUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/drive_dashboard_data/${key}?key=${apiKey}`;
    const patchBody = {
      fields: {
        payload: toFirestoreValue(resetArr),
        updatedAt: { timestampValue: new Date().toISOString() },
        updatedBy: { stringValue: 'TimerResetBugFix' }
      }
    };

    const patchRes = await fetch(patchUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchBody)
    });

    if (patchRes.ok) {
      console.log(`Successfully reset ${key} in Firestore!`);
    } else {
      console.error(`Failed to update ${key}:`, await patchRes.text());
    }
  }
}

resetCloudData();
