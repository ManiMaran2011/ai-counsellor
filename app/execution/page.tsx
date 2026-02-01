"use client";

import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext";
import { useMemo, useState, useEffect } from "react";

/* ---------- Page ---------- */

export default function ExecutionPage() {
  const {
    lockedUniversity,
    tasks,
    completeTask,
    confidence,
  } = useUser();

  const dailyFocus = useMemo(
    () => tasks.find((t) => t.status !== "DONE"),
    [tasks]
  );

  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    if (!dailyFocus) return;

    import("@/app/engine/taskExplanationEngine").then(
      ({ explainTask }) => {
        explainTask(dailyFocus).then(setExplanation);
      }
    );
  }, [dailyFocus]);

  if (!lockedUniversity) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        No university locked yet.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">Execution Mode</h1>
        <p className="text-slate-500">
          Applying to <b>{lockedUniversity.name}</b>
        </p>
      </header>

      {/* Confidence */}
      <section className="bg-white p-5 rounded-xl border">
        <p className="text-sm text-slate-500 mb-2">Profile Confidence</p>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${confidence}%` }}
          />
        </div>
        <p className="mt-2 font-bold">{confidence}%</p>
      </section>

      {/* Daily Focus */}
      {dailyFocus && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft-blue p-6 rounded-xl border"
        >
          <h2 className="font-bold mb-2">🎯 Today’s Focus</h2>
          <p className="mb-3">{dailyFocus.title}</p>

          {explanation && (
            <p className="text-sm text-slate-600 mb-4">
              {explanation}
            </p>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => completeTask(dailyFocus.id)}
            className="bg-primary text-white px-5 py-2 rounded-lg font-bold"
          >
            Mark Complete
          </motion.button>
        </motion.section>
      )}

      {/* Task List */}
      <section>
        <h2 className="font-bold mb-4">All Tasks</h2>
        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-lg border flex justify-between items-center ${
                t.status === "DONE"
                  ? "bg-slate-50 text-slate-400"
                  : "bg-white"
              }`}
            >
              <span>{t.title}</span>
              <span className="text-xs font-bold">
                {t.status === "DONE" ? "DONE" : t.risk}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
