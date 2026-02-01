"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

/* ================= PAGE ================= */

export default function ExecutionPage() {
  const router = useRouter();
  const {
    profile,
    lockedUniversity,
    tasks,
    completeTask,
    confidence,
    risk,
    unlockUniversity,
  } = useUser();

  // Guard rails
  if (!profile) {
    router.push("/dashboard");
    return null;
  }

  if (!lockedUniversity) {
    router.push("/dashboard/insight");
    return null;
  }

  const pendingTasks = tasks.filter((t) => t.status !== "DONE");
  const completedTasks = tasks.filter((t) => t.status === "DONE");

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* ================= HEADER ================= */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">
            Application Execution
          </h1>
          <p className="text-slate-600">
            You are now actively applying to{" "}
            <span className="font-semibold">
              {lockedUniversity.name}
            </span>
          </p>
        </header>

        {/* ================= STATUS BAR ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard
            label="Confidence"
            value={`${confidence}%`}
            tone={
              confidence >= 75
                ? "good"
                : confidence >= 50
                ? "mid"
                : "bad"
            }
          />

          <StatusCard
            label="Risk Level"
            value={risk}
            tone={
              risk === "LOW"
                ? "good"
                : risk === "MEDIUM"
                ? "mid"
                : "bad"
            }
          />

          <StatusCard
            label="Pending Tasks"
            value={pendingTasks.length.toString()}
            tone={
              pendingTasks.length === 0 ? "good" : "mid"
            }
          />
        </section>

        {/* ================= TASKS ================= */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">
            What you need to do now
          </h2>

          {pendingTasks.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-100">
              <p className="text-green-600 font-semibold">
                🎉 All tasks completed!
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Your application is in a strong position.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl p-6 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold">{task.title}</p>
                    <p className="text-xs text-slate-500">
                      Risk impact:{" "}
                      <span className="font-semibold">
                        {task.risk}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => completeTask(task.id)}
                    className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90"
                  >
                    Mark Done
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= COMPLETED ================= */}
        {completedTasks.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-600">
              Completed
            </h3>

            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-50 p-4 rounded-xl text-sm text-slate-500 line-through"
                >
                  {task.title}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= FOOTER ACTIONS ================= */}
        <section className="pt-6 flex flex-col md:flex-row gap-4">
          <button
            onClick={() => {
              unlockUniversity();
              router.push("/dashboard/insight");
            }}
            className="border border-slate-200 rounded-xl px-6 py-3 text-sm font-semibold hover:bg-slate-50"
          >
            Unlock University
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="text-slate-500 text-sm hover:text-slate-700"
          >
            Back to Dashboard
          </button>
        </section>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatusCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "good" | "mid" | "bad";
}) {
  const toneMap = {
    good: "text-green-600",
    mid: "text-amber-600",
    bad: "text-red-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100">
      <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
        {label}
      </p>
      <p className={`text-2xl font-bold ${toneMap[tone]}`}>
        {value}
      </p>
    </div>
  );
}
