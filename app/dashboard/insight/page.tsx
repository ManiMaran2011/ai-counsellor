"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext";

/* ---------- Dummy Universities ---------- */

const UNIVERSITIES = [
  { id: "u1", name: "MIT", avgCost: 70 },
  { id: "u2", name: "Stanford University", avgCost: 72 },
  { id: "u3", name: "University of Toronto", avgCost: 45 },
  { id: "u4", name: "University of British Columbia", avgCost: 40 },
  { id: "u5", name: "TU Munich", avgCost: 20 },
  { id: "u6", name: "RWTH Aachen", avgCost: 18 },
  { id: "u7", name: "Arizona State University", avgCost: 35 },
  { id: "u8", name: "Northeastern University", avgCost: 50 },
  { id: "u9", name: "University of Leeds", avgCost: 30 },
  { id: "u10", name: "University of Glasgow", avgCost: 28 },
];

/* ---------- Page ---------- */

export default function InsightPage() {
  const router = useRouter();
  const { profile, confidence, lockUniversity } = useUser();

  if (!profile || !profile.budget || !profile.readiness) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Preparing university insights…
      </div>
    );
  }

  const budget = Number(profile.budget.annualINR || 0);
  const hasIELTS = profile.readiness.ielts?.trim() !== "";
  const hasSOP = profile.readiness.sop?.trim() !== "";

  function categorize(cost: number) {
    if (confidence >= 75 && hasIELTS && hasSOP && cost <= budget)
      return "TARGET";
    if (cost <= budget + 10) return "SAFE";
    return "DREAM";
  }

  const grouped = {
    DREAM: [] as typeof UNIVERSITIES,
    TARGET: [] as typeof UNIVERSITIES,
    SAFE: [] as typeof UNIVERSITIES,
  };

  UNIVERSITIES.forEach((u) => {
    grouped[categorize(u.avgCost)].push(u);
  });

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold">University Discovery</h1>
        <p className="text-slate-500">
          These recommendations are based on your profile strength,
          budget, and readiness.
        </p>
      </header>

      {(["TARGET", "SAFE", "DREAM"] as const).map((cat) => (
        <section key={cat}>
          <h2 className="text-lg font-bold mb-4">{cat} Universities</h2>

          <div className="grid md:grid-cols-3 gap-5">
            {grouped[cat].map((u) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold">{u.name}</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Avg Cost: ₹{u.avgCost}L / year
                </p>

                <button
                  onClick={() => {
                    lockUniversity({
                      id: u.id,
                      name: u.name,
                      category: cat,
                    });
                    router.push("/execution");
                  }}
                  className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90"
                >
                  Lock University →
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
