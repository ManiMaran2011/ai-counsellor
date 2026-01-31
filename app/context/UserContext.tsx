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

  updateProfile: (data: Partial<Profile>) => void;
  completeOnboarding: (profile: Profile) => void;

  lockUniversity: (uni: University) => void;
  unlockUniversity: () => void;

  completeTask: (taskId: string) => void;
};

/* ================= ENGINES ================= */

import {
  classifyUniversity,
  universityRisk,
} from "@/app/engine/universityEngine";

import {
  decayConfidence,
  rewardConfidence,
} from "@/app/engine/confidenceEngine";

import { generateTasks } from "@/app/engine/taskEngine";
import { shouldEscalate } from "@/app/engine/escalationEngine";

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
      setConfidence((c) => decayConfidence(c));
    }, 60000);

    return () => clearInterval(timer);
  }, [stage]);

  /* ================= ACTIONS ================= */

  const updateProfile = (data: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev!, ...data }));
  };

  const completeOnboarding = (finalProfile: Profile) => {
    setProfile(finalProfile);
    setStage(2);
    setConfidence(75);
    setRisk("MEDIUM");
  };

  const lockUniversity = (uni: University) => {
    if (!profile) return;

    const category = classifyUniversity(profile, uni, confidence);

    const locked = {
      ...uni,
      category,
    };

    setLockedUniversity(locked);
    setStage(4);

    const generatedTasks = generateTasks(profile, locked);

    setTasks(generatedTasks);
    setRisk(universityRisk(category));
    setConfidence((c) => Math.max(40, c - 10));
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

    setConfidence((c) => rewardConfidence(c));
  };

  /* ================= ESCALATION (READ-ONLY) ================= */

  useEffect(() => {
    if (shouldEscalate(confidence, tasks)) {
      console.log("⚠️ Escalation condition met");
      // future: show expert CTA / unlock advisor
    }
  }, [confidence, tasks]);

  /* ================= PROVIDER ================= */

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
