import mongoose, { Schema, Document } from "mongoose";


export interface ITodo extends Document {
  title: string;
  description?: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    isComplete: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<ITodo>("Todo", TodoSchema);