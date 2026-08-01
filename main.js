/* ==========================================================
   PARA ARCHIVE
   main.js
========================================================== */

/* -----------------------------
   Smooth Active Navigation
----------------------------- */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (scrollY >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* -----------------------------
   Scroll Reveal Animation
----------------------------- */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {

    threshold:0.15

});

revealElements.forEach(item => {

    observer.observe(item);

});

/* -----------------------------
   Typing Effect
----------------------------- */

const typing = document.querySelector(".typing");

if (typing) {

    const text = "explore village";

    let i = 0;

    typing.textContent = "";

    function type(){

        if(i < text.length){

            typing.textContent += text.charAt(i);

            i++;

            setTimeout(type,120);

        }

    }

    type();

}

/* -----------------------------
   Fake Visitor Counter
----------------------------- */

const counter = document.getElementById("visitor-count");

if(counter){

    let visitors = localStorage.getItem("paraVisitors");

    if(!visitors){

        visitors = 4217;

    }

    visitors++;

    localStorage.setItem("paraVisitors", visitors);

    counter.textContent = visitors.toString().padStart(6,"0");

}

/* -----------------------------
   Current Year
----------------------------- */

const year = document.getElementById("year");

if(year){

    year.textContent = new Date().getFullYear();

}

/* -----------------------------
   Last Updated
----------------------------- */

const updated = document.getElementById("last-updated");

if(updated){

    const months = [

        "January","February","March",

        "April","May","June",

        "July","August","September",

        "October","November","December"

    ];

    const d = new Date();

    updated.textContent =

        months[d.getMonth()] +

        " " +

        d.getFullYear();

}

/* -----------------------------
   Back To Top Button
----------------------------- */

const topButton = document.querySelector(".back-to-top");

window.addEventListener("scroll",()=>{

    if(!topButton) return;

    if(window.scrollY>500){

        topButton.classList.add("show");

    }else{

        topButton.classList.remove("show");

    }

});

if(topButton){

    topButton.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* -----------------------------
   Mobile Menu
----------------------------- */

const menuBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");

if(menuBtn && menu){

    menuBtn.addEventListener("click",()=>{

        menu.classList.toggle("open");

        menuBtn.classList.toggle("open");

    });

}

/* -----------------------------
   Image Fade In
----------------------------- */

document.querySelectorAll("img").forEach(img=>{

    img.addEventListener("load",()=>{

        img.classList.add("loaded");

    });

});

/* -----------------------------
   Console Greeting
----------------------------- */

console.log(`

██████╗  █████╗ ██████╗  █████╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗
██████╔╝███████║██████╔╝███████║
██╔═══╝ ██╔══██║██╔══██╗██╔══██║
██║     ██║  ██║██║  ██║██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝

Welcome to the Para Village Archive.
Made with HTML, CSS & JavaScript.

`);
