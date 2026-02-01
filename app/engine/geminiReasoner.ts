// app/engine/geminiReasoner.ts

import type { Profile, University } from "@/app/context/UserContext";

/**
 * This engine PREPARES prompts for Gemini.
 * It must be defensive: profile fields may be partially filled.
 */
export function buildGeminiPrompt(
  profile: Profile,
  university: University
): string {
  /* ================= SAFE NORMALIZATION ================= */

  const targetDegree =
    profile.goals?.targetDegree || "Not specified";

  const countries =
    profile.goals?.countries?.length
      ? profile.goals.countries.join(", ")
      : "Not specified";

  const budget =
    profile.budget?.annualINR
      ? `${profile.budget.annualINR} L INR`
      : "Not specified";

  const ielts =
    profile.readiness?.ielts || "Not completed";

  const sop =
    profile.readiness?.sop || "Not ready";

  /* ================= PROMPT ================= */

  return `
You are an experienced overseas education counsellor.

STUDENT PROFILE:
- Target Degree: ${targetDegree}
- Preferred Countries: ${countries}
- Budget: ${budget}
- IELTS Status: ${ielts}
- SOP Status: ${sop}

UNIVERSITY UNDER REVIEW:
- Name: ${university.name}
- Category: ${university.category}

TASK:
Explain the admission risk for this student applying to this university.
Be concise, realistic, and professional.
Do NOT give guarantees.
  `.trim();
}
