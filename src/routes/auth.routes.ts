import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router