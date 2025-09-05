"use client"

import { useEffect, useRef, useState } from "react"

export default function CSS3DBackground({ children }) {
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* CSS-only 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute"
            style={{
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
              background: `
                linear-gradient(45deg,
                  rgba(99, 102, 241, ${0.6 - i * 0.05}),
                  rgba(236, 72, 153, ${0.4 - i * 0.03}),
                  rgba(6, 182, 212, ${0.3 - i * 0.02})
                )
              `,
              clipPath:
                i % 3 === 0
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : i % 3 === 1
                    ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                    : "circle(50%)",
              transform: `
                translate3d(
                  ${mousePosition.x * (15 + i * 3)}px,
                  ${mousePosition.y * (12 + i * 2) + Math.cos(scrollY * 0.008 + i) * 20}px,
                  ${i * 10}px
                )
                rotate(${scrollY * 0.1 + i * 45}deg)
              `,
              animation: `css-float-${i % 4} ${6 + i}s ease-in-out infinite`,
              filter: `blur(${i > 5 ? "2px" : "0px"})`,
              opacity: 0.8 - i * 0.08,
            }}
          />
        ))}

        {/* Animated Grid Lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute"
            style={{
              width: i % 2 === 0 ? `${150 + i * 30}px` : "2px",
              height: i % 2 === 0 ? "2px" : `${150 + i * 30}px`,
              left: `${5 + i * 15}%`,
              top: `${10 + i * 12}%`,
              background: `
                linear-gradient(${i % 2 === 0 ? "90deg" : "0deg"},
                  transparent 0%,
                  rgba(99, 102, 241, 0.6) 30%,
                  rgba(236, 72, 153, 0.8) 50%,
                  rgba(6, 182, 212, 0.6) 70%,
                  transparent 100%
                )
              `,
              transform: `
                translate3d(
                  ${mousePosition.x * (10 - i * 2)}px,
                  ${mousePosition.y * (8 - i) + Math.sin(scrollY * 0.005 + i) * 15}px,
                  0
                )
                rotate(${i * 30}deg)
              `,
              animation: `pulse-line ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Floating Orbs with CSS 3D */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${15 + i * 18}%`,
              top: `${25 + i * 12}%`,
              background: `
                radial-gradient(circle at 30% 30%,
                  rgba(99, 102, 241, ${0.8 - i * 0.1}) 0%,
                  rgba(236, 72, 153, ${0.6 - i * 0.08}) 40%,
                  rgba(6, 182, 212, ${0.4 - i * 0.06}) 70%,
                  transparent 100%
                )
              `,
              transform: `
                translate3d(
                  ${mousePosition.x * (12 + i * 4)}px,
                  ${mousePosition.y * (10 + i * 2) + Math.sin(scrollY * 0.01 + i) * 25}px,
                  ${i * 15}px
                )
                scale(${1 + Math.sin(Date.now() * 0.001 + i) * 0.1})
              `,
              filter: `blur(${i > 2 ? "3px" : "1px"})`,
              animation: `orb-float-${i % 3} ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              boxShadow: `
                0 0 ${20 + i * 10}px rgba(99, 102, 241, ${0.4 - i * 0.05}),
                inset 0 0 ${10 + i * 5}px rgba(255, 255, 255, 0.1)
              `,
            }}
          />
        ))}

        {/* Particle System with CSS */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${99 + i * 8}, ${102 + i * 6}, 241, ${0.9 - i * 0.04})`,
              transform: `
                translate3d(
                  ${mousePosition.x * (3 + Math.random() * 8)}px,
                  ${mousePosition.y * (2 + Math.random() * 6) + Math.sin(scrollY * 0.003 + i) * 40}px,
                  0
                )
              `,
              animation: `particle-twinkle-${i % 5} ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              filter: `blur(${Math.random() > 0.7 ? "1px" : "0px"})`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        ${[...Array(4)]
          .map(
            (_, i) => `
          @keyframes css-float-${i} {
            0%, 100% { 
              transform: translateY(0px) rotateZ(0deg) scale(1);
            }
            25% { 
              transform: translateY(-${20 + i * 5}px) rotateZ(${90 + i * 30}deg) scale(1.1);
            }
            50% { 
              transform: translateY(-${10 + i * 3}px) rotateZ(${180 + i * 30}deg) scale(0.9);
            }
            75% { 
              transform: translateY(-${15 + i * 4}px) rotateZ(${270 + i * 30}deg) scale(1.05);
            }
          }
        `,
          )
          .join("")}

        ${[...Array(3)]
          .map(
            (_, i) => `
          @keyframes orb-float-${i} {
            0%, 100% { 
              transform: translateY(0px) scale(1) rotateX(0deg);
            }
            33% { 
              transform: translateY(-${25 + i * 8}px) scale(1.1) rotateX(${120 + i * 60}deg);
            }
            66% { 
              transform: translateY(-${35 + i * 10}px) scale(0.95) rotateX(${240 + i * 60}deg);
            }
          }
        `,
          )
          .join("")}

        @keyframes pulse-line {
          0%, 100% { 
            opacity: 0.3; 
            transform: scaleX(1) scaleY(1); 
          }
          50% { 
            opacity: 1; 
            transform: scaleX(1.2) scaleY(1.1); 
          }
        }

        ${[...Array(5)]
          .map(
            (_, i) => `
          @keyframes particle-twinkle-${i} {
            0%, 100% { 
              opacity: ${0.2 + i * 0.1}; 
              transform: scale(1); 
            }
            50% { 
              opacity: ${0.8 + i * 0.05}; 
              transform: scale(${1.5 + i * 0.3}); 
            }
          }
        `,
          )
          .join("")}

        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 768px) {
          [style*="transform"] {
            transform: none !important;
          }
          
          [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
