"use client"

import { useState, useCallback } from "react"

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState("home")
  const [isNavigating, setIsNavigating] = useState(false)

  const navigateTo = useCallback((page) => {
    setIsNavigating(true)

    // Simulate navigation delay
    setTimeout(() => {
      setCurrentPage(page)
      setIsNavigating(false)
    }, 300)
  }, [])

  return {
    currentPage,
    isNavigating,
    navigateTo,
  }
}
