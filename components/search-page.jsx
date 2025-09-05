"use client"
import { SearchIcon, BellIcon } from "lucide-react"

const SearchPage = () => {
  // Placeholder data for live stream cards
  const liveStreams = [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=300",
      viewers: "2,3K",
      host: "_aishsaree",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=300",
      viewers: "1,8K",
      host: "ravi_bids",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=300",
      viewers: "1,5K",
      host: "priya.shop",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=300&width=300",
      viewers: "998",
      host: "vik_boots",
    },
  ]

  return (
    <div className="page search-page-container">
      {/* Top Search Bar */}
      <div className="search-header">
        <div className="search-logo-placeholder">
          <img src="/dekho-logo.png" alt="Dekho Logo" width={40} height={40} />
        </div>
        <div className="search-input-wrapper">
          <SearchIcon size={20} className="search-icon" />
          <input type="text" placeholder="Search Dekho" className="search-input" />
        </div>
        <BellIcon size={24} className="notification-icon" />
      </div>

      {/* Category Tabs */}
      <div className="search-tabs-container">
        <div className="search-tabs">
          <button className="search-tab-item">For You</button>
          <button className="search-tab-item active">Search Dekho</button>
          <button className="search-tab-item">Sneakers & Streetwear</button>
          <button className="search-tab-item">Electronics</button>
          <button className="search-tab-item">Fashion</button>
          <button className="search-tab-item">Home Goods</button>
        </div>
      </div>

      {/* Live Stream Grid */}
      <div className="live-card-grid">
        {liveStreams.map((stream) => (
          <div key={stream.id} className="live-card">
            <div className="live-card-image-wrapper">
              <img
                src={stream.image || "/placeholder.svg"}
                alt={`Live stream by ${stream.host}`}
                width={300}
                height={300}
                className="live-card-image"
              />
              <div className="live-badge">
                <span className="live-dot"></span> {stream.viewers} watching
              </div>
            </div>
            <h3 className="live-host">{stream.host}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
