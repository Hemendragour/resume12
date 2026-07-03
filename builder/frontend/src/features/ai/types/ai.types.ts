export interface GenerateSummaryRequest {
  jobTitle: string;
  skills: string[];
}

export interface GenerateSummaryResponse {
  summary: string;
}