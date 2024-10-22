import { USER_ROLE } from './user.constant';

export interface TUser {
  email: string;
  name: string;
  phone: string;
  password: string;
}

export type TUserRole = keyof typeof USER_ROLE;
