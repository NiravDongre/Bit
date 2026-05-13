import { Router } from "express";
import { summary } from "./summary";
import { Auth } from "./auth";

export const Inputs = Router();


Inputs.post("/transcript", summary);
Inputs.post("/auth", Auth)