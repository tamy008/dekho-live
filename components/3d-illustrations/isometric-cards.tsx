"use client"

import { useEffect, useRef, useState } from "react"

interface IsometricCardsProps {
  cards?: Array<{
    title: string
    icon: string
    description: string
    color: string
  }>
  autoRotate?: boolean
  staggerDelay?: number
}

export default function IsometricCards({
  cards = [
    { title: "Live Streaming", icon: "🎬", description: "4K Quality", color: "#6366f1" },
    { title: "Social Commerce", icon: "🛍️", description: "Interactive Shopping", color: "#ec4899" },
    { title: "Creator Tools", icon: "✨", description: "Professional Suite", color: "#06b6d4" },
  ],
  autoRotate = true,
  staggerDelay = 200,
}: IsometricCardsProps) {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Staggered animation entrance
    cards.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => {
          const newVisible = [...prev]
          newVisible[index] = true
          return newVisible
        })
      }, index * staggerDelay)
    })
  }, [cards, staggerDelay])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative grid grid-cols-1 md:grid-cols-3 gap-8 p-8"
      style={{ perspective: "1200px" }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={`relative transition-all duration-1000 ease-out ${
            visibleCards[index] ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: visibleCards[index]
              ? `
                  translateY(0) 
                  rotateX(${-5 + mousePosition.y * 10}deg) 
                  rotateY(${-5 + mousePosition.x * 10}deg)
                  translateZ(0)
                `
              : "translateY(100px) rotateX(45deg) translateZ(-200px)",
            transformStyle: "preserve-3d",
            transitionProperty: "all",
            transitionDuration: "1000ms",
            transitionTimingFunction: "ease-out",
            transitionDelay: `${index * 100}ms`,
          }}
        >
          {/* Main Card Body */}
          <div
            className="relative w-full h-80 rounded-3xl overflow-hidden cursor-pointer group"
            style={{
              background: `
                linear-gradient(135deg, 
                  ${card.color}20 0%, 
                  ${card.color}10 50%, 
                  transparent 100%
                )
              `,
              border: `2px solid ${card.color}40`,
              boxShadow: `
                0 20px 40px rgba(0, 0, 0, 0.3),
                0 0 30px ${card.color}30,
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Card Front Face */}
            <div
              className="absolute inset-0 p-8 flex flex-col justify-between"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.1) 0%, 
                    rgba(255, 255, 255, 0.05) 100%
                  )
                `,
                backdropFilter: "blur(20px)",
                transform: "translateZ(20px)",
              }}
            >
              {/* Icon Section */}
              <div className="relative">
                <div
                  className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
                  style={{
                    filter: `
                      drop-shadow(0 0 20px ${card.color}) 
                      drop-shadow(0 0 40px ${card.color}80)
                    `,
                    transform: "translateZ(30px)",
                  }}
                >
                  {card.icon}
                </div>

                {/* Floating Icon Glow */}
                <div
                  className="absolute top-0 left-0 text-6xl opacity-50 group-hover:opacity-80 transition-opacity"
                  style={{
                    color: card.color,
                    filter: "blur(10px)",
                    transform: "translateZ(10px)",
                  }}
                >
                  {card.icon}
                </div>
              </div>

              {/* Content Section */}
              <div style={{ transform: "translateZ(15px)" }}>
                <h3
                  className="text-2xl font-bold mb-3 text-white group-hover:text-shadow-glow transition-all"
                  style={{
                    textShadow: `0 0 20px ${card.color}80`,
                  }}
                >
                  {card.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">{card.description}</p>
              </div>
            </div>

            {/* Card Side Faces for 3D Effect */}
            <div
              className="absolute top-0 right-0 w-6 h-full"
              style={{
                background: `linear-gradient(180deg, ${card.color}40, ${card.color}20)`,
                transform: "rotateY(90deg) translateZ(20px)",
                transformOrigin: "left center",
              }}
            />

            <div
              className="absolute bottom-0 left-0 w-full h-6"
              style={{
                background: `linear-gradient(90deg, ${card.color}30, ${card.color}15)`,
                transform: "rotateX(-90deg) translateZ(20px)",
                transformOrigin: "center top",
              }}
            />

            {/* Interactive Hover Effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {/* Scanning Line Effect */}
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                  animationName: "scan-line",
                  animationDuration: "2s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                }}
              />

              {/* Particle Effects */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: card.color,
                    left: `${20 + i * 12}%`,
                    top: `${30 + i * 8}%`,
                    animationName: `card-particle-${i % 3}`,
                    animationDuration: `${2 + i * 0.3}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationDelay: `${i * 0.2}s`,
                    filter: "blur(1px)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Card Shadow/Reflection */}
          <div
            className="absolute inset-0 rounded-3xl opacity-30"
            style={{
              background: `radial-gradient(ellipse at center bottom, ${card.color}40, transparent)`,
              transform: "translateY(100%) rotateX(90deg) translateZ(-50px)",
              filter: "blur(20px)",
            }}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        @keyframes card-particle-0 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
        }

        @keyframes card-particle-1 {
          0%, 100% { transform: translateX(0) scale(1); opacity: 0.7; }
          50% { transform: translateX(15px) scale(1.3); opacity: 1; }
        }

        @keyframes card-particle-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-10px, -15px) scale(1.4); opacity: 1; }
        }

        .text-shadow-glow {
          text-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
        }
      `}</style>
    </div>
  )
}
