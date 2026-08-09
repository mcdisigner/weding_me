/**
 * ============================================================
 * DIGITAL WEDDING INVITATION — script.js  v9.5
 * Features:
 *   1. Entrance Envelope Open + Auto-Start Romantic Wedding Music
 *   2. Dynamic Bilingual Language Switcher (සිංහල & English)
 *   3. Real-time Countdown Timer (දින, පැය, මිනිත්තු, තත්පර)
 *   4. Romantic Acoustic Wedding Symphony Synthesizer
 *   5. Unified Live Google Map Switcher
 *   6. Polaroid Scrapbook Lightbox Modal
 *   7. Add to Calendar (.ics Download)
 * ============================================================
 */

'use strict';

const CONFIG = {
  WEDDING_DATE: '2026-09-20T16:00:00',
  COUPLE_NAMES: 'Chalith & Piyumi',
  WHATSAPP_PHONE: '39123456789',

  CEREMONY: {
    title:       'Chalith & Piyumi – Wedding Ceremony / විවාහ මංගල්‍යය',
    description: 'We are thrilled to celebrate our special day with you in Florence!',
    location:    "St. Margaret's Chapel, 12 Rose Garden Lane, Florence, Italy",
    start:       '20260920T140000Z',
    end:         '20260920T153000Z',
  },
  RECEPTION: {
    title:       'Chalith & Piyumi – Wedding Reception / මංගල සාදය',
    description: 'Join us for cocktails, dinner, and dancing under the stars!',
    location:    'Villa Roseto Ballroom, 8 Belvedere Terrace, Florence, Italy',
    start:       '20260920T170000Z',
    end:         '20260920T233000Z',
  },
};

/* ══════════════════════════════════════════
   1. ENTRANCE ENVELOPE & AUTO-MUSIC TRIGGER
══════════════════════════════════════════ */
function initEntranceEnvelope() {
  const entranceScreen = document.getElementById('entranceScreen');
  const openBtn        = document.getElementById('openInvitationBtn');
  const waxBtn         = document.getElementById('waxSealBtn');
  const musicPill      = document.getElementById('musicToggleBtn');

  if (!entranceScreen) return;

  function openAndPlay() {
    // 1. Play song immediately
    startWeddingSong();
    if (musicPill) musicPill.classList.add('playing');

    // 2. Animate entrance envelope away
    entranceScreen.classList.add('opened');
    setTimeout(() => {
      entranceScreen.style.display = 'none';
      document.body.style.overflow = '';
    }, 800);
  }

  openBtn?.addEventListener('click', openAndPlay);
  waxBtn?.addEventListener('click', openAndPlay);

  // Fallback: If user scrolls or clicks anywhere on body, auto-start music if not playing
  const autoStartOnFirstTouch = () => {
    if (!isMusicPlaying) {
      startWeddingSong();
      if (musicPill) musicPill.classList.add('playing');
    }
    document.removeEventListener('click', autoStartOnFirstTouch);
    document.removeEventListener('touchstart', autoStartOnFirstTouch);
  };

  document.addEventListener('click', autoStartOnFirstTouch, { once: true });
  document.addEventListener('touchstart', autoStartOnFirstTouch, { once: true });
}

/* ══════════════════════════════════════════
   2. BILINGUAL LANGUAGE SWITCHER (සිංහල / EN)
══════════════════════════════════════════ */
let currentLang = 'si';

function setLanguage(lang) {
  currentLang = lang;
  document.body.setAttribute('data-lang', lang);

  const btnSi = document.getElementById('btnLangSi');
  const btnEn = document.getElementById('btnLangEn');

  if (lang === 'si') {
    btnSi?.classList.add('active');
    btnEn?.classList.remove('active');
  } else {
    btnEn?.classList.add('active');
    btnSi?.classList.remove('active');
  }

  // Update all elements with data-en and data-si
  const translatable = document.querySelectorAll('[data-en][data-si]');
  translatable.forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.textContent = text;
    }
  });

  // Update WhatsApp pre-filled text
  const waBtn = document.getElementById('btnWhatsapp');
  if (waBtn) {
    const msg = lang === 'si'
      ? 'ආයුබෝවන් Chalith & Piyumi! අපි ඔබගේ විවාහ මංගල්‍යයට සතුටින් සහභාගී වෙමු!'
      : 'Hello Chalith & Piyumi! I am thrilled to confirm my attendance for your wedding on September 20, 2026!';
    waBtn.href = `https://wa.me/${CONFIG.WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  }
}

window.setLanguage = setLanguage;

/* ══════════════════════════════════════════
   3. LIVE COUNTDOWN TIMER
══════════════════════════════════════════ */
function initCountdown() {
  const elDays  = document.getElementById('cdDays');
  const elHours = document.getElementById('cdHours');
  const elMins  = document.getElementById('cdMinutes');
  const elSecs  = document.getElementById('cdSeconds');

  if (!elDays || !elHours || !elMins || !elSecs) return;

  const targetTime = new Date(CONFIG.WEDDING_DATE).getTime();

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, '0');
  }

  function update() {
    const diff = targetTime - Date.now();

    if (diff <= 0) {
      elDays.textContent  = '00';
      elHours.textContent = '00';
      elMins.textContent  = '00';
      elSecs.textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    elDays.textContent  = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent  = pad(mins);
    elSecs.textContent  = pad(secs);
  }

  update();
  setInterval(update, 1000);
}

/* ══════════════════════════════════════════
   4. UNIFIED LIVE GOOGLE MAP SWITCHER
══════════════════════════════════════════ */
const MAP_URLS = {
  ceremony:  'https://maps.google.com/maps?q=Cathedral+of+Santa+Maria+del+Fiore+Florence+Italy&t=&z=15&ie=UTF8&iwloc=&output=embed',
  reception: 'https://maps.google.com/maps?q=Forte+di+Belvedere+Florence+Italy&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

const MAP_APP_LINKS = {
  ceremony:  'https://maps.google.com/?q=Florence+Cathedral+Italy',
  reception: 'https://maps.google.com/?q=Belvedere+Florence+Italy',
};

function switchMap(type) {
  const iframe   = document.getElementById('unifiedMapFrame');
  const appLink  = document.getElementById('externalMapLink');
  const btnCerem = document.getElementById('btnMapCeremony');
  const btnRecep = document.getElementById('btnMapReception');

  if (!iframe) return;

  iframe.src = MAP_URLS[type] || MAP_URLS.ceremony;
  if (appLink) {
    appLink.href = MAP_APP_LINKS[type] || MAP_APP_LINKS.ceremony;
  }

  if (type === 'ceremony') {
    if (btnCerem) btnCerem.classList.add('active');
    if (btnRecep) btnRecep.classList.remove('active');
  } else {
    if (btnRecep) btnRecep.classList.add('active');
    if (btnCerem) btnCerem.classList.remove('active');
  }
}

window.switchMap = switchMap;

/* ══════════════════════════════════════════
   5. ROMANTIC WEDDING BALLAD SYNTHESIZER
══════════════════════════════════════════ */
let audioCtx = null;
let isMusicPlaying = false;
let masterGain = null;

function initMusicPlayer() {
  const btn = document.getElementById('musicToggleBtn');
  const audioElement = document.getElementById('weddingMusic');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (audioElement && audioElement.currentSrc) {
      if (audioElement.paused) {
        audioElement.play().then(() => btn.classList.add('playing')).catch(err => console.log(err));
      } else {
        audioElement.pause();
        btn.classList.remove('playing');
      }
      return;
    }

    if (isMusicPlaying) {
      stopWeddingSong();
      btn.classList.remove('playing');
    } else {
      startWeddingSong();
      btn.classList.add('playing');
    }
  });
}

function startWeddingSong() {
  if (isMusicPlaying) return;

  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    isMusicPlaying = true;

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.24, audioCtx.currentTime + 2.5);
    masterGain.connect(audioCtx.destination);

    // Warm Low-Pass Filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 3900;
    filter.connect(masterGain);

    function playNote(freq, start, duration, vel = 0.5) {
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      noteGain.gain.setValueAtTime(0, start);
      noteGain.gain.linearRampToValueAtTime(vel * 0.5, start + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(noteGain);
      noteGain.connect(filter);

      osc.start(start);
      osc.stop(start + duration + 0.05);
    }

    function noteToFreq(name) {
      const scale = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
      const m = name.match(/^([A-G])(b?)(-?\d)$/);
      if (!m) return 440;
      const semitone = scale[m[1]] + (m[2] === 'b' ? -1 : 0);
      const octave = parseInt(m[3]);
      return 440 * Math.pow(2, (semitone - 9 + (octave - 4) * 12) / 12);
    }

    // Canon in D Harmonic Wedding Progression
    const BEAT = 0.95;
    const LOOP = BEAT * 16;
    const startTime = audioCtx.currentTime + 0.1;

    const melodyNotes = [
      ['F#5', 0, 1.8], ['E5', 1.8, 1], ['D5', 2.8, 1], ['C#5', 3.8, 0.4],
      ['B4', 4, 1.8],  ['A4', 5.8, 1], ['G4', 6.8, 1], ['F#4', 7.8, 0.4],
      ['E4', 8, 1.8],  ['D4', 9.8, 1], ['E4', 10.8, 1], ['F#4', 11.8, 0.4],
      ['G4', 12, 1.8], ['F#4', 13.8, 1], ['E4', 14.8, 1.2]
    ];

    const arpeggios = [
      ['D3', 0, 0.5], ['A3', 0.5, 0.5], ['D4', 1, 0.5], ['F#4', 1.5, 0.5],
      ['A2', 2, 0.5], ['E3', 2.5, 0.5], ['A3', 3, 0.5], ['C#4', 3.5, 0.5],
      ['B2', 4, 0.5], ['F#3', 4.5, 0.5], ['B3', 5, 0.5], ['D4', 5.5, 0.5],
      ['F#2', 6, 0.5], ['C#3', 6.5, 0.5], ['F#3', 7, 0.5], ['A3', 7.5, 0.5],
      ['G2', 8, 0.5], ['D3', 8.5, 0.5], ['G3', 9, 0.5], ['B3', 9.5, 0.5],
      ['D3', 10, 0.5], ['A3', 10.5, 0.5], ['D4', 11, 0.5], ['F#4', 11.5, 0.5],
      ['G2', 12, 0.5], ['D3', 12.5, 0.5], ['G3', 13, 0.5], ['B3', 13.5, 0.5],
      ['A2', 14, 0.5], ['E3', 14.5, 0.5], ['A3', 15, 0.5], ['C#4', 15.5, 0.5]
    ];

    for (let loop = 0; loop < 10; loop++) {
      const offset = loop * LOOP;
      melodyNotes.forEach(([note, beat, dur]) => {
        playNote(noteToFreq(note), startTime + offset + beat * BEAT, dur * BEAT, 0.44);
      });
      arpeggios.forEach(([note, beat, dur]) => {
        playNote(noteToFreq(note), startTime + offset + beat * BEAT, dur * BEAT, 0.28);
      });
    }

  } catch (err) {
    console.warn('Audio blocked:', err);
  }
}

function stopWeddingSong() {
  if (!audioCtx) return;
  try {
    if (masterGain) {
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
    }
    setTimeout(() => {
      audioCtx.close();
      audioCtx = null;
      isMusicPlaying = false;
    }, 600);
  } catch (_) {}
}

/* ══════════════════════════════════════════
   6. POLAROID SCRAPBOOK LIGHTBOX MODAL
══════════════════════════════════════════ */
function initLightbox() {
  const modal    = document.getElementById('lightboxModal');
  const backdrop = document.getElementById('lightboxBackdrop');
  const imgEl    = document.getElementById('lightboxImage');
  const capEl    = document.getElementById('lightboxCaption');
  const countEl  = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn  = document.getElementById('lightboxPrev');
  const nextBtn  = document.getElementById('lightboxNext');
  const cards    = Array.from(document.querySelectorAll('.polaroid-card'));

  if (!modal || !cards.length) return;

  let currentIndex = 0;

  function openPhoto(index) {
    currentIndex = index;
    const card = cards[index];
    const img = card.querySelector('img');
    const scriptCap = card.querySelector('.caption-script');

    if (!img) return;

    imgEl.src = img.src;
    imgEl.alt = img.alt || 'Wedding Memory Photo';
    capEl.textContent = scriptCap ? scriptCap.textContent : '';
    countEl.textContent = `${index + 1} / ${cards.length}`;

    modal.hidden = false;
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closePhoto() {
    modal.hidden = true;
    backdrop.hidden = true;
    document.body.style.overflow = '';
  }

  function showNext(step) {
    currentIndex = (currentIndex + step + cards.length) % cards.length;
    openPhoto(currentIndex);
  }

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => openPhoto(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openPhoto(idx);
    });
  });

  closeBtn.addEventListener('click', closePhoto);
  backdrop.addEventListener('click', closePhoto);
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closePhoto();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
}

/* ══════════════════════════════════════════
   7. RSVP FORM HANDLING
══════════════════════════════════════════ */
function initRSVP() {
  const form = document.getElementById('rsvpForm');
  const successCard = document.getElementById('rsvpSuccessCard');
  const guestCountRow = document.getElementById('guestCountRow');

  if (!form) return;

  document.querySelectorAll('input[name="attending"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (guestCountRow) {
        guestCountRow.style.display = radio.value === 'yes' ? 'flex' : 'none';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('guestName');
    const guestName = nameInput.value.trim();

    if (!guestName) {
      alert(currentLang === 'si' ? 'කරුණාකර ඔබගේ නම ඇතුළත් කරන්න.' : 'Please enter your name.');
      nameInput.focus();
      return;
    }

    const isAttending = document.querySelector('input[name="attending"]:checked')?.value === 'yes';
    const guestCount = isAttending ? (document.getElementById('guestCount')?.value || '1') : '0';
    const notes = document.getElementById('guestNotes')?.value.trim() || '';

    // Save response locally
    const rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    rsvps.push({ name: guestName, attending: isAttending, count: guestCount, notes, date: new Date().toISOString() });
    localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));

    document.getElementById('successGuestName').textContent = guestName;
    form.style.display = 'none';
    successCard.hidden = false;
  });
}

/* ══════════════════════════════════════════
   8. ADD TO CALENDAR (.ICS DOWNLOAD)
══════════════════════════════════════════ */
function addToCalendar(type) {
  const event = type === 'ceremony' ? CONFIG.CEREMONY : CONFIG.RECEPTION;

  function formatUTC(date) {
    return date.toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
  }

  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EmmaAndJamesWedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${type}-${Date.now()}@weddinginvitation`,
    `DTSTAMP:${formatUTC(new Date())}`,
    `DTSTART:${event.start}`,
    `DTEND:${event.end}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Wedding-${type}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

window.addToCalendar = addToCalendar;

/* ══════════════════════════════════════════
   9. SCROLL REVEAL
══════════════════════════════════════════ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }
}

/* ══════════════════════════════════════════
   10. INITIALIZATION
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initEntranceEnvelope();
  initCountdown();
  initScrollReveal();
  initMusicPlayer();
  initLightbox();
  initRSVP();
  setLanguage('si'); // Default to Sinhala

  console.log('💍 Digital Wedding Invitation Initialized in Sinhala & English – Chalith & Piyumi!');
});
