// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// In-memory database for demo purposes
const doctors = {};

// Registration endpoint
app.post('/api/doctors/register', (req, res) => {
    const { fullName, specialization, licenseNumber, email, username, password } = req.body;
    
    if (doctors[username]) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    
    doctors[username] = {
        fullName,
        specialization,
        licenseNumber,
        email,
        username,
        password // Note: In production, you should hash the password
    };
    
    res.json({ message: 'Registration successful' });
});

// Login endpoint
app.post('/api/doctors/login', (req, res) => {
    const { username, password } = req.body;
    const doctor = doctors[username];
    
    if (!doctor) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (doctor.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.doctor = doctor;
    res.json({ message: 'Login successful' });
});

// Dashboard endpoint (protected)
app.get('/api/doctors/dashboard', (req, res) => {
    if (!req.session.doctor) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    res.json({ doctor: req.session.doctor });
});

// Logout endpoint
app.post('/api/doctors/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});