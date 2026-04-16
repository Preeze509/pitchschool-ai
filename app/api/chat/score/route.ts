import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { pitch } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "system",
        content: `
Ou se yon coach pwofesyonèl.
Evalye pitch biznis timoun yo.

Bay:
- clarity (/10)
- structure (/10)
- confidence (/10)

Reponn nan JSON:
{
  "clarity": number,
  "structure": number,
  "confidence": number,
  "feedback": "string",
  "improved": "string"
}
        `,
      },
      {
        role: "user",
        content: pitch,
      },
    ],
  });

  return Response.json(
    JSON.parse(completion.choices[0].message.content!)
  );
}