"use client"

import { useState, useCallback } from "react"

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState("home")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateToPage = useCallback(
    (page) => {
      try {
        if (!page || typeof page !== "string" || page === currentPage || isTransitioning) {
          return
        }

        const validPages = ["home", "explore", "create"]
        if (!validPages.includes(page)) {
          return
        }

        setIsTransitioning(true)

        const navigationTimer1 = setTimeout(() => {
          try {
            setCurrentPage(page)

            const navigationTimer2 = setTimeout(() => {
              try {
                setIsTransitioning(false)
                if (window?.scrollTo) {
                  window.scrollTo({ top: 0, behavior: "auto" })
                }
              } catch (scrollError) {
                try {
                  window.scrollTo(0, 0)
                } catch (fallbackError) {
                  // Silent error handling
                }
                setIsTransitioning(false)
              }
            }, 200)

            return () => clearTimeout(navigationTimer2)
          } catch (pageError) {
            setIsTransitioning(false)
          }
        }, 100)

        return () => clearTimeout(navigationTimer1)
      } catch (navigationError) {
        setIsTransitioning(false)
      }
    },
    [currentPage, isTransitioning],
  )

  return { currentPage, isTransitioning, navigateToPage }
}
