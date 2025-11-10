import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String }
},
  {
    timestamps: true
  }
)

export default mongoose.model<IUser>("User", UserSchema);