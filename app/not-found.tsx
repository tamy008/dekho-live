import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-300 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-200"
          >
            Go Home
          </Link>

          <div className="text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Return to Dekho
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
