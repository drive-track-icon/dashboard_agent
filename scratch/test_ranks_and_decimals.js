const fs = require('fs');

console.log('Testing rank adaptation and 2-decimal CA formatting...');

const sampleUsers = [
  { id: 'u1', fullName: 'Siti Rahma', username: 'siti', role: 'user', department: 'CSO DIGILIVE CHAT - WA' },
  { id: 'u2', fullName: 'Budi Santoso, S.Kom', username: 'budi', role: 'user', department: 'CSO INBOUND' },
  { id: 'u3', fullName: 'Dewi Lestari, M.T.', username: 'dewi', role: 'admin', department: 'TEAM LEADER' },
  { id: 'u4', fullName: 'Ahmad Fauzi', username: 'ahmad', role: 'user', department: 'CSO BACK OFFICE' }
];

const sampleCa = [
  { userId: 'u1', userFullName: 'Siti Rahma', score: 96.5 },
  { userId: 'u2', userFullName: 'Budi Santoso, S.Kom', score: 88 },
  { userId: 'u3', userFullName: 'Dewi Lestari, M.T.', score: 95 },
  { userId: 'u4', userFullName: 'Ahmad Fauzi', score: 78.25 }
];

const sampleTiket = [
  { userId: 'u1', userFullName: 'Siti Rahma', ticketCount: 1345 },
  { userId: 'u2', userFullName: 'Budi Santoso, S.Kom', ticketCount: 1328 },
  { userId: 'u3', userFullName: 'Dewi Lestari, M.T.', ticketCount: 1310 },
  { userId: 'u4', userFullName: 'Ahmad Fauzi', ticketCount: 1265 }
];

const sampleArt = [
  { userId: 'u1', userFullName: 'Siti Rahma', avgResponseSeconds: 12.8, interactionCount: 100 },
  { userId: 'u2', userFullName: 'Budi Santoso, S.Kom', avgResponseSeconds: 22.5, interactionCount: 80 },
  { userId: 'u3', userFullName: 'Dewi Lestari, M.T.', avgResponseSeconds: 14.2, interactionCount: 50 },
  { userId: 'u4', userFullName: 'Ahmad Fauzi', avgResponseSeconds: 32.4, interactionCount: 70 }
];

function calculateOverviewCombinedData() {
  const users = sampleUsers;
  const allCaLogs = sampleCa;
  const allTikets = sampleTiket;
  const allArtLogs = sampleArt;

  const list = users.map(u => {
    const fullName = u.fullName || u.username;
    const userId = u.id;

    // CA
    const caLogs = allCaLogs.filter(l => (l.userFullName && l.userFullName === fullName) || (l.userId && l.userId === userId));
    const caCount = caLogs.length;
    let caAvg = 0, caMin = 0, caMax = 0;
    if (caCount > 0) {
      const scores = caLogs.map(l => Number(l.score) || 0);
      caAvg = parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2));
      caMin = parseFloat(Math.min(...scores).toFixed(2));
      caMax = parseFloat(Math.max(...scores).toFixed(2));
    }

    // Tiket
    const tiketLogs = allTikets.filter(l => (l.userFullName && l.userFullName === fullName) || (l.userId && l.userId === userId));
    const tiketDays = tiketLogs.length;
    let tiketCount = 0;
    if (tiketDays > 0) {
      tiketCount = tiketLogs.reduce((acc, l) => acc + (Number(l.ticketCount) || 0), 0);
    }
    const tiketPct = parseFloat(((tiketCount / 1320) * 100).toFixed(1));

    // ART
    const artLogs = allArtLogs.filter(l => (l.userFullName && l.userFullName === fullName) || (l.userId && l.userId === userId));
    const artDays = artLogs.length;
    let avgArtSec = 0;
    if (artDays > 0) {
      const totalInteractions = artLogs.reduce((acc, l) => acc + (Number(l.interactionCount) || 1), 0);
      const sumArt = artLogs.reduce((acc, l) => acc + ((Number(l.avgResponseSeconds) || 0) * (Number(l.interactionCount) || 1)), 0);
      avgArtSec = totalInteractions > 0 ? parseFloat((sumArt / totalInteractions).toFixed(1)) : 0;
    }

    let artScoreNorm = 50;
    if (artDays > 0) {
      if (avgArtSec <= 15) artScoreNorm = 100;
      else if (avgArtSec <= 30) artScoreNorm = 100 - ((avgArtSec - 15) / 15) * 25;
      else artScoreNorm = Math.max(0, 75 - ((avgArtSec - 30) / 15) * 40);
    }
    const compositeScore = parseFloat(((caAvg * 0.40) + (Math.min(100, tiketPct) * 0.35) + (artScoreNorm * 0.25)).toFixed(2));

    return {
      user: u,
      fullName,
      caAvg,
      caMin,
      caMax,
      caFormatted: caAvg.toFixed(2) + '%',
      tiketCount,
      tiketPct,
      avgArtSec,
      compositeScore,
      caRank: 0,
      tiketRank: 0,
      artRank: 0,
      allRank: 0
    };
  });

  // CA Rank (Highest caAvg is Rank 1)
  const caSorted = [...list].sort((a, b) => b.caAvg - a.caAvg);
  caSorted.forEach((item, idx) => { item.caRank = idx + 1; });

  // Tiket Rank (Highest tiketCount is Rank 1)
  const tiketSorted = [...list].sort((a, b) => b.tiketCount - a.tiketCount);
  tiketSorted.forEach((item, idx) => { item.tiketRank = idx + 1; });

  // ART Rank (Lowest avgArtSec is Rank 1)
  const artSorted = [...list].sort((a, b) => a.avgArtSec - b.avgArtSec);
  artSorted.forEach((item, idx) => { item.artRank = idx + 1; });

  // All Rank (Highest compositeScore is Rank 1)
  const allSorted = [...list].sort((a, b) => b.compositeScore - a.compositeScore);
  allSorted.forEach((item, idx) => { item.allRank = idx + 1; });

  return list;
}

const res = calculateOverviewCombinedData();
console.log('Results:');
res.forEach(r => {
  console.log(`Agent: ${r.fullName}`);
  console.log(`  CA: ${r.caFormatted} (Rank: ${r.caRank})`);
  console.log(`  Tiket: ${r.tiketCount} (Rank: ${r.tiketRank})`);
  console.log(`  ART: ${r.avgArtSec}s (Rank: ${r.artRank})`);
  console.log(`  Overall Rank: ${r.allRank}`);
});

console.log('Decimals check:');
console.log('Siti CA:', res[0].caFormatted, '-> ends with .50%? ', res[0].caFormatted === '96.50%');
console.log('Budi CA:', res[1].caFormatted, '-> ends with .00%? ', res[1].caFormatted === '88.00%');
console.log('Dewi CA:', res[2].caFormatted, '-> ends with .00%? ', res[2].caFormatted === '95.00%');
console.log('Ahmad CA:', res[3].caFormatted, '-> ends with .25%? ', res[3].caFormatted === '78.25%');
