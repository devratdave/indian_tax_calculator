import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalculatorIcon, ArrowRightCircle } from 'lucide-react';

interface TaxFormProps {
  onCalculate: (
    income: number, 
    regime: 'old' | 'new', 
    investments: { [key: string]: number }
  ) => void;
  loading: boolean;
}

interface Investment {
  id: string;
  name: string;
  description: string;
  max: number;
}

const investmentOptions: Investment[] = [
  {
    id: 'section80C',
    name: 'Section 80C Investments',
    description: 'EPF, PPF, ELSS, LIC, etc.',
    max: 150000
  },
  {
    id: 'nps',
    name: 'NPS Contributions (80CCD)',
    description: 'Additional deduction for NPS',
    max: 50000
  },
  {
    id: 'medicalInsurance',
    name: 'Medical Insurance (80D)',
    description: 'Health insurance premiums',
    max: 25000
  },
  {
    id: 'homeLoanInterest',
    name: 'Home Loan Interest (24B)',
    description: 'Interest paid on home loan',
    max: 200000
  },
  {
    id: 'hra',
    name: 'HRA Exemption',
    description: 'House Rent Allowance',
    max: 0 // This varies based on other factors
  }
];

const TaxForm: React.FC<TaxFormProps> = ({ onCalculate, loading }) => {
  const [income, setIncome] = useState<string>('');
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [investments, setInvestments] = useState<{[key: string]: string}>({});
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Initialize investments state
  useEffect(() => {
    const initialInvestments = investmentOptions.reduce((acc, option) => {
      acc[option.id] = '';
      return acc;
    }, {} as {[key: string]: string});
    
    setInvestments(initialInvestments);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!income || isNaN(Number(income)) || Number(income) <= 0) {
      newErrors.income = 'Please enter a valid income amount';
    }
    
    if (regime === 'old') {
      Object.keys(investments).forEach(key => {
        const value = investments[key];
        if (value && (isNaN(Number(value)) || Number(value) < 0)) {
          newErrors[key] = 'Please enter a valid amount';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const investmentValues = Object.keys(investments).reduce((acc, key) => {
        acc[key] = investments[key] ? Number(investments[key]) : 0;
        return acc;
      }, {} as {[key: string]: number});
      
      onCalculate(Number(income), regime, investmentValues);
    }
  };

  const handleInvestmentChange = (id: string, value: string) => {
    setInvestments(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error if field is corrected
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="income">
          Annual Income (CTC in ₹)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="text"
            id="income"
            value={income}
            onChange={(e) => {
              setIncome(e.target.value);
              if (errors.income) {
                setErrors(prev => {
                  const newErrors = {...prev};
                  delete newErrors.income;
                  return newErrors;
                });
              }
            }}
            className={`w-full pl-8 pr-4 py-3 border ${
              errors.income ? 'border-red-300 bg-red-50' : 'border-gray-300'
            } rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors`}
            placeholder="Enter your annual income"
          />
        </div>
        {errors.income && <p className="mt-1 text-sm text-red-600">{errors.income}</p>}
      </div>

      <div>
        <span className="block text-gray-700 font-medium mb-2">Tax Regime</span>
        <div className="grid grid-cols-2 gap-4">
          <label className={`
            flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
            ${regime === 'old' 
              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
              : 'border-gray-200 hover:bg-gray-50'}
          `}>
            <input
              type="radio"
              name="regime"
              value="old"
              checked={regime === 'old'}
              onChange={() => setRegime('old')}
              className="sr-only"
            />
            <div>
              <div className="text-lg font-medium text-gray-800">Old Regime</div>
              <div className="text-sm text-gray-600">With deductions & exemptions</div>
            </div>
          </label>
          
          <label className={`
            flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
            ${regime === 'new' 
              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
              : 'border-gray-200 hover:bg-gray-50'}
          `}>
            <input
              type="radio"
              name="regime"
              value="new"
              checked={regime === 'new'}
              onChange={() => setRegime('new')}
              className="sr-only"
            />
            <div>
              <div className="text-lg font-medium text-gray-800">New Regime</div>
              <div className="text-sm text-gray-600">Lower tax rates, no exemptions</div>
            </div>
          </label>
        </div>
      </div>

      {regime === 'old' && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Deductions & Exemptions
            </h3>
            
            <div className="space-y-4">
              {investmentOptions.map((option) => (
                <div key={option.id}>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor={option.id}>
                    {option.name}
                    {option.max > 0 && (
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        (Max: ₹{option.max.toLocaleString()})
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="text"
                      id={option.id}
                      value={investments[option.id] || ''}
                      onChange={(e) => handleInvestmentChange(option.id, e.target.value)}
                      className={`w-full pl-8 pr-4 py-2 border ${
                        errors[option.id] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                      placeholder={`Enter amount for ${option.name}`}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{option.description}</p>
                  {errors[option.id] && (
                    <p className="mt-1 text-sm text-red-600">{errors[option.id]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full flex items-center justify-center gap-2 py-3 px-6 
            bg-blue-600 hover:bg-blue-700 
            text-white font-medium rounded-lg shadow-sm 
            transition-colors duration-300
            ${loading ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          {loading ? (
            <>
              <CalculatorIcon className="animate-spin h-5 w-5" />
              Calculating...
            </>
          ) : (
            <>
              Calculate Tax
              <ArrowRightCircle className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default TaxForm;