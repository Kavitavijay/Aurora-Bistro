/* ==========================================
   ORDER SUCCESS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const order =
        JSON.parse(localStorage.getItem("auroraOrder"));

    if (!order) {

        window.location.href = "index.html";

        return;

    }

    document.getElementById("orderId").textContent =
        order.orderId;

    document.getElementById("customerName").textContent =
        order.customer;

    document.getElementById("paymentMethod").textContent =
        order.payment;

    document.getElementById("orderTotal").textContent =
        order.total;

});