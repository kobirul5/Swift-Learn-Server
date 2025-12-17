import { IUser } from "../../users/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
