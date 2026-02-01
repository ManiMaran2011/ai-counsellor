// app/engine/universityEngine.ts

import type { Profile } from "@/app/context/UserContext";

export type UniversityCategory = "DREAM" | "TARGET" | "SAFE";

export function categorizeUniversity(
  profile: Profile,
  confidence: number
): UniversityCategory {
  // ✅ HARD NORMALIZATION (TypeScript-safe)
  const readiness = {
    ielts: profile.readiness?.ielts ?? "",
    gre: profile.readiness?.gre ?? "",
    sop: profile.readiness?.sop ?? "",
  };

  const hasIELTS = readiness.ielts.trim().length > 0;
  const hasSOP = readiness.sop.trim().length > 0;

  // ❗ Weak profile → SAFE
  if (confidence < 50 || !hasIELTS || !hasSOP) {
    return "SAFE";
  }

  // ⚠️ Medium strength → TARGET
  if (confidence < 75) {
    return "TARGET";
  }

  // 🚀 Strong profile → DREAM
  return "DREAM";
}
