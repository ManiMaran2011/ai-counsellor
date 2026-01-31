"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { LockConfirmation } from "@/app/components/LockConfirmation";

type Uni = {
  id: string;
  name: string;
  category: "DREAM" | "TARGET" | "SAFE";
  reason: string;
};

const UNIVERSITIES: Uni[] = [
  {
    id: "u1",
    name: "Stanford University",
    category: "DREAM",
    reason: "Top-tier, extremely competitive for your current profile",
  },
  {
    id: "u2",
    name: "University of Toronto",
    category: "TARGET",
    reason: "Strong fit based on budget, profile & readiness",
  },
  {
    id: "u3",
    name: "Arizona State University",
    category: "SAFE",
    reason: "High acceptance probability with current credentials",
  },
];

export default function InsightPage() {
  const router = useRouter();
  const { lockUniversity } = useUser();
  const [confirm, setConfirm] = useState<Uni | null>(null);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">
            University Discovery
          </p>
          <h1 className="text-4xl font-bold">
            Choose where you commit
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl">
            Locking a university activates deadlines, task pressure,
            and execution mode. Choose wisely.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UNIVERSITIES.map((uni) => (
            <motion.div
              key={uni.id}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl p-6 border cursor-pointer
                ${
                  uni.category === "DREAM"
                    ? "border-red-400/40 bg-red-500/10"
                    : uni.category === "TARGET"
                    ? "border-yellow-400/40 bg-yellow-500/10"
                    : "border-green-400/40 bg-green-500/10"
                }`}
              onClick={() => setConfirm(uni)}
            >
              <p className="text-xs uppercase tracking-widest opacity-70">
                {uni.category}
              </p>
              <h3 className="text-xl font-bold mt-2">{uni.name}</h3>
              <p className="text-sm text-slate-300 mt-3">
                {uni.reason}
              </p>

              <div className="mt-6 font-bold text-sm text-primary">
                Lock this university →
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CONFIRMATION */}
      <AnimatePresence>
        {confirm && (
          <LockConfirmation
            university={confirm}
            onCancel={() => setConfirm(null)}
            onConfirm={() => {
              lockUniversity({
                id: confirm.id,
                name: confirm.name,
                category: confirm.category,
              });
              router.push("/execution");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
