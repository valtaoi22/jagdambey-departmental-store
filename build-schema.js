/**
 * Writes the Google "local business" data straight into index.html.
 *
 * Google reads a page twice: once as plain HTML, and again later with
 * JavaScript run. Data added by JavaScript can be missed or picked up days
 * late, so the shop's address, phone and opening hours are baked into the
 * HTML instead — that is exactly the information Google needs to show the
 * shop for "kirana store near me" style searches.
 *
 * Everything comes from assets/js/store-data.js, so there is nothing to keep
 * in sync by hand.
 *
 * RUN THIS after changing hours, phone numbers, address or payments:
 *     node build-schema.js
 */
const fs = require("fs");
const vm = require("vm");

const START = "<!-- business-data:start -->";
const END   = "<!-- business-data:end -->";

const src = fs.readFileSync("assets/js/store-data.js", "utf8");
const { STORE, CATALOGUE } = vm.runInNewContext(src + "\n;({STORE, CATALOGUE})");

const DAY = { mon:"Monday", tue:"Tuesday", wed:"Wednesday", thu:"Thursday",
              fri:"Friday", sat:"Saturday", sun:"Sunday" };

const hours = Object.keys(DAY)
  .filter(k => STORE.hours[k] && !STORE.hours[k].closed)
  .map(k => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: DAY[k],
    opens: STORE.hours[k].open,
    closes: STORE.hours[k].close
  }));

// addressLine reads well on the page ("Near Geeta Bhawan, Sardulgarh") but the
// city is a separate field for Google, so strip it to avoid "Sardulgarh, Sardulgarh".
const street = STORE.addressLine
  .replace(new RegExp(",\\s*" + STORE.city + "\\s*$", "i"), "")
  .trim();

const address = {
  "@type": "PostalAddress",
  streetAddress: street,
  addressLocality: STORE.city,
  addressRegion: STORE.state,
  addressCountry: STORE.country
};
if (STORE.postalCode) address.postalCode = STORE.postalCode;

const data = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: STORE.name,
  alternateName: [STORE.alsoKnownAs, STORE.nameHi, STORE.namePa].filter(Boolean),
  description: STORE.tagline,
  knowsLanguage: ["en", "hi", "pa"],
  image: STORE.siteUrl + "/assets/brand/og-image.jpg",
  logo: STORE.siteUrl + "/assets/brand/icon-512.png",
  url: STORE.siteUrl,
  telephone: ["+91" + STORE.phone1, "+91" + STORE.phone2],
  address,
  openingHoursSpecification: hours,
  currenciesAccepted: "INR",
  paymentAccepted: (STORE.payments || []).join(", "),
  areaServed: STORE.delivery && STORE.delivery.areas,
  makesOffer: CATALOGUE.map(c => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name: c.en, description: c.descEn }
  }))
};
if (STORE.ownerName) data.founder = { "@type": "Person", name: STORE.ownerName };
if (STORE.lat && STORE.lng) {
  data.geo = { "@type": "GeoCoordinates", latitude: STORE.lat, longitude: STORE.lng };
  data.hasMap = "https://www.google.com/maps/search/?api=1&query=" + STORE.lat + "," + STORE.lng;
}

const block = START + "\n" +
  '<script type="application/ld+json">\n' +
  JSON.stringify(data, null, 2) + "\n" +
  "</script>\n" + END;

let html = fs.readFileSync("index.html", "utf8");

if (html.includes(START) && html.includes(END)) {
  html = html.replace(new RegExp(START + "[\\s\\S]*?" + END), block);
} else {
  // first run — insert just before </head>
  html = html.replace("</head>", block + "\n</head>");
}
fs.writeFileSync("index.html", html);

const warn = [];
if (!STORE.postalCode) warn.push("postalCode");
if (!STORE.lat || !STORE.lng) warn.push("lat/lng (exact map pin)");

console.log(`Business data written into index.html`);
console.log(`  ${hours.length} open days, ${data.makesOffer.length} product categories`);
console.log(`  ${JSON.stringify(data).length} bytes of structured data`);
if (warn.length) console.log(`  still missing (Google would use these): ${warn.join(", ")}`);
