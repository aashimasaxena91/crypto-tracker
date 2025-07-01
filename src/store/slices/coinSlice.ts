import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type CoinData, fetchCryptoCoinDetails, fetchChartDataDualView } from "../../services/cryptoService";
import type { RootState } from "..";

interface TimeSeriesData {
  chart7d: (string | Date | number)[][];
  chart24h: (string | Date | number)[][];
}

interface CoinState {
  list: CoinData[];
  loading: boolean;
  chartData: Record<string, TimeSeriesData>,
}

const initialState: CoinState = {
  list: [],
  loading: false,
  chartData: {}
};

export const loadCoins = createAsyncThunk(
  "coins/loadCoins",
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.coins.list.length > 0) {
      return state.coins.list;
    }
    const k = await fetchChartDataDualView('bitcoin');
    console.log("fetchChartDataDualViewLLL:::,", k);
    return await fetchCryptoCoinDetails();
  }
);

export const loadChartline = createAsyncThunk(
  "coins/loadChartline",
  async (coinId: string) => {
    return { coinId, data: await fetchChartDataDualView(coinId) };
  }
);

const coinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCoins.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(loadChartline.fulfilled, (state, action) => {
        const { coinId, data } = action.payload;
        state.chartData[coinId] = data;
      });
  },
});

export default coinSlice.reducer;
