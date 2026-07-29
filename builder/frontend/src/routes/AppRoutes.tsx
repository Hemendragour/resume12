import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import DashboardPage from "../pages/DashboardPage";

import ResumeEditorPage from "../pages/resume/ResumeEditorPage";
import PublicResumePage from "../pages/PublicResumePage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import UsersPage from "../pages/admin/UsersPage";
import HomePage from "../pages/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/resume/public/:shareId" element={<PublicResumePage />} />

      {/* User */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/home" replace />} />{" "}
        {/* 👈 change */}
        <Route path="/home" element={<HomePage />} />
        {/* <Route index element={<Navigate to="/dashboard" replace />} /> */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resume/:id/edit" element={<ResumeEditorPage />} />
      </Route>

      {/* Admin */}

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboardPage />} />

        <Route path="/admin/users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}
