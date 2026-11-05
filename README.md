# ShambaSkills — installable prototype

An offline-first web app for CBET practical assessment in agricultural TVET.
Screens: Trainee, Trainer, Workplace mentor (USSD simulator, English/Kiswahili), Test results, Setup.

## Files
| File | Purpose |
| --- | --- |
| index.html | The whole app |
| manifest.webmanifest | Makes it installable ("Add to Home screen") |
| sw.js | Offline worker: the app opens with no internet after the first visit |
| icon-192.png, icon-512.png, apple-touch-icon.png | App icons |

## Two versions, one code
1. **Installable offline app** (this folder, put on free hosting). Works with no internet. Data stays on each phone and moves between phones as files over WhatsApp, Bluetooth or USB. No AI here, because AI needs a paid key and an internet connection.
2. **Online version on claude.ai** (the link Claude gave you). Same app with live sync between your signed-in devices and AI suggestions and coaching.

Use the online version at the trainer station for the AI features. Use the installed app on trainee and mentor phones to show the offline design.

## Free hosting (choose one, about 10 minutes)
**A. Netlify Drop (easiest)**
1. Unzip this folder on a laptop.
2. Open app.netlify.com/drop in Chrome.
3. Drag the folder onto the page. You get an https link straight away.
4. Create a free account and claim the site so the link stays live.

**B. GitHub Pages**
1. Create a free GitHub account and a new public repository, e.g. `shambaskills`.
2. Upload all files in this folder (Add file → Upload files) and commit.
3. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)` → Save.
4. After 1–2 minutes the app is at `https://<your-username>.github.io/shambaskills/`.

**C. No hosting at all (laptop only)**
In this folder run `python -m http.server 8000` and open `http://localhost:8000` on the same laptop. Phones cannot install it this way, because installing needs an https link.

## Install on a phone
- Android (Chrome): open the link, then menu ⋮ → "Install app" or "Add to Home screen". An "Install app" button also appears at the top of the app.
- iPhone (Safari): open the link, tap Share → "Add to Home Screen".
Open it once while online; after that it works offline.

## Test-day data flow (no internet needed)
1. Trainee phone: send evidence → **Send my evidence file** → share to the trainer by WhatsApp or Bluetooth.
2. Mentor phone: complete check-ins → **Send check-ins file**.
3. Trainer device: **Import evidence or check-in files** (select several at once) → review → **Send feedback file** to the class group.
4. Trainee phone: **Import trainer feedback**. Each trainee sees only their own results.
5. End of session: Setup → **Save backup file** on every device. Restore them all on one device to get combined test results.

## Before testing
The task (Deworm a goat using an oral drench, unit Manage Parasitic Diseases) and its five criteria are already built in, so every phone shows the same criteria with no setup. Read them once against your Learning Guide; if you change anything in Setup, copy it to the other phones with a backup file.
