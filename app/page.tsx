"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Play, Heart, ShoppingCart, Users, Star, MapPin, Clock, Zap, TrendingUp, Gift, Sparkles } from "lucide-react"

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
  nameHindi: string
  icon: string
  count: number
}

const liveStreams: LiveStream[] = [
  {
    id: "1",
    title: "Banarasi Silk Sarees - Diwali Special Collection",
    seller: "Priya Textiles",
    viewers: 1247,
    category: "Fashion",
    price: "₹2,999",
    originalPrice: "₹4,999",
    location: "Varanasi, UP",
    rating: 4.8,
    isLive: true,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Banarasi+Sarees",
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
    thumbnail: "/placeholder.svg?height=200&width=300&text=iPhone+15+Pro",
  },
  {
    id: "3",
    title: "Handcrafted Home Decor - Diwali Diyas & Rangoli",
    seller: "Artisan Crafts",
    viewers: 892,
    category: "Home & Decor",
    price: "₹599",
    originalPrice: "₹999",
    location: "Jaipur, RJ",
    rating: 4.7,
    isLive: true,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Diwali+Decor",
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
    thumbnail: "/placeholder.svg?height=200&width=300&text=Ayurvedic+Beauty",
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
    thumbnail: "/placeholder.svg?height=200&width=300&text=Kundan+Jewelry",
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
    thumbnail: "/placeholder.svg?height=200&width=300&text=Gaming+Setup",
    discount: "38% OFF",
  },
]

const categories: Category[] = [
  { id: "1", name: "Fashion", nameHindi: "फैशन", icon: "👗", count: 234 },
  { id: "2", name: "Electronics", nameHindi: "इलेक्ट्रॉनिक्स", icon: "📱", count: 156 },
  { id: "3", name: "Home & Decor", nameHindi: "घर और सजावट", icon: "🏠", count: 189 },
  { id: "4", name: "Beauty", nameHindi: "सुंदरता", icon: "💄", count: 98 },
  { id: "5", name: "Jewelry", nameHindi: "आभूषण", icon: "💍", count: 145 },
  { id: "6", name: "Sports", nameHindi: "खेल", icon: "⚽", count: 67 },
]

const LiveStreamCard: React.FC<{ stream: LiveStream }> = ({ stream }) => {
  return (
    <div className="live-stream-card group">
      <div className="relative">
        <img src={stream.thumbnail || "/placeholder.svg"} alt={stream.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors">
          <div className="absolute top-3 left-3">
            <div className="live-badge">
              <div className="live-dot"></div>
              LIVE
            </div>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            {stream.discount && (
              <span className="bg-indian-red text-white px-2 py-1 rounded text-xs font-bold">{stream.discount}</span>
            )}
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm">
            <Users size={16} />
            <span>{stream.viewers.toLocaleString()}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 transition-colors">
              <Play size={24} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">{stream.title}</h3>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="seller-badge">✓ Verified</div>
          <span className="text-sm text-gray-600">{stream.seller}</span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <MapPin size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">{stream.location}</span>
          <div className="flex items-center gap-1 ml-2">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{stream.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{stream.price}</span>
            {stream.originalPrice && <span className="text-sm text-gray-500 line-through">{stream.originalPrice}</span>}
          </div>
          <button className="bg-saffron hover:bg-saffron/90 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
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
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
      <div className="text-center">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
        <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{category.nameHindi}</p>
        <span className="text-xs text-gray-500">{category.count} live shows</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="header-logo-3d">
                <img src="/dekho-logo.png" alt="Dekho Live" className="h-8 w-auto" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Dekho Live</h1>
                <p className="text-xs text-gray-600">देखो लाइव</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>{currentTime.toLocaleTimeString("en-IN")}</span>
              </div>
              <button className="bg-emerald hover:bg-emerald/90 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Start Selling
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="indian-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 text-3d-effect">
            India's #1 Live Shopping Platform
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Watch, Shop, and Connect with authentic sellers across India.
            <span className="block mt-2 font-medium">भारत का सबसे बड़ा लाइव शॉपिंग प्लेटफॉर्म</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Play size={20} fill="currentColor" />
              Watch Live Shows
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              Browse Categories
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="cohesive-3d-element">
              <div className="text-3xl font-bold text-saffron mb-2">50K+</div>
              <div className="text-sm text-gray-600">Live Sellers</div>
            </div>
            <div className="cohesive-3d-element">
              <div className="text-3xl font-bold text-emerald mb-2">2M+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="cohesive-3d-element">
              <div className="text-3xl font-bold text-indian-red mb-2">100+</div>
              <div className="text-sm text-gray-600">Cities Covered</div>
            </div>
            <div className="cohesive-3d-element">
              <div className="text-3xl font-bold text-navy mb-2">24/7</div>
              <div className="text-sm text-gray-600">Live Shows</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Categories</h2>
            <p className="text-gray-600">श्रेणियों के अनुसार खरीदारी करें</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Live Shows Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Shows Now</h2>
              <p className="text-gray-600 flex items-center gap-2">
                <Zap className="text-red-500" size={16} />
                {liveStreams.length} sellers are live right now
              </p>
            </div>
            <button className="text-saffron hover:text-saffron/80 font-medium flex items-center gap-2">
              View All
              <TrendingUp size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveStreams.map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12 bg-gradient-to-r from-saffron/10 via-white to-emerald/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Gift className="text-indian-red" />
              Diwali Special Offers
              <Sparkles className="text-turmeric" />
            </h2>
            <p className="text-gray-600">दिवाली के विशेष ऑफर्स</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="text-6xl mb-4">🪔</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Festival Sale Live Now!</h3>
            <p className="text-gray-600 mb-6">Up to 70% off on traditional wear, home decor, and jewelry</p>
            <button className="bg-gradient-to-r from-saffron to-indian-red text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
              Shop Festival Collection
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/dekho-logo.png" alt="Dekho Live" className="h-8 w-auto" />
                <span className="text-xl font-bold">Dekho Live</span>
              </div>
              <p className="text-gray-400 mb-4">
                India's premier live shopping platform connecting authentic sellers with customers nationwide.
              </p>
              <div className="flex gap-4">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-sm text-gray-400">Made with ❤️ in India</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
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
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
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
              <h4 className="font-semibold mb-4">Payment Methods</h4>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-gray-800 rounded p-2 text-center text-xs">UPI</div>
                <div className="bg-gray-800 rounded p-2 text-center text-xs">Card</div>
                <div className="bg-gray-800 rounded p-2 text-center text-xs">Wallet</div>
              </div>
              <p className="text-gray-400 text-sm">Secure payments powered by leading Indian payment gateways</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dekho Live. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
