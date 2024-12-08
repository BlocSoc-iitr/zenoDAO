import { AiortcMediaStream, createWorker } from "mediasoup-client-aiortc";
import path from "node:path";

const worker = await createWorker({
  logLevel: "debug",
});

export const getStream = async (filepath: string) => {
  const mediaStream = await worker.getUserMedia({
    audio: {
      source: "url",
      url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
    },
    video: {
      source: "url",
      // url: filepath,
      url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
    },
  });

  const stream = new AiortcMediaStream([mediaStream.getAudioTracks()[0]]);

  return stream;
};
