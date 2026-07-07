import { Router } from "express";
import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController";
import { validateBody } from "../middleware/validateRequest";

const router = Router();

const experienceValidation = validateBody([
  { field: "title", required: true, type: "string" },
  { field: "description", required: true, type: "string" },
]);

router.get("/", getExperiences);
router.get("/:id", getExperience);
router.post("/", experienceValidation, createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

export default router;
