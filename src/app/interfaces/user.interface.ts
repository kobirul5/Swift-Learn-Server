
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?:string
  role: 'admin' | 'user';
}