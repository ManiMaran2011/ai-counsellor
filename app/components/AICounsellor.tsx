"use client";

import { useState } from "react";
import { useUser } from "@/app/context/UserContext";

export default function AICounsellor() {
  const {
    confidence,
    lockUniversity,
  } = useUser();

  const [confirm, setConfirm] = useState(false);

  return (
    <section className="bg-white border rounded-xl p-5 space-y-4">
      <h3 className="font-bold text-lg">AI Counsellor</h3>

      <p className="text-sm text-slate-600">
        Based on your profile strength and risk balance, I recommend
        committing to a <b>Target university</b>.
      </p>

      {confidence < 60 && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-sm">
          ⚠️ Your confidence is dropping. Acting now improves outcomes.
        </div>
      )}

      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold"
        >
          Lock Recommended University
        </button>
      ) : (
        <div className="space-y-3">
          <p className="text-sm">
            Lock <b>University of British Columbia</b> and move
            into execution?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                lockUniversity({
                  id: "ubc",
                  name: "University of British Columbia",
                  category: "TARGET",
                });
              }}
              className="flex-1 bg-primary text-white py-2 rounded-lg font-bold"
            >
              Yes, Lock
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="flex-1 border py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
