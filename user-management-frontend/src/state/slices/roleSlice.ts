import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../config/apiConfig";

export interface Role {
  id: number;
  name: string;
  description?: string;
}

interface RoleState {
  data: Role[];
  loading: boolean;
}

const initialState: RoleState = {
  data: [],
  loading: false,
};

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await api.get<Role[]>("/roles");
  return response.data;
});

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoles.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default roleSlice.reducer;
