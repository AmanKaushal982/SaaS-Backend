import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import validate from '../utils/validate.js';

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// REGISTER CONROLLER
const register = async (req, res) => {
    try {
        const { email, password, subscribe } = req.body;
        // sabse pehle format validation 
        const { isValid, errors } = validate(
            email, password
        );
        if (!isValid) {
            return res.status(400).json({ errors });
        }
        // fir email pehle se exist karta hai?
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errors: { email: 'Email already registered' } })
        };
    }
    catch (err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
};

// LOGIN CONTROLLER
const login;

// OAUTH CONTROLLER
const Oouth;

// LOGOUT CONTROLLER
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logged out Successfully'
    });
};