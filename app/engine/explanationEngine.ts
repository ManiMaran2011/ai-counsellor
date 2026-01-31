import { Task } from "@/app/context/UserContext";

export function explainNextAction(task: Task): string {
  if (task.risk === "HIGH") {
    return "This task directly impacts your admission outcome.";
  }

  return "This task strengthens your overall application.";
}
