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
import TeamListScreen from "../features/team/TeamListScreen";
import ProtectedRoute from "./ProtectedRoute";
import PositionScreen from "../features/position/PositionScreen";
import OrganizationScreen from "../features/organization/OrganizationScreen";
import DepartmentListScreen from "../features/department/DepartmentListScreen";
import RoleListScreen from "../features/role/RoleListScreen";

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
        <Route path={routes.role} element={<RoleListScreen />} />
        <Route path={routes.department} element={<DepartmentListScreen />} />
        <Route path={routes.organization} element={<OrganizationScreen />} />
        <Route path={routes.position} element={<PositionScreen />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to={routes.login} />} />
    </Routes>
  </Router>
);

export default AppRouter;
