"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import AICounsellor from "@/app/components/AICounsellor";

/* ================= TYPES ================= */

type UniCategory = "DREAM" | "TARGET" | "SAFE";

type UniversityCard = {
  id: string;
  name: string;
  category: UniCategory;
  risk: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
};

/* ================= COMPONENT ================= */

export default function DashboardPage() {
  const {
    profile,
    stage,
    lockedUniversity,
    lockUniversity,
    confidence,
  } = useUser();

  const router = useRouter();
  const [confirmLock, setConfirmLock] = useState<UniversityCard | null>(null);

  /* ---------- HARD GATE ---------- */
  useEffect(() => {
    if (!profile) router.replace("/onboarding");
  }, [profile, router]);

  if (!profile) return null;

  /* ================= UNIVERSITY LOGIC ================= */
  const universities: UniversityCard[] = [
    {
      id: "u1",
      name: "University of Toronto",
      category: "DREAM",
      risk: "HIGH",
      explanation:
        "Your GPA and exam readiness place this university in a high-competition zone. Admission is possible but statistically risky.",
    },
    {
      id: "u2",
      name: "University of British Columbia",
      category: "TARGET",
      risk: "MEDIUM",
      explanation:
        "Your academics, intake timing, and budget align well. Risk exists but is manageable with a strong SOP.",
    },
    {
      id: "u3",
      name: "York University",
      category: "SAFE",
      risk: "LOW",
      explanation:
        "Your profile exceeds minimum requirements, making acceptance highly likely.",
    },
  ];

  /* ================= ACTIONS ================= */

  const confirmAndLock = (uni: UniversityCard) => {
    lockUniversity({
      id: uni.id,
      name: uni.name,
      program: profile.goals.targetDegree,
    });
    router.push("/execution");
  };

  return (
    <main className="max-w-7xl mx-auto p-8 space-y-10">
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-slate-500">
          Stage {stage} · Discovery & Decision
        </p>
      </header>

      {/* ================= CONFIDENCE METER ================= */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <p className="font-bold mb-2">Execution Confidence</p>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary h-3 transition-all"
            style={{ width: `${confidence}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Confidence increases as you complete high-impact tasks.
        </p>
      </div>

      {/* ================= AI COUNSELLOR ================= */}
      <AICounsellor universities={universities} />

      {/* ================= LOCKED STATE ================= */}
      {lockedUniversity && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="font-bold text-green-700">
            Locked University
          </p>
          <p className="text-sm text-green-600">
            {lockedUniversity.name} — Execution in progress
          </p>
        </div>
      )}

      {/* ================= DISCOVERY ================= */}
      {!lockedUniversity && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold">
            Recommended Universities
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <div
                key={uni.id}
                className="bg-white border rounded-xl p-6 shadow-sm flex flex-col gap-4"
              >
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                    uni.category === "DREAM"
                      ? "bg-red-100 text-red-700"
                      : uni.category === "TARGET"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {uni.category}
                </span>

                <h3 className="text-lg font-bold">
                  {uni.name}
                </h3>

                <p className="text-sm text-slate-600">
                  {uni.explanation}
                </p>

                <p className="text-xs font-semibold text-slate-500">
                  Risk Level:{" "}
                  <span
                    className={
                      uni.risk === "HIGH"
                        ? "text-red-600"
                        : uni.risk === "MEDIUM"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {uni.risk}
                  </span>
                </p>

                <button
                  onClick={() => setConfirmLock(uni)}
                  className="mt-auto bg-primary text-white py-2 rounded-lg font-bold"
                >
                  Lock this University
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= CONFIRM MODAL ================= */}
      {confirmLock && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4">
            <h2 className="text-lg font-bold">
              Lock {confirmLock.name}?
            </h2>

            <p className="text-sm text-slate-500">
              Locking this university moves you to execution mode and generates
              tasks.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => confirmAndLock(confirmLock)}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-bold"
              >
                Confirm Lock
              </button>
              <button
                onClick={() => setConfirmLock(null)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
