const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const EventEmitter = require("events");

const app = express();
const PORT = 3000;
const JSON_FILE = path.join(__dirname, "movieReviews.json");

app.use(express.json());
app.use(cors());

// Custom Event Emitter for logging
const eventEmitter = new EventEmitter();
eventEmitter.once("serverStart", () => console.log("⚡ Movie Review Server started!"));

// ✅ Home Route (Fixes "Cannot GET /" issue)
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Movie Review API</h1><p>Use <b>/reviews</b> to see all reviews.</p>");
});

// ✅ Fetch all movie reviews
app.get("/reviews", (req, res) => {
    fs.readFile(JSON_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading reviews data" });

        let reviews = JSON.parse(data).reviews;
        res.json({ reviews });
    });
    eventEmitter.emit("inspect");
});

// ✅ Add a new movie review
app.post("/add-review", (req, res) => {
    fs.readFile(JSON_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading review data" });

        let reviews = JSON.parse(data);
        reviews.reviews.push(req.body);

        fs.writeFile(JSON_FILE, JSON.stringify(reviews, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error saving review" });

            res.send("✅ Review added successfully!");
            eventEmitter.emit("newReviewAdded", req.body.movieTitle);
        });
    });
});

// ✅ Sort movie reviews by rating or release date
app.get("/reviews/sort", (req, res) => {
    const { type, order } = req.query;

    fs.readFile(JSON_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading review data" });

        let reviews = JSON.parse(data).reviews;
        if (type === "rating") {
            reviews.sort((a, b) => order === "asc" ? a.rating - b.rating : b.rating - a.rating);
        } else if (type === "releaseDate") {
            reviews.sort((a, b) => order === "asc" ? new Date(a.releaseDate) - new Date(b.releaseDate) : new Date(b.releaseDate) - new Date(a.releaseDate));
        }
        res.json({ reviews });
    });
});

// ✅ Event Logging for New Reviews
eventEmitter.on("newReviewAdded", (movieTitle) => {
    console.log(`📢 New review added for: ${movieTitle}`);
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Movie Review Server running on http://localhost:${PORT}`);
    eventEmitter.emit("serverStart");
});
