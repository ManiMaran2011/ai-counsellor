"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { profile, stage, lockedUniversity } = useUser();
  const router = useRouter();

  // Hard gate: onboarding must be complete
  useEffect(() => {
    if (!profile) {
      router.replace("/onboarding");
    }
  }, [profile, router]);

  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-slate-500">
          Current Stage: <b>Stage {stage}</b>
        </p>
      </div>

      {/* STAGE 2 & 3 */}
      {stage >= 2 && !lockedUniversity && (
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold">
            University Discovery
          </h2>
          <p className="text-slate-600 text-sm">
            Review AI-recommended universities and lock one to proceed.
          </p>

          <button
            onClick={() =>
              router.push("/lock?uni=toronto")
            }
            className="bg-primary text-white px-6 py-3 rounded-lg font-bold"
          >
            Lock a University
          </button>
        </div>
      )}

      {/* STAGE 4 */}
      {stage === 4 && lockedUniversity && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-green-700">
            Execution Active
          </h2>
          <p className="text-sm text-green-600">
            Locked University:{" "}
            <b>{lockedUniversity.name}</b>
          </p>

          <button
            onClick={() => router.push("/execution")}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            Go to Execution
          </button>
        </div>
      )}
    </div>
  );
}
