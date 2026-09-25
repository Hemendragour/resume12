import { createContext, useContext, useState } from "react";

interface LayoutContextType {
  isEditorMode: boolean;
  setIsEditorMode: (value: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        isEditorMode,
        setIsEditorMode,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}
