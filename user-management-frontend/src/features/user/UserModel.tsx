import React, { useState } from "react";

const UserModel = ({
  positions,
  roles,
  departments,
  teams,
  organizations,
  onSubmit,
}: any) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    positionId: "",
    roleId: "",
    departmentId: "",
    teamId: "",
    organizationId: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(userData); // Callback to submit data to the API
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Position:
        <select
          name="positionId"
          value={userData.positionId}
          onChange={handleChange}
          required
        >
          <option value="">Select Position</option>
          {positions.map((position: any) => (
            <option key={position.id} value={position.id}>
              {position.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Role:
        <select
          name="roleId"
          value={userData.roleId}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          {roles.map((role: any) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Department:
        <select
          name="departmentId"
          value={userData.departmentId}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept: any) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Team:
        <select
          name="teamId"
          value={userData.teamId}
          onChange={handleChange}
          required
        >
          <option value="">Select Team</option>
          {teams.map((team: any) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Organization:
        <select
          name="organizationId"
          value={userData.organizationId}
          onChange={handleChange}
          required
        >
          <option value="">Select Organization</option>
          {organizations.map((org: any) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserModel;
