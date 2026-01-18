import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: We create a new instance per request in the function to ensure fresh key if needed, 
// but typically a singleton outside is fine. Following guidelines to keep it simple.
// We use the 'gemini-2.5-flash-image' model as requested (nano banana).

export const generateMinistryImage = async (prompt: string): Promise<string | null> => {
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Returning placeholder.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-2.5-flash-image (Nano Banana) for image generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt + " High quality, photorealistic, cinematic lighting, professional corporate or church atmosphere, 4k.",
          },
        ],
      },
      config: {
        imageConfig: {
            aspectRatio: "4:3",
        },
      },
    });

    // Extract image from response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    
    return null;

  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
