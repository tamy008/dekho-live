"use client"

import { useEffect, useRef, useState } from "react"

export default function HolographicCards({ cards = [] }) {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const defaultCards = [
    {
      title: "Live Streaming",
      icon: "🎬",
      description: "Broadcast in stunning 4K quality",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Social Commerce",
      icon: "🛍️",
      description: "Interactive shopping experiences",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Creator Tools",
      icon: "✨",
      description: "Professional creation suite",
      color: "from-green-500 to-teal-500",
    },
  ]

  const cardsToRender = cards.length > 0 ? cards : defaultCards

  return (
    <div ref={containerRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      {cardsToRender.map((card, index) => (
        <div
          key={index}
          className="holographic-card group relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.05) 100%
              )
            `,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const rotateX = (mousePosition.y - 50) * 0.1
            const rotateY = (mousePosition.x - 50) * 0.1

            e.currentTarget.style.transform = `
              perspective(1000px) 
              rotateX(${-rotateX}deg) 
              rotateY(${rotateY}deg) 
              translateZ(20px)
            `
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
          }}
        >
          {/* Holographic Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `
                linear-gradient(
                  ${mousePosition.x * 3.6}deg,
                  rgba(255, 0, 150, 0.1) 0%,
                  rgba(0, 255, 255, 0.1) 25%,
                  rgba(255, 255, 0, 0.1) 50%,
                  rgba(255, 0, 255, 0.1) 75%,
                  rgba(0, 255, 150, 0.1) 100%
                )
              `,
              filter: "blur(1px)",
            }}
          />

          {/* Iridescent Border */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `
                conic-gradient(
                  from ${mousePosition.x * 3.6}deg,
                  #ff0080,
                  #00ffff,
                  #ffff00,
                  #ff00ff,
                  #00ff80,
                  #ff0080
                )
              `,
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {card.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{card.description}</p>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animation: `float-particle-${i} ${3 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes float-particle-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-15px) translateX(-8px); opacity: 1; }
        }
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-25px) translateX(5px); opacity: 0.8; }
        }
        @keyframes float-particle-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-18px) translateX(-12px); opacity: 1; }
        }
        @keyframes float-particle-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-22px) translateX(8px); opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}
