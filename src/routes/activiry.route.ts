import { Router } from 'express';
import userController from '../controller/userController';
import verifyToken from '../middleware/verifyAuth';
import ActivityController from '../controller/activityController';

const route = Router();

const Activitycontroller = new ActivityController();

route.post('/createActivity', verifyToken, (req, resp, next) =>
  Activitycontroller.createActivity(req, resp, next),
);

route.get('/findAllActivity', verifyToken, (req, resp, next) =>
  Activitycontroller.findallActivity(req, resp, next),
);

export { route as activityRoutes };
