import { Router } from "express";
import { summary } from "./summary";
import { Auth } from "./auth";

export const Inputs = Router();


Inputs.post("/transcript", Allfeatures);
Inputs.post("/auth", Auth)