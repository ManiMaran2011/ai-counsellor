"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

export default function Step3Academics() {
  const router = useRouter();
  const { updateProfile } = useUser();

  /* ================= UI-ONLY STATE ================= */

  const [institution, setInstitution] = useState("");
  const [qualification, setQualification] = useState("Bachelor's Degree");
  const [gpa, setGpa] = useState("");
  const [gpaScale, setGpaScale] = useState("Out of 10.0");
  const [gradYear, setGradYear] = useState("2025");
  const [backlogs, setBacklogs] = useState(false);
  const [gap, setGap] = useState(false);

  /* ================= UI ================= */

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
          <h2 className="text-xl font-bold">AI Counsellor</h2>
        </div>

        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
          Step 3 of 4
        </p>

        <h1 className="text-4xl font-bold mb-3">
          Tell us about your academics
        </h1>

        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          This helps us assess eligibility. You can refine this later.
        </p>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Schooling */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6">Schooling & GPA</h3>

            <div className="space-y-6">
              <input
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Institution Name"
                className="w-full rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
              />

              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
              >
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>High School</option>
                <option>Doctorate</option>
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  placeholder="GPA / Percentage"
                  className="rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
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
          </section>

          {/* Record */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6">Academic Record</h3>

            <select
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className="w-full rounded-lg border-slate-200 bg-slate-50 h-11 px-4 mb-6"
            >
              {["2024", "2025", "2026", "2027", "2028"].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>

            <ToggleRow
              label="Any active backlogs?"
              value={backlogs}
              onChange={setBacklogs}
            />

            <ToggleRow
              label="Any education gaps?"
              value={gap}
              onChange={setGap}
            />
          </section>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-6">
          <button
            onClick={() => {
              // ✅ No academics written to Profile (by design)
              updateProfile({});
              router.push("/onboarding/step4");
            }}
            className="w-full max-w-sm bg-primary text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl"
          >
            Next: Final Details
          </button>

          <button
            onClick={() => router.push("/onboarding/step2")}
            className="text-slate-400 text-sm"
          >
            Back
          </button>
        </footer>
      </main>
    </div>
  );
}

/* ---------- Helper ---------- */

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
      <p className="text-sm font-bold">{label}</p>
      <div className="flex gap-1 bg-white rounded-lg border p-1">
        <button
          onClick={() => onChange(false)}
          className={`px-4 py-1 text-xs font-bold rounded ${
            !value ? "bg-primary text-white" : ""
          }`}
        >
          No
        </button>
        <button
          onClick={() => onChange(true)}
          className={`px-4 py-1 text-xs font-bold rounded ${
            value ? "bg-primary text-white" : ""
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
