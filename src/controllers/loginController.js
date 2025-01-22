const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 

    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        );

        // Store token in a secure cookie (HTTP-only)
        res.cookie('jwt', accessToken, {
            path: '/',
            httpOnly: true,  // Can't be accessed by JavaScript (prevents XSS attacks)
            secure: false, // process.env.NODE_ENV === 'production',  // Use secure cookies in production (HTTPS)
            sameSite: 'Lax',  // Required for cross-site cookies (CORS issues)
            maxAge: 10 * 60 * 1000  // Token expires in 10 minutes
        });

        // Respond with access token
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { login };