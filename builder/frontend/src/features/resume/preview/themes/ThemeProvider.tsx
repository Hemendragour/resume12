import { createContext, useContext, type ReactNode } from "react";

import { technicalTheme } from "./technical.theme";
import type { ResumeTheme } from "./theme.types";

const ThemeContext = createContext<ResumeTheme>(technicalTheme);

interface Props {
  children: ReactNode;

  theme?: ResumeTheme;
}

export default function ThemeProvider({
  children,
  theme = technicalTheme,
}: Props) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
