"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

export default function Step1Profile() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();

  /* ================= UI STATE (CAN BE RICH) ================= */

  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");

  // UI-only fields (NOT persisted yet)
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [intake, setIntake] = useState("");

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-slate-100">
        <div className="h-full bg-primary transition-all duration-500 w-1/4" />
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-8 text-primary">
          <div className="size-8">
            <svg fill="currentColor" viewBox="0 0 48 48">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-charcoal">
            AI Counsellor
          </h2>
        </div>

        <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">
          Step 1 of 4
        </p>

        <h1 className="text-charcoal text-4xl font-bold mb-3">
          Let’s get to know you
        </h1>

        <p className="text-slate-500 text-lg max-w-xl">
          Tell us a bit about yourself so we can personalize your journey to
          studying abroad.
        </p>
      </header>

      {/* Form */}
      <main className="max-w-2xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();

              // 🔒 FSM-SAFE WRITE (ONLY WHAT PROFILE SUPPORTS)
              updateProfile({
                name,
                email,
              });

              // 🚀 UI FLOW CONTINUES
              router.push("/onboarding/step2");
            }}
          >
            {/* Full Name */}
            <Input label="Full Name" value={name} set={setName} />

            {/* Email */}
            <Input label="Email Address" value={email} set={setEmail} type="email" />

            {/* Phone (UI only) */}
            <Input label="Phone Number" value={phone} set={setPhone} />

            {/* Education (UI only) */}
            <Select
              label="Current Education Level"
              value={education}
              set={setEducation}
              options={[
                "High School / 12th Grade",
                "Bachelor's Degree",
                "Master's Degree",
                "Working Professional",
              ]}
            />

            {/* Intake (UI only) */}
            <Select
              label="Preferred Intake"
              value={intake}
              set={setIntake}
              options={[
                "Spring 2026",
                "Fall 2026",
                "2027",
                "Just Exploring",
              ]}
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
              Next: Study Preferences →
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

/* ================= HELPERS ================= */

function Input({ label, value, set, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => set(e.target.value)}
        className="w-full rounded-xl border-slate-200 bg-white py-3 px-4"
        required
      />
    </div>
  );
}

function Select({ label, value, set, options }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => set(e.target.value)}
        className="w-full rounded-xl border-slate-200 bg-white py-3 px-4"
        required
      >
        <option value="">Select</option>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
