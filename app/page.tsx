"use client"

import React, { Suspense, lazy, useState, useEffect, useMemo, useCallback } from "react"
import {
  Search,
  Menu,
  X,
  Star,
  ShoppingCart,
  Heart,
  Filter,
  Grid,
  List,
  ChevronDown,
  ArrowRight,
  Zap,
  Shield,
  Truck,
  Award,
} from "lucide-react"

// Lazy load heavy components for better performance
const ParticleField = lazy(() => import("../components/particle-field"))
const CSS3DBackground = lazy(() => import("../components/unique-effects/css-3d-background"))
const HolographicCards = lazy(() => import("../components/unique-effects/holographic-cards"))
const NeonTunnel = lazy(() => import("../components/unique-effects/neon-tunnel"))
const LiquidMetalButton = lazy(() => import("../components/unique-effects/liquid-metal-button"))
const GlitchText = lazy(() => import("../components/unique-effects/glitch-text"))
const FloatingUIElements = lazy(() => import("../components/unique-effects/floating-ui-elements"))
const InteractiveMeshGradient = lazy(() => import("../components/unique-effects/interactive-mesh-gradient"))
const MorphingBlobCursor = lazy(() => import("../components/unique-effects/morphing-cursor"))

// Performance monitoring hook
const usePerformanceMonitor = () => {
  const [isHighPerformance, setIsHighPerformance] = useState(true)
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    cores: 1,
    memory: 1,
    connection: "slow-2g",
  })

  useEffect(() => {
    // Check device capabilities
    const checkPerformance = () => {
      const cores = navigator.hardwareConcurrency || 1
      const memory = (navigator as any).deviceMemory || 1
      const connection = (navigator as any).connection?.effectiveType || "slow-2g"

      setDeviceCapabilities({ cores, memory, connection })

      // Determine if device can handle high-performance features
      const isHighPerf = cores >= 4 && memory >= 4 && ["4g", "3g"].includes(connection)

      setIsHighPerformance(isHighPerf)
    }

    checkPerformance()
  }, [])

  return { isHighPerformance, deviceCapabilities }
}

// Optimized intersection observer hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [ref, setRef] = useState<Element | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), {
      rootMargin: "50px",
      ...options,
    })

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options])

  return [setRef, isIntersecting] as const
}

// Loading skeleton component
const LoadingSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-700 rounded ${className}`} />
)

// Optimized product card component
const ProductCard = React.memo(({ product, index }: { product: any; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10">
      <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-800">
        {!imageLoaded && <LoadingSkeleton className="w-full h-full" />}
        <img
          src={`/product_placeholder.png?height=300&width=300&text=Product ${index + 1}`}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">{product.name}</h3>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
            />
          ))}
          <span className="text-sm text-gray-400 ml-2">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">${product.price}</span>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Heart className="w-4 h-4 text-white" />
            </button>
            <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
              <ShoppingCart className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

ProductCard.displayName = "ProductCard"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const { isHighPerformance } = usePerformanceMonitor()
  const [heroRef, isHeroVisible] = useIntersectionObserver()
  const [featuresRef, isFeaturesVisible] = useIntersectionObserver()
  const [productsRef, isProductsVisible] = useIntersectionObserver()

  // Memoized sample data
  const sampleProducts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Amazing Product ${i + 1}`,
        price: Math.floor(Math.random() * 500) + 50,
        rating: Math.floor(Math.random() * 2) + 4,
        reviews: Math.floor(Math.random() * 1000) + 100,
        category: ["Electronics", "Fashion", "Home", "Sports"][Math.floor(Math.random() * 4)],
      })),
    [],
  )

  // Optimized search handler
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Searching for:", searchQuery)
    },
    [searchQuery],
  )

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])
  const toggleFilter = useCallback(() => setIsFilterOpen((prev) => !prev), [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background Effects - Only load on high-performance devices */}
      {isHighPerformance && (
        <Suspense fallback={null}>
          <div className="fixed inset-0 z-0">
            <ParticleField />
            <CSS3DBackground />
          </div>
        </Suspense>
      )}

      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <img src="/dekho-logo.png" alt="Dekho" className="h-8 w-auto header-logo-3d" loading="eager" />
              <span className="text-xl font-bold text-3d-effect">Dekho</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-blue-300 transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                Products
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                Categories
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                Contact
              </a>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
              </form>
            </div>

            {/* Mobile menu button */}
            <button onClick={toggleMenu} className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/30 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
              </form>
              <div className="space-y-2">
                <a href="#" className="block py-2 hover:text-blue-300 transition-colors">
                  Home
                </a>
                <a href="#" className="block py-2 hover:text-blue-300 transition-colors">
                  Products
                </a>
                <a href="#" className="block py-2 hover:text-blue-300 transition-colors">
                  Categories
                </a>
                <a href="#" className="block py-2 hover:text-blue-300 transition-colors">
                  About
                </a>
                <a href="#" className="block py-2 hover:text-blue-300 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {isHighPerformance ? (
              <Suspense
                fallback={
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-3d-effect">Discover Amazing Products</h1>
                }
              >
                <GlitchText text="Discover Amazing Products" className="text-5xl md:text-7xl font-bold mb-6" />
              </Suspense>
            ) : (
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-3d-effect">Discover Amazing Products</h1>
            )}

            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Experience the future of shopping with our cutting-edge platform featuring immersive 3D effects and
              seamless interactions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isHighPerformance ? (
                <Suspense
                  fallback={
                    <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                      Start Exploring
                    </button>
                  }
                >
                  <LiquidMetalButton>Start Exploring</LiquidMetalButton>
                </Suspense>
              ) : (
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                  Start Exploring
                </button>
              )}

              <button className="px-8 py-4 border border-white/30 hover:bg-white/10 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Floating UI Elements */}
        {isHighPerformance && (
          <Suspense fallback={null}>
            <FloatingUIElements />
          </Suspense>
        )}
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isFeaturesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-3d-effect">Why Choose Dekho?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience shopping like never before with our innovative features and cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", description: "Optimized performance for seamless browsing" },
              { icon: Shield, title: "Secure Shopping", description: "Advanced security for safe transactions" },
              { icon: Truck, title: "Fast Delivery", description: "Quick and reliable shipping worldwide" },
              { icon: Award, title: "Premium Quality", description: "Curated selection of top-quality products" },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 border border-white/10 ${
                  isFeaturesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Mesh Gradient */}
        {isHighPerformance && (
          <Suspense fallback={null}>
            <InteractiveMeshGradient />
          </Suspense>
        )}
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-12 transition-all duration-1000 ${isProductsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-3d-effect">Featured Products</h2>
              <p className="text-xl text-gray-300">Discover our handpicked selection of amazing products</p>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 mt-6 md:mt-0">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-600" : "hover:bg-white/10"} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-blue-600" : "hover:bg-white/10"} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>

              <button
                onClick={toggleFilter}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000 ${isProductsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {sampleProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
              <span>Load More Products</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Holographic Cards Effect */}
        {isHighPerformance && (
          <Suspense fallback={null}>
            <HolographicCards />
          </Suspense>
        )}
      </section>

      {/* Neon Tunnel Effect */}
      {isHighPerformance && (
        <Suspense fallback={null}>
          <NeonTunnel />
        </Suspense>
      )}

      {/* Custom Cursor */}
      {isHighPerformance && (
        <Suspense fallback={null}>
          <MorphingBlobCursor />
        </Suspense>
      )}

      {/* Filter Sidebar */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleFilter} />
          <div className="relative ml-auto w-80 bg-gray-900/95 backdrop-blur-md h-full overflow-y-auto border-l border-white/10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Filters</h3>
                <button onClick={toggleFilter} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter content would go here */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {["Electronics", "Fashion", "Home", "Sports"].map((category) => (
                      <label key={category} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-600 bg-gray-700" />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <input type="range" min="0" max="1000" className="w-full" />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>$0</span>
                      <span>$1000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
