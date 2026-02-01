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

  budget?: {
    annualINR: string;
    funding: string;
  };

  readiness?: {
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

  updateProfile: (data: Partial<Profile>) => void;
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

  /* ================= COOKIE HYDRATION ================= */

  useEffect(() => {
    const cookieStage = document.cookie
      .split("; ")
      .find((c) => c.startsWith("stage="))
      ?.split("=")[1];

    if (cookieStage) {
      setStage(Number(cookieStage) as Stage);
    }
  }, []);

  /* ================= ACTIONS ================= */

  // ✅ Partial updates (used by onboarding steps)
  const updateProfile = (data: Partial<Profile>) => {
    setProfile((prev) => {
      if (!prev) return data as Profile;
      return {
        ...prev,
        ...data,
        goals: {
          ...prev.goals,
          ...(data.goals ?? {}),
        },
        budget: {
          ...prev.budget,
          ...(data.budget ?? {}),
        },
        readiness: {
          ...prev.readiness,
          ...(data.readiness ?? {}),
        },
      };
    });
  };

  // 🔒 FSM GATE — ONLY place onboarding completes
  const completeOnboarding = (data: Profile) => {
    setProfile(data);
    setStage(2);
    setConfidence(75);
    setRisk("MEDIUM");

    // 🔥 CRITICAL: middleware sync
    document.cookie = "stage=2; path=/; max-age=31536000";
  };

  const lockUniversity = (uni: University) => {
    setLockedUniversity(uni);
    setStage(4);
    setConfidence(60);

    document.cookie = "stage=4; path=/; max-age=31536000";

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

    document.cookie = "stage=2; path=/; max-age=31536000";
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
        updateProfile,
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
