"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useState } from "react";

export default function LockClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lockUniversity } = useUser();
  const [error, setError] = useState(false);

  const university = {
    id: searchParams.get("uni") || "u1",
    name: "University of Toronto",
    program: "Master of Computer Science",
  };

  const handleLock = () => {
    const success = lockUniversity(university);

    if (!success) {
      setError(true);
      return;
    }

    router.push("/execution");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-2">
          Lock {university.name}?
        </h1>

        <p className="text-slate-500 mb-6">
          Locking this university will generate your execution roadmap.
          You can only lock <b>one</b> university at a time.
        </p>

        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6 text-sm">
          ⚠️ Unlocking later will reset execution progress.
        </div>

        <button
          onClick={handleLock}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold"
        >
          Lock & Generate Roadmap
        </button>

        <button
          onClick={() => router.back()}
          className="w-full mt-4 text-sm text-slate-500"
        >
          Cancel
        </button>

        {error && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
              <h2 className="text-lg font-bold mb-2">
                University already locked
              </h2>
              <p className="text-slate-500 mb-4">
                You can lock only one university at a time.
                Unlock your current choice to proceed.
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
      </div>
    </main>
  );
}
