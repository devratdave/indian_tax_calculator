'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalculatorIcon, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // Replaces useLocation()

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/tax-calculator', label: 'Tax Calculator' },
    { path: '/about', label: 'About' },
    { path: '/tax-guide', label: 'Tax Guides' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <Link href="/" className="flex items-center space-x-2 ml-2 lg:ml-0">
              <CalculatorIcon className="h-7 w-7 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">Indian Tax Calculator</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
};

export default Header;
