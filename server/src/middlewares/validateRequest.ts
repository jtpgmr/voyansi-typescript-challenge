import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AnyZodObject, ZodError } from 'zod';

import log from '../utils/logger';

dotenv.config();

// CURRYING
// takes in a resource (ie schema)
const validateRequest = (resource: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // parses Zod obj for body, params and query fields
      resource.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        log.error(err)
        res.status(422);
      }
      next(err.errors);
    }
  };
};

export default validateRequest;
