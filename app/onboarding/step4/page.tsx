"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

export default function Step4FinalDetails() {
  const router = useRouter();
  const { profile, completeOnboarding } = useUser();

  if (!profile) return null;

  /* ================= UI STATE (NOT ALL IS PERSISTED) ================= */

  const [englishTest, setEnglishTest] = useState("IELTS"); // UI-only
  const [englishScore, setEnglishScore] = useState("");
  const [examName, setExamName] = useState(""); // UI-only
  const [examScore, setExamScore] = useState("");

  const [budget, setBudget] = useState(
    profile.budget?.annualINR ?? "25-50"
  );
  const [funding, setFunding] = useState(
    profile.budget?.funding ?? "Personal Savings"
  );

  const [intent, setIntent] = useState("standard"); // mapped to SOP readiness
  const [passport, setPassport] = useState("have"); // UI-only

  /* ================= FINAL SUBMIT (FSM GATE) ================= */

  const handleComplete = () => {
    completeOnboarding({
      ...profile,
      budget: {
        annualINR: budget,
        funding,
      },
      readiness: {
        ielts: englishScore,
        gre: examScore,
        sop: intent,
      },
    });

    router.push("/onboarding/success");
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Progress */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-slate-100">
        <div className="h-full bg-primary w-[85%]" />
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-8 text-primary">
          <div className="size-8">
            <svg fill="currentColor" viewBox="0 0 48 48">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">AI Counsellor</h2>
        </div>

        <h1 className="text-4xl font-bold mb-3">Almost there!</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Final details before we unlock your personalized dashboard.
        </p>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Tests */}
          <Section title="Test Readiness" icon="school">
            <label className="block text-sm font-semibold mb-2">
              English Proficiency
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <select
                value={englishTest}
                onChange={(e) => setEnglishTest(e.target.value)}
                className="rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
              >
                <option>IELTS</option>
                <option>TOEFL</option>
                <option>PTE</option>
                <option>Duolingo</option>
              </select>

              <input
                value={englishScore}
                onChange={(e) => setEnglishScore(e.target.value)}
                placeholder="Score"
                className="rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
              />
            </div>

            <label className="block text-sm font-semibold mb-2">
              Competitive Exams (Optional)
            </label>

            <input
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="GRE / GMAT / SAT"
              className="mb-3 w-full rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
            />

            <input
              value={examScore}
              onChange={(e) => setExamScore(e.target.value)}
              placeholder="Expected Score"
              className="w-full rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
            />
          </Section>

          {/* Finance */}
          <Section title="Financial Planning" icon="account_balance_wallet">
            <label className="block text-sm font-semibold mb-3">
              Annual Budget
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <BudgetOption value="10-25" label="₹10L - 25L" selected={budget} set={setBudget} />
              <BudgetOption value="25-50" label="₹25L - 50L" selected={budget} set={setBudget} />
              <BudgetOption value="50-75" label="₹50L - 75L" selected={budget} set={setBudget} />
              <BudgetOption value="75+" label="₹75L+" selected={budget} set={setBudget} />
            </div>

            <label className="block text-sm font-semibold mb-2">
              Funding Source
            </label>

            <select
              value={funding}
              onChange={(e) => setFunding(e.target.value)}
              className="w-full rounded-lg border-slate-200 bg-slate-50 h-11 px-4"
            >
              <option>Personal Savings</option>
              <option>Scholarships</option>
              <option>Education Loan</option>
              <option>Family Sponsorship</option>
            </select>
          </Section>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-6">
          <button
            onClick={handleComplete}
            className="w-full max-w-sm bg-primary text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:bg-primary/90"
          >
            Complete My Profile
          </button>

          <button
            onClick={() => router.push("/onboarding/step3")}
            className="text-slate-400 text-sm font-medium hover:text-slate-600"
          >
            Back to previous step
          </button>
        </footer>
      </main>
    </div>
  );
}

/* ================= HELPERS ================= */

function Section({ title, icon, children }: any) {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">
          {icon}
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function BudgetOption({ value, label, selected, set }: any) {
  return (
    <button
      onClick={() => set(value)}
      className={`p-4 rounded-xl border-2 text-center ${
        selected === value
          ? "border-primary bg-soft-blue text-primary"
          : "border-slate-100"
      }`}
    >
      <span className="font-bold">{label}</span>
    </button>
  );
}
