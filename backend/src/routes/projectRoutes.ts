import { Router } from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { validateBody } from "../middleware/validateRequest";

const router = Router();

const projectValidation = validateBody([
  { field: "title", required: true, type: "string" },
  { field: "description", required: true, type: "string" },
  { field: "technologies", required: true, type: "array", minLength: 1 },
  { field: "githubUrl", url: true },
  { field: "liveDemoUrl", url: true },
]);

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", projectValidation, createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
