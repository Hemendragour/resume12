// import type { ReactNode } from "react";

// import Sidebar from "../features/dashboard/components/Sidebar";
// import Navbar from "../features/dashboard/components/Navbar";

// interface Props {
//   children: ReactNode;
// }

// export default function DashboardLayout({
//   children,
// }: Props) {
//   return (
//     <div className="bg-slate-100 min-h-screen">

//       <Sidebar />

//       <div className="ml-72">

//         <Navbar />

//         <main className="p-8">

//           {children}

//         </main>

//       </div>

//     </div>
//   );
// }

import { Outlet } from "react-router-dom";

import Sidebar from "../features/dashboard/components/Sidebar";
import Navbar from "../features/dashboard/components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
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
