/* Jagdambey Departmental Store — site behaviour
   Reads everything from assets/js/store-data.js                              */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- i18n */
  var T = {
    en: {
      openNow:"Open now", closedNow:"Closed now", opensAt:"Opens at", closesAt:"Closes at",
      closedToday:"Closed today", callUs:"Call us", search:"Search for an item…",
      all:"All", askPrice:"Ask price", yourList:"Your list", listSub:"Tick items, then send on WhatsApp",
      listEmpty:"No items yet. Tick anything from the list.", items:"items", item:"item",
      estTotal:"Estimated total", sendWa:"Send list on WhatsApp", clear:"Clear list",
      waHint:"This only opens WhatsApp with your list typed out. Nothing is ordered until we reply.",
      noResults:"No item matched. Try another word, or just ask us on WhatsApp.",
      priceNote:"Prices are not published yet — tap any item and ask us on WhatsApp for today's rate.",
      products:"products"
    },
    hi: {
      openNow:"अभी खुला है", closedNow:"अभी बंद है", opensAt:"खुलेगा", closesAt:"बंद होगा",
      closedToday:"आज बंद", callUs:"कॉल करें", search:"सामान खोजें…",
      all:"सभी", askPrice:"रेट पूछें", yourList:"आपकी लिस्ट", listSub:"सामान चुनें, फिर WhatsApp पर भेजें",
      listEmpty:"अभी कुछ नहीं चुना। लिस्ट में से कुछ भी चुनें।", items:"सामान", item:"सामान",
      estTotal:"अनुमानित कुल", sendWa:"WhatsApp पर लिस्ट भेजें", clear:"लिस्ट हटाएँ",
      waHint:"इससे सिर्फ़ WhatsApp खुलेगा जिसमें आपकी लिस्ट लिखी होगी। जवाब मिलने तक ऑर्डर पक्का नहीं होता।",
      noResults:"कोई सामान नहीं मिला। दूसरा शब्द लिखें, या WhatsApp पर पूछ लें।",
      priceNote:"रेट अभी वेबसाइट पर नहीं डाले गए हैं — सामान चुनकर WhatsApp पर आज का रेट पूछ लें।",
      products:"सामान"
    },
    pa: {
      openNow:"ਹੁਣ ਖੁੱਲ੍ਹਾ ਹੈ", closedNow:"ਹੁਣ ਬੰਦ ਹੈ", opensAt:"ਖੁੱਲ੍ਹੇਗਾ", closesAt:"ਬੰਦ ਹੋਵੇਗਾ",
      closedToday:"ਅੱਜ ਬੰਦ", callUs:"ਕਾਲ ਕਰੋ", search:"ਸਮਾਨ ਲੱਭੋ…",
      all:"ਸਾਰੇ", askPrice:"ਰੇਟ ਪੁੱਛੋ", yourList:"ਤੁਹਾਡੀ ਲਿਸਟ", listSub:"ਸਮਾਨ ਚੁਣੋ, ਫਿਰ WhatsApp 'ਤੇ ਭੇਜੋ",
      listEmpty:"ਹਾਲੇ ਕੁਝ ਨਹੀਂ ਚੁਣਿਆ। ਲਿਸਟ ਵਿੱਚੋਂ ਕੁਝ ਵੀ ਚੁਣੋ।", items:"ਸਮਾਨ", item:"ਸਮਾਨ",
      estTotal:"ਅੰਦਾਜ਼ਨ ਕੁੱਲ", sendWa:"WhatsApp 'ਤੇ ਲਿਸਟ ਭੇਜੋ", clear:"ਲਿਸਟ ਹਟਾਓ",
      waHint:"ਇਸ ਨਾਲ ਸਿਰਫ਼ WhatsApp ਖੁੱਲ੍ਹੇਗਾ ਜਿਸ ਵਿੱਚ ਤੁਹਾਡੀ ਲਿਸਟ ਲਿਖੀ ਹੋਵੇਗੀ। ਜਵਾਬ ਮਿਲਣ ਤੱਕ ਆਰਡਰ ਪੱਕਾ ਨਹੀਂ ਹੁੰਦਾ।",
      noResults:"ਕੋਈ ਸਮਾਨ ਨਹੀਂ ਮਿਲਿਆ। ਹੋਰ ਸ਼ਬਦ ਲਿਖੋ, ਜਾਂ WhatsApp 'ਤੇ ਪੁੱਛ ਲਵੋ।",
      priceNote:"ਰੇਟ ਹਾਲੇ ਵੈੱਬਸਾਈਟ 'ਤੇ ਨਹੀਂ ਪਾਏ ਗਏ — ਸਮਾਨ ਚੁਣ ਕੇ WhatsApp 'ਤੇ ਅੱਜ ਦਾ ਰੇਟ ਪੁੱਛ ਲਵੋ।",
      products:"ਸਮਾਨ"
    }
  };
  var lang = (function () {
    try { return localStorage.getItem("jds-lang") || "en"; } catch (e) { return "en"; }
  })();
  function t(k) { return (T[lang] && T[lang][k]) || T.en[k] || k; }

  function applyLang() {
    document.documentElement.lang = (lang === "hi" || lang === "pa") ? lang : "en";
    $$("[data-en]").forEach(function (el) {
      var v = el.getAttribute("data-" + lang);
      if (v !== null && v !== undefined) el.textContent = v;
    });
    $$("[data-ph-en]").forEach(function (el) {
      el.placeholder = el.getAttribute("data-ph-" + lang) || el.getAttribute("data-ph-en");
    });
    $$("[data-lang-btn]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang-btn") === lang));
    });
    var a = $("#announceText");
    if (a && STORE.announcement) a.textContent = STORE.announcement[lang] || STORE.announcement.en;
    buildChips(); renderLangBits(); renderStatus(); renderCatalogue(); renderCart(); renderHours();
  }

  $$("[data-lang-btn]").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.getAttribute("data-lang-btn");
      try { localStorage.setItem("jds-lang", lang); } catch (e) {}
      applyLang();
    });
  });

  /* -------------------------------------------------------- open / closed */
  var DAYS = ["sun","mon","tue","wed","thu","fri","sat"];
  var DAY_LABEL = {
    en:{mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday",sun:"Sunday"},
    hi:{mon:"सोमवार",tue:"मंगलवार",wed:"बुधवार",thu:"गुरुवार",fri:"शुक्रवार",sat:"शनिवार",sun:"रविवार"},
    pa:{mon:"ਸੋਮਵਾਰ",tue:"ਮੰਗਲਵਾਰ",wed:"ਬੁੱਧਵਾਰ",thu:"ਵੀਰਵਾਰ",fri:"ਸ਼ੁੱਕਰਵਾਰ",sat:"ਸ਼ਨੀਵਾਰ",sun:"ਐਤਵਾਰ"}
  };
  function toMin(hhmm) { var p = String(hhmm).split(":"); return (+p[0]) * 60 + (+p[1]); }
  /* 07:00 -> "7:00 AM" / "सुबह 7:00" / "ਸਵੇਰੇ 7:00" */
  var PART = {
    hi: { morning:"सुबह", noon:"दोपहर", eve:"शाम", night:"रात" },
    pa: { morning:"ਸਵੇਰੇ", noon:"ਦੁਪਹਿਰ", eve:"ਸ਼ਾਮ", night:"ਰਾਤ" }
  };
  function pretty(hhmm) {
    var p = String(hhmm).split(":"), h = +p[0], m = p[1];
    var h12 = h % 12 || 12;
    if (lang === "en") return h12 + ":" + m + " " + (h >= 12 ? "PM" : "AM");
    var w = PART[lang];
    var part = h < 12 ? w.morning : h < 16 ? w.noon : h < 19 ? w.eve : w.night;
    return part + " " + h12 + ":" + m;
  }
  function statusNow() {
    var now = new Date(), key = DAYS[now.getDay()], d = STORE.hours[key];
    if (!d || d.closed) return { open:false, text:t("closedToday") };
    var mins = now.getHours() * 60 + now.getMinutes();
    var o = toMin(d.open), c = toMin(d.close);
    if (mins >= o && mins < c) return { open:true,  text:t("openNow")  + " · " + t("closesAt") + " " + pretty(d.close) };
    return { open:false, text:t("closedNow") + " · " + t("opensAt") + " " + pretty(d.open) };
  }
  function renderStatus() {
    var s = statusNow();
    $$("[data-status]").forEach(function (el) {
      el.classList.toggle("shut", !s.open);
      var lbl = $(".status-text", el);
      if (lbl) lbl.textContent = s.text;
    });
  }
  function renderHours() {
    var tb = $("#hoursBody"); if (!tb) return;
    var todayKey = DAYS[new Date().getDay()];
    tb.innerHTML = ["mon","tue","wed","thu","fri","sat","sun"].map(function (k) {
      var d = STORE.hours[k];
      var val = (!d || d.closed) ? t("closedToday") : pretty(d.open) + " – " + pretty(d.close);
      return '<tr class="' + (k === todayKey ? "today" : "") + '"><td>' +
             DAY_LABEL[lang][k] + "</td><td>" + val + "</td></tr>";
    }).join("");
  }

  /* ----------------------------------------------------------- catalogue */
  var filter = "all", query = "";
  var cart = {};   // key -> {n,u,p,qty,cat}

  function priceText(p) { return p == null || p === "" ? null : "₹" + p; }

  function renderCatalogue() {
    var host = $("#catalogue"); if (!host) return;
    var q = query.trim().toLowerCase();
    var html = "", found = 0;

    CATALOGUE.forEach(function (cat) {
      if (filter !== "all" && filter !== cat.id) return;
      var hits = cat.items.filter(function (it) {
        return !q || it.n.toLowerCase().indexOf(q) > -1 || cat[lang].toLowerCase().indexOf(q) > -1;
      });
      if (!hits.length) return;
      found += hits.length;
      html += '<div class="grp"><h4>' + icon(cat.icon) + (cat[lang] || cat.en) + "</h4><div class=\"items\">";
      hits.forEach(function (it) {
        var key = cat.id + "|" + it.n;
        var pr  = priceText(it.p);
        html += '<label class="item' + (cart[key] ? " on" : "") + '" data-key="' + esc(key) +
                '" data-cat="' + cat.id + '" data-name="' + esc(it.n) + '" data-unit="' + esc(it.u) +
                '" data-price="' + (it.p == null ? "" : it.p) + '">' +
                '<input type="checkbox"' + (cart[key] ? " checked" : "") + ' aria-label="' + esc(it.n) + '">' +
                '<span class="nm"><b>' + esc(it.n) +
                (it.tag ? '<em class="tag ' + it.tag + '">' + it.tag + "</em>" : "") +
                "</b><span>" + esc(it.u) + "</span></span>" +
                '<span class="pr' + (pr ? "" : " ask") + '">' + (pr || t("askPrice")) + "</span></label>";
      });
      html += "</div></div>";
    });

    host.innerHTML = found ? html : '<p class="empty">' + t("noResults") + "</p>";
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c];
    });
  }

  /* delegated tick handling */
  document.addEventListener("change", function (e) {
    var lab = e.target.closest && e.target.closest(".item");
    if (!lab || e.target.type !== "checkbox") return;
    var key = lab.getAttribute("data-key");
    if (e.target.checked) {
      var raw = lab.getAttribute("data-price");
      cart[key] = {
        n: lab.getAttribute("data-name"),
        u: lab.getAttribute("data-unit"),
        p: raw === "" ? null : Number(raw),
        qty: 1
      };
    } else {
      delete cart[key];
    }
    lab.classList.toggle("on", !!cart[key]);
    saveCart(); renderCart();
  });

  function saveCart() { try { localStorage.setItem("jds-cart", JSON.stringify(cart)); } catch (e) {} }
  function loadCart() {
    try { cart = JSON.parse(localStorage.getItem("jds-cart") || "{}") || {}; } catch (e) { cart = {}; }
  }

  function renderCart() {
    var list = $("#cartList"), meta = $("#cartMeta"), tot = $("#cartTotal"), wrap = $("#cartTotalRow");
    if (!list) return;
    var keys = Object.keys(cart);
    renderMiniCart(keys);

    if (!keys.length) {
      list.innerHTML = '<li class="cart-empty" style="display:block">' + t("listEmpty") + "</li>";
      if (wrap) wrap.style.display = "none";
      if (meta) meta.textContent = t("listSub");
      return;
    }
    list.innerHTML = keys.map(function (k) {
      var c = cart[k];
      return "<li>" +
        '<span>' + esc(c.n) + ' <small style="opacity:.65">' + esc(c.u) + "</small></span>" +
        '<span class="qty"><button type="button" data-dec="' + esc(k) + '" aria-label="less">−</button>' +
        "<b>" + c.qty + '</b><button type="button" data-inc="' + esc(k) + '" aria-label="more">+</button></span>' +
        '<button type="button" class="rm" data-rm="' + esc(k) + '" aria-label="remove">×</button></li>';
    }).join("");

    var n = keys.reduce(function (s, k) { return s + cart[k].qty; }, 0);
    if (meta) meta.textContent = n + " " + (n === 1 ? t("item") : t("items"));

    var priced = keys.filter(function (k) { return cart[k].p != null && !isNaN(cart[k].p); });
    if (wrap) {
      if (priced.length === keys.length) {
        var sum = keys.reduce(function (s, k) { return s + cart[k].p * cart[k].qty; }, 0);
        wrap.style.display = "flex";
        if (tot) tot.textContent = "₹" + sum;
      } else {
        wrap.style.display = "none";
      }
    }
  }

  function renderMiniCart(keys) {
    var mini = $("#cartMini");
    if (!mini) return;
    var n = keys.reduce(function (s, k) { return s + cart[k].qty; }, 0);
    mini.hidden = n === 0;
    document.body.classList.toggle("has-list", n > 0);   /* lifts the back-to-top button clear */
    var c = $("#cartMiniCount");
    if (c) c.textContent = n;
    var lbl = $("#cartMiniLabel");
    if (lbl) lbl.textContent = lang === "hi" ? "सामान चुने गए"
                             : lang === "pa" ? "ਸਮਾਨ ਚੁਣਿਆ ਗਿਆ"
                             : (n === 1 ? "item selected" : "items selected");
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-inc],[data-dec],[data-rm]");
    if (!b) return;
    var k = b.getAttribute("data-inc") || b.getAttribute("data-dec") || b.getAttribute("data-rm");
    if (b.hasAttribute("data-inc")) cart[k].qty++;
    else if (b.hasAttribute("data-dec")) { if (--cart[k].qty < 1) delete cart[k]; }
    else delete cart[k];
    saveCart(); renderCart(); renderCatalogue();
  });

  var clearBtn = $("#cartClear");
  if (clearBtn) clearBtn.addEventListener("click", function () {
    cart = {}; saveCart(); renderCart(); renderCatalogue();
  });

  /* ------------------------------------------------ WhatsApp order message */
  function waLink(text) {
    return "https://wa.me/" + STORE.whatsapp + "?text=" + encodeURIComponent(text);
  }
  function sendOrder() {
    var keys = Object.keys(cart);
    var head = lang === "hi"
      ? "नमस्ते " + STORE.name + ",\nमुझे यह सामान चाहिए:\n"
      : lang === "pa"
      ? "ਸਤ ਸ੍ਰੀ ਅਕਾਲ " + STORE.name + ",\nਮੈਨੂੰ ਇਹ ਸਮਾਨ ਚਾਹੀਦਾ ਹੈ:\n"
      : "Hello " + STORE.name + ",\nI would like to order:\n";
    var body = keys.length
      ? keys.map(function (k, i) {
          var c = cart[k];
          return (i + 1) + ". " + c.n + " (" + c.u + ") × " + c.qty;
        }).join("\n")
      : (lang === "hi" ? "(लिस्ट खाली है)" : lang === "pa" ? "(ਲਿਸਟ ਖਾਲੀ ਹੈ)" : "(list is empty)");
    var tail = lang === "hi"
      ? "\n\nकृपया रेट और डिलीवरी बता दें। धन्यवाद।"
      : lang === "pa"
      ? "\n\nਕਿਰਪਾ ਕਰਕੇ ਰੇਟ ਤੇ ਡਿਲੀਵਰੀ ਦੱਸ ਦਿਓ। ਧੰਨਵਾਦ।"
      : "\n\nPlease confirm the rate and delivery. Thank you.";
    window.open(waLink(head + body + tail), "_blank", "noopener");
  }
  [$("#cartSend"), $("#cartMiniSend")].forEach(function (b) {
    if (b) b.addEventListener("click", sendOrder);
  });

  /* -------------------------------------------------------------- filters */
  var searchBox = $("#itemSearch");
  if (searchBox) {
    var tmr;
    searchBox.addEventListener("input", function () {
      clearTimeout(tmr);
      tmr = setTimeout(function () { query = searchBox.value; renderCatalogue(); }, 130);
    });
  }
  function buildChips() {
    var host = $("#chips"); if (!host) return;
    var out = '<button class="chip" data-f="all" aria-pressed="' + (filter === "all") + '">' + t("all") + "</button>";
    out += CATALOGUE.map(function (c) {
      return '<button class="chip" data-f="' + c.id + '" aria-pressed="' + (filter === c.id) + '">' +
             (c[lang] || c.en) + "</button>";
    }).join("");
    host.innerHTML = out;
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest && e.target.closest(".chip");
    if (!c) return;
    filter = c.getAttribute("data-f");
    $$(".chip").forEach(function (x) { x.setAttribute("aria-pressed", String(x === c)); });
    renderCatalogue();
  });
  $$("[data-jump]").forEach(function (b) {
    b.addEventListener("click", function () {
      filter = b.getAttribute("data-jump");
      $$(".chip").forEach(function (x) {
        x.setAttribute("aria-pressed", String(x.getAttribute("data-f") === filter));
      });
      renderCatalogue();
      var s = $("#pricelist");
      if (s) s.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------------------------------------------------------------- icons */
  function icon(name) {
    var p = {
      grocery:  '<path d="M3 6h18l-2 12H5L3 6Z"/><path d="M8 6V4a4 4 0 0 1 8 0v2"/><path d="M9 11v4M15 11v4"/>',
      pooja:    '<path d="M12 3c1.5 2 2.5 3.2 2.5 4.6A2.5 2.5 0 0 1 12 10a2.5 2.5 0 0 1-2.5-2.4C9.5 6.2 10.5 5 12 3Z"/><path d="M4 14h16c0 3.3-3.6 6-8 6s-8-2.7-8-6Z"/><path d="M7 14c0-1.1 2.2-2 5-2s5 .9 5 2"/>',
      festival: '<path d="M12 2v3"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9 21v-6h6v6"/><path d="M3 10h18"/>',
      personal: '<path d="M9 3h6v3H9z"/><path d="M8 6h8l1 4v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9l1-4Z"/><path d="M9 13h6"/>',
      household:'<path d="M3 10 12 3l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
      snacks:   '<path d="M6 3h12l-1.2 17a2 2 0 0 1-2 1.9H9.2a2 2 0 0 1-2-1.9L6 3Z"/><path d="M6.5 9h11"/><path d="M7 15h10"/>',
      cosmetics:'<path d="M9.5 10h5v10.5a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1-1.5-1.5V10Z"/><path d="M10.5 10V5.4a1.5 1.5 0 0 1 .6-1.2L12 3.4l.9.8a1.5 1.5 0 0 1 .6 1.2V10"/><path d="M9.5 14h5"/>',
      stationery:'<path d="M14.5 3.5 20 9 9.5 19.5 4 21l1.5-5.5L16 5"/><path d="m13 5 6 6"/><path d="M4 21h16"/>',
      recharge: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 5.5h3"/><path d="m12.8 9-2.6 4h3.6l-2.6 4"/>',
      truck:    '<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
      clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      pin:      '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
      phone:    '<path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
      wallet:   '<path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5"/><circle cx="17" cy="14" r="1.2"/>',
      search:   '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
      wa:       '<path d="M12.04 2A9.9 9.9 0 0 0 3.6 17.1L2.05 22l5.05-1.5A9.9 9.9 0 1 0 12.04 2Zm5.4 14c-.24.67-1.4 1.3-1.93 1.34-.5.05-1.13.07-1.82-.11a15.4 15.4 0 0 1-6.6-5.9c-.5-.83-.82-1.8-.82-2.63 0-.83.44-1.24.6-1.41.16-.18.36-.22.48-.22h.35c.11 0 .27-.04.42.32l.58 1.4c.05.1.08.22.01.35l-.24.36-.35.38c-.11.11-.23.24-.1.47.13.23.58.95 1.24 1.54.85.75 1.57.99 1.8 1.1.22.12.35.1.48-.06l.7-.81c.16-.18.29-.14.48-.07l1.37.65c.2.1.33.14.38.22.05.09.05.5-.19 1.18Z"/>',
      star:     '<path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3Z"/>'
    }[name] || "";
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>";
  }
  $$("[data-icon]").forEach(function (el) { el.innerHTML = icon(el.getAttribute("data-icon")); });
  $$("[data-icon-tile]").forEach(function (el) {
    el.insertAdjacentHTML("afterbegin", icon(el.getAttribute("data-icon-tile")));
  });

  /* ------------------------------------------------------------- lightbox */
  var lb = $("#lightbox");
  $$("[data-lb]").forEach(function (b) {
    b.addEventListener("click", function () {
      var img = $("img", b); if (!img || !lb) return;
      $("#lbImg").src = img.currentSrc || img.src;
      $("#lbImg").alt = img.alt;
      lb.classList.add("show");
      document.body.style.overflow = "hidden";
      $(".x", lb).focus();
    });
  });
  function closeLb() {
    if (!lb) return;
    lb.classList.remove("show"); document.body.style.overflow = "";
  }
  if (lb) {
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".x")) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  /* ----------------------------------------------------- nav, drawer, misc */
  var drawer = $("#drawer");
  $$("[data-drawer]").forEach(function (b) {
    b.addEventListener("click", function () {
      var open = !drawer.classList.contains("show");
      drawer.classList.toggle("show", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  });
  if (drawer) drawer.addEventListener("click", function (e) {
    if (e.target.closest("a") || e.target.closest(".scrim") || e.target.closest(".x")) {
      drawer.classList.remove("show"); document.body.style.overflow = "";
    }
  });

  var top = $("#toTop");
  if (top) {
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () {
      top.classList.toggle("show", window.scrollY > 700);
    }, { passive: true });
  }

  /* scroll-spy on the sub nav */
  var links = $$(".nav-sub a[href^='#']");
  if (links.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (l) {
      var s = document.querySelector(l.getAttribute("href"));
      if (s) io.observe(s);
    });
  }

  var dismiss = $("#announceClose");
  if (dismiss) dismiss.addEventListener("click", function () {
    $("#announce").remove();
    try { sessionStorage.setItem("jds-ann", "1"); } catch (e) {}
  });
  try { if (sessionStorage.getItem("jds-ann") && $("#announce")) $("#announce").remove(); } catch (e) {}
  if (STORE.announcement && !STORE.announcement.show && $("#announce")) $("#announce").remove();

  /* Values that change with the chosen language. */
  function renderLangBits() {
    $$("[data-count]").forEach(function (el) {
      var c = CATALOGUE.filter(function (x) { return x.id === el.getAttribute("data-count"); })[0];
      if (c) el.textContent = c.items.length + "+ " + t("products");
    });
    $$("[data-store]").forEach(function (el) {
      var k = el.getAttribute("data-store");
      var suffix = lang === "hi" ? "Hi" : lang === "pa" ? "Pa" : "";
      var v = STORE[k + suffix] || STORE[k];
      if (v) el.textContent = v;
    });
  }

  /* ------------------------------------------------- fill data-driven bits */
  function fill() {
    $$("a[data-tel]").forEach(function (a) {
      var n = STORE[a.getAttribute("data-tel")];
      if (n) a.href = "tel:+91" + n;
    });
    $$("a[data-wa]").forEach(function (a) {
      var msg = a.getAttribute("data-wa-msg") || ("Hello " + STORE.name + ", ");
      a.href = waLink(msg);
      a.target = "_blank"; a.rel = "noopener";
    });
    /* payment chips */
    var pay = $("#payList");
    if (pay && STORE.payments) {
      pay.innerHTML = STORE.payments.map(function (p) { return "<span>" + esc(p) + "</span>"; }).join("");
    }
    /* map */
    var map = $("#mapFrame");
    if (map) {
      var q = (STORE.lat && STORE.lng) ? (STORE.lat + "," + STORE.lng) : STORE.mapsQuery;
      map.src = "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&z=16&output=embed";
    }
    $$("[data-maps-link]").forEach(function (a) {
      a.href = STORE.mapsLink ||
        ("https://www.google.com/maps/search/?api=1&query=" +
         encodeURIComponent((STORE.lat && STORE.lng) ? STORE.lat + "," + STORE.lng : STORE.mapsQuery));
    });
    var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------ LocalBusiness SEO */
  function schema() {
    var oh = [];
    var MAP = { mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday",sun:"Sunday" };
    Object.keys(MAP).forEach(function (k) {
      var d = STORE.hours[k];
      if (d && !d.closed) {
        oh.push({ "@type":"OpeningHoursSpecification", dayOfWeek:MAP[k], opens:d.open, closes:d.close });
      }
    });
    var addr = { "@type":"PostalAddress", streetAddress:STORE.addressLine,
                 addressLocality:STORE.city, addressRegion:STORE.state, addressCountry:STORE.country };
    if (STORE.postalCode) addr.postalCode = STORE.postalCode;

    var data = {
      "@context":"https://schema.org", "@type":"GroceryStore",
      name:STORE.name,
      alternateName:[STORE.alsoKnownAs, STORE.nameHi, STORE.namePa].filter(Boolean),
      description:STORE.tagline,
      knowsLanguage:["en","hi","pa"],
      image:STORE.siteUrl + "/assets/brand/og-image.jpg",
      logo:STORE.siteUrl + "/assets/brand/icon-512.png",
      url:STORE.siteUrl,
      telephone:["+91" + STORE.phone1, "+91" + STORE.phone2],
      address:addr,
      openingHoursSpecification:oh,
      currenciesAccepted:"INR",
      paymentAccepted:(STORE.payments || []).join(", "),
      areaServed:STORE.delivery && STORE.delivery.areas,
      makesOffer:CATALOGUE.map(function (c) {
        return { "@type":"Offer", itemOffered:{ "@type":"Product", name:c.en, description:c.descEn } };
      })
    };
    if (STORE.ownerName) {
      data.founder = { "@type":"Person", name:STORE.ownerName };
    }
    if (STORE.lat && STORE.lng) {
      data.geo = { "@type":"GeoCoordinates", latitude:STORE.lat, longitude:STORE.lng };
      data.hasMap = "https://www.google.com/maps/search/?api=1&query=" + STORE.lat + "," + STORE.lng;
    }
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------------ boot */
  loadCart();
  fill();
  applyLang();
  schema();
  setInterval(renderStatus, 60000);
})();
