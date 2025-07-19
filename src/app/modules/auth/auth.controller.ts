/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAstnc";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../../utils/sendResponse";
import { HttpStatus } from "http-status-ts";
import { setAuthCookie } from "../../../utils/setCookie";
import AppError from "../../errorHelpers/AppError";
import { createUserTokens } from "../../../utils/createUserTokens";
import { envVars } from "../../config";
import passport from "passport";
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await AuthServices.credentialsLogin(req.body);
    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    // });
    // res.cookie("accessToken", loginInfo.accessToken, {
    //   httpOnly: true,
    //   secure: false,
    // });
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(401, err));
      }
      if (!user) {
        return next(new AppError(401, info.message));
      }
      const userTokens = await createUserTokens(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: pass, ...rest } = user.toObject();
      setAuthCookie(res, userTokens);
      sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "User Logged In Successfully",
        data: {
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);
  }
);

const getNewAccessToken = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    // const refreshToken = req.headers.authorization;
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = await AuthServices.getNewAccessToken(
      refreshToken as string
    );
    setAuthCookie(res, tokenInfo);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "New Access Token Retrieved Successfully",
      data: tokenInfo,
    });
  }
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logOut = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "User Logged Out Successfully",
    data: null,
  });
};

const resetPassword = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  const decodedToken = req.user;

  await AuthServices.resetPassword(
    oldPassword,
    newPassword,
    decodedToken as JwtPayload
  );
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Password Changed Successfully",
    data: null,
  });
};
const googleCallBackController = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, "User Not Found");
  }
  let redirectTo = req.query.state ? (req.query.state as string) : "";
  if (redirectTo.startsWith("/")) {
    redirectTo = redirectTo.slice(1);
  }
  const tokenInfo = createUserTokens(user);
  setAuthCookie(res, tokenInfo);
  res.redirect(`${envVars.frontend_url}/${redirectTo}`);
  // sendResponse(res, {
  //   success: true,
  //   statusCode: HttpStatus.OK,
  //   message: "Password Changed Successfully",
  //   data: tokenInfo,
  // });
};

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logOut,
  resetPassword,
  googleCallBackController,
};
