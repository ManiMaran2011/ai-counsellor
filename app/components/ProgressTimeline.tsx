"use client";

export default function ProgressTimeline({
  confidence,
  stage,
}: {
  confidence: number;
  stage: number;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border">
      <h3 className="font-bold mb-4">Your Progress</h3>

      <div className="space-y-3 text-sm">
        <div>Stage: {stage} / 4</div>
        <div>
          Confidence:
          <div className="w-full bg-slate-100 h-2 rounded-full mt-1">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
