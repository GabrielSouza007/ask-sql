import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
  const { schema, prompt } = await req.json();

  const message = `
  Your job is to create SQL queries from the SQL schema below:

  Schema SQL:
  """
  ${schema}
  """
  From the schema above, write an SQL query from the request below.
  Return ONLY the SQL code, nothing else

  Request: ${prompt}
  `.trim();

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'user', content: message }],
  });

  console.log(response);

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
