import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  email: String,
  name: String,
  password: String,
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true
  },
);

export default mongoose.model<IUserModel>('User', UserSchema);
