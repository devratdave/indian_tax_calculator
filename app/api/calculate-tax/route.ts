export async function POST(request: Request) {
  try {
    const { income, investments } = await request.json();

    if (!income || isNaN(income) || income <= 0) {
      return Response.json({ error: 'Valid income is required' }, { status: 400 });
    }
    
    // Calculate tax for both regimes to compare
    const oldRegimeTax = calculateTaxForOldRegime(income, investments);
    const newRegimeTax = calculateTaxForNewRegime(income);
    
    // Calculate effective tax rates (total tax / income) * 100
    const effectiveOldTaxRate = ((oldRegimeTax.totalTax / income) * 100).toFixed(2);
    const effectiveNewTaxRate = ((newRegimeTax.totalTax / income) * 100).toFixed(2);
    
    // Return the complete tax details
    return Response.json({
      income,
      oldRegime: oldRegimeTax,
      newRegime: newRegimeTax,
      effectiveOldTaxRate,
      effectiveNewTaxRate
    });
  } catch (error) {
    console.error('Error in tax calculation:', error);
    return Response.json({ error: 'Failed to calculate tax' }, { status: 500 });
  }

}


/**
 * Tax slabs for the old regime (FY 2023-24)
 */
const OLD_REGIME_SLABS = [
  { limit: 300000, rate: 0 },
  { limit: 600000, rate: 5 },
  { limit: 900000, rate: 10 },
  { limit: 120000, rate: 15 },
  { limit: 150000, rate: 20 },
  { limit: Infinity, rate: 30 }
];

/**
 * Tax slabs for the new regime (FY 2023-24)
 */
const NEW_REGIME_SLABS = [
  { limit: 400000, rate: 0 },
  { limit: 800000, rate: 5 },
  { limit: 1200000, rate: 10 },
  { limit: 1600000, rate: 15 },
  { limit: 2000000, rate: 20 },
  { limit: 2400000, rate: 25 },
  { limit: Infinity, rate: 30 }
];

/**
 * Surcharge rates based on income
 */
const SURCHARGE_RATES = [
  { limit: 5000000, rate: 0 },
  { limit: 10000000, rate: 10 },
  { limit: 20000000, rate: 15 },
  { limit: 50000000, rate: 25 },
  { limit: Infinity, rate: 37 }
];

/**
 * Health and Education Cess rate (4%)
 */
const CESS_RATE = 4;

const calculateTaxForOldRegime = (income: number, investments: { [key: string]: number }) => {
  // Calculate total deductions
  const totalDeductions = calculateTotalDeductions(investments);
  
  // Taxable income after deductions
  const taxableIncome = Math.max(0, income - totalDeductions);
  
  // Calculate basic tax based on slabs
  const basicTax = calculateBasicTax(taxableIncome, OLD_REGIME_SLABS);
  
  // Calculate surcharge based on income
  const surcharge = calculateSurcharge(basicTax, income);
  
  // Calculate cess
  const cess = calculateCess(basicTax, surcharge);
  
  // Calculate total tax
  const totalTax = basicTax + surcharge + cess;
  
  return {
    basicTax,
    surcharge,
    cess,
    deductions: totalDeductions,
    totalTax
  };
};

const calculateTaxForNewRegime = (income: number) => {
  // No deductions in new regime
  const taxableIncome = income;
  
  // Calculate basic tax based on slabs
  const basicTax = calculateBasicTax(taxableIncome, NEW_REGIME_SLABS);
  
  // Calculate surcharge based on income
  // const surcharge = calculateSurcharge(basicTax, income);
  const surcharge = 0
  
  // // Calculate cess
  // const cess = calculateCess(basicTax, surcharge);
  const cess = 0;
  
  // Calculate total tax
  const totalTax = basicTax;
  
  return {
    basicTax,
    surcharge,
    cess,
    deductions: 0, // No deductions in new regime
    totalTax
  };
};

const calculateTotalDeductions = (investments: { [key: string]: number }) => {
  // Default to empty object if investments is undefined
  const investmentObj = investments || {};
  
  // Sum all investment amounts
  let totalDeduction = 0;
  
  // 80C deductions (max 1.5 lakhs)
  if (investmentObj.section80C) {
    totalDeduction += Math.min(investmentObj.section80C, 150000);
  }
  
  // NPS additional deduction (max 50,000)
  if (investmentObj.nps) {
    totalDeduction += Math.min(investmentObj.nps, 50000);
  }
  
  // Health Insurance (80D) (max 25,000 for self & family)
  if (investmentObj.medicalInsurance) {
    totalDeduction += Math.min(investmentObj.medicalInsurance, 25000);
  }
  
  // Home Loan Interest Deduction (max 2 lakhs)
  if (investmentObj.homeLoanInterest) {
    totalDeduction += Math.min(investmentObj.homeLoanInterest, 200000);
  }
  
  // HRA Exemption (varies based on multiple factors)
  if (investmentObj.hra) {
    totalDeduction += investmentObj.hra;
  }
  
  // Standard Deduction for salaried individuals (50,000)
  totalDeduction += 50000;
  
  return totalDeduction;
};

const calculateBasicTax = (income: number, slabs: { limit: number, rate: number }[]) => {
  let remainingIncome = income;
  let tax = 0;
  let prevLimit = 0;
  
  for (const slab of slabs) {
    const slabIncome = Math.min(remainingIncome, slab.limit - prevLimit);
    tax += (slabIncome * slab.rate) / 100;
    remainingIncome -= slabIncome;
    prevLimit = slab.limit;
    
    if (remainingIncome <= 0) break;
  }
  
  return tax;
};

const calculateSurcharge = (basicTax: number, income: number) => {
  let surchargeRate = 0;
  
  for (const rate of SURCHARGE_RATES) {
    if (income <= rate.limit) {
      surchargeRate = rate.rate;
      break;
    }
  }
  
  // Calculate surcharge amount
  const surcharge = (basicTax * surchargeRate) / 100;
  
  // Apply marginal relief if applicable
  // (simplified implementation - actual relief calculation is more complex)
  
  return surcharge;
};


const calculateCess = (basicTax: number, surcharge: number) => {
  return ((basicTax + surcharge) * CESS_RATE) / 100;
};