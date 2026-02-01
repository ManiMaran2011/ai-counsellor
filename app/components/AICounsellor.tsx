"use client";

import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext";

export default function AICounsellor() {
  const { confidence, lockedUniversity } = useUser();

  const base =
    "rounded-xl border p-5 bg-soft-blue shadow-sm";

  if (lockedUniversity) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={base}
      >
        <p className="font-bold text-primary">
          Execution Mode Active
        </p>
        <p className="text-sm text-slate-600 mt-1">
          Every completed task increases your acceptance probability.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={base}
    >
      <p className="font-bold">
        AI Counsellor Insight
      </p>

      {confidence >= 70 ? (
        <p className="text-sm text-slate-600 mt-1">
          Your profile is strong. Locking a <b>TARGET</b> university
          now maximizes success.
        </p>
      ) : (
        <p className="text-sm text-slate-600 mt-1">
          Strengthen your profile before targeting competitive universities.
        </p>
      )}
    </motion.div>
  );
}
