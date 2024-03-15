document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/dashboard'; // Redirect to dashboard if login successful
        } else {
            document.getElementById('message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample users database (replace this with a proper database in a real application)
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
