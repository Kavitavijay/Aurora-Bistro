/* ==========================================
   AURORA BISTRO
   MENU PAGE SCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ===================================== */

    const menuCards = document.querySelectorAll(".menu-card");

    const searchInput = document.getElementById("searchInput");

    const filterButtons = document.querySelectorAll(".filter-btn");


    const cartButtons = document.querySelectorAll(".add-cart");

    const cartCount = document.querySelector(".cart-count");

    /* =====================================
       LOCAL STORAGE
    ===================================== */


    let cart =
        JSON.parse(localStorage.getItem("auroraCart")) || [];

    /* =====================================
       SEARCH
    ===================================== */

    if (searchInput) {

        searchInput.addEventListener("keyup", filterMenu);

    }

    function filterMenu() {

        const keyword =
            searchInput.value.toLowerCase().trim();

        menuCards.forEach(card => {

            const title =
                card.querySelector("h3")
                .textContent
                .toLowerCase();

            if (title.includes(keyword)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    }

    /* =====================================
       CATEGORY FILTER
    ===================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const category =
                button.dataset.filter;

            menuCards.forEach(card => {

                if (category === "all") {

                    card.style.display = "block";

                    return;

                }

                if (card.classList.contains(category)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

        /* =====================================
       SHOPPING CART
    ===================================== */

    updateCartCount();

    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const product = {

                id: Number(button.dataset.id),

                name: button.closest(".menu-card")
                .querySelector("h3")
                .textContent.trim(),

                category: button.dataset.category || "Food",

                price: Number(button.dataset.price),

                image: button.dataset.image,

                quantity: 1

            };


            if(!product.id || !product.price){

                console.log("Invalid Product:", product);

                return;

            }



            addToCart(product);

        });

    });

    function addToCart(product) {

        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(product);

        }

        saveCart();

        showToast(`${product.name} Added to cart!`);

    }

    function saveCart() {

        localStorage.setItem(

            "auroraCart",

            JSON.stringify(cart)

        );

        updateCartCount();

    }

    function updateCartCount() {

        let totalItems = 0;

        cart.forEach(item => {

            totalItems += item.quantity;

        });

        if (cartCount) {

            cartCount.textContent = totalItems;

        }

    }

    /* =====================================
   CHEF SPECIAL ORDER
===================================== */

const chefOrderBtn = document.querySelector(".chef-order-btn");

if (chefOrderBtn) {

    chefOrderBtn.addEventListener("click", () => {

        const product = {

            id: Number(chefOrderBtn.dataset.id),

            name: chefOrderBtn.dataset.name,

            category: chefOrderBtn.dataset.category,

            price: Number(chefOrderBtn.dataset.price),

            image: chefOrderBtn.dataset.image,

            quantity: 1

        };

        addToCart(product);

    });

}

    /* =====================================
       QUICK BUTTON ANIMATION
    ===================================== */

    cartButtons.forEach(button => {

        button.addEventListener("mousedown", () => {

            button.style.transform = "scale(.95)";

        });

        button.addEventListener("mouseup", () => {

            button.style.transform = "scale(1)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "scale(1)";

        });

    });

    /* =====================================
       MENU CARD HOVER EFFECT
    ===================================== */

    menuCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });
        /* =====================================
       TOAST NOTIFICATION
    ===================================== */

    function showToast(message) {

        let toast = document.querySelector(".toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

        }

        toast.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <span>${message}</span>
        `;

        toast.classList.add("show");

        clearTimeout(toast.hideTimeout);

        toast.hideTimeout = setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }

    /* =====================================
       SCROLL REVEAL ANIMATION
    ===================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show-card");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    menuCards.forEach(card => {

        card.classList.add("hidden-card");

        observer.observe(card);

    });

    /* =====================================
       IMAGE HOVER EFFECT
    ===================================== */

    menuCards.forEach(card => {

        const image = card.querySelector("img");

        if (!image) return;

        card.addEventListener("mouseenter", () => {

            image.style.transform = "scale(1.08)";

        });

        card.addEventListener("mouseleave", () => {

            image.style.transform = "scale(1)";

        });

    });

    /* =====================================
       INITIALIZE
    ===================================== */

    updateCartCount();

});