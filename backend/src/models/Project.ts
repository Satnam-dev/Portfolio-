import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  features: string[];
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveDemoUrl?: string | null;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    technologies: { type: [String], required: true, minlength: 1 },
    imageUrl: { type: String, default: "/images/projects/default.png" },
    githubUrl: { type: String },
    liveDemoUrl: { type: String, default: null },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ technologies: 1 });
projectSchema.index({ order: 1 });

export const Project = model<IProject>("Project", projectSchema);
