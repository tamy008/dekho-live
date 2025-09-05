"use client"

import { useState, useEffect } from "react"

export const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleMouseMove = (e) => {
      try {
        const clientX = typeof e.clientX === "number" ? e.clientX : 0
        const clientY = typeof e.clientY === "number" ? e.clientY : 0

        const windowWidth = window.innerWidth || 1920
        const windowHeight = window.innerHeight || 1080

        const normalizedX = ((clientX / windowWidth) * 2 - 1) * 0.05
        const normalizedY = ((clientY / windowHeight) * 2 - 1) * 0.05

        setMousePosition({ x: normalizedX, y: normalizedY })
      } catch (error) {
        console.warn("Mouse tracking error:", error)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return mousePosition
}
