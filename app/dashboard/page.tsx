"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import AICounsellor from "@/app/components/AICounsellor";

/* ================= TYPES ================= */

export type UniversityCard = {
  id: string;
  name: string;
  category: "DREAM" | "TARGET" | "SAFE";
  baseRisk: "LOW" | "MEDIUM" | "HIGH";
};

/* ================= DISCOVERY (DEMO DATA) ================= */

function discoverUniversities(): UniversityCard[] {
  return [
    {
      id: "u-toronto",
      name: "University of Toronto",
      category: "TARGET",
      baseRisk: "MEDIUM",
    },
    {
      id: "mit",
      name: "MIT",
      category: "DREAM",
      baseRisk: "HIGH",
    },
    {
      id: "alberta",
      name: "University of Alberta",
      category: "SAFE",
      baseRisk: "LOW",
    },
  ];
}

/* ================= PAGE ================= */

export default function DashboardPage() {
  const {
    profile,
    stage,
    confidence,
    risk,
    lockedUniversity,
    decayConfidence,
  } = useUser();

  const router = useRouter();
  const universities = useMemo(discoverUniversities, []);

  /* ================= ROUTE GUARD ================= */

  useEffect(() => {
    if (!profile || stage < 2) {
      router.replace("/onboarding");
    }
  }, [profile, stage, router]);

  /* ================= CONFIDENCE DECAY ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      decayConfidence(3); // gentle pressure
    }, 30_000);

    return () => clearTimeout(timer);
  }, [decayConfidence]);

  if (!profile) return null;

  /* ================= UI ================= */

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-3xl font-black">
          Your Study-Abroad Dashboard
        </h1>
        <p className="text-slate-500">
          Stage {stage} · Decision & Execution Mode
        </p>
      </section>

      {/* ================= CONFIDENCE ================= */}
      <section className="bg-white border rounded-2xl p-6 space-y-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Execution Confidence</p>
          <span className="text-sm font-bold">{confidence}%</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              confidence > 70
                ? "bg-green-500"
                : confidence > 40
                ? "bg-primary"
                : "bg-red-500"
            }`}
            style={{ width: `${confidence}%` }}
          />
        </div>

        {risk === "HIGH" && confidence < 60 && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
            ⚠️ Your confidence is dropping and risk is rising.
            <div className="mt-2">
              <button className="font-bold text-red-600 underline">
                Talk to expert counsellor
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ================= AI COUNSELLOR ================= */}
      <AICounsellor universities={universities} />

      {/* ================= LOCKED ================= */}
      {lockedUniversity && (
        <section className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <p className="font-bold text-green-700">
            Locked University
          </p>
          <p className="text-sm text-green-600">
            {lockedUniversity.name} — execution activated
          </p>

          <button
            onClick={() => router.push("/execution")}
            className="mt-4 bg-primary text-white px-6 py-2.5 rounded-xl font-bold"
          >
            Go to Execution
          </button>
        </section>
      )}

      {/* ================= DISCOVERY ================= */}
      {!lockedUniversity && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">
            University Recommendations
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <div
                key={uni.id}
                className="bg-white border rounded-2xl p-6 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{uni.name}</h3>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      uni.category === "DREAM"
                        ? "bg-red-100 text-red-600"
                        : uni.category === "TARGET"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {uni.category}
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Base Risk: <b>{uni.baseRisk}</b>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
