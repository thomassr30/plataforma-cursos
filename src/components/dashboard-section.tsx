"use client";

import { motion } from "motion/react";

export function DashboardSection({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="space-y-3 sm:space-y-4"
    >
      {children}
    </motion.section>
  );
}
