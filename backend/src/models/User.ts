import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // 앞뒤 공백 `제거`
    match: [
      /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      'Please fill a valid email address',
    ], // 이메일 형식 유효성 검사
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  profile: {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
  },
});

export default mongoose.model<IUser>('User', UserSchema);
