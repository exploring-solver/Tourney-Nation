const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');

require('dotenv').config(); // Load environment variables from .env file

// Route 1: Create a user using POST "/api/auth/signup"
router.post('/signup', [
    body('name', 'Name should be at least 3 characters.').isLength({ min: 3 }),
    body('username', 'Username should be at least 3 characters.').isLength({ min: 3 }),
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password should be at least 5 characters.').isLength({ min: 5 }),
], async (req, res) => {
    // Check for errors in the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, password } = req.body;

    try {
        // Check if a user with this email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // Check if a user with this username already exists
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: 'User with this username already exists.' });
        }

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        user = await User.create({
            name,
            username,
            email,
            password: secPass,
        });

        // Create and send JWT token in response
        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error.');
    }
});

// Route 2: Authenticate a User POST: "/api/auth/login"
router.post('/login', [
    body('credential', 'Enter a valid email or username.').exists(),
    body('password', 'Password cannot be blank.').exists(),
], async (req, res) => {
    // Check for errors in the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { credential, password } = req.body;

    try {
        // Check if user exists with email or username provided
        const user = await User.findOne({
            $or: [{ email: credential }, { username: credential }],
        });
        if (!user) {
            return res.status(400).json({ error: 'Invalid Credentials.' });
        }

        // Check if password is correct
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Invalid Credentials.' });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ authtoken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error.');
    }
});

// Route 3: Get logged in user details
router.get('/user', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error.');
    }
});

module.exports = router;