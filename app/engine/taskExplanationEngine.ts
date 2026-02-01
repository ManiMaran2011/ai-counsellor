import type { Task } from "@/app/context/UserContext";
import { geminiExplain } from "./geminiClient";

export async function explainTask(task: Task): Promise<string> {
  const prompt = `
Explain to a student why this task matters:

Task: ${task.title}
Risk level: ${task.risk}

Keep it short, clear, motivating.
`;

  return geminiExplain(prompt);
}
