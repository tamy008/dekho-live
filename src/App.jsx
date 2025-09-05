"use client"

import React, { useMemo, useState, useEffect, Suspense, lazy } from "react"
import "./App.css"
import { useErrorHandler } from "./hooks/useErrorHandler.js"
import { useMouseTracking } from "./hooks/useMouseTracking.js"
import { useScrollObserver } from "./hooks/useScrollObserver.js"
import { useNavigation } from "./hooks/useNavigation.js"

// Lazy load components for better performance
const HomePageLazy = lazy(() => import("../app/page"))
const ExplorePageLazy = lazy(() => import("./ExplorePage"))
const CreatePageLazy = lazy(() => import("./CreatePage"))

// Loading component
const LoadingSpinner = () => (
  <div className="loading">
    <div className="spinner"></div>
  </div>
)

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.warn("React Error Boundary caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "#0f0f23",
            color: "white",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1>Something went wrong</h1>
          <p>Please refresh the page to continue</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "linear-gradient(135deg, #6366f1, #ec4899)",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "50px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// HomePage Component
const HomePage = () => (
  <div className="page">
    {/* Hero Section */}
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-text">✨ New Platform Launch</span>
        </div>

        <h1 className="hero-title">
          The Future of
          <span className="gradient-text"> Digital Experience</span>
        </h1>

        <p className="hero-description">
          Immerse yourself in next-generation streaming, shopping, and content creation. Experience the web like never
          before.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">
            <span>Start Exploring</span>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <button className="secondary-btn">
            <div className="play-icon">▶</div>
            <span>Watch Demo</span>
          </button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="floating-cards">
          <div className="card card-1">
            <span className="card-emoji">🎬</span>
          </div>
          <div className="card card-2">
            <span className="card-emoji">🛍️</span>
          </div>
          <div className="card card-3">
            <span className="card-emoji">✨</span>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="features scroll-section">
      <div className="section-header">
        <h2 className="section-title">Powerful Features</h2>
        <p className="section-subtitle">Everything you need in one platform</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <div className="icon-bg"></div>
            <span>🎥</span>
          </div>
          <h3>Live Streaming</h3>
          <p>Broadcast in stunning 4K quality with zero latency and global reach</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <div className="icon-bg"></div>
            <span>🛍️</span>
          </div>
          <h3>Social Commerce</h3>
          <p>Interactive shopping experiences that convert viewers into customers</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <div className="icon-bg"></div>
            <span>🔒</span>
          </div>
          <h3>Secure Platform</h3>
          <p>Enterprise-level security with end-to-end encryption</p>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="stats">
      <div className="section-header">
        <h2 className="section-title">365 Days Target</h2>
      </div>
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-number">10M+</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500K+</div>
          <div className="stat-label">Content Creators</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1B+</div>
          <div className="stat-label">Views Monthly</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Transform Your Digital Experience?</h2>
        <p>Join millions of creators and businesses already using Dekho</p>
        <button className="cta-large">
          Get Started Today
          <div className="btn-shimmer"></div>
        </button>
      </div>
    </section>
  </div>
)

// ExplorePage Component
const ExplorePage = () => (
  <div className="page">
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-text">🔍 Discover Content</span>
        </div>

        <h1 className="hero-title">
          Explore
          <span className="gradient-text"> Amazing Content</span>
        </h1>

        <p className="hero-description">
          Discover trending streams, viral content, and emerging creators. Find your next favorite show or shopping
          experience.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">
            <span>Browse Trending</span>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <button className="secondary-btn">
            <div className="play-icon">🔥</div>
            <span>Hot Right Now</span>
          </button>
        </div>
      </div>
    </section>

    <section className="features">
      <div className="section-header">
        <h2 className="section-title">Popular Categories</h2>
        <p className="section-subtitle">What's trending on Dekho</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <div className="icon-bg"></div>
            <span>🎮</span>
          </div>
          <h3>Gaming</h3>
          <p>Live gaming streams and interactive gaming commerce</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <div className="icon-bg"></div>
            <span>👗</span>
          </div>
          <h3>Fashion</h3>
          <p>Style tips, fashion shows, and instant shopping</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <div className="icon-bg"></div>
            <span>🍳</span>
          </div>
          <h3>Cooking</h3>
          <p>Recipe tutorials with ingredient ordering</p>
        </div>
      </div>
    </section>
  </div>
)

// CreatePage Component
const CreatePage = () => (
  <div className="page">
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-text">🎨 Creator Tools</span>
        </div>

        <h1 className="hero-title">
          Create
          <span className="gradient-text"> Amazing Content</span>
        </h1>

        <p className="hero-description">
          Build your audience with powerful creation tools. Stream, sell, and engage with your community like never
          before.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">
            <span>Start Creating</span>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <button className="secondary-btn">
            <div className="play-icon">📚</div>
            <span>Creator Guide</span>
          </button>
        </div>
      </div>
    </section>

    <section className="features">
      <div className="section-header">
        <h2 className="section-title">Creator Tools</h2>
        <p className="section-subtitle">Everything you need to succeed</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <div className="icon-bg"></div>
            <span>📹</span>
          </div>
          <h3>Studio Tools</h3>
          <p>Professional streaming tools with real-time analytics</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <div className="icon-bg"></div>
            <span>💰</span>
          </div>
          <h3>Monetization</h3>
          <p>Multiple revenue streams from ads to direct sales</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <div className="icon-bg"></div>
            <span>📊</span>
          </div>
          <h3>Analytics</h3>
          <p>Deep insights into your audience and performance</p>
        </div>
      </div>
    </section>
  </div>
)

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Use custom hooks for cleaner code organization
  useErrorHandler()
  const mousePosition = useMouseTracking()
  useScrollObserver()
  const { currentPage, isTransitioning, navigateToPage } = useNavigation()

  const currentPageComponent = useMemo(() => {
    switch (currentPage) {
      case "home":
        return <HomePageLazy />
      case "explore":
        return <ExplorePageLazy />
      case "create":
        return <CreatePageLazy />
      default:
        return <HomePageLazy />
    }
  }, [currentPage])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ErrorBoundary>
      <div className="app">
        {/* Dynamic background */}
        <div
          className="bg-gradient"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />

        {/* Navigation */}
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <svg
                className="logo-img"
                width="60"
                height="60"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: "drop-shadow(0 0 20px rgba(99, 102, 241, 0.6))" }}
              >
                <defs>
                  <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <filter id="glow3d">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feOffset in="coloredBlur" dx="2" dy="2" result="offsetBlur" />
                    <feMerge>
                      <feMergeNode in="offsetBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Main shopping bag outline */}
                <path
                  d="M25 35 L75 35 L72 80 L28 80 Z"
                  fill="rgba(99, 102, 241, 0.1)"
                  stroke="url(#mainGradient)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  filter="url(#glow3d)"
                />

                {/* Shopping bag handles */}
                <path
                  d="M35 35 L35 25 Q35 20 40 20 L60 20 Q65 20 65 25 L65 35"
                  fill="none"
                  stroke="url(#mainGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#glow3d)"
                />

                {/* Play button triangle */}
                <path d="M42 45 L42 65 L62 55 Z" fill="url(#glowGradient)" filter="url(#glow3d)" />

                {/* Accent dots */}
                <circle cx="30" cy="50" r="2" fill="url(#mainGradient)" opacity="0.8" />
                <circle cx="70" cy="60" r="2" fill="url(#mainGradient)" opacity="0.8" />
                <circle cx="50" cy="75" r="1.5" fill="url(#glowGradient)" opacity="0.9" />
              </svg>
              <span className="logo-text">Dekho</span>
            </div>

            <div className="nav-links">
              <button
                className={`nav-link ${currentPage === "home" ? "active" : ""}`}
                onClick={() => navigateToPage("home")}
              >
                Home
              </button>
              <button
                className={`nav-link ${currentPage === "explore" ? "active" : ""}`}
                onClick={() => navigateToPage("explore")}
              >
                Explore
              </button>
              <button
                className={`nav-link ${currentPage === "create" ? "active" : ""}`}
                onClick={() => navigateToPage("create")}
              >
                Create
              </button>
              <button className="cta-btn">Start Selling</button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className={`page-content ${isTransitioning ? "transitioning" : ""}`}>
          <Suspense fallback={<LoadingSpinner />}>{currentPageComponent}</Suspense>
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App
