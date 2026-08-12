# Build Your Own Donna

The complete workshop asset for **Build Your Own Donna**: a 90-minute, hands-on workshop
(August 2026, hosted by Denise Gosnell) where executives leave with a working AI executive
assistant: an inbox triaged around **which executive they are**, replies drafted in their
voice (never sent without them), and the day's triage delivered as a calendar invite that
emails them one minute before.

**Live site:** https://denisekgosnell.github.io/Donna/

## Go live (do this before the demo; ~60 seconds)

The repo is currently **private**, which keeps GitHub Pages off. One switch in the
GitHub UI, then the deploy workflow does the rest:

1. **Make the repo public (the only manual step):** Settings → General → scroll to
   **Danger Zone** → **Change visibility** → **Make public** → type the repo name
   to confirm.
2. **Deploy:** the `Deploy site to GitHub Pages` workflow runs on every push to
   `main` and creates the Pages site on its first successful run. After flipping
   visibility, go to **Actions** → **Deploy site to GitHub Pages** → **Run
   workflow** (or just ask Claude to trigger it, or push anything to `main`).
3. Give it a minute, then confirm https://denisekgosnell.github.io/Donna/ loads.
   Every later merge to `main` redeploys automatically.

Fallback if the workflow's enablement step ever fails: Settings → **Pages** →
set **Source** to **GitHub Actions**, then re-run the workflow.

## What's in here

```
index.html                       # front page: the three-step agenda
chat/index.html                  # 01 · First Impressions (project + connectors + first draft)
project/index.html               # 02 · The Triage Desk (five questions, the playbook paste)
agent/index.html                 # 03 · Donna, Full Time (skill file + the 4:30 shift)
skill/index.html                 # redirect → agent/ (old step 3 folded into the finale)
assets/donna.css                 # single shared stylesheet
assets/donna.js                  # copy buttons + Gmail/Outlook tab toggle
skills/donna-triage/SKILL.md     # the triage playbook template (interview + tiers + guardrails)
skills/donna-triage.zip          # zip fallback for Settings → Capabilities upload
build/deck-b-donna.js            # deck source (pptxgenjs); node build/deck-b-donna.js
build/deck-a-sigcompass.js       # companion deck source
build/sync-triage-template.py    # re-injects SKILL.md into project/index.html's paste block
decks/                           # built decks (pptx + pdf)
.nojekyll                        # disable Jekyll so Pages serves files as-is
```

Static HTML only: no build step for the site itself, relative links throughout, so it
works as-is under the `/Donna/` path.

**One source of truth for the playbook:** edit `skills/donna-triage/SKILL.md`, then run
`python3 build/sync-triage-template.py` to refresh the Step 2 paste block, and rebuild
the zip: `cd skills && rm donna-triage.zip && zip -r donna-triage.zip donna-triage`.

## How Step 2 runs in the room (the moderator's script)

1. Everyone pastes the playbook template from the Step 2 page into a new chat in their
   Donna project.
2. **Confirmation the room is in the right place:** every screen shows
   "Five questions. About six minutes." and **QUESTION 1 OF 5: Which executive are you?**
   The room answers Question 1 together (closed/open × tell/ask, from the deck's quadrant).
3. Donna personalizes the rest: fast for TIME, confirmed-back for ACCURACY, people-first
   for TRUST, loop-closing for VISION.
4. She reaches **🏁 THE FINAL QUESTION** (the blind-spot question) by minute six on her
   own. If anyone isn't there when time is called, they type **`final question`** and she
   jumps straight to it. Call it from the front: "Is 🏁 THE FINAL QUESTION on your screen?"
5. After the ✅ TRIAGE DESK: OPEN FOR BUSINESS banner, the very last act of Step 2:
   everyone types **Triage my inbox.**

Blind-spot map (diagonals of the deck's quadrant): TIME → trust (who's always CC'd),
ACCURACY → closing loops (stall rule), TRUST → time (send-by hour), VISION → accuracy
(details she verifies in every draft).

## Denise's pre-workshop checklist

- [ ] Merge to `main`, flip the repo public, enable Pages (steps above), confirm the
      live URL loads on a phone and a laptop.
- [ ] Enterprise admin: enable connectors **Gmail, Google Calendar, Google Drive,
      Microsoft 365**; confirm **skills/capabilities** and **scheduled tasks** are on
      for all members (Cowork).
- [ ] Email each attendee: personal workspace key + the site link + session details
      (they are deliberately not on the public site).
- [ ] Full dry run with a fresh test account: connect Gmail, run Step 2 end to end
      (paste template → five questions → 🏁 final question → ✅ banner → "Triage my
      inbox."), Step 3 end to end (skill file download → Cowork upload → scheduled task
      dry run → calendar event with the triage in the description → the reminder email).
      **Capture screenshots of every step** for the dead-network fallback folder.
- [ ] Print/re-export the deck from `decks/build-your-own-donna-v2.pptx` (rebuilt to
      match this flow; slides 15–20 changed). Install **Playfair Display** and **Inter**
      on the presenting laptop; PowerPoint silently substitutes fonts if they're missing.
- [ ] Wi-Fi cards printed; phone hotspot backup; dry-run screenshots as demo fallback.

## Build-time note on Outlook email reminders

Google Calendar supports email reminders on events natively (and via API), so the Gmail
path in Step 3 works end to end. Outlook on the web / new Outlook **does** offer "+ Add
email reminder" on events (own calendar, full event form only), but Microsoft Graph,
which connectors use, only supports pop-up reminders, so Donna can't set an email
reminder programmatically on Outlook. The Step 3 Outlook tab therefore uses the calendar
notification as the nudge and documents the manual per-event email reminder plus a
one-time Power Automate flow as upgrades.
