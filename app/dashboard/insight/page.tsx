"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

/* ================= DUMMY DATA ================= */

const UNIVERSITIES = [
  { id: "u1", name: "Stanford University", avgCost: 90, tier: "DREAM" },
  { id: "u2", name: "University of Toronto", avgCost: 55, tier: "TARGET" },
  { id: "u3", name: "University of Melbourne", avgCost: 50, tier: "TARGET" },
  { id: "u4", name: "TU Munich", avgCost: 30, tier: "SAFE" },
  { id: "u5", name: "University of Warsaw", avgCost: 20, tier: "SAFE" },
];

export default function InsightPage() {
  const router = useRouter();
  const { profile, lockUniversity } = useUser();

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400 text-sm">
          Preparing university insights…
        </p>
      </div>
    );
  }

  /* ================= NORMALIZATION (IMPORTANT) ================= */

  const budgetLimit = Number(
    profile.budget?.annualINR ?? 0
  );

  const confidenceBuffer = 10;

  const visibleUniversities = UNIVERSITIES.filter(
    (u) => u.avgCost <= budgetLimit + confidenceBuffer
  );

  /* ================= UI ================= */

  return (
    <div className="space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold mb-2">
          University Discovery
        </h1>
        <p className="text-slate-500">
          Based on your budget, readiness, and profile strength
        </p>
      </header>

      {/* Groups */}
      {["DREAM", "TARGET", "SAFE"].map((tier) => {
        const group = visibleUniversities.filter(
          (u) => u.tier === tier
        );

        if (group.length === 0) return null;

        return (
          <section key={tier}>
            <h2 className="text-xl font-bold mb-4">
              {tier} Universities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.map((u) => (
                <div
                  key={u.id}
                  className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold">
                    {u.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Avg annual cost: ₹{u.avgCost}L
                  </p>

                  <button
                    onClick={() => lockUniversity({ id: u.id, name: u.name })}
                    className="mt-4 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90"
                  >
                    Lock this university
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Back */}
      <button
        onClick={() => router.push("/dashboard")}
        className="text-sm text-slate-500 hover:text-primary"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}
