import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../config/apiConfig";

export interface Position {
  id: number;
  title: string;
  description?: string;
}

interface PositionState {
  data: Position[];
  loading: boolean;
}

const initialState: PositionState = {
  data: [],
  loading: false,
};

export const fetchPositions = createAsyncThunk(
  "positions/fetchPositions",
  async () => {
    const response = await api.get<Position[]>("/positions");
    return response.data;
  }
);

const positionSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPositions.fulfilled,
        (state, action: PayloadAction<Position[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPositions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default positionSlice.reducer;
