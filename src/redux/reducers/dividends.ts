import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExchangeRate, ItemWithCalcTax } from "../../components/types/type";
import bablo from "../bablo.json";

interface CatState {
  dividends: ItemWithCalcTax[];
  exchangeRates: ExchangeRate[];
  count: number;
}

const initialState: CatState = {
  dividends: [],
  exchangeRates: bablo,
  count: 0,
};

export const dividendsSlice = createSlice({
  name: "dividends",
  initialState,
  reducers: {
    addDividend: (state, action: PayloadAction<ItemWithCalcTax[]>) => {
      state.dividends = action.payload;
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
