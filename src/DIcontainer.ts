import ActivityService from './services/activity.services';
import userServices from './services/user.services';
import ActivityUseCases from './usecases/activity.usecases';
import useruseCases from './usecases/user.usecases';

export class DIcontainer {
  private static userRepo = new useruseCases();
  private static activity = new ActivityUseCases();
  static getAllusecases() {
    return this.userRepo;
  }
  static getuserRespo() {
    return new userServices(this.getAllusecases());
  }
  static getAllactivityusecases() {
    return this.activity;
  }
  static getactivityRespo() {
    return new ActivityService(this.getAllactivityusecases());
  }
}
