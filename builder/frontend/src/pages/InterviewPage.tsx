import { Bot, CalendarCheck2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InterviewPage() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Interview Prep</h1>
        <p className="mt-2 text-primary/70">
          Practice with AI-generated questions or book a session with a
          placement expert — the choice is yours.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <button
          onClick={() => navigate("/interview/ai")}
          className="rounded-2xl border border-primary/10 bg-card p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
            <Bot size={24} className="text-primary" />
          </div>

          <h3 className="text-lg font-semibold text-dark">
            Give Interview with AI
          </h3>

          <p className="mt-2 text-sm text-primary/70">
            Get personalised interview questions and instant feedback based on
            your resume and target role.
          </p>
        </button>

        <button
          // TODO: wire up booking flow when that page is built
          className="rounded-2xl border border-primary/10 bg-card p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
            <CalendarCheck2 size={24} className="text-primary" />
          </div>

          <h3 className="text-lg font-semibold text-dark">
            Book a Session
          </h3>

          <p className="mt-2 text-sm text-primary/70">
            Talk to a placement expert for 1:1 mock interviews and career
            guidance.
          </p>
        </button>
      </div>
    </section>
  );
}
