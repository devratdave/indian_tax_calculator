// app/_components/_pages/TaxGuideClient.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  FileText,
  AlertTriangle,
  Building2,
  Home,
  HeartPulse,
  PiggyBank
} from 'lucide-react';

const TaxGuideClient: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const deductions = [
    {
      icon: Building2,
      title: 'Section 80C',
      limit: '₹1.5 Lakhs',
      items: [
        'Employee Provident Fund (EPF)',
        'Public Provident Fund (PPF)',
        'Life Insurance Premium',
        'ELSS Mutual Funds',
        'National Savings Certificate',
        'Tuition Fees for Children'
      ]
    },
    {
      icon: HeartPulse,
      title: 'Section 80D',
      limit: '₹25,000 - ₹1,00,000',
      items: [
        'Health Insurance Premium',
        'Preventive Health Checkup',
        'Additional deduction for senior citizens',
        'Medical expenditure for specific conditions'
      ]
    },
    {
      icon: Home,
      title: 'Section 24',
      limit: '₹2 Lakhs',
      items: [
        'Home Loan Interest Deduction',
        'Self-occupied Property',
        'Let Out Property Benefits',
        'Pre-construction Interest'
      ]
    },
    {
      icon: PiggyBank,
      title: 'Section 80CCD(1B)',
      limit: '₹50,000',
      items: [
        'Additional NPS Contribution',
        'Exclusive of 80C Limit',
        'Voluntary Contributions Only',
        'Government & Private Sector Employees'
      ]
    }
  ];

  return (
    <motion.div
variants={containerVariants}
initial="hidden"
animate="visible"
className="min-h-screen bg-gray-50 py-12"
>
<div className="container mx-auto px-4">
  <motion.div variants={itemVariants} className="text-center mb-12">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">
      Indian Tax Guide
    </h1>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      Understanding Indian taxation system and making informed decisions about your tax savings
    </p>
  </motion.div>

  <motion.section variants={itemVariants} className="mb-16">
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-blue-50 border-b border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Calculator className="h-6 w-6 mr-2 text-blue-600" />
          Tax Regimes Comparison
        </h2>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Old Tax Regime</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Multiple tax deductions and exemptions available</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Beneficial for those with high investments and home loans</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">×</span>
                <span>Higher tax rates compared to new regime</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">New Tax Regime</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Lower tax rates across income slabs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Simplified tax calculation</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">×</span>
                <span>Most deductions and exemptions not available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </motion.section>

  <motion.section variants={itemVariants} className="mb-16">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      <FileText className="h-6 w-6 mr-2 text-blue-600" />
      Major Tax Deductions
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {deductions.map((deduction, index) => {
        const Icon = deduction.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{deduction.title}</h3>
                <p className="text-blue-600 font-medium">Maximum: {deduction.limit}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {deduction.items.map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  </motion.section>

  <motion.section variants={itemVariants}>
    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• Tax rates and deductions mentioned are for FY 2023-24 (AY 2024-25)</li>
            <li>• Always consult a tax professional for personalized advice</li>
            <li>• Keep all investment and expense documents for verification</li>
            <li>• File your returns before the due date to avoid penalties</li>
          </ul>
        </div>
      </div>
    </div>
  </motion.section>
</div>
</motion.div>

  );
};

export default TaxGuideClient;