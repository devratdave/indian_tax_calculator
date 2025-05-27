'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calculator,
  TrendingUp,
  Shield,
  ArrowRight,
  FileText,
  CheckCircle
} from 'lucide-react';

const HomeComponent = () => {
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

  const features = [
    {
      icon: Calculator,
      title: 'Accurate Calculations',
      description: 'Get precise tax calculations based on the latest Indian tax rules and regulations.'
    },
    {
      icon: TrendingUp,
      title: 'Compare Regimes',
      description: 'Easily compare between old and new tax regimes to make informed decisions.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data stays in your browser. We don\'t store any personal information.'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Calculate Your Income Tax
              <span className="text-blue-600"> Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Make informed decisions about your taxes with our comprehensive calculator.
              Compare both tax regimes and optimize your tax savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tax-calculator"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Calculating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/tax-guide"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Tax Guides
              <FileText className="ml-2 h-5 w-5" />
            </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Calculator?
            </h2>
            <p className="text-xl text-gray-600">
              Simple, accurate, and up-to-date with the latest tax regulations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Calculate Your Taxes?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get started with our easy-to-use calculator and find out which tax regime works best for you.
            </p>
            <Link
              href="/tax-calculator"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Calculate Now
              <CheckCircle className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomeComponent;