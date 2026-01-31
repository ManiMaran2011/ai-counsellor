"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { explainUniversityWithGemini } from "@/app/engine/geminiUniversityReasoner";

export default function AICounsellor({
  university,
  category,
}: {
  university: string;
  category: "DREAM" | "TARGET" | "SAFE";
}) {
  const { profile, stage, confidence, risk } = useUser();
  const [message, setMessage] = useState("Analyzing profile…");

  useEffect(() => {
    if (!profile) return;

    explainUniversityWithGemini({
      universityName: university,
      category,
      profile,
    }).then(setMessage);
  }, [profile, university, category]);

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-md space-y-4 transition-all">
      <div className="flex items-center gap-3">
        <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
          <span className="material-symbols-outlined">
            psychology
          </span>
        </div>
        <div>
          <p className="font-bold">AI Counsellor</p>
          <p className="text-xs text-primary uppercase font-semibold">
            Stage {stage} · Confidence {confidence}%
          </p>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 leading-relaxed">
        {message}
      </div>

      {risk === "HIGH" && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-sm">
          ⚠️ I recommend expert review. Risk is increasing.
        </div>
      )}

      <p className="text-xs text-slate-400 italic">
        Decisions are based on your current profile and progress.
      </p>
    </div>
  );
}
