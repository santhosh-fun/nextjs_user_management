import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrganizations } from "../state/slices/organizationSlice";
import { fetchDepartments } from "../state/slices/departmentSlice";
import { AppDispatch } from "../state/store";
import { fetchPositions } from "../state/slices/positionSlice";
import { fetchRoles } from "../state/slices/roleSlice";
import { fetchUsers } from "../state/slices/userSlice";
import { fetchTeams } from "../state/slices/teamSlice";
// Import other fetch actions...

const useFetchAllData = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    try {
      // Use Promise.all to fetch all data concurrently
      await Promise.all([
        dispatch(fetchOrganizations()).unwrap(),
        dispatch(fetchDepartments()).unwrap(),
        dispatch(fetchPositions()).unwrap(),
        dispatch(fetchRoles()).unwrap(),
        dispatch(fetchUsers()).unwrap(),
        dispatch(fetchTeams()).unwrap(),
        // Add other fetch actions here
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return fetchData; // Allows manual refresh when needed
};

export default useFetchAllData;
