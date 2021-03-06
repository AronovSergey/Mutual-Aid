import { IBlogEntry } from './blog-entry.interface';
import { UserRole } from '@mutual-aid/enums';

export interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  profileImage?: string;
  blogEntries?: IBlogEntry[];
}
