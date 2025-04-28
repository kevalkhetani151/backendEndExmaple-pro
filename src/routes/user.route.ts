import { Router } from 'express';
import userController from '../controller/userController';
import verifyToken from '../middleware/verifyAuth';

const route = Router();

const usercontroller = new userController();

route.post('/signup', (req, resp, next) =>
  usercontroller.userRegistration(req, resp, next),
);
route.post('/login', (req, resp, next) =>
  usercontroller.userLogin(req, resp, next),
);
route.get('/users', (req, resp, next) =>
  usercontroller.filteruser(req, resp, next),
);

export { route as userRoute };
