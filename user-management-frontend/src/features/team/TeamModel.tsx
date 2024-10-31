import React, { useState, ChangeEvent, FormEvent } from "react";
import "./TeamModel.css";

interface Organization {
  id: number;
  name: string;
}

interface TeamData {
  name: string;
  description: string;
  organizationId: number;
}

interface TeamModelProps {
  organizations: Organization[];
  onSubmit: (data: TeamData) => void;
  onClose: () => void;
  isVisible: boolean;
}

const TeamModel: React.FC<TeamModelProps> = ({
  organizations,
  onSubmit,
  onClose,
  isVisible,
}) => {
  const [teamData, setTeamData] = useState<TeamData>({
    name: "",
    description: "",
    organizationId: 0,
  });

  if (!isVisible) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Convert organizationId to a number if the field name matches
    setTeamData((prevData) => ({
      ...prevData,
      [name]: name === "organizationId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(teamData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={teamData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={teamData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Organization:
            <select
              name="organizationId"
              value={teamData.organizationId}
              onChange={handleChange}
              required
            >
              <option value="">Select Organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Create Team</button>
        </form>
      </div>
    </div>
  );
};

export default TeamModel;
