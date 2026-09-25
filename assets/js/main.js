/* ==========================================================
   Nine3 Designs
   Main JavaScript
========================================================== */


document.addEventListener("DOMContentLoaded", () => {


    /* ======================================================
       Elements
    ====================================================== */

    const header = document.querySelector(".site-header");
    const menu = document.querySelector(".main-nav");
    const toggle = document.querySelector(".mobile-toggle");
    const navLinks = document.querySelectorAll(".main-nav a");


    /* ======================================================
       Mobile Menu
    ====================================================== */

    if(toggle && menu){

        toggle.addEventListener("click", () => {

            const isOpen = !menu.classList.contains("active");

            menu.classList.toggle("active", isOpen);
            toggle.classList.toggle("active", isOpen);

            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle("menu-open", isOpen);

        });

    }


    /* ======================================================
       Close Mobile Menu
    ====================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            menu?.classList.remove("active");
            toggle?.classList.remove("active");
            toggle?.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");

        });

    });


    /* ======================================================
       Click Outside Mobile Menu
    ====================================================== */

    document.addEventListener("click", (e) => {

        if(
            menu &&
            toggle &&
            !menu.contains(e.target) &&
            !toggle.contains(e.target)
        ){

            menu.classList.remove("active");
            toggle.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");

        }

    });



    /* ======================================================
       Sticky Header
    ====================================================== */

    const handleHeader = () => {

        if(!header) return;


        if(window.scrollY > 80){

            header.style.background = "rgba(51,60,48,.98)";

            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.15)";

        }else{

            header.style.background =
                "rgba(64,74,59,.95)";

            header.style.boxShadow = "none";

        }

    };


    handleHeader();

    window.addEventListener(
        "scroll",
        handleHeader
    );



    /* ======================================================
       Smooth Scrolling
    ====================================================== */

    document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {


        anchor.addEventListener("click", function(e){


            const target =
                document.querySelector(
                    this.getAttribute("href")
                );


            if(!target) return;


            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });


        });


    });



    /* ======================================================
       Scroll Reveal
    ====================================================== */

    const revealItems = document.querySelectorAll(

        ".service-card, .portfolio-card, .about-content, .about-image, .contact-card, .contact-form, .section-title"

    );


    if("IntersectionObserver" in window){


        const observer = new IntersectionObserver(
            
            entries => {


                entries.forEach(entry => {


                    if(entry.isIntersecting){


                        entry.target.classList.add("show");


                        observer.unobserve(
                            entry.target
                        );


                    }


                });


            },

            {

                threshold:.15

            }


        );


        revealItems.forEach(item => {

            item.classList.add("hidden");

            observer.observe(item);

        });


    }



    /* ======================================================
       MOBILE TRUST BANNER LOOP
    ====================================================== */

    const statsGrid = document.querySelector(".stats-grid");

    const setupMobileStats = () => {

        if (!statsGrid || statsGrid.dataset.mobileCloned === "true") return;

        if (window.innerWidth <= 768) {

            const items = Array.from(statsGrid.children);

            items.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute("aria-hidden", "true");
                statsGrid.appendChild(clone);
            });

            statsGrid.dataset.mobileCloned = "true";
        }
    };

    setupMobileStats();


    /* ======================================================
       Active Navigation
    ====================================================== */

    const sections =
        document.querySelectorAll("section[id]");


    const highlightNav = () => {


        let current = "";


        sections.forEach(section => {


            const sectionTop =
                section.offsetTop - 150;


            const sectionHeight =
                section.offsetHeight;


            if(
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ){

                current =
                    section.getAttribute("id");

            }


        });



        navLinks.forEach(link => {


            link.classList.remove("active");


            if(
                link.getAttribute("href")
                === "#" + current
            ){

                link.classList.add("active");

            }


        });


    };


    window.addEventListener(
        "scroll",
        highlightNav
    );


    highlightNav();



    /* ======================================================
       Back To Top Button
    ====================================================== */


    const topButton =
        document.createElement("button");


    topButton.innerHTML = "↑";

    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );


    topButton.className =
        "back-to-top";


    document.body.appendChild(
        topButton
    );



    topButton.addEventListener(
        "click",
        () => {


            window.scrollTo({

                top:0,

                behavior:"smooth"

            });


        }

    );



    const toggleTopButton = () => {


        if(window.scrollY > 500){

            topButton.classList.add(
                "visible"
            );


        }else{

            topButton.classList.remove(
                "visible"
            );

        }


    };


    window.addEventListener(
        "scroll",
        toggleTopButton
    );


    toggleTopButton();


    /* ======================================================
       Premium motion: progress, reveals and gallery lightbox
    ====================================================== */

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("motion-ready");

    const updateMotion = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
        document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
        header?.classList.toggle("is-scrolled", window.scrollY > 40);
    };

    updateMotion();
    window.addEventListener("scroll", updateMotion, { passive: true });

    const revealSelectors = [
        ".service-card", ".portfolio-card", ".contact-card", ".contact-form",
        ".section-title", ".about-content", ".about-image", ".service-overview-card",
        ".process-step", ".package-group", ".bespoke-card", ".project-case",
        ".testimonial", ".promise-card", ".work-clients", ".why-nine3-item", ".service-list-item", ".signature-block"
    ];

    const motionItems = Array.from(document.querySelectorAll(revealSelectors.join(",")));

    if (!reduceMotion && "IntersectionObserver" in window) {
        motionItems.forEach((item, index) => {
            item.classList.add("motion-reveal");
            item.style.setProperty("--reveal-delay", `${(index % 4) * 75}ms`);
        });

        const motionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    motionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: .12, rootMargin: "0px 0px -7%" });

        motionItems.forEach(item => motionObserver.observe(item));
    } else {
        motionItems.forEach(item => item.classList.add("is-visible"));
    }

    const galleryLinks = document.querySelectorAll(".project-gallery a");

    if (galleryLinks.length) {
        const lightbox = document.createElement("div");
        lightbox.className = "image-lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute("aria-label", "Project image preview");
        lightbox.innerHTML = '<button type="button" aria-label="Close image preview">×</button><img alt="">';
        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector("img");
        const closeLightbox = () => {
            lightbox.classList.remove("is-open");
            document.body.classList.remove("lightbox-open");
        };

        galleryLinks.forEach(link => link.addEventListener("click", event => {
            event.preventDefault();
            const image = link.querySelector("img");
            lightboxImage.src = link.href;
            lightboxImage.alt = image?.alt || "Project image";
            lightbox.classList.add("is-open");
            document.body.classList.add("lightbox-open");
        }));

        lightbox.addEventListener("click", event => {
            if (event.target === lightbox || event.target.closest("button")) closeLightbox();
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeLightbox();
        });
    }


});

document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector(".main-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {

        const isOpen = toggle.getAttribute("aria-expanded") === "true";

        toggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        toggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation" : "Close navigation"
        );

        nav.classList.toggle("is-open", !isOpen);

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            nav.classList.remove("is-open");

        });

    });

});


    /* ======================================================
       MISSING IMAGE FALLBACK
       (branded placeholder instead of a broken-image icon)
    ====================================================== */

    const brokenImages = document.querySelectorAll(
        ".portfolio-card img, .case-image img, .about-image img"
    );

    const markBroken = (img) => {

        const holder =
            img.closest(".portfolio-card") ||
            img.closest(".case-image") ||
            img.closest(".about-image");

        if(holder){
            holder.classList.add("img-missing");
            img.style.display = "none";
        }

    };

    brokenImages.forEach(img => {

        if(img.complete && img.naturalWidth === 0){
            markBroken(img);
            return;
        }

        img.addEventListener("error", () => markBroken(img));

    });


    /* ======================================================
       PORTFOLIO FILTERS
    ====================================================== */

    const filterButtons = document.querySelectorAll(
        ".portfolio-filters [data-filter]"
    );

    const galleryItems = document.querySelectorAll(
        ".gallery li[data-filter]"
    );

    if(filterButtons.length && galleryItems.length){

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const filter = button.dataset.filter;

                filterButtons.forEach(btn => {
                    const isActive = btn === button;
                    btn.classList.toggle("is-active", isActive);
                    btn.setAttribute(
                        "aria-pressed",
                        isActive ? "true" : "false"
                    );
                });

                galleryItems.forEach(item => {
                    const match =
                        filter === "all" ||
                        (" " + item.dataset.filter + " ")
                            .includes(" " + filter + " ");
                    item.classList.toggle("is-filtered-out", !match);
                });

            });

        });

    }


window.__n3MainLoaded = true;


/* ==========================================================
   Studio polish: gentle parallax on the hero collage
   (fine pointers only, honours reduced motion)
   ========================================================== */
(function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const hero = document.querySelector(".hero");
    const cards = document.querySelectorAll(".hero-collage .collage-card");
    if (!hero || !cards.length) return;

    let raf = 0, tx = 0, ty = 0;

    function apply() {
        raf = 0;
        cards.forEach(function (card, i) {
            const depth = 6 + i * 3;
            card.style.transform =
                "translate(" + (-tx * depth).toFixed(1) + "px," + (-ty * depth).toFixed(1) + "px)";
        });
    }

    hero.addEventListener("mousemove", function (e) {
        const r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(apply);
    });

    hero.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(apply);
    });
})();