"use client";

import { useUser } from "@/app/context/UserContext";

function getTone(stage: number, confidence: number) {
  if (stage === 4 && confidence < 50)
    return "calm, reassuring, supportive";

  if (stage === 4 && confidence >= 80)
    return "confident, strategic, motivating";

  if (stage === 2)
    return "analytical, explanatory";

  return "neutral, guiding";
}

function getOpeningMessage(stage: number, confidence: number) {
  if (stage === 4 && confidence < 60)
    return "Let’s slow down and stabilize your application. We still have time.";

  if (stage === 4)
    return "You’re in execution mode. Let’s focus on high-impact actions.";

  if (stage === 2)
    return "Let’s evaluate universities based on your profile and risks.";

  return "I’m here to guide your journey step by step.";
}

export default function AICounsellor() {
  const { stage, confidence } = useUser();

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
          <span className="material-symbols-outlined">smart_toy</span>
        </div>
        <div>
          <p className="font-bold">AI Counsellor</p>
          <p className="text-xs text-primary uppercase font-semibold">
            Stage {stage} · Confidence {confidence}%
          </p>
        </div>
      </div>

      <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700">
        {getOpeningMessage(stage, confidence)}
      </div>

      <div className="text-xs text-slate-400 italic">
        Tone: {getTone(stage, confidence)}
      </div>
    </div>
  );
}









