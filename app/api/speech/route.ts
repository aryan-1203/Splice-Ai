
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

interface RequestBody {
  text: string;
}

const openai = new OpenAI({
  apiKey: '',
});

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const response = await openai.audio.speech.create(
      {
      model: 'tts-1',
      voice: 'alloy',
      input: text,
      }
    );

    const audioURL = response.url;

    // Return the audio URL in the JSON response
    return NextResponse.json({ audioURL });
  } catch (error) {
    console.error('[AUDIO_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

