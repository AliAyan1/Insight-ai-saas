// File: app/api/analyze/route.ts (Final, Self-Correcting Version)

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to parse and self-correct JSON
async function parseAndCorrectJson(aiResponseString: string): Promise<any> {
  try {
    return JSON.parse(aiResponseString);
  } catch (parseError) {
    console.warn("Initial JSON parse failed. Attempting self-correction...");
    try {
      const correctionCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `The following text is a broken JSON string. Please fix it and return ONLY the valid JSON object. Do not add any text before or after the JSON. Invalid JSON: \n\n${aiResponseString}`,
          },
        ],
        response_format: { type: "json_object" },
      });
      const correctedJsonString = correctionCompletion.choices[0].message.content;
      if (!correctedJsonString) throw new Error("Self-correction returned empty response.");
      return JSON.parse(correctedJsonString);
    } catch (correctionError) {
      console.error("Self-correction failed:", correctionError);
      throw new Error("AI returned an invalid format that could not be corrected.");
    }
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { records } = body;

    if (!records || records.length === 0) {
      return NextResponse.json({ message: "No data provided for analysis." }, { status: 400 });
    }

    const dataSample = records.slice(0, 100);
    const dataAsString = JSON.stringify(dataSample, null, 2);
    const headers = Object.keys(records[0]).join(', ');

    const prompt = `
        You are an expert BI consultant. Your task is to analyze data and return a JSON object with "report", "chart", and "correctedData" keys.
        1. "report": A markdown string with sections: "### Data Quality & Corrections", "### Key Insights & Trends", "### Actionable Suggestions".
        2. "chart": An object with "type" ('bar', 'line', or 'pie') and "data" (which MUST be a JSON array of objects like [{"name": "Jan", "value": 150}]).
        3. "correctedData": A JSON array of the cleaned data sample.
        Here is the data with columns [${headers}]:
        \`\`\`json
        ${dataAsString}
        \`\`\`
        Generate the full, valid JSON object.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const aiResponseString = completion.choices[0].message.content;
    if (!aiResponseString) throw new Error("AI returned an empty response.");

    const structuredResponse = await parseAndCorrectJson(aiResponseString);

    return NextResponse.json(structuredResponse, { status: 200 });

  } catch (error: any) {
    console.error("ANALYSIS_API_ERROR:", error);
    return NextResponse.json({ message: error.message || "An unexpected error occurred." }, { status: 500 });
  }
}
// Note: Ensure that the OpenAI API key is set in your environment variables.