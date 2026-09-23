import { Search, Plus, ChevronDown, Upload } from "lucide-react";
import { CiMenuBurger } from "react-icons/ci";

import { useAuthStore } from "../../../store/auth.store";
import NotificationDropdown from "../../notification/components/NotificationDropdown";
import type { QuickActions } from "../hooks/useQuickActions";

interface NavbarProps {
  onMenuClick: () => void;
  quickActions: QuickActions;
}

export default function Navbar({ onMenuClick, quickActions }: NavbarProps) {
  const user = useAuthStore((state) => state.user);

  const {
    handleCreateResume,
    handleCheckATSScore,
    handleOpenUploadResume,
    isCreatingAtsResume,
  } = quickActions;

  const initial = user?.fullName?.charAt(0).toUpperCase() ?? "G";

  return (
    <header className="sticky top-0 z-30 border-b border-primary/10 bg-card">
      {/* ================= MOBILE BAR ================= */}
      {/* Logo, notifications, profile, and the menu burger that opens the side nav */}

      <div className="flex h-16 items-center justify-between px-4 lg:hidden">
        <h1 className="text-lg font-extrabold text-primary">ResumeAI</h1>

        <div className="flex items-center gap-2">
          <NotificationDropdown />

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
            {initial}
          </div>

          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-primary transition hover:bg-background"
            aria-label="Open menu"
          >
            <CiMenuBurger size={22} />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP BAR ================= */}

      <div className="hidden h-20 items-center justify-between gap-4 px-6 lg:flex xl:px-8">
        {/* Left */}

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50"
          />

          <input
            placeholder="Search resumes..."
            className="h-11 w-64 rounded-xl border border-primary/50 pl-11 pr-4 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 xl:w-80"
          />
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          {/* Create Resume */}

          <button
            onClick={handleCreateResume}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-background transition hover:bg-dark"
          >
            <Plus size={18} />
            <span className="hidden xl:inline">Create Resume</span>
          </button>

          <button
            type="button"
            onClick={handleCheckATSScore}
            disabled={isCreatingAtsResume}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreatingAtsResume ? (
              "Preparing..."
            ) : (
              <>
                <span className="hidden xl:inline">Check ATS Score</span>
                <span className="xl:hidden">ATS</span>
              </>
            )}
          </button>

          {/* Upload Resume */}

          <button
            type="button"
            onClick={handleOpenUploadResume}
            className="inline-flex items-center gap-2 rounded-xl border border-primary/50 px-4 py-2.5 text-sm font-semibold text-dark transition hover:bg-background"
          >
            <Upload size={18} />
            <span className="hidden xl:inline">Upload Resume</span>
          </button>

          {/* Notifications */}

          <NotificationDropdown />

          {/* User */}

          <button className="flex items-center gap-2 rounded-xl px-2.5 py-2 transition hover:bg-background">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
              {initial}
            </div>

            <div className="hidden text-left xl:block">
              <p className="text-sm font-semibold text-dark">
                {user?.fullName ?? "Guest"}
              </p>

              <p className="text-xs text-primary/70">
                {user ? "Free Plan" : "Guest"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-primary/70 xl:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
