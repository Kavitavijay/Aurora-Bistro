/* ==========================================
   AURORA BISTRO CHECKOUT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const subtotalElement = document.getElementById("subtotal");
    const discountElement = document.getElementById("discount");
    const taxElement = document.getElementById("tax");
    const deliveryElement = document.getElementById("delivery");
    const totalElement = document.getElementById("grandTotal");

    const form = document.getElementById("checkoutForm");

    const DELIVERY_CHARGE = 5;
    const TAX_RATE = 0.05;

    const discount =
        Number(localStorage.getItem("auroraDiscount")) || 0;

    let cart = JSON.parse(localStorage.getItem("auroraCart")) || [];

    /* =====================================
       LOAD ORDER SUMMARY
    ===================================== */

    loadSummary();

    function loadSummary() {

        let subtotal = 0;

        cart.forEach(item => {

            subtotal += item.price * item.quantity;

        });

        const discountedSubtotal = Math.max(subtotal - discount, 0);

        const tax = discountedSubtotal * TAX_RATE;

        const delivery = cart.length ? DELIVERY_CHARGE : 0;

        const total = discountedSubtotal + tax + delivery;

        subtotalElement.textContent = `$${discountedSubtotal.toFixed(2)}`;

        discountElement.textContent = `-$${discount.toFixed(2)}`;
    
        taxElement.textContent = `$${tax.toFixed(2)}`;

        deliveryElement.textContent = `$${delivery.toFixed(2)}`;

        totalElement.textContent = `$${total.toFixed(2)}`;

    }

    /* =====================================
       PLACE ORDER
    ===================================== */

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        if (cart.length === 0) {

            alert("Your cart is empty!");

            window.location.href = "menu.html";

            return;

        }

        const order = {

            orderId: "AB" + Date.now(),

            customer: document.getElementById("name").value.trim(),

            email: document.getElementById("email").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            address: document.getElementById("address").value.trim(),

            city: document.getElementById("city").value.trim(),

            zip: document.getElementById("zip").value.trim(),

            payment: document.querySelector(
                'input[name="payment"]:checked'
            ).value,

            items: cart,

            subtotal: subtotalElement.textContent,

            tax: taxElement.textContent,

            delivery: deliveryElement.textContent,

            total: totalElement.textContent,

            orderDate: new Date().toLocaleString()

        };

        /* Save Order */

        let orders = JSON.parse(localStorage.getItem("auroraOrders")) || [];

        orders.push(order);

        localStorage.setItem(
            "auroraOrders",
            JSON.stringify(orders)
        );
        /* Clear Cart */

        localStorage.removeItem("auroraCart");

        /* Success */

        alert("🎉 Order placed successfully!");

        window.location.href = "order-success.html";

    });

});