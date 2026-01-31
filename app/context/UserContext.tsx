"use client";

import { createContext, useContext, useState } from "react";
import { generateTasks } from "@/app/engine/taskEngine";
import { shouldEscalateToExpert } from "@/app/engine/escalationEngine";

export type TaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  category: string;
  status: TaskStatus;
  priority: number;
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

  updateProfile: (p: Partial<Profile>) => void;
  completeOnboarding: (p: Profile) => void;

  lockUniversity: (u: University) => void;
  unlockUniversity: () => void;

  completeTask: (taskId: string) => void;
};

const UserContext = createContext<UserContextType>(null as any);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stage, setStage] = useState<Stage>(1);
  const [lockedUniversity, setLockedUniversity] =
    useState<University | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [confidence, setConfidence] = useState(40);
  const [risk, setRisk] = useState<RiskLevel>("MEDIUM");

  /* ================= PROFILE ================= */

  const updateProfile = (p: Partial<Profile>) => {
    setProfile((prev) => ({ ...(prev as Profile), ...p }));
  };

  const completeOnboarding = (p: Profile) => {
    setProfile(p);
    setStage(2);
    setConfidence(45);
  };

  /* ================= UNIVERSITY ================= */

  const lockUniversity = (u: University) => {
    if (!profile) return;

    setLockedUniversity(u);
    setStage(4);

    const generated = generateTasks({
      profile,
      university: u,
    });

    setTasks(generated as Task[]);
    setConfidence((c) => Math.min(100, c + 10));
    setRisk("MEDIUM");
  };

  const unlockUniversity = () => {
    setLockedUniversity(null);
    setTasks([]);
    setStage(2);
    setConfidence(40);
    setRisk("MEDIUM");
  };

  /* ================= TASKS ================= */

  const completeTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: "DONE" } : t
      )
    );

    setConfidence((c) => Math.min(100, c + 8));

    const escalate = shouldEscalateToExpert({
      tasks,
      confidence,
    });

    setRisk(escalate ? "HIGH" : "LOW");
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
        completeTask,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
