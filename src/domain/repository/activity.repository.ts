import { activity, ActivityInput } from '../types/activity';

export default interface IActivityRespository {
  create(activity: ActivityInput): Promise<activity>;
  findAll(): Promise<activity[]>;
  update(id: number, data: any): Promise<void>;
}
