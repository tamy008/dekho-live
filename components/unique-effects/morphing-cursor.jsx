"use client"

import { useEffect, useRef, useState } from "react"

export default function MorphingCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef([])
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorMode, setCursorMode] = useState("normal")
  let mouseX = 0
  let mouseY = 0

  useEffect(() => {
    if (typeof window === "undefined") return

    const cursor = cursorRef.current
    if (!cursor) return

    let cursorX = 0
    let cursorY = 0
    let animationId = null

    const updateCursor = () => {
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY

      cursorX += dx * 0.15
      cursorY += dy * 0.15

      const scale = isHovering ? 2.5 : 1
      const rotation = Date.now() * 0.001

      cursor.style.transform = `
        translate3d(${cursorX - 25}px, ${cursorY - 25}px, 0) 
        scale(${scale}) 
        rotate(${rotation}rad)
      `

      // Enhanced trail system
      trailRef.current.push({
        x: cursorX,
        y: cursorY,
        time: Date.now(),
        scale: scale * 0.3,
        rotation: rotation,
      })
      trailRef.current = trailRef.current.filter((point) => Date.now() - point.time < 800)

      animationId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)
    }

    const handleMouseEnter = (e) => {
      if (!e?.target) return

      try {
        const target = e.target
        const isInteractive =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest?.("button") ||
          target.closest?.("a") ||
          target.closest?.('[role="button"]') ||
          target.classList?.contains("interactive")

        if (isInteractive) {
          setIsHovering(true)
          setCursorMode("magnetic")
        }
      } catch (error) {
        console.warn("Cursor hover detection error:", error)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorMode("normal")
    }

    const handleClick = () => {
      setCursorMode("explosive")
      setTimeout(() => setCursorMode("normal"), 300)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)
    document.addEventListener("click", handleClick)

    updateCursor()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
      document.removeEventListener("click", handleClick)
    }
  }, [isHovering, cursorMode])

  if (typeof window === "undefined") return null

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `
            conic-gradient(
              from 0deg,
              #6366f1 0deg,
              #ec4899 120deg,
              #06b6d4 240deg,
              #6366f1 360deg
            )
          `,
          borderRadius: cursorMode === "explosive" ? "20%" : "50%",
          filter: `
            blur(${cursorMode === "explosive" ? "2px" : "0.5px"}) 
            brightness(${isHovering ? "1.5" : "1.2"})
          `,
          boxShadow: `
            0 0 30px rgba(99, 102, 241, 0.8),
            0 0 60px rgba(236, 72, 153, 0.6),
            0 0 90px rgba(6, 182, 212, 0.4),
            inset 0 0 20px rgba(255, 255, 255, 0.3)
          `,
          animation: `
            morphing-advanced 4s ease-in-out infinite,
            ${cursorMode === "explosive" ? "cursor-explode 0.3s ease-out" : ""}
          `,
        }}
      />

      {/* Enhanced Cursor Trail */}
      {trailRef.current.map((point, index) => (
        <div
          key={`${point.x}-${point.y}-${point.time}`}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: point.x - 6,
            top: point.y - 6,
            width: 12,
            height: 12,
            background: `
              radial-gradient(circle,
                rgba(99, 102, 241, ${0.9 - (index / trailRef.current.length) * 0.9}) 0%,
                rgba(236, 72, 153, ${0.7 - (index / trailRef.current.length) * 0.7}) 50%,
                transparent 100%
              )
            `,
            borderRadius: "50%",
            transform: `scale(${point.scale}) rotate(${point.rotation}rad)`,
            filter: "blur(1px)",
            animation: `trail-fade ${0.8 - (index / trailRef.current.length) * 0.3}s ease-out forwards`,
          }}
        />
      ))}

      {/* Magnetic Field Effect */}
      {cursorMode === "magnetic" && (
        <div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: mouseX - 50,
            top: mouseY - 50,
            width: 100,
            height: 100,
            border: "2px solid rgba(99, 102, 241, 0.3)",
            borderRadius: "50%",
            animation: "magnetic-pulse 1s ease-in-out infinite",
          }}
        />
      )}

      <style jsx>{`
        @keyframes morphing-advanced {
          0%, 100% { 
            border-radius: 50%; 
            transform: rotate(0deg) scale(1);
          }
          20% { 
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; 
            transform: rotate(72deg) scale(1.1);
          }
          40% { 
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; 
            transform: rotate(144deg) scale(0.9);
          }
          60% { 
            border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%; 
            transform: rotate(216deg) scale(1.05);
          }
          80% { 
            border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%; 
            transform: rotate(288deg) scale(0.95);
          }
        }
        
        @keyframes cursor-explode {
          0% { transform: scale(1); }
          50% { transform: scale(3); filter: blur(3px); }
          100% { transform: scale(1); filter: blur(0.5px); }
        }
        
        @keyframes magnetic-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        
        @keyframes trail-fade {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.3); }
        }
        
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
