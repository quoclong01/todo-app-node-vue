import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
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
