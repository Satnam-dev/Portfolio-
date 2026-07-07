import { Request, Response } from "express";
import slugify from "slugify";
import mongoose from "mongoose";
import { Certification } from "../models/Certification";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/ApiError";

const findCertification = async (id: string) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const byId = await Certification.findById(id);
    if (byId) return byId;
  }
  return Certification.findOne({ slug: id });
};

export const getCertifications = asyncHandler(async (_req: Request, res: Response) => {
  const certifications = await Certification.find().sort({ order: 1, issuedDate: -1 });
  res.json({ success: true, data: certifications });
});

export const getCertification = asyncHandler(async (req: Request, res: Response) => {
  const certification = await findCertification(String(req.params.id));
  if (!certification) throw new ApiError(404, "Certification not found", "NOT_FOUND");
  res.json({ success: true, data: certification });
});

export const createCertification = asyncHandler(async (req: Request, res: Response) => {
  const slug =
    req.body.slug ||
    slugify(req.body.name, { lower: true, strict: true });

  const certification = await Certification.create({ ...req.body, slug });
  res.status(201).json({ success: true, data: certification, message: "Certification created" });
});

export const updateCertification = asyncHandler(async (req: Request, res: Response) => {
  const certification = await findCertification(String(req.params.id));
  if (!certification) throw new ApiError(404, "Certification not found", "NOT_FOUND");

  if (req.body.name && !req.body.slug) {
    req.body.slug = slugify(req.body.name, { lower: true, strict: true });
  }

  Object.assign(certification, req.body);
  await certification.save();

  res.json({ success: true, data: certification, message: "Certification updated" });
});

export const deleteCertification = asyncHandler(async (req: Request, res: Response) => {
  const certification = await findCertification(String(req.params.id));
  if (!certification) throw new ApiError(404, "Certification not found", "NOT_FOUND");

  await certification.deleteOne();
  res.json({ success: true, message: "Certification deleted" });
});
