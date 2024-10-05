import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Remove, timeout to test.
    await new Promise(resolve => setTimeout(resolve, 1000));

    const query = request.nextUrl.searchParams;
    const question_type = query.get('topic');

    if (!question_type) {
      return NextResponse.json({ success: false, error: 'Invalid question type' }, { status: 400 });
    }

    const questions = [
      {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris'
      },
      {
        question: 'What is the largest planet in our solar system?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Jupiter'
      },
      {
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
        answer: 'Mitochondria'
      }
    ]

    return NextResponse.json({ success: true, data: questions }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}