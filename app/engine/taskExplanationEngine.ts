import type { Task } from "@/app/context/UserContext";

export function explainTask(task: Task): string {
  switch (task.id) {
    case "sop":
      return "Your Statement of Purpose defines your academic intent. Weak or late SOPs are the #1 rejection reason.";
    case "ielts":
      return "English scores are mandatory for visa and admission. Missing this blocks your application.";
    case "fee":
      return "Applications are not reviewed until the fee is paid. Delays here stall the entire process.";
    default:
      return "This task is critical for keeping your application on track.";
  }
}
