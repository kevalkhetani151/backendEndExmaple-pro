import { ActivityInput } from '../domain/types/activity';
import ActivityUseCases from '../usecases/activity.usecases';

export default class ActivityService {
  constructor(private activityMethods: ActivityUseCases) {}
  async createActivity(ActivityData: ActivityInput) {
    const createActivity = await this.activityMethods.create(ActivityData);
    return createActivity;
  }
  async findAllActivity() {
    return await this.activityMethods.findAll();
  }
  async updateuser(id: number, data: any) {
    await this.activityMethods.update(id, data);
  }
}
