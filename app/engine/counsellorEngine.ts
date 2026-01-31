// app/engine/counsellorEngine.ts

import type { Profile, University } from "@/app/context/UserContext";

/**
 * Counsellor recommendation engine
 * --------------------------------
 * Pure logic layer.
 * NO LLM dependency.
 * Gemini will plug in later.
 */

export type CounsellorSignal = {
  recommendation: string;
  confidenceImpact: number;
  urgency: "LOW" | "MEDIUM" | "HIGH";
};

export function counsellorRecommendation(
  profile: Profile,
  university: University,
  confidence: number
): CounsellorSignal {
  // 1️⃣ Base recommendation
  let recommendation = "";
  let urgency: CounsellorSignal["urgency"] = "LOW";
  let confidenceImpact = 0;

  // 2️⃣ Category-based logic
  if (university.category === "DREAM") {
    recommendation =
      "This is a high-risk, high-reward choice. Only proceed if deadlines and preparation are handled aggressively.";
    urgency = "HIGH";
    confidenceImpact = -10;
  }

  if (university.category === "TARGET") {
    recommendation =
      "This university aligns well with your profile. Locking now allows us to optimize timelines and outcomes.";
    urgency = "MEDIUM";
    confidenceImpact = +5;
  }

  if (university.category === "SAFE") {
    recommendation =
      "This is a safe option. Locking ensures you secure at least one strong admit.";
    urgency = "LOW";
    confidenceImpact = +2;
  }

  // 3️⃣ Confidence correction
  if (confidence < 50) {
    urgency = "HIGH";
    recommendation +=
      " Your current confidence is low — delays may increase risk.";
  }

  // 4️⃣ Readiness signals
  if (!profile.readiness?.ielts) {
    urgency = "HIGH";
    recommendation +=
      " English test readiness is missing and must be addressed immediately.";
  }

  return {
    recommendation,
    confidenceImpact,
    urgency,
  };
}
