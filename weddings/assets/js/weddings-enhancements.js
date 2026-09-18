/* ==========================================================
   Nine3 Weddings enhancements (vanilla JS)
   1. Gentle scroll reveals (with graceful fallback)
   2. Auto-rotating work gallery
   3. Back-to-top visibility (shown sooner, on every page)
========================================================== */

(function () {

    "use strict";

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* --- 1. Scroll reveals -------------------------------- */

    var selectors = [
        ".section-intro",
        ".about-natalie-image",
        ".about-natalie-content",
        ".about-value-card",
        ".about-more-content",
        ".about-more-list li",
        ".papers-card",
        ".product-section-heading",
        ".range-column"
    ];

    var targets = document.querySelectorAll(selectors.join(", "));

    if (targets.length && "IntersectionObserver" in window && !reduceMotion) {

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        targets.forEach(function (el) {
            if (el.classList.contains("about-value-card") ||
                el.classList.contains("papers-card") ||
                el.classList.contains("range-column")) {
                el.classList.add("reveal-fade");
            } else {
                el.classList.add("reveal");
            }
            observer.observe(el);
        });

    }

    /* --- 2. Auto-rotating work gallery --------------------- */

    var gallery = document.querySelector("[data-work-gallery]");

    if (gallery) {

        var slides = Array.prototype.slice.call(gallery.querySelectorAll("img"));
        var caption = gallery.querySelector("[data-work-caption]");

        if (slides.length) {

            var index = 0;
            var timer = null;
            var playing = false;
            var interval = 4000;

            var show = function (i) {
                slides.forEach(function (img, n) {
                    img.classList.toggle("is-active", n === i);
                });
                var cap = slides[i].getAttribute("data-caption");
                if (caption && cap) caption.textContent = cap;
            };

            var stop = function () {
                playing = false;
                if (timer) {
                    window.clearInterval(timer);
                    timer = null;
                }
            };

            var start = function () {
                if (playing || reduceMotion || slides.length < 2) return;
                playing = true;
                timer = window.setInterval(function () {
                    index = (index + 1) % slides.length;
                    show(index);
                }, interval);
            };

            show(0);
            start();

            /* Pause on hover */
            gallery.addEventListener("mouseenter", stop);
            gallery.addEventListener("mouseleave", start);

            /* Pause when off-screen */
            if ("IntersectionObserver" in window) {
                var vis = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) start();
                        else stop();
                    });
                }, { threshold: 0.15 });
                vis.observe(gallery);
            }

            /* Pause in hidden tabs */
            document.addEventListener("visibilitychange", function () {
                if (document.hidden) stop();
                else start();
            });

        }

    }

    /* --- 3. Back to top ------------------------------------ */

    var topBtn = document.querySelector(".back-to-top");

    if (topBtn) {

        var updateTop = function () {
            topBtn.classList.toggle("visible", window.scrollY > 220);
        };

        window.addEventListener("scroll", updateTop, { passive: true });
        updateTop();

        if (!topBtn.getAttribute("data-top-bound")) {
            topBtn.setAttribute("data-top-bound", "1");
            topBtn.addEventListener("click", function () {
                window.scrollTo({
                    top: 0,
                    behavior: reduceMotion ? "auto" : "smooth"
                });
            });
        }

    }

})();
