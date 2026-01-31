"use client";

import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { AICounsellorPanel } from "@/app/components/AICounsellorPanel";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ExecutionPage() {
  const router = useRouter();
  const {
    lockedUniversity,
    tasks,
    completeTask,
    confidence,
    risk,
  } = useUser();

  if (!lockedUniversity) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0b1220] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: EXECUTION */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="lg:col-span-2 space-y-8"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Execution Mode
            </p>
            <h1 className="text-4xl font-bold">
              {lockedUniversity.name}
            </h1>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-sm text-slate-400 mb-3">
              Confidence
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    confidence > 70
                      ? "bg-green-400"
                      : confidence > 45
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className="font-bold">{confidence}%</span>
            </div>

            <p className="mt-3 text-sm">
              Risk Level:{" "}
              <span
                className={
                  risk === "HIGH"
                    ? "text-red-400"
                    : risk === "MEDIUM"
                    ? "text-yellow-400"
                    : "text-green-400"
                }
              >
                {risk}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Required Actions
            </h2>

            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-xs text-slate-400">
                    Risk: {task.risk}
                  </p>
                </div>

                {task.status !== "DONE" && (
                  <button
                    onClick={() => completeTask(task.id)}
                    className="bg-primary px-5 py-2 rounded-xl font-bold"
                  >
                    Mark Done
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: COUNSELLOR */}
        <div className="space-y-6">
          <AICounsellorPanel />
        </div>
      </div>
    </div>
  );
}
