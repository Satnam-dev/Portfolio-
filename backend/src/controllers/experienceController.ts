import { Request, Response } from "express";
import mongoose from "mongoose";
import { Experience } from "../models/Experience";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/ApiError";

const findExperience = async (id: string) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Experience.findById(id);
  }
  return null;
};

export const getExperiences = asyncHandler(async (_req: Request, res: Response) => {
  const experiences = await Experience.find().sort({ order: 1, startDate: -1 });
  res.json({ success: true, data: experiences });
});

export const getExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await findExperience(String(req.params.id));
  if (!experience) throw new ApiError(404, "Experience not found", "NOT_FOUND");
  res.json({ success: true, data: experience });
});

export const createExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await Experience.create(req.body);
  res.status(201).json({ success: true, data: experience, message: "Experience created" });
});

export const updateExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await findExperience(String(req.params.id));
  if (!experience) throw new ApiError(404, "Experience not found", "NOT_FOUND");

  Object.assign(experience, req.body);
  await experience.save();

  res.json({ success: true, data: experience, message: "Experience updated" });
});

export const deleteExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await findExperience(String(req.params.id));
  if (!experience) throw new ApiError(404, "Experience not found", "NOT_FOUND");

  await experience.deleteOne();
  res.json({ success: true, message: "Experience deleted" });
});
