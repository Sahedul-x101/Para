// =====================================
// MOBILE NAVIGATION
// =====================================

const menuButton = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");
const navLinks = document.querySelectorAll(".nav__menu a");


menuButton.addEventListener("click", () => {

    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
        "aria-expanded",
        !isOpen
    );

    navMenu.classList.toggle("active");

});


// Close menu when clicking a link

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// =====================================
// HEADER SHADOW ON SCROLL
// =====================================

const header = document.querySelector(".header");


window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.boxShadow =
        "0 5px 20px rgba(0,0,0,.15)";

    }
    else{

        header.style.boxShadow =
        "0 2px 15px rgba(0,0,0,.08)";

    }

});


// =====================================
// SMOOTH SCROLL OFFSET
// =====================================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function(e){

        const target =
        document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

        }

    });

});
