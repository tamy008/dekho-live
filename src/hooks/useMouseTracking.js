"use client"

import { useState, useEffect } from "react"

export const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === "undefined") return // Ensure window is defined

    let animationId = null
    let lastUpdate = 0
    let isTracking = true

    const handleMouseMove = (e) => {
      try {
        if (!isTracking || !e) return

        const now = Date.now()
        // Update more frequently for smoother 3D effects
        if (now - lastUpdate < 16) return // Aim for ~60fps

        if (animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
        }

        animationId = requestAnimationFrame(() => {
          try {
            if (!isTracking) return

            const clientX = typeof e.clientX === "number" ? e.clientX : 0
            const clientY = typeof e.clientY === "number" ? e.clientY : 0

            // Return raw pixel values for more precise R3F control
            setMousePosition((prev) => {
              if (prev?.x === clientX && prev?.y === clientY) return prev
              return { x: clientX, y: clientY }
            })

            lastUpdate = now
          } catch (innerError) {
            // Silent error handling
          } finally {
            animationId = null
          }
        })
      } catch (error) {
        if (animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      isTracking = false
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, []) // Empty dependency array means this effect runs once on mount

  return mousePosition
}
