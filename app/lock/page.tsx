import { Suspense } from "react";
import LockClient from "./LockClient";

export default function LockPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-500">
          Preparing lock…
        </div>
      }
    >
      <LockClient />
    </Suspense>
  );
}
