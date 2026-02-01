// app/engine/universityEngine.ts

import type { Profile } from "@/app/context/UserContext";

export type UniversityCategory = "DREAM" | "TARGET" | "SAFE";

/**
 * Categorize university fit based on
 * confidence + readiness signals
 */
export function categorizeUniversity(
  profile: Profile,
  confidence: number
): UniversityCategory {
  // 🛡️ Defensive normalization
  const readiness = profile.readiness ?? {
    ielts: "",
    gre: "",
    sop: "",
  };

  const hasIELTS = readiness.ielts.trim() !== "";
  const hasSOP = readiness.sop.trim() !== "";

  // ❗ Weak profile → SAFE
  if (confidence < 50 || !hasIELTS || !hasSOP) {
    return "SAFE";
  }

  // ⚖️ Mid profile → TARGET
  if (confidence < 75) {
    return "TARGET";
  }

  // 🚀 Strong profile → DREAM
  return "DREAM";
}
