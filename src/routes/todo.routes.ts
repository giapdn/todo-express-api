import { Router } from "express";
import { getTodos } from "../controllers/todo.controller";
import { verifyToken } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", verifyToken, getTodos)


export default router