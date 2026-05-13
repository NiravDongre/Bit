import { Router } from "express";
import { Allfeatures } from "./features";
import { Auth } from "./auth";

export const Inputs = Router();


Inputs.post("/youtube-to-transcript", Allfeatures);
Inputs.post("/auth", Auth)