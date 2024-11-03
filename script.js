// Function to fetch and display existing reviews from the server
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

// Function to handle review form submission
function handleFormSubmit(event) {
    event.preventDefault();  // Prevent the form from reloading the page

    const newReview = document.getElementById("newReview").value;
    if (newReview.trim()) {
        displayNewReview(newReview);  // Display the review on the page immediately
        sendReviewToServer(newReview);  // Send the review to the server for persistence
        document.getElementById("reviewForm").reset();  // Clear the form
    }
}

// Function to display a new review immediately on the page
function displayNewReview(review) {
    const reviewContainer = document.getElementById("reviewContainer");
    const reviewElement = document.createElement("p");
    reviewElement.textContent = review;
    reviewContainer.appendChild(reviewElement);
}

// Function to send the new review to the server
async function sendReviewToServer(review) {
    try {
        const response = await fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review }),
        });
        if (!response.ok) throw new Error("Failed to save review on server");
    } catch (error) {
        console.error("Could not save review to server:", error);
    }
}

// Initialize fetching and displaying reviews, and set up form submission
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayReviews();
    document.getElementById("reviewForm").addEventListener("submit", handleFormSubmit);
});
