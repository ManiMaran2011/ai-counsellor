"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function DashboardPage() {
  const router = useRouter();

  const {
    profile,
    stage,
    confidence,
    risk,
    lockedUniversity,
  } = useUser();

  // Safety: onboarding not complete
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <h2 className="text-2xl font-bold mb-2">
          Profile not ready
        </h2>
        <p className="text-slate-500 mb-6">
          Please complete onboarding to continue.
        </p>
        <button
          onClick={() => router.push("/onboarding/step1")}
          className="px-6 py-3 rounded-xl bg-primary text-white font-bold"
        >
          Start Onboarding
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ================= HEADER ================= */}
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            Your Study Abroad Dashboard
          </h1>
          <p className="text-slate-600">
            This is your control center. Everything starts here.
          </p>
        </header>

        {/* ================= WHERE AM I ================= */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4">
            Where am I?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard
              label="Current Stage"
              value={`Stage ${stage}`}
            />
            <InfoCard
              label="Target Degree"
              value={profile.goals.targetDegree || "Not set"}
            />
            <InfoCard
              label="Preferred Countries"
              value={
                profile.goals.countries.length > 0
                  ? profile.goals.countries.join(", ")
                  : "Not set"
              }
            />
          </div>
        </section>

        {/* ================= WHAT SHOULD I DO ================= */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4">
            What should I do next?
          </h2>

          {!lockedUniversity ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="font-semibold mb-1">
                  Discover universities that fit you
                </p>
                <p className="text-slate-500">
                  Based on your profile, budget, and readiness.
                </p>
              </div>

              <button
                onClick={() => router.push("/dashboard/insight")}
                className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90"
              >
                Discover Universities →
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="font-semibold mb-1">
                  Execution in progress
                </p>
                <p className="text-slate-500">
                  You are applying to{" "}
                  <span className="font-semibold">
                    {lockedUniversity.name}
                  </span>
                </p>
              </div>

              <button
                onClick={() => router.push("/execution")}
                className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90"
              >
                Go to Execution →
              </button>
            </div>
          )}
        </section>

        {/* ================= HOW STRONG AM I ================= */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4">
            How strong is my profile?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Confidence */}
            <div>
              <p className="text-sm text-slate-500 mb-1">
                Confidence
              </p>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <p className="mt-2 font-bold">
                {confidence}%
              </p>
            </div>

            {/* Risk */}
            <InfoCard
              label="Risk Level"
              value={risk}
            />

            {/* Budget */}
            <InfoCard
              label="Annual Budget"
              value={`₹${profile.budget.annualINR} LPA`}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
      <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-lg font-bold">
        {value}
      </p>
    </div>
  );
}
