#!/usr/bin/env python3
"""
Switch the site over to your own domain, in one command.

Run this AFTER you have bought the domain (see DOMAIN-SETUP.md). It will:

  1. point every URL in the site at your domain (7 places, 4 files)
  2. write the CNAME file, if you are hosting on GitHub Pages
  3. make a git commit

It does NOT push — it prints the command so you stay in control.

USAGE:
    python3 go-live.py jagdambeystore.com                  # Cloudflare Pages (default)
    python3 go-live.py jagdambeystore.com --github-pages   # GitHub Pages

The CNAME file is a GitHub Pages thing. Cloudflare Pages sets its own custom
domain in the dashboard, so it does not want one.
"""
import re, subprocess, sys, pathlib

FILES = ["index.html", "robots.txt", "sitemap.xml", "assets/js/store-data.js"]


def current_url():
    txt = pathlib.Path("assets/js/store-data.js").read_text(encoding="utf-8")
    m = re.search(r'siteUrl:\s*"([^"]+)"', txt)
    return m.group(1).rstrip("/") if m else ""


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    flags = {a for a in sys.argv[1:] if a.startswith("-")}
    if len(args) != 1 or flags - {"--github-pages"}:
        print(__doc__)
        return 1
    github_pages = "--github-pages" in flags

    # accept jagdambeystore.com, www.jagdambeystore.com or https://jagdambeystore.com/
    raw = args[0].strip()
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

    # 1. CNAME — only GitHub Pages uses this file. It must hold the bare
    #    domain: no https://, no trailing slash. Cloudflare Pages ignores it,
    #    and leaving a stale one behind would confuse a later GitHub deploy.
    cn = pathlib.Path("CNAME")
    if github_pages:
        cn.write_text(bare + "\n", encoding="utf-8")
        print(f"  CNAME                        -> {bare}")
    elif cn.exists():
        cn.unlink()
        print("  CNAME                        -> removed (not used by Cloudflare Pages)")

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
    host = "GitHub Pages" if github_pages else "Cloudflare Pages"
    msg = (f"Switch the site to {bare}\n\n"
           f"Repoints the canonical tag, share-preview images, og:url,\n"
           f"robots.txt, sitemap.xml and store-data.js from\n"
           f"{old or 'the previous address'} to {new}.\n\n"
           f"Host: {host}.\n")
    r = subprocess.run(["git", "commit", "-q", "-m", msg])
    if r.returncode != 0:
        print("\n  (nothing new to commit)")

    print(f"\nDone — {total} URLs updated.\n")
    print("Next:")
    print("  1. git push")
    if github_pages:
        print(f"  2. GitHub → Settings → Pages → Custom domain: {bare} → Save")
        print("  3. Wait for the DNS check to go green, then tick 'Enforce HTTPS'")
    else:
        print("  2. Cloudflare → Workers & Pages → your project → Custom domains")
        print(f"     Add '{bare}' and 'www.{bare}' — Cloudflare writes the DNS itself")
        print("  3. Wait for both to show 'Active'")
    print(f"  4. Search Console: submit https://{bare}/sitemap.xml")
    return 0


if __name__ == "__main__":
    sys.exit(main())
