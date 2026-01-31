import type { Profile, University } from "@/app/context/UserContext";
import { geminiExplain } from "./geminiClient";

export async function counsellorRecommendation(
  profile: Profile,
  confidence: number,
  universities: University[]
) {
  const target = universities.find(u => u.category === "TARGET");

  if (!target) {
    return {
      message: "Explore universities to receive a recommendation.",
      recommend: null,
    };
  }

  const prompt = `
You are an expert study-abroad counsellor.

Student confidence: ${confidence}
Target degree: ${profile.goals.targetDegree}
Countries: ${profile.goals.countries.join(", ")}

Explain in 2 sentences:
Why locking ${target.name} now is a good strategic decision.
`;

  const explanation = await geminiExplain(prompt);

  return {
    message: explanation,
    recommend: target,
  };
}
