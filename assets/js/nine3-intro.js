/* ==========================================================
   Nine3 intro loader + word-by-word scroll reveal
   Added 19 Nov 2026. Homepage only.
   Reduced motion: loader skipped, everything shows instantly.
   ========================================================== */

(function () {

    var reduced = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var loader = document.getElementById("n3-loader");

    if (reduced || !loader) {
        if (loader) loader.remove();
        return;
    }


    /* ======================================================
       Intro loader (natalie-smith style curtain)
       ====================================================== */

    document.body.classList.add("n3-lock");

    var heroEls = [
        document.querySelector(".hero-tag"),
        document.querySelector(".hero-text h1"),
        document.querySelector(".hero-text p"),
        document.querySelector(".hero-buttons")
    ].filter(Boolean);

    heroEls.forEach(function (el) {
        el.classList.add("n3-hero-el");
    });

    var LIFT_AFTER = 1400;
    var LIFT_TAKES = 850;

    window.setTimeout(function () {

        loader.classList.add("n3-lift");

        heroEls.forEach(function (el, i) {
            el.style.transitionDelay = (i * 110) + "ms";
            el.classList.add("n3-in");
            el.addEventListener("transitionend", function () {
                el.style.transitionDelay = "";
            }, { once: true });
        });

        window.setTimeout(function () {
            loader.classList.add("n3-gone");
            document.body.classList.remove("n3-lock");
        }, LIFT_TAKES);

    }, LIFT_AFTER);


    /* ======================================================
       Word-by-word reveal on section headings
       ====================================================== */

    if (!("IntersectionObserver" in window)) return;

    var headings = [];

    document.querySelectorAll(".section-title h2").forEach(function (h) {

        /* skip headings that rely on <br> line breaks */
        if (h.querySelector("br")) return;

        var words = h.textContent.trim().split(/\s+/);
        if (!words.length) return;

        h.innerHTML = words.map(function (word, i) {
            return '<span class="n3-w"><span class="n3-wi"' +
                ' style="transition-delay:' + (i * 60) + 'ms">' +
                word + "</span></span>";
        }).join(" ");

        headings.push(h);

    });

    var wordIO = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("n3-words-in");
            wordIO.unobserve(entry.target);
        });

    }, { threshold: 0.3 });

    headings.forEach(function (h) {
        wordIO.observe(h);
    });

})();


/* ======================================================
   Typewriter in hero heading
   Cycles Websites / Branding / Logos / Print after the
   intro lift. Reduced motion keeps the static word.
   ====================================================== */

(function () {

    var el = document.querySelector(".n3-type-word");
    if (!el) return;

    var words = ["Websites", "Branding", "Logos", "Print"];

    var reduced = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
        el.textContent = words[0];
        return;
    }

    var wi = 0;
    var ci = words[0].length;
    var deleting = false;

    var startDelay = document.getElementById("n3-loader") ? 2250 : 300;

    function tick() {

        var word = words[wi];

        if (!deleting) {
            ci++;
            el.textContent = word.slice(0, ci);
            if (ci >= word.length) {
                deleting = true;
                window.setTimeout(tick, 2100);
                return;
            }
            window.setTimeout(tick, 110);
            return;
        }

        ci--;
        el.textContent = word.slice(0, ci);
        if (ci <= 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
            window.setTimeout(tick, 380);
            return;
        }
        window.setTimeout(tick, 55);

    }

    window.setTimeout(tick, startDelay);

})();
