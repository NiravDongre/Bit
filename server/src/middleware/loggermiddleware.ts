import logger from "../utils/logger";
import { Request, Response, NextFunction } from "express";


export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const start =  Date.now();

    logger.info("Incoming request", {
    Method: req.method,
    url: req.originalUrl,
    ip: req.ip
    })

    res.on("finish", () => {
        logger.info("Request complete", {
            Method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${Date.now() - start}ms`
        })
    })

    next()
}

