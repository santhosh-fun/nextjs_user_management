// src/features/user/EditUserModal.tsx
import React, { useState, useEffect } from "react";
import { User } from "../../state/slices/userSlice";
import "./EditUserModal.css";

interface EditUserModalProps {
  userData: Partial<User> | null;
  onSubmit: (updatedUserData: Partial<User>) => void;
  isVisible: boolean;
  onClose: () => void;
  organizations: Array<any>;
  departments: Array<any>;
  positions: Array<any>;
  teams: Array<any>;
  roles: Array<any>;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  userData,
  onSubmit,
  isVisible,
  onClose,
  organizations,
  departments,
  positions,
  teams,
  roles,
}) => {
  const [updatedUserData, setUpdatedUserData] = useState<Partial<User>>({});

  useEffect(() => {
    if (userData) setUpdatedUserData(userData);
  }, [userData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;

    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(updatedUserData);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={updatedUserData.email || ""}
            onChange={handleChange}
          />

          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={updatedUserData.firstName || ""}
            onChange={handleChange}
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={updatedUserData.lastName || ""}
            onChange={handleChange}
          />

          <label>Organization</label>
          <select
            name="organizationId"
            value={updatedUserData.organizationId || ""}
            onChange={handleChange}
          >
            <option>Select Organization</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>

          <label>Department</label>
          <select
            name="departmentId"
            value={updatedUserData.departmentId || ""}
            onChange={handleChange}
          >
            <option>Select Department</option>
            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>

          <label>Position</label>
          <select
            name="positionId"
            value={updatedUserData.positionId || ""}
            onChange={handleChange}
          >
            <option>Select Position</option>
            {positions.map((pos) => (
              <option key={pos.id} value={pos.id}>
                {pos.title}
              </option>
            ))}
          </select>

          <label>Team</label>
          <select
            name="teamId"
            value={updatedUserData.teamId || ""}
            onChange={handleChange}
          >
            <option>Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          <label>Role</label>
          <select
            name="roleId"
            value={updatedUserData.roleId || ""}
            onChange={handleChange}
          >
            <option>Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleSubmit}>
            Save Changes
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
