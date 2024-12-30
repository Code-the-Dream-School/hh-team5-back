const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Ensure the header exists and starts with 'Bearer '
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden - invalid or expired token
        req.user = decoded.username; // Add the decoded username to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticate;
