import AsyncHandler from "../utils/AsyncHandler";
import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { SigninValidation, SignupValidation } from "../validations/user.validation";
import CustomError from "../utils/CustomError";
import logger from "../utils/logger";
import Usermodel from "../models/auth.model";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config";

export const Signup = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const payload = req.body;
    

    const createpayload = SignupValidation.safeParse(payload);

    if(!createpayload.success){
        logger.warn("Invalid Inputs");
        return next(new CustomError(400, `${createpayload.error.issues[0]?.message}`))
    }
    
    const protecteduser = createpayload.data;

    const hashpassword = await bcrypt.hash(protecteduser.password, 10)

    const existeduser = await Usermodel.findOne({
        email: protecteduser.email
    })

    if(existeduser){
        logger.info('User already exist')
        return res.status(200).json("User already exist")
    }

    try{

    const user = await Usermodel.create({
        username: protecteduser.username,
        email: protecteduser.email,
        password: hashpassword
    })

    if(!user){
        return next(new CustomError(404, "Try Again"))
    }

    const accesstoken = jsonwebtoken.sign(
        {id: user._id},
        String(ACCESS_TOKEN),
        {expiresIn: "15m"}
    ) 

    const refreshtoken = jsonwebtoken.sign(
        {id: user._id},
        String(REFRESH_TOKEN),
        {expiresIn: "7d"}
    )

    const options = {
        maxAge: 900000,
        httpOnly: true
    }

    res.cookie("accesstoken", accesstoken, options)
    res.cookie("refreshtoken", refreshtoken, options)

    user.refreshtoken = refreshtoken;
    await user.save();

    return res.status(201).json({
        message: "User Signed up"
    })


    } catch(err){
        logger.error("Invalid value entered ")
        return next(new CustomError(400, "Invalid error" + err))
    }
})

export const Signin = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const payload = req.body;

    const createpayload = SigninValidation.safeParse(payload);

    if(!createpayload.success){
        logger.warn("Invalid Inputs");
        return next(new CustomError(400, `${createpayload.error.issues[0]?.message}`))
    }
    
    const protecteduser = createpayload.data;

    const user = await Usermodel.findOne({
        username: protecteduser.username
    })

    if(!user){
        return next(new CustomError(404, "User not Found"))
    }

    const accesstoken = jsonwebtoken.sign(
        {id: user._id},
        String(ACCESS_TOKEN),
        {expiresIn: "15m"}
    ) 

    const refreshtoken = jsonwebtoken.sign(
        {id: user._id},
        String(REFRESH_TOKEN),
        {expiresIn: "7d"}
    )

    const options = {
        maxAge: 900000,
        httpOnly: true
    }

    res.cookie("accesstoken", accesstoken, options)
    res.cookie("refreshtoken", refreshtoken, options)

    user.refreshtoken = refreshtoken;
    await user.save();

    return res.status(201).json({
        message: "User Signed In"
    })

})

export const Logout = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");

    return res.status(200).json({
        message: "user has log-out"
    })
})


