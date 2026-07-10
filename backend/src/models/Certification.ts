import { Schema, model, Document } from "mongoose";

export interface ICertification extends Document {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  certificateUrl: string;
  downloadUrl: string;
  issuer: string;
  issuedDate: Date;
  course?: string;
  startDate?: Date;
  endDate?: Date;
  partner?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const certificationSchema = new Schema<ICertification>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    certificateUrl: { type: String, required: true },
    downloadUrl: { type: String, required: true },
    issuer: { type: String, required: true },
    issuedDate: { type: Date, required: true },
    course: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    partner: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

certificationSchema.index({ order: 1 });

export const Certification = model<ICertification>(
  "Certification",
  certificationSchema
);
