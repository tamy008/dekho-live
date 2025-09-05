"use client"

import { useEffect, useRef, useState } from "react"

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    // Use more aggressive options for better performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)

        // Track if element has ever been visible (for one-time animations)
        if (isVisible && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "50px", // Start loading earlier
        ...options,
      },
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [hasIntersected, options]) // Updated to include the entire options object

  return [targetRef, isIntersecting, hasIntersected]
}
