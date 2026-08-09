# 💍 Digital Wedding Invitation – Chalith & Piyumi

A complete, ready-to-deploy single-page digital wedding invitation built with
pure HTML5, Vanilla CSS3, and Vanilla JavaScript.

---

## 📁 File Structure

```
my idea/
├── index.html       ← Main page (all sections)
├── style.css        ← All styles (edit design tokens in :root)
├── script.js        ← All interactivity (edit CONFIG at the top)
├── images/
│   ├── hero.jpg     ← Hero background (replace with yours)
│   ├── couple.jpg   ← Our Story couple photo (replace with yours)
│   ├── gallery1.jpg ← Gallery photos (replace with yours)
│   ├── gallery2.jpg
│   └── gallery3.jpg
└── music/
    └── background.mp3  ← Add your wedding song here
```

---

## ✏️ How to Customize

### 1. Names & Date (index.html)
Search for "Chalith" and "Piyumi" and replace with the real couple's names.
Search for "September 20" or "20 September 2026" and update the date.

### 2. Countdown & Calendar (script.js → CONFIG object at the top)
```js
WEDDING_DATE: '2026-09-20T16:00:00',   // ← Your ceremony date/time
COUPLE_NAMES: 'Chalith & Piyumi',
WHATSAPP_PHONE: '39123456789',
CEREMONY: { start: '20260920T140000Z', ... },
RECEPTION: { start: '20260920T170000Z', ... },
```

### 3. Google Maps Links (index.html)
Find `maps.google.com/?q=` and replace the query with your venue address.

### 4. Photos (images/ folder)
Replace any of the images in the `images/` folder with your own photos.
- `hero.jpg`   – Full-screen background (landscape, min 1920px wide)
- `couple.jpg` – Our Story photo (portrait, ~600×700px)
- `gallery1-3.jpg` – Gallery photos (landscape, ~800×600px)

### 5. Colors & Fonts (style.css → :root section)
All design tokens are in one place:
```css
--clr-gold:     #c9a96e;   /* primary gold */
--clr-rose:     #c07b6e;   /* rose accent  */
--clr-cream:    #fdf8f2;   /* background   */
--hero-bg: url('images/hero.jpg');  /* hero image */
```

---

## 📧 Connecting the RSVP Form

### Option A – Formspree (recommended, free)
1. Sign up at https://formspree.io
2. Create a new form → copy your endpoint URL
3. In `script.js`, set: `FORMSPREE_URL: 'https://formspree.io/f/YOUR_ID'`
4. In `index.html`, add to `<form>`:
   ```html
   action="https://formspree.io/f/YOUR_ID" method="POST"
   ```

### Option B – EmailJS
1. Sign up at https://www.emailjs.com/
2. In `script.js` CONFIG, set `EMAILJS.enabled: true` and fill in your keys.
3. Add to `index.html <head>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

---

## 🎵 Background Music
Out of the box the site plays a built-in romantic wedding melody (Canon in D
progression synthesized in-browser, loops forever — no file needed).

To use your own song instead:
1. Create a `music/` folder in the project root
2. Add your royalty-free wedding song as `music/background.mp3`
3. The ♪ button will play it; the built-in melody is used only if the file is missing

---

## 🌐 Deploying
This is a static site – you can host it anywhere:

| Platform | How |
|---|---|
| **Netlify** | Drag & drop the folder at netlify.com/drop |
| **GitHub Pages** | Push to a repo, enable Pages in Settings |
| **Vercel** | `npx vercel` in the project folder |
| **Any web host** | Upload via FTP |

---

## 🎨 Features
- ✅ Romantic hero section with floating petals animation
- ✅ Live countdown timer (Days / Hours / Minutes / Seconds)
- ✅ Music toggle button with fade-in volume
- ✅ Our Story section with couple photo
- ✅ Event details cards (Ceremony, Reception, Dress Code)
- ✅ "Get Directions" button (Google Maps)
- ✅ "Add to Calendar" (.ics download)
- ✅ Photo gallery with CSS Grid + lightbox zoom
- ✅ RSVP form with validation (Formspree / EmailJS ready)
- ✅ Scroll-triggered fade-up animations
- ✅ Bilingual top action bar (සිංහල / English switcher + music toggle)
- ✅ 100% mobile responsive
- ✅ Accessible (ARIA labels, keyboard navigation, reduced motion)
