import { Router } from "express";
import {
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certificationController";
import { validateBody } from "../middleware/validateRequest";

const router = Router();

const certificationValidation = validateBody([
  { field: "name", required: true, type: "string" },
  { field: "description", required: true, type: "string" },
  { field: "imageUrl", required: true, type: "string" },
  { field: "certificateUrl", required: true, type: "string" },
  { field: "downloadUrl", required: true, type: "string" },
  { field: "issuer", required: true, type: "string" },
]);

router.get("/", getCertifications);
router.get("/:id", getCertification);
router.post("/", certificationValidation, createCertification);
router.put("/:id", updateCertification);
router.delete("/:id", deleteCertification);

export default router;
