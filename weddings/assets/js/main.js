/* ==========================================================
   NINE3 WEDDINGS — MAIN JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const mobileToggle = document.querySelector(".mobile-toggle");
    const mainNav = document.querySelector(".main-nav");
    const collectionsDropdown = document.querySelector(".collections-dropdown");
    const collectionsTrigger = collectionsDropdown ? collectionsDropdown.querySelector(":scope > a") : null;

    const closeMenu = () => {
        if (!mobileToggle || !mainNav) return;
        mobileToggle.classList.remove("is-open", "active");
        mainNav.classList.remove("is-open", "active");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.setAttribute("aria-label", "Open navigation");
        document.body.classList.remove("menu-open");
        if (collectionsDropdown) collectionsDropdown.classList.remove("mobile-open");
    };

    const openMenu = () => {
        mobileToggle.classList.add("is-open", "active");
        mainNav.classList.add("is-open", "active");
        mobileToggle.setAttribute("aria-expanded", "true");
        mobileToggle.setAttribute("aria-label", "Close navigation");
        document.body.classList.add("menu-open");
    };

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            mainNav.classList.contains("is-open") ? closeMenu() : openMenu();
        });

        if (collectionsTrigger && collectionsDropdown) {
            collectionsTrigger.addEventListener("click", (event) => {
                if (window.innerWidth <= 800) {
                    event.preventDefault();
                    event.stopPropagation();
                    collectionsDropdown.classList.toggle("mobile-open");
                }
            });
        }

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (link === collectionsTrigger && window.innerWidth <= 800) return;
                closeMenu();
            });
        });

        document.addEventListener("click", (event) => {
            if (mainNav.classList.contains("is-open") && !mainNav.contains(event.target) && !mobileToggle.contains(event.target)) closeMenu();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && mainNav.classList.contains("is-open")) { closeMenu(); mobileToggle.focus(); }
        });

        window.addEventListener("resize", () => { if (window.innerWidth > 800) closeMenu(); });
    }

    document.querySelectorAll('a[href*="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const url = new URL(link.href, window.location.href);
            const currentPath = window.location.pathname.replace(/\/$/, "");
            const linkPath = url.pathname.replace(/\/$/, "");
            if (currentPath === linkPath && url.hash) {
                const target = document.querySelector(url.hash);
                if (target) {
                    event.preventDefault();
                    const header = document.querySelector(".site-header");
                    const headerHeight = header ? header.offsetHeight : 0;
                    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 20, behavior: "smooth" });
                    history.pushState(null, "", url.hash);
                }
            }
        });
    });

    const revealElements = document.querySelectorAll(".service-card, .portfolio-card, .case-study, .why-card");
    if (revealElements.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
            });
        }, { threshold: 0.12 });
        revealElements.forEach((element) => { element.classList.add("reveal"); observer.observe(element); });
    }

    document.querySelectorAll("[data-current-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });

    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        const updateBackToTop = () => backToTop.classList.toggle("visible", window.scrollY > 500);
        window.addEventListener("scroll", updateBackToTop);
        updateBackToTop();
        backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
});
