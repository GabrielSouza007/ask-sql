import { defaultSafetySettings, mapSafetySettings } from '@/constants/safety-settings-mapper'
import { sqlFormSchema } from '@/validation/sql'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'
const api_key = process.env.GEMINI_AI_API_KEY ?? ''
const gemini = new GoogleGenerativeAI(api_key)

export async function POST(request: Request) {
  const parseResult = sqlFormSchema.safeParse(await request.json())

  if (!parseResult.success) {
    return new Response(JSON.stringify({ error: 'Invalid request data' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const { schema, prompt } = parseResult.data

  const message = `Você como um especialista em SQL, deve criar queries em SQL a partir de um schema SQL abaixo, sem a inserção de crases antes e depois das respostas.

    Schema SQL: 

    ${schema}

    A partir do schema acima, escreva uma query SQL a partir da solicitação abaixo:

    Solicitação:

    ${prompt}

    É importante que retorne somente a resposta, nada além disso.`

  const mappedSafetySettings = mapSafetySettings(defaultSafetySettings)

  const geminiStream = await gemini
    .getGenerativeModel({
      model: 'gemini-pro',
      safetySettings: mappedSafetySettings,
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      },
    })
    .generateContentStream([message])

  const stream = GoogleGenerativeAIStream(geminiStream)

  return new StreamingTextResponse(stream)
}
