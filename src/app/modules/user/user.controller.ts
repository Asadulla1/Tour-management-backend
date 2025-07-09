/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../../utils/catchAstnc";
import { HttpStatus } from "http-status-ts";
import { sendResponse } from "../../../utils/sendResponse";
// import AppError from "../../errorHelpers/AppError";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    // res.status(HttpStatus.OK).json({
    //   message: "User Successfully retrieved",
    //   success: true,
    //   data: users,
    // });
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "User retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const userController = {
  createUser,
  getAllUsers,
};
