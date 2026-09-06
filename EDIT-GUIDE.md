# Jagdambey Departmental Store — how to update your website

You do **not** need to know coding. Almost everything is changed in one file.

---

## 1. The only file you normally edit

**`assets/js/store-data.js`**

Open it in Notepad (Windows) or any text editor. Change the text between the `"quotes"`.
**Do not delete commas, brackets or quotes.**

The site runs in **three languages** — English, हिंदी and ਪੰਜਾਬੀ. Wherever you see
`en`, `hi` and `pa` next to each other, fill in all three. Item names stay in English
so they are easy to type and search.

What you can change there:

| What | Where in the file |
|---|---|
| Shop name, tagline | Section 1 |
| Phone numbers, WhatsApp number | Section 1 |
| Address, PIN code, map location | Section 1 |
| Opening hours (per day) | Section 2 |
| Delivery: free or paid, minimum order, areas | Section 3 |
| The orange strip at the top (offers, festivals, holidays) | Section 4 |
| Payment methods accepted | Section 5 |
| Customer reviews | Section 6 |
| Local name (Ashok Kumar Bareta Wale) | Section 1 |
| **Item list and prices** | Section 7 (`CATALOGUE`) |

Lines marked `// ⚠️ CONFIRM` contain a **guessed** value. Please check every one of them.

### ⚠️ After changing hours, phone, address or payments — run this

```
node build-schema.js
```

Google reads your shop's address, phone and opening hours from a block of data
inside `index.html`. That block is generated from `store-data.js`, so this one
command keeps them matching. Then commit and push as usual.

---

## 2. Adding prices

In section 7, each item looks like this:

```js
{ n: "Wheat Atta", u: "10 kg bag", p: null },
```

* `n` = item name
* `u` = unit / pack size
* `p` = price. `null` shows **"Ask price"**. Change it to a number to show a rate:

```js
{ n: "Wheat Atta", u: "10 kg bag", p: 380 },
```

You can also highlight an item:

```js
{ n: "Diwali Gift Pack", u: "box", p: 550, tag: "offer" },
```

`tag` can be `"new"` or `"offer"`.

**Tip:** you don't have to publish every price. Fill in the ones that don't change often
(atta, oil, sugar) and leave the rest as `null`.

---

## 3. Adding your own photos

Put your photos in the `assets/` folder, then in `index.html` find the gallery
(search for `class="gallery"`) and replace a green tile:

```html
<div class="tile" data-icon-tile="grocery"><span>Grocery</span></div>
```

with a photo:

```html
<button type="button" data-lb aria-label="View grocery aisle">
  <img src="assets/my-photo.jpg" loading="lazy" alt="Grocery shelves at Jagdambey Store">
  <span class="cap">Grocery aisle</span>
</button>
```

**Photo requirements**
* At least **1600 pixels** wide. Photos straight from a phone camera are fine.
* Shot in **landscape** (phone held sideways) for the gallery.
* Shop **open**, shutter up, lights on, daytime.

---

## 4. Changing the top orange strip

In `store-data.js`, section 4:

```js
announcement: {
  show:   true,
  en:     "Diwali offers now on — dry fruit gift packs available.",
  hi:     "दिवाली ऑफर शुरू — ड्राई फ्रूट गिफ्ट पैक उपलब्ध।"
}
```

Set `show: false` to hide the strip completely.

---

## 5. Files in this folder

| File | What it is |
|---|---|
| `index.html` | The web page |
| `assets/css/style.css` | All the design/colours |
| `assets/js/store-data.js` | **Your shop details — edit this** |
| `assets/js/app.js` | The working parts (search, order list, hours). Don't edit. |
| `assets/brand/` | Logo, icons, WhatsApp share image |
| `storefront.jpg` | Your shopfront photo |
| `favicon.png` | Browser tab icon |
| `site.webmanifest` | Lets customers add the site to their phone home screen |
| `robots.txt`, `sitemap.xml` | For Google — see below |
| `HOSTING.md` | Free hosting options |
| `DOMAIN-SETUP.md` | Buying a domain + the exact DNS records |
| `go-live.py` | Switches the site to your domain in one command |
| `set-domain.py` | Just changes the URL, without the CNAME file |
| `build-schema.js` | Rebuilds the Google business data — run after editing hours/phone/address |
| `GOOGLE-BUSINESS-PROFILE.md` | Copy-paste pack for your Google listing |

### Not used any more
`assets/grocery.jpg`, `pooja.jpg`, `festival.jpg`, `household.jpg`,
`personal-care.jpg`, `snacks.jpg`, `store-interior.jpg`, `festival-lights.jpg`

These are generic stock pictures of **other shops**, only 145×150 pixels — too small and
blurry to use, and misleading to customers. They have been removed from the page.
Replace them with real photos of your shop and they can go back in.

---

## 6. Before the site goes live

1. Fill in every `// ⚠️ CONFIRM` line in `store-data.js`.
2. Put the site online — see **`HOSTING.md`** (free, ~2 minutes).
   Then set your web address everywhere with one command:

   ```
   python3 set-domain.py your-address-here
   ```
3. Create a **free Google Business Profile** for the shop.
   This matters more than the website for people searching "kirana store near me".
   A complete, copy-paste setup pack is in **`GOOGLE-BUSINESS-PROFILE.md`** —
   description, categories, photo list, review strategy and a 30-day checklist.
   Once done, put the coordinates into `lat` and `lng` in `store-data.js` so the
   map shows your exact shop.
4. Test on your own phone: call button, WhatsApp button, order list.

---

## 7. Testing it locally

Double-click `index.html` — it opens in your browser and works offline.

If the map or fonts don't appear when opened that way, run this in the folder instead
and visit `http://localhost:8000`:

```
python3 -m http.server 8000
```
