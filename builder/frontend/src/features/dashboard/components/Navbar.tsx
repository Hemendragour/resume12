import { Search, Plus, ChevronDown, Upload } from "lucide-react";
import { CiMenuBurger } from "react-icons/ci";

import { useAuthStore } from "../../../store/auth.store";
import NotificationDropdown from "../../notification/components/NotificationDropdown";
import type { QuickActions } from "../hooks/useQuickActions";

interface NavbarProps {
  onMenuClick: () => void;
  quickActions: QuickActions;
  /*
   * When true, always render the compact bar + hamburger, even at
   * the 1400px+ breakpoint where the full desktop bar would normally
   * take over. Used on pages whose own header already covers search
   * and quick actions, so the dashboard nav just needs to offer a
   * way to reach the sidebar without taking up permanent space.
   */
  forceCollapsed?: boolean;
}

export default function Navbar({
  onMenuClick,
  quickActions,
  forceCollapsed = false,
}: NavbarProps) {
  const user = useAuthStore((state) => state.user);

  const {
    handleCreateResume,
    handleCheckATSScore,
    handleOpenUploadResume,
    isCreatingAtsResume,
  } = quickActions;

  const initial = user?.fullName?.charAt(0).toUpperCase() ?? "G";

  return (
    <header className="sticky top-0 z-30 border-b border-section-light-border bg-section-light">
      {/* ================= MOBILE BAR ================= */}
      {/* Logo, notifications, profile, and the menu burger that opens the side nav */}

      <div
        className={`flex h-16 items-center justify-between px-4 ${
          forceCollapsed ? "" : "[@media(min-width:1400px)]:hidden"
        }`}
      >
        <h1 className="text-lg font-extrabold text-heading">ResumeAI</h1>

        <div className="flex items-center gap-2">
          <NotificationDropdown />

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-btn-dark text-15 font-bold text-on-dark-heading">
            {initial}
          </div>

          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-heading transition hover:bg-btn-utility-bg"
            aria-label="Open menu"
          >
            <CiMenuBurger size={22} />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP BAR ================= */}

      <div
        className={`${
          forceCollapsed
            ? "hidden"
            : "hidden h-20 items-center justify-between gap-4 px-6 [@media(min-width:1400px)]:flex xl:px-8"
        }`}
      >
        {/* Left */}

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-caption"
          />

          <input
            placeholder="Search resumes..."
            className="h-11 w-40 rounded-xl border border-btn-utility-border pl-11 pr-4 text-15 text-heading outline-none transition focus:border-eyebrow focus:ring-2 focus:ring-eyebrow/20 xl:w-80"
          />
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 xl:gap-3">
          {/* Create Resume */}

          <button
            onClick={handleCreateResume}
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-btn-dark px-3 py-2.5 text-15 font-semibold text-on-dark-heading transition hover:bg-btn-dark-hover xl:px-4"
          >
            <Plus size={18} />
            <span>Create Resume</span>
          </button>

          <button
            type="button"
            onClick={handleCheckATSScore}
            disabled={isCreatingAtsResume}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-btn-dark px-3 py-2.5 text-15 font-semibold text-on-dark-heading transition hover:bg-btn-dark-hover disabled:cursor-not-allowed disabled:opacity-50 xl:px-4"
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
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-btn-utility-border bg-btn-utility-bg px-3 py-2.5 text-15 font-semibold text-heading-alt transition hover:bg-section-light xl:px-4"
          >
            <Upload size={18} />
            <span>Upload Resume</span>
          </button>

          {/* Notifications */}

          <NotificationDropdown />

          {/* User */}

          <button className="flex items-center gap-2 rounded-xl px-2.5 py-2 transition hover:bg-btn-utility-bg">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-btn-dark text-15 font-bold text-on-dark-heading">
              {initial}
            </div>

            <div className="hidden text-left xl:block">
              <p className="text-15 font-semibold text-heading">
                {user?.fullName ?? "Guest"}
              </p>

              <p className="text-13 text-caption">
                {user ? "Free Plan" : "Guest"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-caption xl:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
