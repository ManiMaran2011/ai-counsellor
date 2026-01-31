"use client";

import { useUser } from "@/app/context/UserContext";

export default function DashboardPage() {
  const {
    profile,
    confidence,
    risk,
    lockedUniversity,
    tasks,
    completeTask,
  } = useUser();

  if (!profile) return null;

  const pendingHighRisk = tasks.filter(
    (t) => t.risk === "HIGH" && t.status !== "DONE"
  ).length;

  const shouldEscalate =
    confidence < 45 || pendingHighRisk >= 2;

  /* ================= AI COUNSELLOR REASONING ================= */

  const counsellorMessage = lockedUniversity
    ? `You’ve locked ${lockedUniversity.name}. Focus on completing critical tasks to keep your application strong.`
    : `Your profile is ready. The next step is choosing a university aligned with your budget and readiness.`;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* HEADER */}
        <header>
          <h1 className="text-3xl font-bold mb-1">
            Dashboard
          </h1>
          <p className="text-slate-500">
            Confidence: {confidence} • Risk:{" "}
            <span
              className={
                risk === "LOW"
                  ? "text-green-600"
                  : risk === "MEDIUM"
                  ? "text-orange-500"
                  : "text-red-500"
              }
            >
              {risk}
            </span>
          </p>
        </header>

        {/* AI COUNSELLOR */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="font-bold mb-2">
            AI Counsellor
          </h2>
          <p className="text-slate-600">
            {counsellorMessage}
          </p>
        </section>

        {/* ESCALATION */}
        {shouldEscalate && (
          <section className="bg-red-50 border border-red-200 p-6 rounded-2xl">
            <h3 className="font-bold text-red-700 mb-2">
              Expert Help Recommended
            </h3>
            <p className="text-sm text-red-600 mb-4">
              Your confidence is dropping and critical tasks are pending.
              Speaking to an admissions expert now can prevent mistakes.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Talk to an Expert
            </button>
          </section>
        )}

        {/* TASKS */}
        {lockedUniversity && (
          <section>
            <h2 className="text-xl font-bold mb-4">
              Execution Tasks
            </h2>

            <ul className="space-y-3">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="bg-white p-4 rounded-xl border flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      {t.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      Risk: {t.risk}
                    </p>
                  </div>

                  {t.status === "DONE" ? (
                    <span className="text-green-600 font-bold">
                      Done
                    </span>
                  ) : (
                    <button
                      onClick={() => completeTask(t.id)}
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      Mark Complete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
