/* ══════════════════════════════════
   THEME
══════════════════════════════════ */
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
let dark = true;
 
function setTheme(d) {
  dark = d;
  html.setAttribute('data-theme', d ? 'dark' : 'light');
  themeBtn.textContent = d ? '🌙' : '☀️';
  localStorage.setItem('mh-theme', d ? 'dark' : 'light');
  if (window.RC) {
    const gc = d ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
    const lc = d ? '#7d8590' : '#556349';
    window.RC.options.scales.r.grid.color = gc;
    window.RC.options.scales.r.angleLines.color = gc;
    window.RC.options.scales.r.pointLabels.color = lc;
    window.RC.update();
  }
}
themeBtn.addEventListener('click', () => setTheme(!dark));
if (localStorage.getItem('mh-theme') === 'light') setTheme(false);
 
/* ══════════════════════════════════
   MOOD BARS
══════════════════════════════════ */
const days   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const moods  = [6, null, 7, 8, 6.5, 5, 7.5];
const sleeps = [6.5, null, 7, 8, 6, 5.5, 7];
const mbar   = document.getElementById('mood-bars');
 
days.forEach((d, i) => {
  const row = document.createElement('div');
  row.className = 'mood-row';
  if (moods[i]) {
    const mw = (moods[i]/10*100).toFixed(1);
    const sw = (sleeps[i]/10*100).toFixed(1);
    row.innerHTML = `
      <span class="mood-day">${d}</span>
      <div style="flex:1;display:flex;flex-direction:column;gap:4px;">
        <div class="mood-track"><div class="mood-fill" style="width:0%;background:#5dba82;" data-w="${mw}"></div></div>
        <div class="mood-track"><div class="mood-fill" style="width:0%;background:#4a9edd;" data-w="${sw}"></div></div>
      </div>
      <span class="mood-num">${moods[i]}</span>`;
  } else {
    row.innerHTML = `
      <span class="mood-day">${d}</span>
      <div style="flex:1;display:flex;flex-direction:column;gap:4px;">
        <div class="mood-missing"></div><div class="mood-missing"></div>
      </div>
      <span class="mood-num">—</span>`;
  }
  mbar.appendChild(row);
});
setTimeout(() => {
  document.querySelectorAll('.mood-fill').forEach(el => { el.style.width = el.dataset.w + '%'; });
}, 500);
 
/* ══════════════════════════════════
   RADAR
══════════════════════════════════ */
window.RC = new Chart(document.getElementById('radarChart'), {
  type: 'radar',
  data: {
    labels: ['Sleep','Mood','Energy','Social','Calm'],
    datasets: [
      { label: 'This week', data: [6.9,6.8,5.5,7.0,6.8],
        backgroundColor: 'rgba(93,186,130,0.12)', borderColor: '#5dba82',
        borderWidth: 2, pointBackgroundColor: '#5dba82', pointRadius: 4, pointHoverRadius: 6 },
      { label: 'Last week', data: [6.2,6.4,5.0,5.5,6.0],
        backgroundColor: 'rgba(74,158,221,0.06)', borderColor: 'rgba(74,158,221,0.55)',
        borderWidth: 1.5, borderDash: [5,4],
        pointBackgroundColor: 'rgba(74,158,221,0.7)', pointRadius: 3 }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    scales: { r: {
      min: 0, max: 10,
      ticks: { stepSize: 5, display: false },
      grid: { color: 'rgba(255,255,255,0.06)' },
      angleLines: { color: 'rgba(255,255,255,0.06)' },
      pointLabels: { font: { size: 11, family: 'DM Sans' }, color: '#7d8590' }
    }},
    plugins: { legend: { display: false } }
  }
});
 
/* ══════════════════════════════════
   SLIDERS / TAGS / SAVE
══════════════════════════════════ */
document.getElementById('moodSlider').addEventListener('input', function() {
  document.getElementById('moodVal').textContent = this.value;
});
document.getElementById('sleepSlider').addEventListener('input', function() {
  document.getElementById('sleepVal').textContent = parseFloat(this.value).toFixed(1);
});
function toggleTag(el) { el.classList.toggle('active'); }
function saveMood() {
  const btn = document.querySelector('.save-btn');
  btn.textContent = 'Saved ✓';
  btn.style.background = 'rgba(93,186,130,0.22)';
  setTimeout(() => { btn.textContent = 'Save check-in'; btn.style.background = ''; }, 2200);
}
 
/* ══════════════════════════════════
   CALENDAR
══════════════════════════════════ */
const states = [
  'good','good','warn','good','none','good','good',
  'good','warn','good','good','good','good','low',
  'good','good','good','good','warn','good','good',
  'good','good','good'
];
const calCol = {
  good: 'rgba(93,186,130,0.55)',
  warn: 'rgba(212,146,10,0.55)',
  low:  'rgba(217,96,74,0.55)',
  none: 'var(--surface2)'
};
const calTxt = { good: '#0d2b1a', warn: '#2b1e00', low: '#2b0b00', none: 'var(--text-dim)' };
const cal = document.getElementById('cal');
states.forEach((s, i) => {
  const d = document.createElement('div');
  d.className = 'cal-day';
  d.style.background = calCol[s];
  d.title = `Apr ${i+1}`;
  d.innerHTML = `<span class="cal-day-num" style="color:${calTxt[s]};">${i+1}</span>`;
  cal.appendChild(d);
});
 
/* ══════════════════════════════════
   TUTORIAL ENGINE
══════════════════════════════════ */
const STEPS = [
  {
    id: 'sec-metrics', pos: 'bottom', emoji: '📊', title: 'Your daily snapshot',
    body: n => `Hello <strong>${n}</strong>! These four cards are your pulse check — mood average, sleep, anxiety level, and how many check-ins you've completed this week. <strong>Green arrows mean improvement</strong>; amber means something worth watching.`
  },
  {
    id: 'sec-mood', pos: 'right', emoji: '📈', title: 'Your mood across the week',
    body: n => `Each day shows two bars — <strong>green for mood</strong> and <strong>blue for sleep</strong> (scaled to 10). A dashed line means you missed that day's log. Don't worry <strong>${n}</strong> — consistency builds over time, not perfection.`
  },
  {
    id: 'sec-radar', pos: 'left', emoji: '🔮', title: 'Five dimensions of wellbeing',
    body: () => `The radar chart compares <strong>this week vs last week</strong> across sleep, mood, energy, social connection, and calm. The closer to the outer ring, the better. It grows as you log more often.`
  },
  {
    id: 'sec-triggers', pos: 'right', emoji: '🔍', title: 'What affects your mood',
    body: n => `This panel surfaces what helps and hurts your wellbeing, <strong>${n}</strong>. <strong>Amber</strong> = recurring stressors; <strong>green</strong> = mood boosters. Over time, patterns emerge so you can make better choices.`
  },
  {
    id: 'sec-checkin', pos: 'left', emoji: '✍️', title: 'Your daily check-in',
    body: n => `This is the heart of the app, <strong>${n}</strong>. Drag the sliders to rate your mood and sleep, tap any feelings that resonate, then hit <strong>Save check-in</strong>. Takes about 20 seconds — and makes all the insights above possible.`
  },
  {
    id: 'sec-journal', pos: 'top', emoji: '📓', title: 'Your private journal',
    body: n => `Entries here are just for you, <strong>${n}</strong>. Even a sentence or two helps you spot emotional patterns. The <strong>coloured dot</strong> beside each entry reflects your mood that day — a gentle visual diary.`
  },
  {
    id: 'sec-calendar', pos: 'top', emoji: '🗓️', title: 'Your month at a glance',
    body: n => `Each square is one day. <strong>Green = good, amber = fair, red = low.</strong> Hover a square to see the date. This gives you a bird's-eye view of your emotional landscape, <strong>${n}</strong>. The goal? More green, fewer gaps.`
  }
];
 
let userName = 'friend';
let step = 0;
let tourActive = false;
 
const overlay = document.getElementById('tutOverlay');
const welcome = document.getElementById('tutWelcome');
const spot    = document.getElementById('tutSpot');
const tip     = document.getElementById('tutTip');
 
function hideTour() {
  tourActive = false;
  overlay.classList.remove('show');
  spot.classList.remove('show');
  tip.classList.remove('show');
  welcome.classList.remove('show');
}
 
function makeDots(current, total) {
  const el = document.getElementById('tipDots');
  el.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'tut-dot' + (i === current ? ' on' : '');
    el.appendChild(d);
  }
}
 
function placeTooltip(rect, pos) {
  const W = 340, pad = 16;
  const vw = window.innerWidth, vh = window.innerHeight;
  let t, l;
  if (pos === 'bottom') { t = rect.bottom + pad; l = rect.left + rect.width/2 - W/2; }
  else if (pos === 'top') { t = rect.top - 280 - pad; l = rect.left + rect.width/2 - W/2; }
  else if (pos === 'right') { t = rect.top + rect.height/2 - 140; l = rect.right + pad; }
  else { t = rect.top + rect.height/2 - 140; l = rect.left - W - pad; }
  l = Math.max(pad, Math.min(l, vw - W - pad));
  t = Math.max(pad, Math.min(t, vh - 300 - pad));
  tip.style.left = l + 'px';
  tip.style.top  = t + 'px';
}
 
function showStep(i) {
  const s = STEPS[i];
  if (!s) { hideTour(); return; }
  const target = document.getElementById(s.id);
  if (!target) { showStep(i+1); return; }
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
 
  setTimeout(() => {
    const rect = target.getBoundingClientRect();
    const pad = 8;
    spot.style.top    = (rect.top    - pad) + 'px';
    spot.style.left   = (rect.left   - pad) + 'px';
    spot.style.width  = (rect.width  + pad*2) + 'px';
    spot.style.height = (rect.height + pad*2) + 'px';
    spot.classList.add('show');
 
    document.getElementById('tipStep').textContent  = `Step ${i+1} of ${STEPS.length}`;
    document.getElementById('tipEmoji').textContent  = s.emoji;
    document.getElementById('tipTitle').textContent  = s.title;
    document.getElementById('tipBody').innerHTML     = s.body(userName);
    document.getElementById('tipNext').textContent   = i === STEPS.length-1 ? 'Finish ✓' : 'Next →';
    makeDots(i, STEPS.length);
    placeTooltip(rect, s.pos);
    tip.classList.add('show');
  }, 380);
}
 
function beginTour(name) {
  userName = name || 'friend';
  welcome.classList.remove('show');
  overlay.classList.add('show');
  tourActive = true;
  step = 0;
  tip.classList.remove('show');
  spot.classList.remove('show');
  setTimeout(() => showStep(0), 100);
}
 
// Welcome screen events
document.getElementById('startBtn').addEventListener('click', () => {
  beginTour(document.getElementById('nameInput').value.trim());
});
document.getElementById('nameInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') beginTour(document.getElementById('nameInput').value.trim());
});
document.getElementById('skipWelcome').addEventListener('click', hideTour);
 
// Tooltip controls
document.getElementById('tipEnd').addEventListener('click', hideTour);
document.getElementById('tipNext').addEventListener('click', () => {
  step++;
  if (step >= STEPS.length) { hideTour(); return; }
  tip.classList.remove('show');
  spot.classList.remove('show');
  setTimeout(() => showStep(step), 280);
});
 
// Replay button in header
document.getElementById('replayBtn').addEventListener('click', () => {
  hideTour();
  overlay.classList.add('show');
  setTimeout(() => welcome.classList.add('show'), 50);
});
 
// Click outside tooltip to advance
overlay.addEventListener('click', e => {
  if (e.target === overlay && tourActive && !welcome.classList.contains('show')) {
    step++;
    if (step >= STEPS.length) { hideTour(); return; }
    tip.classList.remove('show');
    spot.classList.remove('show');
    setTimeout(() => showStep(step), 280);
  }
});
 
// Show welcome on first load
window.addEventListener('load', () => {
  setTimeout(() => {
    overlay.classList.add('show');
    welcome.classList.add('show');
  }, 400);
});
