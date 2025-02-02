'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#8B0000]/90 to-[#800000]/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-white font-black text-2xl tracking-tighter">
                PPI QA
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Home
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                About
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#8B0000]/90 backdrop-blur-lg">
            <Button variant="ghost" className="w-full text-white hover:bg-white/10">
              Home
            </Button>
            <Button variant="ghost" className="w-full text-white hover:bg-white/10">
              About
            </Button>
            <Button variant="ghost" className="w-full text-white hover:bg-white/10">
              Contact
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
