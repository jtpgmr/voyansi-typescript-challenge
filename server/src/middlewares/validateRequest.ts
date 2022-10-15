import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AnyZodObject, ZodError } from 'zod';

import log from '../utils/logger';
import { IdParam } from '../interfaces/IdParam';
import RequestValidator from '../interfaces/RequestValidator';

dotenv.config();

// CURRYING
// takes in a resource (ie schema)
const validateRequest = (resource: RequestValidator) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // parses Zod obj for body, params and query fields
      // resource.parseAsync({
      //   body: req.body,
      //   params: req.params,
      //   query: req.query,
      // });
      
      if (resource.params) {
        req.params = await resource.params.parseAsync(req.params);
      }

      if (resource.body) {
        // checks info in req.body
        // parseAync to parse the Zod validator
        req.body = await resource.body.parseAsync(req.body);
      }

      if (resource.query) {
        req.query = await resource.query.parseAsync(req.query);
      }

      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        res.status(422).send(err.issues);
      }
      next(err.errors);
    }
  };
};

export default validateRequest;
