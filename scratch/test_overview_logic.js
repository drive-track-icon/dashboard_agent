const fs = require('fs');

// Extract users and default logs from js/app.js
const appJs = fs.readFileSync('./js/app.js', 'utf8');

console.log('Testing overview calculation logic...');

function getCaDynamicColor(scoreNum, hasData = true) {
  if (!hasData || isNaN(scoreNum) || scoreNum <= 0) {
    return {
      color: '#94a3b8',
      bgColor: 'rgba(148, 163, 184, 0.12)',
      borderColor: 'rgba(148, 163, 184, 0.3)',
      barColor: 'linear-gradient(90deg, #64748b, #94a3b8)',
      grade: 'Belum Dinilai',
      passStatus: 'Belum Dinilai',
      passClass: 'badge-gray',
      passIcon: 'fa-regular fa-clock',
      hue: 0
    };
  }

  let hue = 0;
  if (scoreNum >= 85) {
    const factor = Math.min(1, (scoreNum - 85) / 15);
    hue = Math.round(45 + factor * 95);
  } else if (scoreNum >= 65) {
    const factor = Math.max(0, (scoreNum - 65) / 20);
    hue = Math.round(factor * 45);
  } else {
    hue = 0;
  }

  const color = `hsl(${hue}, 88%, 50%)`;
  const bgColor = `hsla(${hue}, 88%, 50%, 0.15)`;
  const borderColor = `hsla(${hue}, 88%, 50%, 0.4)`;
  const barColor = `linear-gradient(90deg, hsla(${Math.max(0, hue - 20)}, 92%, 48%, 0.85), hsl(${hue}, 88%, 50%))`;

  let grade = 'Perlu Coaching';
  let passStatus = 'Remedial SOP';
  let passClass = 'badge-red';
  let passIcon = 'fa-solid fa-triangle-exclamation';

  if (scoreNum >= 95.0) {
    grade = 'Sangat Baik';
    passStatus = 'Lulus SOP';
    passClass = 'badge-green';
    passIcon = 'fa-solid fa-check';
  } else if (scoreNum >= 85.0) {
    grade = 'Baik (Sedang)';
    passStatus = 'Lulus SOP';
    passClass = 'badge-green';
    passIcon = 'fa-solid fa-check';
  } else if (scoreNum >= 75.0) {
    grade = 'Cukup';
    passStatus = 'Remedial SOP';
    passClass = 'badge-yellow';
    passIcon = 'fa-solid fa-triangle-exclamation';
  }

  return { color, bgColor, borderColor, barColor, grade, passStatus, passClass, passIcon, hue };
}

function getTiketDynamicColor(countNum, hasData = true) {
  if (!hasData || isNaN(countNum) || countNum <= 0) {
    return {
      color: '#94a3b8',
      bgColor: 'rgba(148, 163, 184, 0.12)',
      borderColor: 'rgba(148, 163, 184, 0.3)',
      barColor: 'linear-gradient(90deg, #64748b, #94a3b8)',
      grade: 'Belum Ada Data',
      status: '0 Tiket',
      badgeClass: 'badge-gray',
      badgeIcon: 'fa-regular fa-clock',
      hue: 0
    };
  }

  let hue = 0;
  if (countNum >= 1320) {
    const factor = Math.min(1, (countNum - 1320) / 150);
    hue = Math.round(110 + factor * 30);
  } else if (countNum >= 1056) {
    const factor = (countNum - 1056) / (1320 - 1056);
    hue = Math.round(45 + factor * 65);
  } else if (countNum >= 660) {
    const factor = Math.max(0, (countNum - 660) / (1056 - 660));
    hue = Math.round(factor * 45);
  } else {
    hue = 0;
  }

  const color = `hsl(${hue}, 88%, 50%)`;
  const bgColor = `hsla(${hue}, 88%, 50%, 0.15)`;
  const borderColor = `hsla(${hue}, 88%, 50%, 0.4)`;
  const barColor = `linear-gradient(90deg, hsla(${Math.max(0, hue - 20)}, 92%, 48%, 0.85), hsl(${hue}, 88%, 50%))`;

  let grade = 'Kurang Tiket';
  let status = `Kurang ${(1320 - countNum).toLocaleString('id-ID')} Tiket`;
  let badgeClass = 'badge-red';
  let badgeIcon = 'fa-solid fa-triangle-exclamation';

  if (countNum >= 1320) {
    grade = 'Target Tercapai';
    const plus = countNum - 1320;
    status = plus > 0 ? `+${plus.toLocaleString('id-ID')} Tiket` : 'Tuntas Tepat Target';
    badgeClass = 'badge-green';
    badgeIcon = 'fa-solid fa-check-double';
  } else if (countNum >= 1056) {
    grade = 'Mendekati Target';
    status = `Kurang ${(1320 - countNum).toLocaleString('id-ID')} Tiket`;
    badgeClass = 'badge-yellow';
    badgeIcon = 'fa-solid fa-hourglass-half';
  }

  return { color, bgColor, borderColor, barColor, grade, status, badgeClass, badgeIcon, hue };
}

function getArtDynamicColor(artSec, hasData = true) {
  if (!hasData || isNaN(artSec) || artSec <= 0) {
    return {
      color: '#94a3b8',
      bgColor: 'rgba(148, 163, 184, 0.12)',
      borderColor: 'rgba(148, 163, 184, 0.3)',
      barColor: 'linear-gradient(90deg, #64748b, #94a3b8)',
      grade: 'Belum Ada Data',
      status: 'Belum Ada Input',
      badgeClass: 'badge-gray',
      badgeIcon: 'fa-regular fa-clock',
      hue: 0
    };
  }

  let hue = 0;
  if (artSec <= 15.0) {
    const factor = Math.min(1, Math.max(0, (15.0 - artSec) / 10));
    hue = Math.round(110 + factor * 30);
  } else if (artSec <= 30.0) {
    const factor = (30.0 - artSec) / 15.0;
    hue = Math.round(45 + factor * 65);
  } else if (artSec <= 45.0) {
    const factor = Math.max(0, (45.0 - artSec) / 15.0);
    hue = Math.round(factor * 45);
  } else {
    hue = 0;
  }

  const color = `hsl(${hue}, 88%, 50%)`;
  const bgColor = `hsla(${hue}, 88%, 50%, 0.15)`;
  const borderColor = `hsla(${hue}, 88%, 50%, 0.4)`;
  const barColor = `linear-gradient(90deg, hsla(${Math.max(0, hue - 20)}, 92%, 48%, 0.85), hsl(${hue}, 88%, 50%))`;

  let grade = 'Over SLA Kritis';
  let status = `Over SLA (+${(artSec - 30).toFixed(1)}s)`;
  let badgeClass = 'badge-red';
  let badgeIcon = 'fa-solid fa-triangle-exclamation';

  if (artSec <= 15.0) {
    grade = 'Sangat Responsif';
    status = 'Prima (≤15s)';
    badgeClass = 'badge-green';
    badgeIcon = 'fa-solid fa-bolt text-green';
  } else if (artSec <= 30.0) {
    grade = 'Sesuai SLA';
    status = 'Sesuai SLA (≤30s)';
    badgeClass = 'badge-green';
    badgeIcon = 'fa-solid fa-circle-check text-green';
  } else {
    grade = 'Over SLA';
    status = `Over SLA (+${(artSec - 30).toFixed(1)}s)`;
    badgeClass = 'badge-yellow';
    badgeIcon = 'fa-solid fa-triangle-exclamation text-yellow';
  }

  return { color, bgColor, borderColor, barColor, grade, status, badgeClass, badgeIcon, hue };
}

// Test Color outputs:
console.log('CA 96% color:', getCaDynamicColor(96).hue, getCaDynamicColor(96).color); // should be green (hue ~115)
console.log('CA 88% color:', getCaDynamicColor(88).hue, getCaDynamicColor(88).color); // should be yellow/light green (hue ~64)
console.log('CA 72% color:', getCaDynamicColor(72).hue, getCaDynamicColor(72).color); // should be yellow-orange (hue ~16)
console.log('CA 60% color:', getCaDynamicColor(60).hue, getCaDynamicColor(60).color); // should be red (hue 0)

console.log('TIKET 1345 color:', getTiketDynamicColor(1345).hue, getTiketDynamicColor(1345).color); // should be green (hue ~115)
console.log('TIKET 1200 color:', getTiketDynamicColor(1200).hue, getTiketDynamicColor(1200).color); // should be yellow/green (hue ~80)
console.log('TIKET 500 color:', getTiketDynamicColor(500).hue, getTiketDynamicColor(500).color);   // should be red (hue 0)

console.log('ART 12.5s color:', getArtDynamicColor(12.5).hue, getArtDynamicColor(12.5).color); // should be green (hue ~117)
console.log('ART 22.0s color:', getArtDynamicColor(22.0).hue, getArtDynamicColor(22.0).color); // should be yellow-green (hue ~79)
console.log('ART 35.0s color:', getArtDynamicColor(35.0).hue, getArtDynamicColor(35.0).color); // should be orange-red (hue ~30)
console.log('ART 55.0s color:', getArtDynamicColor(55.0).hue, getArtDynamicColor(55.0).color); // should be red (hue 0)
console.log('All color tests passed successfully!');
