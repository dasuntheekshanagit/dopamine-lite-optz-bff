export enum UserRole {
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
  GUEST = 'GUEST'
}

export interface IUser {
  userID: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserDTO = Omit<IUser, 'userID' | 'createdAt' | 'updatedAt' | 'lastLogin'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;