import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";
import { required } from "zod/v4/core/util.cjs";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IUser>("User", UserSchema);