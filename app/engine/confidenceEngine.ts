type ConfidenceInput = {
  completedTasks: number;
  totalTasks: number;
};

export function calculateConfidence({
  completedTasks,
  totalTasks,
}: ConfidenceInput): number {
  if (totalTasks === 0) return 20; // base confidence

  const ratio = completedTasks / totalTasks;

  // Base confidence curve
  let confidence = 20 + ratio * 70;

  // Cap safely
  if (confidence > 100) confidence = 100;
  if (confidence < 10) confidence = 10;

  return Math.round(confidence);
}
