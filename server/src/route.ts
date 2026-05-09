import { Response, Request, NextFunction } from 'express';
import { fetchTranscript } from 'youtube-transcript';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from './config';
import AsyncHandler from './utils/AsyncHanlder';

export const transcript = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const Input: string = req.body.Input;

    const data = await fetchTranscript(Input)

    const transcript = data.map((items) => items.text).join(" ")

    const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY})

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Summerize this script: ${transcript}`
    })

    res.json({
        status: "success",
        data: response.text
    })
})