import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type CoinData, fetchTopCryptos, fetchSparklineData } from "../../services/cryptoService";

interface CoinState {
  list: CoinData[];
  sparkline: Record<string, number[]>;
  loading: boolean;
  chartData: Record<string, string[][]>
}

const initialState: CoinState = {
  list: [],
  sparkline: {},
  loading: false,
  chartData: {}
};

export const loadCoins = createAsyncThunk("coins/loadCoins", async () => {
  return await fetchTopCryptos();
});

export const loadSparkline = createAsyncThunk(
  "coins/loadSparkline",
  async (coinId: string) => {
    return { coinId, data: await fetchSparklineData(coinId) };
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
      .addCase(loadSparkline.fulfilled, (state, action) => {
        const { coinId, data } = action.payload;
        state.chartData[coinId] = data;
      });
  },
});

export default coinSlice.reducer;
