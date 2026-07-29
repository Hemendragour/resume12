import { useMutation } from "@tanstack/react-query";
import { generateCustomSectionDescription } from "../services/customSection.service";

interface CustomSectionContext {
  whatDone?: string;
  problemSolved?: string;
  teamRole?: string;
  result?: string;
}

export function useGenerateCustomSection() {
  return useMutation({
    mutationFn: ({
      sectionType,
      itemTitle,
      itemSubtitle,
      context,
    }: {
      sectionType: string;
      itemTitle: string;
      itemSubtitle?: string;
      context?: CustomSectionContext;
    }) =>
      generateCustomSectionDescription(sectionType, itemTitle, itemSubtitle, context),
  });
}