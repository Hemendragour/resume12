import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import HomePage from "../pages/HomePage";
import TemplateGalleryPage from "../pages/TemplateGalleryPage";
import AiPage from "../pages/AiPage";
import PublicResumePage from "../pages/PublicResumePage";

import DashboardPage from "../pages/DashboardPage";
import MyResumePage from "../pages/MyResumePage";
import AnalyticsPage from "../pages/AnalyticsPage";
import Settings from "../pages/SettingsPage";
import ResumeEditorPage from "../pages/resume/ResumeEditorPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import UsersPage from "../pages/admin/UsersPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC AUTH ================= */}

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/resume/public/:shareId" element={<PublicResumePage />} />

      {/* ================= PUBLIC + LAYOUT ================= */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/templates" element={<TemplateGalleryPage />} />

        <Route path="/ai" element={<AiPage />} />
      </Route>

      {/* ================= AUTHENTICATED USER ================= */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/myresume" element={<MyResumePage />} />

        <Route path="/analytics" element={<AnalyticsPage />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/resume/:id/edit" element={<ResumeEditorPage />} />
      </Route>

      {/* ================= ADMIN ================= */}

      <Route
        element={
          <AdminProtectedRoute>
            <MainLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboardPage />} />

        <Route path="/admin/users" element={<UsersPage />} />
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
