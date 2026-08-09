// Deck A: SigCompass Reveal and Product Tour
// 21 slides, 50 minutes (1:30 to 2:20). Reserved accent: TEAL. ZERO Suits.
// Spec: FABLE-DECK-INSTRUCTIONS.md section 4.

const pptxgen = require("pptxgenjs");
const B = require("./brand");
const { C, F, G } = B;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // MUST precede any addSlide
pres.author = "Denise Gosnell";
pres.company = "Signature Travel Network";
pres.title = "SigCompass Reveal and Product Tour";

const DECK = "SIGCOMPASS REVEAL";
const MODES = [];

function slide(mode, { chrome = true, page = true } = {}) {
  const s = pres.addSlide();
  const p = B.bg(s, mode);
  MODES.push(mode === "dark" ? "D" : mode === "light" ? "L" : "A");
  if (chrome) B.chrome(s, mode, DECK, page ? MODES.length : null);
  return { s, p, n: MODES.length };
}

// ===========================================================  1. TITLE  (dark)
{
  const { s } = slide("dark", { chrome: false });
  B.ring(s, { cx: 6.667, cy: 1.72, d: 1.6, mark: "compass" });
  const cardBot = B.quoteCard(s, {
    y: 2.78,
    w: 8.6,
    quote: "One cooperative. One direction.",
    attribution: "SIGNATURE TRAVEL NETWORK",
    color: C.INK,
    size: 28,
  });
  s.addText("SIGCOMPASS", {
    x: 0.89, y: cardBot + 0.26, w: G.W, h: 0.62, margin: 0,
    fontFace: F.BODY, fontSize: 34, bold: true, charSpacing: 2.0,
    color: C.PAPER, align: "center", valign: "middle",
  });
  s.addText("The reveal, and the tour. Signature's executive data engine.", {
    x: 0.89, y: cardBot + 0.9, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 15, color: C.WARM,
    align: "center", valign: "middle",
  });
  s.addText("DENISE GOSNELL, PH.D.   ·   AUGUST 2026", {
    x: 0.89, y: cardBot + 1.3, w: G.W, h: 0.24, margin: 0,
    fontFace: F.BODY, fontSize: 10, charSpacing: 1.6,
    color: C.WARM, align: "center", valign: "middle",
  });
  B.horizonRule(s, 6.68);
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] The engine is real, it is running inside Signature's cloud, and in twenty minutes you are going to be driving it. Today has two halves. This first hour is the strategy: where we are pointing the business and how the data gets it there. After the break we do the execution side.\n" +
      "[DO] Let the room settle on the ring before you speak. Name the two halves of the afternoon so nobody wonders what the second session is.\n" +
      "[WATCH] Do not open with status or slide counts. Open with the claim that the engine is real.\n" +
      "[NEXT] Before we look at it, remember what we told you in February."
  );
}

// ==================================================  2. WHERE WE LEFT OFF (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "February 2026 · Closing the Loop", "light");
  const y = B.title(s, "We promised a revenue engine.", "light");

  B.label(s, "We said", "light", { x: G.COL_L.x, w: G.COL_L.w, y, size: 13, color: C.MUTE });
  B.label(s, "We shipped", "light", { x: G.COL_R.x, w: G.COL_R.w, y, size: 13, color: C.TEAL_D });

  const rows = [
    ["Start with the revenue decision", "Revenue is a live data product: funnel, suppliers, advisors, by travel month"],
    ["Build deep, not wide", "Three deep data products, not dashboards for everyone"],
    ["Automate the infrastructure", "AI-generated pipelines, rebuilt and re-verified on every change"],
    ["Secure, scalable, observable", "One AWS environment, PII governed at the API layer, self-verifying assertions"],
    ["87% of data projects never reach production", "This one is deployed, and you are about to use it"],
  ];
  let ry = y + 0.34;
  rows.forEach(([said, shipped]) => {
    const hL = B.boxH(said, G.COL_L.w - 0.34, 13, "arial");
    const hR = B.boxH(shipped, G.COL_R.w, 13, "arialBold");
    const h = Math.max(hL, hR);
    B.diamond(s, G.COL_L.x, ry + 0.07, 0.11, C.GOLD);
    s.addText(said, {
      x: G.COL_L.x + 0.34, y: ry, w: G.COL_L.w - 0.34, h: hL, margin: 0,
      fontFace: F.BODY, fontSize: 13, color: C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
    s.addText(shipped, {
      x: G.COL_R.x, y: ry, w: G.COL_R.w, h: hR, margin: 0,
      fontFace: F.BODY, fontSize: 13, bold: true, color: C.TEAL_D,
      valign: "top", lineSpacingMultiple: 1.16,
    });
    B.assertFits("s2 row", G.COL_L.x, ry, G.W, h, G.BODY_BOT);
    ry += h + 0.19;
  });
  B.citation(s, "Gartner. Signature data strategy, February 2026.", "light");
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] Left column is verbatim from what I put in front of you in February. Right column is what stands deployed today. The last row is the one that matters: most data programs die before production, and this one did not.\n" +
      "[DO] Read three rows, not five. Let them read the rest.\n" +
      "[WATCH] Do not get pulled into architecture here. If someone asks how, say we will show you in twenty minutes.\n" +
      "[NEXT] So why release it now, and why does it matter to you rather than to engineering?"
  );
}

// ===============================================  3. WHY NOW, statement  (dark)
{
  const { s } = slide("dark");
  let y = B.statement(
    s,
    "Twenty years of digital transformation gave you data. It never gave you a decision.",
    "dark",
    { size: 44, w: 11.0, y: 1.35 }
  );
  const w = 9.6;
  const s3bot = B.body(
    s,
    "Decisions are already being made across this business every day, by executives, advisors, leaders, and partners, whether the data is there or not. SigCompass exists to put the best available information in front of the person making the decision, at the moment they are making it.",
    "dark",
    { x: (G.SLIDE_W - w) / 2, w, y: y + 0.24, size: 15, tag: "s3 body" }
  );
  B.caption(
    s,
    "The art of a data strategy is not collecting more data. It is choosing which decisions we support first, and staying relentless about whether those decisions move revenue.",
    "dark",
    { bold: true, color: C.GOLD_L, align: "center", x: (G.SLIDE_W - w) / 2, w, y: s3bot + 0.4 }
  );
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] This is why we are releasing SigCompass now. Not because the build finished. Because decisions are being made today with fragmented information, and we can finally change that.\n" +
      "[DO] Pause after the headline. It is the thesis of the hour.\n" +
      "[WATCH] Resist listing features. The features come in the tour.\n" +
      "[NEXT] And here is where revenue actually shows up in a data program."
  );
}

// ============================================  4. FOUR STAGES OF DATA  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Where revenue actually shows up", "light");
  const y = B.title(s, "Revenue starts at stage three.", "light");

  const stages = [
    ["01", "REPORTING", "What happened.", false],
    ["02", "INSIGHT", "Why it happened.", false],
    ["03", "RECOMMENDATION", "What to do next.", true],
    ["04", "AUTOMATION", "Repeatable at scale.", true],
  ];
  const cy = y + 0.34;
  const ch = 2.34;
  stages.forEach(([num, name, desc, hot], i) => {
    const x = G.CARD4[i];
    const w = G.CARD4_W;
    B.card(s, { x, y: cy, w, h: ch, mode: "light", fill: hot ? C.INK : C.PAPER2, tag: "s4 card" });
    s.addText(num, {
      x: x + 0.26, y: cy + 0.2, w: w - 0.52, h: 0.6, margin: 0,
      fontFace: F.DISPLAY, fontSize: 34, bold: true,
      color: hot ? C.GOLD_L : C.MUTE, valign: "top",
    });
    s.addText(name, {
      x: x + 0.26, y: cy + 0.86, w: w - 0.52, h: 0.52, margin: 0,
      fontFace: F.BODY, fontSize: 13, bold: true, charSpacing: 1.0,
      color: hot ? C.PAPER : C.INK, valign: "top",
    });
    s.addText(desc, {
      x: x + 0.26, y: cy + 1.44, w: w - 0.52, h: 0.4, margin: 0,
      fontFace: F.BODY, fontSize: 13,
      color: hot ? C.PAPER : C.MUTE, valign: "top",
    });
    if (hot) B.diamond(s, x + w - 0.42, cy + 0.28, 0.11, C.TEAL);
  });

  const bx = G.CARD4[2];
  const bw = G.CARD4[3] + G.CARD4_W - bx;
  s.addText("REVENUE BEGINS HERE", {
    x: bx, y: cy + ch + 0.14, w: bw, h: 0.28, margin: 0,
    fontFace: F.BODY, fontSize: 14, bold: true, charSpacing: 1.6,
    color: C.TEAL_D, align: "center", valign: "middle",
  });

  B.caption(
    s,
    "Most data programs stall between stages one and two, cycling through reports and definitions without ever crossing into action. That is not a failure of intelligence. It is a failure of sequencing.",
    "light",
    { y: 5.22 }
  );
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] Reporting tells us what happened. Insight tells us why. Recommendation tells us what to do next. Automation makes it repeatable. All four matter, and revenue does not materially show up until the third one.\n" +
      "[DO] Point at the gap between card two and card three. That gap is where most programs die.\n" +
      "[WATCH] Someone will defend reporting. Agree with them: reporting is necessary and it is not sufficient.\n" +
      "[NEXT] Here are the three ways a program dies in that gap."
  );
}

// ==========================================  5. THREE WAYS IT DIES  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Why most of this fails", "light");
  const y = B.title(s, "Three ways a data program dies.", "light");

  const modes = [
    ["01", "TIME", "Slow infrastructure delays delivery until the business has already moved on."],
    ["02", "MONEY", "Investment keeps going in while the returns never arrive."],
    ["03", "PEOPLE", "Specialized teams are expensive, fragile, and hard to scale."],
  ];
  const cw = 2.72;
  const ch = 2.62;
  modes.forEach(([num, name, desc], i) => {
    const x = G.ML + i * (cw + 0.3);
    B.card(s, { x, y: y + 0.34, w: cw, h: ch, mode: "light", tag: "s5 card" });
    s.addText(num, {
      x: x + 0.26, y: y + 0.56, w: cw - 0.52, h: 0.58, margin: 0,
      fontFace: F.DISPLAY, fontSize: 32, bold: true, color: C.GOLD_D, valign: "top",
    });
    s.addText(name, {
      x: x + 0.26, y: y + 1.2, w: cw - 0.52, h: 0.3, margin: 0,
      fontFace: F.BODY, fontSize: 15, bold: true, charSpacing: 1.2, color: C.INK, valign: "top",
    });
    s.addText(desc, {
      x: x + 0.26, y: y + 1.56, w: cw - 0.52, h: 1.2, margin: 0,
      fontFace: F.BODY, fontSize: 12, color: C.INK, valign: "top", lineSpacingMultiple: 1.16,
    });
  });

  const sx = G.ML + 3 * (cw + 0.3) + 0.14;
  B.statCallout(s, {
    x: sx, y: y + 0.44, w: 13.333 - 0.89 - sx, mode: "light",
    value: "87%", size: 66,
    label: "of data science projects never reach production.",
    cite: "Gartner.", tag: "s5 stat",
  });

  B.caption(s, "Every choice in this strategy was made to dodge one of those three.", "light", {
    bold: true, color: C.TEAL_D, y: 5.24,
  });
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] These initiatives do not fail randomly and they do not fail quietly. They fail on time, on money, and on people. Every architectural choice we made was aimed at one of those three.\n" +
      "[DO] Say the 87% out loud once, then leave it alone. The number does the work.\n" +
      "[WATCH] Do not turn this into a vendor pitch. The point is that we knew the failure modes going in.\n" +
      "[NEXT] So here is the strategy in one picture."
  );
}

// ===========================  6. THE STRATEGY FLYWHEEL  (dark)  CENTREPIECE
{
  const { s } = slide("dark");
  B.eyebrow(s, "Signature's executive data strategy · the strategy flywheel", "dark");
  const y = B.title(s, "The strategy flywheel.", "dark");

  const CAP6 = 5.5; // caption band starts here
  B.flywheel(s, {
    cx: 4.3, band: { top: y, bottom: CAP6 - 0.14 }, nodeD: 0.62, mode: "dark",
    hub: { label: ["REVENUE", "GROWTH"], fill: C.TEAL, textColor: C.WHITE },
    stations: [
      { n: "01", name: "MORE BOOKINGS", legend: "Every booking is revenue today, and a record tomorrow." },
      { n: "02", name: "MORE DATA", legend: "Every booking and session enriches the shared asset." },
      { n: "03", name: "MORE PERSONAL", legend: "Advisors meet every client with full context." },
      { n: "04", name: "MORE BOOKINGS", legend: "Personal experiences convert. The loop widens." },
    ],
    legend: { x: 7.55, y: y + 0.06, w: 4.9 },
    bottom: CAP6,
  });

  B.caption(
    s,
    "Bookings create data, data creates personalization, and personalization creates bookings. Our job is to make data flow in a way that grows revenue.",
    "dark",
    { y: CAP6 }
  );
  s.addNotes(
    "[TIMING] 4 min.\n" +
      "[SAY] Walk it clockwise from the top. More bookings is the goal every one of you already has. Here is the part that is new: every booking is also data, data makes the recommendation personal, and a personal recommendation is what wins the next booking. Revenue growth sits in the middle because it is the output of the loop, not a stop on it.\n" +
      "[DO] Trace the circle with your hand. This is the one picture to remember from this hour.\n" +
      "[WATCH] Someone will ask whether this is just a recommendation engine. It is a recommendation engine that feeds itself, and the feeding is the strategy.\n" +
      "[NEXT] So why start with personalization and not somewhere else?"
  );
}

// ===================================  7. WHY PERSONALIZATION FIRST  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The lowest-risk place to start", "light");
  const y = B.title(s, "Recommendations have a track record.", "light");

  const stats = [
    ["10-15%", "increase in sales conversion from personalization.", "McKinsey."],
    ["~35%", "of Amazon's revenue is attributed to its recommendation engine.", "Amazon, publicly reported."],
    ["Faster", "time to booking and higher completion from AI-driven recommendations.", "Booking Holdings."],
  ];
  stats.forEach(([v, l, c], i) => {
    B.statCallout(s, {
      x: G.CARD3[i], y: y + 0.06, w: G.CARD3_W, mode: "light",
      value: v, size: 50, label: l, cite: c, tag: "s7 stat",
    });
  });

  const cy = 3.98;
  const colW = (G.W - 0.9) / 2;
  const lItems = [
    "The decision already exists today.",
    "No process has to change to get value.",
  ];
  const rItems = [
    "Measurable inside six months, against revenue.",
    "The longest record of paying for itself early.",
  ];
  const lh = Math.max(B.listH(lItems, colW, 13, 0.12), B.listH(rItems, colW, 13, 0.12));
  const cardH = 0.26 + 0.28 + 0.1 + lh + 0.26;
  B.card(s, { x: G.ML, y: cy, w: G.W, h: cardH, mode: "light", tag: "s7 card" });
  B.label(s, "Why this is the low-risk entry point", "light", {
    x: G.ML + 0.3, w: G.W - 0.6, y: cy + 0.24, size: 13, color: C.TEAL_D, charSpacing: 1.6,
  });
  B.diamondList(s, {
    x: G.ML + 0.3, y: cy + 0.64, w: colW, mode: "light", size: 13, gap: 0.12,
    items: lItems, bottom: cy + cardH,
  });
  B.diamondList(s, {
    x: G.ML + 0.3 + colW + 0.3, y: cy + 0.64, w: colW, mode: "light", size: 13, gap: 0.12,
    items: rItems, bottom: cy + cardH,
  });

  B.caption(
    s,
    "Not because recommendations are flashy. Because they have a documented history of paying for themselves early.",
    "light",
    {}
  );
  s.addNotes(
    "[TIMING] 4 min.\n" +
      "[SAY] Our hypothesis is straightforward. Deploy a unified recommendations product, starting with cruise, and we should be able to measure incremental revenue inside six months. That is not a hunch, it is the best documented data product in the industry.\n" +
      "[DO] Read the McKinsey number and the Amazon number. Skip the third unless someone pushes for more evidence.\n" +
      "[WATCH] The low-risk argument is the one that lands with owners: we are not asking anyone to change how they work.\n" +
      "[NEXT] That is the strategy. Now the harder half."
  );
}

// =============================================  8. DIVIDER  (dark)
{
  const { s } = slide("dark", { page: false });
  B.diamond(s, 6.612, 2.44, 0.11, C.GOLD);
  const divY = B.statement(s, "A flywheel is a picture until somebody turns it.", "dark", {
    size: 42, w: 10.2, y: 2.9,
  });
  s.addText("PART TWO   ·   MAKING THE FLYWHEEL TURN", {
    x: G.ML, y: divY + 0.1, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 15, bold: true, charSpacing: 2.0,
    color: C.GOLD_L, align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 1 min.\n" +
      "[SAY] Everything so far was direction. Direction is the easy half. The rest of this hour is about what makes the wheel actually turn inside a company of this size.\n" +
      "[DO] Breathe. This is the hinge of the deck.\n" +
      "[NEXT] So we turn the strategy into one loop the company can feel."
  );
}

// ==========================================  9. THE TURN  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "From strategy to operations", "light");
  const y = B.title(s, "From a picture to a rhythm.", "light");

  B.label(s, "A strategy is", "light", { x: G.COL_L.x, w: 5.9, y: y + 0.1, size: 15, color: C.MUTE });
  B.diamondList(s, {
    x: G.COL_L.x, y: y + 0.52, w: 5.9, mode: "light", size: 15, gap: 0.22,
    items: [
      "A direction everyone can name.",
      "A bet you can defend to owners.",
      "A picture on a slide.",
    ],
  });

  const rc = G.PANEL_R;
  B.panelList(s, {
    x: rc.x, y: y - 0.06, w: rc.w, mode: "light", size: 15, gap: 0.22,
    label: "An operating rhythm is", labelSize: 15, labelColor: C.TEAL_D,
    items: [
      "A number somebody owns.",
      "A weekly rhythm that shows whether it moved.",
      "A habit that survives you being on a plane.",
    ],
    tag: "s9 panel",
  });

  B.caption(
    s,
    "The strategy is agreed. What we build now is the weekly rhythm that makes the flywheel turn, and the shared awareness that keeps it turning.",
    "light",
    { bold: true, color: C.TEAL_D, y: 5.3 }
  );
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] A strategy you can name is not the same as a loop your company can feel. The left column is where we are. The right column is what we are building, and none of it is technology.\n" +
      "[DO] Ask the room which of the three things on the right they already have for any metric. Usually the answer is one.\n" +
      "[WATCH] Do not let this become a governance conversation yet. That is the second session.\n" +
      "[NEXT] And this next part is the exact point both sessions today share."
  );
}

// ================================  10. HANDSHAKE 1  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "The part both sessions share · digital transformation", "dark");
  const y = B.title(s, "This is the executive workflow.", "dark");

  let cy = B.body(
    s,
    "Everything we do this afternoon is one question asked twice: how does knowledge move across a business? Every company that has done this followed a recognizable pattern, and not one of them started at the end.",
    "dark",
    { y: y + 0.02, w: 10.6, size: 15, tag: "s10 body" }
  );

  cy += 0.26;
  B.panelList(s, {
    x: G.ML, y: cy, w: G.W, mode: "dark", size: 14, gap: 0.16, pad: 0.32,
    items: [
      {
        label: "STEP 1 · WHERE WE ARE ·",
        text: "Get the data flowing from offer to closed booking, and measure the confidence gap at every handoff.",
        diamond: C.TEAL,
      },
      { label: "STEP 2 · NEXT ·", text: "Put that flow in front of the person making the decision, at the moment they make it." },
      { label: "STEP 3 · THEN ·", text: "Let it run without anyone remembering to run it." },
    ],
    tag: "s10 panel",
  });

  B.caption(
    s,
    "We are at step 1. That is not a small ambition. It is the only one that makes steps 2 and 3 possible.",
    "dark",
    { bold: true, color: C.GOLD_L }
  );
  s.addNotes(
    "[TIMING] 3 min.\n" +
      "[SAY] Hold onto this slide. The second session at 2:40 is the same question from the execution side: how does what one person knows get out of their head and into an organization. Here we are asking it about booking data. There we ask it about your own workflow.\n" +
      "[DO] Say plainly that we are at step 1, and that we are not pretending otherwise.\n" +
      "[WATCH] The temptation is to promise step 3. Do not. Step 1 done well is the whole credibility of this program.\n" +
      "[NEXT] Same loop you already saw, now with instruments on it."
  );
}

// ================================  11. THE MEASURED FLYWHEEL  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The work ahead", "light");
  const y = B.title(s, "Same flywheel, now with numbers.", "light");

  const CAP11 = 5.34;
  B.flywheel(s, {
    cx: 4.2, band: { top: y, bottom: CAP11 - 0.16 }, nodeD: 0.58, mode: "light", gates: true,
    hub: { label: ["REVENUE", "GROWTH"], fill: C.TEAL, textColor: C.WHITE },
    stations: [
      { n: "01", name: "MORE BOOKINGS" },
      { n: "02", name: "MORE DATA" },
      { n: "03", name: "MORE PERSONAL" },
      { n: "04", name: "MORE BOOKINGS" },
    ],
    legend: null,
    bottom: CAP11,
  });

  B.label(s, "Where we point the work", "light", {
    x: G.COL_R.x, w: G.COL_R.w, y: y + 0.06, size: 13, color: C.TEAL_D, charSpacing: 1.6,
  });
  B.diamondList(s, {
    x: G.COL_R.x, y: y + 0.44, w: G.COL_R.w, mode: "light", size: 13, gap: 0.16,
    items: [
      { label: "Measure every handoff.", text: "Quoted to Confirmed to Travelled. Every stage, every month, by agency." },
      { label: "Find where we already win.", text: "The stages and segments converting above the rest." },
      { label: "Double down there first.", text: "Grow the flow where it is already flowing." },
      { label: "Then go after the losses.", text: "With a proven path to compare them against." },
    ],
  });

  s.addText("These four numbers are what we fill in together.", {
    x: G.ML, y: CAP11, w: 6.6, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 14, bold: true, color: C.TEAL_D,
    align: "center", valign: "middle",
  });

  B.caption(
    s,
    "Starting from what is broken means guessing which of many fixes to try. Starting from what is working leaves one or two obvious moves.",
    "light",
    { y: 5.76 }
  );
  s.addNotes(
    "[TIMING] 3 min.\n" +
      "[SAY] Same four stations. The difference is the four gates, and they are deliberately blank. These are the conversion numbers between one stage and the next, and filling them in is the work we do together over the next quarter.\n" +
      "[DO] Point at an empty gate and say: nobody in this room can tell me that number today. That is the gap.\n" +
      "[WATCH] Do not guess a number to be helpful. Blank is the honest answer and it is the more powerful slide.\n" +
      "[NEXT] And when we have them, here is how we decide what to do."
  );
}

// ======================================  12. WINS BEFORE LOSSES  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "How we pick the next move", "dark");
  const y = B.title(s, "Build off the wins.", "dark");

  B.label(s, "Start from a loss", "dark", { x: G.COL_L.x, w: 5.9, y: y + 0.1, size: 15, color: C.WARM });
  let ly = B.body(
    s,
    "Why did this stall? Price. Timing. Data quality. Follow-up. Supplier. Advisor load. The client simply changed their mind.",
    "dark",
    { x: G.COL_L.x, w: 5.9, y: y + 0.52, size: 15, tag: "s12 left" }
  );
  B.body(
    s,
    "Seven candidate causes. Every fix is a guess, and every guess costs a quarter.",
    "dark",
    { x: G.COL_L.x, w: 5.9, y: ly + 0.22, size: 15, bold: true, color: C.WARM, tag: "s12 left2" }
  );

  const rc = G.PANEL_R;
  const rItems = [
    "What did we do here that we are not doing everywhere else?",
    { text: "One or two answers. Both testable. Both already proven inside our own business.", bold: true, color: C.GOLD_L },
  ];
  B.panelList(s, {
    x: rc.x, y: y - 0.06, w: rc.w, mode: "dark", size: 15, gap: 0.2,
    label: "Start from a win", labelSize: 15, labelColor: C.GOLD_L,
    items: rItems, tag: "s12 panel",
  });

  B.caption(
    s,
    "This is why SigCompass leads with what is working. Wins narrow your choices. Losses multiply them.",
    "dark",
    { bold: true, color: C.GOLD_L, y: 4.94 }
  );
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] If you start from a loss you get seven plausible causes and you have to pick one. If you start from a win you get one or two answers, and both are already proven inside your own business. That is why the tool leads with what is working.\n" +
      "[DO] Count the seven causes on your fingers. The absurdity is the argument.\n" +
      "[WATCH] Someone will say we should fix what is broken. Agree, and say: after we know what winning looks like, so we have something to compare it to.\n" +
      "[NEXT] Which brings us to what your job actually is now."
  );
}

// =======================================  13. HANDSHAKE 2, COCKPIT  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The cockpit · what the job actually is now", "light");
  const y = B.title(s, "Learning to fly your ship.", "light");

  B.label(s, "A ship's cockpit reads", "light", { x: G.COL_L.x, w: 5.9, y: y + 0.1, size: 15, color: C.MUTE });
  B.diamondList(s, {
    x: G.COL_L.x, y: y + 0.52, w: 5.9, mode: "light", size: 15, gap: 0.2,
    items: ["Currents.", "Weather.", "Depth beneath the keel."],
  });

  const rc = G.PANEL_R;
  B.panelList(s, {
    x: rc.x, y: y - 0.06, w: rc.w, mode: "light", size: 15, gap: 0.16,
    label: "Your cockpit reads", labelSize: 15, labelColor: C.TEAL_D,
    items: [
      "Metrics.",
      "Weekly and monthly growth trends.",
      "The edge cases telling you what is working, and what is not.",
    ],
    tag: "s13 panel",
  });

  const by = 4.72;
  B.body(
    s,
    "Nobody reads one instrument once and knows where they are. You read them week over week, and the pattern appears: the waves, the currents, the headwinds actually moving your business.",
    "light",
    { y: by, w: G.W, size: 15, tag: "s13 body" }
  );
  B.caption(
    s,
    "That literacy is what we are starting to build together. Not the tool. The reading of it.",
    "light",
    { bold: true, color: C.TEAL_D, y: 5.6 }
  );
  s.addNotes(
    "[TIMING] 3 min.\n" +
      "[SAY] At the board walk-through I called it the tour of the ship before the voyage. This is the part where you learn to read the instruments. A captain does not read one gauge once. They read the panel week after week until the pattern is obvious, and then they change heading before anyone else notices the weather.\n" +
      "[DO] This is the emotional centre of the hour. Slow down and let the metaphor land.\n" +
      "[WATCH] Do not over-explain. One pass through the translation, then the week-over-week line.\n" +
      "[NEXT] So here is what the instrument panel is for."
  );
}

// ==================================  14. WHAT SIGCOMPASS IS FOR  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "So here is the point of the tool", "dark");
  const y = B.title(s, "SigCompass is your cockpit.", "dark");

  const items = [
    ["SEE THE FLOW", "Where offers become bookings, and where they stop."],
    ["SEE THE GAP", "Which handoff is leaking, by how much, this month against last."],
    ["SEE THE WIN", "Which agencies, advisors, suppliers, and segments convert above the rest."],
    ["ASK IN PLAIN ENGLISH", "The questions you would ask an analyst, answered from governed data."],
  ];
  const cw = (G.W - 0.4) / 2;
  const chh = 1.32;
  items.forEach(([name, desc], i) => {
    const x = G.ML + (i % 2) * (cw + 0.4);
    const cy = y + 0.1 + Math.floor(i / 2) * (chh + 0.3);
    B.card(s, { x, y: cy, w: cw, h: chh, mode: "dark", tag: "s14 card" });
    B.diamond(s, x + 0.3, cy + 0.34, 0.11, C.GOLD);
    s.addText(name, {
      x: x + 0.64, y: cy + 0.26, w: cw - 0.94, h: 0.3, margin: 0,
      fontFace: F.BODY, fontSize: 14, bold: true, charSpacing: 1.2, color: C.GOLD_L, valign: "middle",
    });
    s.addText(desc, {
      x: x + 0.64, y: cy + 0.62, w: cw - 0.94, h: 0.56, margin: 0,
      fontFace: F.BODY, fontSize: 13, color: C.PAPER, valign: "top", lineSpacingMultiple: 1.16,
    });
  });

  B.caption(
    s,
    "Then you start making adjustments on where you are driving. Let's go look at it.",
    "dark",
    { bold: true, color: C.GOLD_L, y: 5.84 }
  );
  s.addNotes(
    "[TIMING] 2 min.\n" +
      "[SAY] Four things, and they are the four things an instrument panel does. See the flow, see the gap, see the win, and ask it a question in your own words.\n" +
      "[DO] Read the four labels only. The descriptions are for the people reading ahead.\n" +
      "[WATCH] Keep this short. The product answers this better than the slide does.\n" +
      "[NEXT] Let's take the tour."
  );
}

// =============================================  15. DIVIDER, TOUR  (dark)
{
  const { s } = slide("dark", { page: false });
  B.diamond(s, 6.612, 2.5, 0.11, C.GOLD);
  const tourY = B.statement(s, "Let's take the tour.", "dark", { size: 46, w: 10.2, y: 2.96 });
  s.addText("PART THREE   ·   SIGCOMPASS, LIVE", {
    x: G.ML, y: tourY, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 15, bold: true, charSpacing: 2.0,
    color: C.GOLD_L, align: "center", valign: "middle",
  });
  s.addText("Interrupt freely. It is your engine.", {
    x: G.ML, y: tourY + 0.42, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 13, italic: true, color: C.WARM,
    align: "center", valign: "middle",
  });
  s.addNotes(
    "[TIMING] 1 min.\n" +
      "[SAY] Twelve minutes, five stops. Interrupt whenever you want, and at the last stop somebody else is driving.\n" +
      "[DO] Get the live environment on screen before you leave this slide.\n" +
      "[NEXT] Here is the map of the five stops."
  );
}

// =============================================  16. THE TOUR MAP  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Five stops", "light");
  const y = B.title(s, "What to watch for at each stop.", "light");

  const stops = [
    ["1", "Sign in from SigNet", "One click, single sign-on, role-based access.", "No new passwords, no new portals."],
    ["2", "Data quality", "Client-record coverage by agency and advisor.", "Where cleanup pays back fastest."],
    ["3", "Revenue", "Quoted, Confirmed, Travelled by travel month. Suppliers by name.", "The shape of the funnel, and where it narrows."],
    ["4", "Booking journey", "Journey analytics and hot leads by family.", "The stage where a personal touch changes the outcome."],
    ["5", "Ask it anything", "Plain-English questions over the same governed data.", "That the answer and the chart come from one source."],
  ];
  let ry = y + 0.06;
  stops.forEach(([num, name, desc, watch]) => {
    s.addText(num, {
      x: G.ML, y: ry, w: 0.44, h: 0.34, margin: 0,
      fontFace: F.DISPLAY, fontSize: 24, bold: true, color: C.GOLD_D, valign: "top",
    });
    const nw = 2.7;
    s.addText(name, {
      x: G.ML + 0.5, y: ry + 0.03, w: nw, h: 0.3, margin: 0,
      fontFace: F.BODY, fontSize: 15, bold: true, color: C.INK, valign: "top",
    });
    const dw = 4.4;
    const dh = B.boxH(desc, dw, 13, "arial");
    s.addText(desc, {
      x: G.ML + 0.5 + nw + 0.16, y: ry + 0.05, w: dw, h: dh, margin: 0,
      fontFace: F.BODY, fontSize: 13, color: C.INK, valign: "top", lineSpacingMultiple: 1.14,
    });
    const wx = G.ML + 0.5 + nw + 0.16 + dw + 0.2;
    const ww = G.ML + G.W - wx;
    const wh = B.boxH("Watch for: " + watch, ww, 13, "arialItalic");
    s.addText(
      [
        { text: "Watch for: ", options: { fontFace: F.BODY, fontSize: 13, bold: true, italic: true, color: C.TEAL_D } },
        { text: watch, options: { fontFace: F.BODY, fontSize: 13, italic: true, color: C.TEAL_D } },
      ],
      { x: wx, y: ry + 0.05, w: ww, h: wh, margin: 0, valign: "top", lineSpacingMultiple: 1.14 }
    );
    const rh = Math.max(0.38, dh, wh);
    B.assertFits("s16 row", G.ML, ry, G.W, rh, G.BODY_BOT);
    ry += rh + 0.24;
  });

  s.addNotes(
    "[TIMING] 2 min, then eight minutes live.\n" +
      "[SAY] Five stops, and at each one I will tell you what to watch for. Stop five is where one of you takes the keyboard.\n" +
      "[DO] Leave this up while people settle, then switch to the live product.\n" +
      "[WATCH] Stop 4 renders representative sample data until the upstream event stream lands. Say that out loud BEFORE you show the tab, exactly as we did on the walkthrough.\n" +
      "[NEXT] Switch to the live environment."
  );
}

// ==========================  17. LIVE DEMO HOLDER  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Live", "light");
  const y = B.title(s, "SigCompass.", "light");

  s.addShape("rect", {
    x: 0.89, y: 2.2, w: 11.56, h: 3.06,
    fill: { type: "none" },
    line: { color: C.GOLD, width: 0.75, transparency: 40 },
  });
  s.addText("Screenshot placeholder. Drop in the five tour captures before presenting.", {
    x: 0.89, y: 5.3, w: 11.56, h: 0.26, margin: 0,
    fontFace: F.BODY, fontSize: 11, italic: true, color: C.MUTE,
    align: "center", valign: "middle",
  });

  B.card(s, { x: 0.89, y: 5.66, w: 11.56, h: 0.46, mode: "light", tag: "s17 card" });
  s.addText(
    [
      { text: "IF THE NETWORK MISBEHAVES:  ", options: { fontFace: F.BODY, fontSize: 12, bold: true, charSpacing: 1.4, color: C.GOLD_D } },
      { text: "captures of all five stops live in this frame. The tour survives a dead network.", options: { fontFace: F.BODY, fontSize: 12, color: C.INK } },
    ],
    { x: 1.19, y: 5.66, w: 10.96, h: 0.46, margin: 0, valign: "middle" }
  );

  s.addNotes(
    "[TIMING] 8 min. This is the live block.\n" +
      "[SAY] Nothing. Drive the product.\n" +
      "[DO] Switch to the live environment. Five stops, roughly two minutes each. Hand the keyboard to a board member at stop five and let them ask something real.\n" +
      "[WATCH] Say 'representative sample data' out loud before the booking-journey tab. If the network dies, come back to this slide and walk the captures.\n" +
      "[NEXT] Then open the floor with the magic wand question."
  );
}

// ==============================================  18. DISCUSSION  (dark)
{
  const { s } = slide("dark");
  B.eyebrow(s, "The discussion", "dark");
  const y = B.title(s, "If you had a magic wand.", "dark");

  const qs = [
    ["1", "What would it do for you, if it could do anything at all?"],
    ["2", "Where does it fit in the rhythm of how you run your week?"],
    ["3", "What information would you want in front of you, and how often?"],
    ["4", "Where should it show up: a screen you open, a number in a meeting, a message that finds you?"],
  ];
  const cw = (G.W - 0.4) / 2;
  const chh = 1.42;
  qs.forEach(([num, q], i) => {
    const x = G.ML + (i % 2) * (cw + 0.4);
    const cy = y + 0.06 + Math.floor(i / 2) * (chh + 0.3);
    B.card(s, { x, y: cy, w: cw, h: chh, mode: "dark", tag: "s18 card" });
    s.addText(num, {
      x: x + 0.3, y: cy + 0.22, w: 0.5, h: 0.5, margin: 0,
      fontFace: F.DISPLAY, fontSize: 30, bold: true, color: C.GOLD_L, valign: "top",
    });
    const qh = B.boxH(q, cw - 1.14, 15, "arial");
    s.addText(q, {
      x: x + 0.84, y: cy + 0.3, w: cw - 1.14, h: qh, margin: 0,
      fontFace: F.BODY, fontSize: 15, color: C.PAPER, valign: "top", lineSpacingMultiple: 1.16,
    });
  });

  B.caption(s, "Capture every answer. This is the roadmap.", "dark", {
    bold: true, color: C.GOLD_L, y: 5.86,
  });
  s.addNotes(
    "[TIMING] 2 min here. The real discussion continues into the break.\n" +
      "[SAY] If you had a magic wand and this thing did anything you wanted, what would it do? And where would it find you, because a tool you have to remember to open is a tool you will not use.\n" +
      "[DO] Take answers, do not present. Write them somewhere the room can see. Question four is the one that produces the most useful answers.\n" +
      "[WATCH] Do not defend the current product. Every wish is roadmap data.\n" +
      "[NEXT] Come back to the flywheel and name what is still missing."
  );
}

// ===================================  19. BACK TO THE FLYWHEEL  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "Where this leaves us", "light");
  const y = B.title(s, "Now we make it turn.", "light");

  B.flywheel(s, {
    cx: 3.78, band: { top: y + 0.1, bottom: 5.5 }, mode: "light", nodeD: 0.44,
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

  const rc = G.PANEL_R;
  B.panelList(s, {
    x: rc.x, y: y - 0.06, w: rc.w, mode: "light", size: 14, gap: 0.16,
    label: "What makes it turn", labelSize: 14, labelColor: C.TEAL_D,
    items: [
      { text: "Data flowing from offer to closed booking.", diamond: C.TEAL },
      { text: "A number on every handoff, read weekly.", open: true },
      { text: "A team that knows where it is winning, and doubles down there.", open: true },
      { text: "An operating rhythm that runs without anyone remembering to run it.", open: true },
    ],
    tag: "s19 panel",
  });

  B.caption(
    s,
    "The first one is done. The next two are this quarter. The fourth is execution, and that is exactly what the next session is about.",
    "light",
    { bold: true, color: C.TEAL_D }
  );
  s.addNotes(
    "[TIMING] 1 min.\n" +
      "[SAY] Filled diamond means we have it. Open means we do not yet. Look at the fourth one: a loop that runs without anyone remembering to run it. That is not a data problem, that is an operating problem, and it is what we spend the next ninety minutes on.\n" +
      "[DO] This is the handoff. Point at the open diamonds.\n" +
      "[WATCH] Do not answer the fourth item here. Leaving it open is the point.\n" +
      "[NEXT] Before the break, the dates."
  );
}

// ======================================  20. THE ROAD FROM HERE  (light)
{
  const { s } = slide("light");
  B.eyebrow(s, "The road from here", "light");
  B.title(s, "From today to the Owners Meeting.", "light");

  B.timeline(
    s,
    [
      { label: "Today", sub: "Non-prod code complete. This session. Testing open" },
      { label: "Fri, Aug 28", sub: "Production turned on; production testing begins" },
      { label: "Fri, Sep 4", sub: "Production testing fully underway" },
      { label: "Week of Sep 29", sub: "Owners Meeting, San Antonio. Alpha cohort announced", highlight: true },
      { label: "Oct 5 to Nov 13", sub: "Alpha: agency owners live on production" },
    ],
    { through: 3, text: "Through Sep 29 · internal testing window · your window" },
    "light",
    { spineY: 3.52 }
  );

  B.caption(
    s,
    "The only technical difference between non-prod and production is the volume of data. The engine is the same.",
    "light",
    { align: "center", y: 5.24 }
  );
  s.addNotes(
    "[TIMING] 1 min.\n" +
      "[SAY] Walk it left to right. The band is your window. Production comes on August 28 and has to be in full test by September 4, and that is what makes the Owners Meeting a full-data reveal.\n" +
      "[DO] Point at the highlighted milestone. San Antonio is the commitment.\n" +
      "[WATCH] VERIFY THESE DATES ON THE DAY. Milestone one is anchored to this session; the rest are as published in the August walkthrough. If any have passed, update before presenting.\n" +
      "[NEXT] Fifteen minutes, then we go from strategy to execution."
  );
}

// ==============================================  21. THE BREAK  (dark)
{
  const { s } = slide("dark", { chrome: false });
  B.ring(s, { cx: 6.667, cy: 1.08, d: 1.04, mark: "compass" });
  const brkY = B.statement(s, "15 minutes.", "dark", { size: 56, w: 10.2, y: 1.78 });
  s.addText("Coffee. Then bring your laptop back.", {
    x: G.ML, y: brkY, w: G.W, h: 0.34, margin: 0,
    fontFace: F.BODY, fontSize: 17, color: C.GOLD_L, align: "center", valign: "middle",
  });

  const cw = 8.6;
  const cx = (G.SLIDE_W - cw) / 2;
  B.panelList(s, {
    x: cx, y: 3.46, w: cw, mode: "dark", size: 13, gap: 0.1, pad: 0.26,
    label: "Before 2:40", labelSize: 13, labelColor: C.GOLD_L,
    items: [
      "Laptop open, plugged in, on the venue network.",
      "Claude desktop installed and signed in.",
      "Your workspace invite accepted. Check your email now if you are unsure.",
      "Your work email login handy. You will connect it live.",
    ],
    tag: "s21 panel", bottom: 6.06,
  });

  s.addText("NEXT: BUILD YOUR OWN DONNA   ◆   2:40 TO 4:10   ◆   THE EXECUTION SIDE OF THE SAME FLYWHEEL", {
    x: G.ML, y: 6.2, w: G.W, h: 0.3, margin: 0,
    fontFace: F.BODY, fontSize: 11, bold: true, charSpacing: 1.4,
    color: C.WARM, align: "center", valign: "middle",
  });
  B.horizonRule(s, 6.86);
  s.addNotes(
    "[TIMING] 1 min, then a 15 minute break.\n" +
      "[SAY] Fifteen minutes. Get coffee, and come back with the laptop open and Claude signed in, because the next session you build something rather than watch something.\n" +
      "[DO] Walk the room during the break and fix any laptop that is not ready. That is the single highest-value fifteen minutes of the afternoon.\n" +
      "[WATCH] Anyone missing the desktop app or the workspace invite needs to be found NOW, not at 2:41.\n" +
      "[NEXT] Deck B, slide 1."
  );
}

// ====================================================================== write
const OUT = "decks/sigcompass-reveal.pptx";
pres.writeFile({ fileName: OUT }).then(() => {
  console.log(`\nDeck A written: ${OUT}`);
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
  B.reportViolations("Deck A");
  B.checkPresets(OUT);
});
