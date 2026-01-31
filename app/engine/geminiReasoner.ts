// app/engine/geminiReasoner.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Task, Profile } from "@/app/context/UserContext";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ GEMINI_API_KEY not set — using fallback explanations");
}

const genAI = apiKey
  ? new GoogleGenerativeAI(apiKey)
  : null;

const model = genAI
  ? genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
  : null;

/* ================= TASK EXPLANATION ================= */

export async function explainTaskWithGemini(
  task: Task,
  profile: Profile,
  universityName: string
): Promise<string> {
  // 🔒 Hard fallback (no API key / build-safe)
  if (!model) {
    return fallbackExplanation(task, universityName);
  }

  const prompt = `
You are an expert study-abroad counsellor.

STUDENT PROFILE:
- Target Degree: ${profile.goals.targetDegree}
- Target Countries: ${profile.goals.countries.join(", ")}
- Budget (INR/year): ${profile.budget.annualINR}
- Funding: ${profile.budget.funding}
- IELTS Status: ${profile.readiness.ielts || "Not provided"}
- GRE Status: ${profile.readiness.gre || "Not provided"}
- SOP Status: ${profile.readiness.sop}

LOCKED UNIVERSITY:
${universityName}

CURRENT TASK:
"${task.title}"

Explain in 2–3 short, clear sentences:
1. Why this task is important for admission success
2. What risk increases if the student delays this task

Tone:
- Calm
- Professional
- Supportive
- Action-oriented
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  } catch (err) {
    console.error("Gemini task explanation failed:", err);
    return fallbackExplanation(task, universityName);
  }
}

/* ================= FALLBACK ================= */

function fallbackExplanation(task: Task, university: string) {
  return `This task is essential to keep your application to ${university} on track. Delaying it can increase rejection risk or limit available options, so completing it early strengthens your overall application.`;
}
