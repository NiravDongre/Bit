import { Response, Request, NextFunction } from 'express';
import { fetchTranscript } from 'youtube-transcript';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from '../config';
import AsyncHandler from '../utils/AsyncHandler';
import UrlPack from '../models/transcript';
import CustomError from '../utils/CustomError';
import logger from '../utils/logger';

export const summary = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const Input: string = req.body.Input;

    logger.info("Attempting to Parse Url")

    if(!Input){
        logger.warn("Youtube url required")
        throw next(new CustomError(404, "Youtube url not inserted"))
    }

    const data = await fetchTranscript(Input)

    const transcript = data.map((items) => items.text).join(" ")

    const pack = await UrlPack.create({
        Input,
        Summary: transcript
    })

    return res.status(201).json({
        status: "success",
        data: data
    })
})