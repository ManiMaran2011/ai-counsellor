"use client";

import { createContext, useContext, useState } from "react";

/* ================= TYPES ================= */

export type TaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  category: "SOP" | "TEST" | "FINANCE" | "PORTAL" | "VISA";
  status: TaskStatus;
  priority?: number;
  dependsOn?: string[];
  deadline?: string;
  risk?: RiskLevel;
};

export type Profile = {
  name: string;
  email: string;
  phone: string;

  academics: {
    degree: string;
    gpa?: string;
    graduationYear?: string;
  };

  goals: {
    targetDegree: string;
    intake: string;
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
  program?: string;
};

type Stage = 1 | 2 | 3 | 4;

type UserContextType = {
  profile: Profile | null;
  stage: Stage;
  lockedUniversity: University | null;

  tasks: Task[];
  confidence: number;
  risk: RiskLevel;

  completeOnboarding: (profile: Profile) => void;
  lockUniversity: (uni: University, tasks: Task[]) => boolean;
  unlockUniversity: () => void;

  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  increaseConfidence: (amount?: number) => void;
  decayConfidence: (amount?: number) => void;
};

/* ================= CONTEXT ================= */

const UserContext = createContext<UserContextType>(null as any);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stage, setStage] = useState<Stage>(1);
  const [lockedUniversity, setLockedUniversity] =
    useState<University | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [confidence, setConfidence] = useState(40);
  const [risk, setRisk] = useState<RiskLevel>("MEDIUM");

  /* ========== CORE ACTIONS ========== */

  const completeOnboarding = (data: Profile) => {
    setProfile(data);
    setStage(2);
  };

  const lockUniversity = (uni: University, generatedTasks: Task[]) => {
    if (lockedUniversity) return false;

    setLockedUniversity(uni);
    setTasks(generatedTasks);
    setStage(4);
    setConfidence(40);
    setRisk("MEDIUM");

    return true;
  };

  const unlockUniversity = () => {
    setLockedUniversity(null);
    setTasks([]);
    setStage(2);
    setConfidence(40);
    setRisk("MEDIUM");
  };

  /* ========== TASK + CONFIDENCE LOGIC ========== */

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status } : t
      )
    );

    if (status === "DONE") {
      increaseConfidence(10);
    }
  };

  const increaseConfidence = (amount = 5) => {
    setConfidence((c) => Math.min(100, c + amount));
  };

  const decayConfidence = (amount = 5) => {
    setConfidence((c) => Math.max(0, c - amount));
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        stage,
        lockedUniversity,
        tasks,
        confidence,
        risk,
        completeOnboarding,
        lockUniversity,
        unlockUniversity,
        updateTaskStatus,
        increaseConfidence,
        decayConfidence,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
