import { Bell, Search, Plus, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store";

export default function Navbar() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const handleCreateResume = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/templates");
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-dark-border bg-card px-8">
      {/* Left */}

      <div className="flex items-center gap-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50"
          />

          <input
            placeholder="Search resumes..."
            className="h-11 w-80 rounded-xl border border-dark-border pl-11 pr-4 text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Create Resume */}

        <button
          onClick={handleCreateResume}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-dark"
        >
          <Plus size={18} />
          Create Resume
        </button>

        {/* Notifications */}

        <button className="relative rounded-xl border border-dark-border p-3 transition hover:bg-background">
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
        </button>

        {/* User */}

        <button className="flex items-center gap-3 rounded-xl border border-dark-border px-3 py-2 transition hover:bg-background">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-background">
            {user?.fullName?.charAt(0).toUpperCase() ?? "G"}
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold text-dark">
              {user?.fullName ?? "Guest"}
            </p>

            <p className="text-xs text-primary/70">
              {user ? "Free Plan" : "Guest"}
            </p>
          </div>

          <ChevronDown size={18} className="text-primary/70" />
        </button>
      </div>
    </header>
  );
}
