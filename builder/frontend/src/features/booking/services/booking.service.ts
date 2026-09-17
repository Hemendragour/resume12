import axiosInstance from "../../../api/axios";
import type {
  IBookingSession,
  CreateBookingPayload,
  ConfirmBookingPayload,
  CancelBookingPayload,
  CompleteBookingPayload,
} from "../types/booking.types";

export const createBooking = async (
  payload: CreateBookingPayload,
): Promise<IBookingSession> => {
  const { data } = await axiosInstance.post("/booking", payload);
  return data.data;
};

export const getMyBookings = async (): Promise<IBookingSession[]> => {
  const { data } = await axiosInstance.get("/booking/my-history");
  return data.data;
};

export const getAllBookingsAdmin = async (): Promise<IBookingSession[]> => {
  const { data } = await axiosInstance.get("/booking/admin");
  return data.data;
};

export const confirmBooking = async (
  bookingId: string,
  payload: ConfirmBookingPayload,
): Promise<IBookingSession> => {
  const { data } = await axiosInstance.patch(
    `/booking/${bookingId}/confirm`,
    payload,
  );
  return data.data;
};

export const cancelBooking = async (
  bookingId: string,
  payload: CancelBookingPayload,
): Promise<IBookingSession> => {
  const { data } = await axiosInstance.patch(
    `/booking/${bookingId}/cancel`,
    payload,
  );
  return data.data;
};

export const completeBooking = async (
  bookingId: string,
  payload: CompleteBookingPayload,
): Promise<IBookingSession> => {
  const { data } = await axiosInstance.patch(
    `/booking/${bookingId}/complete`,
    payload,
  );
  return data.data;
};
