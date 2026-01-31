// app/engine/dailyFocusEngine.ts

import { Task } from "@/app/context/UserContext";

/**
 * Score tasks to decide DAILY focus
 * (No deadlines — priority is driven by risk + completion state)
 */
function scoreTask(task: Task): number {
  let score = 0;

  // 🔴 Incomplete tasks matter most
  if (task.status !== "DONE") score += 50;

  // 🔥 Risk weighting
  if (task.risk === "HIGH") score += 40;
  if (task.risk === "MEDIUM") score += 20;
  if (task.risk === "LOW") score += 5;

  return score;
}

/**
 * Select ONE daily focus task
 */
export function getDailyFocusTask(tasks: Task[]) {
  const pendingTasks = tasks.filter(
    (t) => t.status !== "DONE"
  );

  if (pendingTasks.length === 0) return null;

  const sorted = pendingTasks
    .map((task) => ({
      task,
      score: scoreTask(task),
    }))
    .sort((a, b) => b.score - a.score);

  return sorted[0].task;
}
