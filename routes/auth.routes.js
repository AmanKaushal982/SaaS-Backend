import express from "express";

const authRoutes = express.Router();

authRoutes.post("/register", signup);
authRoutes.post("/login", login);

export default authRoutes;