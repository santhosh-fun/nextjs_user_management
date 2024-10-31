import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../config/apiConfig";

export interface Department {
  id: number;
  name: string;
  description?: string;
  organizationId: number;
}

interface DepartmentState {
  data: Department[];
  loading: boolean;
}

const initialState: DepartmentState = {
  data: [],
  loading: false,
};

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async () => {
    const response = await api.get<Department[]>("/departments");
    return response.data;
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDepartments.fulfilled,
        (state, action: PayloadAction<Department[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchDepartments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default departmentSlice.reducer;
