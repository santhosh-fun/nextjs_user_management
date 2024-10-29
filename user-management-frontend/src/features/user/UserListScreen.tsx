import React from "react";
import GenericList from "../../components/List/GenericList.";

const data = [
  {
    id: 1,
    firstName: "John",
    email: "john@example.com",
    role: "Developer",
    onDelete: (id: number) => console.log(`Delete item with id ${id}`),
    onEdit: (id: number) => console.log(`Edit item with id ${id}`),
  },
  {
    id: 2,
    name: "Team Alpha",
    description: "A specialized project team",
    department: "Engineering",
    onDelete: (id: number) => console.log(`Delete item with id ${id}`),
    onEdit: (id: number) => console.log(`Edit item with id ${id}`),
  },
];

const UserListScreen: React.FC = () => {
  return (
    <div>
      <GenericList items={data} />
    </div>
  );
};

export default UserListScreen;
