import axiosInstance from "../../../api/axios";
import type { INotification } from "../types/notification.types";

export const getNotifications = async (
  limit = 50,
): Promise<INotification[]> => {
  const { data } = await axiosInstance.get(`/notifications?limit=${limit}`);
  return data.data;
};

export const getUnreadCount = async (): Promise<number> => {
  const { data } = await axiosInstance.get("/notifications/unread-count");
  return data.data.count;
};

export const markAsRead = async (
  notificationId: string,
): Promise<INotification> => {
  const { data } = await axiosInstance.patch(
    `/notifications/${notificationId}/read`,
  );
  return data.data;
};

export const markAllAsRead = async (): Promise<void> => {
  await axiosInstance.patch("/notifications/read-all");
};
