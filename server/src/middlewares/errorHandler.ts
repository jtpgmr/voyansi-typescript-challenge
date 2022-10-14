import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

import ErrorResponse from '../interfaces/ErrorResponse';

dotenv.config();

const errorHandler = (err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export default errorHandler;