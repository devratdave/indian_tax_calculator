import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

interface TaxResultsProps {
  taxDetails: TaxDetails;
}

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

const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const TaxResults: React.FC<TaxResultsProps> = ({ taxDetails }) => {
  const { 
    oldRegime, 
    newRegime, 
    income,
    effectiveOldTaxRate,
    effectiveNewTaxRate
  } = taxDetails;

  const betterRegime = oldRegime.totalTax <= newRegime.totalTax ? 'old' : 'new';
  const taxDifference = Math.abs(oldRegime.totalTax - newRegime.totalTax);
  const percentageSaving = ((taxDifference / Math.max(oldRegime.totalTax, newRegime.totalTax)) * 100).toFixed(2);

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Tax Calculation Results</h2>
          <p className="text-blue-100">Annual Income: {formatCurrency(income)}</p>
          
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <p className="text-blue-100 text-sm">Recommended Tax Regime</p>
              <div className="flex items-center mt-1">
                <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-2xl font-bold">
                  {betterRegime === 'old' ? 'Old Regime' : 'New Regime'}
                </span>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm">
              <p className="text-blue-100 text-sm">You Save</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold">{formatCurrency(taxDifference)}</span>
                <span className="ml-2 text-green-300 text-sm">({percentageSaving}%)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Old Regime Card */}
        <div className={`bg-white rounded-xl shadow-md overflow-hidden ${betterRegime === 'old' ? 'ring-2 ring-green-500' : ''}`}>
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-indigo-900">Old Tax Regime</h3>
              {betterRegime === 'old' && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Better Option
                </span>
              )}
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-500 text-sm">Total Tax</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(oldRegime.totalTax)}</p>
              <p className="text-sm text-gray-600">
                Effective Tax Rate: <span className="font-medium">{effectiveOldTaxRate}%</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Tax Breakdown</h4>
              
              <div className="grid grid-cols-2 text-sm">
                <span className="text-gray-600">Basic Tax</span>
                <span className="text-right font-medium">{formatCurrency(oldRegime.basicTax)}</span>
              </div>
              
              <div className="grid grid-cols-2 text-sm">
                <span className="text-gray-600">Surcharge</span>
                <span className="text-right font-medium">{formatCurrency(oldRegime.surcharge)}</span>
              </div>
              
              <div className="grid grid-cols-2 text-sm">
                <span className="text-gray-600">Health & Education Cess</span>
                <span className="text-right font-medium">{formatCurrency(oldRegime.cess)}</span>
              </div>
              
              {oldRegime.deductions > 0 && (
                <>
                  <div className="border-t border-dashed border-gray-200 my-2 pt-2"></div>
                  <div className="grid grid-cols-2 text-sm text-green-700">
                    <span>Total Deductions</span>
                    <span className="text-right font-medium">- {formatCurrency(oldRegime.deductions)}</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-6 bg-indigo-50 -mx-6 px-6 py-4 border-t border-indigo-100">
              <h4 className="text-sm font-medium text-indigo-800 mb-2">Key Features</h4>
              <ul className="text-xs text-indigo-700 space-y-1">
                <li>• Higher tax rates with exemptions and deductions</li>
                <li>• Beneficial for those with significant investments</li>
                <li>• Traditional tax structure with multiple benefits</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* New Regime Card */}
        <div className={`bg-white rounded-xl shadow-md overflow-hidden ${betterRegime === 'new' ? 'ring-2 ring-green-500' : ''}`}>
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-900">New Tax Regime</h3>
              {betterRegime === 'new' && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Better Option
                </span>
              )}
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-500 text-sm">Total Tax</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(newRegime.totalTax)}</p>
              <p className="text-sm text-gray-600">
                Effective Tax Rate: <span className="font-medium">{effectiveNewTaxRate}%</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Tax Breakdown</h4>
              
              <div className="grid grid-cols-2 text-sm">
                <span className="text-gray-600">Basic Tax</span>
                <span className="text-right font-medium">{formatCurrency(newRegime.basicTax)}</span>
              </div>
              
              <div className="grid grid-cols-2 text-sm">
                <span className="text-gray-600">Surcharge</span>
                <span className="text-right font-medium">{formatCurrency(newRegime.surcharge)}</span>
              </div>
              
              <div className="grid grid-cols-2 text-sm">
                <span className="text-gray-600">Health & Education Cess</span>
                <span className="text-right font-medium">{formatCurrency(newRegime.cess)}</span>
              </div>

              <div className="border-t border-dashed border-gray-200 my-2 pt-2"></div>
              <div className="grid grid-cols-2 text-sm text-gray-600">
                <span>Total Deductions</span>
                <span className="text-right font-medium">- {formatCurrency(0)}</span>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 -mx-6 px-6 py-4 border-t border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Key Features</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Lower tax rates with no exemptions or deductions</li>
                <li>• Simplified tax structure with fewer slabs</li>
                <li>• Better for those with limited deductions & investments</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-yellow-800">Disclaimer</h4>
          <p className="text-xs text-yellow-700 mt-1">
            This calculation is based on FY 2023-24 (AY 2024-25) tax rates. The results are for informational purposes only and may not reflect your exact tax liability. Please consult a tax professional for personalized advice.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaxResults;