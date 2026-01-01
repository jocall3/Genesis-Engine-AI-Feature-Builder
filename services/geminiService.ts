
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateEcosystem = async (prompt: string, framework: string, includeBackend: boolean) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are a world-class senior full-stack engineer. 
    Your goal is to generate a comprehensive project structure based on the user's prompt.
    Output MUST be a JSON array of objects with { "filePath": string, "content": string }.
    Include core logic, styles, components, and if requested, backend cloud functions.
    Framework: ${framework}
    Backend Included: ${includeBackend}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            filePath: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ["filePath", "content"]
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};

export async function* generateStream(type: string, context: string) {
  const model = 'gemini-3-flash-preview';
  const prompts: Record<string, string> = {
    'TESTS': `Generate comprehensive unit tests for this code:\n${context}`,
    'COMMIT': `Generate a professional Git commit message based on these changes:\n${context}`,
    'CODE_REVIEW': `Perform a deep code review focusing on security, performance, and best practices for this codebase:\n${context}`,
    'ARCHITECTURE': `Describe a high-level architecture diagram in Mermaid.js syntax for this feature:\n${context}`,
    'API_SPEC': `Generate an OpenAPI YAML specification for the API defined in this context:\n${context}`,
    'PERFORMANCE': `Analyze the performance of this code and provide a report with optimizations:\n${context}`,
    'CI_CD': `Generate a GitHub Actions workflow YAML for this project type:\n${context}`,
    'DB_SCHEMA': `Generate a SQL DDL schema and documentation for the database requirements implied here:\n${context}`,
    'SECURITY': `Identify potential security vulnerabilities (SQLi, XSS, CSRF, etc.) and suggest remediations for:\n${context}`
  };

  const response = await ai.models.generateContentStream({
    model,
    contents: prompts[type] || `Analyze: ${context}`,
  });

  for await (const chunk of response) {
    yield chunk.text;
  }
}
