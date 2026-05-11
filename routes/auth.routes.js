import express from "express";
import { register, login, oauthLogin, logout, getMe } from '../controller/auth.controller.js';
import protectedRoutes from '../middleware/auth.middleware.js';

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post('/oauth', oauthLogin);
authRoutes.post('/logout', logout);
authRoutes.post('/me', protectedRoutes, getMe);

export default authRoutes;