import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="text-white">
      <div className=" mx-auto">
        {/* Top Section */}
        <div className="flex flex-col px-4 sm:px-6 lg:px-8 bg-[#2B2B39] gap-6 py-8 md:flex-row md:items-center md:justify-between">
          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
              <li>
                <a href="#home" className="hover:text-orange-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-orange-400">
                  Projects
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-orange-400">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Subscribe */}
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <span className="text-sm sm:text-base whitespace-nowrap">
              Subscribe Us
            </span>
            <div className="flex w-full max-w-sm">
              <Input
                type="email"
                placeholder="Email Address"
                className="rounded-r-none rounded-l-xl h-10 sm:h-12 border-white bg-transparent text-white placeholder:text-white"
              />
              <Button className="rounded-l-none rounded-r-md h-10 sm:h-12 bg-white text-gray-900 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}

        {/* Bottom Section */}
        <div className="flex border-b-2 border-white flex-col px-4 sm:px-6 lg:px-8 md:flex-row justify-between items-center gap-4 py-6 bg-[#20202D]">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
            © 2025 All Rights Reserved
          </p>

          {/* Socials */}
          <div className="flex gap-4">
            {[
              { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
              { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
              { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
              { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
            ].map((social, idx) => (
              <Link
                key={idx}
                href="#"
                className="rounded-full bg-white p-2 text-gray-800 hover:bg-gray-100 transition"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
