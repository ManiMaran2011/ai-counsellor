"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext";
import AICounsellor from "@/app/components/AICounsellor";

/* ---------- Types ---------- */

type UniversityCard = {
  id: string;
  name: string;
  category: "DREAM" | "TARGET" | "SAFE";
  risk: "LOW" | "MEDIUM" | "HIGH";
  reason: string;
};

/* ---------- Mock Logic (Replace with real data later) ---------- */

function getUniversities(): UniversityCard[] {
  return [
    {
      id: "u1",
      name: "University of Toronto",
      category: "DREAM",
      risk: "HIGH",
      reason: "Top-ranked program with high GPA expectations.",
    },
    {
      id: "u2",
      name: "University of British Columbia",
      category: "TARGET",
      risk: "MEDIUM",
      reason: "Strong fit based on GPA and program alignment.",
    },
    {
      id: "u3",
      name: "Simon Fraser University",
      category: "SAFE",
      risk: "LOW",
      reason: "High acceptance probability for your profile.",
    },
  ];
}

export default function DashboardPage() {
  const router = useRouter();
  const {
    profile,
    stage,
    lockedUniversity,
    confidence,
    risk,
    decayConfidence,
  } = useUser();

  const [universities] = useState(getUniversities());

  /* ---------- Guards ---------- */

  useEffect(() => {
    if (!profile) {
      router.replace("/onboarding/step1");
    }
  }, [profile, router]);

  /* ---------- Confidence decay ---------- */

  useEffect(() => {
    const timer = setInterval(() => {
      decayConfidence(2); // slow decay
    }, 15000);

    return () => clearInterval(timer);
  }, [decayConfidence]);

  if (!profile) return null;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">
              Your Admission Strategy
            </h1>
            <p className="text-slate-500">
              Stage {stage} · Confidence {confidence}%
            </p>
          </div>

          <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        {/* AI Counsellor */}
        <AICounsellor universities={universities} />

        {/* Locked University Banner */}
        {lockedUniversity && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4"
          >
            <p className="font-bold text-green-700">
              Locked University
            </p>
            <p className="text-sm text-green-600">
              {lockedUniversity.name} — Execution unlocked
            </p>
          </motion.div>
        )}

        {/* University Cards */}
        {!lockedUniversity && (
          <div className="grid md:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <motion.div
                key={uni.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl border p-6 shadow-sm"
              >
                <p className="text-xs uppercase font-bold text-slate-400">
                  {uni.category}
                </p>
                <h3 className="text-lg font-bold mb-2">
                  {uni.name}
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  {uni.reason}
                </p>
                <span
                  className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                    uni.risk === "HIGH"
                      ? "bg-red-100 text-red-600"
                      : uni.risk === "MEDIUM"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  Risk: {uni.risk}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
