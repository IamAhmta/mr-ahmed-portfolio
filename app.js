/* ============================================================
   AHMED.SYS — portfolio rendered as a code editor.
   File registry (below) is generated from data.js's PROJECTS array,
   so adding a project automatically adds a file to work/ — no
   layout or shell code needs to change.
   ============================================================ */

const ICONS = {
  arrow: `<svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  menu: `<svg width="16" height="11" viewBox="0 0 18 12" fill="none"><path d="M0 1H18M0 11H18" stroke="currentColor" stroke-width="1.4"/></svg>`,
  close: `<svg width="12" height="12" viewBox="0 0 18 18" fill="none"><path d="M1 1L17 17M17 1L1 17" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  sun: `<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1.4"/><path d="M10 1V3M10 17V19M19 10H17M3 10H1M16.4 3.6L15 5M5 15L3.6 16.4M16.4 16.4L15 15M5 5L3.6 3.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  moon: `<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M17 12.5A7.5 7.5 0 118 2a6 6 0 009 10.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  x: `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
};
function icon(n) { return ICONS[n] || ""; }
function escapeHtml(s) { return s == null ? "" : String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function statusLabel(s) { return { live: "live", "in-progress": "in-progress", "coming-soon": "coming-soon", archived: "archived" }[s] || s; }
function statusClass(s) { return { live: "live", "in-progress": "progress", "coming-soon": "soon", archived: "archived" }[s] || ""; }
function statusColor(s) { return { live: "var(--green)", "in-progress": "var(--amber)", "coming-soon": "var(--grey)", archived: "var(--grey)" }[s] || "var(--grey)"; }
function categoryLabel(id) { const c = CATEGORIES.find((c) => c.id === id); return c ? c.label : id; }

function coverSVG(project, big) {
  let seed = 0;
  for (const ch of project.id) seed = (seed * 31 + ch.charCodeAt(0)) % 997;
  const rot = seed % 3;
  const initials = project.title.split(" ").filter((w) => /[A-Za-z0-9]/.test(w[0])).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const lines = [];
  for (let i = 0; i < 6; i++) {
    const y = 20 + i * 34 + (seed % 10);
    lines.push(`<line x1="-20" y1="${y}" x2="420" y2="${y - 40 + rot * 10}" stroke="rgba(76,124,255,${0.05 + (i % 3) * 0.03})" stroke-width="1"/>`);
  }
  const w = big ? 900 : 400, hh = big ? 500 : 240;
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="${w}" height="${hh}">
    <rect width="400" height="240" fill="#111520"/>${lines.join("")}
    <circle cx="${60 + (seed % 260)}" cy="${30 + (seed % 140)}" r="110" fill="url(#g${seed})" opacity="0.55"/>
    <defs><radialGradient id="g${seed}"><stop offset="0%" stop-color="#4C7CFF" stop-opacity="0.4"/><stop offset="100%" stop-color="#4C7CFF" stop-opacity="0"/></radialGradient></defs>
    <text x="200" y="132" font-family="JetBrains Mono, monospace" font-size="44" fill="#EDEFEC" text-anchor="middle" opacity="0.9">${initials}</text>
  </svg>`)}`;
}

/* Placeholder "photo" background for a service card, used until a real
   image is supplied — richer/bigger than the project cover art since it
   has to carry a full card, not just a small thumbnail. */
function serviceCoverSVG(seedStr) {
  let seed = 0;
  for (const ch of seedStr) seed = (seed * 31 + ch.charCodeAt(0)) % 997;
  const rot = seed % 3;
  const lines = [];
  for (let i = 0; i < 8; i++) {
    const y = -20 + i * 60 + (seed % 20);
    lines.push(`<line x1="-40" y1="${y}" x2="820" y2="${y - 90 + rot * 20}" stroke="rgba(76,124,255,${0.05 + (i % 3) * 0.03})" stroke-width="1.5"/>`);
  }
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 560" width="760" height="560">
    <rect width="760" height="560" fill="#111520"/>${lines.join("")}
    <circle cx="${140 + (seed % 480)}" cy="${100 + (seed % 300)}" r="230" fill="url(#g${seed})" opacity="0.6"/>
    <defs><radialGradient id="g${seed}"><stop offset="0%" stop-color="#4C7CFF" stop-opacity="0.38"/><stop offset="100%" stop-color="#4C7CFF" stop-opacity="0"/></radialGradient></defs>
  </svg>`)}`;
}

function initReveal(root = document) {
  // A fresh observer per render avoids holding a stale `root` reference to a
  // .content element that gets replaced on every navigation.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); } });
  }, { threshold: 0.08 });
  root.querySelectorAll(".rv:not(.in), .svc-photo-card:not(.in)").forEach((el) => observer.observe(el));
}

function initTheme() {
  const saved = localStorage.getItem("ahmed-theme");
  if (saved === "light") document.documentElement.setAttribute("data-theme", "light");
}
function toggleTheme() {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  if (isLight) { document.documentElement.removeAttribute("data-theme"); try { localStorage.setItem("ahmed-theme", "dark"); } catch (e) {} }
  else { document.documentElement.setAttribute("data-theme", "light"); try { localStorage.setItem("ahmed-theme", "light"); } catch (e) {} }
  document.querySelectorAll("[data-theme-icon]").forEach((el) => { el.innerHTML = !isLight ? icon("moon") : icon("sun"); });
}

/* ============================================================
   FILE REGISTRY — generated from PROJECTS. This is the whole
   reason new projects never require touching the shell: each
   published project becomes one file under work/.
   ============================================================ */
function buildFiles() {
  const files = [];
  files.push({ id: "readme", name: "README.md", ext: "md", hash: "#/", kind: "home" });
  files.push({ id: "services", name: "services.json", ext: "json", hash: "#/services", kind: "services" });
  files.push({ id: "work-index", name: "index.tsx", ext: "tsx", hash: "#/work", kind: "work-index", folder: "work" });
  getPublishedProjects().forEach((p) => {
    files.push({ id: "work-" + p.slug, name: p.slug + ".tsx", ext: "tsx", hash: "#/work/" + p.slug, kind: "case-study", slug: p.slug, folder: "work", status: p.status });
  });
  files.push({ id: "sandbox", name: "icehub-live.tsx", ext: "tsx", hash: "#/sandbox", kind: "sandbox", folder: "sandbox" });
  files.push({ id: "automation-flow", name: "automation-flow.tsx", ext: "tsx", hash: "#/sandbox/automation-flow", kind: "automation-flow", folder: "sandbox" });
  files.push({ id: "email-designs", name: "email-designs.tsx", ext: "tsx", hash: "#/samples/email-designs", kind: "email-designs", folder: "samples" });
  files.push({ id: "ai-videos", name: "ai-generated-videos.tsx", ext: "tsx", hash: "#/samples/ai-videos", kind: "ai-videos", folder: "samples" });
  files.push({ id: "ui-ux-designs", name: "ui-ux-designs.tsx", ext: "tsx", hash: "#/samples/ui-ux-designs", kind: "ui-ux-designs", folder: "samples" });
  files.push({ id: "n8n-automations", name: "n8n-automations.tsx", ext: "tsx", hash: "#/samples/n8n-automations", kind: "n8n-automations", folder: "samples" });
  files.push({ id: "process", name: "process.log", ext: "log", hash: "#/process", kind: "process" });
  files.push({ id: "about", name: "about.md", ext: "md", hash: "#/about", kind: "about" });
  files.push({ id: "resume", name: "resume.pdf", ext: "pdf", hash: "#/resume", kind: "resume" });
  files.push({ id: "certificates", name: "certificates.md", ext: "md", hash: "#/certificates", kind: "certificates" });
  files.push({ id: "showreel", name: "showreel.mp4", ext: "mp4", hash: "#/showreel", kind: "showreel" });
  files.push({ id: "building", name: "building.md", ext: "md", hash: "#/building", kind: "building" });
  files.push({ id: "contact", name: "contact.sh", ext: "sh", hash: "#/contact", kind: "contact" });
  return files;
}
const FILES = buildFiles();
function fileById(id) { return FILES.find((f) => f.id === id); }
function fileByHash(hash) { return FILES.find((f) => f.hash === hash); }
function extIcon(ext) {
  return { md: "▤", json: "{}", tsx: "◇", log: "≣", sh: ">_", pdf: "▣", mp4: "▶" }[ext] || "•";
}
function extColor(ext) {
  return { md: "var(--off-dim)", json: "var(--amber)", tsx: "var(--blue)", log: "var(--off-dim)", sh: "var(--green)", pdf: "var(--red)", mp4: "var(--blue)" }[ext] || "var(--grey)";
}

/* ============================================================
   APP STATE
   ============================================================ */
const state = {
  openTabs: ["readme"],
  activeTab: "readme",
  sidebarOpen: false,
  terminalOpen: false,
  workFilter: "all",
  workQuery: "",
  paletteOpen: false,
};

function openFile(id, { activate = true, pushHash = true } = {}) {
  const f = fileById(id);
  if (!f) return;
  if (!state.openTabs.includes(id)) state.openTabs.push(id);
  if (activate) state.activeTab = id;
  if (pushHash && window.location.hash !== f.hash) window.location.hash = f.hash;
  else render();
}
function closeTab(id, ev) {
  if (ev) ev.stopPropagation();
  const idx = state.openTabs.indexOf(id);
  if (idx === -1) return;
  state.openTabs.splice(idx, 1);
  if (state.openTabs.length === 0) state.openTabs.push("readme");
  if (state.activeTab === id) {
    const newIdx = Math.min(idx, state.openTabs.length - 1);
    state.activeTab = state.openTabs[newIdx];
    const f = fileById(state.activeTab);
    if (window.location.hash !== f.hash) window.location.hash = f.hash;
    else render();
  } else {
    render();
  }
}

/* ============================================================
   SHELL RENDER
   ============================================================ */
function render() {
  const hash = window.location.hash || "#/";
  const f = fileByHash(hash) || matchDynamicHash(hash);
  const activeId = f ? f.id : "404";
  if (f && !state.openTabs.includes(f.id)) state.openTabs.push(f.id);
  if (f) state.activeTab = f.id;

  const app = document.getElementById("app");
  app.innerHTML = `
    <div id="ide">
      ${renderTopbar(f)}
      ${renderSidebar(activeId)}
      <div class="maincol">
        ${renderTabbar()}
        <div class="content" id="content">${f ? renderFileContent(f) : render404()}</div>
        ${renderTerminal()}
      </div>
    </div>
    ${state.paletteOpen ? renderPalette() : ""}
  `;
  document.title = f ? `ahmed.sys — ${f.name}` : "404 — ahmed.sys";
  bindShell();
  bindFileBehaviors(f);
  initReveal(document.getElementById("content"));
}

function matchDynamicHash() { return null; }

function renderTopbar(f) {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const crumb = f ? (f.folder ? `${f.folder}/${f.name}` : f.name) : "404";
  return `
  <div class="topbar">
    <div class="topbar-left">
      <button class="icon-btn sidebar-toggle" id="btn-sidebar" aria-label="Toggle file explorer">${icon("menu")}</button>
      <span class="root">ahmed<span>.sys</span></span>
      <span class="crumb-sep">/</span>
      <span class="crumb">${crumb}</span>
    </div>
    <div class="topbar-right">
      <span class="status-chip"><span class="dot"></span>systems: operational</span>
      <button class="icon-btn" id="btn-theme" data-theme-icon aria-label="Toggle theme">${isLight ? icon("moon") : icon("sun")}</button>
      <button class="kbtn" id="btn-palette">⌘K search</button>
      <a href="#/contact" class="cta-btn">Let's talk ${icon("arrow")}</a>
    </div>
  </div>`;
}

function renderSidebar(activeId) {
  const workChildren = FILES.filter((f) => f.folder === "work");
  const sandboxChildren = FILES.filter((f) => f.folder === "sandbox");
  const samplesChildren = FILES.filter((f) => f.folder === "samples");
  const rootTop = FILES.filter((f) => !f.folder && ["readme", "services"].includes(f.id));
  const rootBottom = FILES.filter((f) => !f.folder && ["process", "about", "resume", "certificates", "showreel", "building", "contact"].includes(f.id));

  const item = (f) => `
    <div class="tree-item ${f.id === activeId ? "active" : ""}" data-open="${f.id}" tabindex="0" role="button">
      <span class="fi" style="color:${extColor(f.ext)};">${extIcon(f.ext)}</span>
      <span>${f.name}</span>
      ${f.status ? `<span class="tree-status" style="background:${statusColor(f.status)};"></span>` : ""}
    </div>`;

  return `
  <div class="sidebar-scrim ${state.sidebarOpen ? "open" : ""}" id="sidebar-scrim"></div>
  <div class="sidebar ${state.sidebarOpen ? "open" : ""}" id="sidebar">
    <div class="sidebar-label">EXPLORER · AHMED.SYS</div>
    ${rootTop.map(item).join("")}
    <div class="tree-folder" data-folder="work"><span class="chev">▾</span><span>work/</span></div>
    <div class="tree-children">${workChildren.map(item).join("")}</div>
    <div class="tree-folder" data-folder="sandbox"><span class="chev">▾</span><span>sandbox/</span></div>
    <div class="tree-children">${sandboxChildren.map(item).join("")}</div>
    <div class="tree-folder" data-folder="samples"><span class="chev">▾</span><span>samples/</span></div>
    <div class="tree-children">${samplesChildren.map(item).join("")}</div>
    ${rootBottom.map(item).join("")}
  </div>`;
}

function renderTabbar() {
  return `
  <div class="tabbar" id="tabbar">
    ${state.openTabs.map((id) => {
      const f = fileById(id);
      if (!f) return "";
      return `<div class="tab ${id === state.activeTab ? "active" : ""}" data-tab="${id}">
        <span style="color:${extColor(f.ext)};">${extIcon(f.ext)}</span>
        <span>${f.name}</span>
        <span class="x" data-close="${id}">${icon("x")}</span>
      </div>`;
    }).join("")}
  </div>`;
}

function renderTerminal() {
  return `
  <div class="terminal ${state.terminalOpen ? "" : "collapsed"}" id="terminal">
    <div class="terminal-bar" id="terminal-bar">
      <span>terminal · ahmed.sh</span>
      <span>${state.terminalOpen ? "▾ hide" : "▴ show"}</span>
    </div>
    <div class="terminal-out" id="terminal-out">
      <div class="line">ahmed.sh — type <span class="ok">help</span> to see what this does.</div>
    </div>
    <div class="terminal-input-row">
      <span class="prompt">$</span>
      <input id="terminal-input" type="text" autocomplete="off" spellcheck="false" placeholder="type a command…" aria-label="Terminal command input">
    </div>
  </div>`;
}

function renderPalette() {
  return `
  <div id="palette-overlay">
    <div id="palette">
      <input id="palette-input" placeholder="Jump to a file…" autofocus>
      <div id="palette-list">
        ${FILES.map((f) => `<div class="palette-item" data-open="${f.id}"><span style="color:${extColor(f.ext)};">${extIcon(f.ext)}</span><span>${f.folder ? f.folder + "/" : ""}${f.name}</span></div>`).join("")}
      </div>
    </div>
  </div>`;
}

function render404() {
  return `<div class="file-body"><p class="file-tag">// <span class="path">404</span></p>
    <h1 class="display" style="font-size:2.2rem;">This file doesn't exist.</h1>
    <a href="#/work" class="btn primary" style="margin-top:24px;">cd work/ ${icon("arrow")}</a></div>`;
}

/* ============================================================
   BINDINGS
   ============================================================ */
function bindShell() {
  document.querySelectorAll("[data-open]").forEach((el) => {
    el.addEventListener("click", () => { closePalette(); closeSidebarMobile(); openFile(el.dataset.open); });
    el.addEventListener("keydown", (e) => { if (e.key === "Enter") { closePalette(); closeSidebarMobile(); openFile(el.dataset.open); } });
  });
  document.querySelectorAll(".tree-folder").forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("closed");
      const kids = el.nextElementSibling;
      if (kids && kids.classList.contains("tree-children")) kids.style.display = el.classList.contains("closed") ? "none" : "block";
    });
  });
  document.querySelectorAll("[data-tab]").forEach((el) => {
    el.addEventListener("click", () => openFile(el.dataset.tab));
  });
  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", (e) => closeTab(el.dataset.close, e));
  });
  const sbBtn = document.getElementById("btn-sidebar");
  if (sbBtn) sbBtn.addEventListener("click", () => { state.sidebarOpen = true; document.getElementById("sidebar").classList.add("open"); document.getElementById("sidebar-scrim").classList.add("open"); });
  const scrim = document.getElementById("sidebar-scrim");
  if (scrim) scrim.addEventListener("click", closeSidebarMobile);
  const themeBtn = document.getElementById("btn-theme");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  const palBtn = document.getElementById("btn-palette");
  if (palBtn) palBtn.addEventListener("click", openPalette);
  const termBar = document.getElementById("terminal-bar");
  if (termBar) termBar.addEventListener("click", () => { state.terminalOpen = !state.terminalOpen; render(); });
  const termInput = document.getElementById("terminal-input");
  if (termInput) termInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.value.trim()) { runCommand(e.target.value.trim()); e.target.value = ""; } });

  const palOverlay = document.getElementById("palette-overlay");
  if (palOverlay) {
    palOverlay.addEventListener("click", (e) => { if (e.target === palOverlay) closePalette(); });
    const pInput = document.getElementById("palette-input");
    pInput.focus();
    pInput.addEventListener("input", () => {
      const q = pInput.value.toLowerCase();
      document.querySelectorAll("#palette-list .palette-item").forEach((it) => {
        it.style.display = it.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
    pInput.addEventListener("keydown", (e) => { if (e.key === "Escape") closePalette(); });
  }
}
function closeSidebarMobile() {
  state.sidebarOpen = false;
  const sb = document.getElementById("sidebar"), sc = document.getElementById("sidebar-scrim");
  if (sb) sb.classList.remove("open");
  if (sc) sc.classList.remove("open");
}
function openPalette() { state.paletteOpen = true; render(); }
function closePalette() { state.paletteOpen = false; render(); }

document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); state.paletteOpen ? closePalette() : openPalette(); }
  if (e.key === "Escape" && state.paletteOpen) closePalette();
});

/* ============================================================
   TERMINAL
   ============================================================ */
function termPrint(html, cls) {
  const out = document.getElementById("terminal-out");
  if (!out) return;
  const div = document.createElement("div");
  div.className = "line" + (cls ? " " + cls : "");
  div.innerHTML = html;
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}
function runCommand(raw) {
  if (!state.terminalOpen) { state.terminalOpen = true; }
  termPrintDeferredEcho(raw);
  const [cmd, ...rest] = raw.trim().split(/\s+/);
  const arg = rest.join(" ");
  switch (cmd.toLowerCase()) {
    case "help":
      termPrintDeferred(`commands: help, ls, open &lt;file&gt;, work, contact, about, whoami, theme, clear`);
      break;
    case "ls":
      termPrintDeferred(FILES.map((f) => (f.folder ? f.folder + "/" + f.name : f.name)).join("  "));
      break;
    case "whoami":
      termPrintDeferred(`ahmed — digital growth strategist &amp; systems builder. strategy + design + technology + execution.`);
      break;
    case "open": {
      const match = FILES.find((f) => f.name.toLowerCase().includes(arg.toLowerCase()) || f.id.includes(arg.toLowerCase()));
      if (match) { termPrintDeferred(`opening ${match.name}…`, "ok"); setTimeout(() => openFile(match.id), 250); }
      else termPrintDeferred(`no such file: ${arg}`, "err");
      break;
    }
    case "work": termPrintDeferred("opening work/index.tsx…", "ok"); setTimeout(() => openFile("work-index"), 250); break;
    case "samples": termPrintDeferred("opening samples/email-designs.tsx…", "ok"); setTimeout(() => openFile("email-designs"), 250); break;
    case "contact": termPrintDeferred("opening contact.sh…", "ok"); setTimeout(() => openFile("contact"), 250); break;
    case "about": termPrintDeferred("opening about.md…", "ok"); setTimeout(() => openFile("about"), 250); break;
    case "theme": toggleTheme(); termPrintDeferred("theme toggled."); break;
    case "clear": { const out = document.getElementById("terminal-out"); if (out) out.innerHTML = ""; break; }
    case "sudo": termPrintDeferred(`nice try. let's just talk instead → run: contact`, "err"); break;
    default: termPrintDeferred(`command not found: ${cmd} — type help`, "err");
  }
}
// re-render happens on openFile via hashchange, which would wipe terminal output;
// so we render terminal echo AFTER render() cycles settle using a microtask-safe helper.
function termPrintDeferredEcho(raw) {
  requestAnimationFrame(() => termPrint(escapeHtml(raw), "cmd"));
}
function termPrintDeferred(html, cls) {
  requestAnimationFrame(() => termPrint(html, cls));
}

/* ============================================================
   FILE CONTENT DISPATCH
   ============================================================ */
function renderFileContent(f) {
  switch (f.kind) {
    case "home": return contentHome();
    case "services": return contentServices();
    case "work-index": return contentWorkIndex();
    case "case-study": return contentCaseStudy(f.slug);
    case "sandbox": return contentSandbox();
    case "automation-flow": return contentAutomationFlow();
    case "email-designs": return contentEmailDesigns();
    case "ai-videos": return contentAiVideos();
    case "ui-ux-designs": return contentUiUxDesigns();
    case "n8n-automations": return contentN8nAutomations();
    case "process": return contentProcess();
    case "about": return contentAbout();
    case "resume": return contentResume();
    case "certificates": return contentCertificates();
    case "showreel": return contentShowreel();
    case "building": return contentBuilding();
    case "contact": return contentContact();
    default: return render404();
  }
}

function fileTag(path) { return `<p class="file-tag">// <span class="path">${path}</span></p>`; }
function nextLink(label, id) { return `<div class="next-link"><span></span><a data-open="${id}">next: ${label} ${icon("arrow")}</a></div>`; }

/* ---------- README.md (home) ---------- */
const HERO_PHRASES = ["Digital Growth Strategist.", "Systems Builder.", "AI & Automation.", "Website Developer.", "Brand Strategist."];
let heroTypeTimer = null;
function contentHome() {
  setTimeout(bindHeroType, 0);
  return `<div class="file-body">
    ${fileTag("README.md")}
    <div class="rv" style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
      <div class="avatar-wrap">
        <div class="avatar-ring"></div>
        <div class="avatar-photo"><img src="${window.__PORTRAIT__}" alt="Portrait of Murtala Ahmed Atobiloye"></div>
      </div>
      <div>
        <p class="eyebrow-mono"><span class="dot"></span>available for new projects &amp; opportunities · Kaduna, Nigeria</p>
        <h1 class="display" style="font-size:clamp(1.7rem,4.5vw,2.6rem); line-height:1.05; margin-top:10px;">Murtala Ahmed Atobiloye</h1>
      </div>
    </div>
    <p class="mono rv" style="color:var(--off-dim); font-size:0.92rem; margin-top:22px; letter-spacing:0.02em;">Digital Growth Strategist · Systems Builder · AI · Creative</p>
    <p class="rv type-line" style="font-size:clamp(1.3rem,3.4vw,1.7rem); margin-top:10px;"><span id="hero-type"></span><span class="type-cursor">&nbsp;</span></p>
    <p class="rv" style="color:var(--off-dim); margin-top:20px; max-width:520px; font-size:1rem; line-height:1.7;">
      I combine strategy, design, technology and AI to help businesses build stronger digital foundations, attract customers and create better ways of working.
    </p>
    <div class="rv" style="display:flex; flex-wrap:wrap; gap:12px; margin-top:28px;">
      <a data-open="work-index" class="btn primary">View my work ${icon("arrow")}</a>
      <a data-open="contact" class="btn">Let's build ${icon("arrow")}</a>
    </div>

    <div class="rv" style="display:flex; flex-wrap:wrap; gap:10px; margin-top:26px;">
      <a data-open="resume" class="social-btn"><span class="social-code">↓</span>Résumé (PDF)</a>
      ${SOCIALS.map((s) => `<a href="${s.href}" target="_blank" rel="noopener" class="social-btn"><span class="social-code">${s.code}</span>${s.label}</a>`).join("")}
    </div>

    <div class="rv" style="margin-top:64px; padding-top:32px; border-top:1px solid var(--line);">
      <h2 class="display" style="font-size:1.5rem; line-height:1.3;">Businesses don't need more digital noise.<br><span style="color:var(--blue);">They need systems that work.</span></h2>
      <p style="color:var(--grey); margin-top:18px; max-width:520px; font-size:0.96rem; line-height:1.75;">
        I don't begin by choosing a platform, a tool or a trend. I begin by understanding the business problem, identifying what's actually preventing progress, and then choosing the right combination of strategy, design, technology and execution to fix it.
      </p>
    </div>

    <div class="rv" style="margin-top:56px;">
      <p class="mono" style="font-size:0.72rem; color:var(--grey); letter-spacing:0.08em;">WHAT I BUILD</p>
      <div class="kv-grid">
        ${whatIBuild().map((c) => `<div class="kv-row"><div class="kv-key">${c.tag}</div><div class="kv-val" style="font-family:'Space Grotesk'; font-weight:600; font-size:1.05rem;">${c.title}</div><p style="color:var(--grey); font-size:0.9rem; margin-top:8px; max-width:440px;">${c.desc}</p><div class="chip-row">${c.caps.map((x) => `<span class="chip">${x}</span>`).join("")}</div></div>`).join("")}
      </div>
    </div>
    ${nextLink("services.json", "services")}
  </div>`;
}
function bindHeroType() {
  const el = document.getElementById("hero-type");
  if (!el) return;
  if (heroTypeTimer) { clearTimeout(heroTypeTimer); heroTypeTimer = null; }

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) { el.textContent = HERO_PHRASES[0]; return; }

  let phraseIdx = 0, charIdx = 0, deleting = false;
  function tick() {
    // stop cleanly if the user has navigated away and this node is gone
    if (!document.body.contains(el)) { heroTypeTimer = null; return; }
    const phrase = HERO_PHRASES[phraseIdx];
    charIdx += deleting ? -1 : 1;
    el.textContent = phrase.slice(0, charIdx);
    let delay = deleting ? 32 : 62;
    if (!deleting && charIdx === phrase.length) { delay = 1500; deleting = true; }
    else if (deleting && charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % HERO_PHRASES.length; delay = 250; }
    heroTypeTimer = setTimeout(tick, delay);
  }
  tick();
}

function whatIBuild() {
  return [
    { tag: "01 · digital-presence", title: "Digital Presence", desc: "Websites, landing pages, Google Business Profiles and SEO foundations designed to make businesses easier to discover, understand and trust.", caps: ["Website Design", "Landing Pages", "GBP", "SEO"] },
    { tag: "02 · customer-acquisition", title: "Customer Acquisition", desc: "Digital campaigns and conversion systems designed to turn attention into enquiries and customers.", caps: ["Google Ads", "Paid Advertising", "Lead Generation"] },
    { tag: "03 · digital-systems", title: "Digital Systems", desc: "Practical digital products and business systems designed around how a business actually operates.", caps: ["Dashboards", "Restaurant Systems", "E-commerce", "Workflows"] },
    { tag: "04 · ai-creative", title: "AI & Creative", desc: "AI-powered workflows and creative systems that help businesses produce, communicate and operate more efficiently.", caps: ["AI Automation", "AI Video", "Content Systems"] },
  ];
}

/* ---------- services.json ---------- */
function contentServices() {
  return `<div class="file-body">
    ${fileTag("services.json")}
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,3rem);">What I can help build.</h1>
    <p class="rv" style="color:var(--grey); margin-top:14px; max-width:480px;">The right tool depends on the problem you’re solving. This file contains the full list of available services.</p>
    <div class="svc-photo-grid">
      ${SERVICES.map((s, i) => `
        <div class="svc-photo-card" style="background-image:url('${s.image || serviceCoverSVG(s.title)}');">
          <div class="svc-photo-overlay"></div>
          <div class="svc-photo-content">
            <div class="svc-photo-idx">"service_${String(i + 1).padStart(2, "0")}" ${s.icon}</div>
            <div class="svc-photo-title">${s.title}</div>
            <p class="svc-photo-desc">${s.desc}</p>
          </div>
        </div>`).join("")}
    </div>
    <p class="rv" style="margin-top:36px; font-family:'Space Grotesk'; font-size:1.05rem;">"The right tool depends on the problem."</p>
    <div class="rv" style="margin-top:24px;"><a data-open="contact" class="btn primary">Start a conversation ${icon("arrow")}</a></div>
    ${nextLink("work/index.tsx", "work-index")}
  </div>`;
}

/* ---------- work/index.tsx ---------- */
function contentWorkIndex() {
  setTimeout(bindWorkIndex, 0);
  return `<div class="file-body">
    ${fileTag("work/index.tsx")}
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,3rem);">All work.</h1>
    <p class="rv" style="color:var(--grey); margin-top:14px; max-width:480px;">Explore projects across digital presence, growth, creative production and business systems.</p>
    <div class="rv" style="margin-top:28px; display:flex; flex-direction:column; gap:16px;">
      <input id="work-search" type="search" placeholder="Search projects..." aria-label="Search projects"
        style="max-width:300px; padding:10px 14px; border:1px solid var(--line-strong); border-radius:20px; background:var(--panel-2); font-family:'JetBrains Mono'; font-size:0.82rem;">
      <div class="filter-row" id="work-filters">
        ${CATEGORIES.map((c) => `<button class="fbtn ${c.id === "all" ? "active" : ""}" data-cat="${c.id}">${c.label}</button>`).join("")}
        <button class="fbtn" data-cat="shipping">Coming Soon</button>
      </div>
    </div>
    <div id="work-grid" style="margin-top:32px;"></div>
    <p id="work-empty" class="hidden mono" style="color:var(--grey); padding:20px 0;">No projects found.</p>
  </div>`;
}
function projectRow(p) {
  return `<a class="pcard" data-open="work-${p.slug}">
    <div class="pcard-top">
      <span style="font-family:'Space Grotesk'; font-weight:600; font-size:1.05rem;">${p.title}</span>
      <span class="tag ${statusClass(p.status)}"><span class="dot"></span>${statusLabel(p.status)}</span>
    </div>
    <p style="color:var(--grey); font-size:0.88rem; margin-top:8px; max-width:520px;">${p.shortDescription}</p>
    <div class="pcard-meta"><span>${p.client}</span><span>·</span><span>${categoryLabel(p.category)}</span><span>·</span><span>${p.year}</span></div>
  </a>`;
}
let workState = { filter: "all", query: "" };
function bindWorkIndex() {
  workState = { filter: "all", query: "" };
  renderWorkGrid();
  document.querySelectorAll("#work-filters .fbtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#work-filters .fbtn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      workState.filter = btn.dataset.cat;
      renderWorkGrid();
    });
  });
  const search = document.getElementById("work-search");
  if (search) search.addEventListener("input", (e) => { workState.query = e.target.value; renderWorkGrid(); });
  document.querySelectorAll("#work-grid [data-open]").forEach(bindOpenEl);
}
function bindOpenEl(el) {
  el.addEventListener("click", () => openFile(el.dataset.open));
}
function renderWorkGrid() {
  const grid = document.getElementById("work-grid");
  if (!grid) return;
  let list = getPublishedProjects();
  if (workState.filter === "shipping") list = list.filter((p) => p.status === "coming-soon" || p.status === "in-progress");
  else if (workState.filter !== "all") list = list.filter((p) => p.categories.includes(workState.filter));
  if (workState.query.trim()) {
    const q = workState.query.trim().toLowerCase();
    list = list.filter((p) => [p.title, p.client, p.category, p.industry, ...(p.services || [])].filter(Boolean).join(" ").toLowerCase().includes(q));
  }
  grid.innerHTML = list.map(projectRow).join("");
  document.getElementById("work-empty").classList.toggle("hidden", list.length > 0);
  grid.querySelectorAll("[data-open]").forEach(bindOpenEl);
}

/* ---------- work/<slug>.tsx ---------- */
function contentCaseStudy(slug) {
  const p = getProjectBySlug(slug);
  if (!p) return render404();
  const next = getNextProject(slug);
  return `<div class="file-body">
    ${fileTag("work/" + p.slug + ".tsx")}
    <div class="rv" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
      <span class="tag ${statusClass(p.status)}"><span class="dot"></span>${statusLabel(p.status)}</span>
      <span class="mono" style="font-size:0.76rem; color:var(--grey);">${categoryLabel(p.category)}</span>
    </div>
    <h1 class="display rv" style="font-size:clamp(2rem,5.5vw,3.4rem); margin-top:16px;">${p.title}</h1>
    <p class="rv" style="color:var(--off-dim); margin-top:14px; max-width:560px; font-size:1.02rem;">${p.seoDescription}</p>

    <div class="rv kv-grid two-col" style="margin-top:28px;">
      ${metaCell("client", p.client)}${metaCell("year", p.year)}
      ${metaCell("role", (p.role || []).join(", ") || "—")}${metaCell("status", statusLabel(p.status))}
    </div>

    <div class="rv hero-frame" style="margin-top:32px; aspect-ratio:16/8;"><img src="${p.gallery && p.gallery.length ? p.gallery[0].image : coverSVG(p, true)}" alt="${escapeHtml((p.gallery && p.gallery[0] && p.gallery[0].caption) || p.title + " cover")}" loading="lazy" style="width:100%; height:100%; object-fit:cover;"></div>

    <div class="rv" style="margin-top:44px;">${caseBlock("the-business", "The Business", p.business)}</div>
    <div class="rv" style="margin-top:36px;">${caseBlock("the-challenge", "The Challenge", p.challenge)}</div>
    <div class="rv" style="margin-top:36px;">${caseBlock("the-approach", "The Approach", p.approach)}</div>

    ${p.deliverables && p.deliverables.length ? `
    <div class="rv" style="margin-top:48px;">
      <p class="mono" style="font-size:0.72rem; color:var(--grey);">// what-i-built</p>
      <div class="kv-grid" style="margin-top:12px;">
        ${p.deliverables.map((d) => `<div class="kv-row"><div style="font-family:'Space Grotesk'; font-weight:600;">${d.title}</div><p style="color:var(--grey); font-size:0.88rem; margin-top:6px;">${d.desc}</p>${d.url ? `<a href="${d.url}" target="_blank" rel="noopener" class="mono" style="color:var(--blue); font-size:0.8rem; display:inline-block; margin-top:10px;">view live →</a>` : ""}</div>`).join("")}
      </div>
    </div>` : ""}

    ${p.gallery && p.gallery.length > 1 ? `<div class="rv" style="margin-top:48px;">${galleryGrid(p.gallery.slice(1))}</div>` : ""}

    <div class="rv" style="margin-top:48px;">
      <p class="mono" style="font-size:0.72rem; color:var(--grey);">// current-status</p>
      <p style="font-family:'Space Grotesk'; font-size:1.15rem; margin-top:10px; max-width:560px;">${p.results}</p>
    </div>

    ${p.technologies && p.technologies.length ? `<div class="rv chip-row" style="margin-top:20px;">${p.technologies.map((t) => `<span class="chip">${t}</span>`).join("")}</div>` : ""}

    ${p.testimonial ? `<div class="rv" style="margin-top:44px; padding:24px; border-left:2px solid var(--blue);"><p style="font-family:'Space Grotesk'; font-size:1.15rem;">"${p.testimonial}"</p><p class="mono" style="color:var(--grey); font-size:0.78rem; margin-top:10px;">${p.testimonialAuthor || ""}</p></div>` : ""}

    ${p.liveUrl ? `<div class="rv" style="margin-top:36px;"><a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn primary">Visit live site ${icon("arrow")}</a></div>` : ""}

    ${nextLink(next.slug + ".tsx", "work-" + next.slug)}
  </div>`;
}
function metaCell(key, val) { return `<div class="kv-row"><div class="kv-key">${key}</div><div class="kv-val mono" style="font-size:0.92rem;">${escapeHtml(val)}</div></div>`; }
function caseBlock(id, title, body) { return `<p class="mono" style="font-size:0.72rem; color:var(--blue);">// ${id}</p><h3 class="display" style="font-size:1.1rem; margin-top:8px;">${title}</h3><p style="color:var(--off-dim); margin-top:10px; max-width:520px; font-size:0.96rem; line-height:1.75;">${body}</p>`; }
/* Small decorative "analytics" bar chart — deterministic per seed so each
   service card gets a visually distinct pattern. Illustrative only (no
   labeled numbers), never presented as real performance data. */
function miniChart(seed, bars = 7) {
  let s = seed * 97 + 13;
  const rand = () => { s = (s * 1103515245 + 12345) % 2147483648; return (s / 2147483648); };
  const heights = Array.from({ length: bars }, () => 8 + Math.floor(rand() * 26));
  return `<div class="svc-chart" aria-hidden="true">
    ${heights.map((h, i) => `<span style="height:${h}px; animation-delay:${i * 60}ms;"></span>`).join("")}
  </div>`;
}

function galleryGrid(items) {
  if (!items || !items.length) return "";
  return `
    <p class="mono" style="font-size:0.72rem; color:var(--blue);">// visual-showcase</p>
    <div class="polaroid-grid">
      ${items.map((g) => `
        <div class="polaroid">
          <img src="${g.image}" alt="${escapeHtml(g.caption || "Project screenshot")}" loading="lazy">
          ${g.caption ? `<div class="polaroid-caption">${g.caption}</div>` : ""}
        </div>`).join("")}
    </div>`;
}

/* ---------- sandbox/icehub-live.tsx — real interactive demo ---------- */
const MENU = [
  { id: "jollof", name: "Jollof Rice + Chicken", price: 3500 },
  { id: "shakes", name: "Chocolate Milkshake", price: 2000 },
  { id: "icecream", name: "Vanilla Ice Cream Cup", price: 1500 },
];
let sandboxState = { queue: [], fulfilled: [], nextId: 1 };
function contentSandbox() {
  setTimeout(bindSandbox, 0);
  return `<div class="file-body">
    ${fileTag("sandbox/icehub-live.tsx")}
    <p class="eyebrow-mono rv"><span class="dot"></span>interactive · not a screenshot</p>
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,2.9rem); margin-top:16px;">Try Ice Hub 360 yourself.</h1>
    <p class="rv" style="color:var(--grey); margin-top:12px; max-width:520px;">This is a simplified, live re-creation of the actual order flow: place an order as a customer, watch it land on the kitchen display, mark it fulfilled, and see the owner dashboard update in real time.</p>

    <div class="rv" style="display:grid; grid-template-columns:1fr; gap:20px; margin-top:36px;" id="sandbox-grid">
      <div class="device">
        <div class="device-bar"><span></span><span></span><span></span><span class="mono" style="margin-left:8px; font-size:0.7rem; color:var(--grey);">customer-menu</span></div>
        <div class="device-screen">
          <select id="sb-item" style="width:100%; padding:10px; border:1px solid var(--line-strong); border-radius:4px; background:var(--panel-2); font-size:0.9rem;">
            ${MENU.map((m) => `<option value="${m.id}">${m.name} — ₦${m.price.toLocaleString()}</option>`).join("")}
          </select>
          <button id="sb-send" class="btn primary" style="margin-top:14px; width:100%; justify-content:center;">Send order to kitchen ${icon("arrow")}</button>
        </div>
      </div>
      <div class="device">
        <div class="device-bar"><span></span><span></span><span></span><span class="mono" style="margin-left:8px; font-size:0.7rem; color:var(--grey);">kitchen-display</span></div>
        <div class="device-screen" id="sb-kitchen"><p class="mono" style="color:var(--grey); font-size:0.82rem;">no orders yet, send one from the customer menu.</p></div>
      </div>
      <div class="device">
        <div class="device-bar"><span></span><span></span><span></span><span class="mono" style="margin-left:8px; font-size:0.7rem; color:var(--grey);">owner-dashboard</span></div>
        <div class="device-screen" id="sb-owner" style="display:flex; gap:24px;"></div>
      </div>
    </div>
    ${nextLink("ice-hub-360.tsx (full case study)", "work-ice-hub-360")}
  </div>
  <style>@media(min-width:900px){#sandbox-grid{grid-template-columns:1fr 1fr 1fr !important;}}</style>`;
}
function bindSandbox() {
  sandboxState = { queue: [], fulfilled: [], nextId: 1 };
  renderSandbox();
  const btn = document.getElementById("sb-send");
  if (btn) btn.addEventListener("click", () => {
    const sel = document.getElementById("sb-item");
    const item = MENU.find((m) => m.id === sel.value);
    sandboxState.queue.push({ id: sandboxState.nextId++, item });
    renderSandbox();
  });
}
function renderSandbox() {
  const k = document.getElementById("sb-kitchen"), o = document.getElementById("sb-owner");
  if (!k || !o) return;
  k.innerHTML = sandboxState.queue.length
    ? sandboxState.queue.map((o2) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--line);">
        <span style="font-size:0.85rem;">#${o2.id} — ${o2.item.name}</span>
        <button class="btn" data-fulfil="${o2.id}" style="padding:5px 10px; font-size:0.72rem;">mark fulfilled</button>
      </div>`).join("")
    : `<p class="mono" style="color:var(--grey); font-size:0.82rem;">no orders yet, send one from the customer menu.</p>`;
  const revenue = sandboxState.fulfilled.reduce((s, o2) => s + o2.item.price, 0);
  o.innerHTML = `
    <div><div class="kv-key">orders fulfilled</div><div class="mono" style="font-size:1.4rem;">${sandboxState.fulfilled.length}</div></div>
    <div><div class="kv-key">revenue (session)</div><div class="mono" style="font-size:1.4rem;">₦${revenue.toLocaleString()}</div></div>
    <div><div class="kv-key">in queue</div><div class="mono" style="font-size:1.4rem;">${sandboxState.queue.length}</div></div>
  `;
  k.querySelectorAll("[data-fulfil]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = +btn.dataset.fulfil;
      const idx = sandboxState.queue.findIndex((q) => q.id === id);
      if (idx > -1) { sandboxState.fulfilled.push(sandboxState.queue[idx]); sandboxState.queue.splice(idx, 1); renderSandbox(); }
    });
  });
}

/* ---------- sandbox/automation-flow.tsx — n8n-style workflow demo ---------- */
const FLOW_STEPS = [
  { id: "trigger", label: "New Lead Form", sub: "trigger" },
  { id: "score", label: "Enrich & Score", sub: "function" },
  { id: "crm", label: "Add to CRM", sub: "action" },
  { id: "whatsapp", label: "WhatsApp Follow-up", sub: "action" },
];
let flowState = { runs: 0, running: false };
function contentAutomationFlow() {
  setTimeout(bindAutomationFlow, 0);
  return `<div class="file-body">
    ${fileTag("sandbox/automation-flow.tsx")}
    <p class="eyebrow-mono rv"><span class="dot"></span>interactive · simplified workflow illustration</p>
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,2.9rem); margin-top:16px;">Watch an automation run.</h1>
    <p class="rv" style="color:var(--grey); margin-top:12px; max-width:520px;">A simplified illustration of an n8n-style workflow: a new lead moving from form submission to a CRM entry and a WhatsApp follow-up. Click run to see it move.</p>

    <div class="rv" style="margin-top:36px;">
      <div id="flow-nodes" style="display:flex; flex-wrap:wrap; align-items:center; gap:10px;">${flowNodesHTML()}</div>
      <div style="display:flex; align-items:center; gap:14px; margin-top:28px; flex-wrap:wrap;">
        <button id="flow-run" class="btn primary">Run workflow ${icon("arrow")}</button>
        <span class="mono" style="color:var(--grey); font-size:0.8rem;">runs completed: <span id="flow-count">${flowState.runs}</span></span>
      </div>
      <div class="device" style="margin-top:22px; max-width:520px;">
        <div class="device-bar"><span></span><span></span><span></span><span class="mono" style="margin-left:8px; font-size:0.7rem; color:var(--grey);">execution log</span></div>
        <div class="device-screen mono" id="flow-log" style="font-size:0.78rem; color:var(--grey); min-height:120px; white-space:pre-wrap;">ready - click "run workflow" above.</div>
      </div>
    </div>
    ${nextLink("n8n-automations.tsx", "n8n-automations")}
  </div>`;
}
function flowNodesHTML() {
  return FLOW_STEPS.map((s, i) => `
    ${i > 0 ? `<span class="mono" style="color:var(--line-strong);">→</span>` : ""}
    <div class="flow-node" id="flow-node-${s.id}" style="border:1px solid var(--line-strong); border-radius:var(--radius); padding:14px 16px; min-width:130px; transition:border-color .2s ease, box-shadow .2s ease;">
      <div class="mono" style="font-size:0.68rem; color:var(--grey);">${s.sub}</div>
      <div style="font-family:'Space Grotesk'; font-weight:600; font-size:0.9rem; margin-top:4px;">${s.label}</div>
    </div>`).join("");
}
function bindAutomationFlow() {
  const btn = document.getElementById("flow-run");
  if (!btn) return;
  btn.addEventListener("click", runAutomationFlow);
}
function runAutomationFlow() {
  if (flowState.running) return;
  flowState.running = true;
  const btn = document.getElementById("flow-run");
  const log = document.getElementById("flow-log");
  if (!log) { flowState.running = false; return; }
  if (btn) btn.setAttribute("disabled", "true");
  log.textContent = "";
  FLOW_STEPS.forEach((s) => { const el = document.getElementById("flow-node-" + s.id); if (el) { el.style.borderColor = "var(--line-strong)"; el.style.boxShadow = "none"; } });
  let i = 0;
  function step() {
    if (i > 0) {
      const prev = document.getElementById("flow-node-" + FLOW_STEPS[i - 1].id);
      if (prev) { prev.style.borderColor = "var(--green)"; prev.style.boxShadow = "none"; }
    }
    if (i >= FLOW_STEPS.length) {
      flowState.runs++;
      const countEl = document.getElementById("flow-count");
      if (countEl) countEl.textContent = flowState.runs;
      log.textContent += "\n✓ workflow complete.";
      flowState.running = false;
      if (btn) btn.removeAttribute("disabled");
      return;
    }
    const s = FLOW_STEPS[i];
    const el = document.getElementById("flow-node-" + s.id);
    if (el) { el.style.borderColor = "var(--blue)"; el.style.boxShadow = "0 0 0 3px rgba(76,124,255,0.15)"; }
    log.textContent += (log.textContent ? "\n" : "") + "→ running: " + s.label + "...";
    i++;
    setTimeout(step, 550);
  }
  step();
}

/* ---------- samples/email-designs.tsx ---------- */
function contentEmailDesigns() {
  const items = EMAIL_DESIGNS;
  return `<div class="file-body">
    ${fileTag("samples/email-designs.tsx")}
    <p class="eyebrow-mono rv"><span class="dot"></span>craft sample · email design</p>
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,2.8rem); margin-top:16px;">Email designs.</h1>
    <p class="rv" style="color:var(--grey); margin-top:12px; max-width:500px;">Actual designed emails, not templates, built to look intentional and on-brand.</p>
    ${items.length ? `
    <div class="rv" style="display:grid; grid-template-columns:1fr; gap:20px; margin-top:32px;" id="email-grid">
      ${items.map((it) => `
        <div class="pcard" style="padding:0; overflow:hidden;">
          ${it.image ? `<img src="${it.image}" alt="${escapeHtml(it.title)}" loading="lazy" style="width:100%; display:block; border-bottom:1px solid var(--line);">` : ""}
          <div style="padding:18px 22px;">
            <div style="font-family:'Space Grotesk'; font-weight:600;">${it.title}</div>
            ${it.context ? `<p style="color:var(--grey); font-size:0.88rem; margin-top:6px;">${it.context}</p>` : ""}
          </div>
        </div>`).join("")}
    </div>` : `
    <div class="rv" style="margin-top:28px; border:1px dashed var(--line-strong); border-radius:var(--radius); padding:28px; color:var(--grey);">
      <p class="mono" style="font-size:0.8rem;">// awaiting upload</p>
      <p style="margin-top:10px; font-size:0.95rem; max-width:480px;"></p>
    </div>`}
    ${nextLink("ai-generated-videos.tsx", "ai-videos")}
  </div>`;
}

/* ---------- samples/ai-generated-videos.tsx ---------- */
function contentAiVideos() {
  const items = AI_VIDEO_SAMPLES;
  return `<div class="file-body">
    ${fileTag("samples/ai-generated-videos.tsx")}
    <p class="eyebrow-mono rv"><span class="dot"></span>craft sample · AI video</p>
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,2.8rem); margin-top:16px;">AI-generated videos.</h1>
    <p class="rv" style="color:var(--grey); margin-top:12px; max-width:500px;">AI-produced video content built for real businesses: ads, product explainers and social content.</p>
    ${items.length ? `
    <div class="rv" style="display:flex; flex-wrap:wrap; gap:24px; margin-top:32px;">
      ${items.map((it) => `
        <div class="device" style="width:220px;">
          <div class="device-bar"><span></span><span></span><span></span><span class="mono" style="margin-left:8px; font-size:0.68rem; color:var(--grey); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${it.title}</span></div>
          <div class="device-screen" style="padding:0; min-height:0; background:#000;">
            ${it.videoUrl ? `<video src="${it.videoUrl}" controls playsinline preload="metadata" style="width:100%; max-height:60vh; display:block; background:#000;" poster="${it.thumb || ""}"></video>` : `<div style="padding:40px; text-align:center; color:var(--grey);">no source yet</div>`}
          </div>
          ${it.context ? `<p style="color:var(--grey); font-size:0.8rem; padding:10px 12px;">${it.context}</p>` : ""}
        </div>`).join("")}
    </div>` : `
    <div class="rv" style="margin-top:28px; border:1px dashed var(--line-strong); border-radius:var(--radius); padding:28px; color:var(--grey);">
      <p class="mono" style="font-size:0.8rem;">// awaiting upload</p>
      <p style="margin-top:10px; font-size:0.95rem; max-width:480px;"></p>
    </div>`}
    ${nextLink("ui-ux-designs.tsx", "ui-ux-designs")}
  </div>`;
}

/* ---------- samples/ui-ux-designs.tsx ---------- */
function contentUiUxDesigns() {
  const items = UI_UX_DESIGNS;
  return `<div class="file-body">
    ${fileTag("samples/ui-ux-designs.tsx")}
    <p class="eyebrow-mono rv"><span class="dot"></span>craft sample · UI/UX</p>
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,2.8rem); margin-top:16px;">UI/UX design.</h1>
    <p class="rv" style="color:var(--grey); margin-top:12px; max-width:500px;">Interface and product design work: screens, flows and systems designed around how people actually use them.</p>
    ${items.length ? `
    <div class="rv" style="display:grid; grid-template-columns:1fr; gap:20px; margin-top:32px;">
      ${items.map((it) => `
        <div class="pcard" style="padding:0; overflow:hidden;">
          ${it.image ? `<img src="${it.image}" alt="${escapeHtml(it.title)}" loading="lazy" style="width:100%; display:block; border-bottom:1px solid var(--line);">` : ""}
          <div style="padding:18px 22px;">
            <div style="font-family:'Space Grotesk'; font-weight:600;">${it.title}</div>
            ${it.context ? `<p style="color:var(--grey); font-size:0.88rem; margin-top:6px;">${it.context}</p>` : ""}
            ${it.url ? `<a href="${it.url}" target="_blank" rel="noopener" class="mono" style="color:var(--blue); font-size:0.8rem; display:inline-block; margin-top:10px;">view →</a>` : ""}
          </div>
        </div>`).join("")}
    </div>` : `
    <div class="rv" style="margin-top:28px; border:1px dashed var(--line-strong); border-radius:var(--radius); padding:28px; color:var(--grey);">
      <p class="mono" style="font-size:0.8rem;">// awaiting upload</p>
      <p style="margin-top:10px; font-size:0.95rem; max-width:480px;"></p>
    </div>`}
    ${nextLink("n8n-automations.tsx", "n8n-automations")}
  </div>`;
}

/* ---------- samples/n8n-automations.tsx ---------- */
function contentN8nAutomations() {
  const items = N8N_AUTOMATIONS;
  return `<div class="file-body">
    ${fileTag("samples/n8n-automations.tsx")}
    <p class="eyebrow-mono rv"><span class="dot"></span>craft sample · automation</p>
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,2.8rem); margin-top:16px;">n8n & automation.</h1>
    <p class="rv" style="color:var(--grey); margin-top:12px; max-width:500px;">Real workflow automations: the systems running quietly behind the scenes so leads and orders don't fall through the cracks.</p>
    ${items.length ? `
    <div class="rv" style="display:grid; grid-template-columns:1fr; gap:20px; margin-top:32px;">
      ${items.map((it) => `
        <div class="pcard" style="padding:0; overflow:hidden;">
          ${it.image ? `<img src="${it.image}" alt="${escapeHtml(it.title)}" loading="lazy" style="width:100%; display:block; border-bottom:1px solid var(--line);">` : ""}
          <div style="padding:18px 22px;">
            <div style="font-family:'Space Grotesk'; font-weight:600;">${it.title}</div>
            ${it.context ? `<p style="color:var(--grey); font-size:0.88rem; margin-top:6px;">${it.context}</p>` : ""}
            ${it.url ? `<a href="${it.url}" target="_blank" rel="noopener" class="mono" style="color:var(--blue); font-size:0.8rem; display:inline-block; margin-top:10px;">view →</a>` : ""}
          </div>
        </div>`).join("")}
    </div>` : `
    <div class="rv" style="margin-top:28px; border:1px dashed var(--line-strong); border-radius:var(--radius); padding:28px; color:var(--grey);">
      <p class="mono" style="font-size:0.8rem;">// awaiting upload</p>
      <p style="margin-top:10px; font-size:0.95rem; max-width:480px;">In the meantime, try the live demo at <a data-open="automation-flow" style="color:var(--blue);">sandbox/automation-flow.tsx</a>.</p>
    </div>`}
    ${nextLink("process.log", "process")}
  </div>`;
}
function contentProcess() {
  const stages = [
    ["09:14:02", "UNDERSTAND", "What is happening?", "Look at the business as it actually operates today, the workflow, the customers, the bottlenecks, before proposing anything."],
    ["09:41:37", "DEFINE", "What needs to change?", "Turn the observations into a clear, specific problem statement rather than a vague goal."],
    ["10:08:15", "STRATEGIZE", "What solution makes sense?", "Choose the right combination of strategy, design, technology and execution, not the trendiest one."],
    ["11:22:50", "BUILD", "Design and implementation.", "Design and build the actual solution, whether that's a website, a system, or a campaign."],
    ["14:03:09", "LAUNCH", "Put it into the real world.", "Ship it to real customers and real usage, not just a demo environment."],
    ["16:47:31", "OPTIMIZE", "Measure and improve.", "Watch how it performs and refine it based on what's actually happening."],
  ];
  return `<div class="file-body">
    ${fileTag("process.log")}
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,3rem);">I don't start with the tool.</h1>
    <h2 class="display rv" style="font-size:clamp(1.9rem,5vw,3rem); color:var(--blue);">I start with the problem.</h2>
    <div style="margin-top:40px;">
      ${stages.map(([ts, tag, sub, body]) => `
        <div class="log-row rv">
          <div class="log-ts">[${ts}] <span style="color:var(--blue);">${tag}</span> — ${sub}</div>
          <p style="color:var(--grey); font-size:0.92rem; max-width:480px;">${body}</p>
        </div>`).join("")}
    </div>
    ${nextLink("about.md", "about")}
  </div>`;
}

/* ---------- about.md ---------- */
function contentAbout() {
  return `<div class="file-body">
    ${fileTag("about.md")}
    <div class="rv" style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
      <div class="avatar-wrap">
        <div class="avatar-ring"></div>
        <div class="avatar-photo"><img src="${window.__PORTRAIT__}" alt="Portrait of Murtala Ahmed Atobiloye"></div>
      </div>
      <div>
        <p class="eyebrow-mono"><span class="dot"></span>Kaduna, Nigeria</p>
        <h1 class="display" style="font-size:clamp(1.6rem,4.2vw,2.4rem); line-height:1.05; margin-top:10px;">Murtala Ahmed Atobiloye</h1>
        <p class="mono" style="color:var(--off-dim); font-size:0.85rem; margin-top:8px;">Digital Growth Strategist · Systems Builder · AI · Creative</p>
      </div>
    </div>

    <h2 class="display rv" style="font-size:clamp(1.6rem,4.5vw,2.4rem); margin-top:40px;">I like building things that actually work.</h2>
    <p class="rv" style="color:var(--off-dim); margin-top:20px; max-width:520px; font-size:1.02rem; line-height:1.75;">
      I'm Murtala Ahmed Atobiloye, a digital growth strategist and systems builder. I combine business thinking, design, technology, AI and digital marketing to create practical solutions for businesses.
    </p>
    <div class="rv chip-row" style="margin-top:24px;">${["Strategy", "Design", "Technology", "Execution"].map((c) => `<span class="chip">${c}</span>`).join("")}</div>
    <p class="rv" style="color:var(--off-dim); margin-top:28px; max-width:520px; font-size:0.98rem; line-height:1.75;">
      Most of my work sits at the intersection of business strategy and technical execution, figuring out what's actually stopping a business from growing, then building the specific mix of website, system, campaign or AI workflow that solves it.
    </p>

    <div class="rv" style="display:flex; flex-wrap:wrap; gap:10px; margin-top:32px;">
      <a data-open="resume" class="social-btn"><span class="social-code">↓</span>Résumé (PDF)</a>
      ${SOCIALS.map((s) => `<a href="${s.href}" target="_blank" rel="noopener" class="social-btn"><span class="social-code">${s.code}</span>${s.label}</a>`).join("")}
    </div>
    ${nextLink("resume.pdf", "resume")}
  </div>`;
}

/* ---------- resume.pdf ---------- */
function contentResume() {
  return `<div class="file-body">
    ${fileTag("resume.pdf")}
    <h1 class="display rv" style="font-size:clamp(1.7rem,4.5vw,2.4rem);">Résumé</h1>
    <div class="rv" style="margin-top:20px; display:flex; flex-wrap:wrap; gap:12px;">
      <a href="${RESUME_PDF_URL}" download="Ahmed_Atobiloye_CV.pdf" class="btn primary">Download résumé (PDF) ${icon("arrow")}</a>
      <a href="${RESUME_PDF_URL}" target="_blank" rel="noopener" class="btn">Open in new tab ${icon("arrow")}</a>
    </div>
    <div class="rv" style="margin-top:40px; max-width:640px;">
      <h2 class="display" style="font-size:1.3rem;">Murtala Ahmed Atobiloye</h2>
      <p class="mono" style="color:var(--blue); font-size:0.85rem; margin-top:4px;">Digital Growth Strategist &amp; Systems Builder · Founder, Mr Ahmed Growth Solutions</p>
      <p class="mono" style="color:var(--grey); font-size:0.78rem; margin-top:8px;">Kaduna, Nigeria · +234 803 862 2085 · mrahmedgrowthsolutions@gmail.com</p>

      <p class="mono" style="font-size:0.72rem; color:var(--blue); margin-top:28px;">// summary</p>
      <p style="color:var(--off-dim); margin-top:8px; font-size:0.94rem; line-height:1.75;">
        Digital growth strategist and systems builder who combines business strategy, design, technology and AI to help businesses build stronger digital foundations, attract customers and operate more efficiently. Founder of Mr Ahmed Growth Solutions, delivering websites, digital systems, growth campaigns and AI-assisted creative work for businesses across Nigeria. Brings over seven years of prior experience managing high-value client relationships and confidential information in commercial banking.
      </p>

      <p class="mono" style="font-size:0.72rem; color:var(--blue); margin-top:28px;">// core-capabilities</p>
      <div class="chip-row" style="margin-top:10px;">
        ${["Growth Strategy", "Local SEO & GBP", "Website Development", "Paid Advertising", "CRM & Automation", "WhatsApp Marketing", "Digital Marketing", "Lead Generation", "Branding & Positioning", "AI Video Creation", "Video Editing", "Email Marketing & Design"].map((c) => `<span class="chip">${c}</span>`).join("")}
      </div>

      <p class="mono" style="font-size:0.72rem; color:var(--blue); margin-top:28px;">// professional-experience</p>
      <div style="margin-top:10px;">
        <div style="font-family:'Space Grotesk'; font-weight:600;">Relationship Manager: SME/Commercial Banking</div>
        <div class="mono" style="color:var(--grey); font-size:0.78rem; margin-top:2px;">Sterling Bank Plc · Feb 2023 – Nov 2025</div>
        <p style="color:var(--grey); font-size:0.88rem; margin-top:8px;">Managed a portfolio of business owners and senior stakeholders worth approximately ₦1 billion; handled confidential information under KYC/AML compliance; achieved 70–120% of assigned targets.</p>
      </div>
      <div style="margin-top:22px;">
        <div style="font-family:'Space Grotesk'; font-weight:600;">Relationship Manager (Banking Assignment)</div>
        <div class="mono" style="color:var(--grey); font-size:0.78rem; margin-top:2px;">Workforce Group, assigned to Sterling Bank Plc · Apr 2017 – Feb 2023</div>
      </div>

      <p class="mono" style="font-size:0.72rem; color:var(--blue); margin-top:28px;">// education</p>
      <p style="color:var(--off-dim); margin-top:8px; font-size:0.92rem;">B.Sc. Biochemistry — Ahmadu Bello University, Zaria</p>

      <p style="color:var(--grey); font-size:0.82rem; margin-top:28px;">Full project history, systems &amp; tools, and references are in the downloadable PDF above.</p>
    </div>
    <p class="rv" style="color:var(--grey); font-size:0.82rem; margin-top:28px; max-width:480px;"></p>
    ${nextLink("certificates.md", "certificates")}
  </div>`;
}

/* ---------- certificates.md ---------- */
function contentCertificates() {
  const items = CERTIFICATES;
  return `<div class="file-body">
    ${fileTag("certificates.md")}
    <h1 class="display rv" style="font-size:clamp(1.7rem,4.5vw,2.4rem);">Certificates</h1>
    ${items.length ? `
    <div class="rv" style="display:grid; grid-template-columns:1fr; gap:16px; margin-top:28px;" id="cert-grid">
      ${items.map((c) => `
        <div class="pcard" style="padding:0; overflow:hidden; display:flex; gap:0;">
          ${c.image ? `<img src="${c.image}" alt="${escapeHtml(c.title)}" loading="lazy" style="width:120px; height:120px; object-fit:cover; flex-shrink:0;">` : ""}
          <div style="padding:16px 20px;">
            <div style="font-family:'Space Grotesk'; font-weight:600;">${c.title}</div>
            <div class="mono" style="color:var(--grey); font-size:0.76rem; margin-top:4px;">${[c.issuer, c.date].filter(Boolean).join(" · ")}</div>
            ${c.url ? `<a href="${c.url}" target="_blank" rel="noopener" class="mono" style="color:var(--blue); font-size:0.8rem; display:inline-block; margin-top:8px;">view credential →</a>` : ""}
          </div>
        </div>`).join("")}
    </div>` : `
    <div class="rv" style="margin-top:24px; border:1px dashed var(--line-strong); border-radius:var(--radius); padding:28px; color:var(--grey);">
      <p class="mono" style="font-size:0.8rem;">// awaiting upload</p>
      <p style="margin-top:10px; font-size:0.95rem; max-width:480px;"></p>
    </div>`}
    ${nextLink("showreel.mp4", "showreel")}
  </div>`;
}

/* ---------- showreel.mp4 ---------- */
function contentShowreel() {
  const items = SHOWREEL_VIDEOS;
  return `<div class="file-body">
    ${fileTag("showreel.mp4")}
    <p class="eyebrow-mono rv"><span class="dot"></span>brand & systems reel</p>
    <h1 class="display rv" style="font-size:clamp(1.7rem,4.5vw,2.4rem); margin-top:14px;">Showreel</h1>
    ${items.length ? `
    <div class="rv" style="display:flex; flex-wrap:wrap; gap:24px; margin-top:28px;">
      ${items.map((it) => `
        <div class="device" style="width:280px;">
          <div class="device-bar"><span></span><span></span><span></span><span class="mono" style="margin-left:8px; font-size:0.68rem; color:var(--grey); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${it.title}</span></div>
          <div class="device-screen" style="padding:0; min-height:0; background:#000;">
            <video src="${it.videoUrl}" controls playsinline preload="metadata" style="width:100%; max-height:60vh; display:block; background:#000;"></video>
          </div>
          ${it.context ? `<p style="color:var(--grey); font-size:0.82rem; padding:12px 14px;">${it.context}</p>` : ""}
        </div>`).join("")}
    </div>` : `
    <div class="rv device" style="margin-top:24px; max-width:520px;">
      <div class="device-bar"><span></span><span></span><span></span></div>
      <div class="device-screen" style="display:flex; align-items:center; justify-content:center; min-height:200px; color:var(--grey);">
        <p class="mono" style="font-size:0.82rem; text-align:center;">// awaiting video file<br>upload an mp4 and it plays right here.</p>
      </div>
    </div>`}
    <p class="rv" style="color:var(--grey); font-size:0.82rem; margin-top:24px; max-width:480px;"></p>
    ${nextLink("building.md", "building")}
  </div>`;
}

/* ---------- building.md ---------- */
function contentBuilding() {
  const areas = [
    ["Google Ads", "Testing campaign structures and conversion tracking for lead-generation clients."],
    ["AI Automation", "Building workflows that remove repetitive work from client operations."],
    ["AI Creative Production", "Exploring AI-assisted video and content production for business use cases."],
    ["SME Digital Systems", "Designing lightweight business systems for small and mid-sized businesses."],
  ];
  return `<div class="file-body">
    ${fileTag("building.md")}
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,3rem);">Currently building.</h1>
    <p class="rv" style="color:var(--grey); margin-top:14px; max-width:480px;">I'm documenting what I'm learning, testing and building.</p>
    <div class="kv-grid two-col rv" style="margin-top:32px;">
      ${areas.map(([t, d]) => `<div class="kv-row"><div style="font-family:'Space Grotesk'; font-weight:600;">${t}</div><p style="color:var(--grey); font-size:0.88rem; margin-top:8px;">${d}</p></div>`).join("")}
    </div>
    ${nextLink("contact.sh", "contact")}
  </div>`;
}

/* ---------- contact.sh ---------- */
function contentContact() {
  return `<div class="file-body">
    ${fileTag("contact.sh")}
    <p class="mono rv" style="color:var(--grey); font-size:0.82rem;">#!/bin/sh</p>
    <h1 class="display rv" style="font-size:clamp(1.9rem,5vw,2.8rem); margin-top:14px;">Have a business problem?</h1>
    <h2 class="display rv" style="font-size:clamp(1.9rem,5vw,2.8rem); color:var(--blue);">Let's build the solution.</h2>
    <p class="rv" style="color:var(--grey); margin-top:20px; max-width:500px; font-size:0.96rem;">Tell me what you’re trying to achieve, what’s getting in the way, and where you want to go. We’ll turn the challenge into a clear, practical solution..</p>

    <form id="contact-form" class="rv" style="margin-top:32px; max-width:520px;" novalidate>
      <div class="field"><label for="c-name">name</label><input id="c-name" name="name" required></div>
      <div class="field"><label for="c-email">email</label><input id="c-email" name="email" type="email" required></div>
      <div class="field"><label for="c-company">company</label><input id="c-company" name="company"></div>
      <div class="field"><label for="c-need">help-with</label>
        <select id="c-need" name="need"><option>Digital Presence</option><option>Customer Acquisition</option><option>Digital Systems</option><option>AI & Creative</option><option>Not sure yet</option></select>
      </div>
      <div class="field"><label for="c-budget">budget (optional)</label><input id="c-budget" name="budget" placeholder="₦300,000 – ₦1,000,000"></div>
      <div class="field"><label for="c-message">message</label><textarea id="c-message" name="message" required></textarea></div>
      <button type="submit" class="btn primary mono">./send-message.sh ${icon("arrow")}</button>
      <p id="contact-status" class="mono" style="margin-top:14px; font-size:0.78rem; color:var(--grey);" aria-live="polite"></p>
    </form>

    <div class="rv" style="display:flex; flex-wrap:wrap; gap:10px; margin-top:32px;">
      ${SOCIALS.map((s) => `<a href="${s.href}" target="_blank" rel="noopener" class="social-btn"><span class="social-code">${s.code}</span>${s.label}</a>`).join("")}
    </div>
  </div>`;
}

/* ============================================================
   FILE-SPECIFIC BEHAVIOR BINDING (post-render)
   ============================================================ */
function bindFileBehaviors(f) {
  if (!f) return;
  if (f.kind === "contact") bindContactForm();
}
function bindContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = document.getElementById("contact-status");
    const data = new FormData(form);
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      status.textContent = "please fill in name, email and message.";
      status.style.color = "var(--red)";
      return;
    }
    const subject = encodeURIComponent(`New enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company") || "—"}\nNeeds help with: ${data.get("need")}\nBudget: ${data.get("budget") || "—"}\n\nMessage:\n${data.get("message")}`);
    window.location.href = `mailto:mrahmedgrowthsolutions@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = "opening your email client…";
    status.style.color = "var(--grey)";
  });
}

/* ============================================================
   BOOT
   ============================================================ */
window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => { initTheme(); render(); });
