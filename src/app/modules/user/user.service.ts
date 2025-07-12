import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { hash } from "bcrypt-ts";
import AppError from "../../errorHelpers/AppError";
import { HttpStatus } from "http-status-ts";
import bcrypt from "bcrypt-ts";
const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("User Already Exist");
  }

  // hashing the password
  const hashedPassword = await hash(
    password as string,
    Number(envVars.bcrypt_salt_round)
  );
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUserCount = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUserCount,
    },
  };
};

const UpdateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  /*
   * email can not be updated --> so remove it from zod verification so that it couldn't be in the payload
   * name,phone,address ...
   * password --> rehashing
   * only can done by super admin -> role,isDeleted
   */
  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new AppError(HttpStatus.NOT_FOUND, "User Not Found");
  }
  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(HttpStatus.FORBIDDEN, "You are not authorized");
    }
    if (payload.role === Role.SUPERADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(HttpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(envVars.bcrypt_salt_round)
    );
  }
  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedUser;
};

export const UserServices = {
  createUser: createUserService,
  getAllUsers,
  UpdateUser,
};
