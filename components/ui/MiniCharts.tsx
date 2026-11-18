"use client";

import { motion } from "framer-motion";

/** 첫 화면 문구 사이에 들어가는 작은 막대 차트 (시그니처) */
export function MiniBars({ className = "" }: { className?: string }) {
  const bars = [0.45, 0.7, 0.55, 0.9, 0.65];
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-[0.8em] items-end gap-[0.08em] align-middle ${className}`}
    >
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="block w-[0.14em] rounded-sm bg-blue-600"
          initial={{ height: "10%" }}
          animate={{ height: [`${h * 100}%`, `${(1 - h) * 60 + 30}%`, `${h * 100}%`] }}
          transition={{
            duration: 2.4,
            delay: 0.6 + i * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

/** 첫 화면 문구 끝에 들어가는 작은 선 그래프 */
export function MiniLine({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 48"
      className={`inline-block h-[0.7em] w-[1.6em] align-middle ${className}`}
    >
      <motion.path
        d="M4 40 L28 30 L48 34 L72 16 L94 22 L116 6"
        fill="none"
        stroke="#2563eb"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
      />
      <motion.circle
        cx="116"
        cy="6"
        r="6"
        fill="#2563eb"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.5, delay: 2.2 }}
      />
    </svg>
  );
}
