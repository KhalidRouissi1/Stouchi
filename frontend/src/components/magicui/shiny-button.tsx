'use client'

import { motion } from 'framer-motion'
import type { AnimationProps, HTMLMotionProps } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'

// Define animation properties
const animationProps = {
  initial: { '--x': '100%', scale: 0.8 },
  animate: { '--x': '-100%', scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 1,
    type: 'spring',
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: 'spring',
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps

// Define props for the button
interface ShinyButtonProps extends HTMLMotionProps<'a'> {
  children: React.ReactNode;
  href: string;
  className?: string;
}

// Create ShinyButton as a motion-enhanced anchor tag
const ShinyButton = React.forwardRef<HTMLAnchorElement, ShinyButtonProps>(
  ({ children, className, href, ...props }, ref) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        {...animationProps}
        {...props}
        className={cn(
          'relative inline-block rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-lg dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]',
          className
        )}
      >
        <span
          className="relative block w-full text-center text-sm uppercase tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
          style={{
            maskImage:
              'linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))',
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
            maskComposite: 'exclude',
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
        ></span>
      </motion.a>
    )
  }
)

ShinyButton.displayName = 'ShinyButton'

export default ShinyButton
