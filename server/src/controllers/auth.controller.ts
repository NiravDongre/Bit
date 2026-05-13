import AsyncHandler from "../utils/AsyncHandler";
import { Request, Response, NextFunction } from "express";


const Signup = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    
})

const Signin = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {


})

const Logout = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {


})


export default { Signup, Signin, Logout }