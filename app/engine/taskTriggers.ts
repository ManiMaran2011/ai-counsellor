// app/engine/taskTriggers.ts

import { Task } from "@/app/context/UserContext";

export type TaskTrigger = {
  whenCompleted: string;
  creates: Task;
};

/**
 * Simple task triggers based on task completion.
 * Must obey the core Task contract strictly.
 */
export const TASK_TRIGGERS: TaskTrigger[] = [
  {
    whenCompleted: "sop",
    creates: {
      id: "upload-sop",
      title: "Upload SOP PDF to University Portal",
      status: "NOT_STARTED",
      risk: "HIGH",
    },
  },
  {
    whenCompleted: "ielts",
    creates: {
      id: "application-fee",
      title: "Pay University Application Fee",
      status: "NOT_STARTED",
      risk: "HIGH",
    },
  },
];

/**
 * Apply triggers when a task is completed
 */
export function triggerTasksOnCompletion(
  completedTaskId: string,
  existingTasks: Task[]
): Task[] {
  const tasks = [...existingTasks];

  TASK_TRIGGERS.forEach((trigger) => {
    if (trigger.whenCompleted !== completedTaskId) return;

    const alreadyExists = tasks.some(
      (t) => t.id === trigger.creates.id
    );

    if (!alreadyExists) {
      tasks.push(trigger.creates);
    }
  });

  return tasks;
}
