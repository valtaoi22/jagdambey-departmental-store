#!/usr/bin/env python3
"""
Point the whole website at your real web address, in one go.

Your domain appears in 7 places across 4 files. This updates all of them so you
don't have to hunt for them by hand.

USAGE (run it inside the website folder):

    python3 set-domain.py jagdambeystore.com
    python3 set-domain.py https://jagdambey.netlify.app

Run it again any time the address changes.
"""
import re, sys, pathlib

FILES = ["index.html", "robots.txt", "sitemap.xml", "assets/js/store-data.js"]


def current_url():
    """Read whatever siteUrl is set right now, so this script can be re-run."""
    try:
        txt = pathlib.Path("assets/js/store-data.js").read_text(encoding="utf-8")
        m = re.search(r'siteUrl:\s*"([^"]+)"', txt)
        if m:
            return m.group(1).rstrip("/")
    except OSError:
        pass
    return "https://jagdambeystore.com"


def normalise(raw):
    u = raw.strip().rstrip("/")
    if not u.startswith(("http://", "https://")):
        u = "https://" + u
    return u


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        return 1

    new = normalise(sys.argv[1])
    old = current_url()

    if new == old:
        print(f"Already set to {new} — nothing to do.")
        return 0

    missing = [f for f in FILES if not pathlib.Path(f).exists()]
    if missing:
        print("Cannot find:", ", ".join(missing))
        print("Run this script from inside the website folder.")
        return 1

    total = 0
    for f in FILES:
        p = pathlib.Path(f)
        txt = p.read_text(encoding="utf-8")
        n = txt.count(old)
        if n:
            p.write_text(txt.replace(old, new), encoding="utf-8")
            total += n
        print(f"  {f:<28} {n} replaced")

    print(f"\nDone — {total} places updated.")
    print(f"  from : {old}")
    print(f"  to   : {new}")
    print("\nNext: re-upload the folder to your host, then submit")
    print(f"  {new}/sitemap.xml")
    print("in Google Search Console.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
