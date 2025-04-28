import { Activity } from '../../generated/prisma';

export interface activity extends Activity {}

export interface ActivityInput {
  name: string;
  user_id: number;
}
