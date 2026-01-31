"use client";

import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

type UniversityCard = {
  id: string;
  name: string;
  category: "DREAM" | "TARGET" | "SAFE";
};

export default function AICounsellor({
  universities = [],
}: {
  universities?: UniversityCard[];
}) {
  const {
    stage,
    confidence,
    risk,
    lockUniversity,
  } = useUser();

  const [analysis, setAnalysis] = useState<Record<string, string>>({});
  const [confirmLock, setConfirmLock] = useState<UniversityCard | null>(null);

  /* =========================
     MOCK AI ANALYSIS (SAFE)
     (Gemini can replace this later)
  ========================= */

  const analyzeUniversity = async (uni: UniversityCard) => {
    // Placeholder reasoning (LLM-ready)
    const explanation =
      uni.category === "TARGET"
        ? "This university matches your academic profile and budget. Locking now gives you enough buffer for SOP, tests, and visa prep."
        : uni.category === "DREAM"
        ? "This is ambitious. Your GPA and test readiness make this risky without strong SOP and recommendations."
        : "This is a safe option with high acceptance probability, but may offer fewer long-term advantages.";

    setAnalysis((prev) => ({
      ...prev,
      [uni.id]: explanation,
    }));
  };

  /* =========================
     AUTO-LOCK SUGGESTION
  ========================= */

  const suggestedLock =
    universities.find((u) => u.category === "TARGET") ?? null;

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
          <span className="material-symbols-outlined">smart_toy</span>
        </div>
        <div>
          <p className="font-bold">AI Counsellor</p>
          <p className="text-xs text-slate-500">
            Stage {stage} · Confidence {confidence}% · Risk {risk}
          </p>
        </div>
      </div>

      {/* MESSAGE */}
      <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700">
        {stage === 2 &&
          "I’ve evaluated your profile. Let’s shortlist universities strategically."}
        {stage === 4 &&
          confidence < 60 &&
          "You’re under execution pressure. Focus on completing one high-impact task today."}
        {stage === 4 &&
          confidence >= 60 &&
          "You’re doing well. Maintain momentum and avoid deadline risk."}
      </div>

      {/* AUTO LOCK CTA */}
      {stage === 2 && suggestedLock && (
        <div className="border border-blue-200 bg-blue-50 rounded-lg p-3 text-sm">
          <p className="font-semibold mb-1">
            Suggested next step
          </p>
          <p className="text-slate-600 mb-3">
            Lock <b>{suggestedLock.name}</b> now to move into execution and avoid last-minute pressure.
          </p>
          <button
            onClick={() => setConfirmLock(suggestedLock)}
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold"
          >
            Review & Lock
          </button>
        </div>
      )}

      {/* UNIVERSITY ANALYSIS */}
      {universities.length > 0 && (
        <div className="space-y-3">
          {universities.map((uni) => (
            <div
              key={uni.id}
              className="border rounded-lg p-3"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{uni.name}</p>
                  <span className="text-xs text-slate-500">
                    {uni.category}
                  </span>
                </div>
                <button
                  onClick={() => analyzeUniversity(uni)}
                  className="text-sm text-primary font-semibold"
                >
                  Analyze Risk
                </button>
              </div>

              {analysis[uni.id] && (
                <p className="text-sm text-slate-600 mt-2">
                  {analysis[uni.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CONFIRM LOCK MODAL */}
      {confirmLock && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h2 className="font-bold text-lg mb-2">
              Lock {confirmLock.name}?
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Locking now moves you into execution mode and generates a task roadmap.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  lockUniversity(confirmLock, []);
                  setConfirmLock(null);
                }}
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
    </div>
  );
}
