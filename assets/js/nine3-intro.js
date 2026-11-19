/* ==========================================================
   Nine3 intro loader + word-by-word scroll reveal + typewriter
   19 Nov 2026. Homepage only.
   Intro loader shows once per tab session; returning visitors
   within the same session skip straight to the page.
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
       Intro loader: first visit per tab session only
       ====================================================== */

    var seen = false;
    try {
        seen = sessionStorage.getItem("n3IntroSeen") === "1";
    } catch (e) {}

    if (seen) {
        loader.remove();
    } else {
        try {
            sessionStorage.setItem("n3IntroSeen", "1");
        } catch (e) {}

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

        var LIFT_AFTER = 3050;
        var LIFT_TAKES = 850;

        runIntroCanvas();

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
    }


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


    /* ======================================================
       Typewriter in hero heading
       Cycles Websites / Branding / Logos / Print after the
       intro lift. Reduced motion keeps the static word.
       ====================================================== */

    var typeEl = document.querySelector(".n3-type-word");
    if (!typeEl) return;

    var words = ["Websites", "Branding", "Logos", "Print"];
    var wi = 0;
    var ci = words[0].length;
    var deleting = false;

    var startDelay = document.getElementById("n3-loader") ? 2250 : 300;

    function tick() {

        var word = words[wi];

        if (!deleting) {
            ci++;
            typeEl.textContent = word.slice(0, ci);
            if (ci >= word.length) {
                deleting = true;
                window.setTimeout(tick, 2100);
                return;
            }
            window.setTimeout(tick, 110);
            return;
        }

        ci--;
        typeEl.textContent = word.slice(0, ci);
        if (ci <= 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
            window.setTimeout(tick, 380);
            return;
        }
        window.setTimeout(tick, 55);

    }

    window.setTimeout(tick, startDelay);


/* ==========================================================
   Dots-to-text intro: scattered ivory, mist and teal dots
   drift together and assemble the NINE3 lockup (19 Nov 2026).
   ========================================================== */

    function runIntroCanvas() {

        var cv = document.getElementById("n3-intro-canvas");
        if (!cv || !cv.getContext) return;

        var ctx = cv.getContext("2d");
        var W, H, DPR;
        var SPACING = 5;
        var targets = [];
        var dots = [];

        var COLORS = ["#F5F1E8", "#F5F1E8", "#F5F1E8", "#F5F1E8", "#B3C2C3", "#B3C2C3", "#174B50"];

        function sizeCanvas() {
            DPR = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth;
            H = window.innerHeight;
            cv.width = W * DPR;
            cv.height = H * DPR;
            cv.style.width = W + "px";
            cv.style.height = H + "px";
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        }

        function sample() {

            targets = [];

            var off = document.createElement("canvas");
            off.width = W;
            off.height = H;
            var o = off.getContext("2d");

            function grab() {
                var data = o.getImageData(0, 0, W, H).data;
                for (var y = 0; y < H; y += SPACING) {
                    for (var x = 0; x < W; x += SPACING) {
                        if (data[(y * W + x) * 4 + 3] > 128) {
                            targets.push({ x: x, y: y });
                        }
                    }
                }
            }

            o.fillStyle = "#fff";
            o.textAlign = "center";
            o.textBaseline = "middle";

            var big = Math.min(W * 0.21, 170);
            o.font = "700 " + big + "px 'Albert Sans', sans-serif";
            o.fillText("NINE3", W / 2, H / 2 - big * 0.22);

            var small = Math.max(17, Math.min(W * 0.036, 30));
            o.font = "600 " + small + "px 'Albert Sans', sans-serif";
            o.fillText("D E S I G N S", W / 2, H / 2 + big * 0.55);

            grab();

        }

        function init() {
            dots = targets.map(function (p) {
                return {
                    sx: W / 2 + (Math.random() - .5) * W * 1.25,
                    sy: H / 2 + (Math.random() - .5) * H * 1.25,
                    tx: p.x,
                    ty: p.y,
                    c: COLORS[Math.floor(Math.random() * COLORS.length)],
                    d: Math.random() * 0.3
                };
            });
        }

        function ease(t) {
            return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        var t0 = performance.now();

        function frame(now) {
            var t = (now - t0) / 1000;
            ctx.fillStyle = "#272B2B";
            ctx.fillRect(0, 0, W, H);
            for (var i = 0; i < dots.length; i++) {
                var d = dots[i];
                var e = ease(Math.min(1, Math.max(0, (t - d.d) / 1.6)));
                var x = d.sx + (d.tx - d.sx) * e;
                var y = d.sy + (d.ty - d.sy) * e;
                ctx.fillStyle = d.c;
                ctx.beginPath();
                ctx.arc(x, y, 2.75 * (0.55 + 0.45 * e), 0, 6.283);
                ctx.fill();
            }
            if (t < 3.2) {
                requestAnimationFrame(frame);
            }
        }

        sizeCanvas();
        var started = false;
        function start() {
            if (started) return;
            started = true;
            sample();
            init();
            t0 = performance.now();
            requestAnimationFrame(frame);
        }
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(start);
        }
        window.setTimeout(start, 700);

    }


})();
