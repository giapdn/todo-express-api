import { Router } from "express";
import { createTodo, deleteTodo, getTodo, getTodos, toggleTodo, updateTodo } from "../controllers/todo.controller";
import { verifyToken } from "../middlewares/auth.middleware";
const router = Router();

router.get("/todos", verifyToken, getTodos); //get all
router.get("/todos/:id", verifyToken, getTodo); // detail
router.post("/todos/", verifyToken, createTodo); //create
router.patch("/todos/:id", verifyToken, updateTodo); // update
router.delete("/todos/:id", verifyToken, deleteTodo); //delete

router.patch("/todos/:id/toggle", verifyToken, toggleTodo)



export default router