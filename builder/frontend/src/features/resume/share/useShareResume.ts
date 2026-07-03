import { useMutation } from "@tanstack/react-query";

import {
  shareResume,
  disableShareResume,
} from "./share.service";

export function useShareResume() {
  const shareMutation = useMutation({
    mutationFn: shareResume,
  });

  const disableMutation = useMutation({
    mutationFn: disableShareResume,
  });

  return {
    shareMutation,
    disableMutation,
  };
}