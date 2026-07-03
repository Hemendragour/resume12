import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Languages,
  Award,
  Medal,
  Settings,
  LayoutTemplate,
  Heart,
} from "lucide-react";

interface Props {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  {
    id: "personal",
    title: "Personal Info",
    icon: User,
  },
  {
    id: "summary",
    title: "Summary",
    icon: FileText,
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderGit2,
  },
  {
    id: "skills",
    title: "Skills",
    icon: Wrench,
  },
  {
    id: "languages",
    title: "Languages",
    icon: Languages,
  },
  {
    id: "certifications",
    title: "Certificates",
    icon: Award,
  },
  {
    id: "awards",
    title: "Awards",
    icon: Medal,
  },
  {
    id: "interests",
    title: "Interests",
    icon: Heart,
  },

  // Divider

  {
    id: "templates",
    title: "Templates",
    icon: LayoutTemplate,
  },

  {
    id: "settings",
    title: "Settings",
    icon: Settings,
  },
];

console.log(sections.length);
console.log(sections);

export default function EditorSidebar({
  activeSection,
  onSectionChange,
}: Props) {
  return (
   <aside className="w-72 bg-white border-r flex-shrink-0 overflow-y-auto">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Resume Editor</h2>

        <p className="text-sm text-gray-500 mt-1">
          Complete your resume step by step
        </p>
      </div>

      <div className="p-4 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${
                activeSection === section.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              {section.title}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
