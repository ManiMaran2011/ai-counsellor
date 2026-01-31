import { differenceInDays } from "date-fns";

export type Task = {
  id: string;
  title: string;
  status: "pending" | "completed";
  deadline?: string;
  importance: "high" | "medium" | "low";
};

export function getDailyFocus(tasks: Task[]) {
  const pending = tasks.filter(t => t.status === "pending");

  const scored = pending.map(task => {
    let score = 0;

    if (task.importance === "high") score += 50;
    if (task.importance === "medium") score += 30;

    if (task.deadline) {
      const daysLeft = differenceInDays(
        new Date(task.deadline),
        new Date()
      );

      if (daysLeft <= 3) score += 40;
      else if (daysLeft <= 7) score += 25;
    }

    return { ...task, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
}
