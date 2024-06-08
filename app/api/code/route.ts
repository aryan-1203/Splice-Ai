//import { Request } from 'express'; // Import Request type from express
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Response } from 'express';
import { NextRequest} from 'next/server';

const openai = new OpenAI({
    apiKey: '',
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse('Unauthorised', { status: 401 });
        }

        if (!messages) {
            return new NextResponse('Messages are required', { status: 400 });
        }

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
        });
        
        console.log(chatCompletion.choices[0].message);
        return NextResponse.json(chatCompletion.choices[0].message);
    } catch (error) {
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}