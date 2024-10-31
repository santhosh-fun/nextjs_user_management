import React, { useEffect } from "react";
import GenericList from "../../components/List/GenericList.";
import MainLayout from "../../layout/MainLayout";
import usePositionApi from "../../hooks/usePositionApi";
import ActionBar from "../../components/List/ActionBar/ActionBar";
import { useNavigate } from "react-router-dom";

const PositionScreen: React.FC = () => {
  const { getPositions, loading, error, positions } = usePositionApi();
  const navigate = useNavigate();
  useEffect(() => {
    getPositions(); // Fetch all teams on component mount
  }, [getPositions]);
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
          title="Positions List"
        />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && <GenericList items={positions} />}
      </div>
    </MainLayout>
  );
};

export default PositionScreen;
