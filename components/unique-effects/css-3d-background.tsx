"use client"

export default function CSS3DBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Very subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-pink/3 rounded-full blur-3xl animate-subtle-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-cyan/3 rounded-full blur-2xl animate-subtle-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-3/4 left-1/3 w-48 h-48 bg-neon-green/2 rounded-full blur-xl animate-subtle-float"
        style={{ animationDelay: "4s" }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  )
}
