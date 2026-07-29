import type { ReactNode } from "react";

import { useTheme } from "../../themes/ThemeProvider";

interface Props {
  title?: string;
  children: ReactNode;
}

export default function ResumeSection({
  children,
}: Props) {
  const theme = useTheme();

  return (
    <section
      style={{
        marginTop: theme.section.spacing,
        fontSize: theme.page.fontSize,
        lineHeight: theme.page.lineHeight,
      }}
      className="text-slate-700"
    >
      {children}
    </section>
  );
}