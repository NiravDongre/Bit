import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import CustomError from "../utils/CustomError";
import { ACCESS_TOKEN } from "../config";

interface JwtPayload {
    id: string,
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        
        const token = req.cookies.accesstoken;

        if(!token){
            logger.warn("Access Token required")
            return next(new CustomError(409, "Access Token required"))
        }

        const accessToken = String(ACCESS_TOKEN)

        const decode = jwt.verify(token, accessToken) as JwtPayload

        console.log(decode)

        req.userId = decode.id

        next()
    }catch(err){
        logger.error("At Auth middleware error caught " + err)
    }
}