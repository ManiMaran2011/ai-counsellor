// app/engine/dailyFocusEngine.ts

import type { Task, Profile } from "@/app/context/UserContext";
import { explainTaskWithGemini } from "./geminiReasoner";

/* ================================
   TASK SCORING
================================ */

function scoreTask(task: Task): number {
  let score = 0;

  // Not completed = high priority
  if (task.status !== "DONE") score += 50;

  // Deadline urgency
  if (task.deadline) {
    const daysLeft =
      (new Date(task.deadline).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24);

    if (daysLeft <= 3) score += 40;
    else if (daysLeft <= 7) score += 25;
    else score += 10;
  }

  // Risk impact
  if (task.risk === "HIGH") score += 40;
  if (task.risk === "MEDIUM") score += 20;

  // Foundational tasks matter more
  if (task.category === "SOP") score += 20;

  return score;
}

/* ================================
   DAILY FOCUS SELECTION
================================ */

export async function getDailyFocusTask(
  tasks: Task[],
  profile: Profile,
  universityName: string
) {
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

  const focusTask = sorted[0].task;

  // Gemini reasoning: WHY this task today
  const reasoning = await explainTaskWithGemini(
    focusTask,
    profile,
    universityName
  );

  return {
    task: focusTask,
    reasoning,
  };
}
