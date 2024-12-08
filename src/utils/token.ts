import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export const createAccessToken = async (roomId: string) => {
  const token = new AccessToken({
    apiKey: process.env.HUDDLE_API_KEY!,
    roomId,
    role: Role.HOST,
    options: {
      metadata: {
        displayName: "AI Bot",
        avatarUrl: "https://www.shutterstock.com/image-vector/happy-robot-3d-ai-character-600nw-2464455965.jpg",
      },
    },
  });

  return token.toJwt();
};
