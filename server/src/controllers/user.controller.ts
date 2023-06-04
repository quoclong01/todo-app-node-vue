import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/User";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    name,
    password
  });

  return await user
    .save()
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    })
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  return await User.find()
    .then((users) => res.status(200).json({ data: users }))
    .catch((error) => {
      res.status(500).json({ error });
    });
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => { 
  const id = req.params.id;

  return await User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: 'not found' })
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    })
}

export default { createUser, getAllUser, getUserById };
