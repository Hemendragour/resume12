import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBooking,
  getMyBookings,
  getAllBookingsAdmin,
  confirmBooking,
  cancelBooking,
  completeBooking,
} from "../services/booking.service";
import type {
  ConfirmBookingPayload,
  CancelBookingPayload,
  CompleteBookingPayload,
} from "../types/booking.types";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });
};

export const useMyBookings = () => {
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: getMyBookings,
  });
};

export const useAdminBookings = () => {
  return useQuery({
    queryKey: ["adminBookings"],
    queryFn: getAllBookingsAdmin,
  });
};

export const useConfirmBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: ConfirmBookingPayload;
    }) => confirmBooking(bookingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: CancelBookingPayload;
    }) => cancelBooking(bookingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
    },
  });
};

export const useCompleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: CompleteBookingPayload;
    }) => completeBooking(bookingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
    },
  });
};
