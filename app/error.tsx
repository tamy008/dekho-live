"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Oops!
          </h1>
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-300 mb-8">We encountered an unexpected error. Please try again.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-200"
          >
            Try Again
          </button>

          <div className="text-sm text-gray-400">
            <a href="/" className="hover:text-white transition-colors">
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
