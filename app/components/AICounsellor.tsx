"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { counsellorRecommendation } from "@/app/engine/counsellorEngine";

export default function AICounsellor({
  universities,
}: {
  universities: any[];
}) {
  const {
    profile,
    confidence,
    lockedUniversity,
    lockUniversity,
  } = useUser();

  const [message, setMessage] = useState("");
  const [recommend, setRecommend] = useState<any>(null);

  useEffect(() => {
    if (!profile || lockedUniversity) return;

    counsellorRecommendation(profile, confidence, universities).then(
      (res) => {
        setMessage(res.message);
        setRecommend(res.recommend);
      }
    );
  }, [profile, confidence]);

  if (lockedUniversity) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border">
      <h3 className="font-bold mb-2">AI Counsellor</h3>
      <p className="text-sm text-slate-600 mb-4">{message}</p>

      {recommend && (
        <button
          onClick={() => lockUniversity(recommend)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold"
        >
          Lock {recommend.name}
        </button>
      )}
    </div>
  );
}
