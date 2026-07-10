import { Schema, model, Document } from "mongoose";

export interface IEducation {
  degree: string;
  institution: string;
  status: string;
}

export interface ISkills {
  programming: string[];
  web: string[];
  database: string[];
  tools: string[];
}

export interface ISocialLinks {
  github: string;
  linkedin?: string | null;
  email?: string | null;
}

export interface IStats {
  projectsCount: number;
  skillsCount: number;
  certificationsCount: number;
}

export interface IPortfolioInfo extends Document {
  name: string;
  title: string;
  tagline: string;
  about: string;
  education: IEducation;
  roles: string[];
  skills: ISkills;
  softSkills: string[];
  socialLinks: ISocialLinks;
  resumeUrl: string;
  stats: IStats;
  updatedAt: Date;
}

const portfolioInfoSchema = new Schema<IPortfolioInfo>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    about: { type: String, required: true },
    education: {
      degree: { type: String, required: true },
      institution: { type: String, default: "" },
      status: { type: String, required: true },
    },
    roles: [{ type: String }],
    skills: {
      programming: [{ type: String }],
      web: [{ type: String }],
      database: [{ type: String }],
      tools: [{ type: String }],
    },
    softSkills: [{ type: String }],
    socialLinks: {
      github: { type: String, required: true },
      linkedin: { type: String, default: null },
      email: { type: String, default: null },
    },
    resumeUrl: { type: String, default: "/resume/Satnam%20Kumar.pdf.pdf" },
    stats: {
      projectsCount: { type: Number, default: 0 },
      skillsCount: { type: Number, default: 0 },
      certificationsCount: { type: Number, default: 0 },
    },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export const PortfolioInfo = model<IPortfolioInfo>(
  "PortfolioInfo",
  portfolioInfoSchema
);
