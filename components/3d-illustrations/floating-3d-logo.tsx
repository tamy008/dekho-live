"use client"

import { useEffect, useRef, useState, memo } from "react"

interface Floating3DLogoProps {
  size?: number
  autoRotate?: boolean
  interactive?: boolean
  subtle?: boolean
}

const Floating3DLogo = memo(
  ({ size = 120, autoRotate = true, interactive = true, subtle = false }: Floating3DLogoProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      // Intersection observer for performance
      const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => observer.disconnect()
    }, [])

    useEffect(() => {
      if (!interactive || !isVisible) return

      let ticking = false
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || !ticking) {
          requestAnimationFrame(() => {
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect()
              const centerX = rect.left + rect.width / 2
              const centerY = rect.top + rect.height / 2

              setMousePosition({
                x: (e.clientX - centerX) / rect.width,
                y: (e.clientY - centerY) / rect.height,
              })
            }
            ticking = false
          })
          ticking = true
        }
      }

      document.addEventListener("mousemove", handleMouseMove, { passive: true })
      return () => document.removeEventListener("mousemove", handleMouseMove)
    }, [interactive, isVisible])

    if (!isVisible) return <div style={{ width: size, height: size }} />

    return (
      <div
        ref={containerRef}
        className="relative will-change-transform"
        style={{ width: size, height: size }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 3D Logo Container */}
        <div
          className="relative w-full h-full will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            perspective: subtle ? "800px" : "1000px",
            transform: `
            rotateX(${interactive ? mousePosition.y * (subtle ? 5 : 20) : 0}deg)
            rotateY(${interactive ? mousePosition.x * (subtle ? 5 : 20) : 0}deg)
            ${autoRotate ? `rotateZ(${isHovered ? 0 : 360}deg)` : ""}
          `,
            transition: autoRotate ? "transform 8s linear infinite" : "transform 0.3s ease-out",
            ...(autoRotate && !isHovered
              ? {
                  animationName: "logo-auto-rotate",
                  animationDuration: "8s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                }
              : {}),
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 rounded-2xl will-change-transform"
            style={{
              background: subtle
                ? `linear-gradient(135deg, 
                  rgba(99, 102, 241, 0.4) 0%, 
                  rgba(139, 92, 246, 0.3) 25%, 
                  rgba(236, 72, 153, 0.25) 50%, 
                  rgba(245, 158, 11, 0.2) 75%, 
                  rgba(6, 182, 212, 0.3) 100%
                )`
                : `linear-gradient(135deg, 
                  #6366f1 0%, 
                  #8b5cf6 25%, 
                  #ec4899 50%, 
                  #f59e0b 75%, 
                  #06b6d4 100%
                )`,
              transform: `translateZ(${subtle ? 4 : 20}px)`,
              boxShadow: subtle
                ? `0 0 8px rgba(99, 102, 241, 0.2), inset 0 0 6px rgba(255, 255, 255, 0.08)`
                : `0 0 30px rgba(99, 102, 241, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)`,
              border: subtle ? "1px solid rgba(255, 255, 255, 0.2)" : "2px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* Logo Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative"
                style={{
                  fontSize: size * 0.4,
                  filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))",
                  transform: "translateZ(10px)",
                }}
              >
                🎬
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `
              linear-gradient(225deg, 
                #06b6d4 0%, 
                #f59e0b 25%, 
                #ec4899 50%, 
                #8b5cf6 75%, 
                #6366f1 100%
              )
            `,
              transform: "translateZ(-20px) rotateY(180deg)",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                style={{
                  fontSize: size * 0.3,
                  filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
                  transform: "rotateY(180deg) translateZ(10px)",
                }}
              >
                ✨
              </div>
            </div>
          </div>

          {/* Side Faces */}
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="absolute inset-0"
              style={{
                background: `rgba(${99 + index * 30}, ${102 + index * 20}, 241, 0.3)`,
                transform: `
                rotateY(${90 * (index + 1)}deg) 
                translateZ(${size / 2}px)
              `,
                width: "2px",
                left: "50%",
                marginLeft: "-1px",
                boxShadow: `0 0 10px rgba(${99 + index * 30}, ${102 + index * 20}, 241, 0.5)`,
              }}
            />
          ))}
        </div>

        {/* Floating Particles - Only render when hovered for performance */}
        {interactive && isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full will-change-transform"
                style={{
                  background: `rgba(${99 + i * 20}, ${102 + i * 15}, 241, 0.8)`,
                  left: `${20 + i * 10}%`,
                  top: `${15 + i * 8}%`,
                  animationName: `particle-orbit-${i % 3}`,
                  animationDuration: `${2 + i * 0.3}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 0.2}s`,
                  filter: "blur(0.5px)",
                }}
              />
            ))}
          </div>
        )}

        <style jsx>{`
        @keyframes logo-auto-rotate {
          from { transform: rotateY(0deg) rotateX(0deg); }
          to { transform: rotateY(360deg) rotateX(360deg); }
        }

        @keyframes particle-orbit-0 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateX(15px) translateY(-10px) scale(1.3); opacity: 1; }
        }

        @keyframes particle-orbit-1 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateX(-12px) translateY(8px) scale(1.2); opacity: 1; }
        }

        @keyframes particle-orbit-2 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateX(10px) translateY(12px) scale(1.4); opacity: 1; }
        }
      `}</style>
      </div>
    )
  },
)

Floating3DLogo.displayName = "Floating3DLogo"

export default Floating3DLogo
