/* ==========================================================
   NINE3 WEDDINGS
   MAIN JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const mobileToggle = document.querySelector(".mobile-toggle");
    const mainNav = document.querySelector(".main-nav");
    const collectionsDropdown = document.querySelector(".collections-dropdown");

    if (mobileToggle && mobileToggle.dataset.nine3Init === "true") return;
    if (mobileToggle) mobileToggle.dataset.nine3Init = "true";

    const closeMenu = () => {
        if (!mobileToggle || !mainNav) return;

        mobileToggle.classList.remove("is-open", "active");
        mainNav.classList.remove("is-open", "active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");

        if (collectionsDropdown) {
            collectionsDropdown.classList.remove("mobile-open");
        }
    };

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = !mainNav.classList.contains("is-open");

            mobileToggle.classList.toggle("is-open", isOpen);
            mobileToggle.classList.toggle("active", isOpen);
            mainNav.classList.toggle("is-open", isOpen);
            mainNav.classList.toggle("active", isOpen);
            mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            document.body.classList.toggle("menu-open", isOpen);
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", event => {

                const isCollectionsTrigger =
                    collectionsDropdown &&
                    link.parentElement === collectionsDropdown;

                if (isCollectionsTrigger && window.innerWidth <= 800) {
                    event.preventDefault();
                    collectionsDropdown.classList.toggle("mobile-open");
                    return;
                }

                closeMenu();
            });
        });

        document.addEventListener("click", event => {
            if (
                mainNav.classList.contains("is-open") &&
                !mainNav.contains(event.target) &&
                !mobileToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) closeMenu();
        });
    }

    /* Smooth same-page anchors */
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const url = new URL(link.href, window.location.href);
            const currentPath = window.location.pathname.replace(/\/$/, "");
            const linkPath = url.pathname.replace(/\/$/, "");

            if (currentPath === linkPath && url.hash) {
                const target = document.querySelector(url.hash);

                if (target) {
                    event.preventDefault();

                    const header = document.querySelector(".site-header");
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight -
                        20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                    history.pushState(null, "", url.hash);
                }
            }
        });
    });

    /* Scroll reveal */
    const revealElements = document.querySelectorAll(
        ".service-card, .portfolio-card, .case-study, .why-card"
    );

    if (revealElements.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }

    /* Current year */
    document.querySelectorAll("[data-current-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    /* Back to top */
    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {
        const updateBackToTop = () => {
            backToTop.classList.toggle("visible", window.scrollY > 500);
        };

        window.addEventListener("scroll", updateBackToTop, { passive: true });
        updateBackToTop();

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
