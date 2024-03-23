import { GoogleGenerativeAI } from '@google/generative-ai'

const api_key = process.env.GEMINI_AI_API_KEY ?? ''
export const gemini = new GoogleGenerativeAI(api_key)
