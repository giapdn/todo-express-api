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
  origin: "*"
}))
// app.use(cors({
//   origin: process.env.ALLOWED_ORIGIN,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }))
app.use(logger);
//kết nối db
connectDB();
//router
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is running" })
})
app.use("/api", todoRoutes)
app.use("/api/auth", authRoutes)

//route fallback/default
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "url does not match any routes" })
});

//chạy server
const PORT = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
})