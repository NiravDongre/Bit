import { Response, Request, NextFunction } from 'express';
import { fetchTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config';
import AsyncHandler from '../utils/AsyncHandler';
import UrlPack from '../models/transcript.model';
import CustomError from '../utils/CustomError';
import logger from '../utils/logger';
import SummaryPack from '../models/summary.model';
import NotePack from '../models/note.model';


export const transcript = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const Input: string = req.body.Input;

    logger.info("Attempting to Parse Url")

    if(!Input){
        logger.warn("Youtube url required")
        throw next(new CustomError(404, "Youtube url required"))
    }

    const data = await fetchTranscript(Input)

    const transcript = data.map((items) => items.text).join(" ")

    const pack = await UrlPack.create({
        Input,
        Transcript: transcript
    })

    return res.status(201).json({
        status: "success",
        data: pack
    })
})

export const summary = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const Input: string = req.body.Input;

    logger.info("Attempting to Parse Url")

    if(!Input){
        logger.warn("Youtube url required")
        throw next(new CustomError(404, "Youtube url not inserted"))
    }

    try{

    const data = await fetchTranscript(Input);

    const transcript = data.map((items) => items.text).join(" ");

    await UrlPack.create({
        Input,
        Transcript: transcript
    })

    const api_key_of_google = String(GEMINI_API_KEY);
    const client = new GoogleGenerativeAI(api_key_of_google);

    const prompt = `
        You are an expert YouTube content summarizer.

        Create a highly engaging summary of the following transcript.

        Format:
        1. Hook / Main Idea
        2. Key Points (bullet points)
        3. Important Insights
        4. Actionable Takeaways
        5. Final Conclusion

        Rules:
        - Keep it concise and easy to read
        - Remove filler and repetition
        - Preserve important context
        - Make the summary feel valuable and informative
        - Use simple language
        - Highlight anything surprising or useful

        Transcript: ${transcript} 
    `;

    const response = client.getGenerativeModel({
      model: "gemini-2.5-flash"
    })

    const result = await response.generateContent(prompt)

    const pack = await SummaryPack.create({
        Input,
        Summary: result.response.text()
    })

    return res.status(201).json({
        status: "success",
        data: pack
    })

}catch(err){
    logger.error("At Summary caught " + err)
    return next(new CustomError(429, `${err}`))
}
})

export const notes = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const Input: string = req.body.Input;

    logger.info("Attempting to Parse Url")

    if(!Input){
        logger.warn("Youtube url required")
        throw next(new CustomError(404, "Youtube url not inserted"))
    }

    const data = await fetchTranscript(Input)

    const transcript = data.map((items) => items.text).join(" ")

    const pack = await NotePack.create({
        Input,
        Notes: transcript
    })

    return res.status(201).json({
        status: "success",
        data: pack
    })
})
