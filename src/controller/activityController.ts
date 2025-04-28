import prisma from '../config/db.config';
import { DIcontainer } from '../DIcontainer';
import { UserRequest } from '../domain/types/users';
import { customeError } from '../utils/customeError';
import { successResponse } from '../utils/responce';
import { Request, Response, NextFunction } from 'express';

class ActivityController {
  private userService = DIcontainer.getactivityRespo();

  async createActivity(req: UserRequest, resp: Response, next: NextFunction) {
    try {
      const Requser = req.user;
      console.log('user is comming inside activity');
      console.log(Requser);
      const activity = await this.userService.createActivity({
        ...req.body,
        user_id: Requser?.user_id,
      });
      await prisma.user.update({
        data: {
          totalpoints: {
            increment: 20,
          },
          lastupdated: new Date(),
        },
        where: {
          user_id: activity.user_id,
        },
      });
      successResponse<any>(resp, 'activity create sucessfully', activity);
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
  async findallActivity(req: Request, resp: Response, next: NextFunction) {
    try {
      const user = await this.userService.findAllActivity();
      successResponse<any>(resp, 'find all activity', user);
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

export default ActivityController;
