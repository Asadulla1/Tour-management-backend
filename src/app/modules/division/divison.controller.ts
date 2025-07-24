import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAstnc";
import { divisionService } from "./divison.service";
import { sendResponse } from "../../../utils/sendResponse";

const createDivision = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divisionService.createDivision(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Division Created Successfully",
      data: result,
    });
  }
);

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
  const result = await divisionService.getAllDivisions();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Divisions retrieved",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await divisionService.getSingleDivision(slug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Divisions retrieved",
    data: result.data,
  });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await divisionService.updateDivision(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division updated",
    data: result,
  });
});
const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await divisionService.deleteDivision(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division deleted",
    data: result,
  });
});
export const divisionController = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
