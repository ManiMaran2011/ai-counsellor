// app/engine/geminiReasoner.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Task, Profile } from "@/app/context/UserContext";

/* ================================
   GEMINI CLIENT
================================ */

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

/* ================================
   TASK EXPLANATION
================================ */

/**
 * Explain WHY a task matters for admission success.
 * Used in Execution UI (Stage 4).
 */
export async function explainTaskWithGemini(
  task: Task,
  profile: Profile,
  universityName: string
): Promise<string> {
  const prompt = `
You are an expert study-abroad counselor.

STUDENT PROFILE:
- Degree: ${profile.academics.degree}
- GPA: ${profile.academics.gpa ?? "Not provided"}
- Budget (INR): ${profile.budget.annualINR}
- Target Intake: ${profile.goals.intake}
- Preferred Countries: ${profile.goals.countries.join(", ")}

LOCKED UNIVERSITY:
${universityName}

TASK:
"${task.title}"

Explain in 2–3 clear sentences:
1. Why this task is important for admission
2. What risk happens if the student delays or skips it

Tone:
- Calm
- Professional
- Supportive
- Not salesy
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response.trim();
  } catch (error) {
    console.error("Gemini explanation failed:", error);
    return (
      "This task is critical to your admission progress. Completing it on time " +
      "reduces rejection risk and keeps your application competitive."
    );
  }
}

/* ================================
   OPTIONAL: TASK SUGGESTIONS
================================ */

/**
 * Suggest follow-up tasks after completion.
 * (Not yet wired, but production-ready.)
 */
export async function suggestNewTasksWithGemini(
  completedTask: Task,
  profile: Profile,
  universityName: string
): Promise<string[]> {
  const prompt = `
You are an AI admissions strategist.

A student has completed this task:
"${completedTask.title}"

Student profile:
${JSON.stringify(profile, null, 2)}

University:
${universityName}

Suggest up to 2 next actionable tasks.
Do NOT explain.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return text
      .split("\n")
      .map((t) => t.replace(/^-/, "").trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}
