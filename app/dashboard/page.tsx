"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { profile, stage, confidence, risk, lockedUniversity } = useUser();

  const [ready, setReady] = useState(false);

  // ✅ Wait for hydration
  useEffect(() => {
    setReady(true);
  }, []);

  // ⏳ Prevent blank screen during hydration
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <p className="text-slate-400 text-sm">Loading dashboard…</p>
      </div>
    );
  }

  // 🔒 Onboarding safety
  if (!profile) {
    router.replace("/onboarding/step1");
    return null;
  }

  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-3xl font-bold">
          Welcome back, {profile.name}
        </h1>
        <p className="text-slate-500">
          This is your control center.
        </p>
      </header>

      {/* ================= WHERE AM I ================= */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Where am I?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Info label="Stage" value={`Stage ${stage}`} />
          <Info label="Degree" value={profile.goals.targetDegree || "—"} />
          <Info
            label="Countries"
            value={
              profile.goals.countries.length
                ? profile.goals.countries.join(", ")
                : "—"
            }
          />
        </div>
      </section>

      {/* ================= WHAT NEXT ================= */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-4">What should I do next?</h2>

        {!lockedUniversity ? (
          <div className="flex justify-between items-center">
            <p className="text-slate-600">
              Discover universities that match your profile.
            </p>
            <button
              onClick={() => router.push("/dashboard/insight")}
              className="px-6 py-3 rounded-xl bg-primary text-white font-bold"
            >
              Discover Universities →
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-slate-600">
              Applying to{" "}
              <span className="font-semibold">
                {lockedUniversity.name}
              </span>
            </p>
            <button
              onClick={() => router.push("/execution")}
              className="px-6 py-3 rounded-xl bg-primary text-white font-bold"
            >
              Go to Execution →
            </button>
          </div>
        )}
      </section>

      {/* ================= STRENGTH ================= */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-4">How strong am I?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">Confidence</p>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${confidence}%` }}
              />
            </div>
            <p className="mt-2 font-bold">{confidence}%</p>
          </div>

          <Info label="Risk Level" value={risk} />
          <Info
            label="Budget"
            value={`₹${profile.budget.annualINR} LPA`}
          />
        </div>
      </section>
    </div>
  );
}

/* ---------- Helper ---------- */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border">
      <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
