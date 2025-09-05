"use client"

import { useState, useCallback } from "react"

export const useErrorHandler = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAsync = useCallback(async (asyncFunction) => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await asyncFunction()
      return result
    } catch (err) {
      setError(err.message || "An error occurred")
      console.error("Error:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    isLoading,
    handleAsync,
    clearError,
  }
}
