import { Request, Response } from "express";
import slugify from "slugify";
import mongoose from "mongoose";
import { Project } from "../models/Project";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/ApiError";

const findProject = async (id: string) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const byId = await Project.findById(id);
    if (byId) return byId;
  }
  return Project.findOne({ slug: id });
};

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const { search, technology, featured } = req.query;
  const filter: Record<string, unknown> = {};

  if (search && typeof search === "string") {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (technology && typeof technology === "string") {
    filter.technologies = technology;
  }

  if (featured !== undefined) {
    filter.featured = featured === "true";
  }

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

  res.json({ success: true, data: projects });
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await findProject(String(req.params.id));
  if (!project) throw new ApiError(404, "Project not found", "NOT_FOUND");
  res.json({ success: true, data: project });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const slug =
    req.body.slug ||
    slugify(req.body.title, { lower: true, strict: true });

  const project = await Project.create({ ...req.body, slug });
  res.status(201).json({ success: true, data: project, message: "Project created" });
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await findProject(String(req.params.id));
  if (!project) throw new ApiError(404, "Project not found", "NOT_FOUND");

  if (req.body.title && !req.body.slug) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }

  Object.assign(project, req.body);
  await project.save();

  res.json({ success: true, data: project, message: "Project updated" });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await findProject(String(req.params.id));
  if (!project) throw new ApiError(404, "Project not found", "NOT_FOUND");

  await project.deleteOne();
  res.json({ success: true, message: "Project deleted" });
});
