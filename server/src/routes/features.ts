import { Router } from "express";
import { notes, summary, transcript } from "../controllers/features";

export const Allfeatures = Router();

Allfeatures.post("/transcript", transcript);
Allfeatures.post("/summary", summary);
Allfeatures.post("/notes", notes)
