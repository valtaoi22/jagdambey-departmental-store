/* ==========================================================================
   JAGDAMBEY DEPARTMENTAL STORE — SHOP SETTINGS
   --------------------------------------------------------------------------
   This is the ONLY file you normally need to edit.
   Change the values between the quotes. Do not delete commas or brackets.

   Lines marked  // ⚠️ CONFIRM  hold a guessed value — please check them.

   Languages: en = English, hi = हिंदी, pa = ਪੰਜਾਬੀ
   ========================================================================== */

const STORE = {

  /* ---------- 1. BASIC DETAILS ---------- */
  name:        "Jagdambey Departmental Store",
  nameHi:      "जगदम्बे डिपार्टमेंटल स्टोर",
  namePa:      "ਜਗਦੰਬੇ ਡਿਪਾਰਟਮੈਂਟਲ ਸਟੋਰ",

  /* The name local people actually use for the shop. Shown on the site and
     given to Google as an alternate name, so both searches find you.        */
  ownerName:   "Ashok Kumar",                          // ⚠️ CONFIRM spelling
  alsoKnownAs:   "Ashok Kumar Bareta Wale",            // ⚠️ CONFIRM spelling
  alsoKnownAsHi: "अशोक कुमार बरेटे वाले",
  alsoKnownAsPa: "ਅਸ਼ੋਕ ਕੁਮਾਰ ਬਰੇਟੇ ਵਾਲੇ",

  tagline:     "One stop shop for daily needs",
  taglineHi:   "रोज़मर्रा की ज़रूरतों की एक ही दुकान",
  taglinePa:   "ਰੋਜ਼ਾਨਾ ਲੋੜਾਂ ਲਈ ਇੱਕੋ ਦੁਕਾਨ",

  phone1:      "9464594106",
  phone2:      "9463504900",
  whatsapp:    "919464594106",        // country code + number, no + or spaces

  addressLine: "Near Geeta Bhawan, Sardulgarh",
  city:        "Sardulgarh",
  district:    "Mansa",
  state:       "Punjab",
  postalCode:  "151507",               // Sardulgarh S.O., Mansa — confirmed via India Post
  country:     "IN",

  /* Exact shop location. Right-click your shop in Google Maps → copy the
     numbers that look like 29.6912, 75.2384 and paste them here.          */
  lat:         "",                     // ⚠️ CONFIRM — leave "" until you have it
  lng:         "",                     // ⚠️ CONFIRM
  mapsQuery:   "Geeta Bhawan, Sardulgarh, Punjab",   // ⚠️ CONFIRM — replace with your shop name once listed
  mapsLink:    "",                     // optional: paste your Google Business "share" link here

  /* Your live website address, once you buy a domain. Used for SEO. */
  siteUrl:     "https://jagdambeystore.com",         // ⚠️ CONFIRM

  /* ---------- 2. OPENING HOURS ----------
     24-hour clock. Use  closed: true  for a weekly off day.               */
  hours: {                                            // ⚠️ CONFIRM all of these
    mon: { open: "07:00", close: "21:00" },
    tue: { open: "07:00", close: "21:00" },
    wed: { open: "07:00", close: "21:00" },
    thu: { open: "07:00", close: "21:00" },
    fri: { open: "07:00", close: "21:00" },
    sat: { open: "07:00", close: "21:00" },
    sun: { open: "08:00", close: "20:00" }
  },

  /* ---------- 3. DELIVERY ---------- */
  delivery: {
    enabled:     true,
    free:        true,                 // ⚠️ CONFIRM — your banner says FREE HOME DELIVERY
    minOrder:    "",                   // e.g. "300" for ₹300 minimum, or "" for no minimum
    areas:       "Sardulgarh and nearby villages",   // ⚠️ CONFIRM — add the village names you deliver to
    timing:      "Same day"            // ⚠️ CONFIRM
  },

  /* ---------- 4. ANNOUNCEMENT STRIP ----------
     Change this for festivals, offers or holidays. Set show:false to hide. */
  announcement: {
    show: true,
    en:   "🪔 Festival stock has arrived — pooja items, diyas, gift packs and dry fruits.",
    hi:   "🪔 त्योहारों का सामान आ गया है — पूजा सामग्री, दीये, गिफ्ट पैक और ड्राई फ्रूट्स।",
    pa:   "🪔 ਤਿਉਹਾਰਾਂ ਦਾ ਸਮਾਨ ਆ ਗਿਆ ਹੈ — ਪੂਜਾ ਸਮੱਗਰੀ, ਦੀਵੇ, ਗਿਫ਼ਟ ਪੈਕ ਤੇ ਡਰਾਈ ਫਰੂਟ।"
  },

  /* ---------- 5. PAYMENTS ACCEPTED ---------- */
  payments: ["Cash", "UPI / Google Pay / PhonePe", "Paytm"],   // ⚠️ CONFIRM
  upiId:    "",                        // e.g. "9464594106@ybl" — shows a Pay button if filled

  /* ---------- 6. CUSTOMER REVIEWS ----------
     Only add reviews people have actually given you. Delete the samples. */
  reviews: []
};

/* ==========================================================================
   7. PRODUCT & PRICE LIST
   --------------------------------------------------------------------------
   Add / remove lines freely. Format:
       { n: "Item name", u: "unit", p: price }
   • p: 45      → shows ₹45
   • p: null    → shows "Ask price"  (use this until you fill real prices)
   • add  tag:"new"  or  tag:"offer"  to highlight an item
   ========================================================================== */

const CATALOGUE = [
  {
    id: "grocery", icon: "grocery",
    en: "Grocery & Essentials",
    hi: "किराना और ज़रूरी सामान",
    pa: "ਕਰਿਆਨਾ ਤੇ ਜ਼ਰੂਰੀ ਸਮਾਨ",
    descEn: "Atta, rice, dal, oil, sugar, masala and everyday cooking needs.",
    descHi: "आटा, चावल, दाल, तेल, चीनी, मसाले और रोज़ की रसोई की ज़रूरतें।",
    descPa: "ਆਟਾ, ਚੌਲ, ਦਾਲ, ਤੇਲ, ਖੰਡ, ਮਸਾਲੇ ਤੇ ਰੋਜ਼ ਦੀ ਰਸੋਈ ਦੀਆਂ ਲੋੜਾਂ।",
    items: [
      { n: "Wheat Atta",            u: "10 kg bag", p: null },
      { n: "Basmati Rice",          u: "1 kg",      p: null },
      { n: "Sona Masoori Rice",     u: "1 kg",      p: null },
      { n: "Toor / Arhar Dal",      u: "1 kg",      p: null },
      { n: "Moong Dal",             u: "1 kg",      p: null },
      { n: "Chana Dal",             u: "1 kg",      p: null },
      { n: "Rajma",                 u: "1 kg",      p: null },
      { n: "Kabuli Chana",          u: "1 kg",      p: null },
      { n: "Refined Oil",           u: "1 L pouch", p: null },
      { n: "Mustard Oil",           u: "1 L",       p: null },
      { n: "Desi Ghee",             u: "1 kg",      p: null },
      { n: "Butter",                u: "100 g / 500 g", p: null },
      { n: "Sugar",                 u: "1 kg",      p: null },
      { n: "Salt",                  u: "1 kg",      p: null },
      { n: "Tea Leaves",            u: "250 g",     p: null },
      { n: "Turmeric Powder",       u: "100 g",     p: null },
      { n: "Red Chilli Powder",     u: "100 g",     p: null },
      { n: "Garam Masala",          u: "100 g",     p: null },
      { n: "Besan",                 u: "1 kg",      p: null },
      { n: "Maida",                 u: "1 kg",      p: null },
      { n: "Suji / Rava",           u: "1 kg",      p: null }
    ]
  },
  {
    id: "pooja", icon: "pooja",
    en: "Pooja Items",
    hi: "पूजा सामग्री",
    pa: "ਪੂਜਾ ਸਮੱਗਰੀ",
    descEn: "Agarbatti, diya, kapoor, roli, kalava and complete pooja samagri.",
    descHi: "अगरबत्ती, दीया, कपूर, रोली, कलावा और पूरी पूजा सामग्री।",
    descPa: "ਅਗਰਬੱਤੀ, ਦੀਵਾ, ਕਪੂਰ, ਰੋਲੀ, ਕਲਾਵਾ ਤੇ ਪੂਰੀ ਪੂਜਾ ਸਮੱਗਰੀ।",
    items: [
      { n: "Agarbatti",             u: "pack",   p: null },
      { n: "Dhoop Batti",           u: "pack",   p: null },
      { n: "Kapoor (Camphor)",      u: "pack",   p: null },
      { n: "Mitti Diya",            u: "12 pcs", p: null },
      { n: "Cotton Batti",          u: "pack",   p: null },
      { n: "Roli / Kumkum",         u: "pack",   p: null },
      { n: "Kalava / Mauli",        u: "roll",   p: null },
      { n: "Havan Samagri",         u: "pack",   p: null },
      { n: "Gangajal",              u: "bottle", p: null },
      { n: "Pooja Thali",           u: "piece",  p: null },
      { n: "Nariyal (Dry)",         u: "piece",  p: null },
      { n: "Chandan / Sandal Paste",u: "pack",   p: null }
    ]
  },
  {
    id: "festival", icon: "festival",
    en: "Festival Items",
    hi: "त्योहार का सामान",
    pa: "ਤਿਉਹਾਰਾਂ ਦਾ ਸਮਾਨ",
    descEn: "Decorations, gift packs, dry fruits and seasonal celebration needs.",
    descHi: "सजावट, गिफ्ट पैक, ड्राई फ्रूट्स और त्योहारों का मौसमी सामान।",
    descPa: "ਸਜਾਵਟ, ਗਿਫ਼ਟ ਪੈਕ, ਡਰਾਈ ਫਰੂਟ ਤੇ ਤਿਉਹਾਰਾਂ ਦਾ ਮੌਸਮੀ ਸਮਾਨ।",
    items: [
      { n: "Diwali Gift Pack",      u: "box",   p: null, tag: "new" },
      { n: "Dry Fruit Box",         u: "box",   p: null },
      { n: "Decorative Lights",     u: "string",p: null },
      { n: "Rangoli Colours",       u: "set",   p: null },
      { n: "Toran / Door Hanging",  u: "piece", p: null },
      { n: "Rakhi",                 u: "piece", p: null },
      { n: "Holi Colours / Gulal",  u: "pack",  p: null },
      { n: "Candles",               u: "pack",  p: null }
    ]
  },
  {
    id: "personal", icon: "personal",
    en: "Personal Care",
    hi: "पर्सनल केयर",
    pa: "ਪਰਸਨਲ ਕੇਅਰ",
    descEn: "Soap, shampoo, toothpaste, oil, cream and daily grooming needs.",
    descHi: "साबुन, शैम्पू, टूथपेस्ट, तेल, क्रीम और रोज़ की देखभाल।",
    descPa: "ਸਾਬਣ, ਸ਼ੈਂਪੂ, ਟੂਥਪੇਸਟ, ਤੇਲ, ਕਰੀਮ ਤੇ ਰੋਜ਼ ਦੀ ਸੰਭਾਲ।",
    items: [
      { n: "Bathing Soap",          u: "piece", p: null },
      { n: "Shampoo Sachet / Bottle",u:"each",  p: null },
      { n: "Toothpaste",            u: "tube",  p: null },
      { n: "Toothbrush",            u: "piece", p: null },
      { n: "Hair Oil",              u: "bottle",p: null },
      { n: "Body Lotion",           u: "bottle",p: null },
      { n: "Shaving Cream / Razor", u: "each",  p: null },
      { n: "Talcum Powder",         u: "pack",  p: null },
      { n: "Sanitary Napkins",      u: "pack",  p: null },
      { n: "Baby Diapers",          u: "pack",  p: null }
    ]
  },
  {
    id: "cosmetics", icon: "cosmetics",
    en: "Cosmetics & Shringar",
    hi: "श्रृंगार का सामान",
    pa: "ਸ਼ਿੰਗਾਰ ਦਾ ਸਮਾਨ",
    descEn: "Bindi, sindoor, kajal, nail polish, mehndi, creams and daily shringar.",
    descHi: "बिंदी, सिंदूर, काजल, नेल पॉलिश, मेहंदी, क्रीम और रोज़ का श्रृंगार।",
    descPa: "ਬਿੰਦੀ, ਸਿੰਦੂਰ, ਕਾਜਲ, ਨੇਲ ਪਾਲਿਸ਼, ਮਹਿੰਦੀ, ਕਰੀਮ ਤੇ ਰੋਜ਼ ਦਾ ਸ਼ਿੰਗਾਰ।",
    items: [
      { n: "Bindi",                 u: "packet", p: null },
      { n: "Sindoor",               u: "box",    p: null },
      { n: "Kajal",                 u: "piece",  p: null },
      { n: "Nail Polish",           u: "bottle", p: null },
      { n: "Lipstick",              u: "piece",  p: null },
      { n: "Mehndi Cone",           u: "piece",  p: null },
      { n: "Face Cream",            u: "tube",   p: null },
      { n: "Face Powder",           u: "pack",   p: null },
      { n: "Hair Colour / Mehndi",  u: "pack",   p: null },
      { n: "Hair Clips & Rubber Bands", u: "pack", p: null },
      { n: "Perfume / Deodorant",   u: "bottle", p: null },
      { n: "Bangles / Chudi",       u: "set",    p: null }    // ⚠️ CONFIRM — delete if you don't keep these
    ]
  },
  {
    id: "stationery", icon: "stationery",
    en: "Stationery & School",
    hi: "स्टेशनरी और स्कूल का सामान",
    pa: "ਸਟੇਸ਼ਨਰੀ ਤੇ ਸਕੂਲ ਦਾ ਸਮਾਨ",
    descEn: "Copies, pens, pencils, geometry boxes and everything for school.",
    descHi: "कॉपी, पेन, पेंसिल, ज्योमेट्री बॉक्स और स्कूल का पूरा सामान।",
    descPa: "ਕਾਪੀਆਂ, ਪੈੱਨ, ਪੈਨਸਿਲ, ਜਿਓਮੈਟਰੀ ਬਾਕਸ ਤੇ ਸਕੂਲ ਦਾ ਸਾਰਾ ਸਮਾਨ।",
    items: [
      { n: "Notebook / Copy",       u: "each",  p: null },
      { n: "Register",              u: "each",  p: null },
      { n: "Pen (Blue / Black)",    u: "piece", p: null },
      { n: "Pencil",                u: "piece", p: null },
      { n: "Eraser & Sharpener",    u: "set",   p: null },
      { n: "Geometry Box",          u: "box",   p: null },
      { n: "Scale / Ruler",         u: "piece", p: null },
      { n: "Colour Pencils / Crayons", u: "box",p: null },
      { n: "Chart Paper",           u: "sheet", p: null },
      { n: "Glue / Fevicol",        u: "tube",  p: null },
      { n: "Stapler & Pins",        u: "each",  p: null },
      { n: "Envelope",              u: "each",  p: null },
      { n: "A4 Paper",              u: "packet",p: null },
      { n: "Exam Board / Clipboard",u: "piece", p: null }
    ]
  },
  {
    id: "household", icon: "household",
    en: "Household Needs",
    hi: "घरेलू सामान",
    pa: "ਘਰੇਲੂ ਸਮਾਨ",
    descEn: "Cleaning, washing, kitchen and everyday home supplies.",
    descHi: "सफ़ाई, धुलाई, रसोई और घर का रोज़ का सामान।",
    descPa: "ਸਫ਼ਾਈ, ਧੁਲਾਈ, ਰਸੋਈ ਤੇ ਘਰ ਦਾ ਰੋਜ਼ ਦਾ ਸਮਾਨ।",
    items: [
      { n: "Detergent Powder",      u: "1 kg",  p: null },
      { n: "Detergent Bar",         u: "piece", p: null },
      { n: "Dishwash Bar / Gel",    u: "each",  p: null },
      { n: "Floor Cleaner",         u: "bottle",p: null },
      { n: "Toilet Cleaner",        u: "bottle",p: null },
      { n: "Broom / Jhadu",         u: "piece", p: null },
      { n: "Scrub Pad",             u: "pack",  p: null },
      { n: "Garbage Bags",          u: "roll",  p: null },
      { n: "Match Box / Lighter",   u: "each",  p: null },
      { n: "Mosquito Repellent",    u: "each",  p: null },
      { n: "Aluminium Foil",        u: "roll",  p: null },
      { n: "Candles / Torch Cells", u: "pack",  p: null }
    ]
  },
  {
    id: "snacks", icon: "snacks",
    en: "Snacks & Beverages",
    hi: "स्नैक्स और पेय",
    pa: "ਸਨੈਕਸ ਤੇ ਪੀਣ ਵਾਲੇ",
    descEn: "Biscuits, namkeen, chips, cold drinks, juice and quick bites.",
    descHi: "बिस्कुट, नमकीन, चिप्स, कोल्ड ड्रिंक, जूस और झटपट नाश्ता।",
    descPa: "ਬਿਸਕੁਟ, ਨਮਕੀਨ, ਚਿਪਸ, ਕੋਲਡ ਡਰਿੰਕ, ਜੂਸ ਤੇ ਝਟਪਟ ਨਾਸ਼ਤਾ।",
    items: [
      { n: "Biscuits",              u: "pack",  p: null },
      { n: "Namkeen / Mixture",     u: "pack",  p: null },
      { n: "Potato Chips",          u: "pack",  p: null },
      { n: "Cold Drink",            u: "bottle",p: null },
      { n: "Packaged Juice",        u: "pack",  p: null },
      { n: "Drinking Water",        u: "1 L",   p: null },
      { n: "Chocolates & Toffees",  u: "each",  p: null },
      { n: "Instant Noodles",       u: "pack",  p: null },
      { n: "Bread / Rusk",          u: "pack",  p: null }
      /* Note: milk and curd are NOT sold. Butter is listed under Grocery. */
    ]
  },
  {
    id: "recharge", icon: "recharge",
    en: "Mobile Recharge",
    hi: "मोबाइल रिचार्ज",
    pa: "ਮੋਬਾਈਲ ਰੀਚਾਰਜ",
    descEn: "Prepaid recharge for all networks — done at the counter in a minute.",
    descHi: "सभी नेटवर्क का प्रीपेड रिचार्ज — काउंटर पर एक मिनट में।",
    descPa: "ਸਾਰੇ ਨੈੱਟਵਰਕਾਂ ਦਾ ਪ੍ਰੀਪੇਡ ਰੀਚਾਰਜ — ਕਾਊਂਟਰ 'ਤੇ ਇੱਕ ਮਿੰਟ ਵਿੱਚ।",
    items: [
      { n: "Prepaid Mobile Recharge", u: "all networks", p: null },
      { n: "Data Pack Recharge",      u: "all networks", p: null },
      { n: "DTH / TV Recharge",       u: "per recharge", p: null }  // ⚠️ CONFIRM — delete if not offered
    ]
  }
];
