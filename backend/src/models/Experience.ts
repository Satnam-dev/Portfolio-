import { Schema, model, Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  organization?: string;
  type: "training" | "internship" | "work";
  currentLevel?: string;
  status: "current" | "completed";
  startDate: Date;
  endDate?: Date | null;
  learning: string[];
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    type: {
      type: String,
      enum: ["training", "internship", "work"],
      default: "training",
    },
    currentLevel: { type: String },
    status: {
      type: String,
      enum: ["current", "completed"],
      default: "current",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    learning: [{ type: String }],
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.index({ status: 1 });
experienceSchema.index({ order: 1 });

export const Experience = model<IExperience>("Experience", experienceSchema);
