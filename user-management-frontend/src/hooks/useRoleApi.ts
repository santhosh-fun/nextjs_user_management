import { useState, useEffect, useCallback } from "react";
import api from "../config/apiConfig";

interface Role {
  id: number;
  name: string;
  // Add other team properties as needed
}

const useRoleApi = () => {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  // Fetch all teams
  const getRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<Role[]>(`/roles`); // Change to expect an array of Team
      console.log("response::", response.data);

      // Set the teams directly from the response
      setRoles(response.data); // <-- Now directly from response.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching team data");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    role,
    roles,
    loading,
    error,
    getRoles,
  };
};

export default useRoleApi;
