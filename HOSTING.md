# Putting the website online — free

Your site is **static** (just HTML, CSS, JS and images). There is no database and no
server code, so it can be hosted **completely free, forever**, on several services.
You do not need to pay for "web hosting" for a site like this.

---

## Easiest option — Netlify Drop (recommended)

No account needed to try it. Takes about two minutes.

1. Go to **https://app.netlify.com/drop**
2. **Drag the whole `Jagdambey_Departmental_Store_Enhanced_Website` folder** onto the page.
3. Wait ~20 seconds. You get a live address like
   `https://sparkly-kitten-12ab34.netlify.app`
4. Create a free account when it offers, so the site stays permanently.
5. In **Site settings → Change site name**, rename it to something like
   `jagdambey` → your address becomes **`https://jagdambey.netlify.app`**

**To update the site later:** drag the folder onto the Drop page again — or, from your
site's dashboard, use **Deploys → Drag and drop**.

**What you get free:** HTTPS (the padlock), 100 GB traffic a month — far more than a
local shop will ever use, and a custom domain later if you buy one.

---

## Alternative — Cloudflare Pages

Slightly more setup, but very fast in India and **unlimited** bandwidth.

1. Sign up free at **https://pages.cloudflare.com**
2. **Create a project → Upload assets**
3. Upload the folder → you get `https://jagdambey.pages.dev`

---

## Alternative — GitHub Pages

Free, but only worth it if you already use GitHub.

1. Create a free account at github.com
2. Make a repository named `jagdambey-store`, upload all the files
3. **Settings → Pages → Source: main branch → Save**
4. You get `https://yourusername.github.io/jagdambey-store`

---

## Which should you pick?

| | Netlify | Cloudflare Pages | GitHub Pages |
|---|---|---|---|
| Difficulty | **Easiest** — drag & drop | Medium | Needs GitHub |
| Speed in India | Good | **Best** | Good |
| Bandwidth | 100 GB/month | Unlimited | 100 GB/month |
| HTTPS padlock | Yes | Yes | Yes |
| Custom domain later | Yes | Yes | Yes |

**Start with Netlify.** You can move later — it's just files.

---

## After it's live — one command

Your web address is written in **7 places** across 4 files (for Google and for
WhatsApp share previews). Update them all at once:

```
python3 set-domain.py jagdambey.netlify.app
```

Then upload the folder again. Run it any time the address changes.

---

## Do you need to buy a domain name?

**No — the free address works fine.** `jagdambey.netlify.app` is a real, working,
secure website you can print on your visiting card and bags.

**But a proper domain looks more trustworthy** to customers, and it is cheap:

| | Rough cost per year |
|---|---|
| `.in` | ₹500 – ₹900 |
| `.com` | ₹700 – ₹1,200 |
| `.shop` / `.store` | ₹300 first year, then higher |

Buy from BigRock, Hostinger, GoDaddy or Namecheap. **Buy only the domain — refuse
the hosting they try to sell you**, you already have it free.

Then in Netlify: **Domain settings → Add custom domain**, and follow the two DNS
records it shows you. HTTPS is set up automatically and free.

> The old "free domain" services (`.tk`, `.ml`, `.ga`) are no longer reliable and
> Google often distrusts them. Either use the free `.netlify.app` address or buy a
> real one.

---

## Last step — tell Google the site exists

1. Go to **https://search.google.com/search-console**
2. Add your address as a **URL prefix** property and verify it
   (Netlify makes this easy — it will show you an HTML tag or DNS record)
3. Under **Sitemaps**, submit: `sitemap.xml`
4. Under **URL Inspection**, paste your homepage address and click
   **Request indexing**

Google usually picks up a new small site within a few days to two weeks.

**Also:** put the website address into your Google Business Profile (the Website
field). The two support each other — see `GOOGLE-BUSINESS-PROFILE.md`.
