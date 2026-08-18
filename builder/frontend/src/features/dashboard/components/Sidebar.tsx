// import {
//   LayoutDashboard,
//   FileText,
//   Palette,
//   Bot,
//   Settings,
// } from "lucide-react";

// const menus = [
//   {
//     title: "Dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "My Resumes",
//     icon: FileText,
//   },
//   {
//     title: "Templates",
//     icon: Palette,
//   },
//   {
//     title: "AI Assistant",
//     icon: Bot,
//   },
//   {
//     title: "Settings",
//     icon: Settings,
//   },
// ];

// export default function Sidebar() {
//   return (
//     <aside className="w-72 bg-white border-r h-screen fixed left-0 top-0">

//       <div className="h-20 flex items-center justify-center border-b">

//         <h1 className="text-3xl font-bold text-blue-600">

//           ResumeAI

//         </h1>

//       </div>

//       <nav className="p-5 space-y-2">

//         {menus.map((menu) => {

//           const Icon = menu.icon;

//           return (

//             <button
//               key={menu.title}
//               className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition"
//             >

//               <Icon size={20} />

//               {menu.title}

//             </button>

//           );

//         })}

//       </nav>

//     </aside>
//   );
// }

import {
  LayoutDashboard,
  FileText,
  Palette,
  Bot,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Resumes",
    path: "/myresume",
    icon: FileText,
  },
  {
    title: "Templates",
    path: "/templates",
    icon: Palette,
  },
  {
    title: "AI Tools",
    path: "/ai",
    icon: Bot,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r bg-white">
      {/* Logo */}

      <div className="flex h-20 items-center justify-center border-b">
        <h1 className="text-3xl font-extrabold text-blue-600">ResumeAI</h1>
      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-5">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.title}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <Icon size={20} />

              {menu.title}
            </NavLink>
          );
        })}
      </nav>

      {/* Upgrade Card */}

      <div className="m-5 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-5 text-white">
        <Sparkles className="mb-3" />

        <h3 className="font-bold">Upgrade to Pro</h3>

        <p className="mt-2 text-sm opacity-90">
          Unlock AI Resume Builder, ATS Pro, Unlimited Resume Downloads and
          Premium Templates.
        </p>

        <button className="mt-5 w-full rounded-xl bg-white py-2 font-semibold text-blue-600">
          Upgrade
        </button>
      </div>
    </aside>
  );
}
