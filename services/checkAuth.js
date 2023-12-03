const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    const token = req.headers.authorization || ''
    
    if (!token) {
        return res.status(401).json({message: "Користувач не авторізован!"})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.data
        next()
    } catch (e) {
        res.status(401).json({message: "Користувач не авторізован!"})
    }
} 