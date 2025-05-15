"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"

export default function MultiSlideCarousel() {
  const isMobile = useMobile()
  const slidesPerView = isMobile ? 1 : 3

  const [images] = useState<Array<{ src: string; alt: string }>>(
    Array.from({ length: 10 }, (_, i) => ({
      src: `/assets/images/company-data/${i + 1}.png`,
      alt: `Image ${i + 1}`,
    })),
  )

  const [currentPage, setCurrentPage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate total number of pages
  const totalPages = Math.ceil(images.length / slidesPerView)

  // Clear any existing timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const goToPrevious = () => {
    if (isAnimating || currentPage === 0) return

    setIsAnimating(true)
    setCurrentPage((prev) => prev - 1)

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const goToNext = () => {
    if (isAnimating || currentPage >= totalPages - 1) return

    setIsAnimating(true)
    setCurrentPage((prev) => prev + 1)

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const goToPage = (page: number) => {
    if (isAnimating || page === currentPage) return

    setIsAnimating(true)
    setCurrentPage(page)

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  // Get current visible slides
  const visibleSlides = images.slice(currentPage * slidesPerView, (currentPage + 1) * slidesPerView)

  return (
    <div className="w-full mx-auto relative">
      <Card className="border-none rounded-xl overflow-hidden">
        <CardContent className="p-0 relative">
          <div
            className="relative w-full overflow-hidden"
            style={{
              height: isMobile ? "300px" : "250px",
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="flex justify-start min-w-full">
                  {images.slice(pageIndex * slidesPerView, (pageIndex + 1) * slidesPerView).map((image, imageIndex) => (
                    <div key={pageIndex * slidesPerView + imageIndex} className="flex-1 p-2">
                      <div className="relative w-full h-full">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          sizes={isMobile ? "100vw" : "33vw"}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-110"
            onClick={goToPrevious}
            aria-label="Previous slide"
            disabled={isAnimating || currentPage === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-110"
            onClick={goToNext}
            aria-label="Next slide"
            disabled={isAnimating || currentPage >= totalPages - 1}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentPage ? "bg-orange-500 scale-125" : "bg-orange-400 hover:bg-orange-500",
            )}
            aria-label={`Go to page ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  )
}
