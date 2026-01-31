"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import AICounsellor from "@/app/components/AICounsellor";

export default function DashboardPage() {
  const router = useRouter();
  const {
    profile,
    stage,
    confidence,
    lockedUniversity,
  } = useUser();

  useEffect(() => {
    if (!profile || stage < 2) {
      router.replace("/onboarding/step1");
    }
  }, [profile, stage, router]);

  if (!profile || stage < 2) return null;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-black">
            Your Dashboard
          </h1>
          <p className="text-slate-500">
            Confidence {confidence}%
          </p>
        </header>

        <div className="w-full h-3 bg-slate-200 rounded-full">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${confidence}%` }}
          />
        </div>

        <AICounsellor />

        {lockedUniversity && (
          <div className="bg-green-50 border p-4 rounded-xl">
            Execution active for{" "}
            <b>{lockedUniversity.name}</b>
          </div>
        )}
      </div>
    </main>
  );
}
