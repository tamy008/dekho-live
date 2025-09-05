"use client"

import { useEffect, useRef } from "react"

export default function ParticleField({ particleCount = 50 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create particles using CSS animations only
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particle-float ${8 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 8}s;
        pointer-events: none;
      `

      container.appendChild(particle)
    }

    // Add CSS animation styles
    const style = document.createElement("style")
    style.textContent = `
      @keyframes particle-float {
        0%, 100% { 
          transform: translateY(0px) translateX(0px) scale(1);
          opacity: 0.3;
        }
        25% { 
          transform: translateY(-20px) translateX(10px) scale(1.2);
          opacity: 0.8;
        }
        50% { 
          transform: translateY(-40px) translateX(-5px) scale(0.8);
          opacity: 1;
        }
        75% { 
          transform: translateY(-20px) translateX(-10px) scale(1.1);
          opacity: 0.6;
        }
      }
      
      .particle-field {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
      }
    `
    document.head.appendChild(style)

    return () => {
      container.innerHTML = ""
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [particleCount])

  return <div ref={containerRef} className="particle-field" />
}
