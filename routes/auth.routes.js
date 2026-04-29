import express from "express";
import { register, login, oauthLogin, logout } from '../controller/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post("/register", signup);
authRoutes.post("/login", login);
authRoutes.post('/oauth', oauthLogin);
authRoutes.post('/logout', logout);

export default authRoutes;