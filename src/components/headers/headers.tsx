"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container py-10 mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            className="lg:w-56 w-36"
            width={226}
            height={100}
          />
        </Link>
        {/* Mobile menu button */}
        <button
          className="block md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            href="#home"
            className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500"
          >
            Home
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500"
          >
            Testimonials
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500"
          >
            Services
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500"
          >
            Contact us
          </Link>
        </nav>
        {/* CTA Button */}
        <div className="hidden md:block">
          <Button className="rounded-full w-34 font-bold h-12 bg-orange-400 text-white transition duration-700 delay-150 ease-in-out hover:bg-orange-400 hover:scale-110">
            Get Quote
          </Button>
        </div>
        {/* Mobile Navigation */}
        <div
          className={cn(
            "absolute left-0 right-0 top-16 z-50 bg-white p-4 shadow-md md:hidden",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          <nav className="flex flex-col space-y-4">
            <Link
              href="#home"
              className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact us
            </Link>
            <Button className="w-full bg-orange-400 hover:bg-orange-600">
              Get Quote
            </Button>
          </nav>
        </div>{" "}
      </div>
    </header>
  );
}
