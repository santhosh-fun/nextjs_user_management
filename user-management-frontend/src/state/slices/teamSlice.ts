import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../config/apiConfig";

export interface Team {
  id: number;
  name: string;
  description?: string;
  organizationId: number;
}

interface TeamState {
  data: Team[];
  loading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: TeamState = {
  data: [],
  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

// Fetch teams
export const fetchTeams = createAsyncThunk("teams/fetchTeams", async () => {
  const response = await api.get<Team[]>("/teams");
  return response.data;
});

// Create a new team
export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (teamData: Omit<Team, "id">) => {
    const response = await api.post<Team>("/teams", teamData);
    return response.data;
  }
);

// Update an existing team
export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ teamId, teamData }: { teamId: number; teamData: Partial<Team> }) => {
    const response = await api.put<Team>(`/teams/${teamId}`, teamData);
    return response.data;
  }
);

export const deleteTeam = createAsyncThunk<number, { teamId: number }>(
  "teams/deleteTeam",
  async ({ teamId }) => {
    await api.delete(`/teams/${teamId}`);
    return teamId; // Return the teamId
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch teams
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state) => {
        state.loading = false;
      })

      // Create team
      .addCase(createTeam.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.data.push(action.payload); // Add new team to state
        state.createLoading = false;
      })
      .addCase(createTeam.rejected, (state) => {
        state.createLoading = false;
      })

      // Update team
      .addCase(updateTeam.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        const index = state.data.findIndex(
          (team) => team.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload; // Update team in state
        }
        state.updateLoading = false;
      })
      .addCase(updateTeam.rejected, (state) => {
        state.updateLoading = false;
      })

      // Delete team
      .addCase(deleteTeam.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTeam.fulfilled, (state, action: PayloadAction<number>) => {
        state.data = state.data.filter((team) => team.id !== action.payload); // Remove deleted team from state
        state.deleteLoading = false;
      })
      .addCase(deleteTeam.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export default teamSlice.reducer;
