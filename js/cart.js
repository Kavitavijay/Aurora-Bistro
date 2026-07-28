/* ==========================================
   AURORA BISTRO SHOPPING CART
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cartContainer = document.getElementById("cartItems");
    const emptyCart = document.getElementById("emptyCart");
    const template = document.getElementById("cartTemplate");
    

    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("grandTotal");
    const cartCount = document.getElementById("cartCount");

    const promoBtn = document.getElementById("applyPromo");
    const checkoutBtn = document.getElementById("checkoutBtn");

    const DELIVERY_CHARGE = 5;
    const TAX_RATE = 0.05;

    let discount = 0;

    let cart = JSON.parse(localStorage.getItem("auroraCart")) || [];

    /* =====================================
        INITIALIZE
    ===================================== */

    renderCart();

    /* =====================================
        RENDER CART
    ===================================== */

    function renderCart() {

        cartContainer.innerHTML = "";

        if (cart.length === 0) {

            emptyCart.style.display = "block";

            updateSummary();

            return;

        }

        emptyCart.style.display = "none";

        cart.forEach(item => {

            const clone = template.content.cloneNode(true);

            const image = clone.querySelector(".cart-image");

            image.src = item.image;
            image.alt = item.name;

            image.onerror = () => {

                image.src = "assets/images/default-food.jpg";

            };

            clone.querySelector(".cart-name").textContent = item.name;

            clone.querySelector(".cart-category").textContent =
                item.category
                ? item.category.charAt(0).toUpperCase() +
                item.category.slice(1)
                : "Food";

            const price = Number(item.price) || 0;

            clone.querySelector(".cart-price").textContent =
                `$${price.toFixed(2)}`;

            clone.querySelector(".qty").textContent =
                item.quantity;

            clone.querySelector(".cart-total").textContent =
                `$${(price * item.quantity).toFixed(2)}`;

            /* PLUS */

            clone.querySelector(".plus")
                .addEventListener("click", () => {

                    item.quantity++;

                    saveCart();

                });

            /* MINUS */

            clone.querySelector(".minus")
                .addEventListener("click", () => {

                    if(item.quantity > 1){

                        item.quantity--;

                    }else{

                        cart = cart.filter(p => p.id !== item.id);

                    }

                    saveCart();

                });

            /* REMOVE */

            clone.querySelector(".remove-item")
                .addEventListener("click", () => {

                    cart = cart.filter(p => p.id !== item.id);

                    saveCart();

                });

            cartContainer.appendChild(clone);

        });

        updateSummary();

    }

    /* =====================================
        UPDATE SUMMARY
    ===================================== */

    function updateSummary() {

        let subtotal = 0;

        let count = 0;

        cart.forEach(item => {

            subtotal += item.price * item.quantity;

            count += item.quantity;

        });

        subtotal -= discount;

        if(subtotal < 0){

            subtotal = 0;

        }

        const tax = subtotal * TAX_RATE;

        const total =
            subtotal + tax +
            (cart.length ? DELIVERY_CHARGE : 0);

        subtotalElement.textContent =
            `$${subtotal.toFixed(2)}`;

        taxElement.textContent =
            `$${tax.toFixed(2)}`;

        totalElement.textContent =
            `$${total.toFixed(2)}`;

        cartCount.textContent = count;

    }

    /* =====================================
        SAVE
    ===================================== */

    function saveCart(){

        localStorage.setItem(
            "auroraCart",
            JSON.stringify(cart)
        );

        renderCart();

    }

    /* =====================================
        PROMO CODE
    ===================================== */

    promoBtn.addEventListener("click", () => {

        const code =
            document.getElementById("promoCode")
            .value
            .trim()
            .toUpperCase();

        if(code === "WELCOME10"){

            discount = 10;

            alert("Promo Applied!");

        }

        else if(code === "AURORA20"){

            discount = 20;

            alert("Promo Applied!");

        }

        else{

            discount = 0;

            alert("Invalid Promo Code");

        }

        updateSummary();

    });

    /* =====================================
        CHECKOUT
    ===================================== */

    checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;

    }

    localStorage.setItem("auroraDiscount", discount);

    window.location.href = "checkout.html";

});

});