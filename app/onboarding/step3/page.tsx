"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

export default function Step3Academics() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();

  // 🔌 Pre-fill from context if user navigates back
  const [institution, setInstitution] = useState(
    profile?.academics?.degree ?? ""
  );
  const [qualification, setQualification] = useState(
    profile?.academics?.degree ?? "Bachelor's Degree"
  );
  const [gpa, setGpa] = useState(profile?.academics?.gpa ?? "");
  const [gpaScale, setGpaScale] = useState("Out of 10.0");
  const [gradYear, setGradYear] = useState(
    profile?.academics?.graduationYear ?? "2025"
  );
  const [backlogs, setBacklogs] = useState(false);
  const [gap, setGap] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Progress */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-slate-100">
        <div className="h-full bg-primary w-3/4 transition-all" />
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-8 text-primary">
          <div className="size-8">
            <svg fill="currentColor" viewBox="0 0 48 48">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold italic uppercase">
            AI Counsellor
          </h2>
        </div>

        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
          Step 3 of 4
        </p>
        <h1 className="text-4xl font-bold mb-3">
          Tell us about your academics
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          This helps us determine your eligibility for top-tier universities
          worldwide.
        </p>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Schooling */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                school
              </span>
              Schooling & GPA
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold">
                  Institution Name
                </label>
                <input
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="mt-2 w-full rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
                  placeholder="University or School name"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Highest Qualification
                </label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="mt-2 w-full rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
                >
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>High School</option>
                  <option>Doctorate</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold">
                  GPA / Percentage
                </label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <input
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
                    placeholder="Score (e.g. 8.4)"
                  />
                  <select
                    value={gpaScale}
                    onChange={(e) => setGpaScale(e.target.value)}
                    className="rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
                  >
                    <option>Out of 10.0</option>
                    <option>Out of 4.0</option>
                    <option>Percentage (%)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Record */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                history_edu
              </span>
              Academic Record
            </h3>

            <div className="space-y-8">
              <div>
                <label className="text-sm font-semibold">
                  Year of Graduation
                </label>
                <select
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="mt-2 w-full rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
                >
                  {["2024", "2025", "2026", "2027", "2028"].map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Backlogs */}
              <ToggleRow
                label="Any active backlogs?"
                description="Includes current subjects"
                value={backlogs}
                onChange={setBacklogs}
              />

              {/* Gap */}
              <ToggleRow
                label="Any education gaps?"
                description="More than a year?"
                value={gap}
                onChange={setGap}
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-6">
          <button
            onClick={() => {
              // 🔥 WIRING
              updateProfile({
                academics: {
                  degree: qualification,
                  gpa,
                  graduationYear: gradYear,
                },
              });

              router.push("/onboarding/step4");
            }}
            className="w-full max-w-sm bg-primary text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:bg-primary/90"
          >
            Next: Final Details
          </button>

          <button
            onClick={() => router.push("/onboarding/step2")}
            className="text-slate-400 text-sm font-medium hover:text-slate-600 flex items-center gap-1"
          >
            <span className="material-symbols-outlined">
              arrow_back
            </span>
            Back to previous step
          </button>
        </footer>
      </main>
    </div>
  );
}

/* ---------- Helper Component ---------- */

function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
      <div>
        <p className="text-sm font-bold">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <div className="flex gap-1 bg-white rounded-lg border border-slate-200 p-1">
        <button
          onClick={() => onChange(false)}
          className={`px-4 py-1.5 text-xs font-bold rounded-md ${
            !value ? "bg-primary text-white" : ""
          }`}
        >
          No
        </button>
        <button
          onClick={() => onChange(true)}
          className={`px-4 py-1.5 text-xs font-bold rounded-md ${
            value ? "bg-primary text-white" : ""
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
