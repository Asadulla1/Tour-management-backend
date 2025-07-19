import { Types } from "mongoose";

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}
export enum isActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export enum Role {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: isActive;
  isVerified?: boolean;
  role: Role;
  auths: IAuthProvider[];
  bookings: Types.ObjectId[];
  guides: Types.ObjectId[];
}
