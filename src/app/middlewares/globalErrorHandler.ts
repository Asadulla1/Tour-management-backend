/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config";
import AppError from "../errorHelpers/AppError";
import { handleDuplicateError } from "../helpers/handleDuplicateErrors";
import { handleCastError } from "../helpers/handleCastError";
import { handlerZodError } from "../helpers/handlerZodError";
import { TErrorSources } from "../interfaces/error.type";
import { handleValidationError } from "../helpers/handleValidationError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = `Something Went Wrong!!${err.message}`;

  // Duplicate Error
  if (err.code === 1100) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // object ID error / Cast Error
  else if (err.name === "CastError") {
    const simplifiedError = handleCastError();
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  // Zod Error
  else if (err.name === "ZodError") {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }

  // Mongoose Validation Error
  else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorSources = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
  }
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    err,
    stack: envVars.node_env === "development" ? err.stack : null,
  });
};
