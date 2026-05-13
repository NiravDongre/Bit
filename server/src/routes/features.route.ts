import { Router } from "express";
import { notes, summary, transcript } from "../controllers/features.controller";
import { authMiddleware } from "../middleware/authmiddleware";

export const Allfeatures = Router();

Allfeatures.post("/transcript", authMiddleware ,transcript);
Allfeatures.post("/summary", summary);
Allfeatures.post("/notes", notes)
