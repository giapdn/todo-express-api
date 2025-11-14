import mongoose from "mongoose";
import Todo from "../models/Todo"
import { Request, Response } from "express";
import z from "zod";


export const getTodos = async (req: Request, res: Response) => {
  const id = req.user!.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  const skip = (page - 1) * limit; //công thức tính phân trang
  const query = { userId: id }
  try {
    const [todos, total] = await Promise.all([
      Todo.find(query).skip(skip).limit(limit),
      Todo.countDocuments(query)
    ])

    res.json({ data: todos, page, limit, totalItem: total, totalPages: Math.ceil(total / limit) }) //Math.ceil làm tròn lên
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const query = { _id: id, userId: userId };
  try {
    const todo = await Todo.findOne(query);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.status(200).json(todo);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Invalid data provided." });
    const userId = req.user!.id;
    const doc = {
      title: title,
      description: description,
      userId: userId
    }
    const result = await Todo.create(doc);
    res.status(201).json({ message: "Todo created successfully !", id: result._id })
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.user!.id;
    const todoId = req.params.id
    const todo = await Todo.findOne({ _id: todoId, userId: userId });
    if (!todo) return res.status(404).json({ message: "Todo not found." });
    if (!title) return res.status(400).json({ message: "Invalid data provided." });

    todo.title = title;
    todo.description = description;
    const result = await todo.save();
    res.status(200).json({ message: `Updated todo w/ id: ${result._id}.`, data: result });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

//schema validate (zod)
const deleteTodoSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), { message: "Invalid todo format" }).nonempty()
})

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const parseResult = deleteTodoSchema.safeParse(req.params); //validate
    //dừng nếu lỗi
    if (!parseResult.success) return res.status(400).json({ message: "Validation error", errors: parseResult.error.message })

    //lấy id của todo và user đang request
    const { id } = parseResult.data;
    const userId = req.user!.id;
    //xoá todo
    const result = await Todo.deleteOne({ _id: id, userId: userId })
    if (result.deletedCount === 1) return res.status(200).json({ message: "Delete successfully." })
    else return res.status(404).json({ message: "No documents matched the query. Deleted 0 doc" })

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const toggleTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const userId = req.user!.id;
  try {
    const todo = await Todo.findOne({ _id: todoId, userId: userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.isCompleted = !todo.isCompleted;
    await todo.save()
    return res.status(200).json({
      message: "Todo updated",
      todo,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}