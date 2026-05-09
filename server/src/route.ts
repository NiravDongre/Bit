import { Response, Request, NextFunction } from 'express';
import { fetchTranscript } from 'youtube-transcript';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from './config';
import AsyncHandler from './utils/AsyncHanlder';
import UrlPack from './db/model';
import CustomError from './utils/CustomError';
import logger from './utils/logger';

export const summary = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const Input: string = req.body.Input;

    logger.info("Attempting to Parse Url")

    if(!Input){
        logger.warn("Youtube url required")
        throw next(new CustomError(404, "Youtube url not inserted"))
    }

    const data = await fetchTranscript(Input)

    const transcript = data.map((items) => items.text).join(" ")

    const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY})

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Summerize this script in English only English: ${transcript}`
    })

    if(!response){
        logger.warn("Ai failed or retry")
        throw next(new CustomError(400, "didn't got response or the Ai failed at it"))
    }

    const pack = await UrlPack.create({
        Input,
        Summary: response.text
    })

    return res.status(201).json({
        status: "success",
        data: pack.Summary
    })
})