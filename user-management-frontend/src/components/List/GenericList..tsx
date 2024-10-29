import React, { ReactNode } from "react";
import "./GenericList.css";

type ListItem = {
  id: number;
  email?: string;
  name?: string;
  description?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  role?: string;
  department?: string;
  organization?: string;
  team?: string;
  position?: string;
  createdAt?: Date;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
};

interface GenericListProps {
  items: ListItem[];
}

const GenericList: React.FC<GenericListProps> = ({ items = [] }) => {
  console.log("items:", items);
  if (items.length === 0) return <p>No items to display</p>;

  const columns = Object.keys(items[0]).filter(
    (key) => key !== "id" && key !== "onDelete" && key !== "onEdit"
  );

  const formatValue = (value: any): ReactNode => {
    if (value instanceof Date) {
      return value.toLocaleDateString(); // Format Date to string
    }
    return value?.toString() ?? "-";
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>No</th>
            {columns.map((column) => (
              <th key={column}>
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              {columns.map((column) => (
                <td key={column}>
                  {formatValue(item[column as keyof ListItem])}
                </td>
              ))}
              <td>
                <button
                  onClick={() => item.onEdit && item.onEdit(item.id)}
                  className="action-button edit-button"
                >
                  ✏️
                </button>
                <button
                  onClick={() => item.onDelete && item.onDelete(item.id)}
                  className="action-button delete-button"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericList;
