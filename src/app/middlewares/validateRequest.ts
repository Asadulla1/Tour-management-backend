import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest =
  (fn: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await fn.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
