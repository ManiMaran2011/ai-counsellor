"use client";

export default function EscalationCTA() {
  return (
    <div className="bg-red-50 border border-red-200 p-5 rounded-xl">
      <h3 className="font-bold text-red-700 mb-2">
        Expert Guidance Recommended
      </h3>
      <p className="text-sm text-red-600 mb-3">
        Your profile has critical risk factors. Speaking to an admissions expert
        now can significantly improve outcomes.
      </p>
      <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
        Talk to an Expert
      </button>
    </div>
  );
}
