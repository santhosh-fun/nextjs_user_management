import { useState, useEffect, useCallback } from "react";
import api from "../config/apiConfig";

interface Department {
  id: number;
  name: string;
  // Add other team properties as needed
}

const useDepartmentApi = () => {
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  // Fetch all teams
  const getDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<Department[]>(`/departments`); // Change to expect an array of Team
      console.log("response::", response.data);

      // Set the teams directly from the response
      setDepartments(response.data); // <-- Now directly from response.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching team data");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    department,
    departments,
    loading,
    error,
    getDepartments,
  };
};

export default useDepartmentApi;
