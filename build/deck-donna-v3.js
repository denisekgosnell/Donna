// Build Your Own Donna, v3.1: the October 21, 2026 online workshop.
// 33 slides plus one hidden fallback: 82 minutes of deck after an eight-minute preamble (12:08 to 1:30 PM ET).
// Every run of type is 16pt or larger. Reserved accent: RED. Full Suits.
// Spec: FABLE-V3-INSTRUCTIONS.md sections 9 and 10, plus the October 20 change list.

const fs = require("fs");
const pptxgen = require("pptxgenjs");
const B = require("./brand");
const { C, F, G } = B;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Denise Gosnell";
pres.company = "Denise Gosnell";
pres.title = "Build Your Own Donna";

const DECK = "BUILD YOUR OWN DONNA";
const FOOTER = [DECK, "OCTOBER 21, 2026"];
const SITE = "donnainstructions.denisegosnell.ai"; // https://donnainstructions.denisegosnell.ai/
const PASSWORD = "donna2026"; // the same constant lives in assets/donna.js
const MODES = [];
const TIMING = [];

function slide(mode, { chrome = true, page = true } = {}) {
  const s = pres.addSlide();
  const p = B.bg(s, mode);
  MODES.push(mode === "dark" ? "D" : mode === "light" ? "L" : "A");
  if (chrome) B.chrome(s, mode, DECK, page ? MODES.length : null, FOOTER);
  return { s, p, n: MODES.length };
}

function notes(s, min, say, do_, watch, next) {
  TIMING.push(min);
  s.addNotes(
    `[TIMING] ${min} min.\n[SAY] ${say}\n[DO] ${do_}\n[WATCH] ${watch}\n[NEXT] ${next}`
  );
}

// The four stations of the loop. Same words, same order, everywhere.
const STATIONS = ["CONNECT", "TEACH", "RUN", "RETRAIN"];
const LOOP = {
  work: [
    { n: "01", name: "CONNECT", legend: "Work comes in." },
    { n: "02", name: "TEACH", legend: "Write the rules down once." },
    { n: "03", name: "RUN", legend: "The work gets done, on a schedule." },
    { n: "04", name: "RETRAIN", legend: "Look at what came back. Fix the rules." },
  ],
  ml: [
    { n: "01", name: "CONNECT", legend: "Collect the data." },
    { n: "02", name: "TEACH", legend: "Train the model on it." },
    { n: "03", name: "RUN", legend: "Put it to work and watch what it does." },
    { n: "04", name: "RETRAIN", legend: "Compare to what you wanted. Retrain." },
  ],
  today: [
    { n: "01", name: "CONNECT", legend: "Connect her to your inbox and calendar." },
    { n: "02", name: "TEACH", legend: "Four questions. She writes her playbook." },
    { n: "03", name: "RUN", legend: "She takes the 4:30 shift, every weekday." },
    { n: "04", name: "RETRAIN", legend: "Fridays she reviews her week. You sign it." },
  ],
};
// The pip caption names the station we are in, never the whole list (16pt rule).
const pip = (s, lit, mode, cap) =>
  B.progressPip(s, STATIONS.slice(0, lit), mode, cap || STATIONS[lit - 1], STATIONS);

// The loop slides share one geometry: ring left, legend right, one-line caption.
const LOOP_CAP = 5.84;
function loopSlide(s, mode, hub, stations) {
  const y = B.title(s, arguments[4], mode);
  B.loopRing(s, {
    cx: 3.9, band: { top: y, bottom: LOOP_CAP - 0.14 }, nodeD: 0.62, mode,
    bottom: LOOP_CAP, hub, stations,
    legend: { x: 7.3, y: y + 0.04, w: 5.15 },
  });
  return y;
}

// Step dividers: what we are doing, in plain words, then "go to the site".
function divider(mode, stepLabel, headline, sub, lit, inThisStep, siteStep) {
  const { s } = slide(mode);
  pip(s, lit, mode);
  s.addText(stepLabel, {
    x: G.ML, y: 1.3, w: G.W, h: 0.32, margin: 0,
    fontFace: F.BODY, fontSize: 16, bold: true, charSpacing: 2.0,
    color: C.GOLD_L, align: "center", valign: "middle",
  });
  const dv = B.statement(s, headline, mode, { size: 44, w: 10.6, y: 1.68 });
  s.addText(sub, {
    x: G.ML, y: dv - 0.06, w: G.W, h: 0.36, margin: 0,
    fontFace: F.BODY, fontSize: 18, color: C.WARM, align: "center", valign: "middle",
  });
  s.addText("IN THIS STEP", {
    x: G.ML, y: dv + 0.62, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 16, bold: true, charSpacing: 2.0,
    color: C.GOLD_L, align: "center", valign: "middle",
  });
  let iy = dv + 0.98;
  inThisStep.forEach((t, i) => {
    s.addText([
      { text: `${i + 1}/  `, options: { fontFace: F.DISPLAY, fontSize: 18, bold: true, color: C.GOLD_L } },
      { text: t, options: { fontFace: F.BODY, fontSize: 18, color: C.PAPER } },
    ], {
      x: G.ML, y: iy, w: G.W, h: 0.36, margin: 0, align: "center", valign: "middle",
    });
    iy += 0.38;
  });
  s.addText(`Now go to the instructions: Step ${siteStep} on the site.`, {
    x: G.ML, y: 5.4, w: G.W, h: 0.36, margin: 0,
    fontFace: F.BODY, fontSize: 18, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  s.addText(SITE, {
    x: G.ML, y: 5.78, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 16, color: C.WARM, align: "center", valign: "middle",
  });
  B.assertFits("divider list", G.ML, dv, G.W, iy - dv, 5.3);
  return s;
}

// A 16pt-floor numeral beside a line of copy (house rules, handoff beats).
function numbered(s, x, y, w, num, text, mode, size = 18, numSize = 26) {
  const p = B.palette(mode);
  s.addText(num, {
    x, y: y - 0.04, w: 0.5, h: 0.46, margin: 0,
    fontFace: F.DISPLAY, fontSize: numSize, bold: true, color: p.gold, valign: "middle",
  });
  const h = B.boxH(text, w - 0.66, size, "arial");
  s.addText(text, {
    x: x + 0.66, y, w: w - 0.66, h, margin: 0,
    fontFace: F.BODY, fontSize: size, color: p.fg, valign: "middle", lineSpacingMultiple: 1.12,
  });
  return Math.max(h, 0.46);
}

// Three acts: tell them what we will do, do it, then show them what we did.
function threeActs(s, acts, mode) {
  const p = B.palette(mode);
  const y = 1.96;
  const h = 3.5;
  acts.forEach(([num, name, when, text], i) => {
    const x = G.CARD3[i];
    const w = G.CARD3_W;
    B.card(s, { x, y, w, h, mode, tag: "act card" });
    s.addShape("line", { x: x + 0.3, y: y + 0.3, w: 0.5, h: 0, line: { color: C.GOLD, width: 1.5 } });
    s.addText(num, {
      x: x + 0.3, y: y + 0.42, w: w - 0.6, h: 0.7, margin: 0,
      fontFace: F.DISPLAY, fontSize: 44, bold: true, color: p.gold, valign: "middle",
    });
    s.addText(name, {
      x: x + 0.3, y: y + 1.18, w: w - 0.6, h: 0.36, margin: 0,
      fontFace: F.BODY, fontSize: 20, bold: true, color: p.fg, valign: "middle",
    });
    s.addText(when, {
      x: x + 0.3, y: y + 1.54, w: w - 0.6, h: 0.3, margin: 0,
      fontFace: F.BODY, fontSize: 16, charSpacing: 1.2, color: p.muted, valign: "middle",
    });
    const th = B.boxH(text, w - 0.6, 16, "arial");
    s.addText(text, {
      x: x + 0.3, y: y + 1.96, w: w - 0.6, h: th, margin: 0,
      fontFace: F.BODY, fontSize: 16, color: p.fg, valign: "top", lineSpacingMultiple: 1.16,
    });
    B.assertFits("act text", x, y + 1.96, w, th, y + h - 0.2);
  });
  return y + h;
}

const VIDEO = "assets/video/the-bottle.mp4";
const POSTER = "assets/video/the-bottle-poster.png";
const STILLS = [1, 2, 3].map((i) => `assets/video/the-bottle-${i}.png`);

// =========================================================  1. TITLE  (dark)
{
  const { s } = slide("dark", { chrome: false });
  B.ring(s, { cx: 6.667, cy: 1.4, d: 1.54, mark: "D" });
  const cardBot = B.quoteCard(s, {
    y: 2.4,
    w: 8.9,
    quote: "“I’m Donna. I know everything.”",
    attribution: "— DONNA PAULSEN, SUITS",
    size: 28,
  });
  s.addText("BUILD YOUR OWN DONNA", {
    x: G.ML, y: cardBot + 0.24, w: G.W, h: 0.62, margin: 0,
    fontFace: F.BODY, fontSize: 34, bold: true, charSpacing: 2.0,
    color: C.PAPER, align: "center", valign: "middle",
  });
  s.addText("No code. You copy, you paste, you leave with an agent.", {
    x: G.ML, y: cardBot + 0.9, w: G.W, h: 0.4, margin: 0,
    fontFace: F.BODY, fontSize: 18, color: C.WARM, align: "center", valign: "middle",
  });
  s.addText("DENISE GOSNELL, PH.D.   ·   WEDNESDAY, OCTOBER 21, 2026", {
    x: G.ML, y: cardBot + 1.4, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 16, charSpacing: 1.4, color: C.WARM,
    align: "center", valign: "middle",
  });
  s.addText("12:00 PM ET   ·   9:00 AM PT   ·   5:00 PM LONDON   ·   6:00 PM PARIS", {
    x: G.ML, y: cardBot + 1.72, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 16, charSpacing: 1.4, color: C.WARM,
    align: "center", valign: "middle",
  });
  B.assertFits("title meta", G.ML, cardBot + 1.72, G.W, 0.3, 6.4);
  B.skyline(s, 7.1);
  notes(s, 1,
    "She ran the best closer in New York City. Today she comes to work for you. By 1:20 Eastern every one of you owns a working Donna. Not a demo. Yours, on your own inbox, and she gets better every Friday.",
    "The preamble before this slide ran 12:00 to 12:08. Zoom housekeeping in one breath: Claude open on your laptop, the chat is for two things, a checkmark when you have it and a word when you are stuck. Name the TAs working the chat and the breakout rooms.",
    "Do not start until the chat shows checkmarks from most of the room. The people who fall behind fall behind here, not later.",
    "Here is how the ninety minutes go."
  );
}

// ================================================  3. RUN OF THE SHOW  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "Run of the show", "dark");
  B.title(s, "Three acts, done by 1:30.", "dark");
  const bot = threeActs(s, [
    ["I", "The idea", "12:08 TO 12:25", "Open loops, closed loops, and the only trick in the room: an agent is just a document."],
    ["II", "The build", "12:25 TO 1:20", "Four steps: connect, teach, run, retrain. By 1:20, Donna is working your inbox."],
    ["III", "The wrap", "1:20 TO 1:30", "What you built, where the loop turns next, and your first Friday."],
  ], "dark");
  B.caption(s, "First the idea, then the build, then what you walk out with.", "dark", {
    bold: true, color: C.GOLD_L, y: bot + 0.26,
  });
  notes(s, 1,
    "Three acts. First the idea: open loops and closed loops, and why an agent is just a document. Then we build, four steps, and by 1:20 she is working your inbox. Then the wrap: what you built, where it turns next, and your first Friday.",
    "Point at the middle card. That is most of the ninety minutes, and most of it is you pasting.",
    "Do not read the card text. Say the three act names and the clock on the middle one.",
    "Fifty-five seconds of silence. Let the video do the talking."
  );
}

// ====================================================  4. THE BOTTLE  (dark)
{
  const { s } = slide("dark", { chrome: false });
  B.eyebrow(s, "Where we are with AI at work", "dark", { y: 0.28 });
  const vw = 11.2;
  const vh = vw * 9 / 16;
  const vx = (G.SLIDE_W - vw) / 2;
  const vy = 0.72;
  if (fs.existsSync(VIDEO)) {
    const opts = { type: "video", path: VIDEO, x: vx, y: vy, w: vw, h: vh };
    if (fs.existsSync(POSTER)) {
      opts.cover = "image/png;base64," + fs.readFileSync(POSTER).toString("base64");
    }
    s.addMedia(opts);
  } else {
    console.warn("   !! video missing, slide 4 built with a placeholder frame");
    s.addShape("rect", { x: vx, y: vy, w: vw, h: vh, fill: { type: "none" }, line: { color: C.GOLD, width: 0.75, transparency: 40 } });
    s.addText("The Bottle · assets/video/the-bottle.mp4", {
      x: vx, y: vy + vh / 2 - 0.2, w: vw, h: 0.4, margin: 0,
      fontFace: F.BODY, fontSize: 16, italic: true, color: C.WARM, align: "center", valign: "middle",
    });
  }
  B.assertFits("video", vx, vy, vw, vh, G.SAFE_BOT);
  notes(s, 2,
    "Nothing. Fifty-five seconds. Let it play to the end card.",
    "Press play the moment the slide lands. If it stalls, go to the hidden slide right after this one and narrate the three stills in the captions' words.",
    "The numbers are a cartoon, not a statistic. If anyone asks, say so: an illustration of what everyone in the room already feels.",
    "Here is the one idea the whole hour sits on."
  );
}
// 3b · hidden fallback: the three stills
{
  const s = pres.addSlide();
  B.bg(s, "dark");
  s.hidden = true;
  B.eyebrow(s, "Where we are with AI at work  ·  the Bottle, in three frames", "dark");
  const caps = [
    "Before AI. One task per second. All of them yours.",
    "After AI. Four times the output. The same ten you wanted. And you sort the rest.",
    "Close the loop. Every sort you make teaches the rules. The rules make the next batch better.",
  ];
  const w = G.CARD3_W;
  const h = w * 9 / 16;
  caps.forEach((cap, i) => {
    const x = G.CARD3[i];
    const y = 1.3;
    if (fs.existsSync(STILLS[i])) {
      s.addImage({ path: STILLS[i], x, y, w, h });
    } else {
      s.addShape("rect", { x, y, w, h, fill: { color: C.PANEL }, line: { type: "none" } });
    }
    const ch = B.boxH(cap, w, 16, "arial");
    s.addText(cap, {
      x, y: y + h + 0.16, w, h: ch, margin: 0,
      fontFace: F.BODY, fontSize: 16, color: C.PAPER, valign: "top", lineSpacingMultiple: 1.16,
    });
    B.assertFits("stills caption", x, y + h + 0.16, w, ch, G.BODY_BOT);
  });
  B.chrome(s, "dark", DECK, null, FOOTER);
  s.addNotes("[TIMING] 0 min. Hidden. Use only if the video on the previous slide will not play.\n[SAY] Walk the three captions left to right, in those words.\n[NEXT] Here is the one idea the whole hour sits on.");
}

// ===================================================  4. STATEMENT  (light)
// Denise's edit of October 20: the statement on two lines, the caption cut to
// one sentence at 20pt, and the two diagrams twice the size.
{
  const { s } = slide("light");
  const stW = 10.6;
  const stX = (G.SLIDE_W - stW) / 2;
  const stH = (2 * (36 * 1.14) / 72 + 0.1) * 1.12;
  s.addText([
    { text: "Open loops make more work.", options: { breakLine: true } },
    { text: "Closed loops make better work." },
  ], {
    x: stX, y: 0.55, w: stW, h: stH, margin: 0,
    fontFace: F.DISPLAY, fontSize: 36, bold: true, color: C.INK, align: "center", valign: "top",
  });
  const colW = 5.2;
  const lx = G.ML + 0.3;
  const rx = G.SLIDE_W - 0.89 - 0.3 - colW;
  const dy = 0.55 + stH + 0.1;      // label row
  const ringR = 1.44;               // was 0.72: Denise asked for the two rings at twice the size
  const nodeD = 0.44;
  const cyo = dy + 0.34 + ringR + nodeD / 2;
  // OPEN: a hub, then a row of arrows heading off the right edge of its column
  B.label(s, "OPEN", "light", { x: lx, w: colW, y: dy, size: 16, align: "center", charSpacing: 1.6 });
  const hubD = 2.0;
  s.addShape("ellipse", {
    x: lx + 0.1, y: cyo - hubD / 2, w: hubD, h: hubD,
    fill: { type: "none" }, line: { color: C.GOLD, width: 1 },
  });
  s.addText([
    { text: "THE", options: { breakLine: true } },
    { text: "RULES" },
  ], {
    x: lx + 0.1, y: cyo - hubD / 2, w: hubD, h: hubD, margin: 0,
    fontFace: F.DISPLAY, fontSize: 18, bold: true, color: C.GOLD_D, align: "center", valign: "middle",
    lineSpacingMultiple: 1.02,
  });
  s.addShape("line", {
    x: lx + 0.1 + hubD, y: cyo, w: colW - hubD - 0.1, h: 0,
    line: { color: C.GOLD, width: 1 },
  });
  for (let i = 0; i < 3; i++) {
    const ax = lx + 0.1 + hubD + 0.55 + i * 1.0;
    s.addShape("triangle", {
      x: ax - 0.1, y: cyo - 0.13, w: 0.2, h: 0.26, rotate: 90,
      fill: { color: C.GOLD }, line: { type: "none" },
    });
  }
  s.addText("work goes out", {
    x: lx + 0.1 + hubD + 0.1, y: cyo - 0.62, w: colW - hubD - 0.2, h: 0.32, margin: 0,
    fontFace: F.BODY, fontSize: 16, italic: true, color: C.MUTE, align: "center", valign: "middle",
  });
  s.addText("nothing comes back", {
    x: lx + 0.1 + hubD + 0.1, y: cyo + 0.3, w: colW - hubD - 0.2, h: 0.32, margin: 0,
    fontFace: F.BODY, fontSize: 16, italic: true, color: C.MUTE, align: "center", valign: "middle",
  });
  // CLOSED: the ring with four numbered stations, hub THE RULES
  B.label(s, "CLOSED", "light", { x: rx, w: colW, y: dy, size: 16, align: "center", charSpacing: 1.6 });
  B.loopRing(s, {
    cx: rx + colW / 2, cy: cyo, r: ringR, mode: "light",
    nodeD, names: false,
    hub: { label: ["THE", "RULES"], fill: null },
    stations: LOOP.work,
    legend: null,
    bottom: G.BODY_BOT,
  });
  const diagBot = cyo + ringR + nodeD / 2;
  B.assertFits("s4 diagrams", lx, dy, G.W - 0.6, diagBot - dy, 5.76);
  B.caption(s, "AI makes open loops cheap. That is the whole problem.", "light", {
    size: 20, y: diagBot + 0.1,
  });
  notes(s, 1,
    "Read the two lines at the top out loud, slowly. Then the caption: AI makes open loops cheap. That is the whole problem, and it is the whole opportunity.",
    "Point left, then right. Open: work goes out, nothing comes back. Closed: the result comes back to whoever set the rules.",
    "Do not define feedback loops, control theory, or anything with a Wikipedia page. Two sentences and move.",
    "Every workflow you have is one of these two shapes. Here is the closed one, with its four stops."
  );
}

// ==================================================  5. THE LOOP  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "Any workflow you can describe", "dark");
  loopSlide(s, "dark", { label: ["THE", "WORK"], fill: C.PAPER, textColor: C.INK }, LOOP.work, "Every workflow is a loop.");
  B.caption(s, "Email. Invoices. Hiring. Support tickets. Same four stops.", "dark", {
    bold: true, color: C.GOLD_L, y: LOOP_CAP,
  });
  notes(s, 2,
    "Four stops. Work comes in. Somebody writes the rules down once. The work gets done, on a schedule. And then the part almost nobody builds: you look at what came back and you fix the rules.",
    "Walk the ring clockwise with your cursor so the room has the four words. Say them: connect, teach, run, retrain. They will hear those four words about forty more times today.",
    "Do not get pulled into which workflows. Email, invoices, hiring, tickets. One breath. The point is the fourth stop.",
    "Now, the part that is actually a computer science lecture, in one slide."
  );
}

// =====================================  6. THE SAME LOOP, IN CS  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "What machine learning actually is", "light");
  loopSlide(s, "light", { label: ["THE", "MODEL"], fill: C.INK, textColor: C.PAPER }, LOOP.ml, "Machine learning runs this loop.");
  B.caption(s, "Over fifty years of this loop. The prompt was never the hard part. Step four was the job.", "light", {
    bold: true, color: C.GOLD_D, y: LOOP_CAP,
  });
  notes(s, 1,
    "Same four stops. This is how computer scientists have built anything that learns for over fifty years: collect the data, train the model, put it to work, then look at what it got wrong and retrain. Silicon Valley spent two years telling you the magic was in the prompt. It was not. You can ask the AI to write the prompt. The part that matters is step four, and you already know how to do it. It is called looking at how the week went.",
    "Point at the hub: the model. Then at station four. Hold there.",
    "Say 'over fifty years', not 'invented'. Engineers had feedback loops before computer scientists did. If anyone technical pushes: the textbook version adds evaluate and monitor; we fold them into RUN and RETRAIN.",
    "And here is the only trick in the whole workshop."
  );
}

// ===============================  7. THE SAME LOOP, TODAY  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "What you build in the next hour", "dark");
  loopSlide(s, "dark", { label: ["DONNA"], fill: C.RED, textColor: C.WHITE }, LOOP.today, "An agent is just a document.");
  B.caption(s, "You are not retraining Claude. You are retraining Donna. And Donna is a document you own.", "dark", {
    bold: true, color: C.GOLD_L, y: LOOP_CAP,
  });
  notes(s, 1,
    "Same wheel. New hub. Donna is a document: her playbook. Connect it to your inbox, teach it your rules, run it on a schedule, and on Fridays she reads her own week and proposes edits to her own playbook. You are not retraining Claude. Nobody's model changes on Friday. You are retraining Donna, and Donna is a document you own.",
    "Point at the red hub. That is the file they will download in step three.",
    "This is the sentence people repeat afterward. Say it twice.",
    "Proof that this is real: what mine does for me."
  );
}

// =====================================  8. HOW DONNA WORKS FOR ME  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Proof of life: how my Donna works for me today", "light");
  const y = B.title(s, "What my Donna does for me.", "light");
  const lw = 5.5;
  const rx = 7.0;
  const rw = G.ML + G.W - rx;
  B.diamondList(s, {
    x: G.ML, y: y + 0.04, w: lw, mode: "light", size: 16, gap: 0.16,
    items: [
      { label: "Holds the calendar.", text: "A thread picks a time. The hold is already on my calendar." },
      { label: "Checks the guest list.", text: "Every invite, scanned. The people who matter are on it." },
      { label: "Preps me for strangers.", text: "A one-page brief before I meet anyone new, in my inbox and Drive." },
      { label: "Eggs versus balls.", text: "She watches my real goals and warns me before I drop an egg." },
    ],
    tag: "s8 left",
  });
  B.diamondList(s, {
    x: rx, y: y + 0.04, w: rw, mode: "light", size: 16, gap: 0.16,
    items: [
      { label: "Reads every Slack channel.", text: "All of them. I read one briefing." },
      { label: "Runs the 24-hour reply desk.", text: "No real email goes a day without an answer or a holding reply." },
      { label: "Plans tomorrow at 4 PM.", text: "Before I log off, tomorrow is laid out: meetings, prep, buffers, risks." },
    ],
    tag: "s8 right",
  });
  B.caption(s, "All of it from one playbook, written in plain English. Today you write yours.", "light", {
    bold: true, color: C.GOLD_D, y: LOOP_CAP,
  });
  notes(s, 1,
    "This is not a demo account. Mine holds calendar time the moment a thread converges, checks every invite for the people who matter, preps me before I meet a stranger, watches the eggs versus the balls, reads every Slack channel, runs a 24-hour reply desk, and plans tomorrow before I log off.",
    "Pick two and tell the story in one breath each: the calendar hold that appeared before you finished reading, and the egg she caught. Keep it fun; the numbers are on the next slide.",
    "Eggs versus balls: the goals that break if dropped are eggs; everything else bounces. She knows which is which because I wrote it down once.",
    "What does that give back? The receipts."
  );
}

// =========================================================  9. THE ROI  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "The receipts", "dark");
  const y = B.title(s, "What she gives back.", "dark");
  const stats = [
    ["3.5 hrs", "saved on post-conference follow-ups. Four hours by hand. Thirty-three minutes with Donna, the Friday after a conference."],
    ["35", "personalized one-to-one event invitations, written in 75 minutes. Before Donna: not possible, so not done."],
    ["100+", "meeting briefs since August 7, one per meeting, written before I walk in. 27 prep blocks on my calendar in the last 30 days."],
  ];
  let bot = y;
  stats.forEach(([v, l], i) => {
    const b = B.statCallout(s, {
      x: G.CARD3[i], y: y + 0.04, w: G.CARD3_W, value: v, label: l, size: 54, mode: "dark",
      color: C.GOLD_L, tag: "s9 stat",
    });
    bot = Math.max(bot, b);
  });
  B.panelList(s, {
    x: G.ML, y: bot + 0.22, w: G.W, mode: "dark", size: 16, pad: 0.24,
    items: [
      { label: "Published benchmark:", text: "Microsoft's first 297 Copilot users reported 64% less time on email and 1.2 hours a week back. (Work Trend Index, November 2023)" },
    ],
    tag: "s9 panel",
  });
  notes(s, 1,
    "Three receipts from my own calendar. The Friday after a conference, the follow-ups that used to take four hours took thirty-three minutes. Thirty-five personalized invitations in seventy-five minutes, which I simply would not have done before. And over a hundred meeting briefs since August, every one written before I walked in.",
    "Point at the middle number. The honest ROI is the work that was not possible before, not just the hours saved.",
    "The Microsoft figure is a survey of early Copilot users, self-reported, so call it a benchmark and not a promise. Your own receipts are the ones that count; they start Thursday at 4:30.",
    "One honest slide about which AI to use."
  );
}

// ===================================================  10. CHOOSE YOUR TOOL  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Which AI?", "light");
  const y = B.title(s, "Pick your tool. Keep your playbook.", "light");
  const tools = [
    ["Copilot", "AI inside Microsoft 365. Pick it if your company lives in Outlook and Teams."],
    ["Perplexity", "Research with sources. Ask the web, get the citations."],
    ["ChatGPT", "The everyday all-rounder, with the widest set of tricks."],
    ["Claude", "Careful writing, plus agents that do the work: projects, connectors, skills, scheduled tasks."],
  ];
  const cy = y + 0.04;
  const ch = 3.1;
  tools.forEach(([name, phrase], i) => {
    const x = G.CARD4[i];
    const w = G.CARD4_W;
    const hl = name === "Claude";
    B.card(s, { x, y: cy, w, h: ch, mode: "light", fill: hl ? C.INK : undefined, tag: "s10 card" });
    s.addText(name, {
      x: x + 0.24, y: cy + 0.22, w: w - 0.48, h: 0.46, margin: 0,
      fontFace: F.DISPLAY, fontSize: 22, bold: true, color: hl ? C.GOLD_L : C.INK, valign: "middle",
    });
    const ph = B.boxH(phrase, w - 0.48, 16, "arial");
    s.addText(phrase, {
      x: x + 0.24, y: cy + 0.78, w: w - 0.48, h: ph, margin: 0,
      fontFace: F.BODY, fontSize: 16, color: hl ? C.PAPER : C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
    B.assertFits("s10 phrase", x, cy + 0.78, w, ph, cy + ch - 0.16);
  });
  B.caption(s, "What you build today is a plain-text playbook. Download it, and paste it into any of these tomorrow.", "light", {
    bold: true, color: C.GOLD_D, y: cy + ch + 0.22,
  });
  notes(s, 1,
    "One phrase each, no religion. Copilot is the AI inside Microsoft 365. Perplexity is research with sources. ChatGPT is the everyday all-rounder. Claude is careful writing plus agents that do the work, which is why today runs on it: projects, connectors, skills, and scheduled tasks.",
    "Point at the dark card, then at the caption. The skill you build today is a file. It is portable.",
    "Do not get pulled into a feature war. The honest answer to 'which is best' is: the playbook is yours either way; the tool is the one your company allows.",
    "And one honest slide about free versus paid."
  );
}

// ===================================================  FREE OR PAID  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "Free or paid Claude?", "dark");
  const y = B.title(s, "Free works. You press start.", "dark");
  B.panelList(s, {
    x: G.COL_L.x, y: y + 0.04, w: G.COL_L.w, mode: "dark", size: 16, gap: 0.14, pad: 0.26,
    label: "On every plan, Free included", labelSize: 16,
    items: [
      "Steps 1 and 2, exactly as written.",
      "Her playbook as a skill you own (Step 3).",
      "Say \"Triage my inbox\" at 4:30: her shift, started by you.",
      "Say \"Retrain\" on Friday: her review, started by you.",
    ],
    tag: "free panel",
  });
  B.panelList(s, {
    x: G.COL_R.x, y: y + 0.04, w: G.COL_R.w, mode: "dark", size: 16, gap: 0.14, pad: 0.26,
    label: "Paid plans add", labelSize: 16,
    items: [
      "Scheduled tasks: she starts the 4:30 shift and the Friday retrain without you.",
      "That is the whole difference: who presses start.",
    ],
    tag: "paid panel",
  });
  B.caption(s, "An agent you start by hand is still an agent. Two phone reminders replace the scheduler: 4:30 weekdays, 3:00 Fridays.", "dark", {
    bold: true, color: C.GOLD_L,
  });
  notes(s, 1,
    "If you are on the free plan, nothing today is closed to you except one button. Steps 1 and 2 are identical. In step 3 you still build the skill. The paid plans add scheduled tasks, so she starts her own shift. On Free, you start it: open the Donna project at 4:30 and say Triage my inbox. Friday, say Retrain. Same agent, same playbook. Only the start button moves.",
    "Point at the left column, then the one line on the right. Do not apologize for the free plan; it is a complete build.",
    "The site has a free-plan box in Step 3 and Step 4 with the exact sentences to paste. Phone reminders at 4:30 and Friday 3:00 replace the scheduler.",
    "One promise before anyone connects an inbox."
  );
}

// ==============================  SHE NEVER SENDS  (accent RED)
{
  const { s } = slide(C.RED, { chrome: false });
  B.diamond(s, 6.617, 2.1, 0.12, C.WHITE);
  const nvr = B.statement(s, "She never sends. Ever.", C.RED, { size: 62, w: 11.0, y: 2.62 });
  const bh = B.boxH("She never deletes. She reads your inbox and your calendar, writes drafts, and puts events on your calendar. That is her whole job, and it is written into her playbook.", 9.53, 18, "arial");
  s.addText(
    "She never deletes. She reads your inbox and your calendar, writes drafts, and puts events on your calendar. That is her whole job, and it is written into her playbook.",
    {
      x: 1.9, y: nvr + 0.1, w: 9.53, h: bh, margin: 0,
      fontFace: F.BODY, fontSize: 18, color: C.WHITE,
      align: "center", valign: "top", lineSpacingMultiple: 1.16,
    }
  );
  s.addText('Written into the skill itself: “Never send anything. Never delete anything.”', {
    x: 1.9, y: nvr + 0.1 + bh + 0.2, w: 9.53, h: 0.34, margin: 0,
    fontFace: F.BODY, fontSize: 16, italic: true, color: C.WHITE,
    align: "center", valign: "middle",
  });
  B.assertFits("s11 italic", 1.9, nvr + 0.1 + bh + 0.2, 9.53, 0.34, G.SAFE_BOT);
  notes(s, 1,
    "Say it twice, verbatim: she never sends. Ever. And she never deletes.",
    "Slow down here. This is the trust slide, and it answers the fear nobody has typed in the chat yet: what if it emails a client?",
    "Her playbook forbids it in its first line, and nothing leaves until you press send on a draft you have read. You are the send button. If someone asks about privacy, the appendix has the plan-by-plan answer; do not go there now.",
    "Five house rules, then we build."
  );
}

// ==============================================  12. HOUSE RULES  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "House rules", "dark");
  const y = B.title(s, "Five of them.", "dark");
  const rules = [
    "She never sends. Drafts only. You are the send button.",
    "She never deletes. Nothing we do today is destructive.",
    "We move together. Every step ends at a checkpoint: type ✓ in the chat.",
    "Copy buttons everywhere. Nobody types more than a sentence.",
    "No question is too small. Stuck for 60 seconds? Say so in the chat or raise your hand. A TA takes you into a Zoom room, 1:1.",
  ];
  let ry = y + 0.06;
  rules.forEach((r, i) => {
    const h = numbered(s, G.ML, ry, G.W, String(i + 1), r, "dark", 18, 26);
    B.assertFits("s12 rule", G.ML, ry, G.W, h, G.BODY_BOT);
    ry += h + 0.16;
  });
  B.caption(s, "If anything I just said did not compute, perfect. You are exactly who this is for.", "dark", {
    bold: true, color: C.GOLD_L,
  });
  notes(s, 1,
    "Read all five slowly. This slide buys calm for the next hour.",
    "Rules 1 and 2 kill the unspoken fear. Rule 3 is how we move on Zoom: a checkmark in the chat at every checkpoint, and nobody moves until the count matches. Rule 5: say so in the chat or raise your hand, and a TA takes you into a Zoom room one to one.",
    "After rule 5, say the last line out loud. It is the one that keeps people from hiding.",
    "Four steps. By 1:20 she is working for you."
  );
}

// ================================================  13. THE PLAN  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The plan, Eastern", "light");
  const y = B.title(s, "Four steps. By 1:20 she’s working for you.", "light");
  const steps = [
    ["01", "CONNECT", "A desk, your inbox, her first draft.", "12:25"],
    ["02", "TEACH", "Four questions. She writes her playbook.", "12:38"],
    ["03", "RUN", "Her playbook becomes a skill on a schedule.", "12:55"],
    ["04", "RETRAIN", "One more task: Fridays she reviews her week.", "1:08"],
  ];
  const cy = y + 0.1;
  const ch = 2.9;
  steps.forEach(([num, name, desc, clock], i) => {
    const x = G.CARD4[i];
    const w = G.CARD4_W;
    B.card(s, { x, y: cy, w, h: ch, mode: "light", tag: "s13 card" });
    s.addText(num, {
      x: x + 0.26, y: cy + 0.2, w: w - 0.52, h: 0.66, margin: 0,
      fontFace: F.DISPLAY, fontSize: 36, bold: true, color: C.GOLD_D, valign: "top",
    });
    s.addText(name, {
      x: x + 0.26, y: cy + 0.9, w: w - 0.52, h: 0.3, margin: 0,
      fontFace: F.BODY, fontSize: 16, bold: true, charSpacing: 1.2, color: C.INK, valign: "top",
    });
    const dh = B.boxH(desc, w - 0.52, 16, "arial");
    s.addText(desc, {
      x: x + 0.26, y: cy + 1.26, w: w - 0.52, h: dh, margin: 0,
      fontFace: F.BODY, fontSize: 16, color: C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
    B.assertFits("s13 desc", x, cy + 1.26, w, dh, cy + ch - 0.5);
    s.addText(clock, {
      x: x + 0.26, y: cy + ch - 0.6, w: w - 0.52, h: 0.36, margin: 0,
      fontFace: F.DISPLAY, fontSize: 22, bold: true, color: C.GOLD_D, valign: "middle",
    });
  });
  B.caption(s, "Nobody types anything longer than one sentence today. Every prompt has a copy button on the site.", "light", { y: cy + ch + 0.24 });
  notes(s, 1,
    "Four steps, one per station of the loop you just saw. Connect at 12:25, teach at 12:38, run at 12:55, retrain at 1:08. At 1:20 she is working for you, and she has already given herself her first performance review.",
    "Say the arc out loud, then point at the clock on each card. From here, each step opens with one slide that says what we are doing, then we switch to the site.",
    "Nobody types anything longer than one sentence today. Say that; it lowers the temperature.",
    "Last thing before we build: everyone opens the instructions."
  );
}

// =======================================  OPEN THE INSTRUCTIONS, the last slide before the build  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Before we build", "light");
  const y = B.title(s, "Open the instructions.", "light");
  s.addText(SITE, {
    x: G.ML, y: y + 0.1, w: G.W, h: 0.8, margin: 0,
    fontFace: F.DISPLAY, fontSize: 36, bold: true, color: C.INK, align: "center", valign: "middle",
  });
  const cw = 7.0;
  const cx = (G.SLIDE_W - cw) / 2;
  const cy = y + 1.1;
  const ch = 1.5;
  B.card(s, { x: cx, y: cy, w: cw, h: ch, mode: "light", tag: "s2 card" });
  s.addText("PASSWORD", {
    x: cx, y: cy + 0.2, w: cw, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 16, bold: true, charSpacing: 2.0, color: C.GOLD_D,
    align: "center", valign: "middle",
  });
  s.addText(PASSWORD, {
    x: cx, y: cy + 0.52, w: cw, h: 0.8, margin: 0,
    fontFace: F.DISPLAY, fontSize: 48, bold: true, color: C.INK, align: "center", valign: "middle",
  });
  B.diamondList(s, {
    x: 2.2, y: cy + ch + 0.34, w: 9.0, mode: "light", size: 18, gap: 0.14,
    items: [
      "Phone or laptop. Keep it open: every prompt has a copy button.",
      "The site is the live version. If they disagree, the site wins.",
    ],
    tag: "s2 list",
  });
  notes(s, 1,
    "Open the site now, on your phone or in a tab beside Claude. Type the password: donna2026, all lowercase, no spaces. The TAs are putting the link and the password in the chat.",
    "Say the password out loud twice and paste the link and the password into the Zoom chat yourself. Wait for checkmarks.",
    "Someone will type the password with a capital letter or a space; the site ignores both. Someone else will be on the promo page instead of the instructions; the link in the chat fixes it.",
    "Step one."
  );
}

// =============================  14 to 16. STEP 1 · CONNECT  (pip: 1 lit)
{
  const s = divider("dark", "STEP ONE  ·  CONNECT", "First impressions.", "Give her a desk, connect your inbox, and watch her read it.", 1,
    ["Create her project.", "Connect Gmail, Calendar, and Drive.", "Two prompts: the question, then the first draft."], 1);
  notes(s, 1,
    "Step one, three things: create her project, connect the three Google accounts, then two prompts. The desk before the mail.",
    "Read the three lines. Then switch the screen share to the site, Step 1, and stay there until the checkpoint.",
    "Watch the pip in the top right. One of four stations lit. By 1:20 all four are.",
    "The site, Step 1."
  );
}
{
  const { s } = slide("light");
  pip(s, 1, "light");
  B.eyebrow(s, "Step one  ·  first impressions", "light", { narrow: true });
  const y = B.title(s, "Create her project, then connect.", "light", { w: 10.0 });
  const lw = 5.1;
  const rx = G.ML + lw + 0.3;
  const rw = G.ML + G.W - rx;
  const setupBot = B.panelList(s, {
    x: G.ML, y: y + 0.02, w: lw, mode: "light", size: 16, gap: 0.14, pad: 0.2,
    label: "The setup", labelSize: 16, labelColor: C.GOLD_D,
    items: [
      "Projects, New project. Name it Donna.",
      "Customize, then Connectors.",
      "Connect Gmail, Calendar, and Drive.",
    ],
    tag: "s15 panel",
  });
  B.panelList(s, {
    x: G.ML, y: setupBot + 0.2, w: lw, mode: "light", size: 16, gap: 0.1, pad: 0.2,
    items: [
      { label: "Still stuck?", text: "Say so in the chat or raise your hand. A TA takes you into a Zoom room, 1:1." },
    ],
    tag: "s15 stuck",
  });
  const py = B.promptBlock(s, {
    x: rx, y: y + 0.02, w: rw, mode: "light",
    label: "Prompt 1 · the question",
    lines:
      "What landed in my inbox in the last 24 hours that actually " +
      "needs ME? Top 5, one line each.",
    tag: "s15 p1",
  });
  B.promptBlock(s, {
    x: rx, y: py + 0.16, w: rw, mode: "light",
    label: "Prompt 2 · the first draft",
    lines:
      "Draft a reply to #1. Under 100 words, warm but decisive. " +
      "Read my sent emails and learn how I write. Never use em dashes. " +
      "Never use AI speech patterns. Save it as a draft. Do not send it.",
    tag: "s15 p2",
  });
  notes(s, 8,
    "Project first, then connectors. The desk before the mail. Then two prompts, from the site, inside the Donna project. Prompt 2 now makes her read your Sent folder first, and bans em dashes and AI speech patterns.",
    "Share the site, Step 1. Give prompt 1 a beat: the chat goes quiet when Claude answers from their real inbox. Then prompt 2, and send them to their Drafts folder.",
    "The classic failure is signing into the personal Google account instead of work, or a work account whose IT blocks the connector: the note on the page says bring a personal Gmail. If a connector reads Connected but Claude cannot see mail, quit Claude fully and reopen. Still stuck: a TA takes them into a Zoom room.",
    "Hold at the checkpoint."
  );
}
{
  const { s } = slide("dark");
  pip(s, 1, "dark");
  B.eyebrow(s, "Step one  ·  checkpoint", "dark", { narrow: true });
  B.diamond(s, 6.612, 2.24, 0.14, C.GOLD);
  const chk = B.statement(s, "A draft you didn’t write is waiting in your drafts folder.", "dark", { size: 40, w: 10.4, y: 2.62 });
  s.addText("The interview is over. She’s hired. Now we teach her.", {
    x: G.ML, y: chk + 0.24, w: G.W, h: 0.36, margin: 0,
    fontFace: F.BODY, fontSize: 18, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  notes(s, 4,
    "Nothing until the chat shows a checkmark from nearly everyone.",
    "Run it live on your own screen first, then hold. Count the checkmarks out loud. The TAs chase the stuck.",
    "If a connector is stuck: disconnect, reconnect, confirm the account. If someone is hopelessly stuck, a TA takes them into a Zoom room and the room keeps moving.",
    "Step two, and this is the one that matters."
  );
}

// ===============================  17 to 19. STEP 2 · TEACH  (pip: 2 lit)
{
  const s = divider("dark", "STEP TWO  ·  TEACH", "The triage desk.", "Four questions. She writes her own playbook.", 2,
    ["Paste her playbook into a new chat.", "Answer her four questions. Take your time.", "Type: Triage my inbox."], 2);
  notes(s, 1,
    "Step two is the document. Everything else today is plumbing. Three things: paste her playbook into a new chat in the Donna project, answer her four questions, then type Triage my inbox.",
    "Pip moves to TEACH. Read the three lines, then share the site, Step 2.",
    "Give people time here. The better the answers, the better the Donna.",
    "The site, Step 2."
  );
}
{
  const { s } = slide("light");
  pip(s, 2, "light");
  B.eyebrow(s, "Step two  ·  the triage desk", "light", { narrow: true });
  const y = B.title(s, "This is the document. She writes it.", "light", { w: 10.0 });
  const pw = 8.0;
  const tb = B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Paste into a new chat in your Donna project",
    lines:
      "Here is my triage playbook template. Read it, then run its Setup " +
      "Interview on me exactly as written: four questions, one question " +
      "at a time, and give me time to answer. Start now with your " +
      "greeting and Question 1 of 4.\n" +
      "\n" +
      "[the full template rides along in the same paste. One copy " +
      "button on the site, Step 2.]",
    tag: "s18 prompt",
  });
  B.panelList(s, {
    x: G.ML, y: tb + 0.2, w: pw, mode: "light", size: 16, pad: 0.2,
    items: [
      { text: "Take your time. The better you answer, the better she works.", bold: true, color: C.GOLD_D },
    ],
    tag: "s18 panel",
  });
  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  B.label(s, "The four questions", "light", {
    x: rx, w: rw, y: y + 0.06, size: 16, color: C.GOLD_D, charSpacing: 1.6,
  });
  B.diamondList(s, {
    x: rx, y: y + 0.5, w: rw, mode: "light", size: 16, gap: 0.14,
    items: [
      { label: "1 · Reply Now", text: "the 3 to 5 who never wait" },
      { label: "2 · By End of Day", text: "your team" },
      { label: "3 · Your priorities", text: "one to three, right now" },
      { label: "4 · Your voice", text: "three words and a sign-off" },
    ],
    tag: "s18 q",
  });
  notes(s, 11,
    "You do not write the document. You answer four questions and she writes it. Reply Now, By End of Day, your priorities, your voice. Take your time; specific answers make a better Donna.",
    "Everyone pastes the template from the site into a NEW chat inside the Donna project. Gate: every screen shows 'Four questions. Take your time.' and QUESTION 1 OF 4. Checkmarks in the chat. Then let them answer. Circulate through the chat with the TAs.",
    "Someone will paste OUTSIDE the Donna project and get generic results; get them inside the project, it is the first note on the page. Nobody gets hurried: there is no shortcut phrase this time.",
    "The checkpoint, and the ritual."
  );
}
{
  const { s } = slide("dark");
  pip(s, 2, "dark");
  B.eyebrow(s, "Step two  ·  checkpoint", "dark", { narrow: true });
  const chk = B.statement(s, "You get one table instead of an inbox.", "dark", { size: 40, w: 10.4, y: 1.9 });
  const pw = 6.0;
  const pb = B.promptBlock(s, {
    x: (G.SLIDE_W - pw) / 2, y: chk + 0.4, w: pw, mode: "dark",
    label: "The entire daily ritual, from now on",
    lines: ["Triage my inbox."],
    tag: "s19 prompt",
  });
  s.addText("Chat is a conversation. A playbook is a standing arrangement.", {
    x: G.ML, y: pb + 0.42, w: G.W, h: 0.36, margin: 0,
    fontFace: F.BODY, fontSize: 18, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  notes(s, 5,
    "You will never re-explain your rules again. That is the difference between a chat and a playbook.",
    "After the OPEN FOR BUSINESS banner, everyone runs the one-sentence ritual inside the project. Hold until the checkmarks say every screen shows a table.",
    "Reply-Now drafts are already sitting in their Drafts folder. Have them check; that is the gasp.",
    "Step three. The document leaves your hands."
  );
}

// ================================  20 to 23. STEP 3 · RUN  (pip: 3 lit)
{
  const s = divider("dark", "STEP THREE  ·  RUN", "Donna, full time.", "The document leaves your hands and goes on the clock.", 3,
    ["She writes her playbook file.", "You upload it as a skill.", "Schedule the 4:30 shift."], 3);
  notes(s, 1,
    "Step three is where it stops being a conversation and becomes an employee. Three things: she writes her playbook file, you upload it as a skill, then you schedule the 4:30 shift.",
    "Pip moves to RUN. Read the three lines, then share the site, Step 3.",
    "Free-plan people: the first two work for them; the schedule needs a paid plan, and the site says what they do instead.",
    "The site, Step 3."
  );
}
{
  const { s } = slide("light");
  pip(s, 3, "light");
  B.eyebrow(s, "Step three  ·  her playbook", "light", { narrow: true });
  const y = B.title(s, "She writes her own playbook file.", "light", { w: 10.0 });
  const pw = 8.0;
  const pb = B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Paste in the same chat, after your first table",
    lines:
      "Turn this conversation's triage setup into a reusable skill named " +
      "donna-triage. Fill in the template with everything you learned " +
      "about me. Keep the daily shift, the Friday retrain, and the Setup " +
      "Interview. Keep the hard rules: never send, never delete. Give me " +
      "the skill as a downloadable zip named donna-triage.zip containing " +
      "donna-triage/SKILL.md.",
    tag: "s21 prompt",
  });
  B.panelList(s, {
    x: G.ML, y: pb + 0.2, w: pw, mode: "light", size: 16, pad: 0.2,
    items: [
      { text: "Full prompt on the site, Step 3. See donna-triage in your skills list before anyone touches Scheduled.", bold: true, color: C.GOLD_D },
    ],
    tag: "s21 panel",
  });
  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  B.label(s, "Then the handoff", "light", {
    x: rx, w: rw, y: y + 0.06, size: 16, color: C.GOLD_D, charSpacing: 1.6,
  });
  const beats = [
    "She writes the file.",
    "Download it: the file card's arrow.",
    "Customize, Skills, +, Create skill, Upload a skill. Pick the zip.",
  ];
  let by = y + 0.56;
  beats.forEach((t, i) => {
    const h = numbered(s, rx, by, rw, String(i + 1), t, "light", 16, 24);
    B.assertFits("s21 beat", rx, by, rw, h, G.BODY_BOT);
    by += h + 0.22;
  });
  notes(s, 5,
    "A skill written in chat does not exist until you upload it. The file is a zip; the Skills screen wants a zip. Go slow and demo it on screen.",
    "Three beats. She writes it. You DOWNLOAD it. You UPLOAD it under Customize, Skills, plus, Create skill, Upload a skill. Wait until the chat says every screen shows donna-triage in the list.",
    "Stay in the SAME chat as step two; a fresh chat has not met them yet and writes a blank template. The gotchas are on the site: no Skills menu means the capability switch is off; a refused upload means the zip is not a folder with SKILL.md inside. The workaround for anyone: paste the playbook text into the scheduled task itself.",
    "Now give her the 4:30 shift."
  );
}
{
  const { s } = slide("light");
  pip(s, 3, "light");
  B.eyebrow(s, "Step three  ·  the 4:30 shift", "light", { narrow: true });
  const y = B.title(s, "Give her the 4:30 shift.", "light", { w: 10.0 });
  const pw = 8.0;
  const pb = B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Scheduled · New task · Create with Claude",
    lines:
      "Every weekday at 4:30 PM my local time, use my donna-triage skill: " +
      "triage today's inbox, save the Reply-Now drafts to my email Drafts, " +
      "create a 5-minute calendar event 10 minutes from now titled " +
      "\"Inbox Triage: Donna\", write the whole report into the event " +
      "description (short lines, no tables), and set an EMAIL reminder " +
      "1 minute before. Also do a dry run right now so I can watch the " +
      "first one land.",
    tag: "s22 prompt",
  });
  B.panelList(s, {
    x: G.ML, y: pb + 0.2, w: pw, mode: "light", size: 16, pad: 0.2,
    items: [
      { text: "Full prompt on the site, Step 3. Paste by 1:04.", bold: true, color: C.GOLD_D },
    ],
    tag: "s22 panel",
  });
  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  const ladder = [
    ["4:30", "she works"],
    ["4:39", "the email lands"],
    ["4:40", "one read, whole inbox"],
  ];
  let ly = y + 0.08;
  ladder.forEach(([t, d]) => {
    s.addText(t, {
      x: rx, y: ly, w: 1.1, h: 0.5, margin: 0,
      fontFace: F.DISPLAY, fontSize: 24, bold: true, color: C.GOLD_D, valign: "middle",
    });
    const dh = B.boxH(d, rw - 1.16, 16, "arial");
    s.addText(d, {
      x: rx + 1.16, y: ly + 0.25 - dh / 2, w: rw - 1.16, h: dh, margin: 0,
      fontFace: F.BODY, fontSize: 16, color: C.INK, valign: "middle", lineSpacingMultiple: 1.1,
    });
    ly += 0.58;
  });
  B.panelList(s, {
    x: rx, y: ly + 0.1, w: rw, mode: "light", size: 16, gap: 0.14, pad: 0.2,
    items: [
      "Runs on Claude's side, laptop closed.",
      "Paid plans only. Free: run her by hand.",
    ],
    tag: "s22 where",
  });
  notes(s, 4,
    "The last line of that prompt is the finale of this step: a dry run, right now, with today's event ten minutes out so the email lands while we are still together.",
    "Grab the prompt from the site rather than retyping. Scheduled in the left sidebar, New task, Create with Claude. If Claude asks how much she may do without checking in, pick the hands-free option. Free-plan people: no Scheduled menu; they run her by hand with Triage my inbox, and the site says so.",
    "Scheduled tasks run on Anthropic's side now, so a closed laptop is fine; say that plainly. 'My local time' matters: half this room is in Europe. Paste by 1:04 at the latest so the event lands before step four.",
    "Everybody watch your calendar."
  );
}
{
  const { s } = slide("dark");
  pip(s, 3, "dark");
  B.eyebrow(s, "Step three  ·  checkpoint  ·  Eastern", "dark", { narrow: true });
  s.addText("1:08", {
    x: G.ML, y: 1.82, w: G.W, h: 1.16, margin: 0,
    fontFace: F.DISPLAY, fontSize: 72, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  const dry = B.statement(s, "Her first shift lands as the last step starts.", "dark", { size: 32, w: 10.4, y: 3.1 });
  s.addText("The trick: Claude never emails you. Your calendar does.", {
    x: 1.9, y: dry + 0.1, w: 9.53, h: 0.4, margin: 0,
    fontFace: F.BODY, fontSize: 18, color: C.WARM, align: "center", valign: "top",
  });
  B.caption(s, "Three stations lit. One left, and it is one more scheduled task.", "dark", {
    bold: true, color: C.GOLD_L, align: "center",
  });
  notes(s, 3,
    "Open today's calendar. The checkmark is the event with the triage inside it. The email arrives a minute before it starts, right as step four begins.",
    "Everyone opens the event: the whole triage in its description, drafts waiting. Hold the silence. Checkmarks in the chat.",
    "The event appears when the dry run finishes, two to five minutes after the paste; the email follows ten minutes after the task started, so most land around 1:12. Do not wait for the email here. Move on at 1:08 and let it arrive during step four.",
    "Three stations lit. Now the one almost nobody builds."
  );
}

// ============================  24 to 27. STEP 4 · RETRAIN  (pip: 4 lit)
{
  const s = divider("dark", "STEP FOUR  ·  RETRAIN", "Her performance review.", "One more scheduled task. Every Friday she reviews her week. You sign it.", 4,
    ["Schedule the Friday retrain.", "Watch her first review land at 1:20.", "Monday: sign it."], 4);
  notes(s, 1,
    "Step four. Donna Paulsen would never sit through a performance review. So she gives herself one, every Friday, and you sign it. It is one more scheduled task, same place as the 4:30 shift.",
    "Pip: all four stations lit. Read the three lines, then share the site, Step 4.",
    "Nothing yet.",
    "The site, Step 4."
  );
}
{
  const { s } = slide("light");
  pip(s, 4, "light");
  B.eyebrow(s, "Step four  ·  the Friday retrain", "light", { narrow: true });
  const y = B.title(s, "Fridays, she reads her week.", "light", { w: 10.0 });
  const pw = 8.0;
  const pb = B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Scheduled · New task · Create with Claude",
    lines:
      "Every Friday at 3:00 PM my local time, use my donna-triage skill to " +
      "retrain: read this week's triage reports, drafts, and the emails " +
      "I actually sent. Compare. Propose changes to my playbook: " +
      "people, priorities, voice. Keep the hard rules. Put \"Donna's Week " +
      "in Review\" on my calendar Monday 8:00 AM with an EMAIL reminder and " +
      "save it to a Drive folder called \"Donna\". Also do a dry run right " +
      "now on this week so far.",
    tag: "s25 prompt",
  });
  B.panelList(s, {
    x: G.ML, y: pb + 0.16, w: pw, mode: "light", size: 16, pad: 0.16,
    items: [
      { text: "Full prompt on the site, Step 4. Paste by 1:10.", bold: true, color: C.GOLD_D },
    ],
    tag: "s25 panel",
  });
  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  const p1 = B.panelList(s, {
    x: rx, y: y + 0.02, w: rw, mode: "light", size: 16, gap: 0.06, pad: 0.16,
    label: "She looks at", labelSize: 16, labelColor: C.GOLD_D,
    items: ["her reports", "her drafts", "your sent emails"],
    tag: "s25 panel a",
  });
  B.panelList(s, {
    x: rx, y: p1 + 0.2, w: rw, mode: "light", size: 16, gap: 0.06, pad: 0.16,
    label: "What comes back", labelSize: 16, labelColor: C.GOLD_D,
    items: ["changes, with a why", "you approve first"],
    tag: "s25 panel b",
  });
  notes(s, 5,
    "Your Sent folder is her report card. She reads the reports she wrote, the drafts she saved, and the emails you actually sent, and she proposes changes to her own playbook. Numbered, each with a because. Nothing changes until you say approve.",
    "Paste first, by 1:10, then talk. Same place as the daily shift: Scheduled, New task, paste. The last line runs it right now on this week so far, with today's event ten minutes out, which lands at 1:20 if the paste is at 1:10. Talk through the Sent-folder idea while she reads the week. Yes, on a Wednesday: the Sent folder since Monday gives her plenty to say.",
    "Someone will ask whether she can just apply the changes herself. No, and that is the point: the human signature is what closes the loop. Monday, one paste and one upload, only when she proposes something.",
    "While she reads: the reframe."
  );
}
{
  const { s } = slide("dark");
  const y = B.statement(s, "This was never about email.", "dark", { size: 48, w: 11.0, y: 2.0 });
  const bw = 9.4;
  const bodyBot = B.body(
    s,
    "You built a loop today by writing plain English. Rules became a project, the project became a skill, the skill got a schedule, and the schedule got a Friday.",
    "dark",
    { x: (G.SLIDE_W - bw) / 2, w: bw, y: y + 0.3, size: 18, align: "center", tag: "s26 body" }
  );
  const lh = B.boxH("Email was the rehearsal. The same loop runs any workflow you can describe in words.", bw, 18, "arialBold");
  s.addText("Email was the rehearsal. The same loop runs any workflow you can describe in words.", {
    x: (G.SLIDE_W - bw) / 2, y: bodyBot + 0.3, w: bw, h: lh, margin: 0,
    fontFace: F.BODY, fontSize: 18, bold: true, color: C.GOLD_L, align: "center", valign: "top", lineSpacingMultiple: 1.16,
  });
  B.assertFits("s26 line", (G.SLIDE_W - bw) / 2, bodyBot + 0.3, bw, lh, G.BODY_BOT);
  notes(s, 2,
    "While her review is landing: recap the loop with THEIR artifacts. The playbook she wrote, the skill file they own, the schedule it runs on, the Friday it learns on. They did not learn a tool today. They built a loop, and closed it.",
    "Two minutes, no more. Then the calendar.",
    "Nothing.",
    "1:20. Open your calendar."
  );
}
{
  const { s } = slide("dark");
  pip(s, 4, "dark", "THE LOOP IS CLOSED");
  B.eyebrow(s, "Step four  ·  checkpoint  ·  Eastern", "dark", { narrow: true });
  s.addText("1:20", {
    x: G.ML, y: 1.82, w: G.W, h: 1.16, margin: 0,
    fontFace: F.DISPLAY, fontSize: 72, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  const rv = B.statement(s, "Her first Week in Review is on your calendar.", "dark", { size: 32, w: 10.4, y: 3.1 });
  s.addText("Four stations. Connect, teach, run, retrain. That is a learning system, and it is yours.", {
    x: 1.9, y: rv + 0.1, w: 9.53, h: 0.7, margin: 0,
    fontFace: F.BODY, fontSize: 18, color: C.WARM, align: "center", valign: "top", lineSpacingMultiple: 1.16,
  });
  B.caption(s, "The loop is closed.", "dark", { bold: true, color: C.GOLD_L, align: "center" });
  notes(s, 4,
    "Nothing. Let it land. Then: four stations. Connect, teach, run, retrain. That is a learning system, and it is yours.",
    "Everyone opens the event: proposed changes at the top, numbered, each with a because. Checkmarks in the chat. Point at the pip: all four lit, and the caption says the loop is closed.",
    "A few reviews will land a minute or two late. Keep talking; they will arrive during the next slide.",
    "What did we just build?"
  );
}

// ===============================  WHAT YOU JUST BUILT  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "Three acts, revisited", "dark");
  B.title(s, "What you just built.", "dark");
  const bot = threeActs(s, [
    ["I", "The idea", "DONE", "Every workflow is a loop. Closed loops get better. You can name all four stations."],
    ["II", "The build", "DONE, 1:20", "A project, a playbook she wrote, a skill you own, two standing orders. She is live."],
    ["III", "The wrap", "NOW", "Where your loop turns next, and the Friday she tells you what she got wrong."],
  ], "dark");
  B.caption(s, "You did not learn a tool today. You built a loop, and closed it.", "dark", {
    bold: true, color: C.GOLD_L, y: bot + 0.26,
  });
  notes(s, 1,
    "Same three cards from the top of the hour. The idea: every workflow is a loop, and closed loops get better. The build: a project, a playbook she wrote, a skill you own, two standing orders, and she is live. The wrap starts now.",
    "Point at each card in turn. This is the slide you promised them at 12:10.",
    "Free-plan people built the same thing; their standing orders are two phone reminders. Say so if you see the question in the chat.",
    "Where does the loop turn next?"
  );
}

// ==============================  THE DISCUSSION  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The discussion", "light");
  const y = B.title(s, "Where does the loop turn next?", "light");
  B.loopRing(s, {
    cx: 3.4, band: { top: y + 0.06, bottom: 5.5 }, mode: "light", nodeD: 0.5,
    hub: { label: ["THE", "WORK"], fill: C.INK, textColor: C.PAPER },
    stations: LOOP.work,
    legend: null,
    bottom: 5.56,
  });
  const rx = 6.1;
  const rw = G.ML + G.W - rx;
  B.panelList(s, {
    x: rx, y: y + 0.02, w: rw, mode: "light", size: 16, gap: 0.16,
    items: [
      { label: "CONNECT:", text: "What arrives every day that you read by hand?" },
      { label: "TEACH:", text: "What do you re-explain to somebody every single week?" },
      { label: "RUN:", text: "What would you want running at 4:30 tomorrow without you?" },
      { label: "RETRAIN:", text: "What did you learn last month that nobody wrote down?" },
    ],
    tag: "s28 panel",
  });
  B.caption(s, "Answer any one of these out loud and you have just specified your next agent.", "light", {
    bold: true, color: C.GOLD_D,
  });
  notes(s, 5,
    "Same four stations, pointed at the rest of your work. Every one of these questions is a workflow somebody on this call is doing by hand.",
    "Five minutes only. Facilitate from the chat; read two or three answers aloud and map each onto the ring so people hear their own use case become buildable.",
    "Give one personal story: the two-calendar morning shift is your own daily driver, so say so. The RETRAIN answers are your pipeline for the next workshop. Write them down.",
    "What happens next, starting tomorrow."
  );
}

// ==============================  29. YOUR FIRST FRIDAY  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "What happens next", "light");
  B.title(s, "Your first Friday.", "light");
  B.timeline(
    s,
    [
      { label: "Thu 4:30", sub: "her first real shift" },
      { label: "Fri 3:00", sub: "her first real retrain" },
      { label: "Mon 8:00", sub: "her Week in Review, on your calendar", highlight: true },
      { label: "Mon, you sign it", sub: "one paste, one upload" },
    ],
    null,
    "light",
    { spineY: 3.2, highlightColor: C.GOLD, highlightText: C.GOLD_D }
  );
  const cardY = 4.4;
  B.panelList(s, {
    x: G.ML, y: cardY, w: G.W, mode: "light", size: 18, gap: 0.12, pad: 0.26,
    items: [
      { text: "If she gets it wrong, you do not need a better prompt. You need to retrain with better info, and more specific info.", bold: true, color: C.GOLD_D },
    ],
    tag: "s29 panel",
  });
  s.addText(`${SITE}   ·   denise@denisegosnell.ai`, {
    x: G.ML, y: 5.7, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 16, color: C.MUTE, align: "center", valign: "middle",
  });
  notes(s, 3,
    "Tomorrow at 4:30 she works her first real shift, and the email lands at 4:39. Friday at 3:00 she reads her week. Monday at 8:00 her Week in Review is on your calendar, and you sign it with one paste and one upload. If she gets it wrong, you do not need a better prompt. You need to retrain with better info, and more specific info.",
    "Point at Monday. That is the loop closing for the first time without you in the room.",
    "The site stays up: every prompt, every rescue prompt, the Monday signature. Questions to the email address, any time.",
    "Send-off."
  );
}

// ==============================================  30. CLOSE  (dark)
{
  const { s } = slide("dark", { chrome: false });
  B.ring(s, { cx: 6.667, cy: 1.5, d: 1.54, mark: "D" });
  const closeBot = B.quoteCard(s, {
    y: 2.46,
    w: 9.6,
    quote: "“If you were ever lucky enough to have me, you wouldn’t want to share.”",
    attribution: "— DONNA PAULSEN, SUITS",
    size: 24,
  });
  s.addText("Yours starts tomorrow at 4:30.", {
    x: G.ML, y: closeBot + 0.3, w: G.W, h: 0.72, margin: 0,
    fontFace: F.DISPLAY, fontSize: 40, bold: true, color: C.PAPER, align: "center", valign: "middle",
  });
  s.addText(`${SITE}   ·   denise@denisegosnell.ai`, {
    x: G.ML, y: closeBot + 1.1, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 16, color: C.WARM, align: "center", valign: "middle",
  });
  B.assertFits("close url", G.ML, closeBot + 1.1, G.W, 0.3, 6.4);
  B.skyline(s, 7.1);
  notes(s, 1,
    "Tomorrow at 4:39 the triage arrives on its own for the first time. Friday she reads her week. Monday she tells you what she wants to change. When that lands, that is Donna saying she has got it from here.",
    "Questions any time: denise@denisegosnell.ai. The site stays up with every prompt.",
    "Stop the recording after the last question, not before.",
    "Done. You're weird. We'll be friends."
  );
}

// ====================================================================== write
const OUT = "decks/build-your-own-donna-v3.pptx";
pres.writeFile({ fileName: OUT }).then(() => {
  console.log(`\nDeck v3.1 written: ${OUT}`);
  console.log(`   slides: ${MODES.length} (+1 hidden)`);
  console.log(`   mode sequence: ${MODES.join(" ")}`);
  let run = 1;
  let worst = 1;
  for (let i = 1; i < MODES.length; i++) {
    run = MODES[i] === MODES[i - 1] ? run + 1 : 1;
    worst = Math.max(worst, run);
  }
  console.log(`   longest same-mode run: ${worst} (must be <= 3)`);
  console.log(`   opens ${MODES[0]}, closes ${MODES[MODES.length - 1]} (both must be D)`);
  const total = TIMING.reduce((a, b) => a + b, 0);
  console.log(`   timing: ${TIMING.join("+")} = ${total} min (must be 82: deck opens 12:08, ends 1:30)`);
  if (total !== 82) { console.error("   !! timing does not sum to 82"); process.exitCode = 1; }
  B.reportViolations("Deck v3.1");
  B.checkPresets(OUT);
});
