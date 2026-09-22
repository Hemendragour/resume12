export const CoverLetterTemplates = {
  CLASSIC_FORMAL: "classic-formal",
} as const;

export type CoverLetterTemplate =
  (typeof CoverLetterTemplates)[keyof typeof CoverLetterTemplates];

export interface CoverLetterPersonalInfo {
  fullName: string;
  location?: string;
  phone?: string;
  email?: string;
  github?: string;
  linkedIn?: string;
}

export interface CoverLetterRecipient {
  date: string;
  recipientName: string;
  companyName: string;
  companyLocation?: string;
  subject?: string;
  greeting: string;
}

export interface CoverLetterBody {
  opening: string;
  paragraphs: string[];
  closing: string;
}

export interface CoverLetterClosing {
  signOff: string;
  fullName: string;
}

export interface CoverLetter {
  _id: string;
  userId: string;
  title: string;
  targetRole: string;
  templateId: CoverLetterTemplate;
  personalInfo: CoverLetterPersonalInfo;
  recipient: CoverLetterRecipient;
  body: CoverLetterBody;
  closing: CoverLetterClosing;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCoverLetterRequest {
  title: string;
  targetRole: string;
  templateId: CoverLetterTemplate;
}
