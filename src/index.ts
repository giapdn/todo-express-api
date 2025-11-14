//nhập các tài nguyên khác về dúng
import express, { Request, Response } from "express"
import cors from "cors"
import connectDB from "./config/database";
import todoRoutes from "./routes/todo.routes"
import authRoutes from "./routes/auth.routes"
import { logger } from "./middlewares/logger.middleware";
import dotenv from "dotenv"
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(logger);
//kết nối db
connectDB();
//router
app.get("/", (req: Request, res: Response) => {
  res.json({ name: "Giáp" })
})
app.use("/api/todos", todoRoutes)
app.use("/api/auth", authRoutes)

//route fallback/default
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "url does not match any routes" })
});

//chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
})