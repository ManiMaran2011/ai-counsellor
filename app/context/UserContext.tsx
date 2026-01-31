"use client";

import { createContext, useContext, useState } from "react";

/* ================= TYPES ================= */

export type Stage = 1 | 2 | 3 | 4;

export type TaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  category: string;
  status: TaskStatus;
  priority: number;
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

/* ================= CONTEXT ================= */

type UserContextType = {
  profile: Profile | null;
  stage: Stage;
  lockedUniversity: University | null;

  tasks: Task[];
  confidence: number;
  risk: RiskLevel;

  updateProfile: (data: Partial<Profile>) => void;
  completeOnboarding: (profile: Profile) => void;

  lockUniversity: (uni: University) => boolean;
  unlockUniversity: () => void;

  updateTaskStatus: (taskId: string, status: TaskStatus) => void;

  canAccessStage: (stage: Stage) => boolean;
};

const UserContext = createContext<UserContextType>(null as any);

/* ================= PROVIDER ================= */

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stage, setStage] = useState<Stage>(1);
  const [lockedUniversity, setLockedUniversity] =
    useState<University | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [confidence, setConfidence] = useState(40);
  const [risk, setRisk] = useState<RiskLevel>("MEDIUM");

  /* ================= HELPERS ================= */

  const canAccessStage = (targetStage: Stage) => {
    return stage >= targetStage;
  };

  /* ================= ACTIONS ================= */

  const updateProfile = (data: Partial<Profile>) => {
    setProfile((prev) => ({
      ...(prev as Profile),
      ...data,
    }));
  };

  const completeOnboarding = (data: Profile) => {
    setProfile(data);
    setStage(2);
  };

  const lockUniversity = (uni: University) => {
    if (lockedUniversity) return false;

    setLockedUniversity(uni);
    setStage(4);
    setConfidence(40);
    setRisk("MEDIUM");

    return true;
  };

  const unlockUniversity = () => {
    setLockedUniversity(null);
    setStage(2);
    setTasks([]);
    setConfidence(40);
    setRisk("LOW");
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status } : t
      )
    );

    if (status === "DONE") {
      setConfidence((c) => Math.min(c + 10, 100));
    }
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
        updateProfile,
        completeOnboarding,
        lockUniversity,
        unlockUniversity,
        updateTaskStatus,
        canAccessStage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
