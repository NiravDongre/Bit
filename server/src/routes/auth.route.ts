import { Router } from "express";
import { Logout, Signin, Signup }  from '../controllers/auth.controller'

export const Auth = Router();

Auth.post("/sign-up", Signup);
Auth.post("sign-in", Signin);
Auth.post("/logout", Logout)