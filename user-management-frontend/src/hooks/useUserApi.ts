import { useState, useEffect, useCallback } from "react";
import api from "../config/apiConfig";

interface User {
  id: number;
  name: string;
  // Add other team properties as needed
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

const useUserApi = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  // Fetch all teams
  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<User[]>(`/users`); // Change to expect an array of Team
      console.log("response::", response.data);

      // Set the teams directly from the response
      setUsers(response.data); // <-- Now directly from response.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching team data");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    users,
    loading,
    error,
    getUsers,
  };
};

export default useUserApi;
