import OpenAI from "openai";
import type { IChat } from "..";

export async function getResponseFromGpt(messages: IChat[]) {
  try {
    console.log(process.env.OPENAI_API_KEY);

    const openai = new OpenAI();

    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-4o",
    });

    const result = completion.choices[0].message.content;

    console.log({ result });

    return result;
  } catch (error) {
    console.log({ error });
  }
}
