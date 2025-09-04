import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function geminiClient(
  content: string,
  message: {
    title: string;
    description: string;
    date: string;
    genre: string[];
  },
  lang: string = "en"
) {
  const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      maxOutputTokens: 150,
    },
    systemInstruction: `
      You are an assistant for a movie website. 
      Always respond in ${lang}.
      When given the name of a movie, film, or series, always return the following format:

      [${message.title}]
      [${message.date}]
      [${message.genre.join(", ")}]
      [${
        message.description
      }] – A short paragraph (max 150 tokens) that is simple and easy to read but still professional, 
      blending a casual style with some depth. Include the main plot, characters, and themes without going into excessive detail. 
      If no information is available, respond with: "Sorry, I can’t find a brief for this movie."
    `,
  });

  try {
    const result = await model.generateContent(content);
    const text = result.response.text().replace(/\*/g, "");
    console.log(text);
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
