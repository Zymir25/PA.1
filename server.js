const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let reviews = []; // In-memory storage for reviews

app.get("/reviews", (req, res) => {
    res.json(reviews);
});

app.post("/reviews", (req, res) => {
    const { name, review } = req.body;
    if (name && review) {  // Ensure data is complete
        reviews.push({ name, review });
        res.status(201).send("Review added");
    } else {
        res.status(400).send("Name and review are required");
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
