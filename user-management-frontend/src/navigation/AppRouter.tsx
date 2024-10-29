import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routes } from "../config/routes";
import LoginScreen from "../features/auth/LoginScreen";
import HomeScreen from "../features/home/HomeScreen";
import UserListScreen from "../features/user/UserListScreen";
// import { UserAddScreen } from "../features/user/UserAddScreen";
// import { UserUpdateScreen } from "../features/user/UserUpdateScreen";
import TeamListScreen from "../features/team/TeamListScreen";
// import { TeamCreateScreen } from "../features/team/TeamCreateScreen";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path={routes.login} element={<LoginScreen />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path={routes.home} element={<HomeScreen />} />
        <Route path={routes.team.list} element={<TeamListScreen />} />
        <Route path={routes.user.list} element={<UserListScreen />} />
        {/* 
        <Route path={routes.user.add} element={<UserAddScreen />} />
        <Route
          path={routes.user.update(":id")}
          element={<UserUpdateScreen />}
        />
        <Route path={routes.team.list} element={<TeamListScreen />} />
        <Route path={routes.team.create} element={<TeamCreateScreen />} />
        <Route path={routes.department} element={<DepartmentScreen />} />
        <Route path={routes.organization} element={<OrganizationScreen />} />
        <Route path={routes.position} element={<PositionScreen />} /> */}
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to={routes.login} />} />
    </Routes>
  </Router>
);

export default AppRouter;
