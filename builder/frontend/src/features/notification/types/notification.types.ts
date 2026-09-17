export type NotificationType =
  | "booking_confirmed"
  | "booking_cancelled"
  | "booking_completed"
  | "generic";

export interface INotification {
  _id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
