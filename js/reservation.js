/* ==========================================
   RESERVATION PAGE SCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("reservationForm");

    if (!form) return;

    /* ===============================
       SET MINIMUM DATE (TODAY)
    =============================== */

    const dateInput = document.getElementById("date");

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;

    /* ===============================
       SUCCESS MESSAGE
    =============================== */

    const successMessage = document.createElement("div");

    successMessage.className = "success-message";

    form.appendChild(successMessage);

    /* ===============================
       FORM SUBMIT
    =============================== */

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const reservation = {

            id: Date.now(),

            name: document.getElementById("name").value.trim(),

            email: document.getElementById("email").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            date: document.getElementById("date").value,

            time: document.getElementById("time").value,

            guests: document.getElementById("guests").value,

            seating: document.getElementById("seating").value,

            occasion: document.getElementById("occasion").value,

            message: document.getElementById("message").value.trim()

        };

        /* ===============================
           VALIDATION
        =============================== */

        if (

            reservation.name === "" ||

            reservation.email === "" ||

            reservation.phone === "" ||

            reservation.date === "" ||

            reservation.time === "" ||

            reservation.guests === "" ||

            reservation.seating === ""

        ) {

            showMessage(

                "Please fill in all required fields.",

                "#dc3545"

            );

            return;

        }

        /* Email Validation */

        const emailPattern =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(reservation.email)) {

            showMessage(

                "Please enter a valid email address.",

                "#dc3545"

            );

            return;

        }

        /* Phone Validation */

        const phonePattern = /^[0-9+\-\s]{8,15}$/;

        if (!phonePattern.test(reservation.phone)) {

            showMessage(

                "Please enter a valid phone number.",

                "#dc3545"

            );

            return;

        }

        /* ===============================
           SAVE TO LOCAL STORAGE
        =============================== */

        let reservations =

            JSON.parse(

                localStorage.getItem("reservations")

            ) || [];

        reservations.push(reservation);

        localStorage.setItem(

            "reservations",

            JSON.stringify(reservations)

        );

        /* ===============================
           SUCCESS
        =============================== */

        showMessage(

            `Thank you, ${reservation.name}! Your reservation has been confirmed for ${reservation.date} at ${reservation.time}.`,

            "#28a745"

        );

        form.reset();

    });

    /* ===============================
       MESSAGE FUNCTION
    =============================== */

    function showMessage(text, color) {

        successMessage.style.display = "block";

        successMessage.style.background = color;

        successMessage.style.color = "#fff";

        successMessage.innerHTML = text;

        successMessage.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

        setTimeout(() => {

            successMessage.style.display = "none";

        }, 5000);

    }

});