import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../config/apiConfig";

export interface Organization {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrganizationState {
  data: Organization[];
  loading: boolean;
}

const initialState: OrganizationState = {
  data: [],
  loading: false,
};

// Async thunk for fetching data
export const fetchOrganizations = createAsyncThunk(
  "organizations/fetchOrganizations",
  async () => {
    const response = await api.get<Organization[]>("/organizations");
    return response.data;
  }
);

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOrganizations.fulfilled,
        (state, action: PayloadAction<Organization[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOrganizations.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default organizationSlice.reducer;
