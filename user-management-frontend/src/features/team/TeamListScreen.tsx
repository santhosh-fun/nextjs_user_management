import React, { useEffect } from "react";
import useTeamApi from "../../hooks/useTeamApi";
import GenericList from "../../components/List/GenericList.";
import MainLayout from "../../layout/MainLayout";

const TeamListScreen: React.FC = () => {
  const { getTeams, loading, error, teams } = useTeamApi();

  useEffect(() => {
    getTeams(); // Fetch all teams on component mount
  }, [getTeams]);

  return (
    <MainLayout>
      <div>
        <h1>Team List</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && <GenericList items={teams} />}
      </div>
    </MainLayout>
  );
};

export default TeamListScreen;
