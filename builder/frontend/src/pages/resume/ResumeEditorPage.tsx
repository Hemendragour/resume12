// import {
//   useEffect,
//   useState,
// } from "react";

// import { useResume } from "../../features/resume/editor/hooks/useResume";
// import { useAutoSave } from "../../features/resume/editor/hooks/useAutoSave";

// import EditorHeader from "../../features/resume/editor/components/EditorHeader";
// import EditorSidebar from "../../features/resume/editor/components/EditorSidebar";
// import PreviewPanel from "../../features/resume/editor/components/PreviewPanel";
// import DynamicEditorRenderer from "../../features/resume/editor/components/DynamicEditorRenderer";

// import ResumeCompletionCard from "../../features/resume/components/ResumeCompletionCard";
// import { useResumeCompletion } from "../../features/resume/hooks/useResumeCompletion";
// import ExportPdfButton from "../../features/resume/components/ExportPdfButton";

// import ATSScoreCard from "../../features/ats/components/ATSScoreCard";
// import ATSSuggestions from "../../features/ats/components/ATSSuggestions";

// import {
//   useLatestATS,
//   useAnalyzeATS,
// } from "../../features/ats/hooks/useATSScore";

// export default function ResumeEditorPage() {
//   const [activeSection, setActiveSection] =
//     useState("personal");

//   // ============================================================
//   // RESUME
//   // ============================================================

//   const {
//     loading,
//     resume,
//     resumeId,
//   } = useResume();

//   const saveStatus = useAutoSave();

//   // ============================================================
//   // ATS
//   // ============================================================

//   const {
//     data: atsResponse,
//     isLoading: isATSLoading,
//     isError: isATSError,
//   } = useLatestATS(resumeId);

//   const {
//     mutate: analyzeATS,
//     isPending: isAnalyzingATS,
//     isError: isAnalyzeError,
//   } = useAnalyzeATS();

//   const ats =
//     atsResponse?.data ?? null;

//   // ============================================================
//   // TARGET ROLE
//   // ============================================================

//   const [targetRole, setTargetRole] =
//     useState("");

//   useEffect(() => {
//     if (!resume) return;

//     const resumeWithTargetRole =
//       resume as typeof resume & {
//         targetRole?: string;
//       };

//     if (
//       typeof resumeWithTargetRole.targetRole ===
//         "string" &&
//       resumeWithTargetRole.targetRole.trim()
//     ) {
//       setTargetRole(
//         resumeWithTargetRole.targetRole.trim()
//       );
//     }
//   }, [resume]);

//   // ============================================================
//   // RESUME COMPLETION
//   // ============================================================

//   const completion =
//     useResumeCompletion();

//   // ============================================================
//   // ANALYZE ATS
//   // ============================================================

//   const handleAnalyzeATS = () => {
//     if (!resumeId) {
//       return;
//     }

//     const cleanTargetRole =
//       targetRole.trim();

//     if (!cleanTargetRole) {
//       return;
//     }

//     analyzeATS({
//       resumeId,

//       targetRole:
//         cleanTargetRole,

//       options: {
//         includeAIAnalysis: true,

//         includeOptimizedSummary: true,

//         includeImprovedExperience: true,

//         includeKeywordAnalysis: true,

//         includeSemanticAnalysis: true,

//         includeParseabilityAnalysis: true,

//         includeContentQualityAnalysis: true,

//         includeDateConsistencyAnalysis: true,

//         includeSeniorityAnalysis: true,
//       },
//     });
//   };

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading) {
//     return (
//       <div className="flex h-[calc(100vh-112px)] items-center justify-center rounded-2xl bg-white shadow-sm">
//         <p className="text-lg font-medium text-gray-600">
//           Loading Resume...
//         </p>
//       </div>
//     );
//   }

//   // ============================================================
//   // MAIN EDITOR
//   // ============================================================

//   return (
//     <div className="flex min-h-[calc(100vh-112px)] flex-col rounded-2xl bg-white shadow-sm">

//       {/* ====================================================== */}
//       {/* HEADER */}
//       {/* ====================================================== */}

//       <EditorHeader
//         title={
//           resume?.title ??
//           "Untitled Resume"
//         }
//         saveStatus={saveStatus}
//       />

//       {/* ====================================================== */}
//       {/* TOP ACTION BAR */}
//       {/* ====================================================== */}

//       <div className="flex flex-wrap items-center justify-end gap-3 border-b bg-white px-6 py-3">

//         {/* ==================================================== */}
//         {/* TARGET ROLE */}
//         {/* ==================================================== */}

//         <div className="flex items-center gap-2">

//           <input
//             type="text"
//             value={targetRole}
//             onChange={(event) =>
//               setTargetRole(
//                 event.target.value
//               )
//             }
//             placeholder="Target role"
//             className="w-48 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
//           />

//         </div>

//         {/* ==================================================== */}
//         {/* ANALYZE ATS BUTTON */}
//         {/* ==================================================== */}

//         <button
//           type="button"
//           onClick={handleAnalyzeATS}
//           disabled={
//             !resumeId ||
//             !targetRole.trim() ||
//             isAnalyzingATS
//           }
//           className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
//         >

//           {isAnalyzingATS && (
//             <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//           )}

//           {isAnalyzingATS
//             ? "Analyzing..."
//             : "Analyze Resume"}

//         </button>

//         {/* ==================================================== */}
//         {/* ATS LOADING */}
//         {/* ==================================================== */}

//         {isATSLoading && (
//           <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">

//             <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />

//             <span className="text-sm text-slate-500">
//               Loading ATS...
//             </span>

//           </div>
//         )}

//         {/* ==================================================== */}
//         {/* ATS SCORE */}
//         {/* ==================================================== */}

//         {!isATSLoading && ats && (
//           <ATSScoreCard
//             score={ats.atsScore}
//             grade={ats.grade}
//           />
//         )}

//         {/* ==================================================== */}
//         {/* NO ANALYSIS */}
//         {/* ==================================================== */}

//         {!isATSLoading &&
//           !ats &&
//           !isATSError && (
//             <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">

//               <p className="text-sm font-medium text-slate-600">
//                 ATS analysis not available yet
//               </p>

//             </div>
//           )}

//         {/* ==================================================== */}
//         {/* ATS GET ERROR */}
//         {/* ==================================================== */}

//         {isATSError && (
//           <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2">

//             <p className="text-sm font-medium text-red-600">
//               Unable to load ATS analysis.
//             </p>

//           </div>
//         )}

//         {/* ==================================================== */}
//         {/* ATS ANALYZE ERROR */}
//         {/* ==================================================== */}

//         {isAnalyzeError && (
//           <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2">

//             <p className="text-sm font-medium text-red-600">
//               ATS analysis failed. Please try again.
//             </p>

//           </div>
//         )}

//         {/* ==================================================== */}
//         {/* EXPORT PDF */}
//         {/* ==================================================== */}

//         {resume && (
//           <ExportPdfButton />
//         )}

//       </div>

//       {/* ====================================================== */}
//       {/* RESUME COMPLETION */}
//       {/* ====================================================== */}

//       {completion && (
//         <ResumeCompletionCard
//           percentage={
//             completion.percentage
//           }
//           missing={
//             completion.missing
//           }
//         />
//       )}

//       {/* ====================================================== */}
//       {/* EDITOR WORKSPACE */}
//       {/* ====================================================== */}

//       <div className="flex flex-1 overflow-hidden">

//         {/* ==================================================== */}
//         {/* LEFT SIDEBAR */}
//         {/* ==================================================== */}

//         <EditorSidebar
//           activeSection={
//             activeSection
//           }
//           onSectionChange={
//             setActiveSection
//           }
//         />

//         {/* ==================================================== */}
//         {/* CENTER EDITOR */}
//         {/* ==================================================== */}

//         <main className="flex-1 overflow-y-auto bg-slate-50 p-8">

//           <div className="mx-auto max-w-3xl">

//             <div className="rounded-2xl border bg-white p-8 shadow-sm">

//               <h2 className="mb-2 text-2xl font-bold capitalize">
//                 {activeSection}
//               </h2>

//               <p className="mb-8 text-gray-500">
//                 Fill this section of your resume.
//               </p>

//               {/* ================================================= */}
//               {/* DYNAMIC EDITOR */}
//               {/* ================================================= */}

//               <DynamicEditorRenderer
//                 activeSection={
//                   activeSection
//                 }
//               />

//             </div>

//           </div>

//         </main>

//         {/* ==================================================== */}
//         {/* RIGHT PREVIEW */}
//         {/* ==================================================== */}

//         <PreviewPanel />

//       </div>

//       {/* ====================================================== */}
//       {/* ATS ANALYSIS */}
//       {/* ====================================================== */}

//       {ats && (
//         <section className="border-t bg-slate-50 px-6 py-8">

//           <div className="mx-auto max-w-7xl">

//             {/* ================================================= */}
//             {/* ATS HEADER */}
//             {/* ================================================= */}

//             <div className="mb-6">

//               <div className="flex flex-wrap items-end justify-between gap-4">

//                 <div>

//                   <h2 className="text-2xl font-bold text-slate-900">
//                     ATS Analysis
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Detailed analysis of your resume based on
//                     the latest ATS evaluation.
//                   </p>

//                 </div>

//                 <div className="text-right">

//                   <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                     Target Role
//                   </p>

//                   <p className="mt-1 text-sm font-semibold text-slate-700">
//                     {targetRole || "Not specified"}
//                   </p>

//                 </div>

//               </div>

//             </div>

//             {/* ================================================= */}
//             {/* ATS DETAILS */}
//             {/* ================================================= */}

//             <ATSSuggestions
//               recommendations={
//                 ats.recommendations
//               }
//               strengths={
//                 ats.strengths
//               }
//               weaknesses={
//                 ats.weaknesses
//               }
//               matchedKeywords={
//                 ats.matchedKeywords
//               }
//               missingKeywords={
//                 ats.missingKeywords
//               }
//             />

//           </div>

//         </section>
//       )}

//     </div>
//   );
// }

// ================  ORG CODE ==================

// import { useEffect, useState } from "react";

// import { useResume } from "../../features/resume/editor/hooks/useResume";
// import { useAutoSave } from "../../features/resume/editor/hooks/useAutoSave";

// import EditorHeader from "../../features/resume/editor/components/EditorHeader";
// import EditorSidebar from "../../features/resume/editor/components/EditorSidebar";
// import PreviewPanel from "../../features/resume/editor/components/PreviewPanel";
// import DynamicEditorRenderer from "../../features/resume/editor/components/DynamicEditorRenderer";

// import ResumeCompletionCard from "../../features/resume/components/ResumeCompletionCard";
// import { useResumeCompletion } from "../../features/resume/hooks/useResumeCompletion";
// import ExportPdfButton from "../../features/resume/components/ExportPdfButton";

// import ATSScoreCard from "../../features/ats/components/ATSScoreCard";
// import ATSSuggestions from "../../features/ats/components/ATSSuggestions";

// import {
//   useLatestATS,
//   useAnalyzeATS,
// } from "../../features/ats/hooks/useATSScore";

// export default function ResumeEditorPage() {
//   const [activeSection, setActiveSection] = useState("personal");

//   // ============================================================
//   // RESUME
//   // ============================================================

//   const { loading, resume, resumeId } = useResume();

//   const saveStatus = useAutoSave();

//   // ============================================================
//   // ATS
//   // ============================================================

//   const {
//     data: atsResponse,
//     isLoading: isATSLoading,
//     isError: isATSError,
//   } = useLatestATS(resumeId);

//   const {
//     mutate: analyzeATS,
//     isPending: isAnalyzingATS,
//     isError: isAnalyzeError,
//     isSuccess: isAnalyzeSuccess,
//   } = useAnalyzeATS();

//   const ats = atsResponse?.data ?? null;

//   // ============================================================
//   // TARGET ROLE
//   // ============================================================

//   const [targetRole, setTargetRole] = useState("");

//   useEffect(() => {
//     if (!resume) return;

//     const resumeWithTargetRole = resume as typeof resume & {
//       targetRole?: string;
//     };

//     if (
//       typeof resumeWithTargetRole.targetRole === "string" &&
//       resumeWithTargetRole.targetRole.trim()
//     ) {
//       setTargetRole(resumeWithTargetRole.targetRole.trim());
//     }
//   }, [resume]);

//   // ============================================================
//   // JOB DESCRIPTION
//   // ============================================================

//   const [jobDescription, setJobDescription] = useState("");

//   // ============================================================
//   // RESUME COMPLETION
//   // ============================================================

//   const completion = useResumeCompletion();

//   // ============================================================
//   // ANALYZE ATS
//   // ============================================================

//   const handleAnalyzeATS = () => {
//     if (!resumeId) {
//       return;
//     }

//     const cleanTargetRole = targetRole.trim();

//     const cleanJobDescription = jobDescription.trim();

//     // Target role is required
//     if (!cleanTargetRole) {
//       return;
//     }

//     // JD is optional.
//     // If empty, backend can still perform general ATS analysis.
//     analyzeATS({
//       resumeId,

//       targetRole: cleanTargetRole,

//       jobDescription: cleanJobDescription,

//       options: {
//         includeAIAnalysis: true,

//         includeOptimizedSummary: true,

//         includeImprovedExperience: true,

//         includeKeywordAnalysis: true,

//         includeSemanticAnalysis: true,

//         includeParseabilityAnalysis: true,

//         includeContentQualityAnalysis: true,

//         includeDateConsistencyAnalysis: true,

//         includeSeniorityAnalysis: true,
//       },
//     });
//   };

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading) {
//     return (
//       <div className="flex h-[calc(100vh-112px)] items-center justify-center rounded-2xl bg-white shadow-sm">
//         <p className="text-lg font-medium text-gray-600">Loading Resume...</p>
//       </div>
//     );
//   }

//   // ============================================================
//   // MAIN EDITOR
//   // ============================================================

//   return (
//     <div className="flex min-h-[calc(100vh-112px)] flex-col rounded-2xl bg-white shadow-sm">
//       {/* ====================================================== */}
//       {/* HEADER */}
//       {/* ====================================================== */}

//       <EditorHeader
//         title={resume?.title ?? "Untitled Resume"}
//         saveStatus={saveStatus}
//       />

//       {/* ====================================================== */}
//       {/* ATS CONTROL BAR */}
//       {/* ====================================================== */}

//       <div className="border-b bg-white px-6 py-4">
//         <div className="flex flex-wrap items-center justify-end gap-3">
//           {/* ================================================== */}
//           {/* TARGET ROLE */}
//           {/* ================================================== */}

//           <input
//             type="text"
//             value={targetRole}
//             onChange={(event) => setTargetRole(event.target.value)}
//             placeholder="Target role e.g. Backend Developer"
//             className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
//           />

//           {/* ================================================== */}
//           {/* ANALYZE BUTTON */}
//           {/* ================================================== */}

//           <button
//             type="button"
//             onClick={handleAnalyzeATS}
//             disabled={!resumeId || !targetRole.trim() || isAnalyzingATS}
//             className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {isAnalyzingATS && (
//               <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//             )}

//             {isAnalyzingATS ? "Analyzing..." : "Analyze ATS"}
//           </button>

//           {/* ================================================== */}
//           {/* ATS LOADING */}
//           {/* ================================================== */}

//           {isATSLoading && (
//             <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
//               <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />

//               <span className="text-sm text-slate-500">Loading ATS...</span>
//             </div>
//           )}

//           {/* ================================================== */}
//           {/* ATS SCORE */}
//           {/* ================================================== */}

//           {!isATSLoading && ats && (
//             <ATSScoreCard score={ats.atsScore} grade={ats.grade} />
//           )}

//           {/* ================================================== */}
//           {/* NO ATS ANALYSIS */}
//           {/* ================================================== */}

//           {!isATSLoading && !ats && !isATSError && (
//             <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
//               <p className="text-sm font-medium text-slate-600">
//                 ATS analysis not available yet
//               </p>
//             </div>
//           )}

//           {/* ================================================== */}
//           {/* GET ATS ERROR */}
//           {/* ================================================== */}

//           {isATSError && (
//             <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2">
//               <p className="text-sm font-medium text-red-600">
//                 Unable to load ATS analysis.
//               </p>
//             </div>
//           )}

//           {/* ================================================== */}
//           {/* ANALYZE ERROR */}
//           {/* ================================================== */}

//           {isAnalyzeError && (
//             <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2">
//               <p className="text-sm font-medium text-red-600">
//                 ATS analysis failed. Please try again.
//               </p>
//             </div>
//           )}

//           {/* ================================================== */}
//           {/* SUCCESS */}
//           {/* ================================================== */}

//           {isAnalyzeSuccess && (
//             <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2">
//               <p className="text-sm font-medium text-green-700">
//                 ATS analysis completed successfully.
//               </p>
//             </div>
//           )}

//           {/* ================================================== */}
//           {/* EXPORT PDF */}
//           {/* ================================================== */}

//           {resume && <ExportPdfButton />}
//         </div>
//       </div>

//       {/* ====================================================== */}
//       {/* JOB DESCRIPTION */}
//       {/* ====================================================== */}

//       <section className="border-b bg-slate-50 px-6 py-6">
//         <div className="mx-auto max-w-7xl">
//           <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//             {/* ================================================== */}
//             {/* JD HEADER */}
//             {/* ================================================== */}

//             <div className="mb-5">
//               <div className="flex flex-wrap items-start justify-between gap-4">
//                 <div>
//                   <h2 className="text-xl font-bold text-slate-900">
//                     Job Description
//                   </h2>

//                   <p className="mt-1 max-w-2xl text-sm text-slate-500">
//                     Paste the job description to get a job-specific ATS score,
//                     keyword matching, missing keywords and recommendations.
//                   </p>
//                 </div>

//                 <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
//                   Optional
//                 </span>
//               </div>
//             </div>

//             {/* ================================================== */}
//             {/* JD TEXTAREA */}
//             {/* ================================================== */}

//             <textarea
//               value={jobDescription}
//               onChange={(event) => setJobDescription(event.target.value)}
//               placeholder={`Paste the complete job description here...

// Example:

// We are looking for a Backend Developer with experience in Node.js, Express.js, MongoDB, REST APIs and AWS.

// Requirements:
// - Strong JavaScript / TypeScript knowledge
// - Node.js and Express
// - MongoDB
// - REST API development
// - Git and GitHub
// - Good problem solving skills`}
//               className="min-h-[220px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
//             />

//             {/* ================================================== */}
//             {/* JD FOOTER */}
//             {/* ================================================== */}

//             <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
//               <p className="text-xs text-slate-400">
//                 {jobDescription.length.toLocaleString()} characters
//               </p>

//               {jobDescription.trim() && (
//                 <button
//                   type="button"
//                   onClick={() => setJobDescription("")}
//                   className="text-xs font-medium text-slate-500 transition hover:text-red-600"
//                 >
//                   Clear Job Description
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ====================================================== */}
//       {/* RESUME COMPLETION */}
//       {/* ====================================================== */}

//       {/* {completion && (
//         <ResumeCompletionCard
//           percentage={
//             completion.percentage
//           }
//           missing={
//             completion.missing
//           }
//         />
//       )} */}

//       {/* ====================================================== */}
//       {/* EDITOR WORKSPACE */}
//       {/* ====================================================== */}

//       <div className="flex flex-1 overflow-hidden">
//         {/* ==================================================== */}
//         {/* LEFT SIDEBAR */}
//         {/* ==================================================== */}

//         <EditorSidebar
//           activeSection={activeSection}
//           onSectionChange={setActiveSection}
//         />

//         {/* ==================================================== */}
//         {/* CENTER EDITOR */}
//         {/* ==================================================== */}

//         <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
//           <div className="mx-auto max-w-3xl">
//             <div className="rounded-2xl border bg-white p-8 shadow-sm">
//               <h2 className="mb-2 text-2xl font-bold capitalize">
//                 {activeSection}
//               </h2>

//               <p className="mb-8 text-gray-500">
//                 Fill this section of your resume.
//               </p>

//               {/* ================================================= */}
//               {/* DYNAMIC EDITOR */}
//               {/* ================================================= */}

//               <DynamicEditorRenderer activeSection={activeSection} />
//             </div>
//           </div>
//         </main>

//         {/* ==================================================== */}
//         {/* RIGHT PREVIEW */}
//         {/* ==================================================== */}

//         <PreviewPanel />
//       </div>

//       {/* ====================================================== */}
//       {/* ATS ANALYSIS RESULT */}
//       {/* ====================================================== */}

//       {ats && (
//         <section className="border-t bg-slate-50 px-6 py-8">
//           <div className="mx-auto max-w-7xl">
//             {/* ================================================= */}
//             {/* ATS HEADER */}
//             {/* ================================================= */}

//             <div className="mb-6">
//               <div className="flex flex-wrap items-end justify-between gap-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-slate-900">
//                     ATS Analysis
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Detailed analysis of your resume based on the latest ATS
//                     evaluation.
//                   </p>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                     Target Role
//                   </p>

//                   <p className="mt-1 text-sm font-semibold text-slate-700">
//                     {targetRole || "Not specified"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* ================================================= */}
//             {/* SCORE */}
//             {/* ================================================= */}

//             <div className="mb-6">
//               <ATSScoreCard score={ats.atsScore} grade={ats.grade} />
//             </div>

//             {/* ================================================= */}
//             {/* ATS DETAILS */}
//             {/* ================================================= */}

//             <ATSSuggestions
//               recommendations={ats.recommendations}
//               strengths={ats.strengths}
//               weaknesses={ats.weaknesses}
//               matchedKeywords={ats.matchedKeywords}
//               missingKeywords={ats.missingKeywords}
//             />
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }

// COLOR CODE CHANGED
import { useEffect, useState } from "react";

import { useResume } from "../../features/resume/editor/hooks/useResume";
import { useAutoSave } from "../../features/resume/editor/hooks/useAutoSave";

import EditorHeader from "../../features/resume/editor/components/EditorHeader";
import EditorSidebar from "../../features/resume/editor/components/EditorSidebar";
import PreviewPanel from "../../features/resume/editor/components/PreviewPanel";
import DynamicEditorRenderer from "../../features/resume/editor/components/DynamicEditorRenderer";

import ResumeCompletionCard from "../../features/resume/components/ResumeCompletionCard";
import { useResumeCompletion } from "../../features/resume/hooks/useResumeCompletion";
import ExportPdfButton from "../../features/resume/components/ExportPdfButton";

import ATSScoreCard from "../../features/ats/components/ATSScoreCard";
import ATSSuggestions from "../../features/ats/components/ATSSuggestions";

import {
  useLatestATS,
  useAnalyzeATS,
} from "../../features/ats/hooks/useATSScore";

export default function ResumeEditorPage() {
  const [activeSection, setActiveSection] = useState("personal");

  // ============================================================
  // RESUME
  // ============================================================

  const { loading, resume, resumeId } = useResume();

  const saveStatus = useAutoSave();

  // ============================================================
  // ATS
  // ============================================================

  const {
    data: atsResponse,
    isLoading: isATSLoading,
    isError: isATSError,
  } = useLatestATS(resumeId);

  const {
    mutate: analyzeATS,
    isPending: isAnalyzingATS,
    isError: isAnalyzeError,
    isSuccess: isAnalyzeSuccess,
  } = useAnalyzeATS();

  const ats = atsResponse?.data ?? null;

  // ============================================================
  // TARGET ROLE
  // ============================================================

  const [targetRole, setTargetRole] = useState("");

  useEffect(() => {
    if (!resume) return;

    const resumeWithTargetRole = resume as typeof resume & {
      targetRole?: string;
    };

    if (
      typeof resumeWithTargetRole.targetRole === "string" &&
      resumeWithTargetRole.targetRole.trim()
    ) {
      setTargetRole(resumeWithTargetRole.targetRole.trim());
    }
  }, [resume]);

  // ============================================================
  // JOB DESCRIPTION
  // ============================================================

  const [jobDescription, setJobDescription] = useState("");

  // ============================================================
  // RESUME COMPLETION
  // ============================================================

  const completion = useResumeCompletion();

  // ============================================================
  // ANALYZE ATS
  // ============================================================

  const handleAnalyzeATS = () => {
    if (!resumeId) {
      return;
    }

    const cleanTargetRole = targetRole.trim();

    const cleanJobDescription = jobDescription.trim();

    // Target role is required
    if (!cleanTargetRole) {
      return;
    }

    // JD is optional.
    // If empty, backend can still perform general ATS analysis.
    analyzeATS({
      resumeId,

      targetRole: cleanTargetRole,

      jobDescription: cleanJobDescription,

      options: {
        includeAIAnalysis: true,

        includeOptimizedSummary: true,

        includeImprovedExperience: true,

        includeKeywordAnalysis: true,

        includeSemanticAnalysis: true,

        includeParseabilityAnalysis: true,

        includeContentQualityAnalysis: true,

        includeDateConsistencyAnalysis: true,

        includeSeniorityAnalysis: true,
      },
    });
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-112px)] items-center justify-center rounded-2xl bg-modal shadow-sm">
        <p className="text-lg font-medium text-dark/70">Loading Resume...</p>
      </div>
    );
  }

  // ============================================================
  // MAIN EDITOR
  // ============================================================

  return (
    <div className="flex min-h-[calc(100vh-112px)] flex-col rounded-2xl bg-modal shadow-sm">
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <EditorHeader
        title={resume?.title ?? "Untitled Resume"}
        saveStatus={saveStatus}
      />

      {/* ====================================================== */}
      {/* ATS CONTROL BAR */}
      {/* ====================================================== */}

      <div className="border-b border-card bg-modal px-6 py-4">
        <div className="flex flex-wrap items-center justify-end gap-3">
          {/* ================================================== */}
          {/* TARGET ROLE */}
          {/* ================================================== */}

          <input
            type="text"
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
            placeholder="Target role e.g. Backend Developer"
            className="w-full max-w-xs rounded-xl border border-card bg-background px-4 py-2.5 text-sm text-dark outline-none transition placeholder:text-dark/40 focus:border-accent focus:ring-2 focus:ring-accent/20"
          />

          {/* ================================================== */}
          {/* ANALYZE BUTTON */}
          {/* ================================================== */}

          <button
            type="button"
            onClick={handleAnalyzeATS}
            disabled={!resumeId || !targetRole.trim() || isAnalyzingATS}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAnalyzingATS && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}

            {isAnalyzingATS ? "Analyzing..." : "Analyze ATS"}
          </button>

          {/* ================================================== */}
          {/* ATS LOADING */}
          {/* ================================================== */}

          {isATSLoading && (
            <div className="flex items-center gap-2 rounded-xl border border-card bg-background px-4 py-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-tan/40 border-t-primary" />

              <span className="text-sm text-dark/60">Loading ATS...</span>
            </div>
          )}

          {/* ================================================== */}
          {/* ATS SCORE */}
          {/* ================================================== */}

          {!isATSLoading && ats && (
            <ATSScoreCard score={ats.atsScore} grade={ats.grade} />
          )}

          {/* ================================================== */}
          {/* NO ATS ANALYSIS */}
          {/* ================================================== */}

          {!isATSLoading && !ats && !isATSError && (
            <div className="rounded-xl border border-card bg-background px-4 py-2">
              <p className="text-sm font-medium text-dark/60">
                ATS analysis not available yet
              </p>
            </div>
          )}

          {/* ================================================== */}
          {/* GET ATS ERROR */}
          {/* ================================================== */}

          {isATSError && (
            <div className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-2">
              <p className="text-sm font-medium text-danger">
                Unable to load ATS analysis.
              </p>
            </div>
          )}

          {/* ================================================== */}
          {/* ANALYZE ERROR */}
          {/* ================================================== */}

          {isAnalyzeError && (
            <div className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-2">
              <p className="text-sm font-medium text-danger">
                ATS analysis failed. Please try again.
              </p>
            </div>
          )}

          {/* ================================================== */}
          {/* SUCCESS */}
          {/* ================================================== */}

          {isAnalyzeSuccess && (
            <div className="rounded-xl border border-success/30 bg-success/10 px-4 py-2">
              <p className="text-sm font-medium text-success">
                ATS analysis completed successfully.
              </p>
            </div>
          )}

          {/* ================================================== */}
          {/* EXPORT PDF */}
          {/* ================================================== */}

          {resume && <ExportPdfButton />}
        </div>
      </div>

      {/* ====================================================== */}
      {/* JOB DESCRIPTION */}
      {/* ====================================================== */}

      <section className="border-b border-card bg-background px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-card bg-modal p-6 shadow-sm">
            {/* ================================================== */}
            {/* JD HEADER */}
            {/* ================================================== */}

            <div className="mb-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-dark">
                    Job Description
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm text-dark/60">
                    Paste the job description to get a job-specific ATS score,
                    keyword matching, missing keywords and recommendations.
                  </p>
                </div>

                <span className="rounded-lg bg-accent/15 px-3 py-1.5 text-xs font-medium text-dark/70">
                  Optional
                </span>
              </div>
            </div>

            {/* ================================================== */}
            {/* JD TEXTAREA */}
            {/* ================================================== */}

            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder={`Paste the complete job description here...

Example:

We are looking for a Backend Developer with experience in Node.js, Express.js, MongoDB, REST APIs and AWS.

Requirements:
- Strong JavaScript / TypeScript knowledge
- Node.js and Express
- MongoDB
- REST API development
- Git and GitHub
- Good problem solving skills`}
              className="min-h-[220px] w-full resize-y rounded-xl border border-card bg-background p-4 text-sm leading-6 text-dark outline-none transition placeholder:text-dark/40 focus:border-accent focus:bg-modal focus:ring-2 focus:ring-accent/20"
            />

            {/* ================================================== */}
            {/* JD FOOTER */}
            {/* ================================================== */}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-dark/40">
                {jobDescription.length.toLocaleString()} characters
              </p>

              {jobDescription.trim() && (
                <button
                  type="button"
                  onClick={() => setJobDescription("")}
                  className="text-xs font-medium text-dark/60 transition hover:text-danger"
                >
                  Clear Job Description
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* RESUME COMPLETION */}
      {/* ====================================================== */}

      {/* {completion && (
        <ResumeCompletionCard
          percentage={
            completion.percentage
          }
          missing={
            completion.missing
          }
        />
      )} */}

      {/* ====================================================== */}
      {/* EDITOR WORKSPACE */}
      {/* ====================================================== */}

      <div className="flex flex-1 overflow-hidden">
        {/* ==================================================== */}
        {/* LEFT SIDEBAR */}
        {/* ==================================================== */}

        <EditorSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* ==================================================== */}
        {/* CENTER EDITOR */}
        {/* ==================================================== */}

        <main className="flex-1 overflow-y-auto bg-background p-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-card bg-modal p-8 shadow-sm">
              <h2 className="mb-2 text-2xl font-bold capitalize text-dark">
                {activeSection}
              </h2>

              <p className="mb-8 text-dark/60">
                Fill this section of your resume.
              </p>

              {/* ================================================= */}
              {/* DYNAMIC EDITOR */}
              {/* ================================================= */}

              <DynamicEditorRenderer activeSection={activeSection} />
            </div>
          </div>
        </main>

        {/* ==================================================== */}
        {/* RIGHT PREVIEW */}
        {/* ==================================================== */}

        <PreviewPanel />
      </div>

      {/* ====================================================== */}
      {/* ATS ANALYSIS RESULT */}
      {/* ====================================================== */}

      {ats && (
        <section className="border-t border-card bg-background px-6 py-8">
          <div className="mx-auto max-w-7xl">
            {/* ================================================= */}
            {/* ATS HEADER */}
            {/* ================================================= */}

            <div className="mb-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-dark">ATS Analysis</h2>

                  <p className="mt-1 text-sm text-dark/60">
                    Detailed analysis of your resume based on the latest ATS
                    evaluation.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-wide text-dark/40">
                    Target Role
                  </p>

                  <p className="mt-1 text-sm font-semibold text-primary">
                    {targetRole || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* SCORE */}
            {/* ================================================= */}

            <div className="mb-6">
              <ATSScoreCard score={ats.atsScore} grade={ats.grade} />
            </div>

            {/* ================================================= */}
            {/* ATS DETAILS */}
            {/* ================================================= */}

            <ATSSuggestions
              recommendations={ats.recommendations}
              strengths={ats.strengths}
              weaknesses={ats.weaknesses}
              matchedKeywords={ats.matchedKeywords}
              missingKeywords={ats.missingKeywords}
            />
          </div>
        </section>
      )}
    </div>
  );
}
