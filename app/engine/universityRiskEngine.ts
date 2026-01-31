import type { Profile } from "@/app/context/UserContext";

type University = {
  name: string;
  tuitionINR: number;
  minIELTS: number;
  competitiveness: "HIGH" | "MEDIUM" | "LOW";
};

export function explainUniversityRisk(
  university: University,
  profile: Profile,
  confidence: number
): string {
  const reasons: string[] = [];

  // 💰 Budget logic
  const budgetRange = profile.budget?.annualINR ?? "25-50";
  const maxBudget =
    budgetRange === "10-25" ? 25 :
    budgetRange === "25-50" ? 50 :
    budgetRange === "50-75" ? 75 : 100;

  if (university.tuitionINR > maxBudget) {
    reasons.push(
      "Tuition exceeds your current budget range"
    );
  }

  // 📘 IELTS readiness
  const ielts = Number(profile.readiness?.ielts || 0);
  if (ielts && ielts < university.minIELTS) {
    reasons.push(
      `IELTS score below typical requirement (${university.minIELTS})`
    );
  }

  // 🧠 Confidence vs competitiveness
  if (
    confidence < 60 &&
    university.competitiveness === "HIGH"
  ) {
    reasons.push(
      "Highly competitive university given your current confidence level"
    );
  }

  if (reasons.length === 0) {
    return "This university aligns well with your current profile and readiness.";
  }

  return reasons.join(". ") + ".";
}
