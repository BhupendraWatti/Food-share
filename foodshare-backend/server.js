const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config(); // Load environment variables from .env file

console.log("Loaded API Key:", process.env.API_KEY);
const API_KEY = process.env.API_KEY; // Debugging log
console.log("Loaded API Key:", API_KEY);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const PORT = 3000;

// MySQL connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root", // Replace with your MySQL username
//     password: "root", // Replace with your MySQL password
//     database: "foodshare", // Replace with your database name
// });

// db.connect(err => {
//     if (err) {
//         console.error("Database connection failed:", err);
//         return;
//     }
//     console.log("Connected to MySQL database");
// });

// ✅ Endpoint to handle donation form submission
app.post("/donate", (req, res) => {
    const donationData = req.body;
    const query = "INSERT INTO donations SET ?";
    db.query(query, donationData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ success: true, message: "Donation recorded successfully" });
    });
});

// ✅ Endpoint to handle volunteer form submission
app.post("/volunteer", (req, res) => {
    const volunteerData = req.body;
    const query = "INSERT INTO volunteers SET ?";
    db.query(query, volunteerData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ success: true, message: "Volunteer application recorded successfully" });
    });
});

// ✅ Endpoint to handle contact form submission (Fixed `contactData` reference)
app.post("/contact", (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ success: true, message: "Contact message recorded successfully" });
    });
});

// ✅ Endpoint to handle AI chatbot communication
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    console.log("Received message:", userMessage);

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: "Your prompt here" }] }]
              })
           
          
    });

        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("API Response:", data);

        if (data.candidates && data.candidates.length > 0) {
            const reply = data.candidates[0].content.parts[0].text;
            res.json({ reply });
        } else {
            res.status(500).json({ error: "No valid response from Gemini API" });
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});


// ✅ Fix `/submit` Endpoint
app.post("/submit", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = "INSERT INTO users (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ success: true, message: "Data saved successfully" });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
