// engine/taskEscalator.ts

export type EscalatedTask = {
  id: string;
  title: string;
  status: "pending" | "done";
  urgency: "low" | "medium" | "high";
  deadline?: string; // ISO date
};

export function escalateTasks(tasks: EscalatedTask[]) {
  const today = new Date();

  return tasks.map(task => {
    if (task.status === "done" || !task.deadline) return task;

    const deadline = new Date(task.deadline);
    const daysLeft =
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (daysLeft <= 3) {
      return { ...task, urgency: "high" };
    }

    if (daysLeft <= 7) {
      return { ...task, urgency: "medium" };
    }

    return task;
  });
}
