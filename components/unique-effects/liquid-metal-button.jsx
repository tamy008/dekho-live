"use client"

import { useState, useRef } from "react"

export default function LiquidMetalButton({ children, onClick, className = "", variant = "primary" }) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState([])
  const buttonRef = useRef(null)

  const variants = {
    primary: {
      base: "from-purple-600 via-pink-600 to-blue-600",
      hover: "from-purple-500 via-pink-500 to-blue-500",
      glow: "rgba(147, 51, 234, 0.5)",
    },
    secondary: {
      base: "from-blue-600 via-cyan-600 to-teal-600",
      hover: "from-blue-500 via-cyan-500 to-teal-500",
      glow: "rgba(59, 130, 246, 0.5)",
    },
  }

  const currentVariant = variants[variant]

  const handleClick = (e) => {
    if (onClick) onClick(e)

    // Create ripple effect
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)
  }

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden px-8 py-4 rounded-full font-bold text-white
        transform transition-all duration-300 ease-out
        ${isHovered ? "scale-105" : "scale-100"}
        ${className}
      `}
      style={{
        background: `linear-gradient(135deg, ${isHovered ? currentVariant.hover : currentVariant.base})`,
        boxShadow: isHovered
          ? `0 20px 40px ${currentVariant.glow}, 0 0 60px ${currentVariant.glow}`
          : `0 10px 20px ${currentVariant.glow}`,
        filter: isHovered ? "brightness(1.1)" : "brightness(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Liquid Metal Overlay */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
            linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)
          `,
          animation: isHovered ? "liquid-flow 2s ease-in-out infinite" : "none",
        }}
      />

      {/* Morphing Border */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.1)
          )`,
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: isHovered ? "border-rotate 3s linear infinite" : "none",
        }}
      />

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)",
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      ))}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      <style jsx>{`
        @keyframes liquid-flow {
          0%, 100% { 
            transform: translateX(-100%) rotate(0deg); 
            opacity: 0;
          }
          50% { 
            transform: translateX(100%) rotate(180deg); 
            opacity: 1;
          }
        }

        @keyframes border-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ripple-expand {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  )
}
