import api from "../../../api/axios";

interface CustomSectionContext {
  whatDone?: string;
  problemSolved?: string;
  teamRole?: string;
  result?: string;
}

export async function generateCustomSectionDescription(
  sectionType: string,
  itemTitle: string,
  itemSubtitle: string | undefined,
  context?: CustomSectionContext
) {
  const { data } = await api.post("/ai/custom-section", {
    sectionType,
    itemTitle,
    itemSubtitle,
    context,
  });
  return data.description;
}