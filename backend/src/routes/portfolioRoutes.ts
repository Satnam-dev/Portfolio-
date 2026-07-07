import { Router } from "express";
import { getPortfolio, updatePortfolio } from "../controllers/portfolioController";

const router = Router();

router.get("/", getPortfolio);
router.put("/", updatePortfolio);

export default router;
