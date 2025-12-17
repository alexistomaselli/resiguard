import { GoogleGenAI, Type } from "@google/genai";
import { MaintenancePriority } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Define the schema for structured output
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    category: {
      type: Type.STRING,
      description: "The technical category of the issue (e.g., Plomería, Eléctrico, HVAC, General). in Spanish.",
    },
    priority: {
      type: Type.STRING,
      enum: ["Baja", "Media", "Alta", "Crítica"],
      description: "Recommended priority level based on severity and potential damage.",
    },
    suggestedAction: {
      type: Type.STRING,
      description: "A short, actionable suggestion for the property manager in Spanish (max 15 words).",
    }
  },
  required: ["category", "priority", "suggestedAction"],
};

export const analyzeMaintenanceTicket = async (description: string) => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini");
    return {
      category: "General",
      priority: MaintenancePriority.MEDIUM,
      suggestedAction: "Revisar manualmente."
    };
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `Analiza esta descripción de solicitud de mantenimiento de un inquilino y clasifícala. Descripción: "${description}"`;

    const result = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "Eres un asistente experto en gestión de instalaciones. Analiza las solicitudes de mantenimiento para categorizarlas y priorizarlas eficientemente. Responde siempre en Español."
      }
    });

    if (result.text) {
      return JSON.parse(result.text);
    }
    throw new Error("No text response from Gemini");

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      category: "Desconocido",
      priority: MaintenancePriority.MEDIUM,
      suggestedAction: "Análisis fallido. Revisar manualmente."
    };
  }
};