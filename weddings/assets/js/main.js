/* ==========================================================
   NINE3 DESIGNS
   MAIN JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

/* ==================================================
   MOBILE NAVIGATION
================================================== */

const mobileToggle = document.querySelector(".mobile-toggle");
const mainNav = document.querySelector(".main-nav");

if (mobileToggle && mainNav) {

    mobileToggle.addEventListener("click", () => {

        mobileToggle.classList.toggle("active");
        mainNav.classList.toggle("active");

        const isOpen = mainNav.classList.contains("active");

        mobileToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        document.body.classList.toggle("menu-open", isOpen);

    });

    // Close menu when a navigation link is clicked
    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileToggle.classList.remove("active");
            mainNav.classList.remove("active");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("menu-open");

        });

    });

}

    /* ======================================================
       SMOOTH SAME-PAGE ANCHORS
    ====================================================== */

    document.querySelectorAll('a[href*="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const url = new URL(
                link.href,
                window.location.href
            );

            const currentPath =
                window.location.pathname.replace(/\/$/, "");

            const linkPath =
                url.pathname.replace(/\/$/, "");


            /* Only intercept links pointing to this page */

            if (
                currentPath === linkPath &&
                url.hash
            ) {

                const target = document.querySelector(
                    url.hash
                );

                if (target) {

                    event.preventDefault();

                    const header =
                        document.querySelector(".site-header");

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight -
                        20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                    history.pushState(
                        null,
                        "",
                        url.hash
                    );

                }

            }

        });

    });


    /* ======================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, .portfolio-card, .case-study, .why-card"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("is-visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* ======================================================
       CURRENT YEAR
    ====================================================== */

    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


});
/* ==================================================
   BACK TO TOP
================================================== */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}