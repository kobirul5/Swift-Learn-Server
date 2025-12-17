import { IUser } from "../../module/users/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
