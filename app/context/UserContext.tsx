"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* ================= TYPES ================= */

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type TaskStatus = "NOT_STARTED" | "DONE";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  risk: RiskLevel;
};

export type Profile = {
  name: string;
  email: string;

  goals: {
    targetDegree: string;
    countries: string[];
  };

  budget: {
    annualINR: string;
    funding: string;
  };

  readiness: {
    ielts: string;
    gre: string;
    sop: string;
  };
};

export type University = {
  id: string;
  name: string;
  category?: "DREAM" | "TARGET" | "SAFE";
};

type Stage = 1 | 2 | 3 | 4;

type UserContextType = {
  profile: Profile | null;
  stage: Stage;
  confidence: number;
  risk: RiskLevel;
  lockedUniversity: University | null;
  tasks: Task[];

  completeOnboarding: (profile: Profile) => void;
  lockUniversity: (uni: University) => void;
  unlockUniversity: () => void;
  completeTask: (taskId: string) => void;
};

/* ================= CONTEXT ================= */

const UserContext = createContext<UserContextType>(null as any);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stage, setStage] = useState<Stage>(1);
  const [confidence, setConfidence] = useState(70);
  const [risk, setRisk] = useState<RiskLevel>("MEDIUM");
  const [lockedUniversity, setLockedUniversity] =
    useState<University | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  /* ===== Confidence Decay (Inactivity) ===== */
  useEffect(() => {
    if (stage !== 4) return;

    const timer = setInterval(() => {
      setConfidence((c) => Math.max(30, c - 1));
    }, 60000); // every minute

    return () => clearInterval(timer);
  }, [stage]);

  /* ================= ACTIONS ================= */

  const completeOnboarding = (data: Profile) => {
    setProfile(data);
    setStage(2);
    setConfidence(75);
    setRisk("MEDIUM");
  };

  const lockUniversity = (uni: University) => {
    setLockedUniversity(uni);
    setStage(4);
    setConfidence(60);

    setTasks([
      {
        id: "sop",
        title: "Finalize Statement of Purpose",
        status: "NOT_STARTED",
        risk: "HIGH",
      },
      {
        id: "ielts",
        title: "Submit IELTS Score",
        status: "NOT_STARTED",
        risk: "MEDIUM",
      },
      {
        id: "fee",
        title: "Pay Application Fee",
        status: "NOT_STARTED",
        risk: "HIGH",
      },
    ]);
  };

  const unlockUniversity = () => {
    setLockedUniversity(null);
    setTasks([]);
    setStage(2);
  };

  const completeTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: "DONE" } : t
      )
    );
    setConfidence((c) => Math.min(100, c + 8));
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        stage,
        confidence,
        risk,
        lockedUniversity,
        tasks,
        completeOnboarding,
        lockUniversity,
        unlockUniversity,
        completeTask,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
