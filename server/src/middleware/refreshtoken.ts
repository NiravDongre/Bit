import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken"
import logger from "../utils/logger";
import CustomError from "../utils/CustomError";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config";
import Usermodel from "../models/auth.model";

interface JwtPayload {
    id: string
}

export const refreshtoken = async(req:Request, res: Response, next:NextFunction) => {

    try{
    const token = req.cookies.refreshtoken;

    console.log(token);

    if(!token){
        logger.warn("refresh token required");
        return next(new CustomError(409, "refresh token required"))
    }

    const refreshToken = String(REFRESH_TOKEN)

    const decode = Jwt.verify(token, refreshToken) as JwtPayload

    const matchedtoken = await Usermodel.findById(decode.id);

    if(!matchedtoken){
        return next(new CustomError(404, "User not found"))
    }

    if(matchedtoken.refreshtoken === token){

    const accesstoken = Jwt.sign({id: matchedtoken?._id}, String(ACCESS_TOKEN),{ expiresIn: "15m"});
    const refreshtoken = Jwt.sign({id: matchedtoken?._id}, String(REFRESH_TOKEN),{ expiresIn: "7d"});

    const options = {
        maxAge: 900000,
        httpOnly: true
    }

    res.cookie("accesstoken", accesstoken, options)
    res.cookie("refreshtoken", refreshtoken, options)

    matchedtoken.refreshtoken = refreshtoken;
    await matchedtoken.save();

    return res.status(200).json({
        message: "The refresh token gotten"
    })
    }

    return next(new CustomError(404, "Refresh token Invalid"))

    }catch(err){
        logger.error("At Refresh middleware caught " + err);
        return next(new CustomError(400, "Try re-login"))
    }
}