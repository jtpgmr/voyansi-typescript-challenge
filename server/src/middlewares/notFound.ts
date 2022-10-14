import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

export default notFound;