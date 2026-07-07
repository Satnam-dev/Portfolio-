import { Request, Response } from "express";
import { PortfolioInfo } from "../models/PortfolioInfo";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/ApiError";

export const getPortfolio = asyncHandler(async (_req: Request, res: Response) => {
  const portfolio = await PortfolioInfo.findOne();
  if (!portfolio) throw new ApiError(404, "Portfolio info not found", "NOT_FOUND");
  res.json({ success: true, data: portfolio });
});

export const updatePortfolio = asyncHandler(async (req: Request, res: Response) => {
  let portfolio = await PortfolioInfo.findOne();

  if (!portfolio) {
    portfolio = await PortfolioInfo.create(req.body);
    res.status(201).json({ success: true, data: portfolio, message: "Portfolio created" });
    return;
  }

  Object.assign(portfolio, req.body);
  await portfolio.save();

  res.json({ success: true, data: portfolio, message: "Portfolio updated" });
});
