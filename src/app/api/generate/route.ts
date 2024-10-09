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

    let content = "Give me 10 " + difficulty + " question about topic " + topic + " with 4 options that are very close to the correct answer and the correct answer. " +
    "Respond in an array of JSON objects in the exact form [{ \"question\": \"\", \"options\": [\"\", \"\", \"\", \"\"], \"answer\": \"\" }]. Please do not use any markup or any other formatting text."

    if (topic === "Discrete Math") {
      content = "Give me 10 " + difficulty + " question about first year level discrete math with 4 options that are very close to the correct answer and the correct answer. " +
      "Respond in an array of JSON objects in the exact form [{ \"question\": \"\", \"options\": [\"\", \"\", \"\", \"\"], \"answer\": \"\" }]. Please do not " +
      "use any markup or any other formatting text. For example include deductive reasoning with quantifiers like \"for all\" and \"there exists\". " +
      "An example question would be: All birds eat at least one species of insect. At least one species of insect can fly. Therefore, all birds " +
      "eat some flying beings. The correct answer would be: True. As for another example, you could also ask what the universe of discourse is for a given question.";
    }

    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        { role: "system", content: "You are an educational tutor." },
        {
          role: "user",
          content: content,
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
