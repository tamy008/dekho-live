"use client"
import { useState, useEffect, Suspense, lazy, memo, useCallback, useMemo, startTransition } from "react"
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"
import { usePerformanceMonitor } from "../hooks/usePerformanceMonitor"

// Preload critical 3D components with higher priority
const Floating3DLogo = lazy(() => import("../components/3d-illustrations/floating-3d-logo"))
const IsometricCards = lazy(() => import("../components/3d-illustrations/isometric-cards"))
const HolographicSphere = lazy(() => import("../components/3d-illustrations/holographic-sphere"))
const GeometricTunnel = lazy(() => import("../components/3d-illustrations/geometric-tunnel"))

// Optimized 3D Text Component with reduced calculations
const Enhanced3DText = memo(({ text, className = "", effects3DEnabled = false, isMobile = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Throttled mouse tracking with RAF
  useEffect(() => {
    if (!effects3DEnabled || isMobile) return

    let rafId = null
    let lastTime = 0

    const handleMouseMove = (e) => {
      const now = performance.now()
      if (now - lastTime < 16) return // Limit to ~60fps

      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const rect = document.querySelector(".hero-text-container")?.getBoundingClientRect()
        if (rect) {
          setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
          })
        }
        lastTime = now
      })
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [effects3DEnabled, isMobile])

  // Memoized transform styles
  const transformStyle = useMemo(() => {
    if (!effects3DEnabled || isMobile) return { transform: "none" }

    return {
      transform: `
        perspective(1200px) 
        rotateX(${mousePosition.y * 1.5 - 0.75}deg) 
        rotateY(${mousePosition.x * 1.5 - 0.75}deg)
        translateZ(${isHovered ? 15 : 0}px)
      `,
      transformStyle: "preserve-3d",
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }
  }, [effects3DEnabled, isMobile, mousePosition.x, mousePosition.y, isHovered])

  return (
    <div
      className={`hero-text-container relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10" style={transformStyle}>
        {text}
      </div>

      {/* Reduced particle count for better performance */}
      {effects3DEnabled && !isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full opacity-50 will-change-transform"
              style={{
                background: `rgba(${99 + i * 20}, ${102 + i * 15}, 241, 0.7)`,
                left: `${15 + ((i * 12) % 70)}%`,
                top: `${20 + ((i * 15) % 60)}%`,
                transform: `translate3d(
                  ${mousePosition.x * (15 + i * 2)}px,
                  ${mousePosition.y * (10 + i)}px,
                  ${i * 3}px
                )`,
                animation: `particle-float ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.5; 
          }
          50% { 
            transform: translateY(-10px) scale(1.1); 
            opacity: 0.8; 
          }
        }
      `}</style>
    </div>
  )
})
Enhanced3DText.displayName = "Enhanced3DText"

// Optimized Hero Section with reduced complexity
const IntegratedHeroSection = memo(({ effects3DEnabled, isMobile }) => {
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  // Optimized mouse tracking with debouncing
  useEffect(() => {
    if (!effects3DEnabled || isMobile) return

    let timeoutId = null
    const handleMouseMove = (e) => {
      if (timeoutId) clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        })
      }, 8) // Reduced frequency for better performance
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [effects3DEnabled, isMobile])

  // Memoized background style
  const backgroundStyle = useMemo(() => {
    if (!effects3DEnabled || isMobile) {
      return { background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)" }
    }

    return {
      background: `
        radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(99, 102, 241, 0.12) 0%, 
          transparent 40%
        ),
        radial-gradient(circle at ${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%, 
          rgba(236, 72, 153, 0.08) 0%, 
          transparent 40%
        ),
        linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)
      `,
    }
  }, [effects3DEnabled, isMobile, mousePosition.x, mousePosition.y])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={backgroundStyle}
    >
      {/* Simplified 3D Tunnel Background - only load when visible */}
      {effects3DEnabled && !isMobile && heroVisible && (
        <div className="absolute inset-0 opacity-20">
          <Suspense fallback={null}>
            <GeometricTunnel segments={4} speed={0.15} interactive={false} />
          </Suspense>
        </div>
      )}

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Optimized Badge */}
        <div className="inline-flex items-center gap-2 mb-8 bg-purple-500/20 border border-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">New Platform Launch</span>
        </div>

        {/* Main Hero Title */}
        <div className="mb-6">
          <Enhanced3DText
            effects3DEnabled={effects3DEnabled}
            isMobile={isMobile}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            text={
              <h1>
                <span className="block mb-4 text-white/90">The Future of</span>
                <span
                  className="block relative bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                  style={{
                    filter: effects3DEnabled && !isMobile ? "drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))" : "none",
                  }}
                >
                  Digital Experience
                </span>
              </h1>
            }
          />
        </div>

        {/* Simplified Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Immerse yourself in next-generation streaming, shopping, and content creation. Experience the web like never
          before.
        </p>

        {/* Optimized Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95">
            <span className="flex items-center gap-2">
              Start Exploring
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </button>

          <button className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-200">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
              ▶
            </div>
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  )
})
IntegratedHeroSection.displayName = "IntegratedHeroSection"

// Optimized icon components
const PlayIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <polygon points="5,3 19,12 5,21" />
  </svg>
))
PlayIcon.displayName = "PlayIcon"

const SearchIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="21 21l-4.35-4.35" />
  </svg>
))
SearchIcon.displayName = "SearchIcon"

const BellIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
))
BellIcon.displayName = "BellIcon"

// Highly optimized CSS Background Component
const CSSBackground = memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let rafId = null
    let lastTime = 0

    const handleMouseMove = (e) => {
      const now = performance.now()
      if (now - lastTime < 32) return // Limit to 30fps for background

      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        })
        lastTime = now
      })
    }

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })

    const element = document.body
    observer.observe(element)

    if (isVisible) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isVisible])

  const backgroundStyle = useMemo(
    () => ({
      background: `
      radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
        rgba(99, 102, 241, 0.08) 0%, 
        transparent 30%
      ),
      radial-gradient(circle at ${30 - mousePosition.x * 8}% ${70 - mousePosition.y * 8}%, 
        rgba(236, 72, 153, 0.06) 0%, 
        transparent 30%
      ),
      linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)
    `,
    }),
    [mousePosition.x, mousePosition.y],
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none will-change-transform">
      <div className="absolute inset-0 transition-opacity duration-500" style={backgroundStyle} />
    </div>
  )
})
CSSBackground.displayName = "CSSBackground"

// Optimized loading component
const Loading3D = memo(({ className = "" }) => (
  <div className={`animate-pulse bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg ${className}`}>
    <div className="flex items-center justify-center h-full">
      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
))
Loading3D.displayName = "Loading3D"

// Optimized navigation component with reduced re-renders
const Navigation = memo(
  ({ currentPage, setCurrentPage, isMobile, isMobileMenuOpen, setIsMobileMenuOpen, effects3DEnabled }) => {
    const navItems = useMemo(
      () => [
        { key: "home", label: "Home" },
        { key: "explore", label: "Explore" },
        { key: "create", label: "Create" },
        { key: "search", label: "Search" },
      ],
      [],
    )

    const mobileNavItems = useMemo(
      () => [
        { key: "home", label: "Home", icon: "🏠" },
        { key: "explore", label: "Explore", icon: "🔍" },
        { key: "create", label: "Create", icon: "✨" },
        { key: "search", label: "Search", icon: "📱" },
      ],
      [],
    )

    const handleNavClick = useCallback(
      (key) => {
        startTransition(() => {
          setCurrentPage(key)
          if (isMobile) {
            setIsMobileMenuOpen(false)
          }
        })
      },
      [setCurrentPage, isMobile, setIsMobileMenuOpen],
    )

    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Optimized Logo */}
            <div className="flex items-center gap-3">
              {effects3DEnabled && !isMobile ? (
                <Suspense
                  fallback={
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-lg animate-pulse" />
                  }
                >
                  <Floating3DLogo size={40} autoRotate={false} interactive={true} subtle={true} />
                </Suspense>
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-lg flex items-center justify-center text-xl font-bold">
                  🎬
                </div>
              )}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-50 to-purple-100 bg-clip-text text-transparent">
                Dekho
              </h1>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="flex items-center gap-6">
                {navItems.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleNavClick(key)}
                    className={`px-4 py-2 rounded-lg transition-all duration-150 ${
                      currentPage === key
                        ? "bg-purple-500/20 text-white border border-purple-500/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </button>
                ))}

                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-150">
                  Start Selling
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors duration-150"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? "✕" : "☰"}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobile && isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
            {mobileNavItems.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className={`flex items-center gap-4 px-8 py-4 rounded-2xl text-xl font-semibold transition-all duration-150 ${
                  currentPage === key
                    ? "bg-purple-500/20 text-white border border-purple-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-2xl">{icon}</span>
                {label}
              </button>
            ))}
            <button className="mt-4 text-xl px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold">
              Start Selling
            </button>
          </div>
        )}
      </>
    )
  },
)
Navigation.displayName = "Navigation"

// Main App Component with performance optimizations
export default function Page() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [effects3DEnabled, setEffects3DEnabled] = useState(false)

  const { isSlowDevice } = usePerformanceMonitor()

  // Optimized device detection with debouncing
  useEffect(() => {
    let timeoutId = null

    const checkDevice = () => {
      if (timeoutId) clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth <= 768
        const isLowEnd = isSlowDevice || navigator.hardwareConcurrency <= 4

        setIsMobile(mobile)

        // Enable 3D effects only on capable devices with delay
        if (!mobile && !isLowEnd) {
          setTimeout(() => setEffects3DEnabled(true), 1500)
        }
      }, 100)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice, { passive: true })
    return () => {
      window.removeEventListener("resize", checkDevice)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isSlowDevice])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  // Memoized page content renderer with startTransition
  const renderPageContent = useCallback(() => {
    const props = { effects3DEnabled, isMobile }

    switch (currentPage) {
      case "home":
        return <HomePage {...props} />
      case "explore":
        return <ExplorePage effects3DEnabled={effects3DEnabled} />
      case "create":
        return <CreatePage effects3DEnabled={effects3DEnabled} />
      case "search":
        return <SearchPage />
      default:
        return <HomePage {...props} />
    }
  }, [currentPage, effects3DEnabled, isMobile])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <CSSBackground />

      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        effects3DEnabled={effects3DEnabled}
      />

      <main className="relative z-10 pt-20">
        <Suspense fallback={<Loading3D className="min-h-screen" />}>{renderPageContent()}</Suspense>
      </main>
    </div>
  )
}

// Optimized HomePage component
const HomePage = memo(({ effects3DEnabled, isMobile }) => {
  const [featuresRef, featuresVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [sphereRef, sphereVisible] = useIntersectionObserver({ threshold: 0.1 })

  const featureCards = useMemo(
    () => [
      { title: "Live Streaming", icon: "🎬", description: "Broadcast in stunning 4K quality", color: "#6366f1" },
      { title: "Social Commerce", icon: "🛍️", description: "Interactive shopping experiences", color: "#ec4899" },
      { title: "Creator Tools", icon: "✨", description: "Professional creation suite", color: "#06b6d4" },
    ],
    [],
  )

  const statsData = useMemo(
    () => [
      { number: "10M+", label: "Active Users" },
      { number: "500K+", label: "Content Creators" },
      { number: "1B+", label: "Views Monthly" },
      { number: "99.9%", label: "Uptime" },
    ],
    [],
  )

  return (
    <div className="relative">
      <IntegratedHeroSection effects3DEnabled={effects3DEnabled} isMobile={isMobile} />

      {/* Optimized Features Section */}
      <section ref={featuresRef} className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Everything you need in one platform</p>
          </div>

          {effects3DEnabled && !isMobile && featuresVisible ? (
            <Suspense fallback={<Loading3D className="h-96" />}>
              <IsometricCards cards={featureCards} autoRotate={false} staggerDelay={200} />
            </Suspense>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featureCards.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Optimized Holographic Sphere Section */}
      {effects3DEnabled && !isMobile && (
        <section ref={sphereRef} className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-12">Experience the Future</h2>
            <div className="flex justify-center">
              {sphereVisible && (
                <Suspense fallback={<Loading3D className="w-80 h-80" />}>
                  <HolographicSphere
                    size={240}
                    segments={16}
                    autoRotate={true}
                    interactive={false}
                    glowIntensity={0.8}
                  />
                </Suspense>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">365 Days Target</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
})
HomePage.displayName = "HomePage"

// Optimized other page components
const ExplorePage = memo(({ effects3DEnabled }) => {
  const exploreCards = useMemo(
    () => [
      { title: "Gaming", icon: "🎮", description: "Live gaming streams", color: "#10b981" },
      { title: "Fashion", icon: "👗", description: "Style tips and shopping", color: "#f59e0b" },
      { title: "Cooking", icon: "🍳", description: "Recipe tutorials", color: "#ef4444" },
    ],
    [],
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">Explore Amazing Content</h1>
        <p className="text-xl text-gray-300 mb-12">Discover trending streams, viral content, and emerging creators</p>

        {effects3DEnabled ? (
          <Suspense fallback={<Loading3D className="h-96" />}>
            <IsometricCards cards={exploreCards} autoRotate={false} staggerDelay={150} />
          </Suspense>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {exploreCards.map((category, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                <p className="text-gray-300">{category.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})
ExplorePage.displayName = "ExplorePage"

const CreatePage = memo(({ effects3DEnabled }) => {
  const createCards = useMemo(
    () => [
      { title: "Studio Tools", icon: "📹", description: "Professional streaming tools", color: "#8b5cf6" },
      { title: "Monetization", icon: "💰", description: "Multiple revenue streams", color: "#f59e0b" },
      { title: "Analytics", icon: "📊", description: "Deep audience insights", color: "#06b6d4" },
    ],
    [],
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">Create Amazing Content</h1>
        <p className="text-xl text-gray-300 mb-12">Build your audience with powerful creation tools</p>

        {effects3DEnabled ? (
          <Suspense fallback={<Loading3D className="h-96" />}>
            <IsometricCards cards={createCards} autoRotate={false} staggerDelay={180} />
          </Suspense>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {createCards.map((tool, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
                <p className="text-gray-300">{tool.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})
CreatePage.displayName = "CreatePage"

const SearchPage = memo(() => {
  const categories = useMemo(
    () => ["For You", "Search Dekho", "Sneakers & Streetwear", "Electronics", "Fashion", "Home Goods"],
    [],
  )

  const streams = useMemo(
    () => [
      { host: "_aishsaree", viewers: "2.3K" },
      { host: "ravi_bids", viewers: "1.8K" },
      { host: "priya.shop", viewers: "1.5K" },
      { host: "vik_boots", viewers: "998" },
    ],
    [],
  )

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search Dekho"
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>
          <button className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-200">
            <BellIcon />
          </button>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 ${
                index === 1 ? "bg-purple-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {streams.map((stream, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-200"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative">
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {stream.viewers}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{stream.host}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
SearchPage.displayName = "SearchPage"
