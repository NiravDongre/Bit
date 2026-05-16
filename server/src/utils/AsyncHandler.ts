import { Request, Response, NextFunction } from "express"
import logger from "./logger"
import CustomError from "./CustomError"

const AsyncHandler = ((fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
     Promise.resolve(fn(req, res, next)).catch(err => {
        logger.warn("The Error is " + err)
        next(new CustomError(400, `${err}`))
    })
    }

})

export default AsyncHandler