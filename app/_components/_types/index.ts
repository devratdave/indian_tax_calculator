interface TaxRegimeDetails {
  basicTax: number;
  surcharge: number;
  cess: number;
  deductions: number;
  totalTax: number;
}
// export interface TaxRegimeDetails {
//   basicTax: number;
//   surcharge: number;
//   cess: number;
//   deductions: number;
//   totalTax: number;
//   monthlyTax: number;
//   rebate: number;
//   standardDeduction: number;
//   taxableIncome: number;
//   grossIncome: number;
// }

export interface TaxDetails {
  income: number;
  oldRegime: TaxRegimeDetails;
  newRegime: TaxRegimeDetails;
  effectiveOldTaxRate: number;
  effectiveNewTaxRate: number;
}

export interface Comment {
  id: number;
  name: string;
  comment: string;
  timestamp: string;
}