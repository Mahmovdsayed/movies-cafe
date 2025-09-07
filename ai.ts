import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const stylePrompts: Record<
  "trailer" | "critic" | "emotional" | "action",
  { en: string; ar: string }
> = {
  trailer: {
    en: `
      Write a cinematic, trailer-style short description. 
      Make it gripping, immersive, and emotional — like the voiceover of a movie trailer. 
      Focus on the tension, atmosphere, and stakes while keeping it concise. 
      Do not reveal too much; spark curiosity and make the reader feel they *must* watch. 
      Keep it within 150–180 tokens.
    `,
    ar: `
      اكتب وصف قصير بأسلوب إعلان فيلم (Trailer). 
      خليه مشوّق ومليان جو وإحساس كأنك بتسمع صوت الراوي في الإعلان. 
      ركّز على التوتر والأحداث الكبيرة وخلي القارئ يتحمّس. 
      متكشفش كل التفاصيل، بس خليه يحس إنه لازم يتفرّج. 
      يكون قصير وخفيف باللهجة المصرية.
    `,
  },
  critic: {
    en: `
      Write a short critic-style review. 
      Make it sound professional yet approachable, highlighting the story, performances, and themes. 
      Focus on what makes it unique and worth watching, in a concise and polished paragraph. 
      Avoid spoilers, but make the reader feel intrigued.
    `,
    ar: `
      اكتب مراجعة قصيرة كأنك ناقد سينمائي. 
      خليها احترافية بس برضه سهلة للقارئ، ركّز على الحكاية والأداء والجو العام. 
      وضّح ليه العمل ده مختلف ويستاهل يتشاف من غير ما تحرق الأحداث. 
      الكلام يكون سلس وممتع باللهجة المصرية.
    `,
  },
  emotional: {
    en: `
      Write a powerful, emotional short description. 
      Focus on the main characters, their struggles, and their emotional journey. 
      Make it heartfelt, dramatic, and cinematic, while keeping it short and engaging. 
      Aim to connect with the reader on a human level.
    `,
    ar: `
      اكتب وصف قصير مؤثر. 
      ركّز على الشخصيات الرئيسية، صراعاتهم ورحلتهم الإنسانية. 
      خليه درامي ومليان إحساس كأنك عايش معاهم. 
      الكلام يكون مؤثر وسهل يخلي القارئ يحس بيهم باللهجة المصرية.
    `,
  },
  action: {
    en: `
      Write a high-energy, action-packed short description. 
      Make it thrilling, fast-paced, and intense, like an adrenaline-fueled trailer. 
      Highlight danger, suspense, and excitement in just a few lines. 
      Keep it short, sharp, and powerful.
    `,
    ar: `
      اكتب وصف مليان حركة وأكشن. 
      خليه سريع ومثير يخلي القارئ يحس إنه جوة الأحداث. 
      ركّز على الخطر، المطاردات، واللحظات اللي ترفع الأدرينالين. 
      الكلام يكون قصير وقوي باللهجة المصرية.
    `,
  },
};

export async function geminiClient(
  style: "trailer" | "critic" | "emotional" | "action" = "trailer",
  context: {
    title: string;
    description: string;
    date: string;
  },
  lang: "en" | "ar" = "en"
) {
  const model = ai.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: {
      maxOutputTokens: 200,
    },
    systemInstruction: `
      You are a professional movie copywriter for a cinematic website. 
      Always respond in ${
        lang === "ar" ? "Arabic (Egyptian dialect)" : "English"
      }.
      
      🎬 Your job: 
      - Use the provided movie details (title, description, release date, genre) as context. 
      - Apply the selected style instructions below.
      - Write ONLY a single short paragraph (no bullet points, no lists, no titles).
      - Keep it polished, cinematic, and immersive.
      
      🚫 Do NOT repeat the raw input data (title, date, genre, description).
      🚫 Do NOT include phrases like "this movie is about" or "the film tells the story of."
      🚫 Only return the paragraph, no extra formatting, no markdown, no lists. 

      If no meaningful info is available, simply respond with:
      "Sorry, I can’t find a brief for this movie."
    `,
  });

  try {
    const input = `
      ${stylePrompts[style][lang]}

      Title: ${context.title}
      Release Date: ${context.date}
      Description: ${context.description}
    `;

    const result = await model.generateContent(input);

    const text = result.response.text().replace(/\*/g, "").trim();
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
