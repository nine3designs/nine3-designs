/* ==========================================================
   NINE3 WEDDINGS
   MAIN JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ======================================================
       MOBILE NAVIGATION
    ====================================================== */

    const mobileToggle =
        document.querySelector(".mobile-toggle");

    const mainNav =
        document.querySelector(".main-nav");

    const collectionsDropdown =
        document.querySelector(".collections-dropdown");

    const collectionsTrigger =
        collectionsDropdown
            ? collectionsDropdown.querySelector(":scope > a")
            : null;


    /* ------------------------------------------------------
       CLOSE MENU
    ------------------------------------------------------ */

    function closeMenu() {

        if (!mobileToggle || !mainNav) {
            return;
        }


        mobileToggle.classList.remove("is-open");
        mobileToggle.classList.remove("active");


        mainNav.classList.remove("is-open");
        mainNav.classList.remove("active");


        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        mobileToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );


        document.body.classList.remove(
            "menu-open"
        );


        if (collectionsDropdown) {

            collectionsDropdown.classList.remove(
                "mobile-open"
            );

        }

    }


    /* ------------------------------------------------------
       HAMBURGER
    ------------------------------------------------------ */

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    !mainNav.classList.contains(
                        "is-open"
                    );


                if (isOpen) {

                    mobileToggle.classList.add(
                        "is-open"
                    );

                    mainNav.classList.add(
                        "is-open"
                    );

                    mobileToggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    mobileToggle.setAttribute(
                        "aria-label",
                        "Close navigation"
                    );

                    document.body.classList.add(
                        "menu-open"
                    );

                } else {

                    closeMenu();

                }

            }
        );


        /* --------------------------------------------------
           COLLECTIONS
        -------------------------------------------------- */

        if (
            collectionsTrigger &&
            collectionsDropdown
        ) {

            collectionsTrigger.addEventListener(
                "click",
                event => {

                    if (window.innerWidth <= 800) {

                        event.preventDefault();
                        event.stopPropagation();


                        collectionsDropdown.classList.toggle(
                            "mobile-open"
                        );

                    }

                }
            );

        }


        /* --------------------------------------------------
           OTHER NAVIGATION LINKS
        -------------------------------------------------- */

        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    event => {

                        /*
                         * The Collections parent
                         * is handled separately.
                         */

                        if (
                            link === collectionsTrigger &&
                            window.innerWidth <= 800
                        ) {

                            return;

                        }


                        /*
                         * Clicking any actual destination
                         * closes the menu.
                         */

                        closeMenu();

                    }
                );

            });


        /* --------------------------------------------------
           CLICK OUTSIDE
        -------------------------------------------------- */

        document.addEventListener(
            "click",
            event => {

                if (
                    mainNav.classList.contains(
                        "is-open"
                    ) &&
                    !mainNav.contains(
                        event.target
                    ) &&
                    !mobileToggle.contains(
                        event.target
                    )
                ) {

                    closeMenu();

                }

            }
        );


        /* --------------------------------------------------
           ESCAPE KEY
        -------------------------------------------------- */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    mainNav.classList.contains(
                        "is-open"
                    )
                ) {

                    closeMenu();

                    mobileToggle.focus();

                }

            }
        );


        /* --------------------------------------------------
           DESKTOP RESIZE
        -------------------------------------------------- */

        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 800) {

                    closeMenu();

                }

            }
        );

    }


    /* ======================================================
       SMOOTH SAME-PAGE ANCHORS
    ====================================================== */

    document
        .querySelectorAll('a[href*="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const url =
                        new URL(
                            link.href,
                            window.location.href
                        );


                    const currentPath =
                        window.location.pathname
                            .replace(/\/$/, "");


                    const linkPath =
                        url.pathname
                            .replace(/\/$/, "");


                    if (
                        currentPath === linkPath &&
                        url.hash
                    ) {

                        const target =
                            document.querySelector(
                                url.hash
                            );


                        if (target) {

                            event.preventDefault();


                            const header =
                                document.querySelector(
                                    ".site-header"
                                );


                            const headerHeight =
                                header
                                    ? header.offsetHeight
                                    : 0;


                            const targetPosition =
                                target
                                    .getBoundingClientRect()
                                    .top +
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

                }
            );

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

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );


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


    /* ======================================================
       BACK TO TOP
    ====================================================== */

    const backToTop =
        document.querySelector(".back-to-top");


    if (backToTop) {

        function updateBackToTop() {

            backToTop.classList.toggle(
                "visible",
                window.scrollY > 500
            );

        }


        window.addEventListener(
            "scroll",
            updateBackToTop
        );


        updateBackToTop();


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }

});