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
  /* ===== STATE ===== */
  profile: Profile | null;
  stage: Stage;
  confidence: number;
  risk: RiskLevel;
  lockedUniversity: University | null;
  tasks: Task[];

  /* ===== ACTIONS ===== */
  updateProfile: (partial: Partial<Profile>) => void;
  completeOnboarding: (profile: Profile) => void;

  lockUniversity: (uni: University) => void;
  unlockUniversity: () => void;

  completeTask: (taskId: string) => void;
};

/* ================= CONTEXT ================= */

const UserContext = createContext<UserContextType>(null as any);

const emptyProfile: Profile = {
  name: "",
  email: "",
  goals: {
    targetDegree: "",
    countries: [],
  },
  budget: {
    annualINR: "",
    funding: "",
  },
  readiness: {
    ielts: "",
    gre: "",
    sop: "",
  },
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stage, setStage] = useState<Stage>(1);
  const [confidence, setConfidence] = useState(70);
  const [risk, setRisk] = useState<RiskLevel>("MEDIUM");
  const [lockedUniversity, setLockedUniversity] =
    useState<University | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  /* ===== Confidence Decay (Execution only) ===== */
  useEffect(() => {
    if (stage !== 4) return;

    const timer = setInterval(() => {
      setConfidence((c) => Math.max(30, c - 1));
    }, 60000);

    return () => clearInterval(timer);
  }, [stage]);

  /* ================= ACTIONS ================= */

  // 🔌 Used by onboarding Step 1–3
  const updateProfile = (partial: Partial<Profile>) => {
    setProfile((prev) => ({
      ...(prev ?? emptyProfile),
      ...partial,
      goals: {
        ...(prev?.goals ?? emptyProfile.goals),
        ...(partial.goals ?? {}),
      },
      budget: {
        ...(prev?.budget ?? emptyProfile.budget),
        ...(partial.budget ?? {}),
      },
      readiness: {
        ...(prev?.readiness ?? emptyProfile.readiness),
        ...(partial.readiness ?? {}),
      },
    }));
  };

  // 🔒 FSM GATE — ONLY CALLED ON STEP 4
  const completeOnboarding = (finalProfile: Profile) => {
    setProfile(finalProfile);
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
