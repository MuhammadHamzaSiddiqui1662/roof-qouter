"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  testimonial: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rowhan Smith",
    position: "CEO, Foreclosure",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    image: "/assets/images/profile.png",
  },
  {
    id: 2,
    name: "Shipra Kayak",
    position: "Brand Designer",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    image: "/assets/images/profile.png",
  },
  {
    id: 3,
    name: "John Lepore",
    position: "CEO, Foreclosure",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    image: "/assets/images/profile.png",
  },
  {
    id: 4,
    name: "Marry Freeman",
    position: "Marketing Manager",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    image: "/assets/images/profile.png",
  },
  {
    id: 5,
    name: "David Johnson",
    position: "Homeowner",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    image: "/assets/images/profile.png",
  },
];

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollRightByAmount = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Mouse drag scrolling functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
      setIsPaused(true); // Pause auto-scroll while dragging
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false); // Resume auto-scroll after dragging
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setIsPaused(false); // Resume auto-scroll when mouse leaves
    }
  };

  // Auto-scrolling functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        if (scrollContainerRef.current) {
          // Check if we've reached the end
          const container = scrollContainerRef.current;
          const isAtEnd =
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 10;

          if (isAtEnd) {
            // If at the end, scroll back to start
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // Otherwise, continue scrolling right
            scrollRightByAmount();
          }
        }
      }, 4000); // Scroll every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Heading */}
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 md:text-4xl">
          Our Happy Clients
        </h2>

        {/* Testimonials Slider */}
        <div
          ref={scrollContainerRef}
          className="lg:pl-16 flex w-full gap-6 overflow-x-auto pb-12 pt-10 scrollbar-hide cursor-grab"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative flex-shrink-0 z-20 rounded-2xl bg-white lg:p-6 p-4 shadow-lg lg:w-96 w-80 mt-10"
            >
              {/* Profile Image - Half outside, half inside */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="h-20 w-20 overflow-hidden rounded-full p-1 bg-white">
                  <Image
                    src={testimonial.image || "https://via.placeholder.com/80"}
                    alt={testimonial.name || "Profile Image"}
                    width={80}
                    height={80}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="mb-6 mt-12 text-start text-gray-600">
                {testimonial.testimonial}
              </p>

              {/* Name and Position */}
              <div className="text-start">
                <h4 className="text-lg font-medium text-orange-400">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
