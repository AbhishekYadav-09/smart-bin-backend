import express from "express"
const router = express.Router();
import { registerBin, updateFillLevel, getAllBins } from "../controllers/bin.controllers.js";

// Deployment-time registration
router.post("/register", registerBin);

// IoT device fillLevel update
router.put("/:binId/fill-level", updateFillLevel);

// Get all bins
router.get("/", getAllBins);

export default router
