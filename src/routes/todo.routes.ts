import { Router } from "express";
import { getTodo, getTodos } from "../controllers/todo.controller";
import { verifyToken } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", verifyToken, getTodos); //get all
router.get("/:id", verifyToken, getTodo); // detail
router.post("/", verifyToken,); //create
router.put("/:id", verifyToken,); // update
router.delete("/:id", verifyToken,); //delete


export default router