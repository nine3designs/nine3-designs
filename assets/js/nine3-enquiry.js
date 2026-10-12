/* ============================================================
   NINE3 DESIGNS — ENQUIRY UPGRADE SCRIPT
   Install on every page, just before </body>:
     <script src="assets/js/nine3-enquiry.js" defer></script>

   What it does (quietly, no impact on your existing scripts):
   1) If someone arrives at contact.html from an "Enquire" link
      carrying ?package=..., it labels the enquiry — a hidden
      "package" field is added to the form and a confirmation
      chip is shown, so you know what they want before you reply.
   2) On mobile only, it adds a sticky bottom bar:
      "Get a Free Quote" + a video-call button + WhatsApp
      (hidden on the contact page itself, and it slides away at
      the top of the page so it never covers your hero).
   ============================================================ */

(function () {
  "use strict";

  /* ---------- CONFIG (edit here if anything changes) ---------- */
  var WHATSAPP_NUMBER = "447343070273"; // 07343 070273 in international form
  var WHATSAPP_TEXT   = "Hi Nine3! I'd like to chat about a design project.";
  var QUOTE_URL       = "/contact.html";
  var BOOKING_URL     = "https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=20261012T170000&hl=en&add=natalie@nine3designs.co.uk&text=Free%20discovery%20call%20with%20Nine3%20Designs&details=Free%2015-minute%20video%20call%20to%20discuss%20your%20project.%20Booked%20via%20nine3designs.co.uk"; // book-a-call (Google Meet) — swap for an appointment-schedule link anytime
  var SHOW_AFTER_PX   = 420;            // scroll depth before the bar slides up

  /* Services page package slugs -> human labels (matches the
     pricing grid on services.html — keep in sync if prices change) */
  var PACKAGES = {
    "landing-page":     "Landing Page website (from £495)",
    "business-website": "Business Website (up to 5 pages, from £895)",
    "premium-website":  "Premium Website (up to 10 pages, from £1,395)",
    "branding-starter":  "Branding Starter (£449)",
    "branding-growth":   "Branding Growth (£529)",
    "branding-signature":"Branding Signature (£719)",
    "brand-experience":  "Brand Experience (£1,195)",
    "logo-basic":        "Logo Basic (£249)",
    "logo-premium":      "Logo Premium (£399)",
    "proof-of-concept":  "Proof-of-Concept (£150, redeemable)",
    "brand-refresh":     "Brand Refresh (from £699)",
    "website-brand":     "Website + Brand (from £1,495)",
    "brand-launch":      "Brand Launch (from £1,550)",
    "campaign-event":    "Campaign / Event Design (from £250)",
    "general":           "A general enquiry"
  };

  /* ---------- 1. Package prefill on the contact form ---------- */
  try {
    var pkg = new URLSearchParams(window.location.search).get("package");
    if (pkg) {
      var label = PACKAGES[pkg] ||
        pkg.replace(/-/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });

      var form = document.querySelector("form.contact-form") ||
                 document.querySelector('form[action*="formspree"]');

      if (form) {
        // hidden field -> arrives in the Formspree email
        var hidden = form.querySelector('input[name="package"]');
        if (!hidden) {
          hidden = document.createElement("input");
          hidden.type = "hidden";
          hidden.name = "package";
          form.appendChild(hidden);
        }
        hidden.value = label;

        // if the form already has a visible <select>, try to match it
        var select = form.querySelector("select");
        if (select && select.options && select.options.length) {
          var needle = label.split(" (")[0].toLowerCase();
          Array.prototype.forEach.call(select.options, function (opt) {
            if (opt.text.toLowerCase().indexOf(needle) > -1) select.value = opt.value;
          });
        }

        // confirmation chip above the form
        var chip = document.createElement("p");
        chip.className = "n3-package-chip is-active";
        var strong = document.createElement("b");
        strong.textContent = label;
        chip.appendChild(document.createTextNode("Enquiring about: "));
        chip.appendChild(strong);
        form.parentNode.insertBefore(chip, form);
      }
    }
  } catch (e) { /* never let this break the page */ }

  /* ---------- 2. Sticky mobile enquiry bar --------------------- */
  var isContactPage = /(^|\/)contact\.html?$/.test(window.location.pathname.toLowerCase());

  if (!isContactPage) {
    var waLink = "https://wa.me/" + WHATSAPP_NUMBER +
                 "?text=" + encodeURIComponent(WHATSAPP_TEXT);

    var bar = document.createElement("div");
    bar.className = "n3-mobile-cta";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Quick enquiry");

    var quote = document.createElement("a");
    quote.className = "n3-quote-btn";
    quote.href = QUOTE_URL;
    quote.textContent = "Get a Free Quote";

    var meet = document.createElement("a");
    meet.className = "n3-meet-btn";
    meet.href = BOOKING_URL;
    meet.target = "_blank";
    meet.rel = "noopener";
    meet.setAttribute("aria-label", "Book a free video call");
    meet.innerHTML =
      '<svg viewBox="0 0 576 512" fill="currentColor" aria-hidden="true">' +
      '<path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"/></svg>';

    var wa = document.createElement("a");
    wa.className = "n3-wa-btn";
    wa.href = waLink;
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.setAttribute("aria-label", "Chat on WhatsApp");
    wa.innerHTML =
      '<svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">' +
      '<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';

    bar.appendChild(quote);
    bar.appendChild(meet);
    bar.appendChild(wa);
    document.body.appendChild(bar);
    document.body.classList.add("n3-has-cta");

    var toggleBar = function () {
      bar.classList.toggle("is-visible", window.scrollY > SHOW_AFTER_PX);
    };
    window.addEventListener("scroll", toggleBar, { passive: true });
    toggleBar();
  }
})();

/* ---------- 3. Testing helper --------------------------------
   Add ?previewbar to ANY page URL to show the sticky bar
   immediately (handy for checking it without scrolling). */
(function () {
  if (!new URLSearchParams(window.location.search).has("previewbar")) return;
  var tries = 0;
  var timer = setInterval(function () {
    var b = document.querySelector(".n3-mobile-cta");
    if (b) { b.classList.add("is-visible"); clearInterval(timer); }
    if (++tries > 50) clearInterval(timer);
  }, 100);
})();
