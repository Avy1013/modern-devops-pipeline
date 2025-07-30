const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // To enable cross-origin requests
const path = require('path'); // To handle file paths

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create MySQL connection
const db = mysql.createConnection({
  host: 'mysql', // MySQL service name in Kubernetes
  user: 'yourusername',  // Replace with your MySQL username
  password: 'yourpassword', // Replace with your MySQL root password
  database: 'Manhwa-app'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Endpoint to get manhwa data from MySQL
app.get('/manhwa', (req, res) => {
  const query = 'SELECT * FROM manhwa'; // Query to get all manhwa data
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving manhwa data');
    } else {
      res.json(results); // Send manhwa data as JSON
    }
  });
});

// Default route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
