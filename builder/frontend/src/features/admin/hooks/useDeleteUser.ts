import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteUser,
} from "../services/user.service";

export function useDeleteUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          "admin-users",
        ],
      });
    },
  });
}