"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowButtonProps {
  href: string;
  children: React.ReactNode;
  direction?: "left" | "right";
  className?: string;
  variant?: "primary" | "secondary";
}

export function ArrowButton({
  href,
  children,
  direction = "right",
  className,
  variant = "primary",
}: ArrowButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link href={href} className={cn("inline-block group outline-none", className)}>
      <motion.div
        className={cn(
          "flex items-center gap-3 px-6 py-3 rounded-full border",
          isPrimary
            ? "border-[#333333] bg-[#111111] hover:bg-[#1a1a1a] text-white"
            : "border-transparent bg-transparent text-[#A1A1A6] hover:text-white"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {direction === "left" && (
          <motion.span
            className="text-[#A70947]"
            initial={{ x: 0 }}
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ArrowLeft size={16} />
          </motion.span>
        )}

        <span style={{ fontSize: "12px", letterSpacing: "0.05em", fontFamily: "Inter, sans-serif" }}>
          {children}
        </span>

        {direction === "right" && (
          <motion.span
            className="text-[#A70947]"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ArrowRight size={16} />
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
}
