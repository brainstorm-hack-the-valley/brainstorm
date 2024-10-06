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

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an educational tutor." },
        {
          role: "user",
          content: "Give me 10 " + difficulty + " question about topic " + topic + " with 4 options that are very close to the correct answer and the correct answer. Respond in an array of JSON objects in the exact form [{ \"question\": \"\", \"options\": [\"\", \"\", \"\", \"\"], \"answer\": \"\" }]. Please do not use any markup or any other formatting text.",
        },
      ],
    });

    const question = completion.choices[0].message.content;
    console.log(question);

    return NextResponse.json({ success: true, data: JSON.parse(question as string)}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}