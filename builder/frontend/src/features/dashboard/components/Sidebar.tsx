import type { ElementType } from "react";

import {
  LayoutDashboard,
  FileText,
  Palette,
  Bot,
  BarChart3,
  Settings,
  Sparkles,
  User,
  Home,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuthStore } from "../../../store/auth.store";

type MenuRole = "public" | "user" | "admin";

interface Menu {
  title: string;
  path: string;
  icon: ElementType;
  roles: MenuRole[];
}

const menus: Menu[] = [
  // ================= PUBLIC =================

  {
    title: "Home",
    path: "/home",
    icon: Home,
    roles: ["public", "user", "admin"],
  },

  {
    title: "Templates",
    path: "/templates",
    icon: Palette,
    roles: ["public", "user", "admin"],
  },

  {
    title: "AI Tools",
    path: "/ai",
    icon: Bot,
    roles: ["public", "user", "admin"],
  },

  // ================= USER + ADMIN =================

  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["user", "admin"],
  },

  {
    title: "My Resumes",
    path: "/myresume",
    icon: FileText,
    roles: ["user", "admin"],
  },

  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
    roles: ["user", "admin"],
  },

  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["user", "admin"],
  },

  // ================= ADMIN ONLY =================

  {
    title: "Admin Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    roles: ["admin"],
  },

  {
    title: "View Users",
    path: "/admin/users",
    icon: User,
    roles: ["admin"],
  },
];

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);

  /*
   * If user exists:
   *    role = "user" or "admin"
   *
   * If user doesn't exist:
   *    role = "public"
   */
  const currentRole: MenuRole = user?.role ?? "public";

  /*
   * Show only menus allowed for the current role.
   */
  const visibleMenus = menus.filter((menu) => menu.roles.includes(currentRole));

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-primary/10 bg-card">
      {/* ================= LOGO ================= */}

      <div className="flex h-20 items-center justify-center border-b border-primary/10">
        <h1 className="text-3xl font-extrabold text-primary">ResumeAI</h1>
      </div>

      {/* ================= MENU ================= */}

      <nav className="flex-1 space-y-2 p-5">
        {visibleMenus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.title}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-primary text-background shadow-lg"
                    : "text-primary/70 hover:bg-background hover:text-primary"
                }`
              }
            >
              <Icon size={20} />

              <span>{menu.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* ================= UPGRADE CARD ================= */}

      {/* You can show this only for logged-in users if you want */}
      {user && (
        <div className="m-5 rounded-2xl bg-linear-to-r from-primary to-accent p-5 text-background">
          <Sparkles className="mb-3" />

          <h3 className="font-bold">Upgrade to Pro</h3>

          <p className="mt-2 text-sm opacity-90">
            Unlock AI Resume Builder, ATS Pro, Unlimited Resume Downloads and
            Premium Templates.
          </p>

          <button className="mt-5 w-full rounded-xl bg-background py-2 font-semibold text-primary">
            Upgrade
          </button>
        </div>
      )}
    </aside>
  );
}
