/* ==========================================
   CONTACT PAGE SCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        contactForm.appendChild(successMessage);

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const contact = {

                id: Date.now(),

                name: document.getElementById("name").value.trim(),

                email: document.getElementById("email").value.trim(),

                phone: document.getElementById("phone").value.trim(),

                subject: document.getElementById("subject").value,

                message: document.getElementById("message").value.trim()

            };

            /* ===========================
               VALIDATION
            =========================== */

            if (
                contact.name === "" ||
                contact.email === "" ||
                contact.phone === "" ||
                contact.subject === "" ||
                contact.message === ""
            ) {

                showMessage(
                    "Please complete all required fields.",
                    "#dc3545"
                );

                return;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(contact.email)) {

                showMessage(
                    "Please enter a valid email address.",
                    "#dc3545"
                );

                return;
            }

            const phonePattern =
                /^[0-9+\-\s]{8,15}$/;

            if (!phonePattern.test(contact.phone)) {

                showMessage(
                    "Please enter a valid phone number.",
                    "#dc3545"
                );

                return;
            }

            /* ===========================
               LOCAL STORAGE
            =========================== */

            let messages = JSON.parse(
                localStorage.getItem("contactMessages")
            ) || [];

            messages.push(contact);

            localStorage.setItem(
                "contactMessages",
                JSON.stringify(messages)
            );

            /* ===========================
               SUCCESS
            =========================== */

            showMessage(
                "Thank you! Your message has been sent successfully.",
                "#198754"
            );

            contactForm.reset();

        });

        function showMessage(text, color) {

            successMessage.style.display = "block";
            successMessage.style.background = color;
            successMessage.style.color = "#fff";
            successMessage.style.padding = "15px";
            successMessage.style.marginTop = "20px";
            successMessage.style.borderRadius = "8px";

            successMessage.innerHTML = text;

            setTimeout(() => {

                successMessage.style.display = "none";

            }, 4000);

        }

    }

    /* =====================================
       NEWSLETTER
    ===================================== */

    const newsletterForm =
        document.querySelector(".newsletter-form");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const emailInput =
                newsletterForm.querySelector("input");

            const email =
                emailInput.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email.");

                return;

            }

            let subscribers =
                JSON.parse(localStorage.getItem("newsletter")) || [];

            if (!subscribers.includes(email)) {

                subscribers.push(email);

                localStorage.setItem(
                    "newsletter",
                    JSON.stringify(subscribers)
                );

            }

            alert("🎉 Thank you for subscribing!");

            newsletterForm.reset();

        });

    }

});