"use client"

import { useEffect, useRef, useState } from "react"

export default function InteractiveMeshGradient({
  className = "",
  intensity = "medium",
  colors = ["#6366f1", "#ec4899", "#06b6d4", "#8b5cf6"],
}) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isVisible, setIsVisible] = useState(false)

  const intensitySettings = {
    low: { points: 4, speed: 0.005, mouseInfluence: 0.1 },
    medium: { points: 6, speed: 0.008, mouseInfluence: 0.15 },
    high: { points: 8, speed: 0.012, mouseInfluence: 0.2 },
  }

  const settings = intensitySettings[intensity]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let time = 0
    let gradientPoints = []

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      // Initialize gradient points
      gradientPoints = Array.from({ length: settings.points }, (_, i) => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * settings.speed,
        vy: (Math.random() - 0.5) * settings.speed,
        color: colors[i % colors.length],
        radius: 0.3 + Math.random() * 0.4,
      }))
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }

    const animate = () => {
      if (!isVisible) return

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Update gradient points
      gradientPoints.forEach((point) => {
        // Natural movement
        point.x += point.vx
        point.y += point.vy

        // Mouse influence
        const dx = mousePosition.x - point.x
        const dy = mousePosition.y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 0.3) {
          point.x += dx * settings.mouseInfluence
          point.y += dy * settings.mouseInfluence
        }

        // Boundary bouncing
        if (point.x <= 0 || point.x >= 1) point.vx *= -1
        if (point.y <= 0 || point.y >= 1) point.vy *= -1

        point.x = Math.max(0, Math.min(1, point.x))
        point.y = Math.max(0, Math.min(1, point.y))
      })

      // Create mesh gradient
      const imageData = ctx.createImageData(canvas.offsetWidth, canvas.offsetHeight)
      const data = imageData.data

      for (let x = 0; x < canvas.offsetWidth; x += 2) {
        for (let y = 0; y < canvas.offsetHeight; y += 2) {
          const normalizedX = x / canvas.offsetWidth
          const normalizedY = y / canvas.offsetHeight

          let totalWeight = 0
          let r = 0,
            g = 0,
            b = 0,
            a = 0

          gradientPoints.forEach((point) => {
            const dx = normalizedX - point.x
            const dy = normalizedY - point.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const weight = Math.exp((-distance * distance) / (point.radius * point.radius))

            totalWeight += weight

            const color = hexToRgb(point.color)
            r += color.r * weight
            g += color.g * weight
            b += color.b * weight
            a += weight
          })

          if (totalWeight > 0) {
            r /= totalWeight
            g /= totalWeight
            b /= totalWeight
            a = Math.min(255, a * 100)
          }

          // Apply to 2x2 pixel block for performance
          for (let dx = 0; dx < 2 && x + dx < canvas.offsetWidth; dx++) {
            for (let dy = 0; dy < 2 && y + dy < canvas.offsetHeight; dy++) {
              const index = ((y + dy) * canvas.offsetWidth + (x + dx)) * 4
              data[index] = r
              data[index + 1] = g
              data[index + 2] = b
              data[index + 3] = a
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)

      // Add overlay effects
      const overlayGradient = ctx.createRadialGradient(
        mousePosition.x * canvas.offsetWidth,
        mousePosition.y * canvas.offsetHeight,
        0,
        mousePosition.x * canvas.offsetWidth,
        mousePosition.y * canvas.offsetHeight,
        Math.max(canvas.offsetWidth, canvas.offsetHeight) * 0.5,
      )

      overlayGradient.addColorStop(0, "rgba(255, 255, 255, 0.1)")
      overlayGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = overlayGradient
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      time += 1
      animationRef.current = requestAnimationFrame(animate)
    }

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 }
    }

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          animate()
        } else {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(canvas)
    resizeCanvas()

    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", resizeCanvas)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
      canvas.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [colors, intensity, mousePosition.x, mousePosition.y, isVisible])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{
        background: "transparent",
        mixBlendMode: "multiply",
      }}
    />
  )
}
