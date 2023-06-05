import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import log from '../logger';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            const { details }: any = error;
            const errors = details.map((i: any) => i.message);
            log.error(errors);
            return res.status(422).json({ errors });
        }
    };
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (passwordBody: string, password: string) => {
  return await bcrypt.compare(passwordBody, password);
};

export const generateAccessToken = async (id: number) => {
  return await jwt.sign({ userId: id }, 'RANDOM_TOKEN_SECRET', { algorithm: 'HS256', expiresIn: '24h' });
};

export const generateResetToken = async (userId: number) => {
  return await jwt.sign({ userId: userId }, 'RANDOM_TOKEN_SECRET', { algorithm: 'HS256', expiresIn: '1h' });
};

export const verifyToken = async (token: any) => {
  try {
    const userId = await jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return userId;
  } catch (error) {
    return error;
  }
};
