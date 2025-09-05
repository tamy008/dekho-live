"use client"

import { useEffect, useState } from "react"

export default function CSSBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, 
              rgba(99, 102, 241, 0.15) 0%, 
              transparent 50%
            ),
            radial-gradient(circle at ${30 - mousePosition.x * 15}% ${70 - mousePosition.y * 15}%, 
              rgba(236, 72, 153, 0.12) 0%, 
              transparent 50%
            ),
            linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)
          `,
          animation: "backgroundPulse 8s ease-in-out infinite",
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 12}%`,
            background: `linear-gradient(45deg, 
              rgba(99, 102, 241, ${0.3 - i * 0.03}), 
              rgba(236, 72, 153, ${0.2 - i * 0.02})
            )`,
            borderRadius: i % 2 === 0 ? "50%" : "20%",
            transform: `
              translate(${mousePosition.x * (10 + i * 2)}px, ${mousePosition.y * (8 + i)}px)
              rotate(${i * 60}deg)
            `,
            animation: `float-${i % 3} ${6 + i}s ease-in-out infinite`,
            filter: "blur(1px)",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes backgroundPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
        
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
      `}</style>
    </div>
  )
}
