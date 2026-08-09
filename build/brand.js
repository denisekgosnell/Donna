// Atelier: the shared brand system for the Signature executive session decks.
// Both deck generators import this module. No deck script may name a hex value
// or a font directly. See FABLE-DECK-INSTRUCTIONS.md sections 2, 6, 7.

// ---------------------------------------------------------------- palette (2.3)
const C = {
  INK: "14213D",
  SLATE: "1C2333",
  PANEL: "2A3244",
  PAPER: "F7F3EA",
  PAPER2: "E8E2D2",
  GOLD: "C9A227",
  GOLD_L: "E7C766",
  GOLD_D: "8A6D14",
  WARM: "AFA893",
  MUTE: "5A6379",
  WHITE: "FFFFFF",
  RED: "A31621", // Deck B reserved accent
  TEAL: "1E808F", // Deck A reserved accent
  TEAL_D: "15616D",
};

// ------------------------------------------------------------------ fonts (2.2)
const F = {
  DISPLAY: "Georgia",
  BODY: "Arial",
  MONO: "Courier New",
};

// ------------------------------------------------------------------- grid (2.1)
const G = {
  ML: 0.89,
  MR: 0.89,
  W: 11.56,
  EYEBROW_Y: 0.55,
  TITLE_Y: 0.92,
  BODY_Y: 2.05,
  BODY_Y1: 1.72,
  BODY_BOT: 6.12,
  RULE_Y: 6.32,
  FOOT_Y: 6.5,
  SRC_Y: 6.95,
  SAFE_BOT: 7.18,
  SLIDE_W: 13.333,
  SLIDE_H: 7.5,
  COL_L: { x: 0.89, w: 6.22 },
  COL_R: { x: 7.55, w: 4.9 },
  CARD3: [0.89, 4.89, 8.89],
  CARD3_W: 3.56,
  CARD4: [0.89, 3.87, 6.85, 9.83],
  CARD4_W: 2.62,
  // wide right panel: starts left of COL_R but still ends on the grid edge
  PANEL_R: { x: 7.25, w: 5.2 },
};

// ------------------------------------------------- text measurement law (7.2)
const EM_PER_CHAR = {
  arial: 0.512,
  arialBold: 0.545,
  arialItalic: 0.512,
  georgiaBold: 0.56,
  courier: 0.6,
};

function lines(text, w, pt, font = "arial") {
  const em = EM_PER_CHAR[font] || EM_PER_CHAR.arial;
  const charW = (pt * em) / 72;
  const perLine = Math.max(4, Math.floor((w - 0.04) / charW));
  let n = 1;
  let cur = 0;
  for (const word of String(text).split(/\s+/)) {
    const need = cur === 0 ? word.length : cur + 1 + word.length;
    if (need > perLine) {
      n++;
      cur = word.length;
    } else {
      cur = need;
    }
  }
  return n;
}

function boxH(text, w, pt, font = "arial") {
  // Display type gets tighter leading than body copy.
  const lead = font === "georgiaBold" ? 1.14 : 1.26;
  const h = lines(text, w, pt, font) * ((pt * lead) / 72) + 0.1;
  // Georgia cannot be verified by the LibreOffice renderer: add 12% slack (2.2)
  return font === "georgiaBold" ? h * 1.12 : h;
}

// Height a diamondList will occupy. Cards are sized from this, never from a
// literal, so a list can never outgrow the panel behind it.
function listH(items, w, size = 14, gap = 0.18, indent = 0.34) {
  const tw = w - indent;
  let h = 0;
  items.forEach((item, i) => {
    const isObj = typeof item === "object";
    const measured = isObj ? (item.label ? item.label + " " : "") + item.text : item;
    h += boxH(measured, tw, size, "arial");
    if (i < items.length - 1) h += gap;
  });
  return h;
}

// Assertion guards. A generator that silently pushes content off-slide is worse
// than one that crashes (7.2 rule 4).
const VIOLATIONS = [];
function assertFits(tag, x, y, w, h, bottom = G.BODY_BOT) {
  const msgs = [];
  if (y + h > bottom + 0.01) {
    msgs.push(`bottom ${(y + h).toFixed(2)} > ${bottom}`);
  }
  if (x + w > G.SLIDE_W - 0.5 + 0.01) {
    msgs.push(`right ${(x + w).toFixed(2)} > ${(G.SLIDE_W - 0.5).toFixed(2)}`);
  }
  if (x < 0.5 - 0.01) msgs.push(`left ${x.toFixed(2)} < 0.5`);
  if (msgs.length) VIOLATIONS.push(`${tag}: ${msgs.join("; ")}`);
}
// Guard against the defect that shipped once already: pptxgenjs writes whatever
// shape name it is given straight into prstGeom, and renderers silently DROP an
// invalid preset, so every circle vanished with no error anywhere.
const VALID_PRESETS = new Set(["ellipse", "rect", "roundRect", "triangle", "line"]);
function checkPresets(file) {
  const zlib = require("zlib");
  const fs = require("fs");
  const buf = fs.readFileSync(file);
  // minimal zip walk: find every deflated entry name ending in .xml
  const text = buf.toString("latin1");
  const found = new Set();
  let bad = new Set();
  // the slide XML is compressed, so scan the inflated parts via a crude central
  // directory walk
  let i = 0;
  while ((i = text.indexOf("PK\x03\x04", i)) !== -1) {
    const nameLen = buf.readUInt16LE(i + 26);
    const extraLen = buf.readUInt16LE(i + 28);
    const name = buf.slice(i + 30, i + 30 + nameLen).toString();
    const compSize = buf.readUInt32LE(i + 18);
    const method = buf.readUInt16LE(i + 8);
    const start = i + 30 + nameLen + extraLen;
    if (/^ppt\/slides\/slide\d+\.xml$/.test(name) && compSize > 0) {
      try {
        const raw = buf.slice(start, start + compSize);
        const xml = (method === 8 ? zlib.inflateRawSync(raw) : raw).toString();
        for (const m of xml.matchAll(/prstGeom prst="([A-Za-z0-9]+)"/g)) {
          found.add(m[1]);
          if (!VALID_PRESETS.has(m[1])) bad.add(m[1]);
        }
      } catch (e) { /* skip streamed entries */ }
    }
    i = start + compSize;
  }
  if (bad.size) {
    console.error(`   !! INVALID preset geometry: ${[...bad].join(", ")} (renderers drop these)`);
    process.exitCode = 1;
  } else {
    console.log(`   preset geometry: all valid (${[...found].sort().join(", ")})`);
  }
}

function reportViolations(label) {
  if (VIOLATIONS.length) {
    console.error(`\n!! ${VIOLATIONS.length} fit violation(s) in ${label}:`);
    VIOLATIONS.forEach((v) => console.error("   " + v));
    process.exitCode = 1;
  } else {
    console.log(`   fit assertions: clean (${label})`);
  }
  VIOLATIONS.length = 0;
}

// ------------------------------------------------------------ ground modes (2.5)
function palette(mode) {
  if (mode === "dark") {
    return {
      bg: C.INK,
      fg: C.PAPER,
      eyebrow: C.GOLD_L,
      gold: C.GOLD_L,
      muted: C.WARM,
      card: C.PANEL,
      block: C.SLATE,
      dark: true,
    };
  }
  if (mode === "light") {
    return {
      bg: C.PAPER,
      fg: C.INK,
      eyebrow: C.GOLD_D,
      gold: C.GOLD_D,
      muted: C.MUTE,
      card: C.PAPER2,
      block: C.INK,
      dark: false,
    };
  }
  // 'accent' grounds are set per deck (RED for B, TEAL for A)
  return {
    bg: mode,
    fg: C.WHITE,
    eyebrow: C.WHITE,
    gold: C.WHITE,
    muted: C.WHITE,
    card: C.WHITE,
    block: C.WHITE,
    dark: true,
    accent: true,
  };
}

function bg(slide, mode) {
  const p = palette(mode);
  slide.background = { color: p.bg };
  return p;
}

// ------------------------------------------------------------------- primitives
function eyebrow(slide, text, mode, opts = {}) {
  const p = palette(mode);
  const w = opts.narrow ? 10.8 : G.W;
  slide.addText(text.toUpperCase(), {
    x: G.ML,
    y: opts.y != null ? opts.y : G.EYEBROW_Y,
    w,
    h: 0.28,
    margin: 0,
    fontFace: F.BODY,
    fontSize: 12,
    bold: true,
    charSpacing: 2.2,
    color: opts.color || p.eyebrow,
    valign: "middle",
  });
}

// Places the headline and returns the y at which body content may begin.
// Size is chosen from MEASURED wrapping, not from a raw character count: at
// 40pt Georgia Bold an 11.56" box holds ~37 characters, so a 44-character
// headline silently became two lines and pushed the body off the slide. That
// was the single defect behind most of the source deck's overlaps.
function title(slide, text, mode, opts = {}) {
  const p = palette(mode);
  const w = opts.w || G.W;
  let size = opts.size;
  if (!size) {
    size = 40;
    if (lines(text, w, 40, "georgiaBold") > 1) size = 34;
    if (lines(text, w, 34, "georgiaBold") > 2) size = 28;
  }
  const n = lines(text, w, size, "georgiaBold");
  const h = boxH(text, w, size, "georgiaBold");
  const y = opts.y != null ? opts.y : G.TITLE_Y;
  slide.addText(text, {
    x: G.ML,
    y,
    w,
    h,
    margin: 0,
    fontFace: F.DISPLAY,
    fontSize: size,
    bold: true,
    color: opts.color || p.fg,
    valign: "top",
    lineSpacingMultiple: 0.94,
  });
  if (n > 2) VIOLATIONS.push(`title wraps to ${n} lines: "${text.slice(0, 40)}..."`);
  return Math.max(n === 1 ? G.BODY_Y1 : G.BODY_Y, y + h + 0.18);
}

function statement(slide, text, mode, opts = {}) {
  const p = palette(mode);
  const size = opts.size || 56;
  const w = opts.w || 10.6;
  const x = (G.SLIDE_W - w) / 2;
  const h = boxH(text, w, size, "georgiaBold");
  const y = opts.y != null ? opts.y : 1.5;
  slide.addText(text, {
    x,
    y,
    w,
    h,
    margin: 0,
    fontFace: F.DISPLAY,
    fontSize: size,
    bold: true,
    color: opts.color || p.fg,
    align: "center",
    valign: "top",
  });
  assertFits("statement", x, y, w, h, G.SAFE_BOT);
  return y + h + 0.24;
}

function body(slide, text, mode, opts = {}) {
  const p = palette(mode);
  const size = opts.size || 15;
  const w = opts.w || G.W;
  const x = opts.x != null ? opts.x : G.ML;
  const font = opts.italic ? "arialItalic" : opts.bold ? "arialBold" : "arial";
  const h = boxH(text, w, size, font);
  slide.addText(text, {
    x,
    y: opts.y,
    w,
    h,
    margin: 0,
    fontFace: F.BODY,
    fontSize: size,
    bold: !!opts.bold,
    italic: !!opts.italic,
    color: opts.color || p.fg,
    align: opts.align || "left",
    valign: "top",
    lineSpacingMultiple: 1.16,
  });
  assertFits(opts.tag || "body", x, opts.y, w, h, opts.bottom || G.BODY_BOT);
  return opts.y + h;
}

function label(slide, text, mode, opts = {}) {
  const p = palette(mode);
  const size = opts.size || 15;
  const w = opts.w || G.W;
  const x = opts.x != null ? opts.x : G.ML;
  const h = boxH(text, w, size, "arialBold");
  slide.addText(text.toUpperCase(), {
    x,
    y: opts.y,
    w,
    h,
    margin: 0,
    fontFace: F.BODY,
    fontSize: size,
    bold: true,
    charSpacing: opts.charSpacing != null ? opts.charSpacing : 1.2,
    color: opts.color || p.gold,
    align: opts.align || "left",
    valign: "top",
  });
  return opts.y + h;
}

function caption(slide, text, mode, opts = {}) {
  const p = palette(mode);
  const size = opts.size || 13;
  const w = opts.w || G.W;
  const x = opts.x != null ? opts.x : G.ML;
  const font = opts.bold ? "arialBold" : "arialItalic";
  const h = boxH(text, w, size, font);
  const y = opts.y != null ? opts.y : G.BODY_BOT - h;
  slide.addText(text, {
    x,
    y,
    w,
    h,
    margin: 0,
    fontFace: F.BODY,
    fontSize: size,
    bold: !!opts.bold,
    italic: !opts.bold,
    color: opts.color || (opts.bold ? p.gold : p.muted),
    align: opts.align || "left",
    valign: "top",
    lineSpacingMultiple: 1.16,
  });
  assertFits("caption", x, y, w, h, G.SAFE_BOT);
  return y + h;
}

function citation(slide, text, mode, opts = {}) {
  const p = palette(mode);
  slide.addText(text, {
    x: G.ML,
    y: opts.y != null ? opts.y : 6.0,
    w: G.W,
    h: 0.18,
    margin: 0,
    fontFace: F.BODY,
    fontSize: 9,
    italic: true,
    color: p.muted,
    align: opts.align || "right",
    valign: "middle",
  });
}

// -------------------------------------------------------------- chrome (2.7)
function chrome(slide, mode, deckName, pageNum) {
  const p = palette(mode);
  slide.addShape("line", {
    x: G.ML,
    y: G.RULE_Y,
    w: G.W,
    h: 0,
    line: { color: C.GOLD, width: 0.75 },
  });
  const parts = ["SIGNATURE", deckName, "AUGUST 2026"];
  // measure so the diamonds sit between the words
  const em = (0.72 * 9) / 72; // uppercase Arial runs ~0.72em per glyph
  const cs = 1.2 / 72;
  const wOf = (s) => s.length * (em + cs) + 0.04;
  let x = G.ML;
  parts.forEach((part, i) => {
    slide.addText(part, {
      x,
      y: G.FOOT_Y,
      w: wOf(part) + 0.1,
      h: 0.2,
      margin: 0,
      fontFace: F.BODY,
      fontSize: 9,
      charSpacing: 1.2,
      color: p.muted,
      valign: "middle",
    });
    x += wOf(part) + 0.1;
    if (i < parts.length - 1) {
      slide.addShape("rect", {
        x: x + 0.06,
        y: G.FOOT_Y + 0.065,
        w: 0.07,
        h: 0.07,
        rotate: 45,
        fill: { color: C.GOLD },
        line: { color: C.GOLD, width: 0.25 },
      });
      x += 0.26;
    }
  });
  if (pageNum != null) {
    slide.addText(String(pageNum), {
      x: G.ML + G.W - 0.8,
      y: G.FOOT_Y,
      w: 0.8,
      h: 0.2,
      margin: 0,
      fontFace: F.BODY,
      fontSize: 9,
      charSpacing: 1.2,
      color: p.muted,
      align: "right",
      valign: "middle",
    });
  }
}

function footerOnly(slide, mode, deckName) {
  const p = palette(mode);
  slide.addText(`SIGNATURE   ${deckName}   AUGUST 2026`, {
    x: G.ML,
    y: G.FOOT_Y + 0.4,
    w: G.W,
    h: 0.2,
    margin: 0,
    fontFace: F.BODY,
    fontSize: 9,
    charSpacing: 1.2,
    color: p.muted,
    align: "center",
    valign: "middle",
  });
}

// --------------------------------------------------------------- cards / lists
function card(slide, opts) {
  const p = palette(opts.mode);
  const o = {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    fill: { color: opts.fill || p.card },
    line: { type: "none" },
  };
  if (opts.radius) {
    o.rectRadius = opts.radius;
    slide.addShape("roundRect", o);
  } else {
    slide.addShape("rect", o);
  }
  assertFits(opts.tag || "card", opts.x, opts.y, opts.w, opts.h, opts.bottom || G.BODY_BOT);
}

function diamond(slide, x, y, size, color) {
  slide.addShape("rect", {
    x,
    y,
    w: size,
    h: size,
    rotate: 45,
    fill: { color: color || C.GOLD },
    line: { color: color || C.GOLD, width: 0.25 },
  });
}

// The single biggest defence against the source deck's overlap bugs (6.7).
// Rows are measured, never pitched.
function diamondList(slide, opts) {
  const p = palette(opts.mode);
  const size = opts.size || 14;
  const gap = opts.gap != null ? opts.gap : 0.18;
  const indent = opts.indent != null ? opts.indent : 0.34;
  const tw = opts.w - indent;
  let y = opts.y;
  opts.items.forEach((item) => {
    const isObj = typeof item === "object";
    const labelTxt = isObj ? item.label : null;
    const text = isObj ? item.text : item;
    const runs = [];
    if (labelTxt) {
      runs.push({
        text: labelTxt + " ",
        options: {
          fontFace: F.BODY,
          fontSize: size,
          bold: true,
          color: item.labelColor || p.gold,
        },
      });
    }
    runs.push({
      text,
      options: {
        fontFace: F.BODY,
        fontSize: size,
        bold: !!(isObj && item.bold),
        color: (isObj && item.color) || p.fg,
      },
    });
    const measured = (labelTxt ? labelTxt + " " : "") + text;
    const h = boxH(measured, tw, size, "arial");
    const dColor = (isObj && item.diamond) || opts.diamondColor || C.GOLD;
    const filled = !(isObj && item.open);
    if (filled) {
      diamond(slide, opts.x, y + 0.085, 0.11, dColor);
    } else {
      slide.addShape("rect", {
        x: opts.x,
        y: y + 0.085,
        w: 0.11,
        h: 0.11,
        rotate: 45,
        fill: { type: "none" },
        line: { color: dColor, width: 0.75 },
      });
    }
    slide.addText(runs, {
      x: opts.x + indent,
      y,
      w: tw,
      h,
      margin: 0,
      valign: "top",
      lineSpacingMultiple: 1.16,
    });
    assertFits(opts.tag || "diamondList", opts.x, y, opts.w, h, opts.bottom || G.BODY_BOT);
    y += h + gap;
  });
  return y - gap;
}

// A tinted panel with a label and a diamond list, where the panel height is
// DERIVED from the measured list. Use this instead of drawing a card and a list
// separately: it is impossible for the content to outgrow the panel.
function panelList(slide, opts) {
  const p = palette(opts.mode);
  const size = opts.size || 14;
  const gap = opts.gap != null ? opts.gap : 0.16;
  const pad = opts.pad != null ? opts.pad : 0.3;
  const iw = opts.w - pad * 2;
  const labelH = opts.label ? boxH(opts.label, iw, opts.labelSize || 14, "arialBold") : 0;
  const lh = listH(opts.items, iw, size, gap);
  const h = pad + labelH + (opts.label ? 0.12 : 0) + lh + pad;
  card(slide, {
    x: opts.x, y: opts.y, w: opts.w, h,
    mode: opts.mode, fill: opts.fill, radius: opts.radius,
    tag: opts.tag || "panelList", bottom: opts.bottom,
  });
  let y = opts.y + pad;
  if (opts.label) {
    slide.addText(opts.label.toUpperCase(), {
      x: opts.x + pad, y, w: iw, h: labelH, margin: 0,
      fontFace: F.BODY, fontSize: opts.labelSize || 14, bold: true,
      charSpacing: 1.6, color: opts.labelColor || p.gold, valign: "top",
    });
    y += labelH + 0.12;
  }
  diamondList({
    addText: slide.addText.bind(slide),
    addShape: slide.addShape.bind(slide),
  }, {
    x: opts.x + pad, y, w: iw, mode: opts.mode, size, gap,
    items: opts.items, diamondColor: opts.diamondColor,
    bottom: opts.y + h, tag: (opts.tag || "panelList") + " items",
  });
  return opts.y + h;
}

function statCallout(slide, opts) {
  const p = palette(opts.mode);
  const vh = boxH(opts.value, opts.w, opts.size || 58, "georgiaBold");
  slide.addText(opts.value, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: vh,
    margin: 0,
    fontFace: F.DISPLAY,
    fontSize: opts.size || 58,
    bold: true,
    color: opts.color || p.gold,
    valign: "top",
  });
  let y = opts.y + vh + 0.04;
  const lh = boxH(opts.label, opts.w, 13, "arial");
  slide.addText(opts.label, {
    x: opts.x,
    y,
    w: opts.w,
    h: lh,
    margin: 0,
    fontFace: F.BODY,
    fontSize: 13,
    color: p.fg,
    valign: "top",
    lineSpacingMultiple: 1.16,
  });
  y += lh + 0.06;
  if (opts.cite) {
    slide.addText(opts.cite, {
      x: opts.x,
      y,
      w: opts.w,
      h: 0.18,
      margin: 0,
      fontFace: F.BODY,
      fontSize: 9,
      italic: true,
      color: p.muted,
      valign: "top",
    });
    y += 0.18;
  }
  assertFits(opts.tag || "stat", opts.x, opts.y, opts.w, y - opts.y, opts.bottom || G.BODY_BOT);
  return y;
}

// ------------------------------------------------------- prompt block (6.6)
const MONO_CAP = 62;

function wrapMono(text, cap = MONO_CAP) {
  const out = [];
  String(text)
    .split("\n")
    .forEach((raw) => {
      const leading = (raw.match(/^\s*/) || [""])[0];
      let cur = "";
      raw
        .trim()
        .split(/\s+/)
        .forEach((word) => {
          const cand = cur ? cur + " " + word : word;
          if ((leading + cand).length > cap && cur) {
            out.push(leading + cur);
            cur = word;
          } else {
            cur = cand;
          }
        });
      out.push(leading + cur);
    });
  return out;
}

function promptBlock(slide, opts) {
  const p = palette(opts.mode);
  // Courier New at 12pt advances exactly 0.1in per glyph, so the usable line
  // length is arithmetic. Re-wrap whatever came in, and fail loudly if a
  // hand-formatted line is too long, rather than letting it spill out of the
  // dark block the way the source deck did.
  const cap = Math.floor((opts.w - 0.56) / 0.1) - 1;
  const rows = Array.isArray(opts.lines)
    ? opts.lines.flatMap((l) => (l.length > cap ? wrapMono(l, cap) : [l]))
    : wrapMono(opts.lines, cap);
  rows.forEach((l) => {
    if (l.length > cap) {
      VIOLATIONS.push(`prompt line ${l.length} > ${cap} chars: "${l.slice(0, 30)}..."`);
    }
  });
  const h = 0.52 + rows.length * 0.205 + 0.22;
  slide.addShape("rect", {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h,
    fill: { color: opts.fill || p.block },
    line: { type: "none" },
  });
  slide.addText(opts.label.toUpperCase(), {
    x: opts.x + 0.28,
    y: opts.y + 0.19,
    w: opts.w - 0.56,
    h: 0.22,
    margin: 0,
    fontFace: F.BODY,
    fontSize: 11,
    bold: true,
    charSpacing: 1.6,
    color: C.GOLD_L,
    valign: "middle",
  });
  const hi = opts.highlights || [];
  const runs = [];
  rows.forEach((line, i) => {
    const last = i === rows.length - 1;
    const hit = hi.find((s) => line.includes(s));
    if (hit) {
      const idx = line.indexOf(hit);
      const pre = line.slice(0, idx);
      const post = line.slice(idx + hit.length);
      if (pre) {
        runs.push({
          text: pre,
          options: { fontFace: F.MONO, fontSize: 12, color: C.PAPER },
        });
      }
      runs.push({
        text: hit,
        options: { fontFace: F.MONO, fontSize: 12, bold: true, color: C.GOLD_L },
      });
      runs.push({
        text: post,
        options: {
          fontFace: F.MONO,
          fontSize: 12,
          color: C.PAPER,
          breakLine: !last,
        },
      });
    } else {
      runs.push({
        text: line,
        options: {
          fontFace: F.MONO,
          fontSize: 12,
          color: C.PAPER,
          breakLine: !last,
        },
      });
    }
  });
  slide.addText(runs, {
    x: opts.x + 0.28,
    y: opts.y + 0.5,
    w: opts.w - 0.56,
    h: rows.length * 0.205 + 0.14,
    margin: 0,
    valign: "top",
    lineSpacing: 14.8,
  });
  assertFits(opts.tag || "prompt", opts.x, opts.y, opts.w, h, opts.bottom || G.BODY_BOT);
  return opts.y + h;
}

// ---------------------------------------------------------- flywheel (6.2)
const D2R = Math.PI / 180;

function flywheel(slide, opts) {
  const p = palette(opts.mode);
  const { cx } = opts;
  let cy = opts.cy;
  let r = opts.r != null ? opts.r : opts.gates ? 1.7 : 1.56;
  if (opts.band) {
    // Reserve room for the top and bottom station names inside the band.
    const nd = opts.nodeD || 0.62;
    const nameRoom = 0.34 + 0.08;
    const half = (opts.band.bottom - opts.band.top) / 2;
    r = half - nd / 2 - nameRoom;
    cy = opts.band.top + half;
  }
  const nodeD = opts.nodeD || (r < 1.3 ? 0.44 : 0.62);
  const numSize = r < 1.3 ? 12 : 17;
  const nameSize = r < 1.3 ? 10 : 13;
  const nameW = r < 1.3 ? 1.72 : 1.9;

  // the ring
  slide.addShape("ellipse", {
    x: cx - r,
    y: cy - r,
    w: r * 2,
    h: r * 2,
    fill: { type: "none" },
    line: { color: C.GOLD, width: 1 },
  });

  // arrows or gates at the diagonals
  for (let i = 0; i < 4; i++) {
    const th = (-45 + i * 90) * D2R;
    const px = cx + r * Math.cos(th);
    const py = cy + r * Math.sin(th);
    if (opts.gates) {
      const gw = 1.26; // "CONVERSION" in tracked 8pt caps needs this much
      const gh = 0.42;
      slide.addShape("roundRect", {
        x: px - gw / 2,
        y: py - gh / 2,
        w: gw,
        h: gh,
        rectRadius: 0.04,
        fill: { color: p.card },
        line: { color: C.GOLD, width: 0.75 },
      });
      slide.addText("CONVERSION", {
        x: px - gw / 2,
        y: py - gh / 2 + 0.045,
        w: gw,
        h: 0.15,
        margin: 0,
        fontFace: F.BODY,
        fontSize: 8,
        bold: true,
        charSpacing: 0.6,
        color: p.gold,
        align: "center",
        valign: "middle",
      });
      slide.addText("___%", {
        x: px - gw / 2,
        y: py - gh / 2 + 0.185,
        w: gw,
        h: 0.2,
        margin: 0,
        fontFace: F.DISPLAY,
        fontSize: 15,
        bold: true,
        color: p.muted,
        align: "center",
        valign: "middle",
      });
    } else {
      const t = r < 1.3 ? 0.13 : 0.17;
      slide.addShape("triangle", {
        x: px - t / 2,
        y: py - t / 2,
        w: t,
        h: t,
        rotate: -45 + i * 90 + 90,
        fill: { color: C.GOLD },
        line: { type: "none" },
      });
    }
  }

  // the hub
  const hubD = r * 2 * 0.58;
  const hubFill = opts.hub.fill ? { color: opts.hub.fill } : { type: "none" };
  slide.addShape("ellipse", {
    x: cx - hubD / 2,
    y: cy - hubD / 2,
    w: hubD,
    h: hubD,
    fill: hubFill,
    line: opts.hub.fill ? { type: "none" } : { color: C.GOLD, width: 1 },
  });
  const hubLines = Array.isArray(opts.hub.label) ? opts.hub.label : [opts.hub.label];
  // Derive the hub type size from the longest label line and the actual hub
  // width. Georgia's renderer substitute is much wider than its metrics, so
  // use a deliberately fat 0.92em per glyph. This is what stops the hub from
  // breaking as "DOCUMEN / T".
  const hubAvail = hubD - 0.1;
  const longest = Math.max(...hubLines.map((t) => t.length));
  const fitSize = Math.floor((hubAvail * 72) / (longest * 0.92));
  const nominal = r < 1.3 ? 12 : hubLines.length > 1 ? 15 : 17;
  const hubSize = Math.max(8, Math.min(nominal, fitSize));
  const hubColor = opts.hub.fill ? (opts.hub.textColor || C.WHITE) : p.gold;
  const hubH = hubLines.length * ((hubSize * 1.3) / 72);
  slide.addText(
    hubLines.map((t, i) => ({
      text: t,
      options: {
        fontFace: F.DISPLAY,
        fontSize: hubSize,
        bold: true,
        color: hubColor,
        breakLine: i < hubLines.length - 1,
      },
    })),
    {
      x: cx - hubAvail / 2,
      y: cy - hubH / 2,
      w: hubAvail,
      h: hubH,
      margin: 0,
      align: "center",
      valign: "middle",
      lineSpacingMultiple: 1.02,
    }
  );

  // stations, clockwise from the top
  opts.stations.forEach((st, i) => {
    const th = (-90 + i * 90) * D2R;
    const px = cx + r * Math.cos(th);
    const py = cy + r * Math.sin(th);
    slide.addShape("ellipse", {
      x: px - nodeD / 2,
      y: py - nodeD / 2,
      w: nodeD,
      h: nodeD,
      fill: { color: p.bg },
      line: { color: C.GOLD, width: 1 },
    });
    slide.addText(st.n, {
      x: px - nodeD / 2,
      y: py - nodeD / 2,
      w: nodeD,
      h: nodeD,
      margin: 0,
      fontFace: F.DISPLAY,
      fontSize: numSize,
      bold: true,
      color: p.gold,
      align: "center",
      valign: "middle",
    });
    // The station name sits outside the ring. Side names get a box measured to
    // the text so a long name never pushes into the legend or past the margin;
    // top and bottom names get the wider box because they have room.
    if (opts.names === false) return; // compressed variant: numbers only
    // Station names are ALL CAPS with tracking, and uppercase Arial Bold runs
    // ~0.72em per glyph, far wider than the mixed-case average. Using the
    // average made the box too narrow and "OPERATE" broke as "OPERAT / E".
    const textW = st.name.length * ((nameSize * 0.72) / 72 + 1.2 / 72) + 0.12;
    const side = i === 1 || i === 3;
    const nw = side ? Math.min(nameW, Math.max(0.7, textW)) : Math.max(nameW, textW);
    const nh = boxH(st.name, nw, nameSize, "arialBold");
    let nx;
    let ny;
    let al;
    if (i === 0) {
      nx = cx - nw / 2;
      ny = py - nodeD / 2 - nh - 0.08;
      al = "center";
    } else if (i === 2) {
      nx = cx - nw / 2;
      ny = py + nodeD / 2 + 0.08;
      al = "center";
    } else if (i === 1) {
      nx = px + nodeD / 2 + 0.14;
      ny = py - nh / 2;
      al = "left";
    } else {
      nx = px - nodeD / 2 - 0.14 - nw;
      ny = py - nh / 2;
      al = "right";
    }
    slide.addText(st.name, {
      x: nx,
      y: ny,
      w: nw,
      h: nh,
      margin: 0,
      fontFace: F.BODY,
      fontSize: nameSize,
      bold: true,
      charSpacing: 1.2,
      color: p.gold,
      align: al,
      valign: "middle",
    });
    assertFits(`flywheel name ${st.name}`, nx, ny, nw, nh, opts.bottom || G.BODY_BOT);
  });

  // the legend column
  if (opts.legend) {
    let y = opts.legend.y;
    const lw = opts.legend.w;
    opts.stations.forEach((st) => {
      const head = `${st.n}  ${st.name}`;
      const hh = boxH(head, lw, 13, "arialBold");
      slide.addText(
        [
          {
            text: st.n + "  ",
            options: { fontFace: F.BODY, fontSize: 13, bold: true, color: p.gold },
          },
          {
            text: st.name,
            options: {
              fontFace: F.BODY,
              fontSize: 13,
              bold: true,
              charSpacing: 1.0,
              color: p.fg,
            },
          },
        ],
        { x: opts.legend.x, y, w: lw, h: hh, margin: 0, valign: "top" }
      );
      y += hh + 0.02;
      const bh = boxH(st.legend, lw, 12, "arial");
      slide.addText(st.legend, {
        x: opts.legend.x,
        y,
        w: lw,
        h: bh,
        margin: 0,
        fontFace: F.BODY,
        fontSize: 12,
        color: p.fg,
        valign: "top",
        lineSpacingMultiple: 1.16,
      });
      assertFits(`legend ${st.name}`, opts.legend.x, y, lw, bh, G.BODY_BOT);
      y += bh + 0.16;
    });
  }
}

// ---------------------------------------------------------- quadrant (6.3)
function quadrant(slide, opts) {
  const p = palette(opts.mode);
  const CX = 6.67;
  const CY = 3.82; // pulled up so the bottom axis label clears the footer rule
  const recede = opts.axisStyle === "recede";
  const lw = recede ? 0.75 : 1.25;
  const lineOpt = recede
    ? { color: C.GOLD, width: lw, transparency: 55 }
    : { color: C.GOLD, width: lw };

  slide.addShape("line", {
    x: CX,
    y: 1.98,
    w: 0,
    h: 3.68,
    line: { ...lineOpt, beginArrowType: "triangle", endArrowType: "triangle" },
  });
  slide.addShape("line", {
    x: 2.55,
    y: CY,
    w: 8.24,
    h: 0,
    line: { ...lineOpt, beginArrowType: "triangle", endArrowType: "triangle" },
  });

  const axSize = recede ? 12 : 13;
  const ends = [
    { t: opts.axes.top, s: opts.axes.topSub, x: CX - 1.6, y: 1.6, w: 3.2, al: "center" },
    { t: opts.axes.bottom, s: opts.axes.bottomSub, x: CX - 1.6, y: 5.7, w: 3.2, al: "center" },
    { t: opts.axes.left, s: opts.axes.leftSub, x: 0.89, y: CY - 0.3, w: 1.56, al: "right" },
    { t: opts.axes.right, s: opts.axes.rightSub, x: 10.89, y: CY - 0.3, w: 1.56, al: "left" },
  ];
  ends.forEach((e) => {
    slide.addText(e.t, {
      x: e.x,
      y: e.y,
      w: e.w,
      h: 0.22,
      margin: 0,
      fontFace: F.BODY,
      fontSize: axSize,
      bold: true,
      charSpacing: 1.6,
      color: p.gold,
      align: e.al,
      valign: "middle",
    });
    if (e.s) {
      slide.addText(e.s, {
        x: e.x,
        y: e.y + 0.22,
        w: e.w,
        h: 0.2,
        margin: 0,
        fontFace: F.BODY,
        fontSize: 10,
        italic: true,
        color: p.muted,
        align: e.al,
        valign: "middle",
      });
    }
  });

  const REG = {
    ul: { x: 1.05, y: 2.08, w: 5.3, h: 1.66 },
    ur: { x: 7.0, y: 2.08, w: 5.3, h: 1.66 },
    ll: { x: 1.05, y: 3.98, w: 5.3, h: 1.68 },
    lr: { x: 7.0, y: 3.98, w: 5.3, h: 1.68 },
  };

  opts.cells.forEach((cell) => {
    const R = REG[cell.pos];
    if (opts.axisStyle === "bold") {
      const nh = boxH(cell.name, R.w, 34, "georgiaBold");
      slide.addText(cell.name, {
        x: R.x,
        y: R.y + 0.1,
        w: R.w,
        h: nh,
        margin: 0,
        fontFace: F.DISPLAY,
        fontSize: 34,
        bold: true,
        color: p.gold,
        align: "center",
        valign: "top",
      });
      const sub = cell.lines[0];
      const sh = boxH(sub, R.w - 1.2, 13, "arial");
      slide.addText(sub, {
        x: R.x + 0.6,
        y: R.y + 0.1 + nh + 0.06,
        w: R.w - 1.2,
        h: sh,
        margin: 0,
        fontFace: F.BODY,
        fontSize: 13,
        color: p.fg,
        align: "center",
        valign: "top",
      });
      assertFits(`quad ${cell.name}`, R.x, R.y, R.w, 0.1 + nh + 0.06 + sh, R.y + R.h + 0.06);
    } else {
      let y = R.y;
      const nh = boxH(cell.name, R.w, 17, "arialBold");
      slide.addText(cell.name, {
        x: R.x,
        y,
        w: R.w,
        h: nh,
        margin: 0,
        fontFace: F.BODY,
        fontSize: 17,
        bold: true,
        charSpacing: 1.2,
        color: p.gold,
        valign: "top",
      });
      y += nh + 0.04;
      cell.lines.forEach((ln) => {
        const measured = ln.label + " " + ln.text;
        const h = boxH(measured, R.w, 12, "arial");
        slide.addText(
          [
            {
              text: ln.label + " ",
              options: { fontFace: F.BODY, fontSize: 12, bold: true, color: p.gold },
            },
            { text: ln.text, options: { fontFace: F.BODY, fontSize: 12, color: p.fg } },
          ],
          { x: R.x, y, w: R.w, h, margin: 0, valign: "top", lineSpacingMultiple: 1.14 }
        );
        y += h + 0.05;
      });
      assertFits(`quad ${cell.name}`, R.x, R.y, R.w, y - R.y, R.y + R.h + 0.1);
    }
  });
}

// ------------------------------------------------------- progress pip (6.4)
const PIP_STATIONS = ["DOCUMENT", "TEST", "REVISE", "OPERATE"];

function progressPip(slide, active, mode, captionText) {
  const p = palette(mode);
  const cx = 12.2;
  const cy = 0.66;
  const R = 0.22;
  const stroke = p.accent ? C.WHITE : C.GOLD;
  slide.addShape("ellipse", {
    x: cx - R,
    y: cy - R,
    w: R * 2,
    h: R * 2,
    fill: { type: "none" },
    line: { color: stroke, width: 0.75 },
  });
  PIP_STATIONS.forEach((name, i) => {
    const th = (-90 + i * 90) * D2R;
    const d = 0.125;
    const px = cx + R * Math.cos(th);
    const py = cy + R * Math.sin(th);
    const on = active.includes(name);
    slide.addShape("ellipse", {
      x: px - d / 2,
      y: py - d / 2,
      w: d,
      h: d,
      fill: on ? { color: stroke } : { color: p.bg },
      line: { color: stroke, width: 0.75 },
    });
  });
  const txt = captionText || active.join(" · ");
  // right edge must land on the grid (G.ML + G.W = 12.45), not run to 13.10
  const capW = 2.4;
  slide.addText(txt.toUpperCase(), {
    x: G.ML + G.W - capW,
    y: 0.92,
    w: capW,
    h: 0.18,
    margin: 0,
    fontFace: F.BODY,
    fontSize: 7,
    bold: true,
    charSpacing: 0.9,
    color: p.accent ? C.WHITE : p.gold,
    align: "right",
    valign: "middle",
  });
  assertFits("pip caption", G.ML + G.W - capW, 0.92, capW, 0.18, G.SAFE_BOT);
}

// ---------------------------------------------------------- timeline (6.5)
function timeline(slide, milestones, band, mode, opts) {
  const p = palette(mode);
  const x0 = G.ML;
  const x1 = G.ML + G.W;
  const spineY = opts && opts.spineY != null ? opts.spineY : 4.05;
  slide.addShape("line", {
    x: x0,
    y: spineY,
    w: G.W,
    h: 0,
    line: { color: C.GOLD, width: 0.75, transparency: 55 },
  });
  const n = milestones.length;
  const pitch = G.W / n;
  const xs = milestones.map((_, i) => x0 + pitch * (i + 0.5));
  milestones.forEach((m, i) => {
    const d = 0.17;
    slide.addShape("ellipse", {
      x: xs[i] - d / 2,
      y: spineY - d / 2,
      w: d,
      h: d,
      fill: { color: m.highlight ? C.TEAL : C.INK },
      line: { type: "none" },
    });
    const above = i % 2 === 0;
    const bw = 2.3;
    const dateY = above ? spineY - 0.75 : spineY + 0.21;
    const subY = above ? spineY - 0.53 : spineY + 0.43;
    const bx = Math.max(0.55, Math.min(xs[i] - bw / 2, G.SLIDE_W - 0.55 - bw));
    slide.addText(m.label, {
      x: bx,
      y: dateY,
      w: bw,
      h: 0.22,
      margin: 0,
      fontFace: F.BODY,
      fontSize: 13,
      bold: true,
      color: m.highlight ? C.TEAL_D : p.fg,
      align: "center",
      valign: "middle",
    });
    const sh = boxH(m.sub, bw, 11, "arial");
    slide.addText(m.sub, {
      x: bx,
      y: subY,
      w: bw,
      h: sh,
      margin: 0,
      fontFace: F.BODY,
      fontSize: 11,
      color: m.highlight ? C.TEAL_D : p.muted,
      align: "center",
      valign: "top",
      lineSpacingMultiple: 1.1,
    });
  });
  if (band) {
    const bx = xs[0];
    const bw = xs[band.through] - xs[0];
    slide.addShape("roundRect", {
      x: bx,
      y: spineY + 0.93,
      w: bw,
      h: 0.44,
      rectRadius: 0.06,
      fill: { color: p.card },
      line: { type: "none" },
    });
    slide.addText(band.text.toUpperCase(), {
      x: bx,
      y: spineY + 0.93,
      w: bw,
      h: 0.44,
      margin: 0,
      fontFace: F.BODY,
      fontSize: 11,
      bold: true,
      charSpacing: 1.4,
      color: C.TEAL_D,
      align: "center",
      valign: "middle",
    });
  }
}

// ------------------------------------------------------------- motifs (2.6)
function ring(slide, opts) {
  const { cx, cy } = opts;
  const d = opts.d || 1.82;
  const inner = d * 0.852;
  slide.addShape("ellipse", {
    x: cx - d / 2,
    y: cy - d / 2,
    w: d,
    h: d,
    fill: { type: "none" },
    line: { color: C.GOLD, width: 1 },
  });
  slide.addShape("ellipse", {
    x: cx - inner / 2,
    y: cy - inner / 2,
    w: inner,
    h: inner,
    fill: { type: "none" },
    line: { color: C.GOLD, width: 1 },
  });
  // cardinal ticks
  const tick = d * 0.05;
  [
    [cx, cy - d / 2],
    [cx, cy + d / 2],
    [cx - d / 2, cy],
    [cx + d / 2, cy],
  ].forEach(([tx, ty], i) => {
    const vert = i < 2;
    slide.addShape("line", {
      x: vert ? tx : tx - tick / 2,
      y: vert ? ty - tick / 2 : ty,
      w: vert ? 0 : tick,
      h: vert ? tick : 0,
      line: { color: C.GOLD, width: 1 },
    });
  });

  if (opts.mark === "D") {
    slide.addText("D", {
      x: cx - inner / 2,
      y: cy - inner / 2,
      w: inner,
      h: inner,
      margin: 0,
      fontFace: F.DISPLAY,
      fontSize: Math.round(d * 36),
      bold: true,
      color: C.RED,
      align: "center",
      valign: "middle",
    });
  } else if (opts.mark === "compass") {
    const s = d * 0.34;
    // north point, filled teal
    slide.addShape("triangle", {
      x: cx - s * 0.22,
      y: cy - s,
      w: s * 0.44,
      h: s,
      fill: { color: C.TEAL },
      line: { type: "none" },
    });
    // south
    slide.addShape("triangle", {
      x: cx - s * 0.22,
      y: cy,
      w: s * 0.44,
      h: s,
      rotate: 180,
      fill: { color: C.GOLD, transparency: 35 },
      line: { type: "none" },
    });
    // east: rotated 90, so the box centre must sit at (cx + s/2, cy)
    slide.addShape("triangle", {
      x: cx + s * 0.28,
      y: cy - s * 0.5,
      w: s * 0.44,
      h: s,
      rotate: 90,
      fill: { color: C.GOLD, transparency: 35 },
      line: { type: "none" },
    });
    // west: rotated 270, box centre at (cx - s/2, cy)
    slide.addShape("triangle", {
      x: cx - s * 0.72,
      y: cy - s * 0.5,
      w: s * 0.44,
      h: s,
      rotate: 270,
      fill: { color: C.GOLD, transparency: 35 },
      line: { type: "none" },
    });
  }
}

function skyline(slide, y) {
  // a thin gold outline city silhouette, 8.0" wide, centered
  const w = 8.0;
  const x0 = (G.SLIDE_W - w) / 2;
  const baseY = y != null ? y : 7.16;
  const h = 0.62;
  const blocks = [
    [0.0, 0.2], [0.42, 0.34], [0.78, 0.16], [1.02, 0.46], [1.44, 0.26],
    [1.74, 0.62], [2.1, 0.3], [2.44, 0.2], [2.72, 0.5], [3.16, 0.36],
    [3.5, 0.22], [3.78, 0.58], [4.18, 0.3], [4.5, 0.42], [4.92, 0.2],
    [5.2, 0.54], [5.62, 0.32], [5.96, 0.24], [6.24, 0.44], [6.66, 0.3],
    [7.0, 0.5], [7.42, 0.22], [7.7, 0.3],
  ];
  slide.addShape("line", {
    x: x0,
    y: baseY,
    w,
    h: 0,
    line: { color: C.GOLD, width: 0.75, transparency: 50 },
  });
  blocks.forEach(([bx, bh], i) => {
    const bw = (blocks[i + 1] ? blocks[i + 1][0] : w) - bx - 0.04;
    if (bw <= 0) return;
    const top = baseY - bh * h;
    slide.addShape("line", { x: x0 + bx, y: top, w: 0, h: bh * h, line: { color: C.GOLD, width: 0.75, transparency: 50 } });
    slide.addShape("line", { x: x0 + bx, y: top, w: bw, h: 0, line: { color: C.GOLD, width: 0.75, transparency: 50 } });
    slide.addShape("line", { x: x0 + bx + bw, y: top, w: 0, h: bh * h, line: { color: C.GOLD, width: 0.75, transparency: 50 } });
  });
}

function horizonRule(slide, y) {
  const w = 8.0;
  const x0 = (G.SLIDE_W - w) / 2;
  const yy = y != null ? y : 6.9;
  slide.addShape("line", {
    x: x0,
    y: yy,
    w,
    h: 0,
    line: { color: C.GOLD, width: 0.75, transparency: 40 },
  });
  slide.addShape("rect", {
    x: G.SLIDE_W / 2 - 0.05,
    y: yy - 0.05,
    w: 0.1,
    h: 0.1,
    rotate: 45,
    fill: { color: C.TEAL },
    line: { type: "none" },
  });
}

// A quote card in the style of the source title slides.
function quoteCard(slide, opts) {
  const w = opts.w || 8.14;
  const x = (G.SLIDE_W - w) / 2;
  const qh = boxH(opts.quote, w - 1.0, opts.size || 26, "georgiaBold");
  const h = qh + 0.86;
  slide.addShape("rect", {
    x,
    y: opts.y,
    w,
    h,
    fill: { color: C.PAPER2 },
    line: { type: "none" },
  });
  slide.addText(opts.quote, {
    x: x + 0.5,
    y: opts.y + 0.28,
    w: w - 1.0,
    h: qh,
    margin: 0,
    fontFace: F.DISPLAY,
    fontSize: opts.size || 26,
    bold: true,
    italic: true,
    color: opts.color || C.RED,
    align: "center",
    valign: "middle",
  });
  slide.addText(opts.attribution, {
    x: x + 0.5,
    y: opts.y + 0.28 + qh + 0.14,
    w: w - 1.0,
    h: 0.24,
    margin: 0,
    fontFace: F.BODY,
    fontSize: 11,
    bold: true,
    charSpacing: 1.6,
    color: C.INK,
    align: "center",
    valign: "middle",
  });
  return opts.y + h;
}

module.exports = {
  C, F, G,
  lines, boxH, listH, assertFits, reportViolations, checkPresets,
  palette, bg,
  eyebrow, title, statement, body, label, caption, citation,
  chrome, footerOnly,
  card, diamond, diamondList, panelList, statCallout,
  promptBlock, wrapMono, MONO_CAP,
  flywheel, quadrant, progressPip, timeline,
  ring, skyline, horizonRule, quoteCard,
};
