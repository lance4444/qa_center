'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Settings, 
  User, 
  BookOpen, 
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  userName?: string;
  userRole?: string;
}

export function Sidebar({ userName = "John Doe", userRole = "Student" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 z-40 h-screen w-[280px]
        bg-white shadow-lg
        transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        md:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-6 flex justify-center border-b border-gray-100">
            <Image
              src="/Logo.png"
              alt="QA Center Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={24} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{userName}</h3>
                <p className="text-sm text-gray-500">{userRole}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-gray-100">
              <Home size={20} />
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-gray-100">
              <BookOpen size={20} />
              Courses
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-gray-100">
              <Settings size={20} />
              Settings
            </Button>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-100">
            <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:bg-red-50">
              <LogOut size={20} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
