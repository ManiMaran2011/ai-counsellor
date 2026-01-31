"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

import { shouldEscalateToExpert } from "@/app/engine/escalationEngine";
import { getTaskExplanation } from "@/app/engine/explanationEngine";
import { explainTaskWithGemini } from "@/app/engine/geminiReasoner";
import { getDailyFocusTask } from "@/app/engine/dailyFocusEngine";

export default function ExecutionPage() {
  const {
    lockedUniversity,
    tasks,
    updateTaskStatus,
    confidence,
    risk,
    profile,
  } = useUser();

  const router = useRouter();

  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [geminiExplanation, setGeminiExplanation] = useState<
    Record<string, string>
  >({});
  const [dailyFocus, setDailyFocus] = useState<{
    task: any;
    reasoning: string;
  } | null>(null);

  /* ==================== GUARD ==================== */

  useEffect(() => {
    if (!lockedUniversity) {
      router.replace("/dashboard");
    }
  }, [lockedUniversity, router]);

  /* ==================== DAILY FOCUS ==================== */

  useEffect(() => {
    async function loadDailyFocus() {
      if (!profile || !lockedUniversity) return;

      const focus = await getDailyFocusTask(
        tasks,
        profile,
        lockedUniversity.name
      );

      setDailyFocus(focus);
    }

    loadDailyFocus();
  }, [tasks, profile, lockedUniversity]);

  if (!lockedUniversity) return null;

  /* ==================== ESCALATION ==================== */

  const shouldEscalate = shouldEscalateToExpert({
    tasks,
    confidence,
  });

  /* ==================== GEMINI ==================== */

  const loadGeminiExplanation = async (task: any) => {
    if (geminiExplanation[task.id]) return;

    const text = await explainTaskWithGemini(
      task,
      profile!,
      lockedUniversity.name
    );

    setGeminiExplanation((prev) => ({
      ...prev,
      [task.id]: text,
    }));
  };

  /* ==================== UI ==================== */

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-black">
            Stage 4: Execution
          </h1>
          <p className="text-slate-500">
            Locked University:{" "}
            <b>{lockedUniversity.name}</b>
          </p>

          <p className="text-sm mt-2">
            Confidence: <b>{confidence}%</b> · Risk:{" "}
            <b
              className={
                risk === "HIGH"
                  ? "text-red-600"
                  : risk === "MEDIUM"
                  ? "text-orange-500"
                  : "text-green-600"
              }
            >
              {risk}
            </b>
          </p>
        </div>

        {/* 🔥 DAILY FOCUS */}
        {dailyFocus && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="font-bold text-lg mb-1">
              🎯 Today’s Focus
            </h2>
            <p className="font-semibold">
              {dailyFocus.task.title}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              {dailyFocus.reasoning}
            </p>
          </div>
        )}

        {/* ⚠️ ESCALATION */}
        {shouldEscalate && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="font-bold text-red-700 mb-2">
              ⚠️ High Risk Detected
            </h2>
            <p className="text-sm text-red-600 mb-4">
              Your confidence is dropping and critical tasks are pending.
              Speaking with an expert now can prevent delays or rejection.
            </p>
            <button className="bg-red-600 text-white px-5 py-3 rounded-lg font-bold">
              Talk to an Expert Counsellor
            </button>
          </div>
        )}

        {/* TASK LIST */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="font-bold text-lg">
              Application Tasks
            </h2>
          </div>

          <ul className="divide-y">
            {tasks.map((task) => (
              <li key={task.id} className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {task.category}
                    </p>
                  </div>

                  {task.status === "DONE" ? (
                    <span className="text-green-600 font-bold">
                      ✓ Completed
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        updateTaskStatus(task.id, "DONE")
                      }
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold"
                    >
                      Mark Done
                    </button>
                  )}
                </div>

                {/* EXPLANATIONS */}
                <div className="text-sm text-slate-600 space-y-2">
                  <p>{getTaskExplanation(task)}</p>

                  {expandedTask === task.id && (
                    <p className="italic text-slate-500">
                      {geminiExplanation[task.id] ||
                        "Loading AI explanation..."}
                    </p>
                  )}

                  <button
                    onClick={() => {
                      setExpandedTask(task.id);
                      loadGeminiExplanation(task);
                    }}
                    className="text-primary text-xs font-semibold hover:underline"
                  >
                    Why does this matter?
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
