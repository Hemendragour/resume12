import api from "../../../api/axios";

export async function getUsers() {
  const { data } =
    await api.get(
      "/admin/users"
    );

  return data.users;
}


 

export async function updateUserStatus(
  id: string,
  status: "active" | "suspended"
) {
  const { data } = await api.patch(
    `/admin/users/${id}/status`,
    {
      status,
    }
  );

  return data.user;
}

export async function deleteUser(
  id: string
) {
  const { data } =
    await api.delete(
      `/admin/users/${id}`
    );

  return data;
}