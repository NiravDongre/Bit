import { Router } from "express";
import { Allfeatures } from "./features.route";
import { Auth } from "./auth.route";

export const Inputs = Router();


Inputs.use("/youtube-to-transcript", Allfeatures);
Inputs.use("/auth", Auth)