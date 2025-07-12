import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAstnc";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../../utils/sendResponse";
import { HttpStatus } from "http-status-ts";

const credentialsLogin = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "User Logged In Successfully",
      data: loginInfo,
    });
  }
);

export const AuthControllers = {
  credentialsLogin,
};
