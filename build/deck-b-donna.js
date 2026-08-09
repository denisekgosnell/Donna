// Deck B: Build Your Own Donna
// 26 slides, 90 minutes (2:40 to 4:10). Reserved accent: RED. Full Suits.
// Spec: FABLE-DECK-INSTRUCTIONS.md section 5.

const pptxgen = require("pptxgenjs");
const B = require("./brand");
const { C, F, G } = B;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Denise Gosnell";
pres.company = "Signature Travel Network";
pres.title = "Build Your Own Donna";

const DECK = "BUILD YOUR OWN DONNA";
const MODES = [];

function slide(mode, { chrome = true, page = true } = {}) {
  const s = pres.addSlide();
  const p = B.bg(s, mode);
  MODES.push(mode === "dark" ? "D" : mode === "light" ? "L" : "A");
  if (chrome) B.chrome(s, mode, DECK, page ? MODES.length : null);
  return { s, p, n: MODES.length };
}

// The four stations of the execution flywheel, used by the progress pip and by
// the two full flywheel slides.
const EXEC = [
  { n: "01", name: "DOCUMENT" },
  { n: "02", name: "TEST" },
  { n: "03", name: "REVISE" },
  { n: "04", name: "OPERATE" },
];

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
  s.addText("A 90 minute workshop for executives who are done reading email.", {
    x: G.ML, y: cardBot + 0.9, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 15, color: C.WARM, align: "center", valign: "middle",
  });
  s.addText("DENISE GOSNELL, PH.D.   ·   2:40 TO 4:10", {
    x: G.ML, y: cardBot + 1.3, w: G.W, h: 0.24, margin: 0,
    fontFace: F.BODY, fontSize: 10, charSpacing: 1.6, color: C.WARM,
    align: "center", valign: "middle",
  });
  B.skyline(s, 7.1);
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] She ran the best closer in New York City. Today she comes to work for you. By 4:10 every one of you owns a working Donna. Not a demo. Yours, on your own inbox.\n" +
      "[DO] Housekeeping in one breath: laptops out, Claude desktop open, workspace invite accepted. Anyone missing a piece, flag me now and we fix it while we talk. Read the venue wifi network and password out loud; they are deliberately not on the slide.\n" +
      "[WATCH] Do not start until every laptop is open. The people who fall behind fall behind here, not later.\n" +
      "[NEXT] One slide to connect this to the hour you just spent."
  );
}

// ==========================  2. THE BRIDGE, one slide only  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Where we just were, and where we are going", "light");
  const y = B.title(s, "Same coin. You just saw one side.", "light");

  const RB2 = { top: y + 0.36, bottom: 5.02 };
  const ringY = (RB2.top + RB2.bottom) / 2;
  B.flywheel(s, {
    cx: 3.34, band: RB2, mode: "light", nodeD: 0.42, names: false,
    hub: { label: ["REVENUE", "GROWTH"], fill: C.TEAL, textColor: C.WHITE },
    stations: [
      { n: "01", name: "MORE BOOKINGS" },
      { n: "02", name: "MORE DATA" },
      { n: "03", name: "MORE PERSONAL" },
      { n: "04", name: "MORE BOOKINGS" },
    ],
    legend: null,
    bottom: 5.56,
  });
  s.addText("MORE BOOKINGS  ·  MORE DATA  ·  MORE PERSONAL", {
    x: 0.89, y: RB2.bottom + 0.14, w: 4.9, h: 0.24, margin: 0,
    fontFace: F.BODY, fontSize: 9, bold: true, charSpacing: 0.8,
    color: C.MUTE, align: "center", valign: "middle",
  });
  s.addText("DOCUMENT  ·  TEST  ·  REVISE  ·  OPERATE", {
    x: 7.55, y: RB2.bottom + 0.14, w: 4.9, h: 0.24, margin: 0,
    fontFace: F.BODY, fontSize: 9, bold: true, charSpacing: 0.8,
    color: C.GOLD_D, align: "center", valign: "middle",
  });
  s.addText("1:30   ·   THE STRATEGY FLYWHEEL", {
    x: 0.89, y: y + 0.02, w: 4.9, h: 0.28, margin: 0,
    fontFace: F.BODY, fontSize: 12, bold: true, charSpacing: 1.6,
    color: C.MUTE, align: "center", valign: "middle",
  });

  B.flywheel(s, {
    cx: 10.0, band: RB2, mode: "light", nodeD: 0.42, names: false,
    hub: { label: ["THE", "DOCUMENT"], fill: C.RED, textColor: C.WHITE },
    stations: EXEC,
    legend: null,
    bottom: 5.56,
  });
  s.addText("2:40   ·   THE EXECUTION FLYWHEEL", {
    x: 7.55, y: y + 0.02, w: 4.9, h: 0.28, margin: 0,
    fontFace: F.BODY, fontSize: 12, bold: true, charSpacing: 1.6,
    color: C.GOLD_D, align: "center", valign: "middle",
  });

  B.diamond(s, 6.612, ringY - 0.36, 0.13, C.GOLD);
  s.addText("ONE COIN", {
    x: 5.87, y: ringY - 0.06, w: 1.6, h: 0.28, margin: 0,
    fontFace: F.BODY, fontSize: 14, bold: true, charSpacing: 1.6,
    color: C.GOLD_D, align: "center", valign: "middle",
  });

  B.caption(
    s,
    "SigCompass showed you where we are driving. This hour asks the same question a second time: how does knowledge move across a business? And it answers the promise we left open at 2:20, something that runs without anyone remembering to run it.",
    "light",
    { align: "center", y: 5.5 }
  );
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] One hour ago we drew the strategy flywheel: bookings make data, data makes personalization, personalization makes bookings. Here is the other side of that same coin. Strategy tells you the heading. Execution is the crew, the watch schedule, and the log book. You need both, and only one of them gets taught.\n" +
      "[DO] Point at the left wheel, then the right. Say the word 'execution' out loud, because that is the whole ninety minutes.\n" +
      "[WATCH] Do not re-teach the left wheel. One sentence and move.\n" +
      "[NEXT] And here is why execution suddenly matters more than it did two years ago."
  );
}

// =================================================  3. THE 10x SLIDE  (dark)
{
  const { s } = slide("dark");
  let y = B.statement(s, "AI only speeds up your current processes by 10x.", "dark", {
    size: 42, w: 11.0, y: 1.12,
  });

  const cw = 8.2;
  const cx = (G.SLIDE_W - cw) / 2;
  B.card(s, { x: cx, y: y + 0.06, w: cw, h: 1.16, mode: "dark", tag: "s3 card" });
  s.addText("10x more confusion.", {
    x: cx + 0.3, y: y + 0.2, w: cw / 2 - 0.5, h: 0.44, margin: 0,
    fontFace: F.DISPLAY, fontSize: 24, bold: true, color: C.WARM,
    align: "right", valign: "middle",
  });
  B.diamond(s, G.SLIDE_W / 2 - 0.065, y + 0.36, 0.13, C.GOLD);
  s.addText("10x more alignment.", {
    x: G.SLIDE_W / 2 + 0.2, y: y + 0.2, w: cw / 2 - 0.5, h: 0.44, margin: 0,
    fontFace: F.DISPLAY, fontSize: 24, bold: true, color: C.GOLD_L,
    align: "left", valign: "middle",
  });
  s.addText("Today is an argument for the second one.", {
    x: cx + 0.3, y: y + 0.7, w: cw - 0.6, h: 0.34, margin: 0,
    fontFace: F.BODY, fontSize: 13, italic: true, color: C.WARM,
    align: "center", valign: "middle",
  });

  const bw = 10.2;
  B.body(
    s,
    "We are all learning to play doubles, and the balls just started coming a lot faster. The answer is not more creative plays. It is more basic ones. Emails. Numbers. Percentages. Knowing the same simple things at the same time, and acting on them together.",
    "dark",
    { x: (G.SLIDE_W - bw) / 2, w: bw, y: y + 1.44, size: 15, align: "center", tag: "s3 body" }
  );
  B.caption(s, "Reading the cockpit together is a fundamental. Bounce pass. Score. Then we get fancy.", "dark", {
    bold: true, color: C.GOLD_L, align: "center",
  });
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] AI does not make your company smarter. It makes your company faster at whatever it already does. If the process is clear, you get ten times the alignment. If it is not, you get ten times the confusion, and you get it at machine speed.\n" +
      "[DO] Use the doubles metaphor with your hands. The room recognises it immediately.\n" +
      "[WATCH] Tie back to the last session in one line: reading the instrument panel together is a fundamental, and this hour is about closing the work threads that fill it.\n" +
      "[NEXT] So where did the fundamentals of execution get worked out? Somewhere you already know."
  );
}

// ======================  4. THE EXECUTION FLYWHEEL  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "How a nine-figure business line actually runs", "dark");
  const y = B.title(s, "Amazon won on documents.", "dark");

  const CAP4 = 5.5;
  B.flywheel(s, {
    cx: 4.1, band: { top: y, bottom: CAP4 - 0.14 }, nodeD: 0.62, mode: "dark",
    bottom: CAP4,
    hub: { label: ["THE", "DOCUMENT"], fill: C.PANEL, textColor: C.GOLD_L },
    stations: [
      { n: "01", name: "DOCUMENT", legend: "One person writes down what they know. Prose, not slides." },
      { n: "02", name: "TEST", legend: "The room reads in silence and attacks the document, not the person." },
      { n: "03", name: "REVISE", legend: "It absorbs the debate. The writing is the thinking." },
      { n: "04", name: "OPERATE", legend: "Teams work backwards from it. Every metric has a named owner." },
    ],
    legend: { x: 7.55, y: y + 0.04, w: 4.9 },
  });

  B.caption(
    s,
    "Bezos took PowerPoint out of the S-Team room. What replaced it was not a better meeting. It was an artifact that outlives the meeting.",
    "dark",
    { bold: true, color: C.GOLD_L, y: CAP4 }
  );
  B.citation(
    s,
    "Bryar & Carr, Working Backwards (2021). Nonaka & Takeuchi, The Knowledge-Creating Company (1995).",
    "dark"
  );
  s.addNotes(
    "[TIMING] 3 min. This is the spine of the workshop.\n" +
      "[SAY] Four stops. Somebody writes down what they know. The room tests it. It gets revised. Then teams operate from it. This is not culture, it is a mechanism, and its entire purpose is converting one person's judgment into something an organization can execute without that person in the room.\n" +
      "[DO] Walk all four stations once so the room has the vocabulary. Speak from the inside: you watched this run at nine-figure scale.\n" +
      "[WATCH] Nonaka called this tacit-to-explicit conversion in 1995. It is still the only way anyone scales. Then set up the turn: the flywheel never changed, only the artifact did.\n" +
      "[NEXT] And here is what changed."
  );
}

// =========================================  5. WHAT CHANGED  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "What changed", "light");
  const y = B.title(s, "The artifact is now a skill file.", "light");

  const CAP5 = 5.5;
  B.flywheel(s, {
    cx: 4.1, band: { top: y, bottom: CAP5 - 0.14 }, nodeD: 0.62, mode: "light",
    bottom: CAP5,
    hub: { label: ["SKILL", "FILE"], fill: C.RED, textColor: C.WHITE },
    stations: [
      { n: "01", name: "DOCUMENT", legend: "You write the file. Your people, your rules, your voice." },
      { n: "02", name: "TEST", legend: "The agent reads it. It cannot be charmed and it does not skim." },
      { n: "03", name: "REVISE", legend: "You edit the file. Not the model. The file." },
      { n: "04", name: "OPERATE", legend: "You put it on a schedule. It runs at 4:30 without you." },
    ],
    legend: { x: 7.55, y: y + 0.04, w: 4.9 },
  });

  B.caption(
    s,
    "Same four steps. The reader used to be a room. Now it is an agent. That is the entire difference, and it is the whole workshop.",
    "light",
    { bold: true, color: C.GOLD_D, y: CAP5 }
  );
  s.addNotes(
    "[TIMING] 2 min. This is the payoff, and the sentence people repeat afterward.\n" +
      "[SAY] Same wheel. New hub. You are not learning a chatbot today, you are managing a document.\n" +
      "[DO] Overlay it literally: point at the previous slide's wheel, then this one. Then map the afternoon onto it. Step 1 is DOCUMENT and TEST. Step 2 is REVISE. Step 3 is OPERATE.\n" +
      "[WATCH] Say plainly: the skill you are actually learning today is document management, and it is the same skill that ran AWS.\n" +
      "[NEXT] One warning before we write anything."
  );
}

// ==============================  6. AI DOES NOT FIX  (accent RED)
{
  const { s } = slide(C.RED, { chrome: false });
  let y = B.statement(s, "AI does not fix a broken process. It runs it faster.", C.RED, {
    size: 44, w: 11.0, y: 1.28,
  });

  const stats = [
    ["88%", "of organizations use AI somewhere."],
    ["~6%", "see real profit impact from it."],
    ["21%", "have redesigned a single workflow."],
  ];
  stats.forEach(([v, l], i) => {
    const x = G.CARD3[i];
    s.addText(v, {
      x, y: y + 0.24, w: G.CARD3_W, h: 0.62, margin: 0,
      fontFace: F.DISPLAY, fontSize: 40, bold: true, color: C.WHITE,
      align: "center", valign: "middle",
    });
    s.addText(l, {
      x, y: y + 0.9, w: G.CARD3_W, h: 0.44, margin: 0,
      fontFace: F.BODY, fontSize: 13, color: C.WHITE,
      align: "center", valign: "top", lineSpacingMultiple: 1.16,
    });
  });

  const bw = 10.6;
  s.addText(
    "Of roughly 25 things McKinsey tested, one predicts profit impact above all others: fundamentally redesigning the workflow.",
    {
      x: (G.SLIDE_W - bw) / 2, y: y + 1.44, w: bw, h: 0.56, margin: 0,
      fontFace: F.BODY, fontSize: 15, bold: true, color: C.WHITE,
      align: "center", valign: "top", lineSpacingMultiple: 1.16,
    }
  );
  s.addText("A vague document used to waste a meeting. A vague document now runs ten thousand times a day.", {
    x: (G.SLIDE_W - bw) / 2, y: y + 2.22, w: bw, h: 0.34, margin: 0,
    fontFace: F.BODY, fontSize: 14, italic: true, color: C.WHITE,
    align: "center", valign: "middle",
  });
  s.addText("McKinsey, The State of AI (2025).", {
    x: G.ML, y: 6.24, w: G.W, h: 0.2, margin: 0,
    fontFace: F.BODY, fontSize: 9, italic: true, color: C.WHITE,
    align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 1 min. This is the slide to quote back during the discussion.\n" +
      "[SAY] An unclear process used to cost you a bad meeting. Now you have hired something that executes that unclear process perfectly and tirelessly, all day long.\n" +
      "[DO] Let the red land. Do not rush off it.\n" +
      "[WATCH] This is why the unglamorous middle of this workshop, writing the rules down, is the part that actually matters.\n" +
      "[NEXT] So before we write anything, you should know what kind of executive is holding the pen."
  );
}

// ========================  7. FOUR KINDS OF EXECUTIVE  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Before you write anything, know who is holding the pen", "light");
  B.title(s, "Four kinds of executive.", "light");

  B.quadrant(s, {
    mode: "light",
    axisStyle: "bold",
    axes: {
      top: "CLOSED", topSub: "you control what you show",
      bottom: "OPEN", bottomSub: "you show what you feel",
      left: "ASK", leftSub: "you gather, then move",
      right: "TELL", rightSub: "you move, then gather",
    },
    cells: [
      { pos: "ul", name: "ACCURACY", lines: ["Show me the reasoning before the recommendation."] },
      { pos: "ur", name: "TIME", lines: ["Do not explain it. Close it."] },
      { pos: "ll", name: "TRUST", lines: ["Who does this touch, and do they know yet?"] },
      { pos: "lr", name: "VISION", lines: ["Where else could this go?"] },
    ],
  });

  B.citation(s, "Merrill & Reid, Personal Styles and Effective Performance (1981).", "light");
  s.addNotes(
    "[TIMING] 4 min.\n" +
      "[SAY] Research from the early 1960s, and still the most useful map of an executive there is. You will recognise yourself in two of these. Most of us are one on a calm day and another on a hard one.\n" +
      "[DO] Take hands per quadrant. It wakes the room and it tells you who you are teaching for the next hour.\n" +
      "[WATCH] Do not let this become a personality test. It is a setup for the next slide.\n" +
      "[NEXT] Whichever quadrant you sit in, the flywheel is identical. What differs is what you should optimize for in the next hour."
  );
}

// ===============================  8. YOUR ASSIGNMENT  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "So here is your assignment", "light");
  B.title(s, "Four ways to spend the next hour.", "light");

  B.quadrant(s, {
    mode: "light",
    axisStyle: "recede",
    axes: { top: "CLOSED", bottom: "OPEN", left: "ASK", right: "TELL" },
    cells: [
      {
        pos: "ul", name: "ACCURACY",
        lines: [
          { label: "Your lens:", text: "Show me the reasoning before the recommendation." },
          { label: "Your job today:", text: "Hunt the non-determinism. Scaled wrong knowledge is what slows a business down." },
          { label: "You leave with:", text: "Governance that builds repeatability." },
        ],
      },
      {
        pos: "ur", name: "TIME",
        lines: [
          { label: "Your lens:", text: "You want it running before I finish the sentence." },
          { label: "Your job today:", text: "Experience this as the job description you are about to hire for." },
          { label: "You leave with:", text: "How you delegate and invest in this workflow." },
        ],
      },
      {
        pos: "ll", name: "TRUST",
        lines: [
          { label: "Your lens:", text: "Who does this touch, and do they know yet?" },
          { label: "Your job today:", text: "Decide where human relationships are best served by technology, not replaced by it." },
          { label: "You leave with:", text: "Where AI helps people flourish, not fry them." },
        ],
      },
      {
        pos: "lr", name: "VISION",
        lines: [
          { label: "Your lens:", text: "Where else could this go?" },
          { label: "Your job today:", text: "Today is email plus plain English. See the invisible digital headquarters behind it." },
          { label: "You leave with:", text: "The first worlds you can build from here." },
        ],
      },
    ],
  });

  s.addNotes(
    "[TIMING] 4 min. This is the permission slide.\n" +
      "[SAY] Read the 'your job today' line for each quadrant. They are the most useful sentences on the slide and they preempt the four ways this hour goes sideways.\n" +
      "[DO] TIME, closed and tell: you are plotting how you will invest in and delegate this workflow to be built for your company. Some of you should not be building this yourself, and that is a legitimate answer. Deliver that offer verbally, here, on the TIME quadrant.\n" +
      "[DO] ACCURACY, closed and ask: your job is to help the TIME executive minimize scaling errors, because that is how businesses get dragged down. We slow down significantly the moment we start sharing collective knowledge that is incorrect. Look for where we need governance and extra testing so we are building repeatability instead of chaos.\n" +
      "[DO] TRUST, open and ask: 'AI' now means humans write natural language to describe a product, and that innovation line is doing wonderful things for the speed of operations. But our secret sauce as a cooperative is that we know the power of human relationships. Your role is to understand deeply where you want to hold the line for human relationships being served by technology rather than replaced by it. You are the executive who holds the line on empowering humans, so we flourish in this business instead of being fried by the speed of it.\n" +
      "[DO] VISION, open and tell: you are the tech visionaries. You see not just how email plus natural-language delegation helps you architect a new digital headquarters, but how it opens a whole palace of innovation. Use the physical analogy: open-and-tell people can see how a building should be shaped around how people will work and play and be human in it. In this era we are building an INVISIBLE digital headquarters for how you run, direct, and operate your business. You write English sentences describing the future you want, and a probabilistic neural network makes that workflow real.\n" +
      "[WATCH] Nobody has to become a builder today. Whoever runs it, somebody has to write the document, and that somebody has to be the person whose judgment it encodes. That is why you are in this room and not your assistant.\n" +
      "[NEXT] Five house rules, then we build."
  );
}

// ==============================================  9. HOUSE RULES  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "House rules", "dark");
  const y = B.title(s, "Five of them.", "dark");

  const rules = [
    "She never sends. Drafts only. You are the send button.",
    "She never deletes. Nothing we do today is destructive.",
    "We move together. Every step ends at a checkpoint.",
    "Copy buttons everywhere. Nobody types more than a sentence.",
    "No question is too small. Stuck for 60 seconds, hand up.",
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
    B.assertFits("s9 rule", G.ML, ry, G.W, Math.max(h, 0.46), G.BODY_BOT);
    ry += Math.max(h, 0.46) + 0.2;
  });

  B.caption(s, "If anything I just said did not compute, perfect. You are exactly who this is for.", "dark", {
    bold: true, color: C.GOLD_L,
  });
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] Read all five slowly. This slide buys calm for the next hour.\n" +
      "[DO] Rules 1 and 2 kill the unspoken fear: nothing sends, nothing deletes. Rule 3 sets pacing so the fast people help instead of racing ahead.\n" +
      "[WATCH] After rule 5, say the last line out loud. It is the one that keeps people from hiding.\n" +
      "[NEXT] Three steps, forty-five minutes."
  );
}

// ================================================  10. THE PLAN  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The plan  ·  2:40 context  ·  3:00 build  ·  3:45 discussion  ·  4:10 done", "light");
  const y = B.title(s, "Three steps. Forty-five minutes.", "light");

  const steps = [
    ["01", "FIRST IMPRESSIONS", "One desk for everything. Connect your email and calendar, and she drafts her first reply.", "DOCUMENT  ·  TEST"],
    ["02", "THE TRIAGE DESK", "You brief her once. Red, yellow, gray. Your people, your priorities, your voice.", "REVISE"],
    ["03", "DONNA, FULL TIME", "Her playbook becomes a skill she keeps, and she takes the 4:30 evening shift.", "OPERATE"],
  ];
  const cy = y + 0.16;
  const ch = 2.86;
  steps.forEach(([num, name, desc, stations], i) => {
    const x = G.CARD3[i];
    const w = G.CARD3_W;
    B.card(s, { x, y: cy, w, h: ch, mode: "light", tag: "s10 card" });
    s.addText(num, {
      x: x + 0.3, y: cy + 0.24, w: w - 0.6, h: 0.72, margin: 0,
      fontFace: F.DISPLAY, fontSize: 40, bold: true, color: C.GOLD_D, valign: "top",
    });
    s.addText(name, {
      x: x + 0.3, y: cy + 1.0, w: w - 0.6, h: 0.3, margin: 0,
      fontFace: F.BODY, fontSize: 15, bold: true, charSpacing: 0.8, color: C.INK, valign: "top",
    });
    s.addText(desc, {
      x: x + 0.3, y: cy + 1.38, w: w - 0.6, h: 0.94, margin: 0,
      fontFace: F.BODY, fontSize: 13, color: C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
    s.addText(stations, {
      x: x + 0.3, y: cy + 2.36, w: w - 0.6, h: 0.28, margin: 0,
      fontFace: F.BODY, fontSize: 12, bold: true, charSpacing: 1.4, color: C.GOLD_D, valign: "middle",
    });
  });

  B.caption(
    s,
    "Every step is one station of the flywheel. You write a document, you test it, and you put it on the clock.",
    "light",
    { y: 5.3 }
  );
  s.addNotes(
    "[TIMING] 3 min.\n" +
      "[SAY] Three steps, one per stretch of the flywheel you just saw. Context until 3:00, build until 3:45, discussion until 4:10.\n" +
      "[DO] Say the arc out loud, then point at the station line on each card so the mapping is explicit.\n" +
      "[WATCH] Nobody types anything longer than one sentence today. Say that; it lowers the temperature.\n" +
      "[NEXT] Step one."
  );
}

// =====================  11 to 13. STEP 1  (pip: DOCUMENT, TEST)
const PIP1 = ["DOCUMENT", "TEST"];
{
  const { s } = slide("dark", { page: false });
  B.progressPip(s, PIP1, "dark", "DOCUMENT · TEST");
  s.addText("STEP ONE", {
    x: G.ML, y: 2.68, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 14, bold: true, charSpacing: 2.0,
    color: C.GOLD_L, align: "center", valign: "middle",
  });
  const dv = B.statement(s, "First impressions.", "dark", { size: 48, w: 10.2, y: 3.1 });
  s.addText("Give her a desk, connect your inbox, and watch her read it.", {
    x: G.ML, y: dv + 0.1, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 15, color: C.WARM, align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 1 min.\n" +
      "[SAY] Step one. The desk before the mail: we make her project first, then we connect the accounts.\n" +
      "[DO] Watch the pip in the top right. Two of four stations lit. By the end of the hour all four are.\n" +
      "[NEXT] Setup, then two prompts."
  );
}
{
  const { s } = slide("light");
  B.progressPip(s, PIP1, "light", "DOCUMENT · TEST");
  B.eyebrow(s, "Step one  ·  first impressions", "light", { narrow: true });
  const y = B.title(s, "Create her project, then connect.", "light");

  B.panelList(s, {
    x: G.COL_L.x, y: y + 0.02, w: G.COL_L.w, mode: "light", size: 14, gap: 0.16,
    label: "The setup", labelSize: 13, labelColor: C.GOLD_D,
    items: [
      "Projects, then New project. Name it Donna.",
      "Settings, then Connectors.",
      "Connect Gmail, Calendar, and Drive. All three, now.",
    ],
    tag: "s12 panel",
  });
  s.addText("Outlook: Microsoft 365 covers mail, calendar, and files in one.", {
    x: G.COL_L.x, y: y + 2.06, w: G.COL_L.w, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 12, italic: true, color: C.MUTE, valign: "top",
  });

  let py = B.promptBlock(s, {
    x: G.COL_R.x, y: y + 0.02, w: G.COL_R.w, mode: "light",
    label: "Prompt 1 · the question",
    lines: B.wrapMono(
      "What landed in my inbox in the last 24 hours that actually needs ME? Top 5, one line each.",
      44
    ),
    tag: "s12 p1",
  });
  B.promptBlock(s, {
    x: G.COL_R.x, y: py + 0.24, w: G.COL_R.w, mode: "light",
    label: "Prompt 2 · the first draft",
    lines: B.wrapMono(
      "Draft a reply to #1. Under 100 words, warm but decisive. Save it as a draft in my email so I can review it there. Do not send it.",
      44
    ),
    tag: "s12 p2",
  });
  s.addNotes(
    "[TIMING] 8 min.\n" +
      "[SAY] Project first, then connectors. The desk before the mail.\n" +
      "[DO] Walk the room during connections. Give prompt 1 a beat: the room goes quiet when Claude answers from their real inbox.\n" +
      "[WATCH] The classic failure is signing into the personal Google account instead of work. If a connector reads Connected but Claude cannot see mail, quit Claude fully and reopen. Fixes it nine times out of ten.\n" +
      "[NEXT] Hold at the checkpoint."
  );
}
{
  const { s } = slide("dark");
  B.progressPip(s, PIP1, "dark", "DOCUMENT · TEST");
  B.eyebrow(s, "Step one  ·  checkpoint", "dark", { narrow: true });
  B.diamond(s, 6.612, 2.24, 0.14, C.GOLD);
  const chk1 = B.statement(s, "A draft you didn’t write is waiting in your drafts folder.", "dark", {
    size: 40, w: 10.4, y: 2.62,
  });
  s.addText("The interview is over. She’s hired. Now we train her.", {
    x: G.ML, y: chk1 + 0.24, w: G.W, h: 0.34, margin: 0,
    fontFace: F.BODY, fontSize: 17, bold: true, color: C.GOLD_L,
    align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 6 min of working time lands here.\n" +
      "[SAY] Nothing until every laptop is there.\n" +
      "[DO] Run it live on your own screen first, then hold until every laptop shows five lines and a draft. Nobody moves on.\n" +
      "[WATCH] If a connector is stuck: disconnect, reconnect, confirm the account. If the network is stuck, keep the energy up and pair people.\n" +
      "[NEXT] Step two, and this is the one that matters."
  );
}

// ======================  14 to 16. STEP 2  (pip: REVISE)
const PIP2 = ["REVISE"];
{
  const { s } = slide("dark", { page: false });
  B.progressPip(s, PIP2, "dark", "REVISE");
  s.addText("STEP TWO", {
    x: G.ML, y: 2.68, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 14, bold: true, charSpacing: 2.0,
    color: C.GOLD_L, align: "center", valign: "middle",
  });
  const dv = B.statement(s, "The triage desk.", "dark", { size: 48, w: 10.2, y: 3.1 });
  s.addText("Teach her your rules once, and never explain them again.", {
    x: G.ML, y: dv + 0.1, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 15, color: C.WARM, align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 1 min.\n" +
      "[SAY] Step two is the document. Everything else today is plumbing.\n" +
      "[DO] Pip moves to REVISE.\n" +
      "[NEXT] Four blanks, and they are the only editing anyone does all day."
  );
}
{
  const { s } = slide("light");
  B.progressPip(s, PIP2, "light", "REVISE");
  B.eyebrow(s, "Step two  ·  the triage desk", "light", { narrow: true });
  const y = B.title(s, "This is the document.", "light");

  const pw = 7.3;
  B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Project instructions · fill 4 blanks",
    lines: [
      'You are Donna, my inbox triage assistant.',
      'When I say "triage my inbox":',
      "1. Review my inbox (default: the last 24 hours).",
      "2. Sort every thread into three buckets:",
      "   RED, NEEDS ME - my VIPs, plus my #1 project:",
      "   [ADD 3-5 NAMES + EMAILS] . [ADD YOUR #1 DEAL]",
      "   YELLOW, DELEGATE - work my team owns:",
      '   [ADD 1-3 DELEGATES + LANES, e.g. "Sam: billing"]',
      "   GRAY, IGNORE - newsletters, cold outreach, noise.",
      "3. Show me ONE table: sender, subject, bucket, why,",
      "   next move.",
      "4. Draft replies for REDs (my voice: [ADD 3 WORDS])",
      "   and handoff notes for YELLOWs. Save to Drafts.",
      "Never send anything. Never delete. Drafts only.",
    ],
    highlights: [
      "[ADD 3-5 NAMES + EMAILS] . [ADD YOUR #1 DEAL]",
      '[ADD 1-3 DELEGATES + LANES, e.g. "Sam: billing"]',
      "[ADD 3 WORDS]",
    ],
    tag: "s15 prompt",
  });

  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  B.label(s, "The four blanks", "light", {
    x: rx, w: rw, y: y + 0.06, size: 13, color: C.GOLD_D, charSpacing: 1.6,
  });
  const blanks = [
    ["Your always-red list", "the people who jump every queue"],
    ["Your #1 deal", "the one project that is always urgent"],
    ["Your delegates and lanes", "one to three people, and what each owns"],
    ["Your voice, in 3 words", "warm, brief, decisive is a fine start"],
  ];
  let by = y + 0.5;
  blanks.forEach(([name, hint]) => {
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
    B.assertFits("s15 blank", rx, by, rw, nh + hh, G.BODY_BOT);
    by += nh + hh + 0.2;
  });
  s.addNotes(
    "[TIMING] 10 min.\n" +
      "[SAY] Four blanks, and they are the only editing you do all day. The delegates blank is the one the pilot group left empty, so call it out: yellow only works if she knows who owns what.\n" +
      "[DO] Give them six to eight quiet minutes to fill blanks. Circulate. Then everyone runs: Triage my inbox.\n" +
      "[WATCH] Someone will triage from OUTSIDE the project and get generic results. Make sure they are inside the Donna project.\n" +
      "[NEXT] The checkpoint, and the ritual."
  );
}
{
  const { s } = slide("dark");
  B.progressPip(s, PIP2, "dark", "REVISE");
  B.eyebrow(s, "Step two  ·  checkpoint", "dark", { narrow: true });
  const chk2 = B.statement(s, "You get one table instead of an inbox.", "dark", { size: 40, w: 10.4, y: 1.9 });

  const pw = 6.0;
  const pb = B.promptBlock(s, {
    x: (G.SLIDE_W - pw) / 2, y: chk2 + 0.5, w: pw, mode: "dark",
    label: "The entire daily ritual, from now on",
    lines: ["Triage my inbox."],
    tag: "s16 prompt",
  });
  s.addText("Chat is a conversation. A project is a standing arrangement.", {
    x: G.ML, y: pb + 0.42, w: G.W, h: 0.34, margin: 0,
    fontFace: F.BODY, fontSize: 17, bold: true, color: C.GOLD_L,
    align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 4 min.\n" +
      "[SAY] You will never re-explain your rules again. That is the difference between a chat and a project.\n" +
      "[DO] Everyone runs the one-sentence ritual inside the project. Hold until every screen shows a table.\n" +
      "[WATCH] Then the green light: yes, draft the reds and the yellow handoffs.\n" +
      "[NEXT] Step three. The document leaves your hands."
  );
}

// ==================  17 to 21. STEP 3  (pip: OPERATE, then all four)
const PIP3 = ["OPERATE"];
{
  const { s } = slide("dark", { page: false });
  B.progressPip(s, PIP3, "dark", "OPERATE");
  s.addText("STEP THREE", {
    x: G.ML, y: 2.68, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 14, bold: true, charSpacing: 2.0,
    color: C.GOLD_L, align: "center", valign: "middle",
  });
  const dv = B.statement(s, "Donna, full time.", "dark", { size: 48, w: 10.2, y: 3.1 });
  s.addText("The document leaves your hands and goes on the clock.", {
    x: G.ML, y: dv + 0.1, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 15, color: C.WARM, align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 1 min.\n" +
      "[SAY] Step three is where it stops being a conversation and becomes an employee.\n" +
      "[DO] Pip moves to OPERATE.\n" +
      "[NEXT] She writes her own playbook."
  );
}
{
  const { s } = slide("light");
  B.progressPip(s, PIP3, "light", "OPERATE");
  B.eyebrow(s, "Step three  ·  her playbook", "light", { narrow: true });
  const y = B.title(s, "She writes her own playbook.", "light");

  const pw = 7.3;
  B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Paste inside your Donna project",
    lines: B.wrapMono(
      "Turn this project's triage instructions into a reusable " +
        "skill file called donna-replies. Use everything you " +
        'already know from this project: my VIPs, my delegates, ' +
        'my voice, my rules. Include the line "Never send. ' +
        'Never delete. No exceptions." Then give me the finished ' +
        "SKILL.md as a file I can download.",
      44
    ),
    tag: "s18 prompt",
  });

  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  B.label(s, "Then the handoff", "light", {
    x: rx, w: rw, y: y + 0.06, size: 13, color: C.GOLD_D, charSpacing: 1.6,
  });
  const beats = [
    "She writes the file.",
    "You download it. The file card has a download arrow.",
    "Cowork, then Skills, then Add skill, then upload it.",
  ];
  let by = y + 0.56;
  beats.forEach((t, i) => {
    s.addText(String(i + 1), {
      x: rx, y: by - 0.03, w: 0.4, h: 0.38, margin: 0,
      fontFace: F.DISPLAY, fontSize: 24, bold: true, color: C.GOLD_D, valign: "middle",
    });
    const h = B.boxH(t, rw - 0.5, 15, "arial");
    s.addText(t, {
      x: rx + 0.5, y: by, w: rw - 0.5, h, margin: 0,
      fontFace: F.BODY, fontSize: 15, color: C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
    by += Math.max(h, 0.38) + 0.38;
  });

  B.panelList(s, {
    x: G.ML, y: 4.86, w: pw, mode: "light", size: 13, gap: 0.12, pad: 0.26,
    items: [
      { text: "You should see donna-replies in your Cowork skills list before anyone touches scheduled tasks.", bold: true, color: C.GOLD_D },
    ],
    tag: "s18 panel",
  });
  s.addNotes(
    "[TIMING] 6 min.\n" +
      "[SAY] A skill written in chat does not exist in Cowork until you upload it. This is the step the pilot group missed, so go slow and demo it on screen.\n" +
      "[DO] Three beats. She writes it. You DOWNLOAD it. You UPLOAD it into Cowork skills. Wait until every screen shows donna-replies in the list.\n" +
      "[WATCH] No external URL is needed any more: the project already knows the VIPs, the delegates, the voice and the rules, so she writes the file from what she has.\n" +
      "[NEXT] Before we schedule it, the promise."
  );
}
{
  const { s } = slide(C.RED, { chrome: false });
  B.progressPip(s, PIP3, C.RED, "OPERATE");
  B.diamond(s, 6.617, 2.02, 0.12, C.WHITE);
  const nvr = B.statement(s, "She never sends. Ever.", C.RED, { size: 62, w: 11.0, y: 2.6 });
  s.addText(
    "Every reply and every handoff note lands in your drafts and waits for your say-so. She never deletes anything either.",
    {
      x: 1.9, y: nvr + 0.1, w: 9.53, h: 0.5, margin: 0,
      fontFace: F.BODY, fontSize: 15, color: C.WHITE,
      align: "center", valign: "top", lineSpacingMultiple: 1.16,
    }
  );
  s.addText('Written into the skill itself: “Never send. Never delete. No exceptions.”', {
    x: 1.9, y: nvr + 0.74, w: 9.53, h: 0.32, margin: 0,
    fontFace: F.BODY, fontSize: 13, italic: true, color: C.WHITE,
    align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 1 min.\n" +
      "[SAY] Say it twice, verbatim: she never sends. Ever.\n" +
      "[DO] Slow down here. This is the trust slide, and it answers the fear nobody has said out loud yet: what if it emails a client?\n" +
      "[WATCH] It cannot. Drafting and sending are different permissions, and this skill only ever drafts. You are the send button.\n" +
      "[NEXT] Now give her the evening shift."
  );
}
{
  const { s } = slide("light");
  B.progressPip(s, PIP3, "light", "OPERATE");
  B.eyebrow(s, "Step three  ·  the evening shift", "light", { narrow: true });
  const y = B.title(s, "Give her the 4:30 shift.", "light");

  const pw = 7.3;
  B.promptBlock(s, {
    x: G.ML, y: y + 0.02, w: pw, mode: "light",
    label: "Cowork · scheduled tasks · new task",
    lines: [
      "Every weekday at 4:30 PM, use my donna-replies skill:",
      "1. Triage today's inbox; save red replies and yellow",
      "   handoffs to my Drafts.",
      '2. Write my Daily Briefing doc, "Daily Briefing:',
      '   [today’s date]":',
      "   . the 5 things that need ME",
      "   . the replies you drafted",
      "   . what you ignored and why",
      "   . my first meeting tomorrow",
      '3. Save it to my Drive in a folder "Donna Briefings".',
      '4. Create a calendar event today 4:55-5:00 PM,',
      '   "Briefing with Donna", doc link in the description,',
      "   reminder 1 minute before.",
      "Also: do a dry run for today RIGHT NOW.",
    ],
    tag: "s20 prompt",
  });

  const rx = G.ML + pw + 0.4;
  const rw = G.ML + G.W - rx;
  const ladder = [
    ["4:30", "she works"],
    ["4:54", "you are notified"],
    ["4:55", "a five-minute read"],
  ];
  let ly = y + 0.1;
  ladder.forEach(([t, d]) => {
    s.addText(t, {
      x: rx, y: ly, w: 1.32, h: 0.46, margin: 0,
      fontFace: F.DISPLAY, fontSize: 28, bold: true, color: C.GOLD_D, valign: "middle",
    });
    s.addText(d, {
      x: rx + 1.4, y: ly, w: rw - 1.4, h: 0.46, margin: 0,
      fontFace: F.BODY, fontSize: 13, color: C.INK, valign: "middle",
    });
    ly += 0.56;
  });

  B.panelList(s, {
    x: rx, y: ly + 0.14, w: rw, mode: "light", size: 12, gap: 0.12, pad: 0.24,
    label: "Gmail vs Outlook", labelSize: 12, labelColor: C.GOLD_D,
    items: [
      "Google Calendar sends a true email reminder one minute before.",
      "Microsoft 365 sends a calendar notification. Both get the 4:54 nudge.",
    ],
    tag: "s20 panel",
  });
  s.addNotes(
    "[TIMING] 4 min.\n" +
      "[SAY] The last line of that prompt is the finale: a dry run, right now.\n" +
      "[DO] Grab the prompt from the site rather than retyping. If someone cannot find scheduled tasks, ask Claude where they are; the area moved in a recent update.\n" +
      "[WATCH] Gmail attaches a true EMAIL reminder. Outlook gets a calendar notification instead, because Microsoft Graph cannot set email reminders on events. Verified. Say it plainly rather than promising something Outlook cannot do.\n" +
      "[NEXT] Everybody watch their screen."
  );
}
{
  const { s } = slide("dark");
  B.progressPip(s, ["DOCUMENT", "TEST", "REVISE", "OPERATE"], "dark", "The loop is closed");
  B.eyebrow(s, "Step three  ·  the dry run", "dark", { narrow: true });
  s.addText("4:54 PM", {
    x: G.ML, y: 1.82, w: G.W, h: 1.16, margin: 0,
    fontFace: F.DISPLAY, fontSize: 72, bold: true, color: C.GOLD_L,
    align: "center", valign: "middle",
  });
  const dry = B.statement(s, "Her first briefing arrives before you leave the room.", "dark", {
    size: 32, w: 10.4, y: 3.1,
  });
  s.addText(
    "The trick: Claude never emails you. Your calendar does. The briefing lands from a sender you already trust.",
    {
      x: 1.9, y: dry + 0.16, w: 9.53, h: 0.5, margin: 0,
      fontFace: F.BODY, fontSize: 15, color: C.WARM,
      align: "center", valign: "top", lineSpacingMultiple: 1.16,
    }
  );
  B.caption(s, "Four stations lit. That is the flywheel, running on your inbox.", "dark", {
    bold: true, color: C.GOLD_L, align: "center",
  });
  s.addNotes(
    "[TIMING] 3 min.\n" +
      "[SAY] Nothing. Let the laptops ping.\n" +
      "[DO] The closing moment of the build: everyone watches the dry run land. Doc in the Donna Briefings folder, event on today's calendar, drafts waiting. Hold the silence.\n" +
      "[WATCH] Point at the pip: all four stations are lit for the first time. They just ran the Amazon execution flywheel on their own inbox. That is the payoff of the whole device.\n" +
      "[NEXT] Then the reframe: this was never about email."
  );
}

// ==================================  22. THE PIVOT  (dark)
{
  const { s } = slide("dark");
  let y = B.statement(s, "This was never about email.", "dark", { size: 48, w: 11.0, y: 2.0 });
  const bw = 9.4;
  const bodyBot = B.body(
    s,
    "You automated a workflow today by writing plain English. Rules became a project, the project became a skill, and the skill got a schedule.",
    "dark",
    { x: (G.SLIDE_W - bw) / 2, w: bw, y: y + 0.3, size: 15, align: "center", tag: "s22 body" }
  );
  s.addText("Email was the rehearsal. The same flywheel runs any workflow you can describe in words.", {
    x: (G.SLIDE_W - bw) / 2, y: bodyBot + 0.34, w: bw, h: 0.5, margin: 0,
    fontFace: F.BODY, fontSize: 17, bold: true, color: C.GOLD_L,
    align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] Recap the flywheel with THEIR artifacts: the document they wrote, the skill file they own, the schedule it now runs on. They did not learn a tool today. They ran the same mechanism that ran AWS, on their own inbox.\n" +
      "[DO] Pause here, then open the floor.\n" +
      "[NEXT] Two topics for discussion, and the first one is about them."
  );
}

// ==============================  23. DISCUSSION TOPIC ONE  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The discussion  ·  topic one", "light");
  const y = B.title(s, "How did your quadrant experience that?", "light");

  const cells = [
    ["ACCURACY", "Where did you find the non-determinism, and what would you make it prove before you trusted it?"],
    ["TIME", "What is the job description you just watched someone need, and who is it?"],
    ["TRUST", "Where did this get close to a relationship you would not hand over?"],
    ["VISION", "What was the second thing on your list before I finished the first step?"],
  ];
  const cw = (G.W - 0.4) / 2;
  const chh = 1.5;
  cells.forEach(([name, q], i) => {
    const x = G.ML + (i % 2) * (cw + 0.4);
    const cy = y + 0.1 + Math.floor(i / 2) * (chh + 0.3);
    B.card(s, { x, y: cy, w: cw, h: chh, mode: "light", tag: "s23 card" });
    s.addText(name, {
      x: x + 0.3, y: cy + 0.24, w: cw - 0.6, h: 0.3, margin: 0,
      fontFace: F.BODY, fontSize: 15, bold: true, charSpacing: 1.4, color: C.GOLD_D, valign: "top",
    });
    const qh = B.boxH(q, cw - 0.6, 14, "arial");
    s.addText(q, {
      x: x + 0.3, y: cy + 0.62, w: cw - 0.6, h: qh, margin: 0,
      fontFace: F.BODY, fontSize: 14, color: C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
  });

  B.caption(s, "Every one of you sat through a different workshop. That is the point.", "light", {
    bold: true, color: C.GOLD_D,
  });
  s.addNotes(
    "[TIMING] 7 min.\n" +
      "[SAY] Take the quadrants in turn. Each one saw a different hour, and the four readings together are more useful than any single one.\n" +
      "[DO] Facilitate, do not lecture. Three or four answers per quadrant.\n" +
      "[WATCH] The VISION answers are your pipeline for the next workshop. Write them down.\n" +
      "[NEXT] Second topic: where the flywheel turns next."
  );
}

// ==============================  24. DISCUSSION TOPIC TWO  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The discussion  ·  topic two", "light");
  const y = B.title(s, "Where does this flywheel turn next?", "light");

  B.flywheel(s, {
    cx: 3.02, band: { top: y + 0.06, bottom: 5.5 }, mode: "light", nodeD: 0.48,
    hub: { label: ["THE", "DOCUMENT"], fill: C.RED, textColor: C.WHITE },
    stations: EXEC,
    legend: null,
    bottom: 5.56,
  });

  const rx = 6.1;
  const rw = G.ML + G.W - rx;
  B.panelList(s, {
    x: rx, y: y + 0.02, w: rw, mode: "light", size: 14, gap: 0.18,
    items: [
      { label: "DOCUMENT:", text: "What do you re-explain to somebody every single week?" },
      { label: "TEST:", text: "What arrives daily that somebody else summarizes for you?" },
      { label: "REVISE:", text: "Which decision waits on you only because the information is scattered?" },
      { label: "OPERATE:", text: "What would you want running at 4:30 tomorrow without you?" },
    ],
    tag: "s24 panel",
  });

  B.caption(s, "Answer any one of these out loud and you have just specified your next agent.", "light", {
    bold: true, color: C.GOLD_D,
  });
  s.addNotes(
    "[TIMING] 6 min.\n" +
      "[SAY] Same four stations, pointed at the rest of your business. Every one of these questions is a workflow somebody in this room is doing by hand.\n" +
      "[DO] Map each answer onto the flywheel out loud, so people hear their own use case become buildable.\n" +
      "[WATCH] Give one personal story: the two-calendar morning shift is your own daily driver, so say so.\n" +
      "[NEXT] What each of you does Monday."
  );
}

// ==================================  25. THE CALL TO ACTION  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "What to do Monday", "light");
  const y = B.title(s, "Four assignments. One per quadrant.", "light");

  const ctas = [
    ["TIME", "closed · tell", "Own the delegation.", "What priority is AI workflow for you, your S-team, and your company? Appoint a lead. Set a timeline."],
    ["ACCURACY", "closed · ask", "Harden the ground.", "Name the data, systems, and processes that must be trustworthy before we scale decisions on top of them."],
    ["TRUST", "open · ask", "Write the design principles.", "How does this help you, your leadership team, and your people flourish as human beings? You hold the adoption criteria."],
    ["VISION", "open · tell", "Draw the flywheels.", "Three to five years out: how is the business run, what is automated, what reaches the S-team, the O-team, directors, managers?"],
  ];
  const cw = (G.W - 0.4) / 2;
  const chh = 1.58;
  ctas.forEach(([name, axis, imp, detail], i) => {
    const x = G.ML + (i % 2) * (cw + 0.4);
    const cy = y + 0.06 + Math.floor(i / 2) * (chh + 0.24);
    B.card(s, { x, y: cy, w: cw, h: chh, mode: "light", tag: "s25 card", bottom: 5.44 });
    s.addText(
      [
        { text: name + "  ", options: { fontFace: F.BODY, fontSize: 14, bold: true, charSpacing: 1.4, color: C.GOLD_D } },
        { text: axis, options: { fontFace: F.BODY, fontSize: 11, italic: true, color: C.MUTE } },
      ],
      { x: x + 0.28, y: cy + 0.2, w: cw - 0.56, h: 0.26, margin: 0, valign: "middle" }
    );
    s.addText(imp, {
      x: x + 0.28, y: cy + 0.5, w: cw - 0.56, h: 0.28, margin: 0,
      fontFace: F.BODY, fontSize: 14, bold: true, color: C.INK, valign: "top",
    });
    const dh = B.boxH(detail, cw - 0.56, 12, "arial");
    s.addText(detail, {
      x: x + 0.28, y: cy + 0.82, w: cw - 0.56, h: dh, margin: 0,
      fontFace: F.BODY, fontSize: 12, color: C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
  });

  const band = { x: G.ML, y: 5.5, w: G.W, h: 0.6 };
  s.addShape("rect", { ...band, fill: { color: C.INK }, line: { type: "none" } });
  s.addText(
    [
      { text: "AND HERE IS THE USEFUL PART:  ", options: { fontFace: F.BODY, fontSize: 13, bold: true, charSpacing: 1.2, color: C.GOLD_L } },
      { text: "each of these four creates tension for the other three. That tension is your requirement set, your governance, and your strategic direction. You need all four in the room.", options: { fontFace: F.BODY, fontSize: 13, color: C.PAPER } },
    ],
    { x: band.x + 0.32, y: band.y, w: band.w - 0.64, h: band.h, margin: 0, valign: "middle" }
  );
  s.addNotes(
    "[TIMING] 3 min.\n" +
      "[SAY] Four assignments, and they are deliberately different. Read the one for your quadrant.\n" +
      "[DO] Land the band at the bottom hard. Each of these four executives creates tension for the other three, and that tension is not dysfunction. It is the requirement set, the governance, and the strategic direction of the organization.\n" +
      "[WATCH] If the room is all one quadrant, name the missing ones out loud. A company with no TRUST executive scales fast and breaks relationships. A company with no TIME executive never ships.\n" +
      "[NEXT] Send-off."
  );
}

// ==============================================  26. CLOSE  (dark)
{
  const { s } = slide("dark", { chrome: false });
  B.ring(s, { cx: 6.667, cy: 1.52, d: 1.3, mark: "D" });
  const closeBot = B.quoteCard(s, {
    y: 2.44,
    w: 9.6,
    quote: "“If you were ever lucky enough to have me, you wouldn’t want to share.”",
    attribution: "— DONNA PAULSEN, SUITS",
    size: 24,
  });
  s.addText("Yours starts tomorrow at 4:54.", {
    x: G.ML, y: closeBot + 0.34, w: G.W, h: 0.72, margin: 0,
    fontFace: F.DISPLAY, fontSize: 40, bold: true, color: C.PAPER,
    align: "center", valign: "middle",
  });
  s.addText("denise@denisegosnell.ai", {
    x: G.ML, y: closeBot + 1.16, w: G.W, h: 0.28, margin: 0,
    fontFace: F.BODY, fontSize: 12, color: C.WARM, align: "center", valign: "middle",
  });
  B.skyline(s, 7.1);
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] Tomorrow at 4:54 the briefing arrives on its own for the first time. When it does, that is Donna saying she has got it from here.\n" +
      "[DO] Questions any time: denise@denisegosnell.ai.\n" +
      "[WATCH] The workshop resources are NOT on a public link right now. Do not promise a URL from the stage. If someone asks for the prompts, offer to email them.\n" +
      "[NEXT] Done. You're weird. We'll be friends."
  );
}

// ====================================================================== write
const OUT = "decks/build-your-own-donna-v2.pptx";
pres.writeFile({ fileName: OUT }).then(() => {
  console.log(`\nDeck B written: ${OUT}`);
  console.log(`   slides: ${MODES.length}`);
  console.log(`   mode sequence: ${MODES.join(" ")}`);
  let run = 1;
  let worst = 1;
  for (let i = 1; i < MODES.length; i++) {
    run = MODES[i] === MODES[i - 1] ? run + 1 : 1;
    worst = Math.max(worst, run);
  }
  console.log(`   longest same-mode run: ${worst} (must be <= 3)`);
  console.log(`   opens ${MODES[0]}, closes ${MODES[MODES.length - 1]} (both must be D)`);
  B.reportViolations("Deck B");
  B.checkPresets(OUT);
});
