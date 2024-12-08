import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();

let count = 0;

export async function createAttestation(input: string) {
  try {
    if (input.toLowerCase() === "create attestation") {
      console.log("Bot: Please provide the Agent ID.");
      let agentId = simulateUserResponse(); // Replace with user input logic
      console.log(`User: ${agentId}`);

      console.log("Bot: How many attestations are required?");
      let attestations = simulateUserResponse();
      console.log(`User: ${attestations}`);

      console.log("Bot: What is the portfolio holding?");
      let portfolio = simulateUserResponse();
      console.log(`User: ${portfolio}`);

      console.log("Bot: What is the recipient address?");
      let recipientAddress = simulateUserResponse();
      console.log(`User: ${recipientAddress}`);

      const attestationHash = "0xc7401b23530376e68cb8684e08adc39ffc3d237efa33de5a41a4e8b93021d733"; // Hardcoded attestation hash
      console.log(`Bot: Attestation created successfully. Hash: ${attestationHash}`);

      // Optionally convert the output to speech
      const output = `
        Agent ID: ${agentId},
        Attestations: ${attestations},
        Portfolio Holding: ${portfolio},
        Recipient Address: ${recipientAddress},
        Attestation Hash: ${attestationHash}
      `;
      await textToSpeech(output);

      return attestationHash;
    } else {
      console.log("Bot: Invalid input. Please type 'create attestation' to proceed.");
    }
  } catch (error) {
    console.error(error);
  }
}

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
    console.error(error);
  }
}

// Example call
createAttestation("create attestation");
function simulateUserResponse() {
  throw new Error("Function not implemented.");
}

