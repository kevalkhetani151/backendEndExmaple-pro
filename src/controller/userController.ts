import { NextFunction, Response, Request } from 'express';
import { DIcontainer } from '../DIcontainer';
import { customeError } from '../utils/customeError';
import { successResponse } from '../utils/responce';
import { userInputData, UserRequest } from '../domain/types/users';
import registarionSchema from '../validation/register.validatoion';

import _ from 'lodash';

class userController {
  private userService = DIcontainer.getuserRespo();
  public async userRegistration(
    req: Request,
    resp: Response,
    next: NextFunction,
  ) {
    try {
      await registarionSchema.validate(req.body);
      const user = await this.userService.userRegistration(req.body);
      successResponse<any>(resp, 'userCreated successfully', user);
    } catch (error) {
      if (error instanceof customeError) {
        next(
          error instanceof customeError
            ? error
            : new customeError('An unexpected error occurred', 500),
        );
      }
    }
  }
  public async userLogin(req: Request, resp: Response, next: NextFunction) {
    try {
      const user = await this.userService.userLogin(req.body);
      successResponse<any>(resp, 'user Login sucessfuly', user);
    } catch (error) {
      if (error instanceof customeError) {
        next(
          error instanceof customeError
            ? error
            : new customeError('An unexpected error occurred', 500),
        );
      }
    }
  }
  public async filteruser(
    req: UserRequest,
    resp: Response,
    next: NextFunction,
  ) {
    try {
      const { filter, userId } = req.query;
      const users = await this.userService.filterUser(
        userId ? Number(userId) : undefined,
        filter ? String(filter) : undefined,
      );

      successResponse<any>(resp, 'user Login sucessfuly', users);
    } catch (error) {
      if (error instanceof customeError) {
        next(
          error instanceof customeError
            ? error
            : new customeError('An unexpected error occurred', 500),
        );
      }
    }
  }
}

export default userController;
