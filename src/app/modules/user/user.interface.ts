import { Types } from "mongoose";

export interface IAuthProvider {
  provider: string;
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
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: isActive;
  isVerified?: string;
  role: Role;
  auths: IAuthProvider[];
  bookings: Types.ObjectId[];
  guides: Types.ObjectId[];
}
