import { Request, Response, NextFunction } from 'express';
import { customeError } from '../utils/customeError';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof customeError) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
      errorCode: err.errorCode,
      timestamp: err.timestamp,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  } else {
    res.status(500).json({
      status: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
};
