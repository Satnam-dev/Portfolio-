import { RequestHandler } from "express";

export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: unknown[];

  constructor(
    statusCode: number,
    message: string,
    code = "INTERNAL_ERROR",
    details?: unknown[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
