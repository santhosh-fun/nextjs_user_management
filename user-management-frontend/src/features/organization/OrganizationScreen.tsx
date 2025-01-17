import React, { useEffect } from "react";
import GenericList from "../../components/List/GenericList.";
import MainLayout from "../../layout/MainLayout";
import useOrganizationsApi from "../../hooks/useOrganizationsApi";
import ActionBar from "../../components/List/ActionBar/ActionBar";
import { useNavigate } from "react-router-dom";

const OrganizationScreen: React.FC = () => {
  const { getOrganizations, loading, error, organizations } =
    useOrganizationsApi();
  const navigate = useNavigate();
  useEffect(() => {
    getOrganizations(); // Fetch all teams on component mount
  }, [getOrganizations]);
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
          title="Organization List"
        />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && <GenericList items={organizations} />}
      </div>
    </MainLayout>
  );
};

export default OrganizationScreen;
