# Buying and connecting your domain

Total time: **20 minutes of work**, then a wait for DNS.
Cost: **around ₹900–1,200 a year.** Hosting stays free.

---

## Step 0 — The three decisions

| | Choice | Why |
|---|---|---|
| **Domain** | `jagdambeystore.com` | Checked — available. Says itself out loud: *"jagdambey store dot com"* |
| **Registrar** | Cloudflare, or Hostinger/BigRock if you want to pay by UPI | See Step 1 |
| **Host** | **Cloudflare Pages** | Your domain is already on Cloudflare — it writes the DNS for you |

### Why Cloudflare Pages rather than GitHub Pages

Once the domain sits on Cloudflare's nameservers, Cloudflare Pages is the
simpler half of the job:

| | Cloudflare Pages | GitHub Pages |
|---|---|---|
| DNS setup | **Automatic** — you add the domain, it writes the records | 4 A records + 1 CNAME, by hand |
| Orange-cloud proxy | Works normally | Blocks certificate issuing — must be grey |
| Bandwidth | Unlimited | 100 GB/month |
| Speed in India | Cloudflare's Indian edge | Fastly/US-routed |
| Deploys | Automatic on every `git push` | Automatic on every `git push` |

Both are free and both serve the same repo. Cloudflare wins here purely because
**it removes the DNS step**, which is where things go wrong by hand.

---

## Step 1 — Buy the domain

### Option A — Cloudflare Registrar *(cheapest long-term)*

**https://dash.cloudflare.com** → Domain Registration → Register Domain

- Sold **at cost**, roughly **₹900/year**, and the price **never jumps at renewal**
- WHOIS privacy **free**
- Fast DNS included, good speeds in India
- Needs an international debit/credit card

### Option B — Hostinger or BigRock *(easiest payment in India)*

**https://www.hostinger.in/domain-name-search** or **https://www.bigrock.in**

- Pay by **UPI, netbanking or Indian card**
- Interface in INR, Indian support

> ⚠️ **Check the RENEWAL price before paying, not the first-year price.**
> A "₹99 first year" offer often renews at ₹1,500. Look for the renewal figure
> on the checkout page. If you can't find it, that is itself a warning.

### At checkout — say NO to all of this

- ❌ Web hosting — **you already have it free**
- ❌ SSL certificate — **GitHub gives it free**
- ❌ Business email — add later if you want it
- ❌ Website builder / SEO tools
- ❌ "Domain protection" upsells

**Buy the domain. Nothing else.** Turn ON auto-renew so it never lapses.

---

## Step 2 — Deploy on Cloudflare Pages *(recommended)*

**First, delete every DNS record you added by hand.** Cloudflare Pages writes its
own, and leftover records will fight it. In **DNS → Records**, delete anything
pointing at GitHub.

Then:

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**
2. Authorise GitHub, choose **`jagdambey-departmental-store`**
3. Build settings — this is a plain HTML site, so leave it empty:

   | Field | Value |
   |---|---|
   | Framework preset | **None** |
   | Build command | *(leave blank)* |
   | Build output directory | `/` |

4. **Save and Deploy.** You get `jagdambey-departmental-store.pages.dev`
5. Project → **Custom domains** → **Set up a domain** → `jagdambeystore.com`
   → then repeat for `www.jagdambeystore.com`

Cloudflare creates the DNS records itself and issues the certificate. Wait for
both to show **Active**.

6. Point the site at the domain:

```bash
python3 go-live.py jagdambeystore.com
git push
```

Every future `git push` redeploys automatically.

---

## Alternative — staying on GitHub Pages

Only if you prefer it. You must add the records by hand **and set every one to
DNS only (grey cloud)** — an orange cloud stops GitHub issuing its certificate.

Run `python3 go-live.py jagdambeystore.com --github-pages` for this route.

### Add the DNS records

In your registrar's **DNS** section, add these **exactly**.
(Verified against GitHub's own API — these are current.)

### Four A records — leave the name blank, or `@`

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### Four AAAA records *(IPv6 — optional but recommended)*

| Type | Name | Value |
|---|---|---|
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

### One CNAME record — so `www.` works too

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `valtaoi22.github.io` |

> Note the CNAME value has **no `https://`, no path and a trailing dot is fine**.
> It is just `valtaoi22.github.io`.

> ⚠️ **The `Name` field is the hostname, not a label.**
> For the apex records the Name must be **`@`** (Cloudflare shows this as
> `jagdambeystore.com`). Typing `github_1`, `github_2` … creates
> `github_1.jagdambeystore.com` — subdomains that do nothing, and the domain
> itself resolves to nothing.

**Set every record to DNS only (grey cloud).** With the orange cloud on,
GitHub cannot verify the domain and the certificate never issues.

**Delete** any parking-page A record the registrar added automatically.

---

## Step 3 — Point the site at the domain

In the website folder:

```bash
python3 go-live.py jagdambeystore.com
git push
```

That writes the `CNAME` file GitHub Pages needs, updates all 7 URLs in the site
(canonical tag, both share-preview images, `og:url`, `robots.txt`, `sitemap.xml`,
`store-data.js`) and commits it.

---

## Step 4 — Tell GitHub about the domain

1. Go to **https://github.com/valtaoi22/jagdambey-departmental-store/settings/pages**
2. Under **Custom domain**, type `jagdambeystore.com` → **Save**
3. Wait for the **DNS check** to go green *(minutes to a few hours)*
4. Then tick **Enforce HTTPS**

> The "Enforce HTTPS" box stays greyed out until the certificate is issued.
> That is normal — usually 15 minutes, occasionally up to 24 hours. Just wait.

---

## Step 5 — Check it worked

```bash
curl -I https://jagdambeystore.com
```

You want `HTTP/2 200`. Also try `http://` and `www.` — both should redirect to
`https://jagdambeystore.com`.

Your old address `valtaoi22.github.io/jagdambey-departmental-store` will now
**redirect automatically** to the new domain. Nothing breaks.

---

## Step 6 — Tell Google

1. **Search Console** → https://search.google.com/search-console
   - Add `https://jagdambeystore.com` as a **URL prefix** property
   - Verify (easiest: add the TXT record it gives you, at the same registrar)
   - **Sitemaps** → submit `sitemap.xml`
   - **URL Inspection** → paste the homepage → **Request indexing**

2. **Google Business Profile** → put `https://jagdambeystore.com` in the
   **Website** field. See `GOOGLE-BUSINESS-PROFILE.md`.

---

## Timeline

| When | What |
|---|---|
| Immediately | Domain is yours |
| 15 min – 2 hrs | DNS spreads, GitHub's check goes green |
| +15 min – 24 hrs | HTTPS certificate issued, padlock appears |
| 2 – 14 days | Google indexes the new address |
| 1 – 3 months | Rankings settle, reviews start doing the work |

---

## If something goes wrong

| Problem | Cause | Fix |
|---|---|---|
| GitHub says "DNS check unsuccessful" | Records not spread yet | Wait an hour, click **Check again** |
| Site loads but no padlock | Certificate not issued yet | Wait, then tick **Enforce HTTPS** |
| "Enforce HTTPS" greyed out | Same — cert still pending | Wait up to 24 hrs |
| Registrar's parking page shows | Old A record still there | Delete it, keep only the four above |
| Apex doesn't resolve at all | Records named `github_1` etc. instead of `@` | The Name field is the hostname — it must be `@` |
| Certificate never issues (GitHub) | Orange cloud is on | Switch every record to DNS only (grey) |
| `www` doesn't work | CNAME missing or wrong | Must be `www` → `valtaoi22.github.io` |
| Everything broke | — | Delete the `CNAME` file, push. Back to the github.io URL. |

Nothing here is permanent. If it goes wrong, delete `CNAME`, push, and you are
back to the working github.io address within a minute.
