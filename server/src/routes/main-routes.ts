import { Router } from "express";
import { summary } from "./summary";

export const Inputs = Router();


Inputs.post("/transcript", summary)