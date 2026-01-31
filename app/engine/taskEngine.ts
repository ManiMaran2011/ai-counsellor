import { Task, Profile, University } from "@/app/context/UserContext";

export function generateTasks(
  profile: Profile,
  university: University
): Task[] {
  const tasks: Task[] = [];

  tasks.push({
    id: "sop",
    title: "Finalize Statement of Purpose",
    status: "NOT_STARTED",
    risk: "HIGH",
  });

  if (!profile.readiness.ielts) {
    tasks.push({
      id: "ielts",
      title: "Submit English Test Score",
      status: "NOT_STARTED",
      risk: "MEDIUM",
    });
  }

  tasks.push({
    id: "fee",
    title: "Pay Application Fee",
    status: "NOT_STARTED",
    risk: "HIGH",
  });

  return tasks;
}
