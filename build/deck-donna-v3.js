// Build Your Own Donna, v3: the October 21, 2026 online workshop.
// 26 slides plus one hidden fallback, 90 minutes (12:00 to 1:30 PM ET).
// Reserved accent: RED. Full Suits. Spec: FABLE-V3-INSTRUCTIONS.md sections 9 and 10.

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
    { n: "04", name: "RETRAIN", legend: "Compare results to what you wanted. Retrain." },
  ],
  today: [
    { n: "01", name: "CONNECT", legend: "Connect her to your inbox and calendar." },
    { n: "02", name: "TEACH", legend: "Four questions. She writes her own playbook." },
    { n: "03", name: "RUN", legend: "She takes the 4:30 shift, every weekday." },
    { n: "04", name: "RETRAIN", legend: "Fridays, she reviews her week. You sign it." },
  ],
};
const pip = (s, lit, mode, cap) => B.progressPip(s, STATIONS.slice(0, lit), mode, cap, STATIONS);

function divider(mode, stepLabel, headline, sub, lit) {
  const { s } = slide(mode);
  pip(s, lit, mode);
  s.addText(stepLabel, {
    x: G.ML, y: 2.68, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 14, bold: true, charSpacing: 2.0,
    color: C.GOLD_L, align: "center", valign: "middle",
  });
  const dv = B.statement(s, headline, mode, { size: 48, w: 10.2, y: 3.1 });
  s.addText(sub, {
    x: G.ML, y: dv + 0.1, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 15, color: C.WARM, align: "center", valign: "middle",
  });
  return s;
}

const VIDEO = "assets/video/the-bottle.mp4";
const POSTER = "assets/video/the-bottle-poster.png";
const STILLS = [1, 2, 3].map((i) => `assets/video/the-bottle-${i}.png`);

// =========================================================  1. TITLE  (dark)
{
  const { s } = slide("dark", { chrome: false });
  B.ring(s, { cx: 6.667, cy: 1.62, d: 1.54, mark: "D" });
  const cardBot = B.quoteCard(s, {
    y: 2.7,
    w: 8.9,
    quote: "“I’m Donna. I know everything.”",
    attribution: "— DONNA PAULSEN, SUITS",
    size: 28,
  });
  s.addText("BUILD YOUR OWN DONNA", {
    x: G.ML, y: cardBot + 0.26, w: G.W, h: 0.62, margin: 0,
    fontFace: F.BODY, fontSize: 34, bold: true, charSpacing: 2.0,
    color: C.PAPER, align: "center", valign: "middle",
  });
  s.addText("A 90 minute workshop for anyone who is done reading email. No code. You copy, you paste, you leave with an agent.", {
    x: G.ML, y: cardBot + 0.9, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 15, color: C.WARM, align: "center", valign: "middle",
  });
  s.addText("DENISE GOSNELL, PH.D.   ·   WEDNESDAY, OCTOBER 21   ·   12:00 PM ET   ·   9:00 AM PT   ·   5:00 PM LONDON   ·   6:00 PM PARIS", {
    x: G.ML, y: cardBot + 1.3, w: G.W, h: 0.24, margin: 0,
    fontFace: F.BODY, fontSize: 10, charSpacing: 1.6, color: C.WARM,
    align: "center", valign: "middle",
  });
  B.skyline(s, 7.1);
  notes(s, 1,
    "She ran the best closer in New York City. Today she comes to work for you. By 1:13 Eastern every one of you owns a working Donna. Not a demo. Yours, on your own inbox, and she gets better every Friday.",
    "Zoom housekeeping in one breath: the site open on your phone, Claude open on your laptop, the chat is for two things, a checkmark when you have it and HELP when you do not. Name the co-host working the chat.",
    "Do not start until the chat shows checkmarks from most of the room. The people who fall behind fall behind here, not later.",
    "Fifty-five seconds of silence. Let the video do the talking."
  );
}

// ====================================================  2. THE BOTTLE  (dark)
{
  const { s } = slide("dark", { chrome: false });
  B.eyebrow(s, "Where we are with AI at work", "dark", { y: 0.3 });
  const vw = 11.2;
  const vh = vw * 9 / 16;
  const vx = (G.SLIDE_W - vw) / 2;
  const vy = 0.7;
  if (fs.existsSync(VIDEO)) {
    const opts = { type: "video", path: VIDEO, x: vx, y: vy, w: vw, h: vh };
    if (fs.existsSync(POSTER)) {
      opts.cover = "image/png;base64," + fs.readFileSync(POSTER).toString("base64");
    }
    s.addMedia(opts);
  } else {
    console.warn("   !! video missing, slide 2 built with a placeholder frame");
    s.addShape("rect", { x: vx, y: vy, w: vw, h: vh, fill: { type: "none" }, line: { color: C.GOLD, width: 0.75, transparency: 40 } });
    s.addText("The Bottle · assets/video/the-bottle.mp4", {
      x: vx, y: vy + vh / 2 - 0.2, w: vw, h: 0.4, margin: 0,
      fontFace: F.BODY, fontSize: 13, italic: true, color: C.WARM, align: "center", valign: "middle",
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
// 2b · hidden fallback: the three stills
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
    const ch = B.boxH(cap, w, 13, "arial");
    s.addText(cap, {
      x, y: y + h + 0.16, w, h: ch, margin: 0,
      fontFace: F.BODY, fontSize: 13, color: C.PAPER, valign: "top", lineSpacingMultiple: 1.16,
    });
  });
  B.chrome(s, "dark", DECK, null, FOOTER);
  s.addNotes("[TIMING] 0 min. Hidden. Use only if the video on the previous slide will not play.\n[SAY] Walk the three captions left to right, in those words.\n[NEXT] Here is the one idea the whole hour sits on.");
}

// ===================================================  3. STATEMENT  (light)
{
  const { s } = slide("light");
  const y = B.statement(s, "Open loops make more work. Closed loops make better work.", "light", { size: 44, w: 10.6, y: 1.0 });

  // two small diagrams: open (a line that leaves) and closed (the ring)
  const colW = 5.2;
  const lx = G.ML + 0.3;
  const rx = G.SLIDE_W - 0.89 - 0.3 - colW;
  const dy = y + 0.1;
  const dh = 2.3;
  // OPEN: a hub, then a row of arrows heading off the right edge of its column
  B.label(s, "OPEN", "light", { x: lx, w: colW, y: dy, size: 13, align: "center", charSpacing: 1.6 });
  const hubD = 1.1;
  const cyo = dy + 0.44 + dh / 2;
  s.addShape("ellipse", {
    x: lx + 0.2, y: cyo - hubD / 2, w: hubD, h: hubD,
    fill: { type: "none" }, line: { color: C.GOLD, width: 1 },
  });
  s.addText("THE RULES", {
    x: lx + 0.2, y: cyo - hubD / 2, w: hubD, h: hubD, margin: 0,
    fontFace: F.DISPLAY, fontSize: 11, bold: true, color: C.GOLD_D, align: "center", valign: "middle",
  });
  s.addShape("line", {
    x: lx + 0.2 + hubD, y: cyo, w: colW - hubD - 0.2, h: 0,
    line: { color: C.GOLD, width: 1 },
  });
  for (let i = 0; i < 3; i++) {
    const t = 0.17;
    const ax = lx + 0.2 + hubD + 0.6 + i * 1.1;
    s.addShape("triangle", {
      x: ax - t / 2, y: cyo - t / 2, w: t, h: t, rotate: 90,
      fill: { color: C.GOLD }, line: { type: "none" },
    });
  }
  s.addText("work goes out", {
    x: lx + 0.2 + hubD + 0.3, y: cyo - 0.5, w: colW - hubD - 0.5, h: 0.24, margin: 0,
    fontFace: F.BODY, fontSize: 11, italic: true, color: C.MUTE, align: "center", valign: "middle",
  });
  s.addText("nothing comes back", {
    x: lx + 0.2 + hubD + 0.3, y: cyo + 0.26, w: colW - hubD - 0.5, h: 0.24, margin: 0,
    fontFace: F.BODY, fontSize: 11, italic: true, color: C.MUTE, align: "center", valign: "middle",
  });
  // CLOSED: the ring with four numbered stations, hub THE RULES
  B.label(s, "CLOSED", "light", { x: rx, w: colW, y: dy, size: 13, align: "center", charSpacing: 1.6 });
  B.loopRing(s, {
    cx: rx + colW / 2, band: { top: dy + 0.44, bottom: dy + 0.44 + dh }, mode: "light",
    nodeD: 0.4, names: false,
    hub: { label: ["THE", "RULES"], fill: null },
    stations: LOOP.work,
    legend: null,
    bottom: G.BODY_BOT,
  });
  B.caption(
    s,
    "A loop is open when work goes out and nothing comes back to tell you how it went. A loop is closed when the result comes back to the person who set the rules, and the rules get better. AI makes open loops cheap. That is the whole problem, and it is the whole opportunity.",
    "light",
    { y: 5.1 }
  );
  notes(s, 1,
    "Read the two sentences at the top out loud, slowly. Then the last line of the caption: AI makes open loops cheap. That is the whole problem, and it is the whole opportunity.",
    "Point left, then right. Open: work goes out, nothing comes back. Closed: the result comes back to whoever set the rules.",
    "Do not define feedback loops, control theory, or anything with a Wikipedia page. Two sentences and move.",
    "Every workflow you have is one of these two shapes. Here is the closed one, with its four stops."
  );
}

// ==================================================  4. THE LOOP  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "Any workflow you can describe", "dark");
  const y = B.title(s, "Every workflow is a loop.", "dark");
  const CAP = 5.4;
  B.loopRing(s, {
    cx: 4.1, band: { top: y, bottom: CAP - 0.14 }, nodeD: 0.62, mode: "dark",
    bottom: CAP,
    hub: { label: ["THE", "WORK"], fill: C.PAPER, textColor: C.INK },
    stations: LOOP.work,
    legend: { x: 7.55, y: y + 0.04, w: 4.9 },
  });
  B.caption(
    s,
    "Email. Invoices. Hiring. Support tickets. Same four stops. Most are left open: people build the first three and never come back for the fourth.",
    "dark",
    { bold: true, color: C.GOLD_L, y: CAP }
  );
  notes(s, 2,
    "Four stops. Work comes in. Somebody writes the rules down once. The work gets done, on a schedule. And then the part almost nobody builds: you look at what came back and you fix the rules.",
    "Walk the ring clockwise with your cursor so the room has the four words. Say them: connect, teach, run, retrain. They will hear those four words about forty more times today.",
    "Do not get pulled into which workflows. Email, invoices, hiring, tickets. One breath. The point is the fourth stop.",
    "Now, the part that is actually a computer science lecture, in one slide."
  );
}

// =====================================  5. THE SAME LOOP, IN CS  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "What machine learning actually is", "light");
  const y = B.title(s, "Machine learning runs the same loop.", "light");
  const CAP = 5.26;
  B.loopRing(s, {
    cx: 4.1, band: { top: y, bottom: CAP - 0.14 }, nodeD: 0.62, mode: "light",
    bottom: CAP,
    hub: { label: ["THE", "MODEL"], fill: C.INK, textColor: C.PAPER },
    stations: LOOP.ml,
    legend: { x: 7.55, y: y + 0.04, w: 4.9 },
  });
  B.caption(
    s,
    "Computer science has run this loop for over fifty years. Silicon Valley spent two years on the prompt. The prompt was never the hard part. You can ask the AI to write it. Step four was always the job.",
    "light",
    { bold: true, color: C.GOLD_D, y: CAP }
  );
  B.citation(s, "The textbook version adds \"evaluate\" and \"monitor\"; we fold them into RUN and RETRAIN.", "light");
  notes(s, 2,
    "Same four stops. This is how computer scientists have built anything that learns for over fifty years: collect the data, train the model, put it to work, then look at what it got wrong and retrain. Silicon Valley spent two years telling you the magic was in the prompt. It was not. You can ask the AI to write the prompt. The part that matters is step four, and you already know how to do it. It is called looking at how the week went.",
    "Point at the hub: the model. Then at station four. Hold there.",
    "Say 'over fifty years', not 'invented'. Engineers had feedback loops before computer scientists did. And say 'the textbook version has more stops; we fold two of them in' if anyone technical pushes. It is on the slide in small print.",
    "And here is the only trick in the whole workshop."
  );
}

// ===============================  6. THE SAME LOOP, TODAY  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "What you build in the next hour", "dark");
  const y = B.title(s, "An agent is just a document.", "dark");
  const CAP = 5.4;
  B.loopRing(s, {
    cx: 4.1, band: { top: y, bottom: CAP - 0.14 }, nodeD: 0.62, mode: "dark",
    bottom: CAP,
    hub: { label: ["HER", "PLAYBOOK"], fill: C.RED, textColor: C.WHITE },
    stations: LOOP.today,
    legend: { x: 7.55, y: y + 0.04, w: 4.9 },
  });
  B.caption(
    s,
    "You are not retraining Claude. You are retraining Donna. And Donna is a document you own.",
    "dark",
    { bold: true, color: C.GOLD_L, y: CAP }
  );
  notes(s, 1,
    "Same wheel. New hub. Donna is a document: her playbook. Connect it to your inbox, teach it your rules, run it on a schedule, and on Fridays she reads her own week and proposes edits to her own playbook. You are not retraining Claude. Nobody's model changes on Friday. You are retraining Donna, and Donna is a document you own.",
    "Point at the red hub. That is the file they will download in step three.",
    "This is the sentence people repeat afterward. Say it twice.",
    "One promise before anyone connects an inbox."
  );
}

// ==============================  7. SHE NEVER SENDS  (accent RED)
{
  const { s } = slide(C.RED, { chrome: false });
  B.diamond(s, 6.617, 2.1, 0.12, C.WHITE);
  const nvr = B.statement(s, "She never sends. Ever.", C.RED, { size: 62, w: 11.0, y: 2.62 });
  s.addText(
    "She never deletes. She can read your inbox and your calendar, write drafts, and put events on your calendar. That is her whole job description, and it is written into her playbook.",
    {
      x: 1.9, y: nvr + 0.1, w: 9.53, h: 0.7, margin: 0,
      fontFace: F.BODY, fontSize: 15, color: C.WHITE,
      align: "center", valign: "top", lineSpacingMultiple: 1.16,
    }
  );
  s.addText('Written into the skill itself: “Never send anything. Never delete anything.”', {
    x: 1.9, y: nvr + 0.96, w: 9.53, h: 0.32, margin: 0,
    fontFace: F.BODY, fontSize: 13, italic: true, color: C.WHITE,
    align: "center", valign: "middle",
  });
  notes(s, 1,
    "Say it twice, verbatim: she never sends. Ever. And she never deletes.",
    "Slow down here. This is the trust slide, and it answers the fear nobody has typed in the chat yet: what if it emails a client?",
    "Her playbook forbids it in its first line, and nothing leaves until you press send on a draft you have read. You are the send button. If someone asks about privacy, the appendix has the plan-by-plan answer; do not go there now.",
    "Five house rules, then we build."
  );
}

// ==============================================  8. HOUSE RULES  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "House rules", "dark");
  const y = B.title(s, "Five of them.", "dark");
  const rules = [
    "She never sends. Drafts only. You are the send button.",
    "She never deletes. Nothing we do today is destructive.",
    "We move together. Every step ends at a checkpoint: type ✅ in the chat.",
    "Copy buttons everywhere. Nobody types more than a sentence.",
    "No question is too small. Stuck for 60 seconds, type HELP in the chat.",
  ];
  let ry = y + 0.1;
  rules.forEach((r, i) => {
    s.addText(String(i + 1), {
      x: G.ML, y: ry - 0.04, w: 0.5, h: 0.46, margin: 0,
      fontFace: F.DISPLAY, fontSize: 26, bold: true, color: C.GOLD_L, valign: "middle",
    });
    const h = B.boxH(r, G.W - 0.66, 15, "arial");
    s.addText(r, {
      x: G.ML + 0.66, y: ry, w: G.W - 0.66, h, margin: 0,
      fontFace: F.BODY, fontSize: 15, color: C.PAPER, valign: "middle",
    });
    B.assertFits("s8 rule", G.ML, ry, G.W, Math.max(h, 0.46), G.BODY_BOT);
    ry += Math.max(h, 0.46) + 0.2;
  });
  B.caption(s, "If anything I just said did not compute, perfect. You are exactly who this is for.", "dark", {
    bold: true, color: C.GOLD_L,
  });
  notes(s, 1,
    "Read all five slowly. This slide buys calm for the next hour.",
    "Rules 1 and 2 kill the unspoken fear. Rule 3 is how we move on Zoom: a checkmark in the chat at every checkpoint, and nobody moves until the count matches. Rule 5: HELP in the chat, and the co-host comes to you.",
    "After rule 5, say the last line out loud. It is the one that keeps people from hiding.",
    "Four steps. By 1:13 she is working for you."
  );
}

// ================================================  9. THE PLAN  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The plan, Eastern  ·  12:12 connect  ·  12:26 teach  ·  12:40 run  ·  12:58 retrain  ·  1:13 done", "light");
  const y = B.title(s, "Four steps. By 1:13 she’s working for you.", "light");
  const steps = [
    ["01", "CONNECT", "Give her a desk, connect your inbox and calendar, and she drafts her first reply.", "12:12"],
    ["02", "TEACH", "Four questions, about four minutes. She writes her own playbook.", "12:26"],
    ["03", "RUN", "Her playbook becomes a skill she keeps, and she takes the 4:30 shift.", "12:40"],
    ["04", "RETRAIN", "Every Friday she reviews her own week and proposes what to change. You sign it.", "12:58"],
  ];
  const cy = y + 0.14;
  const ch = 3.1;
  steps.forEach(([num, name, desc, clock], i) => {
    const x = G.CARD4[i];
    const w = G.CARD4_W;
    B.card(s, { x, y: cy, w, h: ch, mode: "light", tag: "s9 card" });
    s.addText(num, {
      x: x + 0.26, y: cy + 0.22, w: w - 0.52, h: 0.66, margin: 0,
      fontFace: F.DISPLAY, fontSize: 36, bold: true, color: C.GOLD_D, valign: "top",
    });
    s.addText(name, {
      x: x + 0.26, y: cy + 0.94, w: w - 0.52, h: 0.28, margin: 0,
      fontFace: F.BODY, fontSize: 14, bold: true, charSpacing: 1.2, color: C.INK, valign: "top",
    });
    const dh = B.boxH(desc, w - 0.52, 12.5, "arial");
    s.addText(desc, {
      x: x + 0.26, y: cy + 1.3, w: w - 0.52, h: dh, margin: 0,
      fontFace: F.BODY, fontSize: 12.5, color: C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
    B.assertFits("s9 desc", x, cy + 1.3, w, dh, cy + ch - 0.5);
    s.addText(clock, {
      x: x + 0.26, y: cy + ch - 0.56, w: w - 0.52, h: 0.3, margin: 0,
      fontFace: F.DISPLAY, fontSize: 18, bold: true, color: C.GOLD_D, valign: "middle",
    });
  });
  B.caption(s, "Nobody types anything longer than one sentence today. Every prompt has a copy button on the site, and the site is open on your phone.", "light", { y: 5.55 });
  notes(s, 1,
    "Four steps, one per station of the loop you just saw. Connect at 12:12, teach at 12:26, run at 12:40, retrain at 12:58. At 1:13 she is working for you, and she has already given herself her first performance review.",
    "Say the arc out loud, then point at the clock on each card. Then switch to the site: everything from here is copy and paste from your phone.",
    "Nobody types anything longer than one sentence today. Say that; it lowers the temperature.",
    "Step one."
  );
}

// =============================  10 to 12. STEP 1 · CONNECT  (pip: 1 lit)
{
  const s = divider("dark", "STEP ONE  ·  CONNECT", "First impressions.", "Give her a desk, connect your inbox, and watch her read it.", 1);
  notes(s, 1,
    "Step one. The desk before the mail: we make her project first, then we connect the accounts.",
    "Watch the pip in the top right. One of four stations lit. By 1:13 all four are. Switch the screen share to the site, Step 1.",
    "Nothing yet. Keep moving.",
    "Setup, then two prompts."
  );
}
{
  const { s } = slide("light");
  pip(s, 1, "light");
  B.eyebrow(s, "Step one  ·  first impressions", "light", { narrow: true });
  const y = B.title(s, "Create her project, then connect.", "light");

  const setupBot = B.panelList(s, {
    x: G.COL_L.x, y: y + 0.02, w: G.COL_L.w, mode: "light", size: 13, gap: 0.14, pad: 0.26,
    label: "The setup", labelSize: 13, labelColor: C.GOLD_D,
    items: [
      "Projects, then New project. Name it Donna.",
      "Customize, then Connectors.",
      "Connect Gmail, Calendar, and Drive. All three, now.",
    ],
    tag: "s11 panel",
  });
  B.panelList(s, {
    x: G.COL_L.x, y: setupBot + 0.12, w: G.COL_L.w, mode: "light", size: 12, gap: 0.1, pad: 0.2,
    label: "Stuck connecting?", labelSize: 12, labelColor: C.GOLD_D,
    items: [
      "Quit Claude and reopen it. Fixes it nine times out of ten.",
      "IT blocks it? Use a personal Gmail. Rescue prompt: site, Step 1.",
    ],
    tag: "s11 rescue",
  });

  const py = B.promptBlock(s, {
    x: G.COL_R.x, y: y + 0.02, w: G.COL_R.w, mode: "light",
    label: "Prompt 1 · the question",
    lines:
      "What landed in my inbox in the last 24 hours that actually " +
      "needs ME? Top 5, one line each.",
    tag: "s11 p1",
  });
  B.promptBlock(s, {
    x: G.COL_R.x, y: py + 0.24, w: G.COL_R.w, mode: "light",
    label: "Prompt 2 · the first draft",
    lines:
      "Draft a reply to #1. Under 100 words, warm but decisive. " +
      "Save it as a draft in my email so I can review it there. " +
      "Do not send it.",
    tag: "s11 p2",
  });
  notes(s, 8,
    "Project first, then connectors. The desk before the mail. Then two prompts, from the site, inside the Donna project.",
    "Share the site, Step 1. Give prompt 1 a beat: the chat goes quiet when Claude answers from their real inbox. Then prompt 2, and send them to their Drafts folder.",
    "The classic failure is signing into the personal Google account instead of work, or a work account whose IT blocks the connector: the note on the page says bring a personal Gmail. If a connector reads Connected but Claude cannot see mail, quit Claude fully and reopen. Fixes it nine times out of ten.",
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
    x: G.ML, y: chk + 0.24, w: G.W, h: 0.34, margin: 0,
    fontFace: F.BODY, fontSize: 17, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  notes(s, 5,
    "Nothing until the chat shows a checkmark from nearly everyone.",
    "Run it live on your own screen first, then hold. Count the checkmarks out loud. The co-host chases the HELPs.",
    "If a connector is stuck: disconnect, reconnect, confirm the account. If someone is hopelessly stuck, pair them with the co-host in a breakout and keep the room moving.",
    "Step two, and this is the one that matters."
  );
}

// ===============================  13 to 15. STEP 2 · TEACH  (pip: 2 lit)
{
  const s = divider("dark", "STEP TWO  ·  TEACH", "The triage desk.", "Four questions, about four minutes. She writes her own playbook.", 2);
  notes(s, 1,
    "Step two is the document. Everything else today is plumbing.",
    "Pip moves to TEACH. Share the site, Step 2.",
    "Nothing yet.",
    "Four questions, and she does the writing."
  );
}
{
  const { s } = slide("light");
  pip(s, 2, "light");
  B.eyebrow(s, "Step two  ·  the triage desk", "light", { narrow: true });
  const y = B.title(s, "This is the document. She writes it.", "light");

  const pw = 7.6;
  const tb = B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Paste into a new chat in your Donna project",
    lines: [
      "Here is my triage playbook template. Read it, then run its Setup",
      "Interview on me exactly as written: four questions, about four",
      "minutes, one question at a time. Start now with your greeting and",
      "Question 1 of 4.",
      "",
      "[the full template rides along in the same paste.",
      " One copy button on the site, step two.]",
    ],
    tag: "s14 prompt",
  });
  B.promptBlock(s, {
    x: G.ML, y: tb + 0.24, w: pw, mode: "light",
    label: "The escape hatch · she jumps to the end",
    lines: ["final question"],
    tag: "s14 force",
  });

  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  B.label(s, "The four questions", "light", {
    x: rx, w: rw, y: y + 0.06, size: 13, color: C.GOLD_D, charSpacing: 1.6,
  });
  const qs = [
    ["1 · Reply Now", "the 3 to 5 people who never wait"],
    ["2 · By End of Day", "your team"],
    ["3 · Your priorities", "one to three, right now"],
    ["4 · THE FINAL QUESTION", "your voice, in 3 words"],
  ];
  let by = y + 0.46;
  qs.forEach(([name, hint]) => {
    B.diamond(s, rx, by + 0.06, 0.11, C.GOLD);
    const nh = B.boxH(name, rw - 0.34, 14, "arialBold");
    s.addText(name, {
      x: rx + 0.34, y: by, w: rw - 0.34, h: nh, margin: 0,
      fontFace: F.BODY, fontSize: 14, bold: true, color: C.INK, valign: "top",
    });
    const hh = B.boxH(hint, rw - 0.34, 12, "arial");
    s.addText(hint, {
      x: rx + 0.34, y: by + nh, w: rw - 0.34, h: hh, margin: 0,
      fontFace: F.BODY, fontSize: 12, italic: true, color: C.MUTE, valign: "top",
    });
    B.assertFits("s14 q", rx, by, rw, nh + hh, G.BODY_BOT);
    by += nh + hh + 0.12;
  });
  notes(s, 9,
    "You do not write the document. You answer four questions and she writes it. Reply Now, By End of Day, your priorities, your voice. About four minutes.",
    "Everyone pastes the template from the site into a NEW chat inside the Donna project. Gate: every screen shows 'Four questions. About four minutes.' and QUESTION 1 OF 4. Checkmarks in the chat. Then let them run. Circulate through the chat with the co-host.",
    "She reaches THE FINAL QUESTION by minute four on her own. When I call time, anyone not there types: final question. Someone will paste OUTSIDE the Donna project and get generic results; get them inside the project, it is the first note on the page.",
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
    x: (G.SLIDE_W - pw) / 2, y: chk + 0.5, w: pw, mode: "dark",
    label: "The entire daily ritual, from now on",
    lines: ["Triage my inbox."],
    tag: "s15 prompt",
  });
  s.addText("Chat is a conversation. A playbook is a standing arrangement.", {
    x: G.ML, y: pb + 0.42, w: G.W, h: 0.34, margin: 0,
    fontFace: F.BODY, fontSize: 17, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  notes(s, 4,
    "You will never re-explain your rules again. That is the difference between a chat and a playbook.",
    "Gate first: is THE FINAL QUESTION on your screen? Anyone who is not there types: final question. After the OPEN FOR BUSINESS banner, everyone runs the one-sentence ritual inside the project. Hold until the checkmarks say every screen shows a table.",
    "Reply-Now drafts are already sitting in their Drafts folder. Have them check; that is the gasp.",
    "Step three. The document leaves your hands."
  );
}

// ================================  16 to 19. STEP 3 · RUN  (pip: 3 lit)
{
  const s = divider("dark", "STEP THREE  ·  RUN", "Donna, full time.", "The document leaves your hands and goes on the clock.", 3);
  notes(s, 1,
    "Step three is where it stops being a conversation and becomes an employee.",
    "Pip moves to RUN. Share the site, Step 3.",
    "Nothing yet.",
    "She writes her own playbook file."
  );
}
{
  const { s } = slide("light");
  pip(s, 3, "light");
  B.eyebrow(s, "Step three  ·  her playbook", "light", { narrow: true });
  const y = B.title(s, "She writes her own playbook file.", "light");

  const pw = 7.6;
  const pb = B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Paste in the same chat, after your first table",
    lines: [
      "Turn this conversation's triage setup into a reusable skill named",
      "donna-triage. Fill in the template we used with everything you",
      "learned about me: my people and tiers, my priorities, my voice. Keep",
      "the daily shift, the Friday retrain, and the Setup Interview sections",
      "so the skill knows how to run on a schedule, how to retrain, and how",
      "to reconfigure. Keep the hard rules exactly as written: never send,",
      "never delete. Then give me the finished skill as a downloadable zip",
      "named donna-triage.zip containing donna-triage/SKILL.md.",
    ],
    tag: "s17 prompt",
  });
  B.panelList(s, {
    x: G.ML, y: pb + 0.24, w: pw, mode: "light", size: 13, gap: 0.12, pad: 0.26,
    items: [
      { text: "You should see donna-triage in your skills list before anyone touches Scheduled.", bold: true, color: C.GOLD_D },
    ],
    tag: "s17 panel",
  });

  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  B.label(s, "Then the handoff", "light", {
    x: rx, w: rw, y: y + 0.06, size: 13, color: C.GOLD_D, charSpacing: 1.6,
  });
  const beats = [
    "She writes the file.",
    "You download it. The file card has a download arrow.",
    "Customize, then Skills, then Create skill, then Upload a skill. Pick the zip.",
  ];
  let by = y + 0.56;
  beats.forEach((t, i) => {
    s.addText(String(i + 1), {
      x: rx, y: by - 0.03, w: 0.4, h: 0.38, margin: 0,
      fontFace: F.DISPLAY, fontSize: 24, bold: true, color: C.GOLD_D, valign: "middle",
    });
    const h = B.boxH(t, rw - 0.5, 14, "arial");
    s.addText(t, {
      x: rx + 0.5, y: by, w: rw - 0.5, h, margin: 0,
      fontFace: F.BODY, fontSize: 14, color: C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
    B.assertFits("s17 beat", rx, by, rw, h, G.BODY_BOT);
    by += Math.max(h, 0.38) + 0.34;
  });
  notes(s, 7,
    "A skill written in chat does not exist until you upload it. The file is a zip; the Skills screen wants a zip. Go slow and demo it on screen.",
    "Three beats. She writes it. You DOWNLOAD it. You UPLOAD it under Skills. Wait until the chat says every screen shows donna-triage in the list.",
    "Stay in the SAME chat as step two; a fresh chat has not met them yet and writes a blank template. If someone cannot find Skills (some builds say Customize, then Skills), the rescue prompt on the page asks Claude where it is in their version.",
    "Now give her the 4:30 shift."
  );
}
{
  const { s } = slide("light");
  pip(s, 3, "light");
  B.eyebrow(s, "Step three  ·  the 4:30 shift", "light", { narrow: true });
  const y = B.title(s, "Give her the 4:30 shift.", "light");

  const pw = 7.8;
  B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Scheduled · New task · Create with Claude",
    lines: [
      "Every weekday at 4:30 PM my local time, use my donna-triage skill:",
      "1. Triage today's inbox. Save the Reply-Now drafts to my email Drafts.",
      "2. Create a Google Calendar event today, starting 10 minutes after this",
      "   task starts and 5 minutes long, titled \"Inbox Triage: Donna\".",
      "3. Write the whole triage report INTO the event description.",
      "   Short lines, tier-name headers, one line per thread:",
      "   sender, subject, next move. No tables. Easy to read on a phone.",
      "4. Set an EMAIL reminder on the event, 1 minute before.",
      "Also do a dry run right now so I can watch the first one land.",
    ],
    tag: "s18 prompt",
  });

  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  const ladder = [
    ["4:30", "she works"],
    ["4:39", "the email lands"],
    ["4:40", "one read, whole inbox"],
  ];
  let ly = y + 0.1;
  ladder.forEach(([t, d]) => {
    s.addText(t, {
      x: rx, y: ly, w: 1.2, h: 0.46, margin: 0,
      fontFace: F.DISPLAY, fontSize: 26, bold: true, color: C.GOLD_D, valign: "middle",
    });
    s.addText(d, {
      x: rx + 1.26, y: ly, w: rw - 1.26, h: 0.46, margin: 0,
      fontFace: F.BODY, fontSize: 13, color: C.INK, valign: "middle",
    });
    ly += 0.54;
  });
  B.panelList(s, {
    x: rx, y: ly + 0.14, w: rw, mode: "light", size: 12, gap: 0.12, pad: 0.24,
    label: "Where she runs", labelSize: 12, labelColor: C.GOLD_D,
    items: [
      "Scheduled tasks run on Claude's side, not on your laptop. Close the laptop; she still works at 4:30.",
    ],
    tag: "s18 panel",
  });
  notes(s, 6,
    "The last line of that prompt is the finale of this step: a dry run, right now, with today's event ten minutes out so the email lands while we are still together.",
    "Grab the prompt from the site rather than retyping. Scheduled in the left sidebar, New task, Create with Claude. If Claude asks how much she may do without checking in, pick the hands-free option. If someone cannot find Scheduled, the rescue prompt on the page asks Claude where it is.",
    "Scheduled tasks run on Anthropic's side now, so a closed laptop is fine; say that plainly. 'My local time' matters: half this room is in Europe. Paste by 12:51 at the latest so the event lands before step four.",
    "Everybody watch your calendar."
  );
}
{
  const { s } = slide("dark");
  pip(s, 3, "dark");
  B.eyebrow(s, "Step three  ·  checkpoint  ·  Eastern", "dark", { narrow: true });
  s.addText("12:58", {
    x: G.ML, y: 1.82, w: G.W, h: 1.16, margin: 0,
    fontFace: F.DISPLAY, fontSize: 72, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  const dry = B.statement(s, "Her first shift lands as the last step starts.", "dark", { size: 32, w: 10.4, y: 3.1 });
  s.addText("The trick: Claude never emails you. Your calendar does. The triage lands from a sender you already trust.", {
    x: 1.9, y: dry + 0.16, w: 9.53, h: 0.5, margin: 0,
    fontFace: F.BODY, fontSize: 15, color: C.WARM, align: "center", valign: "top", lineSpacingMultiple: 1.16,
  });
  B.caption(s, "Three stations lit. One left, and it is the one that matters.", "dark", {
    bold: true, color: C.GOLD_L, align: "center",
  });
  notes(s, 4,
    "Open today's calendar. The checkmark is the event with the triage inside it. The email arrives a minute before it starts, right as step four begins.",
    "Everyone opens the event: the whole triage in its description, drafts waiting. Hold the silence. Checkmarks in the chat.",
    "The event appears when the dry run finishes, two to five minutes after the paste; the email follows ten minutes after the task started, so most land around 1:00. Do not wait for the email here. Move on at 12:58 and let it arrive during step four.",
    "Three stations lit. Now the one almost nobody builds."
  );
}

// ============================  20 to 22. STEP 4 · RETRAIN  (pip: 4 lit)
{
  const s = divider("dark", "STEP FOUR  ·  RETRAIN", "Her performance review.", "Every Friday she reviews her own week. You sign it.", 4);
  notes(s, 1,
    "Step four. Donna Paulsen would never sit through a performance review. So she gives herself one, every Friday, and you sign it.",
    "Pip: all four stations lit. Share the site, Step 4.",
    "Nothing yet.",
    "Fridays, she reads her week against yours."
  );
}
{
  const { s } = slide("light");
  pip(s, 4, "light");
  B.eyebrow(s, "Step four  ·  the Friday retrain", "light", { narrow: true });
  const y = B.title(s, "Fridays, she reads her week.", "light");

  const pw = 8.0;
  B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Scheduled · New task · Create with Claude",
    lines: [
      "Every Friday at 3:00 PM my local time, use my donna-triage skill to retrain:",
      "1. Read this week: the triage reports you wrote, the drafts you saved,",
      "   and the emails I actually sent.",
      "2. Compare. Who did I answer fast that is not on my Reply-Now list?",
      "   Which threads did I spend my week on that are not in my priorities?",
      "   Where did my sent emails sound different from your drafts?",
      "3. Propose changes to my playbook: people, priorities, voice. Keep the",
      "   hard rules exactly as they are: never send, never delete.",
      "4. Write \"Donna's Week in Review\" into a Google Calendar event, Monday",
      "   8:00 to 8:05 AM, proposed changes at the top, with an EMAIL reminder",
      "   1 minute before.",
      "5. Save the proposed changes as a document called \"Donna's Week in",
      "   Review\" in a Google Drive folder called \"Donna\".",
      "Also do a dry run right now on this week so far, and for the dry run put",
      "the event on today's calendar 10 minutes from now instead of Monday.",
    ],
    tag: "s21 prompt",
  });

  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  const p1 = B.panelList(s, {
    x: rx, y: y + 0.02, w: rw, mode: "light", size: 12, gap: 0.08, pad: 0.22,
    label: "She looks at", labelSize: 12, labelColor: C.GOLD_D,
    items: ["the reports she wrote", "the drafts she saved", "the emails you sent"],
    tag: "s21 panel a",
  });
  B.panelList(s, {
    x: rx, y: p1 + 0.16, w: rw, mode: "light", size: 12, gap: 0.08, pad: 0.22,
    label: "What comes back", labelSize: 12, labelColor: C.GOLD_D,
    items: ["changes, with a because", "the week in numbers", "nothing until you approve"],
    tag: "s21 panel b",
  });
  notes(s, 10,
    "Your Sent folder is her report card. She reads the reports she wrote, the drafts she saved, and the emails you actually sent, and she proposes changes to her own playbook. Numbered, each with a because. Nothing changes until you say approve.",
    "Paste first, by 1:01, then talk. Same place as the daily shift: Scheduled, New task, paste. The last line runs it right now on this week so far, with today's event ten minutes out, which lands at 1:11 if the paste is at 1:01. Talk through the Sent-folder idea while she reads the week. Yes, on a Wednesday: the Sent folder since Monday gives her plenty to say.",
    "Someone will ask whether she can just apply the changes herself. No, and that is the point: the human signature is what closes the loop. Monday, one paste and one upload, only when she proposes something.",
    "Watch for the review."
  );
}
{
  const { s } = slide("dark");
  pip(s, 4, "dark", "THE LOOP IS CLOSED");
  B.eyebrow(s, "Step four  ·  checkpoint  ·  Eastern", "dark", { narrow: true });
  s.addText("1:13", {
    x: G.ML, y: 1.82, w: G.W, h: 1.16, margin: 0,
    fontFace: F.DISPLAY, fontSize: 72, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  const rv = B.statement(s, "Her first Week in Review is on your calendar.", "dark", { size: 32, w: 10.4, y: 3.1 });
  s.addText("Four stations. Connect, teach, run, retrain. That is a learning system, and it is yours.", {
    x: 1.9, y: rv + 0.16, w: 9.53, h: 0.5, margin: 0,
    fontFace: F.BODY, fontSize: 15, color: C.WARM, align: "center", valign: "top", lineSpacingMultiple: 1.16,
  });
  B.caption(s, "The loop is closed.", "dark", { bold: true, color: C.GOLD_L, align: "center" });
  notes(s, 4,
    "Nothing. Let it land. Then: four stations. Connect, teach, run, retrain. That is a learning system, and it is yours.",
    "Everyone opens the event: proposed changes at the top, numbered, each with a because. Checkmarks in the chat. Point at the pip: all four lit, and the caption says the loop is closed.",
    "A few reviews will land a minute or two late. Keep talking; they will arrive during the next slide.",
    "Then the reframe: this was never about email."
  );
}

// ==================================  23. THE PIVOT  (dark)
{
  const { s } = slide("dark");
  const y = B.statement(s, "This was never about email.", "dark", { size: 48, w: 11.0, y: 2.0 });
  const bw = 9.4;
  const bodyBot = B.body(
    s,
    "You built a loop today by writing plain English. Rules became a project, the project became a skill, the skill got a schedule, and the schedule got a Friday.",
    "dark",
    { x: (G.SLIDE_W - bw) / 2, w: bw, y: y + 0.3, size: 15, align: "center", tag: "s23 body" }
  );
  s.addText("Email was the rehearsal. The same loop runs any workflow you can describe in words.", {
    x: (G.SLIDE_W - bw) / 2, y: bodyBot + 0.34, w: bw, h: 0.5, margin: 0,
    fontFace: F.BODY, fontSize: 17, bold: true, color: C.GOLD_L, align: "center", valign: "middle",
  });
  notes(s, 2,
    "Recap the loop with THEIR artifacts: the playbook she wrote, the skill file they own, the schedule it runs on, the Friday it learns on. They did not learn a tool today. They built a loop, and closed it.",
    "Pause here, then open the floor.",
    "Nothing.",
    "Where does the loop turn next?"
  );
}

// ==============================  24. THE DISCUSSION  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The discussion", "light");
  const y = B.title(s, "Where does the loop turn next?", "light");
  B.loopRing(s, {
    cx: 3.16, band: { top: y + 0.06, bottom: 5.5 }, mode: "light", nodeD: 0.48,
    hub: { label: ["THE", "WORK"], fill: C.INK, textColor: C.PAPER },
    stations: LOOP.work,
    legend: null,
    bottom: 5.56,
  });
  const rx = 6.1;
  const rw = G.ML + G.W - rx;
  B.panelList(s, {
    x: rx, y: y + 0.02, w: rw, mode: "light", size: 14, gap: 0.18,
    items: [
      { label: "CONNECT:", text: "What arrives every day that you read by hand?" },
      { label: "TEACH:", text: "What do you re-explain to somebody every single week?" },
      { label: "RUN:", text: "What would you want running at 4:30 tomorrow without you?" },
      { label: "RETRAIN:", text: "What did you learn last month that nobody wrote down?" },
    ],
    tag: "s24 panel",
  });
  B.caption(s, "Answer any one of these out loud and you have just specified your next agent.", "light", {
    bold: true, color: C.GOLD_D,
  });
  notes(s, 11,
    "Same four stations, pointed at the rest of your work. Every one of these questions is a workflow somebody on this call is doing by hand.",
    "Facilitate from the chat; read answers aloud and map each one onto the ring so people hear their own use case become buildable. Three or four answers per station.",
    "Give one personal story: the two-calendar morning shift is your own daily driver, so say so. The RETRAIN answers are your pipeline for the next workshop. Write them down.",
    "What happens next, starting tomorrow."
  );
}

// ==============================  25. YOUR FIRST FRIDAY  (light)
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
    { spineY: 3.3, highlightColor: C.GOLD, highlightText: C.GOLD_D }
  );
  const cardY = 4.42;
  B.panelList(s, {
    x: G.ML, y: cardY, w: G.W, mode: "light", size: 15, gap: 0.12, pad: 0.28,
    items: [
      { text: "If she gets it wrong, you do not need a better prompt. You need a Friday.", bold: true, color: C.GOLD_D },
    ],
    tag: "s25 panel",
  });
  s.addText("denisekgosnell.github.io/Donna   ·   denise@denisegosnell.ai", {
    x: G.ML, y: 5.62, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 13, color: C.MUTE, align: "center", valign: "middle",
  });
  notes(s, 3,
    "Tomorrow at 4:30 she works her first real shift, and the email lands at 4:39. Friday at 3:00 she reads her week. Monday at 8:00 her Week in Review is on your calendar, and you sign it with one paste and one upload. If she gets it wrong, you do not need a better prompt. You need a Friday.",
    "Point at Monday. That is the loop closing for the first time without you in the room.",
    "The site stays up: every prompt, every rescue prompt, the Monday signature. Questions to the email address, any time.",
    "Send-off."
  );
}

// ==============================================  26. CLOSE  (dark)
{
  const { s } = slide("dark", { chrome: false });
  B.ring(s, { cx: 6.667, cy: 1.56, d: 1.54, mark: "D" });
  const closeBot = B.quoteCard(s, {
    y: 2.52,
    w: 9.6,
    quote: "“If you were ever lucky enough to have me, you wouldn’t want to share.”",
    attribution: "— DONNA PAULSEN, SUITS",
    size: 24,
  });
  s.addText("Yours starts tomorrow at 4:30.", {
    x: G.ML, y: closeBot + 0.34, w: G.W, h: 0.72, margin: 0,
    fontFace: F.DISPLAY, fontSize: 40, bold: true, color: C.PAPER, align: "center", valign: "middle",
  });
  s.addText("denisekgosnell.github.io/Donna   ·   denise@denisegosnell.ai", {
    x: G.ML, y: closeBot + 1.16, w: G.W, h: 0.28, margin: 0,
    fontFace: F.BODY, fontSize: 12, color: C.WARM, align: "center", valign: "middle",
  });
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
  console.log(`\nDeck v3 written: ${OUT}`);
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
  console.log(`   timing: ${TIMING.join("+")} = ${total} min (must be 90)`);
  if (total !== 90) { console.error("   !! timing does not sum to 90"); process.exitCode = 1; }
  B.reportViolations("Deck v3");
  B.checkPresets(OUT);
});
