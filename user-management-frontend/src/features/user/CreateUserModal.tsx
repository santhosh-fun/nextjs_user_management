import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import "./CreateUserModal.css";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser: (userData: any) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onCreateUser,
}) => {
  const { organizations, departments, positions, teams, roles } = useSelector(
    (state: RootState) => state
  );

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isActive: true,
    roleId: 0,
    departmentId: 0,
    organizationId: 0,
    teamId: 0,
    positionId: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]:
        name === "isActive" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));
  };

  const handleSubmit = () => {
    onCreateUser(userData); // Use callback to dispatch createUser from UserListScreen
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create User</h2>
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">First Name</label>
            <input
              className="input"
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Last Name</label>
            <input
              className="input"
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Role</label>
            <select
              className="select"
              name="roleId"
              value={userData.roleId}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              {roles.data.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Department</label>
            <select
              className="select"
              name="departmentId"
              value={userData.departmentId}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.data.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Organization</label>
            <select
              className="select"
              name="organizationId"
              value={userData.organizationId}
              onChange={handleChange}
              required
            >
              <option value="">Select Organization</option>
              {organizations.data.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Team</label>
            <select
              className="select"
              name="teamId"
              value={userData.teamId}
              onChange={handleChange}
            >
              <option value="">Select Team</option>
              {teams.data.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Position</label>
            <select
              className="select"
              name="positionId"
              value={userData.positionId}
              onChange={handleChange}
            >
              <option value="">Select Position</option>
              {positions.data.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Active</label>
            <input
              className="checkbox"
              type="checkbox"
              name="isActive"
              checked={userData.isActive}
              onChange={handleChange}
            />
          </div>

          <div className="button-container">
            <button className="cancel-button" type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              className="submit-button"
              type="button"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
