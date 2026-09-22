# Mr Ahmed Growth Solutions — Website (IDE-shell edition)

A portfolio presented as a code editor: a file explorer, tabs, a working
terminal, and a live interactive demo instead of a screenshot. No build
step, no framework — deploy it as static files anywhere.

## Files

```
index.html   → design tokens, fonts, the empty shell
data.js      → THE DATA MODEL — PROJECTS[] and SERVICES[]
app.js       → file registry, router, IDE-shell rendering, terminal
```

## The core idea: everything is a "file"

`FILES` in `app.js` (see `buildFiles()`) is generated from `PROJECTS` in
`data.js`. Every published project automatically becomes one file under
`work/` in the sidebar — nothing about the shell, sidebar, tabs, or router
needs to change when a project is added, reordered, or its status changes.

| File | Renders |
|---|---|
| `README.md` | Home — hero, positioning statement, "what I build" |
| `services.json` | Services — generated from `SERVICES[]` |
| `work/index.tsx` | The full project library, with working filters + search |
| `work/<slug>.tsx` | One reusable case-study template, per project |
| `sandbox/icehub-live.tsx` | A **real, working** mini order-flow simulator |
| `sandbox/automation-flow.tsx` | A **real, working** simplified n8n-style workflow demo |
| `showreel.mp4` | The main showreel — generated from `SHOWREEL_VIDEOS[]` in `data.js` |
| `samples/ui-ux-designs.tsx` | UI/UX work — generated from `UI_UX_DESIGNS[]` |
| `samples/n8n-automations.tsx` | Real automation/workflow work — generated from `N8N_AUTOMATIONS[]` |
| `process.log` | The six-stage process, styled as timestamped log lines |
| `about.md` | About |
| `resume.pdf`, `certificates.md`, `showreel.mp4` | Ready-made slots — see below |
| `building.md` | Currently Building |
| `contact.sh` | Contact, styled as a shell script |

### Adding a project
Copy an object in the `PROJECTS` array in `data.js`, edit the fields, save.
It appears as a new file in `work/`, in the work-index grid, in filters and
search, and in the "next project" link at the bottom of every case study.

### Adding real screenshots to a case study (polaroid gallery)
Every project can carry a `gallery: [...]` array — real screenshots shown as
tilted, captioned photo cards in the case study (see `galleryGrid()` in
`app.js`). To add one:
1. Drop the image into `images/<project-slug>/` (create the folder if new).
2. Add an entry to that project's `gallery` array in `data.js`:
   ```js
   gallery: [{ image: "images/my-project/shot-1.jpg", caption: "What this shows." }]
   ```
3. Save, refresh. 3–4 images per project reads well; more than that gets busy.

### Adding/editing a service
Edit the `SERVICES` array in `data.js` — `services.json` regenerates itself.
Each service now renders as a full photo card with the title/description
animating on as it scrolls into view. Set a service's `image` field to a
real photo (`images/services/my-service.jpg`, dropped into a local folder
the same way as everything else, or a hosted URL) and it replaces the
generated placeholder background automatically — leave it `null` and the
placeholder stays.

## The terminal
The bottom terminal is a real (if small) command interpreter — `help`,
`ls`, `open <file>`, `work`, `contact`, `about`, `whoami`, `theme`, `clear`.
It's implemented in `runCommand()` in `app.js`; add a case to the `switch`
to add a command.

## Command palette
`⌘K` / `Ctrl+K` opens a fuzzy-searchable file switcher (same `FILES` list).

## resume.pdf — updating it yourself
Same self-service pattern as the showreel: the actual PDF lives at
`resume.pdf` in the root folder. To update it, just replace that file with
your new one (keep the same filename) — no code changes needed. The page
also shows an HTML-rendered summary alongside the download button so the
content is always visible even without a PDF viewer; that summary is
written directly in `contentResume()` in `app.js` if you want to edit its
wording independently of the PDF.

## certificates.md — adding certificates yourself
Same pattern again:
1. Drop an image or PDF into a `certificates/` folder next to `index.html`.
2. Add one entry to `CERTIFICATES` in `data.js`:
   ```js
   { title: "Certificate Name", issuer: "Issuing Body", date: "2026", image: "certificates/my-cert.jpg", url: "https://verify-link (optional)" }
   ```
3. Save, refresh. Nothing else to touch.

## showreel.mp4 — adding videos yourself, no code knowledge needed
This is fully self-service:

1. Drop an `.mp4` file into the `videos/` folder next to `index.html`
   (create the folder if it isn't there).
2. Open `data.js`, find `SHOWREEL_VIDEOS`, and add one line:
   ```js
   { title: "My New Reel", context: "What it's about.", videoUrl: "videos/my-new-reel.mp4" }
   ```
3. Save. Refresh the page. Done — no rebuild, no other file touched.

The same pattern applies to `EMAIL_DESIGNS` and `AI_VIDEO_SAMPLES` in
`data.js` for the `samples/` folder.

**Note on the hosted preview vs. the deployed site:** the single-file
artifact preview embeds the video as base64 (so it's self-contained for
that view). The deployable `.zip` instead ships the real `.mp4` file in
`videos/` and references it by relative path — this is the version to
actually deploy, since embedding large videos as base64 bloats the page
unnecessarily. If a video is large (tens of MB+), consider hosting it
externally (YouTube unlisted, Cloudinary, Bunny Stream) and pointing
`videoUrl` at that link instead of a local file.

## Running it locally
Static — open `index.html`, or `npx serve .`.

## Deploying
Drag-and-drop the folder onto Netlify, or run `vercel` in this directory.
No build command or environment variables required for the current version.

## The contact form
No backend is wired up, so submitting opens the visitor's email client with
the message pre-filled (`bindContactForm()` in `app.js`). Swap this for
Formspree/FormSubmit or a serverless function when ready — fields are
already named and validated (`name`, `email`, `company`, `need`, `budget`,
`message`).

## Moving to a real CMS later
`PROJECTS` and `SERVICES` in `data.js` are shaped like database rows.
Replace the static arrays with a `fetch()` to Supabase/your API returning
the same shape — filtering, sorting, the case-study template, and the file
registry all depend only on the data's shape, not its source.

## What was deliberately kept simple
- No admin dashboard that doesn't persist anything (per the brief) — wire
  up a real backend first, then add an admin UI on top of it.
- Project cover art is abstract generated graphics, not screenshots, since
  most linked projects are live third-party sites without a way to verify
  reproduction rights. Swap in real photography any time.
- No fabricated stats, testimonials, results, or credentials. Projects and
  slots without verified information say so plainly instead.
