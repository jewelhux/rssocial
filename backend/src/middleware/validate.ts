import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body
      });

      next();
    } catch (error) {
      next(error);
    }
  };
