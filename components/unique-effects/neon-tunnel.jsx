"use client"

import { useEffect, useRef, useState } from "react"

export default function NeonTunnel({ isActive = true }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let time = 0
    let mouseX = 0
    let mouseY = 0

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / rect.width
      mouseY = (e.clientY - rect.top) / rect.height
    }

    const drawTunnel = () => {
      if (!isActive) return

      ctx.fillStyle = "rgba(15, 15, 35, 0.1)"
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      const centerX = canvas.offsetWidth / 2 + (mouseX - 0.5) * 100
      const centerY = canvas.offsetHeight / 2 + (mouseY - 0.5) * 100

      // Draw tunnel rings
      for (let i = 0; i < 20; i++) {
        const z = (i + time * 0.02) % 20
        const scale = 1 / (z * 0.1 + 0.1)
        const alpha = Math.max(0, 1 - z * 0.1)

        if (scale > 0.01) {
          // Outer ring
          ctx.beginPath()
          ctx.arc(centerX, centerY, 200 * scale, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.8})`
          ctx.lineWidth = 3 * scale
          ctx.stroke()

          // Inner ring
          ctx.beginPath()
          ctx.arc(centerX, centerY, 150 * scale, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(236, 72, 153, ${alpha * 0.6})`
          ctx.lineWidth = 2 * scale
          ctx.stroke()

          // Innermost ring
          ctx.beginPath()
          ctx.arc(centerX, centerY, 100 * scale, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.4})`
          ctx.lineWidth = 1 * scale
          ctx.stroke()

          // Glow effect
          ctx.beginPath()
          ctx.arc(centerX, centerY, 200 * scale, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.2})`
          ctx.lineWidth = 8 * scale
          ctx.stroke()
        }
      }

      // Draw connecting lines
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.01
        const x1 = centerX + Math.cos(angle) * 50
        const y1 = centerY + Math.sin(angle) * 50
        const x2 = centerX + Math.cos(angle) * 300
        const y2 = centerY + Math.sin(angle) * 300

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.8)")
        gradient.addColorStop(0.5, "rgba(236, 72, 153, 0.4)")
        gradient.addColorStop(1, "rgba(6, 182, 212, 0.1)")

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }

      time += 1
      animationRef.current = requestAnimationFrame(drawTunnel)
    }

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting && isActive) {
          drawTunnel()
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
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: "transparent",
        mixBlendMode: "screen",
      }}
    />
  )
}
