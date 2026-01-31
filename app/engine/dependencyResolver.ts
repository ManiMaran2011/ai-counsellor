// app/engine/dependencyResolver.ts

import { Task } from "@/app/context/UserContext";

export type ResolvedTask = Task & {
  blocked: boolean;
};

/**
 * Dependency resolution (currently NO-OP)
 * Tasks are not blocked by dependencies in the current product stage
 */
export function resolveDependencies(
  tasks: Task[]
): ResolvedTask[] {
  return tasks.map((task) => ({
    ...task,
    blocked: false,
  }));
}
