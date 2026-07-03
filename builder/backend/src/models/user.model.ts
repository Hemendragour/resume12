import mongoose, { Schema, Document } from "mongoose";

export const UserRoles = {
  USER: "user",
  ADMIN: "admin",
} as const;

export const UserStatus = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
} as const;

export type UserRole = typeof UserRoles[keyof typeof UserRoles];

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;       
  status: "active" | "suspended";    // Best practice - using type
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.USER,
    },

    status: {
  type: String,
  enum: Object.values(UserStatus),
  default: UserStatus.ACTIVE,
},
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);