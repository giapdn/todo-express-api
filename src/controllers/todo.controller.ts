import Todo from "../models/Todo"
import { Request, Response } from "express";


export const getTodos = async (req: Request, res: Response) => {
  const id = req.user!.id;
  try {
    const todos = await Todo.find({ userId: id });
    if (!todos) {
      return res.status(404).json({ message: "Todos not found." });
    }
    res.json([todos, req.user])
  } catch (error) {
    res.status(500).json({ message: "Internal server errors !" })
  }
}

export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  try {
    const todo = await Todo.findOne({ _id: id, userId: userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Internal server errors !" });
  }
}

export const createTodo = async (req: Request, res: Response) => {

}

export const updateTodo = async (req: Request, res: Response) => {

}

export const deleteTodo = async (req: Request, res: Response) => {

}