"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext";
import { generateTasks } from "@/app/engine/taskEngine";

type UniversityLite = {
  id: string;
  name: string;
  category: "DREAM" | "TARGET" | "SAFE";
};

export default function AICounsellor({
  universities,
}: {
  universities: UniversityLite[];
}) {
  const {
    stage,
    confidence,
    profile,
    lockUniversity,
  } = useUser();

  const [confirm, setConfirm] = useState<UniversityLite | null>(null);

  const targetUni = universities.find(
    (u) => u.category === "TARGET"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border rounded-2xl p-5 shadow-sm space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
          <span className="material-symbols-outlined">
            smart_toy
          </span>
        </div>
        <div>
          <p className="font-bold">AI Counsellor</p>
          <p className="text-xs text-primary font-semibold uppercase">
            Stage {stage} · Confidence {confidence}%
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700">
        {stage === 2 && targetUni ? (
          <>
            Based on your profile,{" "}
            <b>{targetUni.name}</b> is a strong{" "}
            <b>Target</b> university.  
            Locking it now allows us to generate a focused
            execution roadmap.
          </>
        ) : (
          <>I’m monitoring your progress and risks.</>
        )}
      </div>

      {/* Action */}
      {stage === 2 && targetUni && profile && (
        <button
          onClick={() => setConfirm(targetUni)}
          className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition"
        >
          Lock {targetUni.name}
        </button>
      )}

      {/* CONFIRM MODAL */}
      {confirm && profile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-sm"
          >
            <h3 className="text-lg font-bold mb-2">
              Lock {confirm.name}?
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              This will commit your strategy and generate
              application tasks.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const tasks = generateTasks({
                    profile,
                    university: {
                      id: confirm.id,
                      name: confirm.name,
                    },
                  });

                  lockUniversity(
                    {
                      id: confirm.id,
                      name: confirm.name,
                    },
                    tasks // ✅ CORRECT SECOND ARG
                  );

                  setConfirm(null);
                }}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-bold"
              >
                Yes, Lock
              </button>

              <button
                onClick={() => setConfirm(null)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
