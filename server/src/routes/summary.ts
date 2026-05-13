import { Router } from "express";
import { transcript } from "./features";

const Allfeatures = Router();

Allfeatures.post("/transcript", transcript);
Allfeatures.post("/summary", summary);
Allfeatures.post("/notes", notes)
