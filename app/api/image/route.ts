
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

interface RequestBody {
  prompt: string;
}

const openai = new OpenAI({
  apiKey: '',
});

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await openai.images.generate({
      model: 'dall-e-2',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });

    const imageURL = response.data[0].url;
    return NextResponse.json({ imageURL });
  } catch (error) {
    console.error('[IMAGE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}