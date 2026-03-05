import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithGemini(messages: ChatMessage[]): Promise<string> {
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "You are a world-class music theorist and teacher. Explain concepts clearly, provide examples, and help users understand the relationship between scales, chords, and melody. Use markdown for formatting.",
    },
  });

  // Send the last message
  const lastMessage = messages[messages.length - 1];
  const response: GenerateContentResponse = await chat.sendMessage({ message: lastMessage.text });
  return response.text || "I'm sorry, I couldn't process that request.";
}

export async function generateMusicImage(prompt: string, size: "1K" | "2K" | "4K" = "1K"): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [
        {
          text: `A high-quality, artistic visualization of music theory concepts: ${prompt}. Cinematic lighting, detailed textures, professional photography or digital art style.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: size
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated");
}
