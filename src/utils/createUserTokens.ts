import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../app/config";
import { isActive, IUser } from "../app/modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../app/modules/user/user.model";
import AppError from "../app/errorHelpers/AppError";
import { HttpStatus } from "http-status-ts";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.jwt_access_secret,
    envVars.jwt_expires_time
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.jwt_refresh_secret,
    envVars.jwt_refresh_time
  );

  return {
    refreshToken,
    accessToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedToken = verifyToken(
    refreshToken,
    envVars.jwt_refresh_secret
  ) as JwtPayload;
  const isUserExist = await User.findOne({ email: verifiedToken.email });
  if (!isUserExist) {
    throw new AppError(HttpStatus.BAD_REQUEST, "Email does not exist");
  }
  if (
    isUserExist.isActive === isActive.BLOCKED ||
    isUserExist.isActive === isActive.INACTIVE
  ) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      `User is ${isUserExist.isActive}`
    );
  }
  if (isUserExist.isDeleted) {
    throw new AppError(HttpStatus.BAD_REQUEST, "User is deleted");
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
  return accessToken;
};
