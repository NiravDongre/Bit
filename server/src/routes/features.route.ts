import { Router } from "express";
import { notes, summary, transcript } from "../controllers/features.controller";
import { authMiddleware } from "../middleware/authmiddleware";

export const Allfeatures = Router();

Allfeatures.post("/transcript", transcript);
Allfeatures.post("/summary", authMiddleware,summary);
Allfeatures.post("/notes", authMiddleware ,notes)
