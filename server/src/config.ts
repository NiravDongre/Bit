
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if(!GEMINI_API_KEY){
    throw new Error("Required Gemini Api Key")
}