"use client";

import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext";

export function AICounsellorPanel() {
  const { stage, confidence, risk, lockedUniversity } = useUser();

  let message = "";

  if (stage < 4) {
    message =
      "You’re still exploring. Your next move is to discover universities that match your profile.";
  } else if (confidence < 45) {
    message =
      "Your confidence is dropping. Delays at this stage significantly reduce admission probability.";
  } else if (risk === "HIGH") {
    message =
      "This execution path is high-risk. Precision and timing matter now.";
  } else {
    message =
      "You’re on track. Focus on completing the highest-risk tasks first.";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-slate-200"
    >
      <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
        AI Counsellor
      </p>
      <p className="leading-relaxed">{message}</p>

      {stage === 4 && confidence < 40 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 py-3 rounded-xl font-bold">
            Get Expert Help Now
          </button>
        </div>
      )}
    </motion.div>
  );
}
