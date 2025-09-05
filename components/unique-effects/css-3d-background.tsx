"use client"

export default function CSS3DBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 via-transparent to-emerald/5" />

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-saffron/20 to-transparent rounded-full blur-xl animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-emerald/20 to-transparent rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-gradient-to-r from-indian-red/10 to-transparent rounded-full blur-2xl animate-pulse delay-2000" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 153, 51, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 153, 51, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}
