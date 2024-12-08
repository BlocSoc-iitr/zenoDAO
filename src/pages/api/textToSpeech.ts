import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();

let count = 0;

export async function textToSpeech(input: string) {
  try {
    if (count > 0) {
      const oldSpeechFile = path.resolve(`./speech-${count}.mp3`);

      await fs.promises.unlink(oldSpeechFile);
    }

    count++;

    const speechFile = path.resolve(`./speech-${count}.mp3`);

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input,
      response_format: "mp3",
    });

    console.log({ speechFile, mp3 });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer.toString());

    return count;
  } catch (error) {
    console.log(error);
  }
}
