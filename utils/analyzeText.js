js
CopyEdit
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY, // stored in .env
});

export const analyzeText = async (userInput) => {
  const prompt = `
You are an expert in online exploitation prevention. Analyze the following text for signs of grooming, coercion, or trafficking-related language. Return a JSON object with:
- dangerScore: 1 (safe) to 5 (high risk)
- redFlags: list of words or phrases that triggered the score
- nextSteps: short advice for the user

Text to analyze: """${userInput}"""
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const cleaned = res.choices[0].message.content.trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn("Invalid JSON from OpenAI:", cleaned);
    return { dangerScore: null, redFlags: [], nextSteps: "Try again." };
  }
};

