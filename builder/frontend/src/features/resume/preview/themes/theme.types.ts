export interface ResumeTheme {
  id: string;

  page: {
    padding: string;
    fontFamily: string;
    fontSize: string;
    lineHeight: number;
  };

header: {
  align: "left" | "center";
  nameSize: string;
  contactSize: string;
  showIcons: boolean;

  showTitle: boolean;

  divider: boolean;

  compact: boolean;
};

  section: {
    uppercase: boolean;
    divider: boolean;
    spacing: string;
    layout?: "stacked" | "split"; 
  };

  experience: {
    companyLeft: boolean;
    dateRight: boolean;
    roleItalic: boolean;
    bullets: boolean;
  };

  education: {
    dateRight: boolean;
  };

  projects: {
    dateRight: boolean;
    linksBelowDate: boolean;
    technologiesInline: boolean;
    bullets: boolean;
     
  };

  skills: {
    layout: "inline" | "tags";
  };


  colors: {
  primary: string;      // used for name, section titles, accents
  secondary: string;    // used for company/institution names
  text: string;         // body text
  muted: string;        // dates, subtext
  headerBg: string;     // header band background (transparent if no band)
  headerText: string;   // header text color
};
}