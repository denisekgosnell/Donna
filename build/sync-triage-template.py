#!/usr/bin/env python3
"""Inject skills/donna-triage/SKILL.md into the Step 2 paste block.

The site is static; this keeps one source of truth for the playbook template.
Run from the repo root after any edit to skills/donna-triage/SKILL.md:

    python3 build/sync-triage-template.py

It rewrites the <pre> block between the TRIAGE-TEMPLATE-START/END markers in
project/index.html with the kickoff line plus the full template, HTML-escaped.
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKILL = ROOT / "skills" / "donna-triage" / "SKILL.md"
PAGE = ROOT / "project" / "index.html"

KICKOFF = (
    "Here is my triage playbook template. Read it, then run its Setup\n"
    "Interview on me exactly as written: five questions, about six minutes,\n"
    "one question at a time. Start now with your greeting and Question 1 of 5.\n"
    "\n"
)

START = "<!--TRIAGE-TEMPLATE-START-->"
END = "<!--TRIAGE-TEMPLATE-END-->"


def escape(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;")


def main() -> int:
    template = SKILL.read_text(encoding="utf-8").strip("\n")
    payload = START + escape(KICKOFF + template) + END

    html = PAGE.read_text(encoding="utf-8")
    marked = re.compile(re.escape(START) + r".*?" + re.escape(END), re.DOTALL)
    if marked.search(html):
        html = marked.sub(lambda _: payload, html, count=1)
    elif "@@TEMPLATE@@" in html:
        html = html.replace("@@TEMPLATE@@", payload, 1)
    else:
        print("No template marker found in project/index.html", file=sys.stderr)
        return 1

    PAGE.write_text(html, encoding="utf-8")
    print(f"Injected {SKILL.relative_to(ROOT)} into {PAGE.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
