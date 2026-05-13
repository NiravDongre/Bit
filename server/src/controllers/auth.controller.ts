import AsyncHandler from "../utils/AsyncHandler";
import { Request, Response, NextFunction } from "express";
import { SignupValidation } from "../validations/user.validation";
import CustomError from "../utils/CustomError";
import logger from "../utils/logger";
import Usermodel from "../models/auth.model";

export const Signup = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const createpayload = SignupValidation.safeParse(payload);

    if(!createpayload.success){
        logger.warn("Invalid Inputs");
        next(new CustomError(402, 'Invalid Inputs'))
    }
    
    const protecteduser = createpayload.data;

    const existeduser = await Usermodel.findOne({
        email: protecteduser?.email
    })

    if(existeduser){
        logger.info('User already exist')
        return res.status(200).json("User already exist")
    }

    try{
        
    const user = await Usermodel.create({
        username: protecteduser?.username,
        email: protecteduser?.email,
        password: protecteduser?.password
    })

    if(!user){
        return next(new CustomError(404, "Try Again"))
    }

    return res.status(201).json({
        message: "User Signed up"
    })
    } catch(err){
        logger.error("Invalid value entered " + err)
       return next(new CustomError(400, "Invalid error"))
    }
})

export const Signin = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {


})

export const Logout = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {


})


