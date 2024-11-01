const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.json({ message: 'User registered' });
    } catch (err) {
        console.error('Registration error:', err); // Log actual error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login attempt for email:', email);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ error: 'User not registered' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password for user:', email);
            return res.status(400).json({ error: 'wrong password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_key, { expiresIn: '1h' });
        console.log('Login successful for user:', email);
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err); // Log error details
        res.status(500).json({ error: 'Login error' });
    }
});

module.exports = router;
