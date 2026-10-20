# Build Your Own Donna

The complete workshop asset for **Build Your Own Donna**: a 90-minute, hands-on, online
workshop (Wednesday, October 21, 2026 · 12:00 PM ET · 9:00 AM PT · 5:00 PM London ·
6:00 PM Paris · on Zoom · hosted by Denise Gosnell) where non-technical attendees copy,
paste, and leave with a working AI assistant: an inbox triaged around their people and
priorities, replies drafted in their voice (never sent without them), the day's triage
delivered as a calendar invite that emails them one minute before, and a Friday
retraining task that reviews her own week and proposes what to change.

**Live site:** https://denisekgosnell.github.io/Donna/ (password-gated for attendees; the
password is on deck slide 2 and in one constant in `assets/donna.js`)

**The site is the live source.** The deck follows it. When they disagree, fix the site first,
then the deck.

## The loop

Four stations, said the same way everywhere (deck, site, playbook, notes):

| # | Station | In any workflow | In machine learning | Today, with Donna |
|---|---|---|---|---|
| 01 | CONNECT | Work comes in. | Collect the data. | Connect her to your inbox and calendar. |
| 02 | TEACH | Write the rules down once. | Train the model on it. | Four questions. She writes her own playbook. |
| 03 | RUN | The work gets done, on a schedule. | Put it to work and watch what it does. | She takes the 4:30 shift, every weekday. |
| 04 | RETRAIN | Look at what came back. Fix the rules. | Compare to what you wanted. Retrain. | Fridays she reviews her week. You sign it. |

Open loops make more work. Closed loops make better work. AI makes open loops cheap. That is
the whole problem. Step 4 is the one most people never build.

## Deploy

The `Deploy site to GitHub Pages` workflow runs on every push to `main`. Merge, give it
a minute, confirm https://denisekgosnell.github.io/Donna/ loads on a phone and a laptop.
Fallback: Settings → **Pages** → Source **GitHub Actions**, then re-run the workflow.

## What's in here

```
index.html                       # front page: hero, the Bottle, the loop, before-Wednesday, four steps
chat/index.html                  # 01 · CONNECT · First Impressions
project/index.html               # 02 · TEACH · The Triage Desk (four questions, the playbook paste)
agent/index.html                 # 03 · RUN · Donna, Full Time (skill zip + the 4:30 shift)
retrain/index.html               # 04 · RETRAIN · Her Performance Review (the Friday retrain)
skill/index.html                 # redirect → agent/   (old URLs stay alive)
triage/index.html                # redirect → project/ (old URLs stay alive)
assets/donna.css                 # single shared stylesheet
assets/donna.js                  # copy buttons and the password gate (one constant: KEY)
assets/video/                    # the Bottle: mp4, webm, poster, three stills
skills/donna-triage/SKILL.md     # the playbook template (interview + tiers + daily shift + retrain)
skills/donna-triage.zip          # the upload format the Skills screen expects
build/deck-donna-v3.js           # deck source (pptxgenjs); node build/deck-donna-v3.js
build/deck-appendix-v3.js        # the two Q&A slides (learning outcomes, data security)
build/brand.js                   # the Atelier brand system both deck scripts import
build/video/the-bottle.html      # the video, deterministic by frame; render.js renders it
build/sync-triage-template.py    # re-injects SKILL.md into project/index.html's paste block
build/VERIFICATION-v3.md         # the verification report for this build
decks/                           # built decks (pptx + pdf)
FABLE-V3-INSTRUCTIONS.md         # the spec this build was made from
.nojekyll                        # disable Jekyll so Pages serves files as-is
```

Static HTML only: no build step for the site itself, relative links throughout, so it
works as-is under the `/Donna/` path.

**One source of truth for the playbook:** edit `skills/donna-triage/SKILL.md`, then run
`python3 build/sync-triage-template.py` to refresh the Step 2 paste block, and rebuild
the zip: `cd skills && rm donna-triage.zip && zip -r donna-triage.zip donna-triage`.

## The run of show (all times Eastern)

| Clock | Block | Min | What happens |
|---|---|---|---|
| 12:00 | Open | 4 | Title. Open the instructions (URL + password). The Bottle plays. |
| 12:04 | The loop | 13 | Open vs. closed loops. The loop, three ways. How my Donna works for me. The receipts (ROI). Pick your tool. She never sends. House rules. The plan. |
| 12:17 | Step 1 · CONNECT | 14 | Divider ("in this step: 1/ 2/ 3/"), then the site. Project, connectors, two prompts. Checkpoint: a draft you did not write. |
| 12:31 | Step 2 · TEACH | 14 | Paste the playbook. Four questions, no shortcut. `Triage my inbox.` Checkpoint: one table. |
| 12:45 | Step 3 · RUN | 16 | Skill zip, upload (gotchas and the workaround on the site), the daily shift with a dry run, pasted by 12:56. Checkpoint at 1:01: the first shift lands. |
| 1:01 | Step 4 · RETRAIN | 12 | One more scheduled task, pasted by 1:03. While it runs: this was never about email. Checkpoint at **1:13**: her Week in Review lands. |
| 1:13 | Discussion | 13 | Where does the loop turn next? |
| 1:26 | Close | 4 | Your first Friday. Send-off. |

## How each step runs on Zoom (the script from the front)

Each step opens with one deck slide that says, in plain words, what we are doing ("In this
step: 1/ 2/ 3/") and ends with "Now go to the instructions: Step N on the site." Denise
then shares the **site page for the step**, not the deck. The deck is for 12:00 to 12:17,
each step's divider and checkpoint, and 1:13 onward. Every checkpoint is a chat moment:
*type ✓ in the chat when you see it.* Stuck for 60 seconds: *say so in the chat or raise
your hand, and a TA takes you into a Zoom room, 1:1.* TAs work the chat and the rooms.

1. **Step 1.** Project first, then connectors. Hold at the checkpoint until the ✓ count
   matches the room. The classic failure is the personal Google account instead of work,
   or Connected-but-blind (quit Claude, reopen). Prompt 2 now reads the Sent folder first
   and bans em dashes and AI speech patterns.
2. **Step 2.** Everyone pastes the playbook from the site into a new chat in the Donna
   project. Confirmation: every screen shows **"Four questions. Take your time."** and
   **QUESTION 1 OF 4: REPLY NOW.** There is no shortcut phrase any more; people get the
   time to teach her well. After the **TRIAGE DESK: OPEN FOR BUSINESS** banner, everyone
   types **Triage my inbox.**
3. **Step 3.** Same chat. She writes the skill as a zip; download; upload under Customize →
   Skills → + → Create skill → Upload a skill; confirm it is in the list before anyone
   touches Scheduled. The site lists the gotchas (no Skills menu = capability switch off;
   refused upload = not a folder with SKILL.md; she ignores it = name the skill) and the
   workaround for any plan or build (paste the playbook text into the scheduled task
   itself). Then the standing order, pasted by 12:56; its last line makes her work right
   now. Free plan: no Scheduled menu; they run her by hand with "Triage my inbox."
4. **Step 4.** One more scheduled task: Scheduled → New task → the weekly order, pasted by
   1:03; its last line runs a dry run on this week so far with today's event ten minutes
   out. The "never about email" slide fills the wait. At 1:13, her Week in Review is on
   every calendar. Four stations lit.

## Denise's pre-workshop checklist

- [ ] Merge to `main`; confirm the live URL loads on a phone and a laptop.
- [ ] Decide the site password. It is `suits` in `assets/donna.js` (one constant, `KEY`) and
      on deck slide 2 (`PASSWORD` in `build/deck-donna-v3.js`). Change both, rebuild the deck.
      Attendees can also open `denisekgosnell.github.io/Donna/?key=suits` from a chat link.
- [ ] Open `decks/build-your-own-donna-v3.pptx` in PowerPoint and **play slide 3** (the
      Bottle). If it will not play on the presenting machine, unhide slide 4 (the stills).
- [ ] Confirm the ROI slide's numbers are the ones you want to say out loud (3.5 hours saved
      the Friday after a conference; 35 personalized invitations in 75 minutes; 100+ meeting
      briefs since August 7 and 27 prep blocks on the calendar in the last 30 days, counted
      from Drive and Calendar on October 20).
- [ ] TAs briefed: watch the chat, pull anyone stuck into a Zoom breakout room 1:1.
- [ ] Full dry run on a fresh **paid** Claude account in workshop order: create the Donna
      project, connect Gmail + Calendar + Drive, Step 2 end to end (paste → four questions →
      THE FINAL QUESTION → banner → "Triage my inbox."; no shortcut phrase), Step 3 (skill zip → Skills upload →
      the 4:30 task → calendar event → reminder email), Step 4 (the Friday task → the Week
      in Review event → the Monday approval paste). **Screenshot every menu**: Customize →
      Connectors, Customize → Skills → + → Create skill → Upload a skill, Scheduled → New
      task → Create with Claude. Those menus move; the site tells attendees to ask Claude if
      they do. Scheduled tasks run on Anthropic's side (help center article 13854387, read
      October 19, 2026), so the laptop can be closed.
- [ ] Confirm the four-zone times against the promo page (`denisegosnell.ai/donna`). Her
      "5 PM European" is London; Paris is 6 PM.
- [ ] Zoom link sent; TAs and breakout rooms confirmed; the recording set to start at 12:00.
- [ ] Fonts: the deck ships on Georgia, Arial, and Courier New (installed everywhere).
      Install Playfair Display and Inter on the presenting laptop **only** if you switch
      the two font constants in `build/brand.js` first.
