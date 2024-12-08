import { HuddleClient } from "@huddle01/web-core";
import path from "node:path";

import { AiortcMediaStream, createWorker } from "mediasoup-client-aiortc";

import { getResponseFromGpt } from "./utils/textGen";
import { createAccessToken } from "./token";
import { textToSpeech } from "./utils/textToSpeech";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const worker = await createWorker({
  logLevel: "debug",
});

export interface IChat {
  role: "user" | "system";
  content: string;
}

const messages: IChat[] = [];

const client = new HuddleClient({
  projectId: process.env.HUDDLE_PROJECT_ID!,
  options: {
    logging: true,
    activeSpeakers: {
      size: 15,
    },
    handlerFactory: worker.createHandlerFactory(),
  },
});

const roomId = "uvv-dtgk-ikp"; //TODO: Add your room id here

const token = await createAccessToken(roomId);

await client.joinRoom({
  roomId,
  token,
});

await sleep(1000 * 5);

client.room.on("room-joined", async () => {
  console.log("Room Joined");
});

client.localPeer.on("receive-data", async (data) => {
  console.log("Data Received", { data });

  const isBot = data.from === client.localPeer.peerId;
  !isBot && messages.push({ role: "user", content: data.payload });

  if (!isBot) {
    await client.localPeer.disableVideo();

    return client.localPeer.sendData({
      to: "*",
      payload: "processing reply ...",
      label: "chat",
    });
  }
  try {
    const payload = await getResponseFromGpt(messages);

    if (!payload) {
      return console.log("no payload=====================");
    }

    messages.push({ role: "system", content: payload });

    const count = await textToSpeech(payload);

    const filepath = path.join(__dirname, `speech-${count}.mp3`);

    console.log({ filepath });

    const audioStream = await worker.getUserMedia({
      audio: {
        source: "url",
        url: filepath,
      },
    });

    const audio = new AiortcMediaStream([audioStream.getAudioTracks()[0]]);

    await client.localPeer.disableAudio();
    await client.localPeer.enableAudio(audio as any);
    // await client.localPeer.replaceAudioStream(audio as any);

    const videoStream = await worker.getUserMedia({
      video: {
        source: "url",
        loop: true,
        url: `https://static.vecteezy.com/system/resources/previews/023/059/532/mp4/ai-chatbot-typing-bw-animation-animated-virtual-assistant-answering-question-2d-flat-monochromatic-thin-line-character-chat-4k-concept-footage-with-alpha-channel-transparency-for-web-design-video.mp4`,
      },
    });

    const video = new AiortcMediaStream([videoStream.getVideoTracks()[0]]);
    await client.localPeer.enableVideo(video as any);
  } catch (error) {
    console.log({ error });
  }

  console.log({ messages });
});

// await sleep(1000 * 3);

// AUDIO Stream Produce
const speechPath = path.join(__dirname, "speech.mp3");

const audioStream = await worker.getUserMedia({
  audio: {
    source: "url",
    url: speechPath,
  },
});

const audioTrack = audioStream.getAudioTracks()[0];

const audio = new AiortcMediaStream([audioTrack]);

await client.localPeer.enableAudio(audio as any);

// VIDEO Stream Produce
const videoStream = await worker.getUserMedia({
  video: {
    source: "url",
    loop: true,
    url: "https://static.vecteezy.com/system/resources/previews/027/576/282/mp4/white-flying-robot-with-smiley-face-waving-its-arm-while-floating-against-black-background-3d-animation-video.mp4",
  },
});

const videoTrack = videoStream.getVideoTracks()[0];
const video = new AiortcMediaStream([videoTrack]);

await client.localPeer.enableVideo(video as any);
