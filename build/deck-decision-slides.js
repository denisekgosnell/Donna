// Decision slides: two standalone slides for the Donna workshop.
// Slide 1: learning outcomes across four platforms.
// Slide 2: data security in Claude, free vs paid plans.
// Brand: Atelier (build/brand.js), Deck B family.

const pptxgen = require("pptxgenjs");
const B = require("./brand");
const { C, F, G } = B;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Denise Gosnell";
pres.company = "Signature Travel Network";
pres.title = "Build Your Own Donna: Decision Slides";

const DECK = "BUILD YOUR OWN DONNA";

function slide(mode, page) {
  const s = pres.addSlide();
  const p = B.bg(s, mode);
  B.chrome(s, mode, DECK, page);
  return { s, p };
}

// A comparison matrix in the Atelier vocabulary: diamond-marked row labels,
// one INK-filled band behind the recommended column, check and cross marks.
// cols: [{ head, hl }], rows: [{ label, cells }] where a cell is
// "check" | "x" | a short literal string ("OPTIONAL").
function matrix(s, opts) {
  const { mode, cols, rows } = opts;
  const p = B.palette(mode);
  const labelX = G.ML;
  const labelW = opts.labelW;
  const colsX = labelX + labelW + 0.2;
  const colsW = G.ML + G.W - colsX;
  const colW = colsW / cols.length;
  const headY = opts.y;
  const headH = opts.headH || 0.62;
  const rowsY = headY + headH + 0.06;
  const rowH = opts.rowH;
  const tableBot = rowsY + rows.length * rowH;

  // The highlighted column's band goes in first so everything sits on top.
  cols.forEach((col, i) => {
    if (!col.hl) return;
    const cx = colsX + i * colW + colW / 2;
    const bandW = colW - 0.14;
    s.addShape("roundRect", {
      x: cx - bandW / 2,
      y: headY - 0.08,
      w: bandW,
      h: tableBot - headY + 0.16,
      rectRadius: 0.08,
      fill: { color: C.INK },
      line: { type: "none" },
    });
  });

  // Column heads.
  cols.forEach((col, i) => {
    s.addText(col.head, {
      x: colsX + i * colW + 0.05,
      y: headY,
      w: colW - 0.1,
      h: headH,
      margin: 0,
      isTextBox: true,
      fontFace: F.BODY,
      fontSize: 10.5,
      bold: true,
      charSpacing: 1.0,
      color: col.hl ? C.GOLD_L : p.fg,
      align: "center",
      valign: "middle",
      lineSpacingMultiple: 1.05,
    });
  });

  // Rows: alternating PAPER2 bands under the label zone keep the eye on the
  // row without adding lines (the hairline at RULE_Y stays the only line).
  rows.forEach((row, r) => {
    const y = rowsY + r * rowH;
    if (r % 2 === 0) {
      s.addShape("rect", {
        x: labelX - 0.12,
        y,
        w: labelW + 0.24,
        h: rowH,
        fill: { color: C.PAPER2 },
        line: { type: "none" },
      });
    }
    B.diamond(s, labelX + 0.02, y + rowH / 2 - 0.055, 0.11, C.GOLD);
    s.addText(row.label, {
      x: labelX + 0.34,
      y,
      w: labelW - 0.34,
      h: rowH,
      margin: 0,
      isTextBox: true,
      fontFace: F.BODY,
      fontSize: opts.labelSize || 14,
      color: p.fg,
      align: "left",
      valign: "middle",
      lineSpacingMultiple: 1.05,
    });
    row.cells.forEach((cell, i) => {
      const hl = cols[i].hl;
      const common = {
        x: colsX + i * colW + 0.05,
        y,
        w: colW - 0.1,
        h: rowH,
        margin: 0,
        isTextBox: true,
        fontFace: F.BODY,
        align: "center",
        valign: "middle",
      };
      if (cell === "check") {
        s.addText("✓", {
          ...common,
          fontSize: 20,
          bold: true,
          color: hl ? C.GOLD_L : C.GOLD_D,
        });
      } else if (cell === "x") {
        s.addText("✕", {
          ...common,
          fontSize: 15,
          bold: true,
          color: hl ? C.WARM : C.MUTE,
        });
      } else {
        s.addText(cell, {
          ...common,
          fontSize: 9.5,
          bold: true,
          charSpacing: 1.2,
          color: hl ? C.WARM : C.MUTE,
        });
      }
    });
  });

  B.assertFits("matrix", labelX, headY, G.W, tableBot - headY, G.BODY_BOT);
  return tableBot;
}

// ==================================================  1. LEARNING OUTCOMES (light)
{
  const { s } = slide("light", 1);
  B.eyebrow(s, "BUILD YOUR OWN DONNA · LEARNING OUTCOMES", "light");
  B.title(s, "What you leave with.", "light");

  const bot = matrix(s, {
    mode: "light",
    y: 1.82,
    labelW: 4.1,
    headH: 0.62,
    rowH: 0.62,
    cols: [
      { head: "CLAUDE\nFREE" },
      { head: "CLAUDE PRO,\nMAX & ENTERPRISE", hl: true },
      { head: "CHATGPT" },
      { head: "MICROSOFT\nCOPILOT" },
    ],
    rows: [
      {
        label: "AI terminology: chat, projects, context window, agents",
        cells: ["check", "check", "check", "check"],
      },
      {
        label: "Connect an agent to your email",
        cells: ["check", "check", "check", "check"],
      },
      {
        label: "Build a personalized agent",
        cells: ["check", "check", "check", "check"],
      },
      {
        label: "A portable agent you own",
        cells: ["check", "check", "check", "check"],
      },
      {
        label: "Leave with a scheduled agent, running on its own",
        cells: ["x", "check", "x", "x"],
      },
    ],
  });

  B.caption(
    s,
    "Any platform covers the first four. Leaving with a scheduled agent running on its own takes a paid Claude plan.",
    "light",
    { y: bot + 0.2, bold: true }
  );

  s.addNotes(
    "[TIMING] 90 sec.\n" +
      "[SAY] Everything we do today transfers. The vocabulary, the email connection, the personalized agent, and the document that makes it portable work on any of these platforms. The last row is the difference: walking out with an agent that runs on a schedule, without you pressing a button, is a paid Claude capability.\n" +
      "[DO] Point at the last row. Hold on it.\n" +
      "[WATCH] Someone will ask if ChatGPT or Copilot can schedule. They have task features, but not the full agent loop we build today. Do not get pulled into a feature debate; the row is about what they leave with this afternoon.\n" +
      "[NEXT] So the real decision is not whether to do this. It is which plan your data deserves."
  );
}

// ==================================================  2. DATA SECURITY (light)
{
  const { s } = slide("light", 2);
  B.eyebrow(s, "BUILD YOUR OWN DONNA · DATA SECURITY IN CLAUDE", "light");
  B.title(s, "Where your data stands.", "light");

  const bot = matrix(s, {
    mode: "light",
    y: 1.82,
    labelW: 6.9,
    headH: 0.62,
    rowH: 0.52,
    cols: [
      { head: "CLAUDE\nFREE" },
      { head: "CLAUDE PRO,\nMAX & ENTERPRISE", hl: true },
    ],
    rows: [
      {
        label: "Your conversations are not used to train the model",
        cells: ["OPTIONAL", "check"],
      },
      {
        label: "GDPR-aligned data processing agreement (EU standard clauses)",
        cells: ["x", "check"],
      },
      {
        label: "Single sign-on and domain capture",
        cells: ["x", "check"],
      },
      { label: "Audit logs with 180-day export", cells: ["x", "check"] },
      { label: "Custom data retention controls", cells: ["x", "check"] },
      {
        label: "Role-based permissions and a compliance API",
        cells: ["x", "check"],
      },
    ],
  });

  B.caption(
    s,
    "Claude for Work is SOC 2 Type II and ISO 27001 certified. Every plan encrypts your data in transit and at rest.",
    "light",
    { y: bot + 0.12, bold: true }
  );
  B.citation(
    s,
    "SSO is Team and up. Audit logs, retention, role permissions and the DPA are Enterprise. Pro and Max set training exclusion in privacy settings. Source: privacy.claude.com.",
    "light",
    { y: 6.08, align: "left" }
  );

  s.addNotes(
    "[TIMING] 90 sec.\n" +
      "[SAY] On the free plan, keeping your conversations out of training is a setting you have to go find. On Claude for Work it is the default, in the contract. Everything below that row is the admin layer: the controls your IT and legal teams will ask about by name, and they only exist on the business plans.\n" +
      "[DO] None. Let the column speak.\n" +
      "[WATCH] Be precise if pressed: Pro and Max carry the same training toggle as free; the contractual exclusion and every admin control on this list is Claude for Work, and most are Enterprise. The free plan is not insecure, it is unmanaged. Say it that way.\n" +
      "[NEXT] That is the decision. Pick the plan, and we start building."
  );
}

// ====================================================================== write
const OUT = "decks/donna-decision-slides.pptx";
pres.writeFile({ fileName: OUT }).then(() => {
  console.log(`Decision slides written: ${OUT}`);
  B.reportViolations("Decision slides");
  B.checkPresets(OUT);
});
