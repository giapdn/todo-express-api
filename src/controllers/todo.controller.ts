import Todo from "../models/Todo"
import { Request, Response } from "express";


export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos)
  } catch (error) {
    res.status(500).json({ message: "Unable to find data." })
  }
}

export const deleteTodo = async (req: Request, res: Response) => {

}