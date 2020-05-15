import { Goal } from '../../goals/interfaces/goal.interface';

export interface User {
  id?: number;
  username?: string;
  password?: string;
  salt?: string;
  goals?: Goal[];
}