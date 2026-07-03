import { useMutation } from "@tanstack/react-query";

import { suggestSkills } from "../services/skills.service";

export function useSuggestSkills() {
  return useMutation({
    mutationFn: suggestSkills,
  });
}