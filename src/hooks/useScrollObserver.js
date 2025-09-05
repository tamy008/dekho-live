"use client"

import { useEffect } from "react"

export const useScrollObserver = () => {
  useEffect(() => {
    let observer = null
    let timer = null

    try {
      observer = new IntersectionObserver(
        (entries) => {
          try {
            entries.forEach((entry) => {
              try {
                if (entry?.isIntersecting && entry.target) {
                  entry.target.classList.add("scroll-visible")
                  if (observer) {
                    observer.unobserve(entry.target)
                  }
                }
              } catch (entryError) {
                // Silent error handling
              }
            })
          } catch (entriesError) {
            // Silent error handling
          }
        },
        { threshold: 0.1 },
      )

      timer = setTimeout(() => {
        try {
          if (!observer) return

          const elements = document.querySelectorAll(".stats")
          if (elements?.length > 0) {
            elements.forEach((el) => {
              try {
                if (el && observer) {
                  observer.observe(el)
                }
              } catch (observeError) {
                // Silent error handling
              }
            })
          }
        } catch (queryError) {
          // Silent error handling
        }
      }, 1000)
    } catch (observerError) {
      // Silent error handling
    }

    return () => {
      try {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }

        if (observer) {
          observer.disconnect()
          observer = null
        }
      } catch (cleanupError) {
        // Silent cleanup error handling
      }
    }
  }, [])
}
