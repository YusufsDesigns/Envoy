"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"

interface FadeUpProps {
  children: ReactNode
  delay?: number
  style?: CSSProperties
  className?: string
}

export function FadeUp({ children, delay = 0, style, className }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = `fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`
          obs.disconnect()
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -48px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} style={{ opacity: 0, ...style }} className={className}>
      {children}
    </div>
  )
}
