/* ==========================================
   EVENTS PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       SCROLL REVEAL ANIMATION
    ===================================== */

    const cards = document.querySelectorAll(
        ".event-card, .gallery-grid img, .private-container"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.2

    });

    cards.forEach(card => {

        card.classList.add("hidden");

        observer.observe(card);

    });

    /* =====================================
       GALLERY LIGHTBOX
    ===================================== */

    const galleryImages =
        document.querySelectorAll(".gallery-grid img");

    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `

        <span class="close-lightbox">&times;</span>

        <img class="lightbox-image">

    `;

    document.body.appendChild(lightbox);

    const lightboxImage =
        lightbox.querySelector(".lightbox-image");

    const closeBtn =
        lightbox.querySelector(".close-lightbox");

    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            lightbox.style.display = "flex";

            lightboxImage.src = image.src;

            lightboxImage.alt = image.alt;

            document.body.style.overflow = "hidden";

        });

    });

    closeBtn.addEventListener("click", () => {

        lightbox.style.display = "none";

        document.body.style.overflow = "auto";

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

            document.body.style.overflow = "auto";

        }

    });

    /* =====================================
       RESERVE BUTTON EFFECT
    ===================================== */

    document.querySelectorAll(".event-card .btn")
        .forEach(button => {

            button.addEventListener("mouseenter", () => {

                button.style.transform =
                    "translateY(-4px) scale(1.03)";

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform =
                    "translateY(0) scale(1)";

            });

        });

    /* =====================================
       PARALLAX BANNER
    ===================================== */

    const banner = document.querySelector(".page-banner");

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        banner.style.backgroundPosition =
            `center ${scroll * 0.4}px`;

    });

});