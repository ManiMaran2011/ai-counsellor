"use client";

import { useRouter } from "next/navigation";

export default function OnboardingSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-[#0d161c]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#e7eef4] bg-white px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight">AI Counsellor</h2>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center py-12 px-4">
        <div className="max-w-5xl w-full">
          {/* Hero */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl min-h-[200px] flex items-center justify-center mb-10 relative">
            <span className="material-symbols-outlined text-primary text-8xl opacity-40">
              school
            </span>
          </div>

          {/* Headline */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">
              Congratulations! 🎓
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Your profile is 100% complete and your study abroad journey has officially begun.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard
              icon="account_balance"
              title="Best-Fit Universities"
              value="12"
              subtitle="Matches in USA, UK & Canada"
            />
            <StatCard
              icon="payments"
              title="Est. Annual Budget"
              value="₹25L"
              subtitle="Aligned with your financial plan"
            />
            <StatCard
              icon="calendar_today"
              title="Target Intake"
              value="Fall 2026"
              subtitle="Timeline confirmed"
            />
          </div>

          {/* Eligibility */}
          <div className="bg-primary/5 border-2 border-dashed border-primary/30 rounded-2xl p-8 flex flex-col md:flex-row gap-8 mb-14 items-center">
            <div className="relative">
              <svg className="size-32 -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-primary/10"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-primary"
                  fill="transparent"
                  strokeDasharray="364.4"
                  strokeDashoffset="54.6"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
                8.5
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">
                Your Eligibility Score: 8.5 / 10
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Based on your academics, preferences, and budget, you are a strong
                candidate for Top-50 global universities. Your profile aligns well
                with competitive programs.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full max-w-md h-14 bg-primary text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              View My Personalized Dashboard
            </button>

            <button className="flex items-center gap-2 text-primary font-semibold hover:underline">
              <span className="material-symbols-outlined">support_agent</span>
              Talk to an Expert Counselor
            </button>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-slate-500 italic">
            ❤️ We’re here to support you at every step of your journey.
          </footer>
        </div>
      </main>
    </div>
  );
}

/* ---------- Helper ---------- */

function StatCard({ icon, title, value, subtitle }: any) {
  return (
    <div className="rounded-xl p-6 bg-white border border-[#cedde8] shadow-sm hover:scale-[1.02] transition">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="font-semibold">{title}</p>
      <p className="text-primary text-3xl font-bold">{value}</p>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
