// src/components/MainLayout.tsx
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <header className="main-header">
        <h1>User Management</h1>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default MainLayout;
