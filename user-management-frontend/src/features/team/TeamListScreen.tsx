import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import {
  createTeam,
  deleteTeam,
  updateTeam,
} from "../../state/slices/teamSlice";
import TeamCreationPopup from "./TeamModel";
import EditTeamPopup from "./EditTeamPopup"; // New import
import MainLayout from "../../layout/MainLayout";
import ActionBar from "../../components/List/ActionBar/ActionBar";
import GenericList from "../../components/List/GenericList.";

const TeamListScreen: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const teams = useSelector((state: RootState) => state.teams);
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenTeamModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseTeamModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTeam = (teamData: any) => {
    dispatch(createTeam(teamData));
    handleCloseTeamModal();
  };

  const handleEditTeam = (teamData: any) => {
    setSelectedTeam(teamData);
    setIsEditModalOpen(true);
  };

  const handleUpdateTeam = (updatedTeamData: any) => {
    console.log("updatedTeamData:", updatedTeamData);
    dispatch(
      updateTeam({
        teamData: { ...updatedTeamData },
        teamId: Number(updatedTeamData.id),
      })
    );
    setIsEditModalOpen(false);
    setSelectedTeam(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTeam(null);
  };

  const onEdit = (item: any) => {
    handleEditTeam(item);
  };

  const onDelete = (item: any) => {
    console.log("onDelete", item);
    dispatch(
      deleteTeam({
        teamId: Number(item.id),
      })
    );
  };

  return (
    <MainLayout>
      <TeamCreationPopup
        organizations={state.organizations.data}
        onSubmit={handleCreateTeam}
        isVisible={isModalOpen}
        onClose={handleCloseTeamModal}
      />

      <EditTeamPopup
        teamData={selectedTeam}
        onSubmit={handleUpdateTeam}
        isVisible={isEditModalOpen}
        onClose={handleCloseEditModal}
      />

      <div>
        <ActionBar
          onBack={handleBack}
          onCreate={handleOpenTeamModal}
          title="Team List"
        />
        {teams.loading && <p>Loading...</p>}
        {!teams.loading && (
          <GenericList
            items={teams.data.map((team) => ({ ...team, onEdit, onDelete }))}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default TeamListScreen;
