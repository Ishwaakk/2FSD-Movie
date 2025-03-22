const mysql = require("mysql2");

// ✅ Create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",   // Change if using a different user
    password: "yourpassword",  // Replace with your actual MySQL password
    database: "movies_db",
    port: 3306   // Default MySQL port
});

// ✅ Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
        return;
    }
    console.log("✅ Connected to MySQL Database!");
});

// ✅ Create Table if Not Exists
const createTable = `
    CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        movie_name VARCHAR(255) NOT NULL,
        reviewer VARCHAR(255) NOT NULL,
        rating DECIMAL(2,1) NOT NULL
    )
`;
db.query(createTable, (err, result) => {
    if (err) throw err;
    console.log("✅ Table 'reviews' is ready!");
});

// ✅ Insert Data
const insertReview = `INSERT INTO reviews (movie_name, reviewer, rating) VALUES (?, ?, ?)`;
const reviewData = ["Inception", "Alice", 9.0];

db.query(insertReview, reviewData, (err, result) => {
    if (err) throw err;
    console.log("✅ Review added successfully!");
});

// ✅ Fetch & Display Records
db.query("SELECT * FROM reviews", (err, results) => {
    if (err) throw err;
    console.log("🎬 Movie Reviews:");
    console.table(results);
});

// ✅ Close the Connection
db.end();
