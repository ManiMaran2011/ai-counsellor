// app/engine/taskTriggers.ts

import type { Task } from "@/app/context/UserContext";

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
];
