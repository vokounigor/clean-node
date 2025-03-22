import { Schema, model, Document } from 'mongoose';
import { generateId } from '../../shared/id';

export interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      required: true,
      default: () => generateId('usr'),
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    strictQuery: 'throw',
    strict: 'throw',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const User = model<IUser>('User', userSchema);
