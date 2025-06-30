import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {type: String, required:false},
    role: { type: String, enum: ['admin', 'user'], default: 'user' },

  }, 
  {
    timestamps: true,
    versionKey: false
  }
);

export const User = model('User', userSchema);
