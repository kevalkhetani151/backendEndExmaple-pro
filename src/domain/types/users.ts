import { user } from '../../generated/prisma';
import { Request } from 'express';

interface users extends user {}

interface userInputData {
  name: string;
  email: string;
  password: string;
  salt: string;
}

interface userLoginData {
  email: string;
  password: string;
}

interface UserRequest extends Request {
  user?: users;
}
interface userUpdateInput {
  name?: string;
  password?: string;
}
export { users, userInputData, userUpdateInput, userLoginData, UserRequest };
