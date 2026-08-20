// interface Props {
//   missingSections: string[];
//   suggestions: string[];
// }

// export default function ATSSuggestions({
//   missingSections,
//   suggestions,
// }: Props) {
//   return (
//     <div className="mt-6 rounded-2xl border bg-white p-6">
//       <h2 className="text-xl font-bold">ATS Improvements</h2>

//       {/* Missing Sections */}

//       <div className="mt-6">
//         <h3 className="font-semibold text-red-600">Missing Sections</h3>

//         <ul className="mt-3 space-y-2">
//           {missingSections.length === 0 ? (
//             <li className="text-green-600">✅ No missing sections</li>
//           ) : (
//             missingSections.map((item) => (
//               <li key={item} className="text-sm text-gray-600">
//                 ❌ {item}
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//       {/* Suggestions */}

//       <div className="mt-8">
//         <h3 className="font-semibold text-blue-600">Suggestions</h3>

//         <ul className="mt-3 space-y-2">
//           {suggestions.map((item) => (
//             <li key={item} className="text-sm text-gray-600">
//               💡 {item}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// import type {
//   ATSRecommendation,
// } from "../types/ats.types";

// interface Props {
//   recommendations: ATSRecommendation[];
//   strengths: string[];
//   weaknesses: string[];
//   matchedKeywords: string[];
//   missingKeywords: string[];
// }

// function getPriorityClass(
//   priority: ATSRecommendation["priority"]
// ) {
//   switch (priority) {
//     case "critical":
//       return "bg-red-100 text-red-700";

//     case "high":
//       return "bg-orange-100 text-orange-700";

//     case "medium":
//       return "bg-yellow-100 text-yellow-700";

//     case "low":
//       return "bg-slate-100 text-slate-600";

//     default:
//       return "bg-slate-100 text-slate-600";
//   }
// }

// export default function ATSSuggestions({
//   recommendations,
//   strengths,
//   weaknesses,
//   matchedKeywords,
//   missingKeywords,
// }: Props) {
//   return (
//     <div className="mt-6 space-y-6">

//       {/* ================================================== */}
//       {/* RECOMMENDATIONS */}
//       {/* ================================================== */}

//       <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//         <div>
//           <h2 className="text-xl font-bold text-slate-900">
//             ATS Improvements
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Actionable recommendations to improve your resume.
//           </p>
//         </div>

//         <div className="mt-6 space-y-4">

//           {recommendations.length === 0 ? (
//             <div className="rounded-xl bg-green-50 p-4">
//               <p className="text-sm font-medium text-green-700">
//                 No major ATS improvements detected.
//               </p>
//             </div>
//           ) : (
//             recommendations.map(
//               (recommendation, index) => (
//                 <div
//                   key={
//                     recommendation.id ??
//                     `${recommendation.title}-${index}`
//                   }
//                   className="rounded-xl border border-slate-200 p-4"
//                 >

//                   <div className="flex flex-wrap items-start justify-between gap-3">

//                     <div>
//                       <h3 className="font-semibold text-slate-900">
//                         {recommendation.title}
//                       </h3>

//                       <p className="mt-1 text-sm text-slate-600">
//                         {recommendation.description}
//                       </p>
//                     </div>

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPriorityClass(
//                         recommendation.priority
//                       )}`}
//                     >
//                       {recommendation.priority}
//                     </span>

//                   </div>

//                   {/* Category */}

//                   <div className="mt-3 flex flex-wrap gap-2">

//                     <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
//                       {recommendation.category}
//                     </span>

//                     {typeof recommendation.impact ===
//                       "number" && (
//                       <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
//                         Impact:{" "}
//                         {recommendation.impact}/100
//                       </span>
//                     )}

//                   </div>

//                   {/* Evidence */}

//                   {recommendation.evidence && (
//                     <div className="mt-4 rounded-lg bg-slate-50 p-3">
//                       <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
//                         Evidence
//                       </p>

//                       <p className="mt-1 text-sm text-slate-600">
//                         {recommendation.evidence}
//                       </p>
//                     </div>
//                   )}

//                   {/* Suggested Fix */}

//                   {recommendation.suggestedFix && (
//                     <div className="mt-3 rounded-lg bg-blue-50 p-3">
//                       <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
//                         Suggested Fix
//                       </p>

//                       <p className="mt-1 text-sm text-blue-800">
//                         {recommendation.suggestedFix}
//                       </p>
//                     </div>
//                   )}

//                 </div>
//               )
//             )
//           )}

//         </div>
//       </section>

//       {/* ================================================== */}
//       {/* STRENGTHS */}
//       {/* ================================================== */}

//       <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//         <h2 className="text-xl font-bold text-slate-900">
//           Resume Strengths
//         </h2>

//         <div className="mt-4">

//           {strengths.length === 0 ? (
//             <p className="text-sm text-slate-500">
//               No strengths identified yet.
//             </p>
//           ) : (
//             <ul className="space-y-3">
//               {strengths.map(
//                 (strength, index) => (
//                   <li
//                     key={`${strength}-${index}`}
//                     className="flex gap-3 text-sm text-slate-600"
//                   >
//                     <span className="font-semibold text-green-600">
//                       ✓
//                     </span>

//                     <span>
//                       {strength}
//                     </span>
//                   </li>
//                 )
//               )}
//             </ul>
//           )}

//         </div>
//       </section>

//       {/* ================================================== */}
//       {/* WEAKNESSES */}
//       {/* ================================================== */}

//       <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//         <h2 className="text-xl font-bold text-slate-900">
//           Areas to Improve
//         </h2>

//         <div className="mt-4">

//           {weaknesses.length === 0 ? (
//             <p className="text-sm text-green-600">
//               No major weaknesses identified.
//             </p>
//           ) : (
//             <ul className="space-y-3">
//               {weaknesses.map(
//                 (weakness, index) => (
//                   <li
//                     key={`${weakness}-${index}`}
//                     className="flex gap-3 text-sm text-slate-600"
//                   >
//                     <span className="font-semibold text-red-500">
//                       !
//                     </span>

//                     <span>
//                       {weakness}
//                     </span>
//                   </li>
//                 )
//               )}
//             </ul>
//           )}

//         </div>
//       </section>

//       {/* ================================================== */}
//       {/* KEYWORDS */}
//       {/* ================================================== */}

//       <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//         <h2 className="text-xl font-bold text-slate-900">
//           Keyword Analysis
//         </h2>

//         {/* Matched */}

//         <div className="mt-5">

//           <h3 className="text-sm font-semibold text-green-700">
//             Matched Keywords
//           </h3>

//           <div className="mt-3 flex flex-wrap gap-2">

//             {matchedKeywords.length === 0 ? (
//               <p className="text-sm text-slate-500">
//                 No matched keywords available.
//               </p>
//             ) : (
//               matchedKeywords.map(
//                 (keyword) => (
//                   <span
//                     key={keyword}
//                     className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
//                   >
//                     {keyword}
//                   </span>
//                 )
//               )
//             )}

//           </div>
//         </div>

//         {/* Missing */}

//         <div className="mt-6">

//           <h3 className="text-sm font-semibold text-red-700">
//             Missing Keywords
//           </h3>

//           <div className="mt-3 flex flex-wrap gap-2">

//             {missingKeywords.length === 0 ? (
//               <p className="text-sm text-green-600">
//                 No important missing keywords detected.
//               </p>
//             ) : (
//               missingKeywords.map(
//                 (keyword) => (
//                   <span
//                     key={keyword}
//                     className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
//                   >
//                     {keyword}
//                   </span>
//                 )
//               )
//             )}

//           </div>
//         </div>

//       </section>

//     </div>
//   );
// }

// color changed

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
      return "bg-danger/15 text-danger";

    case "high":
      return "bg-warning/15 text-warning";

    case "medium":
      return "bg-accent/20 text-dark";

    case "low":
      return "bg-primary/10 text-primary/70";

    default:
      return "bg-primary/10 text-primary/70";
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

      <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-dark">ATS Improvements</h2>

          <p className="mt-1 text-sm text-primary/70">
            Actionable recommendations to improve your resume.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {recommendations.length === 0 ? (
            <div className="rounded-xl bg-success/10 p-4">
              <p className="text-sm font-medium text-success">
                No major ATS improvements detected.
              </p>
            </div>
          ) : (
            recommendations.map((recommendation, index) => (
              <div
                key={recommendation.id ?? `${recommendation.title}-${index}`}
                className="rounded-xl border border-primary/10 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-dark">
                      {recommendation.title}
                    </h3>

                    <p className="mt-1 text-sm text-primary/70">
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
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary/70">
                    {recommendation.category}
                  </span>

                  {typeof recommendation.impact === "number" && (
                    <span className="rounded-md bg-accent/15 px-2 py-1 text-xs font-medium text-primary">
                      Impact: {recommendation.impact}/100
                    </span>
                  )}
                </div>

                {/* Evidence */}

                {recommendation.evidence && (
                  <div className="mt-4 rounded-lg bg-background p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary/40">
                      Evidence
                    </p>

                    <p className="mt-1 text-sm text-primary/70">
                      {recommendation.evidence}
                    </p>
                  </div>
                )}

                {/* Suggested Fix */}

                {recommendation.suggestedFix && (
                  <div className="mt-3 rounded-lg bg-accent/10 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Suggested Fix
                    </p>

                    <p className="mt-1 text-sm text-dark">
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

      <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold text-dark">Resume Strengths</h2>

        <div className="mt-4">
          {strengths.length === 0 ? (
            <p className="text-sm text-primary/60">
              No strengths identified yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li
                  key={`${strength}-${index}`}
                  className="flex gap-3 text-sm text-primary/70"
                >
                  <span className="font-semibold text-success">✓</span>

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

      <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold text-dark">Areas to Improve</h2>

        <div className="mt-4">
          {weaknesses.length === 0 ? (
            <p className="text-sm text-success">
              No major weaknesses identified.
            </p>
          ) : (
            <ul className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <li
                  key={`${weakness}-${index}`}
                  className="flex gap-3 text-sm text-primary/70"
                >
                  <span className="font-semibold text-danger">!</span>

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

      <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold text-dark">Keyword Analysis</h2>

        {/* Matched */}

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-success">
            Matched Keywords
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {matchedKeywords.length === 0 ? (
              <p className="text-sm text-primary/60">
                No matched keywords available.
              </p>
            ) : (
              matchedKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success"
                >
                  {keyword}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Missing */}

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-danger">
            Missing Keywords
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {missingKeywords.length === 0 ? (
              <p className="text-sm text-success">
                No important missing keywords detected.
              </p>
            ) : (
              missingKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-danger/10 px-3 py-1 text-xs font-medium text-danger"
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
