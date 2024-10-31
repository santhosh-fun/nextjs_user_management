import React, { useEffect } from "react";
import GenericList from "../../components/List/GenericList.";
import MainLayout from "../../layout/MainLayout";
import useRoleApi from "../../hooks/useRoleApi";
import ActionBar from "../../components/List/ActionBar/ActionBar";
import { useNavigate } from "react-router-dom";

const RoleListScreen: React.FC = () => {
  const { getRoles, loading, error, roles } = useRoleApi();
  const navigate = useNavigate();
  useEffect(() => {
    getRoles(); // Fetch all teams on component mount
  }, [getRoles]);
  const handleBack = () => {
    navigate(-1);
  };

  const handleCreate = () => {
    console.log("Create button clicked");
  };
  return (
    <MainLayout>
      <div>
        <ActionBar
          onBack={handleBack}
          onCreate={handleCreate}
          title="Role List"
        />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && <GenericList items={roles} />}
      </div>
    </MainLayout>
  );
};

export default RoleListScreen;
