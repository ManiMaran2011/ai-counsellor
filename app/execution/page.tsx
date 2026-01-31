"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ExecutionPage() {
  const {
    lockedUniversity,
    tasks,
    completeTask,
    confidence,
  } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!lockedUniversity) {
      router.replace("/dashboard");
    }
  }, [lockedUniversity, router]);

  if (!lockedUniversity) return null;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-black">
          Execution Mode
        </h1>

        <p className="text-slate-500">
          Confidence {confidence}%
        </p>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{task.title}</p>
                <p className="text-xs text-slate-500">
                  Risk: {task.risk}
                </p>
              </div>

              {task.status !== "DONE" ? (
                <button
                  onClick={() => completeTask(task.id)}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Mark Done
                </button>
              ) : (
                <span className="text-green-600 font-bold">
                  Completed
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
