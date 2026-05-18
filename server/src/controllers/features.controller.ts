import { Response, Request, NextFunction } from 'express';
import fs from 'fs';
import { Readable } from 'stream';
import { YtdlCore, toPipeableStream } from '@ybd-project/ytdl-core';
import { fetchTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config';
import AsyncHandler from '../utils/AsyncHandler';
import UrlPack from '../models/transcript.model';
import CustomError from '../utils/CustomError';
import logger from '../utils/logger';
import SummaryPack from '../models/summary.model';
import NotePack from '../models/note.model';
import { transcriptValication } from '../validations/url.validation';
import path from 'path';

export const transcript = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const payload = req.body;

    const createpayload = transcriptValication.safeParse(payload)

    if(!createpayload.success){
        logger.info("Url is not Valid")
        return next(new CustomError(400, `${createpayload.error.issues[0]?.message}`))
    }

    const Input = createpayload.data.Input

    logger.info("Attempting to Parse Url")

    if(!Input){
        logger.warn("Youtube url required")
        throw next(new CustomError(404, "Youtube url required"))
    }

        try{

  // Create temp directory if it doesn't exist
  const tempDir = path.join(process.cwd(), "temp")

  fs.mkdirSync(tempDir, {
    recursive: true,
  })

  // Unique filename

  const filePath = path.join(tempDir, `${Date.now()}.webm`)

  // Initialize ytdl
  const ytdl = new YtdlCore({
    hl: "en",
    gl: "US",
    clients: ["web"],
  })

  // Download audio stream
  const webStream = await ytdl.download(Input, {
    filter: "audioonly",
    quality: "highestaudio",
  })

  // Convert Web Stream -> Node Stream
  const nodeStream = Readable.fromWeb(webStream as any)

  // Create writable stream
  const writeStream = fs.createWriteStream(filePath)

  // Pipe audio into file
  nodeStream.pipe(writeStream)

  // Wait until file finishes writing
  await new Promise<void>((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log("Download completed")
      console.log("Saved at:", filePath)

      resolve()
    })

    writeStream.on("error", (err) => {
      reject(err)
    })

    nodeStream.on("error", (err) => {
      reject(err)
    })
  })

  return res.status(201).json({
    status: "success",
    message: "Transcript downloaded successfully",
    filePath: filePath
  })

}catch(err){
    logger.error("At Transcript caught " + err)
    return next(new CustomError(429, `${err}`))
    }
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
        Summary: result.response.text(),
        Transcript: transcript
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
