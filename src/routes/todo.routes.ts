import { Router } from "express";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todo.controller";
import { verifyToken } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", verifyToken, getTodos); //get all
router.get("/:id", verifyToken, getTodo); // detail
router.post("/", verifyToken, createTodo); //create
router.put("/:id", verifyToken, updateTodo); // update
router.delete("/:id", verifyToken, deleteTodo); //delete


export default router