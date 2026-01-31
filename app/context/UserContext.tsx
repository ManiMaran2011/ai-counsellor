"use client";

import { createContext, useContext, useState } from "react";

/* =========================
   TYPES
========================= */

export type Stage = 1 | 2 | 3 | 4;
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

export type TaskCategory =
  | "SOP"
  | "TEST"
  | "FINANCE"
  | "PORTAL"
  | "VISA";

export type Task = {
  id: string;
  title: string;
  category: TaskCategory;
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

/* =========================
   CONTEXT TYPE
========================= */

type UserContextType = {
  profile: Profile | null;
  stage: Stage;
  lockedUniversity: University | null;

  tasks: Task[];
  confidence: number;
  risk: RiskLevel;

  updateProfile: (data: Partial<Profile>) => void;
  completeOnboarding: (profile: Profile) => void;

  lockUniversity: (uni: University, generatedTasks: Task[]) => boolean;
  unlockUniversity: () => void;

  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
};

/* =========================
   CONTEXT
========================= */

const UserContext = createContext<UserContextType>(null as any);

const emptyProfile: Profile = {
  name: "",
  email: "",
  phone: "",
  academics: { degree: "" },
  goals: { targetDegree: "", intake: "", countries: [] },
  budget: { annualINR: "", funding: "" },
  readiness: { ielts: "", gre: "", sop: "" },
};

/* =========================
   PROVIDER
========================= */

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stage, setStage] = useState<Stage>(1);
  const [lockedUniversity, setLockedUniversity] =
    useState<University | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [confidence, setConfidence] = useState<number>(40);
  const [risk, setRisk] = useState<RiskLevel>("MEDIUM");

  /* ---------- PROFILE ---------- */

  const updateProfile = (data: Partial<Profile>) => {
    setProfile((prev) => ({
      ...(prev ?? emptyProfile),
      ...data,
    }));
  };

  const completeOnboarding = (data: Profile) => {
    setProfile(data);
    setStage(2);
  };

  /* ---------- UNIVERSITY ---------- */

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

  /* ---------- TASK UPDATES ---------- */

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status } : t
      )
    );

    if (status === "DONE") {
      setConfidence((c) => Math.min(c + 10, 100));
    }

    setRisk((prevRisk) => {
      if (confidence > 75) return "LOW";
      if (confidence < 40) return "HIGH";
      return prevRisk;
    });
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
