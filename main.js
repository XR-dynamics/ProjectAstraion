/* =====================================================================
   PROJECT ASTRAION — showcase content
   Edit the PROTOTYPES list; the page renders from it.
   video: path to an mp4 (null shows the poster with "Demo on request")
   ===================================================================== */
const PROTOTYPES = [
  {
    id: "drone-mission-lab",
    short: "Drone Mission Lab",
    name: "Drone Mission Lab",
    domain: "Drones · Crew training",
    video: "assets/video/drone-mission-lab.mp4",
    poster: "assets/poster/drone-mission-lab.jpg",
    demo: "assets/video/drone-mission-lab-demo.mp4", demoPoster: "assets/poster/drone-mission-lab-demo.jpg",
    oneline: "A training simulator where drone crews practise missions going wrong, with every run scored and replayable.",
    problem: "Lost links, jammed GPS and frozen video are hard to create safely in real flight. Crews often meet them for the first time on a real mission, and instructors have little hard evidence of how a crew coped.",
    shows: [
      "Operator, instructor and engineer on one shared mission",
      "Failures injected on demand: lost link, jammed GPS, frozen video",
      "Every crew scored on what they found and how fast they reacted",
      "Exact replay to compare one autopilot against another",
      "Supervised autonomy: the drone can run the inspection itself"
    ],
    forWho: ["Drone crews", "Instructors", "UAV programmes"]
  },
  {
    id: "ai-pilot",
    short: "AI Pilot",
    name: "AI Pilot",
    domain: "Fighter jets · Autonomy",
    video: "assets/video/ai-pilot.mp4",
    poster: "assets/poster/ai-pilot.jpg",
    demo: "assets/video/ai-pilot-demo.mp4", demoPoster: "assets/poster/ai-pilot-demo.jpg",
    oneline: "An AI that learns to survive incoming missiles by trial and error, seeing only what its radar sees.",
    problem: "No aircraft can be put in front of a real missile again and again. A test campaign gives a handful of engagements, while learning needs thousands, across every angle, altitude and timing.",
    shows: [
      "Learns evasive manoeuvres by experience, not pre-written rules",
      "Acts on radar readings only, as a real aircraft would",
      "Realistic flight physics: every manoeuvre costs speed and energy",
      "Many engagements trained in parallel",
      "Built to be steered by a partner's own training goals"
    ],
    forWho: ["Combat aircraft programmes", "Autonomy teams", "Loyal wingman concepts"]
  },
  {
    id: "xr-cockpit",
    short: "XR Cockpit",
    name: "XR Cockpit",
    domain: "Fighter jets · Pilot training",
    video: "assets/video/xr-cockpit.mp4",
    poster: "assets/poster/xr-cockpit.jpg",
    demo: "assets/video/xr-cockpit-demo.mp4", demoPoster: "assets/poster/xr-cockpit-demo.jpg",
    oneline: "A fighter cockpit inside a VR headset, where pilots rehearse emergencies and missions over real terrain.",
    problem: "Engine fires, bird strikes and missile threats are rare in training and decisive when they happen. Full-flight simulators are costly and booked far ahead, and rarely show the terrain of the next mission.",
    shows: [
      "Hands-on stick and throttle with a working head-up display",
      "Instructor adds emergencies, weather and threats mid-flight",
      "Missions rehearsed over the real terrain of the area",
      "Every session replayed in 3D for debrief",
      "Usable at base or deployed, between simulator sessions"
    ],
    forWho: ["Fighter pilots", "Flight training units", "Air forces"]
  },
  {
    id: "gps-denied-drone",
    short: "GPS-Denied Drone",
    name: "GPS-Denied Drone",
    domain: "Drones · Autonomy",
    video: null,
    poster: "assets/poster/gps-denied-drone.jpg",
    tags: [["GPS: no signal", "8%", "10%"], ["Pilot link: no signal", "8%", "19%"], ["Onboard map: loaded", "auto", "10%", "8%"], ["Navigation: autonomous", "auto", "19%", "8%"]],
    oneline: "A drone that finds its own way with no GPS and no pilot, using maps it carries onboard.",
    problem: "In contested areas GPS is jammed and the link to the pilot is cut. Deep inside, the drone is on its own. Teaching it to cope needs thousands of hostile flights that real airspace cannot allow.",
    shows: [
      "Navigates by landmarks, like a pilot reading a map",
      "Maps of the mission area stored onboard before take-off",
      "Trained through thousands of simulated flights under jamming, wind, night and cloud",
      "Keeps flying the mission when GPS and link are both lost",
      "Goes where no crew can be sent"
    ],
    forWho: ["UAV programmes", "Autonomy teams", "Special missions"]
  }
];

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- header ---------- */
const header = $("#siteHeader");
const onScroll = () => header.classList.toggle("solid", window.scrollY > 40);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* ---------- stage (click to play) ---------- */
function stageHTML(video, poster, label, tags) {
  const t = (tags || []).map(([txt, l, top, r]) =>
    `<b style="top:${top};${l === "auto" ? `right:${r}` : `left:${l}`}">${esc(txt)}</b>`).join("");
  return `
    <img class="poster" src="${poster}" alt="${esc(label)}" loading="lazy">
    ${t ? `<div class="tags">${t}</div>` : ""}
    ${video
      ? `<button class="playbtn" aria-label="Play ${esc(label)} video"><span class="ring"></span><span class="pl">Play video</span></button>`
      : `<span class="soon">Demonstration on request</span>`}
    <div class="hud"><i></i><i></i><i></i><i></i><span>${esc(label)}</span></div>`;
}
function wireStage(el, video) {
  const btn = el.querySelector(".playbtn");
  if (!btn || !video) return;
  btn.addEventListener("click", () => {
    const v = document.createElement("video");
    v.src = video; v.controls = true; v.playsInline = true; v.autoplay = true;
    v.poster = el.querySelector(".poster").src;
    el.innerHTML = ""; el.appendChild(v); el.classList.add("playing");
    v.play().catch(() => {});
  });
}
function pauseAll(except) { document.querySelectorAll(".stage video").forEach(v => { if (v !== except) v.pause(); }); }
document.addEventListener("play", e => pauseAll(e.target), true);

/* featured stage: AI pilot training by default, overview on request */
const DEMO_NOTE = 'Real footage from the working prototype simulation, not AI-generated. <a href="mailto:info@iverseai.com?subject=Astraion%20AI%20pilot%20demo">Need a demo? Request one &rarr;</a>';
const OV = {
  trained: { video: "assets/video/ai-pilot-trained.mp4", poster: "assets/poster/ai-pilot-trained.jpg", label: "AI-trained pilot", note: DEMO_NOTE },
  ai: { video: "assets/video/ai-pilot-training.mp4", poster: "assets/poster/ai-pilot-training.jpg", label: "AI pilot training", note: DEMO_NOTE },
  overview: { video: "assets/video/overview.mp4", poster: "assets/poster/overview.jpg", label: "Overview", note: "" }
};
const ov = document.getElementById("ovStage"), ovNote = document.getElementById("ovNote");
function setOv(key) {
  const c = OV[key]; pauseAll(); ov.classList.remove("playing");
  ov.innerHTML = stageHTML(c.video, c.poster, c.label); wireStage(ov, c.video);
  ovNote.innerHTML = c.note; ovNote.style.visibility = c.note ? "visible" : "hidden";
  document.querySelectorAll(".overview .mode").forEach(b => b.classList.toggle("on", b.dataset.ov === key));
}
document.querySelectorAll(".overview .mode").forEach(b => b.addEventListener("click", () => setOv(b.dataset.ov)));
setOv("trained");

/* ---------- prototypes ---------- */
const tabs = $("#tabs"), panels = $("#panels");
tabs.innerHTML = PROTOTYPES.map((p, i) =>
  `<button class="tab" role="tab" id="tab-${p.id}" aria-controls="p-${p.id}" data-id="${p.id}"><span class="tn">0${i + 1}</span><span class="tt">${esc(p.short)}</span></button>`
).join("") + `<span class="ink" id="ink"></span>`;

panels.innerHTML = PROTOTYPES.map((p, i) => `
  <article class="panel" id="p-${p.id}" role="tabpanel" aria-labelledby="tab-${p.id}" hidden>
    <div class="p-head">
      <h3 class="p-name"><span class="num">0${i + 1}</span><span class="silver">${esc(p.name)}</span></h3>
      <span class="p-domain">${esc(p.domain)}</span>
    </div>
    <p class="p-oneline">${esc(p.oneline)}</p>
    ${p.demo ? `<div class="modes" role="tablist" aria-label="${esc(p.name)} videos"><button class="mode on" data-mode="demo" data-pid="${p.id}">Simulation demo</button><button class="mode" data-mode="film" data-pid="${p.id}">Overview</button></div>` : ""}
    <div class="stage" data-id="${p.id}">${stageHTML(p.video, p.poster, `0${i + 1} · ${p.name}`, p.tags)}</div>
    <div class="p-body">
      <div><h4>The problem</h4><p>${esc(p.problem)}</p></div>
      <div><h4>What it shows</h4><ul>${p.shows.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
      <div><h4>Built for</h4><div class="for">${p.forWho.map(s => `<span>${esc(s)}</span>`).join("")}</div>
        <p class="status">Working prototype · Demonstration on request</p></div>
    </div>
    <div class="p-next">${i < PROTOTYPES.length - 1
      ? `<button data-go="${PROTOTYPES[i + 1].id}">Next: ${esc(PROTOTYPES[i + 1].name)} <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 7h10M8 3l4 4-4 4"/></svg></button>`
      : `<button data-go-partner>Work with us <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 7h10M8 3l4 4-4 4"/></svg></button>`}</div>
  </article>`).join("");

PROTOTYPES.forEach(p => wireStage(panels.querySelector(`.stage[data-id="${p.id}"]`), p.video));
PROTOTYPES.forEach(p => { if (p.demo) setMode(p, "demo"); });
function setMode(p, mode) {
  const el = panels.querySelector(`.stage[data-id="${p.id}"]`);
  pauseAll();
  el.classList.remove("playing");
  const demo = mode === "demo";
  const i = PROTOTYPES.indexOf(p);
  el.innerHTML = stageHTML(demo ? p.demo : p.video, demo ? p.demoPoster : p.poster,
    `0${i + 1} · ${p.name}${demo ? " · simulation demo" : ""}`, demo ? null : p.tags);
  if (demo) { const pl = el.querySelector(".pl"); if (pl) pl.textContent = "Play simulation demo"; }
  wireStage(el, demo ? p.demo : p.video);
  panels.querySelectorAll(`.mode[data-pid="${p.id}"]`).forEach(b => b.classList.toggle("on", b.dataset.mode === mode));
}

const ink = $("#ink");
function moveInk() {
  const on = tabs.querySelector(".tab.on"); if (!on) return;
  const pad = parseFloat(getComputedStyle(on).paddingRight);
  const left = on.offsetLeft + (on === tabs.firstElementChild ? 0 : pad);
  ink.style.width = (on.offsetWidth - pad - (on === tabs.firstElementChild ? 0 : pad)) + "px";
  ink.style.transform = `translateX(${left}px)`;
}
function activate(id, scroll) {
  pauseAll();
  tabs.querySelectorAll(".tab").forEach(t => { const on = t.dataset.id === id; t.classList.toggle("on", on); t.setAttribute("aria-selected", on); });
  panels.querySelectorAll(".panel").forEach(pn => {
    const on = pn.id === "p-" + id;
    if (on) { pn.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => pn.classList.add("in"))); }
    else { pn.hidden = true; pn.classList.remove("in"); }
  });
  moveInk();
  if (scroll) {
    const y = $("#prototypes .tabbar").getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hh"));
    scrollTo({ top: y + 1, behavior: "smooth" });
  }
  history.replaceState(null, "", "#" + id);
}
tabs.addEventListener("click", e => { const t = e.target.closest(".tab"); if (t) activate(t.dataset.id, true); });
panels.addEventListener("click", e => {
  const m = e.target.closest(".mode"); if (m) { setMode(PROTOTYPES.find(x => x.id === m.dataset.pid), m.dataset.mode); return; }
  const b = e.target.closest("[data-go]"); if (b) activate(b.dataset.go, true);
  if (e.target.closest("[data-go-partner]")) $("#partner").scrollIntoView({ behavior: "smooth" });
});
addEventListener("resize", moveInk);
const start = PROTOTYPES.find(p => "#" + p.id === location.hash);
activate(start ? start.id : PROTOTYPES[0].id, false);
if (start) setTimeout(() => activate(start.id, true), 300);
document.fonts && document.fonts.ready.then(moveInk);

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
