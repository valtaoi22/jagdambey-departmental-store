#!/usr/bin/env python3
"""
Switch the site over to your own domain, in one command.

Run this AFTER you have bought the domain and added the DNS records
(see DOMAIN-SETUP.md). It will:

  1. write the CNAME file GitHub Pages needs
  2. point every URL in the site at your domain (7 places, 4 files)
  3. make a git commit

It does NOT push — it prints the command so you stay in control.

USAGE:
    python3 go-live.py jagdambeystore.com
"""
import re, subprocess, sys, pathlib

FILES = ["index.html", "robots.txt", "sitemap.xml", "assets/js/store-data.js"]


def current_url():
    txt = pathlib.Path("assets/js/store-data.js").read_text(encoding="utf-8")
    m = re.search(r'siteUrl:\s*"([^"]+)"', txt)
    return m.group(1).rstrip("/") if m else ""


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        return 1

    # accept jagdambeystore.com, www.jagdambeystore.com or https://jagdambeystore.com/
    raw = sys.argv[1].strip()
    bare = re.sub(r"^https?://", "", raw).strip("/").split("/")[0].lower()

    if not re.fullmatch(r"[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9-]+)+", bare):
        print(f"'{raw}' does not look like a domain name.")
        return 1
    if bare.startswith("www."):
        print(f"Note: using the apex '{bare[4:]}' — www will redirect to it.")
        bare = bare[4:]

    missing = [f for f in FILES if not pathlib.Path(f).exists()]
    if missing:
        print("Run this inside the website folder. Missing:", ", ".join(missing))
        return 1

    # 1. CNAME — GitHub Pages reads this file to learn the custom domain.
    #    It must contain the bare domain only: no https://, no trailing slash.
    pathlib.Path("CNAME").write_text(bare + "\n", encoding="utf-8")
    print(f"  CNAME                        -> {bare}")

    # 2. rewrite every absolute URL
    old, new = current_url(), "https://" + bare
    total = 0
    if old and old != new:
        for f in FILES:
            p = pathlib.Path(f)
            txt = p.read_text(encoding="utf-8")
            n = txt.count(old)
            if n:
                p.write_text(txt.replace(old, new), encoding="utf-8")
                total += n
            print(f"  {f:<28} {n} replaced")
    else:
        print("  URLs already point at this domain")

    # 3. commit
    subprocess.run(["git", "add", "-A"], check=True)
    msg = (f"Switch the site to {bare}\n\n"
           f"Adds the CNAME file GitHub Pages needs and repoints the canonical\n"
           f"tag, share-preview images, og:url, robots.txt, sitemap.xml and\n"
           f"store-data.js from {old or 'the previous address'} to {new}.\n")
    r = subprocess.run(["git", "commit", "-q", "-m", msg])
    if r.returncode != 0:
        print("\n  (nothing new to commit)")

    print(f"\nDone — {total} URLs updated, CNAME written.\n")
    print("Next:")
    print("  1. git push")
    print(f"  2. GitHub → repo → Settings → Pages → Custom domain: {bare} → Save")
    print("  3. Wait for the DNS check to go green, then tick 'Enforce HTTPS'")
    print(f"  4. Search Console: submit https://{bare}/sitemap.xml")
    return 0


if __name__ == "__main__":
    sys.exit(main())
