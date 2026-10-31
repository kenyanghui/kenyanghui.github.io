#!/usr/bin/env python3
"""Swap download links in index.html #download section.

Usage:
  python3 update_downloads.py manifest.json

Manifest format (all fields optional; only provided entries are rewritten):
{
  "buddy": [
    {"label": "Windows", "desc": "10/11 x64 · .exe 安装包 · 225 MB",
     "url": "https://.../LoongBuddy-windows-amd64-1.0.3b1.exe"},
    {"label": "macOS",   "desc": "Intel · .dmg · 229 MB",
     "url": "https://.../LoongBuddy-desktop-darwin-amd64-1.0.3b1.dmg"}
  ],
  "harness": {"url": "https://...", "label": "▶ 在线演示"}
}
The buddy card keeps its 申请制 CTA and appends direct links below the text.
"""
import json, pathlib, sys, re

ROOT = pathlib.Path(__file__).parent
html = ROOT / "index.html"
s = html.read_text()
m = json.loads(pathlib.Path(sys.argv[1]).read_text())

def link_html(item, i):
    cls = ' dl-cta' if i == 0 else ' dl-cta dl-cta-2'
    return f'        <a href="{item["url"]}" class="{cls.strip()}">{item["label"]} ↓</a>'

if "buddy" in m:
    items = m["buddy"]
    if not items:
        print("buddy: empty list, skipped")
    else:
        block = "\n".join(link_html(it, i) for i, it in enumerate(items))
        # buddy 卡: 在 <a ...申请试用> 前插直链
        pat = re.compile(
            r'(<b>LoongBuddy · 企业 AI 工作台</b>\n\s*<p>[^<]*</p>\n)(\s*)(<a href="mailto:554176937@qq\.com[^"]*" class="dl-cta">申请试用 →</a>)'
        )
        if pat.search(s):
            s = pat.sub(lambda mm: mm.group(1) + block + "\n" + mm.group(2) + mm.group(3), s, count=1)
            print(f"buddy: {len(items)} direct links inserted")
        else:
            sys.exit("buddy card anchor not found — check index.html structure")

if "harness" in m and m["harness"].get("url"):
    h = m["harness"]
    old = re.search(r'(<b>LoongHarness · 评审工作台</b>\n\s*<p>[^<]*</p>\n\s*)<a href="[^"]*" target="_blank" rel="noopener" class="dl-cta">[^<]*</a>', s)
    if not old:
        sys.exit("harness card anchor not found")
    label = h.get("label", "▶ 在线演示")
    repl = f'{old.group(1)}<a href="{h["url"]}" target="_blank" rel="noopener" class="dl-cta">{label}</a>'
    s = s[:old.start()] + repl + s[old.end():]
    print("harness link updated")

html.write_text(s)
print("OK — now: python3 /tmp/octopus/test_dl.py && git add -A && git commit && git push")
