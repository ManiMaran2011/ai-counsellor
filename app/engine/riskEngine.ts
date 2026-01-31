export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

type RiskInput = {
  confidence: number;          // 0–100
  pendingTasks: number;        // count
  daysToDeadline: number;      // integer
};

export function calculateRisk({
  confidence,
  pendingTasks,
  daysToDeadline,
}: RiskInput): RiskLevel {
  let score = 0;

  // 🔻 Low confidence increases risk
  if (confidence < 40) score += 3;
  else if (confidence < 60) score += 2;
  else if (confidence < 75) score += 1;

  // 🔻 Pending tasks
  if (pendingTasks >= 5) score += 3;
  else if (pendingTasks >= 3) score += 2;
  else if (pendingTasks >= 1) score += 1;

  // 🔻 Deadline pressure
  if (daysToDeadline <= 7) score += 4;
  else if (daysToDeadline <= 14) score += 2;
  else if (daysToDeadline <= 30) score += 1;

  if (score >= 7) return "HIGH";
  if (score >= 4) return "MEDIUM";
  return "LOW";
}
