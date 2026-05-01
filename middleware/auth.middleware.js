import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectedRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, please login' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User no loger exists' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Token invalid or expired, please login again' });
    }
}
export default protectedRoutes;