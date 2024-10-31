import { useState, useEffect, useCallback } from "react";
import api from "../config/apiConfig";

interface User {
  id: number;
  name: string;
  // Add other team properties as needed
}

const useOrganizationsApi = () => {
  const [organization, setOrganization] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<User[]>([]);
  // Fetch all teams
  const getOrganizations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<User[]>(`/organizations`); // Change to expect an array of Team
      console.log("response::", response.data);

      // Set the teams directly from the response
      setOrganizations(response.data); // <-- Now directly from response.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching team data");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    organization,
    organizations,
    loading,
    error,
    getOrganizations,
  };
};

export default useOrganizationsApi;
