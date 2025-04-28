import prisma from '../config/db.config';
import IActivityRespository from '../domain/repository/activity.repository';
import { ActivityInput, activity } from '../domain/types/activity';

export default class ActivityUseCases implements IActivityRespository {
  async update(id: number, data: any): Promise<void> {
    await prisma.user.update({
      data: data,
      where: {
        user_id: id,
      },
    });
  }
  async create(activity: ActivityInput): Promise<activity> {
    return await prisma.activity.create({
      data: activity,
    });
  }
  async findAll(): Promise<activity[]> {
    return await prisma.activity.findMany();
  }
}
