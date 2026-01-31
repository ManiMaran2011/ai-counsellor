"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LockClient from "./LockClient";

function LockPageInner() {
  const searchParams = useSearchParams();

  const university = {
    id: searchParams.get("uni") || "u1",
    name: "University of Toronto",
    program: "Master of Computer Science",
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

        {/* 👇 PASS UNIVERSITY PROPERLY */}
        <LockClient university={university} />

        <p className="mt-4 text-center text-sm text-slate-500">
          You can unlock later, but progress will reset.
        </p>
      </div>
    </main>
  );
}

export default function LockPage() {
  return (
    <Suspense fallback={null}>
      <LockPageInner />
    </Suspense>
  );
}
