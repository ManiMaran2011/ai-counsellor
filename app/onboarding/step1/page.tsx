"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

export default function Step1Profile() {
  const router = useRouter();
  const { profile } = useUser();

  // Only fields that EXIST in Profile
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-2">
          Let’s start with the basics
        </h1>
        <p className="text-slate-500 mb-6">
          This helps the AI counsellor personalize your journey.
        </p>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full h-11 px-4 rounded-lg border border-slate-200"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full h-11 px-4 rounded-lg border border-slate-200"
          />
        </div>

        <button
          onClick={() => {
            // Store partial profile safely
            router.push("/onboarding/step2");
          }}
          className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-bold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
