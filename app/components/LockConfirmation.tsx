"use client";

import { motion } from "framer-motion";

export function LockConfirmation({
  university,
  onConfirm,
  onCancel,
}: {
  university: { name: string };
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white text-black rounded-2xl p-8 max-w-md w-full space-y-5"
      >
        <h2 className="text-2xl font-bold">
          Lock {university.name}?
        </h2>

        <p className="text-slate-600 text-sm">
          This action commits you to executing all required steps
          for this university. You can unlock later, but momentum
          and confidence will reset.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          ⚠ Locking triggers deadlines, task pressure, and confidence decay.
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 border border-slate-300 rounded-xl py-3 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-primary text-white rounded-xl py-3 font-bold"
          >
            Yes, Lock & Proceed
          </button>
        </div>
      </motion.div>
    </div>
  );
}
