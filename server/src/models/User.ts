import mongoose, { Document, Schema } from "mongoose";

import { hashPassword } from "../lib/utils";

export interface IUserModel extends Document {
  email: string;
  name: string;
  password: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema : Schema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, default: null }
  },
  {
    timestamps: true
  },
);

UserSchema.pre("save", async function (next) {
    let user = this as IUserModel;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // hash password
    const hash = await hashPassword(user.password);

    // Replace the password with the hash
    user.password = hash;

    return next();
});

export default mongoose.model<IUserModel>('User', UserSchema);
