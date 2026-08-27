import TechnicalDeveloperTemplate from "./TechnicalDeveloperTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import StudentTemplate from "./StudentTemplate";
import AtsTemplate from "./AtsTemplate";
import SplitLabelTemplate from "./SplitLabelTemplate";
import CorporateBandTemplate from "./CorporateBandTemplate";
import ClassicSerifTemplate from "./ClassicSerifTemplate";
import CorporateClassicTemplate from "./CorporateClassicTemplate";
import ExecutiveBlueTemplate from "./ExecutiveBlueTemplate";
import ProfessionalModernTemplate from "./ProfessionalModernTemplate";
import ModernProfessionalTemplate from "../../templates/modern-professional/ModernProfessionalTemplate";
import EnhancvModernTemplate from "../../templates/enhancv-modern/EnhancvModernTemplate";
import HarvardATSTemplate from "../../templates/harvard-ats/HarvardATSTemplate";

export const ResumeTemplatesMap = {
  "technical-developer": TechnicalDeveloperTemplate,
  "modern-professional": ModernProfessionalTemplate,
  "professional-modern": ProfessionalModernTemplate,
  "minimal-clean": MinimalTemplate,
  "corporate-band": CorporateBandTemplate,
  "split-label": SplitLabelTemplate,
  "classic-serif": ClassicSerifTemplate,
  "corporate-classic": CorporateClassicTemplate,
  "executive-blue": ExecutiveBlueTemplate,
  "enhancv-modern": EnhancvModernTemplate,
  "harvard-ats": HarvardATSTemplate,
  executive: ExecutiveTemplate,
  student: StudentTemplate,
  ats: AtsTemplate,
};
