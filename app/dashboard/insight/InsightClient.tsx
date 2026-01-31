"use client";

import { useSearchParams } from "next/navigation";

export default function InsightClient() {
  const params = useSearchParams();
  const uni = params.get("uni");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        University Insight
      </h1>

      <p className="text-slate-500 mt-2">
        Showing insights for: <b>{uni ?? "Unknown"}</b>
      </p>
    </div>
  );
}
