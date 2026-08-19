import { Outlet } from "react-router-dom";

import Sidebar from "../features/dashboard/components/Sidebar";
import Navbar from "../features/dashboard/components/Navbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-72 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
