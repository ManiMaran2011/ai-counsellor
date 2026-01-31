import { Suspense } from "react";
import InsightClient from "./InsightClient";

export default function InsightPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading insights…</div>}>
      <InsightClient />
    </Suspense>
  );
}
