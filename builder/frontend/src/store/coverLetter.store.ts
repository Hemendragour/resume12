import { create } from "zustand";

import type {
  CoverLetter,
  CoverLetterPersonalInfo,
  CoverLetterRecipient,
  CoverLetterBody,
  CoverLetterClosing,
} from "../features/coverLetter/types/coverLetter.types";

interface CoverLetterState {
  coverLetter: CoverLetter | null;

  setCoverLetter: (coverLetter: CoverLetter) => void;

  updatePersonalInfo: (data: Partial<CoverLetterPersonalInfo>) => void;

  updateRecipient: (data: Partial<CoverLetterRecipient>) => void;

  updateBodyField: (
    data: Partial<Pick<CoverLetterBody, "opening" | "closing">>,
  ) => void;

  addParagraph: () => void;

  updateParagraph: (index: number, value: string) => void;

  removeParagraph: (index: number) => void;

  updateClosing: (data: Partial<CoverLetterClosing>) => void;

  updateTitle: (title: string) => void;

  updateTargetRole: (targetRole: string) => void;
}

export const useCoverLetterStore = create<CoverLetterState>((set) => ({
  coverLetter: null,

  setCoverLetter: (coverLetter) => set({ coverLetter }),

  updatePersonalInfo: (data) =>
    set((state) => {
      if (!state.coverLetter) return state;

      return {
        coverLetter: {
          ...state.coverLetter,
          personalInfo: { ...state.coverLetter.personalInfo, ...data },
        },
      };
    }),

  updateRecipient: (data) =>
    set((state) => {
      if (!state.coverLetter) return state;

      return {
        coverLetter: {
          ...state.coverLetter,
          recipient: { ...state.coverLetter.recipient, ...data },
        },
      };
    }),

  updateBodyField: (data) =>
    set((state) => {
      if (!state.coverLetter) return state;

      return {
        coverLetter: {
          ...state.coverLetter,
          body: { ...state.coverLetter.body, ...data },
        },
      };
    }),

  addParagraph: () =>
    set((state) => {
      if (!state.coverLetter) return state;

      return {
        coverLetter: {
          ...state.coverLetter,
          body: {
            ...state.coverLetter.body,
            paragraphs: [...state.coverLetter.body.paragraphs, ""],
          },
        },
      };
    }),

  updateParagraph: (index, value) =>
    set((state) => {
      if (!state.coverLetter) return state;

      const paragraphs = [...state.coverLetter.body.paragraphs];
      paragraphs[index] = value;

      return {
        coverLetter: {
          ...state.coverLetter,
          body: { ...state.coverLetter.body, paragraphs },
        },
      };
    }),

  removeParagraph: (index) =>
    set((state) => {
      if (!state.coverLetter) return state;

      return {
        coverLetter: {
          ...state.coverLetter,
          body: {
            ...state.coverLetter.body,
            paragraphs: state.coverLetter.body.paragraphs.filter(
              (_, i) => i !== index,
            ),
          },
        },
      };
    }),

  updateClosing: (data) =>
    set((state) => {
      if (!state.coverLetter) return state;

      return {
        coverLetter: {
          ...state.coverLetter,
          closing: { ...state.coverLetter.closing, ...data },
        },
      };
    }),

  updateTitle: (title) =>
    set((state) => {
      if (!state.coverLetter) return state;

      return { coverLetter: { ...state.coverLetter, title } };
    }),

  updateTargetRole: (targetRole) =>
    set((state) => {
      if (!state.coverLetter) return state;

      return { coverLetter: { ...state.coverLetter, targetRole } };
    }),
}));
