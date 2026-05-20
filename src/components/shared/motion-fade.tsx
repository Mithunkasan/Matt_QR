"use client"

import { motion } from "framer-motion"

type MotionFadeProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function MotionFade({
  children,
  className,
  delay = 0,
}: MotionFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
