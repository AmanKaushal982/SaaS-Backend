import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectedRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, please login' })
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User
    }
    catch (err) {
        return res.status(401).json({ message: 'Token invalid or expired, please login again' });
    }
}
export default protectedRoutes;