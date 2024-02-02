export interface Item {
  date: string;
  currency: string;
  company: string;
  comment: string;
  amount: number;
  tax?: number;
  netProfit?: number;
}

export interface ItemWithCalcTax extends Item {
  mdlAmount: number;
  taxMDL: number;
}

export interface ExchangeRate {
  date: string;
  usd: number;
  eur: number;
}
