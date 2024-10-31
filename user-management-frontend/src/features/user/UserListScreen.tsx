// UserListScreen.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  createUser,
  deleteUser,
  updateUser,
  User,
} from "../../state/slices/userSlice";
import MainLayout from "../../layout/MainLayout";
import ActionBar from "../../components/List/ActionBar/ActionBar";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "./CreateUserModal";
import GenericList from "../../components/List/GenericList.";
import EditUserModal from "./EditUserModal";
import { deleteTeam } from "../../state/slices/teamSlice";

const UserListScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
  const users = useSelector((state: RootState) => state.users);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateUser = (userData: any) => {
    dispatch(createUser(userData));
  };

  const handleEditUser = (userData: Partial<User>) => {
    setSelectedUser(userData);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUserData: Partial<User>) => {
    dispatch(
      updateUser({
        userId: Number(updatedUserData.id),
        userData: updatedUserData,
      })
    );
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const onEdit = (item: any) => {
    handleEditUser(item);
  };
  const onDelete = (item: any) => {
    console.log("onDelete", item);
    dispatch(deleteUser(Number(item.id)));
  };

  return (
    <MainLayout>
      <div>
        <ActionBar
          onBack={handleBack}
          onCreate={handleCreate}
          title="User List"
        />
        {state.users.loading && <p>Loading...</p>}
        {!state.users.loading && (
          <GenericList
            items={state.users.data.map((user) => ({
              ...user,
              onEdit,
              onDelete,
            }))}
          />
        )}
      </div>
      <EditUserModal
        userData={selectedUser}
        onSubmit={handleUpdateUser}
        isVisible={isEditModalOpen}
        onClose={handleCloseEditModal}
        organizations={state.organizations.data}
        departments={state.departments.data}
        positions={state.positions.data}
        teams={state.teams.data}
        roles={state.roles.data}
      />
      {isModalOpen && (
        <CreateUserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreateUser={handleCreateUser}
        />
      )}
    </MainLayout>
  );
};

export default UserListScreen;
