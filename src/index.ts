//nhập các tài nguyên khác về dúng
import express, { Request, Response } from "express"
import connectDB from "./config/database";
import todoRoutes from "./routes/todo.routes"
import authRoutes from "./routes/auth.routes"
import { logger } from "./middlewares/logger.middleware";
import dotenv from "dotenv"
dotenv.config()

//use các api, thư viện khác
const app = express();
app.use(express.json());
app.use(logger);
//kết nối db
connectDB();
//router
app.get("/", (req: Request, res: Response) => {
  res.json({ name: "Giáp" })
})
app.use("/api/todos", todoRoutes)
app.use("/api/auth", authRoutes)
//chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
})