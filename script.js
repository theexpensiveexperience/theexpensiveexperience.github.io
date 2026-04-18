/* ─── UTILITIES ─────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const GLITCH = '!@#$%^&*<>/\\|{}[]~?';
const gc = () => GLITCH[Math.random() * GLITCH.length | 0];

/* ─── BOOT SEQUENCE DATA ─────────────────────────────────── */
const BOOT = [
  { t: 'alfrednguyen.me — portfolio v2.1', c: 'b', ms: 0 },
  { t: '', c: 'd', ms: 0 },
  { t: '[ 0.001 ] Kernel: Systemstart...', c: 'd', ms: 0 },
  { t: '[ 0.041 ] CPU: Intel Core i7-1260P @ 2.10GHz', c: 'd', ms: 0 },
  { t: '[ 0.132 ] Aufklaerung  ... \x1bOK\x1b', c: 'ok', ms: 0 },
  { t: '[ 0.178 ] Verteidigung ... \x1bOK\x1b', c: 'ok', ms: 0 },
  { t: '[ 0.210 ] burpsuite · wireshark · nmap ... online', c: 'n', ms: 0 },
  { t: '[ 0.330 ] Ausbildung: Technische Assistenten — Lichtenfels', c: 'n', ms: 0 },
  { t: '[ 0.370 ] Zertifikat: Google Cybersecurity · Proofpoint', c: 'ok', ms: 0 },
  { t: '[ 0.400 ] Sprachen: vi:Muttersprache · en:C1 · de:B2', c: 'n', ms: 0 },
  { t: '', c: 'd', ms: 0 },
  { t: '[ 0.440 ] WARNUNG: Alle Aktivitaeten werden protokolliert', c: 'w', ms: 0 },
  { t: '[ 0.470 ] Ziel: Ausbildung zum Fachinformatiker Systemintegration/Anwendungsentwickler ', c: 'w', ms: 0 },
  { t: '', c: 'd', ms: 0 },
  { t: '[ 0.520 ] Alle Systeme betriebsbereit.', c: 'b', ms: 40 },
  { t: '> Portfolio wird gestartet...', c: 'c', ms: 0 },
];

/* ─── TYPEWRITER ─────────────────────────────────────────── */
let booting = true;

function typeLine(el, text, speed, cb) {
  const clean = text.replace(/\x1b(OK)\x1b/g, '$1');
  const hasOK = text.includes('\x1bOK\x1b');
  let i = 0;
  (function tick() {
    if (i <= clean.length) {
      let d = clean.slice(0, i);
      if (hasOK && i < clean.length) d += gc();
      el.textContent = d;
      i++;
      setTimeout(tick, speed);
    } else {
      el.textContent = clean;
      if (cb) cb();
    }
  })();
}

/* ─── BOOT RUNNER ────────────────────────────────────────── */
function runBoot(idx) {
  if (!booting) { doTransition(); return; }
  if (idx >= BOOT.length) { setTimeout(doTransition, 80); return; }
  const item = BOOT[idx];
  const c = $('blines');
  const el = document.createElement('div');
  el.className = 'bl ' + item.c;
  c.appendChild(el);
  window.scrollTo(0, document.body.scrollHeight);
  const spd = item.t.length > 0 ? 1 : 0;
  typeLine(el, item.t, spd, () => setTimeout(() => runBoot(idx + 1), item.ms));
}

function skipBoot() { booting = false; doTransition(); }

/* ─── WIPE TRANSITION ────────────────────────────────────── */
function doTransition() {
  $('skip-hint').style.display = 'none';
  const w = $('wipe');
  w.style.transition = 'transform 0.30s cubic-bezier(0.4,0,0.2,1)';
  w.style.transformOrigin = 'top';
  w.style.transform = 'scaleY(1)';
  setTimeout(() => {
    $('boot').style.display = 'none';
    const cv = $('cv');
    cv.style.display = 'block';
    w.style.transformOrigin = 'bottom';
    w.style.transition = 'transform 0.36s cubic-bezier(0.4,0,0.2,1)';
    requestAnimationFrame(() => {
      w.style.transform = 'scaleY(0)';
      setTimeout(() => {
        cv.style.opacity = '1';
        typeHero();
      }, 260);
    });
  }, 340);
}

/* ─── HERO TYPE-IN ───────────────────────────────────────── */
function typeHero() {
  typeLine($('hero-name-el'), 'Minh Hieu Nguyen', 6, () => {
    $('hero-socials').classList.add('visible');
    typeLine($('hero-loc'), 'coburg, deutschland', 5, () => {
      typeLine($('hero-tag-el'),
        'IT-Schueler — Systeme erkunden & verstehen\nZiel: Ausbildung Fachinformatiker Systemintegration',
        4, () => { showCity(); });
    });
  });
}

/* ─── CITY REVEAL ────────────────────────────────────────── */
function showCity() {
  const div = $('city-divider');
  const img = $('city-img');
  img.src = 'https://www.coburg.de/medien/bildergalerie/sehenswuerdigkeiten/schloesser-veste/veste/veste/DSC_5472-LR02-2.jpg.scaled/f16d720ab5c58061d86cc7baf84b1cd7.jpg';
  div.style.display = 'block';
  div.style.opacity = '0';
  div.style.transition = 'opacity 0.9s ease';
  img.onload = () => requestAnimationFrame(() => {
    div.style.opacity = '1';
    setTimeout(revealBody, 700);
  });
  img.onerror = () => setTimeout(revealBody, 200);
  setTimeout(() => {
    if (div.style.opacity === '0') { div.style.opacity = '1'; setTimeout(revealBody, 500); }
  }, 1400);
}

/* ─── REVEAL SECTIONS ────────────────────────────────────── */
function revealBody() {
  $('cv-body').style.opacity = '1';
  const ids = ['s1', 's2', 's3'];
  ids.forEach((id, i) => setTimeout(() => $(id).classList.add('on'), i * 150 + 60));
  setTimeout(() => {
    $('cmd-wrap').classList.add('on');
    $('cmd-in').focus();
    startAmbient();
  }, 3 * 150 + 300);
}

/* ─── AMBIENT GLITCH ─────────────────────────────────────── */
function startAmbient() {
  setInterval(() => {
    if (Math.random() < 0.08) {
      const f = $('flicker');
      f.style.opacity = '0.015';
      setTimeout(() => f.style.opacity = '0', 65);
    }
    if (Math.random() < 0.04) {
      const tags = document.querySelectorAll('.tag');
      const t = tags[Math.random() * tags.length | 0];
      const orig = t.textContent;
      t.textContent = orig.split('').map(c => Math.random() < 0.18 ? gc() : c).join('');
      setTimeout(() => t.textContent = orig, 140);
    }
  }, 2800);
}

/* ─── TERMINAL COMMANDS ──────────────────────────────────── */
const CMDS = {
  whoami: `minh hieu nguyen  //  alfred
IT-Schueler — Coburg, Deutschland
E-Mail  →  nguyenhieu.231004@gmail.com
Web     →  alfrednguyen.me
Ziel: Ausbildung Fachinformatiker Systemintegration`,

  kontakt: `E-Mail   →  nguyenhieu.231004@gmail.com
github   →  github.com/scrypzt
linkedin →  linkedin.com/in/nguyen-minh-hieu-a3445121b
Web      →  alfrednguyen.me
Adresse  →  Kalenderweg, 96450 Coburg`,

  ausbildung: `[laufend]
  Technische Assistenten fuer Informatik
  → 09/2025 — heute · Lichtenfels, Bayern

[abgeschlossen]
  Studienkolleg — Hochschule Coburg
  → 08/2024 — 08/2025 · Coburg, Bayern

  Realschulabschluss — Le Quy Don Oberschule
  → 09/2019 — 09/2023 · Hanoi, Vietnam

Ziel:
  Ausbildung Fachinformatiker — Systemintegration`,

  werkzeuge: `Sicherheit:  burp suite · nmap · wireshark
Buero:       Microsoft Word · Excel · PowerPoint`,

  zertifikate: `Google Cybersecurity (Professional Certificate)
Proofpoint Certified AI Email Security
[laufend] PortSwigger Web Security Academy  68%`,

  sprachen: `Vietnamesisch  — Muttersprache
Englisch       — C1 / B2
Deutsch        — B2  (Ziel: C1)`,

  ehrenamt: `Plastikgreen — Mitbegruender
09/2023 — 12/2023 · Hanoi, Vietnam

Gemeinnuetzige Recycling-Initiative:
  · Plastikabfall gegen Pflanzen getauscht
  · Umweltbewusstsein in der Gemeinschaft gefoerdert
  · 50% der Erloese an Obdachlosenhilfe gespendet`,

  clear: '__clear__',

  hilfe: `Befehle:
  whoami · kontakt · ausbildung · werkzeuge
  zertifikate · sprachen · ehrenamt · clear`,
};

const cmdIn = $('cmd-in');
const cmdOut = $('cmd-out');
const cmdHistory = $('cmd-history');
let history = [];
let histIdx = -1;

cmdIn.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx < history.length - 1) { histIdx++; cmdIn.value = history[histIdx]; }
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx > 0) { histIdx--; cmdIn.value = history[histIdx]; }
    else { histIdx = -1; cmdIn.value = ''; }
    return;
  }
  if (e.key !== 'Enter') return;

  const val = cmdIn.value.trim().toLowerCase();
  cmdIn.value = '';
  cmdOut.className = '';
  cmdOut.textContent = '';

  if (!val) return;

  history.unshift(val);
  histIdx = -1;

  const echo = document.createElement('div');
  echo.className = 'cmd-history-line cmd-echo';
  echo.textContent = 'alfred@portfolio:~$ ' + val;
  cmdHistory.appendChild(echo);

  if (CMDS[val] === '__clear__') {
    cmdHistory.innerHTML = '';
    cmdOut.textContent = '';
    return;
  }
  if (CMDS[val]) {
    typeOutput(cmdOut, CMDS[val]);
  } else {
    cmdOut.className = 'er';
    cmdOut.textContent = `Befehl nicht gefunden: ${val}\nTipp: 'hilfe' fuer verfuegbare Befehle`;
  }
  setTimeout(() => cmdHistory.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
});

function typeOutput(el, text) {
  let i = 0;
  el.textContent = '';
  (function tick() {
    if (i <= text.length) { el.textContent = text.slice(0, i); i++; setTimeout(tick, 8); }
  })();
}

/* ─── KICK OFF ───────────────────────────────────────────── */
runBoot(0);
