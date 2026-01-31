"use client";

export default function RiskEscalationBanner({
  riskLevel,
  confidence,
  onEscalate,
}: {
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  confidence: number;
  onEscalate: () => void;
}) {
  if (riskLevel !== "HIGH" || confidence >= 60) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4">
      <span className="material-symbols-outlined text-red-500 text-3xl">
        warning
      </span>

      <div className="flex-1">
        <h3 className="font-bold text-red-700 mb-1">
          You’re entering a risk zone
        </h3>

        <p className="text-sm text-red-600 mb-3">
          Deadlines are approaching and key tasks are still pending.
          Getting expert guidance now can significantly improve your chances.
        </p>

        <button
          onClick={onEscalate}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition"
        >
          Talk to an Expert Now
        </button>
      </div>
    </div>
  );
}
