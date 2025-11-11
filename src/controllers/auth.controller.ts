import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(401).json({ message: "Invalid credentials." })
    const user = await User.findOne({ username })
    if (!user) return res.status(401).json({ message: "User not found." })
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password or Username not match with any record in collection." })

    //generate token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY!, { expiresIn: "5m" })

    //Trả token về phía client
    res.status(200).json({ message: "Logged in !", token, user: { id: user._id, username: user.username } })
  } catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
}