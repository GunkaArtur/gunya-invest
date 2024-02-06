import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExchangeRate, ItemWithCalcTax } from "../../components/types/type";
import bablo from "../bablo.json";

interface CatState {
  dividends: ItemWithCalcTax[];
  exchangeRates: ExchangeRate[];
  allCollectedDividends: number;
  allPayedTax: number;
  count: number;
}

const initialState: CatState = {
  dividends: [],
  allCollectedDividends: 0,
  allPayedTax: 0,
  exchangeRates: bablo,
  count: 0,
};

// TODO нужно добавить итоговые дивы и налог именно они используются
// TODO также можно сделать форму для акций

export const dividendsSlice = createSlice({
  name: "dividends",
  initialState,
  reducers: {
    addDividend: (state, action: PayloadAction<ItemWithCalcTax[]>) => {
      let all = 0;
      let tax = 0;
      action.payload.forEach((item) => {
        all += item.mdlAmount;
        tax += item.taxMDL;
      });
      state.dividends = action.payload;
      state.allCollectedDividends = all;
      state.allPayedTax = tax;
    },
    removeDividend: (state) => {
      state.dividends = [];
    },
    editDividend: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
  },
});

export default dividendsSlice.reducer;
