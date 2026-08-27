import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useResumeStore } from "../../../../store/resume.store";
import DynamicSectionRenderer from "../components/DynamicSectionRenderer";
import { SplitLabelSectionRegistry } from "../components/SectionRegistry.split-label";
import SplitLabelCustomSection from "../components/sections/split-label/CustomSectionPreview";
import { splitLabelTheme as theme } from "../themes/split-label.theme";
import { Phone, Mail } from "lucide-react";

export default function SplitLabelTemplate() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div
      className="min-h-[1120px]"
      style={{
        backgroundColor: "#ffffff",
        color: theme.colors.text,
        fontFamily: theme.page.fontFamily,
        fontSize: theme.page.fontSize,
        lineHeight: theme.page.lineHeight,
      }}
    >
      {/* Header */}
      <div
        className={
          theme.header.align === "center" ? "text-center" : "text-left"
        }
        style={{
          padding: theme.page.padding,
          paddingBottom: "32px",
          backgroundColor: theme.colors.headerBg,
        }}
      >
        <h1
          className="font-bold"
          style={{
            fontSize: theme.header.nameSize,
            color: theme.colors.headerText,
          }}
        >
          {personalInfo.fullName}
        </h1>

        {theme.header.showTitle && personalInfo.title && (
          <p
            className="mt-1 font-bold"
            style={{ fontSize: "14px", color: theme.colors.primary }}
          >
            {personalInfo.title}
          </p>
        )}

        <div
          className={`mt-4 flex flex-wrap gap-3 ${
            theme.header.align === "center" ? "justify-center" : "justify-start"
          }`}
          style={{ fontSize: theme.header.contactSize }}
        >
          {personalInfo.address && (
            <span
              className="flex items-center gap-1.5 rounded-full border px-3 py-1"
              style={{
                borderColor: theme.colors.muted,
                color: theme.colors.text,
              }}
            >
              {personalInfo.address}
            </span>
          )}
          {personalInfo.email && (
            <span
              className="flex items-center gap-1.5 rounded-full border px-3 py-1"
              style={{
                borderColor: theme.colors.muted,
                color: theme.colors.text,
              }}
            >
              {theme.header.showIcons && <Mail size={12} />}
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span
              className="flex items-center gap-1.5 rounded-full border px-3 py-1"
              style={{
                borderColor: theme.colors.muted,
                color: theme.colors.text,
              }}
            >
              {theme.header.showIcons && <Phone size={12} />}
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.github && (
            <a
              href={
                personalInfo.github.startsWith("http")
                  ? personalInfo.github
                  : `https://${personalInfo.github}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1"
              style={{
                borderColor: theme.colors.muted,
                color: theme.colors.text,
                textDecoration: "none",
              }}
            >
              {theme.header.showIcons && <FaGithub size={12} />}
              GitHub
            </a>
          )}

          {personalInfo.linkedIn && (
            <a
              href={
                personalInfo.linkedIn.startsWith("http")
                  ? personalInfo.linkedIn
                  : `https://${personalInfo.linkedIn}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1"
              style={{
                borderColor: theme.colors.muted,
                color: theme.colors.text,
                textDecoration: "none",
              }}
            >
              {theme.header.showIcons && <FaLinkedin size={12} />}
              LinkedIn
            </a>
          )}
        </div>

        {theme.header.divider && (
          <div
            className="mt-4"
            style={{ borderBottom: `1px solid ${theme.colors.muted}` }}
          />
        )}
      </div>

      {/* Body */}
      <div style={{ padding: theme.page.padding, paddingTop: "24px" }}>
        <DynamicSectionRenderer
          registry={SplitLabelSectionRegistry}
          customSectionComponent={SplitLabelCustomSection}
        />
      </div>
    </div>
  );
}
