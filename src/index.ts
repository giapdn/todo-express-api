import express, { Request, Response } from "express"
import connectDB from "./config/db";

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.json({ name: "Giáp" })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
})