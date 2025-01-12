import { IUser, CreateUserDTO, UpdateUserDTO } from '../user.types';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}