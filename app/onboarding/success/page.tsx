"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OnboardingSuccess() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl">
              verified
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-black text-charcoal mb-4">
          Profile Complete 🎉
        </h1>

        {/* Subtext */}
        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
          Your AI Counsellor now understands your goals, strengths, and
          constraints.
          <br />
          <span className="font-semibold text-slate-700">
            It’s time to make smart decisions.
          </span>
        </p>

        {/* What happens next */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            What happens next
          </p>

          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">
                school
              </span>
              Discover Dream / Target / Safe universities
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">
                psychology
              </span>
              Get AI-guided recommendations (not chat, real guidance)
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">
                checklist
              </span>
              Lock a university and execute step-by-step
            </li>
          </ul>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/dashboard")}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30"
        >
          Enter My Dashboard →
        </motion.button>

        {/* Subtle footer */}
        <p className="mt-6 text-xs text-slate-400">
          You can update your profile anytime from settings.
        </p>
      </motion.div>
    </main>
  );
}
