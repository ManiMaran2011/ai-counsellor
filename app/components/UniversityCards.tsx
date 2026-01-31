"use client";

import { useUser } from "@/app/context/UserContext";

type Uni = {
  id: string;
  name: string;
  category: "DREAM" | "TARGET" | "SAFE";
};

export default function UniversityCards({
  universities,
}: {
  universities: Uni[];
}) {
  const { lockUniversity, profile } = useUser();

  if (!profile) return null;

  const handleLock = (uni: Uni) => {
    lockUniversity(
      {
        id: uni.id,
        name: uni.name,
        program: profile.goals.targetDegree,
      },
      [] // ✅ tasks are generated later in execution stage
    );
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {universities.map((uni) => (
        <div
          key={uni.id}
          className="border rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase text-primary">
              {uni.category}
            </span>
            <h3 className="text-lg font-semibold mt-1">
              {uni.name}
            </h3>
          </div>

          <button
            onClick={() => handleLock(uni)}
            className="mt-4 bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary/90 transition"
          >
            Lock University
          </button>
        </div>
      ))}
    </div>
  );
}
