"use client"

import { useEffect, useRef, useState } from "react"

export default function FloatingUIElements({ children }) {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              background: `
                radial-gradient(circle,
                  rgba(99, 102, 241, ${0.3 - i * 0.05}) 0%,
                  rgba(236, 72, 153, ${0.2 - i * 0.03}) 50%,
                  transparent 100%
                )
              `,
              transform: `
                translate3d(
                  ${mousePosition.x * (10 + i * 5)}px,
                  ${mousePosition.y * (8 + i * 3) + Math.sin(scrollY * 0.01 + i) * 20}px,
                  ${i * 10}px
                )
                scale(${1 + Math.sin(Date.now() * 0.001 + i) * 0.1})
              `,
              filter: "blur(1px)",
              animation: `float-${i} ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Floating Geometric Shapes */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute"
            style={{
              width: "40px",
              height: "40px",
              left: `${70 + i * 8}%`,
              top: `${30 + i * 15}%`,
              background: `
                linear-gradient(45deg,
                  rgba(6, 182, 212, 0.4),
                  rgba(139, 92, 246, 0.3)
                )
              `,
              clipPath:
                i % 2 === 0
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              transform: `
                translate3d(
                  ${-mousePosition.x * (15 + i * 3)}px,
                  ${-mousePosition.y * (12 + i * 2) + Math.cos(scrollY * 0.008 + i) * 15}px,
                  ${i * 5}px
                )
                rotate(${scrollY * 0.1 + i * 45}deg)
              `,
              animation: `rotate-float-${i} ${6 + i}s linear infinite`,
            }}
          />
        ))}

        {/* Floating Lines */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute"
            style={{
              width: `${100 + i * 50}px`,
              height: "2px",
              left: `${5 + i * 20}%`,
              top: `${60 + i * 10}%`,
              background: `
                linear-gradient(90deg,
                  transparent 0%,
                  rgba(99, 102, 241, 0.6) 50%,
                  transparent 100%
                )
              `,
              transform: `
                translate3d(
                  ${mousePosition.x * (20 - i * 5)}px,
                  ${mousePosition.y * (10 - i * 2) + Math.sin(scrollY * 0.005 + i) * 10}px,
                  0
                )
                rotate(${i * 30}deg)
              `,
              animation: `pulse-line ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${99 + i * 10}, ${102 + i * 8}, 241, ${0.8 - i * 0.05})`,
              transform: `
                translate3d(
                  ${mousePosition.x * (5 + Math.random() * 10)}px,
                  ${mousePosition.y * (3 + Math.random() * 8) + Math.sin(scrollY * 0.003 + i) * 30}px,
                  0
                )
              `,
              animation: `twinkle-${i % 4} ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        ${[...Array(6)]
          .map(
            (_, i) => `
          @keyframes float-${i} {
            0%, 100% { 
              transform: translate3d(
                ${mousePosition.x * (10 + i * 5)}px,
                ${mousePosition.y * (8 + i * 3)}px,
                ${i * 10}px
              ) scale(1);
            }
            50% { 
              transform: translate3d(
                ${mousePosition.x * (10 + i * 5) + 20}px,
                ${mousePosition.y * (8 + i * 3) - 30}px,
                ${i * 10 + 20}px
              ) scale(1.1);
            }
          }
        `,
          )
          .join("")}

        ${[...Array(4)]
          .map(
            (_, i) => `
          @keyframes rotate-float-${i} {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `,
          )
          .join("")}

        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.2); }
        }

        @keyframes twinkle-0 {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes twinkle-1 {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }

        @keyframes twinkle-2 {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.8); }
        }

        @keyframes twinkle-3 {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.4); }
        }
      `}</style>
    </div>
  )
}
