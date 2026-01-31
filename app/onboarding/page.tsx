"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const { completeOnboarding } = useUser();
  const router = useRouter();

  const [profile, setProfile] = useState<any>({
    name: "",
    email: "",
    phone: "",
    academics: {},
    goals: {},
    budget: {},
    readiness: {},
  });

  const handleFinish = () => {
    completeOnboarding(profile);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-black">
          Step-by-step onboarding
        </h1>

        {/* 🔹 STEP 1–4 UI GOES HERE */}
        {/* Each step updates `profile` */}

        {/* Example minimal inputs (replace with your real UI) */}
        <input
          placeholder="Full Name"
          className="border p-3 w-full rounded"
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-3 w-full rounded"
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
        />

        <button
          onClick={handleFinish}
          className="bg-primary text-white px-8 py-4 rounded-xl font-bold"
        >
          Complete Onboarding
        </button>
      </div>
    </main>
  );
}

