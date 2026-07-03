import api from "../../../api/axios";

export async function getDashboardStats() {
  const { data } = await api.get(
    "/admin/dashboard"
  );

  return data.stats;
}