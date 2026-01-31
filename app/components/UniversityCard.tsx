"use client";

import { useRouter } from "next/navigation";
import { useUser, University } from "@/app/context/UserContext";

type Props = {
  university: University;
};

export default function UniversityCard({ university }: Props) {
  const router = useRouter();
  const { lockedUniversity } = useUser();

  const isLocked = lockedUniversity?.id === university.id;

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h3 className="text-lg font-bold">{university.name}</h3>
      <p className="text-sm text-slate-500 mb-4">
        {university.program}
      </p>

      {isLocked ? (
        <span className="inline-block text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
          LOCKED
        </span>
      ) : (
        <button
          onClick={() =>
            router.push(`/lock?uni=${university.id}`)
          }
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold"
        >
          Lock University
        </button>
      )}
    </div>
  );
}
