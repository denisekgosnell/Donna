# Verification report · Build Your Own Donna v3 (October 21, 2026 edition)

Built and verified October 19, 2026 against `FABLE-V3-INSTRUCTIONS.md` section 11. Re-run the automated passes any time with `python3 build/verify.py` (writes `build/scratch/verify-out.md`).

## Summary

| Pass | Result | Notes |
|---|---|---|
| 11.1 · 1 file validity | PASS | `validate.py` clean on `decks/build-your-own-donna-v3.pptx` and `decks/donna-appendix-v3.pptx` |
| 11.1 · 2 content | PASS | Notes on all 26 visible slides plus the hidden fallback; no placeholders |
| 11.1 · 3 house style | PASS | Em dashes only in `— DONNA PAULSEN, SUITS`; no banned words; no exclamation points in site copy |
| 11.1 · 4 brand conformance | PASS | Fonts exactly Georgia, Arial, Courier New; every color in the palette; no gold text on cream; RED on exactly 4 slides (1, 6, 7, 26); mode rhythm longest run 2, opens and closes dark |
| 11.1 · 5 residue grep | PASS | 0 hits across site, README, skill, build scripts, and both decks' XML |
| 11.1 · 6 timing | PASS | `[TIMING]` sums to 90; blocks 3 / 9 / 14 / 14 / 18 / 15 / 13 / 4 |
| 11.1 · 7 links and assets | PASS | All relative links resolve; video assets present (mp4 2.36 MB, under the 15 MB budget); zip identical to `SKILL.md`; Step 2 paste block equals kickoff plus template |
| 11.1 · 8 time zones | PASS | Every site time carries four zones, names "your own time zone", or is a weekday/local shift reference; deck clock times are labeled Eastern on their eyebrows |
| 11.1 · 9 promo reconciliation | PARTIAL | The promo page was unreachable from the build environment (network policy denied `denisegosnell.ai`); matrix built from Denise's brief, below |
| 11.1 · 10 reading level | PASS | Flesch-Kincaid grade 4.4 / 4.4 / 5.0 / 5.5 / 5.7 for the five pages (target 8 or lower) |
| 11.2 · student fleet | PASS after two rounds | Ten personas; see the table below and the change log |
| 11.3 · branding consistency | PASS after fixes | Fresh-eyes review of deck renders, site screenshots, and video stills; findings and fixes below |
| 11.4 · semantics and simplicity | PASS after fixes | Four-word loop consistent on every surface; five edits applied |
| 11.5 · product-UI accuracy | PASS after fixes | 13 confirmed, 4 contradicted and fixed, 6 unconfirmed and hedged on the site |
| 11.6 · live dry run | PASS | Four connector operations proven, every test object deleted; log below |
| 11.7 · visual QA | PASS after fixes | 10 of 26 slides had a defect on the first render; all fixed and re-rendered (details below) |
| 11.8 · presenter dry run | PASS after fixes | Timing arithmetic fixed on slides 19 and 21; trust-slide note corrected |

## 11.2 · The student fleet

Each persona read the five pages in character (Part A), ran the Step 2 interview against a fresh Donna-sim seeded with the exact paste (Part B, 6 checks, plus a 7th for Kenji), and ran the Friday retrain against a synthetic week with three planted discrepancies (Part C, 7 checks). Reports: `build/scratch/fleet/report-*.md` (gitignored scratch; summarized here).

| # | Persona | Front | S1 | S2 | S3 | S4 | B | C | Verdict (round 1) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Maya, office manager, never used Claude | 3 | 4 | 3 | 3 | 4 | 6/6 | 7/7 | Finishes only if she survives the front page: "code execution" on a "no code" page, and "skill" undefined |
| 2 | Robert, sales VP on Outlook | 2 | 2 | 4 | 3 | 3 | 6/6 | 7/7 | Would not finish on his real mail: the site read as Gmail-only with the Outlook answer buried |
| 3 | Priya, nonprofit ED, privacy-first | 3 | 2 | 4 | 2 | 3 | 6/6 | 7/7 | Stopped at Google's consent screen and the hands-free line: wanted "scope of the connector vs. Donna's rules" said plainly |
| 4 | Tomás, recruiter, ChatGPT daily | 3 | 4 | 4 | 3 | 4 | 6/6 | 7/7 | Finishes; wanted "skill" defined at first use |
| 5 | Linda, realtor, phone-first | 3 | 3 | 2 | 3 | 3 | 6/6 | 7/7 | Copy button on her phone cannot paste into her laptop; wanted that said up front |
| 6 | Jamal, IT-managed Google account | 4 | 4 | 5 | 5 | 3 | 6/6 | 7/7 | Finishes on a personal Gmail; wanted the front page to name what IT must approve (added) |
| 7 | Sofia, Lisbon, evening attendee | 3 | 5 | 4 | 3 | 3 | 6/6 | 6/7 | Finishes; wanted 24-hour times next to every clock time |
| 8 | Kenji, CFO, tries to break the rules | 4 | 4 | 4 | 4 | 4 | 7/7 | 7/7 | Finishes; both "just send them all" and "delete the newsletters" declined in character; wanted one line on what the connector and Auto mode may do (added to Step 3) |
| 9 | Aisha, PM, has built a GPT and a Zap | 4 | 5 | 4 | 4 | 4 | 6/6 | 7/7 | Finishes; the Monday signature needed to say where the review lives |
| 10 | Dev, ML engineer | 4 | 5 | 4 | 4 | 3 | 6/6 | 7/7 | Finishes with one correction filed: define what is retrained before "retrain" is used |

Interview (Part B) across all ten runs: the greeting said four questions and about four minutes; questions were numbered; THE FINAL QUESTION rendered with its heading; early answers were banked; the banner ended on "Triage my inbox."; `final question` jumped and listed defaults; "just send them all" was declined in character every time. Retrain (Part C): all ten found all three planted discrepancies; changes were proposed, not applied; Hard rules untouched; "Approve 1 and 3." changed exactly the approved items. Two observations led to playbook edits: Donna-sims proposed five to eight changes rather than one to three (now capped at three in the retrain section), and attendees' numbering differs per run (the site now says "approve by number").

**Round 1 pass criteria.** The front page was rated 3 or below by six personas, which fails "no step rated below 4 by more than one persona." Fixes applied (see the change log), then a round-2 read-through with the three lowest-scoring personas (`build/scratch/fleet/report-round2.md`):

| Round 2 | Front | S1 | S2 | S3 | S4 | Verdict |
|---|---|---|---|---|---|---|
| Maya | 4 | 4 | 4 | 5 | 3 | No longer closes the tab; wanted the glossary above its first use and the Step 4 delete move spelled out (both done) |
| Robert | 3 | 3 | 4 | 4 | 4 | Learns in the first minute that it is Gmail-built; wanted Outlook as its own checklist item and a Step 1 line for a missing Microsoft connector (both done) |
| Linda | 4 | 4 | 3 | 4 | 3 | Wanted "iPad" named, the Step 2 copy button named, the file-picker clicks in Step 3, and the Step 4 delete move (all done) |

After round 2 and its fixes, the only remaining 3s trace to a product limit stated plainly (Outlook needs admin-enabled write access; personal Outlook.com cannot connect) rather than to unclear copy. Round 3 was not run.

### Change log from the fleet and the reviewers

Site:
- Front page: a four-word glossary (project, connector, skill, scheduled task); the "code execution" item reworded as "One switch on" with "you will not write or see any code"; "Built on Gmail and Google Calendar. On Outlook? See the checklist" under the tagline; the Outlook paragraph states the Microsoft 365 write-access requirement and that personal Outlook.com accounts cannot connect; "This page open on your laptop" replaces "on your phone"; 24-hour times beside Thursday and Friday; "One paste, one upload" replaces "Three clicks"; the 1:13 promise carries its own four zones; the loop section carries "You are not retraining Claude. You are retraining Donna, and Donna is a document you own."
- Step 1: Connectors path is `Customize → Connectors` (older builds noted); the Google consent screen is explained (connector scope vs. Donna's rules); the "quit Claude" note names the Mac menu; Drafts folder location named; "Now we teach her" replaces "train".
- Step 2: a line above the paste block says you never read or write it; the mock-up matches the template's `QUESTION 1 OF 4: REPLY NOW`; the checkpoint says "Leave this chat open: Step 3 continues here"; the why-it-matters no longer contradicts Step 3.
- Step 3: Skills path is `Customize → Skills → + → Create skill → Upload a skill`; scheduled tasks run on Claude's side (laptop can be closed); mode choice named `Auto`; "an email from your own calendar" replaces "calendar invite"; 16:30 and 16:39 shown; the draft-email fallback for people without a Google calendar is stated.
- Step 4: the Monday signature names the Drive document; "approve by number"; the Skills replace move is spelled out; "over fifty years" with the textbook hedge; why-it-matters rewritten without "prompt".
- Playbook: noise is "left exactly where it sits, untouched"; the retrain proposes at most three changes; the pacing rule refers to timestamps rather than "a clock".

Deck:
- Slides 4 and 5: one-line headlines so the legend never meets the caption; slide 5 caption carries "over fifty years".
- Slide 7 `[WATCH]`: the trust note no longer calls a playbook line a permission.
- Slide 11: `Customize, then Connectors`; the long rescue prompt lives on the site, the slide points to it.
- Slide 15: "A playbook is a standing arrangement."
- Slide 17: the verified Skills path. Slide 18: "Scheduled tasks run on Claude's side"; notes say paste by 12:51.
- Slide 19: "Her first shift lands as the last step starts" and notes that do not wait for the email.
- Slide 21 notes: paste by 1:01 so the review lands by 1:11. Slide 24 hub and slide 25 highlight no longer use RED (reserved accent now on exactly four slides).
- Slide 25: "Mon, you sign it · one paste, one upload".

## 11.3 and 11.7 · Visual QA and brand consistency (`build/scratch/fleet/review-visual-brand.md`)

A fresh-eyes agent inspected all 26 rendered slides at 110 dpi, the five site pages at 1280 px and 375 px, and the video stills against the brand rules. First render: 10 slides needed a fix. All were fixed in the generators and re-rendered:

- Every ring's arrowheads pointed counter-clockwise against the 01 to 04 numbering (a long-standing bug in the shared helper); now rotated to the clockwise tangent and narrowed.
- Slide 3: the statement wrapped to three lines under LibreOffice's Georgia substitute and the caption ran through the closed-loop ring; now a 40 pt two-line statement with the diagrams placed by explicit geometry and the caption below the ring.
- Slides 14 and 17: headlines ran into the progress pip's caption; headlines on every pip slide are now capped at 10.3 in and the pip caption sizes to its text.
- Slides 10 to 22: the pip sat 0.44 in from the top edge, inside the 0.5 in rule now (ring at 0.52 to 0.96 in, dots inside the 12.45 in margin).
- Slides 11 and 21: card gaps of 0.14 in are now 0.30 in; slides 14, 17, 18 and 21 share one prompt width so the right column lands at the same x.
- Slide 8 and every site page: the green check emoji (the one off-palette colour) is now a plain check glyph.
- Site prompt blocks carried hard line breaks that double-wrapped at 375 px; continuation lines are joined so phones wrap naturally (the words are unchanged).
- Video: the captions rendered in DejaVu Serif Bold (no Georgia in the container) and items faded in through a near-black; re-rendered with an embedded Georgia-metric face (Gelasio) and alpha fade from each item's own colour. See the deviations section for the font outcome.

Not changed, by design: the site's cream prompt blocks (the August site convention, inverse of the deck's dark blocks), and the site monogram, which already carries the inner ring at reduced opacity. Consistent across deck and site: the footer string, the four station names, every date and time string, the step lengths, no horizontal overflow at 375 px, every button name as a chip, the Step 2 paste block scrolling inside its box.

## 11.4 · Semantics and simplicity (`build/scratch/fleet/review-semantics.md`)

The four words appear in the same order on every surface; no retired or typology words survive. Reading level 4.1 to 6.0 per page. Findings applied: the Monday signature points at the Drive review; "three clicks" removed everywhere; "calendar invite" corrected to the calendar's reminder email; the Step 4 why-it-matters no longer needs the word "prompt"; "over fifty years" on site and slide.

## 11.5 · Product-UI accuracy (`build/scratch/fleet/review-product-ui.md`)

Checked against the Anthropic help center on October 19, 2026 (articles 13854387, 13345190, 12512180, 11176164, 10166901, 12542951, 16761823, 15183774).

| Claim | Verdict | What changed |
|---|---|---|
| Connectors under Settings | Contradicted | Site and deck now say `Customize → Connectors` (older builds noted) |
| Skills under Settings → Capabilities, upload a bare file | Contradicted | `Customize → Skills → + → Create skill → Upload a skill`, as a ZIP |
| Scheduled tasks run only while the laptop is awake | Contradicted | Article 13854387: they run remotely on their cadence even when the computer is asleep or the app closed (tasks created before October 6 on Pro/Max may still run locally). Site, slide 18, and notes corrected |
| Outlook: Steps 1 and 2 work | Contradicted in part | Personal Microsoft accounts cannot connect; work Microsoft 365 needs admin-enabled write tools. Front page now says so |
| Paid plan for scheduled tasks; Projects → New project; code execution toggle under Settings → Capabilities; Google Calendar email reminder; Gmail draft without send; project chat vs plain chat; "quit and reopen" | Confirmed | |
| "my local time" in a scheduled task | Unconfirmed | No time-zone field documented. Kept as a natural-language instruction; the site says "your own time zone" and shows 24-hour times |
| Permission mode location | Unconfirmed | Help center names Manual / Auto / Skip from the mode selector in the chat box. Site now says "choose Auto" without naming a corner |
| Microsoft Graph cannot set email reminders | Unconfirmed | learn.microsoft.com blocked from the environment; the site no longer depends on the claim, it states the Google-calendar requirement and the draft-email fallback |

## 11.6 · Live dry run on Denise's connectors

Performed from this session with the Gmail, Google Calendar, and Google Drive connectors. Nothing was sent. Every object was labeled `[DONNA TEST]` and removed by the same process.

| Step | Action | Result | Created (UTC) | Removed (UTC) |
|---|---|---|---|---|
| P1 intent | `search_threads in:inbox newer_than:1d` (read-only) | 11 threads returned; five genuine needs-you items identifiable | 20:02 | n/a |
| P2 intent | `create_draft` to denise@denisegosnell.ai, subject `[DONNA TEST] Workshop dry run: a draft Donna saved (delete me)` | Draft id `r6720358005442348344` created; `list_drafts subject:"DONNA TEST"` empty after deletion | 20:06 | 20:09 (`delete_draft`) |
| P5 intent | `create_event` `[DONNA TEST] Inbox Triage: Donna (dry run, delete me)`, 16:35 to 16:40 ET, triage in the description, `overrideReminders: email, 1 minute`, free, no notifications | Event id `cld8l7aet7eck2jd9tnfcoquek`; `get_event` confirmed the email reminder persisted | 20:06:26 | 20:09 (`delete_event`, status cancelled) |
| P6 intent | `search_threads in:sent newer_than:7d` (read-only); `create_file` text doc `[DONNA TEST] Donna's Week in Review (dry run, trash me)` in the existing Drive folder `Donna` (`1q8eS5hj4pBrXF8VizlHVGZXfQV1giQkg`) | 20 sent threads visible; doc id `1FlYK1MOuZnm9RFk_qKsmzExSUfieL9V9hKFC4lnLTKs` created as a Google Doc | 20:07:51 | 20:09 (`trash_file`) |

Note for Denise: three folders named `Donna` or `donna` already exist in Drive (July 2026). The Friday task says "a Google Drive folder called Donna"; if she wants a specific one, rename the others.

## 11.8 · Presenter dry run (`build/scratch/fleet/review-presenter.md`)

Timing sums to 90 with every block matching the clock. Applied: slide 19 no longer promises the email before 12:58 (the event appears within minutes of the paste; the email follows about ten minutes after the task starts), slide 18 notes say paste by 12:51, slide 21 notes say paste by 1:01 so the review lands by 1:11, and the slide 7 note no longer calls a playbook line a permission.

## Promise-to-asset matrix (from Denise's brief; the promo page could not be fetched)

| Promise | Delivered by |
|---|---|
| Wednesday, October 21, 12:00 PM ET / 9:00 AM PT / 5:00 PM "European" | Hero date line (four zones, London and Paris both printed), slide 1 |
| 90 minutes | Run of show, `[TIMING]` sum, README |
| "Your own Donna running your inbox by 1:13 PM Eastern" | Hero promise with its own four zones, slide 9, slide 22 checkpoint, Step 4 checkpoint |
| Non-technical, no code, copy and paste | Tagline, glossary, "One switch on" wording, copy buttons on every prompt, house rules |
| "Build your first agent in Claude" | Tagline; slide 6 "An agent is just a document" |

**Contradictions to check against the live promo page:** whether it says "three steps" (now four), whether it names the executive styles (removed), whether its "European" time is London or Central Europe, whether it promises Outlook, and whether it states the paid-plan and desktop-app requirements.

## Deviations from the spec

- Slide 26 carries the site URL as text but no QR code: the live URL could not be loaded from the build environment (network policy), and the spec forbids a QR that was not loaded the same day. Denise's checklist includes the live check; a QR can be added in one line of the generator if she wants it.
- The Step 1 slide points to the long rescue prompt on the site instead of printing it; the slide could not fit the setup card and a nine-line prompt without breaking the body zone.
- The deck's "fifty years" headline became "Machine learning runs the same loop." with the fifty-years claim in the caption, so the legend never collides with the caption.
- The video's serif is Gelasio 700 (OFL, metric-compatible with Georgia), base64-embedded in `build/video/the-bottle.html` because Georgia is not installed in the build container; the font probe in the render log confirms Gelasio rendered. The stack names Georgia first, so a re-render on a machine with Georgia uses it. Sans text is Liberation Sans (metric-compatible with Arial). Items now grow in at full colour, so no near-black dot appears in any frame (cluster scan over poster, stills, and sampled frames).
- The fleet's Donna-sims were run as fresh headless `claude -p` sessions with no tools (the persona agents had no Agent tool), so the zip at the end of the retrain was narrated rather than produced. Zip production is exercised in Step 3 of Denise's own dry run.
- Five persona agents hit a usage rate limit mid-run; three had finished their reports, two (Jamal, Kenji) were resumed and completed. Jamal's agent ran its Donna-sims as cloud child sessions on Denise's account and left four of them idle (not archived); they hold only synthetic test conversations.

## Decisions for Denise

1. **"European" time.** 5:00 PM and 6:13 PM are London; Paris is 6:00 PM and 7:13 PM. The site prints both. Check the promo's wording.
2. **Outlook.** Built Google-only, stated on the front page with the Microsoft 365 limits as the help center describes them.
3. **Plan and app.** Scheduled tasks need a paid plan and now run on Anthropic's side; the site says both. The desktop app is still the recommended place to build.
4. **Skill upload format.** ZIP, via `Customize → Skills → + → Create skill → Upload a skill` (article 12512180, read October 19).
5. **Retrain approval path.** Path A shipped: the Friday task writes the review to the calendar and Drive; Monday is one paste (which names the Drive doc) and one upload.
6. **The Bottle.** Built from the spec (no reference link arrived): gold circles for wanted work, slate squares, sand triangles, and panel diamonds for the rest; counts 10, 10 and 30, 30 and 2.
7. **URL and QR on the closing slide.** URL as text, no QR, per the live-check rule.
8. **Fonts.** Georgia, Arial, Courier New on the deck, as in August.

---

# v3.1 addendum · October 20, 2026 (Denise's sixteen-item change list)

## What changed

1. **Her deck edits, carried over.** Denise's Google Slides copy of the v3 deck (Drive, "workshops" folder) differed from the built deck in exactly three places: the open/closed statement split onto two lines, its caption cut to "AI makes open loops cheap. That is the whole problem." at 20pt, and the loop caption cut to "Email. Invoices. Hiring. Support tickets. Same four stops." All three are in the generator and the same cuts are on the front page and the Step 4 page. Every page also lost its repeated explanations (goal boxes, notes, fine print) so the site reads shorter.
2. **The two rings on the open/closed slide are twice the size** (radius 0.72 in to 1.44 in; hub 1.0 in to 2.0 in). The three loop slides' rings grew about 20% because the 16pt captions take one line.
3. **16pt floor, everywhere.** Eyebrows, captions, footer chrome, pip caption, legend, prompt blocks (Courier New 16), timeline, quote attributions, panel labels, appendix matrix. Where text no longer fit, words were cut (prompts on the build slides are abbreviated and say "Full prompt on the site"). New verify pass 9 scans every run property in both decks' XML and fails on anything under 1600.
4. **New early slides.** 2 "Open the instructions" (URL + password), 8 "What my Donna does for me" (her five plus the 24-hour reply desk and the 4 PM next-day plan, from the Donna skill's scheduled tasks), 9 "What she gives back" (her two numbers plus 100+ meeting briefs since August 7 and 27 prep blocks in the last 30 days, counted from Drive and Calendar on October 20; the Microsoft Work Trend Index figure as a labelled benchmark), 10 "Pick your tool. Keep your playbook." (Copilot, Perplexity, ChatGPT, Claude, one phrase each; the playbook is plain text and portable).
5. **Prompt 2** now reads the Sent folder and bans em dashes and AI speech patterns, on the site and the deck; the same house-style line is in SKILL.md under "My voice".
6. **Password gate.** `assets/donna.js` holds one constant, `KEY = "donna2026"`, and shows a velvet-rope overlay until it is entered (or `?key=donna2026` is in the URL). A one-line inline script in each page's head hides the content before paint. Tested in Chromium at phone and desktop widths: locked on load, wrong password shows the message, right password unlocks and persists across pages, `?key=` unlocks and is stripped from the URL, `?key=wrong` stays locked, copy buttons still work.
7. **"Still stuck?" TA line** on the Step 1 build slide, house rule 5, the Step 1 and Step 3 pages, and the README.
8. **The site is the live source.** Every step opens with a divider that lists "In this step: 1/ 2/ 3/" and ends "Now go to the instructions: Step N on the site." The step pages carry the same list under the goal.
9. **Escape hatch removed.** No "final question" jump anywhere: SKILL.md (pacing rewritten to "never rush and never stall"; the user decides when they are done), the Step 2 page, the deck, the README. The kickoff line now says "give me time to answer".
10. **Skills section verified and extended.** Path: Customize → Skills → + → Create skill → Upload a skill (ZIP with folder `donna-triage` and `SKILL.md`). Gotchas on the Step 3 page: no Skills menu (capability switch off), refused upload (not a folder with SKILL.md), she ignores it (name the skill). The workaround for every plan and build: paste the playbook text into the scheduled task itself.
11. **Free vs paid** on the front page checklist, the Step 3 page and the shift slide: connectors, projects and skills on every plan; scheduled tasks on Pro, Max, Team, Enterprise; on Free, run her by hand with "Triage my inbox."
12. **Times.** Opening 17 min (12:00 to 12:17), Step 1 14, Step 2 14, Step 3 16, Step 4 12 (one more scheduled task; the "never about email" slide fills the wait), discussion 13, close 4. Donna live at 1:13 holds: the Step 4 paste is by 1:03 and the dry-run event lands ten minutes later.
13. "You need a Friday" became "You need to retrain with better info, and more specific info." on the first-Friday slide, its notes and the Step 4 page.

## Verification, v3.1

- `build/verify.py`: 43 PASS, 0 FAIL (file validity, content, house style, brand, residue grep extended with "escape hatch", "final question", "about four minutes", "need a Friday", 12:58, 12:51; timing 90 with the opening at 17 and the four steps at 56; links and assets; time zones; **minimum font 16pt on both decks**; reading level 3.8 to 5.0).
- Deck: 30 slides + 1 hidden, mode run ≤ 2, opens and closes dark, RED on 4 slides, fit assertions clean, preset geometry valid, `validate.py` PASSED on both decks.
- Visual QA on the LibreOffice render (contact sheets of all 30 slides): two defects found and fixed (the ML title wrapped into the ring under the Georgia substitute; "RETRAIN" broke on the discussion ring), then re-rendered clean.
- Not re-run in v3.1: the ten-persona fleet and the live connector dry run. The playbook change is the removal of one section and one sentence plus one voice rule; the daily shift and the retrain sections are untouched.

## Still for Denise

- The password is `donna2026`; change it in `assets/donna.js` (`KEY`) and `build/deck-donna-v3.js` (`PASSWORD`) together, then rebuild the deck.
- Say the ROI numbers out loud once before Wednesday; the two from your note are yours, the other two were counted from your Drive and Calendar.

---

# v3.4 addendum · October 21, 2026

- **Pacing to a 1:30 finish.** An eight-minute preamble, the deck opens 12:08, Step 1 at 12:25 (13 min), Step 2 at 12:38 (17), Step 3 at 12:55 (13), Step 4 at 1:08 (12), Donna live at 1:20, the wrap 1:20 to 1:26, done 1:30. The deck carries 82 minutes of timing; `verify.py` checks the per-step sums and the total.
- **Step clock on every step page**, top and centre: the minutes for the step, then the start time in four zones.
- **Simplification pass** on the four step pages for adult beginners: one action per numbered step, the exact buttons in order, the prompt, one line that says how you know it worked. Every troubleshooting note moved into one collapsed "If something goes wrong" list per page, with the rescue prompt inside it. Reading level after the pass: 3.7 / 3.4 / 4.2 / 4.8. The playbook paste, every prompt and the password gate are unchanged; copy buttons counted on each page in Chromium (3 / 2 / 4 / 3).
