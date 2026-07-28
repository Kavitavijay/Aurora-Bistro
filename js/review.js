/* ==========================================
   REVIEWS PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const reviewForm = document.getElementById("reviewForm");
    const ratingStars = document.querySelectorAll("#ratingSelect i");
    const reviewsGrid = document.querySelector(".reviews-grid");

    let selectedRating = 0;

    /* =====================================
       STAR RATING
    ===================================== */

    ratingStars.forEach((star, index) => {

        star.addEventListener("click", () => {

            selectedRating = index + 1;

            updateStars(selectedRating);

        });

    });

    function updateStars(rating){

        ratingStars.forEach((star, index)=>{

            if(index < rating){

                star.classList.remove("fa-regular");
                star.classList.add("fa-solid","active");

            }else{

                star.classList.remove("fa-solid","active");
                star.classList.add("fa-regular");

            }

        });

    }

    /* =====================================
       LOAD SAVED REVIEWS
    ===================================== */

    const savedReviews =
        JSON.parse(localStorage.getItem("restaurantReviews")) || [];

    savedReviews.forEach(review => {

        createReviewCard(review);

    });

    /* =====================================
       SUBMIT REVIEW
    ===================================== */

    if(reviewForm){

        reviewForm.addEventListener("submit", function(e){

            e.preventDefault();

            const name =
                document.getElementById("reviewName").value.trim();

            const email =
                document.getElementById("reviewEmail").value.trim();

            const message =
                document.getElementById("reviewMessage").value.trim();

            if(name==="" || email==="" || message===""){

                alert("Please complete all fields.");

                return;

            }

            if(selectedRating===0){

                alert("Please select a rating.");

                return;

            }

            const review={

                name,
                email,
                message,
                rating:selectedRating

            };

            savedReviews.unshift(review);

            localStorage.setItem(
                "restaurantReviews",
                JSON.stringify(savedReviews)
            );

            createReviewCard(review,true);

            reviewForm.reset();

            selectedRating=0;

            updateStars(0);

            alert("Thank you! Your review has been submitted.");

        });

    }

    /* =====================================
       CREATE REVIEW CARD
    ===================================== */

    function createReviewCard(review, prepend=false){

        const card=document.createElement("div");

        card.className="review-card";

        let stars="";

        for(let i=1;i<=5;i++){

            if(i<=review.rating){

                stars+=`<i class="fa-solid fa-star"></i>`;

            }else{

                stars+=`<i class="fa-regular fa-star"></i>`;

            }

        }

        const initials =
            review.name.charAt(0).toUpperCase();

        card.innerHTML=`

            <div class="review-avatar">

                ${initials}

            </div>

            <h3>${review.name}</h3>

            <div class="review-stars">

                ${stars}

            </div>

            <p>

                "${review.message}"

            </p>

        `;

        card.style.opacity="0";
        card.style.transform="translateY(40px)";

        if(prepend){

            reviewsGrid.prepend(card);

        }else{

            reviewsGrid.appendChild(card);

        }

        setTimeout(()=>{

            card.style.transition=".5s";
            card.style.opacity="1";
            card.style.transform="translateY(0)";

        },100);

    }

    /* =====================================
       SCROLL ANIMATION
    ===================================== */

    const cards=document.querySelectorAll(".review-card");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show-review");

            }

        });

    },{

        threshold:.2

    });

    cards.forEach(card=>{

        card.classList.add("hidden-review");

        observer.observe(card);

    });

});