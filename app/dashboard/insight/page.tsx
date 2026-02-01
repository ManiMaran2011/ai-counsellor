"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

/* ================= TYPES ================= */

type UniCategory = "DREAM" | "TARGET" | "SAFE";

type UniversityCard = {
  id: string;
  name: string;
  country: string;
  avgCost: number; // LPA
  minConfidence: number;
  category: UniCategory;
};

/* ================= DUMMY DATA ================= */

const UNIVERSITIES: UniversityCard[] = [
  {
    id: "mit",
    name: "MIT",
    country: "USA",
    avgCost: 70,
    minConfidence: 85,
    category: "DREAM",
  },
  {
    id: "stanford",
    name: "Stanford University",
    country: "USA",
    avgCost: 65,
    minConfidence: 80,
    category: "DREAM",
  },
  {
    id: "ubc",
    name: "University of British Columbia",
    country: "Canada",
    avgCost: 35,
    minConfidence: 65,
    category: "TARGET",
  },
  {
    id: "manchester",
    name: "University of Manchester",
    country: "UK",
    avgCost: 30,
    minConfidence: 60,
    category: "TARGET",
  },
  {
    id: "tu-berlin",
    name: "TU Berlin",
    country: "Germany",
    avgCost: 15,
    minConfidence: 50,
    category: "SAFE",
  },
  {
    id: "ucd",
    name: "University College Dublin",
    country: "Ireland",
    avgCost: 25,
    minConfidence: 55,
    category: "SAFE",
  },
];

/* ================= PAGE ================= */

export default function InsightPage() {
  const router = useRouter();
  const { profile, confidence, lockUniversity } = useUser();

  if (!profile) {
    router.push("/dashboard");
    return null;
  }

  const budgetLimit = Number(profile.budget.annualINR);

  const visibleUniversities = UNIVERSITIES.filter(
    (u) => u.avgCost <= budgetLimit + 10 // soft buffer
  );

  const grouped = {
    DREAM: visibleUniversities.filter((u) => u.category === "DREAM"),
    TARGET: visibleUniversities.filter((u) => u.category === "TARGET"),
    SAFE: visibleUniversities.filter((u) => u.category === "SAFE"),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ================= HEADER ================= */}
        <header>
          <h1 className="text-3xl font-bold mb-2">
            University Discovery
          </h1>
          <p className="text-slate-600 max-w-2xl">
            These universities are categorized based on your
            budget, confidence, and readiness.
          </p>
        </header>

        {/* ================= GROUPS ================= */}
        {(["DREAM", "TARGET", "SAFE"] as UniCategory[]).map(
          (category) => (
            <section key={category} className="space-y-4">
              <h2 className="text-xl font-bold">
                {category === "DREAM" && "🌟 Dream Universities"}
                {category === "TARGET" && "🎯 Target Universities"}
                {category === "SAFE" && "🛡 Safe Universities"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {grouped[category].map((uni) => {
                  const confidenceOk =
                    confidence >= uni.minConfidence;

                  return (
                    <div
                      key={uni.id}
                      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-bold mb-1">
                          {uni.name}
                        </h3>
                        <p className="text-sm text-slate-500 mb-3">
                          {uni.country}
                        </p>

                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>
                            💰 Avg Cost: ₹{uni.avgCost} LPA
                          </li>
                          <li>
                            📈 Required Confidence:{" "}
                            {uni.minConfidence}%
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6">
                        {confidenceOk ? (
                          <button
                            onClick={() => {
                              lockUniversity({
                                id: uni.id,
                                name: uni.name,
                                category: uni.category,
                              });
                              router.push("/execution");
                            }}
                            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90"
                          >
                            Lock & Start Application →
                          </button>
                        ) : (
                          <div className="text-xs text-red-500 font-semibold">
                            Confidence too low for now
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {grouped[category].length === 0 && (
                  <p className="text-slate-400 text-sm">
                    No universities available in this category
                    based on your profile.
                  </p>
                )}
              </div>
            </section>
          )
        )}

        {/* ================= FOOTER ================= */}
        <div className="pt-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
