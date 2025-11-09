import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String },
  passwordHash: { type: String },
  email: { type: String }
},
  {
    timestamps: true
  }
)

export default mongoose.model<IUser>("User", UserSchema);