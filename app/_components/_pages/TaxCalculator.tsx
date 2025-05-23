'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import TaxForm from '../TaxForm';
import TaxResults from '../TaxResults';

export const calculateTax = async (
  income: number,
  regime: 'old' | 'new',
  investments: { [key: string]: number }
): Promise<TaxDetails> => {   
  try {
    const response = await fetch(`/api/calculate-tax`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        income,
        regime,
        investments
      })
    });
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error calculating tax:', error);
    throw new Error('Failed to calculate tax. Please try again.');
  }
};


interface TaxRegimeDetails {
  basicTax: number;
  surcharge: number;
  cess: number;
  deductions: number;
  totalTax: number;
}

interface TaxDetails {
  income: number;
  oldRegime: TaxRegimeDetails;
  newRegime: TaxRegimeDetails;
  effectiveOldTaxRate: number;
  effectiveNewTaxRate: number;
}

const TaxCalculator: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [taxDetails, setTaxDetails] = useState<TaxDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (
    income: number,
    regime: 'old' | 'new',
    investments: { [key: string]: number }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await calculateTax(income, regime, investments);
      setTaxDetails(result);
    } catch (err) {
      setError('Failed to calculate tax. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetCalculation = () => {
    setTaxDetails(null);
    setError(null);
  };

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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
            Indian Income Tax Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Calculate your income tax under both old and new regimes based on latest FY 2023-24 rules
          </p>
        </motion.div>

        {taxDetails ? (
          <motion.div variants={itemVariants}>
            <TaxResults taxDetails={taxDetails} />
            <div className="flex justify-center mt-8">
              <button
                onClick={resetCalculation}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                <RefreshCw size={18} />
                Calculate Again
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
              <TaxForm onCalculate={handleCalculate} loading={loading} />
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
          <p className="text-sm text-blue-700">
            This calculator is for informational purposes only and should not be considered as tax advice. 
            Tax rules and regulations may change. Please consult with a qualified tax professional for personalized tax advice.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TaxCalculator;