"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext";

type UniversityCard = {
  id: string;
  name: string;
  category: "DREAM" | "TARGET" | "SAFE";
  risk: "LOW" | "MEDIUM" | "HIGH";
  reason: string;
};

export default function AICounsellor({
  universities,
}: {
  universities: UniversityCard[];
}) {
  const {
    stage,
    confidence,
    lockUniversity,
    increaseConfidence,
  } = useUser();

  const [confirm, setConfirm] = useState<UniversityCard | null>(
    null
  );

  const target = universities.find(
    (u) => u.category === "TARGET"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
          🤖
        </div>
        <div>
          <p className="font-bold">AI Counsellor</p>
          <p className="text-xs text-primary">
            Stage {stage} · Confidence {confidence}%
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-700">
        Based on your profile, I recommend locking a
        <b> Target university</b> to maximize acceptance while
        minimizing risk.
      </p>

      {target && (
        <button
          onClick={() => setConfirm(target)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold"
        >
          Lock {target.name}
        </button>
      )}

      {/* Confirmation */}
      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="font-bold mb-2">
              Lock {confirm.name}?
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Locking focuses your entire strategy on execution.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  lockUniversity({
                    id: confirm.id,
                    name: confirm.name,
                  });
                  increaseConfidence(15);
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
          </div>
        </div>
      )}
    </motion.div>
  );
}
