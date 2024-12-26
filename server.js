const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'styles.css'));
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'script2.js'));
});

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'NiceDay', // your MySQL password
    database: 'education'
});

db.connect(err => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("MySQL connected");
});

// Endpoint to fetch grade details from MySQL
app.get('/getGradeDetails', (req, res) => {
    const grade = req.query.grade;

    db.query('SELECT * FROM grades WHERE grade = ?', [grade], (err, results) => {
        if (err) {
            console.error("Error fetching grade details:", err);
            return res.status(500).json({ message: "Error fetching grade details" });
        }

        if (results.length > 0) {
            const gradeDetails = results[0];
            gradeDetails.subjects = JSON.parse(gradeDetails.subjects); // Parse JSON string to array
            gradeDetails.chapters = JSON.parse(gradeDetails.chapters); // Parse JSON string to array
            res.json(gradeDetails);
        } else {
            res.status(404).json({ message: "Grade details not found" });
        }
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
