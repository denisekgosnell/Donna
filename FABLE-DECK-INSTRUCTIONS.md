# Fable Build Instructions: The Signature Executive Session Decks

**Audience for this document:** the Fable model, executing a build.
**True north:** when you finish, both `.pptx` files are ready to put in front of the Signature Travel executive board with no further editing. Not "a good draft." Ready. If a slide would embarrass Denise on a projector, it is not done.

Read this entire document before you write a single line of code. It is long on purpose: every ambiguity resolved here is a rebuild you do not have to do.

---

## 0. Mission

Build **two** PowerPoint decks for one afternoon with the Signature Travel executive board.

| | Deck A | Deck B |
|---|---|---|
| **Name** | SigCompass Reveal and Product Tour | Build Your Own Donna |
| **Slot** | 1:30 to 2:20 PM (50 min) | 2:40 to 4:10 PM (90 min) |
| **Output file** | `decks/sigcompass-reveal.pptx` | `decks/build-your-own-donna-v2.pptx` |
| **Slide count** | 21 | 26 |
| **Theme of the hour** | **Strategy**: how you set up a flywheel and make long-term investments that change how you drive the business | **Execution**: how the operating loop of that flywheel actually runs in the age of AI |
| **Suits references** | **ZERO. None. See §2.9** | Full, leaned into |

They are two sides of one coin. An executive who sits through both should leave with strategy plus execution, and should be able to say what the connection was without being prompted.

### The single sentence both decks serve

> How do we create operational workflows that augment our respective businesses while also allowing them to operate independently?

### The thesis that closes the loop between them

Put this in Deck B, verbatim in substance:

> AI only speeds up your current processes by 10x. That gives you 10x more confusion, or 10x more alignment.

The whole afternoon is an argument for the second one. The metaphor to carry: **we are all learning to play doubles, and the balls just started coming a lot faster. The answer is not fancier plays. It is basic ones.** Emails. Numbers. Percentages. Shared awareness of simple things, in a group, acted on together. Bounce pass. Score. Then we get fancier.

---

## 1. Environment and source material

### 1.1 Working setup

```bash
cd /Users/dev/Documents/production/donna
mkdir -p decks build/scratch
```

Build with **pptxgenjs** (preinstalled: `require('pptxgenjs')` directly; do not run `npm install` first). Generator scripts live in `build/`, one per deck:

- `build/deck-a-sigcompass.js`
- `build/deck-b-donna.js`
- `build/brand.js` shared module: palette, type scale, grid constants, and every helper in §6. **Both decks import the same `brand.js`.** This is not a nicety; it is the mechanism that makes them look like one family. If you find yourself hardcoding a hex value inside a deck script, stop and put it in `brand.js`.

You need a Python venv for QA tooling (python-pptx, markitdown, Pillow, defusedxml, lxml). The system Python has none of it:

```bash
python3 -m venv build/venv
./build/venv/bin/pip install -q python-pptx "markitdown[pptx]" Pillow defusedxml lxml
```

The pptx skill's scripts (`validate.py`, `soffice.py`, `thumbnail.py`) are the QA harness. Invoke them with the venv Python.

### 1.2 The three source decks

All on `/Users/dev/Desktop/`. **Read all three before building.** They are your content of record. You are not inventing Signature's strategy; you are re-cutting material that has already been presented to this board.

| File | Slides | What it is | What you take |
|---|---|---|---|
| `STN-Data-Strategy-2026-FINAL.pptx` | 20 | Feb 2026 board deck, "Closing the Loop: A Revenue-Focused Data Strategy." Visually plain (white, Calibri, clip-art loops) but the **richest speaker notes of the three** | The entire strategic argument for Deck A, plus every statistic. Slides 2 to 8 and 16 to 18 notes are gold |
| `SigCompassBoardWalkthrough202608.pptx` | 24 | Aug 2026 board walkthrough. Letter-size 11 x 8.5, teal/navy/Cambria | **Slides 17 to 24 are the structural foundation for Deck A.** Plus slide 8 (the timeline, see §4.6), slide 11 (the six tour stops), slide 19 (the flywheel content) |
| `build-your-own-donna.pptx` | 28 | July 2026 workshop deck. 13.33 x 7.5 | **The brand.** Every color, font, motif, and layout idea in §2 comes from here. Also the content spine of Deck B, and its slides 9 and 10 are the quadrant model |

### 1.3 What is already extracted for you

`markitdown` each source deck to read text plus speaker notes:

```bash
./build/venv/bin/markitdown /Users/dev/Desktop/build-your-own-donna.pptx > build/scratch/donna-source.md
```

Render each to images so you can see the layouts you are replacing:

```bash
./build/venv/bin/python "$PPTX_SKILL/scripts/office/soffice.py" --headless --convert-to pdf <deck>.pptx
pdftoppm -jpeg -r 100 <deck>.pdf build/scratch/src
```

**Look at the images.** Specifically look at Donna source slides 6, 7, 9, 10, 14, 19. You will see the defects catalogued in §7.1. Those defects are the reason this rebuild exists.

### 1.4 Facts about the environment you must design around

Verified on this machine, 2026-08-09. These are not suggestions.

1. **Playfair Display and Inter are NOT installed.** Neither is Cambria or Calibri. The old Donna deck declares Playfair Display plus Inter, so on Denise's own Mac every headline and every body line in that deck is being substituted right now. That is a large part of why she says the deck is unreviewable. **See §2.2 for the font stack you will use instead.** Do not use Playfair Display or Inter.
2. **`denisekgosnell.github.io/Donna/` returns 404.** The repo went private today, which took GitHub Pages offline. The old Donna deck's Case File 03 tells executives to fetch a `SKILL.md` from that URL. **A dead URL on a slide in front of a board is a failure.** See §5.7 for the replacement path, which does not need a URL at all.
3. **Microsoft Graph cannot set EMAIL reminders on calendar events**, display reminders only. Google Calendar can. This constrains the Deck B finale copy: see §5.9.
4. LibreOffice is your renderer for visual QA. It substitutes fonts it does not have, which is precisely why §2.2 picks fonts it does have.

---

## 2. The brand: one system, two decks

Name it **Atelier** in code comments so both scripts refer to the same thing.

The source of the aesthetic is the Donna deck, and the design north star Denise set for it stands: **built for female executives. Editorial, confident, zero condescension.** Not corporate-template. Not startup-playful. Think a well-set magazine feature: generous space, one strong voice per page, sharp typographic hierarchy, restraint.

### 2.1 Canvas and grid

```js
pres.layout = "LAYOUT_WIDE";   // 13.333 x 7.5 in. SET THIS BEFORE ADDING ANY SLIDE.
```

Both decks. The SigCompass board source is letter-size 4:3; **do not inherit that.** Widescreen, both decks, no exceptions.

One grid, used by every slide in both decks. All values in inches.

```js
const G = {
  ML: 0.89,          // left margin
  MR: 0.89,          // right margin
  W:  11.56,         // content width = 13.333 - ML - MR
  EYEBROW_Y: 0.55,   // kicker line
  TITLE_Y:   0.92,   // headline top
  BODY_Y:    2.05,   // body zone top (after a two-line headline)
  BODY_Y1:   1.72,   // body zone top (after a ONE-line headline)
  BODY_BOT:  6.12,   // body zone bottom. NOTHING crosses this.
  RULE_Y:    6.32,   // hairline above the footer band
  FOOT_Y:    6.50,   // footer / kicker-out line
  SRC_Y:     6.95,   // citation line
  SAFE_BOT:  7.18,   // absolute bottom. NOTHING below this.
};
```

Rules that follow from the grid, and that you will be checked on:

- Every full-content slide has left edge exactly `G.ML` and right edge exactly `G.ML + G.W`. Columns align across slides. An executive flipping through should never see the left edge move.
- Two-column split: left column `x: 0.89, w: 6.22`, right column `x: 7.55, w: 4.90`. Gutter 0.44".
- Three-card row: `w: 3.56` each at `x: 0.89 / 4.89 / 8.89`. Gutter 0.44".
- Four-card row: `w: 2.62` each at `x: 0.89 / 3.87 / 6.85 / 9.83`. Gutter 0.36".
- Minimum gap between any two elements: **0.30"**. Minimum from any slide edge: **0.50"**.

### 2.2 Type: the three-font stack

This is the most important build decision in this document. The stack below satisfies three constraints simultaneously: installed on Denise's Mac so she can review accurately, ships with Microsoft Office on both macOS and Windows so it survives being forwarded or presented elsewhere, and renders true-to-width in LibreOffice so your own QA is trustworthy.

| Role | Font | Why |
|---|---|---|
| **Display / headlines** | **Georgia Bold** | The closest widely-available stand-in for Playfair Display's high-contrast editorial voice. Installed here, ships with every Office and both OSes |
| **Body, labels, eyebrows, captions** | **Arial** (Regular / Bold) | Bulletproof everywhere and QA-accurate. In all-caps with wide `charSpacing` it reads very close to the tracked-out Inter labels in the source deck |
| **Prompt and code blocks** | **Courier New** | Already the source deck's convention. Bulletproof |

Three fonts. No fourth. **Never use Aptos** (no metric-compatible substitute and missing from older Office).

**The Georgia caveat, and what you do about it.** LibreOffice substitutes Georgia with a font of different widths, so your rendered QA of a Georgia headline is approximate. Therefore: **every Georgia text box gets 12% more width or height than the fitted calculation says it needs.** Never rely on a render to tell you a Georgia headline fits. Use the character caps in §7.2 instead, which are computed for Georgia's real metrics.

Arial and Courier New render true-to-width, so QA of body text and prompt blocks **is** trustworthy. Overflow you see in those is real and must be fixed.

**If Denise later wants true Playfair Display:** she installs Playfair Display and Inter from Google Fonts on the presenting laptop, and you change two constants in `brand.js`. Build with the Georgia stack. Note this option in your handoff summary; do not act on it.

#### Type scale

Exact. Do not improvise sizes.

| Element | Font | Size | Case | Tracking | Color on dark | Color on light |
|---|---|---|---|---|---|---|
| Slide headline | Georgia Bold | 40pt | Sentence | 0 | `PAPER` | `INK` |
| Slide headline, long | Georgia Bold | 34pt | Sentence | 0 | `PAPER` | `INK` |
| Statement slide | Georgia Bold | 60pt | Sentence | 0 | `PAPER` | `INK` |
| Big number | Georgia Bold | 72pt | n/a | 0 | `GOLD_L` | `GOLD_D` |
| Eyebrow / kicker | Arial Bold | 12pt | UPPER | `charSpacing: 2.2` | `GOLD_L` | `GOLD_D` |
| Section header | Arial Bold | 20pt | UPPER | `charSpacing: 1.0` | `PAPER` | `INK` |
| Quadrant / node label | Arial Bold | 15pt | UPPER | `charSpacing: 1.4` | `GOLD_L` | `GOLD_D` |
| Body | Arial | 15pt | Sentence | 0 | `PAPER` | `INK` |
| Body, dense | Arial | 13pt | Sentence | 0 | `PAPER` | `INK` |
| Inline label (`Your job today:`) | Arial Bold | 13pt | Sentence | 0 | `GOLD_L` | `GOLD_D` |
| Caption / muted | Arial Italic | 13pt | Sentence | 0 | `WARM` | `MUTE` |
| Citation | Arial Italic | 9pt | Sentence | 0 | `WARM` | `MUTE` |
| Footer chrome | Arial | 9pt | UPPER | `charSpacing: 1.2` | `WARM` | `MUTE` |
| Prompt block | Courier New | 12pt | as written | 0 | `PAPER` | n/a (always dark block) |
| Prompt block label | Arial Bold | 11pt | UPPER | `charSpacing: 1.6` | `GOLD_L` | n/a |

`letterSpacing` is silently ignored by pptxgenjs. The option is **`charSpacing`**.

### 2.3 Palette

Lifted from the Donna deck's actual XML, so this is the real brand, not an approximation.

```js
const C = {
  INK:    "14213D",  // primary dark ground
  SLATE:  "1C2333",  // secondary dark ground / darker panel
  PANEL:  "2A3244",  // raised card on a dark ground
  PAPER:  "F7F3EA",  // primary light ground  (source: F7F3E9)
  PAPER2: "E8E2D2",  // raised card on a light ground
  GOLD:   "C9A227",  // structural accent: rules, node strokes, arrows
  GOLD_L: "E7C766",  // gold for TEXT ON DARK
  GOLD_D: "8A6D14",  // gold for TEXT ON LIGHT
  WARM:   "AFA893",  // muted text on dark
  MUTE:   "5A6379",  // muted text on light
  WHITE:  "FFFFFF",
  // the reserved accent. ONE per deck. See 2.4.
  RED:    "A31621",  // Deck B only
  TEAL:   "1E808F",  // Deck A only
  TEAL_D: "15616D",  // Deck A, teal for text on light
};
```

Hex values carry **no `#`** and **no alpha**. `color: "C9A227"`. Both `"#C9A227"` and 8-digit hex corrupt the file. For translucency use `transparency: 0-100` on fills.

**Dominance.** Roughly 60 to 70% of the visual weight in each deck is `INK` and `PAPER`. Gold is the accent that appears on every slide. The reserved accent appears on three or four slides in the whole deck, no more.

**The one contrast rule you must not break:** `GOLD` (`C9A227`) on `PAPER` is 2.3:1 and **fails**. Never set `C9A227` as a text color on a light ground. Use `GOLD_D` (`8A6D14`, 4.5:1) for gold text on light, and `GOLD_L` (`E7C766`) for gold text on dark. `C9A227` is for **strokes, rules, fills, and arrows only**, where it is fine on either ground.

Verified passing combinations: `GOLD_L` on `INK`; `GOLD_D` on `PAPER` (4.5:1); `RED` on `PAPER` (6.8:1); `WARM` on `INK` (6.3:1); `MUTE` on `PAPER` (4.8:1); `PAPER` on `INK`; `INK` on `PAPER`.

### 2.4 The reserved accent

The Donna deck reserves `RED` (`A31621`) exclusively for Donna's voice. That discipline is why the deck feels designed. Keep the discipline, change the occupant per deck:

- **Deck B keeps `RED`**, and its meaning stays exactly what it was: Donna speaks. Quote epigraphs, the monogram bar of the D, and the full-bleed "She never sends. Ever." slide. Nothing else. Not a bullet, not a highlight, not a chart series.
- **Deck A uses `TEAL`** (`1E808F`) in the identical structural role: the one thing on the slide that matters most. Teal is carried over from the existing SigCompass board deck, so it reads as brand continuity to anyone who saw August's walkthrough, and it is not Suits-coded. Use `TEAL_D` (`15616D`) when teal must be text on a light ground.

One reserved accent per deck. Same navy, same cream, same gold, same type, same grid: one color differs. That is what makes them read as two chapters of one thing.

### 2.5 The light and dark rhythm

Denise asked for this explicitly on Deck A, and Deck B gets the same treatment for consistency. It is not decoration; it is pacing. A dark slide says *stop and take this in*. A light slide says *here is the work*.

**Two ground modes, and only two:**

- `dark`: background `INK`. Headline `PAPER`. Eyebrow `GOLD_L`. Body `PAPER`. Muted `WARM`.
- `light`: background `PAPER`. Headline `INK`. Eyebrow `GOLD_D`. Body `INK`. Muted `MUTE`.

Plus one special: `accent`, a full-bleed `RED` or `TEAL` ground with `WHITE` type, used **at most twice per deck** for a single-sentence statement.

**Rhythm law.** Assign the mode from the slide's job, then verify the sequence obeys all four:

1. Every **divider, statement, and section-opener is `dark`**. Every **working slide (prompts, tables, tour stops, assignments) is `light`.**
2. **Never more than three consecutive slides in the same mode.** A run of four is a bug.
3. **Open `dark`, close `dark`.** Title slide and final slide are always dark.
4. Any slide adjacent to an `accent` slide must be `dark`, so the accent lands as a jolt out of dark rather than a clash out of cream.

Both decks' mode maps are given explicitly in §4 and §5. Follow them. After building, print the actual sequence and diff it against the spec (§8, Pass 4).

### 2.6 Motifs

Pick these up from the source deck and repeat them. **These four are the entire vocabulary.** Do not add a fifth.

1. **The gold double ring.** Two concentric circles, gold hairline, with a mark inside. Outer 1.82" diameter, inner 1.55", stroke 1pt `GOLD`. Four tiny gold tick marks at the cardinal points, 0.09" long. This is the deck's signet, and it appears on the title and closing slides.
   - **Deck B mark:** the letter **D**, Georgia Bold 66pt, `RED`, optically centered.
   - **Deck A mark:** a **compass rose**. A four-point star: two crossed thin gold triangles (N/S tall, E/W wide), 0.62" across, with the N point filled `TEAL` and the other three `GOLD` at 35% transparency. Same ring, same ticks, same size, zero Suits.
2. **The gold hairline rule.** 0.75pt `GOLD`, full content width, used once per slide at `G.RULE_Y` to separate the footer band from the body. Nowhere else. **This is the only line in the system.** No stripes down slide edges, no bars under titles, no single-side borders on cards. Those read as AI filler and they are banned.
3. **The skyline.** A thin gold outline city silhouette, sitting on the bottom edge of dark title and closing slides, 8.0" wide, centered, 0.62" tall, `GOLD` stroke at 50% transparency. **Deck B only** (it is Manhattan, and Manhattan is Suits). **Deck A's equivalent is a horizon rule**: a single 0.75pt gold line at 40% transparency spanning 8.0" centered, with one small filled `TEAL` diamond 0.10" at its midpoint. Same weight in the composition, different vocabulary.
4. **The small gold diamond.** 0.11" rotated square, `GOLD`, used as the list marker in place of a bullet, and as a divider glyph between phrases in a footer. This is your only bullet. Never emit a literal `•`.

### 2.7 Slide chrome

Every slide except title, closing, `accent`, and dividers gets:

- The hairline rule at `G.RULE_Y`.
- A footer at `G.FOOT_Y`, left-aligned at `G.ML`, Arial 9pt UPPER `charSpacing: 1.2`, in `WARM` (dark) or `MUTE` (light):
  - Deck A: `SIGNATURE  ◆  SIGCOMPASS REVEAL  ◆  AUGUST 2026`
  - Deck B: `SIGNATURE  ◆  BUILD YOUR OWN DONNA  ◆  AUGUST 2026`
  - The `◆` is the gold diamond glyph as a separate small shape, not a text character, so it can be gold while the text is muted. Two of them, at fixed x positions.
- A slide number, right-aligned at `G.ML + G.W`, same baseline, same style.

Dividers get the footer but **no rule and no number**: they should feel like a breath.

### 2.8 Speaker notes: mandatory, on every slide

`slide.addNotes("...")`, plain text, once per slide. Never a text box on the slide.

Denise presents from these. Each note has this shape, in this order:

```
[TIMING] 90 sec.
[SAY] The one or two sentences that must be said out loud on this slide.
[DO] Any physical action: hands up, switch to the live tool, hold for the room.
[WATCH] The failure mode. What goes wrong here and the fix.
[NEXT] The one-line bridge into the following slide.
```

Where the existing source decks have good notes (the STN deck's notes are excellent, and the Donna deck's notes are strong), **carry the substance across**. Do not throw away Denise's voice and write generic facilitator copy. Reuse her phrasing, restructured into the five tags.

The `[TIMING]` values across a deck must sum to the deck's slot length. This is checked in §8, Pass 7.

### 2.9 Deck A: the zero-Suits rule

Denise was explicit. Deck A must match Deck B's visual style and contain **no reference to Suits whatsoever**. This is a hard constraint, and it is easy to violate accidentally because the brand grew out of the show.

**Banned from Deck A, in slide text, speaker notes, alt text, file names, shape names, and code comments that could leak into XML:**

- The words `Suits`, `Donna`, `Paulsen`, `Harvey`, `Specter`, `Pearson`, `Litt`, `Zane`, `Ross`
- Any quotation attributed to a character
- The `D` monogram
- The Manhattan skyline
- "case file" as a section label (it is Deck B's device)
- Law-firm framing of any kind: closer, associate, the firm, name partner

**Permitted, because they are not Suits:** the navy, the cream, the gold, the double ring, the diamond, Georgia headlines, the editorial layout. A shared visual system is the point. The show is not.

One nuance: Deck A ends by handing off to a session literally named "Build Your Own Donna," which is on the printed agenda. **The single permitted mention** is on Deck A's final break slide, as the name of the next session, e.g. `NEXT: BUILD YOUR OWN DONNA  ◆  2:40`. Do not explain it, do not quote anything, do not put a D on it. That one line is the only appearance of the word.

Verification is automated: §8, Pass 6.

### 2.10 House writing style

- **No em dashes in sentence copy.** Denise removed them all deliberately (commit `18d6ea8`) and they crept back into the source. Use a period, a comma, a colon, or restructure. The **only** permitted em dash in either deck is the quote-attribution mark in Deck B, as in `— DONNA PAULSEN, SUITS`. Enforced in §8, Pass 3.
- Short sentences. An executive reads a slide in four seconds.
- **Never center body text.** Left-align every paragraph and list. Center only headlines on statement slides and axis labels on the quadrant slides.
- Write the number as a numeral when it is the point (`300`, `28%`, `10x`).
- Second person. "You run a cockpit," not "executives run cockpits."
- No exclamation points. No "leverage," "synergy," "unlock," "journey" as a metaphor for work, or "delve."
- Every statistic carries its source on the slide, in the citation line. §3.4 is the sourced set. **Do not use a statistic that is not in §3.4.**

---

## 3. The shared spine: what makes these two decks one argument

Build this section into your head before you write either deck. Both decks are checked against it in §8, Pass 5.

### 3.1 The two-sides-of-one-coin structure

| | Deck A: SigCompass | Deck B: Donna |
|---|---|---|
| Answers | **Where** are we driving the business | **How** does the work actually run |
| The flywheel it teaches | The **strategy** flywheel: bookings, data, personalization, bookings | The **execution** flywheel: document, test, revise, operate |
| The artifact | A measured funnel you read weekly | A written document an agent runs |
| What the exec leaves with | A view of their business and the metrics that move it | A working agent and a repeatable method |
| The verb | **Steer** | **Delegate** |

Running an 8, 9, or 10-figure business is strategy **plus** execution. Deck A is the strategy half. Deck B is the execution half. Neither is sufficient. Say so in both.

### 3.2 The three explicit handshakes

These are the load-bearing joints. Each must be unmistakable on the slide, not merely implied in the notes.

**Handshake 1: the operational loop is the executive workflow of digital transformation.**
Deck A, slide 10. Deck B, slide 2. Same idea, stated from each side: the question of how knowledge moves across a business is the same question in both hours. Everyone else has established patterns for it. Signature is at step 1: get the data flowing from offer to closed booking, and measure the confidence gaps along the way.

**Handshake 2: the cockpit.**
Deck A, slide 13. Deck B, slide 3 references it in one line. The role of an executive running a business at this scale is to learn to fly their ship. A modern business cockpit is built like a ship's bridge, but instead of reading currents, weather, and sea-floor depth to choose a heading, you read metrics, weekly and monthly growth trends, and the edge cases that tell you what is working. Watch them week over week and you start to see the waves, the currents, and the headwinds moving your business. **That is the literacy we are building together.** This also rhymes with the ship language already in the August board deck ("the tour before the voyage"), so it lands as continuity, not a new metaphor.

**Handshake 3: strategy needs an execution loop, or it stays a picture.**
Deck A's closing (slides 19 to 21) sends them to the break with the strategy flywheel and one open question: what makes it turn? Deck B's slide 2 answers it in one slide, then spends 90 minutes proving the answer by having each executive build one.

### 3.3 The vocabulary contract

Same words, same meaning, both decks. Inconsistency here is what makes two decks feel like two vendors.

| Term | Locked meaning | Never say instead |
|---|---|---|
| **Flywheel** | A loop where each turn makes the next turn easier | "virtuous cycle," "loop" alone |
| **Strategy flywheel** | Deck A's four stations: bookings, data, personalization, bookings | "the revenue flywheel" |
| **Execution flywheel** | Deck B's four stations: document, test, revise, operate | "the Amazon flywheel" after its first mention |
| **The document** | The written artifact that carries judgment out of one head | "the prompt," "the instructions" |
| **Confidence gap** | The measured drop from one funnel stage to the next | "conversion loss," "leakage" |
| **The cockpit** | The instrument panel an executive reads to steer | "the dashboard" |
| **Station** | One stop on a flywheel | "node," "step" (reserve "step" for the workshop's three build steps) |
| **SigCompass** | The product. One word, capital S, capital C | "Sig Compass," "the platform" |

### 3.4 The sourced statistic set

**Use only these. Cite every one on the slide.** All are already in the source decks, which means they have been through Denise's review.

| Stat | Source line to print | Deck |
|---|---|---|
| Personalization drives a 10 to 15% increase in sales conversion | McKinsey | A |
| ~35% of Amazon's revenue is attributed to its recommendation engine | Amazon, publicly reported | A |
| AI-driven recommendations reduce time to booking and raise completion rates | Booking Holdings | A |
| 87% of data science projects never reach production | Gartner | A |
| 58% of the time an organization spends deciding is used ineffectively | McKinsey, 2019 | A |
| 88% of organizations use AI somewhere; ~39% see profit impact; ~6% see real impact | McKinsey, The State of AI (2025) | B |
| Only 21% of adopters have redesigned a single workflow | McKinsey, The State of AI (2025) | B |
| 28% of the knowledge-worker week goes to email | McKinsey Global Institute, 2012 | B |
| 60% of the workday is communication | Microsoft, 2025 | B |
| Four styles of executive | Merrill & Reid, *Personal Styles and Effective Performance* (1981) | B |
| The document mechanism | Bryar & Carr, *Working Backwards* (2021); Nonaka & Takeuchi, *The Knowledge-Creating Company* (1995) | B |

### 3.5 Never fabricate

Non-negotiable. This deck goes in front of the people who own the numbers.

- **Do not invent a single Signature metric.** No conversion percentages, no booking counts, no revenue figures, no agency names, no advisor names, no client names.
- Deck A slide 11 calls for conversion rates between funnel stages. **You will not supply numbers.** You will render them as visibly empty measurement gates, styled as something to be filled in. That is both honest and exactly the message: *these are the numbers we are going to read together.* Spec in §4.5.
- Pipeline and assertion counts from the August board deck (141 / 109 / 605) are dated July 10 and have since grown. If you use them at all, print them as `AS OF JUL 10` and let the notes say to refresh from the latest build. Better: prefer §4 as written, which does not depend on them.
- Every date is verified against §4.6 before it ships.

---

## 4. Deck A: SigCompass Reveal and Product Tour

**File:** `decks/sigcompass-reveal.pptx` · **21 slides** · **50 minutes (1:30 to 2:20)** · **Reserved accent: TEAL** · **Zero Suits**

Timing budget, which must match the sum of your `[TIMING]` notes:

| Block | Slides | Minutes |
|---|---|---|
| Open and context | 1 to 5 | 10 |
| The strategy flywheel | 6 to 7 | 8 |
| From strategy to operations | 8 to 12 | 11 |
| The cockpit | 13 to 14 | 5 |
| The tour | 15 to 17 | 12 |
| Discussion | 18 | 2 |
| Close and handoff | 19 to 21 | 2 |
| **Total** | | **50** |

The mode map. Print your built sequence and diff against this string:

```
D L D L L  D L  D L D  L D L  D L L  D  L L D
1 2 3 4 5  6 7  8 9 10 11 12 13 14 15 16 17 18 19 20 21
```

No run of four. Opens dark, closes dark. 11 light, 10 dark.

### 4.1 Slides 1 to 5: context. Why are we releasing SigCompass?

**Slide 1 · `dark` · Title**
Gold double ring with the **compass rose** mark, centered, top third. Below it, on a `PAPER2` card (like the Donna title's quote card, same geometry), the tagline in Georgia Bold 30pt `INK`: **"One cooperative. One direction."** Below the card, Arial Bold 34pt `PAPER` `charSpacing: 2.0`: **SIGCOMPASS**. Under that, Arial 15pt `WARM`: `The reveal, and the tour. Signature's executive data engine.` Horizon rule motif at the bottom. Footer only, no rule, no number.
`[SAY]` The engine is real, it is running in Signature's cloud, and in twenty minutes you will be driving it.

**Slide 2 · `light` · Where we left off**
Eyebrow: `FEBRUARY 2026 · CLOSING THE LOOP`. Headline: **"We promised you a revenue engine. Here it is."**
Two columns. Left, `WE SAID`; right, `WE SHIPPED`. Five paired rows, from board-deck slide 18, each row a small gold diamond then the promise, then the delivery in `TEAL_D` bold:

| We said | We shipped |
|---|---|
| Start with the revenue decision | Revenue is a live data product: funnel, suppliers, advisors, by travel month |
| Build deep, not wide | Three deep data products, not dashboards for everyone |
| Automate the infrastructure | AI-generated pipelines, rebuilt and re-verified on every change |
| Secure, scalable, observable | One AWS environment, PII governed at the API layer, self-verifying assertions |
| 87% of data projects never reach production | This one is deployed, and you are about to use it |

Citation: `Gartner. Signature data strategy, February 2026.`

**Slide 3 · `dark` · Statement: why now**
The context slide Denise asked for. Statement type, 60pt, centered, no eyebrow:
**"Twenty years of digital transformation gave you data. It never gave you a decision."**
Below, Arial 15pt `WARM`, left-aligned in a 8.6" block centered horizontally: `Decisions are already being made across this business every day, by executives, advisors, leaders, and partners, whether the data is there or not. SigCompass exists to put the best available information in front of the person making the decision, at the moment they are making it.`
`[SAY]` The art of a data strategy is not collecting more data. It is deciding which decisions we support first, and staying relentless about whether those decisions move revenue.

**Slide 4 · `light` · The four stages of data**
Eyebrow: `WHERE REVENUE ACTUALLY SHOWS UP`. Headline: **"Four stages. Revenue starts at the third."**
Four cards in a row (four-card geometry, §2.1): `01 REPORTING / what happened`, `02 INSIGHT / why it happened`, `03 RECOMMENDATION / what to do next`, `04 AUTOMATION / repeatable at scale`. Cards 1 and 2 use `PAPER2` fill with `MUTE` body. Cards 3 and 4 use `INK` fill with `PAPER` body and a `TEAL` filled diamond in the corner. Under cards 3 and 4 only, spanning both, Arial Bold 14pt `TEAL_D`: `REVENUE BEGINS HERE`.
Caption: `Most data programs stall between stages one and two, cycling through reports and definitions without ever crossing into action. That is not a failure of intelligence. It is a failure of sequencing.`

**Slide 5 · `light` · What stalls a program**
Eyebrow: `WHY MOST OF THIS FAILS`. Headline: **"The three ways a data program dies."**
Three cards: `TIME / Slow infrastructure delays delivery until the business has moved on.` `MONEY / Investment continues while returns do not arrive.` `PEOPLE / Specialized teams are expensive and fragile.` Each card carries a large `GOLD_D` numeral.
Right of the cards or beneath, one large stat: `87%` at 72pt `GOLD_D`, with `of data science projects never reach production.` and citation `Gartner.`
Caption in `TEAL_D` bold: `Every choice in this strategy was made to dodge one of these three.`

### 4.2 Slides 6 to 7: the strategy flywheel

**Slide 6 · `dark` · THE STRATEGY FLYWHEEL**
This is the centerpiece of Deck A and it must be visually identical in construction to the Donna deck's flywheel slides. Same ring, same node circles, same gold, same right-hand legend column. Use `flywheel()` from §6.2 with **four** stations.

Eyebrow: `SIGNATURE'S EXECUTIVE DATA STRATEGY`. Headline (one line, so body starts at `G.BODY_Y1`): **"More bookings is the goal. Data is how you get there."**

Ring on the left, hub label **`REVENUE GROWTH`** in Georgia Bold 17pt `GOLD_L` on a filled `TEAL` hub circle. Stations clockwise from top:

| # | Station | Legend line |
|---|---|---|
| 01 | MORE BOOKINGS | Every booking closed is revenue today, and a record tomorrow. |
| 02 | MORE DATA | Every booking, client, and session enriches the cooperative's shared asset. |
| 03 | MORE PERSONAL EXPERIENCES | Advisors meet every client with full context, so the recommendation fits. |
| 04 | MORE BOOKINGS | Personal experiences convert. Trust converts. The loop closes and widens. |

Revenue growth sits in the hub because it is the **output** of the loop, not a station on it. Say that out loud.

Caption: `Bookings grow revenue. That much was always true. What is new is the second half: bookings create data, data creates personalization, and personalization creates bookings. Our whole job is to make data flow in a way that grows revenue, and we do it by making cruise experiences more personal.`

**Slide 7 · `light` · Why personalization, and why first**
Eyebrow: `THE LOWEST-RISK PLACE TO START`. Headline: **"We start with recommendations because they have a track record."**
Three stat callouts across the top, big numerals in `GOLD_D` 72pt with Arial 13pt `INK` beneath and citation in `MUTE` 9pt:
- `10-15%` · `increase in sales conversion from personalization.` · `McKinsey.`
- `~35%` · `of Amazon's revenue is attributed to its recommendation engine.` · `Amazon, publicly reported.`
- `Faster` · `time to booking and higher completion from AI-driven recommendations.` · `Booking Holdings.`

Below, a `PAPER2` card, headed `WHY THIS IS THE LOW-RISK ENTRY POINT` in Arial Bold 14pt `TEAL_D`, four diamond-marked lines:
- The decision already exists. Advisors recommend trips today, with fragmented information.
- We are improving an existing decision, not introducing a new one. No process has to change to get value.
- It is measurable inside six months, against revenue, not against a dashboard.
- It has the longest documented track record of paying for itself early of any data product.

Caption: `Not because recommendations are flashy. Because they are one of the few data products with a long, well documented history of paying for themselves early.`

### 4.3 Slides 8 to 12: from strategy to operations

**Slide 8 · `dark` · Divider**
Centered, no eyebrow, no rule, no number. Small gold diamond above. Georgia Bold 44pt `PAPER`: **"A flywheel is a picture until somebody turns it."** Below in Arial 15pt `GOLD_L` `charSpacing: 1.4` UPPER: `PART TWO · THE OPERATIONAL LOOP`.

**Slide 9 · `light` · The turn**
Eyebrow: `FROM STRATEGY TO OPERATIONS`. Headline: **"So we turn the strategy into one loop the company can feel."**
Two columns. Left, `A STRATEGY IS`: three diamond lines: `A direction everyone can name.` `A bet you can defend to owners.` `A picture on a slide.` Right, `AN OPERATIONAL LOOP IS`, in a `PAPER2` card: `A number somebody owns.` `A weekly rhythm that shows whether it moved.` `A habit that survives you being on a plane.`
Caption in `TEAL_D` bold: `The strategy is agreed. What we are building now is the loop that makes it real, and the awareness of that loop across the company.`

**Slide 10 · `dark` · HANDSHAKE 1**
Eyebrow: `THE PART BOTH SESSIONS SHARE`. Headline: **"This is the executive workflow of digital transformation."**
Body, one 10.2" block, Arial 15pt `PAPER`: `Everything we do this afternoon is one question asked twice: how does knowledge move across a business? Every company that has done this has followed a recognizable pattern, and none of them started at the end.`
Then a three-step progression, gold diamonds, in a `PANEL` card:
- **STEP 1 · WHERE WE ARE** · Get the data flowing from offer to closed booking, and measure the confidence gap at every handoff. `GOLD_L` bold on the label, `PAPER` body. Mark this step with a filled `TEAL` diamond.
- **STEP 2 · NEXT** · Put that flow in front of the person making the decision, at the moment they make it.
- **STEP 3 · THEN** · Let the loop run without anyone remembering to run it.
Caption in `GOLD_L`: `We are at step 1. That is not a small ambition. It is the only one that makes steps 2 and 3 possible.`
`[SAY]` Hold this thought. It is the exact hinge of the second session at 2:40. There we look at the same question from the execution side.

**Slide 11 · `light` · THE MEASURED FLYWHEEL**
The same four-station ring as slide 6, deliberately recognizable, now instrumented. Use `flywheel()` with `gates: true`.

Eyebrow: `THE WORK AHEAD`. Headline: **"Same loop. Now with a number on every handoff."**

Four **confidence gates** sit on the ring at the diagonal midpoints, replacing the arrow triangles. Each gate is a small `PAPER2` rounded rectangle, 1.06" x 0.42", with a 0.75pt `GOLD` stroke, containing:
- Arial Bold 9pt `GOLD_D` UPPER on line 1: `CONVERSION`
- Georgia Bold 15pt `MUTE` on line 2: `___%`

**The percentages stay blank.** Do not invent them. Empty gates are the message. Below the ring, in `TEAL_D` bold 14pt: `These four numbers are what we fill in together.`

Right-hand column, headed `WHERE WE POINT THE WORK`:
- **Measure every handoff.** Quoted to Confirmed to Travelled. Every stage, every month, by agency.
- **Find where we are already winning.** The stages and segments that convert above the rest.
- **Double down there first.** Grow the flow where it is already flowing.
- **Then go after the losses.** With a proven path to compare them against.

Caption: `Starting from what is broken means guessing which of many fixes to try. Starting from what is working leaves one or two obvious moves. We grow the flow where we are already succeeding.`

**Slide 12 · `dark` · Why wins before losses**
Eyebrow: `HOW WE PICK THE NEXT MOVE`. Headline: **"Build off the wins. The losses have too many explanations."**
Two columns, deliberately unequal in tone. Left, headed `START FROM A LOSS` in `WARM`: `Why did this stall? Price. Timing. Data. Follow-up. Supplier. Advisor load. The client changed their mind.` Then: `Seven candidate causes. Every fix is a guess, and every guess costs a quarter.`
Right, in a `PANEL` card headed `START FROM A WIN` in `GOLD_L`: `What did we do here that we are not doing everywhere?` Then: `One or two answers. Both testable. Both already proven inside our own business.`
Caption in `GOLD_L`: `This is the whole reason SigCompass leads with what is working. Wins narrow your choices. Losses multiply them.`

### 4.4 Slides 13 to 14: the cockpit

**Slide 13 · `light` · HANDSHAKE 2**
Eyebrow: `WHAT THE JOB ACTUALLY IS NOW`. Headline: **"Running a business this size is learning to fly your ship."**
Two columns, a direct translation table. Left, `A SHIP'S BRIDGE READS`: `Currents.` `Weather.` `Depth beneath the keel.` Right, in a `PAPER2` card, `YOUR BRIDGE READS`: `Metrics.` `Weekly and monthly growth trends.` `The edge cases telling you what is working, and what is not.`
Below, full width, Arial 15pt `INK`: `Nobody reads one instrument once and knows where they are. You read them week over week, and the pattern appears: the waves, the currents, the headwinds actually moving your business.`
Caption in `TEAL_D` bold: `That literacy is what we are starting to build together. Not the tool. The reading of it.`
`[SAY]` Tie this back to August: we called that day the tour before the voyage. This is the part where you learn to read the instruments, so that when the voyage starts you already know what the panel is telling you.

**Slide 14 · `dark` · What SigCompass is for**
Eyebrow: `SO HERE IS THE POINT OF THE TOOL`. Headline: **"SigCompass is your instrument panel."**
Four items in a 2x2 of `PANEL` cards, each with a gold diamond and a `GOLD_L` bold label:
- **SEE THE FLOW** · Where offers become bookings, and where they stop.
- **SEE THE GAP** · Which handoff is leaking, and by how much, this month against last.
- **SEE THE WIN** · Which agencies, advisors, suppliers, and segments are converting above the rest.
- **ASK IN PLAIN ENGLISH** · The questions you would ask an analyst, answered from governed data.
Caption in `GOLD_L` bold: `Then you start making adjustments on where you are driving. Let's go look at it.`

### 4.5 Slides 15 to 18: the tour, and the discussion

**Slide 15 · `dark` · Divider**
Centered. Georgia Bold 44pt `PAPER`: **"Let's take the tour."** Below in `GOLD_L` UPPER `charSpacing: 1.4`: `PART THREE · SIGCOMPASS, LIVE`. Small line in `WARM` italic 13pt: `Interrupt freely. It is your engine.`

**Slide 16 · `light` · The tour map**
Eyebrow: `FIVE STOPS`. Headline: **"What to watch for at each stop."**
From board-deck slide 11, condensed to five and re-pointed at the flywheel rather than at testing. Five rows, each: a `GOLD_D` numeral, an Arial Bold 15pt `INK` stop name, an Arial 13pt `INK` description, and an Arial Italic 13pt `TEAL_D` **`Watch for:`** line.

| # | Stop | Description | Watch for |
|---|---|---|---|
| 1 | Sign in from SigNet | One click, single sign-on, role-based access | No new passwords, no new portals |
| 2 | Data quality | Client-record coverage by agency and advisor | Where cleanup pays back fastest |
| 3 | Revenue | Quoted, Confirmed, Travelled by travel month; suppliers by name | The shape of the funnel, and where it narrows |
| 4 | Booking journey | Journey analytics and hot leads by family | The stage where a personal touch would change the outcome |
| 5 | Ask it anything | Plain-English questions over the same governed data | That the answer and the chart come from one source |

`[WATCH]` Stop 4 renders representative sample data until the upstream event stream lands. Say that out loud before showing the tab. Stop 5 is where you hand the keyboard to a board member.

**Slide 17 · `light` · Live demo holder and fallback**
The slide Denise leaves up while she drives the product. Eyebrow: `LIVE`. Headline: **"SigCompass."** Then a `PAPER2` card headed `IF THE NETWORK MISBEHAVES` in `GOLD_D`, with a diamond list: `Screenshots of all five stops are in the appendix.` `The tour survives without a connection. The story does not change.`
Leave a marked empty region, `x: 0.89, y: 2.20, w: 11.56, h: 3.80`, with a 0.75pt `GOLD` stroke at 40% transparency and no fill, captioned in `MUTE` italic 11pt at its bottom edge: `Screenshot placeholder. Drop in the five tour captures before presenting.`
`[DO]` Switch to the live environment here. This slide is scaffolding for the 12-minute demo, not something to read.

**Slide 18 · `dark` · The discussion**
Eyebrow: `THE DISCUSSION`. Headline: **"If you had a magic wand, what would SigCompass do for you?"**
Four questions in a 2x2 of `PANEL` cards, each numbered in `GOLD_L` Georgia Bold 30pt:
1. What would it do for you, if it could do anything?
2. Where does it fit in the rhythm of how you run your week?
3. What information would you want in front of you, and how often?
4. Where should it show up: a screen you open, a number in a meeting, a message that finds you?
Caption in `GOLD_L` bold: `Capture every answer. This is the roadmap.`
`[DO]` Take answers, do not present. Write them where the room can see them. `[TIMING]` 2 min here; the real discussion continues into the break.

### 4.6 Slides 19 to 21: close and handoff

**Slide 19 · `light` · Back to the flywheel**
Eyebrow: `WHERE THIS LEAVES US`. Headline: **"The strategy is agreed. Now we build the loop that turns it."**
Left, a **small** version of the four-station ring, 2.9" diameter, no legend, hub reading `REVENUE GROWTH`. Right, in a `PAPER2` card headed `WHAT MAKES IT TURN`:
- `Data flowing from offer to closed booking.` marked done with a filled `TEAL` diamond.
- `A number on every handoff, read weekly.` marked in progress with an open diamond.
- `A team that knows where it is winning and doubles down there.` open.
- `An operating rhythm that runs without anyone remembering to run it.` open.
Caption in `TEAL_D` bold: `Three of those four are strategy, and we have them. The fourth one is execution, and it is what the next session is about.`
This is Handshake 3. Make it land.

**Slide 20 · `light` · The road from here**
**Carry over board-deck slide 8 in full.** Rebuild it in Atelier: eyebrow `THE ROAD FROM HERE`, headline **"From today to the Owners Meeting."** Horizontal timeline via `timeline()` (§6.5), five milestones, plus the testing-window band beneath.

**Verify every date before shipping.** The source slide is anchored to Friday Aug 7 as "today." Today is later than that. Re-anchor milestone 1 to the actual session date, keep the rest as published, and flag any that have passed.

| Milestone | Label | Sub |
|---|---|---|
| 1 | Today | Non-prod code complete. This session. Testing open |
| 2 | Fri, Aug 28 | Production turned on; production testing begins |
| 3 | Fri, Sep 4 | Production testing fully underway |
| 4 | Week of Sep 29 | Owners Meeting, San Antonio. Alpha cohort announced. **Highlight this one in `TEAL`** |
| 5 | Oct 5 to Nov 13 | Alpha: agency owners live on production |

Band beneath spanning milestones 1 through 4, `PAPER2` fill, Arial Bold 11pt `TEAL_D` UPPER `charSpacing: 1.4`: `THROUGH SEP 29 · INTERNAL TESTING WINDOW · YOUR WINDOW`.
Caption: `The only technical difference between non-prod and production is the volume of data. The engine is the same.`

**Slide 21 · `dark` · The break**
Gold double ring with the compass rose, smaller (1.2"), top. Georgia Bold 60pt `PAPER` centered: **"15 minutes."** Below, Arial 17pt `GOLD_L` centered: `Coffee. Then bring your laptop back.`
A `PANEL` card, 7.2" wide, centered, headed `BEFORE 2:40` in `GOLD_L`, three diamond lines:
- Laptop open, plugged in, on the venue network.
- Claude desktop installed and signed in.
- Your work email login handy. You will connect it live.
Footer line, centered, Arial Bold 13pt `WARM` `charSpacing: 1.6` UPPER: `NEXT: BUILD YOUR OWN DONNA  ◆  2:40 TO 4:10`
This is **the only** appearance of the word Donna in Deck A. Nothing else about it. No D, no quote, no explanation.
Horizon rule at the bottom.

---

## 5. Deck B: Build Your Own Donna

**File:** `decks/build-your-own-donna-v2.pptx` · **26 slides** · **90 minutes (2:40 to 4:10)** · **Reserved accent: RED** · **Full Suits**

Denise's brief on this one: *"the existing donna workshop deck is SO MESSY that I can't even review it. Your main work will be to create a new donna workshop deck that is easier to read and is targeted for executives."*

So the mandate is **subtraction**. The source deck is 28 slides that try to say everything. Yours is 26 slides that say less per slide and are legible from the back of the room. Concretely:

- The old deck front-loads 15 slides of context before the first build step. **Yours has 10.** Denise's instruction is explicit: items 1 through 5 of her list are the whole introduction. That is it.
- The old Amazon flywheel has **six** stations and its title collides with the diagram. **Yours has four**, and the title fits.
- The old deck has three slides doing the job of one (11 The Problem, 12 The Fix, 13 House rules, 14 The Plan, 15 a QR code alone). Merge or cut.
- Cut entirely from the source: the standalone bio slide (3), the four-stat transformation slide (5, fold one stat into slide 3), the lone QR slide (15), the "Where else she works" slide (26, fold into discussion).

Timing budget:

| Block | Slides | Minutes |
|---|---|---|
| Bridge and framing | 1 to 6 | 12 |
| Who is holding the pen | 7 to 8 | 8 |
| Rules and plan | 9 to 10 | 5 |
| **Build: step 1** | 11 to 13 | 15 |
| **Build: step 2** | 14 to 16 | 15 |
| **Build: step 3** | 17 to 21 | 15 |
| Discussion | 22 to 24 | 15 |
| Close | 25 to 26 | 5 |
| **Total** | | **90** |

Mode map:

```
D L D D L A  L L  D L  D L D  D L D  D L A L D  D L L  L D
1 2 3 4 5 6  7 8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26
```

Slides 6 and 19 are `accent` (RED). Both are adjacent to dark slides, per §2.5 rule 4.

### 5.1 The progress indicator (Denise's specific ask)

> *"It would be MOST AMAZING if there is a super small flywheel icon that is in the upper right that shows our progress in each of the steps of the donna workshop, so the executives see how we are bringing the amazon execution flywheel to life by building an agent to handle your inbox."*

Build `progressPip(slide, activeStations, mode)` per §6.4 and place it on **every slide from 11 through 21**, the entire build block. Not on the intro, not on the discussion.

A 0.44" gold ring at the upper right, four small dots at its cardinal points, one per station of the execution flywheel, clockwise from top: **DOCUMENT, TEST, REVISE, OPERATE**. Active stations are filled `GOLD`. Inactive are `GOLD` stroke only, no fill. A 7pt `GOLD_L`/`GOLD_D` UPPER caption sits directly beneath naming the active station.

Station mapping across the three build steps. Three steps, four stations, so step 1 covers two:

| Slides | Step | Active | Caption |
|---|---|---|---|
| 11 to 13 | Step 1 | DOCUMENT, TEST | `DOCUMENT · TEST` |
| 14 to 16 | Step 2 | REVISE | `REVISE` |
| 17 to 21 | Step 3 | OPERATE | `OPERATE` |

On slide 21, the finale checkpoint, fill **all four** and caption `THE LOOP IS CLOSED`. That is the payoff of the device and it should be the last thing the pip does.

Position: ring centered at `(12.20, 0.66)`, so `x: 11.98, y: 0.44, w: 0.44, h: 0.44`. Right edge 12.42, inside the 12.44 margin. Caption box `x: 11.30, y: 0.92, w: 1.80, h: 0.18`, right-aligned, `margin: 0`.

**The pip must never collide with the eyebrow.** Eyebrows on slides 11 to 21 are capped at `w: 10.80` (not `G.W`) so they stop at x=11.69, leaving 0.29" of clearance. Enforce this in `eyebrow()` by passing the narrow width whenever a pip is present.

### 5.2 Slides 1 to 6: the bridge and the framing

**Slide 1 · `dark` · Title**
Rebuild source slide 2 in Atelier, unchanged in content. Gold double ring with the **D monogram** in `RED`. `PAPER2` quote card: `"I'm Donna. I know everything."` Georgia Bold Italic 30pt `RED`, centered; attribution `— DONNA PAULSEN, SUITS` Arial Bold 11pt `INK` `charSpacing: 1.6`. Below: **BUILD YOUR OWN DONNA** Arial Bold 34pt `PAPER` `charSpacing: 2.0`; then `A 90 minute workshop for executives who are done reading email.` Arial 15pt `WARM`. Skyline motif at the bottom.

Fold the venue Wi-Fi lines from source slide 1 into the **speaker notes**, not onto the slide. A projected password is clutter; Denise says it out loud.

**Slide 2 · `light` · HANDSHAKE, the one bridge slide**
Denise: *"you will have ONE slide that is the cohesive building point from the sigCompass slide deck, and then pivot into the similar topic for this deck."* One slide. Not two.

Eyebrow: `WHERE WE JUST WERE, AND WHERE WE ARE GOING`. Headline: **"Same coin. You just saw the strategy side."**
Two columns, visually parallel and deliberately symmetrical. Left, `1:30 · THE STRATEGY FLYWHEEL`, with a small four-station ring 2.1" diameter, hub `REVENUE GROWTH`, stations abbreviated `BOOKINGS / DATA / PERSONAL / BOOKINGS`. Right, `2:40 · THE EXECUTION FLYWHEEL`, with a second 2.1" ring, hub `THE DOCUMENT`, stations `DOCUMENT / TEST / REVISE / OPERATE`.
Between them, centered vertically, a gold diamond and the words Arial Bold 15pt `GOLD_D` UPPER `charSpacing: 1.4`: `ONE COIN`.
Caption, full width, Arial 15pt `INK`: `The last hour was where we are driving. This hour is how the work actually runs. Running a business at your scale is both, and most people are only taught the first one.`
`[SAY]` Strategy tells you the heading. Execution is the crew, the watch schedule, and the log book. You need both, and only one of them gets taught.

**Slide 3 · `dark` · The 10x slide**
The thesis of the afternoon. Statement type, 56pt `PAPER`, centered:
**"AI only speeds up your current processes by 10x."**
Below, in `PANEL` card, two lines Georgia Bold 26pt: `10x more confusion.` in `WARM`, then `10x more alignment.` in `GOLD_L`. A gold diamond between them.
Then Arial 15pt `PAPER`: `We are all learning to play doubles, and the balls just started coming a lot faster. The answer is not more creative plays. It is more basic ones. Emails. Numbers. Percentages. Knowing the same simple things at the same time, and acting on them together.`
Caption `GOLD_L` bold: `Fundamentals first. Bounce pass. Score. Then we get fancy.`
`[SAY]` One line about the cockpit, tying to the previous session: reading the panel together is the fundamental. This hour is about closing the work threads that fill it.

**Slide 4 · `dark` · THE EXECUTION FLYWHEEL**
Denise: *"the amazon operational flywheel needs to be a lot shorter, maybe just Document, Test, Revise, Operate, Document. just those stops. make it a lot simpler."*

Four stations. Not six. Use `flywheel()` with four stations and the **short-legend** variant: because there are only four, the legend lines sit in a right column with generous space, so nothing overlaps. This is the slide the old deck got wrong twice.

Eyebrow: `HOW A NINE-FIGURE BUSINESS LINE ACTUALLY RUNS`. Headline (must be ONE line at 40pt, so keep it short): **"Amazon won on documents."** Hub: **`THE DOCUMENT`** in `GOLD_L` on an unfilled hub with a gold stroke.

| # | Station | Legend |
|---|---|---|
| 01 | DOCUMENT | One person writes down what they know. Prose, not slides. |
| 02 | TEST | The room reads it in silence and attacks the document, not the person. |
| 03 | REVISE | It absorbs the debate. The writing is the thinking. |
| 04 | OPERATE | Teams work backwards from it, and every metric has a named owner. |

Caption: `Bezos took PowerPoint out of the S-Team room. What replaced it was not a better meeting. It was an artifact that outlives the meeting.`
Citation: `Bryar & Carr, Working Backwards (2021). Nonaka & Takeuchi, The Knowledge-Creating Company (1995).`

**Slide 5 · `light` · What changed**
Same four-station ring, same positions, hub now filled `RED` reading **`SKILL FILE`**. The visual rhyme is the entire point: identical wheel, new hub.
Eyebrow: `WHAT CHANGED`. Headline: **"The artifact is now a skill file."**

| # | Station | Legend |
|---|---|---|
| 01 | DOCUMENT | You write the file. Your people, your rules, your voice. Plain English. |
| 02 | TEST | The agent reads it. It cannot be charmed and it does not skim. |
| 03 | REVISE | You edit the file. Not the model. The file. |
| 04 | OPERATE | You put it on a schedule. It runs at 4:30 without you. |

Caption in `GOLD_D` bold: `Same four steps. The reader used to be a room. Now it is an agent. That is the entire difference, and it is the whole workshop.`

**Slide 6 · `accent` (RED) · AI does not fix a broken process**
Full-bleed `RED`, `WHITE` type. Statement 56pt centered: **"AI does not fix a broken process. It runs it faster."**
Below, three stats in a row, Arial Bold 30pt `WHITE` numerals with 13pt `WHITE` at 85% opacity beneath:
- `88%` · `of organizations use AI somewhere.`
- `~6%` · `see real profit impact from it.`
- `21%` · `have redesigned a single workflow.`
Then one line, Arial Bold 15pt `WHITE`: `Of roughly 25 things McKinsey tested, one predicts profit impact above all others: fundamentally redesigning the workflow.`
Caption `WHITE` italic: `A vague document used to waste a meeting. A vague document now runs ten thousand times a day.`
Citation: `McKinsey, The State of AI (2025).`

### 5.3 Slides 7 to 8: who is holding the pen

**Slide 7 · `light` · Four kinds of executive**
Rebuild source slide 9. Use `quadrant()` (§6.3). Eyebrow: `BEFORE YOU WRITE ANYTHING, KNOW WHO IS HOLDING THE PEN`. Headline: **"Four kinds of executive."**

Axes: vertical `CLOSED` at top / `OPEN` at bottom; horizontal `ASK` at left / `TELL` at right. Axis sub-labels in Arial Italic 11pt: CLOSED `you control what you show`, OPEN `you show what you feel`, ASK `you gather, then move`, TELL `you move, then gather`.

Quadrant names Georgia Bold 34pt `GOLD_D`, one line of Arial 13pt `INK` beneath each:

| Position | Name | Line |
|---|---|---|
| Closed × Ask (upper left) | ACCURACY | Show me the reasoning before the recommendation. |
| Closed × Tell (upper right) | TIME | Do not explain it. Close it. |
| Open × Ask (lower left) | TRUST | Who does this touch, and do they know yet? |
| Open × Tell (lower right) | VISION | Where else could this go? |

Caption: `Research from the early 1960s, and still the most useful map of an executive there is. You will recognize yourself in two of these. Most of us are one on a calm day and another on a hard one.`
Citation: `Merrill & Reid, Personal Styles and Effective Performance (1981).`

**Slide 8 · `light` · Your assignment**
Denise: *"slide 10 of the Donna workshop needs to copy the x and y axis of slide 9, but it instead needs to be about how to view the next phase of this workshop depending on who you are."*

**Same axes, drawn again.** Not a plain 2x2 of cards: the cross must be there so the room reads it as the same map. Draw the axes at 0.75pt `GOLD` at 45% transparency so they recede behind the text, with the four end labels at 11pt. Then place one text block in each quadrant.

Content is compressed to a fixed three-line micro-structure per quadrant so it fits. **The full narrative goes in the speaker notes, and it is long: write it out there in Denise's words.**

Each block: quadrant name Arial Bold 17pt `GOLD_D` `charSpacing: 1.2` UPPER, then three lines at Arial 12pt, each opening with an Arial Bold 12pt `GOLD_D` inline label.

**TIME** (Closed × Tell), upper right:
- `Your lens:` You want it running before I finish the sentence.
- `Your job today:` Experience this as the job description you are about to hire for. Somebody will document, test, revise, and operate this loop for your company.
- `You leave with:` A plan for how you invest in and delegate this workflow.

**ACCURACY** (Closed × Ask), upper left:
- `Your lens:` Show me the reasoning before the recommendation.
- `Your job today:` Hunt the non-determinism. That is where errors creep into a workflow, and scaled wrong knowledge is what actually slows a business down.
- `You leave with:` The governance and testing this needs to build repeatability instead of chaos.

**TRUST** (Open × Ask), lower left:
- `Your lens:` Who does this touch, and do they know yet?
- `Your job today:` Decide where human relationships are best served by technology, not replaced by it. Our secret sauce as a cooperative is that we know what a relationship is worth.
- `You leave with:` The line you hold on where AI helps people flourish instead of frying them.

**VISION** (Open × Tell), lower right:
- `Your lens:` Where else could this go?
- `Your job today:` Today is email plus plain English. See the invisible digital headquarters behind it: you write English sentences, and a probabilistic network makes that workflow real.
- `You leave with:` The first step into the worlds you can build for yourself and your company.

Caption in `GOLD_D` bold: `All four of these are correct. Pick yours and spend the next hour there.`

**Speaker notes for this slide must contain the full versions.** Denise's own language, which you will find in her brief, expanded per quadrant. For example, VISION: physical infrastructure is the analogy, open-and-tell people can see how a physical space should be built around how people will use it, to work and play and be human. In this era we are building an invisible digital headquarters for how you run, direct, and operate the business. TRUST: "AI" means humans write natural language to describe a product, and that innovation line is doing wonderful things for the speed of operations, but our secret sauce as a cooperative is human relationships. ACCURACY: your job is to help the TIME executive minimize scaling errors, because that is how businesses get dragged down, we slow significantly when we start sharing collective knowledge that is incorrect. TIME: you are plotting how you will invest in and delegate this workflow to be built for your company.

### 5.4 Slides 9 to 10: rules and plan

**Slide 9 · `dark` · House rules**
Five rules, from source slide 13, unchanged in substance. Eyebrow: `HOUSE RULES`. Headline: **"Five of them."**
Five rows, each a `GOLD_L` Georgia Bold 26pt numeral then Arial 15pt `PAPER`:
1. She never sends. Drafts only. You are the send button.
2. She never deletes. Nothing we do today is destructive.
3. We move together. Every step ends at a checkpoint.
4. Copy buttons everywhere. Nobody types more than a sentence.
5. No question is too small. Stuck for 60 seconds, hand up.
Caption `GOLD_L` bold: `If anything I just said did not compute, perfect. You are exactly who this is for.`

**Slide 10 · `light` · The plan**
Eyebrow: `THE PLAN · 2:40 CONTEXT · 3:00 BUILD · 3:45 DISCUSSION · 4:10 DONE`. Headline: **"Three steps. Forty-five minutes."**
Three cards (three-card geometry). Each: `GOLD_D` Georgia Bold 44pt numeral; Arial Bold 15pt `INK` name; Arial 13pt `INK` description; then a bottom line Arial Bold 12pt `GOLD_D` UPPER naming the flywheel stations.

| # | Name | Description | Stations |
|---|---|---|---|
| 01 | FIRST IMPRESSIONS | One desk for everything. Connect your email and calendar, and she drafts her first reply. | `DOCUMENT · TEST` |
| 02 | THE TRIAGE DESK | You brief her once. Red, yellow, gray. Your people, your priorities, your voice. | `REVISE` |
| 03 | DONNA, FULL TIME | Her playbook becomes a skill she keeps, and she takes the 4:30 evening shift. | `OPERATE` |

**The source deck's version of this slide overflows its cards.** The station line spills below the card edge and the caption underneath collides with it. Fix: cards are `h: 3.20` at `y: 2.10`, station line pinned at `y: 4.90` inside the card, caption at `y: 5.60`. Verify no overlap in the render.

Caption: `Every step is one station of the flywheel. You write a document, you test it, and you put it on the clock.`

### 5.5 Slides 11 to 13: build step 1 (pip: DOCUMENT · TEST)

**Slide 11 · `dark` · Divider**
Centered. `GOLD_L` UPPER `charSpacing: 2.0` 14pt: `STEP ONE`. Georgia Bold 48pt `PAPER`: **"First impressions."** Then Arial 15pt `WARM`: `Give her a desk, connect your inbox, and watch her read it.` Pip present, DOCUMENT and TEST filled.

**Slide 12 · `light` · The build**
Eyebrow (narrow, `w: 10.80`): `STEP ONE · FIRST IMPRESSIONS`. Headline: **"Create her project, then connect your accounts."**
Left column: a `PAPER2` card headed `THE SETUP` with three diamond lines: `Projects, then New project. Name it Donna.` `Settings, then Connectors.` `Connect Gmail, Calendar, and Drive. All three, now.` Then a `MUTE` italic line: `Outlook: Microsoft 365 covers mail, calendar, and files in one.`
Right column: two prompt blocks via `promptBlock()` (§6.6).
- Label `PROMPT 1 · THE QUESTION`: `What landed in my inbox in the last 24 hours that actually needs ME? Top 5, one line each.`
- Label `PROMPT 2 · THE FIRST DRAFT`: `Draft a reply to #1. Under 100 words, warm but decisive. Save it as a draft in my email so I can review it there. Do not send it.`
`[WATCH]` The classic failure is signing into the personal Google account instead of work. If a connector reads Connected but Claude cannot see mail, quit Claude fully and reopen.

**Slide 13 · `dark` · Checkpoint**
Eyebrow: `STEP ONE · CHECKPOINT`. Centered, a gold check diamond, then Georgia Bold 44pt `PAPER`: **"A draft you didn't write is waiting in your drafts folder."** Below in `GOLD_L` bold 17pt: `The interview is over. She's hired. Now we train her.`
`[DO]` Hold here until every laptop passes. Nobody moves on.

### 5.6 Slides 14 to 16: build step 2 (pip: REVISE)

**Slide 14 · `dark` · Divider**
`STEP TWO` · **"The triage desk."** · `Teach her your rules once, and never explain them again.`

**Slide 15 · `light` · The build**
Eyebrow: `STEP TWO · THE TRIAGE DESK`. Headline: **"This is the document. Everything else is plumbing."**
Left, 62% width: one `promptBlock()` labeled `PROJECT INSTRUCTIONS · FILL 4 BLANKS`, carrying the source deck's triage instruction verbatim (source slide 19). Blanks in `GOLD_L` inside the block.
Right, 34%: the four blanks as a checklist, each a gold diamond, Arial Bold 14pt `INK` label and Arial 12pt `MUTE` hint:
- `Your always-red list` · the people who jump every queue
- `Your #1 deal` · the one project that is always urgent
- `Your delegates and their lanes` · one to three people, and what each owns
- `Your voice, in 3 words` · warm, brief, decisive is a fine start

**The source deck's version of this slide has the right column's text overlapping between items.** Cause: fixed 0.34" row pitch with two-line content. Fix: compute each row's height from its wrapped line count and stack with a 0.18" gap. See §7.
`[SAY]` The delegates blank is the one the pilot group left empty. Yellow only works if she knows who owns what.

**Slide 16 · `dark` · Checkpoint**
`STEP TWO · CHECKPOINT` · **"You get one table instead of an inbox."** Below, a small `promptBlock()` with just `Triage my inbox.` and the caption `the entire daily ritual, from now on`. Then `GOLD_L` bold: `Chat is a conversation. A project is a standing arrangement.`

### 5.7 Slides 17 to 21: build step 3 (pip: OPERATE)

**Slide 17 · `dark` · Divider**
`STEP THREE` · **"Donna, full time."** · `The document leaves your hands and goes on the clock.`

**Slide 18 · `light` · The skill**
Eyebrow: `STEP THREE · HER PLAYBOOK`. Headline: **"She writes her own playbook."**

**Critical change from the source deck.** Source slide 21 instructs executives to fetch a template from `denisekgosnell.github.io/Donna/skills/donna-replies/SKILL.md`. **That URL now returns 404** because the repo is private. Do not put it on a slide. The replacement needs no URL at all, and is a better step anyway, because the project already contains everything the skill needs:

`promptBlock()` labeled `PASTE INSIDE YOUR DONNA PROJECT`:
```
Turn this project's triage instructions into a reusable skill file
called donna-replies. Use everything you already know from this
project: my VIPs, my delegates, my voice, my rules. Include the
line "Never send. Never delete. No exceptions."
Then give me the finished SKILL.md as a file I can download.
```
Then a three-beat handoff, each a `GOLD_D` numeral and one line: `1 · She writes the file.` `2 · You download it. The file card has a download arrow.` `3 · Cowork, then Skills, then Add skill, then upload it.`
Then a `PAPER2` card in `GOLD_D` bold: `You should see donna-replies in your Cowork skills list before anyone touches scheduled tasks.`
`[SAY]` A skill written in chat does not exist in Cowork until you upload it. This is the step the pilot group missed. Go slow and demo it on screen.

**Slide 19 · `accent` (RED) · She never sends**
Keep this slide almost exactly as the source has it, because it works. Full-bleed `RED`, `WHITE` type, one white diamond above. Georgia Bold 66pt centered: **"She never sends. Ever."** Below, Arial 15pt `WHITE`: `Every reply and every handoff note lands in your drafts and waits for your say-so. She never deletes anything either.` Then Arial Italic 13pt `WHITE` at 85%: `Written into the skill itself: "Never send. Never delete. No exceptions."`
Pip still present, in `WHITE` rather than gold on this ground.

**Slide 20 · `light` · The standing order**
Eyebrow: `STEP THREE · THE EVENING SHIFT`. Headline: **"Give her the 4:30 shift."**
Left: `promptBlock()` labeled `COWORK · SCHEDULED TASKS · NEW TASK` with the source slide 23 standing order verbatim, ending on the dry-run line, which is the finale trigger.
Right: a three-row time ladder, Georgia Bold 30pt `GOLD_D` times with Arial 13pt `INK` beside each: `4:30 · she works` / `4:54 · you are notified` / `4:55 · a five-minute read`.
Beneath, a `PAPER2` card, `GOLD_D` bold heading `GMAIL VS OUTLOOK`, then Arial 12pt `MUTE`: `Google Calendar can send a true email reminder one minute before the event. Microsoft 365 sends a calendar notification instead, because Graph cannot set email reminders. Both get you the 4:54 nudge.`
This is the verified constraint from §1.4.3. State it plainly rather than promising something Outlook cannot do.

**Slide 21 · `dark` · The dry run**
Eyebrow: `STEP THREE · CHECKPOINT`. Georgia Bold 72pt `GOLD_L` centered: **"4:54 PM"** Below, Georgia Bold 34pt `PAPER`: `Her first briefing arrives before you leave the room.` Then Arial 15pt `WARM`: `The trick: Claude never emails you. Your calendar does. The briefing lands from a sender you already trust.`
**Pip: all four stations filled, caption `THE LOOP IS CLOSED`.** This is the device's payoff.
`[DO]` Hold the silence while the laptops ping.

### 5.8 Slides 22 to 24: the discussion

Denise: *"we need a discussion section again, just like in the sigcompass workshop. this discussion section needs to have 2 topics to branch from: one on how each executive persona experienced the workshop and what they got out of it. the second topic is how they see the amazon execution flywheel coming to life with this automated agent."*

**Slide 22 · `dark` · The pivot**
Statement 56pt `PAPER` centered: **"This was never about email."**
Below, Arial 15pt `PAPER` in a centered 9.4" block: `You automated a workflow today by writing plain English. Rules became a project, the project became a skill, and the skill got a schedule.` Then `GOLD_L` bold 17pt: `Email was the rehearsal. The same flywheel runs any workflow you can describe in words.`

**Slide 23 · `light` · Discussion, topic one**
Eyebrow: `THE DISCUSSION · TOPIC ONE`. Headline: **"How did your quadrant experience the last hour?"**
A 2x2 of `PAPER2` cards matching the quadrant map, each headed with its name in `GOLD_D` and carrying one question:
- **ACCURACY** · Where did you find the non-determinism, and what would you make it prove before you trusted it?
- **TIME** · What is the job description you just watched someone need, and who is it?
- **TRUST** · Where did this get close to a relationship you would not hand over?
- **VISION** · What was the second thing on your list before I finished the first step?
Caption: `Every one of you saw a different workshop. That is the point.`

**Slide 24 · `light` · Discussion, topic two**
Eyebrow: `THE DISCUSSION · TOPIC TWO`. Headline: **"Where does this flywheel turn next in your business?"**
Left: the four-station ring, 2.9", hub `THE DOCUMENT`. Right, four questions in a `PAPER2` card, each opening with a `GOLD_D` bold station name:
- `DOCUMENT:` What do you re-explain to somebody every single week?
- `TEST:` What arrives daily that somebody else summarizes for you?
- `REVISE:` Which decision waits on you only because the information is scattered?
- `OPERATE:` What would you want running at 4:30 tomorrow without you?
Caption in `GOLD_D` bold: `Answer any one of these out loud and you have specified your next agent.`

### 5.9 Slides 25 to 26: the close

**Slide 25 · `light` · The call to action**
The last substantive slide, and the one Denise specified in the most detail. Four CTAs, one per quadrant, plus the tension point.

Eyebrow: `WHAT TO DO MONDAY`. Headline: **"Four assignments. One per quadrant."**
2x2 of `PAPER2` cards. Each: quadrant name Arial Bold 15pt `GOLD_D` `charSpacing: 1.2`, an Arial Bold 14pt `INK` imperative, then Arial 12pt `INK` detail.

| Quadrant | Imperative | Detail |
|---|---|---|
| **TIME** (Closed × Tell) | Own the delegation. | What priority is AI workflow for you, your S-team, and your company? Appoint a lead. Set a timeline. |
| **ACCURACY** (Closed × Ask) | Harden the ground. | Name the data, systems, and processes that must be trustworthy before we scale decisions on top of them. |
| **TRUST** (Open × Ask) | Write the design principles. | How does this help you, your leadership team, and your people flourish as human beings? You hold the adoption criteria. |
| **VISION** (Open × Tell) | Draw the flywheels. | Three to five years out: how is the business run, what is automated, what reaches the S-team, the O-team, directors, managers? |

Below all four, full width, in a slim `INK` band with `PAPER` type (this is the one exception to "no bars"; it is a content block, not decoration, so give it real height, `h: 0.86`, and real padding):
Arial Bold 14pt `GOLD_L`: `AND HERE IS THE USEFUL PART:` then Arial 14pt `PAPER`: `each of these four creates tension for the other three. That tension is your requirement set, your governance, and your strategic direction. You need all four in the room.`

**Slide 26 · `dark` · Close**
Gold double ring with the `RED` D monogram. `PAPER2` quote card: `"If you were ever lucky enough to have me, you wouldn't want to share."` Georgia Bold Italic 26pt `RED`, attribution beneath. Then Georgia Bold 40pt `PAPER` centered: **"Yours starts tomorrow at 4:54."** Skyline motif at the bottom.
Footer, centered, Arial 12pt `WARM`: `denise@denisegosnell.ai`

**Do not put the GitHub URL or a QR code on this slide.** The site is offline (§1.4.2). A dead link or a QR code that resolves to a 404 in front of a board is worse than no link. If Denise wants the resources link back, that is a separate decision about re-publishing the site, and it is not yours to make. Note it in your handoff summary.

---

## 6. Build mechanics

Everything in this section goes in `build/brand.js` and is imported by both deck scripts. Write these helpers **first**, verify each renders correctly on a scratch slide, and only then build the decks. Building slides ad hoc is how the source deck ended up inconsistent.

### 6.1 The pptxgenjs footguns

Every one of these has bitten someone. Read them all.

1. **`pres.layout = "LAYOUT_WIDE"` before adding any slide.** The default is 10 x 5.625. Off-canvas coordinates are written, not clamped: the shape simply is not on the slide.
2. **Hex: no `#`, no alpha.** `"C9A227"`. Both `"#C9A227"` and `"C9A22780"` corrupt the file.
3. **pptxgenjs mutates option objects in place.** Never share a `shadow` or options object between two `add*` calls. Build a fresh object every time. Your helpers must return new objects, not module-level constants.
4. **Shadow `offset` must be >= 0.** A negative offset corrupts the file. To cast a shadow upward use `angle: 270` with a positive offset.
5. **`charSpacing`, not `letterSpacing`.** The latter is silently ignored.
6. **Lists:** `bullet: true` per item, never a literal `•`. Set `breakLine: true` on every array item except the last. Space bulleted paragraphs with `paraSpaceAfter`, never `lineSpacing`.
7. **One `new pptxgen()` per output file.** Never reuse an instance across decks.
8. **`rectRadius` only works on `ROUNDED_RECTANGLE`**, not `RECTANGLE`.
9. **No gradient fills.** If you want one, generate a gradient image and use it as a background. You do not need one.
10. **Text boxes have built-in internal padding.** Set `margin: 0` whenever text must align with a shape, a rule, or another text box at the same x. Every helper below sets `margin: 0` by default.
11. **Speaker notes go in `slide.addNotes()`**, plain text, once per slide. Never a text box.
12. **Never reorder the children of `<p:presentation>`.** If you post-process XML at all, leave that element alone.
13. **`oval` is NOT a valid shape name. Use `ellipse`.** pptxgenjs writes
    whatever string you pass straight into `prstGeom prst="..."`, an invalid
    preset is not an error anywhere in the toolchain, and every renderer
    silently DROPS the shape. `validate.py` passes, python-pptx opens the file,
    and the circles are simply gone. This deleted every ring, node, and hub on
    the first build and was only caught by looking at a render. Valid names used
    here: `ellipse`, `rect`, `roundRect`, `triangle`, `line`. **Add a build-time
    assertion that every `prstGeom prst` value in the output is on that list.**
14. **A shape rotated with `rotate:` turns about its bounding-box centre**, not
    about a point you choose. To aim a triangle outward from a centre, position
    the unrotated box so that its centre lands where the rotated shape's centre
    must be.
15. **After `writeFile()`, run `validate.py`.** Non-negotiable, see §8. Note
    what it does NOT catch: invalid preset geometry, text overflow, element
    collisions, and invisible same-colour-on-same-colour text. Only a render
    catches those.

### 6.2 `flywheel(slide, opts)`

The single most important helper. Both decks depend on it, and it is what makes them look like one family.

```js
flywheel(slide, {
  cx, cy,              // ring center, inches
  r,                   // ring radius. 1.56 full size, 1.05 for the 2.1" inline version
  mode,                // 'dark' | 'light'
  hub: { label, fill }, // fill: color, or null for stroke-only
  stations: [ {n:'01', name:'MORE BOOKINGS', legend:'...'}, ... ],  // exactly 4, clockwise from top
  legend: { x, y, w } | null,  // right-hand legend column; null for inline rings
  gates: false,        // true swaps arrows for the confidence gates of Deck A slide 11
})
```

Geometry, exactly:

- **Ring:** an unfilled `oval`, `x: cx-r, y: cy-r, w: 2r, h: 2r`, `fill: {type:'none'}`, `line: {color: GOLD, width: 1}`.
- **Stations** at the four cardinal points, `θ = -90° + i·90°` for i = 0..3, so top, right, bottom, left. Node circle diameter `d = 0.62`. Center `(cx + r·cosθ, cy + r·sinθ)`, so `x: centerX - d/2, y: centerY - d/2`. Fill = ground color (`INK` on dark, `PAPER` on light) so the circle punches a hole in the ring; `line: {color: GOLD, width: 1}`. Number inside, Georgia Bold 17pt, `GOLD_L` or `GOLD_D`.
- **Station names** outside the ring, Arial Bold 13pt UPPER `charSpacing: 1.2`, in a 1.90" box, `margin: 0`. Top station: box centered on cx, `y: cy - r - 0.42`, `align: 'center'`. Bottom: `y: cy + r + 0.16`, center. Right: `x: cx + r + 0.22`, `y: centerY - 0.10`, left-aligned. Left: `x: cx - r - 0.22 - 1.90`, `y: centerY - 0.10`, right-aligned.
  **The left and right names must not collide with the ring or the legend.** With `r = 1.56` and `cx = 3.30`, the left name box runs from 1.52 to 3.42 minus the radius, which clears `G.ML = 0.89`. Verify in the render.
- **Arrows** (when `gates` is false): four `triangle` shapes, 0.17" square, at `θ = -45° + i·90°`, on the ring, `fill: GOLD`, `rotate: θ + 90` so each points clockwise along the tangent.
- **Gates** (when `gates` is true): at those same four diagonal positions, a `ROUNDED_RECTANGLE` 1.06 x 0.42, `rectRadius: 0.04`, fill `PAPER2` (light) or `PANEL` (dark), `line: {color: GOLD, width: 0.75}`, centered on the point. Two stacked lines of text inside as specced in §4.5. **Increase `r` to 1.70 when `gates` is true** so the gates do not touch the station circles.
- **Hub:** an `oval` diameter `2·r·0.53` centered at `(cx, cy)`. If `hub.fill` is a color, fill it and put the label in `GOLD_L` (on a `TEAL`/`RED` fill, use `WHITE`). If null, no fill with a 1pt `GOLD` stroke and the label in `GOLD_L`/`GOLD_D`. Label Georgia Bold 17pt, centered, **`margin: 0`, and `w` = hub diameter minus 0.22**.
  **The old deck's hub reads `DOCUME` / `NT` because the label box was too narrow.** Hub label must be at most **13 characters per line** at 17pt in a 1.44" box. `THE DOCUMENT` is 12 with the space and wraps to two lines cleanly. `REVENUE GROWTH` is 14: set it as two explicit lines, `REVENUE` and `GROWTH`, with `breakLine`. Never let the hub auto-wrap.
- **Legend** (when provided): one text block per station at `legend.x`, stacked. Each block is `n` + `name` on line 1 (Arial Bold 13pt, number in `GOLD_L`/`GOLD_D`, name in `PAPER`/`INK`) and `legend` on line 2 (Arial 12pt, `PAPER`/`INK`).
  **Row height is computed, never fixed.** `h = 0.22 + lines(legendText, legend.w, 12) * 0.185`, and rows stack with a 0.16" gap. The old deck fixed every row at 0.69" and the two-line legends overlapped the next row. Do not repeat that.

Full-size defaults for a 4-station slide: `cx: 3.30, cy: 4.00, r: 1.56`, legend at `x: 7.55, w: 4.90, y: 2.15`.

### 6.3 `quadrant(slide, opts)`

```js
quadrant(slide, {
  mode,
  axes: { top:'CLOSED', bottom:'OPEN', left:'ASK', right:'TELL',
          topSub:'you control what you show', ... },
  cells: [ {pos:'ul', name:'ACCURACY', lines:[...]}, ... ],
  axisStyle: 'bold' | 'recede',   // 'bold' for Deck B slide 7, 'recede' for slide 8
})
```

- Center `(6.67, 4.10)`.
- Vertical axis: a line from `(6.67, 2.00)` to `(6.67, 6.30)`, arrowheads both ends, `GOLD`, 1.25pt for `bold` and 0.75pt at 45% transparency for `recede`.
- Horizontal axis: `(2.55, 4.10)` to `(10.79, 4.10)`, same treatment.
- End labels: `top` centered at `(6.67, 1.70)`, `bottom` centered at `(6.67, 6.38)`, `left` right-aligned ending at x=2.45 at `y: 3.86`, `right` left-aligned from x=10.89 at `y: 3.86`. Arial Bold 13pt UPPER `charSpacing: 1.6` `GOLD_L`/`GOLD_D`. Sub-labels directly beneath in Arial Italic 10pt `WARM`/`MUTE`.
- Cell regions, and **nothing may cross the axes**:
  - `ul`: `x: 1.05, y: 2.18, w: 5.30, h: 1.72`
  - `ur`: `x: 7.00, y: 2.18, w: 5.30, h: 1.72`
  - `ll`: `x: 1.05, y: 4.32, w: 5.30, h: 1.86`
  - `lr`: `x: 7.00, y: 4.32, w: 5.30, h: 1.86`
- For `bold` (slide 7): name Georgia Bold 34pt centered in the cell, one line beneath, Arial 13pt centered. This is the one place centered body text is permitted, because it is a diagram label.
- For `recede` (slide 8): name Arial Bold 17pt UPPER left-aligned at the cell's top left, then three lines at Arial 12pt left-aligned, `margin: 0`, computed heights, 0.10" between lines. **This is a tight fit: 1.72" of height for a header plus three wrapped lines.** Cap each line at 118 characters (see §7.2) and verify in the render at full resolution. If any cell overflows, the fix is shorter copy, never a smaller font below 11pt.

### 6.4 `progressPip(slide, active, mode)`

```js
progressPip(slide, ['DOCUMENT','TEST'], 'dark')
```

- Ring: unfilled oval, `x: 11.98, y: 0.44, w: 0.44, h: 0.44`, `line: {color: GOLD, width: 0.75}`.
- Four dots, diameter 0.125, at the ring's cardinal points, center `(12.20, 0.66)`, radius 0.22. Order clockwise from top: DOCUMENT, TEST, REVISE, OPERATE. Active: `fill: GOLD`, no line. Inactive: fill = ground color, `line: {color: GOLD, width: 0.75}`.
- Caption: `x: 11.30, y: 0.92, w: 1.80, h: 0.18`, `align: 'right'`, `margin: 0`, Arial Bold 7pt UPPER `charSpacing: 0.9`, `GOLD_L`/`GOLD_D`. On the `accent` slide, `WHITE`.
- On slides carrying a pip, the eyebrow width drops to 10.80.

### 6.5 `timeline(slide, milestones, band)`

For Deck A slide 20. Horizontal spine, a 0.75pt `GOLD` line at 40% transparency from `x: 0.89` to `x: 12.44` at `y: 4.05`. Milestone dots, 0.17" filled `INK` (or `TEAL` for the highlighted one), evenly spaced. Labels alternate above and below the spine to avoid collision: odd-index milestones above (date at `y: 3.30`, sub at `y: 3.52`), even-index below (date at `y: 4.26`, sub at `y: 4.48`). Each label box `w: 2.30`, centered on its dot, `margin: 0`, Arial Bold 13pt for the date, Arial 11pt `MUTE` for the sub.

The band is a `ROUNDED_RECTANGLE` beneath, `PAPER2` fill, spanning from the first to the fourth dot, `y: 4.92, h: 0.44`, with its label centered inside.

**Label boxes must not overlap.** With five milestones across 11.56" the pitch is 2.89" and boxes are 2.30", so there is 0.59" of clearance. Verify. If Denise later adds a sixth milestone, drop the box width to 1.90" and shorten the subs.

### 6.6 `promptBlock(slide, opts)`

```js
promptBlock(slide, { x, y, w, label, lines, highlights })
```

- A `RECTANGLE`, fill `INK` (on a light slide) or `SLATE` (on a dark slide), no line, `h` **computed** as `0.52 + lines.length * 0.205 + 0.22`.
- Label at the top inside: Arial Bold 11pt UPPER `charSpacing: 1.6` `GOLD_L`, at `x + 0.28, y + 0.20`.
- Body: Courier New 12pt `PAPER`, `margin: 0`, at `x + 0.28, y + 0.52`, width `w - 0.56`. **Pre-wrap the lines yourself** and pass them as an array with `breakLine: true` on all but the last, so a monospace block never soft-wraps in an ugly place. At 12pt Courier New in a 6.0" box the hard cap is **62 characters per line.** Break your prompt text to that.
- `highlights`: substrings rendered in `GOLD_L` inside the block, for the `[ADD ...]` blanks. Implement by splitting each line into runs.

### 6.7 The other helpers

Write these too; they are what keep the chrome identical across 47 slides.

- `bg(slide, mode)` sets the background color and returns the resolved color set for that mode, so a slide's code never names a hex directly.
- `eyebrow(slide, text, mode, {narrow})` places the kicker at `G.EYEBROW_Y`.
- `title(slide, text, mode, {size})` places the headline at `G.TITLE_Y`, auto-selecting 40pt or 34pt from the character count per §7.2, and returning the y where the body may start (`G.BODY_Y1` for one line, `G.BODY_Y` for two).
- `chrome(slide, mode, deckName, pageNum)` draws the hairline rule, the footer with its two gold diamonds, and the slide number.
- `card(slide, {x,y,w,h,mode,raised})` draws a `PAPER2`/`PANEL` panel with an optional soft shadow. Fresh shadow object every call, `offset` >= 0.
- `diamondList(slide, {x,y,w,items,mode})` draws the gold-diamond list, computing each row's height from its wrapped line count. **This helper is the single biggest defence against the overlap bugs in the source deck. Use it for every list in both decks.**
- `statCallout(slide, {x,y,w,value,label,cite,mode})` for the big-number tiles.
- `ring(slide, {cx,cy,d,mark,mode})` draws the gold double ring with `mark: 'D' | 'compass'`.
- `skyline(slide)` and `horizonRule(slide)` for the two bottom motifs.

### 6.8 Charts

Neither deck as specced needs a chart: every data moment is a stat callout, a flywheel, or a timeline. **Do not add one.** If a late change requires one, use native `addChart()`, never a rendered image, and know that on a stacked bar `dataLabelPosition` must be `ctr`, `inEnd`, or `inBase` because `outEnd` corrupts the file, and that a combo series using a secondary axis needs both `valAxes` and `catAxes` declared with two entries each or PowerPoint discards the chart.

---

## 7. The text-fit law

This section is why Denise cannot review the current deck. Read it twice.

### 7.1 The actual defects in the source deck, and their causes

Rendered and diagnosed. Do not reproduce any of these.

| Source slide | Defect | Cause | Your fix |
|---|---|---|---|
| 6 | Headline "Amazon did not win on meetings. It won on documents." wraps to two lines and **collides with the flywheel diagram** | Title box `h: 0.78` at `y: 0.86`, but two lines at 40pt need ~1.10". Diagram starts at `y: 1.75` | Shorter headline ("Amazon won on documents."), one line, and body starts at `G.BODY_Y1` |
| 6, 7 | Hub circle reads `DOCUME` / `NT` | Hub label box narrower than the word | §6.2 hub rule: max 13 chars per line, explicit line breaks, never auto-wrap |
| 6, 7 | Right-column legend items **overlap each other** | Every row fixed at `h: 0.69` while two-line legends need ~0.78" | Computed row heights, §6.2 |
| 10 | Headline collides with the ACCURACY cell header | Same as slide 6: two-line title into a one-line box | Computed title height, and the cell region starts below it |
| 10 | Thin rules above each quadrant header | Banned decoration per §2.6 | Tinted cards or nothing |
| 14 | Card text **spills below the card's bottom edge**; the caption underneath collides with it | Card `h` fixed without measuring the three text blocks inside | Fixed card geometry per §5.4 plus a verified render |
| 19 | Right column items overlap | Fixed 0.34" row pitch with two-line content | `diamondList()` with computed heights |
| all | Playfair Display and Inter are not installed, so every metric is wrong on the presenting machine | Fonts chosen for the website, not for PowerPoint | §2.2 |

Every one of these is the same bug: **a box height chosen before the text was measured.**

### 7.2 The law

**Never set a text box height before you know how many lines the text will occupy.**

Implement one function in `brand.js` and route every single text placement through it:

```js
// Returns the wrapped line count for `text` at `pt` in a box `w` inches wide.
function lines(text, w, pt, font = 'arial') {
  const EM_PER_CHAR = { arial: 0.512, arialBold: 0.545, georgiaBold: 0.560, courier: 0.600 };
  const charW = (pt * EM_PER_CHAR[font]) / 72;      // inches per character
  const perLine = Math.floor((w - 0.04) / charW);   // usable chars per line
  // wrap on words, not characters
  let n = 1, cur = 0;
  for (const word of text.split(' ')) {
    const need = cur === 0 ? word.length : cur + 1 + word.length;
    if (need > perLine) { n++; cur = word.length; } else { cur = need; }
  }
  return n;
}

function boxH(text, w, pt, font) {
  return lines(text, w, pt, font) * (pt * 1.26 / 72) + 0.10;   // 1.26 leading + padding
}
```

Then, mechanically:

1. Compute `h` with `boxH()` for every text box. Never type a height literal for text.
2. **Add 12% to `h` and `w` for any Georgia box**, because LibreOffice cannot verify it (§2.2).
3. Stack elements by accumulating computed heights plus a fixed 0.16" to 0.30" gap. Never by a fixed pitch.
4. **Assert, in code, that every element's `y + h <= G.BODY_BOT`** for body content and `<= G.SAFE_BOT` for chrome. Throw on violation. A generator that silently produces an off-slide element is worse than one that crashes.
5. Same for horizontal: assert `x + w <= 13.333 - 0.50`.
6. **Bounds assertions do not catch element-versus-element collisions.** Two
   blocks can each sit inside the body zone and still print through each other.
   The fix is structural: any component that occupies a vertical band (a
   flywheel, a quadrant, a timeline) takes the band as an INPUT and derives its
   own size from it, rather than taking a fixed radius or centre. Reserve the
   caption band first, pass the remainder to the component.
7. **Anything whose height depends on how text wraps must return its bottom
   edge**, and the next element must be positioned from that return value. A
   title card whose quote wrapped to two lines swallowed the wordmark beneath it
   on both title slides, because the wordmark's `y` was a literal.

### 7.3 Hard character caps

Derived from the metrics above for the actual box widths in this spec. Treat these as limits on your **copy**, not as a reason to shrink type.

These are **measured**, not estimated. The first build was written against
guessed caps that were roughly 25% too generous, and every one of the source
deck's overlap defects reappeared. Trust the table.

| Element | Width | Size | Cap |
|---|---|---|---|
| Headline, one line | 11.56" | Georgia Bold 40pt | **37 chars** |
| Headline, one line | 11.56" | Georgia Bold 34pt | **43 chars** |
| Headline, two lines | 11.56" | Georgia Bold 34pt | **86 chars** |
| Statement slide | 11.00" | Georgia Bold 44pt | **32 chars per line** |
| Eyebrow | 11.56" / 10.80" | Arial Bold 12pt | **84 chars** |
| Body, full width | 11.56" | Arial 15pt | **108 chars per line** |
| Body, half column | 5.90" | Arial 15pt | **55 chars per line** |
| Card body, three-card | 3.56" | Arial 13pt | **37 chars per line** |
| Quadrant cell line (recede) | 5.30" | Arial 12pt | **61 chars per wrapped line, 2 lines max** |
| Legend line | 4.90" | Arial 12pt | **56 chars, keep to ONE line** |
| Prompt block line | 7.30" | Courier New 12pt | **62 chars, hard** |
| Prompt block line | 4.90" | Courier New 12pt | **44 chars, hard** |
| Hub label | hub dia. minus 0.10" | Georgia Bold, derived | see below |
| Station name | measured | Arial Bold 13pt | **use 0.72em per glyph** |

**Uppercase is much wider than the average.** Body copy averages ~0.512em per
character, but ALL-CAPS Arial with tracking runs about **0.72em**. Every
all-caps element (footers, station names, eyebrows, labels) must be measured
with the wider figure or it wraps mid-word. "SIGNATURE" in the footer and
"OPERATE" on a flywheel both broke this way on the first build.

**Georgia is wider still in practice.** Size the flywheel hub label from the
actual hub width using **0.92em per glyph**, and cap it at the nominal size:
`size = min(nominal, floor(available * 72 / (longestLine * 0.92)))`. Without
this the hub renders as "DOCUMEN / T".

If your copy exceeds a cap, **cut the copy**. Do not reduce the font, do not widen past the margin, do not let it wrap into the next element. An executive deck with 11pt body text has already failed.

---

## 8. Verification: eight passes

Run all eight. Report the result of each in your handoff summary. A pass that you skipped is a pass that failed.

### Pass 1 · File validity

```bash
./build/venv/bin/python "$PPTX_SKILL/scripts/office/validate.py" decks/sigcompass-reveal.pptx
./build/venv/bin/python "$PPTX_SKILL/scripts/office/validate.py" decks/build-your-own-donna-v2.pptx
```

Both built from scratch, so **no `--original`**. Every failure names its fix. Fix it in the generator and rebuild. Never hand-edit packed XML. Zero failures required.

### Pass 2 · Content

```bash
./build/venv/bin/markitdown decks/sigcompass-reveal.pptx | less
```

Read every slide's text and notes. Check: nothing missing, no typos, correct order, speaker notes present on **all 47 slides**. Then:

```bash
./build/venv/bin/markitdown decks/*.pptx | grep -inE "\bx{3,}\b|lorem|ipsum|TODO|\[insert|placeholder|TBD|FIXME"
```

The only permitted hit is the deliberate screenshot placeholder on Deck A slide 17 and the `[ADD ...]` blanks inside Deck B's prompt blocks, which are content. Everything else is a bug.

### Pass 3 · House style

```bash
# em dashes outside the one permitted attribution use
./build/venv/bin/markitdown decks/sigcompass-reveal.pptx | grep -n "—"          # must be EMPTY
./build/venv/bin/markitdown decks/build-your-own-donna-v2.pptx | grep -n "—" | grep -v "DONNA PAULSEN"
# banned words
./build/venv/bin/markitdown decks/*.pptx | grep -inE "leverage|synergy|unlock|delve|circling back"
```

Deck A must have **zero** em dashes. Deck B's only em dashes are in `— DONNA PAULSEN, SUITS`. Banned-word grep must be empty.

### Pass 4 · Brand conformance

Script this against the built files with python-pptx rather than eyeballing it:

- **Fonts:** the set of typefaces used across both decks is exactly `{Georgia, Arial, Courier New}`. Any other typeface is a failure.
- **Colors:** every `srgbClr` in both decks is in the §2.3 palette. Print the frequency table and inspect it. A stray hex means a hardcoded value escaped `brand.js`.
- **`C9A227` is never a text color on a `PAPER` ground.** Grep the XML for gold runs and check each one's slide background. This is the contrast rule from §2.3.
- **Reserved accent:** `A31621` appears only in Deck B, `1E808F` only in Deck A. Count the slides each appears on: **at most 4 per deck.**
- **Mode sequence:** extract each slide's background color, map to `D`/`L`/`A`, and diff the string against the maps in §4 and §5. Assert no run of four, first and last are `D`.
- **Chrome:** every non-divider, non-title, non-accent slide has a footer and a slide number, at the specced coordinates.

### Pass 5 · Cross-deck alignment (Denise asked for this explicitly)

> *"one of your final sets of instructions for fable will be to run alignment verification passes to ensure these two decks are aligned strategically and are clearly sharing the same message."*

This is a **reading** pass, not a script. Do it with fresh eyes, ideally in a subagent that has not seen the build code, given only the two rendered decks and §3 of this document. Answer each question in writing, in your handoff:

1. **The coin.** Does Deck A visibly claim the strategy half and Deck B the execution half? Quote the slide and line in each that does it.
2. **Handshake 1.** Deck A slide 10 and Deck B slide 2: do they state the *same* idea, in compatible words, without one contradicting the other? Both must say knowledge movement is the shared question and that Signature is at step 1.
3. **Handshake 2.** Deck A slide 13 and Deck B slide 3: is the cockpit metaphor consistent? Same instruments, same "week over week you see the currents" conclusion. No new metaphors bolted on.
4. **Handshake 3.** Does Deck A slide 19 leave an open question that Deck B slide 2 answers? Read them back to back.
5. **The flywheels rhyme.** Are the two flywheels visually identical in construction (same ring, same 4 stations, same node treatment, same legend layout) and clearly different in content? Put the two renders side by side and confirm both halves of that.
6. **Vocabulary.** Grep both decks for every term in §3.3 and confirm no deck uses a banned synonym.
7. **The 10x thesis.** Is it stated once, memorably, in Deck B, and does Deck A set it up without stealing it?
8. **One voice.** Read Deck A slide 9 and Deck B slide 23 back to back. Same author? If one sounds like a consultant and the other like a facilitator, fix the tone.
9. **The seam.** Read Deck A slide 21 then Deck B slide 1 then Deck B slide 2. Does an executive walking back from coffee land in the right place? This is the transition that either works or wastes the whole framing.

If any question fails, fix the decks and re-run this pass. Do not rationalize a near-miss.

### Pass 6 · Deck A: the zero-Suits scan

```bash
./build/venv/bin/python - <<'PY'
import zipfile, re
BAN = r'suits|donna|paulsen|harvey|specter|pearson|litt|zane|ross|case file|closer|the firm'
z = zipfile.ZipFile('decks/sigcompass-reveal.pptx')
for n in z.namelist():
    if n.endswith('.xml') or n.endswith('.rels'):
        for m in re.finditer(BAN, z.read(n).decode('utf8','ignore'), re.I):
            print(n, m.group(0))
PY
```

Scan slide XML **and** notes XML **and** rels **and** shape names **and** `docProps`. Exactly **one** permitted hit: `BUILD YOUR OWN DONNA` on slide 21 (§4.6). Everything else must go. Also confirm by eye: no D monogram anywhere in Deck A, no skyline in Deck A.

### Pass 7 · Timing

Extract the `[TIMING]` value from every note and sum per deck. Deck A must total **50** minutes, Deck B **90**. If off by more than 2, rebalance the notes, not the slide count. Also confirm the block subtotals match the tables in §4 and §5, and that Deck B's build block is **45 minutes**, which is what Denise specified.

### Pass 8 · Visual QA, every slide, at full resolution

The pass that catches what the others cannot.

```bash
./build/venv/bin/python "$PPTX_SKILL/scripts/office/soffice.py" --headless --convert-to pdf decks/sigcompass-reveal.pptx
rm -f build/scratch/qa-a-*.jpg
pdftoppm -jpeg -r 150 decks/sigcompass-reveal.pdf build/scratch/qa-a
ls -1 "$PWD"/build/scratch/qa-a-*.jpg
```

**Look at all 47 images.** Not a sample. Use a subagent for a fresh read: after writing the generator you will see what you intended rather than what rendered.

For each slide, check, in this order:

1. **Text overflow or text cut off at a box or slide boundary.** Most common defect, always user-visible. Remember Georgia is approximate here, Arial and Courier New are exact.
2. Overlapping elements: text through shapes, lines through words, stacked blocks.
3. Footer or citation colliding with the content above.
4. Elements closer than 0.30", or cards nearly touching.
5. Uneven gaps: a big empty region on one side and cramped content on the other.
6. Less than 0.50" from any slide edge.
7. Columns not aligned consistently slide to slide.
8. Low-contrast text. Specifically hunt for `C9A227` gold on cream.
9. **The flywheel slides:** station names clear of the ring, no clipped hub label, arrows or gates pointing clockwise, legend rows not touching.
10. **The quadrant slides:** nothing crossing an axis, all four cells the same visual weight, no cell overflowing.
11. **The pip, slides 11 to 21 of Deck B:** present, right-aligned inside the margin, not touching the eyebrow, correct stations lit, and all four lit on slide 21.

After any fix, **regenerate the PDF and re-render** before re-inspecting. `pdftoppm` cannot see a change you made to the `.pptx`.

Expect real findings on the first render. Two or three rounds is normal. Stop when a full read produces nothing.

---

## 9. Definition of done

Do not report success until every line is true.

- [ ] `decks/sigcompass-reveal.pptx` exists, 21 slides, 13.333 x 7.5.
- [ ] `decks/build-your-own-donna-v2.pptx` exists, 26 slides, 13.333 x 7.5.
- [ ] `build/brand.js` is the only place a hex value or a font name appears, and both decks import it.
- [ ] Pass 1: `validate.py` clean on both.
- [ ] Pass 2: content read end to end, notes on all 47 slides, no stray placeholders.
- [ ] Pass 3: zero em dashes in Deck A; only the attribution in Deck B; no banned words.
- [ ] Pass 4: fonts exactly `{Georgia, Arial, Courier New}`; every color in palette; no gold text on cream; mode sequences match spec.
- [ ] Pass 5: all nine alignment questions answered in writing, all passing.
- [ ] Pass 6: exactly one permitted Suits-adjacent hit in Deck A.
- [ ] Pass 7: 50 and 90 minutes, build block 45.
- [ ] Pass 8: all 47 renders inspected, no overflow, no overlap, no contrast failure.
- [ ] Both decks open in PowerPoint without a repair prompt.

### Your handoff summary must contain

1. The two file paths, slide counts, and timing totals.
2. Result of each of the eight passes, one line each.
3. Your written answers to the nine Pass 5 alignment questions.
4. **The four decisions Denise needs to make**, stated plainly and not buried:
   - The **screenshot placeholder** on Deck A slide 17 needs five SigCompass captures dropped in before presenting.
   - The **timeline dates** on Deck A slide 20: which you re-anchored and which have passed.
   - **`denisekgosnell.github.io/Donna/` is offline** because the repo is now private. Deck B no longer depends on it (§5.7), and the closing slide has no QR code. If she wants the resources link back, that is a separate call about re-publishing.
   - **Fonts:** you built with Georgia, Arial, and Courier New because Playfair Display and Inter are not installed on her Mac. If she installs both from Google Fonts on the presenting laptop, two constants in `brand.js` switch the deck to the website's fonts.
5. Anything you changed from this spec, and why. If a slide needed to become two, say so.

### What not to do

- Do not add slides beyond the specced counts to fit more content. Cut content.
- Do not shrink type below the scale in §2.2 to make something fit. Cut copy.
- Do not invent a Signature number, name, or date.
- Do not put a Suits reference in Deck A.
- Do not put a dead URL or a QR code in either deck.
- Do not use Playfair Display or Inter.
- Do not add a fifth motif, a color bar, an accent stripe, or a rule under a title.
- Do not declare done on an un-inspected render.
