export type BookingTimeSlot =
  | "morning"
  | "afternoon"
  | "evening"
  | "night"
  | "custom";

export type BookingInterviewType =
  | "mock_interview"
  | "resume_review"
  | "placement_guidance";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface IBookingFeedback {
  interviewFocus: string;
  score: number;
  comment: string;
  interviewerName: string;
  completedAt: string;
}

export interface IBookingSession {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  } | string;
  resumeId?: {
    _id: string;
    title: string;
  } | string;
  preferredDate: string;
  timeSlot: BookingTimeSlot;
  customTimeText?: string;
  interviewType: BookingInterviewType;
  notes?: string;
  status: BookingStatus;
  confirmedDateTime?: string;
  meetingLink?: string;
  adminNotes?: string;
  cancelReason?: string;
  rescheduleSuggestion?: {
    suggestedDate?: string;
    suggestedTimeText?: string;
    contactNote?: string;
  };
  feedback?: IBookingFeedback;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingPayload {
  resumeId?: string;
  preferredDate: string;
  timeSlot: BookingTimeSlot;
  customTimeText?: string;
  interviewType: BookingInterviewType;
  notes?: string;
}

export interface ConfirmBookingPayload {
  confirmedDateTime: string;
  meetingLink: string;
  adminNotes?: string;
}

export interface CancelBookingPayload {
  cancelReason: string;
  rescheduleSuggestion?: {
    suggestedDate?: string;
    suggestedTimeText?: string;
    contactNote?: string;
  };
}

export interface CompleteBookingPayload {
  interviewFocus: string;
  score: number;
  comment: string;
}
