import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import CustomError from "../utils/CustomError";
import { ACCESS_TOKEN } from "../config";

interface JwtPayload {
    id: string
}

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    try{
        
        const token = req.cookies.accesstoken;

        console.log(token);

        if(!token){
            logger.warn("Access Token required")
            return next(new CustomError(409, "Access Token required"))
        }

        const decode = jwt.verify(token, String(ACCESS_TOKEN)) as JwtPayload

        console.log(decode)

        req.userId = decode.id

        next()
    }catch(err){
        logger.error("At Auth middleware error caught " + err)
    }
}