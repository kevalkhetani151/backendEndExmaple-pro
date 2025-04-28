import express, {
  Express,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import env from 'dotenv';
import { errorHandler } from './middleware/ErrorHandler';
import { userRoute } from './routes/user.route';
import cors from 'cors';
import verifyToken from './middleware/verifyAuth';
import path from 'path';
import { activityRoutes } from './routes/activiry.route';
env.config();
const app: Express = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '/public/')));
console.log(path.join(__dirname, '/public'));
app.get(
  '/',
  verifyToken,
  (req: Request, resp: Response, next: NextFunction) => {
    resp.send('server is up and running');
  },
);
app.use('/user', userRoute);
app.use('/activity', activityRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is up and running on ${PORT}`);
});
