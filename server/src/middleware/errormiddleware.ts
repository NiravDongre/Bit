
import { Request, Response } from "express";

export const errorMiddleware = (err: any,req: Request, res: Response) => {
    
    const statusCode: number = err.statusCode || 500;
    const Status: string = err.Status || "fail";
    const message: string = err.message || "Backend Crashed";

    return res.status(statusCode).json({Status, message})
}