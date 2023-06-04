import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITodo {
  user: String,
  todo: String,
  isCompleted: boolean,
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodoModel extends ITodo, Document {}

const TodoSchema: Schema = new Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: 'User' },
    todo: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
  },
  {
    timestamps: true
  },
);

export default mongoose.model<ITodoModel>('Todo', TodoSchema);
