#!/usr/bin/env python3
"""Automated verification passes for the v3 build (FABLE-V3-INSTRUCTIONS.md section 11.1).
Run from the repo root: python3 build/verify.py  (writes build/scratch/verify-out.md)."""
import re, sys, zipfile, pathlib, subprocess, html, json, collections, os
ROOT = pathlib.Path(__file__).resolve().parent.parent
os.chdir(ROOT)
OUT = []
def h(t): OUT.append(f"\n## {t}\n")
def ok(t): OUT.append(f"- PASS: {t}")
def bad(t): OUT.append(f"- FAIL: {t}")
def note(t): OUT.append(f"- note: {t}")

DECK = "decks/build-your-own-donna-v3.pptx"
APPX = "decks/donna-appendix-v3.pptx"
PAGES = ["index.html", "chat/index.html", "project/index.html", "agent/index.html", "retrain/index.html"]
PALETTE = {"14213D","1C2333","2A3244","F7F3EA","E8E2D2","C9A227","E7C766","8A6D14","AFA893","5A6379","FFFFFF","A31621"}

def deck_text(path):
    return subprocess.run(["markitdown", path], capture_output=True, text=True).stdout

def slide_xml(path):
    z = zipfile.ZipFile(path)
    names = sorted([n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)], key=lambda n: int(re.findall(r"\d+", n)[0]))
    return [(n, z.read(n).decode("utf8", "ignore")) for n in names], z

# ---- Pass 1: file validity (validate.py is run separately by the build; record its result here)
h("Pass 1 · file validity")
for f in (DECK, APPX):
    res = subprocess.run([sys.executable, os.environ.get("VALIDATE", "/dev/null"), f], capture_output=True, text=True)
    if "PASSED" in res.stdout: ok(f"validate.py: {f}")
    else: bad(f"validate.py: {f}: {res.stdout[-300:]}{res.stderr[-300:]}")

# ---- Pass 2: content
h("Pass 2 · content")
dt = deck_text(DECK)
slides_md = dt.split("<!-- Slide number:")[1:]
n_notes = sum(1 for s in slides_md if "### Notes:" in s)
(ok if n_notes == len(slides_md) else bad)(f"speaker notes on {n_notes}/{len(slides_md)} slides (incl. hidden)")
ph = re.findall(r"(?i)\bx{3,}\b|lorem|ipsum|\bTODO\b|\[insert|\bTBD\b|FIXME", dt)
(ok if not ph else bad)(f"placeholder grep on deck: {ph[:5]}")

# ---- Pass 3: house style
h("Pass 3 · house style")
em = [l for l in dt.splitlines() if "—" in l and "DONNA PAULSEN" not in l]
(ok if not em else bad)(f"em dashes outside attribution in deck: {len(em)} {em[:3]}")
banned = re.findall(r"(?i)\bleverage\b|\bsynergy\b|\bunlock\b|\bdelve\b", dt)
(ok if not banned else bad)(f"banned words in deck: {banned[:5]}")
site_text = {}
for p in PAGES:
    s = pathlib.Path(p).read_text()
    s2 = re.sub(r"<pre>.*?</pre>", "", s, flags=re.S)  # prompts and template are exempt
    s2 = re.sub(r"<[^>]+>", "", s2); s2 = html.unescape(s2)
    site_text[p] = s2
    excl = [m for m in re.findall(r"[^\n]{0,40}![^\n]{0,20}", s2)]
    (ok if not excl else bad)(f"{p}: exclamation points in copy: {excl[:3]}")
    emd = [l.strip()[:80] for l in s2.splitlines() if "—" in l]
    (ok if not emd else bad)(f"{p}: em dashes in copy: {emd[:3]}")

# ---- Pass 4: brand conformance
h("Pass 4 · brand conformance")
for f in (DECK, APPX):
    slides, z = slide_xml(f)
    fonts = set(); colors = collections.Counter(); red_slides = 0; modes = []
    for n, x in slides:
        fonts |= set(re.findall(r'typeface="([^"]+)"', x))
        cs = re.findall(r'srgbClr val="([0-9A-Fa-f]{6})"', x)
        for c in cs: colors[c.upper()] += 1
        if "A31621" in x.upper(): red_slides += 1
        bg = re.search(r"<p:bg>.*?srgbClr val=\"([0-9A-Fa-f]{6})\"", x, flags=re.S)
        v = bg.group(1).upper() if bg else "FFFFFF"
        modes.append("D" if v == "14213D" else "L" if v == "F7F3EA" else "A" if v == "A31621" else "?")
        # gold C9A227 as a text run color on a light slide
        if v == "F7F3EA":
            runs = re.findall(r"<a:rPr[^>]*>.*?</a:rPr>", x, flags=re.S)
            for r in runs:
                if 'srgbClr val="C9A227"' in r: bad(f"{f} {n}: C9A227 used as text color on PAPER"); break
    stray = sorted(set(colors) - PALETTE)
    (ok if not stray else bad)(f"{f}: colors outside palette: {stray}")
    (ok if fonts <= {"Georgia","Arial","Courier New"} else bad)(f"{f}: fonts {sorted(fonts)}")
    (ok if red_slides <= 5 else bad)(f"{f}: RED appears on {red_slides} slides (cap 4 visible + hidden fallback)")
    note(f"{f}: mode sequence {' '.join(modes)}")
    if f == DECK:
        vis = [m for i, m in enumerate(modes) if i != 2]  # hidden fallback is slide index 2
        run = 1; worst = 1
        for i in range(1, len(vis)):
            run = run + 1 if vis[i] == vis[i-1] else 1; worst = max(worst, run)
        (ok if worst <= 3 and vis[0] == "D" and vis[-1] == "D" else bad)(f"visible mode rhythm: longest run {worst}, opens {vis[0]}, closes {vis[-1]}")

# ---- Pass 5: residue grep
h("Pass 5 · residue grep")
RES = re.compile(r"\bTIME\b|\bACCURACY\b|\bTRUST\b|\bVISION\b|closed.?(tell|ask)|open.?(tell|ask)|[Qq]uadrant|[Bb]lind.?spot|[Ww]hich executive|[Ff]our kinds|Merrill|Reid\b|Signature|SigCompass|\bDDI\b|S-Team|cooperative|Amazon|Bezos|Working Backwards|Nonaka|[Ff]lywheel|[Vv]enue|[Ww]i-?[Ff]i|September 9|AUGUST 2026|3:42|4:54|2:30|4:10|pilot group|DOCUMENT · TEST|\bREVISE\b|\bOPERATE\b")
hits = []
files = PAGES + ["README.md", "skills/donna-triage/SKILL.md", "build/deck-donna-v3.js", "build/deck-appendix-v3.js", "build/sync-triage-template.py", "assets/donna.css", "assets/donna.js"]
for p in files:
    for i, l in enumerate(pathlib.Path(p).read_text().splitlines(), 1):
        for m in RES.finditer(l):
            hits.append(f"{p}:{i}: {m.group(0)}")
for f in (DECK, APPX):
    z = zipfile.ZipFile(f)
    for n in z.namelist():
        if n.endswith(".xml") or n.endswith(".rels"):
            for m in RES.finditer(z.read(n).decode("utf8", "ignore")):
                hits.append(f"{f}:{n}: {m.group(0)}")
(ok if not hits else bad)(f"residue hits: {len(hits)}")
for x in hits[:40]: OUT.append(f"    {x}")

# ---- Pass 6: timing
h("Pass 6 · timing")
tim = [int(m) for m in re.findall(r"\[TIMING\] (\d+) min", dt)]
tot = sum(tim)
(ok if tot == 90 else bad)(f"[TIMING] sum = {tot} over {len(tim)} visible+hidden notes (hidden counts 0)")
blocks = {"open": tim[0:2], "loop": tim[3:10], "step1": tim[10:13], "step2": tim[13:16], "step3": tim[16:20], "step4": tim[20:23], "disc": tim[23:25], "close": tim[25:27]}
note("block subtotals (incl. hidden at index 2 = 0): " + ", ".join(f"{k}={sum(v)}" for k, v in blocks.items()))

# ---- Pass 7: links and assets
h("Pass 7 · links and assets")
missing = []
for p in PAGES:
    base = pathlib.Path(p).parent
    s = pathlib.Path(p).read_text()
    for ref in re.findall(r'(?:href|src)="([^"#]+)"', s):
        if ref.startswith(("http", "mailto:", "data:")): continue
        target = (base / ref).resolve()
        if ref.endswith("/"): target = target / "index.html"
        if not target.exists(): missing.append(f"{p}: {ref}")
(ok if not missing else bad)(f"relative links/assets missing: {missing}")
for v in ["assets/video/the-bottle.mp4", "assets/video/the-bottle.webm", "assets/video/the-bottle-poster.png", "assets/video/the-bottle-1.png", "assets/video/the-bottle-2.png", "assets/video/the-bottle-3.png"]:
    pth = pathlib.Path(v)
    if pth.exists():
        sz = pth.stat().st_size
        (ok if (not v.endswith(".mp4") or sz <= 15*1024*1024) else bad)(f"{v}: {sz} bytes")
    else: bad(f"{v}: missing")
zf = zipfile.ZipFile("skills/donna-triage.zip").read("donna-triage/SKILL.md")
(ok if zf == pathlib.Path("skills/donna-triage/SKILL.md").read_bytes() else bad)("zip SKILL.md identical to skills/donna-triage/SKILL.md")
pj = pathlib.Path("project/index.html").read_text()
blk = re.search(r"<!--TRIAGE-TEMPLATE-START-->(.*?)<!--TRIAGE-TEMPLATE-END-->", pj, flags=re.S).group(1)
blk = html.unescape(blk)
tmpl = pathlib.Path("skills/donna-triage/SKILL.md").read_text().strip("\n")
(ok if blk.endswith(tmpl) and blk.startswith("Here is my triage playbook template") else bad)("Step 2 paste block = kickoff + template")

# ---- Pass 8: time zones
h("Pass 8 · time zones")
tz_issues = []
for p in PAGES:
    lines_ = site_text[p].splitlines()
    for li, l in enumerate(lines_):
        if re.search(r"\b\d{1,2}(:\d{2})?\s?(AM|PM)\b", l):
            nxt = " ".join(x for x in lines_[li+1:li+4])
            zones = lambda z: ("PT" in z and "London" in z and "Paris" in z)
            if not ((("ET" in l or "Eastern" in l) and (zones(l) or zones(nxt))) or "local time" in l or "your own time zone" in l or (zones(l) and "That is" in l) or re.search(r"\b(Thu|Fri|Mon)\b", l) or "4:30 shift" in l or "4:30 PM shift" in l or "around 4:39" in l):
                tz_issues.append(f"{p}: {l.strip()[:90]}")
(ok if not tz_issues else bad)(f"site times without four zones or local-time context: {len(tz_issues)}")
for x in tz_issues[:10]: OUT.append(f"    {x}")
deck_times = [l.strip()[:90] for l in dt.splitlines() if re.search(r"\b\d{1,2}:\d{2}\s?(AM|PM)\b", l) and "local time" not in l and "LONDON" not in l]
note(f"deck lines with a clock time and no zone (reviewed by hand; in-workshop clock is Eastern per the eyebrow): {len(deck_times)}")
for x in deck_times[:12]: OUT.append(f"    {x}")

# ---- Pass 10: reading level
h("Pass 10 · reading level (Flesch-Kincaid grade, prompts and template excluded)")
try:
    import textstat
    for p in PAGES:
        t = site_text[p]
        t = re.sub(r"\s+", " ", t)
        g = textstat.flesch_kincaid_grade(t)
        sents = sorted(re.split(r"(?<=[.!?])\s+", t), key=len, reverse=True)[:3]
        (ok if g <= 8.0 else bad)(f"{p}: grade {g:.1f}")
        for s_ in sents: OUT.append(f"    longest: {s_[:140]}")
except Exception as e:
    bad(f"textstat unavailable: {e}")

pathlib.Path("build/scratch/verify-out.md").write_text("# verify.py output\n" + "\n".join(OUT) + "\n")
print("\n".join(OUT))
