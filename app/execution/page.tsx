"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

/* =========================
   AI COUNSELLOR COPY RULES
========================= */

function getCounsellorMessage({
  university,
  confidence,
  tasks,
}: {
  university: any;
  confidence: number;
  tasks: any[];
}) {
  const pending = tasks.filter((t) => t.status !== "DONE");

  if (pending.length === 0) {
    return {
      title: "Execution complete",
      message:
        "All critical tasks are done. Your application strength is now maximized.",
    };
  }

  const next = pending[0];

  if (next.id === "sop") {
    return {
      title: "High-impact action recommended",
      message:
        "Finalizing your SOP first gives the biggest acceptance boost for this university.",
    };
  }

  if (next.id === "ielts") {
    return {
      title: "Eligibility checkpoint",
      message:
        "Submitting your English test score unlocks full eligibility review.",
    };
  }

  return {
    title: "Next execution step",
    message:
      "Completing tasks in this order minimizes risk and improves success probability.",
  };
}

function getTaskExplanation(taskId: string) {
  switch (taskId) {
    case "sop":
      return "Universities heavily weight SOP quality during shortlisting.";
    case "ielts":
      return "English proficiency is a mandatory eligibility requirement.";
    case "fee":
      return "Applications are only reviewed after fee payment.";
    default:
      return "This task is required to move your application forward.";
  }
}

/* =========================
   PAGE
========================= */

export default function ExecutionPage() {
  const router = useRouter();
  const {
    lockedUniversity,
    tasks,
    completeTask,
    confidence,
  } = useUser();

  const [pulse, setPulse] = useState(false);

  // Safety
  if (!lockedUniversity) {
    router.replace("/dashboard");
    return null;
  }

  const pendingTasks = tasks.filter((t) => t.status !== "DONE");
  const dailyFocus = pendingTasks[0];

  const counsellor = getCounsellorMessage({
    university: lockedUniversity,
    confidence,
    tasks,
  });

  // Animate confidence pulse
  useEffect(() => {
    if (pulse) {
      const t = setTimeout(() => setPulse(false), 600);
      return () => clearTimeout(t);
    }
  }, [pulse]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ================= AI COUNSELLOR ================= */}
      <section className="bg-gradient-to-br from-primary/10 to-white border border-primary/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center">
            🤖
          </div>
          <div>
            <p className="text-sm font-bold text-primary mb-1">
              AI Counsellor
            </p>
            <h2 className="text-lg font-bold mb-1">
              {counsellor.title}
            </h2>
            <p className="text-slate-600">
              {counsellor.message}
            </p>
          </div>
        </div>
      </section>

      {/* ================= DAILY FOCUS ================= */}
      {dailyFocus && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
            Today’s Focus
          </p>

          <h3 className="text-xl font-bold mb-2">
            {dailyFocus.title}
          </h3>

          <p className="text-slate-500 mb-4">
            {getTaskExplanation(dailyFocus.id)}
          </p>

          <button
            onClick={() => {
              completeTask(dailyFocus.id);
              setPulse(true);
            }}
            className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
          >
            Mark Complete
          </button>
        </section>
      )}

      {/* ================= TASK LIST ================= */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">
          Execution Checklist
        </h3>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition ${
                task.status === "DONE"
                  ? "bg-green-50 border-green-200"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div>
                <p className="font-semibold">
                  {task.title}
                </p>
                <p className="text-xs text-slate-500">
                  {getTaskExplanation(task.id)}
                </p>
              </div>

              {task.status === "DONE" ? (
                <span className="text-green-600 font-bold text-sm">
                  ✔ Completed
                </span>
              ) : (
                <button
                  onClick={() => {
                    completeTask(task.id);
                    setPulse(true);
                  }}
                  className="text-sm font-bold text-primary"
                >
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONFIDENCE ================= */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
          Profile Strength
        </p>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-primary transition-all duration-500 ${
                pulse ? "animate-pulse" : ""
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="font-bold">
            {confidence}%
          </span>
        </div>

        {pulse && (
          <p className="text-xs text-slate-500 mt-2">
            AI recalibrating acceptance probability…
          </p>
        )}
      </section>
    </div>
  );
}
