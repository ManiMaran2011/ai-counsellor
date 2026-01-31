"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext";

/* ================= MOTION PRESETS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* ================= PAGE ================= */

export default function DashboardPage() {
  const router = useRouter();
  const {
    profile,
    stage,
    confidence,
    risk,
    lockedUniversity,
  } = useUser();

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="max-w-6xl mx-auto space-y-10"
      >
        {/* ================= ORIENTATION ================= */}
        <motion.div variants={fadeUp}>
          <div className="rounded-xl border bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Your Application Journey
            </p>
            <p className="font-semibold text-slate-800">
              Stage {stage} · Profile completed
            </p>
          </div>
        </motion.div>

        {/* ================= HEADER ================= */}
        <motion.div variants={fadeUp}>
          <h1 className="text-4xl font-bold text-charcoal">
            Welcome back, {profile.name}
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl">
            Here’s where things stand — and what to focus on next.
          </p>
        </motion.div>

        {/* ================= STATUS GRID ================= */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Profile Summary */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 border shadow-sm"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
              Profile Summary
            </p>
            <p className="font-semibold">{profile.goals.targetDegree}</p>
            <p className="text-sm text-slate-500">
              {profile.goals.countries.join(", ")}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Budget: ₹{profile.budget.annualINR}L
            </p>
          </motion.div>

          {/* Confidence Meter */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 border shadow-sm"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
              Application Strength
            </p>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-500">Confidence</span>
              <span className="font-bold">{confidence}%</span>
            </div>

            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-primary"
              />
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Improves as tasks are completed
            </p>
          </motion.div>

          {/* Risk */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 border shadow-sm"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
              Risk Level
            </p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                risk === "HIGH"
                  ? "bg-red-100 text-red-700"
                  : risk === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {risk}
            </span>

            <p className="text-sm text-slate-500 mt-3">
              Based on deadlines & readiness
            </p>
          </motion.div>
        </motion.div>

        {/* ================= AI COUNSELLOR ================= */}
        <motion.div
          variants={fadeUp}
          className="bg-white border rounded-2xl p-8 shadow-sm"
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
            AI Counsellor Recommendation
          </p>

          {!lockedUniversity ? (
            <>
              <p className="text-lg font-semibold mb-4">
                You’re ready to shortlist universities.
              </p>

              <p className="text-slate-600 mb-6 max-w-2xl">
                Based on your profile and confidence level, you have a strong
                chance at at least one Target university.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/dashboard/insight")}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
              >
                Discover University Matches →
              </motion.button>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold mb-2">
                Execution mode active
              </p>
              <p className="text-slate-600 mb-4">
                You’ve locked <strong>{lockedUniversity.name}</strong>.
                Focus on completing tasks to reduce risk.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/execution")}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
              >
                Continue Execution →
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
