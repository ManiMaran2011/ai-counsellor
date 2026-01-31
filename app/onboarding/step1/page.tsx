"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

export default function Step1Profile() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();

  // 🔌 Wire to context (pre-fill if user comes back)
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [education, setEducation] = useState(profile?.academics?.degree ?? "");
  const [intake, setIntake] = useState(profile?.goals?.intake ?? "");

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

              // 🔥 THIS IS THE WIRING
              updateProfile({
                name,
                email,
                phone,
                academics: {
                  degree: education,
                },
                goals: {
                  intake,
                  targetDegree: "",
                  countries: [],
                },
              });

              router.push("/onboarding/step2");
            }}
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 43210"
                className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none"
                required
              />
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                Current Education Level
              </label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none"
                required
              >
                <option value="">Select current education</option>
                <option>High School / 12th Grade</option>
                <option>Bachelor&apos;s Degree</option>
                <option>Master&apos;s Degree</option>
                <option>Working Professional</option>
              </select>
            </div>

            {/* Intake */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                Preferred Intake
              </label>
              <select
                value={intake}
                onChange={(e) => setIntake(e.target.value)}
                className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none"
                required
              >
                <option value="">Select preferred intake</option>
                <option>Spring 2026</option>
                <option>Fall 2026</option>
                <option>2027</option>
                <option>Just Exploring</option>
              </select>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
              >
                Next: Study Preferences →
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
