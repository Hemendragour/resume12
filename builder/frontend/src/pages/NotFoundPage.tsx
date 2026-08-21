import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-8xl font-extrabold text-primary">404</p>

        <h1 className="mt-4 text-3xl font-bold text-dark">Page Not Found</h1>

        <p className="mt-3 text-primary/70">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-xl border border-dark-border px-5 py-3 font-medium text-primary transition hover:bg-card"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to="/home"
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-background transition hover:opacity-90"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
