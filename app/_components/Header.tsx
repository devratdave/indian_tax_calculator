import React from 'react';
import { Link } from 'react-router-dom';
import { CalculatorIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <CalculatorIcon className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold text-gray-800">Indian Tax Calculator</span>
        </Link>
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Calculator
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;