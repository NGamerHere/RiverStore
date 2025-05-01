import jwt from "jsonwebtoken";

const VerifyToken= (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }
    const bearerToken = token.split(" ")[1];
    if (!bearerToken) {
        return res.status(403).json({ error: "Invalid token format" });
    }
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.sessionData = decoded;
        next();
    });
}
export default VerifyToken;