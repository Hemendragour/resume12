import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useResume } from "../../features/resume/editor/hooks/useResume";
import { useAutoSave } from "../../features/resume/editor/hooks/useAutoSave";

import EditorHeader from "../../features/resume/editor/components/EditorHeader";
import EditorSidebar from "../../features/resume/editor/components/EditorSidebar";
import PreviewPanel from "../../features/resume/editor/components/PreviewPanel";
import PersonalInfoSection from "../../features/resume/editor/sections/PersonalInfoSection";
import SummarySection from "../../features/resume/editor/sections/SummarySection";
import ExperienceSection from "../../features/resume/editor/sections/ExperienceSection";
import EducationSection from "../../features/resume/editor/sections/EducationSection";
import SkillsSection from "../../features/resume/editor/sections/SkillsSection";
import ProjectsSection from "../../features/resume/editor/sections/ProjectsSection";
import LanguagesSection from "../../features/resume/editor/sections/LanguagesSection";
import CertificationsSection from "../../features/resume/editor/sections/CertificationsSection";
import AwardsSection from "../../features/resume/editor/sections/AwardsSection";
import InterestsSection from "../../features/resume/editor/sections/InterestsSection";
import SettingsSection from "../../features/resume/editor/sections/SettingsSection";

import ATSSuggestions from "../../features/ats/components/ATSSuggestions";

import ATSScoreCard from "../../features/ats/components/ATSScoreCard";

import { useATSScore } from "../../features/ats/hooks/useATSScore";

import ResumeCompletionCard from "../../features/resume/components/ResumeCompletionCard";

import { useResumeCompletion } from "../../features/resume/hooks/useResumeCompletion";

import ExportPdfButton from "../../features/resume/components/ExportPdfButton";
import TemplatesSection from "../../features/resume/editor/sections/TemplatesSection";
import { useLiveATSScore } from "../../features/ats/hooks/useLiveATSScore";

export default function ResumeEditorPage() {
  const [activeSection, setActiveSection] = useState("personal");

  const { loading, resume } = useResume();
  const saveStatus = useAutoSave();

  const ats = useLiveATSScore();
  const completion = useResumeCompletion();

  // Loading Screen
  // if (loading) {
  //   return (
  //     <DashboardLayout>
  //       <div className="flex h-[calc(100vh-112px)] items-center justify-center rounded-2xl bg-white shadow-sm">
  //         <p className="text-lg font-medium text-gray-600">Loading Resume...</p>
  //       </div>
  //     </DashboardLayout>
  //   );
  // }

  if (loading) {
  return (
    <div className="flex h-[calc(100vh-112px)] items-center justify-center rounded-2xl bg-white shadow-sm">
      <p className="text-lg font-medium text-gray-600">
        Loading Resume...
      </p>
    </div>
  );
}

  // Main Editor
  return (
    
      <div className="flex min-h-[calc(100vh-112px)] flex-col rounded-2xl bg-white shadow-sm">
        {/* Header */}
        <EditorHeader
          title={resume?.title ?? "Untitled Resume"}
          saveStatus={saveStatus}
        />

        <div className="flex justify-end border-b bg-white px-6 py-3">
          {ats && <ATSScoreCard score={ats.score} />}
          {resume && <ExportPdfButton resume={resume} />}
        </div>
        {/* {
  ats && (
    <ATSSuggestions
      missingSections={
        ats.missingSections
      }
      suggestions={
        ats.suggestions
      }
    />
  ) */}
        {/* } */}

        {
  completion && (
    <ResumeCompletionCard
  percentage={completion.percentage}
  missing={completion.missing}
/>
  )
}

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <EditorSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Center Form */}
          <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border bg-white p-8 shadow-sm">
                <h2 className="mb-2 text-2xl font-bold capitalize">
                  {activeSection}
                </h2>

                <p className="mb-8 text-gray-500">
                  Fill this section of your resume.
                </p>

                {/* Dynamic Forms */}
                {activeSection === "personal" && <PersonalInfoSection />}
                {activeSection === "summary" && <SummarySection />}
                {activeSection === "experience" && <ExperienceSection />}
                {activeSection === "education" && <EducationSection />}
                {activeSection === "projects" && <ProjectsSection />}
                {activeSection === "skills" && <SkillsSection />}
                {activeSection === "languages" && <LanguagesSection />}
                {activeSection === "certifications" && (
                  <CertificationsSection />
                )}
                {activeSection === "interests" && <InterestsSection />}

                {activeSection === "awards" && (
                  <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
                    <AwardsSection />
                  </div>
                )}
                {activeSection === "templates" && <TemplatesSection />}
              </div>
            </div>
          </main>

          {/* Right Preview */}
          <PreviewPanel />
        </div>
      </div>
     
  );
}
