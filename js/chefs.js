/* ==========================================
   CHEFS PAGE SCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       CHEF CARD ANIMATION
    ===================================== */

    const chefCards = document.querySelectorAll(".chef-card");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.2
    });

    chefCards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = "all .7s ease";

        observer.observe(card);

    });

    /* =====================================
       ACHIEVEMENT COUNTER
    ===================================== */

    const counters = document.querySelectorAll(".achievement-card h3");

    let counterStarted = false;

    function animateCounters() {

        if (counterStarted) return;

        counterStarted = true;

        counters.forEach(counter => {

            const text = counter.innerText;

            const number = parseFloat(text);

            if (isNaN(number)) return;

            const suffix = text.replace(/[0-9.]/g, "");

            let current = 0;

            const increment = number / 80;

            function updateCounter() {

                current += increment;

                if (current < number) {

                    if (text.includes(".")) {

                        counter.innerText = current.toFixed(1) + suffix;

                    } else {

                        counter.innerText = Math.floor(current) + suffix;

                    }

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = number + suffix;

                }

            }

            updateCounter();

        });

    }

    const achievementSection =
        document.querySelector(".chef-achievements");

    if (achievementSection) {

        const achievementObserver =
            new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounters();

                    }

                });

            }, {
                threshold: 0.4
            });

        achievementObserver.observe(achievementSection);

    }

    /* =====================================
       SOCIAL ICON HOVER
    ===================================== */

    document.querySelectorAll(".social-links a")
        .forEach(icon => {

            icon.addEventListener("mouseenter", () => {

                icon.style.transform = "scale(1.15) rotate(8deg)";

            });

            icon.addEventListener("mouseleave", () => {

                icon.style.transform = "scale(1) rotate(0deg)";

            });

        });

    /* =====================================
       IMAGE PARALLAX EFFECT
    ===================================== */

    document.querySelectorAll(".chef-card img")
        .forEach(image => {

            image.addEventListener("mousemove", (e) => {

                const rect = image.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateY = (x / rect.width - 0.5) * 8;
                const rotateX = (0.5 - y / rect.height) * 8;

                image.style.transform =
                    `scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            });

            image.addEventListener("mouseleave", () => {

                image.style.transform = "scale(1)";

            });

        });

});