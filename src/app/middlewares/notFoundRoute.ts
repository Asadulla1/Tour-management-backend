import { Request, Response } from "express";
import { HttpStatus } from "http-status-ts";

export const notFoundROute = (req: Request, res: Response) => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
  });
};
