import type { CoverLetterSection } from "./CoverLetterEditorSidebar";

import HeaderSection from "../sections/HeaderSection";
import BodySection from "../sections/BodySection";
import ClosingSection from "../sections/ClosingSection";

interface Props {
  activeSection: CoverLetterSection;
}

export default function CoverLetterDynamicEditorRenderer({
  activeSection,
}: Props) {
  switch (activeSection) {
    case "header":
      return <HeaderSection />;
    case "body":
      return <BodySection />;
    case "closing":
      return <ClosingSection />;
    default:
      return null;
  }
}
