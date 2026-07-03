import type { Resume } from "../../resume/types/resume.types";
export interface ResumeItem {
  _id: string;

  userId: string;

  title: string;

  version: number;

  targetRole: string;

  status: "draft" | "completed";

  shareId: string | null;

  isPublic: boolean;

  summary: string;

  skills: string[];

  experience: unknown[];

  education: unknown[];

  projects: unknown[];

  certifications: unknown[];

  languages: unknown[];

  awards: unknown[];

  interests: unknown[];

  templateId: string;

  createdAt: string;

  updatedAt: string;
}

export interface DashboardStats {
  totalResumes: number;

  draftResumes: number;

  completedResumes: number;
}

export interface DashboardAnalytics {
  views: number;

  downloads: number;

  shares: number;
}

export interface ResumeCompletion {
  percentage: number;

  missing: string[];
}

export interface DashboardResponse {
  success: boolean;

  stats: DashboardStats;

  analytics: DashboardAnalytics;

  resumeCompletion: ResumeCompletion;

  aiSuggestions: string[];

  recentResumes: Resume[];
  recentActivities: {
  type: string;
  message: string;
  createdAt: string;
}[];
}