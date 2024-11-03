const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(express.json());

// Load reviews from a file (if using file-based storage)
let reviews = [];
try {
    const data = fs.readFileSync("reviews.json", "utf8");
    reviews = JSON.parse(data);
} catch (error) {
    console.error("Could not load reviews:", error);
}

// Endpoint to get all reviews
app.get("/reviews", (req, res) => {
    res.json(reviews);
});

// Endpoint to add a new review
app.post("/reviews", (req, res) => {
    const newReview = req.body.review;
    if (newReview) {
        reviews.push(newReview);

        // Save reviews to file (if using file-based storage)
        fs.writeFileSync("reviews.json", JSON.stringify(reviews), "utf8");

        res.status(201).json({ message: "Review added successfully" });
    } else {
        res.status(400).json({ message: "Review content is required" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
