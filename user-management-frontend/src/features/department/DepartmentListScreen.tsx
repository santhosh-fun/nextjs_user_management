import React, { useEffect } from "react";
import GenericList from "../../components/List/GenericList.";
import MainLayout from "../../layout/MainLayout";
import useDepartmentApi from "../../hooks/useDepartmentApi";
import ActionBar from "../../components/List/ActionBar/ActionBar";
import { useNavigate } from "react-router-dom";

const DepartmentListScreen: React.FC = () => {
  const { getDepartments, loading, error, departments } = useDepartmentApi();
  const navigate = useNavigate();
  useEffect(() => {
    getDepartments(); // Fetch all teams on component mount
  }, [getDepartments]);
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
          title="Departments List"
        />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && <GenericList items={departments} />}
      </div>
    </MainLayout>
  );
};

export default DepartmentListScreen;
