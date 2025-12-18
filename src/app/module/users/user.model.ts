import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
    otp: { type: Number, default: 0 },
    otpExpiresAt: { type: Date, default: null },
    isVerifyEmail: { type: Boolean, default: false },
    fcmToken: { type: String, default: "" },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '2d' }
  )
}

export const User = model('User', userSchema);
