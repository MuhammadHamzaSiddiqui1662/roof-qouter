"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DynamicCarousel() {
  const [images] = useState<Array<{ src: string; alt: string }>>(
    Array.from({ length: 10 }, (_, i) => ({
      src: `/assets/images/company-data/${i + 1}.png`,
      alt: `Image ${i + 1}`,
    })),
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [prevIndex, setPrevIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear any existing timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const goToPrevious = () => {
    if (isAnimating) return

    setPrevIndex(currentIndex)
    setDirection("left")
    setIsAnimating(true)

    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }

  const goToNext = () => {
    if (isAnimating) return

    setPrevIndex(currentIndex)
    setDirection("right")
    setIsAnimating(true)

    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return

    setPrevIndex(currentIndex)
    setDirection(index > currentIndex ? "right" : "left")
    setIsAnimating(true)
    setCurrentIndex(index)

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <Card className="border-none rounded-xl overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {/* Current image */}
            <div
              className={cn(
                "absolute inset-0 transition-transform duration-500 ease-in-out",
                isAnimating && direction === "right" && "animate-slide-in-right",
                isAnimating && direction === "left" && "animate-slide-in-left",
              )}
            >
              <Image
                src={images[currentIndex].src || "/placeholder.svg"}
                alt={images[currentIndex].alt}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Previous image (for animation) */}
            {isAnimating && (
              <div
                className={cn(
                  "absolute inset-0 transition-transform duration-500 ease-in-out",
                  direction === "right" && "animate-slide-out-left",
                  direction === "left" && "animate-slide-out-right",
                )}
              >
                <Image
                  src={images[prevIndex].src || "/placeholder.svg"}
                  alt={images[prevIndex].alt}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-110"
            onClick={goToPrevious}
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-110"
            onClick={goToNext}
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-orange-500 scale-125" : "bg-orange-400 hover:bg-orange-500",
            )}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  )
}
