import { Router } from "express";

export const Auth = Router();

Auth.post("/sign-up", Signup);
Auth.post("sign-in", SignIn);
Auth.post("/logout", Logout)