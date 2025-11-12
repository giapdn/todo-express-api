import mongoose, { Schema, Document } from "mongoose";


export interface ITodo extends Document {
  title: string;
  description?: string;
  isCompleted: boolean;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<ITodo>("Todo", TodoSchema);