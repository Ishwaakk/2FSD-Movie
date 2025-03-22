const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// ✅ MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Update with your MySQL username if different
    password: "yourpassword",  // Update with your actual MySQL password
    database: "movies_db"
});

// ✅ Connect to MySQL
db.connect(err => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    } else {
        console.log("✅ Connected to MySQL Database!");
    }
});

// ✅ Fetch All Reviews
app.get("/reviews", (req, res) => {
    db.query("SELECT * FROM reviews", (err, results) => {
        if (err) return res.status(500).json({ error: "Error fetching records" });
        res.json({ reviews: results });
    });
});

// ✅ Sort Reviews by Rating or Release Date
app.get("/reviews/sort", (req, res) => {
    const { type, order } = req.query;
    let sqlQuery = "SELECT * FROM reviews";

    if (type === "rating") {
        sqlQuery += " ORDER BY rating";
    } else if (type === "releaseDate") {
        sqlQuery += " ORDER BY release_date";
    }

    sqlQuery += order === "asc" ? " ASC" : " DESC";

    db.query(sqlQuery, (err, results) => {
        if (err) return res.status(500).json({ error: "Error sorting records" });
        res.json({ reviews: results });
    });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
