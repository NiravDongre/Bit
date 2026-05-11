import { Request, Response, NextFunction } from "express"
import logger from "./logger"

const AsyncHandler = ((fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
     Promise.resolve(fn(req, res, next)).catch(err => logger.warn("The Error is " + err))
    }

})

export default AsyncHandler