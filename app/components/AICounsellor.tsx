"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { counsellorRecommendation } from "@/app/engine/counsellorEngine";
import type { University } from "@/app/context/UserContext";

type Props = {
  universities: University[];
};

export default function AICounsellor({ universities }: Props) {
  const {
    profile,
    confidence,
    lockedUniversity,
    lockUniversity,
  } = useUser();

  const [recommended, setRecommended] = useState<University | null>(null);
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");

  useEffect(() => {
    if (!profile || lockedUniversity || universities.length === 0) return;

    // 🎯 Pick BEST target university (not dream, not safe)
    const target =
      universities.find((u) => u.category === "TARGET") ??
      universities.find((u) => u.category === "SAFE");

    if (!target) return;

    const result = counsellorRecommendation(
      profile,
      target,
      confidence
    );

    setRecommended(target);
    setMessage(result.recommendation);
    setUrgency(result.urgency);
  }, [profile, confidence, universities, lockedUniversity]);

  if (!recommended || lockedUniversity) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
      <div className="flex items-start gap-4">
        <div className="text-primary font-bold">AI</div>

        <div className="flex-1">
          <p className="text-sm text-slate-700 leading-relaxed">
            {message}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                urgency === "HIGH"
                  ? "bg-red-100 text-red-600"
                  : urgency === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {urgency} URGENCY
            </span>

            <button
              onClick={() => lockUniversity(recommended)}
              className="ml-auto bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90"
            >
              Lock {recommended.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
