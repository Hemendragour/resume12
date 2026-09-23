import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../features/dashboard/components/Sidebar";
import Navbar from "../features/dashboard/components/Navbar";
import UploadResumeModal from "../features/resume/components/UploadResumeModal";
import { useQuickActions } from "../features/dashboard/hooks/useQuickActions";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isUploadModalOpen, closeUploadModal, ...quickActions } =
    useQuickActions();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        quickActions={quickActions}
      />

      <div className="flex min-h-screen flex-col lg:ml-64">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          quickActions={quickActions}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <UploadResumeModal open={isUploadModalOpen} onClose={closeUploadModal} />
    </div>
  );
}
