import { Response } from 'express';
import {
  errorResponce as ErrorResponseType,
  successResponce as SuccessResponseType,
} from '../domain/types/responce';

export function successResponse<T>(
  resp: Response,
  message: string,
  data: T = {} as T,
) {
  const response: SuccessResponseType<T> = {
    status: true,
    message,
    data,
    error: [],
  };
  resp.status(201).json(response);
}

export function errorResponse<E = unknown>(
  resp: Response,
  message: string,
  error: E,
  data: [] = [],
) {
  const response: ErrorResponseType<E> = {
    status: false,
    message,
    error,
    data,
  };
  resp.status(201).json(response);
}
