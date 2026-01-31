// app/engine/taskTriggers.ts

import { Task } from "@/app/context/UserContext";

/**
 * A trigger defines:
 * - which task completion unlocks something
 * - which new task gets created
 */
export type TaskTrigger = {
  whenCompleted: string;
  creates: Task;
};

/**
 * ALL TASK TRIGGERS
 * Every created task MUST fully satisfy Task type
 */
export const TASK_TRIGGERS: TaskTrigger[] = [
  {
    whenCompleted: "sop",
    creates: {
      id: "upload-sop",
      title: "Upload SOP PDF to University Portal",
      status: "NOT_STARTED",
      risk: "HIGH",
      category: "PORTAL",
      priority: 1,
    },
  },

  {
    whenCompleted: "ielts",
    creates: {
      id: "send-ielts-score",
      title: "Send IELTS Score to University",
      status: "NOT_STARTED",
      risk: "MEDIUM",
      category: "TEST",
      priority: 2,
    },
  },

  {
    whenCompleted: "bank-proof",
    creates: {
      id: "pay-fee",
      title: "Pay University Application Fee",
      status: "NOT_STARTED",
      risk: "HIGH",
      category: "PORTAL",
      priority: 1,
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
