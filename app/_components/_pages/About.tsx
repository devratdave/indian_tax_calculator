'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Coins, PieChart } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Indian Tax Calculator</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              This application helps Indian taxpayers calculate their income tax liability under both the old and new tax regimes based on the latest FY 2023-24 tax rules.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tax Regimes in India</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Old Tax Regime</h3>
              <p className="text-gray-600 mb-4">
                The old tax regime offers higher tax rates but allows for various deductions and exemptions like Section 80C, HRA, etc.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-700">Key Features:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Higher base tax rates</li>
                  <li>• Multiple deductions & exemptions available</li>
                  <li>• Good for those with substantial investments</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-3">New Tax Regime</h3>
              <p className="text-gray-600 mb-4">
                Introduced in Budget 2020, the new tax regime has lower tax rates but eliminates most deductions and exemptions.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-700">Key Features:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Lower base tax rates</li>
                  <li>• Almost all deductions & exemptions removed</li>
                  <li>• Simplified tax calculation process</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Important Tax Components</h2>
          
          <div className="space-y-5">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Basic Tax</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    The initial tax calculated based on your income and applicable tax slabs for your chosen regime.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <PieChart className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Surcharge</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    An additional tax for higher income individuals. Ranges from 10% to 37% of basic tax depending on income.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Health & Education Cess</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    A 4% cess applied on the sum of basic tax and surcharge to fund health and education initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-yellow-800">Disclaimer</h3>
                <p className="text-yellow-700 text-sm mt-2">
                  This tax calculator is designed for educational and informational purposes only. While we strive to provide accurate calculations based on the latest tax laws, this should not be considered as tax advice.
                </p>
                <p className="text-yellow-700 text-sm mt-2">
                  Tax regulations may change, and individual tax situations can vary significantly. We recommend consulting with a qualified tax professional for personalized tax advice tailored to your specific circumstances.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;