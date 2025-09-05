"use client"

import { useEffect, useRef, useState } from "react"

interface HolographicSphereProps {
  size?: number
  segments?: number
  autoRotate?: boolean
  interactive?: boolean
  glowIntensity?: number
}

export default function HolographicSphere({
  size = 300,
  segments = 20,
  autoRotate = true,
  interactive = true,
  glowIntensity = 1,
}: HolographicSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.3 })

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
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      setMousePosition({
        x: (e.clientX - centerX) / rect.width,
        y: (e.clientY - centerY) / rect.height,
      })
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [interactive])

  useEffect(() => {
    if (!autoRotate || !isVisible) return

    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x + 0.5,
        y: prev.y + 1,
        z: prev.z + 0.3,
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [autoRotate, isVisible])

  const generateSphereSegments = () => {
    const segments_array = []

    for (let i = 0; i < segments; i++) {
      const latAngle = (i / segments) * Math.PI
      const radius = Math.sin(latAngle) * (size / 2)
      const y = Math.cos(latAngle) * (size / 2)

      segments_array.push({
        radius,
        y,
        opacity: Math.sin(latAngle) * 0.8 + 0.2,
        delay: i * 50,
      })
    }

    return segments_array
  }

  const sphereSegments = generateSphereSegments()

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
        perspective: "1000px",
      }}
    >
      {/* Main Sphere Container */}
      <div
        className={`relative transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `
            rotateX(${rotation.x + (interactive ? mousePosition.y * 30 : 0)}deg)
            rotateY(${rotation.y + (interactive ? mousePosition.x * 30 : 0)}deg)
            rotateZ(${rotation.z}deg)
          `,
        }}
      >
        {/* Sphere Wireframe Segments */}
        {sphereSegments.map((segment, index) => (
          <div
            key={`lat-${index}`}
            className="absolute border-2 rounded-full"
            style={{
              width: segment.radius * 2,
              height: segment.radius * 2,
              left: "50%",
              top: "50%",
              marginLeft: -segment.radius,
              marginTop: -segment.radius,
              borderColor: `rgba(99, 102, 241, ${segment.opacity * glowIntensity})`,
              transform: `translateY(${segment.y}px) translateZ(0)`,
              boxShadow: `
                0 0 ${10 * glowIntensity}px rgba(99, 102, 241, ${segment.opacity * 0.6}),
                inset 0 0 ${5 * glowIntensity}px rgba(99, 102, 241, ${segment.opacity * 0.3})
              `,
              animationName: "sphere-pulse",
              animationDuration: `${3 + index * 0.1}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${segment.delay}ms`,
            }}
          />
        ))}

        {/* Vertical Meridian Lines */}
        {[...Array(8)].map((_, index) => (
          <div
            key={`meridian-${index}`}
            className="absolute"
            style={{
              width: size,
              height: size,
              left: "50%",
              top: "50%",
              marginLeft: -size / 2,
              marginTop: -size / 2,
              border: "1px solid rgba(236, 72, 153, 0.4)",
              borderRadius: "50%",
              transform: `rotateY(${index * 22.5}deg) rotateX(90deg)`,
              boxShadow: `0 0 ${15 * glowIntensity}px rgba(236, 72, 153, 0.3)`,
              animationName: "meridian-glow",
              animationDuration: `${4 + index * 0.2}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${index * 100}ms`,
            }}
          />
        ))}

        {/* Central Core */}
        <div
          className="absolute rounded-full"
          style={{
            width: size * 0.3,
            height: size * 0.3,
            left: "50%",
            top: "50%",
            marginLeft: -(size * 0.15),
            marginTop: -(size * 0.15),
            background: `
              radial-gradient(circle,
                rgba(6, 182, 212, 0.8) 0%,
                rgba(99, 102, 241, 0.6) 50%,
                rgba(236, 72, 153, 0.4) 100%
              )
            `,
            boxShadow: `
              0 0 ${30 * glowIntensity}px rgba(6, 182, 212, 0.8),
              0 0 ${60 * glowIntensity}px rgba(99, 102, 241, 0.6),
              inset 0 0 ${20 * glowIntensity}px rgba(255, 255, 255, 0.3)
            `,
            animationName: "core-pulse",
            animationDuration: "2s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            transform: "translateZ(50px)",
          }}
        />

        {/* Orbiting Particles */}
        {interactive &&
          [...Array(12)].map((_, index) => (
            <div
              key={`particle-${index}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: `rgba(${99 + index * 10}, ${102 + index * 8}, 241, 0.9)`,
                left: "50%",
                top: "50%",
                marginLeft: "-6px",
                marginTop: "-6px",
                transform: `
                rotateY(${index * 30}deg) 
                translateX(${size * 0.6}px) 
                rotateY(${-index * 30}deg)
                translateZ(${Math.sin(index) * 30}px)
              `,
                animationName: `orbit-${index % 3}`,
                animationDuration: `${3 + index * 0.2}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDelay: `${index * 200}ms`,
                filter: "blur(0.5px)",
                boxShadow: `0 0 10px rgba(${99 + index * 10}, ${102 + index * 8}, 241, 0.8)`,
              }}
            />
          ))}

        {/* Data Streams */}
        {[...Array(6)].map((_, index) => (
          <div
            key={`stream-${index}`}
            className="absolute"
            style={{
              width: "2px",
              height: size * 0.8,
              left: "50%",
              top: "50%",
              marginLeft: "-1px",
              marginTop: -(size * 0.4),
              background: `
                linear-gradient(180deg,
                  transparent 0%,
                  rgba(6, 182, 212, 0.8) 20%,
                  rgba(99, 102, 241, 0.6) 50%,
                  rgba(236, 72, 153, 0.8) 80%,
                  transparent 100%
                )
              `,
              transform: `
                rotateY(${index * 60}deg) 
                rotateX(${15 + index * 5}deg)
                translateZ(${size * 0.3}px)
              `,
              animationName: "data-stream",
              animationDuration: `${2 + index * 0.3}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${index * 300}ms`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Holographic Base */}
      <div
        className="absolute bottom-0"
        style={{
          width: size * 1.2,
          height: size * 0.1,
          background: `
            radial-gradient(ellipse,
              rgba(99, 102, 241, 0.3) 0%,
              rgba(236, 72, 153, 0.2) 50%,
              transparent 100%
            )
          `,
          filter: "blur(10px)",
          animationName: "base-glow",
          animationDuration: "3s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      <style jsx>{`
        @keyframes sphere-pulse {
          0%, 100% { 
            opacity: 0.6; 
            transform: translateY(var(--y)) scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: translateY(var(--y)) scale(1.05); 
          }
        }

        @keyframes meridian-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes core-pulse {
          0%, 100% { 
            transform: translateZ(50px) scale(1); 
            filter: brightness(1); 
          }
          50% { 
            transform: translateZ(50px) scale(1.1); 
            filter: brightness(1.3); 
          }
        }

        @keyframes orbit-0 {
          from { transform: rotateY(0deg) translateX(${size * 0.6}px) rotateY(0deg); }
          to { transform: rotateY(360deg) translateX(${size * 0.6}px) rotateY(-360deg); }
        }

        @keyframes orbit-1 {
          from { transform: rotateY(0deg) translateX(${size * 0.7}px) rotateY(0deg); }
          to { transform: rotateY(-360deg) translateX(${size * 0.7}px) rotateY(360deg); }
        }

        @keyframes orbit-2 {
          from { transform: rotateY(0deg) translateX(${size * 0.5}px) rotateY(0deg); }
          to { transform: rotateY(360deg) translateX(${size * 0.5}px) rotateY(-360deg); }
        }

        @keyframes data-stream {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }

        @keyframes base-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
