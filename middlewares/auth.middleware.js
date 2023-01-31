import jwt from 'jsonwebtoken';

export default function authenticateRoute(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({ message: "This route is private. Please authenticate.." })
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ message: "This route is private. Please re-authenticate.." })
        req.user = user
        next()
    })
}