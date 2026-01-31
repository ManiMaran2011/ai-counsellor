"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import type { UniversityCard } from "@/app/dashboard/page";

/* ================= AI COUNSELLOR ================= */

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

  const [analysis, setAnalysis] = useState<Record<string, string>>({});
  const [recommended, setRecommended] =
    useState<UniversityCard | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= GEMINI RISK ANALYSIS ================= */

  useEffect(() => {
    async function analyze() {
      setLoading(true);

      const result: Record<string, string> = {};

      for (const uni of universities) {
        const res = await fetch("/api/ai/counsellor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "UNIVERSITY_RISK",
            university: uni.name,
            category: uni.category,
            confidence,
          }),
        });

        const data = await res.json();
        result[uni.id] = data.text;
      }

      setAnalysis(result);

      const target = universities.find(
        (u) => u.category === "TARGET"
      );
      if (target) setRecommended(target);

      setLoading(false);
    }

    if (stage === 2) analyze();
  }, [universities, stage, confidence]);

  /* ================= UI ================= */

  return (
    <section className="bg-white border rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="size-10 bg-primary text-white rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">
            smart_toy
          </span>
        </div>
        <div>
          <p className="font-bold">AI Counsellor</p>
          <p className="text-xs text-primary uppercase">
            Decision Intelligence Active
          </p>
        </div>
      </div>

      {loading && (
        <p className="text-sm text-slate-500">
          Analyzing universities and risks…
        </p>
      )}

      {!loading &&
        universities.map((uni) => (
          <div
            key={uni.id}
            className="bg-slate-50 rounded-xl p-4 text-sm"
          >
            <p className="font-semibold mb-1">
              {uni.name}
            </p>
            <p className="text-slate-700">
              {analysis[uni.id]}
            </p>
          </div>
        ))}

      {recommended && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-blue-700">
            AI Recommendation
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Based on your profile and confidence level, now is
            the optimal time to lock{" "}
            <b>{recommended.name}</b> to avoid execution drift.
          </p>

          <button
            onClick={() => {
              lockUniversity({
                id: recommended.id,
                name: recommended.name,
              });
              increaseConfidence(10);
            }}
            className="mt-3 bg-primary text-white px-5 py-2 rounded-xl font-bold"
          >
            Lock {recommended.name}
          </button>
        </div>
      )}
    </section>
  );
}
