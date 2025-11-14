import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("connect to DB: Ok.");
  } catch (error) {
    console.log("Error when connect to DB.");
    process.exit(1);
  }
}

export default connectDB;