import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//secret key
const JWT_SECRET = process.env.JWT_SECRET || "konichiwa"

//register
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body; // lấy dữ liệu được kèm vào body ra
    const isExist = await User.findOne({ username }); //kiểm tra xem username có trùng trong db không
    if (isExist) return res.status(400).json({ message: "user alredy existed !" }); //nếu trùng thì dừng
    const hashed = await bcrypt.hash(password, 10); //mã hoá mật khẩu
    const user = new User({ username: username, password: hashed }) //tạo mới user
    await user.save(); //lưu user mới tạo
    res.status(201).json({ message: "user created successfully !" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error !" })
  }
}

//login
export const login = async (req: Request, res: Response) => {

}