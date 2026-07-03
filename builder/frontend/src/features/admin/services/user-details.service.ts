import api from "../../../api/axios";

export async function getUserDetails(
  id: string
) {
  const { data } = await api.get(
    `/admin/users/${id}`
  );

  return data;
}