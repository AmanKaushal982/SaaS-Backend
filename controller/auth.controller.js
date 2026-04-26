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
        const { isValid, errors } = validateRegister(
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
        // password hash karo
        const hashedPassword = await bcrypt.hash(password, 10);
        // user banao
        const user = await User.create({
            email,
            password: hashedPassword,
            subscribe: subscribe || false,
            authProvider: 'local',
        })
        // now create token
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            message: 'Registration successful',
            user: {
                id: user._id,
                email: user.email,
                subscribe: user.subscribe,
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
};

// LOGIN CONTROLLER
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { isValid, errors } = validateLogin(email, password);
        if (!isValid) {
            return res.status(400).json({ errors });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({
                errors: { email: 'No account found with this email' },
            });
        }
        if (user.authProvider !== 'local') {
            return res.status(400).json({
                errors: {
                    email: `This account uses ${user.authProvider} login. Please continue with ${user.authProvider}`
                }
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: { password: 'Incorrect Password' },
            });
        }
        const token = generatetoken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: 'login successful',
            user: {
                id: user._id,
                email: user.email,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
};

// OAUTH CONTROLLER
const Oauth = async (req, res) => {
    try {
        const { email, providerId, authProvider } = req.body;
        if (!email || !providerId || !authProvider) {
            return res.status(400).json({ message: 'invalid OAuth data' });
        }
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email,
                authProvider,
                providerId
            });
        }
        const token = generatetoken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: 'Oauth login successful',
            user: {
                id: user._id,
                email: user.email,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'server error', error: err.message
        });
    }
};

// LOGOUT CONTROLLER
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logged out Successfully'
    });
};