// app/engine/taskTriggers.ts

import { Task } from "@/app/context/UserContext";

type Trigger = {
  whenCompleted: string;
  creates: Task;
};

const TASK_TRIGGERS: Trigger[] = [
  {
    whenCompleted: "sop-final",
    creates: {
      id: "upload-sop",
      title: "Upload SOP PDF to University Portal",
      status: "NOT_STARTED",
      risk: "HIGH",
    },
  },

  {
    whenCompleted: "bank-proof",
    creates: {
      id: "application-fee",
      title: "Pay Application Fee",
      status: "NOT_STARTED",
      risk: "HIGH",
    },
  },
];

/* ================= ENGINE ================= */

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
