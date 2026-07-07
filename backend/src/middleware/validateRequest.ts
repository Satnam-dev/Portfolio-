import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

type ValidationRule = {
  field: string;
  required?: boolean;
  type?: "string" | "array" | "number" | "boolean";
  minLength?: number;
  url?: boolean;
};

export const validateBody =
  (rules: ValidationRule[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    for (const rule of rules) {
      const value = req.body[rule.field];

      if (rule.required && (value === undefined || value === null || value === "")) {
        errors.push(`${rule.field} is required`);
        continue;
      }

      if (value === undefined || value === null) continue;

      if (rule.type === "string" && typeof value !== "string") {
        errors.push(`${rule.field} must be a string`);
      }

      if (rule.type === "array" && !Array.isArray(value)) {
        errors.push(`${rule.field} must be an array`);
      }

      if (rule.type === "number" && typeof value !== "number") {
        errors.push(`${rule.field} must be a number`);
      }

      if (
        rule.minLength &&
        Array.isArray(value) &&
        value.length < rule.minLength
      ) {
        errors.push(`${rule.field} must have at least ${rule.minLength} item(s)`);
      }

      if (rule.url && value && typeof value === "string") {
        try {
          new URL(value);
        } catch {
          errors.push(`${rule.field} must be a valid URL`);
        }
      }
    }

    if (errors.length > 0) {
      throw new ApiError(400, "Validation failed", "VALIDATION_ERROR", errors);
    }

    next();
  };
