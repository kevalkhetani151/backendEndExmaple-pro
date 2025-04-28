import {
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
} from 'date-fns';
import prisma from '../config/db.config';
import IuserRespository from '../domain/repository/user.respository';
import { userInputData, users, userUpdateInput } from '../domain/types/users';
import { customeError } from '../utils/customeError';

export default class useruseCases implements IuserRespository {
  create(user: userInputData): Promise<users> {
    return prisma.user.create({
      data: user,
    });
  }
  findAll(): Promise<users[]> {
    throw new customeError('Method not implemented.', 404);
  }
  findById(id: string): Promise<users> {
    throw new customeError('Method not implemented.', 404);
  }
  update(id: string, data: userUpdateInput): Promise<users> {
    throw new customeError('Method not implemented.', 404);
  }
  delete(id: string): Promise<string> {
    throw new customeError('Method not implemented.', 404);
  }
  findByEmail(email: string): Promise<users | null> {
    return prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
  async filterUser(userId?: number, filter?: string): Promise<users[]> {
    console.log('user id is here', userId);
    console.log('filter is here', filter);
    const now = new Date();
    let gte: Date | undefined;
    let lte: Date | undefined;

    if (filter) {
      if (filter === 'day') {
        gte = startOfDay(now);
        lte = endOfDay(now);
      } else if (filter === 'month') {
        gte = startOfMonth(now);
        lte = endOfMonth(now);
      } else if (filter === 'year') {
        gte = startOfYear(now);
        lte = endOfYear(now);
      }
    }

    const whereCondition: any = {};

    if (gte && lte) {
      whereCondition.lastupdated = {
        gte,
        lte,
      };
    }

    if (userId) {
      whereCondition.user_id = userId;
    }

    const finalWhere =
      Object.keys(whereCondition).length > 0 ? whereCondition : undefined;

    const leaderboard = await prisma.user.findMany({
      where: finalWhere,
      orderBy: {
        totalpoints: 'desc',
      },
    });
    console.log('user responce is comming');
    console.log(leaderboard);

    return await leaderboard;
  }
}
