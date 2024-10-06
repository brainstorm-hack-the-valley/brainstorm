import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import * as Game from "@/game/game"

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const topic = query.get('topic');
    let difficulty = query.get('difficulty');
    if (difficulty === Game.PEACEFUL.getId()) {
      difficulty = " very easy";
    }

    if (difficulty === Game.MEDIUM.getId()) {
      difficulty = "hard";
    }

    if (difficulty === Game.HARD.getId()) {
      difficulty = "obscure and difficult";
    }

    if (false) {
      const questions = [
        { "question": "What is the capital of France?", "options": ["Paris", "London", "Berlin", "Madrid"], "answer": "Paris" },
        { "question": "What is the capital of the United States?", "options": ["Washington D.C.", "New York", "Los Angeles", "Chicago"], "answer": "Washington D.C." },
        { "question": "What is the capital of Japan?", "options": ["Tokyo", "Osaka", "Kyoto", "Hiroshima"], "answer": "Tokyo" },
        { "question": "What is the capital of Brazil?", "options": ["Brasilia", "Rio de Janeiro", "Sao Paulo", "Salvador"], "answer": "Brasilia" },
        { "question": "What is the capital of Australia?", "options": ["Canberra", "Sydney", "Melbourne", "Brisbane"], "answer": "Canberra" },
        { "question": "What is the capital of India?", "options": ["New Delhi", "Mumbai", "Bangalore", "Kolkata"], "answer": "New Delhi" },
        { "question": "What is the capital of China?", "options": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen"], "answer": "Beijing" },
      ]
      return NextResponse.json({ success: true, data: questions }, { status: 200 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        { role: "system", content: "You are an educational tutor." },
        {
          role: "user",
          content: "Give me 10 " + difficulty + " question about topic " + topic + " with 4 options that are very close to the correct answer and the correct answer. Respond in an array of JSON objects in the exact form [{ \"question\": \"\", \"options\": [\"\", \"\", \"\", \"\"], \"answer\": \"\" }]. Please do not use any markup or any other formatting text.",
        },
      ],
      temperature: 1.0,
    });

    const question = completion.choices[0].message.content;
    console.log(question);

    return NextResponse.json({ success: true, data: JSON.parse(question as string)}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
