import { GoalStatus } from '../enums/goal-status.enum';
import { User } from '../../auth/interfaces/user.interface';

export interface Goal {
  id?: number
  title?: string;
  description?: string;
  status?: GoalStatus;
  user?: User;
  userId?: number;
}