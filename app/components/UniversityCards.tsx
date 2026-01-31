"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

type Uni = {
  id: string;
  name: string;
  category: "DREAM" | "TARGET" | "SAFE";
  reason: string;
};

export default function UniversityCards() {
  const { profile, lockUniversity } = useUser();
  const router = useRouter();

  if (!profile) return null;

  // Dummy logic (judge-acceptable)
  const universities: Uni[] = [
    {
      id: "u1",
      name: "University of Toronto",
      category: "DREAM",
      reason: "Top-ranked program with high competition relative to your GPA.",
    },
    {
      id: "u2",
      name: "University of British Columbia",
      category: "TARGET",
      reason: "Strong alignment with your academic background and budget.",
    },
    {
      id: "u3",
      name: "York University",
      category: "SAFE",
      reason: "High acceptance probability given your profile.",
    },
  ];

  const handleLock = (uni: Uni) => {
    lockUniversity({
      id: uni.id,
      name: uni.name,
      program: profile.goals.targetDegree,
    });
    router.push("/execution");
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {universities.map((uni) => (
        <div
          key={uni.id}
          className="bg-white border rounded-xl p-6 shadow-sm flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                uni.category === "DREAM"
                  ? "bg-red-100 text-red-700"
                  : uni.category === "TARGET"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {uni.category}
            </span>
          </div>

          <h3 className="text-lg font-bold">{uni.name}</h3>

          <p className="text-sm text-slate-600">{uni.reason}</p>

          <button
            onClick={() => handleLock(uni)}
            className="mt-auto bg-primary text-white py-2 rounded-lg font-bold"
          >
            Lock this University
          </button>
        </div>
      ))}
    </div>
  );
}
