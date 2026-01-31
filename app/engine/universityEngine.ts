import { Profile, University, RiskLevel } from "@/app/context/UserContext";

export type UniversityCategory = "DREAM" | "TARGET" | "SAFE";

export function classifyUniversity(
  profile: Profile,
  uni: University,
  confidence: number
): UniversityCategory {
  const hasIELTS = profile.readiness.ielts !== "";
  const hasSOP = profile.readiness.sop !== "";

  if (confidence < 50 || !hasIELTS || !hasSOP) {
    return "SAFE";
  }

  if (confidence >= 75 && hasIELTS && hasSOP) {
    return "DREAM";
  }

  return "TARGET";
}

export function universityRisk(
  category: UniversityCategory
): RiskLevel {
  switch (category) {
    case "DREAM":
      return "HIGH";
    case "TARGET":
      return "MEDIUM";
    case "SAFE":
      return "LOW";
  }
}
