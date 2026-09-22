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

  /**
   * Loads an AI-generated draft into the store as an unsaved cover
   * letter (no _id yet). useAutoSaveCoverLetter detects the missing
   * _id and creates the DB record on the first edit instead of
   * patching an existing one.
   */
  loadDraft: (draft: {
    title: string;
    targetRole: string;
    templateId: CoverLetter["templateId"];
    personalInfo: CoverLetterPersonalInfo;
    recipient: CoverLetterRecipient;
    body: CoverLetterBody;
    closing: CoverLetterClosing;
  }) => void;

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

  loadDraft: (draft) =>
    set({
      coverLetter: {
        // No _id/userId/timestamps yet — this cover letter does not
        // exist in the database until the user makes their first edit.
        _id: "",
        userId: "",
        createdAt: "",
        updatedAt: "",
        title: draft.title,
        targetRole: draft.targetRole,
        templateId: draft.templateId,
        personalInfo: draft.personalInfo,
        recipient: draft.recipient,
        body: draft.body,
        closing: draft.closing,
      },
    }),

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
