'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div
    className={className}
    initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateY(18px)' }}
    whileInView={{ opacity: 1, transform: 'translateY(0)' }}
    viewport={{ once: true, amount: 0.16 }}
    transition={{ duration: reduceMotion ? 0.2 : 0.55, delay: reduceMotion ? 0 : delay, ease: [0.23, 1, 0.32, 1] }}
  >{children}</motion.div>;
}
