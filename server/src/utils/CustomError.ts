

class CustomError extends Error{
    statusCode: number
    Status: string
    isOperational: boolean


    constructor(statusCode: number, message: string){
        super(message);
        this.statusCode = statusCode;
        this.Status = statusCode >= 400 || statusCode < 500 ? "fail" : "error"
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

export default CustomError