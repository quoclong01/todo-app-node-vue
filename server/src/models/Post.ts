import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPost {
  user: string,
  title: string,
  content: string,
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostModel extends IPost, Document {}

const PostSchema: Schema = new Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true
  },
);

export default mongoose.model<IPostModel>('Post', PostSchema);
