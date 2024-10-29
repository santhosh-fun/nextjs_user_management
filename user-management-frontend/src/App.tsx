import React, { useEffect, useState } from 'react';

// Define the User type
type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  departmentId: number;
  organizationId: number;
  teamId: number;
  positionId: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);  // Specify User[] as the type

  useEffect(() => {
    fetch('http://localhost:3303/users')  // assuming the API is running on port 3303
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  if (users.length > 0) {
    console.log("users", users);
    return (
      <div>
        <h1>User List</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <></>;  // Render nothing if users list is empty
}

export default App;
