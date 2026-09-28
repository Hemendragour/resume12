// ATSSuggestions.tsx
import type { ATSRecommendation } from "../types/ats.types";

interface Props {
  recommendations: ATSRecommendation[];
  strengths: string[];
  weaknesses: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

function getPriorityClass(priority: ATSRecommendation["priority"]) {
  switch (priority) {
    case "critical":
      return "bg-red-600/15 text-red-600";

    case "high":
      return "bg-orange-500/15 text-orange-600";

    case "medium":
      return "bg-btn-hover-bg text-heading";

    case "low":
      return "bg-btn-hover-bg text-nav-text";

    default:
      return "bg-btn-hover-bg text-nav-text";
  }
}

export default function ATSSuggestions({
  recommendations,
  strengths,
  weaknesses,
  matchedKeywords,
  missingKeywords,
}: Props) {
  return (
    <div className="mt-6 space-y-6">
      {/* ================================================== */}
      {/* RECOMMENDATIONS */}
      {/* ================================================== */}

      <section className="rounded-2xl bg-navbar p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-heading">ATS Improvements</h2>

          <p className="mt-1 text-sm text-nav-text">
            Actionable recommendations to improve your resume.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {recommendations.length === 0 ? (
            <div className="rounded-xl bg-green-700/10 p-4">
              <p className="text-sm font-medium text-green-700">
                No major ATS improvements detected.
              </p>
            </div>
          ) : (
            recommendations.map((recommendation, index) => (
              <div
                key={recommendation.id ?? `${recommendation.title}-${index}`}
                className="rounded-xl bg-navbar-hover p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-heading">
                      {recommendation.title}
                    </h3>

                    <p className="mt-1 text-sm text-nav-text">
                      {recommendation.description}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPriorityClass(
                      recommendation.priority,
                    )}`}
                  >
                    {recommendation.priority}
                  </span>
                </div>

                {/* Category */}

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-btn-hover-bg px-2 py-1 text-xs font-medium text-nav-text">
                    {recommendation.category}
                  </span>

                  {typeof recommendation.impact === "number" && (
                    <span className="rounded-md bg-btn-hover-bg px-2 py-1 text-xs font-medium text-subheading">
                      Impact: {recommendation.impact}/100
                    </span>
                  )}
                </div>

                {/* Evidence */}

                {recommendation.evidence && (
                  <div className="mt-4 rounded-lg bg-navbar-hover p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-heading/40">
                      Evidence
                    </p>

                    <p className="mt-1 text-sm text-nav-text">
                      {recommendation.evidence}
                    </p>
                  </div>
                )}

                {/* Suggested Fix */}

                {recommendation.suggestedFix && (
                  <div className="mt-3 rounded-lg bg-btn-hover-bg p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-subheading">
                      Suggested Fix
                    </p>

                    <p className="mt-1 text-sm text-heading">
                      {recommendation.suggestedFix}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* ================================================== */}
      {/* STRENGTHS */}
      {/* ================================================== */}

      <section className="rounded-2xl bg-navbar p-6 shadow-sm">
        <h2 className="text-xl font-bold text-heading">Resume Strengths</h2>

        <div className="mt-4">
          {strengths.length === 0 ? (
            <p className="text-sm text-heading/60">
              No strengths identified yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li
                  key={`${strength}-${index}`}
                  className="flex gap-3 text-sm text-nav-text"
                >
                  <span className="font-semibold text-green-700">✓</span>

                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ================================================== */}
      {/* WEAKNESSES */}
      {/* ================================================== */}

      <section className="rounded-2xl bg-navbar p-6 shadow-sm">
        <h2 className="text-xl font-bold text-heading">Areas to Improve</h2>

        <div className="mt-4">
          {weaknesses.length === 0 ? (
            <p className="text-sm text-green-700">
              No major weaknesses identified.
            </p>
          ) : (
            <ul className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <li
                  key={`${weakness}-${index}`}
                  className="flex gap-3 text-sm text-nav-text"
                >
                  <span className="font-semibold text-red-600">!</span>

                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ================================================== */}
      {/* KEYWORDS */}
      {/* ================================================== */}

      <section className="rounded-2xl bg-navbar p-6 shadow-sm">
        <h2 className="text-xl font-bold text-heading">Keyword Analysis</h2>

        {/* Matched */}

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-green-700">
            Matched Keywords
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {matchedKeywords.length === 0 ? (
              <p className="text-sm text-heading/60">
                No matched keywords available.
              </p>
            ) : (
              matchedKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-green-700/10 px-3 py-1 text-xs font-medium text-green-700"
                >
                  {keyword}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Missing */}

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-red-600">
            Missing Keywords
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {missingKeywords.length === 0 ? (
              <p className="text-sm text-green-700">
                No important missing keywords detected.
              </p>
            ) : (
              missingKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-red-600/10 px-3 py-1 text-xs font-medium text-red-600"
                >
                  {keyword}
                </span>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
