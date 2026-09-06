# Jagdambey Departmental Store

Website for **Jagdambey Departmental Store** — also known locally as *Ashok Kumar
Bareta Wale* — near Geeta Bhawan, Sardulgarh, Mansa, Punjab.

A one-page static site. No build step, no database, no server code.

📞 94645 94106 · 94635 04900

---

## Features

- **Order builder** — customers tick items and the list types itself into WhatsApp
- **Three languages** — English · हिंदी · ਪੰਜਾਬੀ, remembered between visits
- **Live open/closed badge** driven by the configured opening hours
- **9 categories, 100+ items** with optional prices
- **Local SEO** — `GroceryStore` structured data, sitemap, share previews
- Responsive from 320 px up, no horizontal scroll at any width

## Editing the shop details

Almost everything lives in one file:

```
assets/js/store-data.js
```

Phone numbers, address, opening hours, delivery terms, the announcement strip,
and the full item list with prices. Plain text — no coding needed.

Lines marked `// ⚠️ CONFIRM` hold a guessed value and need checking.

See **[EDIT-GUIDE.md](EDIT-GUIDE.md)** for step-by-step instructions.

## Running it locally

Double-click `index.html`, or:

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000>.

## Deploying

See **[HOSTING.md](HOSTING.md)** — free hosting in about two minutes.

After deploying, point the site at its real address in one command:

```bash
python3 set-domain.py your-address-here
```

This updates all 7 places the URL appears (canonical tag, share previews,
`store-data.js`, `robots.txt`, `sitemap.xml`).

## Google Business Profile

**[GOOGLE-BUSINESS-PROFILE.md](GOOGLE-BUSINESS-PROFILE.md)** — ready-to-paste
description, category choices, photo checklist and review strategy. For a local
shop this matters more than the website itself.

## Structure

```
index.html                  the page
assets/css/style.css        all styling
assets/js/store-data.js     shop details + item list   ← edit this
assets/js/app.js            search, order list, hours, i18n
assets/brand/               logo, icons, share image
storefront.jpg              shopfront photo
```

## Licence

All rights reserved. Shop content, branding and photographs belong to
Jagdambey Departmental Store.
