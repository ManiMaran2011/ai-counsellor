// app/engine/taskTriggers.ts

import type { Task } from "@/app/context/UserContext";

/**
 * Declarative task triggers.
 * When one task is completed, unlock another.
 * Phase-1 compliant: ONLY Task fields allowed.
 */

export type TaskTrigger = {
  whenCompleted: string;
  creates: Task;
};

export const TASK_TRIGGERS: TaskTrigger[] = [
  {
    whenCompleted: "sop",
    creates: {
      id: "upload-sop",
      title: "Upload SOP to University Portal",
      status: "NOT_STARTED",
      risk: "HIGH",
    },
  },
  {
    whenCompleted: "ielts",
    creates: {
      id: "application-fee",
      title: "Pay Application Fee",
      status: "NOT_STARTED",
      risk: "HIGH",
    },
  },
];

/**
 * Apply triggers after a task is completed
 */
export function applyTaskTriggers(
  completedTaskId: string,
  existingTasks: Task[]
): Task[] {
  const tasks = [...existingTasks];

  const hasTask = (id: string) =>
    tasks.some((t) => t.id === id);

  TASK_TRIGGERS.forEach((trigger) => {
    if (
      trigger.whenCompleted === completedTaskId &&
      !hasTask(trigger.creates.id)
    ) {
      tasks.push(trigger.creates);
    }
  });

  return tasks;
}
