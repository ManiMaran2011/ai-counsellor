"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* ================= CORE TYPES ================= */

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type TaskStatus = "NOT_STARTED" | "DONE";

export type TaskCategory =
  | "SOP"
  | "TEST"
  | "FINANCE"
  | "PORTAL"
  | "VISA"
  | "CORE";

/* ================= TASK ================= */

export type Task = {
  id: string;
  title: string;

  status: TaskStatus;
  risk: RiskLevel;

  category: TaskCategory;
  priority: number; // lower = more important

  dependsOn?: string[];
};

/* ================= PROFILE ================= */

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

/* ================= UNIVERSITY ================= */

export type University = {
  id: string;
  name: string;
  category?: "DREAM" | "TARGET" | "SAFE";
};

/* ================= FSM ================= */

type Stage = 1 | 2 | 3 | 4;

/* ================= CONTEXT TYPE ================= */

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

  /* ================= CONFIDENCE DECAY ================= */

  useEffect(() => {
    if (stage !== 4) return;

    const timer = setInterval(() => {
      setConfidence((c) => Math.max(30, c - 1));
    }, 60_000);

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
    setRisk("MEDIUM");

    // 🔥 INITIAL EXECUTION TASKS
    setTasks([
      {
        id: "sop-final",
        title: "Finalize Statement of Purpose",
        status: "NOT_STARTED",
        risk: "HIGH",
        category: "SOP",
        priority: 1,
      },
      {
        id: "ielts-submit",
        title: "Submit IELTS Score",
        status: "NOT_STARTED",
        risk: "MEDIUM",
        category: "TEST",
        priority: 2,
      },
      {
        id: "bank-proof",
        title: "Prepare Bank Statement",
        status: "NOT_STARTED",
        risk: "HIGH",
        category: "FINANCE",
        priority: 1,
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
