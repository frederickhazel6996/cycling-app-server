//Middleware Function to Check for authenticity of request

const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.send(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;

        next();
    });
}

module.exports = authenticate;
