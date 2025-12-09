import { GoogleGenAI, Type } from "@google/genai";
import { OptimizedResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const optimizePrompt = async (
  rawPrompt: string,
  mode: string,
  tone: string
): Promise<OptimizedResult> => {

  const model = "gemini-2.5-flash";

  const systemInstruction = `
    你是一位世界级的提示词工程师（Prompt Engineer）和 LLM 专家。
    你的目标是将用户输入的原始、通常模糊的想法，重写为针对最先进 LLM（如 Gemini, GPT-4, Claude）优化的高效、结构化提示词。
    
    请遵循以下原则：
    1. 清晰性：消除歧义。
    2. 上下文：补充必要的背景信息。
    3. 约束条件：定义限制（长度、格式、风格）。
    4. 结构：使用格式（Markdown、项目符号）将指令与数据分离。
    5. 角色设定：为 AI 分配一个相关的角色。
    
    用户选择的具体场景是：“${mode}”。
    用户期望的语气风格是：“${tone}”。
    
    请务必使用中文（简体）生成所有内容。
    
    严格以 JSON 对象格式返回结果，包含优化后的提示词（improvedPrompt）、简短的优化解释（explanation）以及所做的关键更改列表（keyChanges）。
  `;

  const userContent = `请优化这段提示词: "${rawPrompt}"`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userContent,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedPrompt: {
              type: Type.STRING,
              description: "重写后的、经过优化的完整提示词文本。",
            },
            explanation: {
              type: Type.STRING,
              description: "简要解释（2-3句话）为什么这个版本效果更好。",
            },
            keyChanges: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "列出 3-5 个应用的具体优化技巧（例如：'添加了角色设定'，'明确了输出格式'）。",
            },
          },
          required: ["improvedPrompt", "explanation", "keyChanges"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("未收到 Gemini 的响应内容。");
    }

    const jsonResult = JSON.parse(text) as OptimizedResult;
    return jsonResult;

  } catch (error) {
    console.error("Error optimization prompt:", error);
    throw new Error("优化提示词失败，请稍后重试。");
  }
};