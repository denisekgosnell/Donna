# Build Your Own Donna

The complete workshop asset for **Build Your Own Donna**: a 90-minute, hands-on workshop
(Thursday, August 13 · 2:30 to 4:00 PM ET · hosted by Denise Gosnell) where executives leave with a
working AI executive assistant: inbox triage, replies drafted in their voice (never sent without
them), and a daily briefing delivered through their calendar.

**Live site:** https://denisekgosnell.github.io/Donna/

## What's in here

```
index.html                         # front page; doubles as the prep-email link
project/index.html                 # 01 · Project: First Impressions
triage/index.html                  # 02 · Instructions: The Triage Desk
skill/index.html                   # 03 · Skill + Schedule: Donna, Full Time
assets/donna.css                   # single shared stylesheet
assets/donna.js                    # copy buttons + tab toggle
assets/build-your-own-donna.pptx   # the workshop deck (speaker notes included)
skills/donna-replies/SKILL.md      # fill-in-the-blanks skill template
skills/donna-replies.zip           # ready-made fallback for the Cowork skill upload
.nojekyll                          # disable Jekyll so Pages serves files as-is
```

The workshop runs in three steps with a 20/45/25 arc: big-picture context up front,
three ~15-minute case files in the middle (each code block has a "you should see"
confirmation box, and each case file ends at a red stop sign so the room regroups
together), and an open discussion at the end on where else these AI workflows apply.

Static HTML only: no build step, no frameworks, relative links throughout, so the site
works as-is under the `/Donna/` path.

## Enable GitHub Pages (one-time, after merging)

1. Go to **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/ (root)`**, then **Save**.
4. Give it a minute, then confirm https://denisekgosnell.github.io/Donna/ loads.

Until Pages is live, files are reachable at
`https://raw.githubusercontent.com/denisekgosnell/Donna/main/...` for dry-run testing of the
skill-template fetch in Case File 03.

## Denise's pre-workshop checklist

- [ ] Merge the PR, then enable GitHub Pages (steps above) and confirm the live URL loads.
- [ ] Enterprise admin: enable connectors **Gmail, Google Calendar, Google Drive,
      Microsoft 365**; confirm **skills/capabilities** and **scheduled tasks** are on for
      all members.
- [ ] Email each attendee: personal workspace key + the site link + **the venue details**
      (they are deliberately not on the public site).
- [ ] Full dry run with a fresh test account, in workshop order: create the Donna project,
      connect Gmail + Calendar + Drive, paste the triage instructions and run them, have
      Claude write SKILL.md and download it, upload it in Cowork → Skills, create the
      scheduled task, watch the dry run, receive the 4:54 email. **Capture screenshots of
      every step as you go**, especially the Cowork Skills and Scheduled tasks screens
      (those menus move, and the site tells attendees to ask Claude if they do). The deck's
      dead-network fallback slide promises "pre-made screenshots of every step"; this dry
      run is where they come from. Keep them in your presenter folder.
- [ ] Install **Playfair Display** and **Inter** (both free on Google Fonts) on the laptop
      that will present the deck; the deck declares them, and PowerPoint silently
      substitutes system fonts if they're missing.
- [ ] Confirm the venue Wi-Fi network + password and put them on the deck's opening slide
      (it ships with [VENUE WIFI] placeholders); phone hotspot backup; the dry-run
      screenshots as demo fallback if the network dies.

## Build-time note on Outlook email reminders

Google Calendar supports email reminders on events natively (and via API), so the Gmail path
in Case File 03 works end to end. Outlook on the web / new Outlook **does** offer "+ Add email
reminder" on events (own calendar, full event form only), but Microsoft Graph, which
connectors use, only supports pop-up reminders, so Donna can't set an email reminder
programmatically on Outlook. Case File 03's Outlook small print therefore uses the calendar
notification as the 4:54 nudge and documents the manual per-event email reminder plus a
one-time Power Automate flow as upgrades.
