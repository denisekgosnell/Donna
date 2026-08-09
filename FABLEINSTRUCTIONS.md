# Build Your Own Donna — Build Instructions for Fable

**Mission**: In the fresh repository `denisekgosnell/Donna`, build the complete workshop asset: a static HTML microsite hosted directly by GitHub Pages, the `donna-replies` skill template, and the finished branded PowerPoint deck — all delivered through **one pull request into `main`**. This is the full deliverable, ready for a live workshop; nothing left as a stub.

## Git workflow — non-negotiable

1. Work in the `Donna` repository (github.com/denisekgosnell/Donna).
2. If the repo is empty, bootstrap `main` with a minimal initial commit (a one-line README). That bootstrap is the **only** time `main` is ever touched directly.
3. Create `feature/build-your-own-donna` from `main`. All development happens there.
4. Commit in logical chunks, push the feature branch (`git push -u origin feature/build-your-own-donna`), and **open a PR into `main`**. Do not merge it — Denise merges.
5. **Never push directly to `main`.** No exceptions beyond the empty-repo bootstrap.
6. PR description: what's in the site, where the deck lives, and the one manual step left for Denise (enable Pages, below).

## Hosting — render straight from GitHub, no other services

Static HTML only, no build step, no frameworks. Put the site at the **repo root** so GitHub Pages serves it as-is:

```
.nojekyll                          # disable Jekyll processing
README.md                          # what this is + live URL + the enable-Pages steps
index.html                         # front page
chat/index.html                    # Step 1
project/index.html                 # Step 2
skill/index.html                   # Step 3
agent/index.html                   # Step 4
assets/donna.css                   # single shared stylesheet
assets/donna.js                    # copy buttons + Gmail/Outlook tab toggle (vanilla JS, tiny)
assets/build-your-own-donna.pptx   # the finished deck
skills/donna-replies/SKILL.md      # fill-in-the-blanks skill template
skills/donna-replies.zip           # zip fallback for Settings→Capabilities upload
```

- Use **relative links everywhere** so the site works under the `/Donna/` path.
- After Denise merges the PR, she enables Pages once: **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**. Live URL: `https://denisekgosnell.github.io/Donna/`. Put these exact steps in the README and the PR description.
- Until Pages is live, files are reachable at `https://raw.githubusercontent.com/denisekgosnell/Donna/main/...` — use that for dry-run testing of the skill installer.

## Brand — lean all the way in

**The world of the show**: Manhattan glass-and-steel, skyline sweeps, razor tailoring, walk-and-talk momentum, a clean modern sans-serif logo treatment. Translate that as: generous dark space, sharp typographic hierarchy, thin gold hairlines, zero clutter.

- **Palette**: ink navy `#14213D` / charcoal `#101820` grounds · gold/brass `#C9A227` accents · cream paper `#F7F3E9` panels · **Donna Red `#A31621`** — her signature color, reserved exclusively for *her voice*: quote epigraphs, the monogram accent, the "never sends" callout. When Donna speaks, the page goes red.
- **Type**: display serif (Playfair Display) for headlines, Inter/Source Sans for body. Google Fonts is fine.
- **Motifs**: art-deco **"D" monogram**, gold hairline rules, subtle skyline divider, step pages as numbered **case files**.
- **Quote epigraphs**: every page opens with a real Donna line in Donna Red, attributed *— Donna Paulsen, Suits*.

**Verified quote bank** (use verbatim, always attributed):

| Quote | Use it on |
|---|---|
| "I'm Donna. I know everything." | Front-page hero epigraph; deck cold open |
| "Today's your lucky day. … Because it's the day you get to meet Donna." | Step 1 · Chat |
| "You're never going to win big if you're only thinking about not losing." | Step 2 · Project |
| "Oh, you have no idea how Donna I am." | Step 3 · Skill |
| "If you were ever lucky enough to have me, you wouldn't want to share." | Step 4 · Agent |
| "I know about everybody." | Skill report style (see SKILL.md) |
| "You're weird. We'll be friends." | Front-page footer / light moment |
| "If you want somebody to just sit at her desk, answer your phones and pick up your dry cleaning, then put out a want ad, because that's not me." | Deck — "you don't need a better inbox, you need a Donna" slide |

**Narrative gift for the deck**: in the show's later seasons, the firm builds an AI assistant literally called **"The Donna,"** modeled on her. Use it: *"The show built The Donna as fiction. You're going to build yours for real. It'll take about two hours."*

**IP guardrails**: short quoted lines with attribution are fine. No episode imagery, no actor photos, no NBC/Peacock marks, no Suits logo lockup. All art original.

**Mechanics**: every prompt gets a **Copy button**; all email/calendar instructions live under a **Gmail / Outlook tab toggle**; pages must read well at phone width (the prep link gets opened on phones even though the workshop needs laptops).

## Front page (`index.html`) — doubles as the prep-email link, keep it SHORT

1. **Hero**: epigraph in red — *"I'm Donna. I know everything." — Donna Paulsen, Suits* — then `BUILD YOUR OWN DONNA` · *A two-hour workshop for executives who are done reading email.* Sub-line: *By 3 PM Wednesday, you'll have your own.*
2. **What you'll leave with** (one paragraph): a working AI chief-of-staff that triages your inbox, drafts replies in your voice (and never sends without you), and delivers a daily briefing to your calendar — so email comes to you exactly once a day.
3. **Logistics card**: Wednesday, July 29 · 1:00–3:00 PM · **Denise's home, Mount Pleasant, SC — full address is in your invite email** · hosted by Denise Gosnell.
4. **BEFORE YOU ARRIVE — exactly three items**, gold checklist:
   - **Download Claude** — the desktop app for Mac or Windows, directly from Anthropic: **https://claude.ai/download**. *Bring the laptop it's installed on. A phone won't cut it.*
   - **Accept your invite** — a personal email from Denise with your key to her Claude workspace. Click it, sign in once, done.
   - **Know your email login** — you'll connect your work email (Gmail or Outlook) live. Make sure you can sign in from a browser without calling IT.
5. **Agenda — four case-file cards**, each linking to its page:
   - `01 · CHAT — First Impressions` (~15 min) → *your first Claude-drafted reply.*
   - `02 · PROJECT — The Triage Desk` (~25 min) → *teach Claude your rules once; triage becomes one sentence a day.*
   - `03 · SKILL — Donna's Playbook` (~30 min) → *a reusable skill that drafts VIP replies straight into your drafts folder.*
   - `04 · AGENT — Donna, Full Time` (~40 min) → *the daily briefing: doc + calendar event + a notification email one minute before.*
6. Footer: *"You're weird. We'll be friends."* · questions → denise@denisegosnell.ai.

## Step pages — shared format

Case-file header (number + title + red epigraph) → **Goal** in one sentence → numbered steps with prompts in copy-button blocks → gold **"You did it when…"** checkpoint → one-line *why this matters* → prev/next nav.

### 01 · Chat — "First Impressions"

**Goal**: connect your email; get your first drafted reply.

Connection steps under the **Gmail / Outlook toggle** (both: Claude → Settings → Connectors → enable → sign in → allow; write screenshot-level explicit at build time; Denise pre-enables connectors workspace-wide so execs only click Connect).

```
What landed in my inbox in the last 24 hours that actually needs ME?
Top 5, one line each.
```

```
Draft a reply to #1. Under 100 words, warm but decisive.
Don't send it — just show me.
```

**You did it when…** Claude shows a draft you'd actually send. **Why it matters**: chat is the job interview. Donna's hired — now we train her.

### 02 · Project — "The Triage Desk"

**Goal**: stop re-explaining your rules. A project remembers them.

Steps: Projects → New project → name it `Inbox Triage` → paste into project instructions (the three `[ADD …]` blanks are the only editing execs do all day):

```
You are my inbox triage assistant. Whenever I ask you to triage:
1. Review my inbox for the period I mention (default: last 24 hours).
2. Sort every thread into: 🔴 NEEDS ME TODAY · 🟡 DELEGATE · 🔵 FYI · ⚪ IGNORE
   - These people are ALWAYS 🔴 unless pure FYI: [ADD 3–5 NAMES + EMAILS]
   - Newsletters, cold outreach, automated notices → ⚪
   - Anything about [ADD YOUR #1 PROJECT OR DEAL] → 🔴
3. Give me ONE table: sender · subject · category · one-line why · suggested action.
4. Offer to draft replies for the 🔴 rows. My voice: [ADD 3 WORDS, e.g. warm, brief, decisive].
Never send anything.
```

Daily ritual afterward: `Triage my inbox.`

**You did it when…** you get one table instead of an inbox. **Why it matters**: chat is a conversation; a project is a *standing arrangement*.

### 03 · Skill — "Donna's Playbook"

**Goal**: install `donna-replies` — a reusable skill that drafts replies to your VIPs and saves them **as drafts in your inbox. It never sends. Ever.** (Loud callout, in Donna Red.)

Install is ONE paste — Claude does the builder work:

```
Fetch https://denisekgosnell.github.io/Donna/skills/donna-replies/SKILL.md
and install it for me as a skill named donna-replies.
Then interview me, one question at a time, to replace every {{PLACEHOLDER}}:
my VIP list, my voice, my reply rules.
When it's active, tell me the one sentence I say to use it.
```

Test drive: `Use donna-replies on my inbox.`

Fallbacks (collapsible small print): download `donna-replies.zip` → Claude Settings → Capabilities → upload; or a git clone one-liner for the rare terminal-friendly exec. *Build note: before Pages is enabled, test with the raw.githubusercontent.com URL; confirm the Pages URL works after merge.*

**Commit exactly this** at `skills/donna-replies/SKILL.md` (and zip it):

````markdown
---
name: donna-replies
description: Draft replies to my VIP senders and save them as drafts in my
  inbox. Use whenever I ask to handle, clear, or draft replies for my email.
  Never send anything.
---

# Donna Replies

"Oh, you have no idea how Donna I am." — Donna Paulsen, Suits

## My VIPs
{{VIP_LIST — names and email addresses, one per line}}

## My voice
- Sounds like: {{THREE_WORDS — e.g., warm, brief, decisive}}
- Sign-off: {{SIGN_OFF — e.g., "Best, D"}}
- Never say: {{BANNED — e.g., "circling back", double exclamation points}}

## Reply rules
- Meeting requests → accept, or propose two specific alternatives from my calendar.
- Intro requests → thank them; say I'll follow up within a week.
- Anything involving legal, money, or personnel → do NOT draft. Flag it to me.
- {{YOUR_RULES — add any others}}

## How Donna talks (reports to me only)
- Open every report with one of these, rotating:
  "I'm Donna. I know everything." · "I know about everybody." ·
  "You have no idea how Donna I am." · "Already handled."
- Confident, brief, a little wry. Zero corporate filler.
- The personality is for MY reports. Drafts written to other people stay
  strictly in MY voice, per "My voice" above.

## What to do when invoked
1. Find unreplied emails from my VIPs in the window I give you (default: last 24 hours).
2. Write each reply in my voice, following the rules above.
3. Save every reply as a DRAFT in my email. Never send. No exceptions.
4. Report one table: sender · subject · drafted or skipped · why.
````

**You did it when…** your drafts folder has replies you didn't write. **Why it matters**: a project lives in one place; a skill goes wherever you go — including into Step 4's agent.

### 04 · Agent — "Donna, Full Time" (the finale)

**Goal**: Donna works the evening shift. Every weekday she clears your VIP replies, writes your briefing, and gets it onto your calendar — the notification email arrives one minute before with the doc link. That notification **is** the only email you now need.

Steps: Claude's scheduled tasks → new task → paste:

```
Every weekday at 4:30 PM:
1. Run my donna-replies skill on today's inbox.
2. Write my Daily Briefing as a document titled "Daily Briefing — [today's date]":
   • the 5 things in my inbox that need ME (one line + recommended action each)
   • the replies you drafted today
   • what you ignored and why, in one short paragraph
   • my first meeting tomorrow
3. Save it to my [Google Drive / OneDrive] in a folder called "Donna Briefings".
4. Create a calendar event today, 4:55–5:00 PM, called "📋 Briefing with Donna",
   with the document link in the description and an EMAIL reminder 1 minute
   before the event.
Also: do a dry run for today RIGHT NOW so I can check your work.
```

The dry-run line is the closing moment — everyone watches their first briefing arrive before they leave. Sidebar explains the trick: *Claude never emails you; your calendar does. The briefing lands at 4:54 from a sender you already trust.* Gmail/Google Calendar is the reference path; give Outlook its own tab (verify at build time whether M365/Outlook events support email reminders — Outlook on the web does for M365 accounts).

**Advanced (collapsible) — "Donna runs both calendars"**: for execs juggling work M365 + personal Google + board calendars: connect *both* calendar connectors, add a **morning** scheduled task where Donna reads every calendar, folds the unified day + conflicts into the briefing, and optionally writes "busy" holds onto the primary calendar mirroring the others. The insight: no calendar ever needs access to another — **Donna is the only one who sees them all**, and she writes into one.

**You did it when…** the 4:54 PM email shows up with your briefing link. **Why it matters**: you didn't just use an assistant today. You hired one.

## Deck — `assets/build-your-own-donna.pptx`, fully built and committed in the PR

Build with the pptx skill; same palette/type/monogram as the site so screen and slides read as one brand. Speaker notes for Denise on every slide. ~14 slides, the **hiring-Donna narrative**:

1. Cold open — monogram + *"I'm Donna. I know everything."*
2. The problem — the 300-email day (one big number, no bullets).
3. The fix — *"If you want somebody to just sit at her desk and answer your phones… that's not me."* You don't need a better inbox; you need a Donna. **The show built "The Donna" as fiction — you're building yours for real.**
4. The arc — Interview (chat) → First day (project) → Her playbook (skill) → Give her the keys (agent).
5. **Step 1** — connect + the exact prompt in huge type.
6. **Step 1** — live-demo checkpoint.
7. **Step 2** — project rules slide.
8. **Step 2** — live-demo checkpoint.
9. **Step 3** — installer prompt slide.
10. **Step 3** — "never sends, only drafts" safety slide (Donna Red).
11. **Step 4** — schedule prompt slide.
12. **Step 4** — the 4:54 PM moment (dry-run checkpoint).
13. Troubleshooting/backup — Wi-Fi, connector hiccups, pre-made screenshots so demos survive a dead network.
14. Close — *"If you were ever lucky enough to have me, you wouldn't want to share."* + site URL + QR code to the live site (generate locally, embed as image).

## Denise's pre-workshop checklist (README or PR description, not on the public site)

- Merge the PR, then enable GitHub Pages: Settings → Pages → `main` / root → confirm `https://denisekgosnell.github.io/Donna/` loads.
- Enterprise admin: enable connectors **Gmail, Google Calendar, Google Drive, Microsoft 365**; confirm **skills/capabilities** and **scheduled tasks** are on for all members.
- Email each attendee: personal workspace key + the site link + **the full street address** (it is deliberately not on the public site).
- Full dry run with a fresh test account: connect Gmail, connect Outlook, install the skill from the live URL, schedule the task, receive the 4:54 email.
- Wi-Fi cards printed; phone hotspot backup; deck's screenshot slides as demo fallback.

## Build verification (before opening the PR)

- Serve locally (`python3 -m http.server`), click every link, test every copy button and both tab toggles, check phone width.
- Confirm all links are relative (site must work under the `/Donna/` path).
- Unzip `donna-replies.zip` → identical SKILL.md.
- Open the deck, check fonts/colors/notes render.
- Push the feature branch, open the PR into `main`, and report the PR link. **Never push `main`.**

---

*Quote sources: MagicalQuote (magicalquote.com/character/donna-paulsen), Quotes.net (quotes.net/mquote/872309), IMDb — "Not Just a Pretty Face" (imdb.com/title/tt4454772), Storypick (storypick.com/donna-quotes), ScreenRant (screenrant.com/suits-show-best-quotes), The Quality Edit — Suits style guide (thequalityedit.com/articles/suits-tv-style-guide).*
