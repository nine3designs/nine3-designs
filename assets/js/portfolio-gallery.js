/* ==========================================================
   Nine3 Designs — Portfolio gallery interactions
   (Balkan-style click-to-open project panels, vanilla JS)
========================================================== */

(function () {

    "use strict";

    var gallery = document.querySelector("section.gallery");

    if (!gallery) return;


    /* --- Open a project panel ------------------------------ */

    function openItem(id) {

        var item = document.getElementById(id);

        if (!item) return;

        closeItem();
        gallery.querySelector("ul").classList.add("item_open");
        item.classList.add("item_open");
        item.focus({ preventScroll: true });
        document.body.style.overflow = "hidden";

    }


    /* --- Close any open panel ------------------------------- */

    function closeItem() {

        var open = gallery.querySelector(".port.item_open");

        gallery.querySelector("ul").classList.remove("item_open");

        if (open) open.classList.remove("item_open");

        document.body.style.overflow = "";

    }


    /* --- Tile clicks ---------------------------------------- */

    gallery.querySelectorAll(".row ul li a").forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();
            openItem((link.getAttribute("href") || "").slice(1));

        });

    });


    /* --- Close button --------------------------------------- */

    var closer = gallery.querySelector(".close");

    if (closer) closer.addEventListener("click", function (event) {
        event.preventDefault();
        closeItem();
    });


    /* --- Escape key closes ---------------------------------- */

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeItem();
    });


    /* --- Brand placeholder when an image is not available --- */

    function markMissing(img) {

        var holder = img.closest(".port-main") ||
                     img.closest(".port-side > div") ||
                     (img.closest("a") ? img.closest("a").closest("li") : null);

        if (holder) holder.classList.add("img-missing");

    }

    gallery.addEventListener("error", function (event) {
        if (event.target && event.target.tagName === "IMG") markMissing(event.target);
    }, true);

})();
