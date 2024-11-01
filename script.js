// Form submission event handler
document.getElementById("reviewForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const review = document.getElementById("review").value;

    const newReview = { name, review };

    try {
        // Attempt to save review on the server
        const response = await fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview)
        });
        
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    } catch (error) {
        console.warn("Server not available, saving locally:", error);
    }

    // Save review to local storage
    saveReviewToLocal(newReview);

    // Reset the form and reload reviews
    document.getElementById("reviewForm").reset();
    loadReviews();
});

// Save review to local storage
function saveReviewToLocal(review) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Load reviews from local storage or server
async function loadReviews() {
    const reviewsContainer = document.getElementById("reviews");
    reviewsContainer.innerHTML = "";

    const localReviews = JSON.parse(localStorage.getItem("reviews"));
    if (localReviews) {
        // Display reviews from local storage if available
        localReviews.forEach(({ name, review }) => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `<h4>${name}</h4><p>${review}</p>`;
            reviewsContainer.appendChild(reviewElement);
        });
    } else {
        // If no local reviews, fetch from server
        try {
            const response = await fetch("http://localhost:5000/reviews");
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            
            const serverReviews = await response.json();
            serverReviews.forEach(({ name, review }) => {
                const reviewElement = document.createElement("div");
                reviewElement.classList.add("review");
                reviewElement.innerHTML = `<h4>${name}</h4><p>${review}</p>`;
                reviewsContainer.appendChild(reviewElement);
            });
            
            // Save server reviews to local storage
            localStorage.setItem("reviews", JSON.stringify(serverReviews));
        } catch (error) {
            console.error("Failed to load reviews from server:", error);
        }
    }
}

loadReviews();
