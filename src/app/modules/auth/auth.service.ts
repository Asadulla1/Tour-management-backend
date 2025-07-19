import {
  createNewAccessTokenWithRefreshToken,
  // createUserTokens,
} from "./../../../utils/createUserTokens";

import { HttpStatus } from "http-status-ts";
import AppError from "../../errorHelpers/AppError";
// import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { compare } from "bcrypt-ts";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config";
import bcrypt from "bcrypt-ts";
// const credentialsLogin = async (payload: Partial<IUser>) => {
//   const { email, password } = payload;
//   const isUserExist = await User.findOne({ email });
//   if (!isUserExist) {
//     throw new AppError(HttpStatus.BAD_REQUEST, "Email does not exist");
//   }
//   const isPasswordMatched = await compare(
//     password as string,
//     isUserExist.password
//   );
//   if (!isPasswordMatched) {
//     throw new AppError(HttpStatus.BAD_REQUEST, "Incorrect Password");
//   }
//   const userToken = createUserTokens(isUserExist);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { password: pass, ...rest } = isUserExist.toObject();

//   return {
//     accessToken: userToken.accessToken,
//     refreshToken: userToken.refreshToken,
//     user: rest,
//   };
// };
const getNewAccessToken = async (refreshToken: string) => {
  const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
  return {
    accessToken,
  };
};

const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const userId = decodedToken.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(HttpStatus.BAD_REQUEST, "User Doesn't exist");
  }

  const isPasswordMatched = await compare(oldPassword, user.password);
  if (!isPasswordMatched) {
    throw new AppError(HttpStatus.UNAUTHORIZED, "Old Password does not match");
  }
  user.password = await bcrypt.hash(
    newPassword,
    Number(envVars.bcrypt_salt_round)
  );
  user.save();
};

//  user -login -> token(email,role,_id) -> booking/payment/payment cancel -> token

export const AuthServices = {
  // credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
