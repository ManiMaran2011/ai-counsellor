"use client";

import { createContext, useContext, useState } from "react";

/* ===================== CORE TYPES ===================== */

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type TaskStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "DONE";

export type Task = {
  id: string;
  title: string;
  category?: string;

  status: TaskStatus;

  priority?: number;
  deadline?: string;

  risk?: RiskLevel;

  dependsOn?: string[];
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

export type Stage = 1 | 2 | 3 | 4;

/* ===================== CONTEXT TYPE ===================== */

type UserContextType = {
  profile: Profile | null;
  stage: Stage;

  lockedUniversity: University | null;

  tasks: Task[];

  confidence: number;
  risk: RiskLevel;

  completeOnboarding: (profile: Profile) => void;

  lockUniversity: (uni: University) => boolean;
  unlockUniversity: () => void;

  setTasks: (tasks: Task[]) => void;

  increaseConfidence: (by?: number) => void;
  decayConfidence: (by?: number) => void;
};

/* ===================== CONTEXT ===================== */

const UserContext = createContext<UserContextType>(null as any);

/* ===================== PROVIDER ===================== */

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stage, setStage] = useState<Stage>(1);

  const [lockedUniversity, setLockedUniversity] =
    useState<University | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [confidence, setConfidence] = useState(70);
  const [risk, setRisk] = useState<RiskLevel>("MEDIUM");

  /* ===================== ACTIONS ===================== */

  const completeOnboarding = (data: Profile) => {
    setProfile(data);
    setStage(2);
    setConfidence(65);
    setRisk("MEDIUM");
  };

  const lockUniversity = (uni: University) => {
    if (lockedUniversity) return false;

    setLockedUniversity(uni);
    setStage(4);

    setRisk("MEDIUM");
    setConfidence(60);

    return true;
  };

  const unlockUniversity = () => {
    setLockedUniversity(null);
    setStage(2);
    setTasks([]);

    setConfidence((c) => Math.max(40, c - 10));
    setRisk("MEDIUM");
  };

  const increaseConfidence = (by = 5) => {
    setConfidence((c) => Math.min(100, c + by));
  };

  const decayConfidence = (by = 2) => {
    setConfidence((c) => Math.max(0, c - by));
  };

  /* ===================== PROVIDER ===================== */

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

        setTasks,

        increaseConfidence,
        decayConfidence,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/* ===================== HOOK ===================== */

export const useUser = () => useContext(UserContext);
