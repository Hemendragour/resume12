// import { Routes, Route } from "react-router-dom";

// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import DashboardPage from "../pages/DashboardPage";

// import ProtectedRoute from "./ProtectedRoute";
// import ResumeEditorPage from "../pages/resume/ResumeEditorPage";
// import PublicResumePage from "../pages/PublicResumePage";
// import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
// import UsersPage from "../pages/admin/UsersPage";

// // New Import

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />

//       <Route path="/register" element={<RegisterPage />} />

//       {/* Public Resume Route */}
//       <Route path="/resume/public/:shareId" element={<PublicResumePage />} />

//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <DashboardPage />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardPage />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/resume/:id/edit"
//         element={
//           <ProtectedRoute>
//             <ResumeEditorPage />
//           </ProtectedRoute>
//         }
//       />

//       <Route path="/admin" element={<AdminDashboardPage />} />
//       <Route
//         path="/admin/users"
//         element={
//           <ProtectedRoute>
//             <UsersPage />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

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
        <Route index element={<Navigate to="/dashboard" replace />} />

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
