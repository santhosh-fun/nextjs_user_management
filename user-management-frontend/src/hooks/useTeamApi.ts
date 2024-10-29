import { useState, useEffect, useCallback } from "react";
import api from "../config/apiConfig";

interface Team {
  id: number;
  name: string;
  // Add other team properties as needed
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

const useTeamApi = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  // Fetch all teams
  const getTeams = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<Team[]>(`/teams`); // Change to expect an array of Team
      console.log("response::", response.data);

      // Set the teams directly from the response
      setTeams(response.data); // <-- Now directly from response.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching team data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch the user's team
  const fetchUserTeam = useCallback(async (userId: number) => {
    setLoading(true);
    try {
      const response = await api.get<ApiResponse<Team>>(`/teams/${userId}`);
      setTeam(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching team data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update the user's team
  const updateUserTeam = useCallback(
    async (userId: number, teamData: Partial<Team>) => {
      setLoading(true);
      try {
        const response = await api.put<ApiResponse<Team>>(
          `/team/${userId}`,
          teamData
        );
        setTeam(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error updating team");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Create a new team
  const createTeam = useCallback(async (teamData: Partial<Team>) => {
    setLoading(true);
    try {
      const response = await api.post<ApiResponse<Team>>("/teams", teamData);
      setTeam(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating team");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    team,
    teams,
    loading,
    error,
    fetchUserTeam,
    updateUserTeam,
    createTeam,
    getTeams,
  };
};

export default useTeamApi;
