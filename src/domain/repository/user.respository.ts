import { userInputData, user, users, userUpdateInput } from '../types/users';

export default interface IuserRespository {
  create(user: userInputData): Promise<users>;
  findAll(): Promise<users[]>;
  findById(id: string): Promise<users>;
  update(id: string, data: userUpdateInput): Promise<users>;
  delete(id: string): Promise<string>;
  findByEmail(email: string): Promise<users | null>;
}
