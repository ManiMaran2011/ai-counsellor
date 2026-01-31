"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LockClient({
  university,
}: {
  university: {
    id: string;
    name: string;
  };
}) {
  const router = useRouter();
  const { lockUniversity } = useUser();
  const [error, setError] = useState(false);

  const handleLock = () => {
    try {
      lockUniversity(university); // ✅ ONLY ONE ARG
      router.push("/execution");
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <button
        onClick={handleLock}
        className="w-full bg-primary text-white py-3 rounded-lg font-bold"
      >
        Lock & Generate Roadmap
      </button>

      {error && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-2">
              University already locked
            </h2>
            <p className="text-slate-500 mb-4">
              Unlock your current university to proceed.
            </p>
            <button
              onClick={() => setError(false)}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
