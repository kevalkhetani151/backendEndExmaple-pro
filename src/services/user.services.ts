import prisma from '../config/db.config';
import { userInputData, userLoginData } from '../domain/types/users';
import useruseCases from '../usecases/user.usecases';
import { customeError } from '../utils/customeError';
import Encryptpassword from '../utils/encryptpasswors';
import JwtToken from '../utils/JwtToken';
import _ from 'lodash';

class userServices {
  constructor(private userMethods: useruseCases) {}
  async userRegistration(userData: userInputData) {
    const isAvilable = await this.userMethods.findByEmail(userData.email);
    if (isAvilable) {
      throw new customeError('user is already register', 202);
    }
    const { password, salt } = Encryptpassword.Encryptpassword(
      userData.password,
    );
    const createUser = await this.userMethods.create({
      ...userData,
      password: password,
      salt: salt,
    });
    const newdata = _.omit(createUser, [
      'createdAt',
      'password',
      'salt',
      'updatedAt',
      'deletedAt',
    ]);
    return newdata;
  }

  async userLogin(userData: userLoginData) {
    const isavilable = await this.userMethods.findByEmail(userData.email);
    const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

    if (!isavilable) {
      throw new customeError('user is not register please register first', 404);
    }
    const password = Encryptpassword.DycryptPassword(
      isavilable.password,
      userData.password,
      isavilable.salt,
    );
    if (!password) {
      throw new customeError('invalid creeaditioals', 500);
    }
    const token = JwtToken.createJwt(
      {
        id: isavilable.id,
        user_id: isavilable.user_id,
        name: isavilable.name,
        email: isavilable.email,
        Role: isavilable.Role,
      },
      JWT_SECRETKEY || '',
      {},
    );
    const newdata = _.omit(isavilable, [
      'createdAt',
      'password',
      'salt',
      'updatedAt',
      'deletedAt',
    ]);
    return {
      ...newdata,
      token: token,
    };
  }

  async filterUser(id?: number, filter?: string) {
    return await this.userMethods.filterUser(id, filter);
  }
}

export default userServices;
