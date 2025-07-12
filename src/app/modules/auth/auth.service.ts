import { generateToken } from "./../../../utils/jwt";
import { HttpStatus } from "http-status-ts";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { compare } from "bcrypt-ts";

import { envVars } from "../../config";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(HttpStatus.BAD_REQUEST, "Email does not exist");
  }
  const isPasswordMatched = await compare(
    password as string,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new AppError(HttpStatus.BAD_REQUEST, "Incorrect Password");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.jwt_access_secret,
    envVars.jwt_expires_time
  );

  return {
    accessToken,
  };
};

//  user -login -> token(email,role,_id) -> booking/payment/payment cancel -> token

export const AuthServices = {
  credentialsLogin,
};
