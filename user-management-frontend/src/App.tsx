import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./state/store";
import AppRouter from "./navigation/AppRouter";
import { PersistGate } from "redux-persist/integration/react";

// Define the User type
type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  departmentId: number;
  organizationId: number;
  teamId: number;
  positionId: number;
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
