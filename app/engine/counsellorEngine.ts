import type { Profile, University } from "@/app/context/UserContext";
import { geminiExplain } from "./geminiClient";

export async function counsellorRecommendation(
  profile: Profile,
  university: University
) {
  const prompt = `
You are an expert study-abroad counsellor.

Student profile:
- Degree: ${profile.goals.targetDegree}
- Countries: ${profile.goals.countries.join(", ")}
- Budget: ${profile.budget?.annualINR ?? "Not set"} L INR
- IELTS: ${profile.readiness?.ielts || "Not completed"}
- SOP: ${profile.readiness?.sop || "Not ready"}

University:
- Name: ${university.name}
- Category: ${university.category}

Explain in 2–3 sentences:
Why this university is a good (or risky) choice for this student.
`;

  const explanation = await geminiExplain(prompt);

  return {
    message: explanation,
  };
}
