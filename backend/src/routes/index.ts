import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import projectRoutes from "./projectRoutes";
import certificationRoutes from "./certificationRoutes";
import experienceRoutes from "./experienceRoutes";
import portfolioRoutes from "./portfolioRoutes";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    },
  });
});

router.use("/projects", projectRoutes);
router.use("/certifications", certificationRoutes);
router.use("/experiences", experienceRoutes);
router.use("/portfolio", portfolioRoutes);

export default router;
