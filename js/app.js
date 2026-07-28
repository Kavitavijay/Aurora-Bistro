/* ==========================================
   AURORA BISTRO
   GLOBAL APP SCRIPT
========================================== */

/* ==========================================
   PRELOADER
========================================== */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
    }

});

/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuBtn.innerHTML = navMenu.classList.contains("active")
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

}

/* ==========================================
   STICKY HEADER
========================================== */

const header = document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.classList.add("active");

        } else {

            header.classList.remove("active");

        }

    });

}

/* ==========================================
   BACK TO TOP
========================================== */

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        topBtn.style.display =
            window.scrollY > 500 ? "flex" : "none";

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================
   DARK MODE
========================================== */

const themeBtn = document.getElementById("theme-btn");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem(

            "theme",

            dark ? "dark" : "light"

        );

        themeBtn.innerHTML = dark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target =
            document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".stat h2");

let started = false;

function startCounter() {

    counters.forEach(counter => {

        const target =
            parseInt(counter.innerText);

        let count = 0;

        const increment =
            Math.ceil(target / 150);

        function update() {

            count += increment;

            if (count < target) {

                counter.innerText = count + "+";

                requestAnimationFrame(update);

            } else {

                counter.innerText =
                    target + "+";

            }

        }

        update();

    });

}

window.addEventListener("scroll", () => {

    const stats =
        document.querySelector(".statistics");

    if (!stats || started) return;

    if (window.scrollY > stats.offsetTop - 400) {

        startCounter();

        started = true;

    }

});

/* ==========================================
   SCROLL REVEAL
========================================== */

const reveals = document.querySelectorAll(
    ".feature-card,.food-card,.section-title,.cta-content,.menu-card"
);

reveals.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(40px)";

    item.style.transition = ".7s ease";

});

function reveal() {

    reveals.forEach(item => {

        if (

            item.getBoundingClientRect().top

            <

            window.innerHeight - 100

        ) {

            item.style.opacity = "1";

            item.style.transform = "translateY(0)";

        }

    });

}

window.addEventListener("scroll", reveal);

window.addEventListener("load", reveal);

/* ==========================================
   HERO PARALLAX
========================================== */

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.style.backgroundPositionY =
            window.scrollY * 0.5 + "px";

    }

});

/* ==========================================
   COPYRIGHT
========================================== */

const copyright =
    document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${new Date().getFullYear()} Aurora Bistro. All Rights Reserved.`;

}