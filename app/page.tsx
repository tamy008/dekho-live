"use client"

import type React from "react"
import { useState } from "react"
import {
  Play,
  Heart,
  ShoppingCart,
  Users,
  Star,
  MapPin,
  Zap,
  TrendingUp,
  Gift,
  Sparkles,
  Search,
  Menu,
  X,
  Bell,
} from "lucide-react"

interface LiveStream {
  id: string
  title: string
  seller: string
  viewers: number
  category: string
  price: string
  originalPrice?: string
  location: string
  rating: number
  isLive: boolean
  thumbnail: string
  discount?: string
}

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

const liveStreams: LiveStream[] = [
  {
    id: "1",
    title: "Banarasi Silk Sarees - Festival Special Collection",
    seller: "Priya Textiles",
    viewers: 1247,
    category: "Fashion",
    price: "₹2,999",
    originalPrice: "₹4,999",
    location: "Varanasi, UP",
    rating: 4.8,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop&crop=center",
    discount: "40% OFF",
  },
  {
    id: "2",
    title: "Latest iPhone 15 Pro Max - Unboxing & Review",
    seller: "TechGuru Mumbai",
    viewers: 3421,
    category: "Electronics",
    price: "₹1,34,900",
    location: "Mumbai, MH",
    rating: 4.9,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: "3",
    title: "Handcrafted Home Decor - Festival Diyas & Rangoli",
    seller: "Artisan Crafts",
    viewers: 892,
    category: "Home & Decor",
    price: "₹599",
    originalPrice: "₹999",
    location: "Jaipur, RJ",
    rating: 4.7,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
    discount: "40% OFF",
  },
  {
    id: "4",
    title: "Organic Beauty Products - Ayurvedic Skincare",
    seller: "Natural Beauty Co",
    viewers: 567,
    category: "Beauty",
    price: "₹1,299",
    originalPrice: "₹1,899",
    location: "Bangalore, KA",
    rating: 4.6,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop&crop=center",
    discount: "32% OFF",
  },
  {
    id: "5",
    title: "Traditional Jewelry - Gold Plated Kundan Sets",
    seller: "Royal Jewelers",
    viewers: 2156,
    category: "Jewelry",
    price: "₹3,499",
    originalPrice: "₹5,999",
    location: "Delhi, DL",
    rating: 4.8,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&crop=center",
    discount: "42% OFF",
  },
  {
    id: "6",
    title: "Gaming Setup - RGB Mechanical Keyboards",
    seller: "GameZone India",
    viewers: 1834,
    category: "Electronics",
    price: "₹4,999",
    originalPrice: "₹7,999",
    location: "Pune, MH",
    rating: 4.7,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop&crop=center",
    discount: "38% OFF",
  },
  {
    id: "7",
    title: "Fresh Spices & Masalas - Authentic Indian Flavors",
    seller: "Spice Garden",
    viewers: 678,
    category: "Food & Grocery",
    price: "₹299",
    originalPrice: "₹499",
    location: "Kerala, KL",
    rating: 4.9,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop&crop=center",
    discount: "40% OFF",
  },
]

const categories: Category[] = [
  { id: "1", name: "Fashion", icon: "👗", count: 234 },
  { id: "2", name: "Electronics", icon: "📱", count: 156 },
  { id: "3", name: "Home & Decor", icon: "🏠", count: 189 },
  { id: "4", name: "Beauty", icon: "💄", count: 98 },
  { id: "5", name: "Jewelry", icon: "💍", count: 145 },
  { id: "6", name: "Sports", icon: "⚽", count: 67 },
]

const LiveStreamCard: React.FC<{ stream: LiveStream }> = ({ stream }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="live-stream-card group">
      <div className="relative">
        <img
          src={imageError ? "/placeholder.svg?height=200&width=300&text=Live+Stream" : stream.thumbnail}
          alt={stream.title}
          className="w-full h-48 object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute top-3 left-3">
            <div className="live-badge">
              <div className="live-dot"></div>
              LIVE
            </div>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            {stream.discount && <span className="discount-badge">{stream.discount}</span>}
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
            <Users size={16} />
            <span>{stream.viewers.toLocaleString()}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="primary-button rounded-full p-4">
              <Play size={24} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-white line-clamp-2 flex-1 mr-2">{stream.title}</h3>
          <button className="text-gray-400 hover:text-red-400 transition-colors">
            <Heart size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="seller-badge">✓ Verified</div>
          <span className="text-sm text-gray-400">{stream.seller}</span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <MapPin size={14} className="text-gray-400" />
          <span className="text-sm text-gray-400">{stream.location}</span>
          <div className="flex items-center gap-1 ml-2">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-400">{stream.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">{stream.price}</span>
            {stream.originalPrice && <span className="text-sm text-gray-400 line-through">{stream.originalPrice}</span>}
          </div>
          <button className="accent-button flex items-center gap-2">
            <ShoppingCart size={16} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <div className="category-card group">
      <div className="text-center">
        <div className="text-4xl mb-3 group-hover:scale-105 transition-transform animate-gentle-float">
          {category.icon}
        </div>
        <h3 className="font-semibold text-white mb-1">{category.name}</h3>
        <span className="text-xs text-gray-400">{category.count} live shows</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-deep-black">
      {/* Very subtle background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl animate-gentle-float"
          style={{
            background: "radial-gradient(circle, rgba(255, 28, 247, 0.03) 0%, transparent 70%)",
            top: "20%",
            left: "20%",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full blur-2xl animate-gentle-float"
          style={{
            background: "radial-gradient(circle, rgba(255, 28, 247, 0.02) 0%, transparent 70%)",
            bottom: "20%",
            right: "20%",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="header-logo">
                <img src="/dekho-logo.png" alt="Dekho Live" className="h-8 w-auto" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Dekho Live</h1>
                <p className="text-xs text-gray-400">Live Shopping Platform</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search live shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="subtle-input pl-10 w-64"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="secondary-button">Start Selling</button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass-effect">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" placeholder="Search live shows..." className="subtle-input pl-10 w-full" />
              </div>
              <button className="w-full secondary-button">Start Selling</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="minimal-neon-text subtle-glow">India's Premier</span>
            <br />
            <span className="text-white">Live Shopping Platform</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up">
            Watch, shop, and connect with authentic sellers across India in real-time.
            <span className="block mt-2 text-gray-400 font-medium">Experience shopping reimagined.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <button className="primary-button flex items-center gap-2 text-lg px-8 py-4">
              <Play size={24} fill="currentColor" />
              Watch Live Shows
            </button>
            <button className="secondary-button text-lg px-8 py-4">Explore Categories</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="stats-card">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-sm text-gray-400">Live Sellers</div>
            </div>
            <div className="stats-card">
              <div className="text-3xl font-bold text-white mb-2">2M+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
            <div className="stats-card">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-sm text-gray-400">Cities Covered</div>
            </div>
            <div className="stats-card">
              <div className="text-3xl font-bold minimal-text-accent mb-2">24/7</div>
              <div className="text-sm text-gray-400">Live Shows</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">Shop by </span>
              <span className="minimal-neon-text">Categories</span>
            </h2>
            <p className="text-gray-400 text-lg">Discover amazing products across all categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Live Shows Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                <span className="text-white">Live Shows </span>
                <span className="minimal-neon-text subtle-glow">Now</span>
              </h2>
              <p className="text-gray-400 flex items-center gap-2 text-lg">
                <Zap className="minimal-text-accent" size={20} />
                {liveStreams.length} sellers broadcasting live
              </p>
            </div>
            <button className="primary-button flex items-center gap-2">
              View All
              <TrendingUp size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {liveStreams.map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
              <Gift className="text-orange-400" />
              <span className="text-white">Festival </span>
              <span className="minimal-neon-text">Sale</span>
              <Sparkles className="text-yellow-400" />
            </h2>
            <p className="text-gray-400 text-lg">Limited time offers and exclusive discounts</p>
          </div>

          <div className="subtle-border rounded-3xl p-12 text-center">
            <div className="text-8xl mb-6 animate-gentle-float">🎉</div>
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-white">Sale </span>
              <span className="minimal-neon-text">Live Now!</span>
            </h3>
            <p className="text-gray-400 mb-8 text-lg">Up to 70% off on fashion, electronics, home decor, and more</p>
            <button className="primary-button text-xl px-12 py-4">Shop Festival Collection</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src="/dekho-logo.png" alt="Dekho Live" className="h-8 w-auto header-logo" />
                <span className="text-xl font-bold text-white">Dekho Live</span>
              </div>
              <p className="text-gray-400 mb-6">
                India's premier live shopping platform connecting authentic sellers with customers nationwide.
              </p>
              <div className="flex gap-4">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-sm text-gray-400">Made with ❤️ in India</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-white">Categories</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fashion & Clothing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home & Decor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Beauty & Personal Care
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Seller Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns & Refunds
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-white">Payment Methods</h4>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="subtle-border rounded-lg p-3 text-center text-xs font-semibold text-white">UPI</div>
                <div className="subtle-border rounded-lg p-3 text-center text-xs font-semibold text-white">Card</div>
                <div className="subtle-border rounded-lg p-3 text-center text-xs font-semibold text-white">Wallet</div>
              </div>
              <p className="text-gray-400 text-sm">Secure payments powered by leading Indian payment gateways</p>
            </div>
          </div>

          <div className="mt-12 pt-8 text-center text-gray-400 border-t border-gray-800">
            <p>&copy; 2024 Dekho Live. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
