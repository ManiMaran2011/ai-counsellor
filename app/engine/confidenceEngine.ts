export function decayConfidence(current: number): number {
  return Math.max(30, current - 1);
}

export function rewardConfidence(
  current: number,
  amount = 8
): number {
  return Math.min(100, current + amount);
}

export function confidenceLabel(confidence: number) {
  if (confidence >= 75) return "STRONG";
  if (confidence >= 50) return "MODERATE";
  return "WEAK";
}
