"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

const FIELD_OPTIONS = [
  {
    id: "Business",
    label: "Business",
    sub: "Management, Finance, Marketing",
  },
  {
    id: "STEM",
    label: "STEM",
    sub: "Engineering, Science, Technology",
  },
  {
    id: "Arts",
    label: "Arts & Humanities",
    sub: "Design, Media, Literature",
  },
  {
    id: "Law",
    label: "Law",
    sub: "Corporate, International, Criminal",
  },
  {
    id: "Medicine",
    label: "Medicine",
    sub: "MBBS, Nursing, Public Health",
  },
];

const COUNTRY_OPTIONS = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "Ireland",
];

export default function Step2Preferences() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();

  const [countries, setCountries] = useState<string[]>(
    profile?.goals?.countries ?? []
  );
  const [otherCountry, setOtherCountry] = useState("");
  const [field, setField] = useState(
    profile?.goals?.targetDegree ?? "Business"
  );
  const [degree, setDegree] = useState("Masters");

  const toggleCountry = (country: string) => {
    setCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const isOtherSelected = countries.includes("Other");

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Progress */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-slate-100">
        <div className="h-full bg-primary w-1/2 transition-all" />
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="flex justify-center items-center gap-2 mb-8 text-primary">
          <div className="size-8">
            <svg fill="currentColor" viewBox="0 0 48 48">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-charcoal">
            AI Counsellor
          </h2>
        </div>

        <div className="bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block mb-4">
          Step 2 of 4
        </div>

        <h1 className="text-4xl font-bold mb-3">
          Where would you like to study?
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Tell us your preferences so we can personalize university matches.
        </p>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        {/* Countries */}
        <section className="mb-14">
          <div className="flex justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                public
              </span>
              Preferred Countries
            </h3>
            <span className="text-sm text-slate-400">
              Select one or more
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...COUNTRY_OPTIONS, "Other"].map((country) => (
              <button
                key={country}
                onClick={() => toggleCountry(country)}
                className={`p-5 rounded-2xl border-2 transition-all text-sm font-semibold
                  ${
                    countries.includes(country)
                      ? "border-primary bg-soft-blue text-primary shadow-md"
                      : "border-slate-100 bg-white hover:border-primary/30"
                  }`}
              >
                {country}
              </button>
            ))}
          </div>

          {/* Other country input */}
          {isOtherSelected && (
            <div className="mt-6 max-w-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Specify Country
              </label>
              <input
                value={otherCountry}
                onChange={(e) => setOtherCountry(e.target.value)}
                placeholder="e.g. Singapore, France"
                className="w-full rounded-xl border-slate-200 bg-white py-3 px-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none"
              />
            </div>
          )}
        </section>

        {/* Field + Degree */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {/* Field */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                interests
              </span>
              Field of Interest
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FIELD_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setField(f.id)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all
                    ${
                      field === f.id
                        ? "border-primary bg-soft-blue shadow-md"
                        : "border-slate-100 bg-white hover:shadow"
                    }`}
                >
                  <span className="text-lg font-bold block">
                    {f.label}
                  </span>
                  <span className="text-sm text-slate-500">
                    {f.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Degree */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                school
              </span>
              Degree Level
            </h3>

            <div className="space-y-3">
              {["Bachelors", "Masters", "PhD", "Diploma"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDegree(d)}
                  className={`w-full p-4 rounded-xl border-2 font-bold transition-all
                    ${
                      degree === d
                        ? "border-primary bg-soft-blue text-primary"
                        : "border-slate-100 bg-white hover:border-primary/20"
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-6 pt-8 border-t border-slate-100">
          <button
            onClick={() => {
              const finalCountries = isOtherSelected && otherCountry
                ? [...countries.filter((c) => c !== "Other"), otherCountry]
                : countries;

              updateProfile({
                goals: {
                  countries: finalCountries,
                  targetDegree: field,
                  intake: profile?.goals?.intake ?? "",
                },
              });

              router.push("/onboarding/step3");
            }}
            className="w-full max-w-sm bg-primary text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            Next: Academic Details
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </button>

          <button
            onClick={() => router.push("/onboarding/step1")}
            className="text-slate-400 text-sm font-medium hover:text-slate-600 flex items-center gap-1"
          >
            <span className="material-symbols-outlined">
              arrow_back
            </span>
            Back
          </button>
        </footer>
      </main>
    </div>
  );
}
