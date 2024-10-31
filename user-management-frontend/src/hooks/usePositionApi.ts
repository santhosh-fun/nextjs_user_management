import { useState, useEffect, useCallback } from "react";
import api from "../config/apiConfig";

interface User {
  id: number;
  name: string;
  // Add other team properties as needed
}

const usePositionApi = () => {
  const [position, setPosition] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [positions, setPositions] = useState<User[]>([]);
  // Fetch all teams
  const getPositions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<User[]>(`/positions`); // Change to expect an array of Team
      console.log("response::", response.data);

      // Set the teams directly from the response
      setPositions(response.data); // <-- Now directly from response.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching team data");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    position,
    positions,
    loading,
    error,
    getPositions,
  };
};

export default usePositionApi;
