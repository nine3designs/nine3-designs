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

            menu.classList.toggle("active");
            toggle.classList.toggle("active");

        });

    }


    /* ======================================================
       Close Mobile Menu
    ====================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            menu?.classList.remove("active");
            toggle?.classList.remove("active");

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


});