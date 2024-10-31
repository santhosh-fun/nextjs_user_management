import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import "./EditTeamPopup.css";

interface EditTeamPopupProps {
  teamData: any;
  onSubmit: (teamData: any) => void;
  isVisible: boolean;
  onClose: () => void;
}

const EditTeamPopup: React.FC<EditTeamPopupProps> = ({
  teamData,
  onSubmit,
  isVisible,
  onClose,
}) => {
  const organizations = useSelector(
    (state: RootState) => state.organizations.data
  );
  const [name, setName] = useState(teamData?.name || "");
  const [description, setDescription] = useState(teamData?.description || "");
  const [organizationId, setOrganizationId] = useState(
    teamData?.organizationId || ""
  );

  useEffect(() => {
    if (teamData) {
      setName(teamData.name);
      setDescription(teamData.description);
      setOrganizationId(teamData.organizationId);
    }
  }, [teamData]);

  const handleSubmit = () => {
    const updatedTeam = { ...teamData, name, description, organizationId };
    onSubmit(updatedTeam);
  };

  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="form-container">
        <h3>Edit Team</h3>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Organization:</label>
        <select
          value={organizationId}
          onChange={(e) => setOrganizationId(Number(e.target.value))}
        >
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Save Changes</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditTeamPopup;
