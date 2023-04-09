const jwt = require('jsonwebtoken');


class Middleware {

    static verifyToken = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send('Unauthorized');
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send('Forbidden');
            }

            req.user = decoded;
            next();
        });
    }
}


module.exports = Middleware;