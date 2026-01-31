"use client";

import { useRouter } from "next/navigation";

export default function OnboardingSuccess() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center space-y-4">
        <h1 className="text-3xl font-black">
          🎉 Profile Complete!
        </h1>
        <p className="text-slate-500">
          Your AI counsellor is ready to guide you.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold"
        >
          Go to Dashboard
        </button>
      </div>
    </main>
  );
}
