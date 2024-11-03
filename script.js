async function fetchAndDisplayReviews() {
    try {
        const response = await fetch("http://localhost:5000/reviews");
        if (!response.ok) throw new Error("Server is down");

        const reviews = await response.json();
        displayReviews(reviews);  // Replace static reviews if the server is up
    } catch (error) {
        console.error("Could not fetch reviews from server:", error);
    }
}

// Function to display reviews on the page
function displayReviews(reviews) {
    const reviewContainer = document.getElementById("reviewContainer");
    reviewContainer.innerHTML = "";  // Clear existing (static) reviews

    reviews.forEach(review => {
        const reviewElement = document.createElement("p");
        reviewElement.textContent = review;
        reviewContainer.appendChild(reviewElement);
    });
}

// Initialize fetching and displaying reviews
document.addEventListener("DOMContentLoaded", fetchAndDisplayReviews);
