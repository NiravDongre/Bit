import { Router } from "express";
import { Allfeatures } from "./features.route";
import { Auth } from "./auth.route";

export const Inputs = Router();


Inputs.post("/youtube-to-transcript", Allfeatures);
Inputs.post("/auth", Auth)