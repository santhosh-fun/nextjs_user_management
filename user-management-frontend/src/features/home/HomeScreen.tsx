import React, { useState } from "react";
import "./HomeScreen.css";
import MainLayout from "../../layout/MainLayout";
import { ManagementCard } from "./types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes";
import { FaUser, FaUsers, FaBriefcase, FaBuilding } from "react-icons/fa";

// Define the management cards with fallback icons as component references
const managementCards: ManagementCard[] = [
  {
    title: "Manage User",
    description: "Manage users of the platform",
    iconUrl: "/icons/user.png",
    route: routes.user.list,
    fallbackIcon: FaUser, // Pass the component type, not an instance
  },
  {
    title: "Manage Teams",
    description: "Organize teams",
    iconUrl: "/icons/teams.png",
    route: routes.team.list,
    fallbackIcon: FaUsers,
  },
  {
    title: "Manage Position",
    description: "Manage job positions",
    iconUrl: "/icons/position.png",
    route: routes.position,
    fallbackIcon: FaBriefcase,
  },
  {
    title: "Manage Department",
    description: "Organize departments",
    iconUrl: "/icons/department.png",
    route: routes.department,
    fallbackIcon: FaBuilding,
  },
];

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  // State to track image load errors for each card
  const [imageErrors, setImageErrors] = useState<boolean[]>(
    new Array(managementCards.length).fill(false)
  );

  const handleError = (index: number) => {
    const newImageErrors = [...imageErrors];
    newImageErrors[index] = true; // Mark the image as having an error
    setImageErrors(newImageErrors); // Update the state
  };

  return (
    <MainLayout>
      <div className="home-screen">
        <div className="content-block">
          <h2 className="title">Welcome to the Dashboard</h2>
          <p className="description">
            Manage users, teams, and more with ease.
          </p>
          <div className="card-list">
            {managementCards.map((card, index) => {
              const IconComponent = card.fallbackIcon; // Get the icon component
              return (
                <div
                  key={index}
                  className="card"
                  onClick={() => navigate(card.route)} // Navigate to the route on click
                  role="button"
                  tabIndex={0} // Makes it focusable for accessibility
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(card.route);
                    }
                  }}
                  aria-label={`Navigate to ${card.title}`}
                >
                  <div className="fallback-icon">
                    <IconComponent /> {/* Render the icon component */}
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeScreen;
