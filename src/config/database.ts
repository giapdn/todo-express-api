import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todo-app");
    console.log("connect to DB: Ok.");
  } catch (error) {
    console.log("Error when connect to DB.");
    process.exit(1);
  }
}

export default connectDB;