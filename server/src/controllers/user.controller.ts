import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { comparePassword, generateAccessToken } from "../lib/utils";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    return res.status(409).json({ errors: 'This email have already exist.' });
  }

  const existDisplayName = await User.findOne({ name });

  if (existDisplayName) {
    return res.status(408).json({ errors: 'Your display name is already taken.' });
  }

  const user = new User({
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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send('All input is required');
  }

  const userTemp = await User.findOne({ email });
  
  if (!userTemp) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isValidPassword = await comparePassword(password, userTemp.password);

  if (!isValidPassword) {
    return res.status(404).json({ message: 'Invalid email or password.' });
  }

  const token = await generateAccessToken(userTemp._id);
  await userTemp.updateOne({ token });
  
  return res.status(201).json(userTemp);
}

export default { createUser, getAllUser, getUserById, loginUser };
