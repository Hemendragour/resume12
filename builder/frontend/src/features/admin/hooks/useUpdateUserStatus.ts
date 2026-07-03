import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserStatus } from "../services/user.service";

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "active" | "suspended";
    }) =>
      updateUserStatus(id, status),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-user"],
      });
    },
  });
}