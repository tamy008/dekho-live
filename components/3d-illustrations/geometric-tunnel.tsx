"use client"

import { useEffect, useRef, useState } from "react"

interface GeometricTunnelProps {
  segments?: number
  speed?: number
  colors?: string[]
  interactive?: boolean
}

export default function GeometricTunnel({
  segments = 15,
  speed = 1,
  colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#06b6d4"],
  interactive = true,
}: GeometricTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.2 })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      })
    }

    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      setScrollProgress(progress)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [interactive])

  const generateTunnelSegments = () => {
    const segments_array = []

    for (let i = 0; i < segments; i++) {
      const progress = i / segments
      const scale = 0.1 + progress * 0.9
      const zPosition = i * 100 - 500
      const rotation = i * 15
      const opacity = Math.max(0.1, 1 - progress * 0.7)
      const colorIndex = i % colors.length

      segments_array.push({
        scale,
        zPosition,
        rotation,
        opacity,
        color: colors[colorIndex],
        delay: i * 100,
      })
    }

    return segments_array
  }

  const tunnelSegments = generateTunnelSegments()

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Tunnel Container */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          transformStyle: "preserve-3d",
          transform: `
            rotateX(${interactive ? mousePosition.y * 20 : 0}deg)
            rotateY(${interactive ? mousePosition.x * 20 : 0}deg)
            translateZ(${scrollProgress * 300}px)
          `,
        }}
      >
        {/* Tunnel Segments */}
        {tunnelSegments.map((segment, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2"
            style={{
              width: "400px",
              height: "400px",
              marginLeft: "-200px",
              marginTop: "-200px",
              transform: `
                translateZ(${segment.zPosition}px)
                scale(${segment.scale})
                rotateZ(${segment.rotation + (isVisible ? scrollProgress * 360 : 0)}deg)
              `,
              opacity: segment.opacity,
              ...(isVisible
                ? {
                    animationName: "tunnel-flow",
                    animationDuration: `${10 / speed}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationDelay: `${segment.delay}ms`,
                  }
                : {}),
            }}
          >
            {/* Hexagonal Segment */}
            <div
              className="relative w-full h-full"
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                background: `
                  radial-gradient(circle,
                    ${segment.color}60 0%,
                    ${segment.color}30 50%,
                    transparent 100%
                  )
                `,
                border: `1px solid ${segment.color}60`,
                animationName: "inner-rotate",
                animationDuration: `${5 / speed}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDirection: "reverse",
              }}
            >
              {/* Inner Geometric Pattern */}
              <div
                className="absolute inset-8"
                style={{
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  background: `
                    radial-gradient(circle,
                      ${segment.color}60 0%,
                      ${segment.color}30 50%,
                      transparent 100%
                    )
                  `,
                  border: `1px solid ${segment.color}60`,
                }}
              />

              {/* Corner Accents */}
              {[0, 1, 2, 3, 4, 5].map((corner) => (
                <div
                  key={corner}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    background: segment.color,
                    left: `${50 + 40 * Math.cos((corner * 60 * Math.PI) / 180)}%`,
                    top: `${50 + 40 * Math.sin((corner * 60 * Math.PI) / 180)}%`,
                    marginLeft: "-8px",
                    marginTop: "-8px",
                    boxShadow: `0 0 15px ${segment.color}`,
                    animationName: "corner-pulse",
                    animationDuration: `${2 + corner * 0.2}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationDelay: `${corner * 200}ms`,
                  }}
                />
              ))}
            </div>

            {/* Connecting Lines to Next Segment */}
            {index < segments - 1 && (
              <div
                className="absolute left-1/2 top-1/2 w-1 h-24"
                style={{
                  background: `linear-gradient(180deg, ${segment.color}80, transparent)`,
                  marginLeft: "-2px",
                  marginTop: "-12px",
                  transform: "translateZ(50px)",
                  boxShadow: `0 0 10px ${segment.color}60`,
                }}
              />
            )}
          </div>
        ))}

        {/* Central Focal Point */}
        <div
          className="absolute left-1/2 top-1/2 w-20 h-20 rounded-full"
          style={{
            marginLeft: "-40px",
            marginTop: "-40px",
            background: `
              radial-gradient(circle,
                rgba(255, 255, 255, 0.9) 0%,
                rgba(99, 102, 241, 0.8) 30%,
                rgba(236, 72, 153, 0.6) 60%,
                transparent 100%
              )
            `,
            transform: "translateZ(600px)",
            boxShadow: `
              0 0 50px rgba(255, 255, 255, 0.8),
              0 0 100px rgba(99, 102, 241, 0.6)
            `,
            animationName: "focal-pulse",
            animationDuration: "3s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />

        {/* Particle Stream */}
        {interactive &&
          [...Array(20)].map((_, index) => (
            <div
              key={`particle-${index}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: colors[index % colors.length],
                left: `${45 + Math.random() * 10}%`,
                top: `${45 + Math.random() * 10}%`,
                transform: `translateZ(${-200 - index * 50}px)`,
                animationName: "particle-stream",
                animationDuration: `${3 + Math.random() * 2}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDelay: `${index * 100}ms`,
                filter: "blur(1px)",
                boxShadow: `0 0 10px ${colors[index % colors.length]}`,
              }}
            />
          ))}
      </div>

      {/* Tunnel Entrance Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at center,
              transparent 20%,
              rgba(0, 0, 0, 0.3) 40%,
              rgba(0, 0, 0, 0.7) 80%,
              rgba(0, 0, 0, 0.9) 100%
            )
          `,
        }}
      />

      <style jsx>{`
        @keyframes tunnel-flow {
          from { transform: translateZ(-500px) scale(0.1) rotateZ(0deg); }
          to { transform: translateZ(600px) scale(2) rotateZ(360deg); }
        }

        @keyframes inner-rotate {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(-360deg); }
        }

        @keyframes corner-pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1; 
          }
        }

        @keyframes focal-pulse {
          0%, 100% { 
            transform: translateZ(600px) scale(1); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateZ(600px) scale(1.2); 
            opacity: 1; 
          }
        }

        @keyframes particle-stream {
          from { 
            transform: translateZ(-500px) scale(0); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
          }
          90% { 
            opacity: 1; 
          }
          to { 
            transform: translateZ(600px) scale(2); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  )
}
