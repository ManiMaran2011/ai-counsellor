import { askGemini } from "./geminiClient";
import type { Profile, University, Task } from "@/app/context/UserContext";

/* ================= UNIVERSITY ================= */

export async function explainUniversityFit(
  profile: Profile,
  university: University,
  category: "DREAM" | "TARGET" | "SAFE"
) {
  const prompt = `
You are an overseas education counsellor.

STUDENT:
- Target Degree: ${profile.goals.targetDegree}
- Countries: ${profile.goals.countries.join(", ")}
- Budget: ${profile.budget.annualINR} L INR
- IELTS: ${profile.readiness.ielts || "Not completed"}
- SOP: ${profile.readiness.sop || "Not ready"}

UNIVERSITY:
- Name: ${university.name}
- Category: ${category}

Explain in 3 bullet points why this university is a ${category} choice.
Be realistic and honest.
`;

  return askGemini(prompt);
}

/* ================= TASK ================= */

export async function explainTaskImportance(
  task: Task,
  university: University
) {
  const prompt = `
Student has locked ${university.name}.

Task: ${task.title}
Risk Level: ${task.risk}

Explain in 2–3 short lines why this task matters right now.
`;

  return askGemini(prompt);
}

/* ================= ESCALATION ================= */

export async function explainEscalation(
  confidence: number,
  pendingTasks: string[]
) {
  const prompt = `
A student applying abroad has:
- Confidence score: ${confidence}
- Pending high-risk tasks: ${pendingTasks.join(", ")}

Explain briefly why expert guidance is recommended at this stage.
Tone: calm, supportive, not salesy.
`;

  return askGemini(prompt);
}
