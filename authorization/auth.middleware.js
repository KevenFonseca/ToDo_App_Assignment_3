const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) return res.status(403).send({error: 'Token not provided'})

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).send({error: 'Invalid Token'})
        
        req.user = user // adds user information

        next()
    })
}

module.exports = authenticateToken