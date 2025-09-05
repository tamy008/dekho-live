"use client"

import { useEffect } from "react"

export const useErrorHandler = () => {
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      try {
        if (!event?.reason) return

        const reasonStr = String(event.reason).toLowerCase()
        const messageStr = event.reason.message ? String(event.reason.message).toLowerCase() : ""

        const devErrorPatterns = [
          "vite",
          "hmr",
          "websocket",
          "wss://",
          "fetch",
          "network",
          "connection",
          "chunk",
          "loading",
          "module",
          "import",
          "dynamic",
          "timeout",
          "failed to fetch",
          "networkerror",
          "connection refused",
          "econnrefused",
        ]

        const shouldSuppress =
          devErrorPatterns.some((pattern) => reasonStr.includes(pattern) || messageStr.includes(pattern)) ||
          ["ChunkLoadError", "TypeError", "NetworkError", "AbortError"].includes(event.reason.name) ||
          ["MODULE_NOT_FOUND", "NETWORK_ERR", "ECONNREFUSED", "TIMEOUT"].includes(event.reason.code)

        if (shouldSuppress) {
          event.preventDefault()
          return
        }

        console.warn("Application error:", event.reason)
      } catch (errorHandlingError) {
        event.preventDefault()
      }
    }

    const handleError = (event) => {
      try {
        if (!event?.error) return

        const errorMsg = event.error.message ? event.error.message.toLowerCase() : ""
        const devErrorPatterns = [
          "chunk",
          "loading",
          "network",
          "fetch",
          "vite",
          "hmr",
          "websocket",
          "connection",
          "module",
          "import",
          "timeout",
        ]

        if (devErrorPatterns.some((pattern) => errorMsg.includes(pattern))) {
          event.preventDefault()
          return
        }

        console.warn("Application error:", event.error)
      } catch (errorHandlingError) {
        event.preventDefault()
      }
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)
    }
  }, [])
}
