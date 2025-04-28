import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responce'; // fixed spelling
import { customeError } from '../utils/customeError';
import { user } from '../generated/prisma';
import { UserRequest } from '../domain/types/users';

function verifyToken(req: UserRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return errorResponse(
      res,
      'Your session has expired! Please log in again.',
      'Token not found',
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRETKEY as string,
    ) as user;

    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return errorResponse(
        res,
        'Invalid or expired token. Please log in again.',
        'Authentication error',
      );
    }

    return next(
      err instanceof customeError
        ? err
        : new customeError('An unexpected error occurred', 500),
    );
  }
}

export default verifyToken;
