import { Task } from "@/app/context/UserContext";

export function shouldEscalate(
  confidence: number,
  tasks: Task[]
): boolean {
  const hasCriticalPending = tasks.some(
    (t) => t.risk === "HIGH" && t.status !== "DONE"
  );

  return confidence < 50 && hasCriticalPending;
}
