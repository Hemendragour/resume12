import mongoose, { Schema, Document } from "mongoose";

export const NotificationType = {
  BOOKING_CONFIRMED: "booking_confirmed",
  BOOKING_CANCELLED: "booking_cancelled",
  BOOKING_COMPLETED: "booking_completed",
  GENERIC: "generic",
} as const;

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: (typeof NotificationType)[keyof typeof NotificationType];
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      default: NotificationType.GENERIC,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);
